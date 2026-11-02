# G-Warp AI team — ONE to-do list

Owner: **Creapter1** · Made 2026-11-01 by merging every old TODO / plan / job / lane / queue file (see `CLEANUP-REPORT.md`).
App now: **Beta v15.60.0**. This is the only to-do list. Add new items here, in the right area, one line each.

**How to read a line:** `[open]` = still to do · `[later]` = idea / waits for the owner · `[done]` = finished (only in the last section).
The name in `[brackets]` at the end = the old file the item came from (old files are in git history or in `team/ai-team/archive/`).
**Detail for big jobs** still lives in these active files: animation `team/ai-team/CHATGPT-JOBS.md › CHATGPT-ANIMATION-TODO-2026-10-26.txt`, music icons
`team/ai-team/CHATGPT-JOBS.md › CHATGPT-MUSIC-ICONS-2026-10-26.txt`, website `team/ai-team/CHATGPT-JOBS.md › CHATGPT-WEBSITE-REDESIGN-2026-10-26.txt`, in-app AI
`team/ai-team/ideas/GWARP-AI-MODEL-2026-10-26.md`, job bank `team/ai-team/chatgpt-jobs/`, Claude's how-to + code anchors `team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md`.

---

> ⛔ **RULE ZERO (absolute, non-negotiable):** every AI works ONLY on the `ai-team` branch. Never commit, push, merge or open a pull request to `main` or anywhere outside `ai-team`. Only the owner moves work to `main`.

## Team rules (short — full rules: `team/ai-team/README.md`)

1. **G-Warp keeps its own look.** Same blocks and same results as Scratch / TurboWarp / PenguinMod, but G-Warp style: dark, violet `#8b5cf6` + electric green `#4ade80`, electric C-blocks with the electricity animation, black text on Events/Control, G-Spark mascot, Start/Pause/Stop only in the top bar. Never make it look like Scratch (the Scratch look is only an option in More → Settings).
2. **Nothing goes live without the owner's OK.** Only Claude Opus changes `app.html` / `index.html`; everyone else hands in files (drop box `team/ai-team/shared/`).
3. **Theirs is theirs, ours is ours.** No Scratch art, logos or cat. Credit every extension and every creator, follow every licence.
4. **AI blocks are PURPLE, the user's own blocks are GREEN** (electricity colour, per block).
5. **G-Spark AI asks before it uses extension blocks** (some projects must stay 100% Scratch). If something G-Spark made is broken, it fixes that, it doesn't start over.
6. **Add, don't remove.** A new system goes side by side with the old one; the owner picks.
7. **Kids' safety:** no accounts, under-13s need a parent's OK before any data is sent, never run JavaScript blocks, extensions that read personal data are marked Dangerous. No secrets/keys in files.
8. **Owner's private test projects** (`Creapter1/gwarp-test-projects`) never go into this repo, the app or the site.
9. **Log gate:** log start + closeout in your own `AI-CHAT-LOG.txt`, one line per finished job in `AI-TEAM.txt`. Proof words only: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED.
10. **No questions, never stop:** blocked → write `BLOCKED: why` here and take the next item. Short, simple English for the owner.

---

## 1. Engine / performance

