// ─── Web Audio API Synthesizer (Zero External MP3 Assets, Zero Latency) ───────
"use client";

class AudioController {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientNoiseNode: AudioNode | null = null;
  private isEnabled: boolean = false;
  private listeners: ((enabled: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("luxury_audio_enabled");
      this.isEnabled = stored === "true";
    }
  }

  private initCtx(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getSoundState(): boolean {
    return this.isEnabled;
  }

  public toggleSound(): boolean {
    this.isEnabled = !this.isEnabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("luxury_audio_enabled", String(this.isEnabled));
    }
    if (this.isEnabled) {
      this.initCtx();
      this.playMechanicalClick(true);
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    this.notifyListeners();
    return this.isEnabled;
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l(this.isEnabled));
  }

  /**
   * Tactile Mechanical Click (inspired by Leica / high-end mechanical camera switch)
   */
  public playMechanicalClick(force: boolean = false) {
    if (!this.isEnabled && !force) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.038);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Magnetic Micro Tick for interactive card hovers
   */
  public playHoverTick() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.015);

      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.016);
    } catch {
      // Ignore audio policy errors
    }
  }

  /**
   * Deep Ocean Ambient Sub-Drone (Low frequency, hypnotic underwater resonance)
   */
  private startAmbient() {
    const ctx = this.initCtx();
    if (!ctx || this.ambientNoiseNode) return;

    try {
      // Create brown noise buffer for deep ocean current
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Lowpass filter to shape ocean swell
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(110, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      // Sub-bass sine oscillator for submarine hull resonance (55Hz / A1)
      const subOsc = ctx.createOscillator();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(55, ctx.currentTime);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.025, ctx.currentTime);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 3.0); // Smooth fade in

      noise.connect(filter);
      filter.connect(masterGain);

      subOsc.connect(subGain);
      subGain.connect(masterGain);

      masterGain.connect(ctx.destination);

      noise.start();
      subOsc.start();

      this.ambientGain = masterGain;
      this.ambientNoiseNode = noise;
    } catch {
      // Ignore
    }
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          this.ambientNoiseNode = null;
          this.ambientGain = null;
        }, 1300);
      } catch {
        this.ambientNoiseNode = null;
        this.ambientGain = null;
      }
    }
  }
}

export const audioController = new AudioController();

export const playClick = (force: boolean = false) => {
  audioController.playMechanicalClick(force);
};

export const playHoverTick = () => {
  audioController.playHoverTick();
};
