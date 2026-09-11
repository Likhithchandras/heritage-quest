/**
 * HERITAGE QUEST PRODUCTION APPLICATION CONTROLLER
 * Supports:
 * - 10 National Heritage Sites & 50 Checkpoints
 * - Client-side Fuzzy String Matching (Typos, Accents, Case normalization)
 * - GPS Geofencing Distance Radar & Walk Simulator
 * - Web Speech API Audio Guide Synthesizer
 * - Leaflet Map Integration with custom UNESCO markers
 * - HTML5 Canvas High-Res Certificate Generator with PNG Export
 * - Badges & Multi-hunt Explorer Profile
 */

// Global State
const State = {
  currentView: 'view-landing',
  selectedSite: HERITAGE_DATA[0],
  currentStep: 0,
  xp: 350,
  huntsCompleted: 0,
  placesExplored: 3,
  hintsUsedInStep: 0,
  userLocation: { lat: 15.3350, lng: 76.4600 },
  simulatedWalk: true,
  leafletMap: null,
  mapMarkers: [],
  activeFilter: 'ALL',
  speechSynth: window.speechSynthesis || null,
  isSpeaking: false,
  completedHunts: [],
  unlockedBadges: new Set(['Monolith Tracker', 'Gate Sentry']),
  badgesCatalog: [
    { id: 'b_mono', title: 'Monolith Tracker', site: 'Hampi', icon: '🪨', desc: 'Discovered the hidden lap carving behind Sasivekalu Ganesha.' },
    { id: 'b_optics', title: 'Optics Historian', site: 'Hampi', icon: '🔍', desc: 'Identified the pinhole camera effect inside Virupaksha Temple.' },
    { id: 'b_hampi_master', title: 'Master of Vijayanagara', site: 'Hampi', icon: '👑', desc: 'Completed all 5 checkpoints of the Royal Architect’s Ledger.' },
    { id: 'b_mys_crest', title: 'Royal Keeper of the Seal', site: 'Mysore Palace', icon: '🦚', desc: 'Found the Gandaberunda two-headed bird insignia.' },
    { id: 'b_mys_lumi', title: 'Wadiyar Luminary', site: 'Mysore Palace', icon: '💡', desc: 'Decoded the 100,000 bulb illumination perimeter.' },
    { id: 'b_blr_tudor', title: 'Tudor Explorer', site: 'Bengaluru Palace', icon: '🏰', desc: 'Discovered the Windsor Castle architectural connection.' },
    { id: 'b_chitra_tact', title: 'Rampart Tactician', site: 'Chitradurga', icon: '🛡️', desc: 'Analyzed three-tier defensive chicanes and archer ports.' },
    { id: 'b_chitra_hero', title: 'Hero of the Pestle', site: 'Chitradurga', icon: '🌾', desc: 'Followed the path of Onake Obavva at the secret rock cleft.' },
    { id: 'b_badami_nat', title: 'Cosmic Rhythm Master', site: 'Badami', icon: '🗿', desc: 'Decoded the 81 Karanas of the 18-armed Nataraja relief.' },
    { id: 'b_belur_darp', title: 'Connoisseur of Hoysala Art', site: 'Belur', icon: '✨', desc: 'Found Darpana Sundari and undercut soapstone filigree.' },
    { id: 'b_taj_gate', title: 'Gate of Paradise Explorer', site: 'Taj Mahal', icon: '🕌', desc: 'Experienced the reverse optical perspective of Darwaza-i-Rauza.' },
    { id: 'b_taj_cal', title: 'Imperial Calligrapher', site: 'Taj Mahal', icon: '🖋️', desc: 'Identified dynamic Quranic calligraphy font scaling.' },
    { id: 'b_red_aam', title: 'Voice of the People', site: 'Red Fort', icon: '🦅', desc: 'Explored Diwan-i-Aam and Florentine Orpheus pietra dura.' },
    { id: 'b_rani_path', title: 'Subterranean Pathfinder', site: 'Rani ki Vav', icon: '💧', desc: 'Descended 7 tiers into the subterranean Maru-Gurjara stepwell.' },
    { id: 'b_brih_kumb', title: 'Titan of the Cholas', site: 'Brihadeeswarar', icon: '🔱', desc: 'Calculated the 4km ramp used for the 80-ton monolithic Kumbam.' }
  ]
};

/* ============================================================
   ROUTING & NAVIGATION
   ============================================================ */
