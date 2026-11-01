(() => {
  'use strict';
  /**
   * G-Warp Lab L1 (GL1 / legacy DA1): Easing for In-Between Frames
   * Option A: Linear Easing (e(t) = t) with shortest-arc angle interpolation
   * Plugs into window.GW_ANIM.mix(poseA, poseB, t)
   */
  if (typeof window !== 'undefined' && window.GW_FEATURE_OFF?.('easingLinearA')) return;

  function clamp01(t) {
    const n = Number(t);
    if (!Number.isFinite(n)) return 0.5;
    return Math.max(0, Math.min(1, n));
  }

  function easeLinear(t) {
    return clamp01(t);
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

  function mixLinear(poseA, poseB, t = 0.5) {
    const u = easeLinear(t);
    const aRoots = (poseA && poseA.roots) || {};
    const bRoots = (poseB && poseB.roots) || {};
    const aAngles = (poseA && poseA.angles) || {};
    const bAngles = (poseB && poseB.angles) || {};

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

    return { roots, angles };
  }

  const api = { name: 'Option A (Linear)', ease: easeLinear, mix: mixLinear, lerpAngleShort };
  if (typeof window !== 'undefined') window.GW_LAB_EASING_A = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
