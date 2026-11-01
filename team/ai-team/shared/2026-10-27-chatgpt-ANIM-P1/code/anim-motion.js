/* G-Warp ANIM-P1 — isolated motion-data helpers.
 * Pure data operations only. Not loaded by app.html; no editor/runtime hooks are patched.
 * The integrator must connect these helpers to the existing Animation UI and solver.
 */
(() => {
  'use strict';
  if (window.GW_ANIM_MOTION) return;
  if (typeof window.GW_FEATURE_OFF === 'function' && window.GW_FEATURE_OFF('animMotion')) return;

  const VERSION = 2;
  const CURVES = Object.freeze(['linear', 'ease', 'bounce', 'snap']);
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key);
  const idKey = id => String(id);
  const number = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };
  const clamp = (value, low, high, fallback = low) =>
    Math.max(low, Math.min(high, number(value, fallback)));
  const clone = value => JSON.parse(JSON.stringify(value));
  const normAngle = value => {
    const n = number(value, 0);
    return ((n % 360) + 540) % 360 - 180;
  };
  const shortAngle = (from, to) => normAngle(number(to) - number(from));
  const getAngle = (frame, id, bone) =>
    number(frame?.angles?.[idKey(id)], number(bone?.angle, 0));
  const getRoot = (frame, id, bone) =>
    frame?.roots?.[idKey(id)] || { x: number(bone?.x), y: number(bone?.y) };
  const isRootBone = bone =>
    bone?.parent === undefined || bone.parent === null || bone.parent === '';
  const easeIO = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  function bounceOut(t) {
    const n = 7.5625, d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) { t -= 1.5 / d; return n * t * t + 0.75; }
    if (t < 2.5 / d) { t -= 2.25 / d; return n * t * t + 0.9375; }
    t -= 2.625 / d;
    return n * t * t + 0.984375;
  }

  function easeValue(curve, t) {
    const x = clamp(t, 0, 1, 0);
    switch (CURVES.includes(curve) ? curve : 'ease') {
      case 'linear': return x;
      case 'bounce': return clamp(bounceOut(x), 0, 1, x);
      case 'snap': return 1 - Math.pow(1 - x, 3);
      case 'ease':
      default: return easeIO(x);
    }
  }

  function curveFor(frame) {
    // Legacy frames intentionally remain without a new field; their effective curve is Ease.
    return CURVES.includes(frame?.easeToNext) ? frame.easeToNext : 'ease';
  }

  function holdTicks(frame) {
    return clamp(Math.round(number(frame?.hold, 1)), 1, 4, 1);
  }

  function normalizeFrame(frame) {
    const f = frame && typeof frame === 'object' ? frame : { roots: {}, angles: {} };
    if (!f.roots || typeof f.roots !== 'object') f.roots = {};
    if (!f.angles || typeof f.angles !== 'object') f.angles = {};
    if (!f.stretch || typeof f.stretch !== 'object') f.stretch = {};
    if (own(f, 'hold')) f.hold = holdTicks(f);
    if (own(f, 'easeToNext') && !CURVES.includes(f.easeToNext)) delete f.easeToNext;
    if (f.stretch && typeof f.stretch === 'object') {
      Object.keys(f.stretch).forEach(id => {
        f.stretch[id] = clamp(f.stretch[id], 0.6, 1.4, 1);
      });
    }
    return f;
  }

  function interpolateFrame(anim, fromFrame, toFrame, t, curve) {
    const u = easeValue(curve, t);
    const output = { roots: {}, angles: {}, stretch: {} };
    const knownIds = new Set((anim?.bones || []).map(bone => idKey(bone.id)));

    (anim?.bones || []).forEach(bone => {
      const id = idKey(bone.id);
      const fromAngle = getAngle(fromFrame, id, bone);
      const toAngle = getAngle(toFrame, id, bone);
      output.angles[id] = normAngle(fromAngle + shortAngle(fromAngle, toAngle) * u);

      if (isRootBone(bone)) {
        const fromRoot = getRoot(fromFrame, id, bone);
        const toRoot = getRoot(toFrame, id, bone);
        output.roots[id] = {
          x: Math.round((number(fromRoot.x) + (number(toRoot.x) - number(fromRoot.x)) * u) * 100) / 100,
          y: Math.round((number(fromRoot.y) + (number(toRoot.y) - number(fromRoot.y)) * u) * 100) / 100
        };
      }

      const fromStretch = clamp(fromFrame?.stretch?.[id], 0.6, 1.4, 1);
      const toStretch = clamp(toFrame?.stretch?.[id], 0.6, 1.4, 1);
      if (own(fromFrame?.stretch, id) || own(toFrame?.stretch, id)) {
        output.stretch[id] = Math.round((fromStretch + (toStretch - fromStretch) * u) * 1000) / 1000;
      }
    });

    // Preserve custom/unmapped values without duplicating numeric/string bone IDs.
    const angleIds = new Set([
      ...Object.keys(fromFrame?.angles || {}),
      ...Object.keys(toFrame?.angles || {})
    ]);
    angleIds.forEach(id => {
      if (knownIds.has(id)) return;
      const a = number(fromFrame?.angles?.[id], number(toFrame?.angles?.[id]));
      const b = number(toFrame?.angles?.[id], a);
      output.angles[id] = normAngle(a + shortAngle(a, b) * u);
    });

    const rootIds = new Set([
      ...Object.keys(fromFrame?.roots || {}),
      ...Object.keys(toFrame?.roots || {})
    ]);
    rootIds.forEach(id => {
      if (knownIds.has(id)) return;
      const a = fromFrame?.roots?.[id] || toFrame?.roots?.[id] || { x: 0, y: 0 };
      const b = toFrame?.roots?.[id] || a;
      output.roots[id] = {
        x: number(a.x) + (number(b.x) - number(a.x)) * u,
        y: number(a.y) + (number(b.y) - number(a.y)) * u
      };
    });
    return output;
  }

  function makePlaybackClock(frame = 0, frames = []) {
    const last = Math.max(0, (frames?.length || 1) - 1);
    const index = clamp(Math.floor(number(frame)), 0, last, 0);
    return {
      frame: index,
      remaining: holdTicks(frames?.[index]) - 1,
      done: !frames?.length
    };
  }

  function resetPlaybackClock(clock, frames, frame = clock?.frame || 0) {
    const c = clock || makePlaybackClock(frame, frames);
    const last = Math.max(0, (frames?.length || 1) - 1);
    c.frame = clamp(Math.floor(number(frame)), 0, last, 0);
    c.remaining = holdTicks(frames?.[c.frame]) - 1;
    c.done = !frames?.length;
    return c;
  }

  function advancePlaybackClock(clock, frames, loop = true) {
    if (!frames?.length) {
      if (clock) clock.done = true;
      return 0;
    }
    const c = clock || makePlaybackClock(0, frames);
    c.frame = clamp(Math.floor(number(c.frame)), 0, frames.length - 1, 0);
    c.remaining = clamp(Math.floor(number(c.remaining)), 0, 3, 0);
    if (c.done) return c.frame;

    if (c.remaining > 0) {
      c.remaining--;
      return c.frame;
    }

    if (c.frame + 1 < frames.length) {
      c.frame++;
    } else if (loop) {
      c.frame = 0;
    } else {
      // The final frame has now been visible for its complete hold duration.
      c.done = true;
      return c.frame;
    }
    c.remaining = holdTicks(frames[c.frame]) - 1;
    return c.frame;
  }

  function expandHeldFrames(frames) {
    const entries = [];
    (frames || []).forEach((frame, sourceFrame) => {
      const count = holdTicks(frame);
      for (let tick = 0; tick < count; tick++) {
        entries.push({ sourceFrame, holdTick: tick + 1, holdCount: count });
      }
    });
    return {
      frames: entries,
      count: entries.length,
      requiresLargeResultConfirmation: entries.length > 240,
      exceedsHardLimit: entries.length > 960,
      hardLimit: 960
    };
  }

  function getStretch(frame, boneId) {
    return clamp(frame?.stretch?.[idKey(boneId)], 0.6, 1.4, 1);
  }

  function effectiveBoneLength(bone, frame) {
    return Math.max(0, number(bone?.len)) * getStretch(frame, bone?.id);
  }

  function boneLocalScaleX(frame, boneId) {
    return getStretch(frame, boneId);
  }

  function resolveFollowThrough(anim, frameIndex) {
    const frames = anim?.frames || [];
    if (!frames.length) return { roots: {}, angles: {}, stretch: {} };

    const index = clamp(Math.floor(number(frameIndex)), 0, frames.length - 1, 0);
    const base = clone(normalizeFrame(clone(frames[index])));
    const loop = anim.loop !== false;
    const frameAt = target => {
      if (loop) return frames[(target % frames.length + frames.length) % frames.length];
      return target < 0 || target >= frames.length ? null : frames[target];
    };
    const byId = new Map((anim.bones || []).map(bone => [idKey(bone.id), bone]));

    (anim.bones || []).forEach(bone => {
      const config = bone.followThrough;
      if (!config?.enabled || isRootBone(bone) || !byId.has(idKey(bone.parent))) return;
      const delay = clamp(Math.round(number(config.delay, 1)), 1, 2, 1);
      const amount = clamp(config.amount, 0.15, 0.75, 0.35);
      const later = frameAt(index - delay);
      const earlier = frameAt(index - delay - 1);
      if (!later || !earlier) return;
      const parentId = idKey(bone.parent);
      const parent = byId.get(parentId);
      const delta = shortAngle(
        getAngle(earlier, parentId, parent),
        getAngle(later, parentId, parent)
      );
      if (Math.abs(delta) < 1e-8) return;
      const childId = idKey(bone.id);
      base.angles[childId] = normAngle(getAngle(base, childId, bone) + delta * amount);
    });
    return base;
  }

  const aliases = {
    body: 'body', torso: 'body', chest: 'body',
    head: 'head',
    leftarm: 'left_arm', 'left-arm': 'left_arm', 'left arm': 'left_arm', arm_l: 'left_arm',
    rightarm: 'right_arm', 'right-arm': 'right_arm', 'right arm': 'right_arm', arm_r: 'right_arm',
    leftleg: 'left_leg', 'left-leg': 'left_leg', 'left leg': 'left_leg', leg_l: 'left_leg',
    rightleg: 'right_leg', 'right-leg': 'right_leg', 'right leg': 'right_leg', leg_r: 'right_leg'
  };

  function canonicalName(name) {
    const raw = String(name || '').trim().toLowerCase().replace(/\s+/g, ' ');
    return aliases[raw] || aliases[raw.replace(/_/g, '')] || raw.replace(/[\s-]+/g, '_');
  }

  function uniqueBoneMap(anim) {
    const map = new Map();
    const duplicates = new Set();
    (anim?.bones || []).forEach(bone => {
      const name = canonicalName(bone.name);
      if (!name) return;
      if (map.has(name)) duplicates.add(name);
      else map.set(name, bone);
    });
    duplicates.forEach(name => map.delete(name));
    return map;
  }

  function mirrorFrame(anim, frame, centerX = 0) {
    const out = clone(normalizeFrame(clone(frame || { roots: {}, angles: {} })));
    const map = uniqueBoneMap(anim);
    const pairs = [
      ['left_arm', 'right_arm'],
      ['left_leg', 'right_leg'],
      ['body', 'body'],
      ['head', 'head']
    ];
    const handled = new Set();
    const skipped = [];

    pairs.forEach(([leftName, rightName]) => {
      const left = map.get(leftName);
      const right = map.get(rightName);
      if (!left || !right) {
        if (left || right) skipped.push(leftName === rightName ? leftName : (!left ? leftName : rightName));
        return;
      }

      const leftId = idKey(left.id), rightId = idKey(right.id);
      const leftOffset = shortAngle(number(left.angle), getAngle(frame, leftId, left));
      const rightOffset = shortAngle(number(right.angle), getAngle(frame, rightId, right));
      if (leftId === rightId) {
        out.angles[leftId] = normAngle(number(left.angle) - leftOffset);
      } else {
        out.angles[rightId] = normAngle(number(right.angle) - leftOffset);
        out.angles[leftId] = normAngle(number(left.angle) - rightOffset);
      }

      const leftStretch = getStretch(frame, leftId);
      const rightStretch = getStretch(frame, rightId);
      if (leftId === rightId) out.stretch[leftId] = leftStretch;
      else {
        if (own(frame?.stretch, leftId) || own(frame?.stretch, rightId)) {
          out.stretch[rightId] = leftStretch;
          out.stretch[leftId] = rightStretch;
        }
      }
      handled.add(leftId);
      handled.add(rightId);
    });

    Object.keys(frame?.roots || {}).forEach(id => {
      const root = frame.roots[id] || {};
      out.roots[id] = {
        x: 2 * number(centerX) - number(root.x),
        y: number(root.y)
      };
    });
    return { frame: out, paired: handled.size, skipped };
  }

  function copyPose(anim, frame) {
    const map = uniqueBoneMap(anim);
    const anglesByName = {}, rootsByName = {}, stretchByName = {};
    map.forEach((bone, name) => {
      const id = idKey(bone.id);
      if (own(frame?.angles, id)) {
        anglesByName[name] = shortAngle(number(bone.angle), number(frame.angles[id]));
      }
      if (own(frame?.roots, id)) {
        const value = frame.roots[id] || {};
        rootsByName[name] = {
          x: number(value.x) - number(bone.x),
          y: number(value.y) - number(bone.y)
        };
      }
      if (own(frame?.stretch, id)) stretchByName[name] = getStretch(frame, id);
    });
    return { version: VERSION, anglesByName, rootsByName, stretchByName };
  }

  function pastePose(anim, targetFrame, clipboard) {
    const out = clone(normalizeFrame(clone(targetFrame || { roots: {}, angles: {} })));
    const map = uniqueBoneMap(anim);
    const details = [];
    let angles = 0, roots = 0, stretch = 0, skipped = 0;

    Object.entries(clipboard?.anglesByName || {}).forEach(([rawName, rawValue]) => {
      const name = canonicalName(rawName), bone = map.get(name);
      const value = Number(rawValue);
      if (!bone || !Number.isFinite(value)) { skipped++; details.push(name); return; }
      out.angles[idKey(bone.id)] = normAngle(number(bone.angle) + value);
      angles++;
    });

    Object.entries(clipboard?.rootsByName || {}).forEach(([rawName, rawValue]) => {
      const name = canonicalName(rawName), bone = map.get(name);
      if (!bone || !Number.isFinite(Number(rawValue?.x)) || !Number.isFinite(Number(rawValue?.y))) {
        skipped++; details.push(name); return;
      }
      out.roots[idKey(bone.id)] = {
        x: number(bone.x) + Number(rawValue.x),
        y: number(bone.y) + Number(rawValue.y)
      };
      roots++;
    });

    Object.entries(clipboard?.stretchByName || {}).forEach(([rawName, rawValue]) => {
      const name = canonicalName(rawName), bone = map.get(name);
      if (!bone || !Number.isFinite(Number(rawValue))) { skipped++; details.push(name); return; }
      out.stretch[idKey(bone.id)] = clamp(rawValue, 0.6, 1.4, 1);
      stretch++;
    });

    return { frame: out, angles, roots, stretch, skipped, skippedNames: details };
  }

  function applyLibraryPose(anim, targetFrame, pose) {
    const out = clone(normalizeFrame(clone(targetFrame || { roots: {}, angles: {} })));
    const map = uniqueBoneMap(anim);
    let applied = 0, skipped = 0;
    const skippedNames = [];

    Object.entries(pose?.anglesByName || {}).forEach(([rawName, rawValue]) => {
      const name = canonicalName(rawName), bone = map.get(name);
      const value = Number(rawValue);
      if (!bone || !Number.isFinite(value)) { skipped++; skippedNames.push(name); return; }
      out.angles[idKey(bone.id)] = normAngle(number(bone.angle) + value);
      applied++;
    });
    return { frame: out, applied, skipped, skippedNames };
  }

  function makeCostumePlan(anim) {
    const plan = expandHeldFrames(anim?.frames || []);
    return {
      ...plan,
      entries: plan.frames.map((entry, outputIndex) => ({
        ...entry,
        outputFrame: outputIndex,
        costumeName: String(anim?.name || 'animation') + '//frame ' + (outputIndex + 1)
      }))
    };
  }

  function setHold(frame, ticks) {
    if (!frame || typeof frame !== 'object') return 1;
    frame.hold = clamp(Math.round(number(ticks, 1)), 1, 4, 1);
    return frame.hold;
  }

  function setCurve(frame, curve) {
    if (!frame || typeof frame !== 'object' || !CURVES.includes(curve)) return false;
    frame.easeToNext = curve;
    return true;
  }

  function setStretch(frame, boneId, value) {
    if (!frame || typeof frame !== 'object') return 1;
    frame.stretch ||= {};
    frame.stretch[idKey(boneId)] = clamp(value, 0.6, 1.4, 1);
    return frame.stretch[idKey(boneId)];
  }

  function setFollowThrough(bone, options = {}) {
    if (!bone || typeof bone !== 'object') return false;
    if (isRootBone(bone)) {
      bone.followThrough = { enabled: false, delay: 1, amount: 0.35 };
      return false;
    }
    const amount = options.amount === undefined ? 0.35 : number(options.amount, 0.35);
    bone.followThrough = {
      enabled: !!options.enabled,
      delay: clamp(Math.round(number(options.delay, 1)), 1, 2, 1),
      amount: clamp(amount, 0.15, 0.75, 0.35)
    };
    return true;
  }

  const api = Object.freeze({
    version: VERSION,
    curves: CURVES,
    easeValue,
    curveFor,
    interpolateFrame,
    normalizeFrame,
    holdTicks,
    setHold,
    setCurve,
    makePlaybackClock,
    resetPlaybackClock,
    advancePlaybackClock,
    expandHeldFrames,
    makeCostumePlan,
    getStretch,
    effectiveBoneLength,
    boneLocalScaleX,
    setStretch,
    setFollowThrough,
    resolveFollowThrough,
    canonicalName,
    mirrorFrame,
    copyPose,
    pastePose,
    applyLibraryPose
  });

  window.GW_ANIM_MOTION = api;
})();
