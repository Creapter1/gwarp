v15.70.16 (Claude Fable, 26 Nov 2026, scheduled run 07:18). ON THE OWNER'S PC as v15.69.0o (backups before-v15690o-app.html, before-v15690o-gw-book.js).
STEP 1b part b of TURBO-STYLE-PLAN.md: SAVE, THE AST MIRROR AND THE BLOCK COUNTER READ THE PROJECT BOOK.
Files: app-v15.69.0-to-v15.70.16.patch (over main v15.69.0) + gw-book.js.

HOW IT WORKS (gw-book.js: GW_BOOK.pack / unpack / ast / count; app.html: projectData, the base loadProject, GW9.captureAST)
  Save: the file gets `book` = { v:1, kinds:[block forms], scripts:[one row of block trees per script | null] }, in the same order as
        `stacks`. null = not a plain script (a comment box): its page text is used. `stacks[].html` STAYS in the file for one release,
        so an older G-Warp opens new files. Remove it one release later (then the file gets smaller again: game 4 MB, big.sb3 8 MB).
  AST mirror (`ast`, window.GW_AST): made from the pack, same field names (type, breakpoint, slots, body, elseBody), no `html` per block.
  Load: if the file has a `book` with as many scripts as `stacks`, each script is built from it (every block form goes through GW_SAFE
        first, the built script through GW_SAFE.clean). A script that cannot be built falls back to its page text. GW_BOOK.lastLoad says
        how many came from where.
  Counter under the stage ("Blocks:"): counted again only after the code area changed (was a page search every 0.6 s while running).
  Off switch: window.GW_SAVE_BOOK = false, or localStorage 'gwarp-save-book' = 'off' (then save, ast and load are the old way).

NUMBERS (Claude's workspace)                     build n        build o
  owner's game, saved file                       47.3 MB        30.8 MB   (the rest is costumes)
  big.sb3 (7,200 blocks), saved file             26.4 MB        10.1 MB
  the hidden `ast` inside the file, game         17.5 MB        0.7 MB
  making the save data + text, game              about 0.42 s   about 0.25 s
  opening the saved file: game 8 to 10 s both ways (same, the machine moves 2 s); big.sb3 21 s -> 9 s

PROVEN ON
  t_save.js (save, reopen, page compared piece by piece + the Book's script texts + sprites and variables + second save equal):
    every block kind (PALETTE, 203 blocks), mini, nat, c7, par, par2, par3, par4, probe, join, stop, ep, pen, snd, bench3, wide,
    big (7,200 blocks), vars2500, the owner's game: 19 of 19 OK. The PC build file itself: mini + the game OK.
  t_save2.js (file saved the old way; hostile Book; damaged Book; short Book; good file): par3, par4, the owner's game OK.
  t_undob.js 19 of 19 OK. t_par 53/53, t_par2 28/28, t_thin 14/14, t_snap 7/7, t_grab OK, t_undo OK, t_book 18/18, t_book2 10/10, t_dragms OK.
  Referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19, par3 157/159, par4 59/72
  (par4 and par are the same as build n on this machine). Game played to 3D gameplay, no page errors. Memory with the game open 698 MB.
  Game speed same as build n (18.9 vs 18.2 steps per second, same run).

NOT DONE IN THIS PART (moved to the start of step 3, where they are needed: blocks leave the page there)
  Find and the AI report still read the page. They match text inside round blocks in slots, so a Book version needs its own parity test.
  The "49 empty script boxes" of the owner's game are 49 comment boxes, not empty boxes. Nothing to remove.