function navTo(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');

  // Update navigation highlights
  document.querySelectorAll('.nav-link, .mnav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === viewId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  State.currentView = viewId;

  if (viewId === 'view-map') {
    initLeafletMap();
  } else if (viewId === 'view-explore') {
    renderExploreGrid();
  } else if (viewId === 'view-leaderboard') {
    renderLeaderboard();
  } else if (viewId === 'view-profile') {
    renderProfile();
  }
}

/* ============================================================
   EXPLORE PAGE & FILTERING
   ============================================================ */
function setSiteFilter(filterCategory, chipEl) {
  State.activeFilter = filterCategory;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (chipEl) chipEl.classList.add('active');
  renderExploreGrid();
}

function renderExploreGrid() {
  const host = document.getElementById('exploreGridHost');
  if (!host) return;

  const filtered = HERITAGE_DATA.filter(site => {
    if (State.activeFilter === 'ALL') return true;
    if (State.activeFilter === 'UNESCO') return site.unesco_status;
    if (State.activeFilter === 'KARNATAKA') return site.state.toLowerCase().includes('karnataka');
    if (State.activeFilter === 'NORTH') return site.state.includes('Delhi') || site.state.includes('Uttar Pradesh');
    if (State.activeFilter === 'WEST_SOUTH') return site.state.includes('Gujarat') || site.state.includes('Tamil Nadu');
    return true;
  });

  host.innerHTML = filtered.map(s => `
    <div class="m-card">
      <div class="m-card-img" onclick="openSiteDetails('${s.id}')" style="cursor:pointer;">
        <img src="${s.image}" alt="${s.title}" loading="lazy" />
        <div class="m-diff">${s.difficulty.toUpperCase()}</div>
        ${s.unesco_status ? '<div class="m-badge-unesco">★ UNESCO HERITAGE</div>' : ''}
        <div class="m-state-pill">${s.state}</div>
      </div>
      <div class="m-card-body">
        <div class="m-period">${s.period}</div>
        <h3 class="m-title" onclick="openSiteDetails('${s.id}')" style="cursor:pointer;">${s.title}</h3>
        <p class="m-quest-title"><b>Quest:</b> ${s.hunt_title}</p>
        <p class="m-desc">${s.description.substring(0, 105)}...</p>
        
        <div class="m-meta-row">
          <span>📍 ${s.checkpoints.length} Stations</span>
          <span>⏱ ${s.duration}</span>
          <span>🚶 ${s.distance}</span>
        </div>

        <div class="m-guide-preview">
          <span class="m-guide-avatar">${s.guide.avatar}</span>
          <span class="m-guide-name">${s.guide.name} (${s.guide.role})</span>
        </div>

        <div class="m-card-actions">
          <button class="btn-gold" style="width:100%;padding:10px;font-size:12.5px;" onclick="openSiteDetails('${s.id}')">
            EXPLORE QUEST →
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   SITE DETAILS VIEW
   ============================================================ */
function openSiteDetails(siteId) {
  const site = HERITAGE_DATA.find(x => x.id === siteId) || HERITAGE_DATA[0];
  State.selectedSite = site;

  document.getElementById('detailsImg').src = site.image;
  document.getElementById('detailsTitle').textContent = site.title;
  document.getElementById('detailsHuntTitle').textContent = `Quest: "${site.hunt_title}"`;
  document.getElementById('detailsLocation').textContent = `${site.location} · ${site.state}`;
  document.getElementById('detailsPeriod').textContent = site.period;
  document.getElementById('detailsStyle').textContent = site.architectural_style;
  document.getElementById('detailsDuration').textContent = site.duration;
  document.getElementById('detailsDistance').textContent = site.distance;
  document.getElementById('detailsDifficulty').textContent = site.difficulty;
  document.getElementById('detailsStationsCount').textContent = `${site.checkpoints.length} Stations`;
  document.getElementById('detailsStory').textContent = site.story;
  document.getElementById('detailsHistFact').textContent = site.historical_fact;

  // Guide Preview
  document.getElementById('detailsGuideAvatar').textContent = site.guide.avatar;
  document.getElementById('detailsGuideName').textContent = site.guide.name;
  document.getElementById('detailsGuideRole').textContent = site.guide.role;
  document.getElementById('detailsGuideGreeting').textContent = `"${site.guide.greeting}"`;

  // Checkpoints preview list
  const listHost = document.getElementById('detailsCheckpointsList');
  if (listHost) {
    listHost.innerHTML = site.checkpoints.map((cp, i) => `
      <div class="cp-preview-item">
        <div class="cp-num-badge">0${cp.checkpoint_number}</div>
        <div class="cp-info">
          <h4>${cp.title}</h4>
          <p>${cp.landmark} · Target: +${cp.points_reward} XP · Badge: <i>${cp.badge_title || 'Observation'}</i></p>
        </div>
      </div>
    `).join('');
  }

  navTo('view-details');
}

/* ============================================================
   ACTIVE HUNT ENGINE
   ============================================================ */
function startSelectedHunt() {
  State.currentStep = 0;
  State.hintsUsedInStep = 0;
  renderHuntStep();
  navTo('view-hunt');
  speakGuideGreeting();
}

function renderHuntStep() {
  const site = State.selectedSite;
  const cp = site.checkpoints[State.currentStep];
  const total = site.checkpoints.length;
  const num = State.currentStep + 1;

  State.hintsUsedInStep = 0;

  // Header & Step counters
  document.getElementById('huntStepText').textContent = `CHECKPOINT 0${num} / 0${total}`;
  document.getElementById('huntMonumentName').textContent = site.title;
  const progressPercent = ((num - 1) / total) * 100;
  document.getElementById('huntProgressBar').style.width = `${progressPercent}%`;

  // Guide speech bubble
  document.getElementById('huntGuideAvatar').textContent = site.guide.avatar;
  document.getElementById('huntGuideName').textContent = `${site.guide.name} (${site.guide.role})`;
  document.getElementById('huntGuideDialogue').textContent = `"${cp.clue}"`;

  // Clue & Landmark details
  document.getElementById('clueStationTitle').textContent = `Station ${num}: ${cp.title}`;
  document.getElementById('clueLandmarkText').textContent = `📍 Landmark: ${cp.landmark}`;
  document.getElementById('clueRiddleText').textContent = cp.riddle;

  // Reset hint box & input
  document.getElementById('hintBox').style.display = 'none';
  document.getElementById('hintBtn1').disabled = false;
  document.getElementById('hintBtn2').disabled = false;
  document.getElementById('hintBtn1').textContent = '💡 Request Hint 1 (-15 XP)';
  document.getElementById('hintBtn2').textContent = '💡 Request Hint 2 (-30 XP)';

  // Observation Challenge text
  document.getElementById('observationChallengeText').textContent = `🔍 Physical Challenge: ${cp.observation_challenge}`;

  // Reset input field & celebration box
  const inputEl = document.getElementById('playerAnswerInput');
  if (inputEl) {
    inputEl.value = '';
    inputEl.disabled = false;
  }
  document.getElementById('submitAnswerBtn').disabled = false;
  document.getElementById('celebrateBox').classList.remove('show');
  document.getElementById('nextClueBtn').style.display = 'none';

  // Update distance radar
  updateDistanceRadar();
}

/* ============================================================
   DISTANCE RADAR & GEOFENCING
   ============================================================ */
function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

function updateDistanceRadar() {
  const cp = State.selectedSite.checkpoints[State.currentStep];
  const radarText = document.getElementById('radarDistanceText');
  const radarStatus = document.getElementById('radarStatusPill');
  const radarCircle = document.getElementById('radarPulseCircle');

  let distance = 0;
  if (State.simulatedWalk) {
    distance = 18; // Simulated walking inside geofence
  } else {
    distance = calculateDistanceMeters(
      State.userLocation.lat,
      State.userLocation.lng,
      cp.coordinates.lat,
      cp.coordinates.lng
    );
  }

  if (distance <= cp.geofence_radius_meters) {
    radarText.textContent = `🎯 Verified on-site: ~${distance}m from ${cp.title}`;
    radarStatus.textContent = 'GEOFENCE IN RANGE (OBSERVE MONUMENT)';
    radarStatus.className = 'radar-pill in-range';
    if (radarCircle) radarCircle.className = 'radar-pulse-dot green';
  } else {
    radarText.textContent = `🚶 ~${distance > 1000 ? (distance/1000).toFixed(1) + ' km' : distance + 'm'} away from ${cp.title}`;
    radarStatus.textContent = 'WALK CLOSER TO TARGET (OR ENABLE SIMULATOR)';
    radarStatus.className = 'radar-pill approaching';
    if (radarCircle) radarCircle.className = 'radar-pulse-dot amber';
  }
}

function toggleGpsMode() {
  State.simulatedWalk = !State.simulatedWalk;
  const btn = document.getElementById('toggleGpsBtn');
  if (State.simulatedWalk) {
    btn.textContent = '🛰️ Mode: GPS Walk Simulator (Active)';
    showToast('GPS Simulator active: Stand directly at checkpoint.');
  } else {
    btn.textContent = '📡 Mode: Real Device GPS';
    requestRealDeviceLocation();
  }
  updateDistanceRadar();
}

function requestRealDeviceLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        State.userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        updateDistanceRadar();
        showToast(`Device location updated (Accuracy: ±${Math.round(pos.coords.accuracy)}m)`);
      },
      err => {
        showToast('GPS unavailable. Reverting to simulator mode.');
        State.simulatedWalk = true;
        updateDistanceRadar();
      }
    );
  }
}

/* ============================================================
   OFFLINE FUZZY STRING MATCHER & NORMALIZATION
   ============================================================ */
function normalizeAnswerString(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/gi, ' ')
    .replace(/\b(the|a|an|of|in|at|lord|goddess|temple|king|queen)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshteinDistance(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function verifyPlayerAnswer() {
  const inputEl = document.getElementById('playerAnswerInput');
  const rawInput = inputEl ? inputEl.value : '';
  const cleanInput = normalizeAnswerString(rawInput);

  if (!cleanInput) {
    showToast('Please type your observation answer first!');
    return;
  }

  const cp = State.selectedSite.checkpoints[State.currentStep];
  const acceptedList = cp.accepted_answers.map(ans => normalizeAnswerString(ans));

  // 1. Direct exact or substring match
  let isCorrect = acceptedList.some(target => {
    if (cleanInput === target) return true;
    if (cleanInput.length >= 3 && target.includes(cleanInput)) return true;
    if (target.length >= 3 && cleanInput.includes(target)) return true;
    return false;
  });

  // 2. Fuzzy Levenshtein tolerance
  if (!isCorrect) {
    isCorrect = acceptedList.some(target => {
      const dist = levenshteinDistance(cleanInput, target);
      const maxLen = Math.max(cleanInput.length, target.length);
      return (dist / maxLen) <= 0.32; // 68%+ similarity
    });
  }

  if (isCorrect) {
    triggerStepSuccess(cp);
  } else {
    showToast('Not quite! Look closer at the carvings or request a hint.');
  }
}

/* ============================================================
   STEP SUCCESS & PROGRESSION
   ============================================================ */
function triggerStepSuccess(cp) {
  let earned = cp.points_reward;
  if (State.hintsUsedInStep === 1) earned -= 15;
  if (State.hintsUsedInStep >= 2) earned -= 30;
  if (earned < 50) earned = 50;

  State.xp += earned;
  refreshXPDisplays();

  // Unlock badge
  if (cp.badge_title) {
    State.unlockedBadges.add(cp.badge_title);
  }

  // Populate celebrate box
  document.getElementById('celebratePointsEarned').textContent = `+${earned} XP Earned!`;
  document.getElementById('celebrateHistoricalFact').textContent = cp.historical_fact;
  document.getElementById('celebrateFunQ').textContent = `❓ Did you know? ${cp.fun_question}`;
  document.getElementById('celebrateFunA').textContent = `💡 ${cp.question_answer}`;
  
  if (cp.badge_title) {
    document.getElementById('celebrateBadgeTag').textContent = `🏆 Badge Unlocked: ${cp.badge_title}`;
    document.getElementById('celebrateBadgeTag').style.display = 'inline-block';
  } else {
    document.getElementById('celebrateBadgeTag').style.display = 'none';
  }

  document.getElementById('celebrateBox').classList.add('show');
  document.getElementById('submitAnswerBtn').disabled = true;
  document.getElementById('playerAnswerInput').disabled = true;

  const nextBtn = document.getElementById('nextClueBtn');
  nextBtn.style.display = 'block';

  const total = State.selectedSite.checkpoints.length;
  const num = State.currentStep + 1;
  document.getElementById('huntProgressBar').style.width = `${(num / total) * 100}%`;

  if (num >= total) {
    nextBtn.textContent = '🗝️ REVEAL FINAL ARCHITECTURAL SECRET →';
    nextBtn.onclick = finishEntireHunt;
  } else {
    nextBtn.textContent = 'CONTINUE TO NEXT STATION →';
    nextBtn.onclick = advanceToNextStep;
  }

  // Play guide congratulation voice
  speakText(`Excellent observation, explorer! You discovered the answer: ${cp.accepted_answers[0]}.`);
}

function advanceToNextStep() {
  State.currentStep++;
  renderHuntStep();
}

function finishEntireHunt() {
  const site = State.selectedSite;
  State.xp += 250; // Completion bonus
  State.huntsCompleted++;
  refreshXPDisplays();

  State.completedHunts.unshift({
    id: site.id,
    title: site.title,
    hunt_title: site.hunt_title,
    date: new Date().toLocaleDateString('en-IN'),
    score: `${site.total_points} XP`,
    badge: site.checkpoints[site.checkpoints.length - 1].badge_title || 'Master Explorer'
  });

  document.getElementById('certMonumentTitle').textContent = site.title;
  document.getElementById('certHuntTitle').textContent = `Quest: "${site.hunt_title}"`;
  document.getElementById('certFinalText').textContent = site.final_secret;
  document.getElementById('certScore').textContent = `${State.xp} XP`;

  drawCertificateCanvas();
  navTo('view-certificate');
}

/* ============================================================
   PROGRESSIVE HINTS
   ============================================================ */
function requestHint(level) {
  const cp = State.selectedSite.checkpoints[State.currentStep];
  const hintBox = document.getElementById('hintBox');
  const hintText = document.getElementById('hintContentText');

  hintBox.style.display = 'block';
  if (level === 1) {
    State.hintsUsedInStep = Math.max(State.hintsUsedInStep, 1);
    hintText.textContent = `💡 Hint 1: ${cp.hint_1}`;
    document.getElementById('hintBtn1').disabled = true;
    showToast('Hint 1 unlocked (-15 XP potential penalty)');
  } else if (level === 2) {
    State.hintsUsedInStep = Math.max(State.hintsUsedInStep, 2);
    hintText.textContent = `💡 Hint 2: ${cp.hint_2}`;
    document.getElementById('hintBtn2').disabled = true;
    showToast('Hint 2 unlocked (-30 XP potential penalty)');
  }
}

/* ============================================================
   WEB SPEECH API AUDIO GUIDE
   ============================================================ */
function speakGuideGreeting() {
  const cp = State.selectedSite.checkpoints[State.currentStep];
  speakText(`${State.selectedSite.guide.name} says: ${cp.clue}`);
}

function speakText(text) {
  if (!State.speechSynth) return;
  State.speechSynth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.05;
  utterance.lang = 'en-IN';

  utterance.onstart = () => {
    State.isSpeaking = true;
    updateAudioBtnIcon();
  };
  utterance.onend = () => {
    State.isSpeaking = false;
    updateAudioBtnIcon();
  };

  State.speechSynth.speak(utterance);
}

function toggleAudioGuide() {
  if (State.isSpeaking) {
    State.speechSynth.cancel();
    State.isSpeaking = false;
    updateAudioBtnIcon();
  } else {
    const cp = State.selectedSite.checkpoints[State.currentStep];
    speakText(`Station ${State.currentStep + 1}: ${cp.title}. ${cp.riddle}. Hint one: ${cp.hint_1}`);
  }
}

function updateAudioBtnIcon() {
  const btn = document.getElementById('audioGuideBtn');
  if (btn) {
    btn.innerHTML = State.isSpeaking ? '🔊 Playing Audio Narration...' : '🎧 Listen to Audio Guide';
  }
}

/* ============================================================
   LEAFLET PAN-INDIA INTERACTIVE MAP
   ============================================================ */
function initLeafletMap() {
  if (State.leafletMap || !window.L) return;

  setTimeout(() => {
    const map = L.map('leafletMapContainer', {
      center: [20.5937, 78.9629],
      zoom: 5,
      scrollWheelZoom: true
    });
    State.leafletMap = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);

    const makePin = emoji => L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="font-size:24px;filter:drop-shadow(0 3px 6px rgba(0,0,0,.45));">${emoji}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    HERITAGE_DATA.forEach(site => {
      const marker = L.marker([site.coordinates.lat, site.coordinates.lng], {
        icon: makePin(site.guide.avatar)
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:4px;">
          <h4 style="font-family:'Cinzel',serif;color:#173F35;margin-bottom:3px;">${site.title}</h4>
          <p style="font-size:12px;color:#756F64;margin-bottom:6px;">${site.location} · <b>${site.checkpoints.length} Stations</b></p>
          <button onclick="openSiteDetails('${site.id}')" style="background:#C89B3C;color:#1a1205;border:none;padding:6px 14px;border-radius:20px;font-weight:700;font-size:11px;cursor:pointer;">
            EXPLORE QUEST →
          </button>
        </div>
      `);
      State.mapMarkers.push(marker);
    });
  }, 200);
}

