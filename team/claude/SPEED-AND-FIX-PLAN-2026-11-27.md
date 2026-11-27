# G-Warp: crash report, fix list and SPEED RECODE plan (Claude Opus, 27 Nov 2026)

Owner goal: **beat TurboWarp.** Build tested: **v15.70.18** (main, 26 Nov). Work only on `ai-team` (rule zero). Only Claude Opus edits `app.html` (team rule 2).
Evidence: the owner's "Breaking G-Warp" episodes 1-4 (artifacts) + the test files in `team/claude/bench/`.
**This plan feeds the speed work already running:** `team/claude/TURBO-STYLE-PLAN.md`, `OWNER-PRIORITY.md`, `VS-TURBOWARP.md`, `lanes/LANES.md`. Same rules: own code only, TurboWarp as a closed box. Add these items to those lanes; don't start a second, competing plan.

## 0. Honest target
- G-Warp and TurboWarp both turn scripts into JavaScript, so the limit is the browser's JavaScript speed. **100x faster than TurboWarp on script work is not possible**; nobody can run the same JavaScript 100x faster.
- Real targets, in order: **M1** match TurboWarp on script-heavy projects (CPUMark-style, 3D math). **M2** beat TurboWarp where G-Warp controls more: pen, many clones, drawing, load time, UI while running. **M3** beat it on the owner's games and on GTA ONLINE (scratch.mit.edu/projects/1441910261, a TurboWarp-made 3D game).
- Every claim needs the fair test (section 4). A "pass" with Turbo on, at 60 FPS, or from one run does not count.

## 1. Where we are (Turbo OFF, 30 FPS, median of 3, Claude's test machine)
| Test | v15.70.18 | v15.69.0 | Real Scratch 3 |
|---|---|---|---|
| 3D sphere, math only (renders/s) | **221** | 4.5 | 102 |
| 3D sphere + pen (renders/s) | **11.8** | 2.7 | 8.4 |
| GTA ONLINE title screen (FPS) | 2.4 | crashed 3/3 | 2.8 |
| GTA ONLINE later in the run (FPS) | 5.3 | crashed 3/3 | 5.3 |

TurboWarp: see `VS-TURBOWARP.md` Table 1 (v15.70.14, before fast code): plain loop turns in 2 s TurboWarp 18.4 million vs G-Warp 1.1 million; the owner's 3D game script time per step TurboWarp 0.5 ms vs G-Warp 16 ms. **Re-run that table on v15.70.18 and add the two 3D tests and GTA ONLINE as new rows** (packager method in `tools/tw/`, plus TurboWarp Desktop on the owner's PC; he has it installed).

Profile of v15.70.18 on GTA (self time): `(generated fast code)` 9%, **variable lookups `rt.vh` + `G9.varHome` 14%**, **DOM reads in the running engine (`querySelectorAll`, `querySelector`, `getAttribute`) 8%**, My Block calls (`callCustom`, `callInfo`) 5%, extension go-between (`makeUtil`, `runExtCommand`, `rt.pre`) 6%, pen `flush` 2%.
Profile on the pen 3D test: extension go-between (`makeUtil` + garbage collector) 16%, `GW.extraBlock` wrappers 10%, pen `seg`/`flush` 12%, `GW.spriteBounds` on every move 3.5%.

