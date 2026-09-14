// Web Speech API Voice Narrator for Kid-Friendly HCI
class SpeechNarrator {
  constructor() {
    this.speaking = false;
    this.enabled = true;
  }

  get synth() {
    return typeof window !== 'undefined' ? window.speechSynthesis : null;
  }

  speak(text, onEnd) {
    if (!this.enabled || !this.synth) return;
    this.cancel();
    const cleanText = text.replace(/[🧩📍🔎📚❓💡✨🏆👑🏛️💎🛡️🦚]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;

    const voices = this.synth.getVoices ? this.synth.getVoices() : [];
    const preferredVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('en-US') || v.lang.includes('en-GB')) && !v.name.includes('David'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
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
