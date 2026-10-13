(() => {
'use strict';

/**
 * speed-pen-B: Buffer segments; flush via original draw path once per frame.
 * Full single-draw-call WebGL path needs G-Warp-specific shader hooks —
 * this version stays safe by still calling originalDraw in a batch flush.
 * UNSURE: _penSkin existence and WebGL state compatibility.
 */
const MAX_SEGMENTS = 20000;
const vertexData = new Float32Array(MAX_SEGMENTS * 4);
let segCount = 0;

const penSkin = window.vm?.runtime?.renderer?._penSkin;
if (!penSkin || typeof penSkin.draw !== 'function') return;

const originalDraw = penSkin.draw.bind(penSkin);
let lastX = NaN;
let lastY = NaN;

penSkin.draw = function (x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') return;
  if (!isNaN(lastX) && segCount < MAX_SEGMENTS) {
    const o = segCount * 4;
    vertexData[o] = lastX;
    vertexData[o + 1] = lastY;
    vertexData[o + 2] = x;
    vertexData[o + 3] = y;
    segCount++;
  }
  lastX = x;
  lastY = y;
};

function flush() {
  for (let i = 0; i < segCount; i++) {
    const o = i * 4;
    originalDraw(vertexData[o], vertexData[o + 1]);
    originalDraw(vertexData[o + 2], vertexData[o + 3]);
  }
  segCount = 0;
  lastX = NaN;
  lastY = NaN;
}

if (typeof penSkin.clear === 'function') {
  const originalClear = penSkin.clear.bind(penSkin);
  penSkin.clear = function () {
    flush();
    return originalClear();
  };
}

const origRender = window.vm?.runtime?.renderer?.draw;
if (origRender) {
  window.vm.runtime.renderer.draw = function () {
    flush();
    return origRender.apply(this, arguments);
  };
}
})();
