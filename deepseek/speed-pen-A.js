(() => {
'use strict';

/**
 * speed-pen-A: Buffer pen points in Float32Array; flush once per frame.
 * UNSURE: _penSkin / draw API on G-Warp renderer.
 */
const MAX_POINTS = 10000;
const buffer = new Float32Array(MAX_POINTS * 2);
let count = 0;

const penSkin = window.vm?.runtime?.renderer?._penSkin;
if (!penSkin || typeof penSkin.draw !== 'function') return;

const originalDraw = penSkin.draw.bind(penSkin);

function flush(skin) {
  if (count === 0) return;
  for (let i = 0; i < count; i++) {
    originalDraw(buffer[i * 2], buffer[i * 2 + 1]);
  }
  count = 0;
}

penSkin.draw = function (x, y) {
  if (count >= MAX_POINTS) flush(this);
  buffer[count * 2] = x;
  buffer[count * 2 + 1] = y;
  count++;
};

if (typeof penSkin.clear === 'function') {
  const originalClear = penSkin.clear.bind(penSkin);
  penSkin.clear = function () {
    flush(this);
    return originalClear();
  };
}

const originalDrawFrame = window.vm?.runtime?.renderer?.draw;
if (originalDrawFrame) {
  window.vm.runtime.renderer.draw = function () {
    flush(penSkin);
    return originalDrawFrame.apply(this, arguments);
  };
}
})();
