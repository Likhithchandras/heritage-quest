const fs = require('fs');
const path = require('path');
const HERITAGE_DATA = require('../public/js/heritageData.js');

function escapeSql(str) {
  if (typeof str !== 'string') return "''";
  return "'" + str.replace(/'/g, "''") + "'";
}

function formatArraySql(arr) {
  if (!Array.isArray(arr)) return "ARRAY[]::TEXT[]";
  const escaped = arr.map(s => "'" + s.replace(/'/g, "''") + "'");
  return `ARRAY[${escaped.join(', ')}]::TEXT[]`;
}

console.log('Generating Supabase seed script from 10-site Master Dataset...');

let sql = `-- ====================================================================
-- HERITAGE TREASURE HUNT — SEED DATASET (10 SITES / 50 CHECKPOINTS)
-- ====================================================================

`;

// 1. Heritage Sites
sql += `-- 1. INSERT HERITAGE SITES\n`;
HERITAGE_DATA.forEach(s => {
  sql += `INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    ${escapeSql(s.site_id)}, ${escapeSql(s.title)}, ${escapeSql(s.state)}, ${escapeSql(s.city)},
    ${escapeSql(s.location)}, ${s.coordinates.lat}, ${s.coordinates.lng},
    ${escapeSql(s.period)}, ${escapeSql(s.architectural_style)}, ${s.unesco_status ? 'TRUE' : 'FALSE'},
    ${escapeSql(s.description)}, ${escapeSql(s.story)}, ${escapeSql(s.historical_fact)},
    ${escapeSql(s.final_secret)}, ${escapeSql(s.image)}
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;\n\n`;
});

// 2. Treasure Hunts
sql += `-- 2. INSERT TREASURE HUNTS\n`;
HERITAGE_DATA.forEach(s => {
  const huntId = `HUNT-${s.site_id}`;
  sql += `INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    ${escapeSql(huntId)}, ${escapeSql(s.site_id)}, ${escapeSql(s.hunt_title)},
    ${escapeSql(s.difficulty)}, ${escapeSql(s.duration)}, ${escapeSql(s.distance)},
    ${escapeSql(s.age_group)}, ${s.total_points}, ${escapeSql(s.guide.name)},
    ${escapeSql(s.guide.role)}, ${escapeSql(s.guide.avatar)}, ${escapeSql(s.guide.greeting)}
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;\n\n`;
});

// 3. Checkpoints
sql += `-- 3. INSERT CHECKPOINTS\n`;
HERITAGE_DATA.forEach(s => {
  const huntId = `HUNT-${s.site_id}`;
  s.checkpoints.forEach(cp => {
    const cpId = `CP-${s.site_id}-${cp.checkpoint_number}`;
    sql += `INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      ${escapeSql(cpId)}, ${escapeSql(huntId)}, ${cp.checkpoint_number}, ${escapeSql(cp.title)},
      ${escapeSql(cp.landmark)}, ${cp.coordinates.lat}, ${cp.coordinates.lng},
      ${cp.geofence_radius_meters || 35}, ${escapeSql(cp.clue)}, ${escapeSql(cp.riddle)},
      ${formatArraySql(cp.accepted_answers)}, ${escapeSql(cp.hint_1)}, ${escapeSql(cp.hint_2)},
      ${escapeSql(cp.observation_challenge)}, ${escapeSql(cp.fun_question)},
      ${escapeSql(cp.question_answer)}, ${escapeSql(cp.historical_fact)},
      ${cp.points_reward}, ${escapeSql(cp.badge_title || '')}, ${escapeSql(cp.qr_code || '')}
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;\n\n`;
  });
});

// 4. Initial Global Leaderboard Seed Entries
sql += `-- 4. SEED LEADERBOARD ENTRIES\n`;
const initialLeaders = [
  { name: 'Aarav Deshmukh', site: 'IN-KA-01', hunt: "The Royal Architect's Granite Ledger", score: 1000, time: 2420 },
  { name: 'Priya Sundaram', site: 'IN-TN-01', hunt: 'The Granite Titan of the Cholas', score: 980, time: 2610 },
  { name: 'Kabir Sengupta', site: 'IN-UP-01', hunt: 'The Symphony of White Marble', score: 950, time: 2890 },
  { name: 'Sneha Tiwari', site: 'IN-GJ-01', hunt: 'The Inverted Subterranean Temple', score: 920, time: 3100 },
  { name: 'Rahul Mehta', site: 'IN-KA-04', hunt: 'The Seven-Fold Stone Trap', score: 890, time: 3450 }
];

initialLeaders.forEach(l => {
  sql += `INSERT INTO leaderboard (display_name, site_id, hunt_title, score, time_taken_seconds)
    VALUES (${escapeSql(l.name)}, ${escapeSql(l.site)}, ${escapeSql(l.hunt)}, ${l.score}, ${l.time});\n`;
});

const outPath = path.join(__dirname, 'seed.sql');
fs.writeFileSync(outPath, sql, 'utf8');

console.log(`✅ Success! Seed SQL written to ${outPath} (${(sql.length / 1024).toFixed(1)} KB)`);
