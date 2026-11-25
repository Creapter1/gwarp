/* gw-anim-tweaks.js — B4 animation-editor tweaks, generated from buffy/b4-anim/tweaks.js by build.js. Do not edit.
   Exposes window.GW_ANIM_TWEAKS. Kill switch: localStorage['gwarp-off-anim-tweaks']='1'. */
/* ===== B4 · animation editor tweaks (Buffy, 2026-11-06) =====

   Pure model for the small Animation-tab fixes the B2/B3 pass listed:

     • bone rename: 30 characters used to be a silent hard stop; now 48 with a
       visible counter and an explicit “shortened” notice (legacyNamePlan = 30)
     • row readout: length, signed angle and whether a child hangs from the
       joint or the end (the old row showed only a shape count)
     • keyboard walk: ArrowUp/ArrowDown through the visible rig (preorder),
       wrapping at the ends; F2 still renames
     • child-aware delete: report the whole subtree instead of dropping it silently
     • onion skin: two previous frames with distinct opacity (legacyOnion = one)
     • export: keep bone names/parents with each frame's costume metadata
       (legacyExportMeta drops the names)

   The exact page code is buffy/b4-anim/app-model.js, inserted by b4.patch.
   app.html is never edited by Buffy.
*/
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.GW_ANIM_TWEAKS = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  const VERSION = '1.0';
  const NAME_MAX = 48;
  const NAME_MAX_LEGACY = 30;
  const ONION_MAX = 3;
  const r1 = (v) => Math.round(Number(v) * 10) / 10;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const signed = (a) => { const n = ((Number(a) % 360) + 360) % 360; return n > 180 ? n - 360 : n; };

  function namePlan(name, max) {
    const raw = String(name == null ? '' : name);
    const collapsed = raw.replace(/\s+/g, ' ').trim();
    const cap = Math.max(4, Math.trunc(Number(max) || NAME_MAX));
    const value = collapsed.slice(0, cap);
    return {
      value, length: value.length, rawLength: raw.length, max: cap,
      capped: collapsed.length > cap, empty: !value, changed: value !== raw,
      hint: value.length + '/' + cap
    };
  }
  const legacyNamePlan = (name) => namePlan(name, NAME_MAX_LEGACY);

  function rowInfo(bone, shapes) {
    const b = bone || {};
    const n = Math.max(0, Math.trunc(Number(shapes) || 0));
    let len = Number(b.len);
    if (!Number.isFinite(len) && Number.isFinite(Number(b.jx)) && Number.isFinite(Number(b.ex))) len = Math.hypot(Number(b.ex) - Number(b.jx), Number(b.ey) - Number(b.jy));
    len = Number.isFinite(len) ? r1(len) : 0;
    const angle = r1(signed(b.angle));
    const attach = !b.parent ? 'MAIN' : (b.at === 'end' ? 'end' : 'joint');
    return {
      length: len, angle, attach, shapes: n,
      text: len + ' u · ' + angle + '° · ' + attach,
      tooltip: 'Length ' + len + ' units · rest angle ' + angle + '° · ' + (attach === 'MAIN' ? 'the MAIN point' : attach === 'end' ? 'hangs from the parent’s end' : 'hangs from the parent’s joint') + ' · ' + n + (n === 1 ? ' shape' : ' shapes')
    };
  }

  function orderedBones(bones) {
    const list = Array.isArray(bones) ? bones : [];
    const out = [];
    const add = (parent) => list.filter((b) => (b.parent || null) === parent).forEach((b) => { out.push(b); add(b.id); });
    add(null);
    /* orphans (a parent was deleted) are still reachable with the keyboard */
    list.forEach((b) => { if (!out.includes(b)) out.push(b); });
    return out;
  }

  function walkPlan(bones, currentId, dir) {
    const list = orderedBones(bones);
    if (!list.length) return { id: null, index: -1, count: 0, ordered: [] };
    const step = Number(dir) < 0 ? -1 : 1;
    const at = list.findIndex((b) => b.id === currentId);
    const index = at < 0 ? (step > 0 ? 0 : list.length - 1) : (at + step + list.length) % list.length;
    return { id: list[index].id, index, count: list.length, ordered: list.map((b) => b.id) };
  }

  function deletePlan(bones, id) {
    const list = Array.isArray(bones) ? bones : [];
    const start = list.find((b) => b.id === id);
    if (!start) return { ids: [], names: [], childCount: 0, name: '', message: 'Nothing selected.' };
    const ids = new Set([id]);
    let grew = true;
    while (grew) {
      grew = false;
      list.forEach((b) => { if (b.parent && ids.has(b.parent) && !ids.has(b.id)) { ids.add(b.id); grew = true; } });
    }
    const names = list.filter((b) => ids.has(b.id)).map((b) => b.name);
    const childCount = ids.size - 1;
    const message = 'Deleted “' + start.name + '”' + (childCount ? ' and ' + childCount + ' child bone' + (childCount === 1 ? '' : 's') : '') + '.';
    return { ids: Array.from(ids), names, childCount, name: start.name, message };
  }

  function onionPlan(frame, depth, length, loops) {
    const n = Math.max(0, Math.trunc(Number(length) || 0));
    const d = clamp(Math.trunc(Number(depth) || 2), 1, ONION_MAX);
    const f = Math.trunc(Number(frame) || 0);
    if (n < 2) return [];
    const out = [];
    for (let k = 1; k <= d; k++) {
      let i = f - k;
      if (i < 0) { if (!loops) break; i = (i % n + n) % n; }
      out.push({ frame: i, distance: k, opacity: k === 1 ? 0.35 : k === 2 ? 0.2 : 0.12 });
    }
    return out;
  }
  const legacyOnion = (frame, length) => (Number(frame) > 0 && Number(length) >= 2 ? [{ frame: Number(frame) - 1, distance: 1, opacity: 0.35 }] : []);

  function exportMeta(anim, frame) {
    const a = anim || {};
    const bones = (Array.isArray(a.bones) ? a.bones : []).map((b) => ({ id: b.id, name: b.name, parent: b.parent || null, at: b.at || null, length: r1(b.len), angle: r1(signed(b.angle)) }));
    return { frame: Math.trunc(Number(frame) || 0), fps: Number(a.fps) || 8, bones, names: bones.map((b) => b.name) };
  }
  const legacyExportMeta = (anim, frame) => ({ frame: Math.trunc(Number(frame) || 0), fps: Number(anim && anim.fps) || 8, bones: (Array.isArray(anim && anim.bones) ? anim.bones : []).map((b) => ({ id: b.id, parent: b.parent || null })) });

  return {
    VERSION, NAME_MAX, NAME_MAX_LEGACY, ONION_MAX,
    namePlan, legacyNamePlan, rowInfo, orderedBones, walkPlan, deletePlan,
    onionPlan, legacyOnion, exportMeta, legacyExportMeta
  };
});
