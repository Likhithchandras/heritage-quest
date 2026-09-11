const express = require('express');
const router = express.Router();
const DB = require('../db');

// GET /api/leaderboard?quest_id=...&limit=...
router.get('/', (req, res) => {
  try {
    const questId = req.query.quest_id || 'all';
    const limit = parseInt(req.query.limit, 10) || 20;
    const entries = DB.getLeaderboard(questId, limit);
    res.json({ success: true, leaderboard: entries });
  } catch (err) {
    console.error('[Leaderboard Get] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
