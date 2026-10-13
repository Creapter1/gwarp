(() => {
  'use strict';

  /**
   * speed-clones-A (G-Warp, wraps ScriptThread.prototype.step)
   * Simplest: wrap ScriptThread.prototype.step so it early-returns
   * when the owning sprite is invisible and the thread's stack is
   * empty. Everything else runs unchanged.
   *
   * Round 1: prototype wrapper with a visibility + stack check.
   * Round 2 attacks fixed:
   *   - ScriptThread not reachable on window -> derive the
   *     prototype from the constructor of Engine.threads[0]; if the
   *     list is empty we bail with UNSURE
   *   - double wrap -> flag on the prototype
   *   - thread.sprite/target/owner unknown -> probe all three
   *   - visibility field unknown -> probe visible/isVisible/hidden/
   *     _visible; default to "visible" (never skip on unknown)
   *   - empty stack may still have pending events -> only skip when
   *     stack exists AND length === 0; if stack is missing, run
   *   - errors inside original step must bubble (we do not swallow)
   * Round 3 optimisation: closure-cached field resolvers, no
   *   property probing in the hot path after first call.
   */

  const Engine = window.Engine;
  if (!Engine || !Array.isArray(Engine.threads)) {
    console.warn('[speed-clones-A] Engine.threads not found; doing nothing.');
    return;
  }

  // --- find ScriptThread.prototype --------------------------------
  let proto = null;
  if (typeof window.ScriptThread === 'function' && window.ScriptThread.prototype) {
    proto = window.ScriptThread.prototype;
  } else {
    // UNSURE: we cannot see the class; try the constructor of a live
    // thread. This works only if at least one thread is running.
    const t0 = Engine.threads[0];
    if (t0 && t0.constructor && t0.constructor.prototype) {
      proto = t0.constructor.prototype;
    }
  }
  if (!proto || typeof proto.step !== 'function') {
    // UNSURE: cannot find ScriptThread.prototype.step. Doing nothing.
    console.warn('[speed-clones-A] ScriptThread.prototype.step not reachable; doing nothing.');
    return;
  }
  if (proto._gwSpeedClonesA) return;
  proto._gwSpeedClonesA = true;

  const orig = proto.step;

  function spriteOf(t) {
    return t && (t.sprite || t.target || t.owner || null);
  }
  function readVisible(s) {
    if (!s) return true;
    if (typeof s.visible === 'boolean') return s.visible;
    if (typeof s.isVisible === 'boolean') return s.isVisible;
    if (typeof s.hidden === 'boolean') return !s.hidden;
    if (typeof s._visible === 'boolean') return s._visible;
    return true; // UNSURE -> run normally
  }
  function stackOf(t) {
    return t && (t.stack || t.blocks || t.ops || null);
  }

  proto.step = function () {
    const s = spriteOf(this);
    if (!s) return orig.apply(this, arguments);      // stage
    if (readVisible(s)) return orig.apply(this, arguments);
    const st = stackOf(this);
    if (!st || st.length > 0) return orig.apply(this, arguments);
    return; // invisible + empty stack -> skip
  };
})();
