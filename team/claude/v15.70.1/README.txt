v15.70.1 (Claude Fable, 25 Nov 2026) - built on release-v15.66.0 (v15.69.0). NOT on main, NOT yet on the release branch.
File: app-v15.69.0-to-v15.70.1.patch  (apply on the release branch: git apply <file>; undo: git apply -R <file>)

WHAT CHANGED (app.html only, 4 small edits + 1 new module "gw-v1570-smooth")
1. S4 Smooth motion (TurboWarp "interpolation"). Drawing only: scripts step exactly as before; on screen frames between
   steps, sprites are drawn part-way (moves under 50 px, same costume, visible). OFF by default (owner rule).
   Switch: More > Advanced settings > Smooth motion. Projects can also ask for it (runtime.setInterpolation is real now).
2. Sprite x / y / size / direction boxes now update live (10x a second) while a project runs. Before: they stayed frozen.
3. S1 Running-script glow: was a CSS filter on the whole stack (repaints every block); now a box-shadow on the hat block.
4. Render loop: drawing moved into one function gwDraw() so it can be called between steps. Same draw order as before.

MEASURED (headless Chrome, owner's test: go to 0 0, forever move 10 steps, opened as .sb3 = 30 FPS)
  off: 30 draws/s, x = 20 30 40 ...      on: 60 draws/s, x = 10 14.9 20 25.1 30 ...   real x stays whole numbers.
  0 page errors; 300-clone stress: 30 FPS steady; Stop answers in ~55 ms.
ABOUT THE OWNER'S "choppy / G-Spark vanishes at the right edge" REPORT
  - A NEW project runs at 60 FPS (G-Warp default), so "move 10 steps" is 600 px a second: it crosses the stage in 0.4 s.
  - At the edge 15 px of the sprite stay visible. That is Scratch's fencing (More > Advanced settings > Remove fencing).
  - A .sb3 runs at 30 FPS; on a fast screen that looks choppy. Smooth motion fixes the look.
TEST: node team/claude/tests/test_4971_smooth.js <app.html> team/claude/tests/move10.sb3
ALREADY DONE (app-check): S3 undo skips pushHistory while running (app.html "owed" patch); E1.9 .sb3 opens at 30 FPS.

---- v15.70.1 (same day): "what a project shows must be the same as Scratch" (owner) ----
5. Graphic effects now use Scratch's own formulas, pixel by pixel (cached per costume + values):
   - colour: real hue shift. Before it was a CSS hue-rotate: purple + colour 100 gave (87,134,0), Scratch gives (199,246,92). Now (199,246,92).
   - brightness: ADDS light like Scratch. Before it multiplied: +50 gave (211,139,255), Scratch (255,220,255). Now exact.
   - whirl, fisheye, pixelate, mosaic: were "kept but not drawn". Now drawn. Picture: effects-check.png
6. Size limits like Scratch: smallest = 5 px on the costume, biggest = 1.5x the stage (set size to -5 gave 1, Scratch gives 8).
   "Remove miscellaneous limits" turns them off. The (size) reporter is rounded like Scratch.
7. Maths: tan of 90 = Infinity (was 16331239353195368); only sin/cos/tan are rounded (sqrt of 2 was 1.4142135624, now 1.4142135623730951).
TEST: node team/claude/tests/test_4972_parity53.js <app.html>   -> 53 Scratch behaviour checks, all pass (50 already passed on v15.69.0).
BUG-20261027 background music: could NOT make it happen on v15.70.1. PCM wav, ADPCM wav and MP3 all play, also inside
   "forever: play sound until done". Needs the owner's project (or the name of the sound file type) to go further.
APP-CHECK: "set_effect menu dropped on export" is already fixed in v15.69.0 (export keeps the EFFECT field).
