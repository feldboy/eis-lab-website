// Sound effects utility for page transitions
export class TransitionSounds {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
      this.isEnabled = false;
    }
  }

  private createOscillator(frequency: number, type: OscillatorType = 'sine'): OscillatorNode | null {
    if (!this.audioContext || !this.isEnabled) return null;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;
    
    return oscillator;
  }

  private createNoiseBuffer(duration: number): AudioBuffer | null {
    if (!this.audioContext) return null;

    const bufferSize = this.audioContext.sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  // Whoosh sound for section transitions
  playWhoosh() {
    if (!this.audioContext || !this.isEnabled) return;

    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    const noiseBuffer = this.createNoiseBuffer(0.3);
    if (!noiseBuffer) return;

    const noise = this.audioContext.createBufferSource();
    noise.buffer = noiseBuffer;
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, this.audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    noise.start();
    noise.stop(this.audioContext.currentTime + 0.3);
  }

  // Magical sparkle sound
  playSparkle() {
    if (!this.audioContext || !this.isEnabled) return;

    const frequencies = [800, 1000, 1200, 1500];
    
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = this.createOscillator(freq, 'sine');
        if (!oscillator || !this.audioContext) return;

        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2);
      }, index * 50);
    });
  }

  // Bubble pop sound for interactions
  playBubblePop() {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.createOscillator(150, 'sine');
    if (!oscillator) return;

    const gainNode = this.audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Chime sound for successful navigation
  playChime() {
    if (!this.audioContext || !this.isEnabled) return;

    const frequencies = [523.25, 659.25, 783.99]; // C, E, G major chord
    
    frequencies.forEach((freq, index) => {
      const oscillator = this.createOscillator(freq, 'sine');
      if (!oscillator) return;

      const gainNode = this.audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      gainNode.gain.setValueAtTime(0.03, this.audioContext.currentTime + index * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5 + index * 0.1);

      oscillator.start(this.audioContext.currentTime + index * 0.1);
      oscillator.stop(this.audioContext.currentTime + 0.5 + index * 0.1);
    });
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
  }
}

export default TransitionSounds;
