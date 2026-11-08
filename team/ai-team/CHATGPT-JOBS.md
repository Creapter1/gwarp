# ChatGPT – all job lists in ONE file
(Merged on 1 Nov 2026 from 14 files: the dated CHATGPT-*.txt plans and the chatgpt-jobs folder. The job generator script is in team/ai-team/tools/make_jobs.py.)

## Contents
- CHATGPT-ANIMATION-TODO-2026-10-26.txt
- CHATGPT-DEEP-RESEARCH-AIM-0.txt
- CHATGPT-MUSIC-ICONS-2026-10-26.txt
- CHATGPT-PROMPT-2026-10-26.txt
- CHATGPT-WEBSITE-REDESIGN-2026-10-26.txt
- chatgpt-jobs/HOW-TO-DO-EACH-JOB.md
- chatgpt-jobs/JOBS-ART.txt
- chatgpt-jobs/JOBS-BLOCKS.txt
- chatgpt-jobs/JOBS-EXTENSIONS.txt
- chatgpt-jobs/JOBS-RECIPES.txt
- chatgpt-jobs/JOBS-TESTING.txt
- chatgpt-jobs/JOBS-UI.txt
- chatgpt-jobs/README.md
- chatgpt-jobs/TOTAL.txt


---
## CHATGPT-ANIMATION-TODO-2026-10-26.txt

=====================================================================
 CHATGPT - ANIMATION TO-DO  (DO THIS FIRST)        written by Claude for the owner, 2026-10-26
 Owner: "focus on the animation ... exactly what icons (A, B, C) ... what it should have, what it should not have,
 how it's supposed to look, how it can make the character look better, the costume and the animation match the costumes
 and it's always centered just like Scratch, a liner so I always have a guidance, the preview for the layers ..."
=====================================================================

READ FIRST: team/ai-team/README.md (all rules: log gate, drop box, icon rules, proof words). This list only says WHAT to make.
WHERE YOUR WORK GOES: team/ai-team/shared/<YYYY-MM-DD>-chatgpt-<JOB ID>/  (NOTES.md + preview.html + icons/ + code/ + tests/).
ORDER: top to bottom. One job -> push -> AI-TEAM.txt line -> next job. [WEB] = no terminal needed, [TERMINAL] = needs Freebuff + QA kit.
YOU NEVER EDIT app.html. Code = a proposal module Claude plugs in. If you need a hook that doesn't exist, write it under
"Hooks Claude must add" in NOTES.md (name, what it returns) - don't hack around it.

---------------------------------------------------------------------
 WHAT G-WARP ALREADY HAS (Beta v15.54.0) - check it before you make anything, don't make it twice
