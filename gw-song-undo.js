/* GENERATED FILE - do not edit.
   A7 undo/redo: full-song snapshot, one push per gesture, 100-entry cap,
   redo, and incremental cell paint. Source: buffy/a7-undo/undo.js
   Rebuild: node buffy/a7-undo/build.js
   Loaded by gw-perf.js (Buffy's file); app.html is unchanged. */
/*
 * G-Warp undo / redo + smooth editing (A7).
 *
 * Chosen model (A): one full-state snapshot before every real edit.
 *   - snapshot fields: parts, grid, energy, dyn, partMeta, inst, bpm, tempo,
 *     root, mode, modeOverride, sound, tune, vol, lenSec, styleSections, my,
 *     myMelody, seed, prog, prog2, motifs, sel + a voice membership snapshot;
 *   - JSON, cap 100 entries, drop the oldest;
 *   - push once per gesture (a drag pushes at the start, not per move);
 *   - continuous controls coalesce inside a 300 ms window keyed by the control;
 *   - redo stack, cleared by the next real mutation;
 *   - restore assigns fields, never calls generate(), and keeps the playhead
 *     inside the restored part count.
 *
 * Rejected model (B): exactly what the shipped app does today.
 *   songSnap() = JSON of { grid, energy, dyn }, cap 60, no redo, and no
 *   settings/parts/voice/selection in the snapshot. It is preserved here as
 *   legacySnap() / legacyPush() / legacyUndo() and asserted against the real
 *   live song: undoing a BPM change leaves the new BPM in place.
 *
 * Smooth editing: paintPlan(before, after) says whether an edit needs a full
 * grid rebuild or only one cell/one dyn button/one energy button. The live
 * 12-part grid has 117 nodes; a cell edit touches 1.
 *
 * Works in Node (module.exports) and in the app (window.GW_SONG_UNDO).
 * No DOM, no audio, no app.html access.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GW_SONG_UNDO = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = '1.0';
  const MODEL = 'full-state-snapshot';
  const ALTERNATIVE = 'shipped-grid-energy-dyn';
  const LIMIT = 100;
  const LEGACY_LIMIT = 60;
  const COALESCE_MS = 300;
  const MAX_PARTS = 256;

  /* Every field the chosen snapshot restores. `voice` is captured separately
     because it lives on window.GW_SONG_VOICE, not on S. */
  const FIELDS = [
    'parts', 'grid', 'energy', 'dyn', 'partMeta', 'inst', 'bpm', 'tempo',
    'root', 'mode', 'modeOverride', 'sound', 'tune', 'vol', 'lenSec',
    'styleSections', 'my', 'myMelody', 'seed', 'prog', 'prog2', 'motifs',
    'sel', 'voice'
  ];

  const SETTING_FIELDS = [
    'bpm', 'tempo', 'root', 'mode', 'modeOverride', 'sound', 'tune', 'vol',
    'lenSec', 'styleSections', 'my', 'myMelody', 'seed', 'prog', 'prog2',
    'motifs'
  ];

  const ENERGY_LEVEL = { quiet: 0, mid: 1, intense: 2, extreme: 3, outro: 0 };

  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const int = (v, fallback) => (Number.isInteger(v) ? v : Number.isFinite(Number(v)) ? Math.trunc(Number(v)) : fallback);
  const clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  function ensure(state) {
    if (!state || typeof state !== 'object' || Array.isArray(state)) throw new TypeError('state must be an object');
    return state;
  }

  function partsOf(state) {
    return clamp(int(state && state.parts, 0), 0, MAX_PARTS);
  }

  /* ------------------------------------------------------------- snapshot -- */

  function capture(state, voiceOn, opts) {
    ensure(state);
    const o = opts || {};
    const fields = {};
    for (const key of FIELDS) {
      if (key === 'voice') continue;
      if (key === 'sel' && o.sel !== undefined) continue;
      if (state[key] !== undefined) fields[key] = clone(state[key]);
    }
    if (o.sel !== undefined && o.sel !== null) fields.sel = [...(o.sel instanceof Set ? o.sel : o.sel)];
    else if (state.sel !== undefined) fields.sel = clone(state.sel);
    if (voiceOn !== undefined && voiceOn !== null) fields.voice = [...(voiceOn instanceof Set ? voiceOn : voiceOn)];
    else if (state.voice !== undefined) fields.voice = clone(state.voice);
    return {
      v: 1,
      key: o.key == null ? null : String(o.key),
      at: Number.isFinite(o.at) ? o.at : 0,
      bytes: JSON.stringify(fields).length,
      fields
    };
  }

  function snapshotBytes(state, voiceOn, opts) {
    return capture(state, voiceOn, opts).bytes;
  }

  function fingerprint(state, voiceOn, opts) {
    return JSON.stringify(capture(state, voiceOn, opts).fields);
  }

  /* Assign every captured field. Fields that were absent before are removed,
     so undoing an "add part" or a first style section restores the absence,
     not a zero. */
  function restore(state, snap, applyVoice) {
    ensure(state);
    if (!snap || typeof snap !== 'object' || !snap.fields || typeof snap.fields !== 'object') {
      throw new TypeError('snapshot must carry fields');
    }
    const changed = [];
    for (const key of FIELDS) {
      if (key === 'voice') continue;
      const wanted = Object.prototype.hasOwnProperty.call(snap.fields, key);
      const had = Object.prototype.hasOwnProperty.call(state, key);
      if (!wanted) {
        if (had) {
          delete state[key];
          changed.push(key);
        }
        continue;
      }
      const value = clone(snap.fields[key]);
      if (!same(state[key], value)) changed.push(key);
      state[key] = value;
    }
    let voice = null;
    if (Array.isArray(snap.fields.voice)) {
      const n = partsOf(state);
      voice = snap.fields.voice.map(Number).filter((v) => Number.isInteger(v) && v >= 0 && v < n);
      if (typeof applyVoice === 'function') {
        try { applyVoice(voice); } catch (err) { /* voice is membership, never the recording */ }
      }
      changed.push('voice');
    }
    return { changed, voice, parts: partsOf(state) };
  }

  function boundPart(part, parts) {
    const n = clamp(int(parts, 0), 0, MAX_PARTS);
    if (!n) return -1;
    return clamp(int(part, 0), 0, n - 1);
  }

  /* ------------------------------------------------------------- history --- */

  function createHistory(opts) {
    const o = opts || {};
    const limit = clamp(int(o.limit, LIMIT), 1, 1000);
    const coalesceMs = Math.max(0, Number.isFinite(o.coalesceMs) ? o.coalesceMs : COALESCE_MS);
    const undo = [];
    const redo = [];
    let lastKey = null;
    let lastAt = -Infinity;
    let activeKey = null;
    let lastSnap = null;

    function stats() {
      let bytes = 0;
      for (const s of undo) bytes += s.bytes;
      for (const s of redo) bytes += s.bytes;
      return { undo: undo.length, redo: redo.length, limit, bytes, lastKey, activeKey };
    }

    function nowOf(opts2) {
      return opts2 && Number.isFinite(opts2.now) ? opts2.now : 0;
    }

    function pushSnapshot(snap) {
      undo.push(snap);
      if (undo.length > limit) undo.shift();
      redo.length = 0;
      lastSnap = snap;
      return { pushed: true, snapshot: snap, ...stats() };
    }

    /* A discrete edit: push the state as it is before the mutation. */
    function begin(key, state, voiceOn, opts2) {
      const now = nowOf(opts2);
      const k = key == null ? 'edit' : String(key);
      if (opts2 && opts2.coalesce && undo.length && lastKey === k && now - lastAt <= coalesceMs) {
        lastAt = now;
        return { pushed: false, reason: 'coalesced', ...stats() };
      }
      const snap = capture(state, voiceOn, { key: k, at: now, sel: opts2 && opts2.sel });
      if (lastSnap && same(lastSnap.fields, snap.fields)) {
        lastAt = now;
        return { pushed: false, reason: 'unchanged', ...stats() };
      }
      lastKey = k;
      lastAt = now;
      return pushSnapshot(snap);
    }

    /* A drag: the first call pushes, the rest of the gesture is skipped. */
    function gestureStart(key, state, voiceOn, opts2) {
      const k = key == null ? 'gesture' : String(key);
      if (activeKey === k) return { pushed: false, reason: 'gesture', ...stats() };
      activeKey = k;
      return begin(k, state, voiceOn, opts2);
    }

    function gestureEnd(key) {
      if (key == null || String(key) === activeKey) activeKey = null;
    }

    function undoNow(state, voiceOn, opts2) {
      if (!undo.length) return { ok: false, reason: 'empty', ...stats() };
      const snap = undo.pop();
      const current = capture(state, voiceOn, {
        key: 'redo',
        at: nowOf(opts2),
        sel: opts2 && opts2.sel
      });
      redo.push(current);
      if (redo.length > limit) redo.shift();
      const restored = restore(state, snap, opts2 && opts2.applyVoice);
      lastKey = null;
      lastAt = -Infinity;
      activeKey = null;
      lastSnap = null;
      return { ok: true, snapshot: snap, restored, ...stats() };
    }

    function redoNow(state, voiceOn, opts2) {
      if (!redo.length) return { ok: false, reason: 'empty', ...stats() };
      const snap = redo.pop();
      const current = capture(state, voiceOn, {
        key: 'undo',
        at: nowOf(opts2),
        sel: opts2 && opts2.sel
      });
      undo.push(current);
      if (undo.length > limit) undo.shift();
      const restored = restore(state, snap, opts2 && opts2.applyVoice);
      lastKey = null;
      lastAt = -Infinity;
      activeKey = null;
      lastSnap = null;
      return { ok: true, snapshot: snap, restored, ...stats() };
    }

    return {
      begin,
      gestureStart,
      gestureEnd,
      undoNow,
      redoNow,
      stats,
      canUndo: () => undo.length > 0,
      canRedo: () => redo.length > 0,
      peekUndo: () => (undo.length ? undo[undo.length - 1] : null),
      peekRedo: () => (redo.length ? redo[redo.length - 1] : null),
      clear: () => { undo.length = 0; redo.length = 0; lastKey = null; lastAt = -Infinity; activeKey = null; lastSnap = null; }
    };
  }

  /* ----------------------------------------------------------- paint plan -- */

  function energyLevel(id) {
    return Object.prototype.hasOwnProperty.call(ENERGY_LEVEL, id) ? ENERGY_LEVEL[id] : 0;
  }

  /* The Song maker's own square cycle, copied from onGridClick. */
  function cellNext(value, energy) {
    const v = int(value, 0);
    if (v === 0) return 2;
    if (v === 1) return Math.min(5, 3 + Math.min(3, energyLevel(energy)));
    if (v >= 5) return 0;
    return v + 1;
  }

  function changedCells(before, after) {
    const out = [];
    const a = (before && before.grid) || {};
    const b = (after && after.grid) || {};
    const stems = [...new Set([...Object.keys(a), ...Object.keys(b)])];
    for (const stem of stems) {
      const rowA = a[stem] || [];
      const rowB = b[stem] || [];
      const n = Math.max(rowA.length, rowB.length);
      for (let p = 0; p < n; p++) {
        const from = int(rowA[p], 0);
        const to = int(rowB[p], 0);
        if (from !== to) out.push({ stem, p, from, to });
      }
    }
    return out;
  }

  function listChanged(a, b) {
    const out = [];
    const n = Math.max((a || []).length, (b || []).length);
    for (let i = 0; i < n; i++) if ((a || [])[i] !== (b || [])[i]) out.push(i);
    return out;
  }

  function paintPlan(before, after) {
    ensure(before);
    ensure(after);
    const cells = changedCells(before, after);
    const dyn = listChanged(before.dyn, after.dyn);
    const energy = listChanged(before.energy, after.energy);
    const settings = SETTING_FIELDS.filter((k) => !same(before[k], after[k]));
    const structure = before.parts !== after.parts || !same(before.partMeta, after.partMeta) || !same(before.inst, after.inst);
    let mode = 'none';
    if (structure) mode = 'structure';
    else if (settings.length || !same(before.sel, after.sel)) mode = 'settings';
    else if (cells.length && !dyn.length && !energy.length) mode = cells.length === 1 ? 'cell' : 'cells';
    else if (!cells.length && dyn.length === 1 && !energy.length) mode = 'dyn';
    else if (!cells.length && !dyn.length && energy.length === 1) mode = 'energy';
    else if (cells.length || dyn.length || energy.length) mode = 'mixed';
    return {
      mode,
      cells,
      dyn,
      energy,
      settings,
      structure,
      full: mode === 'structure' || mode === 'settings',
      touched: cells.length + dyn.length + energy.length
    };
  }

  /* Nodes renderGrid() rebuilds for a grid of `parts` columns and `stems`
     rows: 4 corners + 3 header rows + one label per stem + every cell + the
     chord row. The live page reports 117 for 12 parts and 5 stems. */
  function nodeCount(parts, stems) {
    const p = clamp(int(parts, 0), 0, MAX_PARTS);
    const s = clamp(int(stems, 0), 0, 16);
    return 4 + p * 3 + s * (1 + p) + p;
  }

  /* ------------------------------------------------------------- rejected -- */

  const LEGACY_FIELDS = ['grid', 'energy', 'dyn'];

  function legacySnap(state) {
    ensure(state);
    return JSON.stringify({ grid: state.grid, energy: state.energy, dyn: state.dyn || {} });
  }

  function legacyPush(stack, state) {
    if (!Array.isArray(stack)) throw new TypeError('stack must be an array');
    const s = legacySnap(state);
    if (stack[stack.length - 1] !== s) stack.push(s);
    if (stack.length > LEGACY_LIMIT) stack.shift();
    return stack.length;
  }

  function legacyUndo(state, stack) {
    ensure(state);
    if (!Array.isArray(stack)) throw new TypeError('stack must be an array');
    const last = stack.pop();
    if (!last) return { ok: false, reason: 'empty' };
    const o = JSON.parse(last);
    Object.keys(o.grid || {}).forEach((k) => { state.grid[k] = o.grid[k]; });
    state.energy = o.energy;
    state.dyn = o.dyn;
    return { ok: true, snapshot: o };
  }

  function legacyRedo() {
    return { ok: false, reason: 'not-implemented' };
  }

  function legacySnapshotBytes(state) {
    return legacySnap(state).length;
  }

  return {
    VERSION,
    MODEL,
    ALTERNATIVE,
    LIMIT,
    LEGACY_LIMIT,
    COALESCE_MS,
    MAX_PARTS,
    FIELDS,
    SETTING_FIELDS,
    LEGACY_FIELDS,
    ENERGY_LEVEL,
    capture,
    snapshotBytes,
    fingerprint,
    restore,
    boundPart,
    createHistory,
    energyLevel,
    cellNext,
    changedCells,
    paintPlan,
    nodeCount,
    legacySnap,
    legacyPush,
    legacyUndo,
    legacyRedo,
    legacySnapshotBytes
  };
});
