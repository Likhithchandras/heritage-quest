const path = require('path');
const fs = require('fs');

let db = null;
let useNodeSqlite = false;

try {
  const sqlite = require('node:sqlite');
  if (sqlite && sqlite.DatabaseSync) {
    const dbPath = path.join(__dirname, 'heritage_quest.db');
    db = new sqlite.DatabaseSync(dbPath);
    useNodeSqlite = true;
    console.log('[DB] Using Node.js native node:sqlite engine.');
  }
} catch (err) {
  console.log('[DB] Native node:sqlite not available, using JSON-backed persistence store.');
}

const jsonDbPath = path.join(__dirname, 'heritage_quest_store.json');
let jsonStore = {
  quests: [],
  checkpoints: [],
  sessions: [],
  leaderboard: [],
  lore: []
};

if (!useNodeSqlite) {
  if (fs.existsSync(jsonDbPath)) {
    try {
      jsonStore = JSON.parse(fs.readFileSync(jsonDbPath, 'utf8'));
    } catch (e) {
      console.error('[DB] Failed to parse JSON store, initializing fresh store.');
    }
  }
}

function saveJsonStore() {
  if (!useNodeSqlite) {
    fs.writeFileSync(jsonDbPath, JSON.stringify(jsonStore, null, 2), 'utf8');
  }
}