/* ============================================================
   CANVAS CERTIFICATE GENERATOR & PNG EXPORT
   ============================================================ */
function drawCertificateCanvas() {
  const canvas = document.getElementById('certCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 900, H = 640;
  canvas.width = W;
  canvas.height = H;

  // Parchment Background Gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#fdfaf2');
  bg.addColorStop(1, '#ebe0cb');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Outer Gold Filigree Border
  ctx.strokeStyle = '#C89B3C';
  ctx.lineWidth = 8;
  ctx.strokeRect(18, 18, W - 36, H - 36);

  // Inner Heritage Green Border
  ctx.strokeStyle = '#173F35';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  ctx.textAlign = 'center';

  // Header Eyebrow
  ctx.fillStyle = '#756F64';
  ctx.font = 'bold 12px "Space Mono", monospace';
  ctx.fillText('NATIONAL HERITAGE EXPLORATION GUILD · ASI GEOFENCED DISCOVERY RECORD', W / 2, 65);

  // Main Title
  ctx.fillStyle = '#173F35';
  ctx.font = 'bold 30px "Cinzel", Georgia, serif';
  ctx.fillText('CERTIFICATE OF ARCHITECTURAL MASTERY', W / 2, 115);

  // Divider Line
  ctx.strokeStyle = '#C89B3C';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 130);
  ctx.lineTo(W - 100, 130);
  ctx.stroke();

  // Recipient Line
  ctx.fillStyle = '#5a4f42';
  ctx.font = 'italic 16px Georgia, serif';
  ctx.fillText('This certifies that the observant explorer has physically navigated and solved', W / 2, 168);

  // Monument Title
  const site = State.selectedSite;
  ctx.fillStyle = '#B85C38';
  ctx.font = 'bold 26px "Cinzel", Georgia, serif';
  ctx.fillText(site.title.toUpperCase(), W / 2, 210);

  ctx.fillStyle = '#173F35';
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Quest: "${site.hunt_title}"`, W / 2, 240);

  // Score & Achievement Matrix
  ctx.fillStyle = 'rgba(200, 155, 60, 0.14)';
  ctx.beginPath();
  ctx.roundRect(80, 265, W - 160, 85, 12);
  ctx.fill();
  ctx.strokeStyle = '#C89B3C';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#173F35';
  ctx.font = 'bold 22px "Space Mono", monospace';
  ctx.fillText(`${State.xp} XP`, W / 2 - 240, 312);
  ctx.fillText('5 / 5 STATIONS', W / 2, 312);
  ctx.fillText('ASI OBSERVER', W / 2 + 240, 312);

  ctx.fillStyle = '#756F64';
  ctx.font = '11px "Space Mono", monospace';
  ctx.fillText('TOTAL EXPEDITION SCORE', W / 2 - 240, 334);
  ctx.fillText('CHECKPOINTS CLEARED', W / 2, 334);
  ctx.fillText('HONOR TITLE', W / 2 + 240, 334);

  // Final Secret Box
  ctx.fillStyle = '#756F64';
  ctx.font = 'bold 11px "Space Mono", monospace';
  ctx.fillText('VERIFIED ARCHAEOLOGICAL RECORD', W / 2, 385);

  ctx.fillStyle = '#173F35';
  ctx.font = 'italic 15px Georgia, serif';
  wrapTextCanvas(ctx, site.final_secret, W / 2, 410, W - 200, 24);

  // Official Gold Emblem Seal
  ctx.beginPath();
  ctx.arc(W / 2, 530, 42, 0, Math.PI * 2);
  ctx.fillStyle = '#173F35';
  ctx.fill();
  ctx.strokeStyle = '#C89B3C';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#C89B3C';
  ctx.font = 'bold 10px "Space Mono", monospace';
  ctx.fillText('HERITAGE', W / 2, 524);
  ctx.fillText('VERIFIED', W / 2, 538);

  // Footnotes
  ctx.textAlign = 'left';
  ctx.fillStyle = '#756F64';
  ctx.font = '11px "Space Mono", monospace';
  ctx.fillText(`ISSUED: ${new Date().toLocaleDateString('en-IN')}`, 70, H - 45);

  ctx.textAlign = 'right';
  ctx.fillText('OFFICIAL GEOFENCED OBSERVATION RECORD', W - 70, H - 45);
}

function wrapTextCanvas(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' ';
    if (ctx.measureText(test).width > maxW && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineH;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

function downloadCertificate() {
  const canvas = document.getElementById('certCanvas');
  if (!canvas) return;
  const a = document.createElement('a');
  a.download = `Heritage-Discovery-${State.selectedSite.id}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
}

