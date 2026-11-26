# G-Warp on this PC: v15.69.0q (Claude, 26 Nov 2026, about 19:40)

Build v15.70.18. More of step 2 (fast code).

## Faster (big speed test, seconds, build p -> build q)
count 0.17-0.32 -> 0.13-0.24 | maths 0.65-0.77 -> 0.33-0.36 | lists 2.1-2.3 -> 0.65-0.72 | if 0.62-0.67 -> 0.26-0.27 | text 0.23-0.32 -> 0.12 | pen 2.1-2.7 -> 1.6-1.8
G-Warp now beats real Scratch on count, maths, lists, if and text (5 of 6). TurboWarp still wins every row.
Your game in 3D gameplay: 27 steps per second, script time 9.2 ms per step (Scratch: 29.8 and 10.5 ms).

## What changed inside
- Variable, list and go-to blocks with reporters inside are now real code (where each variable lives is looked up once, not on every use).
- sin, cos, abs, floor, ceiling, sqrt are worked out directly.
- Pen: lines of the same solid colour are drawn in one go, no save/restore per line.

## Tested before it came here
Real-Scratch referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, pen 48/48, sound 6/6, par3 157/159 (5 of 5 runs), par4 59/72 (as before).
App tests 53/53, 28/28, undo, save, drag 7/7. Your game played to 3D gameplay, no errors.

## Files
Changed: app.html, gw-fast.js. Backups: backup\before-v15690q-app.html, backup\before-v15690q-gw-fast.js
Old way if needed: F12, Console, `GW_FAST_ON = false`, start the project again.
