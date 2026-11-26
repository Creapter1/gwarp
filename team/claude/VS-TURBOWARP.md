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
