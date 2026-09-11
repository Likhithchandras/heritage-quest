const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const MARKERS = [
  {
    monument: "1. Hampi (Vijayanagara)",
    station: "Checkpoint 2: The Mason's Stone Mark",
    code: "MASON-108",
    hint: "Point camera to scan MASON-108",
    filename: "1_hampi_mason_108.png"
  },
  {
    monument: "2. Taj Mahal (Agra)",
    station: "Checkpoint 2: The Flower Inlay Stone",
    code: "TAJ-FLOWER-99",
    hint: "Point camera to scan TAJ-FLOWER-99",
    filename: "2_taj_mahal_flower_99.png"
  },
  {
    monument: "3. Qutub Minar (Delhi)",
    station: "Checkpoint 2: The Blacksmith's Seal",
    code: "IRON-PILLAR-50",
    hint: "Point camera to scan IRON-PILLAR-50",
    filename: "3_qutub_minar_iron_50.png"
  },
  {
    monument: "4. Golconda Fort (Hyderabad)",
    station: "Checkpoint 2: The Granary Store Marker",
    code: "GOL-VAULT-7",
    hint: "Point camera to scan GOL-VAULT-7",
    filename: "4_golconda_vault_7.png"
  },
  {
    monument: "5. Konark Sun Temple (Odisha)",
    station: "Checkpoint 2: The Sundial Hub Marker",
    code: "KNRK-SUN-24",
    hint: "Point camera to scan KNRK-SUN-24",
    filename: "5_konark_sun_24.png"
  },
  {
    monument: "6. Mysore Palace (Karnataka)",
    station: "Checkpoint 2: The Peacock Floor Tile",
    code: "MYS-PEACOCK-88",
    hint: "Point camera to scan MYS-PEACOCK-88",
    filename: "6_mysore_peacock_88.png"
  }
];

async function build() {
  const qrDir = path.join(__dirname, 'qr_codes');
  if (!fs.existsSync(qrDir)) fs.mkdirSync(qrDir, { recursive: true });

  const cardsHTML = [];

  for (const m of MARKERS) {
    // Generate data URL (base64)
    const dataUrl = await QRCode.toDataURL(m.code, {
      width: 260,
      margin: 2,
      color: {
        dark: '#14121a',
        light: '#ffffff'
      }
    });

    // Also save PNG file
    const filePath = path.join(qrDir, m.filename);
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(filePath, base64Data, 'base64');

    cardsHTML.push(`
      <div class="qr-card">
        <div class="monument-name">${m.monument}</div>
        <div class="station-title">${m.station}</div>
        <div class="qr-img-wrap">
          <img src="${dataUrl}" alt="QR Code ${m.code}" width="200" height="200" style="display:block; margin:0 auto;" />
        </div>
        <div class="code-badge">${m.code}</div>
        <div class="hint-text">${m.hint}</div>
      </div>
    `);
  }

  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Heritage Quest — All 6 QR Code Markers</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Space+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; }
  body {
    font-family: 'Space Mono', monospace;
    background: #f4ede0;
    color: #1a1410;
    margin: 0;
    padding: 30px 20px;
  }
  .header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 28px;
    border-bottom: 2px solid #8b2635;
    padding-bottom: 16px;
  }
  h1 {
    font-family: 'Cinzel', serif;
    color: #8b2635;
    margin: 0 0 8px;
    font-size: 26px;
  }
  p {
    margin: 0 0 14px;
    color: #5c4830;
    font-size: 14px;
  }
  .btn-print {
    background: #8b2635;
    color: #fff;
    border: none;
    padding: 10px 24px;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }
  .btn-print:hover {
    background: #a83244;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 22px;
    max-width: 980px;
    margin: 0 auto;
  }
  .qr-card {
    background: #ffffff;
    border: 2px solid #c9a468;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    page-break-inside: avoid;
  }
  .monument-name {
    font-family: 'Cinzel', serif;
    font-weight: 700;
    font-size: 16px;
    color: #8b2635;
    margin-bottom: 4px;
  }
  .station-title {
    font-size: 11px;
    color: #7a6b58;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }
  .qr-img-wrap {
    display: inline-block;
    padding: 10px;
    background: #ffffff;
    border: 2px solid #e0d6c3;
    border-radius: 6px;
    margin-bottom: 12px;
  }
  .code-badge {
    font-size: 15px;
    font-weight: bold;
    color: #1a1410;
    background: #fbf7ef;
    border: 1px solid #c9a468;
    padding: 6px 14px;
    border-radius: 4px;
    display: inline-block;
    letter-spacing: 0.08em;
  }
  .hint-text {
    font-size: 11.5px;
    color: #8f879c;
    margin-top: 8px;
  }
  @media print {
    body { background: #fff; padding: 0; }
    .btn-print { display: none; }
    .grid { grid-template-columns: 1fr 1fr; gap: 14px; }
    .qr-card { box-shadow: none; border: 1px solid #000; padding: 12px; }
  }
</style>
</head>
<body>

<div class="header">
  <h1>🏛️ Heritage Quest — Official QR Code Markers</h1>
  <p>All 6 QR code markers are permanently embedded below. You can scan them with your camera from this screen or print them out!</p>
  <button class="btn-print" onclick="window.print()">🖨️ Print Marker Sheet</button>
</div>

<div class="grid">
  ${cardsHTML.join('\n')}
</div>

</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'QR_CODES_PRINT_SHEET.html'), fullHTML, 'utf8');
  console.log('✓ Generated self-contained QR_CODES_PRINT_SHEET.html with 100% embedded images!');
}

build().catch(console.error);
