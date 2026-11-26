v15.70.15 (Claude Fable, 26 Nov 2026, scheduled run). ON THE OWNER'S PC as v15.69.0n (backups before-v15690n-app.html, before-v15690n-gw-book.js).
STEP 1b part a of TURBO-STYLE-PLAN.md: UNDO / REDO KEEP THE PROJECT BOOK, not the page text.
Files: app-v15.69.0-to-v15.70.15.patch (over main v15.69.0) + gw-book.js.

HOW IT WORKS (gw-book.js, GW_BOOK.snap / unsnap; app.html GW8.snapshot / restore / same / pushHistory)
  An undo step = a list with one small text per script, in page order. A script that did not change is the SAME text in both steps
  (kept once in memory). Putting a step back reads the page, keeps every script that is already right and builds only the others.
  Not a plain script (comment, empty box, legacy slot) = kept as its own page text, as before.
  Class order and z-index are not part of a step (the app re-adds classes in another order; z-index is only "on top after a drag").
  step.workspace still exists (made on demand) for old readers.
  Off switch: window.GW_UNDO_BOOK = false, or localStorage 'gwarp-undo-book' = 'off'. Build everything on undo: window.GW_UNDO_BOOK_ALL = true.
ALSO FIXED (both were in the old way too, found by the new test)
  - On a big project the Redo steps were thrown away shortly after an Undo (the app's own redraw was taken for an edit). Off: GW_UNDO_KEEPS_REDO = false.
  - Extension blocks lost their own tooltip ("Pen: erase all") after every Undo.

NUMBERS (owner's game, 2,152 blocks, Claude's workspace)        old way      new way
  text kept per undo step                                        3,902 KB     about 5 KB
  one Undo                                                       1.4 - 2.0 s  0.13 - 0.3 s
  Undo that brings back every script (58 scripts)                -            1.1 - 1.7 s
  big.sb3 (7,200 blocks): one Undo 0.25 - 0.35 s; bring back all 601 scripts 2.1 s.

PROVEN ON (tools/gwt/t_undob.js: 7 edits - move, type, delete block, duplicate, delete script, split, clear all - then undo all, redo all;
after EVERY step the page is compared piece by piece with a copy of the page taken at that step; redo steps must survive)
  every block kind (PALETTE: 203 blocks, 15 categories), small: mini, nat, c7; normal: par, par2, par3, par4, probe, join, stop, ep, pen, snd,
  bench3, wide; huge: big (7,200 blocks), vars2500; the owner's game. 19 of 19 OK. The PC build file itself: mini + the game OK.
FULL TEST LIST, same run: t_par 53/53, t_par2 28/28, t_thin 14/14, t_snap 7/7, t_grab OK, t_undo OK, t_book 18/18, t_book2 10/10, t_dragms OK.
  Referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72
  (par, par3, par4 are the same as build m on this machine). Game played to 3D gameplay, no page errors. Memory with the game open 698 MB.
  Game speed same as build m (19.3 vs 19.2 steps per second in this run; the machine was slower than last night).
