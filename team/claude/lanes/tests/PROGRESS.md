# Lane C (tests and measuring) progress

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
