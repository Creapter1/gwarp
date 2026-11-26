# Lane C (tests and measuring) progress

## 26 Nov 2026 ~15:00 UTC run
- Build: work/ as it was before lane A pushed build p (v15.70.17) during this run; build p not yet tested. Test list: t_par 53/53, t_par2 28/28, t_snap 7/7, t_book2 10/10, t_book all 17 OK, t_save zoo all OK (big.sb3 load 22.4 s), t_undob zoo all OK.
- Referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72 (same as before).
- New zoo project: quirk.sb3 (mkquirk.py, 46 checks of maths/text/list quirks): 44/46, 2 bugs in BUGS.md.
- VS-TURBOWARP.md: new dated row set (bench.sb3). G-Warp loses every row.
- Skipped: everything needing the owner's game.
- Next: run_all.sh script; more zoo generators (motion/looks edge cases, broadcasts and wait timing, clones, many sprites).