/* ============================================================
   PROFILE & LEADERBOARD
   ============================================================ */
function renderProfile() {
  const host = document.getElementById('badgesGridContainer');
  if (host) {
    host.innerHTML = State.badgesCatalog.map(b => {
      const isUnlocked = State.unlockedBadges.has(b.title);
      return `
        <div class="badge-card" style="opacity:${isUnlocked ? 1 : 0.45};border-color:${isUnlocked ? 'var(--gold)' : 'var(--border)'};">
          <div class="badge-emoji">${b.icon}</div>
          <div class="badge-name">${b.title}</div>
          <div class="badge-site-tag">${b.site}</div>
          <div class="badge-info">${b.desc}</div>
          <div class="badge-status" style="color:${isUnlocked ? 'var(--success)' : 'var(--muted)'};">
            ${isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
          </div>
        </div>
      `;
    }).join('');
  }

  const journeyList = document.getElementById('myJourneyList');
  if (journeyList) {
    if (State.completedHunts.length === 0) {
      journeyList.innerHTML = `<div style="color:var(--muted);padding:14px;text-align:center;">No expeditions completed yet. Start your first quest from Explore!</div>`;
    } else {
      journeyList.innerHTML = State.completedHunts.map(h => `
        <div class="journey-item-card">
          <div>
            <div style="font-family:var(--serif);font-weight:700;color:var(--primary);">${h.title}</div>
            <div style="font-size:12px;color:var(--muted);">${h.date} · ${h.hunt_title}</div>
          </div>
          <div style="font-family:var(--mono);font-weight:700;color:var(--gold);">${h.score}</div>
        </div>
      `).join('');
    }
  }
}

