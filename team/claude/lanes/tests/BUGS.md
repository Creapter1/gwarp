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

## 2026-11-26 ~19:15 UTC run, build p again

Recheck: bugs 1, 2 (quirk 44/46), 4 (order 75/76), 5 (motion 40/41) still there. t_snap 7/7 this time (bug 6 did not show).
New zoo project ctrl.sb3 (mkctrl.py: repeat 2.5 / 2.4 / "abc" / -3, repeat until, wait until true, case-blind equals, list index words last/0/out of range/1.7, insert/replace/delete edge cases, stop this script): 37/37, no new bug.

## 2026-11-26 ~21:15 UTC run, build p again

7. **Empty boolean argument of a custom block reads "false" instead of "".** Steps: `cp lanes/tests/mkproc.py /home/claude/gwt/ && cd /home/claude/gwt && python3 mkproc.py`; `cd /home/claude/ref && node diff.js /home/claude/gwt/proc.sb3 6000`. Block `bt %b` is called with its boolean slot empty, then sets `bj` to `join (b) ""`. Scratch: "" (the argument default, argumentdefaults is ""). G-Warp: "false". Lines bj and p12. `if <b>` still takes the else branch in both (p11 = F, matches). Same on build o (base). Other 32 checks match: recursion (fact 5 = 120, fact "abc"), warp recursive fib 10 = 55, warp repeat 1000, number args add as numbers, missing args, bool arg outside definition, call to an unknown proc, two args with the same name, stop this script inside a proc.
Recheck this run: bugs 1, 2, 4, 5 still there (no new build). Bug 6 showed again: t_snap.js crashed while A/B/C ran together, alone 7/7. big.sb3 load 65.6 s under load, 14.5 s alone.

## 2026-11-26 ~22:25 UTC run (live), build p again

8. **A sprite with ghost effect 100 still catches clicks.** Steps: `cp lanes/tests/mklayers.py /home/claude/gwt/ && cd /home/claude/gwt && python3 mklayers.py` (or use `lanes/tests/lay8.sb3`); `cd /home/claude/ref && node diff.js /home/claude/gwt/lay8.sb3 5000`. Six round sprites sit on the point (100,50), P6 on top sets ghost to 100, diff.js clicks the point once. Scratch: the click goes to P5 (`clk` = "P5-1"), a fully see-through sprite is not clickable. G-Warp: "P6-1". Ghost 99 (lay14) is still clickable in both, matches. Same on build o. The other 14 layer cases match (go to front/back, forward/backward with big, negative, fractional and "abc" numbers, space key reorder, hidden sprite, clones placed under their parent, clone going to front, empty point goes to the stage, tiny sprite).
9. **Stage volume read with the "of" block gives 0 instead of 100.** Steps: `python3 mkvol.py` (or `lanes/tests/vol.sb3`); `node diff.js /home/claude/gwt/vol.sb3 5000`. Line v8 is `([volume v] of (Stage))`. Scratch: 100 (stage volume starts at 100). G-Warp: 0. Sprite volume through "of" (v7 = 30) matches, so it is the stage only. Same on build o. 38/39 others match (set/change volume limits 0..100, "abc", decimals, costume/backdrop # and name through "of", missing sprite, letter of / length / contains edge cases, number to text).
10. (Speed, not a Scratch mismatch) **Undo on one very long script takes about 1.5 s each time.** Steps: `python3 mkdeep.py` (or `lanes/tests/deep.sb3`: one script, about 3,400 blocks, 150-deep ifs); `node t_undob.js deep.sb3`. Undo ms 1400,1528,1498,243,1420,1415,1517 and 61 KB per undo step. big.sb3 (7,200 blocks but 600 small scripts) takes about 280 ms per undo after the first. Results are right (deep.sb3 referee 19/19), only slow.

## 2026-11-27 ~03:15 UTC run, build q again (no new build since last run)

11. **"distance to" a sprite that does not exist gives 0 instead of 10000.** Steps: `cp lanes/tests/mktouch.py /home/claude/gwt/ && cd /home/claude/gwt && python3 mktouch.py`; `cd /home/claude/ref && node diff.js /home/claude/gwt/touch.sb3 6000`. Line t16 is `round (distance to [Nope])` (menu names a sprite that is not in the project, can happen after a rename/delete). Scratch: 10000. G-Warp: 0. Other touch.sb3 checks match: touching sprite / edge, touching color, color touching color, distance after moves, touching while hidden and with ghost 100.
   - Line t15 (`distance to mouse-pointer`) also differs (Scratch 0, G-Warp 20) but the referee's mouse position is not the same as G-Warp's at that moment, so this one is NOT counted as a bug.