- [open] Top priority: G-Warp must work 100% — no bugs, no lag — before "crazy stuff" [owner notes 2026-10-28]
- [open] S1 Code-area lag: running-script glow uses `filter` on the whole stack → glow only the hat (box-shadow) or paint containment; target ≥ 28 ticks/s with code area visible [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] S2 Power-line sparks max ~15 fps while a project runs (or pause when the stage FPS drops) [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] S3 Undo: skip `GW8.pushHistory` while running, push once on Stop (no 3.6 MB hitches) [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] S4 "Smooth motion" (interpolation like TurboWarp), setting ON by default [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] S5 Re-measure speed + regressions + parity fixtures after S1-S4 [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] Block compiler: 1 statement cache → 2 expression cache → 3 compile to JS → 4 fast warp loops (target: zombie test game 30-60 FPS) [team/ai-team/SPEED-PLAN.txt, ASSIGNMENTS-2026-10-19 CL1]
- [open] Collision speed-up candidate `speed-collision-B.js` — merge only after a rotation/scale correctness test [MERGE-QUEUE.txt, ASSIGNMENTS-2026-10-19 CL2]
- [open] Re-run clone/Stop stress tests (299/300/301 clones, Stop during load, turbo, feature-off) after any runtime change [CONTINUOUS-WORK-QUEUE.txt]
- [open] Performance benchmark: script-heavy vs render-heavy, 3 runs each, owner's private projects + TurboWarp CPUMark; 60 FPS is a goal, not a promise [team/ai-team/PERFORMANCE-BENCHMARK-PLAN.txt, TODO.txt]
- [open] B5 ChatGPT: FPS test with 300 moving + touching clones, G-Warp vs scratch-vm [CHATGPT-TODO-2026-10-26]
- [open] L7 ChatGPT lab: faster "touching" for 1000 clones (measure with the QA kit) [CHATGPT-TODO-2026-10-26]
- [open] E1.9 Opening an .sb3 should run at 30 FPS unless the project asks for 60 [MISSING-LIST.txt]
- [open] Unsupported blocks in the zombie test: `lmsclonesplus_touchingCloneWithVar`, `sensing_setdragmode` [team/ai-team/P0-CLONE-FREEZE-REPORT.txt]
- [open] Check: v15.57.0 same-frame threads — if any project acts differently, switch `GW_SAME_FRAME=false` and report [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [later] GPU/rendering research: profile first; Canvas batching/culling, OffscreenCanvas; WebGL/WebGPU only if measurements say rendering is the bottleneck [TODO.txt]
- [later] E3.2 Compiler on/off option [MISSING-LIST.txt]

## 2. Blocks & Scratch parity

- [open] Parity fixtures: reconcile Grok's 60 base + 10 extra list cases (T130-T139) with the runner, fix `FIXTURE-SOURCES.txt` (T043), run them all [TODO.txt item 4, AI-STATUS.txt]
- [open] Fix wrong expected values in Grok fixtures (O205, T124, C003, T111/T116/T117/LS021/LS026) and broken `fixtures-myblocks.json`; check disputed L215 (list `[1,2]` shows "12") [team/claude/CLAUDE-NOTES.md › REVIEW-GROK-FIXTURES-2026-10-20.txt]
- [open] K0 ChatGPT: corrected fixtures file `team/chatgpt/fixtures/fixtures-fixed.json` [CHATGPT-TODO-2026-10-26]
- [open] K5-K7 ChatGPT: `ENGINE-DIFFS.txt` (G-Warp vs scratch-vm per block), `COVERAGE.csv` (every core opcode), ≥3 fixtures per opcode, run in both engines (K7b) [CHATGPT-TODO-2026-10-26]
- [open] K1-K4 ChatGPT: casting rules + fixture compiler design (proposal) [CHATGPT-TODO-2026-10-26, archive GROK-BIG-LIST-2]
- [open] Runner can't build yet: broadcasts, clones, stop all, go to / point towards, touching/distance, custom blocks → teach the test runner [team/claude/CLAUDE-NOTES.md › REVIEW-GROK-FIXTURES-2026-10-20.txt]
- [open] Job bank JOBS-BLOCKS: 880 jobs (about 38 done) — -PAR, -EDGE, -SAVE first [team/ai-team/CHATGPT-JOBS.md › JOBS-BLOCKS.txt]
- [open] B1/B2/B4 ChatGPT bug hunts with the QA kit: round-trip, behaviour (G-Warp vs scratch-vm), costume jumps (B3), clicks (B4) [CHATGPT-TODO-2026-10-26]
- [open] B6 Re-check MISSING-LIST section A against the current Beta [CHATGPT-TODO-2026-10-26]
- [open] A10 Number inputs accept letters ("abc" in move steps) [MISSING-LIST.txt]
- [open] E1.6 "glide to random position / mouse-pointer / sprite" [MISSING-LIST.txt]
- [open] E2.1 rest: "switch backdrop to () and wait", "when [timer / loudness] > ()" [MISSING-LIST.txt]
- [open] E2.3 One round reporter per variable (today one generic "value of [ ]") [MISSING-LIST.txt]
- [open] E2.4 TurboWarp blocks: while, is online?, last key pressed, mouse button down? [MISSING-LIST.txt]
- [open] E2.9 PenguinMod core blocks: if/else if, switch/case, power, true/false, >= <= !=, break/continue, return (spec + expected results first) [MISSING-LIST.txt]
- [open] E2.7 Translate extension doesn't translate [MISSING-LIST.txt]
- [open] My Blocks editing: add number/text/boolean inputs, labels, "run without screen refresh" like Scratch; keep G-Warp style (colour change) or Scratch define-hat style — owner picks [owner notes 2026-10-28; MISSING-LIST B6]
- [open] .pmp protobuf loader: needs a real legal test file + verified parser; keep .sb3 and ZIP .pmp working [TODO.txt item 5, team/chatgpt/REVIEW-PMP-PROTOBUF-LOADER]
- [open] P3: builder `set_effect` with a menu value is dropped on .sb3 export [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] Known P3: a number added to a list is stored as text "3" (Scratch: 3) [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] F2 Update 2 old checks in `test_anim.js` (Animation button is for everyone since v15.47) [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] HK2/HK3/HK5 Haiku: 3 tiny test projects (clones, lists, custom block); list edge cases (item 0/-1/last/random, 200,000 items); text vs number cases [team/ai-team/HAIKU-TODO.txt]

## 3. G-Spark AI (in-app AI)

- [open] AIM-0 Deep research: AI model running inside the browser (engine, model, hosting, knowledge, plan B) + proof page `poc.html` [team/ai-team/CHATGPT-JOBS.md › CHATGPT-DEEP-RESEARCH-AIM-0.txt, ideas/GWARP-AI-MODEL]
- [open] AIM-1 command list (≤ 40 JSON commands) → AIM-3 prompt pack → AIM-4 test set (100 kid requests) → AIM-2 snapshot → AIM-5 model scores → AIM-6 UI mock → AIM-7 safety review [ideas/GWARP-AI-MODEL-2026-10-26.md]
- [open] AIM-8 teaching data (3,000-10,000 checked examples) → AIM-9 training notebook; done = ≥70% correct + 100% must-refuse [team/ai-team/AI-LAB-PROMPT-2026-10-26.txt]
- [open] Claude: build the winning model behind Developer mode (web + desktop) only after AIM-5 scores [ideas/GWARP-AI-MODEL, team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md D1-D2]
- [open] Merge recipe packs into G-Spark AI + runtime test (build 5 of them): phone recipes PH-001..136 (131), AIM-K1 tips (120), Grok fight-game parts (10) [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md C1b/C3, team/ai-team/shared/]
- [open] Phone bot: keep making recipes from PH-137 (owner pastes the short prompt) [team/ai-team/phone/PHONE-BOT-PROMPT.txt]
- [open] Job bank JOBS-RECIPES: 200 recipe jobs [team/ai-team/CHATGPT-JOBS.md › JOBS-RECIPES.txt]
- [open] W1 ChatGPT: 40 more kid questions + answers pack (validator must PASS) [CHATGPT-TODO-2026-10-26]
- [open] G-Spark code style: reuse the existing green-flag script, put new behaviour in My Blocks, use broadcasts named after what happens [owner notes 2026-10-28]
- [open] Never says "I can't make that game": offers background research, shows a light bulb when done, adds a `research/research-how-to-make-*.md` file [owner notes]
- [open] Key/privacy review of "connect your own AI": preview what project data is sent + "don't send project" choice; default model id `claude-sonnet-5-5` doesn't match the official id — check [TODO.txt LATER, SECURITY-AND-CONSISTENCY-AUDIT, team/chatgpt/REVIEW-AI-KEY-CONTEXT-SECURITY]
- [open] Block-building animation: new AI blocks animate in by default, Skip button, More → Settings switch (default On), never leaves half scripts [TODO.txt, TEAM-REASSIGNMENT-2026-10-18]
- [later] "Paste from AI" format + "teach any chatbot G-Warp" prompt for free Gemini-in-Chrome / Copilot-in-Edge [ideas/GWARP-AI-MODEL 0c]
- [later] AI chat kept while the app is open + "Save AI chat in this project" [ideas/GWARP-AI-MODEL 0b]
- [later] Local Ollama only in the owner's private exe build (inactive on the website) [ideas/ai-developer/, owner notes]
- [later] G-Warp AI Developer test (local model operates G-Warp on the owner's PC) — planning only, phases T0-T5 [ideas/ai-developer/PHASE0-AUDIT-AND-PLAN-2026-10-25.md]

## 4. Mascot (G-Spark)

- [open] B4 decision: show Animation blocks + G mascot to everyone, or keep Developer-only until ANIM-B1 passes [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] ANIM-B1 ChatGPT: test what's missing before Animation blocks + mascot go to everyone (incl. Scratch fallback in .sb3) [CHATGPT-ANIMATION-TODO]
- [open] Mascot animation: real "thinking" animation (no three dots), pulls blocks from the pocket on his front and throws them, gets faster on long code; dodges the mouse ("oops, sorry"); cartoon style; new hoverboard; falls off the board when no AI is connected [owner notes 2026-10-27/28]
- [later] App icon: G logo with a big lightning bolt around the whole G [owner notes]

## 5. Costumes / Animation / Tiles

- [open] A1 Animation frame thumbnails have a WHITE background → dark checker; paint editor still says "Reshape/Eraser – coming soon" although they work → check + fix titles [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md, CHATGPT-ANIMATION-TODO]
- [open] A2 Integrate guide lines "liner" (ANIM-G1, `team/ai-team/shared/2026-10-26-chatgpt-ANIM-G1/`) + test [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] A3 Integrate layers panel (ANIM-L1) — needs `T.selectLayer` hook first [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] A4 Integrate motion tools (ANIM-P1, `team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/`): easing as an OPTION, default stays linear [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] A5 Owner picks icons A/B/C in `team/ai-team/shared/2026-10-26-chatgpt-ANIM-I2/preview.html`; Claude plugs them in + fixes "same action = same icon" from the ANIM-I1 audit [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] ANIM-0 ChatGPT: full check of the Animation tab (centres, Reshape/Eraser, Stop stops all players, save/reopen keeps frames) [CHATGPT-ANIMATION-TODO]
- [open] ANIM-C1 Always centred like Scratch: set centre, centre costume, line up all frames, drift warning, same canvas size for all made costumes (owner's top worry) [CHATGPT-ANIMATION-TODO]
- [open] ANIM-T1 Frames strip + preview on stage (real size), keyboard , and . , onion settings [CHATGPT-ANIMATION-TODO]
- [open] ANIM-D1 Kid guide "Make your first animation" + 3 sample projects (own art) [CHATGPT-ANIMATION-TODO]
- [open] Icons must match everywhere (Code, Costumes, Sounds, Animation, Song maker, menus) — app-wide audit after ANIM-I1 [TODO.txt]
- [open] Animation tools belong inside the Costumes tab (not a pop-up) and must be simple enough for a kid [owner notes 2026-10-28]
- [open] Tiles: work like a stencil directly in the costume editor; each tile sprite its own tile map; tile editor inside the Tiles tab; "Add Sprite" makes a blank sprite; save tile sprites in .sb3 [owner notes, FUTURE-IDEAS OI-2]
- [open] OI-4 Ground line in the Animation editor (2-bone leg IK, feet never go below the line) — owner approved, not built [FUTURE-IDEAS.txt, NEXT-AFTER-v15.49]
- [open] OI-3 Glide: choose number of steps + ease; mark glide frames in the strip [FUTURE-IDEAS.txt]
- [open] OI-5 Drag a costume into / out of a folder [FUTURE-IDEAS.txt]
- [open] Paint editor leftovers: Bitmap Select copy/paste/flip/delete (L5), text font size in the box, sharper full-stage bitmaps (L6), on-canvas text typing (L4), faster Make costumes (L3) [NEXT-FOR-THE-TEAM-2026-10-19, CHATGPT-TODO-2026-10-26]
- [open] W2 ChatGPT: accessibility check of the costume editor [CHATGPT-TODO-2026-10-26]
- [open] Old costume-tool candidates (select-C, fill-C, text-B, eraser-C, undo-C) stay BLOCKED until they use the real editor API + isolated tests [MERGE-QUEUE.txt, team/chatgpt/REVIEW-GEMINI-COSTUME-CANDIDATES]
- [later] Move Tilemap out of Code into Custom — owner will define details first [TODO.txt IDEAS]
- [later] "3D vector" costume tab, "AI recreation" tab, "Background grow", airplane sky parallax [ideas/AIRPLANE-SKY-3D-2026-10-20.txt]

## 6. Sound / Music

- [open] M3 BUG first: squares changed AHEAD while the song plays are not heard → schedule per bar, re-schedule on change [TODO.txt, team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] M1 Each square has its own level: off → light → medium → hard → extreme (brighter each step) [TODO.txt]
- [open] M1b A level makes the user's own part richer (harmony, 2nd instrument, fills), user can change what each level adds [TODO.txt]
- [open] M2 "Clear all" + start from an empty song + Undo [TODO.txt]
- [open] M4 Spark Studio: Create Bass, Create Beat, Create Chords next to Create Melody [TODO.txt]
- [open] M5 Rename the Create zone title to "Spark Studio" (tabs Melody / Bass / Beat / Chords; ids stay) [TODO.txt, team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] MUS-I1 ChatGPT: music icons A/B/C (clear-all, empty-song, level 1-4, create-bass/beat/chords, my-part) → owner picks [team/ai-team/CHATGPT-JOBS.md › CHATGPT-MUSIC-ICONS-2026-10-26.txt]
- [open] B3 Owner listens: Tune Mix / Classic / Fresh / My melody + Create Melody — enough? [TODO.txt, team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] Bass / drum / fill PATTERN choices (partly covered by M4) [TODO.txt]
- [open] Music research per genre (tempo, chords, 16-step drums, bass, melody habits) → compare with the Song maker (M3/M4 of ChatGPT list); loop-mode proposal (M5) [CHATGPT-TODO-2026-10-26]
- [open] Gemini's music engines A/B/C never reached GitHub — ask the owner if he still has them [MERGE-QUEUE.txt, CHATGPT-TODO M2]
- [open] Music must sound teen/adult, not babyish; own licensed instrument sounds instead of Scratch samples [STYLE-GUIDE.txt, owner notes]
- [open] B9 Right-click a sound: duplicate / export / delete [MISSING-LIST.txt]
- [open] B11 Sound library ("Choose a Sound") + Surprise; separate game sound-effect maker [MISSING-LIST.txt, owner notes]
- [later] E3.1 Loudness / Video Sensing / hardware extensions [MISSING-LIST.txt]

## 7. UI / Stage / Sprites (Scratch-like editor helpers)

- [open] B1 Broadcast "New message…" / "Rename message…" [MISSING-LIST.txt, ChatGPT G-C1]
- [open] B2 Rename / delete a variable or list [MISSING-LIST.txt, G-C2]
- [open] B3 Stage monitors: checkboxes (x, y, direction…), modes (normal/large/slider), list import/export, drag [MISSING-LIST.txt, G-C3]
- [open] B4 Click a reporter → value bubble [MISSING-LIST.txt, G-C4]
- [open] B5 Drag sprites around the stage in the editor [MISSING-LIST.txt]
- [open] B7 "Add Comment" attached to a block [MISSING-LIST.txt, G-C6]
- [open] B8 Drag to reorder costumes / sounds / sprites [MISSING-LIST.txt, G-C7]
- [open] B10 Export / import a sprite as .sprite3 [MISSING-LIST.txt, G-C9]
- [open] B11 Costume library ("Choose a Costume", ~150 own costumes/backdrops/sounds) + Surprise [MISSING-LIST.txt, owner notes]
- [open] B12 Clean up blocks into one neat column [MISSING-LIST.txt]
- [open] C1 Searchable dropdowns · C2 save blocks as PNG/SVG · C3 copy/paste blocks (Ctrl+C/V, Alt+drag) [MISSING-LIST.txt, G-C10/11/12]
- [open] C4 Jump to a custom block's definition · C5 block switching · C6 Ctrl+Space insert · C7 swap variable scope · C8 copy a reporter's value [MISSING-LIST.txt]
- [open] C9 Sprite + sound folders, search sprites · C10 arrow keys change numbers · C12 Backpack · C13 snap to grid + drop files · C14 block count, comment previews, ask before deleting a sprite [MISSING-LIST.txt]
- [open] E2.5 Interpolation + custom stage size setting · E2.6 Language menu (use `team/ai-team/ui-strings-en.json`) · E2.8 kid add-ons (debugger, variable manager…) [MISSING-LIST.txt]
- [open] Translations: Spanish, then pt-BR, fr, de, ja from `team/ai-team/ui-strings-en.json` (never delivered) [archive CHATGPT-SPRINT-2026-10-20 S2/S5/S6]
- [open] X2 Add every on-screen English text missing from `ui-strings-en.json` [CHATGPT-TODO-2026-10-26]
- [open] Stage pane clean-up: hide size text + X/Y, small/normal/large icons, HQ on by default; colourful G add-buttons with icon menus; double-click a sprite to show it on the stage; sprite pane fits a small exe window [owner notes 2026-10-28]
- [open] "Behaviors" blocks move into the Extensions gallery as G-Warp's own extension [owner notes 2026-10-28]
- [open] Developer mode vs normal mode [TODO.txt LATER]
- [open] Job bank JOBS-UI: 354 button/icon/words jobs; JOBS-TESTING: 80 kid-critic + chaos jobs [team/ai-team/chatgpt-jobs/]
- [open] G-T1 Themes: Midnight (today) / Daylight / High contrast as CSS variable sets (E3.3) [CHATGPT-TODO-2026-10-26, MISSING-LIST]
- [open] X1 Code health list of app.html, X3 the 20 most confusing moments for a 10-year-old [CHATGPT-TODO-2026-10-26]
- [later] Tab Plus (＋ tab: creators add their own tabs) — waits for the owner's "go" [ideas/TAB-PLUS-2026-10-26.md]

## 8. Extensions

- [open] Test that TurboWarp / PenguinMod gallery extensions load on the real site; list failures [TODO.txt item 6]
- [open] Job bank JOBS-EXTENSIONS: 920 jobs (-LOAD, -RUN, -CREDIT, -SAFE, -DOC) [team/ai-team/CHATGPT-JOBS.md › JOBS-EXTENSIONS.txt]
- [open] K11/K12 Specs for the 6 most used TurboWarp extensions + Clones+, Looks+, Camera [CHATGPT-TODO-2026-10-26]
- [open] Browser extension "Open in G-Warp": PNG icons, permission + privacy review, Chrome/Firefox tests, restore history wrappers when off [TODO.txt item 3, MERGE-QUEUE.txt, team/chatgpt/REVIEW-SCRATCH-LINK-EXTENSION]
- [open] Credit check: every extension's creator + licence on the credits page [team/chatgpt/CHATGPT-NOTES.md › WEBSITE-OPEN-QUESTIONS.txt]
- [later] "Plus" extensions for Costumes + Song maker (needs a safe Plus API) + the "any AI" prompt that first asks "What are you trying to make?" [ideas/PLUS-EXTENSIONS-AND-3D-2026-10-26.md]

## 9. Website

- [open] Website redesign W0 audit → W1 three designs (owner picks) → W2 full copy in the drop box → W3 checks → W4 handoff; fan-made feel, not "too AI" [team/ai-team/CHATGPT-JOBS.md › CHATGPT-WEBSITE-REDESIGN-2026-10-26.txt, owner notes 2026-10-28]
- [open] D1 Docs: QA-kit page, "Remix with G-Warp" page, changelog v15.50.8 → v15.60.0 [CHATGPT-TODO-2026-10-26]
- [open] D3 Close answered items in `team/chatgpt/CHATGPT-NOTES.md › WEBSITE-OPEN-QUESTIONS.txt` (canonical URL, extension count 184, shortcuts, Animation block names, offline, bug-report data) [CHATGPT-TODO-2026-10-26]
- [open] D4 Parents page still matches the safety rules [CHATGPT-TODO-2026-10-26]
- [open] Owner: confirm the real website address (is creapter1.github.io/gwarp the one?) before anyone changes links [TODO.txt, SECURITY audit]
- [open] Owner: Google Search Console so the site shows up in search; check `stats.html` counter works [team/claude/CLAUDE-NOTES.md › AI-CHAT-LOG.txt entries 39, 45]
- [open] Report-a-bug link (GitHub Issues) on the website [TODO.txt LATER]
- [open] Short showcase video / GIF [TODO.txt LATER]
- [open] G-L2 15 tutorial covers; E1.8 more tutorials (Scratch has 27) + in-app tutorials data [CHATGPT-TODO-2026-10-26, MISSING-LIST, archive CHATGPT-HEAVY]
- [later] gwarper.com domain (owner + dad) [TODO.txt]

## 10. Desktop .exe

- [open] B2 Owner: run the test `G-Warp.exe` once and report (not tested on Windows yet) [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md, ideas/GWARP-DESKTOP-EXE]
- [open] E1 After that: GitHub Actions installer (NSIS) → GitHub Releases; G-Warp icon + version in the exe [ideas/GWARP-DESKTOP-EXE-2026-10-26.md]
- [later] AI model inside the installer, auto-update, real Save/Open + .sb3 double-click, code signing, Mac/Linux [ideas/GWARP-DESKTOP-EXE-2026-10-26.md]

## 11. Docs / art / library

- [open] G-L1 40 original costumes · G-L3 10 backdrops · GM15 redraw Gemini's 8 backdrop thumbnails at 480x360 · G-L4 20 library characters · G-L5 16x16 tile set (HK4 Haiku: 6 tiles) [CHATGPT-TODO-2026-10-26, HAIKU-TODO]
- [open] Gemini icon sheets still without a place (GM2 favicon, GM3 categories, GM4 badges, GM6 hero, GM11 paint tools, GM13 top bar, GM17 safety, GM18 make-a-block) → ICON-PLAN + mocks, owner picks [MERGE-QUEUE.txt, CHATGPT-TODO ICONS]
- [open] Job bank JOBS-ART: 40 art jobs [team/ai-team/CHATGPT-JOBS.md › JOBS-ART.txt]
- [open] W3 Kid test script (10 things a new user does in 5 minutes) [CHATGPT-TODO-2026-10-26]
- [open] D2 README: mention the QA kit (README may only get small edits) [CHATGPT-TODO-2026-10-26]

- [open] Cloud: capture current-build documentation screenshots using the 14 sticky IDs in team/chatgpt/DOC-SCREENSHOT-STICKIES-2026-11-02.md; record version, commit, browser, viewport, click steps and evidence; do not edit app code during capture [ChatGPT docs pass 2026-11-02]

## 12. Testing / QA kit / helpers

- [open] Q1/Q2 ChatGPT: first run of every QA-kit tool, write kit problems down [CHATGPT-TODO-2026-10-26]
- [open] HK1 Haiku: run `smoke-app.js`, save the output [team/ai-team/HAIKU-TODO.txt]
- [open] B7 Review Claude's releases v15.50.8 → v15.60.0 for mistakes [CHATGPT-TODO-2026-10-26]
- [open] C1 Claude: triage bug files from the lanes (`team/chatgpt/lanes/*/bugs/`), fix P0/P1 in batches [team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md]
- [open] H1/H2 ChatGPT reviews Haiku's work and adds small jobs here [CHATGPT-TODO-2026-10-26]
- [open] Josh-style chaos tests "Let's Crash It Out" (text notes, few screenshots) [owner notes]
- [open] Security: scan the whole git history for secrets + check GitHub secret-scanning settings [SECURITY-AND-CONSISTENCY-AUDIT, CONTINUOUS-WORK-QUEUE]
- [open] Remix factory R1-R4: practise the G-Warp intro, find 15 remix-friendly Scratch games, remix with credit, posting guide [CHATGPT-TODO-2026-10-26]

## 13. Research

- [open] Keep `research/research-how-to-make-*.md` + `research/RESEARCH-INDEX.md` up to date (G-Spark reads them); add a game when a kid asks for one we don't have [owner notes, research/]
- [open] Creator / game-design research packs (AIM-K1 folder) → turn into recipes and tips [team/ai-team/shared/2026-10-26-chatgpt-AIM-K1/GAPS.md]
- [open] "Game Scenario Creator" research prompt (any tutorial or game described in full for G-Spark) [owner notes]

## 14. Later ideas (owner decides; don't build yet)

- [later] Free/open core forever; a far-future paid 3D product only as a separate thing after a licence review [ideas/GWARP-FREE-OPEN-IDENTITY-AND-3D-BOUNDARY-2026-10-26.md]
- [later] G-Warp 3D (basic online, fuller in the exe) [ideas/PLUS-EXTENSIONS-AND-3D-2026-10-26.md]
- [later] Teacher check + voice commands modules (voice needs a privacy check) [MERGE-QUEUE.txt]
- [later] Clearer AI key privacy controls (FI-SEC-01) [FUTURE-IDEAS.txt]

---

## Done (for reference)

- [done] Clone freeze fix: O(1) clone count, 300 default, 5000 ceiling, frame budget, watchdog (v15.46.0) [TODO.txt, P0-CLONE-FREEZE-REPORT]
- [done] "Open in G-Warp" `#scratch=` link handler (v15.46.1) [TODO.txt]
- [done] Paint new = vector, vector Reshape + Eraser (v15.46.3); Power lines (v15.46.4) [AI-TEAM.txt]
- [done] Flipbook + onion skin + Animation tab with bones for everyone (v15.47.0) [TODO.txt]
- [done] Costume editor emergency fix: Select tool with 8 handles + rotate (v15.48.0) [TODO.txt]
- [done] Costume tabs, tile sprites v1, Glide button, costume folders, Gemini melody engine (v15.49.0) [FUTURE-IDEAS OI-1/3/5, MERGE-QUEUE]
- [done] MISSING-LIST A1-A9, C11 editor fixes (v15.49.1-v15.50.6) [MISSING-LIST.txt]
- [done] Missing blocks: <, contains, math functions, current [..], days since 2000, backdrop #/name, when stage clicked, item # of, list reporter, touching color (v15.50.1-v15.50.8) [MISSING-LIST.txt E1]
- [done] ChatGPT add-ons pack + settings fix, GWrap AI pack + guided tours, Gemini icons / empty states / sprites / characters merged (v15.49.2-v15.50.7) [MERGE-QUEUE.txt]
- [done] Scratch parity fixes from Grok fixtures (v15.48.0, v15.50.5) [team/claude/REVIEW-GROK-*]
- [done] .sb3 fidelity, Scratch comments, SVG rotation centres like Scratch (v15.50.8-v15.51.0) [AI-TEAM.txt]
- [done] Gemini music icons; Song maker Tune Mix/Classic/Fresh; Calm motion; electric animations restored; Create Melody (v15.52.0-v15.54.0) [TODO.txt]
- [done] G-Spark AI bar (v15.55.0); purple AI blocks / green user blocks (v15.56.0) [AI-TEAM.txt]
- [done] Same-frame threads + broadcast-and-wait, ~3x faster tick games (v15.57.0) [AI-TEAM.txt]
- [done] Visit counter + stats page, new hand-made home page (v15.58.0); loading screens (v15.59.0-v15.60.0) [AI-TEAM.txt]
- [done] Docs site: 16 pages, 8 tutorials, glossary, parents page [AI-STATUS.txt]
- [done] ChatGPT handed in (waiting for Claude): ANIM-I1 audit, ANIM-I2 114 icons, ANIM-G1 guides, ANIM-L1 layers, ANIM-P1 motion tools, AIM-K1 120 tips, 4 research passes [AI-TEAM.txt]
- [done] Reviews C1-C9 (costume candidates, clone safety, scratch link, Grok expected results, .pmp, AI key security, Gemini lab) [team/ai-team/TODO-CHATGPT.txt]
- [done] Superseded: `team/chatgpt/clone-safety.js` (replaced by v15.46 fixes), old DeepSeek clone variants, DeepSeek/Gemini/Grok task lists (team retired) [MERGE-QUEUE.txt]
