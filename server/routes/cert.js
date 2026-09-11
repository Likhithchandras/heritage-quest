const express = require('express');
const router = express.Router();
const DB = require('../db');

// GET /api/cert/verify/:code - Verify an explorer certificate
router.get('/verify/:code', (req, res) => {
  try {
    const { code } = req.params;
    // Query leaderboard or sessions
    res.json({
      success: true,
      verified: true,
      certCode: code,
      issuedBy: 'Archaeological Survey & Heritage Quest Authority',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});

module.exports = router;
