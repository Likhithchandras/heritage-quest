const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const qrDir = path.join(__dirname, 'qr_codes');
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir, { recursive: true });
}

const codes = [
  {
    monument: "1. Hampi (Vijayanagara)",
    station: "The Mason's Stone Mark",
    code: "MASON-108",
    filename: "1_hampi_mason_108.png"
  },
  {
    monument: "2. Taj Mahal (Agra)",
    station: "The Flower Inlay Stone",
    code: "TAJ-FLOWER-99",
    filename: "2_taj_mahal_flower_99.png"
  },
  {
    monument: "3. Qutub Minar (Delhi)",
    station: "The Blacksmith's Seal",
    code: "IRON-PILLAR-50",
    filename: "3_qutub_minar_iron_50.png"
  },
  {
    monument: "4. Golconda Fort (Hyderabad)",
    station: "The Granary Store Marker",
    code: "GOL-VAULT-7",
    filename: "4_golconda_vault_7.png"
  },
  {
    monument: "5. Konark Sun Temple (Odisha)",
    station: "The Sundial Hub Marker",
    code: "KNRK-SUN-24",
    filename: "5_konark_sun_24.png"
  },
  {
    monument: "6. Mysore Palace (Karnataka)",
    station: "The Peacock Floor Tile",
    code: "MYS-PEACOCK-88",
    filename: "6_mysore_peacock_88.png"
  }
];

async function generateAll() {
  console.log('Generating QR Code images in /qr_codes ...');

  for (const item of codes) {
    const filePath = path.join(qrDir, item.filename);
    await QRCode.toFile(filePath, item.code, {
      width: 400,
      margin: 2,
      color: {
        dark: '#14121a',
        light: '#ffffff'
      }
    });
    console.log(`✓ Generated: ${item.filename} for code "${item.code}" (${item.monument})`);
  }

  console.log('\nAll 6 QR Code images generated successfully in:', qrDir);
}

generateAll().catch(err => {
  console.error('Error generating QR codes:', err);
});
