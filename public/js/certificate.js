const CertificateGenerator = {
  render(canvasId, certData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 800;
    const height = 580;
    canvas.width = width;
    canvas.height = height;

    // 1. Parchment Background
    const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 450);
    grad.addColorStop(0, '#f9f4ea');
    grad.addColorStop(0.8, '#ecdcc4');
    grad.addColorStop(1, '#d8c2a3');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle paper grain/vignette
    ctx.strokeStyle = '#c9a468';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.strokeStyle = '#8b2635';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(28, 28, width - 56, height - 56);

    // Decorative corner diamonds
    function drawCornerDiamond(x, y) {
      ctx.save();
      ctx.fillStyle = '#8b2635';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    drawCornerDiamond(28, 28);
    drawCornerDiamond(width - 28, 28);
    drawCornerDiamond(28, height - 28);
    drawCornerDiamond(width - 28, height - 28);

    // 2. Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6e5a40';
    ctx.font = 'bold 12px "Space Mono", monospace';
    ctx.fillText('HERITAGE EXPLORATION & ARCHAEOLOGICAL GUILD', width / 2, 65);

    ctx.fillStyle = '#8b2635';
    ctx.font = 'bold 28px "Cinzel", Georgia, serif';
    ctx.fillText('CERTIFICATE OF DISCOVERY', width / 2, 105);

    ctx.fillStyle = '#5c4830';
    ctx.font = 'italic 16px "Spectral", Georgia, serif';
    ctx.fillText('This official charter certifies that the investigative team', width / 2, 145);

    // 3. Team Name
    ctx.fillStyle = '#1a1108';
    ctx.font = 'bold 26px "Cinzel", Georgia, serif';
    ctx.fillText(certData.teamName || 'Explorer Team', width / 2, 190);

    ctx.fillStyle = '#5c4830';
    ctx.font = 'italic 15px "Spectral", Georgia, serif';
    ctx.fillText('has successfully decoded all historical ciphers, recovered the lost journal fragments,', width / 2, 230);
    ctx.fillText(`and unlocked the royal truth of ${certData.questTitle || 'The Heritage Quest'}`, width / 2, 252);

    // 4. Stats Grid
    const boxY = 295;
    ctx.fillStyle = 'rgba(201, 164, 104, 0.15)';
    ctx.fillRect(80, boxY, width - 160, 75);
    ctx.strokeStyle = '#c9a468';
    ctx.lineWidth = 1;
    ctx.strokeRect(80, boxY, width - 160, 75);

    ctx.fillStyle = '#8b2635';
    ctx.font = 'bold 20px "Space Mono", monospace';
    ctx.fillText(`${certData.score || 0} PTS`, width / 2 - 180, boxY + 38);
    ctx.fillText(`${certData.timeStr || '00:00'}`, width / 2, boxY + 38);
    ctx.fillText(`${certData.badgesCount || 4} BADGES`, width / 2 + 180, boxY + 38);

    ctx.fillStyle = '#6e5a40';
    ctx.font = '10px "Space Mono", monospace';
    ctx.fillText('FINAL SCORE', width / 2 - 180, boxY + 58);
    ctx.fillText('EXPEDITION TIME', width / 2, boxY + 58);
    ctx.fillText('HONORS EARNED', width / 2 + 180, boxY + 58);

    // 5. Wax Seal (Visual Circle)
    const sealX = width / 2;
    const sealY = 445;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 34, 0, Math.PI * 2);
    ctx.fillStyle = '#8b2635';
    ctx.fill();
    ctx.strokeStyle = '#c9a468';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ece4d3';
    ctx.font = 'bold 10px "Space Mono", monospace';
    ctx.fillText('ROYAL SEAL', sealX, sealY - 6);
    ctx.fillText('VERIFIED', sealX, sealY + 8);

    // 6. Footer Code & Verification
    ctx.textAlign = 'left';
    ctx.fillStyle = '#6e5a40';
    ctx.font = '11px "Space Mono", monospace';
    ctx.fillText(`AUTHENTICITY CODE: ${certData.certCode || 'HQ-VERIFIED-2026'}`, 60, height - 42);
    ctx.fillText(`DATE: ${new Date().toLocaleDateString()}`, 60, height - 26);

    ctx.textAlign = 'right';
    ctx.fillText('OFFICIAL EXPEDITION RECORD', width - 60, height - 34);
  },

  download(canvasId, filename = 'heritage-quest-certificate.png') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
};
