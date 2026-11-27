# Lane C (tests and measuring) progress

## 27 Nov 2026 ~21:12-21:55 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book all OK, t_save all OK, t_undob all OK (big first undo 2.8 s). No FAIL lines.
- Referee: same as last run (par 58/60, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, proc 32/34, vol 38/39, touch 27/29, of 33/35, bd 20/21, yield 27/29, waitu 34/35, lay8 37/38, all others full).
- New zoo: mkclvar.py (clvar.sb3: clone-local variables/lists copied at clone time, local changes, 'of' reads original) 15/15, no new bug. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame. Ask with typed answers not done: diff.js has no way to type answers.
- Next: pen colour via touching color, sound wait timing, a diff.js option to feed ask answers.

## 27 Nov 2026 ~19:12-19:55 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book all OK, t_save all OK, t_undob all OK (big first undo 3.3 s). No FAIL lines.
- Referee: same as last run (par 58/60, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, proc 32/34, vol 38/39, touch 27/29, of 33/35, yield 27/29, waitu 34/35, lay8 37/38, all others full).
- New zoo: mkbd.py (bd.sb3: backdrop switch by number result, wrap, rounding, number-like names) 20/21, bug 18 (= bug 17 for backdrops). Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: ask with typed answers, pen colour via touching color, sound wait timing.

## 27 Nov 2026 ~17:12-18:15 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book all OK, t_save all OK, t_undob all OK (big first undo 2.9 s). No FAIL lines.
- Referee: same as last run (par 58/60, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, proc 32/34, vol 38/39, touch 27/29, of 33/35, yield 27/29, waitu 34/35, lay8 37/38, all others full incl. fence 32/32).
- New zoo: mksndv.py (sndv.sb3: volume limits/bad values, sound effects clear, pen size limits mixed with motion) 19/19, no new bug. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: ask with typed answers, backdrop switch by number result, pen colour reporters via touching color.

## 27 Nov 2026 ~15:11-15:55 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book all OK, t_save all OK, t_undob all OK (big first undo 3.1 s). No FAIL lines.
- Referee: same as last run (par 58/60, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, proc 32/34, vol 38/39, touch 27/29, of 33/35, yield 27/29, waitu 34/35, lay8 37/38, all others full).
- New zoo: mkfence.py (fence.sb3: go to far away, huge/tiny/bad size, direction wrap, bounce, glide 0/-1, ghost + fencing) 32/32, no new bug. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: sound/pen zoo, ask with typed answers, backdrop switch by number result.

## 27 Nov 2026 ~13:12-13:50 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book all OK, t_save all OK, t_undob all OK (big first undo 2.4 s). No FAIL lines.
- Referee: same as last run (par 58/60, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, proc 32/34, vol 38/39, touch 27/29, yield 27/29, waitu 34/35, lay8 37/38, all others full).
- New zoo: mkof.py (of.sb3: "of" block on stage/sprites/local vars/missing names, costumes named like numbers, backdrop next/previous) 33/35. Bug 17: switch costume to a number result picks by name. o12 = old bug 9. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: sound/pen zoo, ask with typed answers, backdrop switch by number result.

## 27 Nov 2026 ~11:11-11:55 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book all OK, t_save all OK, t_undob all OK. No FAIL lines.
- Referee: same as last run (par 58/60, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, proc 32/34, vol 38/39, touch 27/29, yield 27/29, lay8 37/38, all others full).
- New zoo: mkwaitu.py (waitu.sb3: wait until, broadcast and wait, double broadcast) 34/35. Bug 15: wait until checks late (same kind as bug 14). Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: sound/pen zoo, ask with typed answers.

## 27 Nov 2026 ~09:12-10:10 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 OK, t_book all OK, t_save all OK, t_undob all OK.
- Referee: same as last run (par 58/60, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, proc 32/34, vol 38/39, touch 27/29, lay8 37/38, all others full).
- New zoo: mkyield.py (yield.sb3: how repeat / repeat until / forever / wait 0 / stop script take turns between sprites) 27/29. Bugs 12-14 in BUGS.md: repeat (-1) ends the script, repeat (2.5) does not yield, repeat until runs one extra round. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: sound/pen zoo, ask with typed answers, check if wait-until has the same late check as repeat until.

