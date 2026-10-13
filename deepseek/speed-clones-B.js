(() => {
'use strict';

/**
 * speed-clones-B: Rebuild active mask every ~100ms; step only active threads.
 * UNSURE: safe to temporarily replace runtime.threads during stepThreads.
 */
const runtime = window.vm?.runtime;
if (!runtime || !runtime.sequencer || !runtime.sequencer.stepThreads) return;

let mask = new Uint8Array(256);
let lastRebuild = 0;

function rebuildMask(threads) {
  if (mask.length < threads.length) mask = new Uint8Array(Math.max(threads.length * 2, 256));
  for (let i = 0; i < threads.length; i++) {
    const t = threads[i];
    const visible = !t.target || t.target.isVisible !== false;
    const hasStack = t.stack && t.stack.length > 0;
    mask[i] = (visible || hasStack) ? 1 : 0;
  }
  lastRebuild = performance.now();
}

const originalStepThreads = runtime.sequencer.stepThreads;
runtime.sequencer.stepThreads = function () {
  const savedThreads = this.runtime.threads;
  if (performance.now() - lastRebuild > 100) rebuildMask(savedThreads);
  const active = [];
  for (let i = 0; i < savedThreads.length; i++) {
    if (mask[i]) active.push(savedThreads[i]);
  }
  this.runtime.threads = active;
  try {
    return originalStepThreads.call(this);
  } finally {
    this.runtime.threads = savedThreads;
  }
};
})();
