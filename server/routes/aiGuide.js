const express = require('express');
const router = express.Router();
const DB = require('../db');

// POST /api/ai/ask - Contextual AI Heritage Assistant
router.post('/ask', (req, res) => {
  try {
    const { question, questId, checkpointIndex } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ success: false, error: 'Question is required' });
    }

    const qLower = question.toLowerCase();

    // 1. Search DB Lore repository
    const matchedLore = DB.searchLore(question, questId);
    if (matchedLore) {
      return res.json({
        success: true,
        answer: matchedLore,
        source: 'Royal Archives & Scribe Records'
      });
    }

    // 2. Check for contextual question heuristics
    let answer = '';
    if (qLower.includes('who are you') || qLower.includes('what can you do')) {
      answer = "I am your AI Heritage Guide, connected to the historical archives and court scribe journals of this monument. You can ask me about the site's architecture, historical rulers, forgotten legends, or ask for guidance on your current checkpoint.";
    } else if (qLower.includes('how to play') || qLower.includes('rules')) {
      answer = "Your mission is to explore the fort and reach four checkpoints. At each checkpoint, solve the riddle, scan the mason QR marker, or answer the spectral keeper to recover a journal fragment. Once all 4 fragments are collected, combine them to find the true treasure.";
    } else if (qLower.includes('give me a hint') || qLower.includes('help')) {
      if (questId) {
        const quest = DB.getQuestById(questId);
        if (quest && quest.checkpoints && quest.checkpoints[checkpointIndex]) {
          answer = `Here is a whisper from the scribe for Checkpoint ${checkpointIndex + 1}: ${quest.checkpoints[checkpointIndex].hint || 'Study the architectural details carefully.'}`;
        } else {
          answer = "Look closely at the engravings, arches, and stones around your current location. The answer is always written in the architecture.";
        }
      } else {
        answer = "Every checkpoint contains architectural or historical clues. Use the 'Need a hint?' toggle if you are stuck.";
      }
    } else {
      answer = "The historical archives have no direct inscription on that exact question, but the fort's stone inscriptions encourage you to study the walls, pillars, and arches around your current station. Try asking about the king, the royal seal, the armoury, or the architecture!";
    }

    res.json({
      success: true,
      answer,
      source: 'Court Scribe Journal'
    });
  } catch (err) {
    console.error('[AI Guide] Error:', err);
    res.status(500).json({ success: false, error: 'AI Guide processing failed' });
  }
});

module.exports = router;
