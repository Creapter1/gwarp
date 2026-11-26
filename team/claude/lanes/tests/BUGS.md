# Bugs and Scratch mismatches found by lane C

## 2026-11-26 (build before p; recheck on p)

1. **"list contains" compares numbers as text.** Steps: `python3 lanes/tests/mkquirk.py` (needs tools/gwt/sbgen.py next to it) or use `lanes/tests/quirk.sb3`; `cd /home/claude/ref && node diff.js <path>/quirk.sb3 4000`. List Q = [1,2,3]; `Q contains "02"`: Scratch `true`, G-Warp `false`. (Scratch compares like `=`: numbers by value, text without case.)
2. **Sprite x fencing after set x 1000 then set size 1.** Same project, same run. Final `A.x`: Scratch 255, G-Warp 240. Right after `set x to 1000` both report the same (q36), so G-Warp moves/re-fences the sprite later (likely on `set size to 1` or `point in direction -190`). Scratch keeps x where the first fence put it.
3. (Note, not G-Warp) par.sb3 referee run shows a page error on the Scratch side: "Cannot read properties of undefined (reading 'length')". Results still 58/60 as before.

Not run (need the owner's game, not available to lane C): t_thin, t_undo, t_grab, t_dragms, play.js, mem.js, fps.js, twgame.js, t_save/t_undob/t_book with gh.sb3.

## 2026-11-26 ~15:15 UTC run, build p (v15.70.17)

Recheck on build p: bugs 1 and 2 above are still there (quirk.sb3 44/46, same two lines).

4. **Run order of clones and of broadcast hats is not Scratch's (order.sb3).** Steps: `cd tools/gwt && python3 <repo>/team/claude/lanes/tests/mkorder.py` (or use `lanes/tests/order.sb3`); `cd /home/claude/ref && node diff.js <path>/order.sb3 5000`. 75/76; the log list `o_log` differs. Project: Stage broadcasts `a` (and wait), `b`, waits until t>5, then broadcasts `c` twice in a row. 12 sprites P0..P11 log on each hat; P0, P4, P8 make 2 clones each on `b`, and each clone logs then deletes itself.
   - Scratch: `... P8clone1 P4clone1 P0clone1 S-t5 P11c P10c ... P0c P8clone2 P4clone2 P0clone2`
   - G-Warp: `... P8clone1 P0clone1 S-t5 P4clone1 P10c ... P0c P8clone2 P0clone2 P4clone2 P11c`
   - So: (a) P4's clone script runs one frame late / after P0's (wrong clone order), and (b) P11's `when I receive c` runs last instead of first after the double broadcast (in Scratch the second broadcast restarts the hats in place, keeping sprite layer order).
   - Same result on build o (not new in p). Same every run (not random).

## 2026-11-26 ~17:15 UTC run, build p again (no new build since last run)

Recheck: bugs 1, 2 (quirk.sb3 44/46) and 4 (order.sb3 75/76) still there, same lines.

5. **Unknown "math of" function gives the input number instead of 0.** Steps: `cd tools/gwt && python3 <repo>/team/claude/lanes/tests/mkmotion.py` (or use `lanes/tests/motion.sb3`); `cd /home/claude/ref && node diff.js <path>/motion.sb3 6000`. Line m12 is `([round v] of (direction))` - an `operator_mathop` with OPERATOR field "round", which is not in Scratch's list. Scratch: 0. G-Warp: -37.947... (the direction, unchanged). Scratch returns 0 for any unknown mathop name (can happen in hand-edited or other-tool .sb3 files). The other 40 motion/looks checks (fencing, direction wrap, size limits, costume number wrap/round, left-right style, glide 0 s, touching while hidden, distance, "of" block) all match.
6. (Flaky, not a bug yet) t_snap.js crashed once while A/B/C ran together; alone it gave 7/7. Watch it.
