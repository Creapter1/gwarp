/* GENERATED FILE - do not edit.
   Song identity for the melody library and for saved songs.
   Source: buffy/song-identity/{identity,bridge,sb3}.js or buffy/song-recipe/recipe.js
   Rebuild: node buffy/song-identity/build.js
   Loaded by gw-perf.js (Buffy's file); app.html is unchanged. */
/*
 * G-Warp song identity (A3 companion) — stable, human-readable identity for every melody in
 * the library and for every song the Song maker saves.
 *
 * Why a separate module: A3's recipe codec (`buffy/song-recipe/recipe.js`) says *what* state a
 * song had. This says *which song it is*: one identity per piece of music, unchanged by a rename,
 * a new name, another pack, or a save to a second sprite. Two identical pieces are one identity,
 * not two entries.
 *
 * Two things travel together:
 *   label  human-readable, what a person sees:  "Synthwave · Neon Run — melody, 112 BPM, A minor"
 *   key    content key, what equality uses:     derived from the notes only (never the name)
 * The label is the identity. The key is never shown on its own and is not a user-facing id.
 *
 * Works in Node (module.exports) and in the app (window.GW_SONG_IDENTITY).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GW_SONG_IDENTITY = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = '1.0';

  /* ---------- small helpers ---------- */
  const round3 = (n) => Math.round(Number(n) * 1000) / 1000;
  const clean = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();

  function fnv1a(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }
  const hash36 = (text) => fnv1a(text).toString(36);

  /* "synthwave" -> "Synthwave"; "lofi" -> "Lofi"; keeps names that are already words intact */
  function titleCase(value) {
    return clean(value)
      .split(' ')
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(' ');
  }

  const PART_NAMES = { melody: 'melody', backing: 'chords', bass: 'bass', drums: 'drums' };
  const partName = (part) => PART_NAMES[clean(part).toLowerCase()] || clean(part).toLowerCase() || 'melody';

  /* The Song maker keeps the key as a semitone index (0 = C). A label has to say "C major",
     not "0 major". */
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  function noteName(value) {
    if (value == null || value === '') return '';
    const n = Number(value);
    if (Number.isFinite(n)) return NOTE_NAMES[((Math.round(n) % 12) + 12) % 12];
    return clean(value);
  }

  /* ---------- melody content (the thing that decides identity) ---------- */
  /* Melodies in the library use two note shapes:
       pitched: [midi, startBeat, lengthBeats]
       drums:   [drumName, startBeat]
     Both are normalised: numbers rounded to 3 places, notes sorted by start then by pitch/name,
     so the same music always produces the same string regardless of the order it was written in. */
  function normaliseNote(note) {
    if (!Array.isArray(note) || note.length < 2) return null;
    const start = round3(note[1]);
    if (typeof note[0] === 'number') {
      const pitch = Math.round(note[0]);
      const len = note.length >= 3 ? round3(note[2]) : null;
      return len == null ? [pitch, start] : [pitch, start, len];
    }
    return [clean(note[0]).toLowerCase(), start];
  }

  function canonicalMelody(melody) {
    if (!melody || !Array.isArray(melody.notes)) return null;
    const notes = melody.notes.map(normaliseNote).filter(Boolean);
    notes.sort((a, b) => a[1] - b[1] || String(a[0]).localeCompare(String(b[0])) || (a[2] || 0) - (b[2] || 0));
    return JSON.stringify({
      part: partName(melody.part),
      bars: Math.max(0, Math.round(Number(melody.bars) || 0)),
      bpm: Math.max(0, Math.round(Number(melody.bpm) || 0)),
      notes
    });
  }

  /* the content key: notes + part + bars + tempo. NOT the name, genre, mood or theme,
     so renaming a melody, moving it to another pack or retagging it keeps its identity. */
  function melodyKey(melody) {
    const canon = canonicalMelody(melody);
    if (canon == null) return null;
    const notes = (melody.notes || []).length;
    return 'k' + hash36(canon) + '-' + notes.toString(36);
  }

  /* The human-readable identity. Genre, the melody's own name, then what it is. */
  function melodyLabel(melody) {
    const genre = titleCase(melody && melody.genre) || 'Melody';
    const name = clean(melody && melody.name) || 'Untitled';
    const bits = [partName(melody && melody.part)];
    if (melody && Number(melody.bpm)) bits.push(Math.round(Number(melody.bpm)) + ' BPM');
    if (melody && clean(melody.key)) bits.push(clean(melody.key));
    return genre + ' · ' + name + ' — ' + bits.join(', ');
  }

  function identityOfMelody(melody) {
    const key = melodyKey(melody);
    return {
      kind: 'melody',
      label: melodyLabel(melody),
      name: clean(melody && melody.name),
      genre: clean(melody && melody.genre),
      part: partName(melody && melody.part),
      bpm: melody && Number(melody.bpm) ? Math.round(Number(melody.bpm)) : null,
      musicalKey: clean(melody && melody.key) || null,
      key,
      sameAs: null
    };
  }

  /* ---------- one identity per piece of music ---------- */
  /* Same label twice but different music -> "Remix" suffix; same music twice (any names) ->
     one identity, the alias points at the canonical entry. Deterministic: the earliest item in
     load order wins, so the library's own order decides, not hash order. */
  function identifyLibrary(list) {
    const items = Array.isArray(list) ? list : [];
    const byKey = new Map();
    const labelCount = new Map();
    const out = [];

    for (const melody of items) {
      const id = identityOfMelody(melody);
      if (!id.key) { out.push(null); continue; }
      if (!byKey.has(id.key)) byKey.set(id.key, []);
      byKey.get(id.key).push({ id, melody });
      out.push(id);
    }

    for (let i = 0; i < out.length; i++) {
      const id = out[i];
      if (!id) continue;
      const group = byKey.get(id.key);
      const canonical = group[0].id;
      if (canonical !== id) {
        id.sameAs = canonical.label;
        id.label = canonical.label;           /* identical music reads as the one identity */
      } else {
        const seen = labelCount.get(id.label) || 0;
        labelCount.set(id.label, seen + 1);
        if (seen) id.label = id.label + ' (Remix ' + (seen + 1) + ')';   /* different music, same name */
      }
    }
    return out;
  }

  /* groups of duplicate content, for reporting */
  function duplicateGroups(list) {
    const items = Array.isArray(list) ? list : [];
    const byKey = new Map();
    for (const melody of items) {
      const key = melodyKey(melody);
      if (!key) continue;
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(melody);
    }
    return [...byKey.entries()]
      .filter(([, group]) => group.length > 1)
      .map(([key, group]) => ({
        key,
        canonical: melodyLabel(group[0]),
        aliases: group.slice(1).map((m) => melodyLabel(m))
      }));
  }

  /* ---------- songs (what the Song maker saves) ---------- */
  /* A saved song's identity comes from its A3 recipe: the recipe id is derived from the musical
     state only, so renaming the sound, saving it to a second sprite or re-saving after an edit
     that changes nothing keeps the same identity. */
  function songLabel(recipe, fallbackName) {
    if (!recipe) return clean(fallbackName) || 'Song';
    /* the current sound name wins: renaming a sound is a human act and the label should follow it,
       while the identity key (music) stays put. The recipe keeps the name it was saved with. */
    const name = clean(fallbackName) || clean(recipe.name) || 'Song';
    const bits = [];
    if (Number(recipe.parts)) bits.push(Math.round(Number(recipe.parts)) + ' parts');
    if (Number(recipe.bpm)) bits.push(Math.round(Number(recipe.bpm)) + ' BPM');
    const root = noteName(recipe.root), mode = clean(recipe.mode);
    if (root || mode) bits.push([root, mode].filter(Boolean).join(' '));
    return 'Song · ' + name + (bits.length ? ' — ' + bits.join(', ') : '');
  }

  /* A song's identity comes from its MUSICAL STATE, not from its rendered audio: the Song maker
     humanises timing (and adds vinyl dust) per render, so two renders of the same song have
     different PCM. The recipe id includes that audio fingerprint on purpose (it is how an edited
     song is distinguished from an untouched one), so identity uses its own content key. */
  function canonicalState(state) {
    const s = state || {};
    const grid = {};
    if (s.grid && typeof s.grid === 'object') {
      Object.keys(s.grid).sort().forEach((stem) => {
        const row = s.grid[stem];
        if (Array.isArray(row)) grid[stem] = row.map((v) => Math.round(Number(v) || 0));
      });
    }
    const inst = {};
    if (s.inst && typeof s.inst === 'object') Object.keys(s.inst).sort().forEach((k) => { inst[k] = clean(s.inst[k]); });
    return JSON.stringify({
      bpm: Math.round(Number(s.bpm) || 0),
      parts: Math.round(Number(s.parts) || 0),
      root: Math.round(Number(s.root) || 0),
      mode: clean(s.mode).toLowerCase(),
      tune: clean(s.tune).toLowerCase(),
      sound: clean(s.sound).toLowerCase(),
      seed: Math.round(Number(s.seed) || 0),
      dyn: Array.isArray(s.dyn) ? s.dyn.map((d) => (d ? 1 : 0)) : [],
      energy: Array.isArray(s.energy) ? s.energy.map((e) => clean(e)) : [],
      prog: Array.isArray(s.prog) ? s.prog.map((p) => clean(p)) : [],
      prog2: Array.isArray(s.prog2) ? s.prog2.map((p) => clean(p)) : [],
      grid: grid,
      inst: inst
    });
  }

  function songKey(state) {
    const parts = Math.round(Number(state && state.parts) || 0);
    return 's' + hash36(canonicalState(state)) + '-' + parts.toString(36);
  }

  function identityOfSong(recipe, fallbackName, state) {
    const contentKey = (recipe && (recipe.contentKey || recipe.gwKey)) || (state ? songKey(state) : null);
    if (!contentKey && !(recipe && recipe.id)) return null;
    return {
      kind: 'song',
      label: songLabel(recipe, fallbackName),
      key: String(contentKey || recipe.id),
      recipeId: recipe && recipe.id ? String(recipe.id) : null,
      name: clean(recipe && recipe.name) || clean(fallbackName),
      sameAs: null
    };
  }

  /* ---------- attach to a live library / sound list ---------- */
  function annotateMelodies(list) {
    const ids = identifyLibrary(list);
    let done = 0;
    ids.forEach((id, i) => {
      if (!id) return;
      Object.defineProperty(list[i], 'gwIdentity', { value: id, configurable: true, writable: true, enumerable: false });
      done++;
    });
    return { total: list.length, identified: done, duplicates: duplicateGroups(list) };
  }

  function annotateSounds(sounds) {
    let done = 0;
    const groups = new Map();
    for (const sound of sounds || []) {
      const id = identityOfSong(sound && sound.gwSong, sound && sound.name);
      if (!id) continue;
      Object.defineProperty(sound, 'gwIdentity', { value: id, configurable: true, writable: true, enumerable: false });
      done++;
      if (!groups.has(id.key)) groups.set(id.key, []);
      groups.get(id.key).push(sound);
    }
    const duplicates = [...groups.entries()].filter(([, g]) => g.length > 1)
      .map(([key, g]) => ({ key, canonical: g[0].gwIdentity.label, aliases: g.slice(1).map((s) => s.name) }));
    return { total: (sounds || []).length, identified: done, duplicates };
  }

  return {
    VERSION,
    canonicalMelody,
    melodyKey,
    melodyLabel,
    identityOfMelody,
    identifyLibrary,
    duplicateGroups,
    songLabel,
    identityOfSong,
    annotateMelodies,
    annotateSounds,
    canonicalState,
    songKey,
    noteName,
    titleCase,
    partName
  };
});

