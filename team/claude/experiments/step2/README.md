# Step 2 experiment: scripts as fast code (not in the app yet, not on the PC)

Claude Fable, 26 Nov 2026, scheduled run of 07:18. Plan: `team/claude/TURBO-STYLE-PLAN.md`, step 2.
G-Warp's own code, written from the plan. Nothing copied from TurboWarp or Scratch.

## How to set it up (2 minutes)

```
cp -r /home/claude/rel /home/claude/x2 && rm -f /home/claude/x2/.git && cd /home/claude/x2
patch app.html < /home/claude/gwarp/team/claude/experiments/step2/app-step2-hooks.patch     # made against work/app.html v15.70.16
cp /home/claude/gwarp/team/claude/experiments/step2/gw-fast.js .
sed 's|<script src="gw-fast.js" onerror="this.remove()"></script>|<script>window.GW_FAST_ON=true</script>\n&|' app.html > app-fast.html
```
`app.html` = fast code OFF (must act exactly like the shipped build). `app-fast.html` = fast code ON. Every test tool takes the app path.
Run all checks: `sh /home/claude/gwt/F2.sh` (referee on 10 projects, t_par, game speed, bench). `node faststat.js x.sb3 app-fast.html` shows what was made.

## How it works

- `app.html` hooks (18 changed lines, all in the "v15.8.0 runner"): the old step loop became `ScriptThread.prototype.__gwLoop(start, now, floor)`
  (same code, it can also run "until the stack is back to `floor`"); `GW.__runner` hands out the runner's own helpers;
  `GW9.fastK` / `GW9.fastFN0` hand out the value helpers; a new script asks `GW_FAST.start(thread)` first.
- `gw-fast.js`: when a script starts, one JavaScript function that can pause (`function*`) is written for it, once, and kept until the code area changes.
  - **Stage 2.0, shape:** forever, repeat, repeat until, if, if else and My Block calls are real code. Every other block goes through the
    old block code (`R.runOne`, the go-between). Frames the old code puts on the stack (extension loops) are run by `__gwLoop` until gone.
  - **Stage 2.2:** variable and list blocks with a typed value skip the go-between and call the old fast paths (`GW.__fastVar`, `GW.__fastList`) directly.
  - **Stage 2.1, values:** a round-block tree in a slot becomes one JavaScript expression when all its pieces are plain
    (literal, variable, + - * / mod, < = >, and or not, join, round, maths functions, item of list, length of list, length, letter, My Block input).
    Used for: set / change variable with a round block as value, and the conditions of if / repeat until.
    Anything else stays with the old evaluator. A made piece is used only while its slot still holds the same tree (`rt.chk`).
- The pause rules are the old runner's rules line by line (end of a loop pass, wait, a block that made the script wait, 5000 blocks or 10 ms).

## Results (Claude's workspace, fast code ON against the shipped build o, measured in the same run; the machine's speed moves a lot, so ranges)

| Check | Build o (old way) | Fast code ON |
|---|---|---|
| Referee: mini 22/22, par 58/60, par2 40/40, probe 72/72, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 | same | same on 9; par3 fails one timing check in 2 of 11 runs (note below) |
| Same referee projects with the hooks in but fast code OFF (stop, par, par3, par4) and t_par | same | same |
| t_par 53/53, t_par2 28/28 | pass | pass |
| Owner's game, steps per second in 3D gameplay, 5 runs (Scratch 28 to 30) | 17.3 to 20.3 | **22.7 to 28.2** |
| Owner's game, script time per step (Scratch 9.6 to 11.2 ms) | 18.3 to 19.9 ms | **11.6 to 15.4 ms** |
| Bench: count loop / maths / lists / if / pen / text (s), 4 runs | 0.115 / 0.179 / 0.122 / 0.195 / 0.077 / 0.087 | 0.06 to 0.09 / 0.07 to 0.08 / 0.11 to 0.13 / 0.06 to 0.07 / 0.06 to 0.08 / 0.035 to 0.05 |
| Plain loop turns in 2 s (Scratch 3.3 to 4 million) | 0.86 million | 0.6 to 1.1 million |

Still slower than Scratch on the bench rows and far from TurboWarp. This is the first third of step 2.
Note on par3: with fast code ON it gave 157/159 in 9 runs and 156/159 in 2 runs (`q02: Scratch true, G-Warp false`). The old way gave 157 in
10 of 10 runs. So fast code has a timing fault: q02 = reset timer, repeat 10 [move 0 steps], timer > 0.2. Sometimes the 10 passes take under
0.2 s. This must be found first (PROGRESS.md, action 4 a3). Nothing of step 2 ships before par3 gives 157 in 10 of 10.

The patch also holds one fix that is not step 2: the Power lines sparks (`geo` / `pointAt`, see PROGRESS.md action 4d). In the game's profile
`getTotalLength` + `getPointAtLength` went from 0.63 s to 0.01 s of 8 s. It is active in both `app.html` and `app-fast.html` of the experiment.

