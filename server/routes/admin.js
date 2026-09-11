const express = require('express');
const router = express.Router();
const DB = require('../db');

// GET /api/admin/stats - Heritage site visitor analytics & completion rates
router.get('/stats', (req, res) => {
  try {
    const quests = DB.getAllQuests();
    const leaderboard = DB.getLeaderboard('all', 100);

    const totalExplorers = leaderboard.length;
    const avgScore = totalExplorers > 0
      ? Math.round(leaderboard.reduce((acc, curr) => acc + curr.score, 0) / totalExplorers)
      : 0;
    const avgSeconds = totalExplorers > 0
      ? Math.round(leaderboard.reduce((acc, curr) => acc + curr.elapsed_seconds, 0) / totalExplorers)
      : 0;

    res.json({
      success: true,
      stats: {
        totalQuests: quests.length,
        totalExplorers,
        averageScore: avgScore,
        averageTimeMinutes: Math.round(avgSeconds / 60),
        topSites: quests.map(q => ({ id: q.id, title: q.title, location: q.location }))
      }
    });
  } catch (err) {
    console.error('[Admin Stats] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

module.exports = router;
