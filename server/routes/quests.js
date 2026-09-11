const express = require('express');
const router = express.Router();
const DB = require('../db');

// GET /api/quests - List all available heritage quests
router.get('/', (req, res) => {
  try {
    const quests = DB.getAllQuests();
    res.json({ success: true, quests });
  } catch (err) {
    console.error('[Quests Route] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve quests' });
  }
});

// GET /api/quests/:id - Get complete quest details & checkpoints
router.get('/:id', (req, res) => {
  try {
    const quest = DB.getQuestById(req.params.id);
    if (!quest) {
      return res.status(404).json({ success: false, error: 'Quest not found' });
    }
    res.json({ success: true, quest });
  } catch (err) {
    console.error('[Quests Route] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve quest' });
  }
});

// POST /api/quests - Create custom quest (Game Master)
router.post('/', (req, res) => {
  try {
    const { quest, checkpoints } = req.body;
    if (!quest || !quest.id || !quest.title) {
      return res.status(400).json({ success: false, error: 'Quest ID and Title are required' });
    }

    DB.createQuest(quest);

    if (Array.isArray(checkpoints)) {
      checkpoints.forEach((cp, idx) => {
        DB.createCheckpoint({
          ...cp,
          quest_id: quest.id,
          order_num: idx
        });
      });
    }

    res.json({ success: true, questId: quest.id, message: 'Quest created successfully' });
  } catch (err) {
    console.error('[Quests Create] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to create quest' });
  }
});

module.exports = router;
