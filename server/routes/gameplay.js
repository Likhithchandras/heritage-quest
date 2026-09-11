const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const DB = require('../db');

const POINTS_PER_CHECKPOINT = 100;
const HINT_COST = 20;
const FINAL_BONUS = 200;
const SPEED_THRESHOLD_SECONDS = 300; // Under 5 minutes

function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// POST /api/sessions/start - Start a new game session
router.post('/start', (req, res) => {
  try {
    const { questId, teamName } = req.body;
    const quest = DB.getQuestById(questId || 'vijayanagara-royal-seal');
    if (!quest) {
      return res.status(404).json({ success: false, error: 'Quest not found' });
    }

    const sessionId = 'hq-' + crypto.randomBytes(6).toString('hex');
    const newSession = {
      id: sessionId,
      quest_id: quest.id,
      team_name: teamName || 'Explorer Team',
      current_checkpoint: 0,
      solved: new Array(quest.checkpoints.length).fill(false),
      points: 0,
      xp: 0,
      hints_used: 0,
      scanned_qr: false,
      start_time: Date.now(),
      end_time: null,
      elapsed_seconds: 0,
      completed: false,
      badges: []
    };

    DB.createSession(newSession);

    res.json({
      success: true,
      session: newSession,
      quest
    });
  } catch (err) {
    console.error('[Session Start] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to start session' });
  }
});

// GET /api/sessions/:id - Get session status
router.get('/:id', (req, res) => {
  try {
    const session = DB.getSession(req.params.id);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }
    const quest = DB.getQuestById(session.quest_id);
    res.json({ success: true, session, quest });
  } catch (err) {
    console.error('[Session Get] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch session' });
  }
});

// POST /api/checkpoints/verify - Verify checkpoint solution & GPS
router.post('/verify', (req, res) => {
  try {
    const { sessionId, checkpointIndex, submission, userCoords, demoMode, isScanned } = req.body;

    const session = DB.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    const quest = DB.getQuestById(session.quest_id);
    if (!quest || !quest.checkpoints[checkpointIndex]) {
      return res.status(400).json({ success: false, error: 'Invalid checkpoint' });
    }

    const cp = quest.checkpoints[checkpointIndex];

    // GPS Geofence Check (if coordinates provided and demo mode is off)
    if (!demoMode && cp.lat && cp.lng && userCoords && userCoords.lat && userCoords.lng) {
      const distance = calculateDistanceMeters(userCoords.lat, userCoords.lng, cp.lat, cp.lng);
      const allowedRadius = cp.radius_meters || 40;
      if (distance > allowedRadius) {
        return res.json({
          success: false,
          reason: 'OUT_OF_RANGE',
          message: `You are too far from the historical site marker (${Math.round(distance)}m away, radius is ${allowedRadius}m). Move closer or enable Demo Mode.`,
          distance: Math.round(distance),
          allowedRadius
        });
      }
    }

    // Logic validation by gate type
    let isCorrect = false;
    let feedback = '';

    if (cp.gate_type === 'mcq') {
      if (submission === cp.payload.correctIndex) {
        isCorrect = true;
        feedback = 'Correct! The historical record confirms your deduction.';
      } else {
        feedback = 'Incorrect answer. Read the inscription clues carefully or consult the AI guide.';
      }
    } else if (cp.gate_type === 'qr') {
      const submittedCode = String(submission || '').trim().toUpperCase();
      if (submittedCode === String(cp.payload.code).toUpperCase()) {
        isCorrect = true;
        feedback = 'Marker verified! Architectural cipher decoded.';
        if (isScanned) {
          session.scanned_qr = true;
        }
      } else {
        feedback = 'That code does not match this heritage checkpoint.';
      }
    } else if (cp.gate_type === 'symbol') {
      if (submission === cp.payload.correctIndex) {
        isCorrect = true;
        feedback = 'The ancient geometric pattern completes itself!';
      } else {
        feedback = 'That breaks the sequence — study the alternating facets.';
      }
    } else if (cp.gate_type === 'dialogue') {
      const selectedChoice = cp.payload.choices[submission];
      if (selectedChoice && selectedChoice.correct) {
        isCorrect = true;
        feedback = selectedChoice.reply;
      } else if (selectedChoice) {
        feedback = selectedChoice.reply;
      } else {
        feedback = 'Invalid choice.';
      }
    }

    if (!isCorrect) {
      return res.json({ success: false, reason: 'WRONG_ANSWER', message: feedback });
    }

    // Advance session
    session.solved[checkpointIndex] = true;
    session.points += POINTS_PER_CHECKPOINT;
    session.xp += POINTS_PER_CHECKPOINT;
    session.current_checkpoint = Math.min(checkpointIndex + 1, quest.checkpoints.length);
    session.elapsed_seconds = Math.floor((Date.now() - session.start_time) / 1000);

    DB.updateSession(session);

    res.json({
      success: true,
      message: feedback,
      fragment: cp.fragment,
      pointsEarned: POINTS_PER_CHECKPOINT,
      session
    });
  } catch (err) {
    console.error('[Verify Checkpoint] Error:', err);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});

// POST /api/hints/use - Apply hint deduction
router.post('/hint', (req, res) => {
  try {
    const { sessionId, checkpointIndex } = req.body;
    const session = DB.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    const quest = DB.getQuestById(session.quest_id);
    const cp = quest.checkpoints[checkpointIndex];
    if (!cp) {
      return res.status(400).json({ success: false, error: 'Invalid checkpoint' });
    }

    session.hints_used += 1;
    session.points = Math.max(0, session.points - HINT_COST);
    DB.updateSession(session);

    res.json({
      success: true,
      hint: cp.hint,
      pointsDeducted: HINT_COST,
      session
    });
  } catch (err) {
    console.error('[Hint Use] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve hint' });
  }
});

