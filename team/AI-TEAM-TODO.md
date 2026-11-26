# G-Warp AI team — ONE to-do list

Owner: **Creapter1** · App: **Beta v15.60.0** (main) · release branch `release-v15.66.0` = v15.68+ (PR #20, not merged).
Rules: `team/ai-team/README.md` · Talk: `team/AI-COMMS.md` · Log: `team/AI-TEAM.txt`

> ⛔ **RULE ZERO:** every AI works ONLY on the `ai-team` branch. Never push to `main`. Only the owner merges to main.

**How to read:** `[open]` = still to do · `[later]` = waits for owner · `[done]` = finished.
**App-check:** `team/ai-team/APP-CHECK-SYNC-2026-11-05.txt` (2026-11-05) — do not rebuild items already in the shipping app.

## Team rules (short)
1. G-Warp look only (dark, `#8b5cf6`, `#4ade80`). Same block results as Scratch/TurboWarp, not Scratch art.
2. Only **Claude Opus** edits `app.html` / `index.html` / `gwarp-ollama.js` / `main.js`. Others hand files to `team/ai-team/shared/`.
3. Active AIs: Claude, ChatGPT, Helken, Haiku. Retired: Gemini, Grok, DeepSeek (archive only).
4. Kids' safety, no secrets in repo, add-don't-remove, log start/closeout.
5. Full rules: `team/ai-team/README.md`.

---

## 0. Owner report 23 Nov 2026 (Claude Opus) - read first
- [done] **Turbo Player removed** (the top-bar "30 FPS / 60 FPS" button and its second run engine `gw-turbo.js` / `gw-turbo-ui.js`, added in v15.61 on the release branch). Owner: not approved, not needed, it made projects lag or break. Scratch-style **Turbo Mode stays in More**.
- [rule] No new top-bar buttons, no second run engine, nothing that changes how projects run, unless the owner approved it. Unapproved features = Developer mode only (owner rule, Nov 8). "Improve, not unimprove."
- [open] Owner's simple test project (go to 0 0, forever move 10 steps) - owner sees: app looks broken, choppy or laggy, G-Spark vanishes at the right edge, code/buttons fail. Claude could not reproduce: G-Warp v15.68 matches the real Scratch engine (stops at x 285, steps every 33 ms). **Waiting for the owner's screen recording** (Win+Alt+R). Project file stays private (owner rule) and is deleted after the fix.
- [open] Audit everything on `release-v15.66.0` (v15.61-v15.68) for other things that changed how the app works for everyone without the owner's OK; move them behind Developer mode or remove them.
- [done] S4 smooth motion (v15.70.0, Claude Fable, 25 Nov) - built and tested, OFF by default, More > Advanced settings. Patch + notes: `team/claude/v15.70.4/`. **Waiting for the owner: OK to add it to the release branch?**
- [done] Sprite x / y / size / direction boxes update live while a project runs (v15.70.0).
- [note] Owner's test measured again on v15.70.0: 0 errors, steady frame rate. New projects run at 60 FPS, so move 10 steps = 600 px a second; the sprite stopping with 15 px showing at the edge is Scratch fencing. See `team/claude/v15.70.4/README.txt`.
- [later] Owner idea: Minimap - an option of the Big map tool or an extension (plain Scratch blocks), so users can add one if they want.
- [later] Idea, owner must approve: Start runs projects on the real Scratch engine (scratch-vm + scratch-render, the same core TurboWarp uses), keeping G-Warp's own look and editor. Check its licence first.
- [later] SVG 360: AI-drawn back sides (local AI); turn every costume of an animation at once.

## 1. Engine / performance
- [OWNER DECISION 26 Nov] The inside of G-Warp is rebuilt OUR OWN way to work like TurboWarp (project as data, only the open sprite's blocks on the page, scripts turned into fast code). Own code, no copied code, same features, same look. Plan: team/claude/TURBO-STYLE-PLAN.md - the owner sees the plan before any building (Claude Fable)
- [in progress, paused] (Claude Fable) v15.70.13: thin menus, grab only what you see, undo doubling fix, smooth drag - saved in team/claude/v15.70.13-wip/ (still needs referee runs + PC build)
- [open] (Claude Fable) UI overlap / hidden parts check asked by the owner 26 Nov 00:18 - not started
- [URGENT - OWNER] WEB EMERGENCY 26 Nov: the website (main, v15.69.0) uses 3.5 GB+ of RAM on a big project and kills Chrome. Fixed in v15.70.12 (about 1.2 GB, flat). The 5 files for main are in team/claude/v15.70.12/web-ready/. Only the owner puts them on main (Claude opens the PR when the owner says so)
- [open] (Claude Fable) Memory, next cut: thin .block-select menus (175,000 options on the owner's project). Design notes in team/claude/v15.70.12/README.txt
- [done] v15.70.10 (Claude Fable, 25 Nov night, PC letter i): measured with the owner's own 3D pen game vs real Scratch - story screens 18 -> 30 steps/s, gameplay 13 -> 24-26 (Scratch 30). C-block filter layers off while running, 4 freeze sources removed, menu value cache, cheaper pen + power lines. Details: team/claude/v15.70.10/README.txt
- [open] (Claude Fable) 3D gameplay scripts still 15 ms a frame vs Scratch 6 ms: compile scripts to closures is the next big job
- [open] OWNER DECISION (Claude Fable): the 1px C-block shadow is a CSS filter = one drawing layer per C-block, also when stopped (slow scrolling / dragging on big projects). Replace it with a box-shadow that looks almost the same? Side-by-side picture needed first
- [open] OWNER GOAL 25 Nov (15:12): beat Scratch at everything first, then TurboWarp, then PenguinMod. Waiting / loading 10 s or less. 30 FPS must be a real 30 even on heavy projects. Everything works the same as Scratch; extensions work the same as TurboWarp
- [done] Opening time (v15.70.8, Claude Fable, 25 Nov): 7,200-block / 30-sprite test project opens in 7.5 s (was 34 s), calm at ~10 s (was 64 s). Lazy tidy, lazy long menus, cheap history compare, cached used-types. Numbers + tools in team/claude/v15.70.8/README.txt. On the owner's PC as v15.69.0h since 22:20
- [done] R6 full regression on v15.70.9 (Claude Fable, 25 Nov): every referee project and app test gives the same result as before; power-lines no longer forces a page layout every frame
- [later] E2.9 PenguinMod core blocks: moved behind the Scratch-first work by the owner's 15:12 message
- [open] (Claude Fable) Opening: the 4-5 s freeze while a big .sb3 is built should be chunked or show progress; ~100 polling helpers still cost CPU on big projects while editing. Need one of the owner's real big projects for true numbers
- [open] Top priority: no bugs, no lag before "crazy stuff"
- [done] S1 Code-area lag (glow filter on whole stack) - v15.70.0: box-shadow on the hat block instead
- [open] S2 Power-line sparks cap ~15 fps while running
- [done] S3 Undo: skip pushHistory while running, push on Stop - APP-CHECK 25 Nov: already in v15.69.0
- [done] S4 Smooth motion / interpolation - v15.70.0 (setInterpolation is real now)
- [open] S5 Re-measure after S1-S4
- [done] R3 speed pass 1 (Claude Fable, 25 Nov) - v15.70.5 / PC v15.69.0e: variables, lists and common reporters in one step. 3-5x faster than v15.70.4 on script work, same referee totals. Numbers in team/claude/v15.70.5/README.txt
- [open] R3 speed pass 2 (Claude Fable): still 2-5x slower than Scratch on pure script work (TurboWarp is faster than Scratch). Per-type route for the remaining command blocks, pen/looks one-step paths, then closures per script (see README "STILL SLOWER")
- [open] (Claude Fable) Scratch's timer only changes once per frame; G-Warp's timer is live. Not seen to break a project yet - check with the referee before touching
- [open] (Claude Fable) "add to list" has no 200,000 item limit (Scratch stops adding at 200,000)
- [open] Block compiler path + collision candidate + clone stress tests + benchmarks
- [done] E1.9 .sb3 opens at 30 FPS unless project asks 60 - APP-CHECK 25 Nov: already in v15.69.0

## 2. Blocks & Scratch parity
- [done] (Claude Fable, 25 Nov late) Breaking G-Warp ep. 2 + 3: 16 bugs fixed in v15.70.11 (crash with 2,500 variables, zoomed backdrops, bitmap costumes that could not grow, painted sprite = dot, rename glue, double Ctrl+S, log, Infinity size / position, Spark Studio opening with old music...). Full list + what is still OPEN: team/bugs/BREAKING-GWARP-EP2-EP3.md
- [open] (Claude Fable) Breaking G-Warp: the OPEN rows in team/bugs/BREAKING-GWARP-EP2-EP3.md, and episode 1's list still has to be read
- [done] (Claude Fable, 25 Nov night) "stop [this script]" inside a My Block ends only that My Block, like Scratch (it killed the whole script; found with the owner's game) - v15.70.10, stop.sb3 17/17
- [done] (Claude Fable, 25 Nov) set [v] to (reporter) keeps the answer as it is, like Scratch ("05" from join was turned into 5) - v15.70.5, join.sb3 19/19
- [open] Parity fixtures / runner gaps (broadcasts, clones, custom blocks in runner)
- [open] Job bank JOBS-BLOCKS (remaining)
- [open] A10 letter inputs in number fields; E1.6 glide menus; E2.1 backdrop-and-wait; E2.4 TurboWarp extras; E2.9 PenguinMod core
- [open] .pmp protobuf needs legal test file
- [done] Known: set_effect menu dropped on export - APP-CHECK 25 Nov: fixed already. List number stored as text: same as Scratch for typed values (not a bug).
- [done] v15.70.1 (Claude Fable, 25 Nov): graphic effects drawn with Scratch's formulas (colour, brightness exact; whirl, fisheye, pixelate, mosaic now drawn); Scratch size limits; tan 90 / sqrt rounding. 53-check parity test added (`team/claude/tests/test_4972_parity53.js`). See `team/claude/v15.70.4/README.txt`.
- [done] v15.70.2 (Claude Fable, 25 Nov): Animation "Make skeleton for me" - bones built from the drawing (stickman test passes, Ready-made moves work). On the owner's PC as v15.69.0b.
- [done] Fencing checked against the REAL Scratch engine (25 Nov): G-Warp is right. The test costume had no viewBox. Not a bug.
- [done] Scratch referee (Claude Fable, 25 Nov): real scratch-vm runs the same .sb3 and `diff.js` lists every difference from G-Warp. `team/claude/tests/scratch-referee/`. 170 checks same as Scratch so far.
- [done] v15.70.3 (Claude Fable, 25 Nov, round 2, all checked against real Scratch): loops that do not change the screen finish in one frame; reporter answers / typed text no longer read as variable names in .sb3 projects; hats start in Scratch's order; bounce + touching edge use the real outline; distance not rounded; point-in-direction text = 0; glide ends on target; thin pen lines crisp. 347 of 351 referee checks same as Scratch; pen/effects picture 99.8 % same. PC = v15.69.0c.
- [done] v15.70.4 (Claude Fable, 25 Nov, extra batch vs real Scratch): wait blocks always yield (also wait 0); a new clone / broadcast script takes its first turn in the same pass; custom block inputs outside their block = 0. 419 of 427 referee checks same as Scratch. PC = v15.69.0d.
- [open] MISSING SCRATCH BLOCK: hat "when [timer / loudness] > (10)" (event_whengreaterthan). Needs palette block, import, export, edge trigger. Scripts under it never start today.
- [open] loudness reporter answers nothing (Scratch: -1 without a microphone).
- [open] A custom block that calls itself without "run without screen refresh" should pause on each call like Scratch (G-Warp runs it straight through).
- [open] OWNER DECISION: in projects made in G-Warp (not from .sb3), typed text that equals a variable's name still reads that variable. Scratch never does this. Keep it, or make it text everywhere?
- [open] SPEED (round 3): plain loop speed is 13x behind real Scratch (409,000 vs 5,520,000 loops in 3 s).
- [open] Corner bounce lands up to 2 px from Scratch's spot when the sprite is turned (Scratch's own hull rounding).
- [plan] Today's rounds: `team/claude/PLAN-25-NOV.md`.
- [done] R5 (v15.70.7, Claude Fable, 25 Nov): SVG 360 1.2.0 opens on the user's drawing with guessed depths + part names + view buttons; Big map 1.2.0 starts from the user's own backdrop / wide costume; Spark Studio +5 melody hooks, bass + backing "Start from an idea", +4 drum beats. All added, nothing replaced
- [open] (Claude Fable) Spark Studio preview always plays the major scale even for a minor-mood song (sounds "kid"). Add a Mood menu (major / minor / minor pentatonic / dorian), side by side with the old one, owner picks by ear
- [open] (Claude Fable) The new Spark Studio patterns were written by rule, not listened to: owner to say which sound wrong
- [open] Owner 25 Nov: add more to Spark Studio, SVG 360 and Big map; keep going until G-Warp acts and works better than TurboWarp / PenguinMod.
- [open] BUG-20261027 background music: not reproducible on v15.70.1 (wav, ADPCM, mp3 all play) - needs the owner's project.

## 3. G-Spark AI
- [open] AIM-0…AIM-9 research / model path
- [open] Recipe packs merge + phone bot PH-137+
- [open] Key/privacy review for connect-your-own-AI

## 4. Mascot
- [open] ANIM-B1 gate before Animation blocks + mascot for everyone
- [open] Real thinking / hoverboard animations

## 5. Costumes / Animation / Tiles
- [open] A2–A5 integrate ANIM-G1 / L1 / P1 / I2
- [open] ANIM-0 / ANIM-C1 / ANIM-T1 / ANIM-D1
- [open] Tiles as stencil; paint leftovers L3–L6

## 6. Sound / Music
- [open] M1b richer levels; MUS-I1 icons; owner listen B3
- [open] Genre research; teen/adult sound; B9/B11 sound library

## 7. UI / Stage / Sprites
- [done] B1 Broadcast New message… / Rename message… — **APP-CHECK 2026-11-05** in main app.html
- [done] B2 Rename / delete variable or list (palette right-click) — **APP-CHECK 2026-11-05**
- [done] B4 Click a reporter → value bubble — **APP-CHECK 2026-11-05**
- [open] B3 Stage monitors: modes + list import/export + drag (checkboxes done)
- [open] B5–B12, C1–C14 UI helpers (backpack, sprite3, clean-up, etc.)
- [open] E2.5 custom stage size settings (interpolation done in v15.70.0). Claude Fable 25 Nov: NOT cheap - 480x360 is hard-coded in ~90 places (mouse, fencing, pen, bounds, export); needs its own round and referee checks
- [done] R4 TurboWarp-style addons (v15.70.6, Claude Fable, 25 Nov): Go to definition (on; right-click or middle-click a My Block), Mouse position (off), Variable manager (off), clone counter live again while running. More > App > Addons
- [open] (Claude Fable) TurboWarp extras still missing: block switching (right-click swap to a sister block), find bar listing scripts/events in a drop-down, editor dark/colour themes for blocks, 'paste at mouse'. Owner picks
- [open] Translations / ui-strings; themes; Behaviors → Extensions gallery

## 8. Extensions
- [open] Live-load TurboWarp/PenguinMod gallery on real site
- [open] JOBS-EXTENSIONS remaining; browser extension polish

## 9–16. Website / Desktop / Docs / Testing / Research / Safety / Video notes / Later
- See previous full list in git history commit `ec43125` if you need the long form.
- [open] Website redesign jobs; desktop .exe owner test
- [open] Docs keep in sync with Beta
- [open] QA kit / Helken J1–J7 as assigned on AI-COMMS
- [later] Tab Plus, 3D vector tab, GPU research, etc. (owner decides)

## Done (for reference)
- [done] APP-CHECK 2026-11-05: B1/B2/B4 already shipping in Beta v15.60.0 — see `team/ai-team/APP-CHECK-SYNC-2026-11-05.txt`
- [done] Clone freeze 300/5000, Power lines, Flipbook/onion, Select handles, Song maker / Spark Studio, G-Spark AI bar, same-frame threads, stats/loading, docs site, .sb3 fidelity, and earlier v15.46–v15.60 items (see git history for full done list before this compact restore)

**Note:** A mistaken placeholder write wiped the long TODO on 2026-11-05; this compact restore keeps agents unblocked. Full historical text is in commit `ec43125a711abe23398ceddea94f3812e1d8d9c4` on `ai-team`.
