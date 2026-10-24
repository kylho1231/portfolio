/**
 * JE. DIGITAL UNIVERSE — VOICE MANAGER
 * Web Speech API synthesis integration. Strictly opt-in, disabled by default.
 * Provides differentiated vocal cadence and pitch per AI companion.
 */

class VoiceManager {
  constructor() {
    this.isEnabled = false;
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.selectedVoice = null;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = this.loadVoices.bind(this);
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices() || [];
    // Prefer English natural voices
    this.selectedVoice = this.voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))) 
      || this.voices.find(v => v.lang.startsWith('en')) 
      || this.voices[0];
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled && this.synth) {
      this.synth.cancel();
    }
    return this.isEnabled;
  }

  speak(text, charKey = 'code') {
    if (!this.isEnabled || !this.synth || !text) return;

    this.synth.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Voice modulation profiles per character
    switch (charKey) {
      case 'code':
        utterance.pitch = 1.08;
        utterance.rate = 1.02;
        break;
      case 'claude':
        utterance.pitch = 0.92;
        utterance.rate = 0.94;
        break;
      case 'grok':
        utterance.pitch = 1.2;
        utterance.rate = 1.1;
        break;
      case 'gemini':
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
        break;
      default:
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
        break;
    }

    this.synth.speak(utterance);
  }
}

window.VoiceManager = VoiceManager;
