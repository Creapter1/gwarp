(() => {
'use strict';

/**
 * speed-clones-C: Safest — wrap stepThread only; do not mutate threads array.
 * Skip invisible targets with empty stack.
 */
const runtime = window.vm?.runtime;
if (!runtime || !runtime.sequencer) return;

const origStepThread = runtime.sequencer.stepThread;
if (!origStepThread) return;

runtime.sequencer.stepThread = function (thread) {
  const target = thread.target;
  if (!target) {
    return origStepThread.call(this, thread);
  }
  if (!target.isVisible && (!thread.stack || thread.stack.length === 0)) {
    return;
  }
  return origStepThread.call(this, thread);
};
})();
