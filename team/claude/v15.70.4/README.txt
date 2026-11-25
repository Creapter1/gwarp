v15.70.1 (Claude Fable, 25 Nov 2026) - built on release-v15.66.0 (v15.69.0). NOT on main, NOT yet on the release branch.
File: app-v15.69.0-to-v15.70.4.patch  (apply on the release branch: git apply <file>; undo: git apply -R <file>)

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

---- v15.70.2 (same day) ----
8. Animation: "Make skeleton for me" (Rig tools, top button). Builds the bones FROM the drawing: body = the shape touching the
   most shapes; each touching shape gets a bone jointed where it touches (head, left/right arm, left/right leg, hand, foot, hat),
   already attached, G-Spark names so Ready-made moves work. Stickman test: 6 bones, 6/6 shapes, Walk = 8 frames.
   Picture: auto-skeleton-stickman.png. Test project: team/claude/tests/stickman.sb3
9. Second parity batch (parity28.sb3): costumes by number/name, direction wrap, custom blocks + recursion, broadcast and wait,
   clones, repeat until, stop other scripts, timer: 26 of 28 pass.
   OPEN: fencing. "go to x: 1000 y: -1000" with a 60 px costume gives 257 / -197; Scratch gives about 253-255. Needs a real
   Scratch reference before changing (2-4 px).
OWNER'S PC: the desktop app got the same changes as v15.69.0a then v15.69.0b (owner rule: same number, new letter on the PC).
   Backups: resources\app\backup\before-v15690a-app.html and before-v15690b-app.html.
NOT on the release branch / PR 20 yet (owner tests on the PC first).

---- v15.70.3 (25 Nov, round 2: checked against the REAL Scratch engine, team/claude/tests/scratch-referee/) ----
Referee totals: par 58/60 (random glide), par2 40/40, probe 72/72, par3 157/159 (corner bounce < 2 px), mini 22/22.
Picture test pen.sb3 (pen lines, stamps, 7 effects): 0.21 % of pixels differ. See pen-effects-scratch-vs-gwarp.png (Scratch | G-Warp | difference).
10. Sequencer like Scratch: more passes inside one frame while no block has changed the screen (work time = 60 % of the frame,
    max 22 ms). Visual blocks set GW.__redraw (motion/looks of a SHOWN sprite, show/hide, say, wait, backdrop, pen). Kill switch
    window.GW_SEQ_LIKE_SCRATCH = false.  "repeat 100: change a by 1": was 100 frames, now 1.  spin.sb3 keeps 59 FPS in the editor.
    SPEED NOTE for round 3: "forever: change n by 1" for 3 s = G-Warp 409,000 loops, Scratch 5,520,000 (Scratch is 13x faster here).
11. Reporter answers are text, not variable names (GW.resolve, GW8.resolveInput); typed text too when GW.__sb3Project is true.
    OWNER DECISION LEFT OPEN: native G-Warp projects still treat typed text that equals a variable name as that variable.
12. Hats start front sprite first, Stage last (green flag, GW.broadcastThreads, GW.dispatchBroadcast) - hatOrder().
13. Bounce = Scratch's algorithm with GW.tightBounds (convex hull of visible pixels, 1 unit cells for vector costumes).
    Touching edge + extension getBounds use it too. Fencing keeps the costume box (that is what Scratch does).
14. distance to not rounded; point in direction text = 0; glide ends on target; pen sizes 1 and 3 offset by 0.5.
On the owner's PC as v15.69.0c (backup before-v15690c-app.html).

---- v15.70.4 (25 Nov, extra Scratch-exact batch; referee now also plays: presses space and clicks the stage in both engines) ----
par4.sb3 66/72 (left: timer hat missing, loudness, tick count, 1 px mouse = test harness sub-pixel). ratio.sb3: cnt/tick/cnt2 = 247/124/184 vs Scratch 245/123/184.
15. A wait block always yields, also "wait 0" (runner: return after a 'wait' block). Before: ratio.sb3 gave 123/123/91.
16. Threads started during a pass are stepped in that same pass (dynamic loop bound; __gwSF stops the same-frame section stepping them twice).
17. 'parameter' reporter: only the custom block's own frames; 0 when not found (was '' and fell back to a variable of the same name).
OPEN: event_whengreaterthan hat (timer / loudness) is not in G-Warp at all (no palette block, no import, no export);
      sensing_loudness answers ''; non-warp recursive custom blocks do not yield per call like Scratch.
On the owner's PC as v15.69.0d (backup before-v15690d-app.html).
