const express = require('express');
const cors = require('cors');
const path = require('path');
const DB = require('./db');

// Initialize database
DB.init();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// Mount API routes
app.use('/api/quests', require('./routes/quests'));
app.use('/api/sessions', require('./routes/gameplay'));
app.use('/api/checkpoints', require('./routes/gameplay'));
app.use('/api/hints', require('./routes/gameplay'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/ai', require('./routes/aiGuide'));
app.use('/api/cert', require('./routes/cert'));
app.use('/api/admin', require('./routes/admin'));

// Fallback route for SPA
app.use((req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🏛️  HERITAGE QUEST PLATFORM RUNNING ON PORT ${PORT}`);
  console.log(`  🔗  http://localhost:${PORT}`);
  console.log(`====================================================`);
});