## 27 Nov 2026 ~07:11-07:55 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book all OK, t_save all OK, t_undob all OK. No FAIL lines.
- Referee: same as last run (par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, ctrl 37/37, proc 32/34, vol 38/39, time 34/34, text 36/36, touch 27/29, math 54/54, deep 19/19, lay1-15 38/38 except lay8 37/38). No new bugs.
- New zoo: mklist2.py (list2.sb3: contents joining rule, odd indexes, case-insensitive find, insert/replace out of range, 5000-item list) 36/36. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: sound/pen zoo (needs ref/pic.js), ask with typed answers.

## 27 Nov 2026 ~05:12-05:55 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book all OK, t_save all OK, t_undob all OK (big first undo 2.7 s). No FAIL lines.
- Referee: same as last run (par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, ctrl 37/37, proc 32/34, vol 38/39, time 34/34, text 36/36, touch 27/29, deep 19/19, lay1-15 38/38 except lay8 37/38). No new bugs.
- New zoo: mkmath.py (math.sb3: every maths function on edge values, mod/round/divide edge cases, hex/binary/Infinity text) 54/54. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: sound/pen zoo (needs ref/pic.js), ask with typed answers.

## 27 Nov 2026 ~03:11-03:55 UTC run
- Build tested: q (v15.70.18) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book 29 OK, t_save all OK, t_undob all OK (big first undo 3.0 s, deep ~1.5 s each, note 10). No FAIL lines.
- Referee: same as last run (par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, ctrl 37/37, proc 32/34, vol 38/39, time 34/34, text 36/36, deep 19/19, lay1-15 38/38 except lay8 37/38).
- New zoo: mktouch.py (touch.sb3: touching sprite/edge/color, color touching color, distance, hidden/ghost) 27/29: bug 11 (distance to a missing sprite = 0, Scratch 10000); t15 (mouse distance) is a referee timing difference, not counted. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table (build q, slower machine). TurboWarp wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: sound/pen zoo (needs ref/pic.js), ask with typed answers.

## 27 Nov 2026 ~01:12-02:10 UTC run
- Build tested: q (v15.70.18, commit 61162a7). Base for compare: build p (12b770e).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book 27 OK, t_save 27 OK, t_undob 26 OK (big first undo 3.0 s). No FAIL lines.
- Referee: same as build p (par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, ctrl 37/37, proc 32/34, vol 38/39, time 34/34, deep 19/19, lay1-15 all 38/38 except lay8 37/38). No new bugs.
- New zoo: mktext.py (text.sb3: letter of / length / contains / join quirks, and the "of" sensing block on another sprite and the stage) 36/36. Added to run_all.sh.
- VS-TURBOWARP.md: new dated table for build q. Lists, pen and text faster than build p; TurboWarp still wins every row.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: sound/pen zoo (needs ref/pic.js), touching color, ask with typed answers.

## 26 Nov 2026 ~23:11-23:55 UTC run
- Build tested: p (v15.70.17) again (no new build in work/).
- run_all.sh whole list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book 26 OK, t_save 26 OK (big load OK), t_undob 25/25 OK (big first undo 2.7 s).
- Referee: same as last run (par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72, quirk 44/46, order 75/76, motion 40/41, ctrl 37/37, proc 32/34, vol 38/39, deep 19/19, lay 14/15). No new bugs.
- New zoo: mktime.py (time.sb3, 34 checks: timer/reset timer/wait timing, answer before ask, compare and maths quirks) 34/34. Added to run_all.sh.
- VS-TURBOWARP.md: new dated row set (same build, numbers agree).
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Lane A pushed build q (v15.70.18) at the end of this run: NOT tested yet. Test it first next run.
- Next: sound/pen zoo (needs ref/pic.js), touching color, ask with typed answers.

## 26 Nov 2026 ~22:21-23:10 UTC run (live, owner said continue)
- Build tested: p (v15.70.17) again (no new build in work/). Base: build o (1dac028).
- New: run_all.sh (whole list, one test at a time, builds the lane C zoo, SKIPs game tests). First full run: all.log below.
- New zoo: mklayers.py (lay1..lay15, layer order checked by a real click) 14/15 pass, bug 8 (ghost 100 still clickable). mkvol.py (vol.sb3, 39 volume / "of" / text checks) 38/39, bug 9 (stage volume via "of" = 0). mkdeep.py (deep.sb3, huge odd shape: one ~3,400-block script, 150-deep ifs) 19/19, but undo about 1.5 s each, note 10. deep.sb3 not committed (700 KB): run mkdeep.py.
- Test list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7 (one at a time, no crash), t_book2 10/10, t_book 25/25 OK, t_save PALETTE + 25 OK (big load OK), t_undob 25/25 OK.
- Referee: same as last run (par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 (base 58/72), quirk 44/46, order 75/76, motion 40/41, ctrl 37/37, proc 32/34), plus vol 38/39, deep 19/19, lay 14/15.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame. (t_grab also needs the game: it crashes without it.)
- Next: sound/pen zoo (pen state shows only in pictures: needs ref/pic.js), touching color, ask/answer, timer timing.


