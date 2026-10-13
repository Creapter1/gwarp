(() => {
'use strict';

/**
 * speed-pen-C: Linked small buffers; flush before clear; skip NaN.
 */
const BUFFER_SIZE = 2048;
const buffers = [];
let current = null;

function getBuffer() {
  if (!current || current.count >= BUFFER_SIZE) {
    current = { data: new Float32Array(BUFFER_SIZE * 2), count: 0 };
    buffers.push(current);
  }
  return current;
}

const penSkin = window.vm?.runtime?.renderer?._penSkin;
if (!penSkin || typeof penSkin.draw !== 'function') return;

const originalDraw = penSkin.draw.bind(penSkin);

function flushAll() {
  for (let b = 0; b < buffers.length; b++) {
    const buf = buffers[b];
    for (let i = 0; i < buf.count; i++) {
      originalDraw(buf.data[i * 2], buf.data[i * 2 + 1]);
    }
    buf.count = 0;
  }
  buffers.length = 0;
  current = null;
}

penSkin.draw = function (x, y) {
  if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) return;
  const buf = getBuffer();
  buf.data[buf.count * 2] = x;
  buf.data[buf.count * 2 + 1] = y;
  buf.count++;
};

if (typeof penSkin.clear === 'function') {
  const originalClear = penSkin.clear.bind(penSkin);
  penSkin.clear = function () {
    flushAll();
    return originalClear();
  };
}

const origRender = window.vm?.runtime?.renderer?.draw;
if (origRender) {
  window.vm.runtime.renderer.draw = function () {
    flushAll();
    return origRender.apply(this, arguments);
  };
}
})();