/*
 * Song identity bridge — the part that runs inside G-Warp.
 *
 * app.html loads gw-perf.js (Buffy's file), which loads this file, so nothing here touches
 * app.html. It does three additive things and never blocks or breaks the app:
 *   1. every melody in GW_PACKS.melodies (the list the app loads and hands out) gets a
 *      gwIdentity: { label, key, sameAs } — human-readable, stable across renames;
 *   2. every song the Song maker saves gets a gwSong recipe (A3) and a gwIdentity, so the
 *      sound keeps its identity after a rename and after the project is saved;
 *   3. window.GW_SONG_IDENTITY grows a small query API: library(), find(), duplicates(),
 *      songs(), report().
 * Every entry point is wrapped in try/catch: a bug here must never stop a save or a pack load.
 */
(function () {
  'use strict';

  var ID = window.GW_SONG_IDENTITY;
  if (!ID || ID.__wired) return;
  ID.__wired = true;

  var log = [];
  function note(msg, extra) {
    try { log.push({ at: new Date().toISOString(), msg: msg, extra: extra === undefined ? null : extra }); if (log.length > 40) log.shift(); } catch (e) {}
  }
  function err(e) { try { console.warn('[GW song identity]', e && e.message ? e.message : e); } catch (x) {} }

  /* ---------- what the app has right now ---------- */
  function packs() { try { return window.GW_PACKS || null; } catch (e) { return null; } }
  function melodies() { var P = packs(); return P && Array.isArray(P.melodies) ? P.melodies : []; }
  function sprites() { try { return (window.Engine && window.Engine.sprites) || []; } catch (e) { return []; } }
  function allSounds() {
    var out = [];
    sprites().forEach(function (s) { (s && s.sounds || []).forEach(function (snd) { out.push(snd); }); });
    return out;
  }

  /* ---------- 1. the melody library ---------- */
  function annotateMelodies() {
    try {
      var list = melodies();
      if (!list.length) return { total: 0, identified: 0, duplicates: [] };
      var result = ID.annotateMelodies(list);
      note('melodies annotated', result.identified + '/' + result.total);
      return result;
    } catch (e) { err(e); return { total: 0, identified: 0, duplicates: [], error: String(e && e.message || e) }; }
  }

  /* ---------- 2. songs ---------- */
  function annotateSongs() {
    try {
      var result = ID.annotateSounds(allSounds());
      note('sounds annotated', result.identified + '/' + result.total);
      return result;
    } catch (e) { err(e); return { total: 0, identified: 0, duplicates: [], error: String(e && e.message || e) }; }
  }

  function songState() {
    try {
      var A = window.GW_SONG_ARRANGER;
      var st = A && A.state;
      var S = typeof st === 'function' ? st() : st;
      return S && typeof S === 'object' ? S : null;
    } catch (e) { err(e); return null; }
  }

  /* Attach the A3 recipe when the Song maker saves. Wrapping the studio's addSound (not
     saveToSprite) means every save path is covered and the rendered AudioBuffer is right here,
     so the fingerprint costs nothing extra. */
  function wrapAddSound() {
    try {
      var ST = window.GW_V1570_STUDIO;
      if (!ST || typeof ST.addSound !== 'function') return false;
      if (ST.addSound.__gwIdentity) return true;
      var original = ST.addSound;
      var wrapped = function (name, buffer, extra) {
        var asset = original.apply(this, arguments);
        try {
          if (asset && extra && /song maker/i.test(String(extra.generator || '')) && window.GW_SONG_RECIPE && !asset.gwSong) {
            var S = songState() || {};
            var recipe = window.GW_SONG_RECIPE.makeRecipe(S, window.GW_SONG_RECIPE.audioPrint(buffer), {
              name: asset.name,
              nameAtSave: asset.name,
              app: (window.GW && (window.GW.versionLabel || window.GW.version)) || ''
            });
            recipe.contentKey = ID.songKey(S);   /* identity from the music, not the rendered audio */
            asset.gwSong = recipe;
            asset.gwAudio = recipe.audio;
            note('song recipe attached', asset.name + ' ' + recipe.id + ' · ' + recipe.contentKey);
          }
          var id = ID.identityOfSong(asset && asset.gwSong, asset && asset.name);
          if (id) Object.defineProperty(asset, 'gwIdentity', { value: id, configurable: true, writable: true, enumerable: false });
        } catch (e) { err(e); }
        return asset;
      };
      wrapped.__gwIdentity = true;
      ST.addSound = wrapped;
      note('addSound wrapped');
      return true;
    } catch (e) { err(e); return false; }
  }

  /* ---------- 3. the query API ---------- */
  function library() {
    annotateMelodies();
    return melodies().map(function (m) { return m.gwIdentity || null; }).filter(Boolean);
  }

  function find(query) {
    var q = String(query == null ? '' : query).trim().toLowerCase();
    if (!q) return [];
    annotateMelodies();
    var hits = [];
    melodies().forEach(function (m) {
      var id = m.gwIdentity;
      if (!id) return;
      var hay = (id.label + ' ' + id.name + ' ' + id.genre + ' ' + id.part + ' ' + (id.key || '')).toLowerCase();
      if (hay.indexOf(q) !== -1) hits.push(id);
    });
    return hits;
  }

  function duplicates() {
    var lib = annotateMelodies();
    var songs = annotateSongs();
    return { melodies: ID.duplicateGroups(melodies()), songs: songs.duplicates, melodyCount: lib.total, soundCount: songs.total };
  }

  function songs() {
    annotateSongs();
    return allSounds().filter(function (s) { return s && s.gwSong; }).map(function (s) {
      return { name: s.name, id: s.gwSong.id, label: s.gwIdentity ? s.gwIdentity.label : ID.songLabel(s.gwSong, s.name) };
    });
  }

  function report() {
    var lib = annotateMelodies();
    var snd = annotateSongs();
    return {
      version: ID.VERSION,
      recipeLoaded: !!window.GW_SONG_RECIPE,
      melodies: lib,
      songs: { total: snd.total, identified: snd.identified, duplicates: snd.duplicates },
      wrapped: !!(window.GW_V1570_STUDIO && window.GW_V1570_STUDIO.addSound && window.GW_V1570_STUDIO.addSound.__gwIdentity),
      log: log.slice(-10)
    };
  }

  ID.library = library;
  ID.find = find;
  ID.duplicates = duplicates;
  ID.songs = songs;
  ID.report = report;
  ID.annotate = function () { return { melodies: annotateMelodies(), songs: annotateSongs() }; };

  /* ---------- boot ---------- */
  try {
    annotateMelodies();
    annotateSongs();
    wrapAddSound();
    window.addEventListener('gwarp-packs-loaded', function () { try { annotateMelodies(); annotateSongs(); wrapAddSound(); } catch (e) { err(e); } });
    /* the studio script and the pack loader can finish after this file: retry briefly, then stop */
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      var ok = wrapAddSound();
      annotateMelodies();
      if ((ok && melodies().length) || tries > 40) clearInterval(timer);
    }, 250);
  } catch (e) { err(e); }
})();
