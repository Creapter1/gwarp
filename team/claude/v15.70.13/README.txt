v15.70.13 (Claude Fable, 26 Nov 2026). ON THE OWNER'S PC as v15.69.0l (01:00, backups before-v15690l-app.html + before-v15690l-gw-run-throttle.js).
Patch: app-v15.69.0-to-v15.70.13.patch (over main v15.69.0: app.html, gw-svg360.js, gw-bigmap.js, gw-run-throttle.js, gw-perf.js).
The web-ready files for main are still the v15.70.12 ones (team/claude/v15.70.12/web-ready/); the owner has not asked for a PR.

WHAT IS IN IT (on top of v15.70.12)
1. THIN MENUS (memory). A variable / list menu with more than 24 names holds only its own name + the widest name (same block width).
   The full list is worked out when needed (search pop-up, key press, code that sets another name). data-gw-thin="v"|"l".
   GW.__thinNames / __optHas / __optPick / __thaw; HTMLSelectElement value setter adds the missing name first. Off: window.GW_THIN_MENUS=false
   Owner's game: page nodes 1,154,298 -> 181,141, menu entries 175,314 -> 13,121, tab memory 1,116 -> 766 MB (website today: 3,583 MB).
   Test t_thin.js: 14/14 (same picked names, same widths, pop-up, code set, new variable, undo, key press).
2. GRAB ONLY WHAT YOU SEE (owner's video). The inside of a C block is an invisible box as wide as its widest block (3,800 px on his game);
   a press there pulled the whole C block out. window.GW_EMPTY_PRESS(e): empty inside of a C block / invisible box around a script = code area,
   and the area pans (like Scratch). Top row, left arm (22 px) and bottom bar still grab. Off: window.GW_GRAB_SHAPE=false. Test t_grab.js.
3. UNDO DOUBLED EVERY USED "define" (old bug, found tonight): the "a used define cannot be deleted" guard saw Undo / Redo swap the code area
   and put the old define back next to the new one (47 extra scripts, 2,018 extra blocks after ONE undo on the owner's game). Fixed. Test t_undo.js.
4. DRAG A BIG SCRIPT (owner's video: 2 s freeze on pick-up, 2.5 s on drop):
   a. snap places are measured once per drag, not on every mouse move (collectSnapCandidate; old way: window.GW_SNAP_CACHE=false)
   b. editor helpers wait while a script is in the hand (window.GW_DRAG_AT; gw-run-throttle.js; off: window.GW_DRAG_THROTTLE=false)
   c. the 1-pixel drop shadow on C blocks is off by default: it made every C block its own picture layer (1,000 layers = 95 ms per mouse
      move). Cannot be seen on the dark code area (40 of 2,880,000 pixels differ by more than 8 levels). Back: body class gw-c-shadow.
   Measured (t_dragms.js, long freezes): pick-up 762 -> 146 ms, each move ~60 ms -> none over 50 ms, after drop 771 -> 121 ms.

TESTED: t_par 53/53, t_par2 28/28, t_thin 14/14, t_snap 7/7 (palette to area, snap under / inside a C block / above, pull out, delete on the
palette; same with the old drag code), t_grab, t_undo, 0 page errors. Scratch referee: par 58/60, par2 40/40, probe 72/72, mini 22/22, nat 15/15,
join 19/19, stop 17/17, ep 19/19, par3 and par4 the same counts as v15.70.12 on the same machine. Owner's game played to 3D gameplay, no errors.
NOT DONE: the UI overlap check (owner: skip for now).
