const LEVELS = [
  { min: 0,   name: "Curious Traveller" },
  { min: 150, name: "Heritage Explorer" },
  { min: 300, name: "History Detective" },
  { min: 500, name: "Cultural Adventurer" },
  { min: 800, name: "Heritage Master" }
];

function computeLevel(xp) {
  let idx = 0;
  LEVELS.forEach((l, i) => { if (xp >= l.min) idx = i; });
  return { number: idx + 1, name: LEVELS[idx].name };
}

window.AppState = {
  demoMode: true,
  currentQuestId: 'vijayanagara-royal-seal',
  currentQuest: null,
  availableQuests: [],
  sessionId: null,
  currentCheckpoint: 0,
  solved: [],
  startTime: null,
  timerInterval: null,
  finalSelected: null,
  points: 0,
  xp: 0,
  hintsUsed: 0,
  hintUsedFor: {},
  scannedQR: false,
  teamName: "Explorer Team",
  lang: "en",
  elapsedSeconds: 0,
  certData: null
};

// Global UI Notifications
function showToast(text) {
  const host = document.getElementById('toastHost');
  if (!host) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  host.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
window.showToast = showToast;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.showScreen = showScreen;

/* ---------- Language System ---------- */
function cycleLanguage() {
  const idx = LANG_ORDER.indexOf(window.AppState.lang);
  window.AppState.lang = LANG_ORDER[(idx + 1) % LANG_ORDER.length];
  applyLanguage();
}

function applyLanguage() {
  const dict = I18N[window.AppState.lang] || I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  const label = window.AppState.lang.toUpperCase();
  const btn1 = document.getElementById('langBtn');
  const btn2 = document.getElementById('langBtnIntro');
  if (btn1) btn1.textContent = label;
  if (btn2) btn2.textContent = label;
}

/* ---------- HUD & Stats ---------- */
function updateStatsHUD() {
  const elPts = document.getElementById('statPoints');
  const elXP = document.getElementById('statXP');
  const elLvl = document.getElementById('statLevel');
  const elLvlName = document.getElementById('statLevelName');

  if (elPts) elPts.textContent = window.AppState.points;
  if (elXP) elXP.textContent = window.AppState.xp;
  const lvl = computeLevel(window.AppState.xp);
  if (elLvl) elLvl.textContent = 'Lv.' + lvl.number;
  if (elLvlName) elLvlName.textContent = lvl.name;
}

function updateTimer() {
  if (!window.AppState.startTime) return;
  const s = Math.floor((Date.now() - window.AppState.startTime) / 1000);
  window.AppState.elapsedSeconds = s;
  const m = String(Math.floor(s / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  const tDisp = document.getElementById('timerDisplay');
  if (tDisp) tDisp.textContent = `${m}:${sec}`;
}

/* ---------- Progress Seals ---------- */
function buildSealRow() {
  const row = document.getElementById('sealRow');
  if (!row || !window.AppState.currentQuest) return;
  row.innerHTML = '';
  window.AppState.currentQuest.checkpoints.forEach((cp, i) => {
    const el = document.createElement('div');
    el.className = 'seal';
    el.id = 'seal-' + i;
    el.innerHTML = crestSVG();
    row.appendChild(el);
  });
}

function crestSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2" style="color:#1a1108"/>
    <path d="M12 6 L14 11 L19 12 L14 13 L12 18 L10 13 L5 12 L10 11 Z" fill="#1a1108"/>
  </svg>`;
}

function refreshSealRow() {
  if (!window.AppState.solved) return;
  window.AppState.solved.forEach((done, i) => {
    const el = document.getElementById('seal-' + i);
    if (!el) return;
    el.classList.toggle('done', done);
    el.classList.toggle('current', i === window.AppState.currentCheckpoint && !done);
  });
}

/* ---------- Quest Hub Selection ---------- */
async function loadQuestsHub() {
  const res = await API.getQuests();
  if (res && res.success && res.quests) {
    window.AppState.availableQuests = res.quests;
    renderQuestCards(res.quests);
  }
}
window.loadQuestsHub = loadQuestsHub;

function renderQuestCards(quests) {
  const host = document.getElementById('questCardList');
  if (!host) return;
  host.innerHTML = '';

  quests.forEach(q => {
    const card = document.createElement('div');
    const isSelected = q.id === window.AppState.currentQuestId;
    card.className = `quest-card ${isSelected ? 'active' : ''}`;
    card.id = `qcard-${q.id}`;
    card.onclick = () => selectQuest(q.id);
    card.innerHTML = `
      <div class="quest-meta">
        <span>📍 ${q.location || 'Heritage Site'}</span>
        <span>⏱️ ${q.est_time || '30 mins'} · ${q.difficulty || 'Medium'}</span>
      </div>
      <div class="quest-title">${q.title}</div>
      <div class="quest-loc">${q.subtitle || ''}</div>
    `;
    host.appendChild(card);
  });
}

async function selectQuest(questId) {
  window.AppState.currentQuestId = questId;
  document.querySelectorAll('.quest-card').forEach(c => c.classList.remove('active'));
  const target = document.getElementById(`qcard-${questId}`);
  if (target) target.classList.add('active');

  const res = await API.getQuest(questId);
  if (res && res.success && res.quest) {
    window.AppState.currentQuest = res.quest;
    updateBriefingTexts(res.quest);
  }
}

function updateBriefingTexts(quest) {
  const titleEl = document.getElementById('questBriefingTitle');
  const subEl = document.getElementById('questBriefingSub');
  const intro1 = document.getElementById('questIntro1');
  const intro2 = document.getElementById('questIntro2');
  const intro3 = document.getElementById('questIntro3');

  if (titleEl) titleEl.textContent = quest.title;
  if (subEl) subEl.textContent = quest.subtitle || quest.location;
  if (intro1) intro1.textContent = quest.intro_1;
  if (intro2) intro2.textContent = quest.intro_2;
  if (intro3) intro3.textContent = quest.intro_3;
}

/* ---------- Start & Restart Expedition ---------- */
async function startGame() {
  SoundFX.init();
  SoundFX.resume();

  const nameVal = document.getElementById('teamNameInput').value.trim();
  window.AppState.teamName = nameVal || "Explorer Team";

  // Create session on backend
  const res = await API.startSession(window.AppState.currentQuestId, window.AppState.teamName);
  if (res && res.success) {
    window.AppState.sessionId = res.session.id;
    window.AppState.currentQuest = res.quest;
    window.AppState.solved = new Array(res.quest.checkpoints.length).fill(false);
    window.AppState.points = 0;
    window.AppState.xp = 0;
    window.AppState.hintsUsed = 0;
    window.AppState.hintUsedFor = {};
    window.AppState.scannedQR = false;
  }

  document.getElementById('hud').classList.remove('hidden');
  buildSealRow();
  buildCheckpointScreens();

  window.AppState.startTime = Date.now();
  clearInterval(window.AppState.timerInterval);
  window.AppState.timerInterval = setInterval(updateTimer, 1000);

  updateStatsHUD();
  goToCheckpoint(0);
}

function restartGame() {
  const keepLang = window.AppState.lang;
  const keepDemo = window.AppState.demoMode;
  clearInterval(window.AppState.timerInterval);

  window.AppState = {
    demoMode: keepDemo,
    currentQuestId: window.AppState.currentQuestId,
    currentQuest: window.AppState.currentQuest,
    availableQuests: window.AppState.availableQuests,
    sessionId: null,
    currentCheckpoint: 0,
    solved: [],
    startTime: null,
    timerInterval: null,
    finalSelected: null,
    points: 0,
    xp: 0,
    hintsUsed: 0,
    hintUsedFor: {},
    scannedQR: false,
    teamName: "Explorer Team",
    lang: keepLang,
    elapsedSeconds: 0,
    certData: null
  };

  document.getElementById('hud').classList.add('hidden');
  document.getElementById('checkpointHost').innerHTML = '';
  document.getElementById('teamNameInput').value = '';
  showScreen('screen-intro');
}

/* ---------- Checkpoints Rendering & Gate Logic ---------- */
function buildCheckpointScreens() {
  const host = document.getElementById('checkpointHost');
  if (!host || !window.AppState.currentQuest) return;
  host.innerHTML = '';

  window.AppState.currentQuest.checkpoints.forEach((cp, i) => {
    const section = document.createElement('section');
    section.className = 'screen';
    section.id = 'screen-cp-' + i;
    section.innerHTML = renderCheckpointHTML(cp, i);
    host.appendChild(section);
  });
}

function renderCheckpointHTML(cp, i) {
  let gateHTML = '';

  if (cp.gate_type === 'mcq') {
    gateHTML = `
      <button class="hint-toggle" onclick="handleHint(${i})">Need a hint?</button>
      <div class="hint-box" id="hint-${i}">${cp.hint || ''}</div>
      <div class="opt-grid" id="mcqopts-${i}" style="grid-template-columns:1fr;">
        ${(cp.payload.options || []).map((o, idx) => `
          <div class="opt" style="font-size:15px; text-align:left; padding:13px 16px;" onclick="selectMCQ(${i},${idx})" id="mcqopt-${i}-${idx}">
            ${String.fromCharCode(65 + idx)}. ${o}
          </div>
        `).join('')}
      </div>
      <button class="btn" style="margin-top:14px;" onclick="submitMCQ(${i})">Submit Inscription</button>
      <div class="feedback" id="feedback-${i}"></div>
    `;
  } else if (cp.gate_type === 'qr') {
    const qrCodeVal = cp.payload && cp.payload.code ? cp.payload.code : 'HERITAGE-MARKER';
    gateHTML = `
      <div class="scan-box" id="scanbox-${i}">
        <div style="display:flex; flex-direction:column; gap:8px; align-items:center; width:100%; padding:14px;">
          <button class="btn" onclick="handleStartScanner(${i})" style="width:100%;">📷 Open Camera to Scan</button>
          <button class="btn secondary" onclick="showQRMarkerPopup('${qrCodeVal}')" style="width:100%;">👁️ Show / Test QR Marker Image</button>
        </div>
      </div>
      <div class="or-div">or tap the matching cipher on the stone</div>
      <div class="opt-grid" id="codeopts-${i}">
        ${(cp.payload.codeOptions || []).map((c, idx) => `
          <div class="opt" style="font-family:var(--mono); font-size:13.5px;" onclick="selectCode(${i},${idx})" id="codeopt-${i}-${idx}">${c}</div>
        `).join('')}
      </div>
      <button class="btn" style="margin-top:14px;" onclick="submitCode(${i})">Verify Marker</button>
      <div class="feedback" id="feedback-${i}"></div>
    `;
  } else if (cp.gate_type === 'symbol') {
    gateHTML = `
      <div class="symbol-track">
        ${(cp.payload.sequence || []).map(s => `<div class="symbol">${s}</div>`).join('')}
        <div class="symbol missing">?</div>
      </div>
      <div class="opt-grid" id="opts-${i}">
        ${(cp.payload.options || []).map((o, idx) => `
          <div class="opt" onclick="selectSymbol(${i},${idx})" id="opt-${i}-${idx}">${o}</div>
        `).join('')}
      </div>
      <div class="feedback" id="feedback-${i}" style="margin-top:10px;"></div>
      <button class="btn" style="margin-top:10px;" onclick="submitSymbol(${i})">Align Pattern</button>
    `;
  } else if (cp.gate_type === 'dialogue') {
    gateHTML = `
      <div class="dialogue">
        <div class="portrait">🗝️</div>
        <div class="speech" id="speech-${i}">${(cp.payload.lines || []).join('<br><br>')}</div>
      </div>
      <div id="choices-${i}">
        ${(cp.payload.choices || []).map((c, idx) => `
          <button class="choice" id="choice-${i}-${idx}" onclick="submitDialogue(${i},${idx})">${c.text}</button>
        `).join('')}
      </div>
      <div class="feedback" id="feedback-${i}"></div>
    `;
  }

  return `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div class="eyebrow torch">Checkpoint ${i + 1} of ${window.AppState.currentQuest.checkpoints.length}</div>
      <button class="icon-btn" onclick="SoundFX.speakText('${escapeQuotes(cp.story)}')">🔊 Read Aloud</button>
    </div>
    <h2>${cp.name}</h2>
    <div class="card">
      <p>${cp.story}</p>
    </div>
    <p><strong style="color:var(--sandstone)">Your task:</strong> ${cp.task || ''}</p>
    ${gateHTML}
  `;
}

function escapeQuotes(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function goToCheckpoint(i) {
  window.AppState.currentCheckpoint = i;
  refreshSealRow();
  showScreen('screen-cp-' + i);

  if (MapEngine.map && window.AppState.currentQuest) {
    MapEngine.renderQuestCheckpoints(
      window.AppState.currentQuest,
      i,
      window.AppState.solved
    );
  }
}

/* ---------- Hint Handling ---------- */
async function handleHint(i) {
  const box = document.getElementById('hint-' + i);
  if (box) box.classList.toggle('show');

  if (!window.AppState.hintUsedFor[i]) {
    window.AppState.hintUsedFor[i] = true;
    window.AppState.hintsUsed += 1;
    const res = await API.useHint(window.AppState.sessionId, i);
    if (res && res.success) {
      window.AppState.points = res.session.points;
      updateStatsHUD();
      showToast(`-20 pts · hint unlocked`);
    }
  }
}

/* ---------- MCQ Gate ---------- */
let mcqSelections = {};
function selectMCQ(i, idx) {
  mcqSelections[i] = idx;
  const cp = window.AppState.currentQuest.checkpoints[i];
  cp.payload.options.forEach((_, oi) => {
    const el = document.getElementById(`mcqopt-${i}-${oi}`);
    if (el) el.classList.toggle('selected', oi === idx);
  });
}

async function submitMCQ(i) {
  const fb = document.getElementById('feedback-' + i);
  if (mcqSelections[i] === undefined) {
    fb.textContent = 'Select an option first.';
    fb.className = 'feedback err';
    SoundFX.playError();
    return;
  }

  const res = await API.verifyCheckpoint(
    window.AppState.sessionId,
    i,
    mcqSelections[i],
    MapEngine.userLocation,
    window.AppState.demoMode,
    false
  );

  handleVerificationResult(i, res, fb);
}

/* ---------- QR Gate ---------- */
let codeSelections = {};
function selectCode(i, idx) {
  codeSelections[i] = idx;
  const cp = window.AppState.currentQuest.checkpoints[i];
  cp.payload.codeOptions.forEach((_, ci) => {
    const el = document.getElementById(`codeopt-${i}-${ci}`);
    if (el) el.classList.toggle('selected', ci === idx);
  });
}

function handleStartScanner(i) {
  QRScanner.start(i, (scannedCode) => {
    window.AppState.scannedQR = true;
    verifyCodeSubmission(i, scannedCode, true);
  });
}

function submitCode(i) {
  const cp = window.AppState.currentQuest.checkpoints[i];
  let val = codeSelections[i] !== undefined ? cp.payload.codeOptions[codeSelections[i]] : null;
  verifyCodeSubmission(i, val, false);
}

async function verifyCodeSubmission(i, codeVal, isScanned) {
  const fb = document.getElementById('feedback-' + i);
  if (!codeVal) {
    fb.textContent = 'Scan the QR marker or tap a code first.';
    fb.className = 'feedback err';
    SoundFX.playError();
    return;
  }

  const res = await API.verifyCheckpoint(
    window.AppState.sessionId,
    i,
    codeVal,
    MapEngine.userLocation,
    window.AppState.demoMode,
    isScanned
  );

  handleVerificationResult(i, res, fb);
}

/* ---------- Symbol Gate ---------- */
let symbolSelections = {};
function selectSymbol(i, idx) {
  symbolSelections[i] = idx;
  const cp = window.AppState.currentQuest.checkpoints[i];
  cp.payload.options.forEach((_, oi) => {
    const el = document.getElementById(`opt-${i}-${oi}`);
    if (el) el.classList.toggle('selected', oi === idx);
  });
}

async function submitSymbol(i) {
  const fb = document.getElementById('feedback-' + i);
  if (symbolSelections[i] === undefined) {
    fb.textContent = 'Select a symbol to complete the pattern.';
    fb.className = 'feedback err';
    SoundFX.playError();
    return;
  }

  const res = await API.verifyCheckpoint(
    window.AppState.sessionId,
    i,
    symbolSelections[i],
    MapEngine.userLocation,
    window.AppState.demoMode,
    false
  );

  handleVerificationResult(i, res, fb);
}

/* ---------- Dialogue Gate ---------- */
async function submitDialogue(i, idx) {
  const fb = document.getElementById('feedback-' + i);
  const res = await API.verifyCheckpoint(
    window.AppState.sessionId,
    i,
    idx,
    MapEngine.userLocation,
    window.AppState.demoMode,
    false
  );

  const btn = document.getElementById(`choice-${i}-${idx}`);
  if (res && res.success) {
    if (btn) btn.classList.add('right');
    handleVerificationResult(i, res, fb);
  } else {
    if (btn) btn.classList.add('wrong');
    fb.textContent = res ? res.message : 'The guardian rejects your answer.';
    fb.className = 'feedback err';
    SoundFX.playError();
  }
}

/* ---------- Common Verification Handler ---------- */
function handleVerificationResult(i, res, fb) {
  if (res && res.success) {
    fb.textContent = res.message || 'Verified!';
    fb.className = 'feedback ok';
    SoundFX.playSuccess();
    SoundFX.playSealPop();

    window.AppState.solved[i] = true;
    window.AppState.points = res.session.points;
    window.AppState.xp = res.session.xp;

    updateStatsHUD();
    refreshSealRow();
    showToast(`+${res.pointsEarned || 100} pts · Checkpoint Solved!`);

    setTimeout(() => {
      if (i < window.AppState.currentQuest.checkpoints.length - 1) {
        goToCheckpoint(i + 1);
      } else {
        showFinalReconstruction();
      }
    }, 1100);
  } else {
    SoundFX.playError();
    fb.textContent = res ? res.message : 'Verification failed';
    fb.className = 'feedback err';
  }
}

/* ---------- Final Reconstruction Screen ---------- */
function showFinalReconstruction() {
  const list = document.getElementById('fragList');
  const quest = window.AppState.currentQuest;
  if (!list || !quest) return;

  list.innerHTML = quest.checkpoints.map(cp => `<li>${cp.fragment}</li>`).join('');

  const optHost = document.getElementById('finalOptions');
  optHost.innerHTML = (quest.final_options || []).map((opt, idx) => `
    <div class="final-opt" id="final-${idx}" onclick="selectFinalOption(${idx})">
      <div class="mark"></div><div>${opt}</div>
    </div>
  `).join('');

  showScreen('screen-final');
}

function selectFinalOption(idx) {
  window.AppState.finalSelected = idx;
  const quest = window.AppState.currentQuest;
  quest.final_options.forEach((_, i) => {
    const el = document.getElementById('final-' + i);
    if (el) el.classList.toggle('selected', i === idx);
  });
}

async function submitFinalDeduction() {
  const fb = document.getElementById('finalFeedback');
  if (window.AppState.finalSelected === null) {
    fb.textContent = 'Choose where the treasure/seal was hidden.';
    fb.className = 'feedback err';
    SoundFX.playError();
    return;
  }

  const res = await API.completeQuest(window.AppState.sessionId, window.AppState.finalSelected);
  if (res && res.success) {
    SoundFX.playSuccess();
    finishExpedition(res);
  } else {
    SoundFX.playError();
    fb.textContent = res ? res.message : 'That deduction does not fit the fragments.';
    fb.className = 'feedback err';
  }
}

/* ---------- Expedition Complete Screen ---------- */
function finishExpedition(res) {
  clearInterval(window.AppState.timerInterval);

  const quest = window.AppState.currentQuest;
  const session = res.session;
  window.AppState.points = session.points;
  window.AppState.xp = session.xp;
  window.AppState.elapsedSeconds = session.elapsed_seconds;

  const m = String(Math.floor(session.elapsed_seconds / 60)).padStart(2, '0');
  const sec = String(session.elapsed_seconds % 60).padStart(2, '0');
  const timeStr = `${m}:${sec}`;

  const cTime = document.getElementById('completeTime');
  if (cTime) cTime.textContent = `Solved in ${timeStr}`;

  const cTitle = document.getElementById('completeTitle');
  if (cTitle) cTitle.textContent = quest.completion_title || 'The Seal is Found';

  const cBody = document.getElementById('completeBody');
  if (cBody) cBody.textContent = quest.completion_body || 'You have uncovered the truth in the architecture.';

  // Seal SVG animation
  const sealRev = document.getElementById('sealReveal');
  if (sealRev) {
    sealRev.innerHTML = `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="92" fill="#8b2635"/>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#e8934a" stroke-width="2"/>
        <circle cx="100" cy="100" r="78" fill="none" stroke="#c9a468" stroke-width="1.5"/>
        <path d="M100 40 L112 85 L158 100 L112 115 L100 160 L88 115 L42 100 L88 85 Z" fill="#e8934a"/>
        <circle cx="100" cy="100" r="14" fill="#8b2635" stroke="#e8934a" stroke-width="2"/>
      </svg>
    `;
  }

  const lvl = computeLevel(session.xp);
  const compStats = document.getElementById('completeStats');
  if (compStats) {
    compStats.innerHTML = `
      <div class="chip"><div class="chip-val">${session.points}</div><div class="chip-lbl">Points</div></div>
      <div class="chip"><div class="chip-val">${session.xp}</div><div class="chip-lbl">XP</div></div>
      <div class="chip"><div class="chip-val">Lv.${lvl.number}</div><div class="chip-lbl">${lvl.name}</div></div>
    `;
  }

  const badgeHost = document.getElementById('badgeGrid');
  if (badgeHost && res.badges) {
    badgeHost.innerHTML = res.badges.map(b => `
      <div class="badge-item">
        <div class="b-icon">${b.icon}</div>
        <div class="b-name">${b.name}</div>
        <div class="b-desc">${b.desc}</div>
      </div>
    `).join('');
  }

  // Store cert data
  window.AppState.certData = {
    teamName: session.team_name,
    questTitle: quest.title,
    score: session.points,
    timeStr: timeStr,
    badgesCount: res.badges ? res.badges.length : 4,
    certCode: res.certCode || 'HQ-VERIFIED'
  };

  document.getElementById('hud').classList.add('hidden');
  showScreen('screen-complete');
}

/* ---------- Certificate Modal & Download ---------- */
function viewCertificate() {
  if (!window.AppState.certData) return;
  showScreen('screen-certificate');
  CertificateGenerator.render('certCanvas', window.AppState.certData);
}
window.viewCertificate = viewCertificate;

function downloadCertPNG() {
  CertificateGenerator.download('certCanvas', `Heritage-Quest-Certificate-${window.AppState.teamName.replace(/\s+/g, '_')}.png`);
}
window.downloadCertPNG = downloadCertPNG;

/* ---------- Leaderboard ---------- */
async function openLeaderboard() {
  const res = await API.getLeaderboard(window.AppState.currentQuestId);
  const host = document.getElementById('lbList');
  if (!host) return;

  if (res && res.success && res.leaderboard) {
    host.innerHTML = res.leaderboard.map((entry, idx) => `
      <div class="lb-row ${entry.team_name === window.AppState.teamName && entry.score === window.AppState.points ? 'me' : ''}">
        <div class="lb-rank">#${idx + 1}</div>
        <div class="lb-name">${entry.team_name}</div>
        <div class="lb-score">${entry.score} pts</div>
      </div>
    `).join('');
  } else {
    host.innerHTML = '<div style="font-size:13px; color:var(--muted); text-align:center;">No leaderboard entries yet.</div>';
  }

  showScreen('screen-leaderboard');
}
window.openLeaderboard = openLeaderboard;

/* ---------- Radar Map Modal ---------- */
function openMapModal() {
  const modal = document.getElementById('mapModal');
  if (modal) {
    modal.classList.add('open');
    MapEngine.init('leafletMap');
    MapEngine.invalidateSize();
    if (window.AppState.currentQuest) {
      MapEngine.renderQuestCheckpoints(
        window.AppState.currentQuest,
        window.AppState.currentCheckpoint,
        window.AppState.solved
      );
    }
  }
}
window.openMapModal = openMapModal;

function closeMapModal() {
  const modal = document.getElementById('mapModal');
  if (modal) modal.classList.remove('open');
}
window.closeMapModal = closeMapModal;

/* ---------- Game Master & Demo Switch ---------- */
function toggleDemo() {
  window.AppState.demoMode = !window.AppState.demoMode;
  const sw = document.getElementById('demoSwitch');
  if (sw) sw.classList.toggle('on', window.AppState.demoMode);
  showToast(window.AppState.demoMode ? 'Demo Mode Enabled (GPS checks bypassed)' : 'Demo Mode Disabled (Live GPS enforced)');
}
window.toggleDemo = toggleDemo;

function openGMPanel() {
  const sw = document.getElementById('demoSwitch');
  if (sw) sw.classList.toggle('on', window.AppState.demoMode);
  if (window.AppState.currentQuest) {
    QuestBuilder.renderGMPanel(window.AppState.currentQuest);
  }
  showScreen('screen-gm');
}
window.openGMPanel = openGMPanel;

function showQRMarkerPopup(codeVal) {
  const modal = document.getElementById('qrModal');
  const canvas = document.getElementById('qrModalCanvas');
  const codeText = document.getElementById('qrModalCode');
  if (modal && canvas && window.QRCode) {
    QRCode.toCanvas(canvas, codeVal, {
      width: 220,
      margin: 1,
      color: { dark: '#14121a', light: '#ffffff' }
    });
    if (codeText) codeText.textContent = codeVal;
    modal.classList.add('open');
  }
}
window.showQRMarkerPopup = showQRMarkerPopup;

function closeQRModal() {
  const modal = document.getElementById('qrModal');
  if (modal) modal.classList.remove('open');
}
window.closeQRModal = closeQRModal;

/* ---------- Document Ready ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  await loadQuestsHub();
  if (window.AppState.availableQuests.length > 0) {
    selectQuest(window.AppState.availableQuests[0].id);
  }
  applyLanguage();
  updateStatsHUD();

  // Service Worker Registration for offline resilience
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
});
