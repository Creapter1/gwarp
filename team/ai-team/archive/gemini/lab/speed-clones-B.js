(() => {
  'use strict';

  /**
   * speed-clones-B (G-Warp, wraps ScriptThread.prototype.step)
   * Fastest: keeps a per-thread "skip" flag. Every K frames we scan
   * Engine.threads once and mark threads whose sprite is invisible
   * and whose stack is empty. The wrapper then short-circuits those
   * threads with a single boolean read.
   *
   * Round 1: per-thread skip flag, refreshed every 30 frames.
   * Round 2 attacks fixed:
   *   - stale flag when a thread gets a broadcast -> refresh every
   *     30 frames AND invalidate a thread's flag the moment its
   *     stack length grows past 0
   *   - Engine.threads array mutated during iteration -> we iterate
   *     over a snapshot
   *   - thread has no numeric id -> use a WeakSet for "skip"
   *   - skip flag must be cleared when the sprite becomes visible
   *     again -> rechecked on every refresh
   *   - initial refresh happens lazily on the first step call
   * Round 3 optimisation: skip via WeakSet hit is O(1); the refresh
   *   is O(n) every 30 frames, amortised to O(n/30) per frame.
   */

  const Engine = window.Engine;
  if (!Engine || !Array.isArray(Engine.threads)) {
    console.warn('[speed-clones-B] Engine.threads not found; doing nothing.');
    return;
  }

  let proto = null;
  if (typeof window.ScriptThread === 'function' && window.ScriptThread.prototype) {
    proto = window.ScriptThread.prototype;
  } else {
    const t0 = Engine.threads[0];
    if (t0 && t0.constructor && t0.constructor.prototype) proto = t0.constructor.prototype;
  }
  if (!proto || typeof proto.step !== 'function') {
    console.warn('[speed-clones-B] ScriptThread.prototype.step not reachable; doing nothing.');
    return;
  }
  if (proto._gwSpeedClonesB) return;
  proto._gwSpeedClonesB = true;

  const orig = proto.step;

  const REFRESH_EVERY = 30;
  let framesSinceRefresh = REFRESH_EVERY; // force first refresh
  const skipSet = new WeakSet();

  function spriteOf(t) { return t && (t.sprite || t.target || t.owner || null); }
  function readVisible(s) {
    if (!s) return true;
    if (typeof s.visible === 'boolean') return s.visible;
    if (typeof s.isVisible === 'boolean') return s.isVisible;
    if (typeof s.hidden === 'boolean') return !s.hidden;
    if (typeof s._visible === 'boolean') return s._visible;
    return true; // UNSURE
  }
  function stackOf(t) { return t && (t.stack || t.blocks || t.ops || null); }

  function refresh() {
    const threads = Engine.threads.slice(); // snapshot
    // WeakSet cannot be cleared; rebuild by reassigning the variable.
    // We store it on the closure and reassign.
    skipSetRef.current = new WeakSet();
    for (let i = 0; i < threads.length; i++) {
      const t = threads[i];
      const s = spriteOf(t);
      if (!s) continue;
      if (readVisible(s)) continue;
      const st = stackOf(t);
      if (st && st.length > 0) continue;
      skipSetRef.current.add(t);
    }
  }

  // Holder so we can reassign a WeakSet without leaking.
  const skipSetRef = { current: skipSet };

  proto.step = function () {
    if (framesSinceRefresh >= REFRESH_EVERY) {
      framesSinceRefresh = 0;
      refresh();
    }
    framesSinceRefresh++;

    // Fast invalidation: if the thread has a stack now, it must run.
    const st = stackOf(this);
    if (st && st.length > 0) {
      // Clear from skip set if present.
      if (skipSetRef.current.has(this)) {
        // Rebuild will catch this, but to be safe run this frame.
        return orig.apply(this, arguments);
      }
      return orig.apply(this, arguments);
    }

    if (skipSetRef.current.has(this)) return;
    return orig.apply(this, arguments);
  };
})();
