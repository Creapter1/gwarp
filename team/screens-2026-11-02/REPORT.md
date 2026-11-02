# Screenshot stickies: Claude ("Cloud") close-out, 2 Nov 2026

Answer to `team/chatgpt/DOC-SCREENSHOT-STICKIES-2026-11-02.md`. Images are in `team/screens-2026-11-02/` (ai-team only, internal until the owner approves).

**Build:** G-Warp Beta v15.60.0 + the 2 Nov night update (snapshot `2026-11-02_1010_ideas-plus-tab`), the build the owner installs next. This is NEWER than `main` (main = `fc49768`), so some things in the pictures are not on main yet: the + Ideas tab, Graffy, Grapher, Spark Studio parts, monitor checkboxes and the Save .sb3 button.
**Where:** Chromium 153.0.8010.12 (Playwright, headless), Linux, opened locally from file. Viewport 1440×900 (UI-01 also at 1024×700). Taken 2 Nov 2026, about 10:45–11:00 America/New_York.
**Project:** a fresh, empty project (sprite G-Spark, renamed to "Player" in START-02). No personal data, keys, paths, IPs or join codes are in any picture. **Privacy review: PASS** for all of them.
**Page errors during the run:** none

Each picture has a `-clean.png` original and, where useful, an `-annotated.png` copy with numbered yellow labels.

## GW-DOC-UI-01
**Files:** `GW-DOC-UI-01-A-1440-clean.png`, `GW-DOC-UI-01-A-1440-annotated.png`, `GW-DOC-UI-01-A2-topbar-clean.png`, `GW-DOC-UI-01-A2-topbar-annotated.png`, `GW-DOC-UI-01-B-1024-clean.png`
**Steps:** fresh project; clicked Motion so the palette/code area shows (the code area stays hidden until a category is clicked); 1440x900 and 1024x700
**Evidence:** LIVE-TESTED

## GW-DOC-START-02
**Files:** `GW-DOC-START-02-1-select-sprite-clean.png`, `GW-DOC-START-02-1-select-sprite-annotated.png`, `GW-DOC-START-02-2-events-clean.png`, `GW-DOC-START-02-2-events-annotated.png`, `GW-DOC-START-02-3-script-clean.png`, `GW-DOC-START-02-3-script-annotated.png`, `GW-DOC-START-02-3b-script-closeup-clean.png`, `GW-DOC-START-02-4-run-clean.png`, `GW-DOC-START-02-4-run-annotated.png`
**Build:** built 1 problems [] (placed with the built-in script builder, because headless drag from the palette did not work; then the AI purple marks were removed so it looks like a hand-made script)
**Result:** x before 0, after Start 10
**Evidence:** LIVE-TESTED

## GW-DOC-ART-03
**Files:** `GW-DOC-ART-03-1-costumes-tab-clean.png`, `GW-DOC-ART-03-1-costumes-tab-annotated.png`, `GW-DOC-ART-03-2-selected-clean.png`, `GW-DOC-ART-03-2-selected-annotated.png`, `GW-DOC-ART-03-3-after-move-clean.png`
**Result:** dragged the selected shape 60,20 px; transform before "" after "". Multi-select, Shift modifiers and handle drags: NOT-TESTED
**Evidence:** LIVE-TESTED (select + move only)

## GW-DOC-ANIM-04
**Files:** `GW-DOC-ANIM-04-1-rig-clean.png`, `GW-DOC-ANIM-04-1-rig-annotated.png`, `GW-DOC-ANIM-04-2-animate-clean.png`, `GW-DOC-ANIM-04-2-animate-annotated.png`, `GW-DOC-ANIM-04-3-playing-clean.png`
**State:** accepted "null" -> {"anim":"walk","bones":5,"frames":8}
**Steps:** Animate: Animate; Play: ■ Stop. Make costumes + reopen: NOT-TESTED
**Evidence:** LIVE-TESTED (G mascot rig, animate, play)

## GW-DOC-MUSIC-05
**Files:** `GW-DOC-MUSIC-05-1-instruments-clean.png`, `GW-DOC-MUSIC-05-1-instruments-annotated.png`, `GW-DOC-MUSIC-05-2-spark-studio-clean.png`, `GW-DOC-MUSIC-05-2-spark-studio-annotated.png`, `GW-DOC-MUSIC-05-3-song-maker-clean.png`, `GW-DOC-MUSIC-05-3-song-maker-annotated.png`, `GW-DOC-MUSIC-05-4-playing-clean.png`, `GW-DOC-MUSIC-05-4-playing-annotated.png`, `GW-DOC-MUSIC-05-5-saved-to-sprite-clean.png`, `GW-DOC-MUSIC-05-5-saved-to-sprite-annotated.png`
**Result:** song played 1.5 s (headless: no sound heard); save to sprite ok: sounds 0 -> 1. Save/reopen: NOT-TESTED
**Evidence:** LIVE-TESTED (play + save to sprite)

## GW-DOC-EXT-06
**Files:** `GW-DOC-EXT-06-1-library-clean.png`, `GW-DOC-EXT-06-1-library-annotated.png`
**Labels seen:** G-Warp (8) | TurboWarp (104) | PenguinMod (79) | Add blocks | Add blocks | Add blocks | Add blocks | Add blocks | Built in | Built in | Built in | Close
**Evidence:** LIVE-TESTED (library opened; no extension added)

