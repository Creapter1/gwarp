# Bugs and Scratch mismatches found by lane C

## 2026-11-26 (build before p; recheck on p)

1. **"list contains" compares numbers as text.** Steps: `python3 lanes/tests/mkquirk.py` (needs tools/gwt/sbgen.py next to it) or use `lanes/tests/quirk.sb3`; `cd /home/claude/ref && node diff.js <path>/quirk.sb3 4000`. List Q = [1,2,3]; `Q contains "02"`: Scratch `true`, G-Warp `false`. (Scratch compares like `=`: numbers by value, text without case.)
2. **Sprite x fencing after set x 1000 then set size 1.** Same project, same run. Final `A.x`: Scratch 255, G-Warp 240. Right after `set x to 1000` both report the same (q36), so G-Warp moves/re-fences the sprite later (likely on `set size to 1` or `point in direction -190`). Scratch keeps x where the first fence put it.
3. (Note, not G-Warp) par.sb3 referee run shows a page error on the Scratch side: "Cannot read properties of undefined (reading 'length')". Results still 58/60 as before.

Not run (need the owner's game, not available to lane C): t_thin, t_undo, t_grab, t_dragms, play.js, mem.js, fps.js, twgame.js, t_save/t_undob/t_book with gh.sb3.
