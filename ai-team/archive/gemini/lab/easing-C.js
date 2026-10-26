(() => {
  'use strict';
  /**
   * G-Warp Lab L1 (GL1 / legacy DA1): Easing for In-Between Frames
   * Option C: Critically-Damped Cartoon Springy Overshoot Easing with shortest-arc angle interpolation
   * Plugs into window.GW_ANIM.mix(poseA, poseB, t, 'springy')
   */
  if (typeof window !== 'undefined' && window.GW_FEATURE_OFF?.('easingSpringC')) return;

  function clamp01(t) {
    const n = Number(t);
    if (!Number.isFinite(n)) return 0.5;
    return Math.max(0, Math.min(1, n));
  }

  function easeSpringy(t, overshoot = 1.35) {
    const x = clamp01(t);
    if (x === 0 || x === 1) return x;
    // Back-in-out with gentle cartoon overshoot (~8% peak overshoot) that settles cleanly to 0 and 1
    const c2 = overshoot * 1.525;
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

  function mixSpringy(poseA, poseB, t = 0.5) {
    const u = easeSpringy(t);
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

  const api = { name: 'Option C (Springy Overshoot)', ease: easeSpringy, mix: mixSpringy, lerpAngleShort };
  if (typeof window !== 'undefined') window.GW_LAB_EASING_C = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