## 2. Crash and fix list (do these first, smallest first inside each group)
### P0: crash / lost work
1. **2,500+ variables freeze the app ~2 min, then the tab crashes; the open project is lost.** 1,000 vars = 3.4 s, 1,600 = 8.9 s (grows like count²). Cause: the palette copies a template block per variable chip and each copy carries a menu of all variables (app.html ~line 14685). Fix: build chips lazily/virtually; share one menu list.
2. Keep v15.69's GTA crash fixed: add GTA (owner downloads it, do not commit it) to the regression run.
### P1: wrong results (Scratch parity)
3. **tan 90 = 16331239353195368** (Scratch: Infinity; tan 270 = -Infinity) and **every math answer rounded to 10 decimals** (sqrt 2 = 1.4142135624; Scratch 1.4142135623730951). Only sin/cos (and tan) are rounded in Scratch. `log 1000` = 3 vs Scratch 2.9999999999999996 (owner's call). One line: app.html 12078.
4. **Painted new sprite shows as one pixel** (new sprite starts 2x2, after painting 384x384 but its resolution value becomes 384). Same cause likely: **bitmap costumes can't grow** (paint outside the old size is cut off on the stage).
5. **Backdrops are zoomed 1.33x on the stage** (only the middle 75% shows).
6. x / y / direction / size boxes under the stage don't update while a script runs or after Stop.
7. **Ctrl+S saves two files** (.gwarp.json + .sb3): old listener app.html 4259 (`GW.saveProject`) still runs beside the new one at 16871. Remove the old one.
8. Rename sprite: select all + delete + type "Bob" gives "G-SparkBob" (old name comes back when the box is empty).
9. `set size to 1e999` gives 1% (Scratch: max size).
10. Undo after dragging a 200-deep OR tower out of an if only nudges it.
### P2: things players can't find or that confuse
11. **Load from the web… is hidden** (in a group shown in neither the G menu nor More). Put it in the G menu under Load from your computer.
12. Extensions button covers My Blocks/Stage/Variables on 1366x768 and smaller; extension categories need two clicks after adding; no way to remove an extension.
13. Variable monitors fall off the bottom of the stage (one column); dropping a script on the stage hides it under the stage panel; Clean Up puts a 2,000-block script 31,854 px to the right.
14. New project dialog points to "More > More file options > Restore" (does not exist; it's in the G menu). "New window" and "Host on Wi-Fi" do nothing on the web version (say "desktop app only").
15. Small: stuck tooltips, round G button covers a sprite tile, number boxes don't widen ("1000(" for 10000000000), folder kept inside the sprite name ("Zed//G-Spark").

## 3. SPEED RECODE (G-Warp's own code; do not copy TurboWarp or Scratch code)
Do one step at a time. After each step: fair test + parity gate (section 4). Keep the old runner as the fallback until a step passes.
- **R1. Pen batching fix (ready, measured).** `Pen.ctx()` calls the wrapped `getContext`, which flushes the waiting lines, so the batch never holds more than one line; pen-down dots and lines are also different batches. Fix tested on a copy: `ctx()` returns `c.__gwCtx` without flushing; one batch for dots and lines (stroke lines, then fill dots); `stamp()` calls `this.flush()` first. One run was 15.6 → 21 renders/s (+34%), the repeat was too noisy to confirm. Anti-aliased edges differ on ~2% of pen pixels where lines cross.
- **R2. No DOM while running.** Build a plain block tree (opcode, inputs, fields, next, parent ids) once when a project loads or a script changes. The runner and fast code read only that tree, never `dataset`, `querySelector` or `getAttribute`. (8% on GTA, more in big projects.)
- **R3. Variables as direct references.** When a script is compiled, look up each variable once and keep the variable object (per target: sprite, clone, stage). Rebuild on rename/delete/new clone. (14% on GTA.)
- **R4. Blocks as real code.** Move block families out of the `R.runOne` go-between into generated JavaScript, in this order: operators + data (math, compare, join, lists), motion + looks, sensing, control (wait, clones, broadcasts), pen. Use Scratch's casting rules exactly (the exam fixtures check them).
- **R5. My Blocks as functions.** Compile each My Block to one function with its inputs as parameters; "run without screen refresh" = no pauses except the 500 ms safety; recursion allowed.
- **R6. Fast path for built-in extension blocks.** Pen down/up etc. called directly; no `makeUtil` per call (reuse one helper object per thread+block if a util is needed).
- **R7. Cheaper moves.** Cache the fence bounds per costume/size/rotation instead of `GW.spriteBounds` on every move.
- **R8. Drawing.** Redraw only when something changed; GPU (WebGL) sprite and pen layers for many clones; measure clone-heavy and pen-heavy tests before/after.
- **R9. Load time.** GTA (3.8 MB, 144 files) loads in 6.5 s from the web; profile file decoding and do it in parallel.

## 4. Fair test (the only results that count)
- Turbo Mode **off**, checked in every run (`Engine.isTurbo === false`); project at 30 FPS like Scratch (`GW_SETTINGS.stepMs()` = 33.3); TurboWarp also turbo off, 30 FPS; same machine.
- Warm up, then 3 runs, report the median and all runs. Also one Turbo ON run as a reference only.
- Tests: `bench/3d_math.sb3`, `bench/3d_pen.sb3` (made by `bench/mk4.py`), GTA ONLINE (owner's download), the owner's 5 private test projects (gwarp-test-projects repo), TurboWarp CPUMark (turbowarp.org/1119901618).
- **Parity gate (must stay 100% or the step is rejected):** `bench/exam.sb3` (53 Scratch rule checks, `exam_expected.json`) + `bench/exam2.sb3` (5 long-decimal checks, after fix 3), the catch-the-stars game (`bench/game.sb3`: 7 checks), 10-minute marathon (`bench/marathon.sb3`: FPS steady, memory flat), Stop latency < 100 ms, save/reopen identical.
- Scripts: `bench/h.js` (Playwright helper), `bench/fair.js`, `bench/gta.js`, `bench/exam.js`. Paths inside are from Claude's workspace (`/tmp/...`, `/home/claude/...`): change them to yours.

## 5. Order of work
1. Re-run `VS-TURBOWARP.md` on v15.70.18 with the new rows (section 1).
2. P0 item 1, then P1 items 3, 7, 4-5, then R1.
3. R2 → R3 → R4 (operators/data first) → R5 → R6/R7 → R8 → R9, re-measuring after each.
4. P2 items when a step needs a rest.

## 6. Big projects: 2 GB today, 10 GB goal (owner, 27 Nov)
Owner: people rarely go past 2 GB, but G-Warp should run **at least 10 GB** fast. Almost all of a big project is pictures and sounds, so the rule is **never hold the whole project in memory**.
- **Limits to design around:** a browser tab gets only a few GB of JavaScript memory, so the **web version** stays at about 1-2 GB. The **desktop app** can go far past that if files are read from disk when needed. A zip over 4 GB needs ZIP64, which Scratch and TurboWarp can't open, so above that G-Warp saves its own format (a project folder or a ZIP64 .sb3 with a warning) and keeps "export as .sb3" for projects that fit.
- **B1. Read the .sb3 without unpacking it all:** read the zip's table of contents first, then pull single files out when they are needed (desktop: main process streams from disk).
- **B2. Lazy pictures and sounds:** decode a costume the first time it is shown, a sound the first time it plays; keep them in a cache with a memory budget (e.g. 1.5 GB, setting) and drop the least-recently used ones, GPU textures included.
- **B3. Blocks stay small:** the project-as-data "Book" (step 1) holds the scripts; only the open sprite's blocks are on the page (already the owner's 26 Nov decision).
- **B4. Saving:** write changed files only, streaming to disk, never one giant in-memory zip.
- **B5. Test files:** generate 2 GB, 5 GB and 10 GB projects (mostly big costumes and long sounds) with a script; measure open time, memory, FPS, save time and Stop. Goal: opens in under 10 s, memory under the budget, normal FPS.
