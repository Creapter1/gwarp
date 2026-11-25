/* gw-bone-flow.js — B1 centre-first bone flow, generated from buffy/b1-rig/rig.js by build.js. Do not edit.
   Exposes window.GW_BONE_FLOW. Kill switch: localStorage['gwarp-off-bone-flow']='1'. */
/* ===== B1 · centre-first bone building flow (Buffy, 2026-11-06) =====

   Pure model behind the Animation tab's bone-building flow. No DOM.

   The shipped flow dropped you into "Add bones" with no centre and no names:
   every new bone became "bone 2", "bone 3", ... and a first-time user had to
   discover the orange MAIN point, the red end handles and the Attach tool by
   accident. B1 asks for: place the centre first, name bones automatically,
   attach the shapes, make a frame — four steps, in the editor, never a modal.

   This module supplies:
     • centreFor()      — create the root at the click, or move the one root
     • centreFromBox()  — the same from a shape's bounding box (hips at 75 %)
     • autoName()       — body / head / arm / leg / hand / foot, unique
     • guidePlan()      — the four-step, non-blocking first-time guide
     • wizardPlan()     — the rejected modal wizard, kept executable
     • legacyFlow()     — the shipped "start with bone 1" flow, kept executable

   The exact code inserted in app.html is buffy/b1-rig/app-model.js, generated
   into the page by b1.patch. app.html is never edited by Buffy.
*/
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.GW_BONE_FLOW = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  const VERSION = '1.0';
  const TOTAL_STEPS = 4;
  const ROOT_LEN = 0.56;       // of the costume height, matching the G mascot's 62 / 110
  const HIP_Y = 0.75;         // a figure's centre is the hips, not the middle of the box
  const r1 = (v) => Math.round(Number(v) * 10) / 10;
  const norm = (a) => ((Number(a) % 360) + 360) % 360;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const STEPS = [
    { id: 'centre', n: 1, title: 'Place the centre', body: 'Click the hips. One orange MAIN point appears; every later bone hangs from it.', cta: 'Place the centre', tool: 'centre' },
    { id: 'limbs', n: 2, title: 'Add the first limb', body: 'Drag from the orange centre (or its red end) to the shoulder, hip, elbow or knee. The bone is named for you.', cta: 'Add a limb', tool: 'bone' },
    { id: 'attach', n: 3, title: 'Attach the shapes', body: 'Pick a bone, then click the shapes it should move. Or press “Attach automatically”.', cta: 'Attach shapes', tool: 'attach' },
    { id: 'animate', n: 4, title: 'Give it a frame', body: 'Switch to Animate and add a second frame. Move a red end; the frames make the motion.', cta: 'Add a frame', tool: 'none' }
  ];

  const isRoot = (b) => !!b && (b.parent == null || b.parent === '');
  const rootOf = (bones) => (Array.isArray(bones) ? bones.find(isRoot) : null) || null;
  const countParts = (anim) => {
    const p = anim && anim.parts;
    if (!p) return 0;
    return Array.isArray(p) ? p.filter(Boolean).length : Object.keys(p).length;
  };
  const countFrames = (anim) => (anim && Array.isArray(anim.frames) ? anim.frames.length : 0);

  /* Place the one centre. A second click MOVES it: a rig can only have one root,
     so “place the centre” never silently creates a second figure. */
  function centreFor(bones, point, box, opts) {
    const list = Array.isArray(bones) ? bones : [];
    const p = point || { x: 0, y: 0 };
    const existing = rootOf(list);
    if (existing) {
      return { action: 'move', id: existing.id, x: r1(p.x), y: r1(p.y), created: false, bone: existing };
    }
    const h = Number(box && (box.h || box.height)) || Number(opts && opts.height) || 110;
    const len = r1(h * ROOT_LEN);
    return {
      action: 'create', created: true,
      bone: { id: (opts && opts.id) || 'b1-root', name: 'body', parent: null, at: 'end', x: r1(p.x), y: r1(p.y), len, angle: -90 }
    };
  }

  /* A shape's box: the centre is horizontally centred, but sits at the hips
     (75 % down) so a head-heavy costume does not put the pivot in its chest. */
  function centreFromBox(bones, box, opts) {
    const b = box || {};
    const x = (Number(b.x) || 0) + (Number(b.w || b.width) || 0) / 2;
    const y = (Number(b.y) || 0) + (Number(b.h || b.height) || 0) * HIP_Y;
    return centreFor(bones, { x, y }, b, opts);
  }

  function uniqueName(bones, base) {
    const list = Array.isArray(bones) ? bones : [];
    const used = new Set(list.map((b) => String(b && b.name || '').toLowerCase()));
    const name = String(base || 'bone').trim() || 'bone';
    if (!used.has(name.toLowerCase())) return name;
    let n = 2;
    while (used.has((name + ' ' + n).toLowerCase())) n++;
    return name + ' ' + n;
  }

  /* Automatic names follow the parent and the local direction of the new bone.
     Local 0 continues the parent (body → head, arm → hand); 180 goes back down
     (body → leg); 90 / 270 go to the figure's right / left (body → arm). */
  function autoName(bones, info) {
    const list = Array.isArray(bones) ? bones : [];
    const it = info || {};
    const parent = list.find((b) => b && b.id === it.parent) || null;
    if (!parent) return uniqueName(list, 'body');
    const a = norm(it.angle);
    const side = Number(it.side) < 0 ? -1 : 1;
    let base = 'bone';
    if (/^body$/i.test(parent.name)) {
      if (a < 45 || a >= 315) base = 'head';
      else if (a >= 135 && a < 225) base = side < 0 ? 'left leg' : 'right leg';
      else if (a >= 45 && a < 135) base = side < 0 ? 'left arm' : 'right arm';
      else base = side < 0 ? 'left arm' : 'right arm';
    } else if (/^head$/i.test(parent.name)) base = 'bone';
    else if (/arm$/i.test(parent.name)) base = /^left/i.test(parent.name) ? 'left hand' : 'right hand';
    else if (/leg$/i.test(parent.name)) base = /^left/i.test(parent.name) ? 'left foot' : 'right foot';
    else if (/hand$/i.test(parent.name)) base = 'finger';
    else if (/foot$/i.test(parent.name)) base = 'toe';
    return uniqueName(list, base);
  }

  function isAutoName(name) {
    return /^(body|head|left arm|right arm|left leg|right leg|left hand|right hand|left foot|right foot|bone( \d+)?)$/i.test(String(name || '').trim());
  }

  /* The four-step guide. It lives in the Rig toolbar, never covers the canvas,
     and its current step is computed from the real rig — not from a counter that
     can drift after undo. “existing” keeps a finished/loaded rig out of step 1. */
  function guidePlan(anim, flags) {
    const f = flags || {};
    const bones = Array.isArray(anim && anim.bones) ? anim.bones : [];
    const parts = countParts(anim);
    const frames = countFrames(anim);
    const existing = f.existing == null ? bones.length > 0 : !!f.existing;
    let i = 0;
    if (bones.length >= 1) i = 1;
    if (bones.length >= 2) i = 2;
    if (parts > 0) i = 3;
    if (frames >= 2) i = TOTAL_STEPS;
    if (f.dismissed) i = TOTAL_STEPS;
    /* A skipped step only advances when the next step is reachable; skipping
       “place the centre” with no bones would leave “add a limb” impossible. */
    const skipped = new Set(Array.isArray(f.skipped) ? f.skipped : []);
    while (i < TOTAL_STEPS && skipped.has(STEPS[i].id)) {
      if (i === 0 && !bones.length) break;
      i++;
    }
    if (i >= TOTAL_STEPS) {
      return { version: VERSION, done: true, hidden: !!f.dismissed, stage: null, total: TOTAL_STEPS, steps: STEPS, modal: false, blocksCanvas: false, existing };
    }
    const step = STEPS[i];
    return {
      version: VERSION, done: false, hidden: false, stage: step.n, stepId: step.id, title: step.title, body: step.body, cta: step.cta,
      tool: step.tool, total: TOTAL_STEPS, steps: STEPS, modal: false, blocksCanvas: false, existing: existing || i > 0,
      mascot: !bones.length
    };
  }

  function guideAction(plan) {
    const p = plan || guidePlan(null, {});
    if (p.done) return { type: 'none' };
    if (p.stepId === 'centre') return { type: 'tool', tool: 'centre' };
    if (p.stepId === 'limbs') return { type: 'tool', tool: 'bone' };
    if (p.stepId === 'attach') return { type: 'tool', tool: 'attach' };
    return { type: 'addFrame' };
  }

  function mascotOffer(anim) {
    const bones = Array.isArray(anim && anim.bones) ? anim.bones : [];
    return bones.length === 0 && countFrames(anim) === 0;
  }

  /* Rejected option B: a three-page wizard in its own modal. Kept executable so
     the cost is measurable: 1 overlay, canvas blocked, 3 pages, no live rig. */
  function wizardPlan(page) {
    return { mode: 'wizard', modal: true, blocksCanvas: true, pages: 3, page: clamp(Number(page) || 1, 1, 3), total: 3, steps: 3 };
  }

  /* Rejected shipped flow: start in Add bones, no centre, generic names. */
  function legacyFlow(anim) {
    const bones = Array.isArray(anim) ? anim : (Array.isArray(anim && anim.bones) ? anim.bones : []);
    return { centreFirst: false, tool: 'bone', steps: 0, autoName: false, nextName: 'bone ' + (bones.length + 1), modal: false };
  }

  return {
    VERSION, TOTAL_STEPS, STEPS, ROOT_LEN, HIP_Y,
    rootOf, countParts, countFrames, centreFor, centreFromBox, uniqueName, autoName, isAutoName,
    guidePlan, guideAction, mascotOffer, wizardPlan, legacyFlow
  };
});
