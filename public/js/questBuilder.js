const QuestBuilder = {
  renderGMPanel(quest) {
    const host = document.getElementById('qrList');
    if (!host || !quest || !quest.checkpoints) return;
    host.innerHTML = '';

    const qrCheckpoints = quest.checkpoints.filter(cp => cp.gate_type === 'qr');
    if (qrCheckpoints.length === 0) {
      host.innerHTML = '<div style="font-size:13px; color:var(--muted); text-align:center;">No QR code checkpoints in this quest.</div>';
      return;
    }

    qrCheckpoints.forEach(cp => {
      const code = cp.payload && cp.payload.code ? cp.payload.code : 'HERITAGE-MARKER';
      const wrap = document.createElement('div');
      wrap.className = 'qr-card';
      wrap.innerHTML = `
        <div style="font-family:var(--mono);font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;">${cp.name}</div>
        <div style="font-size:11px; color:var(--sandstone); margin-top:2px;">${quest.title} · Checkpoint ${cp.order_num + 1}</div>
        <canvas id="qrc-${cp.id}"></canvas>
        <div class="code-line">${code}</div>
      `;
      host.appendChild(wrap);
    });

    // Draw QRs on canvas
    qrCheckpoints.forEach(cp => {
      const code = cp.payload && cp.payload.code ? cp.payload.code : 'HERITAGE-MARKER';
      const canvas = document.getElementById(`qrc-${cp.id}`);
      if (canvas && window.QRCode) {
        QRCode.toCanvas(canvas, code, {
          width: 160,
          margin: 1,
          color: { dark: '#14121a', light: '#ece4d3' }
        });
      }
    });
  },

  async saveCustomQuest() {
    const title = document.getElementById('newQuestTitle').value.trim();
    const location = document.getElementById('newQuestLoc').value.trim();
    const intro = document.getElementById('newQuestIntro').value.trim();
    const qrCodeVal = document.getElementById('newQuestQR').value.trim() || 'CUSTOM-QR-01';

    if (!title || !location) {
      if (window.showToast) window.showToast('Please enter Quest Title & Location');
      return;
    }

    const questId = 'custom-' + Date.now();
    const newQuest = {
      id: questId,
      title: title,
      subtitle: `Community Expedition — ${location}`,
      location: location,
      lat: 15.3350,
      lng: 76.4600,
      difficulty: "Explorer",
      est_time: "25-35 mins",
      cover_theme: "torch",
      intro_1: intro || "Explore this sacred historical landmark and discover the hidden truth.",
      intro_2: "Follow the clues across four stations to unlock the final secret.",
      intro_3: "Read each inscription and fragment carefully.",
      final_prompt: "Where was the historical treasure truly hidden?",
      final_options: [
        "Inside the ancient citadel vault",
        "Behind the sacred monolithic pillar",
        "Under the grand gateway arch",
        "Beneath the royal garden fountain"
      ],
      final_correct: 1,
      completion_title: "Custom Mission Accomplished",
      completion_body: "You have verified all four stations of this community expedition!"
    };

    const checkpoints = [
      {
        id: `${questId}-cp1`,
        quest_id: questId,
        order_num: 0,
        name: "The Entry Gate Inscription",
        gate_type: "mcq",
        lat: 15.3350,
        lng: 76.4600,
        radius_meters: 40,
        story: "The ancient gateway guards the history of this monument.",
        task: "What year was this heritage site initially established?",
        hint: "Consult the foundation plaque near the archway.",
        payload: {
          options: ["1250 CE", "1336 CE", "1565 CE", "1687 CE"],
          correctIndex: 1
        },
        fragment: "Custom Fragment I: \"...Look not where everyone walks, but where the shadow falls at noon...\""
      },
      {
        id: `${questId}-cp2`,
        quest_id: questId,
        order_num: 1,
        name: "The Mason's Cipher Marker",
        gate_type: "qr",
        lat: 15.3355,
        lng: 76.4605,
        radius_meters: 40,
        story: "The masons left an identifier mark on the second pillar.",
        task: "Locate and scan the QR marker code.",
        hint: `Scan the marker ${qrCodeVal}`,
        payload: {
          code: qrCodeVal,
          codeOptions: ["CUSTOM-01", qrCodeVal, "CUSTOM-09", "CUSTOM-15"]
        },
        fragment: "Custom Fragment II: \"...The foundation was laid with monolithic stone...\""
      },
      {
        id: `${questId}-cp3`,
        quest_id: questId,
        order_num: 2,
        name: "The Geometric Lintel",
        gate_type: "symbol",
        lat: 15.3360,
        lng: 76.4610,
        radius_meters: 40,
        story: "A repeating carved pattern marks the inner sanctuary.",
        task: "Complete the ancient architectural sequence.",
        hint: "Look at the rotating elements.",
        payload: {
          sequence: ["▲", "▼", "▲", "▼"],
          options: ["▲", "▼", "◆", "●"],
          correctIndex: 0
        },
        fragment: "Custom Fragment III: \"...Behind the sacred monolithic pillar...\""
      },
      {
        id: `${questId}-cp4`,
        quest_id: questId,
        order_num: 3,
        name: "The Guardian's Enigma",
        gate_type: "dialogue",
        lat: 15.3365,
        lng: 76.4615,
        radius_meters: 40,
        story: "A spectral keeper tests your true understanding of this site.",
        task: "Convince the guardian you come as a protector of heritage.",
        hint: "Choose the path of knowledge over plunder.",
        payload: {
          portraitNote: "Guardian of the Landmark",
          lines: [
            "\"Why do you seek the secrets of this sacred site?\""
          ],
          choices: [
            { text: "To take the golden treasure for myself.", correct: false, reply: "\"Greed blinds you to the true story. Reflect and try again.\"" },
            { text: "To preserve the cultural legacy and stories for future generations.", correct: true, reply: "\"A true explorer! Take the final fragment.\"" }
          ]
        },
        fragment: "Custom Fragment IV: \"...Only those who honor history will find the truth...\""
      }
    ];

    const res = await API.createCustomQuest(newQuest, checkpoints);
    if (res && res.success) {
      if (window.showToast) window.showToast('Custom quest created and saved to database!');
      if (window.loadQuestsHub) window.loadQuestsHub();
      if (window.showScreen) window.showScreen('screen-intro');
    } else {
      if (window.showToast) window.showToast('Failed to save quest');
    }
  }
};
