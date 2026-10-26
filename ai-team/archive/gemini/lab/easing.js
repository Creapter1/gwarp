(() => {
  'use strict';

  /**
   * G-Warp Animation Easing & Pose Interpolation Module
   * Pure functions: linear(t), easeInOut(t), spring(t)
   * Pose mixer: mixPose(A, B, t, ease) — angles turn the short way round.
   */

  function clamp01(t) {
    const n = Number(t);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(1, n));
  }

  function linear(t) {
    return clamp01(t);
  }

  function easeInOut(t) {
    const x = clamp01(t);
    if (x === 0 || x === 1) return x;
    return (1 - Math.cos(Math.PI * x)) / 2;
  }

  function spring(t) {
    const x = clamp01(t);
    if (x === 0 || x === 1) return x;
    // Damped cartoon spring with subtle overshoot (~9% peak overshoot) that settles at 1
    const c2 = 1.35 * 1.525;
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }

  function shortestAngleDelta(fromDeg, toDeg) {
    let d = ((Number(toDeg) || 0) - (Number(fromDeg) || 0)) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  }

  function lerpAngleShort(fromDeg, toDeg, u) {
    const a = Number(fromDeg) || 0;
    return a + shortestAngleDelta(a, toDeg) * u;
  }

  function resolveEaseFn(ease) {
    if (typeof ease === 'function') return ease;
    if (typeof ease === 'string') {
      const k = ease.toLowerCase();
      if (k === 'easeinout' || k === 'ease-in-out' || k === 'sine' || k === 'smooth') return easeInOut;
      if (k === 'spring' || k === 'springy' || k === 'overshoot') return spring;
      return linear;
    }
    return linear;
  }

  function isAngleKey(key) {
    const k = String(key);
    if (/^(x|y|dx|dy|tx|ty|px|py|sx|sy|scale|scaleX|scaleY|len|length|alpha|opacity|r|g|b|w|h|width|height)$/i.test(k)) {
      return false;
    }
    return true;
  }

  function mixPose(A, B, t = 0.5, ease = linear) {
    const fn = resolveEaseFn(ease);
    const u = fn(t);
    const poseA = A || {};
    const poseB = B || {};

    // Support structured { roots, angles } poses as well as flat { shoulder, elbow, wrist, x, y } poses
    if (poseA.angles || poseB.angles || poseA.roots || poseB.roots) {
      const aRoots = poseA.roots || {};
      const bRoots = poseB.roots || {};
      const aAngles = poseA.angles || {};
      const bAngles = poseB.angles || {};

      const roots = {};
      const rootKeys = new Set([...Object.keys(aRoots), ...Object.keys(bRoots)]);
      for (const id of rootKeys) {
        const ra = aRoots[id] || bRoots[id] || { x: 0, y: 0 };
        const rb = bRoots[id] || aRoots[id] || { x: 0, y: 0 };
        roots[id] = {
          x: (Number(ra.x) || 0) + ((Number(rb.x) || 0) - (Number(ra.x) || 0)) * u,
          y: (Number(ra.y) || 0) + ((Number(rb.y) || 0) - (Number(ra.y) || 0)) * u
        };
      }

      const angles = {};
      const angleKeys = new Set([...Object.keys(aAngles), ...Object.keys(bAngles)]);
      for (const id of angleKeys) {
        angles[id] = lerpAngleShort(aAngles[id] ?? 0, bAngles[id] ?? 0, u);
      }

      const out = { roots, angles };
      // Also mix any top-level numeric properties if present
      const topKeys = new Set([...Object.keys(poseA), ...Object.keys(poseB)]);
      for (const k of topKeys) {
        if (k === 'roots' || k === 'angles') continue;
        const va = poseA[k];
        const vb = poseB[k];
        if (typeof va === 'number' || typeof vb === 'number') {
          out[k] = isAngleKey(k)
            ? lerpAngleShort(va ?? 0, vb ?? 0, u)
            : (Number(va) || 0) + ((Number(vb) || 0) - (Number(va) || 0)) * u;
        }
      }
      return out;
    }

    const result = {};
    const keys = new Set([...Object.keys(poseA), ...Object.keys(poseB)]);
    for (const k of keys) {
      const va = poseA[k];
      const vb = poseB[k];
      if (va && typeof va === 'object' && !Array.isArray(va)) {
        result[k] = mixPose(va, vb || {}, t, fn);
      } else if (typeof va === 'number' || typeof vb === 'number') {
        const na = Number(va) || 0;
        const nb = Number(vb) || 0;
        result[k] = isAngleKey(k) ? lerpAngleShort(na, nb, u) : na + (nb - na) * u;
      } else {
        result[k] = u < 0.5 ? va : vb;
      }
    }
    return result;
  }

  const GW_EASING = {
    linear,
    easeInOut,
    spring,
    mixPose,
    shortestAngleDelta,
    lerpAngleShort
  };

  if (typeof window !== 'undefined') {
    window.GW_EASING = GW_EASING;
    window.linear = linear;
    window.easeInOut = easeInOut;
    window.spring = spring;
    window.mixPose = mixPose;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = GW_EASING;
  }
})();
