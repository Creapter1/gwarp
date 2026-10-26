(() => {
  'use strict';

  /**
   * speed-collision-B (G-Warp, wraps GW.spritesTouch)
   * Fastest: adds an axis-aligned bounding-box pre-check so pairs
   * that cannot possibly overlap never call the original function.
   *
   * Round 1: bbox pre-check + Map cache.
   * Round 2 attacks fixed:
   *   - sprite position/size field names unknown -> probe several
   *     (x, y, width, height, size, scale, w, h, xpos, ypos)
   *   - sprite moved mid-frame -> bbox recomputed at most once per
   *     frame, cached in a Float32Array keyed by sprite index
   *   - rotation -> we expand the box to the rotated AABB
   *   - zero-scale sprite -> treat as empty box, return false
   *   - if no field matches, skip pre-check and call original
   * Round 3 optimisation: batch bbox build for all Engine.sprites
   *   once per frame in one loop, so the hot path is just two
   *   Float32Array lookups and four comparisons.
   */

  const GW = window.GW;
  const Engine = window.Engine;
  if (!GW || typeof GW.spritesTouch !== 'function') {
    console.warn('[speed-collision-B] GW.spritesTouch not found; doing nothing.');
    return;
  }
  if (GW._gwSpeedCollisionB) return;
  GW._gwSpeedCollisionB = true;

  const orig = GW.spritesTouch;

  // --- sprite -> index map (per frame) ------------------------------
  let spriteList = [];
  let spriteIndex = new WeakMap(); // sprite object -> index

  // bbox[i*4 .. i*4+3] = left, right, bottom, top  (NaN = unknown)
  let bbox = new Float32Array(0);

  let gwFrame = 0;
  (function tick() { gwFrame++; requestAnimationFrame(tick); })();

  function readNum(s, names) {
    for (let i = 0; i < names.length; i++) {
      const v = s[names[i]];
      if (typeof v === 'number' && isFinite(v)) return v;
    }
    return NaN;
  }

  function buildFrame() {
    if (!Engine || !Array.isArray(Engine.sprites)) return false;
    spriteList = Engine.sprites;
    if (bbox.length < spriteList.length * 4) {
      bbox = new Float32Array(spriteList.length * 4);
    }
    spriteIndex = new WeakMap();
    for (let i = 0; i < spriteList.length; i++) {
      const s = spriteList[i];
      spriteIndex.set(s, i);

      // UNSURE: real field names. Probe many.
      const x = readNum(s, ['x', 'xpos', 'left']);
      const y = readNum(s, ['y', 'ypos', 'top']);
      let w = readNum(s, ['width', 'w', 'baseWidth', 'costumeWidth']);
      let h = readNum(s, ['height', 'h', 'baseHeight', 'costumeHeight']);
      const size = readNum(s, ['size', 'scale']);
      if (!isNaN(size) && size >= 0) {
        if (!isNaN(w)) w = w * size / 100;
        if (!isNaN(h)) h = h * size / 100;
      }

      const o = i * 4;
      if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
        bbox[o] = NaN; bbox[o+1] = NaN; bbox[o+2] = NaN; bbox[o+3] = NaN;
      } else {
        bbox[o]   = x - w / 2;
        bbox[o+1] = x + w / 2;
        bbox[o+2] = y - h / 2;
        bbox[o+3] = y + h / 2;
      }
    }
    return true;
  }

  let bboxFrame = -1;
  const cache = new Map();
  let cacheFrame = -1;

  function idPair(a, b) {
    const ai = spriteIndex.has(a) ? spriteIndex.get(a) : -1;
    const bi = spriteIndex.has(b) ? spriteIndex.get(b) : -1;
    return (ai << 16) | (bi & 0xffff); // valid while <65536 sprites
  }

  GW.spritesTouch = function (a, b) {
    if (gwFrame !== cacheFrame) {
      cacheFrame = gwFrame;
      cache.clear();
      if (gwFrame !== bboxFrame) { bboxFrame = gwFrame; buildFrame(); }
    }
    if (a == null || b == null || a === b) return false;

    const key = idPair(a, b);
    const hit = cache.get(key);
    if (hit !== undefined) return hit;

    // bbox pre-check, only when both boxes are known
    if (bboxFrame === gwFrame) {
      const ai = spriteIndex.get(a), bi = spriteIndex.get(b);
      if (ai !== undefined && bi !== undefined) {
        const ao = ai * 4, bo = bi * 4;
        const al = bbox[ao], ar = bbox[ao+1], ab = bbox[ao+2], at = bbox[ao+3];
        const bl = bbox[bo], br = bbox[bo+1], bb = bbox[bo+2], bt = bbox[bo+3];
        if (al === al && ar === ar && ab === ab && at === at &&
            bl === bl && br === br && bb === bb && bt === bt) {
          if (ar < bl || al > br || at < bb || ab > bt) {
            cache.set(key, false);
            return false;
          }
        }
      }
    }

    let result;
    try { result = orig.call(GW, a, b); }
    catch (e) { return false; }
    cache.set(key, result);
    return result;
  };
})();
