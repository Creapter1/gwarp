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
| Referee: mini 22/22, par 58/60, par2 40/40, probe 72/72, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 | same | **same on all 10** (see the note on par3) |
| Same referee projects with the hooks in but fast code OFF (stop, par, par3, par4) and t_par | same | same |
| t_par 53/53, t_par2 28/28 | pass | pass |
| Owner's game, steps per second in 3D gameplay, 5 runs (Scratch 28 to 30) | 17.3 to 20.3 | **22.7 to 28.2** |
| Owner's game, script time per step (Scratch 9.6 to 11.2 ms) | 18.3 to 19.9 ms | **11.6 to 15.4 ms** |
| Bench: count loop / maths / lists / if / pen / text (s), 4 runs | 0.115 / 0.179 / 0.122 / 0.195 / 0.077 / 0.087 | 0.06 to 0.09 / 0.07 to 0.08 / 0.11 to 0.13 / 0.06 to 0.07 / 0.06 to 0.08 / 0.035 to 0.05 |
| Plain loop turns in 2 s (Scratch 3.3 to 4 million) | 0.86 million | 0.6 to 1.1 million |

Still slower than Scratch on the bench rows and far from TurboWarp. This is the first third of step 2.
Note on par3: with fast code ON it gave 157/159 in 9 runs and 156/159 in 2 runs (`q02: Scratch true, G-Warp false`). The old way was run
4 times in this run (always 157), which is too few to say it never does it. Before anything ships, run par3 ten times each way and find it.

The patch also holds one fix that is not step 2: the Power lines sparks (`geo` / `pointAt`, see PROGRESS.md action 4d). In the game's profile
`getTotalLength` + `getPointAtLength` went from 0.63 s to 0.01 s of 8 s. It is active in both `app.html` and `app-fast.html` of the experiment.

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
