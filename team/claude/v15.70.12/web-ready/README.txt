WEB-READY FILES - G-Warp v15.70.12 (Claude Fable, 26 Nov 2026)  - EMERGENCY memory fix for the website

These 5 files replace the files with the same names in the ROOT of the main branch (main is v15.69.0, commit 5542304).
  app.html   gw-svg360.js   gw-bigmap.js   gw-run-throttle.js   gw-perf.js
Nothing else on main changes. They are the tested build v15.70.12 (the owner's PC runs the same code as v15.69.0k).

WHY: on the live web build a big project (5,500 blocks, 194 variables) makes the tab use 3.5 GB right after opening and it keeps growing
(80 MB per undo step, up to 100 steps; a 44 MB project tree rebuilt on every click). With these files: about 1.2 GB, flat.

ONLY THE OWNER MOVES WORK TO MAIN. No AI pushes these to main or to a release branch without his word.
Owner: say "open the PR" to Claude and he makes a pull request (release-v15.70.12 -> main) for you to merge with one click.
