# G-Warp on this PC: v15.69.0p (Claude, 26 Nov 2026, about 10:30)

Build v15.70.17. **Step 2 starts in the app: scripts become fast code.** On by default.

## What you should feel
- Scripts run much faster. Big speed test (seconds, lower is better), build o -> build p:
  count loop 2.4 -> 0.2 to 0.3 | maths 3.8 -> 0.7 | if/compare 5.8 -> 0.6 | text 2.0 -> 0.2 to 0.3 | lists 3.8 -> 2.1 | pen 2.4 -> 2.1 to 2.7
  G-Warp is now FASTER than real Scratch on count, maths, if and text. TurboWarp is still faster on every row (lists and pen not done yet).
- Your game in 3D gameplay: about 25 steps per second (build o: 17 to 20, Scratch 29).
- Loops now time exactly like Scratch: a repeat gives other scripts their turn after its last pass too, and a late frame is not followed by quick catch-up frames.

## Tested before it came here
- Real-Scratch referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159 in 11 of 11 runs, par4 59/72 (same as before).
- App tests 53/53, 28/28, Project Book, undo, save, drag 7/7. Your game played to 3D gameplay, no errors.

## Files
- Changed: app.html. New: gw-fast.js (same folder).
- Backup: backup\before-v15690p-app.html
- If anything runs wrong: press F12, Console, type `GW_FAST_ON = false` and start the project again (old way). Tell me what happened.
