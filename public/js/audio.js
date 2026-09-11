const SoundFX = {
  ctx: null,
  enabled: true,

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playTone(freq, type, duration, gainVal = 0.1) {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // ignore
    }
  },

  playSuccess() {
    if (!this.enabled) return;
    this.playTone(440, 'triangle', 0.2, 0.15);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.35, 0.15), 120);
    setTimeout(() => this.playTone(880, 'sine', 0.5, 0.18), 240);
  },

  playError() {
    if (!this.enabled) return;
    this.playTone(180, 'sawtooth', 0.25, 0.15);
    setTimeout(() => this.playTone(140, 'sawtooth', 0.3, 0.15), 100);
  },

  playSealPop() {
    if (!this.enabled) return;
    this.playTone(220, 'sine', 0.1, 0.2);
    setTimeout(() => this.playTone(587.33, 'triangle', 0.4, 0.2), 80);
    setTimeout(() => this.playTone(1174.66, 'sine', 0.7, 0.25), 180);
  },

  speakText(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Strip HTML tags
      const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.92;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  },

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