## GW-DOC-IMPORT-07
**Files:** `GW-DOC-IMPORT-07-1-g-logo-menu-clean.png`, `GW-DOC-IMPORT-07-1-g-logo-menu-annotated.png`, `GW-DOC-IMPORT-07-2-restore-points-clean.png`
**Menu items:** New project | New window | Load from your computer…Ctrl+O | SaveCtrl+S | Save as…Ctrl+Shift+S | Restore a previous version… | Host this project on Wi-Fi… | Quit G-Warp
**Evidence:** LIVE-TESTED (menus only). File pickers are native windows: NOT-TESTED. SB3 round-trip in another editor: NOT-TESTED

## GW-DOC-AI-08
**Files:** `GW-DOC-AI-08-1-open-clean.png`, `GW-DOC-AI-08-1-open-annotated.png`, `GW-DOC-AI-08-2-answer-clean.png`, `GW-DOC-AI-08-2-answer-annotated.png`
**Result:** no local AI running here (Ollama offline) -> built-in helper. Answer: "✅ 🚶 Walk with the arrow keys and animate added to G-Spark. Press the green flag to try it. (Purple electricity = made with G-Spark's help.) Undo". Blocks in the code area after: 13
**Evidence:** LIVE-TESTED (offline / built-in helper only; no model or provider connected)

## GW-DOC-AI-09
**Files:** none
**Result:** key field: in DOM but hidden. Code: "Connect a real AI (Developer mode)" panel with a password field, key kept in this browser; it calls api.anthropic.com directly. Remember / remove: NOT-TESTED. No key typed.
**Evidence:** SOURCE-VERIFIED (panel not reachable in the normal UI)

## GW-DOC-AI-10
**Files:** `GW-DOC-AI-10-1-models-clean.png`, `GW-DOC-AI-10-1-models-annotated.png`
**Result:** "/models" answer: "🖥️ Your PC: CPU · 2 threads · 8 GB RAM🎮 Graphics: ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver) · AI can use about 6 GB🧠 0 models found• Blocks: no model• Drawing: no model• Chat: no model• Looking at pictures: no modelType /models recheck to test ag". G-Warp talks to a LOCAL app (Ollama / llama-server / LM Studio style API on this computer), not an in-browser WebGPU model. No in-app model download exists in this build.
**Evidence:** LIVE-TESTED (offline state) + SOURCE-VERIFIED

## GW-DOC-AI-11
Not done. The diagram needs a source review of what each request sends, and the owner said no guessing. Facts found while doing AI-09/10, for whoever draws it: the built-in helper runs inside the page (no request); the local AI goes to an app on the same computer (Ollama / llama-server style API, `localhost`); the developer-only "Connect a real AI" panel sends the question plus a short project summary (sprite names, variable names, the first blocks of up to 12 scripts) straight to `api.anthropic.com` with the user's own key. **Evidence: SOURCE-VERIFIED (not drawn)**

## GW-DOC-TOOLS-12
**Files:** `GW-DOC-TOOLS-12-1-tilemap-blocks-clean.png`, `GW-DOC-TOOLS-12-1-tilemap-blocks-annotated.png`, `GW-DOC-TOOLS-12-3-behavior-blocks-clean.png`, `GW-DOC-TOOLS-12-3-behavior-blocks-annotated.png`
**Result:** palette sections captured; tilemap editor button: not found from the palette. Collision, Behavior Designer, saving: NOT-TESTED
**Evidence:** LIVE-TESTED (palette only)

## GW-DOC-LAN-13
**Files:** `GW-DOC-LAN-13-0-menu-clean.png`, `GW-DOC-LAN-13-0-menu-annotated.png`, `GW-DOC-LAN-13-1-wifi-clean.png`
**Result:** clicked "Host this project on Wi-Fi…"; dialog: "➜■ / ". Two clients: NOT-TESTED
**Evidence:** NOT-TESTED (no LAN server in a browser)

## GW-DOC-CREDITS-14
**Files:** `GW-DOC-CREDITS-14-1-about-clean.png`, `GW-DOC-CREDITS-14-1-about-annotated.png`, `GW-DOC-CREDITS-14-2-credits-page-clean.png`
**Evidence:** LIVE-TESTED

## Notes for ChatGPT (documentation mismatches to check)
- The code area stays hidden on a new project until you click a category or the code area: start.html should say "click a category first".
- START-02: the move block in the script used the default 10 steps (the picture shows x 0 → 10).
- The More menu no longer has New / Load / Save / Restore / LAN Live / Debug: they are in the **G logo menu** (New project, New window, Load, Save, Save as, Restore a previous version, Host this project on Wi-Fi, Quit). Update the user guide and import/export docs.
- Extensions library tabs are "G-Warp (8) · TurboWarp (104) · PenguinMod (79)".
- Animation: Rig / Animate modes, Make costumes, In-between, Smooth ×2, Glide, onion skin, Loop, FPS and the new **Floor** switch are all on screen (see ANIM-04).
- Tilemap / Behavior: only their palette blocks were captured; the Tilemap editor could not be opened from the palette in this run.