/* GENERATED FILE - do not edit.
   A6 part moves: stable slot/seed identity, block move, voice remap.
   Source: buffy/a6-parts/parts.js
   Rebuild: node buffy/a6-parts/build.js
   Loaded by gw-perf.js (Buffy's file); app.html is unchanged. */
/*
 * G-Warp part moves (A6) — move whole parts by dragging time headers.
 *
 * Chosen model (A): stable part identity.
 *   S.partMeta = [{ slot: p % 4, seed: p }, ...]
 *   - slot chooses the chord pair and the melody motif;
 *   - seed chooses the small melodic variation;
 *   - moving a part permutes grid, energy, dyn, partMeta and the voice
 *     membership together, so the moved part sounds the same.
 *
 * Drop model: `toGap` is a gap in the ORIGINAL column order, 0..n.
 *   Remove the selected parts, insert them as one ordered block at
 *   `gap - (selected parts before gap)`. This makes "move part 2 to
 *   position 4" (1-based) put it at zero-based index 3, before the old
 *   part 4. The selected block never reverses.
 *
 * Rejected model (B): the shipped index-derived identity. The app currently
 * chooses chords with `(p*2)%4`, motifs with `p%4` and variation with `p`.
 * Moving the per-part arrays without moving identity re-harmonises the part.
 * It is preserved as legacyIdentityFor() and legacyMove() and asserted
 * against the live 12-part song.
 *
 * Rejected interaction (Option B): a visible drag handle in every time
 * header. The chosen Option A holds the existing time header for 250 ms,
 * keeping the header clean and the click-to-seek path intact. Both gesture
 * descriptors are code below.
 *
 * Works in Node (module.exports) and in the app (window.GW_SONG_PARTS).
 * No DOM, no audio, no app.html access.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GW_SONG_PARTS = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = '1.0';
  const MODEL = 'stable-part-meta';
  const ALTERNATIVE = 'index-derived-identity';
  const OPTION = 'hold-header';
  const OPTION_REJECTED = 'visible-handle';
  const MAX_PARTS = 256;
  const BEATS_PER_PART = 8; // two bars of 4/4, same as the Song maker
  const HOLD_MS = 250;
  const DRAG_PX = 6;

  const STEMS = ['melody', 'backing', 'bass', 'drums', 'fills'];
  const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const SCALES = { major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10] };
  const ROMAN = { i: 0, ii: 1, iii: 2, iv: 3, v: 4, vi: 5, vii: 6 };

  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const int = (v, fallback) => (Number.isInteger(v) ? v : Number.isFinite(Number(v)) ? Math.trunc(Number(v)) : fallback);
  const round6 = (n) => Math.round(Number(n) * 1e6) / 1e6;

  function ensure(state) {
    if (!state || typeof state !== 'object' || Array.isArray(state)) throw new TypeError('state must be an object');
    return state;
  }

  function partsOf(state) {
    const n = int(state && state.parts, 0);
    return clamp(Number.isFinite(n) ? n : 0, 0, MAX_PARTS);
  }

  function bpmOf(state) {
    const b = Number(state && state.bpm);
    return Number.isFinite(b) && b > 0 ? b : 120;
  }

  function exactPartSeconds(bpm) {
    const b = Number(bpm);
    return b > 0 ? (BEATS_PER_PART * 60) / b : 8;
  }

  function partSeconds(bpm) {
    return round6(exactPartSeconds(bpm));
  }

  function songSeconds(state) {
    return round6(partsOf(state) * exactPartSeconds(bpmOf(state)));
  }

  function defaultPartMeta(parts) {
    const n = clamp(int(parts, 0), 0, MAX_PARTS);
    return Array.from({ length: n }, (_, p) => ({ slot: p % 4, seed: p }));
  }

  /* Migration: missing entries get the historical p%4/p identity; existing
     entries keep their slot and seed, clamped only to the valid ranges. */
  function normalizePartMeta(meta, parts) {
    const n = clamp(int(parts, 0), 0, MAX_PARTS);
    const out = [];
    for (let p = 0; p < n; p++) {
      const raw = Array.isArray(meta) ? meta[p] : null;
      const slot = raw && Number.isFinite(Number(raw.slot)) ? ((int(raw.slot, p % 4) % 4) + 4) % 4 : p % 4;
      const seed = raw && Number.isFinite(Number(raw.seed)) && Number(raw.seed) >= 0 ? int(raw.seed, p) : p;
      out.push({ slot, seed });
    }
    return out;
  }

  function normalize(state) {
    ensure(state);
    state.parts = partsOf(state);
    state.partMeta = normalizePartMeta(state.partMeta, state.parts);
    return state;
  }

  function metaAt(state, p) {
    const index = int(p, -1);
    const n = partsOf(state);
    if (index < 0 || index >= n) return null;
    if (Array.isArray(state.partMeta) && state.partMeta[index]) {
      const raw = state.partMeta[index];
      const slot = Number.isFinite(Number(raw.slot)) ? ((int(raw.slot, index % 4) % 4) + 4) % 4 : index % 4;
      const seed = Number.isFinite(Number(raw.seed)) && Number(raw.seed) >= 0 ? int(raw.seed, index) : index;
      return { slot, seed };
    }
    return { slot: index % 4, seed: index };
  }

  function modern(state) {
    return state.sound !== 'classic';
  }

  function scaleOf(state) {
    return SCALES[state.mode] || SCALES.major;
  }

  /* Exact copy of the Song maker's chordFor(), using the part's stable slot
     only through the caller. */
  function chordFor(state, rn) {
    const text = String(rn == null ? 'I' : rn);
    const dim = text.endsWith('o');
    const base = dim ? text.slice(0, -1) : text;
    const deg = ROMAN[base.toLowerCase()];
    const scale = scaleOf(state);
    const root = int(state.root, 0);
    const pc = ((root + scale[deg == null ? 0 : deg]) % 12 + 12) % 12;
    const minor = dim || base === base.toLowerCase();
    const iv = dim ? [0, 3, 6] : [0, minor ? 3 : 4, 7];
    if (modern(state)) {
      const inKey = new Set(scale.map((v) => (root + v) % 12));
      const sev = !minor && !dim && inKey.has((pc + 11) % 12) ? 11 : 10;
      iv.push(sev);
      return {
        pc,
        minor,
        dim,
        tones: iv.map((i) => (pc + i) % 12),
        name: NOTES[pc] + (dim ? 'm7b5' : minor ? 'm7' : sev === 11 ? 'maj7' : '7')
      };
    }
    return {
      pc,
      minor,
      dim,
      tones: iv.map((i) => (pc + i) % 12),
      name: NOTES[pc] + (dim ? 'dim' : minor ? 'm' : '')
    };
  }

  function progOf(state, p) {
    return state.dyn && state.dyn[p] && state.prog2 ? state.prog2 : state.prog;
  }

  function chordSlotsFor(slot) {
    const s = ((int(slot, 0) % 4) + 4) % 4;
    return [(s * 2) % 4, (s * 2 + 1) % 4];
  }

  function chordsFor(state, slot, p) {
    const pr = progOf(state, p);
    const pair = chordSlotsFor(slot);
    return pair.map((i) => chordFor(state, pr && pr[i] != null ? pr[i] : 'I'));
  }

  /* Exact copy of the melodyLine() motif choice, with the stable slot. */
  function motifKeyFor(state, slot, tw) {
    if (state.tune === 'mine' && Array.isArray(state.myMelody) && state.myMelody.length) return 'my';
    const mo = state.motifs || {};
    const tune = state.tune === 'mine' ? 'mix' : state.tune || 'classic';
    const fr = !!mo.nA;
    let keys;
    if (tune === 'fresh' && fr) keys = tw ? ['nC', 'nC', 'nD', 'nC'] : ['nA', 'nA', 'nB', 'nA'];
    else if (tune === 'mix' && fr) keys = tw ? ['nC', 'C', 'nD', 'nC'] : ['A', 'A', 'nA', 'B'];
    else keys = tw && mo.C ? ['C', 'C', 'D', 'C'] : ['A', 'A', 'B', 'A'];
    return keys[((int(slot, 0) % 4) + 4) % 4];
  }

  function motifFor(state, key) {
    const m = state.motifs && state.motifs[key];
    return Array.isArray(m) ? m : null;
  }

  function blocksFor(state, p) {
    const grid = state.grid || {};
    const keys = STEMS.concat(Object.keys(grid).filter((k) => !STEMS.includes(k)));
    return keys.map((stem) => ({
      stem,
      value: Array.isArray(grid[stem]) && grid[stem][p] != null ? int(grid[stem][p], 0) : 0
    }));
  }

  /* The stable identity of the part itself. Nothing here depends on p except
     the per-part content (dyn, energy, blocks) that travels with the part. */
  function identityFor(state, p) {
    const n = partsOf(state);
    const index = int(p, -1);
    if (index < 0 || index >= n) return null;
    const meta = metaAt(state, index);
    const tw = !!(state.dyn && state.dyn[index]);
    const chords = chordsFor(state, meta.slot, index);
    const motifKey = motifKeyFor(state, meta.slot, tw);
    const motif = motifFor(state, motifKey);
    return {
      index,
      slot: meta.slot,
      seed: meta.seed,
      twist: tw,
      chordSlots: chordSlotsFor(meta.slot),
      chords: chords.map((c) => c.name),
      motifKey,
      motifLength: motif ? motif.length : 0,
      motifFirst: motif && motif[0] ? { step: motif[0].step, len: motif[0].len, idx: motif[0].idx } : null,
      variationSeed: meta.seed,
      energy: state.energy && state.energy[index] != null ? state.energy[index] : null,
      blocks: blocksFor(state, index)
    };
  }

  /* Rejected model B: exactly the shipped index identity, no partMeta. */
  function legacyIdentityFor(state, p) {
    const n = partsOf(state);
    const index = int(p, -1);
    if (index < 0 || index >= n) return null;
    const tw = !!(state.dyn && state.dyn[index]);
    const chords = chordsFor(state, index % 4, index);
    const motifKey = motifKeyFor(state, index % 4, tw);
    const motif = motifFor(state, motifKey);
    return {
      index,
      slot: index % 4,
      seed: index,
      twist: tw,
      chordSlots: chordSlotsFor(index % 4),
      chords: chords.map((c) => c.name),
      motifKey,
      motifLength: motif ? motif.length : 0,
      variationSeed: index,
      energy: state.energy && state.energy[index] != null ? state.energy[index] : null,
      blocks: blocksFor(state, index)
    };
  }

  function fingerprint(state, p) {
    const id = identityFor(state, p);
    if (!id) return null;
    const { index, ...stable } = id;
    return JSON.stringify(stable);
  }

  function summary(state) {
    const n = partsOf(state);
    return Array.from({ length: n }, (_, p) => identityFor(state, p));
  }

  function uniqueParts(fromSet) {
    const raw = fromSet instanceof Set ? [...fromSet] : Array.isArray(fromSet) ? fromSet : [fromSet];
    return [...new Set(raw.map((v) => int(v, -1)).filter((v) => v >= 0))].sort((a, b) => a - b);
  }

  /* Gap 0 is before the first column; gap n is after the last column.
     The insertion index is adjusted for the selected parts before the gap,
     so a drop on column 4 (1-based) inserts before the old column 4. */
  function movePlan(parts, fromSet, toGap) {
    const n = clamp(int(parts, 0), 0, MAX_PARTS);
    const from = uniqueParts(fromSet).filter((v) => v < n);
    if (!from.length) return { ok: false, reason: 'empty', parts: n, order: Array.from({ length: n }, (_, i) => i), changed: false };
    const gap = clamp(int(toGap, 0), 0, n);
    const before = from.filter((i) => i < gap).length;
    const at = clamp(gap - before, 0, n - from.length);
    const chosen = new Set(from);
    const rest = [];
    for (let i = 0; i < n; i++) if (!chosen.has(i)) rest.push(i);
    const order = rest.slice(0, at).concat(from, rest.slice(at));
    const positions = from.map((_, i) => at + i);
    return {
      ok: true,
      parts: n,
      from,
      gap,
      insertAt: at,
      blockStart: at,
      blockEnd: at + from.length,
      positions,
      order,
      changed: order.some((v, i) => v !== i)
    };
  }

  function isPermutation(order, n) {
    if (!Array.isArray(order) || order.length !== n) return false;
    const seen = new Set();
    for (const v of order) {
      if (!Number.isInteger(v) || v < 0 || v >= n || seen.has(v)) return false;
      seen.add(v);
    }
    return true;
  }

  function permute(state, order) {
    ensure(state);
    const n = partsOf(state);
    if (!isPermutation(order, n)) throw new TypeError('order must be a permutation of 0..parts-1');
    const meta = normalizePartMeta(state.partMeta, n);
    const out = { ...state, parts: n };
    if (state.grid) {
      out.grid = {};
      for (const stem of Object.keys(state.grid)) {
        out.grid[stem] = order.map((i) => state.grid[stem][i]);
      }
    }
    if (Array.isArray(state.energy)) out.energy = order.map((i) => state.energy[i]);
    if (Array.isArray(state.dyn)) out.dyn = order.map((i) => state.dyn[i]);
    out.partMeta = order.map((i) => ({ ...meta[i] }));
    return out;
  }

  /* Mutating variant used by the app patch. */
  function moveInPlace(state, fromSet, toGap) {
    normalize(state);
    const plan = movePlan(state.parts, fromSet, toGap);
    if (!plan.ok || !plan.changed) return { ...plan, state };
    if (state.grid) {
      for (const stem of Object.keys(state.grid)) {
        state.grid[stem] = plan.order.map((i) => state.grid[stem][i]);
      }
    }
    if (Array.isArray(state.energy)) state.energy = plan.order.map((i) => state.energy[i]);
    if (Array.isArray(state.dyn)) state.dyn = plan.order.map((i) => state.dyn[i]);
    state.partMeta = plan.order.map((i) => ({ ...metaAt(state, i) }));
    return { ...plan, state };
  }

  /* Values are OLD part indices (voice membership / selection). They follow
     the part to its new index. */
  function remapValues(values, plan) {
    if (!plan || !plan.ok) return [];
    const n = plan.parts;
    const map = new Array(n);
    plan.order.forEach((oldIndex, newIndex) => {
      map[oldIndex] = newIndex;
    });
    const raw = values instanceof Set ? [...values] : Array.isArray(values) ? values : values == null ? [] : [values];
    return [...new Set(raw.map((v) => int(v, -1)).filter((v) => v >= 0 && v < n).map((v) => map[v]))].sort((a, b) => a - b);
  }

  function remapVoice(on, plan) {
    return remapValues(on, plan);
  }

  function remapSelection(selection, plan) {
    return remapValues(selection, plan);
  }

  function relocate(list, order) {
    if (!Array.isArray(list) || !isPermutation(order, order.length)) return [];
    return order.map((i) => list[i]);
  }

  /* Snapshot exactly the part data A6 moves, plus voice and selection. */
  function snapshot(state, voiceOn, selection) {
    ensure(state);
    return JSON.parse(JSON.stringify({
      grid: state.grid || {},
      energy: state.energy || [],
      dyn: state.dyn || [],
      partMeta: normalizePartMeta(state.partMeta, partsOf(state)),
      voice: voiceOn == null ? null : [...(voiceOn instanceof Set ? voiceOn : voiceOn)],
      selection: selection == null ? null : [...(selection instanceof Set ? selection : selection)]
    }));
  }

  function restoreInPlace(state, snap) {
    ensure(state);
    if (!snap || typeof snap !== 'object') throw new TypeError('snapshot must be an object');
    const n = partsOf(state);
    if (snap.grid) {
      state.grid = state.grid || {};
      for (const stem of Object.keys(snap.grid)) state.grid[stem] = snap.grid[stem].slice();
    }
    if (Array.isArray(snap.energy)) state.energy = snap.energy.slice();
    if (Array.isArray(snap.dyn)) state.dyn = snap.dyn.slice();
    state.partMeta = normalizePartMeta(snap.partMeta, n);
    return state;
  }

  /* Chosen Option A: hold the existing time header. */
  function gesture(mode) {
    if (mode === OPTION_REJECTED) {
      return {
        id: OPTION_REJECTED,
        pointerTarget: '.gwarr-grip',
        holdMs: 0,
        thresholdPx: 0,
        handlePerPart: true,
        ghost: 'vertical'
      };
    }
    return {
      id: OPTION,
      pointerTarget: '.gwarr-time',
      holdMs: HOLD_MS,
      thresholdPx: DRAG_PX,
      handlePerPart: false,
      ghost: 'vertical'
    };
  }

  function handleCount(parts, mode) {
    return mode === OPTION_REJECTED ? clamp(int(parts, 0), 0, MAX_PARTS) : 0;
  }

  function dragDecision(input) {
    const d = input || {};
    if (d.modified) return { action: 'select' };
    if (!d.armed) return { action: 'seek' };
    if (!d.moved) return { action: 'seek' };
    if (!d.changed) return { action: 'seek' };
    return { action: 'move' };
  }

  /* Rejected model B, executable: move the arrays but keep identity tied to
     the new index (the shipped behaviour). */
  function legacyMove(state, fromSet, toGap) {
    const plan = movePlan(partsOf(state), fromSet, toGap);
    if (!plan.ok) return { ...plan, state };
    const moved = permute(state, plan.order);
    moved.partMeta = defaultPartMeta(partsOf(state));
    return { ...plan, state: moved };
  }

  return {
    VERSION,
    MODEL,
    ALTERNATIVE,
    OPTION,
    OPTION_REJECTED,
    MAX_PARTS,
    BEATS_PER_PART,
    HOLD_MS,
    DRAG_PX,
    STEMS,
    NOTES,
    SCALES,
    partsOf,
    bpmOf,
    partSeconds,
    songSeconds,
    defaultPartMeta,
    normalizePartMeta,
    normalize,
    metaAt,
    chordFor,
    progOf,
    chordSlotsFor,
    chordsFor,
    motifKeyFor,
    motifFor,
    blocksFor,
    identityFor,
    legacyIdentityFor,
    fingerprint,
    summary,
    movePlan,
    isPermutation,
    permute,
    moveInPlace,
    remapValues,
    remapVoice,
    remapSelection,
    relocate,
    snapshot,
    restoreInPlace,
    gesture,
    handleCount,
    dragDecision,
    legacyMove
  };
});