## 26 Nov 2026 ~21:11-21:45 UTC run
- Build tested: p (v15.70.17) again (no new build in work/). Base: build o (1dac028).
- Test list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7 alone (crashed in the parallel run, bug 6), t_book2 10/10, t_book 17/17 OK, t_save zoo all OK (big.sb3 load 14.5 s alone, 65.6 s under load), t_undob zoo all OK (big first undo 3.3 s) plus proc/ctrl/motion/order/quirk all OK in t_save and t_undob.
- Referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 (base 58/72).
- New zoo project: proc.sb3 (mkproc.py, 34 custom block checks: recursion, warp, args): 32/34, bug 7 in BUGS.md (also on build o).
- VS-TURBOWARP.md: new dated row set (same build, numbers agree).
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: run_all.sh; zoo for layers with many sprites, sound/pen edge cases, broadcast-and-wait timing.


## 26 Nov 2026 ~19:12-19:45 UTC run
- Build tested: p (v15.70.17) again (no new build in work/). Base: build o (1dac028).
- Test list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book 17/17 OK, t_save zoo all OK (big.sb3 load 26.1 s), t_undob zoo all OK (big first undo 3.3 s).
- Referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 (base 58/72), quirk 44/46, order 75/76, motion 40/41.
- New zoo project: ctrl.sb3 (mkctrl.py, 37 control/list edge checks): 37/37.
- VS-TURBOWARP.md: new dated row set (same build, numbers agree).
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: run_all.sh; zoo for layers with many sprites, sound/pen edge cases, custom blocks with warp.

## 26 Nov 2026 ~17:12-17:40 UTC run
- Build tested: p (v15.70.17) again (no new build in work/). Base: build o (1dac028).
- Test list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7 (crashed once under load), t_book2 10/10, t_book 17/17 OK, t_save zoo all OK (big.sb3 load 24.2 s), t_undob zoo 18/18 OK (big first undo 2.4 s).
- Referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 (base 59/72), quirk 44/46, order 75/76.
- New zoo project: motion.sb3 (mkmotion.py, 41 motion/looks/sensing edge checks): 40/41, bug 5 in BUGS.md.
- VS-TURBOWARP.md: new dated row set (same build, numbers agree).
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Next: run_all.sh; zoo for wait/timer timing, many sprites with layers, sound/pen edge cases.

## 26 Nov 2026 ~15:15-15:45 UTC run
- Build tested: p (v15.70.17, fast code on). Base for compare: build o (commit 1dac028).
- Test list: t_par 0 fails /53, t_par2 0/28, t_snap 7/7, t_book2 10/10, t_book 17/17 OK, t_save zoo all OK (big.sb3 load 19.3 s), t_undob zoo 18/18 OK (big first undo 2.2 s).
- Referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 (base also 59/72: not worse), quirk 44/46.
- New zoo project: order.sb3 (mkorder.py: 12 sprites, clones, broadcasts, run order log): 75/76, bug 4 in BUGS.md (also on build o).
- VS-TURBOWARP.md: new dated row set for build p.
- Skipped (need the owner's game): t_thin, t_grab, t_undo, t_dragms, play, mem, fps, twgame.
- Note: C.sh calls `node bench.js` with no file; it needs `bench.js /home/claude/gwt/bench.sb3`.
- Next: run_all.sh script; more zoo (motion/looks edge cases, wait timing, many sprites with layers).

## 26 Nov 2026 ~15:00 UTC run
- Build: work/ as it was before lane A pushed build p (v15.70.17) during this run; build p not yet tested. Test list: t_par 53/53, t_par2 28/28, t_snap 7/7, t_book2 10/10, t_book all 17 OK, t_save zoo all OK (big.sb3 load 22.4 s), t_undob zoo all OK.
- Referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 (same as before).
- New zoo project: quirk.sb3 (mkquirk.py, 46 checks of maths/text/list quirks): 44/46, 2 bugs in BUGS.md.
- VS-TURBOWARP.md: new dated row set (bench.sb3). G-Warp loses every row.
- Skipped: everything needing the owner's game.
- Next: run_all.sh script; more zoo generators (motion/looks edge cases, broadcasts and wait timing, clones, many sprites).
