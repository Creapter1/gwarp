# Lane C (tests and measuring) progress

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