---------------------------------------------------------------------
Costumes tab -> paint editor (vector + bitmap):
  Undo/Redo, Group/Ungroup, Forward/Backward/Front/Back (layer order), Fill/Outline colour, Copy/Paste/Delete, Flip H/V,
  Select, Rectangle, Circle, Line, Reshape*, Brush, Eraser*, Fill, Text, Convert to Bitmap, Onion skin, Show a grid,
  Snap shapes to the grid, Zoom. A rotation-centre mark is DRAWN (#gwpeCentre, GW_COSTUME_LOOK.centre) but you can't move it.
  (*) the buttons still say "coming soon" although v15.46.3 says vector Reshape + Eraser work -> job ANIM-0 checks this.
Costumes tab -> Flipbook (GW_FLIPBOOK): onion skin (before = violet, after = green, lined up by rotation centre), Play player
  (FPS, loop, which costumes). Nothing in the project changes.
Costumes tab -> Animation (GW_ANIM, "Beta", for everyone since v15.47.0): bones INSIDE vector costumes (Pivot Animator idea).
  Top: animation picker, Undo/Redo, + New, Rename, Delete, Costume picker, Rig | Animate, Make costumes, Close.
  Rig tools: Add bones, Attach shapes, Select, Attach automatically, Delete bone. Bones list (right) with colour dots.
  Frames strip: thumbnails, + Frame, < >, delete, In-between, Smooth x2, Glide, Play, FPS, Onion skin, Loop.
  Make costumes = every frame becomes a normal vector costume ("walk 1", "walk 2" ...) so Scratch can play it.
  Exports: GW_ANIM = { open, close, solve, deltas, applyPose, frameSvg, partPaths, parseTransform, makeCostumes, newAnim,
           undo, redo, vectorCostumes, tween, smooth, glide, mix, state }
Animation blocks (GW_ANIM_BLOCKS, Developer mode only - unfinished): switch to animation / play animation from frame /
  play animation over and over / stop animation.
G mascot sprite (GW_MASCOT, Developer mode only - unfinished): walk + wave + hello animations.
Gemini's icons already in the app (team/ai-team/archive/gemini/icons-animation, her picks merged v15.50.3): bitmap-select, bones,
  flip-horizontal, flip-vertical, flipbook-play, group, in-between, make-costumes, onion, rotate-handle, smooth-x2, ungroup.
Gemini's animated sprites (flipbook-sprites) and bone-ready characters (rig-characters) are in Choose a Sprite.
Old reviews to reuse (don't redo them): team/chatgpt/CHATGPT-NOTES.md › UX-costume-animation.txt (your 10 ranked fixes), team/chatgpt/CHATGPT-NOTES.md › REVIEW-costume-animation.txt,
  team/ai-team/ASSIGNMENTS-ANIMATION-2026-10-18.txt, team/ai-team/archive/grok/ANIM-FIXTURES.json (+ team/claude/tests/test_grok_anim.js).
Known owner bugs from the Smash remix (fixed for that project, must never happen in the app): costumes made by an animation
  were NOT centred, the shield was out of place, punch/kick frames jumped out of place and "glided across the room".

---------------------------------------------------------------------
 THE LOOK (applies to every job)
---------------------------------------------------------------------
MUST: G-Warp dark look (#0b0b14 / #141425 panels, violet #8b5cf6 selected, green #4ade80 = "go / playing / after",
  yellow #facc15 = warnings). Same font + button style as the Animation tab today. Works at 1280x720 and on a 1024 px wide tablet.
MUST: every new button has an icon + a tooltip that says what it does in kid words ("Put the middle of the costume here").
MUST: everything can be undone (one Ctrl+Z per action). Nothing is saved into the costume art unless the user pressed "Make costumes"
  or drew it. Guides, onion skin, centre marks, layer highlights are OVERLAYS - never saved into the SVG.
MUST: projects still open + play right in Scratch / TurboWarp (extra G-Warp data in the project JSON is ignored by Scratch).
MUST NOT: Scratch's look or icons, the cat, Pivot Animator's art, Adobe/Toon Boom icons, any brand. No AI watermark.
MUST NOT: new windows/popups on top of popups. Max one panel open at a time on the right side.
MUST NOT: change how existing buttons work. New things are ADDED; old ones stay where they are.
FIX FIRST (seen in the screenshot 2026-10-26): the frame thumbnails have a WHITE background - they must use the dark checker
  like the canvas, so the frames look like the drawing.

---------------------------------------------------------------------
 JOBS
---------------------------------------------------------------------

ANIM-0 [TERMINAL] CHECK WHAT'S THERE (first, ~30 min)
  Run smoke-app.js. Open the Animation tab with the G mascot (Developer mode) and with one of Gemini's rig-characters.
  Make an 8-frame walk, Make costumes, save .sb3, open it again, run it in scratch-vm (run-in-scratch.js).
  Report (one file, team/chatgpt/ANIM-0-CHECK.md): what works, what breaks (steps + output), and these exact checks:
   a) Do the made costumes keep the SAME rotation centre? Measure with costume-bounds.js: the body's middle may not move more
      than 1 px between frames unless the pose moves it on purpose.
   b) Do Reshape / Eraser work although they say "coming soon"? (bug report either way)
   c) Does the global Stop stop Flipbook Play, Animation Play and the Animation blocks? (UX review #3)
   d) Save + reopen keeps frames, bones, attachments, FPS, loop? (UX review #1)
  Evidence: TESTED in G-Warp / scratch-vm with real output. This list is the base for all jobs below.

ANIM-I1 [WEB] ICON AUDIT - "the same thing must have the same icon" (~40 min)
  Make a table (team/chatgpt/ANIM-I1-ICON-AUDIT.md + a preview.html that shows them): every icon in Costumes, Flipbook and the
  Animation tab: button -> which icon (Font Awesome name or Gemini SVG) -> does the SAME action use a DIFFERENT icon somewhere else?
  (e.g. Undo in Code vs Costumes vs Animation, Play in Flipbook vs Animation vs Song maker, Delete, Onion skin, Flip.)
  Output = a list of "make these match: X uses A here and B there -> use B everywhere". Don't fix the app; Claude does that.

ANIM-I2 [WEB] NEW ICONS - 3 options each (A, B, C) - TAKE YOUR TIME, make them beautiful
  One drop-box folder: team/ai-team/shared/<date>-chatgpt-ANIM-I2/ with icons/<name>-A|B|C.svg + preview.html (all icons, dark +
  light, at 16 / 24 / 32 px, next to the existing icons so you can see they are one family). Rules: team/ai-team/README.md §7.
  Make these (the jobs below use them):
   Centre:   set-centre (target you click to put the middle), centre-costume (shape jumps to the middle),
             centre-all-frames (several frames lined up on one cross), drift-warning (frames jumping out of place)
   Guides:   guide-lines (the "liner": a ruler with a line pulled out), ground-line (feet on a line), ruler, snap-to-guide,
             lock-guides
   Layers:   layers-panel (stacked sheets), layer-visible (eye) + layer-hidden (eye shut), layer-lock + unlock,
             layer-behind-bone (part goes behind the body for this frame)
   Motion:   ease-in-out (curve), squash-stretch, follow-through (tail/hair follows later), mirror-pose (swap left/right),
             copy-pose, paste-pose, hold-frame (this frame lasts longer), keyframe (diamond), timeline
   Poses:    pose-library (book of poses), walk, run, jump, idle (breathing), punch, kick, wave, hurt, win  (small figure
             icons; a simple G-Warp bean/blob figure, NOT a stick man from another app and NOT the Scratch cat)
   Preview:  preview-on-stage (mini stage with a figure), preview-size (real size), export-gif, export-sheet (sprite sheet)
  MUST: same stroke/corners as the existing Gemini animation icons; readable at 16 px; no letters. MUST NOT: copy any app's icons.
  Pick your favourite per icon in NOTES.md ("My pick") - the owner decides.

ANIM-C1 [TERMINAL] ALWAYS CENTRED, LIKE SCRATCH  (owner's top worry)
  Goal: a costume's rotation centre is where the user expects (the middle of the body), and every frame of one animation lines up,
  in G-Warp AND in Scratch. What Scratch does: the paint editor shows the costume centre as a fixed cross in the middle of the
  canvas; art is drawn around it; sb3 saves rotationCenterX/Y; SVG rotation centre is measured from the SVG's own (0,0) - G-Warp
  v15.51.0 already fixed that offset, keep it.
  Proposal module (code/anim-centre.js) + icons from ANIM-I2:
   1. "Set centre" tool in the paint editor: click = the rotation centre goes there (the #gwpeCentre mark moves). Undoable.
   2. "Centre this costume": moves the drawing so the middle of its bounding box sits on the centre (option: "feet on the
      centre line" for characters = centre x = middle, centre y = a set height above the lowest point).
   3. "Line up all frames" (Animation tab + costume list right-click on a frame group like "walk 1..8"): every frame gets the
      SAME centre, taken from the first frame's root joint (the orange base). Never moves the art differently per frame.
   4. Drift warning: after Make costumes, if any frame's body middle moves > 2 px from frame 1 without the base joint moving,
      show a small yellow warning "frame 5 jumps 14 px - line them up?" with a one-click fix.
   5. Make costumes must ALWAYS write the same canvas size + the same rotation centre for all frames (check GW_ANIM.makeCostumes).
  Tests (tests/anim-centre.test.js, QA kit): make walk + punch (8 frames each) -> costume-bounds.js shows centres equal (<= 1 px);
  export .sb3 -> run-in-scratch.js -> the sprite's x/y never changes while only costumes switch (the "glide across the room" bug).

ANIM-G1 [WEB then TERMINAL] THE "LINER" - GUIDE LINES  (owner: "so I can always have a guidance")
  Proposal module (code/anim-guides.js):
   - Rulers on the top + left edge of the paint editor and the Animation canvas (in stage pixels, 0 = the costume centre).
   - Drag from a ruler = a guide line (violet, dashed). Drag it back to the ruler = gone. Double-click = type an exact number.
   - Built-in guides (switch each on/off): centre cross, GROUND LINE (where the feet go, default = lowest point of frame 1),
     head line, a box the size of the stage (480x360) so you see how big the sprite will look.
   - Shapes and bone ends SNAP to guides (uses the existing "Snap" button; a small toggle for "snap to guides").
   - Guides are per sprite, saved in the project as G-Warp data (not in the SVG), shown in the paint editor, Flipbook and Animation
     tab at the same place. Lock guides button.
  MUST NOT: draw guides into the costume; slow down drawing (test 200 shapes still smooth).

ANIM-L1 [WEB then TERMINAL] LAYERS PANEL WITH PREVIEWS  (owner: "the preview for the layers")
  Proposal module (code/anim-layers.js):
   - A Layers panel (right side, closable) in the vector paint editor AND the Animation tab: one row per shape/group, top = front.
     Each row: small thumbnail preview of just that layer, name (double-click rename), eye (hide while editing - not saved as
     hidden unless the user wants), lock, and in the Animation tab the colour dot of the bone it's attached to.
   - Hover a row = that layer glows on the canvas; click = select it; drag rows = change order (uses the same order as
     Forward/Backward/Front/Back so both stay in sync).
   - Animation tab: "Layer order for this frame" - e.g. the far arm goes BEHIND the body when the character turns. Stored per
     frame, applied by Make costumes. (This is a big part of what makes animations look good.)
  Test: 12-layer character, reorder, hide, rename, Make costumes -> the costumes have the right order; undo works for each step.

ANIM-P1 [WEB] MAKE THE CHARACTER LOOK BETTER - motion tools  (spec first, then code)
  Write team/chatgpt/ANIM-P1-SPEC.md (1-2 pages, pictures welcome) then the proposal:
   1. EASING: In-between / Glide use ease-in-out by default (slow-fast-slow) with a small curve picker (Linear, Ease, Bounce,
      Snap). Today it is linear - that is why moves look robotic.
   2. HOLD FRAMES: a frame can last 1-4 ticks (number badge on the thumbnail). Make costumes repeats that costume, or the
      Animation blocks wait longer (choose one, explain in NOTES).
   3. SQUASH & STRETCH per bone (scale along the bone) for jumps/landings, limited to 60-140 %.
   4. FOLLOW-THROUGH: optional for a chain (tail, hair, cape): it copies the parent's turn one or two frames later, smaller.
   5. MIRROR POSE (swap left/right limbs), COPY / PASTE POSE between frames and animations.
   6. POSE LIBRARY: ready poses for any rig with standard bone names (body, head, left/right arm, left/right leg): idle (breath),
      walk (8), run (6), jump (anticipation, take-off, up, top, fall, land), punch, kick, wave, hurt, win. Applying a pose works
      on the user's own character, not a stock figure. Data = JSON of bone angles (code/poses.json) - no art.
   7. Optional nice touches (only if 1-6 are done): ground shadow under the feet that follows the base; smear/blur frame helper.
  MUST NOT: replace the current In-between / Smooth x2 / Glide - add the curve as an option; default may change only if the owner OKs it.

ANIM-T1 [WEB] FRAMES STRIP + PREVIEW
   - Thumbnails: dark checker background (fix), big frame number, current frame obvious (UX review #2), hold-frame badge,
     drag to reorder, Shift-click to select several (copy / delete / mirror several).
   - Keyboard: , and . = previous/next frame, Space only when no text box has focus (UX review #9).
   - PREVIEW ON STAGE: a small window that plays the animation at the sprite's REAL size, direction and position, with the current
     backdrop, so you see how it will look in the game. Same window for Flipbook and Animation tab, one Stop for all.
   - Onion skin settings: how many frames before/after (1-3), strength - same as Flipbook's, same colours (violet before, green after).

ANIM-B1 [TERMINAL] WHAT'S MISSING BEFORE ANIMATION BLOCKS + MASCOT CAN GO TO EVERYONE
  They are Developer-mode-only and marked unfinished. Test them (QA kit) and write team/chatgpt/ANIM-B1-READY.md:
  what fails, what's missing vs the owner's plan ("switch to animation [ ]", "play animation [ ] from costume [ ]"), and the
  exact acceptance tests that must pass. Also: how they save in .sb3 so Scratch still plays the costumes (G-Warp blocks must
  have a Scratch fallback - report what happens today when the project opens in Scratch/TurboWarp).
  Claude decides + integrates; you only report and propose fixes.

ANIM-D1 [WEB] HELP + SAMPLES
  - A kid-friendly 1-page guide "Make your first animation in G-Warp" (docs-ready HTML in the drop box, screenshots allowed,
    G-Warp look): draw -> centre -> guide line -> bones -> 8-frame walk -> ease -> preview -> Make costumes -> code it.
  - 3 small sample projects made by you with YOUR OWN art (a bouncing ball with squash & stretch, a walking bean character,
    a punch combo) in team/chatgpt/out/ (git-ignored) + their build script in the drop box, checked with check-sb3.js (no AI marks).

---------------------------------------------------------------------
 WHEN YOU ARE DONE WITH A JOB
---------------------------------------------------------------------
  push -> one line in AI-TEAM.txt -> a line in MERGE-QUEUE.txt under "WAITING FOR CLAUDE" -> next job.
  Don't wait for Claude between jobs. If a job needs the owner's pick (icons), push it and go on.
  Next list after this one: team/ai-team/ideas/GWARP-AI-MODEL-2026-10-26.md (the in-app AI - start with AIM-0, the DEEP RESEARCH on running
  the model inside the browser; the owner may also ask you to do AIM-0 before the animation list - then do that), then AI-TEAM-TODO.md (the one to-do list).


---
## CHATGPT-DEEP-RESEARCH-AIM-0.txt

=====================================================================
 CHATGPT DEEP RESEARCH PROMPT - AIM-0: G-Warp's AI running INSIDE the app        written by Claude for the owner, 2026-10-26
 Paste everything between the lines into ChatGPT (Deep Research mode if you have it). Then push the answer as
 team/chatgpt/AIM-0-IN-BROWSER-AI-RESEARCH.md (rules: team/ai-team/README.md, log gate first).
=====================================================================
-----------------------------------------------------------------------------------------------
You are ChatGPT on the G-Warp team. G-Warp is a free Scratch-style block-coding app for kids. It is ONE big HTML file (app.html,
~2.6 MB, no build step) hosted on GitHub Pages (creapter1.github.io/gwarp) and also opened straight from disk (file://).
Repo: Creapter1/gwarp. Read team/ai-team/README.md (rules) and team/ai-team/ideas/GWARP-AI-MODEL-2026-10-26.md (the plan, section 0) first.

GOAL: an AI helper that runs INSIDE G-Warp, in the browser, with NO server, NO Ollama, NO install: G-Warp downloads a small language
model once (about 0.2-1 GB, the weakest that still works) and runs it on the user's computer (WebGPU, or CPU as plan B). It only acts
inside G-Warp, using a fixed list of JSON commands (add sprite, add script, set input, make variable, run, stop, undo ...), with a
preview and the user's OK. The model files must NOT be stored in our GitHub repo (GitHub: 100 MB per file, the site should stay small).
THE BIG PROBLEM: a small model knows almost nothing about Scratch or G-Warp. Find the best way to give it that knowledge.

RESEARCH (cite a source link for EVERY fact, prefer official docs / GitHub repos / model cards; say when something is uncertain or old):
0. ALREADY-INSTALLED MODELS FIRST (owner's wish: users should not have to download anything): Chrome's built-in AI (Prompt API /
   Gemini Nano) and any similar built-in browser or OS model (Edge? Windows? macOS?). Which versions/computers have it, how a web page
   uses it, JSON output, speed, limits, terms for a free kids' app. Also: a G-Warp desktop installer that ships the model inside.
0b. FREE OUTSIDE ASSISTANTS (owner: people use free Gemini in Chrome / Copilot in Edge on G-Warp, no paid plan): what each can do for
   FREE today (read the tab? see pictures? click/type?), age limits, countries, and the best way for a web app to be read by them
   (page text, accessibility labels, a plain-text "AI view"). Design the "Paste from AI" format (gwarp: command block) and a short
   "teach any chatbot G-Warp" prompt; test it on free Gemini, Copilot and ChatGPT with the same 3 requests and report which got it right.
1. ENGINES that run an LLM in a web page in 2026: WebLLM (MLC), Transformers.js (ONNX Runtime Web), wllama (llama.cpp WASM),
   Chrome built-in AI (Prompt API / Gemini Nano), LiteRT-LM / MediaPipe, and anything newer. For each: browsers + GPUs supported,
   speed on a normal laptop, JSON-schema / grammar-constrained output, Web Worker support, licence, can it load from ONE html file
   with a <script> from a CDN (cdn.jsdelivr.net / unpkg), does it work from file:// and from github.io.
2. MODELS up to ~1.1 GB download that follow instructions and output JSON well: e.g. SmolLM2 (135M/360M/1.7B), Qwen2.5/Qwen3 0.5-1.7B,
   Llama 3.2 1B, Gemma 3 1B, Phi small models, anything better. For each: download size per engine, memory needed, licence (is it OK
   in a free app for kids? check Llama / Gemma terms carefully), and how good it is at following a JSON schema.
3. HOSTING the model files: Hugging Face Hub (free? limits? CORS? terms for public download from a website), GitHub Releases
   (CORS for browser fetch?), jsDelivr / other CDNs (size limits), Cloudflare R2 free tier. Which one works from github.io AND file://.
   Browser caching (Cache API, IndexedDB, OPFS): storage limits, how the user deletes it.
4. KNOWLEDGE - compare, with cost / time / quality:
   a) everything in the prompt (a short "snapshot" of the project + the 3 best recipes + only the needed block list), retrieval with a
      tiny embedding model in the browser;
   b) the model only PICKS a recipe and FILLS IN values (classification + slot filling) - G-Warp builds the blocks;
   c) FINE-TUNING a LoRA on a 0.5-1B model with a few thousand G-Warp examples (made from our recipes and checked by running them),
      on a free GPU (Colab / Kaggle): steps, time, how many examples, how to convert the result for WebLLM / Transformers.js, how to
      publish it on Hugging Face; licence rules for training data (can examples made by another AI be used? check the terms).
   Which mix is best for the WEAKEST model that still helps kids?
5. KIDS' SAFETY + PRIVACY: content safety for a small model (filters / refusal training), asking before a big download, nothing sent
   off the computer, no personal data, what happens on phones / old PCs without WebGPU (plan B).

DELIVER (simple English, the owner reads on a phone):
- A one-screen TABLE first: the recommended engine, model, hosting, knowledge method and plan B, with a one-line reason each.
- Then details per question, with sources. Max ~6 pages. No filler.
- Also in the plan: the AI chat is kept while the app is open; option "Save AI chat in this project" (size cap + Clear button).
- A PROOF PAGE (if Chrome's built-in AI works, test it FIRST in the page, then the downloaded model): team/ai-team/shared/<date>-chatgpt-AIM-0/poc.html (one file, engine from a CDN, the smallest good model) that asks 3
  G-Warp requests ("make the player jump when space is pressed", "add a score that goes up when I touch a coin",
  "make it rain") in JSON-schema mode and shows the commands. Write in NOTES.md exactly what the owner clicks to test it in Chrome.
  Say TESTED only if it really ran; otherwise NOT-TESTED.
- A list of the open questions only the owner can answer (e.g. "make a Hugging Face account for the model?").
-----------------------------------------------------------------------------------------------


---
## CHATGPT-MUSIC-ICONS-2026-10-26.txt

CHATGPT - MUSIC MAKER ICONS (small job, do it after the current animation job)          written by Claude for the owner, 2026-10-26
Rules: team/ai-team/README.md section 7 (A/B/C, 24x24 viewBox, G-Warp colours, currentColor, no letters, < 4 KB, no AI marks).
Drop box: team/ai-team/shared/<date>-chatgpt-MUS-I1/ (icons/<name>-A|B|C.svg + preview.html on dark + light, at 16/24/32 px, NEXT TO the
Gemini music icons already in the app so they look like one family + NOTES.md with "My pick").
Icons:
  clear-all            remove every block from the Song maker grid (a grid being swept / emptied - not a trash can, that is "delete")
  empty-song           start from an empty song
  level-1 .. level-4   the 4 strengths of one square: light, medium, hard, extreme (same shape, getting fuller/brighter; level-4 a bit electric)
  create-bass          make your own bass line (low wave / thick string)
  create-beat          make your own drum beat (step pads)
  create-chords        make your own chords (stacked notes)
  my-part              "this row plays something you made" badge (small star/pencil on a note)
Also: one preview showing a Song maker row with squares at levels 0-4 in each stem colour (melody #?, use the app's stem colours:
  grep "STEMS" in app.html) so the owner sees how the brightness steps look. Evidence: NOT-TESTED in the app is fine.


---
## CHATGPT-PROMPT-2026-10-26.txt

=====================================================================
 CHATGPT - START PROMPT (2026-10-26)          written by Claude Opus for the owner
 Copy ONE of the two prompts below into ChatGPT. Use A on chatgpt.com, B inside Freebuff (terminal on the owner's PC).
=====================================================================

------------------------------- PROMPT A: chatgpt.com (no terminal) -------------------------------
You are ChatGPT on the G-Warp team (repo Creapter1/gwarp on GitHub; G-Warp is a free Scratch-style block-coding app for kids).
The team is now only you and Claude Opus (plus a small helper, Claude Haiku). Gemini, Grok and DeepSeek are retired, so YOU own
all their open jobs. The owner says: do not hold back, work non-stop, but every claim needs proof.

FIRST (no exceptions, before any other work):
1. Check you can READ and WRITE the repo Creapter1/gwarp. If you can't write, say so in one line and hand in every file as a code
   block with its full path on top.
2. Read, in this order: team/ai-team/README.md (ALL the rules), AI-TEAM.txt (last 30 lines), team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt (last entry),
   AI-TEAM-TODO.md, team/ai-team/tools/qa-kit/README.md.
3. Log gate: add a session-start entry to team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt (template: team/ai-team/AI-CHAT-LOG-TEMPLATE.txt), commit, read it back.

THEN work down, in this order: team/ai-team/CHATGPT-JOBS.md › CHATGPT-ANIMATION-TODO-2026-10-26.txt (FIRST - owner's focus), then the small job team/ai-team/CHATGPT-JOBS.md › CHATGPT-MUSIC-ICONS-2026-10-26.txt, team/ai-team/ideas/GWARP-AI-MODEL-2026-10-26.md
(jobs AIM-1..7), then AI-TEAM-TODO.md, then the JOB BANK team/ai-team/CHATGPT-JOBS.md › README.md (2,474 jobs -
you will never run out of work). Finished art/code goes in the drop box team/ai-team/shared/ (README.md section 7). On chatgpt.com you can't run the QA kit (no terminal), so do the jobs marked
[WEB] or [ANY] first: research, reviews, specs, test plans, docs, SVG art, proposals. Jobs marked [TERMINAL] wait for Freebuff.

NO QUESTIONS, NEVER STOP (owner, 2026-10-26, NON-NEGOTIABLE): you have ONE session (~50 min) and nobody will answer you.
  - NEVER ask the owner (or anyone) a question and NEVER wait for an answer.
  - A choice between options (A or B, this way or that way)? Do BOTH (or all), side by side, and write one line about it. Or just do it.
  - Something unclear? Pick the most reasonable reading, write it in ONE line in your log, and do it.
  - Blocked (needs a check, a login, the owner, or a tool failed twice)? Add it to your to-do list as "BLOCKED: <why>" and go to the
    NEXT task at once. Never write "I cannot continue, so I stop here".
  - Keep a to-do list for the session and keep working until the time is up: when it is empty, take the next job from your lane /
    job file. Use ALL of the ~50 minutes; start the closeout at minute 45. Don't end early.
RULES (short version - the full list is in team/ai-team/README.md):
- Never edit app.html or index.html. Your files go in team/chatgpt/ (code proposals: team/chatgpt/proposals/<job id>/). Claude integrates.
- Never edit another AI's folder. team/ai-team/archive/gemini/, team/ai-team/archive/grok/, team/ai-team/archive/deepseek/ are read-only archives you can learn from.
- Push after EVERY finished job, open it on GitHub to check it is there, add one line to AI-TEAM.txt:
  <UTC time> | DONE | ChatGPT | <job id> | <files> | <evidence: TESTED in G-Warp / TESTED in scratch-vm / NOT-TESTED>
- G-Warp's own look, no Scratch art / cats / brands, no AI watermark in anything that ships, no secrets in files.
- When something would REPLACE a system we already have (music, physics, UI), make it a side-by-side option for the owner. Never push over.
- Plain, short English for the owner (he reads on a phone, English is his second language). No long essays.
- Before your time runs out: push everything + closeout entry in team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt + read it back.

------------------------------- PROMPT B: Freebuff (terminal on the owner's PC, ~50 min) -------------------------------
You are ChatGPT on the G-Warp team, running inside Freebuff in the G-Warp repo folder on the owner's computer.
You have a terminal: you can run node, npm, git and the QA kit. The session ends after about 50 minutes, so:
- minute 0-5: setup + log gate, minute 5-45: jobs (push after each one), minute 45-50: closeout. Never end with unpushed work.

SETUP (first session on this computer only - skip the parts already done):
  git pull
  cd team/ai-team/tools/qa-kit && npm install && npx playwright install chromium && cd ../../..
  node team/ai-team/tools/qa-kit/smoke-app.js          -> must say ALL PASS. If not: that IS your first bug report.

FIRST every session: read team/ai-team/README.md (all rules), AI-TEAM.txt (last 30 lines), team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt (last entry),
AI-TEAM-TODO.md, team/ai-team/tools/qa-kit/README.md. Then the log gate (session-start entry, commit, push, read back).

THEN the same lists in the same order (animation first). Inside a list do [TERMINAL] jobs first (they need the QA kit), then [ANY]/[WEB]. Paste the kit's real output into every report.

RULES: same as prompt A, plus:
- Never run `git push --force`, never delete branches or other AIs' files, never commit node_modules or anything in qa-kit/offline/.
- Never put a Scratch project that isn't ours into the repo (remixes go to the owner only: team/chatgpt/out/ is git-ignored for that).
- Don't install anything outside team/ai-team/tools/qa-kit without asking the owner.
- If a kit command fails twice the same way, stop retrying: write the error in your report and move to the next job.


---
## CHATGPT-WEBSITE-REDESIGN-2026-10-26.txt

=====================================================================
 CHATGPT - WEBSITE REDESIGN (lane L9-WEB)          written by Claude for the owner, 2026-10-26
 Owner, word for word: "not just the letters, the documentation ... I mean the entire thing. We need to make it a bit more appealing
 ... the design and everything ... keep what we have, make it better ... I don't want a super website that you just gotta scroll
 down in order to get some future nice little stuff ... very appealing, to the point it's almost to the point of touch ... extra
 animation, because we definitely need them ... it needs to wait for your [Claude's] approval or my approval."
=====================================================================
Read first: team/ai-team/README.md (all rules; log gate!). Your lane folder: team/chatgpt/lanes/L9-WEB/ (log, reports/, bugs/, tests/).
Do the phases IN ORDER. Each phase ends with: push -> closeout line in your log -> next phase (except where it says STOP).

---------------------------------------------------------------------
 0. HARD RULES (breaking one = the work can't go live)
---------------------------------------------------------------------
R1  NEVER edit the live site files (index.html, docs/**, app.html). Build the new site as a COPY in the drop box:
      team/ai-team/shared/<date>-chatgpt-WEB/site/            <- same paths as the real site:
        site/index.html, site/docs/<same 16 page names>.html, site/docs/tutorials/<same 8 names>.html + index.html,
        site/assets/ (css, js, img, fonts if self-hosted)
    Claude copies it over the real site ONLY after the owner says "go". Every page must work when site/ is served as the root.
    For local testing you may COPY app.html into site/ - but never commit that copy (add site/app.html to .gitignore in your folder).
R2  KEEP EVERY URL: all 16 docs pages, all 8 tutorials, docs/images/*, docs/screens/*, and these anchors (other pages link to them):
      #get-started #flow #music #ext #whats-new #more #docs (landing) and docs/costumes.html#costume-tabs, #paint-new,
      docs/blocks.html#bug-hunter, #editing-scripts, #power-lines, docs/start.html#stage-backdrops, docs/scratch.html#look-like-scratch,
      docs/troubleshoot.html#recovery, #clone-safety.  (Run a link check - phase W3 - to find any others.)
R3  KEEP THE CONTENT: every fact/section on today's pages survives (moved, shortened, merged is fine; lost is not). Outdated facts get
    FIXED (see section 2), not deleted.
R4  TRUE ONLY: no invented numbers, users, downloads, stars, reviews, testimonials, quotes, awards or "trusted by". Numbers that are
    used must be real and checked in app.html (e.g. 184 gallery extensions = the gw10GalleryData list; 176 blocks = team/ai-team/gwrap-blocks.json).
    Say "Beta". Don't claim Scratch/TurboWarp/PenguinMod will never have a feature.
R5  THEIRS IS THEIRS: no Scratch cat, no Scratch / TurboWarp / PenguinMod logos or art, no copied page designs. Mention them in TEXT with
    links, plus one line "G-Warp is an independent project, not made by or affiliated with Scratch, TurboWarp or PenguinMod."
    Keep docs/credits.html complete (every extension creator + licence). No famous characters, no brands.
R6  NO AI WATERMARK in anything shown on the site ("made by AI", AI names in pictures). Credits go in NOTES.md / credits page as normal.
R7  KIDS + PRIVACY: no analytics, no trackers, no cookies, no forms that collect data, no newsletter pop-ups, no third-party embeds
    (YouTube, social widgets), no autoplay sound. Keep the safety + parents pages. The only outside request allowed: Google Fonts
    (already used: Inter) - or self-host the fonts (better, option in W1).
R8  NO BIG FRAMEWORKS: plain HTML + CSS + small vanilla JS files. No React/Vue/Tailwind build, no npm build step needed to view it.
    One shared CSS (site/assets/site.css) + one shared JS (site/assets/site.js) + small per-demo JS files are fine.
R9  The app link and words stay the owner's: primary button "Create your first code" -> app.html, second button "Use your project"
    -> app.html#open. Keep the hero line "Block coding, with electricity." (you may add a short second line).
R10 Approval: nothing goes live without the owner's "go" (Claude does the swap). The owner picks the direction later - you never wait for it.

---------------------------------------------------------------------
 1. WHAT EXISTS TODAY (Claude checked, 2026-10-26)
---------------------------------------------------------------------
- index.html: 596 KB, of which ~553 KB are 7 JPEG screenshots embedded as data: URLs (slow!). 0 <script> tags. 2 @keyframes.
  Has prefers-reduced-motion. Sections (ids): get-started, flow, music, ext, whats-new, more, docs.
  Headings: "Block coding, with electricity." / Choose your next step / Make G-Spark move in 3 blocks / A song maker built in /
  Extension library and safety labels / Beta v15.49.0 (OUTDATED) / Same blocks, its own style / About the project / Try the G-Warp Beta.
  Colours (keep these as the design tokens): --bg #0b0b14, --panel #141425, --panel2 #1b1b31, --line #2a2a48, --text #ececf6,
  --muted #a3a3c2, --violet #8b5cf6, --violet2 #a855f7, --wire #4ade80, --yellow #facc15, --pink #ec4899. Font: Inter (Google Fonts).
- docs/: 16 pages (index, start, blocks, costumes, animation, sounds, extensions, safety, credits, scratch, troubleshoot, shortcuts,
  changelog, team, glossary, parents), EACH with its own inline <style> (no shared CSS). docs/tutorials/: index + 8 tutorials
  (01-g-spark-walk ... 08-pen-drawing-app). docs/images/: 4 SVG diagrams. docs/screens/: 11 PNG screenshots (old version).
- Mascot + logo (use the REAL ones, don't redraw them): G-Spark = window.GW_DEFAULT_MASCOT in app.html
  (grep -n "window.GW_DEFAULT_MASCOT =" app.html; the SVG string is defined just above it). G-Spark animation frames:
  team/ai-team/archive/gemini/flipbook-sprites/gspark/frame1-3.svg; poses: team/ai-team/archive/gemini/GM5-A/B/C.svg (credit "G-Spark poses: Gemini").
  The app's logo: the violet "G" tile at the top-left of app.html.

---------------------------------------------------------------------
 2. FACTS THE SITE MUST SHOW (app is now Beta v15.56.0) - check each one in app.html before writing it
---------------------------------------------------------------------
  v15.50.x  missing blocks added (< , contains, math functions, "when stage clicked"), Scratch comments import/export, .sb3 fidelity
  v15.51.0  SVG costumes keep their exact place (rotation centres like Scratch)
  v15.52.0  new music icons in Sounds / Song maker
  v15.53.0  Song maker "Tune": Mix (old + new tunes, default) / Classic / Fresh; G-Warp's own "Calm motion" switch (More -> Settings);
            running-block dots + electricity always visible (grep -n 'id="gw-v1553-motion"' app.html)
  v15.54.0  Create Melody in Sounds -> Instruments (8 melody ideas, any instrument, "Use in Song maker" = Tune: My melody)
            (grep -n 'id="gw-v1554-create-melody"' app.html). Its planned name is "Spark Studio" - call it "Create Melody (Spark Studio)".
  v15.55.0  G-Spark AI bar: the G button next to the zoom buttons in the code area; type what you want, Enter builds it at once, Undo
            (grep -n 'id="gw-v1555-gspark-bar"' app.html). It is an OFFLINE helper with built-in recipes - not a chatbot. Say so.
  v15.56.0  blocks made by G-Spark AI have PURPLE electricity, your own blocks GREEN (grep -n 'id="gw-v1556-ai-purple"' app.html).
  Also true: Animation tab (bones inside vector costumes, frames, Make costumes) + Flipbook + onion skin; 184 gallery extensions with
  Safe / Moderate / Dangerous labels and credits; opens and saves .sb3 that still work in Scratch/TurboWarp; no accounts.
  Coming (say "planned", never "available"): desktop .exe, G-Warp's own AI model in the browser, Tab Plus. Changelog: only versions
  that have a "RELEASED" line in AI-TEAM.txt.

---------------------------------------------------------------------
 3. THE DESIGN (what "appealing, almost touchable, not a long scroll" means here)
---------------------------------------------------------------------
3.1 FIRST SCREEN SHOWS THE BEST STUFF (1440x900 AND a phone 390x844 - no scrolling needed to see it):
    - top bar: G logo, Docs, Tutorials, Safety, "Calm motion" toggle, button "Create your first code".
    - hero left: "Block coding, with electricity." + one short line + the 2 buttons (R9) + a tiny line "Free · Beta v15.56.0 · no account".
    - hero right: a LIVE DEMO (pure HTML/CSS/SVG/JS, NOT an iframe of the app): 3-4 G-Warp-looking blocks snap together one by one,
      the C-block wire lights up green and electricity flows, and G-Spark walks on a tiny stage. Loop every ~8 s; pause on hover;
      stops in Calm motion (shows the finished state instead).
    - under the hero, still on the first screen: a row of 5-6 FEATURE TILES (Blocks, Song maker, Animation, G-Spark AI, Extensions,
      Works with Scratch files) that react to hover/tap (lift + glow) and open their demo in place.
3.2 INSTEAD OF A LONG PAGE: an interactive "control panel" (bento grid) - each tile is a small thing you can TOUCH:
    a) Blocks tile: drag 3 blocks into place; when they snap, G-Spark moves (pointer + touch + keyboard: Tab to a block, Enter to place).
    b) Song maker tile: a 6x4 grid of squares like the app; click/tap cycles off -> light -> medium -> hard -> extreme (brighter each
       step, like the owner's plan); a Play button plays a short pattern with WebAudio ONLY after a click (no autoplay), mute button.
    c) Animation tile: G-Spark's real walk frames as a flipbook; buttons Play / Onion skin (shows the frame before in violet, after in green).
    d) G-Spark AI tile: a bar like the app's with 3 ready examples ("make it jump", "add a score", "make it rain"); pressing one
       "builds" blocks with PURPLE electricity, then a user block snaps in GREEN - this tells the purple/green story. Label: "demo".
    e) Extensions tile: chips Safe / Moderate / Dangerous filter a short list of real extension names (+ "184 in the app") with credits.
    f) "Works with your Scratch files" tile: a simple animation of a .sb3 file going in and out of G-Warp (+ "opens in Scratch/TurboWarp").
    g) Safety tile (for parents): no accounts, under-13 parent OK, no ads, no tracking - link to parents/safety pages.
    Each tile has "More" -> a drawer/modal with the details and the docs link, so nothing important needs a long scroll.
    Below the grid only: what's new (short timeline of the last 5 versions), about the project, footer. That's the whole landing page.
3.3 MOTION LANGUAGE (lots of life, but smooth and kind):
    - Electricity = the brand: SVG wires with stroke-dasharray + animated stroke-dashoffset; GREEN = you, PURPLE = G-Spark AI.
    - Buttons: small "magnetic" pull toward the pointer (max 6 px) + a spark burst on click.
    - Tiles: 3D tilt toward the pointer (max 6 deg) with a soft glare; lift + glow on hover; press-down on tap.
    - Section reveal: fade-up 12 px, <= 400 ms, only the first time, IntersectionObserver. No scroll-jacking, no parallax that moves text.
    - Background: a very subtle dark grid with a soft violet glow that follows the pointer in the hero only.
    - Optional particles: <= 40 sparks on a canvas in the hero, paused when the tab is hidden.
    - Page changes between docs: quick fade (<= 200 ms).
    - Everything uses transform/opacity only (GPU friendly); 60 fps on a normal laptop; nothing blocks reading.
    - CALM MOTION: prefers-reduced-motion = calm by default; plus the visible "Calm motion" toggle (same name as in the app), saved in
      localStorage (wrap in try/catch). Calm = no loops, no particles, no tilt; demos show their end state; reveals are instant.
3.4 LOOK: dark, glassy panels (#141425 at 80-90% + 1px #2a2a48 line + soft inner glow), radius 16-24 px, block-shaped decorations
    (puzzle notches) used sparingly, violet->purple gradients for headlines/CTAs, green only for "electricity / go". Headings: Inter
    800 or ONE display font (offer options in W1). Body 16-18 px, line-height 1.6. Max text width ~70 characters.
3.5 DOCS (all 16 pages + tutorials): one shared layout: top bar (same as landing), left sidebar with ALL pages + a search box that
    filters pages AND headings (plain JS, index built from the pages), "On this page" mini table of contents, prev/next buttons, callout
    boxes (Tip / Watch out / Safety), copy buttons on code/step blocks, images open bigger on click (lightbox, Esc closes), screenshots
    with width/height (no layout jump). Keep every page's text; fix outdated facts (section 2). Tutorials index = cards with level
    (easy/medium/hard), time ("10 min"), a small picture and "Open in G-Warp". Changelog = a vertical timeline (real versions only).
3.6 PHONES: the site must be great on a phone (the owner reads on one): 390 px wide, no sideways scrolling, tap targets >= 44 px,
    the bento grid becomes swipeable cards, demos work with touch, top bar becomes a menu button. (The APP is desktop-first; the
    website is not.)
3.7 SPEED + QUALITY: landing page first load <= 350 KB (fonts not counted): move the embedded JPEGs out to files, use WebP (+ PNG/JPEG
    fallback) with loading="lazy" and width/height; take NEW screenshots of v15.56.0 from a FRESH project with the QA kit (never the
    owner's test projects). Accessibility: landmarks, one h1 per page, alt text, visible focus, contrast AA, every demo usable by
    keyboard, aria-live for demo results. Meta: title + description per page, Open Graph image 1200x630 (own art), favicon = G logo,
    theme-color #0b0b14.

---------------------------------------------------------------------
 4. PHASES
---------------------------------------------------------------------
W0 AUDIT  [chatgpt.com or Freebuff]  -> team/chatgpt/lanes/L9-WEB/reports/W0-AUDIT.md
   For every page: purpose, sections, what to keep, what's outdated (with the app evidence from section 2), size, broken/missing links
   (check every href points to an existing file/anchor), images used. Then a one-page "site map of the new site" (which page has what).
W1 THREE DIRECTIONS  [chatgpt.com]  -> team/ai-team/shared/<date>-chatgpt-WEB-W1/  (A.html, B.html, C.html, preview.html, NOTES.md)
   Each = the FULL first screen (3.1) + the bento grid (3.2) with at least 3 tiles really working + one docs page sample, with the real
   motion (3.3) and Calm motion. Make them truly DIFFERENT ideas, for example:
     A "Power grid": circuit-board lines connect the tiles, electricity runs between them.
     B "Workbench": the page looks like a tidy G-Warp workspace - tiles are block-shaped, things snap together.
     C "Arcade": bold, playful, big G-Spark, chunky buttons, more colour (still the same palette).
   NOTES.md: pros/cons, weight in KB, "My pick". preview.html links all three (desktop + phone frames side by side).
   >>> DON'T WAIT (no-questions rule): write "OWNER: pick A, B or C when you can" in your log, push, and go straight on to W2 with
       YOUR pick - but build W2 so the direction is ONE theme file (site/assets/theme-A.css / theme-B.css / theme-C.css + the same
       HTML), so the owner's later pick is a one-line switch. Make all three theme files work (= do all of them, don't ask).
W2 BUILD  [chatgpt.com writes, Freebuff tests]  -> team/ai-team/shared/<date>-chatgpt-WEB/site/  (the complete new site, rule R1)
   Order: shared CSS/JS + top bar -> landing -> docs layout -> all 16 docs pages -> tutorials -> changelog -> 404 page (optional).
   Push after each page group. Keep a CHANGES.md: per page, what changed and which old facts were updated.
W3 CHECK  [Freebuff, QA kit Playwright]  -> tests/web-check.js in your lane folder + report W3-CHECK.md (paste real output)
   For EVERY page at 1440x900 and 390x844: screenshot (into team/chatgpt/out/, not committed), no console errors, no horizontal scroll
   (document.scrollingElement.scrollWidth <= innerWidth), every internal link + anchor exists, every image loads, the page weight
   (sum of loaded bytes), and with reducedMotion "reduce": no running CSS animations (document.getAnimations() all paused/finished).
   Click every tile demo once (no errors). Fix and re-run until ALL PASS.
W4 HANDOFF  -> NOTES.md in the WEB drop-box folder: file list (old path -> new path, same names), how Claude swaps it in (copy
   site/* over the repo root, nothing else changes), the W3 result, before/after screenshots list, open questions. One line in
   MERGE-QUEUE.txt "WAITING FOR CLAUDE" is written by CLAUDE - you only push. Then Claude reviews and the owner says "go".

---------------------------------------------------------------------
 5. DON'T (things that would make it worse)
---------------------------------------------------------------------
- Don't make a long marketing page with huge empty hero space and features 5 screens down.
- Don't add sections nobody asked for (pricing, newsletter, blog, testimonials, team photos, chat widget).
- Don't use stock photos, emoji walls, or generic "AI startup" gradients that hide the G-Warp look. G-Warp = dark + violet + electric green.
- Don't let animation make text hard to read or move while someone reads it. Don't loop sounds. Don't flash faster than 3 times/second.
- Don't break Scratch-style trust: no claims you can't prove; "Beta" stays visible.
- Don't rewrite docs into marketing - docs stay clear, short, kid-friendly, with steps.
- Don't spend more than ~1 session on W0; most time goes to W1 + W2. Art/icons: take your time (README section 7: A/B/C rules).


---
## chatgpt-jobs/HOW-TO-DO-EACH-JOB.md

# How to do each job — step by step (read this BEFORE your first job)

Written by Claude, 2026-10-26. The owner: *"make sure everything is explained."* So nothing here is left to guessing.
If something in this file and the job line disagree, **this file wins**. If you are still unsure: do the smallest safe thing,
write "I was unsure about X, I did Y" in your report, and move on. Never stop the whole session because of one unclear job.

---

## PART A — the same for every job

### A1. Start of a session (always, ~5 minutes)
1. `git pull`
2. Read `team/ai-team/README.md` (the rules) and the last entry of **your own** log `team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt`.
3. Write a session-start entry at the END of `team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt` (template `team/ai-team/AI-CHAT-LOG-TEMPLATE.txt`):
   time from `date -u`, the owner's request, which job file and which job ids you will do.
4. `git add team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt && git commit -m "ChatGPT log: start" && git push` → open the file on GitHub and check your entry is there.
   **If you can't push or can't see it: STOP and tell the owner.**
5. (Freebuff only) `node team/ai-team/tools/qa-kit/smoke-app.js` → must end with `ALL PASS`. If not, that is your first bug report.

### A2. Picking jobs
- Open the job file (e.g. `team/ai-team/CHATGPT-JOBS.md › JOBS-BLOCKS.txt`). Take the **first 10 lines that start with `[ ]`** and fit where you are:
  on **chatgpt.com** only `[WEB]` and `[ANY]` jobs; on **Freebuff** `[TERMINAL]` jobs first.
- Skip lines that start with `[x]` (done) or `[~]` (done, bug found). Never redo them.

### A3. One batch = 10 jobs → one report
Report file: `team/chatgpt/jobs/<FILE NAME WITHOUT .txt>-<first id>-<last id>.md`, e.g. `team/chatgpt/jobs/JOBS-BLOCKS-BLK-0001-PAR-BLK-0002-PAR.md`.
Inside, one short section per job, exactly like this:

```
## BLK-0001-PAR  "move (10) steps"
Result: SAME            (or: DIFFERENT / DONE / FOUND A PROBLEM / BLOCKED)
Evidence: TESTED in G-Warp + TESTED in scratch-vm
Proof:
  <paste the real tool output here, max ~15 lines>
Bug: no                 (or: yes -> team/chatgpt/bugs/BUG-BLK-0001-PAR.md)
Note: <one line, optional>
```

### A4. Marking the job file
Change only the first 3 characters of the job line: `[ ]` → `[x]` (done, fine) or `[~]` (done, found a bug). Don't change the rest of the line.
Don't reorder, delete or reformat lines. (`make_jobs.py` keeps your marks when Claude regenerates the files.)

### A5. A bug report (only when you found a problem)
File `team/chatgpt/bugs/BUG-<job id>.md`:
```
Title: <one line, what is wrong>
Job: <job id>        G-Warp version: <from smoke-app or the app's version label>
Steps: 1. ... 2. ... 3. ...
Expected (Scratch / tooltip / licence says): ...
Actual (G-Warp does): ...
Proof: <tool output / screenshot path>
Severity: P0 crash/freeze · P1 wrong result · P2 looks wrong · P3 small
```

### A6. After every batch
1. `git add team/chatgpt/ team/ai-team/chatgpt-jobs/ && git commit -m "ChatGPT jobs: <first id>..<last id>" && git push` (if push is refused: `git pull --rebase` then push again).
2. Add one line at the END of `AI-TEAM.txt`:
   `<date -u> | DONE | ChatGPT | <first id>..<last id> | team/chatgpt/jobs/<report>.md | <evidence word>` → commit, push.
3. Next batch. **Don't wait for Claude or the owner between batches.**

### A7. End of a session (before the time runs out — Freebuff stops after ~50 min, so start at minute 45)
Closeout entry in `team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt` (what you did, which ids, bugs found, what's next) → commit → push → read it back on GitHub.

### A8. The 12 mistakes that waste the owner's time (don't do these)
1. Writing "works" / "tested" / "same" without running the tool. → Use **NOT-TESTED** if you didn't run it. That's fine.
2. Making up tool output. → Paste only what the terminal really printed.
3. Editing `app.html` or `index.html`. → Never. Claude does that.
4. Doing jobs that are already `[x]`. → Check the mark first.
5. Huge reports. → Max ~15 lines of proof per job.
6. Changing job lines, the job files' order, or other people's files. → Only change `[ ]` to `[x]`/`[~]`.
7. Forgetting to push. → Push after every batch.
8. Forgetting the log. → Start entry + closeout, every session.
9. Retrying a broken command 10 times. → Twice, then write the error and do the next job.
10. Using the owner's private test projects or someone's Scratch project. → Never. Make your own tiny tests.
11. Putting "made by AI" / AI names in art, projects, descriptions. → Never.
12. Doing "improvements" nobody asked for. → Write the idea in one line in your report under "Ideas" and move on.

---

## PART B — each job type

### `BLK-xxxx-PAR` [TERMINAL] — does this block give the same result as Scratch?
**Tool:** `node team/ai-team/tools/qa-kit/compare.js <test.json>` (builds the script in G-Warp, saves it, runs it in G-Warp AND in the real
Scratch engine, prints both answers). Setup once: `cd team/ai-team/tools/qa-kit && npm install && npx playwright install chromium`.
1. Find the block in `team/ai-team/gwrap-blocks.json` (same `type` as in the job line). Look at `text` and `inputs`.
2. Write a test file `team/chatgpt/tests/BLK-xxxx-PAR.json`. The `script` is the blocks after "when green flag clicked", written with the
   builder `B` (qa-kit README section 3). **Put the block's answer into a variable** so it can be compared:
   - a stack block that moves/changes the sprite: run it, then compare x / y / direction / size / costume (printed automatically).
   - a reporter (round block): `B.SET("result", <the reporter>)`.
   - a boolean (hexagon): `B.IFE(<the boolean>, [B.SET("result", "yes")], [B.SET("result", "no")])`.
   - any block: `B.C("<type>", [inputs...], [menus...])` makes it.
   Example (`move (10) steps`):
   ```json
   { "name": "BLK-0001-PAR", "vars": ["result"], "script": "return [B.C('move', [10]), B.SET('result', B.X)];" }
   ```
3. Run: `node team/ai-team/tools/qa-kit/compare.js team/chatgpt/tests/BLK-0001-PAR.json` (add a number of seconds at the end if the block waits,
   e.g. `3` for `wait 1`).
4. Read the last line: **SAME** → `[x]`. **DIFFERENT** → `[~]` + bug report (paste the table). **TEST BROKE** → your test is wrong
   (fix it, max 2 tries) or write BLOCKED + the error in the report.
5. Blocks that need the mouse, sound, camera, typing an answer, or time/date: write `BLOCKED: needs <thing>, not testable with compare.js`
   and mark `[x]` with evidence NOT-TESTED. Don't fake it.

### `BLK-xxxx-EDGE` [TERMINAL] — weird inputs
Same as PAR, but run the block with each of these inputs (one test file with several variables, e.g. `r1`..`r9`):
`""` (empty), `"abc"`, `"10"` (text ten), `10`, `-1`, `0`, `1000000000`, `"NaN"`, `2.5`, a 300-letter text.
Example for `( ) + ( )`: `return [B.SET('r1', B.add('', 3)), B.SET('r2', B.add('abc', 3)), B.SET('r3', B.add('10', 3)), ...];`
SAME for all → `[x]`. Any DIFFERENT → `[~]` + bug report listing **which input** differs.

### `BLK-xxxx-SAVE` [TERMINAL] — does it survive save + open?
1. Use the `.sb3` that compare.js already made: `team/ai-team/tools/qa-kit/out/BLK-xxxx-PAR.sb3`.
2. `node team/ai-team/tools/qa-kit/roundtrip.js team/ai-team/tools/qa-kit/out/BLK-xxxx-PAR.sb3`
3. `NO DIFFERENCES` → `[x]`. Any `DIFF` line → `[~]` + bug report with the DIFF lines.
4. Also `node team/ai-team/tools/qa-kit/check-sb3.js team/ai-team/tools/qa-kit/out/BLK-xxxx-PAR.sb3` → must say ALL PASS.

### `BLK-xxxx-DOC` [WEB] — kid help card
Write in the report (not a separate file), exactly this shape, max 6 lines, words an 8-year-old knows:
```
### move (10) steps
What it does: moves your sprite forward 10 steps in the way it is pointing.
Try it: when green flag clicked → forever → move (10) steps → if on edge, bounce
Watch out: it moves where the sprite POINTS, not always to the right.
```
No Scratch screenshots, no Scratch cat. Evidence: SOURCE-VERIFIED if you checked the block's text in gwrap-blocks.json, else NOT-TESTED.

### `BLK-xxxx-AI` [ANY] — teaching examples for G-Warp's AI
**Wait until the AI Lab has pushed AIM-1** (the command list, in `team/ai-team/shared/*AIM-1*`). Until then skip these lines (leave `[ ]`).
Then: 10 lines of JSONL in `team/chatgpt/ai-data/BLK-xxxx.jsonl`, each `{"request": "<what a kid would type>", "commands": [ ...AIM-1 format... ]}`.
Kid language, different wording each time ("make it go forward", "move a bit", ...). No names, no personal info.

### `EXT-xxxx-LOAD` [TERMINAL] — does the extension load?
1. In a small Node script (copy `smoke-app.js` as a start), open G-Warp with `openApp()`, then add the extension the same way a user does:
   the Extensions button → gallery → click the extension's card (search its name). Wait 5 s.
2. Check: its blocks appear in the palette (count them), no page errors.
3. Loads + blocks + no errors → `[x]`. Otherwise `[~]` + bug report (which step failed + errors).
4. If it says it needs the internet and the test machine has none → BLOCKED (NOT-TESTED), `[x]`.

### `EXT-xxxx-RUN` [TERMINAL] — does its main block work?
Take its simplest reporter or stack block, build a 3-block script (green flag → block → set variable), run in G-Warp, and compare with
what the extension's own docs/page say it should give. (Scratch can't run most extensions, so compare with the docs.) Paste output.

### `EXT-xxxx-CREDIT` [WEB] — credit + licence correct?
1. In `app.html` find the extension in the `gw10GalleryData` list (search its `id`). Note `by`, `license`, `url`, `original`.
2. Open its `url` / `home` page. Compare the author name(s) and the licence (MIT, MPL-2.0, LGPL, ...).
3. All match → `[x]`. Anything missing/wrong → `[~]` + bug report: "G-Warp says X, the original says Y (link)".

### `EXT-xxxx-SAFE` [WEB] — is the safety label right?
Read its source code (`code` field / its page). Look for: `fetch(`, `XMLHttpRequest`, `WebSocket`, `navigator.geolocation`, IP lookups,
`localStorage` of personal things, login / account, `eval(`, `new Function(`.
- uses personal info (IP, location, logins) → must be **Dangerous**
- uses the internet / outside servers, but no personal info → **Moderate**
- none of these → **Safe**
Write which lines you found (quote max 3 short lines) and the label you think is right. Different from G-Warp's label → `[~]` + bug report.

### `EXT-xxxx-DOC` [WEB] — gallery text
Two lines a kid understands + one idea: `Draws text that can wiggle and glow. Idea: an animated title screen.` No hype, no "best ever".

### `UI-xxxx-CLICK` [TERMINAL] — does the button do what its tooltip says?
1. `openApp()`, find the element: `page.locator('[title="<the text>"]')` (if not visible, open the tab/menu it lives in first:
   Code / Costumes / Sounds tabs `#gwMainTabCode` `#gwMainTabCostumes` `#gwMainTabSounds`, the More menu, the paint editor, the Animation tab).
2. Click it. Check something changed that matches the tooltip (a panel opened, a value changed, a sprite moved) and there are no page errors.
3. Don't click buttons that delete the project, open file pickers or leave the page; for those write "not clicked: <reason>", `[x]`, NOT-TESTED.

### `UI-xxxx-ICON` [WEB] — same action, same icon?
1. Find the element with that title in `app.html`; note its icon (Font Awesome class like `fa-rotate-left`, an `<svg>`, or an emoji).
2. Search the file for other buttons that do the **same action** (e.g. every "Undo", "Play", "Delete") and note their icons.
3. Same everywhere → `[x]`. Different → `[~]` and add a row to `team/chatgpt/ICON-MISMATCHES.md`: `action | where | icon here | icon there | suggested one`.
   (No separate bug file needed for icon mismatches.)

### `UI-xxxx-WORDS` [WEB] — clear tooltip?
Is it correct, and would an 8-year-old get it? If yes → `[x]`. If not → `[~]` and write: `old: "..." → new: "..."` (max 10 words) in the report.

### `REC-xxx-n` [TERMINAL] — new GWrap AI recipe
1. Look at the format in `team/claude/gwrap-pack.json` (`id, emoji, title, keys, q, steps, script`). Copy one recipe as your template.
2. Write the recipe for the mechanic + version in the job line. **basic** ≤ 12 blocks · **better** feels smooth · **clone-safe** works with
   clones (use "for this sprite only" variables) · **explain** = basic + a kid explanation + one common bug and its fix.
3. Build the same script with the builder in G-Warp (like compare.js does), run it, show it works (a variable / position changes the right way).
4. Put all recipes of one batch in one pack file `team/ai-team/shared/<date>-chatgpt-REC-<first>-<last>/pack.json` + `NOTES.md`.
5. `python3 team/ai-team/tools/validate_gwrap_pack.py team/ai-team/shared/<folder>/pack.json` → must print no errors. Paste the output.

### `KID-xxx` [TERMINAL] — kid critic
Pretend to be a kid who has never used G-Warp. Build the project in the job line **only by clicking the UI** (Playwright clicks, drags,
typing — no `GWB` builder, no `Engine` changes). Take a screenshot after each step into `team/chatgpt/out/KID-xxx/` (not uploaded).
Make 1–2 realistic kid mistakes (wrong block, forgot a loop), notice them, fix them. Report: steps (short), what was confusing,
and a list: **fix** (broken) / **improve** (works but hard) / **keep** (good). Put fix-items also in bug reports.

### `CHAOS-xxx` [TERMINAL] — try to break it
Build the project quickly (builder allowed), then stress it: 1,000 clones, a list with 100,000 items, a forever loop with no wait,
spam keys, Start/Stop 50 times, save + open 20 times. Measure: does the page freeze (> 5 s no answer), lag (FPS below 30:
`requestAnimationFrame` counter), or show errors? Freeze/crash = `[~]` + P0 bug report. Smooth = `[x]` with the numbers.

### `ART-xxx` [WEB] — library art (take your time!)
Follow `team/ai-team/README.md` section 7 exactly. One drop-box folder per piece: `team/ai-team/shared/<date>-chatgpt-ART-xxx/` with
`<name>-A.svg`, `-B.svg`, `-C.svg` (+ extra costumes `-A-walk1.svg` ... when the job asks for animation frames), `preview.html` that shows
all options on dark and light backgrounds and at stage size, and `NOTES.md` (with "My pick"). Sprites: `viewBox`, rotation centre in the
middle of the body, all frames the same size and lined up. Backdrops: exactly 480×360. Under 30 KB each. No cat, no brands, no AI marks.

---

## PART C — when something goes wrong
- **A tool says `Cannot find module`** → you forgot `npm install` in `team/ai-team/tools/qa-kit`.
- **Playwright says the browser is missing** → `npx playwright install chromium` in `team/ai-team/tools/qa-kit`.
- **`git push` refused** → `git pull --rebase`, then push again. Never `--force`.
- **A job line seems wrong** (block doesn't exist, extension gone) → write `BLOCKED: <why>` in the report, mark `[x]`, NOT-TESTED.
- **You're not sure if something is a bug** → report it as P3 with your reason. Claude decides.
- **You found something really bad** (crash, data loss, safety problem) → P0 bug report AND one line at the top of your log closeout.


---
## chatgpt-jobs/JOBS-ART.txt

JOBS - ART FOR THE LIBRARY (40 jobs) - TAKE YOUR TIME, make them beautiful (icon/art rules: team/ai-team/README.md section 7)
READ FIRST: team/ai-team/CHATGPT-JOBS.md › HOW-TO-DO-EACH-JOB.md (step by step for every job type, report + bug templates).
RULES: team/ai-team/README.md. Work in batches of 10 jobs (same file, top to bottom, skip [x]). One report per batch:
team/chatgpt/jobs/<FILE>-<first id>-<last id>.md (one short section per job: result, proof, bug found? yes/no). Mark each job here
[x] (done) or [~] (done, found a bug -> also write team/chatgpt/bugs/BUG-<id>.md). Push after every batch + one AI-TEAM.txt line.
Proof words: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED. Never invent results. Never edit app.html.

[ ] ART-001 [WEB] draw "hero kid" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-002 [WEB] draw "robot" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-003 [WEB] draw "dragon (friendly)" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-004 [WEB] draw "slime" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-005 [WEB] draw "ghost (cute)" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-006 [WEB] draw "knight" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-007 [WEB] draw "wizard" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-008 [WEB] draw "alien" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-009 [WEB] draw "car" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-010 [WEB] draw "spaceship" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-011 [WEB] draw "tree" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-012 [WEB] draw "house" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-013 [WEB] draw "coin" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-014 [WEB] draw "gem" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-015 [WEB] draw "heart" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-016 [WEB] draw "key" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-017 [WEB] draw "door" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-018 [WEB] draw "chest" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-019 [WEB] draw "bat" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-020 [WEB] draw "bird" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-021 [WEB] draw "fish" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-022 [WEB] draw "dog" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-023 [WEB] draw "rabbit" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-024 [WEB] draw "fox" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-025 [WEB] draw "owl" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-026 [WEB] draw "bee" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-027 [WEB] draw "cloud" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-028 [WEB] draw "sun" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-029 [WEB] draw "moon" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-030 [WEB] draw "star" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), 4-frame walk/idle animation as extra costumes, no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-031 [WEB] draw "forest backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-032 [WEB] draw "city backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-033 [WEB] draw "space backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-034 [WEB] draw "underwater backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-035 [WEB] draw "castle backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-036 [WEB] draw "desert backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-037 [WEB] draw "snow backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-038 [WEB] draw "school backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-039 [WEB] draw "cave backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.
[ ] ART-040 [WEB] draw "stadium backdrop" for G-Warp's library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), no cat / no brands / no AI marks. Drop box + preview.html.


---
## chatgpt-jobs/JOBS-BLOCKS.txt

JOBS - EVERY G-WARP BLOCK (176 blocks x 5 = 880 jobs)   source: team/ai-team/gwrap-blocks.json
READ FIRST: team/ai-team/CHATGPT-JOBS.md › HOW-TO-DO-EACH-JOB.md (step by step for every job type, report + bug templates).
RULES: team/ai-team/README.md. Work in batches of 10 jobs (same file, top to bottom, skip [x]). One report per batch:
team/chatgpt/jobs/<FILE>-<first id>-<last id>.md (one short section per job: result, proof, bug found? yes/no). Mark each job here
[x] (done) or [~] (done, found a bug -> also write team/chatgpt/bugs/BUG-<id>.md). Push after every batch + one AI-TEAM.txt line.
Proof words: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED. Never invent results. Never edit app.html.
-AI jobs wait until AIM-1 (command list) exists; the others can start now.

[x] BLK-0001-PAR [TERMINAL] "move (10) steps" (motion, stack, type move): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[x] BLK-0001-EDGE [TERMINAL] "move (10) steps" (motion, stack, type move): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[x] BLK-0001-SAVE [TERMINAL] "move (10) steps" (motion, stack, type move): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0001-DOC [WEB] "move (10) steps" (motion, stack, type move): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[x] BLK-0001-AI [ANY] "move (10) steps" (motion, stack, type move): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[x] BLK-0002-PAR [TERMINAL] "turn (15) degrees" (motion, stack, type turn_cw): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[x] BLK-0002-EDGE [TERMINAL] "turn (15) degrees" (motion, stack, type turn_cw): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[x] BLK-0002-SAVE [TERMINAL] "turn (15) degrees" (motion, stack, type turn_cw): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0002-DOC [WEB] "turn (15) degrees" (motion, stack, type turn_cw): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[x] BLK-0002-AI [ANY] "turn (15) degrees" (motion, stack, type turn_cw): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[x] BLK-0003-PAR [TERMINAL] "turn (15) degrees" (motion, stack, type turn_ccw): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[x] BLK-0003-EDGE [TERMINAL] "turn (15) degrees" (motion, stack, type turn_ccw): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[x] BLK-0003-SAVE [TERMINAL] "turn (15) degrees" (motion, stack, type turn_ccw): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0003-DOC [WEB] "turn (15) degrees" (motion, stack, type turn_ccw): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[x] BLK-0003-AI [ANY] "turn (15) degrees" (motion, stack, type turn_ccw): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[x] BLK-0004-PAR [TERMINAL] "go to x: (0) y: (0)" (motion, stack, type goto_xy): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[x] BLK-0004-EDGE [TERMINAL] "go to x: (0) y: (0)" (motion, stack, type goto_xy): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[x] BLK-0004-SAVE [TERMINAL] "go to x: (0) y: (0)" (motion, stack, type goto_xy): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0004-DOC [WEB] "go to x: (0) y: (0)" (motion, stack, type goto_xy): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[x] BLK-0004-AI [ANY] "go to x: (0) y: (0)" (motion, stack, type goto_xy): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[x] BLK-0005-PAR [TERMINAL] "go to [random position]" (motion, stack, type goto_target): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[x] BLK-0005-EDGE [TERMINAL] "go to [random position]" (motion, stack, type goto_target): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[x] BLK-0005-SAVE [TERMINAL] "go to [random position]" (motion, stack, type goto_target): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[>] BLK-0005-DOC [WEB] "go to [random position]" (motion, stack, type goto_target): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[x] BLK-0005-AI [ANY] "go to [random position]" (motion, stack, type goto_target): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[x] BLK-0006-PAR [TERMINAL] "point in direction (90)" (motion, stack, type point_direction): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[x] BLK-0006-EDGE [TERMINAL] "point in direction (90)" (motion, stack, type point_direction): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[x] BLK-0006-SAVE [TERMINAL] "point in direction (90)" (motion, stack, type point_direction): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[>] BLK-0006-DOC [WEB] "point in direction (90)" (motion, stack, type point_direction): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[x] BLK-0006-AI [ANY] "point in direction (90)" (motion, stack, type point_direction): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[x] BLK-0007-PAR [TERMINAL] "change x by (10)" (motion, stack, type change_x): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[x] BLK-0007-EDGE [TERMINAL] "change x by (10)" (motion, stack, type change_x): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[x] BLK-0007-SAVE [TERMINAL] "change x by (10)" (motion, stack, type change_x): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[>] BLK-0007-DOC [WEB] "change x by (10)" (motion, stack, type change_x): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[x] BLK-0007-AI [ANY] "change x by (10)" (motion, stack, type change_x): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[x] BLK-0008-PAR [TERMINAL] "set x to (0)" (motion, stack, type set_x): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[x] BLK-0008-EDGE [TERMINAL] "set x to (0)" (motion, stack, type set_x): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[x] BLK-0008-SAVE [TERMINAL] "set x to (0)" (motion, stack, type set_x): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[>] BLK-0008-DOC [WEB] "set x to (0)" (motion, stack, type set_x): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[x] BLK-0008-AI [ANY] "set x to (0)" (motion, stack, type set_x): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[>] BLK-0009-PAR [TERMINAL] "change y by (10)" (motion, stack, type change_y): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[>] BLK-0009-EDGE [TERMINAL] "change y by (10)" (motion, stack, type change_y): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[>] BLK-0009-SAVE [TERMINAL] "change y by (10)" (motion, stack, type change_y): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0009-DOC [WEB] "change y by (10)" (motion, stack, type change_y): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[>] BLK-0009-AI [ANY] "change y by (10)" (motion, stack, type change_y): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[>] BLK-0010-PAR [TERMINAL] "set y to (0)" (motion, stack, type set_y): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[>] BLK-0010-EDGE [TERMINAL] "set y to (0)" (motion, stack, type set_y): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[>] BLK-0010-SAVE [TERMINAL] "set y to (0)" (motion, stack, type set_y): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0010-DOC [WEB] "set y to (0)" (motion, stack, type set_y): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[>] BLK-0010-AI [ANY] "set y to (0)" (motion, stack, type set_y): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[>] BLK-0011-PAR [TERMINAL] "if on edge, bounce" (motion, stack, type bounce): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[>] BLK-0011-EDGE [TERMINAL] "if on edge, bounce" (motion, stack, type bounce): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[>] BLK-0011-SAVE [TERMINAL] "if on edge, bounce" (motion, stack, type bounce): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[>] BLK-0011-DOC [WEB] "if on edge, bounce" (motion, stack, type bounce): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[>] BLK-0011-AI [ANY] "if on edge, bounce" (motion, stack, type bounce): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[>] BLK-0012-PAR [TERMINAL] "set rotation style [left-right]" (motion, stack, type set_rotation_style): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[>] BLK-0012-EDGE [TERMINAL] "set rotation style [left-right]" (motion, stack, type set_rotation_style): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[>] BLK-0012-SAVE [TERMINAL] "set rotation style [left-right]" (motion, stack, type set_rotation_style): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[>] BLK-0012-DOC [WEB] "set rotation style [left-right]" (motion, stack, type set_rotation_style): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[>] BLK-0012-AI [ANY] "set rotation style [left-right]" (motion, stack, type set_rotation_style): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0013-PAR [TERMINAL] "glide (1) secs to x: (0) y: (0)" (motion, stack, type glide_xy): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0013-EDGE [TERMINAL] "glide (1) secs to x: (0) y: (0)" (motion, stack, type glide_xy): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0013-SAVE [TERMINAL] "glide (1) secs to x: (0) y: (0)" (motion, stack, type glide_xy): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0013-DOC [WEB] "glide (1) secs to x: (0) y: (0)" (motion, stack, type glide_xy): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0013-AI [ANY] "glide (1) secs to x: (0) y: (0)" (motion, stack, type glide_xy): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0014-PAR [TERMINAL] "go to random position" (motion, stack, type goto_random): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0014-EDGE [TERMINAL] "go to random position" (motion, stack, type goto_random): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0014-SAVE [TERMINAL] "go to random position" (motion, stack, type goto_random): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0014-DOC [WEB] "go to random position" (motion, stack, type goto_random): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0014-AI [ANY] "go to random position" (motion, stack, type goto_random): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0015-PAR [TERMINAL] "point towards [mouse-pointer]" (motion, stack, type point_towards): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0015-EDGE [TERMINAL] "point towards [mouse-pointer]" (motion, stack, type point_towards): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0015-SAVE [TERMINAL] "point towards [mouse-pointer]" (motion, stack, type point_towards): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0015-DOC [WEB] "point towards [mouse-pointer]" (motion, stack, type point_towards): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0015-AI [ANY] "point towards [mouse-pointer]" (motion, stack, type point_towards): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0016-PAR [TERMINAL] "x position" (motion, reporter, type x_position): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0016-EDGE [TERMINAL] "x position" (motion, reporter, type x_position): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0016-SAVE [TERMINAL] "x position" (motion, reporter, type x_position): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0016-DOC [WEB] "x position" (motion, reporter, type x_position): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0016-AI [ANY] "x position" (motion, reporter, type x_position): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0017-PAR [TERMINAL] "y position" (motion, reporter, type y_position): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0017-EDGE [TERMINAL] "y position" (motion, reporter, type y_position): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0017-SAVE [TERMINAL] "y position" (motion, reporter, type y_position): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0017-DOC [WEB] "y position" (motion, reporter, type y_position): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0017-AI [ANY] "y position" (motion, reporter, type y_position): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0018-PAR [TERMINAL] "direction" (motion, reporter, type direction): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0018-EDGE [TERMINAL] "direction" (motion, reporter, type direction): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0018-SAVE [TERMINAL] "direction" (motion, reporter, type direction): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0018-DOC [WEB] "direction" (motion, reporter, type direction): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0018-AI [ANY] "direction" (motion, reporter, type direction): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0019-PAR [TERMINAL] "say (Hello!) for (2) secs" (looks, stack, type say): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0019-EDGE [TERMINAL] "say (Hello!) for (2) secs" (looks, stack, type say): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0019-SAVE [TERMINAL] "say (Hello!) for (2) secs" (looks, stack, type say): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0019-DOC [WEB] "say (Hello!) for (2) secs" (looks, stack, type say): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0019-AI [ANY] "say (Hello!) for (2) secs" (looks, stack, type say): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0020-PAR [TERMINAL] "say (Hello!)" (looks, stack, type say_only): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0020-EDGE [TERMINAL] "say (Hello!)" (looks, stack, type say_only): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0020-SAVE [TERMINAL] "say (Hello!)" (looks, stack, type say_only): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0020-DOC [WEB] "say (Hello!)" (looks, stack, type say_only): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0020-AI [ANY] "say (Hello!)" (looks, stack, type say_only): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0021-PAR [TERMINAL] "think (Hmm...)" (looks, stack, type think): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0021-EDGE [TERMINAL] "think (Hmm...)" (looks, stack, type think): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0021-SAVE [TERMINAL] "think (Hmm...)" (looks, stack, type think): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0021-DOC [WEB] "think (Hmm...)" (looks, stack, type think): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0021-AI [ANY] "think (Hmm...)" (looks, stack, type think): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0022-PAR [TERMINAL] "think (Hmm...) for (2) secs" (looks, stack, type think_secs): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0022-EDGE [TERMINAL] "think (Hmm...) for (2) secs" (looks, stack, type think_secs): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0022-SAVE [TERMINAL] "think (Hmm...) for (2) secs" (looks, stack, type think_secs): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0022-DOC [WEB] "think (Hmm...) for (2) secs" (looks, stack, type think_secs): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0022-AI [ANY] "think (Hmm...) for (2) secs" (looks, stack, type think_secs): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0023-PAR [TERMINAL] "switch costume to [costume1]" (looks, stack, type switch_costume): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0023-EDGE [TERMINAL] "switch costume to [costume1]" (looks, stack, type switch_costume): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0023-SAVE [TERMINAL] "switch costume to [costume1]" (looks, stack, type switch_costume): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0023-DOC [WEB] "switch costume to [costume1]" (looks, stack, type switch_costume): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0023-AI [ANY] "switch costume to [costume1]" (looks, stack, type switch_costume): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0024-PAR [TERMINAL] "next costume" (looks, stack, type next_costume): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0024-EDGE [TERMINAL] "next costume" (looks, stack, type next_costume): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0024-SAVE [TERMINAL] "next costume" (looks, stack, type next_costume): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0024-DOC [WEB] "next costume" (looks, stack, type next_costume): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0024-AI [ANY] "next costume" (looks, stack, type next_costume): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0025-PAR [TERMINAL] "change size by (10)" (looks, stack, type change_size): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0025-EDGE [TERMINAL] "change size by (10)" (looks, stack, type change_size): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0025-SAVE [TERMINAL] "change size by (10)" (looks, stack, type change_size): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0025-DOC [WEB] "change size by (10)" (looks, stack, type change_size): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0025-AI [ANY] "change size by (10)" (looks, stack, type change_size): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0026-PAR [TERMINAL] "set size to (100)%" (looks, stack, type set_size): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0026-EDGE [TERMINAL] "set size to (100)%" (looks, stack, type set_size): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0026-SAVE [TERMINAL] "set size to (100)%" (looks, stack, type set_size): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0026-DOC [WEB] "set size to (100)%" (looks, stack, type set_size): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0026-AI [ANY] "set size to (100)%" (looks, stack, type set_size): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0027-PAR [TERMINAL] "show" (looks, stack, type show): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0027-EDGE [TERMINAL] "show" (looks, stack, type show): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0027-SAVE [TERMINAL] "show" (looks, stack, type show): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0027-DOC [WEB] "show" (looks, stack, type show): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0027-AI [ANY] "show" (looks, stack, type show): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0028-PAR [TERMINAL] "hide" (looks, stack, type hide): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0028-EDGE [TERMINAL] "hide" (looks, stack, type hide): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0028-SAVE [TERMINAL] "hide" (looks, stack, type hide): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0028-DOC [WEB] "hide" (looks, stack, type hide): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0028-AI [ANY] "hide" (looks, stack, type hide): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0029-PAR [TERMINAL] "change ghost effect by (10)%" (looks, stack, type change_ghost): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0029-EDGE [TERMINAL] "change ghost effect by (10)%" (looks, stack, type change_ghost): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0029-SAVE [TERMINAL] "change ghost effect by (10)%" (looks, stack, type change_ghost): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0029-DOC [WEB] "change ghost effect by (10)%" (looks, stack, type change_ghost): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0029-AI [ANY] "change ghost effect by (10)%" (looks, stack, type change_ghost): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0030-PAR [TERMINAL] "set ghost effect to (0)%" (looks, stack, type set_ghost): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0030-EDGE [TERMINAL] "set ghost effect to (0)%" (looks, stack, type set_ghost): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0030-SAVE [TERMINAL] "set ghost effect to (0)%" (looks, stack, type set_ghost): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0030-DOC [WEB] "set ghost effect to (0)%" (looks, stack, type set_ghost): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0030-AI [ANY] "set ghost effect to (0)%" (looks, stack, type set_ghost): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0031-PAR [TERMINAL] "clear graphic effects" (looks, stack, type clear_effects): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0031-EDGE [TERMINAL] "clear graphic effects" (looks, stack, type clear_effects): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0031-SAVE [TERMINAL] "clear graphic effects" (looks, stack, type clear_effects): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0031-DOC [WEB] "clear graphic effects" (looks, stack, type clear_effects): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0031-AI [ANY] "clear graphic effects" (looks, stack, type clear_effects): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0032-PAR [TERMINAL] "set [color] effect to (0)" (looks, stack, type set_effect): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0032-EDGE [TERMINAL] "set [color] effect to (0)" (looks, stack, type set_effect): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0032-SAVE [TERMINAL] "set [color] effect to (0)" (looks, stack, type set_effect): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0032-DOC [WEB] "set [color] effect to (0)" (looks, stack, type set_effect): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0032-AI [ANY] "set [color] effect to (0)" (looks, stack, type set_effect): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0033-PAR [TERMINAL] "change [color] effect by (25)" (looks, stack, type change_effect): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0033-EDGE [TERMINAL] "change [color] effect by (25)" (looks, stack, type change_effect): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0033-SAVE [TERMINAL] "change [color] effect by (25)" (looks, stack, type change_effect): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0033-DOC [WEB] "change [color] effect by (25)" (looks, stack, type change_effect): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0033-AI [ANY] "change [color] effect by (25)" (looks, stack, type change_effect): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0034-PAR [TERMINAL] "go to [front] layer" (looks, stack, type go_front_back): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0034-EDGE [TERMINAL] "go to [front] layer" (looks, stack, type go_front_back): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0034-SAVE [TERMINAL] "go to [front] layer" (looks, stack, type go_front_back): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0034-DOC [WEB] "go to [front] layer" (looks, stack, type go_front_back): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0034-AI [ANY] "go to [front] layer" (looks, stack, type go_front_back): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0035-PAR [TERMINAL] "go [forward] (1) layers" (looks, stack, type go_layers): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0035-EDGE [TERMINAL] "go [forward] (1) layers" (looks, stack, type go_layers): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0035-SAVE [TERMINAL] "go [forward] (1) layers" (looks, stack, type go_layers): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0035-DOC [WEB] "go [forward] (1) layers" (looks, stack, type go_layers): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0035-AI [ANY] "go [forward] (1) layers" (looks, stack, type go_layers): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0036-PAR [TERMINAL] "costume #" (looks, reporter, type costume_number): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0036-EDGE [TERMINAL] "costume #" (looks, reporter, type costume_number): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0036-SAVE [TERMINAL] "costume #" (looks, reporter, type costume_number): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0036-DOC [WEB] "costume #" (looks, reporter, type costume_number): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0036-AI [ANY] "costume #" (looks, reporter, type costume_number): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0037-PAR [TERMINAL] "costume name" (looks, reporter, type costume_name): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0037-EDGE [TERMINAL] "costume name" (looks, reporter, type costume_name): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0037-SAVE [TERMINAL] "costume name" (looks, reporter, type costume_name): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0037-DOC [WEB] "costume name" (looks, reporter, type costume_name): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0037-AI [ANY] "costume name" (looks, reporter, type costume_name): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0038-PAR [TERMINAL] "size" (looks, reporter, type size_reporter): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0038-EDGE [TERMINAL] "size" (looks, reporter, type size_reporter): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0038-SAVE [TERMINAL] "size" (looks, reporter, type size_reporter): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0038-DOC [WEB] "size" (looks, reporter, type size_reporter): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0038-AI [ANY] "size" (looks, reporter, type size_reporter): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0039-PAR [TERMINAL] "play sound [Zap] until done" (sound, stack, type play_sound): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0039-EDGE [TERMINAL] "play sound [Zap] until done" (sound, stack, type play_sound): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0039-SAVE [TERMINAL] "play sound [Zap] until done" (sound, stack, type play_sound): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0039-DOC [WEB] "play sound [Zap] until done" (sound, stack, type play_sound): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0039-AI [ANY] "play sound [Zap] until done" (sound, stack, type play_sound): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0040-PAR [TERMINAL] "start sound [Zap]" (sound, stack, type start_sound): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0040-EDGE [TERMINAL] "start sound [Zap]" (sound, stack, type start_sound): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0040-SAVE [TERMINAL] "start sound [Zap]" (sound, stack, type start_sound): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0040-DOC [WEB] "start sound [Zap]" (sound, stack, type start_sound): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0040-AI [ANY] "start sound [Zap]" (sound, stack, type start_sound): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0041-PAR [TERMINAL] "stop all sounds" (sound, stack, type stop_all_sounds): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0041-EDGE [TERMINAL] "stop all sounds" (sound, stack, type stop_all_sounds): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0041-SAVE [TERMINAL] "stop all sounds" (sound, stack, type stop_all_sounds): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0041-DOC [WEB] "stop all sounds" (sound, stack, type stop_all_sounds): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0041-AI [ANY] "stop all sounds" (sound, stack, type stop_all_sounds): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0042-PAR [TERMINAL] "set [pitch] effect to (100)" (sound, stack, type snd_set_effect): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0042-EDGE [TERMINAL] "set [pitch] effect to (100)" (sound, stack, type snd_set_effect): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0042-SAVE [TERMINAL] "set [pitch] effect to (100)" (sound, stack, type snd_set_effect): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0042-DOC [WEB] "set [pitch] effect to (100)" (sound, stack, type snd_set_effect): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0042-AI [ANY] "set [pitch] effect to (100)" (sound, stack, type snd_set_effect): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0043-PAR [TERMINAL] "change [pitch] effect by (10)" (sound, stack, type snd_change_effect): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0043-EDGE [TERMINAL] "change [pitch] effect by (10)" (sound, stack, type snd_change_effect): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0043-SAVE [TERMINAL] "change [pitch] effect by (10)" (sound, stack, type snd_change_effect): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0043-DOC [WEB] "change [pitch] effect by (10)" (sound, stack, type snd_change_effect): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0043-AI [ANY] "change [pitch] effect by (10)" (sound, stack, type snd_change_effect): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0044-PAR [TERMINAL] "clear sound effects" (sound, stack, type snd_clear_effects): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0044-EDGE [TERMINAL] "clear sound effects" (sound, stack, type snd_clear_effects): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0044-SAVE [TERMINAL] "clear sound effects" (sound, stack, type snd_clear_effects): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0044-DOC [WEB] "clear sound effects" (sound, stack, type snd_clear_effects): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0044-AI [ANY] "clear sound effects" (sound, stack, type snd_clear_effects): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0045-PAR [TERMINAL] "change volume by (-10)" (sound, stack, type change_volume): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0045-EDGE [TERMINAL] "change volume by (-10)" (sound, stack, type change_volume): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0045-SAVE [TERMINAL] "change volume by (-10)" (sound, stack, type change_volume): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0045-DOC [WEB] "change volume by (-10)" (sound, stack, type change_volume): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0045-AI [ANY] "change volume by (-10)" (sound, stack, type change_volume): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0046-PAR [TERMINAL] "set volume to (100)%" (sound, stack, type set_volume): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0046-EDGE [TERMINAL] "set volume to (100)%" (sound, stack, type set_volume): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0046-SAVE [TERMINAL] "set volume to (100)%" (sound, stack, type set_volume): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0046-DOC [WEB] "set volume to (100)%" (sound, stack, type set_volume): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0046-AI [ANY] "set volume to (100)%" (sound, stack, type set_volume): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0047-PAR [TERMINAL] "volume" (sound, reporter, type volume_reporter): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0047-EDGE [TERMINAL] "volume" (sound, reporter, type volume_reporter): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0047-SAVE [TERMINAL] "volume" (sound, reporter, type volume_reporter): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0047-DOC [WEB] "volume" (sound, reporter, type volume_reporter): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0047-AI [ANY] "volume" (sound, reporter, type volume_reporter): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0048-PAR [TERMINAL] "when clicked" (events, hat, type when_flag): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0048-EDGE [TERMINAL] "when clicked" (events, hat, type when_flag): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0048-SAVE [TERMINAL] "when clicked" (events, hat, type when_flag): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0048-DOC [WEB] "when clicked" (events, hat, type when_flag): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0048-AI [ANY] "when clicked" (events, hat, type when_flag): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0049-PAR [TERMINAL] "when key [space] pressed" (events, hat, type when_key): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0049-EDGE [TERMINAL] "when key [space] pressed" (events, hat, type when_key): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0049-SAVE [TERMINAL] "when key [space] pressed" (events, hat, type when_key): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0049-DOC [WEB] "when key [space] pressed" (events, hat, type when_key): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0049-AI [ANY] "when key [space] pressed" (events, hat, type when_key): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0050-PAR [TERMINAL] "when this sprite clicked" (events, hat, type when_clicked): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0050-EDGE [TERMINAL] "when this sprite clicked" (events, hat, type when_clicked): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0050-SAVE [TERMINAL] "when this sprite clicked" (events, hat, type when_clicked): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0050-DOC [WEB] "when this sprite clicked" (events, hat, type when_clicked): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0050-AI [ANY] "when this sprite clicked" (events, hat, type when_clicked): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0051-PAR [TERMINAL] "broadcast [message1]" (events, stack, type broadcast): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0051-EDGE [TERMINAL] "broadcast [message1]" (events, stack, type broadcast): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0051-SAVE [TERMINAL] "broadcast [message1]" (events, stack, type broadcast): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0051-DOC [WEB] "broadcast [message1]" (events, stack, type broadcast): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0051-AI [ANY] "broadcast [message1]" (events, stack, type broadcast): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0052-PAR [TERMINAL] "broadcast [message1] and wait" (events, stack, type broadcast_wait): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0052-EDGE [TERMINAL] "broadcast [message1] and wait" (events, stack, type broadcast_wait): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0052-SAVE [TERMINAL] "broadcast [message1] and wait" (events, stack, type broadcast_wait): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[x] BLK-0052-DOC [WEB] "broadcast [message1] and wait" (events, stack, type broadcast_wait): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0052-AI [ANY] "broadcast [message1] and wait" (events, stack, type broadcast_wait): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0053-PAR [TERMINAL] "when I receive [message1]" (events, hat, type when_broadcast): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0053-EDGE [TERMINAL] "when I receive [message1]" (events, hat, type when_broadcast): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0053-SAVE [TERMINAL] "when I receive [message1]" (events, hat, type when_broadcast): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0053-DOC [WEB] "when I receive [message1]" (events, hat, type when_broadcast): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0053-AI [ANY] "when I receive [message1]" (events, hat, type when_broadcast): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0054-PAR [TERMINAL] "when I start as a clone" (events, hat, type when_clone): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0054-EDGE [TERMINAL] "when I start as a clone" (events, hat, type when_clone): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0054-SAVE [TERMINAL] "when I start as a clone" (events, hat, type when_clone): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0054-DOC [WEB] "when I start as a clone" (events, hat, type when_clone): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0054-AI [ANY] "when I start as a clone" (events, hat, type when_clone): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0055-PAR [TERMINAL] "when backdrop switches to [stage1]" (events, hat, type when_backdrop): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0055-EDGE [TERMINAL] "when backdrop switches to [stage1]" (events, hat, type when_backdrop): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0055-SAVE [TERMINAL] "when backdrop switches to [stage1]" (events, hat, type when_backdrop): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0055-DOC [WEB] "when backdrop switches to [stage1]" (events, hat, type when_backdrop): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0055-AI [ANY] "when backdrop switches to [stage1]" (events, hat, type when_backdrop): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0056-PAR [TERMINAL] "wait (1) seconds" (control, stack, type wait): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0056-EDGE [TERMINAL] "wait (1) seconds" (control, stack, type wait): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0056-SAVE [TERMINAL] "wait (1) seconds" (control, stack, type wait): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0056-DOC [WEB] "wait (1) seconds" (control, stack, type wait): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0056-AI [ANY] "wait (1) seconds" (control, stack, type wait): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0057-PAR [TERMINAL] "repeat (10)" (control, C, type repeat): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0057-EDGE [TERMINAL] "repeat (10)" (control, C, type repeat): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0057-SAVE [TERMINAL] "repeat (10)" (control, C, type repeat): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0057-DOC [WEB] "repeat (10)" (control, C, type repeat): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0057-AI [ANY] "repeat (10)" (control, C, type repeat): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0058-PAR [TERMINAL] "forever" (control, C, type forever): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0058-EDGE [TERMINAL] "forever" (control, C, type forever): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0058-SAVE [TERMINAL] "forever" (control, C, type forever): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0058-DOC [WEB] "forever" (control, C, type forever): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0058-AI [ANY] "forever" (control, C, type forever): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0059-PAR [TERMINAL] "if then" (control, C, type if): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0059-EDGE [TERMINAL] "if then" (control, C, type if): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0059-SAVE [TERMINAL] "if then" (control, C, type if): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0059-DOC [WEB] "if then" (control, C, type if): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0059-AI [ANY] "if then" (control, C, type if): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0060-PAR [TERMINAL] "if then else" (control, C, type if_else): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0060-EDGE [TERMINAL] "if then else" (control, C, type if_else): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0060-SAVE [TERMINAL] "if then else" (control, C, type if_else): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0060-DOC [WEB] "if then else" (control, C, type if_else): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0060-AI [ANY] "if then else" (control, C, type if_else): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0061-PAR [TERMINAL] "wait until" (control, stack, type wait_until): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0061-EDGE [TERMINAL] "wait until" (control, stack, type wait_until): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0061-SAVE [TERMINAL] "wait until" (control, stack, type wait_until): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0061-DOC [WEB] "wait until" (control, stack, type wait_until): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0061-AI [ANY] "wait until" (control, stack, type wait_until): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0062-PAR [TERMINAL] "repeat until" (control, C, type repeat_until): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0062-EDGE [TERMINAL] "repeat until" (control, C, type repeat_until): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0062-SAVE [TERMINAL] "repeat until" (control, C, type repeat_until): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0062-DOC [WEB] "repeat until" (control, C, type repeat_until): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0062-AI [ANY] "repeat until" (control, C, type repeat_until): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0063-PAR [TERMINAL] "stop [all]" (control, stack, type stop): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0063-EDGE [TERMINAL] "stop [all]" (control, stack, type stop): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0063-SAVE [TERMINAL] "stop [all]" (control, stack, type stop): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0063-DOC [WEB] "stop [all]" (control, stack, type stop): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0063-AI [ANY] "stop [all]" (control, stack, type stop): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0064-PAR [TERMINAL] "create clone of [myself]" (control, stack, type create_clone): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0064-EDGE [TERMINAL] "create clone of [myself]" (control, stack, type create_clone): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0064-SAVE [TERMINAL] "create clone of [myself]" (control, stack, type create_clone): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0064-DOC [WEB] "create clone of [myself]" (control, stack, type create_clone): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0064-AI [ANY] "create clone of [myself]" (control, stack, type create_clone): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0065-PAR [TERMINAL] "delete this clone" (control, stack, type delete_clone): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0065-EDGE [TERMINAL] "delete this clone" (control, stack, type delete_clone): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0065-SAVE [TERMINAL] "delete this clone" (control, stack, type delete_clone): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0065-DOC [WEB] "delete this clone" (control, stack, type delete_clone): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0065-AI [ANY] "delete this clone" (control, stack, type delete_clone): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0066-PAR [TERMINAL] "touching [mouse-pointer]?" (sensing, boolean, type touching_pointer): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0066-EDGE [TERMINAL] "touching [mouse-pointer]?" (sensing, boolean, type touching_pointer): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0066-SAVE [TERMINAL] "touching [mouse-pointer]?" (sensing, boolean, type touching_pointer): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0066-DOC [WEB] "touching [mouse-pointer]?" (sensing, boolean, type touching_pointer): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0066-AI [ANY] "touching [mouse-pointer]?" (sensing, boolean, type touching_pointer): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0067-PAR [TERMINAL] "key [space] pressed?" (sensing, boolean, type key_pressed): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0067-EDGE [TERMINAL] "key [space] pressed?" (sensing, boolean, type key_pressed): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0067-SAVE [TERMINAL] "key [space] pressed?" (sensing, boolean, type key_pressed): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0067-DOC [WEB] "key [space] pressed?" (sensing, boolean, type key_pressed): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0067-AI [ANY] "key [space] pressed?" (sensing, boolean, type key_pressed): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0068-PAR [TERMINAL] "mouse down?" (sensing, boolean, type mouse_down): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0068-EDGE [TERMINAL] "mouse down?" (sensing, boolean, type mouse_down): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0068-SAVE [TERMINAL] "mouse down?" (sensing, boolean, type mouse_down): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0068-DOC [WEB] "mouse down?" (sensing, boolean, type mouse_down): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0068-AI [ANY] "mouse down?" (sensing, boolean, type mouse_down): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0069-PAR [TERMINAL] "mouse x" (sensing, reporter, type mouse_x): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0069-EDGE [TERMINAL] "mouse x" (sensing, reporter, type mouse_x): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0069-SAVE [TERMINAL] "mouse x" (sensing, reporter, type mouse_x): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0069-DOC [WEB] "mouse x" (sensing, reporter, type mouse_x): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0069-AI [ANY] "mouse x" (sensing, reporter, type mouse_x): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0070-PAR [TERMINAL] "mouse y" (sensing, reporter, type mouse_y): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0070-EDGE [TERMINAL] "mouse y" (sensing, reporter, type mouse_y): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0070-SAVE [TERMINAL] "mouse y" (sensing, reporter, type mouse_y): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0070-DOC [WEB] "mouse y" (sensing, reporter, type mouse_y): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0070-AI [ANY] "mouse y" (sensing, reporter, type mouse_y): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0071-PAR [TERMINAL] "touching sprite [mouse-pointer]?" (sensing, boolean, type touching_sprite): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0071-EDGE [TERMINAL] "touching sprite [mouse-pointer]?" (sensing, boolean, type touching_sprite): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0071-SAVE [TERMINAL] "touching sprite [mouse-pointer]?" (sensing, boolean, type touching_sprite): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0071-DOC [WEB] "touching sprite [mouse-pointer]?" (sensing, boolean, type touching_sprite): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0071-AI [ANY] "touching sprite [mouse-pointer]?" (sensing, boolean, type touching_sprite): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0072-PAR [TERMINAL] "distance to [mouse-pointer]" (sensing, reporter, type distance_to): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0072-EDGE [TERMINAL] "distance to [mouse-pointer]" (sensing, reporter, type distance_to): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0072-SAVE [TERMINAL] "distance to [mouse-pointer]" (sensing, reporter, type distance_to): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0072-DOC [WEB] "distance to [mouse-pointer]" (sensing, reporter, type distance_to): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0072-AI [ANY] "distance to [mouse-pointer]" (sensing, reporter, type distance_to): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0073-PAR [TERMINAL] "[x position] of [_stage_]" (sensing, reporter, type sprite_prop): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0073-EDGE [TERMINAL] "[x position] of [_stage_]" (sensing, reporter, type sprite_prop): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0073-SAVE [TERMINAL] "[x position] of [_stage_]" (sensing, reporter, type sprite_prop): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0073-DOC [WEB] "[x position] of [_stage_]" (sensing, reporter, type sprite_prop): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0073-AI [ANY] "[x position] of [_stage_]" (sensing, reporter, type sprite_prop): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0074-PAR [TERMINAL] "ask (What's your name?) and wait" (sensing, stack, type ask): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0074-EDGE [TERMINAL] "ask (What's your name?) and wait" (sensing, stack, type ask): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0074-SAVE [TERMINAL] "ask (What's your name?) and wait" (sensing, stack, type ask): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0074-DOC [WEB] "ask (What's your name?) and wait" (sensing, stack, type ask): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0074-AI [ANY] "ask (What's your name?) and wait" (sensing, stack, type ask): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0075-PAR [TERMINAL] "set drag mode [draggable]" (sensing, stack, type set_drag_mode): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0075-EDGE [TERMINAL] "set drag mode [draggable]" (sensing, stack, type set_drag_mode): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0075-SAVE [TERMINAL] "set drag mode [draggable]" (sensing, stack, type set_drag_mode): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0075-DOC [WEB] "set drag mode [draggable]" (sensing, stack, type set_drag_mode): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0075-AI [ANY] "set drag mode [draggable]" (sensing, stack, type set_drag_mode): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0076-PAR [TERMINAL] "answer" (sensing, reporter, type answer): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0076-EDGE [TERMINAL] "answer" (sensing, reporter, type answer): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0076-SAVE [TERMINAL] "answer" (sensing, reporter, type answer): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0076-DOC [WEB] "answer" (sensing, reporter, type answer): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0076-AI [ANY] "answer" (sensing, reporter, type answer): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0077-PAR [TERMINAL] "reset timer" (sensing, stack, type reset_timer): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0077-EDGE [TERMINAL] "reset timer" (sensing, stack, type reset_timer): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0077-SAVE [TERMINAL] "reset timer" (sensing, stack, type reset_timer): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0077-DOC [WEB] "reset timer" (sensing, stack, type reset_timer): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0077-AI [ANY] "reset timer" (sensing, stack, type reset_timer): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0078-PAR [TERMINAL] "timer" (sensing, reporter, type timer): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0078-EDGE [TERMINAL] "timer" (sensing, reporter, type timer): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0078-SAVE [TERMINAL] "timer" (sensing, reporter, type timer): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0078-DOC [WEB] "timer" (sensing, reporter, type timer): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0078-AI [ANY] "timer" (sensing, reporter, type timer): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0079-PAR [TERMINAL] "username" (sensing, reporter, type username): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0079-EDGE [TERMINAL] "username" (sensing, reporter, type username): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0079-SAVE [TERMINAL] "username" (sensing, reporter, type username): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0079-DOC [WEB] "username" (sensing, reporter, type username): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0079-AI [ANY] "username" (sensing, reporter, type username): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0080-PAR [TERMINAL] "current time" (sensing, reporter, type current_time): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0080-EDGE [TERMINAL] "current time" (sensing, reporter, type current_time): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0080-SAVE [TERMINAL] "current time" (sensing, reporter, type current_time): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0080-DOC [WEB] "current time" (sensing, reporter, type current_time): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0080-AI [ANY] "current time" (sensing, reporter, type current_time): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0081-PAR [TERMINAL] "current [YEAR]" (sensing, reporter, type current_part): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0081-EDGE [TERMINAL] "current [YEAR]" (sensing, reporter, type current_part): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0081-SAVE [TERMINAL] "current [YEAR]" (sensing, reporter, type current_part): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0081-DOC [WEB] "current [YEAR]" (sensing, reporter, type current_part): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0081-AI [ANY] "current [YEAR]" (sensing, reporter, type current_part): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0082-PAR [TERMINAL] "days since 2000" (sensing, reporter, type days_since_2000): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0082-EDGE [TERMINAL] "days since 2000" (sensing, reporter, type days_since_2000): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0082-SAVE [TERMINAL] "days since 2000" (sensing, reporter, type days_since_2000): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0082-DOC [WEB] "days since 2000" (sensing, reporter, type days_since_2000): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0082-AI [ANY] "days since 2000" (sensing, reporter, type days_since_2000): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0083-PAR [TERMINAL] "() + ()" (operators, reporter, type op_add): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0083-EDGE [TERMINAL] "() + ()" (operators, reporter, type op_add): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0083-SAVE [TERMINAL] "() + ()" (operators, reporter, type op_add): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0083-DOC [WEB] "() + ()" (operators, reporter, type op_add): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0083-AI [ANY] "() + ()" (operators, reporter, type op_add): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0084-PAR [TERMINAL] "() > 50(50)" (operators, boolean, type op_gt): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0084-EDGE [TERMINAL] "() > 50(50)" (operators, boolean, type op_gt): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0084-SAVE [TERMINAL] "() > 50(50)" (operators, boolean, type op_gt): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0084-DOC [WEB] "() > 50(50)" (operators, boolean, type op_gt): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0084-AI [ANY] "() > 50(50)" (operators, boolean, type op_gt): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0085-PAR [TERMINAL] "() < (50)" (operators, boolean, type op_lt): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0085-EDGE [TERMINAL] "() < (50)" (operators, boolean, type op_lt): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0085-SAVE [TERMINAL] "() < (50)" (operators, boolean, type op_lt): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0085-DOC [WEB] "() < (50)" (operators, boolean, type op_lt): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0085-AI [ANY] "() < (50)" (operators, boolean, type op_lt): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0086-PAR [TERMINAL] "() − ()" (operators, reporter, type op_sub): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0086-EDGE [TERMINAL] "() − ()" (operators, reporter, type op_sub): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0086-SAVE [TERMINAL] "() − ()" (operators, reporter, type op_sub): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0086-DOC [WEB] "() − ()" (operators, reporter, type op_sub): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0086-AI [ANY] "() − ()" (operators, reporter, type op_sub): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0087-PAR [TERMINAL] "() × ()" (operators, reporter, type op_mul): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0087-EDGE [TERMINAL] "() × ()" (operators, reporter, type op_mul): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0087-SAVE [TERMINAL] "() × ()" (operators, reporter, type op_mul): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0087-DOC [WEB] "() × ()" (operators, reporter, type op_mul): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0087-AI [ANY] "() × ()" (operators, reporter, type op_mul): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0088-PAR [TERMINAL] "() ÷ 1(1)" (operators, reporter, type op_div): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0088-EDGE [TERMINAL] "() ÷ 1(1)" (operators, reporter, type op_div): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0088-SAVE [TERMINAL] "() ÷ 1(1)" (operators, reporter, type op_div): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0088-DOC [WEB] "() ÷ 1(1)" (operators, reporter, type op_div): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0088-AI [ANY] "() ÷ 1(1)" (operators, reporter, type op_div): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0089-PAR [TERMINAL] "() = ()" (operators, boolean, type op_eq): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0089-EDGE [TERMINAL] "() = ()" (operators, boolean, type op_eq): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0089-SAVE [TERMINAL] "() = ()" (operators, boolean, type op_eq): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0089-DOC [WEB] "() = ()" (operators, boolean, type op_eq): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0089-AI [ANY] "() = ()" (operators, boolean, type op_eq): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0090-PAR [TERMINAL] "and" (operators, boolean, type op_and): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0090-EDGE [TERMINAL] "and" (operators, boolean, type op_and): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0090-SAVE [TERMINAL] "and" (operators, boolean, type op_and): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0090-DOC [WEB] "and" (operators, boolean, type op_and): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0090-AI [ANY] "and" (operators, boolean, type op_and): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0091-PAR [TERMINAL] "or" (operators, boolean, type op_or): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0091-EDGE [TERMINAL] "or" (operators, boolean, type op_or): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0091-SAVE [TERMINAL] "or" (operators, boolean, type op_or): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0091-DOC [WEB] "or" (operators, boolean, type op_or): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0091-AI [ANY] "or" (operators, boolean, type op_or): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0092-PAR [TERMINAL] "not" (operators, boolean, type op_not): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0092-EDGE [TERMINAL] "not" (operators, boolean, type op_not): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0092-SAVE [TERMINAL] "not" (operators, boolean, type op_not): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0092-DOC [WEB] "not" (operators, boolean, type op_not): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0092-AI [ANY] "not" (operators, boolean, type op_not): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0093-PAR [TERMINAL] "10(10) mod 3(3)" (operators, reporter, type op_mod): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0093-EDGE [TERMINAL] "10(10) mod 3(3)" (operators, reporter, type op_mod): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0093-SAVE [TERMINAL] "10(10) mod 3(3)" (operators, reporter, type op_mod): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0093-DOC [WEB] "10(10) mod 3(3)" (operators, reporter, type op_mod): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0093-AI [ANY] "10(10) mod 3(3)" (operators, reporter, type op_mod): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0094-PAR [TERMINAL] "round (3.14)" (operators, reporter, type op_round): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0094-EDGE [TERMINAL] "round (3.14)" (operators, reporter, type op_round): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0094-SAVE [TERMINAL] "round (3.14)" (operators, reporter, type op_round): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0094-DOC [WEB] "round (3.14)" (operators, reporter, type op_round): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0094-AI [ANY] "round (3.14)" (operators, reporter, type op_round): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0095-PAR [TERMINAL] "abs (-5)" (operators, reporter, type op_abs): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0095-EDGE [TERMINAL] "abs (-5)" (operators, reporter, type op_abs): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0095-SAVE [TERMINAL] "abs (-5)" (operators, reporter, type op_abs): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0095-DOC [WEB] "abs (-5)" (operators, reporter, type op_abs): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0095-AI [ANY] "abs (-5)" (operators, reporter, type op_abs): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0096-PAR [TERMINAL] "[abs] of (9)" (operators, reporter, type op_mathop): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0096-EDGE [TERMINAL] "[abs] of (9)" (operators, reporter, type op_mathop): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0096-SAVE [TERMINAL] "[abs] of (9)" (operators, reporter, type op_mathop): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0096-DOC [WEB] "[abs] of (9)" (operators, reporter, type op_mathop): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0096-AI [ANY] "[abs] of (9)" (operators, reporter, type op_mathop): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0097-PAR [TERMINAL] "join hello (hello ) world(world)" (operators, reporter, type op_join): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0097-EDGE [TERMINAL] "join hello (hello ) world(world)" (operators, reporter, type op_join): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0097-SAVE [TERMINAL] "join hello (hello ) world(world)" (operators, reporter, type op_join): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0097-DOC [WEB] "join hello (hello ) world(world)" (operators, reporter, type op_join): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0097-AI [ANY] "join hello (hello ) world(world)" (operators, reporter, type op_join): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0098-PAR [TERMINAL] "length of hello(hello)" (operators, reporter, type op_length): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0098-EDGE [TERMINAL] "length of hello(hello)" (operators, reporter, type op_length): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0098-SAVE [TERMINAL] "length of hello(hello)" (operators, reporter, type op_length): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0098-DOC [WEB] "length of hello(hello)" (operators, reporter, type op_length): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0098-AI [ANY] "length of hello(hello)" (operators, reporter, type op_length): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0099-PAR [TERMINAL] "(apple) contains (a)?" (operators, boolean, type op_contains): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0099-EDGE [TERMINAL] "(apple) contains (a)?" (operators, boolean, type op_contains): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0099-SAVE [TERMINAL] "(apple) contains (a)?" (operators, boolean, type op_contains): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0099-DOC [WEB] "(apple) contains (a)?" (operators, boolean, type op_contains): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0099-AI [ANY] "(apple) contains (a)?" (operators, boolean, type op_contains): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0100-PAR [TERMINAL] "1(1) letter of hello(hello)" (operators, reporter, type op_letter): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0100-EDGE [TERMINAL] "1(1) letter of hello(hello)" (operators, reporter, type op_letter): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0100-SAVE [TERMINAL] "1(1) letter of hello(hello)" (operators, reporter, type op_letter): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0100-DOC [WEB] "1(1) letter of hello(hello)" (operators, reporter, type op_letter): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0100-AI [ANY] "1(1) letter of hello(hello)" (operators, reporter, type op_letter): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0101-PAR [TERMINAL] "pick random 1(1) to 10(10)" (operators, reporter, type op_random): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0101-EDGE [TERMINAL] "pick random 1(1) to 10(10)" (operators, reporter, type op_random): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0101-SAVE [TERMINAL] "pick random 1(1) to 10(10)" (operators, reporter, type op_random): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0101-DOC [WEB] "pick random 1(1) to 10(10)" (operators, reporter, type op_random): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0101-AI [ANY] "pick random 1(1) to 10(10)" (operators, reporter, type op_random): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0102-PAR [TERMINAL] "switch backdrop to [stage1]" (stage, stack, type set_backdrop): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0102-EDGE [TERMINAL] "switch backdrop to [stage1]" (stage, stack, type set_backdrop): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0102-SAVE [TERMINAL] "switch backdrop to [stage1]" (stage, stack, type set_backdrop): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0102-DOC [WEB] "switch backdrop to [stage1]" (stage, stack, type set_backdrop): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0102-AI [ANY] "switch backdrop to [stage1]" (stage, stack, type set_backdrop): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0103-PAR [TERMINAL] "next backdrop" (stage, stack, type next_backdrop): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0103-EDGE [TERMINAL] "next backdrop" (stage, stack, type next_backdrop): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0103-SAVE [TERMINAL] "next backdrop" (stage, stack, type next_backdrop): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0103-DOC [WEB] "next backdrop" (stage, stack, type next_backdrop): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0103-AI [ANY] "next backdrop" (stage, stack, type next_backdrop): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0104-PAR [TERMINAL] "backdrop #" (stage, reporter, type backdrop_number): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0104-EDGE [TERMINAL] "backdrop #" (stage, reporter, type backdrop_number): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0104-SAVE [TERMINAL] "backdrop #" (stage, reporter, type backdrop_number): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0104-DOC [WEB] "backdrop #" (stage, reporter, type backdrop_number): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0104-AI [ANY] "backdrop #" (stage, reporter, type backdrop_number): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0105-PAR [TERMINAL] "backdrop name" (stage, reporter, type backdrop_name): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0105-EDGE [TERMINAL] "backdrop name" (stage, reporter, type backdrop_name): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0105-SAVE [TERMINAL] "backdrop name" (stage, reporter, type backdrop_name): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0105-DOC [WEB] "backdrop name" (stage, reporter, type backdrop_name): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0105-AI [ANY] "backdrop name" (stage, reporter, type backdrop_name): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0106-PAR [TERMINAL] "set backdrop color to (#ffffff)" (stage, stack, type change_backdrop_color): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0106-EDGE [TERMINAL] "set backdrop color to (#ffffff)" (stage, stack, type change_backdrop_color): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0106-SAVE [TERMINAL] "set backdrop color to (#ffffff)" (stage, stack, type change_backdrop_color): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0106-DOC [WEB] "set backdrop color to (#ffffff)" (stage, stack, type change_backdrop_color): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0106-AI [ANY] "set backdrop color to (#ffffff)" (stage, stack, type change_backdrop_color): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0107-PAR [TERMINAL] "add (item) to [my list]" (lists, stack, type list_add): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0107-EDGE [TERMINAL] "add (item) to [my list]" (lists, stack, type list_add): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0107-SAVE [TERMINAL] "add (item) to [my list]" (lists, stack, type list_add): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0107-DOC [WEB] "add (item) to [my list]" (lists, stack, type list_add): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0107-AI [ANY] "add (item) to [my list]" (lists, stack, type list_add): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0108-PAR [TERMINAL] "delete item (1) of [my list]" (lists, stack, type list_delete): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0108-EDGE [TERMINAL] "delete item (1) of [my list]" (lists, stack, type list_delete): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0108-SAVE [TERMINAL] "delete item (1) of [my list]" (lists, stack, type list_delete): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0108-DOC [WEB] "delete item (1) of [my list]" (lists, stack, type list_delete): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0108-AI [ANY] "delete item (1) of [my list]" (lists, stack, type list_delete): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0109-PAR [TERMINAL] "insert (item) at (1) of [my list]" (lists, stack, type list_insert): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0109-EDGE [TERMINAL] "insert (item) at (1) of [my list]" (lists, stack, type list_insert): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0109-SAVE [TERMINAL] "insert (item) at (1) of [my list]" (lists, stack, type list_insert): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0109-DOC [WEB] "insert (item) at (1) of [my list]" (lists, stack, type list_insert): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0109-AI [ANY] "insert (item) at (1) of [my list]" (lists, stack, type list_insert): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0110-PAR [TERMINAL] "replace item (1) of [my list] with (item)" (lists, stack, type list_replace): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0110-EDGE [TERMINAL] "replace item (1) of [my list] with (item)" (lists, stack, type list_replace): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0110-SAVE [TERMINAL] "replace item (1) of [my list] with (item)" (lists, stack, type list_replace): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0110-DOC [WEB] "replace item (1) of [my list] with (item)" (lists, stack, type list_replace): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0110-AI [ANY] "replace item (1) of [my list] with (item)" (lists, stack, type list_replace): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0111-PAR [TERMINAL] "delete all of [my list]" (lists, stack, type list_clear): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0111-EDGE [TERMINAL] "delete all of [my list]" (lists, stack, type list_clear): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0111-SAVE [TERMINAL] "delete all of [my list]" (lists, stack, type list_clear): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0111-DOC [WEB] "delete all of [my list]" (lists, stack, type list_clear): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0111-AI [ANY] "delete all of [my list]" (lists, stack, type list_clear): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0112-PAR [TERMINAL] "show list [my list]" (lists, stack, type list_show): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0112-EDGE [TERMINAL] "show list [my list]" (lists, stack, type list_show): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0112-SAVE [TERMINAL] "show list [my list]" (lists, stack, type list_show): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0112-DOC [WEB] "show list [my list]" (lists, stack, type list_show): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0112-AI [ANY] "show list [my list]" (lists, stack, type list_show): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0113-PAR [TERMINAL] "hide list [my list]" (lists, stack, type list_hide): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0113-EDGE [TERMINAL] "hide list [my list]" (lists, stack, type list_hide): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0113-SAVE [TERMINAL] "hide list [my list]" (lists, stack, type list_hide): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0113-DOC [WEB] "hide list [my list]" (lists, stack, type list_hide): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0113-AI [ANY] "hide list [my list]" (lists, stack, type list_hide): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0114-PAR [TERMINAL] "item (1) of [my list]" (lists, reporter, type list_item): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0114-EDGE [TERMINAL] "item (1) of [my list]" (lists, reporter, type list_item): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0114-SAVE [TERMINAL] "item (1) of [my list]" (lists, reporter, type list_item): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0114-DOC [WEB] "item (1) of [my list]" (lists, reporter, type list_item): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0114-AI [ANY] "item (1) of [my list]" (lists, reporter, type list_item): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0115-PAR [TERMINAL] "[my list]" (lists, reporter, type list_contents): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0115-EDGE [TERMINAL] "[my list]" (lists, reporter, type list_contents): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0115-SAVE [TERMINAL] "[my list]" (lists, reporter, type list_contents): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0115-DOC [WEB] "[my list]" (lists, reporter, type list_contents): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0115-AI [ANY] "[my list]" (lists, reporter, type list_contents): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0116-PAR [TERMINAL] "length of [my list]" (lists, reporter, type list_length): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0116-EDGE [TERMINAL] "length of [my list]" (lists, reporter, type list_length): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0116-SAVE [TERMINAL] "length of [my list]" (lists, reporter, type list_length): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0116-DOC [WEB] "length of [my list]" (lists, reporter, type list_length): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0116-AI [ANY] "length of [my list]" (lists, reporter, type list_length): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0117-PAR [TERMINAL] "[my list] contains (item)?" (lists, boolean, type list_contains): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0117-EDGE [TERMINAL] "[my list] contains (item)?" (lists, boolean, type list_contains): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0117-SAVE [TERMINAL] "[my list] contains (item)?" (lists, boolean, type list_contains): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0117-DOC [WEB] "[my list] contains (item)?" (lists, boolean, type list_contains): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0117-AI [ANY] "[my list] contains (item)?" (lists, boolean, type list_contains): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0118-PAR [TERMINAL] "define (do something) args ()" (myblocks, C, type define_custom): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0118-EDGE [TERMINAL] "define (do something) args ()" (myblocks, C, type define_custom): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0118-SAVE [TERMINAL] "define (do something) args ()" (myblocks, C, type define_custom): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0118-DOC [WEB] "define (do something) args ()" (myblocks, C, type define_custom): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0118-AI [ANY] "define (do something) args ()" (myblocks, C, type define_custom): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0119-PAR [TERMINAL] "call (do something) args ()" (myblocks, stack, type call_custom): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0119-EDGE [TERMINAL] "call (do something) args ()" (myblocks, stack, type call_custom): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0119-SAVE [TERMINAL] "call (do something) args ()" (myblocks, stack, type call_custom): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0119-DOC [WEB] "call (do something) args ()" (myblocks, stack, type call_custom): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0119-AI [ANY] "call (do something) args ()" (myblocks, stack, type call_custom): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0120-PAR [TERMINAL] "value of [my variable]" (myblocks, reporter, type get_var): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0120-EDGE [TERMINAL] "value of [my variable]" (myblocks, reporter, type get_var): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0120-SAVE [TERMINAL] "value of [my variable]" (myblocks, reporter, type get_var): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0120-DOC [WEB] "value of [my variable]" (myblocks, reporter, type get_var): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0120-AI [ANY] "value of [my variable]" (myblocks, reporter, type get_var): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0121-PAR [TERMINAL] "set [my variable] to (0)" (variables, stack, type set_var): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0121-EDGE [TERMINAL] "set [my variable] to (0)" (variables, stack, type set_var): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0121-SAVE [TERMINAL] "set [my variable] to (0)" (variables, stack, type set_var): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0121-DOC [WEB] "set [my variable] to (0)" (variables, stack, type set_var): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0121-AI [ANY] "set [my variable] to (0)" (variables, stack, type set_var): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0122-PAR [TERMINAL] "change [my variable] by (1)" (variables, stack, type change_var): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0122-EDGE [TERMINAL] "change [my variable] by (1)" (variables, stack, type change_var): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0122-SAVE [TERMINAL] "change [my variable] by (1)" (variables, stack, type change_var): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0122-DOC [WEB] "change [my variable] by (1)" (variables, stack, type change_var): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0122-AI [ANY] "change [my variable] by (1)" (variables, stack, type change_var): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0123-PAR [TERMINAL] "show variable [my variable]" (variables, stack, type show_var): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0123-EDGE [TERMINAL] "show variable [my variable]" (variables, stack, type show_var): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0123-SAVE [TERMINAL] "show variable [my variable]" (variables, stack, type show_var): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0123-DOC [WEB] "show variable [my variable]" (variables, stack, type show_var): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0123-AI [ANY] "show variable [my variable]" (variables, stack, type show_var): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0124-PAR [TERMINAL] "hide variable [my variable]" (variables, stack, type hide_var): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0124-EDGE [TERMINAL] "hide variable [my variable]" (variables, stack, type hide_var): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0124-SAVE [TERMINAL] "hide variable [my variable]" (variables, stack, type hide_var): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0124-DOC [WEB] "hide variable [my variable]" (variables, stack, type hide_var): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0124-AI [ANY] "hide variable [my variable]" (variables, stack, type hide_var): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0125-PAR [TERMINAL] "set tile at row (0) col (0) to tile (1) [solid]" (tilemap, stack, type tile_set): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0125-EDGE [TERMINAL] "set tile at row (0) col (0) to tile (1) [solid]" (tilemap, stack, type tile_set): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0125-SAVE [TERMINAL] "set tile at row (0) col (0) to tile (1) [solid]" (tilemap, stack, type tile_set): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0125-DOC [WEB] "set tile at row (0) col (0) to tile (1) [solid]" (tilemap, stack, type tile_set): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0125-AI [ANY] "set tile at row (0) col (0) to tile (1) [solid]" (tilemap, stack, type tile_set): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0126-PAR [TERMINAL] "tile at row (0) col (0) [solid]" (tilemap, reporter, type tile_at): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0126-EDGE [TERMINAL] "tile at row (0) col (0) [solid]" (tilemap, reporter, type tile_at): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0126-SAVE [TERMINAL] "tile at row (0) col (0) [solid]" (tilemap, reporter, type tile_at): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0126-DOC [WEB] "tile at row (0) col (0) [solid]" (tilemap, reporter, type tile_at): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0126-AI [ANY] "tile at row (0) col (0) [solid]" (tilemap, reporter, type tile_at): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0127-PAR [TERMINAL] "tile at row (0) col (0) is solid? [solid]" (tilemap, boolean, type tile_is_solid): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0127-EDGE [TERMINAL] "tile at row (0) col (0) is solid? [solid]" (tilemap, boolean, type tile_is_solid): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0127-SAVE [TERMINAL] "tile at row (0) col (0) is solid? [solid]" (tilemap, boolean, type tile_is_solid): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0127-DOC [WEB] "tile at row (0) col (0) is solid? [solid]" (tilemap, boolean, type tile_is_solid): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0127-AI [ANY] "tile at row (0) col (0) is solid? [solid]" (tilemap, boolean, type tile_is_solid): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0128-PAR [TERMINAL] "clear tilemap layer [solid]" (tilemap, stack, type tile_clear_layer): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0128-EDGE [TERMINAL] "clear tilemap layer [solid]" (tilemap, stack, type tile_clear_layer): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0128-SAVE [TERMINAL] "clear tilemap layer [solid]" (tilemap, stack, type tile_clear_layer): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0128-DOC [WEB] "clear tilemap layer [solid]" (tilemap, stack, type tile_clear_layer): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0128-AI [ANY] "clear tilemap layer [solid]" (tilemap, stack, type tile_clear_layer): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0129-PAR [TERMINAL] "touching a tile?" (tilemap, boolean, type touching_tile): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0129-EDGE [TERMINAL] "touching a tile?" (tilemap, boolean, type touching_tile): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0129-SAVE [TERMINAL] "touching a tile?" (tilemap, boolean, type touching_tile): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0129-DOC [WEB] "touching a tile?" (tilemap, boolean, type touching_tile): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0129-AI [ANY] "touching a tile?" (tilemap, boolean, type touching_tile): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0130-PAR [TERMINAL] "behavior attribute (speed)" (behaviors, reporter, type behavior_get_attr): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0130-EDGE [TERMINAL] "behavior attribute (speed)" (behaviors, reporter, type behavior_get_attr): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0130-SAVE [TERMINAL] "behavior attribute (speed)" (behaviors, reporter, type behavior_get_attr): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0130-DOC [WEB] "behavior attribute (speed)" (behaviors, reporter, type behavior_get_attr): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0130-AI [ANY] "behavior attribute (speed)" (behaviors, reporter, type behavior_get_attr): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0131-PAR [TERMINAL] "set behavior attribute (speed) to (5)" (behaviors, stack, type behavior_set_attr): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0131-EDGE [TERMINAL] "set behavior attribute (speed) to (5)" (behaviors, stack, type behavior_set_attr): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0131-SAVE [TERMINAL] "set behavior attribute (speed) to (5)" (behaviors, stack, type behavior_set_attr): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0131-DOC [WEB] "set behavior attribute (speed) to (5)" (behaviors, stack, type behavior_set_attr): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0131-AI [ANY] "set behavior attribute (speed) to (5)" (behaviors, stack, type behavior_set_attr): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0132-PAR [TERMINAL] "change behavior attribute (speed) by (1)" (behaviors, stack, type behavior_change_attr): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0132-EDGE [TERMINAL] "change behavior attribute (speed) by (1)" (behaviors, stack, type behavior_change_attr): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0132-SAVE [TERMINAL] "change behavior attribute (speed) by (1)" (behaviors, stack, type behavior_change_attr): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0132-DOC [WEB] "change behavior attribute (speed) by (1)" (behaviors, stack, type behavior_change_attr): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0132-AI [ANY] "change behavior attribute (speed) by (1)" (behaviors, stack, type behavior_change_attr): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0133-PAR [TERMINAL] "colliding actor name" (behaviors, reporter, type behavior_event_actor_name): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0133-EDGE [TERMINAL] "colliding actor name" (behaviors, reporter, type behavior_event_actor_name): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0133-SAVE [TERMINAL] "colliding actor name" (behaviors, reporter, type behavior_event_actor_name): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0133-DOC [WEB] "colliding actor name" (behaviors, reporter, type behavior_event_actor_name): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0133-AI [ANY] "colliding actor name" (behaviors, reporter, type behavior_event_actor_name): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0134-PAR [TERMINAL] "colliding tile id" (behaviors, reporter, type behavior_event_tile): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0134-EDGE [TERMINAL] "colliding tile id" (behaviors, reporter, type behavior_event_tile): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0134-SAVE [TERMINAL] "colliding tile id" (behaviors, reporter, type behavior_event_tile): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0134-DOC [WEB] "colliding tile id" (behaviors, reporter, type behavior_event_tile): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0134-AI [ANY] "colliding tile id" (behaviors, reporter, type behavior_event_tile): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0135-PAR [TERMINAL] "📷 set camera to x: (0) y: (0)" (gw9-ext, stack, type cam_set_xy): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0135-EDGE [TERMINAL] "📷 set camera to x: (0) y: (0)" (gw9-ext, stack, type cam_set_xy): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0135-SAVE [TERMINAL] "📷 set camera to x: (0) y: (0)" (gw9-ext, stack, type cam_set_xy): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0135-DOC [WEB] "📷 set camera to x: (0) y: (0)" (gw9-ext, stack, type cam_set_xy): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0135-AI [ANY] "📷 set camera to x: (0) y: (0)" (gw9-ext, stack, type cam_set_xy): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0136-PAR [TERMINAL] "📷 set camera x to (0)" (gw9-ext, stack, type cam_set_x): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0136-EDGE [TERMINAL] "📷 set camera x to (0)" (gw9-ext, stack, type cam_set_x): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0136-SAVE [TERMINAL] "📷 set camera x to (0)" (gw9-ext, stack, type cam_set_x): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0136-DOC [WEB] "📷 set camera x to (0)" (gw9-ext, stack, type cam_set_x): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0136-AI [ANY] "📷 set camera x to (0)" (gw9-ext, stack, type cam_set_x): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0137-PAR [TERMINAL] "📷 set camera y to (0)" (gw9-ext, stack, type cam_set_y): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0137-EDGE [TERMINAL] "📷 set camera y to (0)" (gw9-ext, stack, type cam_set_y): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0137-SAVE [TERMINAL] "📷 set camera y to (0)" (gw9-ext, stack, type cam_set_y): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0137-DOC [WEB] "📷 set camera y to (0)" (gw9-ext, stack, type cam_set_y): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0137-AI [ANY] "📷 set camera y to (0)" (gw9-ext, stack, type cam_set_y): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0138-PAR [TERMINAL] "📷 change camera x by (10)" (gw9-ext, stack, type cam_change_x): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0138-EDGE [TERMINAL] "📷 change camera x by (10)" (gw9-ext, stack, type cam_change_x): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0138-SAVE [TERMINAL] "📷 change camera x by (10)" (gw9-ext, stack, type cam_change_x): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0138-DOC [WEB] "📷 change camera x by (10)" (gw9-ext, stack, type cam_change_x): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0138-AI [ANY] "📷 change camera x by (10)" (gw9-ext, stack, type cam_change_x): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0139-PAR [TERMINAL] "📷 change camera y by (10)" (gw9-ext, stack, type cam_change_y): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0139-EDGE [TERMINAL] "📷 change camera y by (10)" (gw9-ext, stack, type cam_change_y): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0139-SAVE [TERMINAL] "📷 change camera y by (10)" (gw9-ext, stack, type cam_change_y): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0139-DOC [WEB] "📷 change camera y by (10)" (gw9-ext, stack, type cam_change_y): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0139-AI [ANY] "📷 change camera y by (10)" (gw9-ext, stack, type cam_change_y): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0140-PAR [TERMINAL] "📷 set camera zoom to (100) %" (gw9-ext, stack, type cam_set_zoom): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0140-EDGE [TERMINAL] "📷 set camera zoom to (100) %" (gw9-ext, stack, type cam_set_zoom): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0140-SAVE [TERMINAL] "📷 set camera zoom to (100) %" (gw9-ext, stack, type cam_set_zoom): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0140-DOC [WEB] "📷 set camera zoom to (100) %" (gw9-ext, stack, type cam_set_zoom): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0140-AI [ANY] "📷 set camera zoom to (100) %" (gw9-ext, stack, type cam_set_zoom): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0141-PAR [TERMINAL] "📷 change camera zoom by (10)" (gw9-ext, stack, type cam_change_zoom): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0141-EDGE [TERMINAL] "📷 change camera zoom by (10)" (gw9-ext, stack, type cam_change_zoom): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0141-SAVE [TERMINAL] "📷 change camera zoom by (10)" (gw9-ext, stack, type cam_change_zoom): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0141-DOC [WEB] "📷 change camera zoom by (10)" (gw9-ext, stack, type cam_change_zoom): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0141-AI [ANY] "📷 change camera zoom by (10)" (gw9-ext, stack, type cam_change_zoom): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0142-PAR [TERMINAL] "📷 move camera to [myself]" (gw9-ext, stack, type cam_goto): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0142-EDGE [TERMINAL] "📷 move camera to [myself]" (gw9-ext, stack, type cam_goto): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0142-SAVE [TERMINAL] "📷 move camera to [myself]" (gw9-ext, stack, type cam_goto): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0142-DOC [WEB] "📷 move camera to [myself]" (gw9-ext, stack, type cam_goto): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0142-AI [ANY] "📷 move camera to [myself]" (gw9-ext, stack, type cam_goto): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0143-PAR [TERMINAL] "📷 move camera (10) steps" (gw9-ext, stack, type cam_move): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0143-EDGE [TERMINAL] "📷 move camera (10) steps" (gw9-ext, stack, type cam_move): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0143-SAVE [TERMINAL] "📷 move camera (10) steps" (gw9-ext, stack, type cam_move): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0143-DOC [WEB] "📷 move camera (10) steps" (gw9-ext, stack, type cam_move): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0143-AI [ANY] "📷 move camera (10) steps" (gw9-ext, stack, type cam_move): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0144-PAR [TERMINAL] "📷 set camera direction to (90)" (gw9-ext, stack, type cam_set_dir): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0144-EDGE [TERMINAL] "📷 set camera direction to (90)" (gw9-ext, stack, type cam_set_dir): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0144-SAVE [TERMINAL] "📷 set camera direction to (90)" (gw9-ext, stack, type cam_set_dir): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0144-DOC [WEB] "📷 set camera direction to (90)" (gw9-ext, stack, type cam_set_dir): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0144-AI [ANY] "📷 set camera direction to (90)" (gw9-ext, stack, type cam_set_dir): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0145-PAR [TERMINAL] "📷 turn camera ↻ (15) degrees" (gw9-ext, stack, type cam_turn_cw): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0145-EDGE [TERMINAL] "📷 turn camera ↻ (15) degrees" (gw9-ext, stack, type cam_turn_cw): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0145-SAVE [TERMINAL] "📷 turn camera ↻ (15) degrees" (gw9-ext, stack, type cam_turn_cw): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0145-DOC [WEB] "📷 turn camera ↻ (15) degrees" (gw9-ext, stack, type cam_turn_cw): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0145-AI [ANY] "📷 turn camera ↻ (15) degrees" (gw9-ext, stack, type cam_turn_cw): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0146-PAR [TERMINAL] "📷 turn camera ↺ (15) degrees" (gw9-ext, stack, type cam_turn_ccw): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0146-EDGE [TERMINAL] "📷 turn camera ↺ (15) degrees" (gw9-ext, stack, type cam_turn_ccw): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0146-SAVE [TERMINAL] "📷 turn camera ↺ (15) degrees" (gw9-ext, stack, type cam_turn_ccw): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0146-DOC [WEB] "📷 turn camera ↺ (15) degrees" (gw9-ext, stack, type cam_turn_ccw): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0146-AI [ANY] "📷 turn camera ↺ (15) degrees" (gw9-ext, stack, type cam_turn_ccw): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0147-PAR [TERMINAL] "set layer of [myself] to (1)" (gw9-ext, stack, type ext_set_layer): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0147-EDGE [TERMINAL] "set layer of [myself] to (1)" (gw9-ext, stack, type ext_set_layer): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0147-SAVE [TERMINAL] "set layer of [myself] to (1)" (gw9-ext, stack, type ext_set_layer): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0147-DOC [WEB] "set layer of [myself] to (1)" (gw9-ext, stack, type ext_set_layer): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0147-AI [ANY] "set layer of [myself] to (1)" (gw9-ext, stack, type ext_set_layer): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0148-PAR [TERMINAL] "set frame rate to (60)" (gw9-ext, stack, type rt_set_fps): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0148-EDGE [TERMINAL] "set frame rate to (60)" (gw9-ext, stack, type rt_set_fps): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0148-SAVE [TERMINAL] "set frame rate to (60)" (gw9-ext, stack, type rt_set_fps): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0148-DOC [WEB] "set frame rate to (60)" (gw9-ext, stack, type rt_set_fps): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0148-AI [ANY] "set frame rate to (60)" (gw9-ext, stack, type rt_set_fps): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0149-PAR [TERMINAL] "set stage size width: (480) height: (360)" (gw9-ext, stack, type rt_set_size): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0149-EDGE [TERMINAL] "set stage size width: (480) height: (360)" (gw9-ext, stack, type rt_set_size): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0149-SAVE [TERMINAL] "set stage size width: (480) height: (360)" (gw9-ext, stack, type rt_set_size): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0149-DOC [WEB] "set stage size width: (480) height: (360)" (gw9-ext, stack, type rt_set_size): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0149-AI [ANY] "set stage size width: (480) height: (360)" (gw9-ext, stack, type rt_set_size): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0150-PAR [TERMINAL] "stop sound []" (gw9-ext, stack, type snd_stop_one): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0150-EDGE [TERMINAL] "stop sound []" (gw9-ext, stack, type snd_stop_one): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0150-SAVE [TERMINAL] "stop sound []" (gw9-ext, stack, type snd_stop_one): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0150-DOC [WEB] "stop sound []" (gw9-ext, stack, type snd_stop_one): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0150-AI [ANY] "stop sound []" (gw9-ext, stack, type snd_stop_one): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0151-PAR [TERMINAL] "start looping [] from (0) s" (gw9-ext, stack, type snd_loop): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0151-EDGE [TERMINAL] "start looping [] from (0) s" (gw9-ext, stack, type snd_loop): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0151-SAVE [TERMINAL] "start looping [] from (0) s" (gw9-ext, stack, type snd_loop): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0151-DOC [WEB] "start looping [] from (0) s" (gw9-ext, stack, type snd_loop): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0151-AI [ANY] "start looping [] from (0) s" (gw9-ext, stack, type snd_loop): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0152-PAR [TERMINAL] "press key [space] for (0.1) seconds [without waiting]" (gw9-ext, stack, type key_sim): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0152-EDGE [TERMINAL] "press key [space] for (0.1) seconds [without waiting]" (gw9-ext, stack, type key_sim): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0152-SAVE [TERMINAL] "press key [space] for (0.1) seconds [without waiting]" (gw9-ext, stack, type key_sim): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0152-DOC [WEB] "press key [space] for (0.1) seconds [without waiting]" (gw9-ext, stack, type key_sim): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0152-AI [ANY] "press key [space] for (0.1) seconds [without waiting]" (gw9-ext, stack, type key_sim): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0153-PAR [TERMINAL] "⚛ setup stage [boxed]" (gw9-ext, stack, type phys_set_stage): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0153-EDGE [TERMINAL] "⚛ setup stage [boxed]" (gw9-ext, stack, type phys_set_stage): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0153-SAVE [TERMINAL] "⚛ setup stage [boxed]" (gw9-ext, stack, type phys_set_stage): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0153-DOC [WEB] "⚛ setup stage [boxed]" (gw9-ext, stack, type phys_set_stage): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0153-AI [ANY] "⚛ setup stage [boxed]" (gw9-ext, stack, type phys_set_stage): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0154-PAR [TERMINAL] "⚛ set gravity to x: (0) y: (-10)" (gw9-ext, stack, type phys_set_gravity): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0154-EDGE [TERMINAL] "⚛ set gravity to x: (0) y: (-10)" (gw9-ext, stack, type phys_set_gravity): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0154-SAVE [TERMINAL] "⚛ set gravity to x: (0) y: (-10)" (gw9-ext, stack, type phys_set_gravity): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0154-DOC [WEB] "⚛ set gravity to x: (0) y: (-10)" (gw9-ext, stack, type phys_set_gravity): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0154-AI [ANY] "⚛ set gravity to x: (0) y: (-10)" (gw9-ext, stack, type phys_set_gravity): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0155-PAR [TERMINAL] "⚛ enable for [costume] mode [normal]" (gw9-ext, stack, type phys_enable): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0155-EDGE [TERMINAL] "⚛ enable for [costume] mode [normal]" (gw9-ext, stack, type phys_enable): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0155-SAVE [TERMINAL] "⚛ enable for [costume] mode [normal]" (gw9-ext, stack, type phys_enable): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0155-DOC [WEB] "⚛ enable for [costume] mode [normal]" (gw9-ext, stack, type phys_enable): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0155-AI [ANY] "⚛ enable for [costume] mode [normal]" (gw9-ext, stack, type phys_enable): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0156-PAR [TERMINAL] "⚛ disable physics for this sprite" (gw9-ext, stack, type phys_disable): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0156-EDGE [TERMINAL] "⚛ disable physics for this sprite" (gw9-ext, stack, type phys_disable): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0156-SAVE [TERMINAL] "⚛ disable physics for this sprite" (gw9-ext, stack, type phys_disable): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0156-DOC [WEB] "⚛ disable physics for this sprite" (gw9-ext, stack, type phys_disable): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0156-AI [ANY] "⚛ disable physics for this sprite" (gw9-ext, stack, type phys_disable): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0157-PAR [TERMINAL] "⚛ step simulation" (gw9-ext, stack, type phys_tick): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0157-EDGE [TERMINAL] "⚛ step simulation" (gw9-ext, stack, type phys_tick): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0157-SAVE [TERMINAL] "⚛ step simulation" (gw9-ext, stack, type phys_tick): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0157-DOC [WEB] "⚛ step simulation" (gw9-ext, stack, type phys_tick): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0157-AI [ANY] "⚛ step simulation" (gw9-ext, stack, type phys_tick): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0158-PAR [TERMINAL] "⚛ set simulation rate to (30) /s" (gw9-ext, stack, type phys_set_tickrate): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0158-EDGE [TERMINAL] "⚛ set simulation rate to (30) /s" (gw9-ext, stack, type phys_set_tickrate): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0158-SAVE [TERMINAL] "⚛ set simulation rate to (30) /s" (gw9-ext, stack, type phys_set_tickrate): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0158-DOC [WEB] "⚛ set simulation rate to (30) /s" (gw9-ext, stack, type phys_set_tickrate): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0158-AI [ANY] "⚛ set simulation rate to (30) /s" (gw9-ext, stack, type phys_set_tickrate): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0159-PAR [TERMINAL] "⚛ go to x: (0) y: (0) [world]" (gw9-ext, stack, type phys_set_pos): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0159-EDGE [TERMINAL] "⚛ go to x: (0) y: (0) [world]" (gw9-ext, stack, type phys_set_pos): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0159-SAVE [TERMINAL] "⚛ go to x: (0) y: (0) [world]" (gw9-ext, stack, type phys_set_pos): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0159-DOC [WEB] "⚛ go to x: (0) y: (0) [world]" (gw9-ext, stack, type phys_set_pos): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0159-AI [ANY] "⚛ go to x: (0) y: (0) [world]" (gw9-ext, stack, type phys_set_pos): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0160-PAR [TERMINAL] "⚛ set velocity to sx: (0) sy: (0)" (gw9-ext, stack, type phys_set_vel): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0160-EDGE [TERMINAL] "⚛ set velocity to sx: (0) sy: (0)" (gw9-ext, stack, type phys_set_vel): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0160-SAVE [TERMINAL] "⚛ set velocity to sx: (0) sy: (0)" (gw9-ext, stack, type phys_set_vel): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0160-DOC [WEB] "⚛ set velocity to sx: (0) sy: (0)" (gw9-ext, stack, type phys_set_vel): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0160-AI [ANY] "⚛ set velocity to sx: (0) sy: (0)" (gw9-ext, stack, type phys_set_vel): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0161-PAR [TERMINAL] "⚛ change velocity by sx: (0) sy: (0)" (gw9-ext, stack, type phys_change_vel): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0161-EDGE [TERMINAL] "⚛ change velocity by sx: (0) sy: (0)" (gw9-ext, stack, type phys_change_vel): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0161-SAVE [TERMINAL] "⚛ change velocity by sx: (0) sy: (0)" (gw9-ext, stack, type phys_change_vel): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0161-DOC [WEB] "⚛ change velocity by sx: (0) sy: (0)" (gw9-ext, stack, type phys_change_vel): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0161-AI [ANY] "⚛ change velocity by sx: (0) sy: (0)" (gw9-ext, stack, type phys_change_vel): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0162-PAR [TERMINAL] "⚛ push with force (25) in direction (0)" (gw9-ext, stack, type phys_push): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0162-EDGE [TERMINAL] "⚛ push with force (25) in direction (0)" (gw9-ext, stack, type phys_push): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0162-SAVE [TERMINAL] "⚛ push with force (25) in direction (0)" (gw9-ext, stack, type phys_push): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0162-DOC [WEB] "⚛ push with force (25) in direction (0)" (gw9-ext, stack, type phys_push): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0162-AI [ANY] "⚛ push with force (25) in direction (0)" (gw9-ext, stack, type phys_push): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0163-PAR [TERMINAL] "⚛ spin with force (500)" (gw9-ext, stack, type phys_spin): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0163-EDGE [TERMINAL] "⚛ spin with force (500)" (gw9-ext, stack, type phys_spin): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0163-SAVE [TERMINAL] "⚛ spin with force (500)" (gw9-ext, stack, type phys_spin): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0163-DOC [WEB] "⚛ spin with force (500)" (gw9-ext, stack, type phys_spin): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0163-AI [ANY] "⚛ spin with force (500)" (gw9-ext, stack, type phys_spin): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0164-PAR [TERMINAL] "⚛ set angular velocity to (30)" (gw9-ext, stack, type phys_set_spin): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0164-EDGE [TERMINAL] "⚛ set angular velocity to (30)" (gw9-ext, stack, type phys_set_spin): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0164-SAVE [TERMINAL] "⚛ set angular velocity to (30)" (gw9-ext, stack, type phys_set_spin): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0164-DOC [WEB] "⚛ set angular velocity to (30)" (gw9-ext, stack, type phys_set_spin): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0164-AI [ANY] "⚛ set angular velocity to (30)" (gw9-ext, stack, type phys_set_spin): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0165-PAR [TERMINAL] "⚛ set fixed [dynamic]" (gw9-ext, stack, type phys_set_fixed): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0165-EDGE [TERMINAL] "⚛ set fixed [dynamic]" (gw9-ext, stack, type phys_set_fixed): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0165-SAVE [TERMINAL] "⚛ set fixed [dynamic]" (gw9-ext, stack, type phys_set_fixed): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0165-DOC [WEB] "⚛ set fixed [dynamic]" (gw9-ext, stack, type phys_set_fixed): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0165-AI [ANY] "⚛ set fixed [dynamic]" (gw9-ext, stack, type phys_set_fixed): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0166-PAR [TERMINAL] "⚛ set density [25]" (gw9-ext, stack, type phys_density): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0166-EDGE [TERMINAL] "⚛ set density [25]" (gw9-ext, stack, type phys_density): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0166-SAVE [TERMINAL] "⚛ set density [25]" (gw9-ext, stack, type phys_density): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0166-DOC [WEB] "⚛ set density [25]" (gw9-ext, stack, type phys_density): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0166-AI [ANY] "⚛ set density [25]" (gw9-ext, stack, type phys_density): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0167-PAR [TERMINAL] "⚛ set density to (100)" (gw9-ext, stack, type phys_density_n): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0167-EDGE [TERMINAL] "⚛ set density to (100)" (gw9-ext, stack, type phys_density_n): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0167-SAVE [TERMINAL] "⚛ set density to (100)" (gw9-ext, stack, type phys_density_n): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0167-DOC [WEB] "⚛ set density to (100)" (gw9-ext, stack, type phys_density_n): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0167-AI [ANY] "⚛ set density to (100)" (gw9-ext, stack, type phys_density_n): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0168-PAR [TERMINAL] "⚛ set friction [0]" (gw9-ext, stack, type phys_friction): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0168-EDGE [TERMINAL] "⚛ set friction [0]" (gw9-ext, stack, type phys_friction): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0168-SAVE [TERMINAL] "⚛ set friction [0]" (gw9-ext, stack, type phys_friction): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0168-DOC [WEB] "⚛ set friction [0]" (gw9-ext, stack, type phys_friction): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0168-AI [ANY] "⚛ set friction [0]" (gw9-ext, stack, type phys_friction): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0169-PAR [TERMINAL] "⚛ set friction to (50)" (gw9-ext, stack, type phys_friction_n): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0169-EDGE [TERMINAL] "⚛ set friction to (50)" (gw9-ext, stack, type phys_friction_n): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0169-SAVE [TERMINAL] "⚛ set friction to (50)" (gw9-ext, stack, type phys_friction_n): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0169-DOC [WEB] "⚛ set friction to (50)" (gw9-ext, stack, type phys_friction_n): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0169-AI [ANY] "⚛ set friction to (50)" (gw9-ext, stack, type phys_friction_n): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0170-PAR [TERMINAL] "⚛ set bounce [0]" (gw9-ext, stack, type phys_bounce): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0170-EDGE [TERMINAL] "⚛ set bounce [0]" (gw9-ext, stack, type phys_bounce): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0170-SAVE [TERMINAL] "⚛ set bounce [0]" (gw9-ext, stack, type phys_bounce): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0170-DOC [WEB] "⚛ set bounce [0]" (gw9-ext, stack, type phys_bounce): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0170-AI [ANY] "⚛ set bounce [0]" (gw9-ext, stack, type phys_bounce): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0171-PAR [TERMINAL] "⚛ set bounce to (20)" (gw9-ext, stack, type phys_bounce_n): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0171-EDGE [TERMINAL] "⚛ set bounce to (20)" (gw9-ext, stack, type phys_bounce_n): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0171-SAVE [TERMINAL] "⚛ set bounce to (20)" (gw9-ext, stack, type phys_bounce_n): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0171-DOC [WEB] "⚛ set bounce to (20)" (gw9-ext, stack, type phys_bounce_n): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0171-AI [ANY] "⚛ set bounce to (20)" (gw9-ext, stack, type phys_bounce_n): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0172-PAR [TERMINAL] "⚛ set density [25] roughness [0] bounce [0]" (gw9-ext, stack, type phys_props): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0172-EDGE [TERMINAL] "⚛ set density [25] roughness [0] bounce [0]" (gw9-ext, stack, type phys_props): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0172-SAVE [TERMINAL] "⚛ set density [25] roughness [0] bounce [0]" (gw9-ext, stack, type phys_props): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0172-DOC [WEB] "⚛ set density [25] roughness [0] bounce [0]" (gw9-ext, stack, type phys_props): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0172-AI [ANY] "⚛ set density [25] roughness [0] bounce [0]" (gw9-ext, stack, type phys_props): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0173-PAR [TERMINAL] "⚛ set scroll x: (0) y: (0)" (gw9-ext, stack, type phys_set_scroll): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0173-EDGE [TERMINAL] "⚛ set scroll x: (0) y: (0)" (gw9-ext, stack, type phys_set_scroll): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0173-SAVE [TERMINAL] "⚛ set scroll x: (0) y: (0)" (gw9-ext, stack, type phys_set_scroll): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0173-DOC [WEB] "⚛ set scroll x: (0) y: (0)" (gw9-ext, stack, type phys_set_scroll): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0173-AI [ANY] "⚛ set scroll x: (0) y: (0)" (gw9-ext, stack, type phys_set_scroll): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0174-PAR [TERMINAL] "⚛ change scroll by x: (0) y: (0)" (gw9-ext, stack, type phys_change_scroll): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0174-EDGE [TERMINAL] "⚛ change scroll by x: (0) y: (0)" (gw9-ext, stack, type phys_change_scroll): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0174-SAVE [TERMINAL] "⚛ change scroll by x: (0) y: (0)" (gw9-ext, stack, type phys_change_scroll): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0174-DOC [WEB] "⚛ change scroll by x: (0) y: (0)" (gw9-ext, stack, type phys_change_scroll): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0174-AI [ANY] "⚛ change scroll by x: (0) y: (0)" (gw9-ext, stack, type phys_change_scroll): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0175-PAR [TERMINAL] "📷 set background color to (#ffffff)" (gw9-ext, stack, type cam_set_col): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0175-EDGE [TERMINAL] "📷 set background color to (#ffffff)" (gw9-ext, stack, type cam_set_col): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0175-SAVE [TERMINAL] "📷 set background color to (#ffffff)" (gw9-ext, stack, type cam_set_col): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0175-DOC [WEB] "📷 set background color to (#ffffff)" (gw9-ext, stack, type cam_set_col): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0175-AI [ANY] "📷 set background color to (#ffffff)" (gw9-ext, stack, type cam_set_col): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).
[ ] BLK-0176-PAR [TERMINAL] "switch (plane_) to closest (90) using angles (0, 30, 50, 70, 90, 110, 130, 150, 180, -160," (gw9-ext, stack, type angle_costume): same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.
[ ] BLK-0176-EDGE [TERMINAL] "switch (plane_) to closest (90) using angles (0, 30, 50, 70, 90, 110, 130, 150, 180, -160," (gw9-ext, stack, type angle_costume): edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.
[ ] BLK-0176-SAVE [TERMINAL] "switch (plane_) to closest (90) using angles (0, 30, 50, 70, 90, 110, 130, 150, 180, -160," (gw9-ext, stack, type angle_costume): save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)
[ ] BLK-0176-DOC [WEB] "switch (plane_) to closest (90) using angles (0, 30, 50, 70, 90, 110, 130, 150, 180, -160," (gw9-ext, stack, type angle_costume): write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)
[ ] BLK-0176-AI [ANY] "switch (plane_) to closest (90) using angles (0, 30, 50, 70, 90, 110, 130, 150, 180, -160," (gw9-ext, stack, type angle_costume): 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).


---
## chatgpt-jobs/JOBS-EXTENSIONS.txt

JOBS - EVERY GALLERY EXTENSION (184 x 5 = 920 jobs)   source: app.html gw10GalleryData
READ FIRST: team/ai-team/CHATGPT-JOBS.md › HOW-TO-DO-EACH-JOB.md (step by step for every job type, report + bug templates).
RULES: team/ai-team/README.md. Work in batches of 10 jobs (same file, top to bottom, skip [x]). One report per batch:
team/chatgpt/jobs/<FILE>-<first id>-<last id>.md (one short section per job: result, proof, bug found? yes/no). Mark each job here
[x] (done) or [~] (done, found a bug -> also write team/chatgpt/bugs/BUG-<id>.md). Push after every batch + one AI-TEAM.txt line.
Proof words: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED. Never invent results. Never edit app.html.
Never run an extension's JavaScript outside the sandbox G-Warp already uses. Dangerous ones: read only, don't run.

[ ] EXT-0001-LOAD [TERMINAL] Animated Text (TurboWarp/text, by LilyMakesThings, GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0001-RUN [TERMINAL] Animated Text (TurboWarp/text, by LilyMakesThings, GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0001-CREDIT [WEB] Animated Text (TurboWarp/text, by LilyMakesThings, GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0001-SAFE [WEB] Animated Text (TurboWarp/text, by LilyMakesThings, GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0001-DOC [WEB] Animated Text (TurboWarp/text, by LilyMakesThings, GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0002-LOAD [TERMINAL] Face Sensing (TurboWarp/faceSensing, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0002-RUN [TERMINAL] Face Sensing (TurboWarp/faceSensing, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0002-CREDIT [WEB] Face Sensing (TurboWarp/faceSensing, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0002-SAFE [WEB] Face Sensing (TurboWarp/faceSensing, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0002-DOC [WEB] Face Sensing (TurboWarp/faceSensing, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0003-LOAD [TERMINAL] Video Sprites (TurboWarp/videoSprites, by Staevski_G): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0003-RUN [TERMINAL] Video Sprites (TurboWarp/videoSprites, by Staevski_G): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0003-CREDIT [WEB] Video Sprites (TurboWarp/videoSprites, by Staevski_G): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0003-SAFE [WEB] Video Sprites (TurboWarp/videoSprites, by Staevski_G): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0003-DOC [WEB] Video Sprites (TurboWarp/videoSprites, by Staevski_G): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0004-LOAD [TERMINAL] Stretch (TurboWarp/stretch, by GarboMuffin, TheStarWorld): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0004-RUN [TERMINAL] Stretch (TurboWarp/stretch, by GarboMuffin, TheStarWorld): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0004-CREDIT [WEB] Stretch (TurboWarp/stretch, by GarboMuffin, TheStarWorld): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0004-SAFE [WEB] Stretch (TurboWarp/stretch, by GarboMuffin, TheStarWorld): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0004-DOC [WEB] Stretch (TurboWarp/stretch, by GarboMuffin, TheStarWorld): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0005-LOAD [TERMINAL] Gamepad (TurboWarp/Gamepad, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0005-RUN [TERMINAL] Gamepad (TurboWarp/Gamepad, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0005-CREDIT [WEB] Gamepad (TurboWarp/Gamepad, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0005-SAFE [WEB] Gamepad (TurboWarp/Gamepad, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0005-DOC [WEB] Gamepad (TurboWarp/Gamepad, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0006-LOAD [TERMINAL] Box2D Physics (TurboWarp/griffpatch, by ?): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0006-RUN [TERMINAL] Box2D Physics (TurboWarp/griffpatch, by ?): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0006-CREDIT [WEB] Box2D Physics (TurboWarp/griffpatch, by ?): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0006-SAFE [WEB] Box2D Physics (TurboWarp/griffpatch, by ?): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0006-DOC [WEB] Box2D Physics (TurboWarp/griffpatch, by ?): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0007-LOAD [TERMINAL] Files (TurboWarp/files, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0007-RUN [TERMINAL] Files (TurboWarp/files, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0007-CREDIT [WEB] Files (TurboWarp/files, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0007-SAFE [WEB] Files (TurboWarp/files, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0007-DOC [WEB] Files (TurboWarp/files, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0008-LOAD [TERMINAL] Pointerlock (TurboWarp/pointerlock, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0008-RUN [TERMINAL] Pointerlock (TurboWarp/pointerlock, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0008-CREDIT [WEB] Pointerlock (TurboWarp/pointerlock, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0008-SAFE [WEB] Pointerlock (TurboWarp/pointerlock, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0008-DOC [WEB] Pointerlock (TurboWarp/pointerlock, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0009-LOAD [TERMINAL] Mouse Cursor (TurboWarp/MouseCursor, by Samq64, GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0009-RUN [TERMINAL] Mouse Cursor (TurboWarp/MouseCursor, by Samq64, GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0009-CREDIT [WEB] Mouse Cursor (TurboWarp/MouseCursor, by Samq64, GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0009-SAFE [WEB] Mouse Cursor (TurboWarp/MouseCursor, by Samq64, GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0009-DOC [WEB] Mouse Cursor (TurboWarp/MouseCursor, by Samq64, GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0010-LOAD [TERMINAL] Runtime Options (TurboWarp/runtimeoptions, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0010-RUN [TERMINAL] Runtime Options (TurboWarp/runtimeoptions, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0010-CREDIT [WEB] Runtime Options (TurboWarp/runtimeoptions, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0010-SAFE [WEB] Runtime Options (TurboWarp/runtimeoptions, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0010-DOC [WEB] Runtime Options (TurboWarp/runtimeoptions, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0011-LOAD [TERMINAL] Fetch (TurboWarp/fetch, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0011-RUN [TERMINAL] Fetch (TurboWarp/fetch, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0011-CREDIT [WEB] Fetch (TurboWarp/fetch, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0011-SAFE [WEB] Fetch (TurboWarp/fetch, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0011-DOC [WEB] Fetch (TurboWarp/fetch, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0012-LOAD [TERMINAL] Text (TurboWarp/strings, by CST1229, BludIsAnLemon, Man-o-Valor): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0012-RUN [TERMINAL] Text (TurboWarp/strings, by CST1229, BludIsAnLemon, Man-o-Valor): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0012-CREDIT [WEB] Text (TurboWarp/strings, by CST1229, BludIsAnLemon, Man-o-Valor): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0012-SAFE [WEB] Text (TurboWarp/strings, by CST1229, BludIsAnLemon, Man-o-Valor): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0012-DOC [WEB] Text (TurboWarp/strings, by CST1229, BludIsAnLemon, Man-o-Valor): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0013-LOAD [TERMINAL] Local Storage (TurboWarp/localstorage, by infernostars, GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0013-RUN [TERMINAL] Local Storage (TurboWarp/localstorage, by infernostars, GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0013-CREDIT [WEB] Local Storage (TurboWarp/localstorage, by infernostars, GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0013-SAFE [WEB] Local Storage (TurboWarp/localstorage, by infernostars, GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0013-DOC [WEB] Local Storage (TurboWarp/localstorage, by infernostars, GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0014-LOAD [TERMINAL] Base (TurboWarp/truefantombase, by TrueFantom): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0014-RUN [TERMINAL] Base (TurboWarp/truefantombase, by TrueFantom): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0014-CREDIT [WEB] Base (TurboWarp/truefantombase, by TrueFantom): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0014-SAFE [WEB] Base (TurboWarp/truefantombase, by TrueFantom): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0014-DOC [WEB] Base (TurboWarp/truefantombase, by TrueFantom): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0015-LOAD [TERMINAL] Bitwise (TurboWarp/Bitwise, by TrueFantom): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0015-RUN [TERMINAL] Bitwise (TurboWarp/Bitwise, by TrueFantom): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0015-CREDIT [WEB] Bitwise (TurboWarp/Bitwise, by TrueFantom): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0015-SAFE [WEB] Bitwise (TurboWarp/Bitwise, by TrueFantom): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0015-DOC [WEB] Bitwise (TurboWarp/Bitwise, by TrueFantom): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0016-LOAD [TERMINAL] BigInt (TurboWarp/skyhigh173BigInt, by Skyhigh173): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0016-RUN [TERMINAL] BigInt (TurboWarp/skyhigh173BigInt, by Skyhigh173): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0016-CREDIT [WEB] BigInt (TurboWarp/skyhigh173BigInt, by Skyhigh173): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0016-SAFE [WEB] BigInt (TurboWarp/skyhigh173BigInt, by Skyhigh173): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0016-DOC [WEB] BigInt (TurboWarp/skyhigh173BigInt, by Skyhigh173): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0017-LOAD [TERMINAL] Utilities (TurboWarp/utilities, by ?): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0017-RUN [TERMINAL] Utilities (TurboWarp/utilities, by ?): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0017-CREDIT [WEB] Utilities (TurboWarp/utilities, by ?): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0017-SAFE [WEB] Utilities (TurboWarp/utilities, by ?): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0017-DOC [WEB] Utilities (TurboWarp/utilities, by ?): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0018-LOAD [TERMINAL] Video (TurboWarp/lmsVideo, by LilyMakesThings, SharkPool, Fath11): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0018-RUN [TERMINAL] Video (TurboWarp/lmsVideo, by LilyMakesThings, SharkPool, Fath11): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0018-CREDIT [WEB] Video (TurboWarp/lmsVideo, by LilyMakesThings, SharkPool, Fath11): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0018-SAFE [WEB] Video (TurboWarp/lmsVideo, by LilyMakesThings, SharkPool, Fath11): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0018-DOC [WEB] Video (TurboWarp/lmsVideo, by LilyMakesThings, SharkPool, Fath11): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0019-LOAD [TERMINAL] Iframe (TurboWarp/iframe, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0019-RUN [TERMINAL] Iframe (TurboWarp/iframe, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0019-CREDIT [WEB] Iframe (TurboWarp/iframe, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0019-SAFE [WEB] Iframe (TurboWarp/iframe, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0019-DOC [WEB] Iframe (TurboWarp/iframe, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0020-LOAD [TERMINAL] HTML Encode (TurboWarp/clayhtmlencode, by clay-rip): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0020-RUN [TERMINAL] HTML Encode (TurboWarp/clayhtmlencode, by clay-rip): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0020-CREDIT [WEB] HTML Encode (TurboWarp/clayhtmlencode, by clay-rip): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0020-SAFE [WEB] HTML Encode (TurboWarp/clayhtmlencode, by clay-rip): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0020-DOC [WEB] HTML Encode (TurboWarp/clayhtmlencode, by clay-rip): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0021-LOAD [TERMINAL] Clipping & Blending (TurboWarp/xeltallivclipblend, by Vadik1): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0021-RUN [TERMINAL] Clipping & Blending (TurboWarp/xeltallivclipblend, by Vadik1): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0021-CREDIT [WEB] Clipping & Blending (TurboWarp/xeltallivclipblend, by Vadik1): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0021-SAFE [WEB] Clipping & Blending (TurboWarp/xeltallivclipblend, by Vadik1): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0021-DOC [WEB] Clipping & Blending (TurboWarp/xeltallivclipblend, by Vadik1): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0022-LOAD [TERMINAL] Clipboard (TurboWarp/clipboard, by tomyo-code, AdamMady, NamelessCat): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0022-RUN [TERMINAL] Clipboard (TurboWarp/clipboard, by tomyo-code, AdamMady, NamelessCat): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0022-CREDIT [WEB] Clipboard (TurboWarp/clipboard, by tomyo-code, AdamMady, NamelessCat): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0022-SAFE [WEB] Clipboard (TurboWarp/clipboard, by tomyo-code, AdamMady, NamelessCat): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0022-DOC [WEB] Clipboard (TurboWarp/clipboard, by tomyo-code, AdamMady, NamelessCat): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0023-LOAD [TERMINAL] Pen Plus V7 (TurboWarp/penP, by ObviousAlexC, Pen-Group): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0023-RUN [TERMINAL] Pen Plus V7 (TurboWarp/penP, by ObviousAlexC, Pen-Group): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0023-CREDIT [WEB] Pen Plus V7 (TurboWarp/penP, by ObviousAlexC, Pen-Group): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0023-SAFE [WEB] Pen Plus V7 (TurboWarp/penP, by ObviousAlexC, Pen-Group): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0023-DOC [WEB] Pen Plus V7 (TurboWarp/penP, by ObviousAlexC, Pen-Group): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0024-LOAD [TERMINAL] Pen Plus V5 (Old) (TurboWarp/betterpen, by ObviousAlexC): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0024-RUN [TERMINAL] Pen Plus V5 (Old) (TurboWarp/betterpen, by ObviousAlexC): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0024-CREDIT [WEB] Pen Plus V5 (Old) (TurboWarp/betterpen, by ObviousAlexC): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0024-SAFE [WEB] Pen Plus V5 (Old) (TurboWarp/betterpen, by ObviousAlexC): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0024-DOC [WEB] Pen Plus V5 (Old) (TurboWarp/betterpen, by ObviousAlexC): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0025-LOAD [TERMINAL] Simple 3D (TurboWarp/xeltallivSimple3D, by Vadik1): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0025-RUN [TERMINAL] Simple 3D (TurboWarp/xeltallivSimple3D, by Vadik1): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0025-CREDIT [WEB] Simple 3D (TurboWarp/xeltallivSimple3D, by Vadik1): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0025-SAFE [WEB] Simple 3D (TurboWarp/xeltallivSimple3D, by Vadik1): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0025-DOC [WEB] Simple 3D (TurboWarp/xeltallivSimple3D, by Vadik1): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0026-LOAD [TERMINAL] Skins (TurboWarp/lmsSkins, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0026-RUN [TERMINAL] Skins (TurboWarp/lmsSkins, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0026-CREDIT [WEB] Skins (TurboWarp/lmsSkins, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0026-SAFE [WEB] Skins (TurboWarp/lmsSkins, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0026-DOC [WEB] Skins (TurboWarp/lmsSkins, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0027-LOAD [TERMINAL] Sensing Plus (TurboWarp/obviousalexsensing, by ObviousAlexC): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0027-RUN [TERMINAL] Sensing Plus (TurboWarp/obviousalexsensing, by ObviousAlexC): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0027-CREDIT [WEB] Sensing Plus (TurboWarp/obviousalexsensing, by ObviousAlexC): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0027-SAFE [WEB] Sensing Plus (TurboWarp/obviousalexsensing, by ObviousAlexC): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0027-DOC [WEB] Sensing Plus (TurboWarp/obviousalexsensing, by ObviousAlexC): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0028-LOAD [TERMINAL] Key Simulation (TurboWarp/cubesterKeySimulation, by CubesterYT): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0028-RUN [TERMINAL] Key Simulation (TurboWarp/cubesterKeySimulation, by CubesterYT): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0028-CREDIT [WEB] Key Simulation (TurboWarp/cubesterKeySimulation, by CubesterYT): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0028-SAFE [WEB] Key Simulation (TurboWarp/cubesterKeySimulation, by CubesterYT): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0028-DOC [WEB] Key Simulation (TurboWarp/cubesterKeySimulation, by CubesterYT): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0029-LOAD [TERMINAL] Clones Plus (TurboWarp/lmsclonesplus, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0029-RUN [TERMINAL] Clones Plus (TurboWarp/lmsclonesplus, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0029-CREDIT [WEB] Clones Plus (TurboWarp/lmsclonesplus, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0029-SAFE [WEB] Clones Plus (TurboWarp/lmsclonesplus, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0029-DOC [WEB] Clones Plus (TurboWarp/lmsclonesplus, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0030-LOAD [TERMINAL] Looks Plus (TurboWarp/lmsLooksPlus, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0030-RUN [TERMINAL] Looks Plus (TurboWarp/lmsLooksPlus, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0030-CREDIT [WEB] Looks Plus (TurboWarp/lmsLooksPlus, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0030-SAFE [WEB] Looks Plus (TurboWarp/lmsLooksPlus, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0030-DOC [WEB] Looks Plus (TurboWarp/lmsLooksPlus, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0031-LOAD [TERMINAL] More Events (TurboWarp/lmsMoreEvents, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0031-RUN [TERMINAL] More Events (TurboWarp/lmsMoreEvents, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0031-CREDIT [WEB] More Events (TurboWarp/lmsMoreEvents, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0031-SAFE [WEB] More Events (TurboWarp/lmsMoreEvents, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0031-DOC [WEB] More Events (TurboWarp/lmsMoreEvents, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0032-LOAD [TERMINAL] Messages+ (TurboWarp/SPmessagePlus, by SharkPool): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0032-RUN [TERMINAL] Messages+ (TurboWarp/SPmessagePlus, by SharkPool): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0032-CREDIT [WEB] Messages+ (TurboWarp/SPmessagePlus, by SharkPool): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0032-SAFE [WEB] Messages+ (TurboWarp/SPmessagePlus, by SharkPool): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0032-DOC [WEB] Messages+ (TurboWarp/SPmessagePlus, by SharkPool): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0033-LOAD [TERMINAL] List Tools (TurboWarp/lmsListTools, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0033-RUN [TERMINAL] List Tools (TurboWarp/lmsListTools, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0033-CREDIT [WEB] List Tools (TurboWarp/lmsListTools, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0033-SAFE [WEB] List Tools (TurboWarp/lmsListTools, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0033-DOC [WEB] List Tools (TurboWarp/lmsListTools, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0034-LOAD [TERMINAL] Mobile Keyboard (TurboWarp/mobilekeyboard0419, by veggiecan0419): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0034-RUN [TERMINAL] Mobile Keyboard (TurboWarp/mobilekeyboard0419, by veggiecan0419): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0034-CREDIT [WEB] Mobile Keyboard (TurboWarp/mobilekeyboard0419, by veggiecan0419): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0034-SAFE [WEB] Mobile Keyboard (TurboWarp/mobilekeyboard0419, by veggiecan0419): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0034-DOC [WEB] Mobile Keyboard (TurboWarp/mobilekeyboard0419, by veggiecan0419): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0035-LOAD [TERMINAL] More Motion (TurboWarp/nkmoremotion, by NamelessCat): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0035-RUN [TERMINAL] More Motion (TurboWarp/nkmoremotion, by NamelessCat): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0035-CREDIT [WEB] More Motion (TurboWarp/nkmoremotion, by NamelessCat): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0035-SAFE [WEB] More Motion (TurboWarp/nkmoremotion, by NamelessCat): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0035-DOC [WEB] More Motion (TurboWarp/nkmoremotion, by NamelessCat): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0036-LOAD [TERMINAL] Window Controls (TurboWarp/cubesterWindowControls, by CubesterYT): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0036-RUN [TERMINAL] Window Controls (TurboWarp/cubesterWindowControls, by CubesterYT): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0036-CREDIT [WEB] Window Controls (TurboWarp/cubesterWindowControls, by CubesterYT): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0036-SAFE [WEB] Window Controls (TurboWarp/cubesterWindowControls, by CubesterYT): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0036-DOC [WEB] Window Controls (TurboWarp/cubesterWindowControls, by CubesterYT): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0037-LOAD [TERMINAL] Browser Fullscreen (TurboWarp/fullscreen0419, by Veggiecan0419): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0037-RUN [TERMINAL] Browser Fullscreen (TurboWarp/fullscreen0419, by Veggiecan0419): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0037-CREDIT [WEB] Browser Fullscreen (TurboWarp/fullscreen0419, by Veggiecan0419): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0037-SAFE [WEB] Browser Fullscreen (TurboWarp/fullscreen0419, by Veggiecan0419): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0037-DOC [WEB] Browser Fullscreen (TurboWarp/fullscreen0419, by Veggiecan0419): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0038-LOAD [TERMINAL] Screen Resolution (TurboWarp/shreder95resolution, by shreder95ua): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0038-RUN [TERMINAL] Screen Resolution (TurboWarp/shreder95resolution, by shreder95ua): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0038-CREDIT [WEB] Screen Resolution (TurboWarp/shreder95resolution, by shreder95ua): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0038-SAFE [WEB] Screen Resolution (TurboWarp/shreder95resolution, by shreder95ua): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0038-DOC [WEB] Screen Resolution (TurboWarp/shreder95resolution, by shreder95ua): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0039-LOAD [TERMINAL] Ask Before Closing Tab (TurboWarp/xmerclosecontrol, by XmerOriginals): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0039-RUN [TERMINAL] Ask Before Closing Tab (TurboWarp/xmerclosecontrol, by XmerOriginals): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0039-CREDIT [WEB] Ask Before Closing Tab (TurboWarp/xmerclosecontrol, by XmerOriginals): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0039-SAFE [WEB] Ask Before Closing Tab (TurboWarp/xmerclosecontrol, by XmerOriginals): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0039-DOC [WEB] Ask Before Closing Tab (TurboWarp/xmerclosecontrol, by XmerOriginals): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0040-LOAD [TERMINAL] Navigator (TurboWarp/navigatorinfo, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0040-RUN [TERMINAL] Navigator (TurboWarp/navigatorinfo, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0040-CREDIT [WEB] Navigator (TurboWarp/navigatorinfo, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0040-SAFE [WEB] Navigator (TurboWarp/navigatorinfo, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0040-DOC [WEB] Navigator (TurboWarp/navigatorinfo, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0041-LOAD [TERMINAL] Battery (TurboWarp/battery, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0041-RUN [TERMINAL] Battery (TurboWarp/battery, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0041-CREDIT [WEB] Battery (TurboWarp/battery, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0041-SAFE [WEB] Battery (TurboWarp/battery, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0041-DOC [WEB] Battery (TurboWarp/battery, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0042-LOAD [TERMINAL] Vibration (TurboWarp/pwldevvibration, by PwLDev): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0042-RUN [TERMINAL] Vibration (TurboWarp/pwldevvibration, by PwLDev): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0042-CREDIT [WEB] Vibration (TurboWarp/pwldevvibration, by PwLDev): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0042-SAFE [WEB] Vibration (TurboWarp/pwldevvibration, by PwLDev): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0042-DOC [WEB] Vibration (TurboWarp/pwldevvibration, by PwLDev): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0043-LOAD [TERMINAL] Custom Styles (TurboWarp/shovelcss, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0043-RUN [TERMINAL] Custom Styles (TurboWarp/shovelcss, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0043-CREDIT [WEB] Custom Styles (TurboWarp/shovelcss, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0043-SAFE [WEB] Custom Styles (TurboWarp/shovelcss, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0043-DOC [WEB] Custom Styles (TurboWarp/shovelcss, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0044-LOAD [TERMINAL] Color Picker (TurboWarp/shovelColorPicker, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0044-RUN [TERMINAL] Color Picker (TurboWarp/shovelColorPicker, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0044-CREDIT [WEB] Color Picker (TurboWarp/shovelColorPicker, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0044-SAFE [WEB] Color Picker (TurboWarp/shovelColorPicker, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0044-DOC [WEB] Color Picker (TurboWarp/shovelColorPicker, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0045-LOAD [TERMINAL] Control Controls (TurboWarp/nkcontrols, by NamelessCat): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0045-RUN [TERMINAL] Control Controls (TurboWarp/nkcontrols, by NamelessCat): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0045-CREDIT [WEB] Control Controls (TurboWarp/nkcontrols, by NamelessCat): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0045-SAFE [WEB] Control Controls (TurboWarp/nkcontrols, by NamelessCat): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0045-DOC [WEB] Control Controls (TurboWarp/nkcontrols, by NamelessCat): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0046-LOAD [TERMINAL] Notifications (TurboWarp/mdwaltersnotifications, by mdwalters): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0046-RUN [TERMINAL] Notifications (TurboWarp/mdwaltersnotifications, by mdwalters): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0046-CREDIT [WEB] Notifications (TurboWarp/mdwaltersnotifications, by mdwalters): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0046-SAFE [WEB] Notifications (TurboWarp/mdwaltersnotifications, by mdwalters): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0046-DOC [WEB] Notifications (TurboWarp/mdwaltersnotifications, by mdwalters): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0047-LOAD [TERMINAL] Delta Time (TurboWarp/dtbyxeroname, by XeroName): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0047-RUN [TERMINAL] Delta Time (TurboWarp/dtbyxeroname, by XeroName): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0047-CREDIT [WEB] Delta Time (TurboWarp/dtbyxeroname, by XeroName): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0047-SAFE [WEB] Delta Time (TurboWarp/dtbyxeroname, by XeroName): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0047-DOC [WEB] Delta Time (TurboWarp/dtbyxeroname, by XeroName): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0048-LOAD [TERMINAL] Augmented Reality (TurboWarp/AR, by Vadik1): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0048-RUN [TERMINAL] Augmented Reality (TurboWarp/AR, by Vadik1): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0048-CREDIT [WEB] Augmented Reality (TurboWarp/AR, by Vadik1): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0048-SAFE [WEB] Augmented Reality (TurboWarp/AR, by Vadik1): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0048-DOC [WEB] Augmented Reality (TurboWarp/AR, by Vadik1): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0049-LOAD [TERMINAL] Encoding (TurboWarp/Encoding, by -SIPC-): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0049-RUN [TERMINAL] Encoding (TurboWarp/Encoding, by -SIPC-): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0049-CREDIT [WEB] Encoding (TurboWarp/Encoding, by -SIPC-): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0049-SAFE [WEB] Encoding (TurboWarp/Encoding, by -SIPC-): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0049-DOC [WEB] Encoding (TurboWarp/Encoding, by -SIPC-): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0050-LOAD [TERMINAL] Tune Shark V3 (TurboWarp/SPtuneShark3, by SharkPool): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0050-RUN [TERMINAL] Tune Shark V3 (TurboWarp/SPtuneShark3, by SharkPool): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0050-CREDIT [WEB] Tune Shark V3 (TurboWarp/SPtuneShark3, by SharkPool): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0050-SAFE [WEB] Tune Shark V3 (TurboWarp/SPtuneShark3, by SharkPool): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0050-DOC [WEB] Tune Shark V3 (TurboWarp/SPtuneShark3, by SharkPool): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0051-LOAD [TERMINAL] Sound Expanded (TurboWarp/lmsSoundExpanded, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0051-RUN [TERMINAL] Sound Expanded (TurboWarp/lmsSoundExpanded, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0051-CREDIT [WEB] Sound Expanded (TurboWarp/lmsSoundExpanded, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0051-SAFE [WEB] Sound Expanded (TurboWarp/lmsSoundExpanded, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0051-DOC [WEB] Sound Expanded (TurboWarp/lmsSoundExpanded, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0052-LOAD [TERMINAL] Temporary Variables (TurboWarp/lmsTempVars2, by LilyMakesThings, Mio): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0052-RUN [TERMINAL] Temporary Variables (TurboWarp/lmsTempVars2, by LilyMakesThings, Mio): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0052-CREDIT [WEB] Temporary Variables (TurboWarp/lmsTempVars2, by LilyMakesThings, Mio): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0052-SAFE [WEB] Temporary Variables (TurboWarp/lmsTempVars2, by LilyMakesThings, Mio): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0052-DOC [WEB] Temporary Variables (TurboWarp/lmsTempVars2, by LilyMakesThings, Mio): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0053-LOAD [TERMINAL] More Timers (TurboWarp/lmsTimers, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0053-RUN [TERMINAL] More Timers (TurboWarp/lmsTimers, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0053-CREDIT [WEB] More Timers (TurboWarp/lmsTimers, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0053-SAFE [WEB] More Timers (TurboWarp/lmsTimers, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0053-DOC [WEB] More Timers (TurboWarp/lmsTimers, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0054-LOAD [TERMINAL] Ping Cloud Data (TurboWarp/clouddataping, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0054-RUN [TERMINAL] Ping Cloud Data (TurboWarp/clouddataping, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0054-CREDIT [WEB] Ping Cloud Data (TurboWarp/clouddataping, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0054-SAFE [WEB] Ping Cloud Data (TurboWarp/clouddataping, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0054-DOC [WEB] Ping Cloud Data (TurboWarp/clouddataping, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0055-LOAD [TERMINAL] CloudLink V4 (TurboWarp/cloudlink, by MikeDEV): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0055-RUN [TERMINAL] CloudLink V4 (TurboWarp/cloudlink, by MikeDEV): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0055-CREDIT [WEB] CloudLink V4 (TurboWarp/cloudlink, by MikeDEV): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0055-SAFE [WEB] CloudLink V4 (TurboWarp/cloudlink, by MikeDEV): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0055-DOC [WEB] CloudLink V4 (TurboWarp/cloudlink, by MikeDEV): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0056-LOAD [TERMINAL] Network (TurboWarp/truefantomnetwork, by TrueFantom): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0056-RUN [TERMINAL] Network (TurboWarp/truefantomnetwork, by TrueFantom): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0056-CREDIT [WEB] Network (TurboWarp/truefantomnetwork, by TrueFantom): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0056-SAFE [WEB] Network (TurboWarp/truefantomnetwork, by TrueFantom): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0056-DOC [WEB] Network (TurboWarp/truefantomnetwork, by TrueFantom): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0057-LOAD [TERMINAL] Math (TurboWarp/truefantommath, by TrueFantom): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0057-RUN [TERMINAL] Math (TurboWarp/truefantommath, by TrueFantom): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0057-CREDIT [WEB] Math (TurboWarp/truefantommath, by TrueFantom): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0057-SAFE [WEB] Math (TurboWarp/truefantommath, by TrueFantom): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0057-DOC [WEB] Math (TurboWarp/truefantommath, by TrueFantom): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0058-LOAD [TERMINAL] RegExp (TurboWarp/truefantomregexp, by TrueFantom): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0058-RUN [TERMINAL] RegExp (TurboWarp/truefantomregexp, by TrueFantom): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0058-CREDIT [WEB] RegExp (TurboWarp/truefantomregexp, by TrueFantom): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0058-SAFE [WEB] RegExp (TurboWarp/truefantomregexp, by TrueFantom): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0058-DOC [WEB] RegExp (TurboWarp/truefantomregexp, by TrueFantom): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0059-LOAD [TERMINAL] Couplers (TurboWarp/truefantomcouplers, by TrueFantom): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0059-RUN [TERMINAL] Couplers (TurboWarp/truefantomcouplers, by TrueFantom): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0059-CREDIT [WEB] Couplers (TurboWarp/truefantomcouplers, by TrueFantom): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0059-SAFE [WEB] Couplers (TurboWarp/truefantomcouplers, by TrueFantom): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0059-DOC [WEB] Couplers (TurboWarp/truefantomcouplers, by TrueFantom): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0060-LOAD [TERMINAL] Geolocation (TurboWarp/samuelloufgeolocation, by SamuelLouf): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0060-RUN [TERMINAL] Geolocation (TurboWarp/samuelloufgeolocation, by SamuelLouf): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0060-CREDIT [WEB] Geolocation (TurboWarp/samuelloufgeolocation, by SamuelLouf): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0060-SAFE [WEB] Geolocation (TurboWarp/samuelloufgeolocation, by SamuelLouf): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0060-DOC [WEB] Geolocation (TurboWarp/samuelloufgeolocation, by SamuelLouf): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0061-LOAD [TERMINAL] Format Numbers (TurboWarp/dogeiscutformatnumbers, by DogeisCut): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0061-RUN [TERMINAL] Format Numbers (TurboWarp/dogeiscutformatnumbers, by DogeisCut): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0061-CREDIT [WEB] Format Numbers (TurboWarp/dogeiscutformatnumbers, by DogeisCut): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0061-SAFE [WEB] Format Numbers (TurboWarp/dogeiscutformatnumbers, by DogeisCut): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0061-DOC [WEB] Format Numbers (TurboWarp/dogeiscutformatnumbers, by DogeisCut): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0062-LOAD [TERMINAL] All Menus (TurboWarp/lmsAllMenus, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0062-RUN [TERMINAL] All Menus (TurboWarp/lmsAllMenus, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0062-CREDIT [WEB] All Menus (TurboWarp/lmsAllMenus, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0062-SAFE [WEB] All Menus (TurboWarp/lmsAllMenus, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0062-DOC [WEB] All Menus (TurboWarp/lmsAllMenus, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0063-LOAD [TERMINAL] Hidden Block Collection (TurboWarp/lmsHackedBlocks, by LilyMakesThings, pumpkinhasapatch): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0063-RUN [TERMINAL] Hidden Block Collection (TurboWarp/lmsHackedBlocks, by LilyMakesThings, pumpkinhasapatch): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0063-CREDIT [WEB] Hidden Block Collection (TurboWarp/lmsHackedBlocks, by LilyMakesThings, pumpkinhasapatch): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0063-SAFE [WEB] Hidden Block Collection (TurboWarp/lmsHackedBlocks, by LilyMakesThings, pumpkinhasapatch): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0063-DOC [WEB] Hidden Block Collection (TurboWarp/lmsHackedBlocks, by LilyMakesThings, pumpkinhasapatch): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0064-LOAD [TERMINAL] Cast (TurboWarp/lmsCast, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0064-RUN [TERMINAL] Cast (TurboWarp/lmsCast, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0064-CREDIT [WEB] Cast (TurboWarp/lmsCast, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0064-SAFE [WEB] Cast (TurboWarp/lmsCast, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0064-DOC [WEB] Cast (TurboWarp/lmsCast, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0065-LOAD [TERMINAL] Time (TurboWarp/sipctime, by -SIPC-, SharkPool): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0065-RUN [TERMINAL] Time (TurboWarp/sipctime, by -SIPC-, SharkPool): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0065-CREDIT [WEB] Time (TurboWarp/sipctime, by -SIPC-, SharkPool): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0065-SAFE [WEB] Time (TurboWarp/sipctime, by -SIPC-, SharkPool): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0065-DOC [WEB] Time (TurboWarp/sipctime, by -SIPC-, SharkPool): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0066-LOAD [TERMINAL] Consoles (TurboWarp/sipcconsole, by -SIPC-): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0066-RUN [TERMINAL] Consoles (TurboWarp/sipcconsole, by -SIPC-): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0066-CREDIT [WEB] Consoles (TurboWarp/sipcconsole, by -SIPC-): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0066-SAFE [WEB] Consoles (TurboWarp/sipcconsole, by -SIPC-): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0066-DOC [WEB] Consoles (TurboWarp/sipcconsole, by -SIPC-): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0067-LOAD [TERMINAL] Search Params (TurboWarp/zxmushroom63searchparams, by ZXMushroom63): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0067-RUN [TERMINAL] Search Params (TurboWarp/zxmushroom63searchparams, by ZXMushroom63): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0067-CREDIT [WEB] Search Params (TurboWarp/zxmushroom63searchparams, by ZXMushroom63): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0067-SAFE [WEB] Search Params (TurboWarp/zxmushroom63searchparams, by ZXMushroom63): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0067-DOC [WEB] Search Params (TurboWarp/zxmushroom63searchparams, by ZXMushroom63): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0068-LOAD [TERMINAL] ShovelUtils (TurboWarp/ShovelUtils, by TheShovel, Mio): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0068-RUN [TERMINAL] ShovelUtils (TurboWarp/ShovelUtils, by TheShovel, Mio): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0068-CREDIT [WEB] ShovelUtils (TurboWarp/ShovelUtils, by TheShovel, Mio): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0068-SAFE [WEB] ShovelUtils (TurboWarp/ShovelUtils, by TheShovel, Mio): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0068-DOC [WEB] ShovelUtils (TurboWarp/ShovelUtils, by TheShovel, Mio): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0069-LOAD [TERMINAL] Asset Manager (TurboWarp/lmsAssets, by LilyMakesThings, Mio): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0069-RUN [TERMINAL] Asset Manager (TurboWarp/lmsAssets, by LilyMakesThings, Mio): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0069-CREDIT [WEB] Asset Manager (TurboWarp/lmsAssets, by LilyMakesThings, Mio): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0069-SAFE [WEB] Asset Manager (TurboWarp/lmsAssets, by LilyMakesThings, Mio): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0069-DOC [WEB] Asset Manager (TurboWarp/lmsAssets, by LilyMakesThings, Mio): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0070-LOAD [TERMINAL] Font Manager (TurboWarp/SPASfontManager, by SharkPool, Mio): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0070-RUN [TERMINAL] Font Manager (TurboWarp/SPASfontManager, by SharkPool, Mio): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0070-CREDIT [WEB] Font Manager (TurboWarp/SPASfontManager, by SharkPool, Mio): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0070-SAFE [WEB] Font Manager (TurboWarp/SPASfontManager, by SharkPool, Mio): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0070-DOC [WEB] Font Manager (TurboWarp/SPASfontManager, by SharkPool, Mio): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0071-LOAD [TERMINAL] Wake Lock (TurboWarp/dninwakelock, by D-ScratchNinja): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0071-RUN [TERMINAL] Wake Lock (TurboWarp/dninwakelock, by D-ScratchNinja): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0071-CREDIT [WEB] Wake Lock (TurboWarp/dninwakelock, by D-ScratchNinja): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0071-SAFE [WEB] Wake Lock (TurboWarp/dninwakelock, by D-ScratchNinja): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0071-DOC [WEB] Wake Lock (TurboWarp/dninwakelock, by D-ScratchNinja): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0072-LOAD [TERMINAL] JSON (TurboWarp/skyhigh173JSON, by Skyhigh173, Mio): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0072-RUN [TERMINAL] JSON (TurboWarp/skyhigh173JSON, by Skyhigh173, Mio): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0072-CREDIT [WEB] JSON (TurboWarp/skyhigh173JSON, by Skyhigh173, Mio): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0072-SAFE [WEB] JSON (TurboWarp/skyhigh173JSON, by Skyhigh173, Mio): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0072-DOC [WEB] JSON (TurboWarp/skyhigh173JSON, by Skyhigh173, Mio): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0073-LOAD [TERMINAL] XML (TurboWarp/mbwxml, by mybearworld): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0073-RUN [TERMINAL] XML (TurboWarp/mbwxml, by mybearworld): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0073-CREDIT [WEB] XML (TurboWarp/mbwxml, by mybearworld): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0073-SAFE [WEB] XML (TurboWarp/mbwxml, by mybearworld): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0073-DOC [WEB] XML (TurboWarp/mbwxml, by mybearworld): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0074-LOAD [TERMINAL] Numerical Encoding V2 (TurboWarp/numericalencoding2, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0074-RUN [TERMINAL] Numerical Encoding V2 (TurboWarp/numericalencoding2, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0074-CREDIT [WEB] Numerical Encoding V2 (TurboWarp/numericalencoding2, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0074-SAFE [WEB] Numerical Encoding V2 (TurboWarp/numericalencoding2, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0074-DOC [WEB] Numerical Encoding V2 (TurboWarp/numericalencoding2, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0075-LOAD [TERMINAL] Numerical Encoding V1 (TurboWarp/cs2627883NumericalEncoding, by cs2627883): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0075-RUN [TERMINAL] Numerical Encoding V1 (TurboWarp/cs2627883NumericalEncoding, by cs2627883): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0075-CREDIT [WEB] Numerical Encoding V1 (TurboWarp/cs2627883NumericalEncoding, by cs2627883): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0075-SAFE [WEB] Numerical Encoding V1 (TurboWarp/cs2627883NumericalEncoding, by cs2627883): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0075-DOC [WEB] Numerical Encoding V1 (TurboWarp/cs2627883NumericalEncoding, by cs2627883): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0076-LOAD [TERMINAL] Camera V2 (TurboWarp/SPcamera, by SharkPool): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0076-RUN [TERMINAL] Camera V2 (TurboWarp/SPcamera, by SharkPool): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0076-CREDIT [WEB] Camera V2 (TurboWarp/SPcamera, by SharkPool): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0076-SAFE [WEB] Camera V2 (TurboWarp/SPcamera, by SharkPool): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0076-DOC [WEB] Camera V2 (TurboWarp/SPcamera, by SharkPool): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0077-LOAD [TERMINAL] Camera V1 (Buggy) (TurboWarp/DTcameracontrols, by DT): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0077-RUN [TERMINAL] Camera V1 (Buggy) (TurboWarp/DTcameracontrols, by DT): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0077-CREDIT [WEB] Camera V1 (Buggy) (TurboWarp/DTcameracontrols, by DT): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0077-SAFE [WEB] Camera V1 (Buggy) (TurboWarp/DTcameracontrols, by DT): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0077-DOC [WEB] Camera V1 (Buggy) (TurboWarp/DTcameracontrols, by DT): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0078-LOAD [TERMINAL] Canvas Effects (TurboWarp/theshovelcanvaseffects, by TheShovel, SharkPool): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0078-RUN [TERMINAL] Canvas Effects (TurboWarp/theshovelcanvaseffects, by TheShovel, SharkPool): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0078-CREDIT [WEB] Canvas Effects (TurboWarp/theshovelcanvaseffects, by TheShovel, SharkPool): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0078-SAFE [WEB] Canvas Effects (TurboWarp/theshovelcanvaseffects, by TheShovel, SharkPool): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0078-DOC [WEB] Canvas Effects (TurboWarp/theshovelcanvaseffects, by TheShovel, SharkPool): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0079-LOAD [TERMINAL] RGB Channels (TurboWarp/lbdrawtest, by Longboost): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0079-RUN [TERMINAL] RGB Channels (TurboWarp/lbdrawtest, by Longboost): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0079-CREDIT [WEB] RGB Channels (TurboWarp/lbdrawtest, by Longboost): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0079-SAFE [WEB] RGB Channels (TurboWarp/lbdrawtest, by Longboost): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0079-DOC [WEB] RGB Channels (TurboWarp/lbdrawtest, by Longboost): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0080-LOAD [TERMINAL] Zip (TurboWarp/cst1229zip, by CST1229): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0080-RUN [TERMINAL] Zip (TurboWarp/cst1229zip, by CST1229): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0080-CREDIT [WEB] Zip (TurboWarp/cst1229zip, by CST1229): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0080-SAFE [WEB] Zip (TurboWarp/cst1229zip, by CST1229): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0080-DOC [WEB] Zip (TurboWarp/cst1229zip, by CST1229): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0081-LOAD [TERMINAL] Images (TurboWarp/images, by ?): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0081-RUN [TERMINAL] Images (TurboWarp/images, by ?): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0081-CREDIT [WEB] Images (TurboWarp/images, by ?): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0081-SAFE [WEB] Images (TurboWarp/images, by ?): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0081-DOC [WEB] Images (TurboWarp/images, by ?): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0082-LOAD [TERMINAL] LZ Compress (TurboWarp/shovellzcompress, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0082-RUN [TERMINAL] LZ Compress (TurboWarp/shovellzcompress, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0082-CREDIT [WEB] LZ Compress (TurboWarp/shovellzcompress, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0082-SAFE [WEB] LZ Compress (TurboWarp/shovellzcompress, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0082-DOC [WEB] LZ Compress (TurboWarp/shovellzcompress, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0083-LOAD [TERMINAL] rxFS (TurboWarp/0832rxfs2, by 0832): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0083-RUN [TERMINAL] rxFS (TurboWarp/0832rxfs2, by 0832): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0083-CREDIT [WEB] rxFS (TurboWarp/0832rxfs2, by 0832): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0083-SAFE [WEB] rxFS (TurboWarp/0832rxfs2, by 0832): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0083-DOC [WEB] rxFS (TurboWarp/0832rxfs2, by 0832): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0084-LOAD [TERMINAL] S-Grab (TurboWarp/nexuskittensgrab, by NamelessCat): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0084-RUN [TERMINAL] S-Grab (TurboWarp/nexuskittensgrab, by NamelessCat): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0084-CREDIT [WEB] S-Grab (TurboWarp/nexuskittensgrab, by NamelessCat): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0084-SAFE [WEB] S-Grab (TurboWarp/nexuskittensgrab, by NamelessCat): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0084-DOC [WEB] S-Grab (TurboWarp/nexuskittensgrab, by NamelessCat): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0085-LOAD [TERMINAL] Graphics 2D (TurboWarp/nonameawagraph, by NOname-awa): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0085-RUN [TERMINAL] Graphics 2D (TurboWarp/nonameawagraph, by NOname-awa): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0085-CREDIT [WEB] Graphics 2D (TurboWarp/nonameawagraph, by NOname-awa): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0085-SAFE [WEB] Graphics 2D (TurboWarp/nonameawagraph, by NOname-awa): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0085-DOC [WEB] Graphics 2D (TurboWarp/nonameawagraph, by NOname-awa): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0086-LOAD [TERMINAL] More Comparisons (TurboWarp/nonameawacomparisons, by NOname-awa): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0086-RUN [TERMINAL] More Comparisons (TurboWarp/nonameawacomparisons, by NOname-awa): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0086-CREDIT [WEB] More Comparisons (TurboWarp/nonameawacomparisons, by NOname-awa): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0086-SAFE [WEB] More Comparisons (TurboWarp/nonameawacomparisons, by NOname-awa): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0086-DOC [WEB] More Comparisons (TurboWarp/nonameawacomparisons, by NOname-awa): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0087-LOAD [TERMINAL] Tween (TurboWarp/jeremygamerTweening, by JeremyGamer13, Fath11): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0087-RUN [TERMINAL] Tween (TurboWarp/jeremygamerTweening, by JeremyGamer13, Fath11): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0087-CREDIT [WEB] Tween (TurboWarp/jeremygamerTweening, by JeremyGamer13, Fath11): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0087-SAFE [WEB] Tween (TurboWarp/jeremygamerTweening, by JeremyGamer13, Fath11): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0087-DOC [WEB] Tween (TurboWarp/jeremygamerTweening, by JeremyGamer13, Fath11): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0088-LOAD [TERMINAL] RixxyX (TurboWarp/RixxyX, by RixTheTyrunt): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0088-RUN [TERMINAL] RixxyX (TurboWarp/RixxyX, by RixTheTyrunt): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0088-CREDIT [WEB] RixxyX (TurboWarp/RixxyX, by RixTheTyrunt): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0088-SAFE [WEB] RixxyX (TurboWarp/RixxyX, by RixTheTyrunt): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0088-DOC [WEB] RixxyX (TurboWarp/RixxyX, by RixTheTyrunt): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0089-LOAD [TERMINAL] Lily's Toolbox (TurboWarp/lmsutilsblocks, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0089-RUN [TERMINAL] Lily's Toolbox (TurboWarp/lmsutilsblocks, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0089-CREDIT [WEB] Lily's Toolbox (TurboWarp/lmsutilsblocks, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0089-SAFE [WEB] Lily's Toolbox (TurboWarp/lmsutilsblocks, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0089-DOC [WEB] Lily's Toolbox (TurboWarp/lmsutilsblocks, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0090-LOAD [TERMINAL] Data Analysis (TurboWarp/qxsckdataanalysis, by qxsck): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0090-RUN [TERMINAL] Data Analysis (TurboWarp/qxsckdataanalysis, by qxsck): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0090-CREDIT [WEB] Data Analysis (TurboWarp/qxsckdataanalysis, by qxsck): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0090-SAFE [WEB] Data Analysis (TurboWarp/qxsckdataanalysis, by qxsck): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0090-DOC [WEB] Data Analysis (TurboWarp/qxsckdataanalysis, by qxsck): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0091-LOAD [TERMINAL] Variable and list (TurboWarp/qxsckvarandlist, by qxsck): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0091-RUN [TERMINAL] Variable and list (TurboWarp/qxsckvarandlist, by qxsck): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0091-CREDIT [WEB] Variable and list (TurboWarp/qxsckvarandlist, by qxsck): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0091-SAFE [WEB] Variable and list (TurboWarp/qxsckvarandlist, by qxsck): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0091-DOC [WEB] Variable and list (TurboWarp/qxsckvarandlist, by qxsck): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0092-LOAD [TERMINAL] Dictionaries (TurboWarp/verctedictionaries, by Vercte): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0092-RUN [TERMINAL] Dictionaries (TurboWarp/verctedictionaries, by Vercte): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0092-CREDIT [WEB] Dictionaries (TurboWarp/verctedictionaries, by Vercte): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0092-SAFE [WEB] Dictionaries (TurboWarp/verctedictionaries, by Vercte): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0092-DOC [WEB] Dictionaries (TurboWarp/verctedictionaries, by Vercte): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0093-LOAD [TERMINAL] HTTP (TurboWarp/gsaHTTPRequests, by RedMan13): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0093-RUN [TERMINAL] HTTP (TurboWarp/gsaHTTPRequests, by RedMan13): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0093-CREDIT [WEB] HTTP (TurboWarp/gsaHTTPRequests, by RedMan13): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0093-SAFE [WEB] HTTP (TurboWarp/gsaHTTPRequests, by RedMan13): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0093-DOC [WEB] HTTP (TurboWarp/gsaHTTPRequests, by RedMan13): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0094-LOAD [TERMINAL] WebSocket (TurboWarp/gsaWebsocket, by RedMan13): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0094-RUN [TERMINAL] WebSocket (TurboWarp/gsaWebsocket, by RedMan13): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0094-CREDIT [WEB] WebSocket (TurboWarp/gsaWebsocket, by RedMan13): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0094-SAFE [WEB] WebSocket (TurboWarp/gsaWebsocket, by RedMan13): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0094-DOC [WEB] WebSocket (TurboWarp/gsaWebsocket, by RedMan13): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0095-LOAD [TERMINAL] Webhooks (TurboWarp/cubesterWebhooks, by CubesterYT): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0095-RUN [TERMINAL] Webhooks (TurboWarp/cubesterWebhooks, by CubesterYT): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0095-CREDIT [WEB] Webhooks (TurboWarp/cubesterWebhooks, by CubesterYT): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0095-SAFE [WEB] Webhooks (TurboWarp/cubesterWebhooks, by CubesterYT): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0095-DOC [WEB] Webhooks (TurboWarp/cubesterWebhooks, by CubesterYT): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0096-LOAD [TERMINAL] Comment Blocks (TurboWarp/lmscomments, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0096-RUN [TERMINAL] Comment Blocks (TurboWarp/lmscomments, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0096-CREDIT [WEB] Comment Blocks (TurboWarp/lmscomments, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0096-SAFE [WEB] Comment Blocks (TurboWarp/lmscomments, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0096-DOC [WEB] Comment Blocks (TurboWarp/lmscomments, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0097-LOAD [TERMINAL] Longman Dictionary (TurboWarp/longvegdictionary, by veggiecan0419): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0097-RUN [TERMINAL] Longman Dictionary (TurboWarp/longvegdictionary, by veggiecan0419): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0097-CREDIT [WEB] Longman Dictionary (TurboWarp/longvegdictionary, by veggiecan0419): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0097-SAFE [WEB] Longman Dictionary (TurboWarp/longvegdictionary, by veggiecan0419): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0097-DOC [WEB] Longman Dictionary (TurboWarp/longvegdictionary, by veggiecan0419): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0098-LOAD [TERMINAL] NFCWarp (TurboWarp/alestorenfc, by Alestore Games): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0098-RUN [TERMINAL] NFCWarp (TurboWarp/alestorenfc, by Alestore Games): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0098-CREDIT [WEB] NFCWarp (TurboWarp/alestorenfc, by Alestore Games): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0098-SAFE [WEB] NFCWarp (TurboWarp/alestorenfc, by Alestore Games): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0098-DOC [WEB] NFCWarp (TurboWarp/alestorenfc, by Alestore Games): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0099-LOAD [TERMINAL] DECtalk Text to Speech (TurboWarp/nishiowoDectalk, by NishiOwO): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0099-RUN [TERMINAL] DECtalk Text to Speech (TurboWarp/nishiowoDectalk, by NishiOwO): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0099-CREDIT [WEB] DECtalk Text to Speech (TurboWarp/nishiowoDectalk, by NishiOwO): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0099-SAFE [WEB] DECtalk Text to Speech (TurboWarp/nishiowoDectalk, by NishiOwO): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0099-DOC [WEB] DECtalk Text to Speech (TurboWarp/nishiowoDectalk, by NishiOwO): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0100-LOAD [TERMINAL] Steamworks (TurboWarp/steamworks, by GarboMuffin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0100-RUN [TERMINAL] Steamworks (TurboWarp/steamworks, by GarboMuffin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0100-CREDIT [WEB] Steamworks (TurboWarp/steamworks, by GarboMuffin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0100-SAFE [WEB] Steamworks (TurboWarp/steamworks, by GarboMuffin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0100-DOC [WEB] Steamworks (TurboWarp/steamworks, by GarboMuffin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0101-LOAD [TERMINAL] itch.io (TurboWarp/itch, by softed): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0101-RUN [TERMINAL] itch.io (TurboWarp/itch, by softed): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0101-CREDIT [WEB] itch.io (TurboWarp/itch, by softed): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0101-SAFE [WEB] itch.io (TurboWarp/itch, by softed): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0101-DOC [WEB] itch.io (TurboWarp/itch, by softed): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0102-LOAD [TERMINAL] Game Jolt (TurboWarp/GameJoltAPI, by softed): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0102-RUN [TERMINAL] Game Jolt (TurboWarp/GameJoltAPI, by softed): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0102-CREDIT [WEB] Game Jolt (TurboWarp/GameJoltAPI, by softed): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0102-SAFE [WEB] Game Jolt (TurboWarp/GameJoltAPI, by softed): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0102-DOC [WEB] Game Jolt (TurboWarp/GameJoltAPI, by softed): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0103-LOAD [TERMINAL] Newgrounds (TurboWarp/NGIO, by ObviousAlexC): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0103-RUN [TERMINAL] Newgrounds (TurboWarp/NGIO, by ObviousAlexC): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0103-CREDIT [WEB] Newgrounds (TurboWarp/NGIO, by ObviousAlexC): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0103-SAFE [WEB] Newgrounds (TurboWarp/NGIO, by ObviousAlexC): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0103-DOC [WEB] Newgrounds (TurboWarp/NGIO, by ObviousAlexC): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0104-LOAD [TERMINAL] McUtils (TurboWarp/lmsmcutils, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0104-RUN [TERMINAL] McUtils (TurboWarp/lmsmcutils, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0104-CREDIT [WEB] McUtils (TurboWarp/lmsmcutils, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0104-SAFE [WEB] McUtils (TurboWarp/lmsmcutils, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0104-DOC [WEB] McUtils (TurboWarp/lmsmcutils, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0105-LOAD [TERMINAL] Pen+ (PenguinMod/, by pinksheep2917): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0105-RUN [TERMINAL] Pen+ (PenguinMod/, by pinksheep2917): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0105-CREDIT [WEB] Pen+ (PenguinMod/, by pinksheep2917): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0105-SAFE [WEB] Pen+ (PenguinMod/, by pinksheep2917): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0105-DOC [WEB] Pen+ (PenguinMod/, by pinksheep2917): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0106-LOAD [TERMINAL] Shovel Debugger (PenguinMod/, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0106-RUN [TERMINAL] Shovel Debugger (PenguinMod/, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0106-CREDIT [WEB] Shovel Debugger (PenguinMod/, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0106-SAFE [WEB] Shovel Debugger (PenguinMod/, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0106-DOC [WEB] Shovel Debugger (PenguinMod/, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0107-LOAD [TERMINAL] Server Storage (PenguinMod/, by Ikelene): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0107-RUN [TERMINAL] Server Storage (PenguinMod/, by Ikelene): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0107-CREDIT [WEB] Server Storage (PenguinMod/, by Ikelene): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0107-SAFE [WEB] Server Storage (PenguinMod/, by Ikelene): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0107-DOC [WEB] Server Storage (PenguinMod/, by Ikelene): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0108-LOAD [TERMINAL] Storage Plus (PenguinMod/, by Gen1x): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0108-RUN [TERMINAL] Storage Plus (PenguinMod/, by Gen1x): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0108-CREDIT [WEB] Storage Plus (PenguinMod/, by Gen1x): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0108-SAFE [WEB] Storage Plus (PenguinMod/, by Gen1x): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0108-DOC [WEB] Storage Plus (PenguinMod/, by Gen1x): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0109-LOAD [TERMINAL] MotionSprite (PenguinMod/, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0109-RUN [TERMINAL] MotionSprite (PenguinMod/, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0109-CREDIT [WEB] MotionSprite (PenguinMod/, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0109-SAFE [WEB] MotionSprite (PenguinMod/, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0109-DOC [WEB] MotionSprite (PenguinMod/, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0110-LOAD [TERMINAL] Iris Text (PenguinMod/, by Gen1xLol): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0110-RUN [TERMINAL] Iris Text (PenguinMod/, by Gen1xLol): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0110-CREDIT [WEB] Iris Text (PenguinMod/, by Gen1xLol): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0110-SAFE [WEB] Iris Text (PenguinMod/, by Gen1xLol): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0110-DOC [WEB] Iris Text (PenguinMod/, by Gen1xLol): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0111-LOAD [TERMINAL] Boxed Physics (PenguinMod/, by pooiod7): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0111-RUN [TERMINAL] Boxed Physics (PenguinMod/, by pooiod7): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0111-CREDIT [WEB] Boxed Physics (PenguinMod/, by pooiod7): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0111-SAFE [WEB] Boxed Physics (PenguinMod/, by pooiod7): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0111-DOC [WEB] Boxed Physics (PenguinMod/, by pooiod7): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0112-LOAD [TERMINAL] Lighting (PenguinMod/, by Gen1xLol): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0112-RUN [TERMINAL] Lighting (PenguinMod/, by Gen1xLol): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0112-CREDIT [WEB] Lighting (PenguinMod/, by Gen1xLol): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0112-SAFE [WEB] Lighting (PenguinMod/, by Gen1xLol): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0112-DOC [WEB] Lighting (PenguinMod/, by Gen1xLol): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0113-LOAD [TERMINAL] 3D Math (PenguinMod/, by pinksheep2917): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0113-RUN [TERMINAL] 3D Math (PenguinMod/, by pinksheep2917): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0113-CREDIT [WEB] 3D Math (PenguinMod/, by pinksheep2917): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0113-SAFE [WEB] 3D Math (PenguinMod/, by pinksheep2917): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0113-DOC [WEB] 3D Math (PenguinMod/, by pinksheep2917): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0114-LOAD [TERMINAL] Beat Sync (PenguinMod/, by Gen1xLol): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0114-RUN [TERMINAL] Beat Sync (PenguinMod/, by Gen1xLol): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0114-CREDIT [WEB] Beat Sync (PenguinMod/, by Gen1xLol): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0114-SAFE [WEB] Beat Sync (PenguinMod/, by Gen1xLol): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0114-DOC [WEB] Beat Sync (PenguinMod/, by Gen1xLol): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0115-LOAD [TERMINAL] Object (PenguinMod/, by skyhigh173): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0115-RUN [TERMINAL] Object (PenguinMod/, by skyhigh173): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0115-CREDIT [WEB] Object (PenguinMod/, by skyhigh173): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0115-SAFE [WEB] Object (PenguinMod/, by skyhigh173): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0115-DOC [WEB] Object (PenguinMod/, by skyhigh173): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0116-LOAD [TERMINAL] Array Buffers (PenguinMod/, by AndrewGaming587): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0116-RUN [TERMINAL] Array Buffers (PenguinMod/, by AndrewGaming587): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0116-CREDIT [WEB] Array Buffers (PenguinMod/, by AndrewGaming587): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0116-SAFE [WEB] Array Buffers (PenguinMod/, by AndrewGaming587): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0116-DOC [WEB] Array Buffers (PenguinMod/, by AndrewGaming587): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0117-LOAD [TERMINAL] Extra Timers (PenguinMod/, by Steve0Greatness): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0117-RUN [TERMINAL] Extra Timers (PenguinMod/, by Steve0Greatness): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0117-CREDIT [WEB] Extra Timers (PenguinMod/, by Steve0Greatness): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0117-SAFE [WEB] Extra Timers (PenguinMod/, by Steve0Greatness): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0117-DOC [WEB] Extra Timers (PenguinMod/, by Steve0Greatness): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0118-LOAD [TERMINAL] Dictation (PenguinMod/, by pooiod7): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0118-RUN [TERMINAL] Dictation (PenguinMod/, by pooiod7): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0118-CREDIT [WEB] Dictation (PenguinMod/, by pooiod7): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0118-SAFE [WEB] Dictation (PenguinMod/, by pooiod7): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0118-DOC [WEB] Dictation (PenguinMod/, by pooiod7): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0119-LOAD [TERMINAL] Doodle Recognition (PenguinMod/, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0119-RUN [TERMINAL] Doodle Recognition (PenguinMod/, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0119-CREDIT [WEB] Doodle Recognition (PenguinMod/, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0119-SAFE [WEB] Doodle Recognition (PenguinMod/, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0119-DOC [WEB] Doodle Recognition (PenguinMod/, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0120-LOAD [TERMINAL] Text To Speech: Redone (PenguinMod/, by PuzzlingGGG): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0120-RUN [TERMINAL] Text To Speech: Redone (PenguinMod/, by PuzzlingGGG): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0120-CREDIT [WEB] Text To Speech: Redone (PenguinMod/, by PuzzlingGGG): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0120-SAFE [WEB] Text To Speech: Redone (PenguinMod/, by PuzzlingGGG): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0120-DOC [WEB] Text To Speech: Redone (PenguinMod/, by PuzzlingGGG): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0121-LOAD [TERMINAL] CloudLink (PenguinMod/, by MikeDev101): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0121-RUN [TERMINAL] CloudLink (PenguinMod/, by MikeDev101): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0121-CREDIT [WEB] CloudLink (PenguinMod/, by MikeDev101): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0121-SAFE [WEB] CloudLink (PenguinMod/, by MikeDev101): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0121-DOC [WEB] CloudLink (PenguinMod/, by MikeDev101): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0122-LOAD [TERMINAL] E2EE (PenguinMod/, by MikeDev101): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0122-RUN [TERMINAL] E2EE (PenguinMod/, by MikeDev101): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0122-CREDIT [WEB] E2EE (PenguinMod/, by MikeDev101): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0122-SAFE [WEB] E2EE (PenguinMod/, by MikeDev101): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0122-DOC [WEB] E2EE (PenguinMod/, by MikeDev101): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0123-LOAD [TERMINAL] WebRTC (PenguinMod/, by MikeDev101): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0123-RUN [TERMINAL] WebRTC (PenguinMod/, by MikeDev101): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0123-CREDIT [WEB] WebRTC (PenguinMod/, by MikeDev101): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0123-SAFE [WEB] WebRTC (PenguinMod/, by MikeDev101): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0123-DOC [WEB] WebRTC (PenguinMod/, by MikeDev101): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0124-LOAD [TERMINAL] PenguinHook (PenguinMod/, by MubiLop): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0124-RUN [TERMINAL] PenguinHook (PenguinMod/, by MubiLop): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0124-CREDIT [WEB] PenguinHook (PenguinMod/, by MubiLop): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0124-SAFE [WEB] PenguinHook (PenguinMod/, by MubiLop): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0124-DOC [WEB] PenguinHook (PenguinMod/, by MubiLop): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0125-LOAD [TERMINAL] Number Utilities (PenguinMod/, by MubiLop): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0125-RUN [TERMINAL] Number Utilities (PenguinMod/, by MubiLop): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0125-CREDIT [WEB] Number Utilities (PenguinMod/, by MubiLop): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0125-SAFE [WEB] Number Utilities (PenguinMod/, by MubiLop): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0125-DOC [WEB] Number Utilities (PenguinMod/, by MubiLop): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0126-LOAD [TERMINAL] Mathematics (PenguinMod/, by jwklong): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0126-RUN [TERMINAL] Mathematics (PenguinMod/, by jwklong): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0126-CREDIT [WEB] Mathematics (PenguinMod/, by jwklong): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0126-SAFE [WEB] Mathematics (PenguinMod/, by jwklong): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0126-DOC [WEB] Mathematics (PenguinMod/, by jwklong): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0127-LOAD [TERMINAL] Big Decimal (PenguinMod/, by qxsck): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0127-RUN [TERMINAL] Big Decimal (PenguinMod/, by qxsck): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0127-CREDIT [WEB] Big Decimal (PenguinMod/, by qxsck): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0127-SAFE [WEB] Big Decimal (PenguinMod/, by qxsck): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0127-DOC [WEB] Big Decimal (PenguinMod/, by qxsck): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0128-LOAD [TERMINAL] Date Format (PenguinMod/, by ddededodediamante): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0128-RUN [TERMINAL] Date Format (PenguinMod/, by ddededodediamante): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0128-CREDIT [WEB] Date Format (PenguinMod/, by ddededodediamante): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0128-SAFE [WEB] Date Format (PenguinMod/, by ddededodediamante): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0128-DOC [WEB] Date Format (PenguinMod/, by ddededodediamante): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0129-LOAD [TERMINAL] Yet Another String Extension (PenguinMod/, by DogeisCut): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0129-RUN [TERMINAL] Yet Another String Extension (PenguinMod/, by DogeisCut): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0129-CREDIT [WEB] Yet Another String Extension (PenguinMod/, by DogeisCut): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0129-SAFE [WEB] Yet Another String Extension (PenguinMod/, by DogeisCut): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0129-DOC [WEB] Yet Another String Extension (PenguinMod/, by DogeisCut): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0130-LOAD [TERMINAL] Regular Expressions (PenguinMod/, by DogeisCut): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0130-RUN [TERMINAL] Regular Expressions (PenguinMod/, by DogeisCut): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0130-CREDIT [WEB] Regular Expressions (PenguinMod/, by DogeisCut): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0130-SAFE [WEB] Regular Expressions (PenguinMod/, by DogeisCut): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0130-DOC [WEB] Regular Expressions (PenguinMod/, by DogeisCut): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0131-LOAD [TERMINAL] Sets (PenguinMod/, by DogeisCut): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0131-RUN [TERMINAL] Sets (PenguinMod/, by DogeisCut): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0131-CREDIT [WEB] Sets (PenguinMod/, by DogeisCut): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0131-SAFE [WEB] Sets (PenguinMod/, by DogeisCut): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0131-DOC [WEB] Sets (PenguinMod/, by DogeisCut): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0132-LOAD [TERMINAL] Iterators (PenguinMod/, by Div): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0132-RUN [TERMINAL] Iterators (PenguinMod/, by Div): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0132-CREDIT [WEB] Iterators (PenguinMod/, by Div): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0132-SAFE [WEB] Iterators (PenguinMod/, by Div): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0132-DOC [WEB] Iterators (PenguinMod/, by Div): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0133-LOAD [TERMINAL] Algebraic Effects (PenguinMod/, by Div): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0133-RUN [TERMINAL] Algebraic Effects (PenguinMod/, by Div): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0133-CREDIT [WEB] Algebraic Effects (PenguinMod/, by Div): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0133-SAFE [WEB] Algebraic Effects (PenguinMod/, by Div): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0133-DOC [WEB] Algebraic Effects (PenguinMod/, by Div): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0134-LOAD [TERMINAL] 3D Vectors & Quaternions (PenguinMod/, by Div): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0134-RUN [TERMINAL] 3D Vectors & Quaternions (PenguinMod/, by Div): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0134-CREDIT [WEB] 3D Vectors & Quaternions (PenguinMod/, by Div): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0134-SAFE [WEB] 3D Vectors & Quaternions (PenguinMod/, by Div): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0134-DOC [WEB] 3D Vectors & Quaternions (PenguinMod/, by Div): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0135-LOAD [TERMINAL] Blobs (PenguinMod/, by Faunks): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0135-RUN [TERMINAL] Blobs (PenguinMod/, by Faunks): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0135-CREDIT [WEB] Blobs (PenguinMod/, by Faunks): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0135-SAFE [WEB] Blobs (PenguinMod/, by Faunks): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0135-DOC [WEB] Blobs (PenguinMod/, by Faunks): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0136-LOAD [TERMINAL] Random Utilities (PenguinMod/, by Gen1xLol): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0136-RUN [TERMINAL] Random Utilities (PenguinMod/, by Gen1xLol): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0136-CREDIT [WEB] Random Utilities (PenguinMod/, by Gen1xLol): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0136-SAFE [WEB] Random Utilities (PenguinMod/, by Gen1xLol): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0136-DOC [WEB] Random Utilities (PenguinMod/, by Gen1xLol): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0137-LOAD [TERMINAL] Toast Notifications (PenguinMod/, by MubiLop): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0137-RUN [TERMINAL] Toast Notifications (PenguinMod/, by MubiLop): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0137-CREDIT [WEB] Toast Notifications (PenguinMod/, by MubiLop): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0137-SAFE [WEB] Toast Notifications (PenguinMod/, by MubiLop): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0137-DOC [WEB] Toast Notifications (PenguinMod/, by MubiLop): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0138-LOAD [TERMINAL] Project Interfaces (PenguinMod/, by Lord cat): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0138-RUN [TERMINAL] Project Interfaces (PenguinMod/, by Lord cat): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0138-CREDIT [WEB] Project Interfaces (PenguinMod/, by Lord cat): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0138-SAFE [WEB] Project Interfaces (PenguinMod/, by Lord cat): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0138-DOC [WEB] Project Interfaces (PenguinMod/, by Lord cat): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0139-LOAD [TERMINAL] Git Penguin (PenguinMod/, by justablock): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0139-RUN [TERMINAL] Git Penguin (PenguinMod/, by justablock): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0139-CREDIT [WEB] Git Penguin (PenguinMod/, by justablock): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0139-SAFE [WEB] Git Penguin (PenguinMod/, by justablock): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0139-DOC [WEB] Git Penguin (PenguinMod/, by justablock): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0140-LOAD [TERMINAL] Pang API (PenguinMod/, by oc9x97): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0140-RUN [TERMINAL] Pang API (PenguinMod/, by oc9x97): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0140-CREDIT [WEB] Pang API (PenguinMod/, by oc9x97): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0140-SAFE [WEB] Pang API (PenguinMod/, by oc9x97): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0140-DOC [WEB] Pang API (PenguinMod/, by oc9x97): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0141-LOAD [TERMINAL] TurboWeather (PenguinMod/, by RubyDevs): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0141-RUN [TERMINAL] TurboWeather (PenguinMod/, by RubyDevs): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0141-CREDIT [WEB] TurboWeather (PenguinMod/, by RubyDevs): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0141-SAFE [WEB] TurboWeather (PenguinMod/, by RubyDevs): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0141-DOC [WEB] TurboWeather (PenguinMod/, by RubyDevs): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0142-LOAD [TERMINAL] Cockatiel Location (PenguinMod/, by bruhbeast-pixel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0142-RUN [TERMINAL] Cockatiel Location (PenguinMod/, by bruhbeast-pixel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0142-CREDIT [WEB] Cockatiel Location (PenguinMod/, by bruhbeast-pixel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0142-SAFE [WEB] Cockatiel Location (PenguinMod/, by bruhbeast-pixel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0142-DOC [WEB] Cockatiel Location (PenguinMod/, by bruhbeast-pixel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0143-LOAD [TERMINAL] CORS Proxy (PenguinMod/, by NamelessCat): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0143-RUN [TERMINAL] CORS Proxy (PenguinMod/, by NamelessCat): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0143-CREDIT [WEB] CORS Proxy (PenguinMod/, by NamelessCat): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0143-SAFE [WEB] CORS Proxy (PenguinMod/, by NamelessCat): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0143-DOC [WEB] CORS Proxy (PenguinMod/, by NamelessCat): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0144-LOAD [TERMINAL] Translation Keys (PenguinMod/, by Embin): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0144-RUN [TERMINAL] Translation Keys (PenguinMod/, by Embin): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0144-CREDIT [WEB] Translation Keys (PenguinMod/, by Embin): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0144-SAFE [WEB] Translation Keys (PenguinMod/, by Embin): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0144-DOC [WEB] Translation Keys (PenguinMod/, by Embin): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0145-LOAD [TERMINAL] All Menus (PenguinMod/, by LilyMakesThings): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0145-RUN [TERMINAL] All Menus (PenguinMod/, by LilyMakesThings): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0145-CREDIT [WEB] All Menus (PenguinMod/, by LilyMakesThings): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0145-SAFE [WEB] All Menus (PenguinMod/, by LilyMakesThings): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0145-DOC [WEB] All Menus (PenguinMod/, by LilyMakesThings): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0146-LOAD [TERMINAL] Extension Exposer (PenguinMod/, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0146-RUN [TERMINAL] Extension Exposer (PenguinMod/, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0146-CREDIT [WEB] Extension Exposer (PenguinMod/, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0146-SAFE [WEB] Extension Exposer (PenguinMod/, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0146-DOC [WEB] Extension Exposer (PenguinMod/, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0147-LOAD [TERMINAL] More Fields (PenguinMod/, by yuri-kiss): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0147-RUN [TERMINAL] More Fields (PenguinMod/, by yuri-kiss): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0147-CREDIT [WEB] More Fields (PenguinMod/, by yuri-kiss): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0147-SAFE [WEB] More Fields (PenguinMod/, by yuri-kiss): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0147-DOC [WEB] More Fields (PenguinMod/, by yuri-kiss): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0148-LOAD [TERMINAL] Beepbox Player (PenguinMod/, by DogeisCut): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0148-RUN [TERMINAL] Beepbox Player (PenguinMod/, by DogeisCut): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0148-CREDIT [WEB] Beepbox Player (PenguinMod/, by DogeisCut): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0148-SAFE [WEB] Beepbox Player (PenguinMod/, by DogeisCut): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0148-DOC [WEB] Beepbox Player (PenguinMod/, by DogeisCut): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0149-LOAD [TERMINAL] Update File (Direct Access) (PenguinMod/, by Anonymous-cat1): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0149-RUN [TERMINAL] Update File (Direct Access) (PenguinMod/, by Anonymous-cat1): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0149-CREDIT [WEB] Update File (Direct Access) (PenguinMod/, by Anonymous-cat1): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0149-SAFE [WEB] Update File (Direct Access) (PenguinMod/, by Anonymous-cat1): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0149-DOC [WEB] Update File (Direct Access) (PenguinMod/, by Anonymous-cat1): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0150-LOAD [TERMINAL] YeetYourFiles (PenguinMod/, by MubiLop): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0150-RUN [TERMINAL] YeetYourFiles (PenguinMod/, by MubiLop): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0150-CREDIT [WEB] YeetYourFiles (PenguinMod/, by MubiLop): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0150-SAFE [WEB] YeetYourFiles (PenguinMod/, by MubiLop): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0150-DOC [WEB] YeetYourFiles (PenguinMod/, by MubiLop): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0151-LOAD [TERMINAL] File Upload (PenguinMod/, by Codefoxy): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0151-RUN [TERMINAL] File Upload (PenguinMod/, by Codefoxy): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0151-CREDIT [WEB] File Upload (PenguinMod/, by Codefoxy): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0151-SAFE [WEB] File Upload (PenguinMod/, by Codefoxy): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0151-DOC [WEB] File Upload (PenguinMod/, by Codefoxy): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0152-LOAD [TERMINAL] Device Motion (PenguinMod/, by gaimerI17): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0152-RUN [TERMINAL] Device Motion (PenguinMod/, by gaimerI17): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0152-CREDIT [WEB] Device Motion (PenguinMod/, by gaimerI17): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0152-SAFE [WEB] Device Motion (PenguinMod/, by gaimerI17): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0152-DOC [WEB] Device Motion (PenguinMod/, by gaimerI17): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0153-LOAD [TERMINAL] Video Sharing (PenguinMod/, by pooiod7): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0153-RUN [TERMINAL] Video Sharing (PenguinMod/, by pooiod7): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0153-CREDIT [WEB] Video Sharing (PenguinMod/, by pooiod7): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0153-SAFE [WEB] Video Sharing (PenguinMod/, by pooiod7): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0153-DOC [WEB] Video Sharing (PenguinMod/, by pooiod7): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0154-LOAD [TERMINAL] WindowHasher (PenguinMod/, by pooiod7): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0154-RUN [TERMINAL] WindowHasher (PenguinMod/, by pooiod7): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0154-CREDIT [WEB] WindowHasher (PenguinMod/, by pooiod7): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0154-SAFE [WEB] WindowHasher (PenguinMod/, by pooiod7): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0154-DOC [WEB] WindowHasher (PenguinMod/, by pooiod7): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0155-LOAD [TERMINAL] Scratchblocks (PenguinMod/, by pooiod7): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0155-RUN [TERMINAL] Scratchblocks (PenguinMod/, by pooiod7): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0155-CREDIT [WEB] Scratchblocks (PenguinMod/, by pooiod7): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0155-SAFE [WEB] Scratchblocks (PenguinMod/, by pooiod7): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0155-DOC [WEB] Scratchblocks (PenguinMod/, by pooiod7): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0156-LOAD [TERMINAL] AuthPenguin (PenguinMod/, by MubiLop): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0156-RUN [TERMINAL] AuthPenguin (PenguinMod/, by MubiLop): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0156-CREDIT [WEB] AuthPenguin (PenguinMod/, by MubiLop): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0156-SAFE [WEB] AuthPenguin (PenguinMod/, by MubiLop): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0156-DOC [WEB] AuthPenguin (PenguinMod/, by MubiLop): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0157-LOAD [TERMINAL] Google Auth (PenguinMod/, by Ikelene): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0157-RUN [TERMINAL] Google Auth (PenguinMod/, by Ikelene): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0157-CREDIT [WEB] Google Auth (PenguinMod/, by Ikelene): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0157-SAFE [WEB] Google Auth (PenguinMod/, by Ikelene): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0157-DOC [WEB] Google Auth (PenguinMod/, by Ikelene): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0158-LOAD [TERMINAL] Discord Auth (PenguinMod/, by enderhacker): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0158-RUN [TERMINAL] Discord Auth (PenguinMod/, by enderhacker): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0158-CREDIT [WEB] Discord Auth (PenguinMod/, by enderhacker): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0158-SAFE [WEB] Discord Auth (PenguinMod/, by enderhacker): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0158-DOC [WEB] Discord Auth (PenguinMod/, by enderhacker): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0159-LOAD [TERMINAL] More Types (PenguinMod/, by VeryGoodScratcher42): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0159-RUN [TERMINAL] More Types (PenguinMod/, by VeryGoodScratcher42): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0159-CREDIT [WEB] More Types (PenguinMod/, by VeryGoodScratcher42): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0159-SAFE [WEB] More Types (PenguinMod/, by VeryGoodScratcher42): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0159-DOC [WEB] More Types (PenguinMod/, by VeryGoodScratcher42): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0160-LOAD [TERMINAL] Resolution (PenguinMod/, by DogeisCut): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0160-RUN [TERMINAL] Resolution (PenguinMod/, by DogeisCut): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0160-CREDIT [WEB] Resolution (PenguinMod/, by DogeisCut): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0160-SAFE [WEB] Resolution (PenguinMod/, by DogeisCut): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0160-DOC [WEB] Resolution (PenguinMod/, by DogeisCut): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0161-LOAD [TERMINAL] Cryptography (PenguinMod/, by gaimerI17): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0161-RUN [TERMINAL] Cryptography (PenguinMod/, by gaimerI17): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0161-CREDIT [WEB] Cryptography (PenguinMod/, by gaimerI17): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0161-SAFE [WEB] Cryptography (PenguinMod/, by gaimerI17): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0161-DOC [WEB] Cryptography (PenguinMod/, by gaimerI17): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0162-LOAD [TERMINAL] Twitch (PenguinMod/, by bop_tw): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0162-RUN [TERMINAL] Twitch (PenguinMod/, by bop_tw): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0162-CREDIT [WEB] Twitch (PenguinMod/, by bop_tw): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0162-SAFE [WEB] Twitch (PenguinMod/, by bop_tw): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0162-DOC [WEB] Twitch (PenguinMod/, by bop_tw): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0163-LOAD [TERMINAL] Chess (PenguinMod/, by Gen1xLol): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0163-RUN [TERMINAL] Chess (PenguinMod/, by Gen1xLol): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0163-CREDIT [WEB] Chess (PenguinMod/, by Gen1xLol): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0163-SAFE [WEB] Chess (PenguinMod/, by Gen1xLol): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0163-DOC [WEB] Chess (PenguinMod/, by Gen1xLol): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0164-LOAD [TERMINAL] CATS (PenguinMod/, by Gen1xLol): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0164-RUN [TERMINAL] CATS (PenguinMod/, by Gen1xLol): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0164-CREDIT [WEB] CATS (PenguinMod/, by Gen1xLol): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0164-SAFE [WEB] CATS (PenguinMod/, by Gen1xLol): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0164-DOC [WEB] CATS (PenguinMod/, by Gen1xLol): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0165-LOAD [TERMINAL] Free Servers (PenguinMod/, by WAYLIVES): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0165-RUN [TERMINAL] Free Servers (PenguinMod/, by WAYLIVES): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0165-CREDIT [WEB] Free Servers (PenguinMod/, by WAYLIVES): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0165-SAFE [WEB] Free Servers (PenguinMod/, by WAYLIVES): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0165-DOC [WEB] Free Servers (PenguinMod/, by WAYLIVES): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0166-LOAD [TERMINAL] More Types (PenguinMod/, by VeryGoodScratcher42): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0166-RUN [TERMINAL] More Types (PenguinMod/, by VeryGoodScratcher42): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0166-CREDIT [WEB] More Types (PenguinMod/, by VeryGoodScratcher42): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0166-SAFE [WEB] More Types (PenguinMod/, by VeryGoodScratcher42): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0166-DOC [WEB] More Types (PenguinMod/, by VeryGoodScratcher42): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0167-LOAD [TERMINAL] oneko (PenguinMod/, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0167-RUN [TERMINAL] oneko (PenguinMod/, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0167-CREDIT [WEB] oneko (PenguinMod/, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0167-SAFE [WEB] oneko (PenguinMod/, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0167-DOC [WEB] oneko (PenguinMod/, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0168-LOAD [TERMINAL] Counter++ (PenguinMod/, by MrRedstonia): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0168-RUN [TERMINAL] Counter++ (PenguinMod/, by MrRedstonia): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0168-CREDIT [WEB] Counter++ (PenguinMod/, by MrRedstonia): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0168-SAFE [WEB] Counter++ (PenguinMod/, by MrRedstonia): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0168-DOC [WEB] Counter++ (PenguinMod/, by MrRedstonia): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0169-LOAD [TERMINAL] How many lines? (PenguinMod/, by Monochromasity): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0169-RUN [TERMINAL] How many lines? (PenguinMod/, by Monochromasity): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0169-CREDIT [WEB] How many lines? (PenguinMod/, by Monochromasity): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0169-SAFE [WEB] How many lines? (PenguinMod/, by Monochromasity): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0169-DOC [WEB] How many lines? (PenguinMod/, by Monochromasity): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0170-LOAD [TERMINAL] Paint Utils (PenguinMod/, by Fruits555000): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0170-RUN [TERMINAL] Paint Utils (PenguinMod/, by Fruits555000): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0170-CREDIT [WEB] Paint Utils (PenguinMod/, by Fruits555000): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0170-SAFE [WEB] Paint Utils (PenguinMod/, by Fruits555000): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0170-DOC [WEB] Paint Utils (PenguinMod/, by Fruits555000): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0171-LOAD [TERMINAL] Smoke Detector (PenguinMod/, by ElectricFuzzball_PM): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0171-RUN [TERMINAL] Smoke Detector (PenguinMod/, by ElectricFuzzball_PM): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0171-CREDIT [WEB] Smoke Detector (PenguinMod/, by ElectricFuzzball_PM): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0171-SAFE [WEB] Smoke Detector (PenguinMod/, by ElectricFuzzball_PM): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0171-DOC [WEB] Smoke Detector (PenguinMod/, by ElectricFuzzball_PM): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0172-LOAD [TERMINAL] Stage Brah (PenguinMod/, by ElectricFuzzball_PM): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0172-RUN [TERMINAL] Stage Brah (PenguinMod/, by ElectricFuzzball_PM): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0172-CREDIT [WEB] Stage Brah (PenguinMod/, by ElectricFuzzball_PM): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0172-SAFE [WEB] Stage Brah (PenguinMod/, by ElectricFuzzball_PM): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0172-DOC [WEB] Stage Brah (PenguinMod/, by ElectricFuzzball_PM): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0173-LOAD [TERMINAL] MIDI Controller (PenguinMod/, by ElectricFuzzball_PM): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0173-RUN [TERMINAL] MIDI Controller (PenguinMod/, by ElectricFuzzball_PM): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0173-CREDIT [WEB] MIDI Controller (PenguinMod/, by ElectricFuzzball_PM): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0173-SAFE [WEB] MIDI Controller (PenguinMod/, by ElectricFuzzball_PM): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0173-DOC [WEB] MIDI Controller (PenguinMod/, by ElectricFuzzball_PM): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0174-LOAD [TERMINAL] Black Mold (PenguinMod/, by ElectricFuzzball_PM): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0174-RUN [TERMINAL] Black Mold (PenguinMod/, by ElectricFuzzball_PM): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0174-CREDIT [WEB] Black Mold (PenguinMod/, by ElectricFuzzball_PM): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0174-SAFE [WEB] Black Mold (PenguinMod/, by ElectricFuzzball_PM): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0174-DOC [WEB] Black Mold (PenguinMod/, by ElectricFuzzball_PM): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0175-LOAD [TERMINAL] ODE (PenguinMod/, by NishiOwO): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0175-RUN [TERMINAL] ODE (PenguinMod/, by NishiOwO): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0175-CREDIT [WEB] ODE (PenguinMod/, by NishiOwO): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0175-SAFE [WEB] ODE (PenguinMod/, by NishiOwO): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0175-DOC [WEB] ODE (PenguinMod/, by NishiOwO): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0176-LOAD [TERMINAL] TurboSynth (PenguinMod/, by NishiOwO): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0176-RUN [TERMINAL] TurboSynth (PenguinMod/, by NishiOwO): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0176-CREDIT [WEB] TurboSynth (PenguinMod/, by NishiOwO): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0176-SAFE [WEB] TurboSynth (PenguinMod/, by NishiOwO): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0176-DOC [WEB] TurboSynth (PenguinMod/, by NishiOwO): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0177-LOAD [TERMINAL] Libxmp (PenguinMod/, by NishiOwO): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0177-RUN [TERMINAL] Libxmp (PenguinMod/, by NishiOwO): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0177-CREDIT [WEB] Libxmp (PenguinMod/, by NishiOwO): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0177-SAFE [WEB] Libxmp (PenguinMod/, by NishiOwO): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0177-DOC [WEB] Libxmp (PenguinMod/, by NishiOwO): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0178-LOAD [TERMINAL] Scope Variable (PenguinMod/, by yuri-kiss): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0178-RUN [TERMINAL] Scope Variable (PenguinMod/, by yuri-kiss): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0178-CREDIT [WEB] Scope Variable (PenguinMod/, by yuri-kiss): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0178-SAFE [WEB] Scope Variable (PenguinMod/, by yuri-kiss): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0178-DOC [WEB] Scope Variable (PenguinMod/, by yuri-kiss): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0179-LOAD [TERMINAL] PenguinAI (PenguinMod/, by MubiLop): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0179-RUN [TERMINAL] PenguinAI (PenguinMod/, by MubiLop): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0179-CREDIT [WEB] PenguinAI (PenguinMod/, by MubiLop): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0179-SAFE [WEB] PenguinAI (PenguinMod/, by MubiLop): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0179-DOC [WEB] PenguinAI (PenguinMod/, by MubiLop): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0180-LOAD [TERMINAL] Block AI (PenguinMod/, by TheShovel): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0180-RUN [TERMINAL] Block AI (PenguinMod/, by TheShovel): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0180-CREDIT [WEB] Block AI (PenguinMod/, by TheShovel): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0180-SAFE [WEB] Block AI (PenguinMod/, by TheShovel): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0180-DOC [WEB] Block AI (PenguinMod/, by TheShovel): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0181-LOAD [TERMINAL] Format Numbers (PenguinMod/, by DogeisCut): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0181-RUN [TERMINAL] Format Numbers (PenguinMod/, by DogeisCut): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0181-CREDIT [WEB] Format Numbers (PenguinMod/, by DogeisCut): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0181-SAFE [WEB] Format Numbers (PenguinMod/, by DogeisCut): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0181-DOC [WEB] Format Numbers (PenguinMod/, by DogeisCut): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0182-LOAD [TERMINAL] Online Captcha (PenguinMod/, by enderhacker): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0182-RUN [TERMINAL] Online Captcha (PenguinMod/, by enderhacker): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0182-CREDIT [WEB] Online Captcha (PenguinMod/, by enderhacker): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0182-SAFE [WEB] Online Captcha (PenguinMod/, by enderhacker): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0182-DOC [WEB] Online Captcha (PenguinMod/, by enderhacker): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0183-LOAD [TERMINAL] Better Storage (PenguinMod/, by G1nX): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0183-RUN [TERMINAL] Better Storage (PenguinMod/, by G1nX): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0183-CREDIT [WEB] Better Storage (PenguinMod/, by G1nX): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0183-SAFE [WEB] Better Storage (PenguinMod/, by G1nX): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0183-DOC [WEB] Better Storage (PenguinMod/, by G1nX): 2-line kid description + 1 example idea for the extension gallery card.
[ ] EXT-0184-LOAD [TERMINAL] Mouth Washer (PenguinMod/, by G1nX): loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?
[ ] EXT-0184-RUN [TERMINAL] Mouth Washer (PenguinMod/, by G1nX): build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)
[ ] EXT-0184-CREDIT [WEB] Mouth Washer (PenguinMod/, by G1nX): check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.
[ ] EXT-0184-SAFE [WEB] Mouth Washer (PenguinMod/, by G1nX): read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?
[ ] EXT-0184-DOC [WEB] Mouth Washer (PenguinMod/, by G1nX): 2-line kid description + 1 example idea for the extension gallery card.


---
## chatgpt-jobs/JOBS-RECIPES.txt

JOBS - NEW GWRAP AI RECIPES (50 mechanics x 4 = 200 jobs)
READ FIRST: team/ai-team/CHATGPT-JOBS.md › HOW-TO-DO-EACH-JOB.md (step by step for every job type, report + bug templates).
RULES: team/ai-team/README.md. Work in batches of 10 jobs (same file, top to bottom, skip [x]). One report per batch:
team/chatgpt/jobs/<FILE>-<first id>-<last id>.md (one short section per job: result, proof, bug found? yes/no). Mark each job here
[x] (done) or [~] (done, found a bug -> also write team/chatgpt/bugs/BUG-<id>.md). Push after every batch + one AI-TEAM.txt line.
Proof words: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED. Never invent results. Never edit app.html.
Validate every pack file: python3 team/ai-team/tools/validate_gwrap_pack.py <your pack.json>. Put packs in the drop box team/ai-team/shared/.
These recipes are ALSO the AI Lab's teaching data - the more that really work, the smarter G-Warp's AI gets.

[ ] REC-001-1 [TERMINAL] recipe "jump" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-001-2 [TERMINAL] recipe "jump" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-001-3 [TERMINAL] recipe "jump" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-001-4 [TERMINAL] recipe "jump" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-002-1 [TERMINAL] recipe "double jump" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-002-2 [TERMINAL] recipe "double jump" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-002-3 [TERMINAL] recipe "double jump" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-002-4 [TERMINAL] recipe "double jump" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-003-1 [TERMINAL] recipe "wall jump" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-003-2 [TERMINAL] recipe "wall jump" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-003-3 [TERMINAL] recipe "wall jump" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-003-4 [TERMINAL] recipe "wall jump" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-004-1 [TERMINAL] recipe "gravity" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-004-2 [TERMINAL] recipe "gravity" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-004-3 [TERMINAL] recipe "gravity" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-004-4 [TERMINAL] recipe "gravity" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-005-1 [TERMINAL] recipe "platform collision" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-005-2 [TERMINAL] recipe "platform collision" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-005-3 [TERMINAL] recipe "platform collision" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-005-4 [TERMINAL] recipe "platform collision" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-006-1 [TERMINAL] recipe "moving platform" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-006-2 [TERMINAL] recipe "moving platform" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-006-3 [TERMINAL] recipe "moving platform" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-006-4 [TERMINAL] recipe "moving platform" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-007-1 [TERMINAL] recipe "coins + score" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-007-2 [TERMINAL] recipe "coins + score" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-007-3 [TERMINAL] recipe "coins + score" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-007-4 [TERMINAL] recipe "coins + score" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-008-1 [TERMINAL] recipe "lives + game over" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-008-2 [TERMINAL] recipe "lives + game over" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-008-3 [TERMINAL] recipe "lives + game over" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-008-4 [TERMINAL] recipe "lives + game over" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-009-1 [TERMINAL] recipe "health bar" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-009-2 [TERMINAL] recipe "health bar" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-009-3 [TERMINAL] recipe "health bar" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-009-4 [TERMINAL] recipe "health bar" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-010-1 [TERMINAL] recipe "enemy patrol" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-010-2 [TERMINAL] recipe "enemy patrol" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-010-3 [TERMINAL] recipe "enemy patrol" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-010-4 [TERMINAL] recipe "enemy patrol" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-011-1 [TERMINAL] recipe "enemy chase" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-011-2 [TERMINAL] recipe "enemy chase" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-011-3 [TERMINAL] recipe "enemy chase" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-011-4 [TERMINAL] recipe "enemy chase" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-012-1 [TERMINAL] recipe "shooting" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-012-2 [TERMINAL] recipe "shooting" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-012-3 [TERMINAL] recipe "shooting" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-012-4 [TERMINAL] recipe "shooting" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-013-1 [TERMINAL] recipe "bullets with clones" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-013-2 [TERMINAL] recipe "bullets with clones" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-013-3 [TERMINAL] recipe "bullets with clones" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-013-4 [TERMINAL] recipe "bullets with clones" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-014-1 [TERMINAL] recipe "timer countdown" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-014-2 [TERMINAL] recipe "timer countdown" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-014-3 [TERMINAL] recipe "timer countdown" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-014-4 [TERMINAL] recipe "timer countdown" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-015-1 [TERMINAL] recipe "high score (save)" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-015-2 [TERMINAL] recipe "high score (save)" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-015-3 [TERMINAL] recipe "high score (save)" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-015-4 [TERMINAL] recipe "high score (save)" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-016-1 [TERMINAL] recipe "levels / next level" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-016-2 [TERMINAL] recipe "levels / next level" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-016-3 [TERMINAL] recipe "levels / next level" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-016-4 [TERMINAL] recipe "levels / next level" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-017-1 [TERMINAL] recipe "menu screen" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-017-2 [TERMINAL] recipe "menu screen" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-017-3 [TERMINAL] recipe "menu screen" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-017-4 [TERMINAL] recipe "menu screen" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-018-1 [TERMINAL] recipe "pause" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-018-2 [TERMINAL] recipe "pause" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-018-3 [TERMINAL] recipe "pause" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-018-4 [TERMINAL] recipe "pause" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-019-1 [TERMINAL] recipe "camera scroll" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-019-2 [TERMINAL] recipe "camera scroll" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-019-3 [TERMINAL] recipe "camera scroll" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-019-4 [TERMINAL] recipe "camera scroll" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-020-1 [TERMINAL] recipe "parallax background" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-020-2 [TERMINAL] recipe "parallax background" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-020-3 [TERMINAL] recipe "parallax background" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-020-4 [TERMINAL] recipe "parallax background" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-021-1 [TERMINAL] recipe "top-down movement" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-021-2 [TERMINAL] recipe "top-down movement" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-021-3 [TERMINAL] recipe "top-down movement" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-021-4 [TERMINAL] recipe "top-down movement" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-022-1 [TERMINAL] recipe "8-direction movement" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-022-2 [TERMINAL] recipe "8-direction movement" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-022-3 [TERMINAL] recipe "8-direction movement" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-022-4 [TERMINAL] recipe "8-direction movement" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-023-1 [TERMINAL] recipe "drag and drop" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-023-2 [TERMINAL] recipe "drag and drop" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-023-3 [TERMINAL] recipe "drag and drop" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-023-4 [TERMINAL] recipe "drag and drop" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-024-1 [TERMINAL] recipe "inventory list" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-024-2 [TERMINAL] recipe "inventory list" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-024-3 [TERMINAL] recipe "inventory list" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-024-4 [TERMINAL] recipe "inventory list" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-025-1 [TERMINAL] recipe "dialogue / talking" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-025-2 [TERMINAL] recipe "dialogue / talking" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-025-3 [TERMINAL] recipe "dialogue / talking" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-025-4 [TERMINAL] recipe "dialogue / talking" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-026-1 [TERMINAL] recipe "quiz" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-026-2 [TERMINAL] recipe "quiz" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-026-3 [TERMINAL] recipe "quiz" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-026-4 [TERMINAL] recipe "quiz" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-027-1 [TERMINAL] recipe "random spawn" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-027-2 [TERMINAL] recipe "random spawn" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-027-3 [TERMINAL] recipe "random spawn" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-027-4 [TERMINAL] recipe "random spawn" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-028-1 [TERMINAL] recipe "falling objects (rain)" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-028-2 [TERMINAL] recipe "falling objects (rain)" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-028-3 [TERMINAL] recipe "falling objects (rain)" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-028-4 [TERMINAL] recipe "falling objects (rain)" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-029-1 [TERMINAL] recipe "particles with clones" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-029-2 [TERMINAL] recipe "particles with clones" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-029-3 [TERMINAL] recipe "particles with clones" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-029-4 [TERMINAL] recipe "particles with clones" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-030-1 [TERMINAL] recipe "day/night cycle" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-030-2 [TERMINAL] recipe "day/night cycle" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-030-3 [TERMINAL] recipe "day/night cycle" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-030-4 [TERMINAL] recipe "day/night cycle" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-031-1 [TERMINAL] recipe "sound effects on events" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-031-2 [TERMINAL] recipe "sound effects on events" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-031-3 [TERMINAL] recipe "sound effects on events" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-031-4 [TERMINAL] recipe "sound effects on events" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-032-1 [TERMINAL] recipe "background music loop" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-032-2 [TERMINAL] recipe "background music loop" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-032-3 [TERMINAL] recipe "background music loop" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-032-4 [TERMINAL] recipe "background music loop" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-033-1 [TERMINAL] recipe "animation walk cycle" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-033-2 [TERMINAL] recipe "animation walk cycle" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-033-3 [TERMINAL] recipe "animation walk cycle" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-033-4 [TERMINAL] recipe "animation walk cycle" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-034-1 [TERMINAL] recipe "pen drawing" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-034-2 [TERMINAL] recipe "pen drawing" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-034-3 [TERMINAL] recipe "pen drawing" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-034-4 [TERMINAL] recipe "pen drawing" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-035-1 [TERMINAL] recipe "paint program" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-035-2 [TERMINAL] recipe "paint program" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-035-3 [TERMINAL] recipe "paint program" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-035-4 [TERMINAL] recipe "paint program" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-036-1 [TERMINAL] recipe "snake game" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-036-2 [TERMINAL] recipe "snake game" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-036-3 [TERMINAL] recipe "snake game" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-036-4 [TERMINAL] recipe "snake game" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-037-1 [TERMINAL] recipe "pong" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-037-2 [TERMINAL] recipe "pong" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-037-3 [TERMINAL] recipe "pong" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-037-4 [TERMINAL] recipe "pong" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-038-1 [TERMINAL] recipe "breakout" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-038-2 [TERMINAL] recipe "breakout" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-038-3 [TERMINAL] recipe "breakout" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-038-4 [TERMINAL] recipe "breakout" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-039-1 [TERMINAL] recipe "flappy" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-039-2 [TERMINAL] recipe "flappy" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-039-3 [TERMINAL] recipe "flappy" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-039-4 [TERMINAL] recipe "flappy" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-040-1 [TERMINAL] recipe "clicker game" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-040-2 [TERMINAL] recipe "clicker game" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-040-3 [TERMINAL] recipe "clicker game" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-040-4 [TERMINAL] recipe "clicker game" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-041-1 [TERMINAL] recipe "tower defense path" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-041-2 [TERMINAL] recipe "tower defense path" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-041-3 [TERMINAL] recipe "tower defense path" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-041-4 [TERMINAL] recipe "tower defense path" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-042-1 [TERMINAL] recipe "grid movement" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-042-2 [TERMINAL] recipe "grid movement" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-042-3 [TERMINAL] recipe "grid movement" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-042-4 [TERMINAL] recipe "grid movement" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-043-1 [TERMINAL] recipe "tile map collision" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-043-2 [TERMINAL] recipe "tile map collision" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-043-3 [TERMINAL] recipe "tile map collision" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-043-4 [TERMINAL] recipe "tile map collision" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-044-1 [TERMINAL] recipe "boss fight" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-044-2 [TERMINAL] recipe "boss fight" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-044-3 [TERMINAL] recipe "boss fight" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-044-4 [TERMINAL] recipe "boss fight" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-045-1 [TERMINAL] recipe "power-ups" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-045-2 [TERMINAL] recipe "power-ups" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-045-3 [TERMINAL] recipe "power-ups" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-045-4 [TERMINAL] recipe "power-ups" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-046-1 [TERMINAL] recipe "shield" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-046-2 [TERMINAL] recipe "shield" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-046-3 [TERMINAL] recipe "shield" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-046-4 [TERMINAL] recipe "shield" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-047-1 [TERMINAL] recipe "dash" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-047-2 [TERMINAL] recipe "dash" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-047-3 [TERMINAL] recipe "dash" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-047-4 [TERMINAL] recipe "dash" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-048-1 [TERMINAL] recipe "knockback" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-048-2 [TERMINAL] recipe "knockback" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-048-3 [TERMINAL] recipe "knockback" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-048-4 [TERMINAL] recipe "knockback" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-049-1 [TERMINAL] recipe "checkpoints" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-049-2 [TERMINAL] recipe "checkpoints" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-049-3 [TERMINAL] recipe "checkpoints" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-049-4 [TERMINAL] recipe "checkpoints" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-050-1 [TERMINAL] recipe "cutscene" - basic: the simplest version (≤ 12 blocks). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-050-2 [TERMINAL] recipe "cutscene" - better: a nicer version (smooth, feels good). Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-050-3 [TERMINAL] recipe "cutscene" - clone-safe: works with clones / many sprites. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.
[ ] REC-050-4 [TERMINAL] recipe "cutscene" - explain: kid explanation + common bug and its fix. Write it in the GWrap AI pack format (team/claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.


---
## chatgpt-jobs/JOBS-TESTING.txt

JOBS - KID CRITIC + CHAOS TESTS (40 projects x 2 = 80 jobs)
READ FIRST: team/ai-team/CHATGPT-JOBS.md › HOW-TO-DO-EACH-JOB.md (step by step for every job type, report + bug templates).
RULES: team/ai-team/README.md. Work in batches of 10 jobs (same file, top to bottom, skip [x]). One report per batch:
team/chatgpt/jobs/<FILE>-<first id>-<last id>.md (one short section per job: result, proof, bug found? yes/no). Mark each job here
[x] (done) or [~] (done, found a bug -> also write team/chatgpt/bugs/BUG-<id>.md). Push after every batch + one AI-TEAM.txt line.
Proof words: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED. Never invent results. Never edit app.html.
Projects you make are yours (own art) and go in team/chatgpt/out/ (git-ignored). NEVER use the owner's private test projects here.

[ ] KID-001 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "plane game" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-001 [TERMINAL] CHAOS TEST "plane game": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-002 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "space shooter" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-002 [TERMINAL] CHAOS TEST "space shooter": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-003 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "maze" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-003 [TERMINAL] CHAOS TEST "maze": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-004 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "catch the apples" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-004 [TERMINAL] CHAOS TEST "catch the apples": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-005 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "racing (top-down)" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-005 [TERMINAL] CHAOS TEST "racing (top-down)": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-006 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "pet simulator" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-006 [TERMINAL] CHAOS TEST "pet simulator": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-007 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "piano" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-007 [TERMINAL] CHAOS TEST "piano": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-008 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "drum machine" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-008 [TERMINAL] CHAOS TEST "drum machine": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-009 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "drawing app" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-009 [TERMINAL] CHAOS TEST "drawing app": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-010 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "story with 3 scenes" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-010 [TERMINAL] CHAOS TEST "story with 3 scenes": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-011 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "quiz about animals" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-011 [TERMINAL] CHAOS TEST "quiz about animals": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-012 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "platformer 3 levels" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-012 [TERMINAL] CHAOS TEST "platformer 3 levels": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-013 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "snake" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-013 [TERMINAL] CHAOS TEST "snake": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-014 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "pong for 2 players" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-014 [TERMINAL] CHAOS TEST "pong for 2 players": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-015 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "clicker" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-015 [TERMINAL] CHAOS TEST "clicker": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-016 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "dress-up" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-016 [TERMINAL] CHAOS TEST "dress-up": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-017 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "weather animation" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-017 [TERMINAL] CHAOS TEST "weather animation": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-018 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "fireworks" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-018 [TERMINAL] CHAOS TEST "fireworks": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-019 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "solar system" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-019 [TERMINAL] CHAOS TEST "solar system": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-020 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "calculator" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-020 [TERMINAL] CHAOS TEST "calculator": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-021 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "stopwatch" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-021 [TERMINAL] CHAOS TEST "stopwatch": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-022 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "typing game" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-022 [TERMINAL] CHAOS TEST "typing game": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-023 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "memory cards" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-023 [TERMINAL] CHAOS TEST "memory cards": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-024 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "tic-tac-toe" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-024 [TERMINAL] CHAOS TEST "tic-tac-toe": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-025 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "connect four" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-025 [TERMINAL] CHAOS TEST "connect four": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-026 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "flappy clone" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-026 [TERMINAL] CHAOS TEST "flappy clone": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-027 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "endless runner" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-027 [TERMINAL] CHAOS TEST "endless runner": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-028 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "fishing game" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-028 [TERMINAL] CHAOS TEST "fishing game": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-029 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "zombie survival" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-029 [TERMINAL] CHAOS TEST "zombie survival": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-030 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "tower defense" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-030 [TERMINAL] CHAOS TEST "tower defense": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-031 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "fighting game (2 players)" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-031 [TERMINAL] CHAOS TEST "fighting game (2 players)": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-032 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "rhythm game" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-032 [TERMINAL] CHAOS TEST "rhythm game": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-033 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "music video" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-033 [TERMINAL] CHAOS TEST "music video": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-034 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "chat bot" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-034 [TERMINAL] CHAOS TEST "chat bot": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-035 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "birthday card" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-035 [TERMINAL] CHAOS TEST "birthday card": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-036 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "clock" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-036 [TERMINAL] CHAOS TEST "clock": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-037 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "bouncing balls (100 clones)" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-037 [TERMINAL] CHAOS TEST "bouncing balls (100 clones)": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-038 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "paint with pen" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-038 [TERMINAL] CHAOS TEST "paint with pen": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-039 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "gravity sandbox" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-039 [TERMINAL] CHAOS TEST "gravity sandbox": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.
[ ] KID-040 [TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "maze generator" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.
[ ] CHAOS-040 [TERMINAL] CHAOS TEST "maze generator": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.


---
## chatgpt-jobs/JOBS-UI.txt

JOBS - EVERY BUTTON / TOOLTIP (118 x 3 = 354 jobs)   source: title texts in app.html
READ FIRST: team/ai-team/CHATGPT-JOBS.md › HOW-TO-DO-EACH-JOB.md (step by step for every job type, report + bug templates).
RULES: team/ai-team/README.md. Work in batches of 10 jobs (same file, top to bottom, skip [x]). One report per batch:
team/chatgpt/jobs/<FILE>-<first id>-<last id>.md (one short section per job: result, proof, bug found? yes/no). Mark each job here
[x] (done) or [~] (done, found a bug -> also write team/chatgpt/bugs/BUG-<id>.md). Push after every batch + one AI-TEAM.txt line.
Proof words: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED. Never invent results. Never edit app.html.

[ ] UI-0001-CLICK [TERMINAL] button/control "About G-Warp": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0001-ICON [WEB] "About G-Warp": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0001-WORDS [WEB] "About G-Warp": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0002-CLICK [TERMINAL] button/control "Add a picture (png, jpg, svg)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0002-ICON [WEB] "Add a picture (png, jpg, svg)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0002-WORDS [WEB] "Add a picture (png, jpg, svg)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0003-CLICK [TERMINAL] button/control "Add a sound file (mp3, wav, ogg)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0003-ICON [WEB] "Add a sound file (mp3, wav, ogg)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0003-WORDS [WEB] "Add a sound file (mp3, wav, ogg)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0004-CLICK [TERMINAL] button/control "Add text": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0004-ICON [WEB] "Add text": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0004-WORDS [WEB] "Add text": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0005-CLICK [TERMINAL] button/control "Addons": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0005-ICON [WEB] "Addons": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0005-WORDS [WEB] "Addons": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0006-CLICK [TERMINAL] button/control "Advanced settings": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0006-ICON [WEB] "Advanced settings": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0006-WORDS [WEB] "Advanced settings": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0007-CLICK [TERMINAL] button/control "Ask the helper": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0007-ICON [WEB] "Ask the helper": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0007-WORDS [WEB] "Ask the helper": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0008-CLICK [TERMINAL] button/control "Basics: how G-Warp works": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0008-ICON [WEB] "Basics: how G-Warp works": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0008-WORDS [WEB] "Basics: how G-Warp works": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0009-CLICK [TERMINAL] button/control "Blocks and scripts in the code area (Addons: block counter)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0009-ICON [WEB] "Blocks and scripts in the code area (Addons: block counter)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0009-WORDS [WEB] "Blocks and scripts in the code area (Addons: block counter)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0010-CLICK [TERMINAL] button/control "Bounce around the stage": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0010-ICON [WEB] "Bounce around the stage": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0010-WORDS [WEB] "Bounce around the stage": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0011-CLICK [TERMINAL] button/control "Bug Hunter trophies": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0011-ICON [WEB] "Bug Hunter trophies": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0011-WORDS [WEB] "Bug Hunter trophies": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0012-CLICK [TERMINAL] button/control "Build a script": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0012-ICON [WEB] "Build a script": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0012-WORDS [WEB] "Build a script": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0013-CLICK [TERMINAL] button/control "Change text": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0013-ICON [WEB] "Change text": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0013-WORDS [WEB] "Change text": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0014-CLICK [TERMINAL] button/control "Choose a Backdrop": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0014-ICON [WEB] "Choose a Backdrop": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0014-WORDS [WEB] "Choose a Backdrop": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0015-CLICK [TERMINAL] button/control "Choose a Sprite": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0015-ICON [WEB] "Choose a Sprite": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0015-WORDS [WEB] "Choose a Sprite": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0016-CLICK [TERMINAL] button/control "Clear all scripts": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0016-ICON [WEB] "Clear all scripts": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0016-WORDS [WEB] "Clear all scripts": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0017-CLICK [TERMINAL] button/control "Click to play from that part": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0017-ICON [WEB] "Click to play from that part": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0017-WORDS [WEB] "Click to play from that part": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0018-CLICK [TERMINAL] button/control "Clones right now (Addons: clone counter)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0018-ICON [WEB] "Clones right now (Addons: clone counter)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0018-WORDS [WEB] "Clones right now (Addons: clone counter)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0019-CLICK [TERMINAL] button/control "Close": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0019-ICON [WEB] "Close": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0019-WORDS [WEB] "Close": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0020-CLICK [TERMINAL] button/control "Cloud variables": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0020-ICON [WEB] "Cloud variables": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0020-WORDS [WEB] "Cloud variables": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0021-CLICK [TERMINAL] button/control "Code: your first script": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0021-ICON [WEB] "Code: your first script": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0021-WORDS [WEB] "Code: your first script": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0022-CLICK [TERMINAL] button/control "Copy this frame after it": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0022-ICON [WEB] "Copy this frame after it": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0022-WORDS [WEB] "Copy this frame after it": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0023-CLICK [TERMINAL] button/control "Costumes": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0023-ICON [WEB] "Costumes": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0023-WORDS [WEB] "Costumes": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0024-CLICK [TERMINAL] button/control "Countdown from 10": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0024-ICON [WEB] "Countdown from 10": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0024-WORDS [WEB] "Countdown from 10": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0025-CLICK [TERMINAL] button/control "Dangerous: can read": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0025-ICON [WEB] "Dangerous: can read": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0025-WORDS [WEB] "Dangerous: can read": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0026-CLICK [TERMINAL] button/control "Debug panel": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0026-ICON [WEB] "Debug panel": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0026-WORDS [WEB] "Debug panel": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0027-CLICK [TERMINAL] button/control "Delete": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0027-ICON [WEB] "Delete": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0027-WORDS [WEB] "Delete": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0028-CLICK [TERMINAL] button/control "Delete comment": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0028-ICON [WEB] "Delete comment": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0028-WORDS [WEB] "Delete comment": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0029-CLICK [TERMINAL] button/control "Delete frame": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0029-ICON [WEB] "Delete frame": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0029-WORDS [WEB] "Delete frame": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0030-CLICK [TERMINAL] button/control "Delete this behavior": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0030-ICON [WEB] "Delete this behavior": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0030-WORDS [WEB] "Delete this behavior": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0031-CLICK [TERMINAL] button/control "Drag to take this block out": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0031-ICON [WEB] "Drag to take this block out": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0031-WORDS [WEB] "Drag to take this block out": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0032-CLICK [TERMINAL] button/control "Draw a costume": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0032-ICON [WEB] "Draw a costume": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0032-WORDS [WEB] "Draw a costume": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0033-CLICK [TERMINAL] button/control "Duplicate": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0033-ICON [WEB] "Duplicate": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0033-WORDS [WEB] "Duplicate": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0034-CLICK [TERMINAL] button/control "Export .gwarp project": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0034-ICON [WEB] "Export .gwarp project": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0034-WORDS [WEB] "Export .gwarp project": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0035-CLICK [TERMINAL] button/control "Export .sb3 (experimental)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0035-ICON [WEB] "Export .sb3 (experimental)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0035-WORDS [WEB] "Export .sb3 (experimental)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0036-CLICK [TERMINAL] button/control "Extension library": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0036-ICON [WEB] "Extension library": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0036-WORDS [WEB] "Extension library": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0037-CLICK [TERMINAL] button/control "Extensions": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0037-ICON [WEB] "Extensions": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0037-WORDS [WEB] "Extensions": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0038-CLICK [TERMINAL] button/control "Fade away and back": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0038-ICON [WEB] "Fade away and back": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0038-WORDS [WEB] "Fade away and back": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0039-CLICK [TERMINAL] button/control "Fall with gravity": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0039-ICON [WEB] "Fall with gravity": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0039-WORDS [WEB] "Fall with gravity": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0040-CLICK [TERMINAL] button/control "Flipbook: play the costumes in order, like an animation": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0040-ICON [WEB] "Flipbook: play the costumes in order, like an animation": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0040-WORDS [WEB] "Flipbook: play the costumes in order, like an animation": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0041-CLICK [TERMINAL] button/control "Fold / unfold": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0041-ICON [WEB] "Fold / unfold": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0041-WORDS [WEB] "Fold / unfold": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0042-CLICK [TERMINAL] button/control "Follow the mouse": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0042-ICON [WEB] "Follow the mouse": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0042-WORDS [WEB] "Follow the mouse": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0043-CLICK [TERMINAL] button/control "Frames per second": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0043-ICON [WEB] "Frames per second": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0043-WORDS [WEB] "Frames per second": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0044-CLICK [TERMINAL] button/control "From the middle of a song over 1 minute": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0044-ICON [WEB] "From the middle of a song over 1 minute": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0044-WORDS [WEB] "From the middle of a song over 1 minute": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0045-CLICK [TERMINAL] button/control "G-Warp Desktop v15.7.1 — Sound & Costume Studio": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0045-ICON [WEB] "G-Warp Desktop v15.7.1 — Sound & Costume Studio": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0045-WORDS [WEB] "G-Warp Desktop v15.7.1 — Sound & Costume Studio": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0046-CLICK [TERMINAL] button/control "Generate a loop": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0046-ICON [WEB] "Generate a loop": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0046-WORDS [WEB] "Generate a loop": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0047-CLICK [TERMINAL] button/control "Grow and shrink": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0047-ICON [WEB] "Grow and shrink": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0047-WORDS [WEB] "Grow and shrink": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0048-CLICK [TERMINAL] button/control "Hear": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0048-ICON [WEB] "Hear": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0048-WORDS [WEB] "Hear": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0049-CLICK [TERMINAL] button/control "Import .gwarp project": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0049-ICON [WEB] "Import .gwarp project": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0049-WORDS [WEB] "Import .gwarp project": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0050-CLICK [TERMINAL] button/control "Import .sb3 (experimental)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0050-ICON [WEB] "Import .sb3 (experimental)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0050-WORDS [WEB] "Import .sb3 (experimental)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0051-CLICK [TERMINAL] button/control "Input of your block: use it inside its "define" script": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0051-ICON [WEB] "Input of your block: use it inside its "define" script": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0051-WORDS [WEB] "Input of your block: use it inside its "define" script": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0052-CLICK [TERMINAL] button/control "Jump when space is pressed": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0052-ICON [WEB] "Jump when space is pressed": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0052-WORDS [WEB] "Jump when space is pressed": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0053-CLICK [TERMINAL] button/control "Keep score": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0053-ICON [WEB] "Keep score": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0053-WORDS [WEB] "Keep score": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0054-CLICK [TERMINAL] button/control "Listen": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0054-ICON [WEB] "Listen": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0054-WORDS [WEB] "Listen": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0055-CLICK [TERMINAL] button/control "Load a project from the web": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0055-ICON [WEB] "Load a project from the web": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0055-WORDS [WEB] "Load a project from the web": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0056-CLICK [TERMINAL] button/control "Make your own song": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0056-ICON [WEB] "Make your own song": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0056-WORDS [WEB] "Make your own song": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0057-CLICK [TERMINAL] button/control "More tools": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0057-ICON [WEB] "More tools": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0057-WORDS [WEB] "More tools": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0058-CLICK [TERMINAL] button/control "Move frame left": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0058-ICON [WEB] "Move frame left": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0058-WORDS [WEB] "Move frame left": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0059-CLICK [TERMINAL] button/control "Move frame right": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0059-ICON [WEB] "Move frame right": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0059-WORDS [WEB] "Move frame right": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0060-CLICK [TERMINAL] button/control "Move the whole tune one note down": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0060-ICON [WEB] "Move the whole tune one note down": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0060-WORDS [WEB] "Move the whole tune one note down": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0061-CLICK [TERMINAL] button/control "Move the whole tune one note up": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0061-ICON [WEB] "Move the whole tune one note up": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0061-WORDS [WEB] "Move the whole tune one note up": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0062-CLICK [TERMINAL] button/control "Move with the arrow keys": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0062-ICON [WEB] "Move with the arrow keys": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0062-WORDS [WEB] "Move with the arrow keys": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0063-CLICK [TERMINAL] button/control "Music: make a loop": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0063-ICON [WEB] "Music: make a loop": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0063-WORDS [WEB] "Music: make a loop": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0064-CLICK [TERMINAL] button/control "Next frame": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0064-ICON [WEB] "Next frame": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0064-WORDS [WEB] "Next frame": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0065-CLICK [TERMINAL] button/control "No colour": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0065-ICON [WEB] "No colour": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0065-WORDS [WEB] "No colour": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0066-CLICK [TERMINAL] button/control "On: every note lasts until the next one (smooth). Off: short notes.": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0066-ICON [WEB] "On: every note lasts until the next one (smooth). Off: short notes.": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0066-WORDS [WEB] "On: every note lasts until the next one (smooth). Off: short notes.": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0067-CLICK [TERMINAL] button/control "Open the Sounds tab": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0067-ICON [WEB] "Open the Sounds tab": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0067-WORDS [WEB] "Open the Sounds tab": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0068-CLICK [TERMINAL] button/control "Pause / Resume": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0068-ICON [WEB] "Pause / Resume": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0068-WORDS [WEB] "Pause / Resume": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0069-CLICK [TERMINAL] button/control "Pick a colour from the screen": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0069-ICON [WEB] "Pick a colour from the screen": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0069-WORDS [WEB] "Pick a colour from the screen": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0070-CLICK [TERMINAL] button/control "Pick a seed": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0070-ICON [WEB] "Pick a seed": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0070-WORDS [WEB] "Pick a seed": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0071-CLICK [TERMINAL] button/control "Pick a style and mood": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0071-ICON [WEB] "Pick a style and mood": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0071-WORDS [WEB] "Pick a style and mood": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0072-CLICK [TERMINAL] button/control "Play / stop": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0072-ICON [WEB] "Play / stop": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0072-WORDS [WEB] "Play / stop": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0073-CLICK [TERMINAL] button/control "Play a sound when clicked": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0073-ICON [WEB] "Play a sound when clicked": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0073-WORDS [WEB] "Play a sound when clicked": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0074-CLICK [TERMINAL] button/control "Play it in a script": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0074-ICON [WEB] "Play it in a script": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0074-WORDS [WEB] "Play it in a script": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0075-CLICK [TERMINAL] button/control "Play music forever": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0075-ICON [WEB] "Play music forever": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0075-WORDS [WEB] "Play music forever": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0076-CLICK [TERMINAL] button/control "Play the frames (the button turns into Stop)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0076-ICON [WEB] "Play the frames (the button turns into Stop)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0076-WORDS [WEB] "Play the frames (the button turns into Stop)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0077-CLICK [TERMINAL] button/control "Previous frame": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0077-ICON [WEB] "Previous frame": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0077-WORDS [WEB] "Previous frame": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0078-CLICK [TERMINAL] button/control "Record or upload a sound": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0078-ICON [WEB] "Record or upload a sound": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0078-WORDS [WEB] "Record or upload a sound": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0079-CLICK [TERMINAL] button/control "Record with your microphone (up to 15 seconds)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0079-ICON [WEB] "Record with your microphone (up to 15 seconds)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0079-WORDS [WEB] "Record with your microphone (up to 15 seconds)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0080-CLICK [TERMINAL] button/control "Redo (Ctrl+Shift+Z)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0080-ICON [WEB] "Redo (Ctrl+Shift+Z)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0080-WORDS [WEB] "Redo (Ctrl+Shift+Z)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0081-CLICK [TERMINAL] button/control "Redo (Ctrl+Y)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0081-ICON [WEB] "Redo (Ctrl+Y)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0081-WORDS [WEB] "Redo (Ctrl+Y)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0082-CLICK [TERMINAL] button/control "Rename animation": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0082-ICON [WEB] "Rename animation": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0082-WORDS [WEB] "Rename animation": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0083-CLICK [TERMINAL] button/control "Report a bug": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0083-ICON [WEB] "Report a bug": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0083-WORDS [WEB] "Report a bug": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0084-CLICK [TERMINAL] button/control "Restore a previous version": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0084-ICON [WEB] "Restore a previous version": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0084-WORDS [WEB] "Restore a previous version": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0085-CLICK [TERMINAL] button/control "Run it": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0085-ICON [WEB] "Run it": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0085-WORDS [WEB] "Run it": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0086-CLICK [TERMINAL] button/control "Runs without screen refresh": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0086-ICON [WEB] "Runs without screen refresh": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0086-WORDS [WEB] "Runs without screen refresh": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0087-CLICK [TERMINAL] button/control "Save a bug report kit": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0087-ICON [WEB] "Save a bug report kit": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0087-WORDS [WEB] "Save a bug report kit": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0088-CLICK [TERMINAL] button/control "Save it to a sprite": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0088-ICON [WEB] "Save it to a sprite": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0088-WORDS [WEB] "Save it to a sprite": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0089-CLICK [TERMINAL] button/control "Save your project": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0089-ICON [WEB] "Save your project": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0089-WORDS [WEB] "Save your project": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0090-CLICK [TERMINAL] button/control "Saves a bug report kit file on this computer (nothing is sent)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0090-ICON [WEB] "Saves a bug report kit file on this computer (nothing is sent)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0090-WORDS [WEB] "Saves a bug report kit file on this computer (nothing is sent)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0091-CLICK [TERMINAL] button/control "Say hello when clicked": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0091-ICON [WEB] "Say hello when clicked": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0091-WORDS [WEB] "Say hello when clicked": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0092-CLICK [TERMINAL] button/control "Say “Ouch!” at the edge": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0092-ICON [WEB] "Say “Ouch!” at the edge": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0092-WORDS [WEB] "Say “Ouch!” at the edge": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0093-CLICK [TERMINAL] button/control "Set speed and length": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0093-ICON [WEB] "Set speed and length": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0093-WORDS [WEB] "Set speed and length": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0094-CLICK [TERMINAL] button/control "Shake when clicked": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0094-ICON [WEB] "Shake when clicked": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0094-WORDS [WEB] "Shake when clicked": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0095-CLICK [TERMINAL] button/control "Share cloud variables online?": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0095-ICON [WEB] "Share cloud variables online?": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0095-WORDS [WEB] "Share cloud variables online?": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0096-CLICK [TERMINAL] button/control "Sounds": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0096-ICON [WEB] "Sounds": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0096-WORDS [WEB] "Sounds": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0097-CLICK [TERMINAL] button/control "Spin around": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0097-ICON [WEB] "Spin around": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0097-WORDS [WEB] "Spin around": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0098-CLICK [TERMINAL] button/control "Start (green flag)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0098-ICON [WEB] "Start (green flag)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0098-WORDS [WEB] "Start (green flag)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0099-CLICK [TERMINAL] button/control "Start a blank costume": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0099-ICON [WEB] "Start a blank costume": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0099-WORDS [WEB] "Start a blank costume": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0100-CLICK [TERMINAL] button/control "Start again after the last costume": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0100-ICON [WEB] "Start again after the last costume": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0100-WORDS [WEB] "Start again after the last costume": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0101-CLICK [TERMINAL] button/control "Start and Stop": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0101-ICON [WEB] "Start and Stop": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0101-WORDS [WEB] "Start and Stop": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0102-CLICK [TERMINAL] button/control "Start and stop your game": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0102-ICON [WEB] "Start and stop your game": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0102-WORDS [WEB] "Start and stop your game": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0103-CLICK [TERMINAL] button/control "Stop All Scripts": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0103-ICON [WEB] "Stop All Scripts": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0103-WORDS [WEB] "Stop All Scripts": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0104-CLICK [TERMINAL] button/control "Teleport to a random spot": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0104-ICON [WEB] "Teleport to a random spot": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0104-WORDS [WEB] "Teleport to a random spot": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0105-CLICK [TERMINAL] button/control "The Code tab": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0105-ICON [WEB] "The Code tab": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0105-WORDS [WEB] "The Code tab": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0106-CLICK [TERMINAL] button/control "Toggle Turbo Mode": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0106-ICON [WEB] "Toggle Turbo Mode": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0106-WORDS [WEB] "Toggle Turbo Mode": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0107-CLICK [TERMINAL] button/control "Turn away from the edge": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0107-ICON [WEB] "Turn away from the edge": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0107-WORDS [WEB] "Turn away from the edge": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0108-CLICK [TERMINAL] button/control "Turn onion skin off": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0108-ICON [WEB] "Turn onion skin off": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0108-WORDS [WEB] "Turn onion skin off": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0109-CLICK [TERMINAL] button/control "Type commands": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0109-ICON [WEB] "Type commands": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0109-WORDS [WEB] "Type commands": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0110-CLICK [TERMINAL] button/control "Undo (Ctrl+Z)": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0110-ICON [WEB] "Undo (Ctrl+Z)": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0110-WORDS [WEB] "Undo (Ctrl+Z)": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0111-CLICK [TERMINAL] button/control "Undo a mistake": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0111-ICON [WEB] "Undo a mistake": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0111-WORDS [WEB] "Undo a mistake": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0112-CLICK [TERMINAL] button/control "Update G-Warp": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0112-ICON [WEB] "Update G-Warp": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0112-WORDS [WEB] "Update G-Warp": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0113-CLICK [TERMINAL] button/control "Using “if” blocks": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0113-ICON [WEB] "Using “if” blocks": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0113-WORDS [WEB] "Using “if” blocks": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0114-CLICK [TERMINAL] button/control "Walking animation": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0114-ICON [WEB] "Walking animation": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0114-WORDS [WEB] "Walking animation": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0115-CLICK [TERMINAL] button/control "Welcome": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0115-ICON [WEB] "Welcome": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0115-WORDS [WEB] "Welcome": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0116-CLICK [TERMINAL] button/control "Welcome back": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0116-ICON [WEB] "Welcome back": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0116-WORDS [WEB] "Welcome back": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0117-CLICK [TERMINAL] button/control "Your project is stuck": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0117-ICON [WEB] "Your project is stuck": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0117-WORDS [WEB] "Your project is stuck": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.
[ ] UI-0118-CLICK [TERMINAL] button/control "⚠ Dangerous extension": find it, click it, does it do what the tooltip says? no page errors?
[ ] UI-0118-ICON [WEB] "⚠ Dangerous extension": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")
[ ] UI-0118-WORDS [WEB] "⚠ Dangerous extension": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.


---
## chatgpt-jobs/README.md

**READ FIRST: [HOW-TO-DO-EACH-JOB.md](HOW-TO-DO-EACH-JOB.md)** — exactly how to do every job type, with examples and templates.

# ChatGPT's job bank — 2,474 jobs (owner, 2026-10-26: "assign thousands of jobs for ChatGPT")

Made by `make_jobs.py` from G-Warp's own data: every block, every gallery extension, every button, plus recipes, tests and art.
Re-run it after G-Warp changes; it keeps your `[x]` / `[~]` marks.

**Order (do the higher lists first; inside a list, top to bottom):**
1. `team/ai-team/CHATGPT-JOBS.md › CHATGPT-ANIMATION-TODO-2026-10-26.txt` (the animation chat)
2. The **AI Lab** chat does only `team/ai-team/AI-LAB-PROMPT-2026-10-26.txt`, never these files.
3. Then this job bank:

| File | Jobs | On chatgpt.com | On Freebuff |
|---|---|---|---|
| `JOBS-UI.txt` | 354 | `-ICON`, `-WORDS` | `-CLICK` |
| `JOBS-BLOCKS.txt` | 880 | `-DOC` (`-AI` after AIM-1) | `-PAR`, `-EDGE`, `-SAVE` |
| `JOBS-EXTENSIONS.txt` | 920 | `-CREDIT`, `-SAFE`, `-DOC` | `-LOAD`, `-RUN` |
| `JOBS-RECIPES.txt` | 200 | write the recipe | build + prove it |
| `JOBS-TESTING.txt` | 80 | — | kid critic + chaos |
| `JOBS-ART.txt` | 40 | all (take your time) | — |

**Several ChatGPT sessions at once?** Use the lanes: `team/ai-team/lanes/README.md` (one session = one lane = one job file).

**How to work:**
- Batches of 10.
- One report per batch in `team/chatgpt/jobs/`.
- Mark `[x]` (done) or `[~]` (done, bug found). Each bug also goes in `team/chatgpt/bugs/BUG-<id>.md`.
- After every batch: push, then add one line to `AI-TEAM.txt`.
- On chatgpt.com, do the `[WEB]`/`[ANY]` jobs. On Freebuff, do the `[TERMINAL]` ones.
- Never sit idle: when a job is blocked, write one line why and take the next one.
- All the rules are in `team/ai-team/README.md` (log gate first!).


---
## chatgpt-jobs/TOTAL.txt

2474 jobs (generated by make_jobs.py)
