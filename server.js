const express = require('express');
const cors = require('cors');
const path = require('path');
const DB = require('./server/db');

// Initialize database
DB.init();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve both root and public static assets
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api/quests', require('./server/routes/quests'));
app.use('/api/sessions', require('./server/routes/gameplay'));
app.use('/api/checkpoints', require('./server/routes/gameplay'));
app.use('/api/hints', require('./server/routes/gameplay'));
app.use('/api/leaderboard', require('./server/routes/leaderboard'));
app.use('/api/ai', require('./server/routes/aiGuide'));
app.use('/api/cert', require('./server/routes/cert'));
app.use('/api/admin', require('./server/routes/admin'));

// Fallback to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🏛️  HERITAGE QUEST PLATFORM RUNNING ON PORT ${PORT}`);
  console.log(`  🔗  http://localhost:${PORT}`);
  console.log(`====================================================`);
});
