# G-Warp against TurboWarp (and real Scratch)

Same projects, same machine (Claude's cloud workspace, headless Chrome, software graphics), one after another. Numbers move a little from run to run.
TurboWarp is used as a closed box: the project is packaged with TurboWarp's own official packager (3.14.0, default settings: compiler on, 30 FPS) and run. No TurboWarp code is read or copied.
Tools: `team/claude/tools/tw/` (`twbench.js`, `twgame.js`), `team/claude/tools/ref/fps.js`.

## Table 1 - 26 Nov 2026, G-Warp build m (v15.70.14)

### Script speed, bench project (seconds, lower is better)

| Test | Scratch | TurboWarp | G-Warp | Winner |
|---|---|---|---|---|
| Count loop | 0.049 | 0.001 | 0.115 | TurboWarp |
| Maths | 0.057 | 0.004 | 0.179 | TurboWarp |
| Lists | 0.023 | 0.004 | 0.122 | TurboWarp |
| If / compare | 0.036 | 0.003 | 0.195 | TurboWarp |
| Pen | 0.015 | 0.014 | 0.077 | TurboWarp |
| Text | 0.013 | 0.003 | 0.087 | TurboWarp |
| Plain loop turns in 2 s (higher is better) | 4.4 million | 18.4 million | 1.1 million | TurboWarp |
| Clone frames in 3 s | 91 | 92 | 91 | same |

### The owner's game, 3D gameplay

| Measure | Scratch | TurboWarp | G-Warp | Winner |
|---|---|---|---|---|
| Steps per second (30 is full speed) | 30.3 | 29.8 | 21.3 | TurboWarp |
| Script time per step | 8.3 ms | 0.5 ms | 16 ms | TurboWarp |
| Time to open | not measured | 2.3 s (player only) | 2.8 s blocks shown, 3.7 s calm (full editor) | not the same thing |
| Tab memory | not measured | 571 MB (player only) | 766 MB (full editor) | not the same thing |

### Editor (load in the editor, memory in the editor, lag when dragging a big stack)

Not measured for TurboWarp yet. Building TurboWarp's editor in the workspace was not allowed, and its website cannot be reached from here.
G-Warp alone: picking up a big stack 146 ms, no stutter while moving, 766 MB with the owner's game open.
Way forward: measure TurboWarp Desktop on the owner's PC next to G-Warp (needs him to have it installed and say yes), or his OK for another way.

## What the table says

- G-Warp loses every script-speed row today, by 10 to 100 times on plain loops. This is exactly what step 2 of the plan (scripts become fast code) is for. Nothing before step 2 can close it.
- The fair goal for step 2: match TurboWarp's rows on this table, then keep the lead G-Warp can have that TurboWarp does not (live editing while running).
- The "open" and "memory" rows compare a player with a full editor. They become fair once the editor rows are measured.

## Update - 26 Nov 2026, 06:00, G-Warp build n (v15.70.15)

Build n changes only Undo / Redo (plan step 1b, part a). Script speed is not touched, so the TurboWarp rows were not run again this time. G-Warp still loses every speed row of Table 1.

| Measure (owner's game, G-Warp only) | Build m | Build n |
|---|---|---|
| Steps per second in 3D gameplay, same run, same machine (real Scratch: 29) | 19.2 | 19.3 |
| Script time per step (real Scratch: 10.4 ms in this run) | 16.9 ms | 17.5 ms |
| Tab memory with the game open | 766 MB | 698 MB |
| Text kept per undo step | 3,902 KB | about 5 KB |
| One Undo | 1.4 to 2.0 s | 0.13 to 0.3 s |

The machine was slower in this run than in Table 1 (Scratch itself went from 8.3 to 10.4 ms per step), so 19 against 21 steps per second is the machine, not the build: m and n were measured one after the other and are the same.
TurboWarp's editor (undo time, memory, drag lag) is still not measured: see NEEDS-OWNER-OK.md, line 0.

## Update - 26 Nov 2026, 08:30, G-Warp build o (v15.70.16) and the step 2 experiment

Build o changes only Save (plan step 1b, part b). Script speed is not touched. TurboWarp was not run again in this run: its rows are the ones of Table 1.

| Measure (owner's game, G-Warp only) | Build n | Build o |
|---|---|---|
| Saved project file | 47.3 MB | 30.8 MB |
| Making the save data | about 0.42 s | about 0.25 s |
| Steps per second in 3D gameplay, same run (real Scratch: 28.6) | 18.2 | 18.9 |
| Tab memory with the game open | 698 MB | 698 MB |

Step 2 experiment (scripts as fast code, first third, NOT in the app yet; details in `experiments/step2/README.md`). Same machine, same run, several runs each; the machine's speed moves, so ranges:

| Test | Scratch | TurboWarp (Table 1) | G-Warp build o | G-Warp experiment | Winner |
|---|---|---|---|---|---|
| Count loop (s) | 0.036 to 0.056 | 0.001 | 0.115 | 0.06 to 0.09 | TurboWarp |
| Maths (s) | 0.049 to 0.08 | 0.004 | 0.179 | 0.07 to 0.08 | TurboWarp |
| Lists (s) | 0.024 to 0.028 | 0.004 | 0.122 | 0.11 to 0.13 | TurboWarp |
| If / compare (s) | 0.037 to 0.051 | 0.003 | 0.195 | 0.06 to 0.07 | TurboWarp |
| Pen (s) | 0.017 to 0.026 | 0.014 | 0.077 | 0.06 to 0.08 | TurboWarp |
| Text (s) | 0.012 to 0.014 | 0.003 | 0.087 | 0.035 to 0.05 | TurboWarp |
| Plain loop turns in 2 s | 3.3 to 3.9 million | 18.4 million | 0.86 million | 0.6 to 1.1 million | TurboWarp |
| Owner's game, steps per second | 27.9 to 29.6 | 29.8 | 17.3 to 20.3 | 22.7 to 28.2 | TurboWarp |
| Owner's game, script time per step | 9.6 to 11.2 ms | 0.5 ms | 18.3 to 19.9 ms | 11.6 to 15.4 ms | TurboWarp |

G-Warp still loses every speed row, also with the experiment. The experiment gives the same answers as the old way on 9 of the 10 referee projects.
On par3 one timing check fails in 2 of 11 runs (the old way: 0 of 10). That fault must be found before the experiment goes into the app.
Editor rows for TurboWarp (load, memory, drag lag) are still not measured: NEEDS-OWNER-OK.md, line 0.

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

## Table 2 - 26 Nov 2026 10:30, G-Warp build p (v15.70.17, fast code on). bench40, seconds (2 runs for G-Warp)

| Test | Scratch | TurboWarp | G-Warp build n | G-Warp build p |
|---|---|---|---|---|
| Count loop | 1.033 | 0.005 | 2.376 | 0.17 to 0.32 |
| Maths | 1.783 | 0.105 | 3.824 | 0.65 to 0.77 |
| Lists | 1.101 | 0.035 | 3.767 | 2.06 to 2.26 |
| If / compare | 1.659 | 0.010 | 5.768 | 0.62 to 0.67 |
| Pen | 0.422 | 0.039 | 2.449 | 2.12 to 2.73 |
| Text | 2.536 | 0.029 | 1.969 | 0.23 to 0.32 |

G-Warp now beats real Scratch on 4 rows. TurboWarp still wins every row. Owner's game: 24.8 steps/s (Scratch 29.3), script 11.9 ms per step (Scratch 10.2).
### 26 Nov 2026 ~15:00 UTC, lane C, build in work/ just BEFORE lane A pushed build p (v15.70.17), bench.sb3, seconds (lower is better)

Scratch and G-Warp: `ref/bench.js`, 2 runs + the run inside `tw/twbench.js`; TurboWarp: `twbench.js`, 1 run. Same machine, one after the other.

| Test | Scratch | TurboWarp | G-Warp | Winner |
|---|---|---|---|---|
| Count loop | 0.065 | 0.000 | 0.098 | TurboWarp |
| Maths | 0.096 | 0.005 | 0.154 | TurboWarp |
| Lists | 0.026 to 0.048 | 0.003 | 0.108 to 0.165 | TurboWarp |
| If / compare | 0.038 to 0.071 | 0.002 | 0.163 to 0.231 | TurboWarp |
| Pen | 0.015 to 0.019 | 0.012 | 0.054 to 0.063 | TurboWarp |
| Text | 0.012 to 0.013 | 0.004 | 0.056 to 0.089 | TurboWarp |
| Plain loop turns in 2 s | 3.1 to 4.1 million | 15.0 to 16.1 million | 0.86 to 1.02 million | TurboWarp |
| Clone frames in 3 s | 91 | 87 to 92 | 90 | tie |

G-Warp is 2 to 7 times slower than Scratch and loses every row to TurboWarp. Owner's game rows not measured (game not available to lane C).

### 26 Nov 2026 ~15:40 UTC, lane C, G-Warp build p (v15.70.17), bench.sb3, seconds (lower is better)

Scratch and G-Warp: `ref/bench.js`, 2 quiet runs + 2 runs inside `tw/twbench.js`; TurboWarp: `twbench.js`, 2 runs. The twbench runs ran while other tests used the machine, so they are slower (mostly the clone row).

| Test | Scratch | TurboWarp | G-Warp build p | Winner |
|---|---|---|---|---|
| Count loop | 0.041 to 0.18 | 0.000 to 0.001 | 0.025 to 0.035 | TurboWarp |
| Maths | 0.058 to 0.24 | 0.008 to 0.009 | 0.05 to 0.127 | TurboWarp |
| Lists | 0.033 to 0.117 | 0.007 to 0.012 | 0.091 to 0.148 | TurboWarp |
| If / compare | 0.046 to 0.116 | 0.001 to 0.003 | 0.017 to 0.040 | TurboWarp |
| Pen | 0.020 to 0.029 | 0.014 to 0.020 | 0.048 to 0.092 | TurboWarp |
| Text | 0.014 to 0.025 | 0.006 to 0.010 | 0.020 to 0.049 | TurboWarp |
| Plain loop turns in 2 s | 1.8 to 3.2 million | 8.8 to 10.4 million | 0.66 to 1.38 million | TurboWarp |
| Clone frames in 3 s | 86 to 91 | 44 to 50 (busy machine) | 66 to 85 | Scratch |

Build p now beats real Scratch on count loop and if/compare, about even on maths; still slower than Scratch on lists, pen, text and plain loops. TurboWarp wins every speed row. Owner's game rows not measured (game not available to lane C).

### 26 Nov 2026 ~17:30 UTC, lane C, G-Warp build p (v15.70.17) re-measured, bench.sb3, seconds (lower is better)

Scratch and G-Warp: `ref/bench.js` 2 runs + 2 runs inside `tw/twbench.js`; TurboWarp: `twbench.js` 2 runs. First twbench run had other tests on the machine.

| Test | Scratch | TurboWarp | G-Warp build p | Winner |
|---|---|---|---|---|
| Count loop | 0.037 to 0.070 | 0.001 | 0.021 to 0.047 | TurboWarp |
| Maths | 0.053 to 0.154 | 0.004 to 0.005 | 0.045 to 0.171 | TurboWarp |
| Lists | 0.024 to 0.051 | 0.004 to 0.007 | 0.069 to 0.203 | TurboWarp |
| If / compare | 0.038 to 0.114 | 0.002 to 0.003 | 0.017 to 0.050 | TurboWarp |
| Pen | 0.017 to 0.024 | 0.012 to 0.019 | 0.041 to 0.073 | TurboWarp |
| Text | 0.012 to 0.016 | 0.002 to 0.004 | 0.014 to 0.096 | TurboWarp |
| Plain loop turns in 2 s | 1.95 to 4.6 million | 10.7 to 15.5 million | 0.62 to 2.0 million | TurboWarp |
| Clone frames in 3 s | 91 | 76 to 91 | 69 to 89 | tie (quiet machine) |

Same build as the 15:40 row, so no change expected; numbers agree. TurboWarp wins every speed row; G-Warp beats Scratch on count loop and if/compare, about even on maths and text, 2 to 3 times slower on lists, pen and plain loops. Owner's game rows not measured.

### 2026-11-26 ~19:40 UTC, build p again (bench.sb3, one run each, same machine)

| Test | Scratch | TurboWarp | G-Warp build p | Winner |
|---|---|---|---|---|
| Count loop | 0.057 | 0.001 | 0.026 | TurboWarp |
| Maths | 0.059 | 0.005 | 0.070 | TurboWarp |
| Lists | 0.033 | 0.003 | 0.102 to 0.107 | TurboWarp |
| If / compare | 0.049 to 0.051 | 0.001 | 0.020 to 0.021 | TurboWarp |
| Pen | 0.021 to 0.022 | 0.013 | 0.051 to 0.053 | TurboWarp |
| Text | 0.016 to 0.017 | 0.002 | 0.020 to 0.025 | TurboWarp |
| Plain loop turns in 2 s | 2.9 to 3.2 million | 13.0 million | 1.39 to 1.45 million | TurboWarp |
| Clone frames in 3 s | 91 | 80 | 84 to 85 | Scratch |

Same build, numbers inside the earlier ranges. TurboWarp still wins every row. Owner's game rows not measured.

### 2026-11-26 ~21:40 UTC, build p again (bench.sb3, quiet machine after tests; Scratch/G-Warp from ref/bench.js, TurboWarp from tw/twbench.js)

| Test | Scratch | TurboWarp | G-Warp build p | Winner |
|---|---|---|---|---|
| Count loop | 0.045 to 0.046 | 0.001 | 0.029 to 0.039 | TurboWarp |
| Maths | 0.070 to 0.072 | 0.005 | 0.074 to 0.081 | TurboWarp |
| Lists | 0.037 to 0.040 | 0.003 | 0.107 to 0.116 | TurboWarp |
| If / compare | 0.054 to 0.055 | 0.002 | 0.020 to 0.028 | TurboWarp |
| Pen | 0.022 to 0.035 | 0.011 | 0.055 to 0.064 | TurboWarp |
| Text | 0.017 to 0.032 | 0.002 | 0.026 to 0.045 | TurboWarp |
| Plain loop turns in 2 s | 2.7 to 3.2 million | 13.3 million | 1.33 to 1.39 million | TurboWarp |
| Clone frames in 3 s | 91 | 84 | 87 | Scratch |

Same build, numbers inside earlier ranges. TurboWarp wins every speed row. A run under load (tests in parallel) gave G-Warp pen 0.147 and loops 0.36 million: discard. Owner's game rows not measured.

## Table 3 - 26 Nov 2026 19:40, G-Warp build q (v15.70.18). bench40, seconds, 2 runs

| Test | Scratch | TurboWarp | G-Warp build p | G-Warp build q |
|---|---|---|---|---|
| Count loop | 1.033 | 0.005 | 0.17 to 0.32 | 0.13 to 0.24 |
| Maths | 1.783 | 0.105 | 0.65 to 0.77 | 0.33 to 0.36 |
| Lists | 1.101 | 0.035 | 2.06 to 2.26 | 0.65 to 0.72 |
| If / compare | 1.659 | 0.010 | 0.62 to 0.67 | 0.26 to 0.27 |
| Pen | 0.422 | 0.039 | 2.12 to 2.73 | 1.63 to 1.78 |
| Text | 2.536 | 0.029 | 0.23 to 0.32 | 0.12 |

Game: G-Warp 27.0 steps/s, 9.2 ms script per step; Scratch 29.8, 10.5 ms. TurboWarp still wins every row.
### 2026-11-26 ~23:50 UTC, build p again (bench.sb3, quiet machine after tests; two runs of tw/twbench.js, all three engines in the same run)

| Test | Scratch | TurboWarp | G-Warp build p | Winner |
|---|---|---|---|---|
| Count loop | 0.041 to 0.043 | 0.001 | 0.020 to 0.027 | TurboWarp |
| Maths | 0.056 to 0.059 | 0.004 to 0.005 | 0.045 to 0.064 | TurboWarp |
| Lists | 0.026 to 0.030 | 0.003 to 0.008 | 0.081 to 0.083 | TurboWarp |
| If / compare | 0.042 to 0.049 | 0.001 to 0.002 | 0.019 to 0.022 | TurboWarp |
| Pen | 0.019 | 0.009 | 0.046 to 0.047 | TurboWarp |
| Text | 0.014 | 0.003 | 0.013 to 0.018 | TurboWarp |
| Plain loop turns in 2 s | 3.7 to 3.8 million | 15.5 to 16.7 million | 1.55 to 1.70 million | TurboWarp |
| Clone frames in 3 s | 91 | 90 to 91 | 90 | tie |

Same build, numbers inside earlier ranges (this machine was a bit faster). TurboWarp wins every speed row; G-Warp is still slower than Scratch on lists, pen and plain loops. Owner's game rows not measured.

### 27 Nov 2026 ~02:00 UTC, lane C, build q (v15.70.18), bench.sb3, twbench.js twice (seconds per test, lower is better)

| Test | Scratch | TurboWarp | G-Warp build q | Winner |
|---|---|---|---|---|
| Count loop | 0.039 to 0.042 | 0.000 | 0.015 to 0.024 | TurboWarp |
| Maths | 0.054 to 0.071 | 0.005 to 0.006 | 0.032 | TurboWarp |
| Lists | 0.025 to 0.038 | 0.003 to 0.006 | 0.029 to 0.035 | TurboWarp |
| If / compare | 0.043 to 0.050 | 0.001 to 0.002 | 0.013 to 0.022 | TurboWarp |
| Pen | 0.021 to 0.024 | 0.011 to 0.012 | 0.033 to 0.040 | TurboWarp |
| Text | 0.015 to 0.023 | 0.003 to 0.006 | 0.018 | TurboWarp |
| Plain loop turns in 2 s | 3.5 to 3.9 million | 15.4 to 16.2 million | 1.57 to 1.97 million | TurboWarp |
| Clone frames in 3 s | 91 | 87 to 88 | 84 to 87 | Scratch |

Build q is faster than build p on lists (about 0.08 -> 0.03, now close to Scratch), pen and text. Same run, bench.js once each: pen p 0.081 / q 0.041, text p 0.045 / q 0.016 (p run looked noisy). TurboWarp still wins every speed row; G-Warp is still behind Scratch on pen and plain loops. Owner's game rows not measured.

### 2026-11-27 ~03:50 UTC, build q again (lane C, bench.sb3, twbench.js twice; seconds, lower is better unless "in N s")

| Test | Scratch | TurboWarp | G-Warp q | Best |
|---|---|---|---|---|
| Count loop | 0.044 to 0.072 | 0.000 to 0.001 | 0.022 to 0.025 | TurboWarp |
| Maths | 0.065 to 0.069 | 0.005 to 0.006 | 0.039 to 0.050 | TurboWarp |
| Lists | 0.031 to 0.032 | 0.004 to 0.005 | 0.052 to 0.058 (bench.js: 0.039 to 0.044) | TurboWarp |
| If / compare | 0.050 to 0.051 | 0.001 | 0.014 to 0.023 | TurboWarp |
| Pen | 0.022 to 0.023 | 0.013 to 0.018 | 0.040 to 0.048 | TurboWarp |
| Text | 0.017 | 0.002 to 0.004 | 0.010 to 0.031 | TurboWarp |
| Plain loop turns in 2 s | 2.9 to 3.0 million | 12.6 to 14.2 million | 1.36 to 1.37 million | TurboWarp |
| Clone frames in 3 s | 91 | 75 to 85 | 83 | Scratch |

Same build as last row; machine looked slower this run (lists slower than last time on the same build). G-Warp beats Scratch on count loop, maths, if/compare; loses on lists, pen, plain loops. TurboWarp wins every speed row. Owner's game rows not measured.

### 2026-11-27 ~05:50 UTC, build q again (lane C, bench.sb3, twbench.js twice; seconds, lower is better unless "in N s")

| Test | Scratch | TurboWarp | G-Warp q | Best |
|---|---|---|---|---|
| Count loop | 0.036 to 0.039 | 0.000 | 0.017 to 0.024 | TurboWarp |
| Maths | 0.056 to 0.057 | 0.004 to 0.008 | 0.021 to 0.038 | TurboWarp |
| Lists | 0.026 to 0.043 | 0.002 | 0.033 to 0.049 | TurboWarp |
| If / compare | 0.045 to 0.050 | 0.001 to 0.003 | 0.015 to 0.022 | TurboWarp |
| Pen | 0.018 to 0.030 | 0.011 to 0.012 | 0.033 to 0.034 | TurboWarp |
| Text | 0.015 to 0.017 | 0.002 to 0.004 | 0.011 to 0.018 | TurboWarp |
| Plain loop turns in 2 s | 3.9 to 4.1 million | 16.0 to 17.4 million | 1.47 to 1.86 million | TurboWarp |
| Clone frames in 3 s | 91 | 86 to 88 | 84 to 86 | Scratch |

Same build as the last rows, numbers agree. TurboWarp wins every speed row; G-Warp beats Scratch on count loop, maths, if/compare and text, loses on lists (noisy), pen and plain loops. Owner's game rows not measured.