const DB = {
  init() {
    if (useNodeSqlite) {
      db.exec(`
        CREATE TABLE IF NOT EXISTS quests (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          subtitle TEXT,
          location TEXT,
          lat REAL,
          lng REAL,
          difficulty TEXT,
          est_time TEXT,
          cover_theme TEXT,
          intro_1 TEXT,
          intro_2 TEXT,
          intro_3 TEXT,
          final_prompt TEXT,
          final_options TEXT,
          final_correct INTEGER,
          completion_title TEXT,
          completion_body TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS checkpoints (
          id TEXT PRIMARY KEY,
          quest_id TEXT NOT NULL,
          order_num INTEGER NOT NULL,
          name TEXT NOT NULL,
          gate_type TEXT NOT NULL,
          lat REAL,
          lng REAL,
          radius_meters INTEGER DEFAULT 40,
          story TEXT,
          task TEXT,
          hint TEXT,
          payload TEXT,
          fragment TEXT,
          FOREIGN KEY (quest_id) REFERENCES quests (id)
        );

        CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          quest_id TEXT NOT NULL,
          team_name TEXT NOT NULL,
          current_checkpoint INTEGER DEFAULT 0,
          solved TEXT DEFAULT '[]',
          points INTEGER DEFAULT 0,
          xp INTEGER DEFAULT 0,
          hints_used INTEGER DEFAULT 0,
          scanned_qr INTEGER DEFAULT 0,
          start_time INTEGER,
          end_time INTEGER,
          elapsed_seconds INTEGER DEFAULT 0,
          completed INTEGER DEFAULT 0,
          badges TEXT DEFAULT '[]',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS leaderboard (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          quest_id TEXT NOT NULL,
          team_name TEXT NOT NULL,
          score INTEGER NOT NULL,
          xp INTEGER NOT NULL,
          elapsed_seconds INTEGER NOT NULL,
          hints_used INTEGER DEFAULT 0,
          badges_count INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS lore (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          quest_id TEXT,
          topic TEXT,
          keywords TEXT,
          content TEXT
        );
      `);
    }

    const seedData = require('./data/seedQuests');
    const questCount = DB.getQuestCount();
    if (questCount < seedData.quests.length) {
      console.log('[DB] Seeding/Updating historical heritage quests...');
      DB.seed();
    }
  },

  getQuestCount() {
    if (useNodeSqlite) {
      const stmt = db.prepare('SELECT COUNT(*) as count FROM quests');
      const res = stmt.get();
      return res ? res.count : 0;
    } else {
      return jsonStore.quests.length;
    }
  },

  seed() {
    const seedData = require('./data/seedQuests');
    for (const q of seedData.quests) {
      DB.createQuest(q);
    }
    for (const cp of seedData.checkpoints) {
      DB.createCheckpoint(cp);
    }
    for (const l of seedData.leaderboard) {
      DB.addLeaderboardEntry(l);
    }
    for (const lore of seedData.lore) {
      DB.addLore(lore);
    }
    console.log(`[DB] Seeding complete with ${seedData.quests.length} quests.`);
  },

  createQuest(q) {
    if (useNodeSqlite) {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO quests (
          id, title, subtitle, location, lat, lng, difficulty, est_time,
          cover_theme, intro_1, intro_2, intro_3, final_prompt,
          final_options, final_correct, completion_title, completion_body
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        q.id, q.title, q.subtitle, q.location, q.lat || null, q.lng || null,
        q.difficulty || 'Medium', q.est_time || '30 mins', q.cover_theme || 'sandstone',
        q.intro_1 || '', q.intro_2 || '', q.intro_3 || '', q.final_prompt || '',
        JSON.stringify(q.final_options || []), q.final_correct || 0,
        q.completion_title || 'Solved', q.completion_body || ''
      );
    } else {
      const idx = jsonStore.quests.findIndex(x => x.id === q.id);
      const row = { ...q, final_options: q.final_options || [] };
      if (idx >= 0) jsonStore.quests[idx] = row;
      else jsonStore.quests.push(row);
      saveJsonStore();
    }
  },

  createCheckpoint(cp) {
    if (useNodeSqlite) {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO checkpoints (
          id, quest_id, order_num, name, gate_type, lat, lng,
          radius_meters, story, task, hint, payload, fragment
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        cp.id, cp.quest_id, cp.order_num, cp.name, cp.gate_type,
        cp.lat || null, cp.lng || null, cp.radius_meters || 40,
        cp.story || '', cp.task || '', cp.hint || '',
        JSON.stringify(cp.payload || {}), cp.fragment || ''
      );
    } else {
      const idx = jsonStore.checkpoints.findIndex(x => x.id === cp.id);
      const row = { ...cp, payload: cp.payload || {} };
      if (idx >= 0) jsonStore.checkpoints[idx] = row;
      else jsonStore.checkpoints.push(row);
      saveJsonStore();
    }
  },

  getAllQuests() {
    if (useNodeSqlite) {
      const stmt = db.prepare('SELECT * FROM quests ORDER BY title ASC');
      const rows = stmt.all();
      return rows.map(r => ({
        ...r,
        final_options: JSON.parse(r.final_options || '[]')
      }));
    } else {
      return jsonStore.quests;
    }
  },

  getQuestById(id) {
    if (useNodeSqlite) {
      const stmt = db.prepare('SELECT * FROM quests WHERE id = ?');
      const q = stmt.get(id);
      if (!q) return null;
      const cpStmt = db.prepare('SELECT * FROM checkpoints WHERE quest_id = ? ORDER BY order_num ASC');
      const cps = cpStmt.all(id).map(cp => ({
        ...cp,
        payload: JSON.parse(cp.payload || '{}')
      }));
      return {
        ...q,
        final_options: JSON.parse(q.final_options || '[]'),
        checkpoints: cps
      };
    } else {
      const q = jsonStore.quests.find(x => x.id === id);
      if (!q) return null;
      const cps = jsonStore.checkpoints
        .filter(x => x.quest_id === id)
        .sort((a, b) => a.order_num - b.order_num);
      return { ...q, checkpoints: cps };
    }
  },

  // Sessions
  createSession(session) {
    if (useNodeSqlite) {
      const stmt = db.prepare(`
        INSERT INTO sessions (
          id, quest_id, team_name, current_checkpoint, solved,
          points, xp, hints_used, scanned_qr, start_time, end_time,
          elapsed_seconds, completed, badges
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        session.id, session.quest_id, session.team_name,
        session.current_checkpoint || 0,
        JSON.stringify(session.solved || []),
        session.points || 0, session.xp || 0,
        session.hints_used || 0, session.scanned_qr ? 1 : 0,
        session.start_time, session.end_time || null,
        session.elapsed_seconds || 0, session.completed ? 1 : 0,
        JSON.stringify(session.badges || [])
      );
    } else {
      jsonStore.sessions.push(session);
      saveJsonStore();
    }
    return session;
  },

  getSession(id) {
    if (useNodeSqlite) {
      const stmt = db.prepare('SELECT * FROM sessions WHERE id = ?');
      const s = stmt.get(id);
      if (!s) return null;
      return {
        ...s,
        solved: JSON.parse(s.solved || '[]'),
        badges: JSON.parse(s.badges || '[]'),
        scanned_qr: s.scanned_qr === 1,
        completed: s.completed === 1
      };
    } else {
      return jsonStore.sessions.find(x => x.id === id) || null;
    }
  },

  updateSession(session) {
    if (useNodeSqlite) {
      const stmt = db.prepare(`
        UPDATE sessions SET
          current_checkpoint = ?, solved = ?, points = ?, xp = ?,
          hints_used = ?, scanned_qr = ?, end_time = ?,
          elapsed_seconds = ?, completed = ?, badges = ?
        WHERE id = ?
      `);
      stmt.run(
        session.current_checkpoint,
        JSON.stringify(session.solved),
        session.points,
        session.xp,
        session.hints_used,
        session.scanned_qr ? 1 : 0,
        session.end_time || null,
        session.elapsed_seconds,
        session.completed ? 1 : 0,
        JSON.stringify(session.badges || []),
        session.id
      );
    } else {
      const idx = jsonStore.sessions.findIndex(x => x.id === session.id);
      if (idx >= 0) {
        jsonStore.sessions[idx] = session;
        saveJsonStore();
      }
    }
    return session;
  },

  // Leaderboard
  addLeaderboardEntry(entry) {
    if (useNodeSqlite) {
      const stmt = db.prepare(`
        INSERT INTO leaderboard (quest_id, team_name, score, xp, elapsed_seconds, hints_used, badges_count)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        entry.quest_id, entry.team_name, entry.score,
        entry.xp || entry.score, entry.elapsed_seconds || 0,
        entry.hints_used || 0, entry.badges_count || 0
      );
    } else {
      jsonStore.leaderboard.push({
        id: jsonStore.leaderboard.length + 1,
        ...entry,
        created_at: new Date().toISOString()
      });
      saveJsonStore();
    }
  },

  getLeaderboard(questId, limit = 20) {
    if (useNodeSqlite) {
      let query = 'SELECT * FROM leaderboard ';
      const params = [];
      if (questId && questId !== 'all') {
        query += 'WHERE quest_id = ? ';
        params.push(questId);
      }
      query += 'ORDER BY score DESC, elapsed_seconds ASC LIMIT ?';
      params.push(limit);
      const stmt = db.prepare(query);
      return stmt.all(...params);
    } else {
      let list = jsonStore.leaderboard;
      if (questId && questId !== 'all') {
        list = list.filter(x => x.quest_id === questId);
      }
      return list
        .sort((a, b) => b.score - a.score || a.elapsed_seconds - b.elapsed_seconds)
        .slice(0, limit);
    }
  },

  // Lore / AI Knowledge Base
  addLore(item) {
    if (useNodeSqlite) {
      const stmt = db.prepare(`
        INSERT INTO lore (quest_id, topic, keywords, content)
        VALUES (?, ?, ?, ?)
      `);
      stmt.run(
        item.quest_id || null, item.topic,
        JSON.stringify(item.keywords || []),
        item.content
      );
    } else {
      jsonStore.lore.push(item);
      saveJsonStore();
    }
  },

  searchLore(query, questId) {
    const qLower = query.toLowerCase();
    let allLore = [];
    if (useNodeSqlite) {
      let sql = 'SELECT * FROM lore';
      const params = [];
      if (questId) {
        sql += ' WHERE quest_id = ? OR quest_id IS NULL';
        params.push(questId);
      }
      const stmt = db.prepare(sql);
      allLore = stmt.all(...params).map(r => ({
        ...r,
        keywords: JSON.parse(r.keywords || '[]')
      }));
    } else {
      allLore = jsonStore.lore.filter(x => !questId || x.quest_id === questId || !x.quest_id);
    }

    for (const item of allLore) {
      const keys = item.keywords || [];
      if (keys.some(k => qLower.includes(k.toLowerCase())) || (item.topic && qLower.includes(item.topic.toLowerCase()))) {
        return item.content;
      }
    }
    for (const item of allLore) {
      if (item.content.toLowerCase().includes(qLower)) {
        return item.content;
      }
    }
    return null;
  }
};

module.exports = DB;
