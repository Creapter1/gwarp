/* GENERATED FILE - do not edit.
   A3 song recipe codec, copied verbatim so the app can load it.
   Source: buffy/song-identity/{identity,bridge,sb3}.js or buffy/song-recipe/recipe.js
   Rebuild: node buffy/song-identity/build.js
   Loaded by gw-perf.js (Buffy's file); app.html is unchanged. */
/*
 * G-Warp Song maker recipe codec (A3).
 *
 * This is NOT a second Song maker: it has no UI, no audio generator and no
 * grid of its own. It serializes the existing `S` state, fingerprints the
 * rendered AudioBuffer, writes/reads the Stage comment carrier, and matches a
 * recipe back to a sound after a Scratch round-trip.
 *
 * Works in Node (module.exports) and the browser (window.GW_SONG_RECIPE).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GW_SONG_RECIPE = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 1;
  const COMMENT_TAG = '[GWARP-SONG v1]';
  const END_TAG = '[/GWARP-SONG]';
  const MAX_COMMENT_BYTES = 20000;
  const WARN_COMMENT_BYTES = 15000;
  const ID_RE = /^gws_[0-9a-z]{10}$/;
  const MAX_PARTS = 256;

  function isObject(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v);
  }

  function clone(v) {
    if (v === undefined) return undefined;
    try {
      return JSON.parse(JSON.stringify(v));
    } catch (e) {
      return null;
    }
  }

  function num(v, fallback) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function int(v, fallback, min, max) {
    let n = Math.round(num(v, fallback));
    if (min != null && n < min) n = min;
    if (max != null && n > max) n = max;
    return n;
  }

  function arr(v) {
    return Array.isArray(v) ? clone(v) : [];
  }

  function text(v, fallback) {
    return typeof v === 'string' ? v : fallback == null ? '' : String(fallback);
  }

  function stable(v) {
    if (Array.isArray(v)) return v.map(stable);
    if (isObject(v)) {
      const out = {};
      for (const key of Object.keys(v).sort()) {
        if (v[key] !== undefined) out[key] = stable(v[key]);
      }
      return out;
    }
    if (typeof v === 'number' && !Number.isFinite(v)) return 0;
    return v;
  }

  function canonical(v) {
    return JSON.stringify(stable(v));
  }

  function fnv1a(str, seed) {
    let h = (seed == null ? 2166136261 : seed) >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function b36(n, width) {
    return (n >>> 0).toString(36).padStart(width, '0');
  }

  // The ID deliberately ignores name/saved; rename and re-save must not make a
  // new identity. Two FNV streams give 10 base36 chars (about 51 bits).
  function recipeId(recipe) {
    const body = clone(recipe) || {};
    delete body.id;
    delete body.name;
    delete body.saved;
    delete body.nameAtSave;
    const s = canonical(body);
    return 'gws_' + b36(fnv1a(s), 7).slice(0, 5) + b36(fnv1a(s, 0x9e3779b9), 7).slice(0, 5);
  }

  function normalizeAudio(audio) {
    if (!isObject(audio)) return { dur: 0, pcm: '0', env: '0' };
    const out = {
      dur: Math.round(num(audio.dur != null ? audio.dur : audio.duration, 0) * 10) / 10,
      pcm: text(audio.pcm, '0'),
      env: text(audio.env, '0')
    };
    /* keep the coarse loudness curve (see audioPrintFromPCM): it is what lets a sound be recognised
       again after its audio has been written to a WAV and decoded */
    if (Array.isArray(audio.sig) && audio.sig.length) out.sig = audio.sig.map((v) => Math.max(0, Math.min(255, Math.round(num(v, 0)))));
    return out;
  }

  /*
   * Fingerprint an AudioBuffer (or {channels:[Float32Array], sampleRate}).
   * `pcm` catches an exact copy; `env` is a 100 Hz RMS envelope and survives
   * some re-encoding / volume changes. Duration is rounded to 0.1 s.
   */
  function audioPrintFromPCM(channels, sampleRate, duration) {
    const ch = Array.isArray(channels) ? channels : [channels];
    const n = ch[0] && typeof ch[0].length === 'number' ? ch[0].length : 0;
    const rate = num(sampleRate, 44100) || 44100;
    let h = 2166136261;
    for (let i = 0; i < n; i++) {
      let s = 0;
      for (let c = 0; c < ch.length; c++) s += num(ch[c][i], 0);
      s = Math.max(-1, Math.min(1, s / Math.max(1, ch.length)));
      h ^= (s * 32767) | 0;
      h = Math.imul(h, 16777619) >>> 0;
    }
    /* A coarse 64-bucket loudness curve. Exact PCM and the 100 Hz envelope both break when the
       audio is written to a 16-bit WAV and decoded again (Scratch does exactly that), but this
       curve survives it, so a sound can still be recognised after a round-trip. */
    const buckets = 64;
    const sig = [];
    for (let b = 0; b < buckets; b++) {
      const from = Math.floor((n * b) / buckets), to = Math.floor((n * (b + 1)) / buckets);
      let sum = 0, count = 0;
      for (let i = from; i < to; i++) {
        let s = 0;
        for (let c = 0; c < ch.length; c++) s += num(ch[c][i], 0);
        s /= Math.max(1, ch.length);
        sum += s * s;
        count++;
      }
      sig.push(count ? Math.min(255, Math.round(Math.sqrt(sum / count) * 255)) : 0);
    }

    let eh = 2166136261;
    const step = Math.max(1, Math.round(rate / 100));
    for (let i = 0; i < n; i += step) {
      let sum = 0;
      let count = 0;
      const end = Math.min(n, i + step);
      for (let j = i; j < end; j++) {
        let s = 0;
        for (let c = 0; c < ch.length; c++) s += num(ch[c][j], 0);
        s /= Math.max(1, ch.length);
        sum += s * s;
        count++;
      }
      const q = Math.min(255, Math.round(Math.sqrt(sum / Math.max(1, count)) * 255));
      eh = (eh ^ q) >>> 0;
      eh = Math.imul(eh, 16777619) >>> 0;
    }
    return {
      dur: Math.round((num(duration, n / rate) || 0) * 10) / 10,
      pcm: (h >>> 0).toString(36),
      env: (eh >>> 0).toString(36),
      sig: sig
    };
  }

  function audioPrint(buffer) {
    if (!buffer) throw new Error('audioPrint needs an AudioBuffer or PCM channels');
    if (typeof buffer.getChannelData === 'function') {
      const ch = [];
      for (let c = 0; c < buffer.numberOfChannels; c++) ch.push(buffer.getChannelData(c));
      return audioPrintFromPCM(ch, buffer.sampleRate, buffer.duration);
    }
    if (Array.isArray(buffer.channels)) {
      return audioPrintFromPCM(buffer.channels, buffer.sampleRate, buffer.duration);
    }
    throw new Error('Unsupported audio buffer');
  }

  /*
   * Build the canonical recipe from the existing Song maker state. `audio` is
   * optional; call audioPrint(renderedBuffer) when saving.
   */
  function makeRecipe(state, audio, options) {
    const s = isObject(state) ? state : {};
    const o = isObject(options) ? options : {};
    const recipe = {
      v: VERSION,
      id: '',
      name: text(o.name, text(s.name, 'Song')),
      app: text(o.app, text(s.app, 'unknown')),
      saved: text(o.saved, new Date().toISOString()),
      bpm: num(s.bpm, 120),
      tempo: text(s.tempo, 'normal'),
      root: int(s.root, 0),
      mode: text(s.mode, 'major'),
      parts: int(s.parts, 12, 1, MAX_PARTS),
      sound: text(s.sound, ''),
      tune: text(s.tune, ''),
      vol: num(s.vol, 0.8),
      seed: int(s.seed, 0),
      genre: text(s.genre, ''),
      mood: text(s.mood, ''),
      theme: text(s.theme, ''),
      genres: arr(s.genres),
      moods: arr(s.moods),
      themes: arr(s.themes),
      prog: arr(s.prog),
      prog2: arr(s.prog2),
      energy: arr(s.energy),
      grid: isObject(s.grid) ? clone(s.grid) : {},
      dyn: arr(s.dyn),
      inst: isObject(s.inst) ? clone(s.inst) : {},
      partMeta: arr(s.partMeta),
      styleSections: arr(s.styleSections),
      my: isObject(s.my) ? clone(s.my) : {},
      myMelody: clone(s.myMelody == null ? null : s.myMelody),
      motifs: arr(s.motifs),
      voice: isObject(o.voice) ? clone(o.voice) : isObject(s.voice) ? clone(s.voice) : { mode: 'off', on: [], vol: 0.7 },
      audio: normalizeAudio(audio),
      nameAtSave: text(o.nameAtSave, text(o.name, text(s.name, 'Song')))
    };
    if (s.modeOverride != null) recipe.modeOverride = clone(s.modeOverride);
    recipe.id = text(o.id, '') || recipeId(recipe);
    return recipe;
  }

  function byteLength(str) {
    if (typeof Buffer !== 'undefined' && Buffer.byteLength) return Buffer.byteLength(str, 'utf8');
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(str).length;
    return unescape(encodeURIComponent(str)).length;
  }

  function hasUnsafe(v, path, errors) {
    if (v == null) return;
    if (typeof v === 'function') {
      errors.push(`${path || 'recipe'}: function values are not allowed`);
      return;
    }
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) hasUnsafe(v[i], `${path}[${i}]`, errors);
      return;
    }
    if (!isObject(v)) return;
    for (const key of Object.keys(v)) {
      if (/^(dataUrl|buffer|audioBuffer|canvas|node|element)$/i.test(key)) {
        errors.push(`${path ? path + '.' : ''}${key}: runtime/DOM value is not allowed`);
      }
      hasUnsafe(v[key], path ? `${path}.${key}` : key, errors);
    }
  }

  function validateRecipe(recipe) {
    const errors = [];
    const warnings = [];
    if (!isObject(recipe)) return { ok: false, errors: ['recipe is not an object'], warnings, bytes: 0 };
    if (recipe.v !== VERSION) errors.push(`v must be ${VERSION}`);
    if (!ID_RE.test(String(recipe.id || ''))) errors.push('id must look like gws_<10 base36>');
    if (typeof recipe.name !== 'string' || !recipe.name.trim()) errors.push('name is required');
    if (typeof recipe.name === 'string' && recipe.name.length > 80) errors.push('name is longer than 80 chars');
    if (!Number.isInteger(recipe.parts) || recipe.parts < 1 || recipe.parts > MAX_PARTS) {
      errors.push(`parts must be an integer 1..${MAX_PARTS}`);
    }
    if (!isObject(recipe.grid)) errors.push('grid must be an object');
    if (!Array.isArray(recipe.energy)) errors.push('energy must be an array');
    if (!Array.isArray(recipe.dyn)) errors.push('dyn must be an array');
    if (!Array.isArray(recipe.partMeta)) errors.push('partMeta must be an array');
    if (!Array.isArray(recipe.styleSections)) errors.push('styleSections must be an array');
    if (!isObject(recipe.audio)) errors.push('audio must be an object');
    else {
      if (typeof recipe.audio.pcm !== 'string' || !recipe.audio.pcm) errors.push('audio.pcm is required');
      if (typeof recipe.audio.env !== 'string' || !recipe.audio.env) errors.push('audio.env is required');
      if (!Number.isFinite(recipe.audio.dur) || recipe.audio.dur < 0) errors.push('audio.dur must be a number');
    }
    hasUnsafe(recipe, '', errors);
    const json = JSON.stringify(recipe);
    const bytes = byteLength(json);
    if (bytes > MAX_COMMENT_BYTES) errors.push(`recipe is ${bytes} bytes (comment limit ${MAX_COMMENT_BYTES})`);
    else if (bytes > WARN_COMMENT_BYTES) warnings.push(`recipe is ${bytes} bytes; keep an eye on the 20 KB comment limit`);
    return { ok: errors.length === 0, errors, warnings, bytes };
  }

  function isRecipe(value) {
    return typeof value === 'string' && value.indexOf(COMMENT_TAG) >= 0 && value.indexOf(END_TAG) >= 0;
  }

  function commentId(id) {
    return 'gwsong_' + String(id || '').replace(/[^a-z0-9_]/gi, '');
  }

  function commentFor(recipe, index) {
    const check = validateRecipe(recipe);
    if (!check.ok) throw new Error('cannot make a comment: ' + check.errors.join('; '));
    const i = Math.max(0, int(index, 0));
    const textValue = `🎵 G-Warp song data - please keep\n${COMMENT_TAG}\n${JSON.stringify({
      v: VERSION,
      id: recipe.id,
      audio: recipe.audio,
      recipe
    })}\n${END_TAG}`;
    if (byteLength(textValue) > MAX_COMMENT_BYTES) {
      throw new Error(`comment is ${byteLength(textValue)} bytes (limit ${MAX_COMMENT_BYTES})`);
    }
    return {
      id: commentId(recipe.id),
      text: textValue,
      x: 20 + (i % 5) * 20,
      y: 20 + i * 28,
      width: 260,
      height: 24,
      minimized: true,
      blockId: null
    };
  }

  function commentsFor(sounds, startIndex) {
    const out = {};
    const start = int(startIndex, 0);
    (Array.isArray(sounds) ? sounds : []).forEach((snd, i) => {
      if (!snd || !snd.gwSong) return;
      const c = commentFor(snd.gwSong, start + i);
      out[c.id] = c;
    });
    return out;
  }

  function parseComment(value) {
    if (!isRecipe(value)) throw new Error('not a G-Warp song comment');
    const m = value.match(/\[GWARP-SONG v1\]\s*([\s\S]*?)\s*\[\/GWARP-SONG\]/);
    if (!m) throw new Error('missing G-Warp song body');
    const envelope = JSON.parse(m[1]);
    const raw = isObject(envelope.recipe) ? envelope.recipe : envelope;
    const recipe = clone(raw);
    if (!isObject(recipe)) throw new Error('recipe is not an object');
    if (envelope.id && !recipe.id) recipe.id = envelope.id;
    if (envelope.audio && !recipe.audio) recipe.audio = envelope.audio;
    const check = validateRecipe(recipe);
    if (!check.ok) throw new Error('bad recipe: ' + check.errors.join('; '));
    return recipe;
  }

  function tryParseComment(value) {
    try {
      return parseComment(value);
    } catch (e) {
      return null;
    }
  }

  /*
   * Split a Scratch comments object into recipe comments and ordinary ones.
   * `rest` is safe to create as visible .gw38-comment stacks.
   */
  function parseComments(comments) {
    const recipes = [];
    const rest = {};
    const errors = [];
    for (const [key, cm] of Object.entries(comments || {})) {
      if (cm && isRecipe(cm.text)) {
        try {
          recipes.push(parseComment(cm.text));
        } catch (e) {
          errors.push(`${key}: ${e.message}`);
        }
      } else {
        rest[key] = cm;
      }
    }
    return { recipes, rest, errors };
  }

  function soundAudio(snd) {
    if (!snd) return null;
    if (isObject(snd.gwAudio)) return snd.gwAudio;
    if (isObject(snd.gwSong) && isObject(snd.gwSong.audio)) return snd.gwSong.audio;
    return null;
  }

  function soundDuration(snd) {
    if (!snd) return 0;
    return num(snd.duration, num(snd.gwAudio && snd.gwAudio.dur, 0));
  }

  /*
   * Match order: exact pcm -> env + duration (±0.2 s) -> name + duration.
   * `claimed` prevents attaching one recipe to two identical sounds.
   */
  /* how different two loudness curves are: mean absolute bucket difference (0..255), or Infinity
     when they cannot be compared. 6 keeps saves of the same song together and leaves different
     songs apart - the tests check both sides. */
  function sigDistance(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || a.length !== b.length) return Infinity;
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += Math.abs(num(a[i], 0) - num(b[i], 0));
    return sum / a.length;
  }

  function matchRecipe(recipe, sounds, claimed) {
    const r = recipe && recipe.audio;
    if (!r) return -1;
    const used = claimed instanceof Set ? claimed : new Set(claimed || []);
    const list = Array.isArray(sounds) ? sounds : [];
    const free = (i) => !used.has(i) && !(list[i] && list[i].gwSong);
    if (r.pcm && r.pcm !== '0') {
      for (let i = 0; i < list.length; i++) {
        const a = soundAudio(list[i]);
        if (a && a.pcm === r.pcm && free(i)) return i;
      }
    }
    /* after a Scratch round-trip the PCM is re-encoded, so compare the coarse curve instead */
    if (Array.isArray(r.sig) && r.sig.length) {
      let best = -1, bestD = Infinity;
      for (let i = 0; i < list.length; i++) {
        const a = soundAudio(list[i]);
        if (!a || !free(i)) continue;
        const d = sigDistance(a.sig, r.sig);
        if (d <= 6 && Math.abs(soundDuration(list[i]) - num(r.dur, 0)) <= 0.3 && d < bestD) { best = i; bestD = d; }
      }
      if (best >= 0) return best;
    }
    for (let i = 0; i < list.length; i++) {
      const a = soundAudio(list[i]);
      if (a && a.env === r.env && Math.abs(soundDuration(list[i]) - num(r.dur, 0)) <= 0.2 && free(i)) return i;
    }
    const name = String((recipe && recipe.nameAtSave) || (recipe && recipe.name) || '');
    if (name) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] && list[i].name === name && Math.abs(soundDuration(list[i]) - num(r.dur, 0)) <= 0.2 && free(i)) return i;
      }
    }
    return -1;
  }

  function attachRecipes(sounds, recipes) {
    const out = clone(Array.isArray(sounds) ? sounds : []) || [];
    const claimed = new Set();
    const seen = new Set();
    const orphans = [];
    for (const recipe of Array.isArray(recipes) ? recipes : []) {
      if (!recipe || !recipe.id || seen.has(recipe.id)) {
        orphans.push(recipe);
        continue;
      }
      seen.add(recipe.id);
      const i = matchRecipe(recipe, out, claimed);
      if (i < 0) {
        orphans.push(recipe);
        continue;
      }
      out[i].gwSong = clone(recipe);
      out[i].gwAudio = clone(recipe.audio);
      claimed.add(i);
    }
    return { sounds: out, claimed: [...claimed], orphans };
  }

  return {
    VERSION,
    COMMENT_TAG,
    END_TAG,
    MAX_COMMENT_BYTES,
    WARN_COMMENT_BYTES,
    canonical,
    clone,
    recipeId,
    makeRecipe,
    audioPrint,
    audioPrintFromPCM,
    validateRecipe,
    isRecipe,
    commentId,
    commentFor,
    commentsFor,
    parseComment,
    tryParseComment,
    parseComments,
    matchRecipe,
    attachRecipes,
    sigDistance
  };
});
