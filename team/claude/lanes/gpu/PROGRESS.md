# Lane B (GPU stage) progress

## State (26 Nov, run 1)
Done: `gw-gpu-stage.js` v0.1.0 (own code, WebGL2 with WebGL1 fallback; `GWGpuStage.create(canvas)` returns null when no WebGL, then keep the 2D way).
Draws: backdrop colour + image, pen layer (as a texture, so stamps on the pen canvas show too), sprites in the order given (use GW.drawOrder, so clones and layers match), rotation centre, rotation styles, size, ghost, colour, brightness, whirl, fisheye, pixelate, mosaic (same formulas as gwFx in app.html), camera view matrix.
Costumes are uploaded once and kept in video memory (WeakMap per canvas; `invalidate(canvas)` after a paint edit; re-upload when size changes).
Tested: `node tests/pixel-test.js` (headless Chromium, SwiftShader WebGL) against G-Warp's own 2D drawing, with gwFx read live from work/app.html. 16 cases, ALL PASS (mean diff <= 0.31 of 255; pixelate/mosaic have ~0.3% edge pixels off by filtering).

## Run 2 (26 Nov 14:41 UTC)
Re-ran pixel test: 16/16 PASS. Added `tests/speed-test.js` (N clones, ms per frame). Headless SwiftShader (software GL, worst case): 300 clones 2D 13.4 ms / GPU 16.3 ms; 1000 clones 2D 32.5 / GPU 50.9. Software GL is no fair speed judge; needs a real GPU run (owner's PC/browser) before claiming a win. One draw call per sprite now -> batching untinted sprites into one call is the next speed step.

## How it would plug in (not READY yet)
WebGL and 2D cannot share one canvas: put a GL canvas under #stageCanvas, same size; each frame `gpu.draw(GWGpuStage.frameFromEngine(GW, Engine, penCanvas))` (+ `view` from the camera), and the 2D canvas only draws bubbles. `penDirty:false` when the pen did not change saves the upload.

## Next
1. Pixel check against the Scratch referee (lane C's runner) for the same cases.
2. Speed: batch sprites with no effects into one draw call; re-time on real GPU.
3. Stamp straight into a GL pen framebuffer (no pen re-upload), HQ vector costumes (sharpCopy), mip copies for small sprites.
4. Then write READY.
