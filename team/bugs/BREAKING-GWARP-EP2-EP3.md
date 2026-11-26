# Breaking G-Warp, episodes 2 and 3 - bug list and status

Source: the owner's "Breaking G-Warp" test episodes (4 AI testers, 25 Nov 2026, build v15.69.0). Episode pages are the owner's private Claude artifacts.
Status by Claude Fable, 25 Nov night, build v15.70.11 (owner's PC: v15.69.0j). FIXED = fixed and tested. OPEN = not done. Episode 1's list is not read yet.

## High
- FIXED  2,500+ variables freeze and crash the tab (Variables palette copied the whole variable menu per variable). Now ~2 s. Test: mkvars.py 2500 + load.js
- FIXED  Backdrops show zoomed in 1.33x (backdrop sat in the middle 75% of the 512x384 drawing area). mapFor: a backdrop fills the whole area. Test: t_paint.js
- FIXED  Bitmap costumes cannot grow (saveBitmap cropped to the old box). The costume grows, rotation centre follows. Test: t_paint.js
- FIXED  Painted new sprite = 1 pixel (2x2 costume stretched over the drawing area). Empty costumes sit at stage scale. Test: t_paint.js

## Medium
- FIXED  Rename sprite glues the new name on the old one ("G-SparkBob") - gw-perf.js name guard restored the old name on every key. Test: t_rename.js
- FIXED  Ctrl+S saves two files (old .gwarp.json shortcut next to the File menu's)
- OPEN   Ctrl+Z cannot put a 200-deep OR tower back after dragging it out of its "if"
- OPEN   Extension categories need two clicks (first click on Music / Pen in the rail does nothing)
- OPEN   Extensions button covers block categories on laptop screens (1366x768, 1280x720, 1024x768, 800x600)
- OPEN   Share button does nothing visible (may be the test browser - check by hand in the desktop app)
- OPEN   Keyboard Tab focus disappears into the hidden block list
- OPEN   At 1280x720 the sprite list is pushed below the screen

## Low
- FIXED  "set size to 1e999" shrank the sprite (now the biggest allowed, like Scratch). Test: ep.sb3 19/19
- FIXED  "set x to 1e308" / "go to Infinity" sent the sprite to the centre (now the edge, like Scratch). Test: ep.sb3
- FIXED  Typing an existing sprite name left a half-typed name ("Bo"). Test: t_rename.js
- FIXED  Invisible twins: names with spaces at the end (now trimmed, compared trimmed). Test: t_rename.js
- OPEN   100,000-letter speech bubble covers the stage, FPS drops
- OPEN   300 spinning sprites run at 11-12 FPS; Stop takes 0.7-1 s  (re-measure: many speed fixes since)
- OPEN   Giant text + Convert to Bitmap squashes the costume into a 384x22 strip
- OPEN   A sprite named "mouse-pointer" cannot be targeted by "go to"
- OPEN   Variable monitors stack in one column and fall off the bottom of the stage
- OPEN   A 500-letter project name makes the save toast a bar across the screen; toasts sit on top of the zoom bar
- OPEN   Escape does not leave stage fullscreen (may be the test browser)
- OPEN   800x600: x and Direction boxes cut off; first-run hint covers the app name; every block tooltip says the same thing
- OPEN   Mixed spelling (colour / color, Centre), Redo shortcut shown two ways; phone layout (390x844) broken; 'my variable' monitor on a new project

## Confusing
- OPEN   Number boxes never grow ("repeat 10000000000" reads "0000")
- OPEN   Clean Up throws a 2,000-block script 31,854 px to the right; the pulled-out OR tower is a 31,700 px needle
- OPEN   Load errors show raw junk for a bad project.json and "not a zip" for a damaged .sb3
- OPEN   No way to remove an extension; Fill on an empty canvas does nothing; Text tool throws text away when you click off
- OPEN   Folder name leaks into the sprite name ("Zed//G-Spark"); rename takes the sprite out of its folder
- OPEN   "Show as slider" unticks the variable checkbox; junk in number boxes snaps to 0
- KEEP   Hidden block list at start (owner's choice, he confirmed 25 Nov). Idea: text "Click a category to see blocks"
- OPEN   Same G logo on 6 buttons; two different Settings; 'Look like Scratch' and 'Power lines' toggles show little change; Tiles tab greyed out

## Episode 3
- FIXED  tan of 90 (v15.70.1); math answers rounded to 10 decimals (v15.70.1); log of 1000 = 3 (now 2.9999999999999996 like Scratch)
- FIXED  New project box pointed to "More > More file options" (now: G menu at the top left > Restore a previous version)
- FIXED  In a browser "New window" and "Host this project on Wi-Fi" did nothing and said nothing (now they say: desktop app only)

## Owner's own find, 25 Nov 23:31
- FIXED  Spark Studio (Advanced) opened with the music of the last session. Now it opens empty; a "Last session" button brings it back.
