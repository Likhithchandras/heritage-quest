const QRScanner = {
  scannerInstance: null,
  activeCheckpointIndex: null,

  start(checkpointIndex, onSuccess) {
    this.activeCheckpointIndex = checkpointIndex;
    const box = document.getElementById(`scanbox-${checkpointIndex}`);
    if (!box) return;

    box.innerHTML = '<div id="qr-reader" style="width:100%;"></div>';

    if (!window.Html5Qrcode) {
      box.innerHTML = '<div style="padding:16px;font-size:13px;color:var(--muted);text-align:center;">Camera scanner library unavailable — tap the matching code below.</div>';
      return;
    }

    try {
      this.scannerInstance = new Html5Qrcode('qr-reader');
      this.scannerInstance.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          this.stop();
          if (onSuccess) onSuccess(decodedText);
        },
        (error) => {
          // Frame read pass
        }
      ).catch((err) => {
        console.warn('Camera start error:', err);
        box.innerHTML = '<div style="padding:16px;font-size:13px;color:var(--muted);text-align:center;">Camera permission not granted or unavailable — tap the matching code below.</div>';
      });
    } catch (e) {
      box.innerHTML = '<div style="padding:16px;font-size:13px;color:var(--muted);text-align:center;">Camera unavailable — tap the matching code below.</div>';
    }
  },

  stop() {
    if (this.scannerInstance) {
      try {
        this.scannerInstance.stop().catch(() => {});
      } catch (e) {}
      this.scannerInstance = null;
    }
  }
};