function renderLeaderboard() {
  const host = document.getElementById('lbTable');
  if (!host) return;

  const entries = [
    { rank: 1, name: "Aarav Deshmukh", hunts: 8, xp: 7800, initials: "AD" },
    { rank: 2, name: "Priya Sundaram", hunts: 7, xp: 6950, initials: "PS" },
    { rank: 3, name: "Kabir Sengupta", hunts: 6, xp: 5400, initials: "KS" },
    { rank: 4, name: "You (Explorer)", hunts: State.huntsCompleted, xp: State.xp, initials: "YO" },
    { rank: 5, name: "Sneha Tiwari", hunts: 3, xp: 2850, initials: "ST" },
    { rank: 6, name: "Rahul Mehta", hunts: 2, xp: 1900, initials: "RM" }
  ];

  host.innerHTML = entries.map(r => `
    <div class="lb-row ${r.name.includes('You') ? 'highlight' : ''}">
      <div class="lb-rank-num">${r.rank}</div>
      <div class="lb-avt">${r.initials}</div>
      <div class="lb-info">
        <div class="lb-user-name">${r.name}</div>
        <div class="lb-meta">${r.hunts} hunt${r.hunts !== 1 ? 's' : ''} completed</div>
      </div>
      <div class="lb-xp">${r.xp} XP</div>
    </div>
  `).join('');
}

function refreshXPDisplays() {
  document.querySelectorAll('.user-xp-val').forEach(el => el.textContent = `${State.xp} XP`);
  const pxp = document.getElementById('profileXpVal');
  if (pxp) pxp.textContent = `${State.xp} XP`;
  const phunts = document.getElementById('profileHuntsVal');
  if (phunts) phunts.textContent = `${State.huntsCompleted}`;
}

function showToast(msg) {
  const host = document.getElementById('toastHost');
  if (!host) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  host.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderExploreGrid();
  renderLeaderboard();
  renderProfile();
  refreshXPDisplays();
});
