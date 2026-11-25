/* GENERATED FILE - do not edit.
   A5 style sections: explicit, seconds-based song sections.
   Source: buffy/a5-sections/sections.js
   Rebuild: node buffy/a5-sections/build.js
   Loaded by gw-perf.js (Buffy's file); app.html is unchanged. */
/*
 * G-Warp style sections (A5) — explicit, time-based song sections.
 *
 * One question: which style plays at part p, and where are its edges in the
 * timeline the user typed ("1:00" to "1:30")?
 *
 * Chosen model (A): explicit sections stored in SECONDS.
 *   S.styleSections = [{ id, genre, fromSec, toSec, on }]
 *   - seconds survive a BPM change; part indices are derived for playback;
 *   - a boundary inside a part snaps to the nearest part, because playback
 *     schedules whole parts;
 *   - no section = the base genre all the way through.
 *
 * Rejected model (B): the shipped auto-split — extra genre tags and a random
 * S.alt split the song at generated points, with no visible range and no
 * on/off. It is preserved as legacySections()/legacySectionAt() and asserted
 * against the live app so the comparison stays honest. The plan's other
 * alternative (a dropdown on every part) is preserved as perPartSections().
 *
 * Works in Node (module.exports) and in the app (window.GW_SONG_SECTIONS).
 * No DOM, no audio, no app.html access.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GW_SONG_SECTIONS = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = '1.0';
  const MODEL = 'explicit-seconds';
  const ALTERNATIVE = 'legacy-auto';
  const MAX_SECTIONS = 64;
  const MAX_PARTS = 256;
  const BEATS_PER_PART = 8; // 2 bars of 4/4, same as the Song maker
  const EPS = 1e-6;

  const round6 = (n) => Math.round(Number(n) * 1e6) / 1e6;
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

  function num(v, fallback) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function ensure(state) {
    if (!state || typeof state !== 'object' || Array.isArray(state)) throw new TypeError('state must be an object');
    if (!Array.isArray(state.styleSections)) state.styleSections = [];
    return state;
  }

  function partsOf(state) {
    const n = Math.trunc(num(state && state.parts, 0));
    return clamp(Number.isFinite(n) ? n : 0, 0, MAX_PARTS);
  }

  function bpmOf(state) {
    const b = num(state && state.bpm, 120);
    return b > 0 ? b : 120;
  }

  /* one part = 2 bars = 8 beats; the unrounded value is the real grid, the
     rounded one is only for display, so 32 parts at 104 BPM stay 147.692308 s
     instead of drifting through 4.615385 * 32. */
  function exactPartSeconds(bpm) {
    const b = num(bpm, 120);
    return b > 0 ? (BEATS_PER_PART * 60) / b : 8;
  }

  function partSeconds(bpm) {
    return round6(exactPartSeconds(bpm));
  }

  function songSeconds(state) {
    return round6(partsOf(state) * exactPartSeconds(bpmOf(state)));
  }

  function secToPart(sec, bpm) {
    return Math.max(0, Math.round(num(sec, 0) / exactPartSeconds(bpm)));
  }

  function partToSec(part, bpm) {
    return round6(Math.max(0, Math.trunc(num(part, 0))) * exactPartSeconds(bpm));
  }

  /* nearest part boundary, clamped to the song */
  function snapSec(sec, state) {
    const ps = exactPartSeconds(bpmOf(state));
    const parts = partsOf(state);
    const p = clamp(Math.round(num(sec, 0) / ps), 0, parts);
    return round6(clamp(p * ps, 0, parts * ps));
  }

  /* "1:30", "90", 90 -> seconds; null when the text is not a time */
  function parseTime(value) {
    if (typeof value === 'number') return Number.isFinite(value) && value >= 0 ? round6(value) : null;
    const text = String(value == null ? '' : value).trim();
    if (!text) return null;
    let m = /^(\d+):([0-5]?\d(?:\.\d+)?)$/.exec(text);
    if (m) return round6(Number(m[1]) * 60 + Number(m[2]));
    m = /^(\d+(?:\.\d+)?)$/.exec(text);
    if (m) return round6(Number(m[1]));
    return null;
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.round(num(sec, 0)));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }

  function nextId(list) {
    let max = 0;
    for (const s of list || []) {
      const m = /^sec_(\d+)$/.exec(String((s && s.id) || ''));
      if (m) max = Math.max(max, Number(m[1]));
    }
    return 'sec_' + (max + 1);
  }

  function uniqueId(list, wanted) {
    const used = new Set((list || []).map((s) => String((s && s.id) || '')));
    let id = String(wanted || '').trim() || nextId(list);
    if (!used.has(id)) return id;
    for (let i = 2; ; i++) {
      const next = id + '_' + i;
      if (!used.has(next)) return next;
    }
  }

  /* Migration + light clean-up. Missing styleSections becomes []; seconds are
     NOT clamped to the current song length, because a BPM change may make the
     song shorter and the stored time is still the user's intent. Overlaps are
     kept here and resolved deterministically by sectionsFor(). */
  function normalize(state, opts) {
    ensure(state);
    const genres = opts && Array.isArray(opts.genres) ? opts.genres : null;
    const list = [];
    for (const raw of state.styleSections) {
      if (!raw || typeof raw !== 'object') continue;
      const genre = String(raw.genre || '').trim();
      if (!genre || (genres && !genres.includes(genre))) continue;
      const fromSec = round6(num(raw.fromSec, NaN));
      const toSec = round6(num(raw.toSec, NaN));
      if (!Number.isFinite(fromSec) || !Number.isFinite(toSec) || fromSec < 0 || toSec - fromSec < EPS) continue;
      list.push({
        id: uniqueId(list, raw.id),
        genre,
        fromSec,
        toSec,
        on: raw.on !== false
      });
    }
    list.sort((a, b) => a.fromSec - b.fromSec || a.toSec - b.toSec);
    state.styleSections = list.slice(0, MAX_SECTIONS);
    return state;
  }

  /* The default draft for "+ Add style": starts at the last end (or 0:00),
     runs 30 s, and is snapped to part boundaries. */
  function layout(state, opts) {
    ensure(state);
    const end = songSeconds(state);
    const list = state.styleSections.slice().sort((a, b) => num(a.toSec, 0) - num(b.toSec, 0));
    let from = 0;
    for (const s of list) from = Math.max(from, num(s.toSec, 0));
    from = snapSec(Math.min(from, end), state);
    if (from >= end - EPS) return { ok: false, reason: 'full', fromSec: from, toSec: end, songSeconds: end };
    const to = snapSec(Math.min(end, from + 30), state);
    const genre = (opts && opts.genre) || state.genre;
    return {
      ok: true,
      genre,
      fromSec: from,
      toSec: to,
      fromPart: secToPart(from, bpmOf(state)),
      toPart: secToPart(to, bpmOf(state)),
      snapped: true,
      songSeconds: end
    };
  }

  /* Validate a draft. Returns the snapped seconds and parts, or a reason:
     genre · time · order · cap · overlap. */
  function validate(state, draft, opts) {
    ensure(state);
    const o = opts || {};
    const parts = partsOf(state);
    const ps = exactPartSeconds(bpmOf(state));
    const end = songSeconds(state);
    const genre = String((draft && draft.genre) || '').trim();
    if (!genre) return { ok: false, reason: 'genre' };
    if (Array.isArray(o.genres) && !o.genres.includes(genre)) return { ok: false, reason: 'genre' };
    const rawFrom = parseTime(draft && draft.fromSec !== undefined ? draft.fromSec : draft && draft.from);
    const rawTo = parseTime(draft && draft.toSec !== undefined ? draft.toSec : draft && draft.to);
    if (rawFrom == null || rawTo == null) return { ok: false, reason: 'time' };

    const fromSec = snapSec(rawFrom, state);
    const toSec = snapSec(rawTo, state);
    const fromPart = clamp(Math.round(fromSec / ps), 0, parts);
    const toPart = clamp(Math.round(toSec / ps), 0, parts);
    const snapped = Math.abs(fromSec - rawFrom) > EPS || Math.abs(toSec - rawTo) > EPS;
    const base = { genre, fromSec, toSec, fromPart, toPart, snapped, rawFrom, rawTo };

    if (toSec - fromSec < EPS) return { ok: false, reason: 'order', ...base };
    const ignoreId = o.ignoreId == null ? null : String(o.ignoreId);
    const list = state.styleSections;
    if (!ignoreId && list.length >= MAX_SECTIONS) return { ok: false, reason: 'cap', ...base };

    const hit = list.find((s) => {
      if (!s || s.on === false) return false;
      if (ignoreId && String(s.id) === ignoreId) return false;
      return fromSec < num(s.toSec, 0) - EPS && num(s.fromSec, 0) < toSec - EPS;
    });
    if (hit) return { ok: false, reason: 'overlap', with: hit.id, ...base };
    return { ok: true, ...base };
  }

  function sortSections(state) {
    state.styleSections.sort((a, b) => a.fromSec - b.fromSec || a.toSec - b.toSec);
    return state;
  }

  function addSection(state, draft, opts) {
    const check = validate(state, draft, opts);
    if (!check.ok) return check;
    const section = {
      id: uniqueId(state.styleSections, draft && draft.id),
      genre: check.genre,
      fromSec: check.fromSec,
      toSec: check.toSec,
      on: true
    };
    state.styleSections.push(section);
    sortSections(state);
    return { ok: true, section, snapped: check.snapped, fromPart: check.fromPart, toPart: check.toPart };
  }

  function updateSection(state, id, draft, opts) {
    ensure(state);
    const index = state.styleSections.findIndex((s) => String(s.id) === String(id));
    if (index < 0) return { ok: false, reason: 'missing' };
    const check = validate(state, { ...draft, genre: draft && draft.genre !== undefined ? draft.genre : state.styleSections[index].genre }, { ...opts, ignoreId: id });
    if (!check.ok) return check;
    const section = state.styleSections[index];
    section.genre = check.genre;
    section.fromSec = check.fromSec;
    section.toSec = check.toSec;
    sortSections(state);
    return { ok: true, section, snapped: check.snapped, fromPart: check.fromPart, toPart: check.toPart };
  }

  function removeSection(state, id) {
    ensure(state);
    const index = state.styleSections.findIndex((s) => String(s.id) === String(id));
    if (index < 0) return { ok: false, reason: 'missing' };
    const removed = state.styleSections.splice(index, 1)[0];
    return { ok: true, removed };
  }

  function setOn(state, id, on, opts) {
    ensure(state);
    const section = state.styleSections.find((s) => String(s.id) === String(id));
    if (!section) return { ok: false, reason: 'missing' };
    if (!on) {
      section.on = false;
      return { ok: true, section };
    }
    const check = validate(state, { genre: section.genre, fromSec: section.fromSec, toSec: section.toSec }, { ...opts, ignoreId: id });
    if (!check.ok) return check;
    section.on = true;
    return { ok: true, section };
  }

  function snapshot(state) {
    ensure(state);
    return { sections: JSON.parse(JSON.stringify(state.styleSections)) };
  }

  function restore(state, snap) {
    ensure(state);
    state.styleSections = JSON.parse(JSON.stringify((snap && snap.sections) || []));
    return state;
  }

  /* Playback view: base section first (i = 0), then every ON section whose
     part range is non-empty, in time order. An overlapping ON section is
     ignored (first one wins) so old/bad data can never double-schedule. */
  function sectionsFor(state) {
    ensure(state);
    const parts = partsOf(state);
    const ps = exactPartSeconds(bpmOf(state));
    const end = songSeconds(state);
    const out = [{ id: 'base', from: 0, to: parts, fromSec: 0, toSec: end, genre: state.genre, inst: null, on: true, i: 0 }];
    let lastEnd = 0;
    const list = state.styleSections
      .filter((s) => s && s.on !== false)
      .slice()
      .sort((a, b) => num(a.fromSec, 0) - num(b.fromSec, 0));
    for (const s of list) {
      const from = clamp(Math.round(num(s.fromSec, 0) / ps), 0, parts);
      const to = clamp(Math.round(num(s.toSec, 0) / ps), 0, parts);
      if (to <= from) continue;
      if (from < lastEnd) continue;
      out.push({
        id: s.id,
        from,
        to,
        fromSec: num(s.fromSec, 0),
        toSec: num(s.toSec, 0),
        genre: s.genre,
        inst: null,
        on: true,
        i: out.length
      });
      lastEnd = to;
    }
    return out;
  }

  /* Same shape the shipped sectionAt() returns: the section containing p,
     with its index, or the base section. */
  function sectionAt(state, p) {
    const parts = partsOf(state);
    const index = Math.trunc(num(p, -1));
    if (index < 0 || index >= parts) return null;
    let found = null;
    for (const s of sectionsFor(state)) if (s.from <= index && index < s.to) found = s;
    return found ? { ...found } : null;
  }

  /* "Base: Electro · 1:00–1:30: Rock (off)" */
  function styleNote(state, labelOf) {
    ensure(state);
    const label = typeof labelOf === 'function' ? labelOf : (id) => String(id || '');
    const list = state.styleSections.slice().sort((a, b) => a.fromSec - b.fromSec);
    let out = 'Base: ' + label(state.genre);
    for (const s of list) {
      out += ' · ' + formatTime(s.fromSec) + '–' + formatTime(s.toSec) + ': ' + label(s.genre) + (s.on === false ? ' (off)' : '');
    }
    if (!list.length) out += ' — one style all the way through.';
    return out;
  }

  function bands(state, labelOf) {
    ensure(state);
    const label = typeof labelOf === 'function' ? labelOf : (id) => String(id || '');
    const end = songSeconds(state) || 1;
    return state.styleSections
      .slice()
      .sort((a, b) => a.fromSec - b.fromSec)
      .map((s) => {
        const from = num(s.fromSec, 0);
        const to = num(s.toSec, from);
        return {
          id: s.id,
          genre: s.genre,
          on: s.on !== false,
          fromSec: from,
          toSec: to,
          leftPct: round6(clamp((from / end) * 100, 0, 100)),
          widthPct: round6(clamp(((to - from) / end) * 100, 0, 100)),
          label: label(s.genre) + ' ' + formatTime(from) + '–' + formatTime(to)
        };
      });
  }

  /* ---------- rejected model B1: the shipped auto-split ---------- */
  /* Exact copy of the Song maker's sectionsFor() as shipped on 2026-11-06:
     extra genre tags split the song at generated points, otherwise S.alt
     splits it after the first minute when S.shift is on. */
  function legacySections(state) {
    if (!state || typeof state !== 'object') throw new TypeError('state must be an object');
    const n = partsOf(state);
    const list = [{ from: 0, genre: state.genre, inst: null }];
    const extra = (Array.isArray(state.genres) ? state.genres : []).filter((id) => id && id !== state.genre);
    if (extra.length) {
      extra.forEach((id, k) => {
        list.push({ from: Math.max(2, Math.round(((k + 1) * n) / (extra.length + 1) / 2) * 2), genre: id });
      });
    } else if (state.shift !== false && state.alt && n * 8 * 60 / bpmOf(state) > 60) {
      list.push({ from: Math.max(2, Math.round(n / 4) * 2), genre: state.alt });
    }
    return list.filter((x, i, a) => i === 0 || (x.from < n && x.from > a[i - 1].from));
  }

  function legacySectionAt(state, p) {
    const parts = partsOf(state);
    const index = Math.trunc(num(p, -1));
    if (index < 0 || index >= parts) return null;
    let found = null;
    legacySections(state).forEach((x, i) => {
      if (x.from <= index) found = { ...x, i };
    });
    return found;
  }

  /* ---------- rejected model B2: one dropdown per part ---------- */
  /* `byPart` is a map { part: genre }. Adjacent equal genres merge, so the
     returned ranges are still single parts unless the caller paints a run. */
  function perPartSections(state, byPart) {
    const n = partsOf(state);
    const out = [];
    for (let p = 0; p < n; p++) {
      const genre = byPart && byPart[p];
      if (!genre) continue;
      const last = out[out.length - 1];
      if (last && last.genre === genre && last.to === p) last.to = p + 1;
      else out.push({ from: p, to: p + 1, genre });
    }
    return out;
  }

  return {
    VERSION,
    MODEL,
    ALTERNATIVE,
    MAX_SECTIONS,
    MAX_PARTS,
    BEATS_PER_PART,
    partSeconds,
    songSeconds,
    partsOf,
    secToPart,
    partToSec,
    snapSec,
    parseTime,
    formatTime,
    normalize,
    layout,
    validate,
    addSection,
    updateSection,
    removeSection,
    setOn,
    snapshot,
    restore,
    sectionsFor,
    sectionAt,
    styleNote,
    bands,
    legacySections,
    legacySectionAt,
    perPartSections
  };
});
