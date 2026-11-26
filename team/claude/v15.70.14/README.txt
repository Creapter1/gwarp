v15.70.14 (Claude Fable, 26 Nov 2026). ON THE OWNER'S PC as v15.69.0m (01:45, backup before-v15690m-app.html; gw-book.js is a new file there).
STEP 1a of TURBO-STYLE-PLAN.md: THE PROJECT BOOK, built and proven. Nothing in the app depends on it yet.
Files: app-v15.69.0-to-v15.70.14.patch (over main v15.69.0) + the new sibling file gw-book.js (loaded by one script tag at the end of app.html).

WHAT THE BOOK IS (gw-book.js, own design, own code)
  { kinds: [text], sprites: { owner: { scripts: [{id, x, y, d}], blocks: { id: {k, t, p, n, m, f, s} } } } }
  kinds = every different block form, stored once (the block's own page form with holes for values, slots and mouths).
  A block record: k kind, t type, p parent ID, n next ID, m first block of each mouth, f typed values + menu choices, s what sits in each slot.
  GW_BOOK.read() page -> Book.  GW_BOOK.write(book, box) Book -> page pieces (uses GW9.setSlotNode to draw what sits in a slot).
  GW_BOOK.check() the proof: page -> Book -> page must be the same page, and reading the rebuilt page must give the same Book.
  GW_BOOK.get() the Book of the page as it is now (read again only after a change).
  What is NOT project data and is left out: glow / drag / find classes, the menus' own lists (thin or full), z-index after a drag,
  and the hidden helper box of a filled slot (while a project runs it holds the slot's last answer).
  Developer mode: a quiet self-check, at most once in 5 minutes, never while the user is busy; only a failure is shown.

PROVEN ON (t_book.js, t_book2.js)
  small: mini, nat, c7.  normal: par, par2, par3, par4, probe, join, stop, ep, pen, snd, bench3, wide.
  huge: big.sb3 (600 scripts, 7,200 blocks: Book 844 KB vs page 7,533 KB, read 150 ms, write 461 ms), vars2500.sb3.
  every block kind: one script per palette block, all 15 categories: 203 blocks, 187 block types.
  owner's game: 58 scripts, 2,152 blocks, 175 kinds: Book 462 KB vs page 3,939 KB, read 49 ms, write 482 ms; also OK while the game runs.
  edits: typed value shows up in the Book; pulling blocks out makes one more script; Undo: the Book follows; a changed value IS reported (self-test).
  t_par 53/53, t_par2 28/28; referee par2 40/40, probe 72/72, stop 17/17; owner's game played to 3D gameplay, no errors.

FOUND ON THE WAY (not fixed, for step 1b): the owner's game has 107 script boxes on the page but only 58 hold blocks (49 empty boxes left by the import).

NEXT: step 1b (undo / redo, save, export, AI report and Find read the Book; opening a Scratch file fills the Book first), and the first
G-Warp against TurboWarp table. See team/claude/PROGRESS.md.
