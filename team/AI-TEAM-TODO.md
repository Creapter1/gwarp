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
- [open] E2.5 custom stage size settings (interpolation done in v15.70.0)
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
