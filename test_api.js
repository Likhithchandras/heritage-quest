const http = require('http');

function request(method, path, data) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING HERITAGE QUEST BACKEND VERIFICATION ---');

  // 1. Quests List
  console.log('1. Testing GET /api/quests...');
  const questsRes = await request('GET', '/api/quests');
  console.log('  Quests found:', questsRes.data.quests.length);
  if (!questsRes.data.success || questsRes.data.quests.length < 6) throw new Error('Quests list failed');

  // 2. Quest Details
  console.log('2. Testing GET /api/quests/vijayanagara-royal-seal...');
  const questDetail = await request('GET', '/api/quests/vijayanagara-royal-seal');
  console.log('  Quest title:', questDetail.data.quest.title);
  console.log('  Checkpoints count:', questDetail.data.quest.checkpoints.length);
  if (!questDetail.data.success || questDetail.data.quest.checkpoints.length !== 4) throw new Error('Quest detail failed');

  // 3. Start Session
  console.log('3. Testing POST /api/sessions/start...');
  const startRes = await request('POST', '/api/sessions/start', {
    questId: 'vijayanagara-royal-seal',
    teamName: 'Hackathon Champions'
  });
  console.log('  Session ID:', startRes.data.session.id);
  const sessionId = startRes.data.session.id;

  // 4. Verify Checkpoint 0 (MCQ - King's Court - Option 1 "Jai")
  console.log('4. Testing Checkpoint 0 Verification (MCQ)...');
  const cp0Res = await request('POST', '/api/checkpoints/verify', {
    sessionId,
    checkpointIndex: 0,
    submission: 1, // "Jai"
    demoMode: true
  });
  console.log('  CP0 Result:', cp0Res.data.message, '| Points:', cp0Res.data.session.points);
  if (!cp0Res.data.success || cp0Res.data.session.points !== 100) throw new Error('CP0 failed');

  // 5. Verify Checkpoint 1 (QR Marker MASON-108)
  console.log('5. Testing Checkpoint 1 Verification (QR)...');
  const cp1Res = await request('POST', '/api/checkpoints/verify', {
    sessionId,
    checkpointIndex: 1,
    submission: 'MASON-108',
    demoMode: true,
    isScanned: true
  });
  console.log('  CP1 Result:', cp1Res.data.message, '| Points:', cp1Res.data.session.points);
  if (!cp1Res.data.success || cp1Res.data.session.points !== 200) throw new Error('CP1 failed');

  // 6. Test Hint on Checkpoint 2
  console.log('6. Testing Hint usage on CP2...');
  const hintRes = await request('POST', '/api/hints/hint', {
    sessionId,
    checkpointIndex: 2
  });
  console.log('  Hint:', hintRes.data.hint, '| Points after deduction:', hintRes.data.session.points);
  if (!hintRes.data.success || hintRes.data.session.points !== 180) throw new Error('Hint deduction failed');

  // 7. Verify Checkpoint 2 (Symbol Sequence - 0: ◆)
  console.log('7. Testing Checkpoint 2 Verification (Symbol)...');
  const cp2Res = await request('POST', '/api/checkpoints/verify', {
    sessionId,
    checkpointIndex: 2,
    submission: 0,
    demoMode: true
  });
  console.log('  CP2 Result:', cp2Res.data.message, '| Points:', cp2Res.data.session.points);
  if (!cp2Res.data.success || cp2Res.data.session.points !== 280) throw new Error('CP2 failed');

  // 8. Verify Checkpoint 3 (Dialogue - choice 1: Hidden by king)
  console.log('8. Testing Checkpoint 3 Verification (Dialogue)...');
  const cp3Res = await request('POST', '/api/checkpoints/verify', {
    sessionId,
    checkpointIndex: 3,
    submission: 1,
    demoMode: true
  });
  console.log('  CP3 Result:', cp3Res.data.message, '| Points:', cp3Res.data.session.points);
  if (!cp3Res.data.success || cp3Res.data.session.points !== 380) throw new Error('CP3 failed');

  // 9. AI Guide Ask
  console.log('9. Testing AI Guide POST /api/ai/ask...');
  const aiRes = await request('POST', '/api/ai/ask', {
    question: 'Where was the seal hidden in the fort?',
    questId: 'vijayanagara-royal-seal',
    checkpointIndex: 3
  });
  console.log('  AI Response snippet:', aiRes.data.answer.slice(0, 100) + '...');
  if (!aiRes.data.success || !aiRes.data.answer) throw new Error('AI Guide failed');

  // 10. Complete Quest (Final choice: 1 - inside armoury wall)
  console.log('10. Testing Quest Final Completion...');
  const completeRes = await request('POST', '/api/sessions/complete', {
    sessionId,
    finalChoiceIndex: 1
  });
  console.log('  Completion Status:', completeRes.data.message);
  console.log('  Total Score (+200 bonus):', completeRes.data.session.points);
  console.log('  Badges earned:', completeRes.data.badges.map(b => b.name).join(', '));
  console.log('  Cert Code:', completeRes.data.certCode);
  if (!completeRes.data.success || completeRes.data.session.points !== 580) throw new Error('Completion failed');

  // 11. Leaderboard
  console.log('11. Testing GET /api/leaderboard...');
  const lbRes = await request('GET', '/api/leaderboard?quest_id=vijayanagara-royal-seal');
  console.log('  Top team on leaderboard:', lbRes.data.leaderboard[0].team_name, 'with', lbRes.data.leaderboard[0].score, 'pts');

  // 12. Admin Stats
  console.log('12. Testing GET /api/admin/stats...');
  const adminRes = await request('GET', '/api/admin/stats');
  console.log('  Total Explorers in system:', adminRes.data.stats.totalExplorers);

  console.log('\n✅ ALL BACKEND AND GAMEPLAY API VERIFICATIONS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
