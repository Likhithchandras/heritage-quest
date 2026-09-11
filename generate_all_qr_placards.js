const fs = require('fs');
const path = require('path');
const HERITAGE_DATA = require('./public/js/heritageData.js');

console.log('Generating complete ASI & UNESCO QR Code Placard Print Sheet...');

let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Heritage Hunt — Official ASI/UNESCO Waypoint Placards</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Plus+Jakarta+Sans:wght@500;600;700&family=Space+Mono:wght@700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
<style>
  @page { size: A4 portrait; margin: 12mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f0ede6; color: #173F35; padding: 20px; }
  .no-print-bar {
    background: #173F35; color: #fff; padding: 14px 20px; border-radius: 12px; margin-bottom: 24px;
    display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  }
  .print-btn {
    background: #C89B3C; color: #1a1205; border: none; padding: 10px 22px; font-weight: 700;
    border-radius: 20px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.06em;
  }
  .placards-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
  }
  @media print {
    body { background: #fff; padding: 0; }
    .no-print-bar { display: none; }
    .placard-card { page-break-inside: avoid; border: 2.5px solid #173F35 !important; }
  }
  .placard-card {
    background: #FFF9ED; border: 2px solid #C89B3C; border-radius: 14px; padding: 18px;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06); position: relative;
  }
  .placard-header {
    font-family: 'Space Mono', monospace; font-size: 9.5px; font-weight: 700;
    letter-spacing: 0.14em; color: #756F64; text-transform: uppercase; margin-bottom: 4px;
  }
  .placard-site {
    font-family: 'Cinzel', serif; font-size: 15px; font-weight: 800; color: #173F35;
    margin-bottom: 2px; line-height: 1.2;
  }
  .placard-station {
    font-size: 13px; font-weight: 700; color: #B85C38; margin-bottom: 10px;
  }
  .qr-frame {
    background: #fff; padding: 8px; border: 1.5px solid #C89B3C; border-radius: 10px;
    margin-bottom: 10px; display: inline-block;
  }
  .qr-frame canvas { width: 140px; height: 140px; }
  .placard-code {
    font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700;
    color: #173F35; background: rgba(200,155,60,0.18); padding: 3px 12px; border-radius: 12px;
    margin-bottom: 6px;
  }
  .placard-coords {
    font-family: 'Space Mono', monospace; font-size: 9.5px; color: #756F64; margin-bottom: 6px;
  }
  .placard-footer {
    font-size: 10px; color: #756F64; border-top: 1px solid rgba(200,155,60,0.3);
    padding-top: 6px; width: 100%;
  }
</style>
</head>
<body>

<div class="no-print-bar">
  <div>
    <h2 style="font-family:'Cinzel',serif;font-size:18px;">🏛️ Official Monument Waypoint Placards</h2>
    <p style="font-size:12px;opacity:0.85;">Print this sheet to place physical QR markers on site trails or for classroom evaluation.</p>
  </div>
  <button class="print-btn" onclick="window.print()">🖨️ Print Placards (PDF)</button>
</div>

<div class="placards-grid">
`;

HERITAGE_DATA.forEach(site => {
  site.checkpoints.forEach(cp => {
    const code = cp.qr_code || `HQ-${site.site_id}-${cp.checkpoint_number}`;
    html += `
  <div class="placard-card">
    <div class="placard-header">ASI ARCHAEOLOGICAL EXPLORATION POINT</div>
    <div class="placard-site">${site.title}</div>
    <div class="placard-station">Station 0${cp.checkpoint_number}: ${cp.title}</div>
    
    <div class="qr-frame">
      <canvas id="qr_${code.replace(/[^a-zA-Z0-9]/g, '_')}"></canvas>
    </div>
    
    <div class="placard-code">CODE: ${code}</div>
    <div class="placard-coords">GPS: ${cp.coordinates.lat.toFixed(4)}°N, ${cp.coordinates.lng.toFixed(4)}°E (±${cp.geofence_radius_meters}m)</div>
    <div class="placard-footer">
      <b>OBSERVE · DO NOT TOUCH MONUMENT</b> · Heritage Hunt Verified
    </div>
  </div>
    `;
  });
});

html += `
</div>

<script>
window.onload = function() {
  const codes = ${JSON.stringify(
    HERITAGE_DATA.flatMap(s => s.checkpoints.map(cp => cp.qr_code || `HQ-${s.site_id}-${cp.checkpoint_number}`))
  )};

  codes.forEach(code => {
    const canvasId = 'qr_' + code.replace(/[^a-zA-Z0-9]/g, '_');
    const canvas = document.getElementById(canvasId);
    if (canvas && window.QRCode) {
      QRCode.toCanvas(canvas, code, {
        width: 140,
        margin: 1,
        color: { dark: '#173F35', light: '#ffffff' }
      });
    }
  });
};
</script>
</body>
</html>`;

const outPath = path.join(__dirname, 'QR_CODES_PRINT_SHEET.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log(`✅ Success! Printable QR Sheet generated at ${outPath}`);
