(() => {
  'use strict';
  /**
   * G-Warp Melody Engine — gemini/lab/melody-engine.js
   * Exposes window.GW_MELODY.make({ style, mood, key, bars, seed }) -> [{ t, d, n, v }]
   * - t: start time in beats (0 .. bars*4)
   * - d: duration in beats
   * - n: MIDI note number (int)
   * - v: velocity (0 .. 1)
   * Deterministic PRNG: same seed + options always returns the exact same melody.
   * Phrase structure: Bar 1 = Idea A, Bar 2 = Idea A varied, Bar 3 = Idea A again, Bar 4 = cadence ending on root.
   */

  const KEY_OFFSETS = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
    'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11
  };

  const SCALES = {
    major:           [0, 2, 4, 5, 7, 9, 11],
    minor:           [0, 2, 3, 5, 7, 8, 10],
    minorPentatonic: [0, 3, 5, 7, 10],
    blues:           [0, 3, 5, 6, 7, 10],
    dorian:          [0, 2, 3, 5, 7, 9, 10],
    harmonicMinor:   [0, 2, 3, 5, 7, 8, 11],
    phrygianDark:    [0, 1, 3, 5, 7, 8, 10],
    lydianBright:    [0, 2, 4, 6, 7, 9, 11]
  };

  const MOOD_PROFILES = {
    happy:     { octaveShift: +12, velBase: 0.80, velSpan: 0.16, densityMul: 1.08, scaleOverride: null,       preferBright: true  },
    sad:       { octaveShift:   0, velBase: 0.56, velSpan: 0.14, densityMul: 0.78, scaleOverride: 'minor',    preferBright: false },
    dark:      { octaveShift: -12, velBase: 0.72, velSpan: 0.18, densityMul: 0.85, scaleOverride: 'phrygianDark', preferBright: false },
    epic:      { octaveShift:   0, velBase: 0.86, velSpan: 0.14, densityMul: 1.05, scaleOverride: 'harmonicMinor', preferBright: false },
    chill:     { octaveShift:   0, velBase: 0.58, velSpan: 0.12, densityMul: 0.75, scaleOverride: null,       preferBright: false },
    energetic: { octaveShift: +12, velBase: 0.88, velSpan: 0.12, densityMul: 1.22, scaleOverride: null,       preferBright: true  }
  };

  const STYLE_SPECS = {
    lofi: {
      bpm: 78,
      baseMidi: 60, // C4
      scale: 'minorPentatonic',
      chordExtensions: [0, 3, 7, 10, 14], // min7 / min9 color tones
      swing: 0.08, // lazy swung 8ths
      chords: [[0, 3, 7, 10], [5, 8, 12, 15], [3, 7, 10, 14], [7, 10, 14, 17]],
      desc: 'Lazy swung 8ths, lots of rests, minor pentatonic + 7th/9th color tones, compact range'
    },
    trap: {
      bpm: 140,
      baseMidi: 48, // C3 (low-middle range)
      scale: 'phrygianDark',
      chordExtensions: [0, 1, 7, 8],
      swing: 0,
      chords: [[0, 3, 7], [8, 12, 15], [0, 3, 7], [7, 10, 14]],
      desc: 'Sparse & dark minor/phrygian, long held notes + rapid 1/6-beat triplet rolls, low-mid range'
    },
    pop: {
      bpm: 118,
      baseMidi: 60, // C4
      scale: 'major',
      chordExtensions: [0, 4, 7, 9],
      swing: 0,
      chords: [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]],
      desc: 'Catchy 2-bar hook, syncopated 8ths, major scale, chord tones anchored on beats 1 and 3'
    },
    rock: {
      bpm: 128,
      baseMidi: 48, // C3
      scale: 'blues',
      chordExtensions: [0, 3, 5, 6, 7],
      swing: 0,
      chords: [[0, 7, 12], [3, 10, 15], [5, 12, 17], [7, 14, 19]],
      desc: 'Short repeated riff, minor pentatonic + flat-5 blues note, driving straight 8ths'
    },
    edm: {
      bpm: 128,
      baseMidi: 60, // C4
      scale: 'minor',
      chordExtensions: [0, 3, 7, 12],
      swing: 0,
      chords: [[0, 3, 7], [8, 12, 15], [3, 7, 10], [10, 14, 17]],
      desc: 'Driving 16th-note chord arpeggios, octave jumps, rising pitch/velocity build-up in bar 4'
    },
    chiptune: {
      bpm: 150,
      baseMidi: 72, // C5
      scale: 'major',
      chordExtensions: [0, 4, 7, 12],
      swing: 0,
      chords: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]],
      desc: 'Fast 16th arpeggio bursts, wide 1-octave jumps, major key, crisp staccato bounce'
    },
    jazz: {
      bpm: 112,
      baseMidi: 60, // C4
      scale: 'dorian',
      chordExtensions: [0, 3, 7, 10, 14], // dorian 7ths and 9ths
      swing: 0.085,
      chords: [[2, 5, 9, 12], [7, 11, 14, 17], [0, 4, 7, 11], [9, 12, 16, 19]],
      desc: 'Swung 8ths, dorian mode, 7th & 9th extensions, chromatic approach passing notes'
    },
    cinematic: {
      bpm: 84,
      baseMidi: 60, // C4
      scale: 'harmonicMinor',
      chordExtensions: [0, 3, 7, 11, 12],
      swing: 0,
      chords: [[0, 3, 7], [8, 12, 15], [5, 8, 12], [7, 11, 14]],
      desc: 'Slow sustained notes, wide 5th/octave leaps, rising sequence, harmonic minor drama'
    }
  };

  function hashSeed(input) {
    const str = String(input == null ? 'gwarp-2026' : input);
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) || 0x9e3779b9;
  }

  function makeRng(seedVal) {
    let a = hashSeed(seedVal);
    return function next() {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function resolveScaleIntervals(styleKey, moodKey) {
    const spec = STYLE_SPECS[styleKey] || STYLE_SPECS.pop;
    const mood = MOOD_PROFILES[moodKey] || MOOD_PROFILES.happy;
    if (styleKey === 'lofi') return SCALES.minorPentatonic;
    if (styleKey === 'rock') return SCALES.blues;
    if (styleKey === 'jazz') return SCALES.dorian;
    if (styleKey === 'cinematic') return moodKey === 'happy' ? SCALES.lydianBright : SCALES.harmonicMinor;
    if (styleKey === 'pop' || styleKey === 'chiptune') {
      if (moodKey === 'sad' || moodKey === 'dark') return SCALES.minor;
      return SCALES.major;
    }
    if (mood.scaleOverride && SCALES[mood.scaleOverride]) {
      return SCALES[mood.scaleOverride];
    }
    return SCALES[spec.scale] || SCALES.minor;
  }

  function clampMidi(n, lo = 36, hi = 96) {
    return Math.max(lo, Math.min(hi, Math.round(n)));
  }

  function clampVel(v) {
    return Math.round(Math.max(0.12, Math.min(1, v)) * 1000) / 1000;
  }

  function roundBeat(x) {
    return Math.round(x * 1000) / 1000;
  }

  function pick(rng, arr) {
    return arr[Math.floor(rng() * arr.length) % arr.length];
  }

  function buildIdeaABar(styleKey, moodKey, rootMidi, scale, spec, mood, rng) {
    const notes = [];
    const vel0 = mood.velBase;

    if (styleKey === 'lofi') {
      const pool = [0, 3, 5, 7, 10, 14];
      const slots = [0, 0.5, 1.5, 2.5, 3.0];
      for (let i = 0; i < slots.length; i++) {
        if (i > 0 && rng() > 0.72 * mood.densityMul) continue;
        const rawBeat = slots[i];
        const isOffbeat = Math.abs((rawBeat % 1) - 0.5) < 0.01;
        const t = rawBeat + (isOffbeat ? spec.swing : 0);
        const d = i === slots.length - 1 ? 0.75 : (isOffbeat ? 0.42 : 0.48);
        const interval = i === 0 ? pick(rng, [0, 3, 7, 10]) : pick(rng, pool);
        notes.push({
          t,
          d,
          n: rootMidi + interval,
          v: vel0 + (rng() - 0.5) * mood.velSpan
        });
      }
      if (notes.length >= 2) {
        notes[1].n = rootMidi + (rng() < 0.5 ? 10 : 14);
      }
    } else if (styleKey === 'trap') {
      const darkPool = [0, 1, 3, 7, 8];
      notes.push({ t: 0, d: 1.5, n: rootMidi + pick(rng, [0, 7]), v: vel0 + 0.06 });
      const rollBase = rootMidi + pick(rng, [7, 8, 3]);
      const trip = 1 / 6;
      for (let k = 0; k < 3; k++) {
        notes.push({
          t: 1.5 + k * trip,
          d: trip * 0.92,
          n: rollBase - (k === 1 ? 1 : k === 2 ? 3 : 0),
          v: vel0 - 0.08 + k * 0.05
        });
      }
      notes.push({ t: 2.0, d: 1.75, n: rootMidi + pick(rng, darkPool), v: vel0 });
    } else if (styleKey === 'pop') {
      const chordTones = [0, 4, 7, 12];
      const scaleTones = [0, 2, 4, 7, 9, 12];
      notes.push({ t: 0.0, d: 0.75, n: rootMidi + pick(rng, chordTones), v: vel0 + 0.06 });
      notes.push({ t: 0.75, d: 0.75, n: rootMidi + pick(rng, scaleTones), v: vel0 });
      notes.push({ t: 1.5, d: 0.5, n: rootMidi + pick(rng, scaleTones), v: vel0 - 0.04 });
      notes.push({ t: 2.0, d: 0.75, n: rootMidi + pick(rng, chordTones), v: vel0 + 0.05 });
      notes.push({ t: 2.75, d: 0.5, n: rootMidi + pick(rng, scaleTones), v: vel0 });
      notes.push({ t: 3.25, d: 0.5, n: rootMidi + pick(rng, [2, 4, 7]), v: vel0 - 0.03 });
    } else if (styleKey === 'rock') {
      const riffDegrees = [0, 0, 3, 5, 6, 7, 5, 3];
      for (let i = 0; i < 8; i++) {
        const deg = i === 4 ? 6 : (rng() < 0.7 ? riffDegrees[i] : pick(rng, SCALES.blues));
        notes.push({
          t: i * 0.5,
          d: 0.45,
          n: rootMidi + deg,
          v: vel0 + (i % 2 === 0 ? 0.08 : -0.04)
        });
      }
    } else if (styleKey === 'edm') {
      const arp = [0, 3, 7, 12, 7, 3, 12, 7, 0, 3, 7, 15, 12, 7, 3, 7];
      for (let i = 0; i < 16; i++) {
        if (i === 6 || i === 14) {
          if (rng() > 0.75 * mood.densityMul) continue;
        }
        const semi = arp[i % arp.length] + (i === 3 || i === 11 ? 12 : 0);
        notes.push({
          t: i * 0.25,
          d: 0.22,
          n: rootMidi + semi,
          v: vel0 + (i % 4 === 0 ? 0.09 : -0.04)
        });
      }
    } else if (styleKey === 'chiptune') {
      const chipPattern = [0, 4, 7, 12, 16, 12, 7, 4, 2, 7, 11, 14, 19, 14, 11, 7];
      for (let i = 0; i < 16; i++) {
        const jump = (i === 4 || i === 12) ? 12 : 0;
        notes.push({
          t: i * 0.25,
          d: 0.18,
          n: rootMidi + chipPattern[i] + jump,
          v: vel0 + (i % 2 === 0 ? 0.06 : -0.04)
        });
      }
    } else if (styleKey === 'jazz') {
      const swing = spec.swing;
      const jazzLine = [
        { t: 0.0,            d: 0.55, semi: 3 },
        { t: 0.5 + swing,    d: 0.40, semi: 6 },
        { t: 1.0,            d: 0.55, semi: 7 },
        { t: 1.5 + swing,    d: 0.40, semi: 9 },
        { t: 2.0,            d: 0.55, semi: 10 },
        { t: 2.5 + swing,    d: 0.40, semi: 14 },
        { t: 3.0,            d: 0.85, semi: pick(rng, [7, 9, 10, 12]) }
      ];
      for (const item of jazzLine) {
        notes.push({
          t: item.t,
          d: item.d,
          n: rootMidi + item.semi,
          v: vel0 + (rng() - 0.5) * mood.velSpan
        });
      }
    } else if (styleKey === 'cinematic') {
      notes.push({ t: 0.0, d: 1.5, n: rootMidi + 0,  v: vel0 });
      notes.push({ t: 1.5, d: 1.5, n: rootMidi + 7,  v: vel0 + 0.05 });
      notes.push({ t: 3.0, d: 1.0, n: rootMidi + 8,  v: vel0 + 0.08 });
    } else {
      for (let i = 0; i < 4; i++) {
        notes.push({ t: i, d: 0.8, n: rootMidi + pick(rng, scale), v: vel0 });
      }
    }

    return notes;
  }

  function mutateBarForIdeaB(ideaA, styleKey, rootMidi, scale, spec, mood, rng) {
    const cloned = ideaA.map((ev) => ({ ...ev }));

    if (styleKey === 'cinematic') {
      return [
        { t: 0.0, d: 1.5, n: rootMidi + 3,  v: mood.velBase + 0.04 },
        { t: 1.5, d: 1.5, n: rootMidi + 11, v: mood.velBase + 0.09 },
        { t: 3.0, d: 1.0, n: rootMidi + 12, v: mood.velBase + 0.12 }
      ];
    }

    if (styleKey === 'pop') {
      return cloned.map((ev, idx) => {
        let n = ev.n;
        if (Math.abs(ev.t - 0) < 0.01) n = rootMidi + 7;
        else if (Math.abs(ev.t - 2.0) < 0.01) n = rootMidi + 4;
        else if (idx >= cloned.length - 2) n = rootMidi + (idx === cloned.length - 1 ? 9 : 7);
        return { ...ev, n };
      });
    }

    if (styleKey === 'rock') {
      return cloned.map((ev, idx) => {
        if (idx >= 5) {
          const tail = [10, 7, 6][idx - 5] || 7;
          return { ...ev, n: rootMidi + tail };
        }
        return ev;
      });
    }

    return cloned.map((ev, idx) => {
      if (idx >= Math.floor(cloned.length / 2)) {
        const delta = (idx % 2 === 0) ? 2 : -2;
        return { ...ev, n: ev.n + delta };
      }
      return ev;
    });
  }

  function buildEndingBar4(ideaA, styleKey, rootMidi, scale, spec, mood, rng) {
    const vel0 = mood.velBase;

    if (styleKey === 'edm') {
      const notes = [];
      const ladder = [0, 2, 3, 5, 7, 8, 10, 12, 12, 14, 15, 17, 19, 20];
      for (let i = 0; i < 14; i++) {
        notes.push({
          t: i * 0.25,
          d: 0.20,
          n: rootMidi + ladder[i],
          v: Math.min(1, 0.55 + i * 0.032)
        });
      }
      notes.push({
        t: 3.5,
        d: 0.5,
        n: rootMidi,
        v: 0.98
      });
      return notes;
    }

    if (styleKey === 'cinematic') {
      return [
        { t: 0.0, d: 1.0, n: rootMidi + 8,  v: vel0 + 0.06 },
        { t: 1.0, d: 1.0, n: rootMidi + 11, v: vel0 + 0.10 },
        { t: 2.0, d: 2.0, n: rootMidi,      v: Math.min(1, vel0 + 0.12) }
      ];
    }

    if (styleKey === 'trap') {
      const trip = 1 / 6;
      return [
        { t: 0.0, d: 1.0, n: rootMidi + 8, v: vel0 },
        { t: 1.0, d: trip * 0.9, n: rootMidi + 7, v: vel0 - 0.05 },
        { t: 1.0 + trip, d: trip * 0.9, n: rootMidi + 3, v: vel0 },
        { t: 1.0 + 2 * trip, d: trip * 0.9, n: rootMidi + 1, v: vel0 + 0.05 },
        { t: 2.0, d: 2.0, n: rootMidi, v: Math.min(1, vel0 + 0.1) }
      ];
    }

    if (styleKey === 'pop') {
      return [
        { t: 0.0,  d: 0.75, n: rootMidi + 4, v: vel0 + 0.05 },
        { t: 0.75, d: 0.75, n: rootMidi + 2, v: vel0 },
        { t: 1.5,  d: 0.5,  n: rootMidi + 7, v: vel0 + 0.02 },
        { t: 2.0,  d: 2.0,  n: rootMidi,     v: Math.min(1, vel0 + 0.1) }
      ];
    }

    const half = ideaA.filter(ev => ev.t < 2.0).map(ev => ({ ...ev }));
    half.push({
      t: 2.0,
      d: 0.5,
      n: rootMidi + (scale.includes(7) ? 7 : scale[scale.length - 1]),
      v: vel0
    });
    half.push({
      t: 2.5,
      d: 1.5,
      n: rootMidi,
      v: Math.min(1, vel0 + 0.08)
    });
    return half;
  }

  function make(opts = {}) {
    const styleKey = String(opts.style || 'pop').toLowerCase();
    const moodKey = String(opts.mood || 'happy').toLowerCase();
    const keyName = String(opts.key || 'C');
    const bars = Math.max(1, Math.min(32, Number(opts.bars) || 4));
    const seed = opts.seed !== undefined ? opts.seed : 'gwarp-seed-1';

    const spec = STYLE_SPECS[styleKey] || STYLE_SPECS.pop;
    const mood = MOOD_PROFILES[moodKey] || MOOD_PROFILES.happy;
    const keyOffset = KEY_OFFSETS[keyName] != null ? KEY_OFFSETS[keyName] : 0;

    let rootMidi = spec.baseMidi + keyOffset + mood.octaveShift;
    while (rootMidi < 42) rootMidi += 12;
    while (rootMidi > 74) rootMidi -= 12;
    const scale = resolveScaleIntervals(styleKey, moodKey);
    const rng = makeRng(`${styleKey}|${moodKey}|${keyName}|${seed}`);

    const bar1IdeaA = buildIdeaABar(styleKey, moodKey, rootMidi, scale, spec, mood, rng);
    const bar2IdeaB = mutateBarForIdeaB(bar1IdeaA, styleKey, rootMidi, scale, spec, mood, rng);
    const bar3IdeaA = bar1IdeaA.map(ev => ({ ...ev }));
    const bar4End   = buildEndingBar4(bar1IdeaA, styleKey, rootMidi, scale, spec, mood, rng);

    const fourBarTemplates = [bar1IdeaA, bar2IdeaB, bar3IdeaA, bar4End];
    const out = [];

    for (let b = 0; b < bars; b++) {
      const tpl = (b === bars - 1 && bars > 1)
        ? bar4End
        : fourBarTemplates[b % 4];
      const barOffset = b * 4;
      for (let i = 0; i < tpl.length; i++) {
        const ev = tpl[i];
        out.push({
          t: roundBeat(barOffset + ev.t),
          d: roundBeat(Math.max(0.08, ev.d)),
          n: clampMidi(ev.n),
          v: clampVel(ev.v)
        });
      }
    }

    if (out.length > 0) {
      out[out.length - 1].n = rootMidi;
    }

    return out;
  }

  function getBackingForStyle(opts = {}) {
    const styleKey = String(opts.style || 'pop').toLowerCase();
    const moodKey = String(opts.mood || 'happy').toLowerCase();
    const keyName = String(opts.key || 'C');
    const bars = Math.max(1, Math.min(32, Number(opts.bars) || 4));
    const spec = STYLE_SPECS[styleKey] || STYLE_SPECS.pop;
    const keyOffset = KEY_OFFSETS[keyName] != null ? KEY_OFFSETS[keyName] : 0;
    const baseRoot = 48 + keyOffset + (moodKey === 'dark' ? -12 : 0);

    const chords = [];
    for (let b = 0; b < bars; b++) {
      const tones = spec.chords[b % spec.chords.length];
      chords.push({
        t: b * 4,
        d: 4,
        notes: tones.map(semi => baseRoot + semi)
      });
    }
    return {
      bpm: Math.round(spec.bpm * (moodKey === 'energetic' ? 1.08 : moodKey === 'chill' || moodKey === 'sad' ? 0.92 : 1)),
      swing: spec.swing,
      rootMidi: baseRoot + 12,
      description: spec.desc,
      chords
    };
  }

  const API = {
    STYLES: Object.keys(STYLE_SPECS),
    MOODS: Object.keys(MOOD_PROFILES),
    KEYS: ['C', 'D', 'Eb', 'E', 'F', 'G', 'A', 'Bb'],
    STYLE_SPECS,
    MOOD_PROFILES,
    make,
    getBackingForStyle
  };

  if (typeof window !== 'undefined') window.GW_MELODY = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})();