// POST /api/sessions/complete - Final puzzle & completion
router.post('/complete', (req, res) => {
  try {
    const { sessionId, finalChoiceIndex } = req.body;
    const session = DB.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    const quest = DB.getQuestById(session.quest_id);
    if (finalChoiceIndex !== quest.final_correct) {
      return res.json({
        success: false,
        reason: 'WRONG_FINAL_ANSWER',
        message: 'The four fragments point elsewhere — re-read them and deduce the true hiding place.'
      });
    }

    session.end_time = Date.now();
    session.elapsed_seconds = Math.floor((session.end_time - session.start_time) / 1000);
    session.points += FINAL_BONUS;
    session.xp += FINAL_BONUS;
    session.completed = true;

    // Badges calculation
    const badges = [];
    badges.push({
      id: 'explorer',
      icon: '🏛️',
      name: 'Heritage Explorer',
      desc: 'Completed the full heritage mission'
    });

    if (session.hints_used === 0) {
      badges.push({
        id: 'detective',
        icon: '🔍',
        name: 'Master Detective',
        desc: 'Solved all clues without asking for hints'
      });
    }

    if (session.elapsed_seconds <= SPEED_THRESHOLD_SECONDS) {
      badges.push({
        id: 'speed',
        icon: '⚡',
        name: 'Speed Explorer',
        desc: `Completed the hunt in under 5 minutes (${session.elapsed_seconds}s)`
      });
    }

    if (session.scanned_qr) {
      badges.push({
        id: 'pathfinder',
        icon: '🧭',
        name: 'Pathfinder',
        desc: 'Successfully scanned a real-world physical QR marker'
      });
    }

    session.badges = badges;
    DB.updateSession(session);

    // Add to leaderboard
    DB.addLeaderboardEntry({
      quest_id: session.quest_id,
      team_name: session.team_name,
      score: session.points,
      xp: session.xp,
      elapsed_seconds: session.elapsed_seconds,
      hints_used: session.hints_used,
      badges_count: badges.length
    });

    // Generate cryptographic verification certificate hash
    const certCode = 'HQ-' + crypto
      .createHash('sha256')
      .update(`${session.id}-${session.team_name}-${session.points}-${session.end_time}`)
      .digest('hex')
      .slice(0, 10)
      .toUpperCase();

    res.json({
      success: true,
      message: quest.completion_title,
      completionBody: quest.completion_body,
      session,
      certCode,
      badges
    });
  } catch (err) {
    console.error('[Session Complete] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to finalize session' });
  }
});

module.exports = router;
