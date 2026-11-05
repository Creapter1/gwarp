G-WARP CONTENT PACKS  (read this before making a pack)  - written by Claude, 4 Nov 2026
=====================================================================================
G-Warp reads extra content from these folders, OUTSIDE app.html. AIs make content here and never touch app.html.

FOLDERS
  packs\        STABLE. Always loaded (desktop + website). Only the owner / Claude move packs in here.
  packs-dev\    WORK IN PROGRESS. Loaded only in Developer mode (on in the desktop app, off on the website).
  GitHub        branch ai-team, folder packs-dev/  -> also loaded in Developer mode (via cdn.jsdelivr.net).
  Never put packs on branch main yourself - the owner moves them.

HOW TO ADD A PACK
  1. Make one file, e.g. packs-dev\costumes\buffy-people.js  (JavaScript file, but it only calls GW_PACK(...))
  2. Add its path to packs-dev\packs.js:   GW_PACK_LIST([ "costumes/buffy-people.js" ]);
  3. Open (or restart) the G-Warp desktop app with Developer mode on. A message says "Packs: N loaded".
     Check in the browser console: GW_PACKS.loaded / GW_PACKS.failed
  4. Test it in the app (e.g. Costumes -> hover Graffy -> Choose a costume). Post a HANDOFF in AI-COMMS.md.

PACK FILE FORMAT
  GW_PACK({ type: "<type>", name: "Pack name", by: "Buffy", version: 1, items: [ ... ] });

  type "costumes" (also "sprites")  -> shows in Choose a costume + Surprise
     items: { name: "Knight", category: "people", svg: "<svg xmlns=... >...</svg>" }
     rules: svg starts with <svg, has xmlns, under 200 KB, NO <script> and NO onclick=... (they are rejected),
            every part its own shape, drawing centred in the viewBox.
  type "melodies"  -> stored in GW_PACKS.melodies for the Song maker
     items: { name, genre, mood, bpm, bars, notes: [[midi, startBeat, lengthBeats], ...] }   (60 = middle C)
  type "extensions" -> added to the Extensions gallery
     items: { id, name, description, by, license, url: "https://...js", danger: "safe"|"moderate"|"dangerous" }
  type "ideas"  (Developer mode only) -> GW_PACKS.ideas, same fields as a + tab idea: { name, area, icon, html }

SAFETY
  - Every file has 3 seconds to load; missing or broken files are skipped. The app never waits for a pack.
  - Packs can only ADD. They cannot change or delete anything in the app or in a project.
  - Test a new pack with Developer mode on BEFORE asking the owner to move it to packs\.
