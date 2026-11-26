v15.70.1 (Claude Fable, 25 Nov 2026) - built on release-v15.66.0 (v15.69.0). NOT on main, NOT yet on the release branch.
File: app-v15.69.0-to-v15.70.12.patch  (apply on the release branch: git apply <file>; undo: git apply -R <file>)

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

v15.70.5 (Claude Fable, 25 Nov 2026, round 3 = speed) - on the owner's PC as v15.69.0e
Results unchanged (all referee projects give the same totals as v15.70.4), except one Scratch fix (6).
1. GW.__fastVar: "set / change [variable]" run in one step from runOne (before syncProxies). Falls back to the old path for anything unusual
   (menu from a reporter, no menu, slot mismatch). Switch: window.GW_FAST_VARS = false before load.
2. GW9.scopedValue / setScopedValue read the stores directly (custom-block locals -> sprite's own -> shared); the Proxy is no longer hit twice per read.
3. GW.__fastList: list add / delete / insert / replace in one step (values worked out in slot order, still stored as text like before). Switch: window.GW_FAST_LISTS = false.
4. fastFN gained timer, parameter, mouse_x, mouse_y, key_pressed, op_length, op_letter, op_mathop (same formulas as the older layers).
5. Small: if/loop bodies cached per code-area change (bodyOf), resolveInput's slot lookup cached, breakpoint check only when a breakpoint exists,
   cond()/slotNode use getAttribute, frame work time 75% of the step like Scratch (was 60%).
6. Scratch fix: set [v] to (reporter) stores the answer as it is ("05" from join stays text; it was turned into the number 5). join.sb3 19/19.
BENCH (tests/scratch-referee: mkbench.py -> bench.sb3, node bench.js bench.sb3 app.html), seconds, Scratch / v15.70.4 / v15.70.5:
  count loop .04/.32/.08   maths .06/.77/.14   lists .03/.60/.13   if-compare .045/.57/.17   pen .02/.07/.07   text .02/.30/.08
  plain loop turns in 2 s: 3.5M / 0.22M / 0.85M      300 clones frames in 3 s: 91 / 91 / 91
STILL SLOWER than Scratch (2-5x) and so than TurboWarp's compiler. Next steps that would pay most (profile: prof2.js):
  - every other command block still walks GW.extraBlock (6 layers) + executeBlock (9 wrappers), each reading b.dataset.type: use b.__gwT and a per-type route;
  - pen blocks and looks blocks have no one-step path; non-warp loops pay one full step() call per turn (3 wrappers around step);
  - a real compile step (blocks -> closures per script, rebuilt when GW.__wsEpoch changes) is the only way to pass TurboWarp. Not started.

v15.70.6 (Claude Fable, 25 Nov 2026, round 4 = editor helpers TurboWarp has) - on the owner's PC as v15.69.0f
All in the Addons module (More > App > Addons...), same pattern as the v15.10.0 addons. Nothing about running projects changed.
1. gotodef (default ON): block right-click menu gets "Go to definition" on call_custom blocks only; middle-click does the same (TurboWarp's shortcut).
   Finds the define block by data-proc / name, prefers the same sprite, switches sprite if needed, scrolls and flashes it.
2. mousepos (default OFF): "x: N  y: N" tag in the stage's bottom-left corner while the pointer is over the stage.
3. varman (default OFF): "Variables" button top-right of the code area -> panel with every variable and list ("For all sprites", "<sprite> only"),
   live values (300 ms), search, edit a value (stored as text), lists open as one item per line (edit up to 500 items). API: GW_VARMAN.open() / close().
4. The clone counter, mouse tag and variable manager are marked gwRunCritical: gw-run-throttle.js slows every other setInterval to once per 5 s
   while a project runs, which had made the clone counter useless. NOTE for other AIs: a helper that must stay live while running needs fn.gwRunCritical = true.
5. Test trap found: copies of app.html outside the repo folder load without gw-run-throttle.js / gw-perf.js (relative script files). Always test in /home/claude/rel.
NOT DONE: E2.5 custom stage size - 480x360 is hard-coded in ~90 places (mouse mapping, fencing, pen, bounds, export). Needs its own careful round.
picture: variable-manager.png

v15.70.7 (Claude Fable, 25 Nov 2026, round 5 = G-Warp-only tools) - on the owner's PC as v15.69.0g
The patch now covers THREE files: app.html, gw-svg360.js (1.2.0), gw-bigmap.js (1.2.0).
1. SVG 360: guess(meta, gap) - body = the shape touching most others; parts sticking out stay in the body plane (joined when turned),
   parts sitting on the body go in front / behind by drawing order. Used as the DEFAULT only when no layer has a name (a plain drawing);
   named layers (the mascot) keep the even spacing. Part names from position (head, left arm...). View presets, Guess / Even buttons, 3 steps, one-shape tip.
2. Big map: starts from the project's own drawn backdrops (2+ shapes) and wide costumes (>= 400 wide), back to front, speeds 0.2..1; note says what was used. 3 steps.
3. Spark Studio (Simple view): melody IDEAS +5 (hook, dark, synth, night, anthem); PART_IDEAS for bass (6) and backing (5) with a "Start from an idea" menu;
   BEATS +4 (trap, house, reggaeton, boombap). Data only, scale steps 0-7, so the Song maker still plays them in its own key and mood.
   NOT LISTENED TO (no ears here): the owner should say which sound wrong.
OPEN: Spark Studio preview is always the major scale (MAJOR in two modules) even when the song's mood is minor - the biggest reason it sounds "kid".
   Next step: a Mood menu (major / minor / minor pentatonic / dorian) for the preview that also sets the Song maker's mood. Needs the owner's ear; build it side by side.
pictures: svg360-stickman-before/after.png, bigmap-own-backdrop.png, spark-bass-ideas.png

v15.70.8 (Claude Fable, 25 Nov 2026, owner: "10 s or less waiting / loading, 30 FPS must be a real 30") - NOT ON THE PC YET (PC was offline at ship time)
MEASURED (tests/scratch-referee: mkbig.py 30 20 -> big.sb3 = 30 sprites, 600 scripts, 7,200 blocks, 150 variables; node load.js big.sb3):
  open until the blocks show: 34.4 s -> 7.5 s     until the app is calm again: 63.9 s -> about 10 s     app start: 2 s (unchanged)
  small project (par3, 268 blocks): 1 s, unchanged.   Pacing (node pace.js): plain loop 30.8 steps/s, 96% of steps on time.
WHAT WAS SLOW (node laps.js / prof_open.js / lay.js):
1. importSB3 "tidy" un-hid and measured the scripts of EVERY sprite: one huge first layout (11 s). Now other sprites' stacks are hidden from creation
   and tidied the first time they are shown (GW.__tidyLater, called from GW.showSpriteScripts). Same tidy code; sprite 0 identical.
2. Every reporter bubble with a menu (variables, lists) built ALL choices: 150 variables = 150 <option> in each of thousands of bubbles.
   select() now keeps only the current choice + the widest choice when the list is longer than 24 (exact same width), and fills the rest on
   pointerdown / keydown / focus. Kill switch: window.GW_LAZY_MENUS = false. Checked: width and value identical before / after filling.
3. GW8.same() stringified two multi-MB snapshots on every history push: now compares the code-area text first (same answer).
4. usedType() (extension dock, every 0.8 s) searched the whole code area once per extension block: now one Set per code-area change.
STILL OPEN for "everything faster than Scratch": helpers that poll the page (~100 setIntervals) still cost CPU on big projects while editing;
  the 4.6 s freeze during import itself (scripts 1 s, decorate 1.1 s, tidy 0.8 s, snapshot 0.5 s, file read) should become a progress bar or be chunked;
  script speed pass 2 (see v15.70.5 notes). A real big project from the owner is needed to measure the true numbers.

v15.70.9 (Claude Fable, 25 Nov 2026, round 6) - NOT ON THE PC YET (PC still offline; 4 tries)
The owner changed the order at 15:12: beat Scratch first (speed, loading, steady 30), PenguinMod later. So E2.9 (PenguinMod core blocks) was NOT done this round.
1. Power lines: visible() read the code area's size on EVERY animation frame while a project ran (forces a page layout each frame). Now reused for 0.5 s.
2. FULL REGRESSION of today's work on v15.70.9 - all the same as before:
   real Scratch: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, par3 157/159, par4 66/72 (open items unchanged and logged)
   app: parity 53/53 and 28/28, 0 page errors, smooth motion ok, auto skeleton on the stickman = body, head, left/right arm, left/right leg
   200 clones: 29-30 steps/s; pacing (pace.js): plain loop 31 steps/s, 94% on time; par3 85% on time
   bench: count .07 s, maths .13, lists .11, if .18, pen .11, text .09 (Scratch: .04 .05 .03 .04 .03 .02); plain loop 0.86 M vs 3.4 M
NEXT (to really beat Scratch on speed): compile each script once into JS closures (rebuilt when GW.__wsEpoch changes), keeping the same block functions.
   The interpreter is now ~0.8 us per block against Scratch's ~0.3; the rest is spread thin (DOM reads for menus/inputs, 2 evalNode wrappers per reporter, step() overhead).

v15.70.10 (Claude Fable, 25 Nov 2026 night) - on the owner's PC as v15.69.0i. Patch now covers 4 files (+ gw-run-throttle.js).
Tested with one of the owner's OWN big projects (private, NOT in this repo: 5,529 blocks, 456 costumes, 194 variables, pen 3D raycaster, all My Blocks warp)
side by side with real Scratch (tests/scratch-referee/fps.js: same fake player, steps per second + script ms per step).
RESULT (steps/s, Scratch = 30.4): story screens 17.7 -> 30.1; 3D gameplay 13 -> 24-26. Script time in gameplay 27 ms -> 15 ms per step (Scratch 6-7 ms).
1. SCRATCH BUG: "stop [this script]" inside a My Block ended the whole thread. Now it pops the call stack to the innermost 'custom' frame (runOne). stop.sb3 17/17.
2. LAYERS: .scratch-block.block-c-shape{filter:drop-shadow} made every C-block a compositing layer (1,047 layers, Layerize 30 ms per frame; tools: layers.js, trace.js).
   body.gw8-running .scratch-block.block-c-shape{filter:none}. The editor when stopped still has the layers: a non-filter shadow would fix scrolling/dragging too (look change -> owner decides).
3. FREEZES while running (longtasks.js): unsaved-check fingerprint on every key press (now only edits count); GW9.refreshAST on every pointerup, also on stage
   clicks (now skipped for clicks on the stage); undo snapshot scheduled by machine mutations (GW8.scheduleHistory now waits for Stop unless the code
   area was touched in the last 2 s; undo still flushes first); ~100 helpers waking together every 5 s (gw-run-throttle.js: shared 5 ms per 250 ms allowance;
   window.GW_HELPER_LOG = [] lists slow helpers with where they were made).
4. SPEED: GW.__menuValue(select) caches a block menu's value (select.value is O(options): 194 variables!), invalidated by change/input events, by a value
   setter hook on that element, and by the block cache rebuild on GW.__wsEpoch. Used by __fastVar and __fastList. Kill switch window.GW_MENU_CACHE = false.
   Extension blocks (pen): argEls(b) caches the input elements per block; extOf cached. Power lines: 4 Hz under load (GW.__stepMs > 10), one "fired" per block per frame.
5. Stage size note hidden while running (it covered the project's bottom-right corner on hover).
STILL OPEN: 3D gameplay scripts 15 ms vs Scratch 6 ms -> compile scripts to closures. Start-of-run hitch: refreshAST on the flag click (0.25 s) + one big repaint.
   Helpers over 30 ms on a big project (GW_HELPER_LOG): app.html ~22811 refreshMenus (54 ms), ~28657, ~28540, ~9731 (33 ms each), ~27980.

v15.70.11 (Claude Fable, 25 Nov 2026 late night) - on the owner's PC as v15.69.0j. Patch covers 5 files (+ gw-perf.js).
The owner's "Breaking G-Warp" episodes 2 + 3: full list with status in team/bugs/BREAKING-GWARP-EP2-EP3.md (16 fixed, the rest open).
Code notes:
- renderVarChips: clones one lean template (menu emptied) instead of the template with every variable in its menu (O(n^2) -> O(n)).
- mapFor (paint editor): remembered mapping for grown bitmaps (c.__gwBmp), empty costumes (<= 4 units) at k = 1, Stage backdrops use the whole 512x384 area.
- saveBitmap: saved box = old box + painted pixels outside it; rc shifts so the sprite stays put.
- gw-perf.js fixNames: no value rewrite on 'input'; validation on change / focusout; original name restored on refusal; trim.
- old Ctrl+S (GW.saveProject .gwarp.json) steps aside when window.GW_FILE_SHORTCUTS is set by the File menu module.
- nInf (NaN -> 0, Infinity kept) for set/change x, y, go to, set/change size; fence(): huge / infinite positions fenced from the box measured at the centre.
- log: Math.log(x) / Math.LN10 (Scratch's formula) in both evaluators.
- Spark Studio 3: gw-spark3-work is moved to gw-spark3-last at start (studio opens empty); #sp3Last button + GW_SPARK3.lastSession() restore it.

v15.70.12 (Claude Fable, 26 Nov 2026) - EMERGENCY memory fix. Owner's PC: v15.69.0k. WEB (main) STILL v15.69.0 - files ready in web-ready/.
Owner's report: on the web a big project uses all the RAM and kills Chrome / the PC. Reproduced with the live main build (tests: mem.js).
  tab memory after opening the owner's 5,500-block project: main 3,583 MB and 3.4 M page nodes -> v15.70.12 about 1,200 MB, flat while playing.
  undo step: 80 MB -> 6 MB.
Causes + fixes:
1. GW8.snapshot stored s.ast = GW9.captureAST() (44 MB) in every undo step; nothing reads it. Removed.
2. GW9.refreshAST() rebuilt that tree on every pointerup. window.GW_AST is now a lazy getter; refreshAST only drops the cache.
3. Undo history limited by size: at most window.GW_UNDO_CHARS (default 60 million) characters of workspace text, never fewer than 2 steps.
4. fillSel wrote data-gw9-opts with every name joined on every menu: now a short fingerprint for lists longer than 12.
5. (from v15.70.8) reporter bubbles no longer carry the full variable list.
NEXT for memory: the 800 set / change variable .block-select menus still hold all 194 options (175,000 <option>, each with hidden inner nodes).
  A thin version (current + widest option, filled on pointerdown / when .options is read, value-setter hook, data-gw-thin marker for restored
  or cloned blocks) is designed in PLAN but NOT built: many places read sel.options (rename, the searchable drop-down, import), so it needs its own careful round.
