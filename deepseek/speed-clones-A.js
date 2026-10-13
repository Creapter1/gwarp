(() => {
'use strict';

/**
 * speed-clones-A: Skip stepping invisible clones with empty stack.
 * UNSURE: G-Warp threads array structure / isVisible property.
 */
const originalStepThreads = window.vm?.runtime?.sequencer?.stepThreads;

if (originalStepThreads) {
  window.vm.runtime.sequencer.stepThreads = function () {
    const threads = this.runtime.threads;
    const active = [];
    for (let i = 0; i < threads.length; i++) {
      const t = threads[i];
      if (!t.target) {
        active.push(t);
        continue;
      }
      const visible = t.target.isVisible !== false;
      const hasStack = t.stack && t.stack.length > 0;
      if (visible || hasStack) active.push(t);
    }
    const saved = this.runtime.threads;
    this.runtime.threads = active;
    try {
      return originalStepThreads.call(this);
    } finally {
      this.runtime.threads = saved;
    }
  };
}
})();