Bigger test (`tools/gwt/bench40.sb3`, the one of OWNER-PRIORITY.md; seconds, lower is better; G-Warp columns measured 26 Nov 09:00 one after the other with `ref/bench.js`, one run each; Scratch and TurboWarp columns are the ones of OWNER-PRIORITY.md):

| Test | Scratch | TurboWarp | G-Warp build o | G-Warp experiment | Winner |
|---|---|---|---|---|---|
| Count loop | 1.033 | 0.005 | 2.529 | 1.874 | TurboWarp |
| Maths | 1.783 | 0.105 | 3.940 | 1.639 | TurboWarp |
| Lists | 1.101 | 0.035 | 4.099 | 3.014 | TurboWarp |
| If / compare | 1.659 | 0.010 | 5.288 | 2.075 | TurboWarp |
| Pen | 0.422 | 0.039 | 2.278 | 2.340 | TurboWarp |
| Text | 2.536 | 0.029 | 2.071 | 0.853 | TurboWarp |

The experiment is 1.3 to 2.5 times faster than build o on four rows and the same on pen. TurboWarp is still 15 to 370 times faster on every row.

Why the count loop is still slow: "change n by 1" has a TYPED value, so it still reads the typed box on the page on every pass (`GW.__fastVar`).
Next: typed values become constants in the made code, dropped when the user types (a counter that goes up on every `input` / `change` event in the code area; typing does not move `GW.__wsEpoch`).

## What the owner's game runs most (12 s of gameplay, counted)

Blocks: set variable 682,000; change variable 453,000; extension command (pen) 158,000; go to x y 120,000; add to list 11,000.
Values: variable 2.9 million; literal 1.3 million; + 448,000; * 424,000; < 417,000; item of list 335,000; = 226,000; maths function 226,000; > 213,000.

## Next, in this order

1. (done, stage 2.2) set / change variable and list blocks with a typed value go straight to the old fast paths (`rt.fv`, `rt.fl`).
2. Variables without the name search: `G9.scopedValue` walks the My Block frames, then sprite, then global, on every read (2.9 million reads).
   Resolve where a name lives when the function is made; My Block inputs become JavaScript locals.
3. List blocks (`GW.__fastList` rules), then go to x y / set x / change x (read the fence and pen wrappers of `step` first), then pen commands.
4. The values of go-between blocks: `syncProxies` writes every worked-out value into a hidden box on the page. Hand the values over directly.
5. One pass costs too much between pauses: `step` is wrapped 3 times (context sprite, fence, pen). Fold them into the driver.

## Known gaps before it may be turned on for anyone (all OFF today)

- Editing a script while it runs: a changed VALUE is seen at once (the made piece is dropped, the old way takes over for that script).
  A changed SHAPE (block added, moved, deleted) is only seen when the script starts again. The plan wants it at once: make the script again
  and carry the place over. Until then fast code must stay off while the editor is in use, or fall back on any change.
- Breakpoints and the step-by-step debugger: a script with a breakpoint anywhere starts the old way. One set while running is not seen.
- The glow on the running block: go-between blocks still glow (old code), real-code blocks do not report yet.
- "Run without screen refresh" guard, stop blocks inside My Blocks, extension loop blocks: use the old code paths; covered by referee par3 / par4 / stop.
- Compiles from the page pieces, not from the Project Book yet. Step 3 needs the Book (blocks leave the page). Do it when families are moved.

## 26 Nov 09:20-10:00, first session (lane A)

- **par3 timing fault found and fixed.** Real Scratch gives the other scripts their turn after the LAST pass of a repeat too (10 passes = 10 frames = 0.33 s; G-Warp did 9 frames = 0.30 s, old way and fast code alike). Fixed in both (`GW_REPEAT_LAST_YIELD = false` = old). Also the frame clock caught up after a late frame with up to 3 quick frames in a row; now at most half a frame (`GW_FRAME_CATCHUP`). Result: the 10-pass test gives 0.330 to 0.337 s in G-Warp, 0.330 in Scratch (`run_q2.js`).
- **Speed:** (a) a script that is the only one running and asked for no redraw keeps looping inside the made code instead of going back through the frame loop (`GW_FAST_SOLO`); (b) the clock is read every 64 loop passes, not every pass, and warp is checked before the clock in `rt.tick`; (c) set / change variable with a typed number: number and variable name are constants in the made code, dropped when anything is typed in the code area (`GW.__typeEp`, `GW_FAST_TYPED`). Plain counting loop in a warp My Block: about 80 ns per pass (was about 330).
- bench40 (one run, noisy machine): count loop 2.04 -> 0.82 s, maths about 1.2 to 1.4, text 0.63 to 0.86. TurboWarp still far ahead.
- Next: variable reads and writes without the name search (hasOwn + scopedValue are now the top of the profile), then lists, then pen / go to.
