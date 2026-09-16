// Web Speech API Voice Narrator with Indian Regional Language Support
class SpeechNarrator {
  constructor() {
    this.speaking = false;
    this.enabled = true;
    this.currentVoiceLang = 'en-IN';
  }

  get synth() {
    return typeof window !== 'undefined' ? window.speechSynthesis : null;
  }

  setVoiceLang(voiceLang) {
    if (voiceLang) {
      this.currentVoiceLang = voiceLang;
    }
  }

  speak(text, onEnd) {
    if (!this.enabled || !this.synth) return;
    this.cancel();
    const cleanText = text.replace(/[🧩📍🔎📚❓💡✨🏆👑🏛️💎🛡️🦚]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    utterance.lang = this.currentVoiceLang || 'en-IN';

    const voices = this.synth.getVoices ? this.synth.getVoices() : [];
    const targetLangPrefix = (this.currentVoiceLang || 'en').split('-')[0].toLowerCase();

    const matchedVoice = voices.find(v => {
      const vLang = (v.lang || '').toLowerCase();
      return vLang === (this.currentVoiceLang || '').toLowerCase() || vLang.startsWith(targetLangPrefix);
    }) || voices.find(v => (v.lang || '').includes('en-IN') || (v.lang || '').includes('en-US'));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => { this.speaking = true; };
    utterance.onend = () => {
      this.speaking = false;
      if (onEnd) onEnd();
    };
    utterance.onerror = () => { this.speaking = false; };

    this.synth.speak(utterance);
  }

  cancel() {
    if (this.synth) {
      this.synth.cancel();
      this.speaking = false;
    }
  }
}

export const narrator = new SpeechNarrator();
export const speechNarrator = narrator;
