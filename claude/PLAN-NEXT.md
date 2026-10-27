# Claude's plan for the next runs (read THIS instead of re-reading everything)

Written 2026-10-26 ~15:40Z (Claude, entry 19). Owner: *"next time ... you will have a plan and know exactly what to do and what not
to do ... less thinking, less rereading ... icons: throw it to ChatGPT, let ChatGPT create the ABC."*
**How to use:** do section 0, then take the first unchecked item in section 2, do exactly its steps, tick it here (`[x]` + commit SHA),
and go on. Only open a big file when a step says so. Update this file at the end of every run (section 2 + section 5).

---

## 0. Every run, first 3 minutes (copy-paste, no thinking)

```bash
cd /home/claude/gwarp 2>/dev/null || git clone https://github.com/Creapter1/gwarp /home/claude/gwarp && cd /home/claude/gwarp
git pull -q --rebase
tail -40 claude/AI-CHAT-LOG.txt            # my last entry = where I stopped
git log --since="12 hours ago" --format="%s" | grep -iv "^claude" | sort | uniq -c | sort -rn | head -20   # what ChatGPT did
ls ai-team/shared/                         # drop-box folders waiting for me
for d in chatgpt/lanes/*/; do echo "== $d"; tail -5 $d/AI-CHAT-LOG.txt 2>/dev/null; ls $d/bugs 2>/dev/null | head -5; done   # ChatGPT lanes (since 2026-10-26)
grep -c "^\[x\] \|^\[~\] " ai-team/chatgpt-jobs/JOBS-*.txt ; ls chatgpt/bugs 2>/dev/null | head   # job bank progress + bugs
```
Then the **log gate**: append `--- ENTRY <n> ---` (UTC time, owner's words, plan) to `claude/AI-CHAT-LOG.txt` → commit → push → read back
(`git show origin/main:claude/AI-CHAT-LOG.txt | grep -c "ENTRY <n>"`). Commit identity + trailers:
`git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -m "...\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\nClaude-Session: <session url from the system reminder>"`.
ChatGPT pushes a lot → push in a loop: `for i in 1 2 3 4 5; do git pull -q --rebase && git push -q origin main && break; sleep 3; done`.

## 1. Token rules (owner)

- **Never draw icons/art.** Write a job for ChatGPT (A/B/C in `ai-team/shared/`), the owner picks, I only plug the pick in.
- **Never read app.html whole** (2.7 MB). Use `grep -n "<anchor>" app.html | cut -c1-200`, then `sed -n 'a,bp'` on ~40 lines.
- Don't re-read rules/plans I wrote (`ai-team/README.md`, the AI plan, the TODO). This file has what I need.
- No sub-agents unless the owner asks (they double/triple usage). Owner watches usage: **stop at 95%**.
- Reports to the owner: short, simple English, no recaps.

## 2. The queue (in order)

### S. SPEED: games lag while the code area is visible (owner 2026-10-26: "game is that slow", "30 FPS like it was 60") - DO FIRST
Measured 2026-10-27 (Claude, remix v5 "Clone Multiplayer" in G-Warp v15.57.0, headless Chromium, tools in scratchpad w/gw_modes.js, w/gw_prof2.js):
code area visible = 19-21 ticks/s, 20-22 fps. Code area hidden = 28-30 ticks/s (full game speed), 60 fps. So the GAME is fine; the EDITOR repaint is the lag.
Cause chain: every running script has the yellow glow `filter: drop-shadow` (CSS rule with `.block-stack.gw4950-run`, grep `gw4950-run{filter`)
on the WHOLE big stack. Anything inside that changes (the "switch costume to (expression)" menu: `applyMenuExpr` writes `sel.value` every tick,
grep `function applyMenuExpr`) makes the browser re-render the filtered stack every frame. The power-line sparks (`GW_POWER_LINES`, cx/cy
every frame) and rare 3.6 MB undo snapshots during play (`GW8.pushHistory` from the workspace MutationObserver) add more.
Test results (each alone): `#workspaceCanvas > .block-stack{contain:layout paint}` = 28 ticks/s, 50 fps (best single fix, but paint
containment clips the glow/overflow -> check visually); glow filter removed = 26 ticks/s, 38 fps; power lines off = 24/25;
outline glow + contain:layout only = ~21 (no help).
- [ ] **S1.** Glow: no filter on the whole stack - glow only the hat block (box-shadow, not filter), or paint containment with
  padding so the glow isn't clipped. Screenshot before/after. Target: code area visible >= 28 ticks/s.
- [ ] **S2.** Power lines: while a project runs, animate sparks max ~15 fps, or pause them when the stage frame rate drops.
- [ ] **S3.** Undo: `GW8.pushHistory` while `Engine.isRunning` -> skip, push once when the project stops (no 3.6 MB snapshot hitches).
- [ ] **S4.** "Smooth motion" (interpolation, like TurboWarp): renderLoop returns early on frames `GW.frameGate` skips (60 Hz screen, 30 fps
  project = every other frame shows nothing new). Plan: before stepping threads save each sprite's x/y; on skipped frames redraw with x/y =
  lerp(old, new, time since tick / tick length), restore real x/y right after drawing (so touching/clicks never see fake positions); skip
  sprites that jumped > 80 px; only when there ARE skipped frames (no extra lag at 60 fps). Draw = same code path (temporarily swap x/y) so
  camera / HQ / bubbles / pen composite loop keep working. Setting "Smooth motion" in Advanced settings, ON by default. 20-30 fps games then
  look like 60.
- [ ] **S5.** Re-measure with w/gw_modes.js (base) + regressions + Grok parity fixtures. Tip for owner until then: full-screen stage = 60 fps.

### A. Integrate ChatGPT's animation work (state on 2026-10-26 15:35Z)
ChatGPT did: **I1** icon audit, **I2** 114 icons (A/B/C), **G1** guides code, **L1** layers code, **P1** motion spec + code.
Not done yet by ChatGPT: **ANIM-0** check, **C1** centring, **T1** frames strip/preview, **B1** blocks readiness, **D1** help.
Each code package: `ai-team/shared/2026-10-26-chatgpt-ANIM-<x>/` (`NOTES.md`, `code/*.js`, `preview.html`). All say NOT browser-tested.

- [ ] **A1. Two small fixes I already found (no icons needed).** a) Animation tab frame thumbnails have a WHITE background → dark checker
  like the canvas: `grep -n "gw18" app.html | grep -i "thumb\|frame" | head` and fix the CSS. b) Paint editor buttons say "Reshape (A) –
  coming soon" / "Eraser (E) – coming soon" although v15.46.3 made them work: `grep -n "coming soon" app.html`; test both tools work
  (vector: reshape a rect, erase a stroke) → if they work, drop "– coming soon" from the titles. If not → write it in TODO, don't fake.
- [ ] **A2. Guides "liner" (ANIM-G1).** Read only `NOTES.md` + `code/anim-guides.js` (27 KB). Paste as `<script id="gw-v1555-anim-guides">`
  before `</body>` (after the last module). Feature switch `animGuides` already in the code (`GW_FEATURE_OFF('animGuides')`), API
  `window.GW_ANIM_GUIDES`. Test (Playwright, harness from `claude/tests/regress/`): paint editor open → rulers visible → drag a guide →
  it stays after switching costumes → not inside the costume SVG (save .sb3, check costume has no guide elements) → no page errors.
- [ ] **A3. Layers panel (ANIM-L1).** `code/anim-layers.js` (18 KB), API `window.GW_ANIM_LAYERS`. NEEDS a hook first: in the transform
  module (`grep -n "GW_TRANSFORM" app.html`) add `T.selectLayer = node => { if (isArt(node)) setSel([node]); ... }` exactly as NOTES.md
  says. Test: 5-shape costume → panel lists 5 rows top=front → click row selects shape → drag row reorders (same as Forward/Back) →
  hide/lock → undo works → no errors.
- [ ] **A4. Motion tools (ANIM-P1).** Read `chatgpt/ANIM-P1-SPEC.md` + `chatgpt/anim-motion.js` (code is in chatgpt/, not the drop box).
  Rule: easing is an OPTION next to In-between/Glide (default stays linear unless the owner says). Hook into `GW_ANIM.tween/glide/mix`
  (exports listed in `grep -n "window.GW_ANIM = " app.html`). Test: 2 keyframes → In-between with Ease → middle frame closer to the ends.
- [ ] **A5. Icons.** Owner opens `ai-team/shared/2026-10-26-chatgpt-ANIM-I2/preview.html` and picks A/B/C per icon (ask him in ONE message
  with the list of icon names; don't decide for him). Then map picks to buttons (SVG inline, `currentColor`), behind switch `animIcons2`.
  Use `ANIM-I1-ICON-AUDIT.md` as the list of "same action = same icon" fixes; do those in the same release.
- [ ] **A6. Release** (see section 3), version **Beta v15.55.0**, one release for A1–A5 (or split if big).
- [ ] **A7. Then** ChatGPT's C1 / T1 / B1 / D1 when they arrive — same pattern: NOTES → code → paste as module → test → release.
  C1 (centring) is the owner's TOP worry: test with `ai-team/tools/qa-kit/costume-bounds.js` (frame centres equal ≤ 1 px).

### B. Owner decisions to ask for (one short message, when he's around)
- [ ] B1. Icon picks for ANIM-I2 (see A5).
- [ ] B2. Did `G-Warp.exe` (test build) open on his PC? (`claude/experiments/desktop/README.txt` has the build recipe.)
- [ ] B3. Music: listened to Tune Mix/Classic/Fresh/My melody + Create Melody? Anything to change?
- [ ] B4. Show Animation blocks + G mascot to everyone, or keep Developer-only until ANIM-B1?
- [ ] B5. Tab Plus: "go" or wait? (`ai-team/ideas/TAB-PLUS-2026-10-26.md`)

### C0. Lanes (several ChatGPT sessions): results are in `chatgpt/lanes/<lane>/` (reports/, bugs/, log). I write the AI-TEAM.txt
summary lines for them (lanes don't). Lane prompts: `ai-team/lanes/` (regenerate with make_lanes.py).

### C1b. Phone recipes (owner's phone chatbot, `ai-team/phone/PHONE-BOT-PROMPT.txt`, items PH-001..096)
When the owner gives the note: save as `ai-team/shared/<date>-phone-recipes/pack.json` (`{"version":1,"recipes":[...],"tips":[]}`),
run `python3 ai-team/tools/validate_gwrap_pack.py <pack>`, drop failing ones (or fix tiny errors), merge like C3.
- [ ] PH-001..060 READY: `ai-team/shared/2026-10-26-phone-recipes-PH-001-060/pack.json` (validator PASS). Merge into PACKS in the
  next release + runtime test (GWrap AI builds 5 of them). New phone outputs: `python3 ai-team/phone/fix_phone_pack.py in out` first.

### C. Job bank results (ChatGPT, `ai-team/chatgpt-jobs/`)
- [ ] C1. Triage `chatgpt/bugs/BUG-*.md`: P0/P1 first. Reproduce with the given proof (block bugs: `node ai-team/tools/qa-kit/compare.js
  <their test json>` → DIFFERENT?). Fix in app.html, release in batches (e.g. 10 bug fixes = one version).
- [ ] C2. `chatgpt/ICON-MISMATCHES.md` → same-icon fixes (no new drawings; reuse the icon already used for that action).
- [ ] C3. Recipes packs in `ai-team/shared/*REC*` → validate (`python3 ai-team/tools/validate_gwrap_pack.py <pack>`) → merge into the
  GWrap AI packs (`grep -n "const PACKS" app.html`).
- [ ] C4. Regenerate jobs after big changes: `python3 ai-team/chatgpt-jobs/make_jobs.py` (keeps marks).
- Known P3 (no fix needed now): G-Warp stores a number added to a list as text "3" (Scratch: 3). compare.js compares item by item.

### D. AI Lab (separate ChatGPT chat; prompt `ai-team/AI-LAB-PROMPT-2026-10-26.txt`)
- [ ] D1. When `chatgpt/AIM-0-IN-BROWSER-AI-RESEARCH.md` + `ai-team/shared/*AIM-0*/poc.html` arrive: open poc.html in Playwright with
  WebGPU flags (`--enable-unsafe-webgpu`) — if it runs headless, record TESTED; if not, the owner tests in Chrome. Reply with the chosen
  engine/model/host in `MERGE-QUEUE.txt`.
- [ ] D2. AIM-1 command list → check each command maps to a real function (`ai-team/gwrap-blocks.json`, GWB builder). AIM-2 snapshot →
  integrate behind Developer mode as `gw-v15xx-ai-snapshot`. Model integration only after AIM-5 scores (≥70% + all refusals).

### E. Desktop .exe (plan: `ai-team/ideas/GWARP-DESKTOP-EXE-2026-10-26.md`)
- [ ] E1. Only after the owner says the test exe works: add `.github/workflows/desktop.yml` (windows-latest, electron-builder NSIS,
  upload to a GitHub Release on tag `desktop-v*`). npm here needs: `NO_PROXY= no_proxy= npm i --noproxy=example.invalid ...`.

### M. Song maker feedback (owner + testers, 2026-10-26 11:40) — do after A, before F
Facts (checked): cells are on/off (`S.grid[stem][part]` 0/1; brightness var `--l` comes from the COLUMN energy, `ENERGY` = 4 levels);
playback = `function play(fromPart)` with a pump every 150 ms that schedules WHOLE parts when they start < 1.2 s ahead (`schedulePart`).
Anchors: `grep -n "function applyColumn\|function play(fromPart\|function schedulePart\|class: 'gwarr-cell'" app.html`.
- [ ] M3 first (bug). Reproduce: Playwright, play, at part 1 change a square in part 4 (`.gwarr-cell[data-cell="bass:4"]`), wrap
  `schedulePart` to log the grid it used → was the change used? Likely causes: the click handler re-generates/re-renders and loses it,
  or the part was already scheduled. Fix: schedule per BAR (not per part) with 0.4 s lookahead; keep the nodes per part; on a cell change
  for a part that is scheduled but not started → stop those nodes and schedule again. Already-sounding notes finish. Test: offline-render
  analysis or the logged grid shows the new value for every part after the change.
- [ ] M1 levels per cell: grid values 0-4; click cycles 0→1→2→3→4→0 (right-click / Shift = backwards); `--l` from the CELL
  (0.45/0.62/0.8/1 + glow at 4); schedulePart scales by cell level (1 light: softer + fewer notes; 2 = today's mid; 3 hard; 4 extreme:
  louder + extra layer/fill). Old songs/saves: a 1 = the level the column energy gave before (so old songs sound the same). Column
  energy buttons stay and SET the cells of that column. aria-label says the level. Test: cycle, save/load, render differs by level.
- [ ] M1b (owner 11:47) a level = HOW RICH the user's own part sounds, not only louder. For a part the user made (melody, later bass/
  beat/chords): level 1 smooth/quiet = just their notes, soft; level 2 mid = + a light touch (soft echo/pad doubling); level 3 hard =
  + extra sounds (harmony a third/octave, a second instrument, fuller rhythm); level 4 extreme = everything + fills/accents. The user
  can CHANGE what each level adds (in Spark Studio: per level, tick: louder / octave / harmony / 2nd instrument / echo / fills).
  Store as `S.myLevels = {1:{...},2:{...},3:{...},4:{...}}` with good defaults; generated tunes keep today's behaviour.
- [ ] M5 NAME (owner left it to Claude): the Create zone is called **"Spark Studio"** (G-Spark is our mascot; electric, kid-friendly,
  not "melody maker"). Tabs inside: Melody · Bass · Beat · Chords. Rename the "🎼 Create Melody" title + Tune option "My melody" stays
  ("🎼 My melody" = made in Spark Studio). Only a title change; ids (`gwCreateMelody`, `GW_CREATE_MELODY`) stay for compatibility.
- [ ] M2 "Clear all" button (all cells 0, confirm, Undo) + "Empty song" choice next to Surprise me. Test: clear → play = silence → click cells.
- [ ] M4 Create Bass / Create Beat / Create Chords next to Create Melody (`gw-v1554-create-melody` module is the pattern: grid + ideas +
  Use in Song maker → `S.myBass` / `S.myBeat` / `S.myChords`, Tune-like "My …" option per row). Bass uses the bass scale, beat = drum pads
  × 16 steps, chords = one chord per bar from the key. Same tests as cm_t.js.
- Icons for all of M: ChatGPT job `ai-team/CHATGPT-MUSIC-ICONS-2026-10-26.txt` → owner picks → plug in. Never draw them myself.
- Release: Beta v15.56.0 (or with A if both are ready).

### W. Website redesign (ChatGPT lane L9-WEB; brief `ai-team/CHATGPT-WEBSITE-REDESIGN-2026-10-26.txt`)
- [ ] W1 arrives (`ai-team/shared/*WEB-W1/preview.html`): open A/B/C with Playwright at 1440 + 390, send the owner 3 screenshots, ask him
  to pick ONE letter. Write the pick in MERGE-QUEUE + the lane log is ChatGPT's (tell the owner to tell ChatGPT).
- [ ] W2+W3 arrive: run their `web-check.js` myself; check rules R1-R10 (no app.html copy committed, no trackers, no fake numbers,
  URLs kept: compare `ls docs docs/tutorials` with site/docs). Then ask the owner for "go".
- [ ] GO: copy `site/*` over the repo root (index.html, docs/**, new assets/), keep app.html untouched, link check again, push, log.

### B2. Small things found 2026-10-26 (entry 36)
- [ ] P3: builder `B.C('set_effect', [100], ['ghost'])` was DROPPED on .sb3 export (no block in the file); `set_ghost` works. Check the
  exporter for set_effect with a menu value given by the builder (GW_V1580_SB3 'set_effect').
- [ ] Engine: v15.57.0 runs new threads + finished broadcast-and-wait in the same frame (frame loop, search "v15.57.0 (Claude, Scratch parity").
  If any project acts differently, it can be switched off with `window.GW_SAME_FRAME = false`.

### F. Leftovers (only when A–E are waiting on others)
- [ ] F1. Music maker: bass / drum / fill PATTERN choices (TODO "MUSIC MAKER - KEEP IMPROVING") - partly covered by M4.
- [ ] F2. test_anim.js: 2 old checks expect the Animation button hidden for normal users (it's for everyone since v15.47) → update the test.

## 3. Release checklist (copy-paste)
1. Version: `grep -n 'class="app-version"' app.html` and `grep -n "GW_BUILD={version" app.html` → change only those 2 lines
   (NEVER a mass replace: old comment tags contain version numbers).
2. New module = `<script id="gw-v15xx-<name>">` before `</body>`; header comment: version, who, what, owner's words; feature switch if risky.
3. Tests: `bash claude/tests/regress/run-all.sh app.html` (expected results are printed at the end) + the new feature's own test.
   Set up once per fresh box (see the comments at the top of run-all.sh; FA can also come from `GW_FA=<dir>`).
4. Log entry (what/tests/evidence) → `AI-TEAM.txt` line `<UTC> | RELEASED | Claude | Beta v… | files | evidence` → `MERGE-QUEUE.txt`
   line for each merged package → TODO `[x]` with evidence → commit → push loop → read back → closeout with SHA.

## 4. Where things are (anchors, not line numbers)
| Thing | Find it with |
|---|---|
| Song maker | `grep -n "GW_SONG_ARRANGER = " app.html`, `function melodyLine`, `function myLine` |
| G-Spark AI bar | `grep -n 'id="gw-v1555-gspark-bar"' app.html` (`GW_SPARK_BAR`, uses `GW_V1571.match/addRecipe`) |
| Create Melody zone | `grep -n 'id="gw-v1554-create-melody"' app.html` |
| Motion (Calm motion + running dots) | `grep -n 'id="gw-v1553-motion"' app.html` |
| Animation tab | `grep -n 'id="gw-v15162-anim"' app.html` (exports `window.GW_ANIM = `) |
| Flipbook | `grep -n 'id="gw-v4700-flipbook"' app.html` |
| Paint editor look/tools | `grep -n 'id="gw-v1800-costume-look"' app.html` (`GW_COSTUME_LOOK`, centre mark `#gwpeCentre`) |
| Feature switches | `grep -n "GW_FEATURES" app.html \| head -3` (`devOnly` items) |
| Instruments | `grep -n "GW_INSTRUMENT_STUDIO=" app.html` |
| QA kit | `ai-team/tools/qa-kit/README.md` (smoke-app, compare, roundtrip, check-sb3, costume-bounds, run-in-scratch) |
| My regression tests | `claude/tests/regress/` (`run-all.sh`) |
| ChatGPT lists | animation `ai-team/CHATGPT-ANIMATION-TODO-2026-10-26.txt`, job bank `ai-team/chatgpt-jobs/`, AI Lab prompt `ai-team/AI-LAB-PROMPT-2026-10-26.txt` |

## 5. Don't do (learned the hard way)
- Don't push over a different system — side by side, owner picks (music lesson).
- Don't hide/remove features; Developer-only ≠ deleted, but ask before hiding.
- Don't commit binaries (exe, models, node_modules) or the owner's private projects or anyone's Scratch project.
- Don't mass-replace version strings. Don't `--force` push. Don't edit other AIs' folders or logs (ChatGPT's code: copy into app.html, never edit their file).
- Don't trust "NOT browser-tested" packages: always run them before release.
- Don't skip the log gate (entry 18 slip: the start entry was written at the end).

## 6. Status line (update every run)
2026-10-26 ~19:45Z — Beta v15.55.0: G-Spark AI bar (G button next to zoom, wide bar, Enter builds at once, Undo); old GWrap AI rail + palette
section hidden (switch gsparkBar). AI Lab lane folder made; ChatGPT AI Lab on AIM-K1 basic knowledge. 131 phone recipes waiting (C1b).
2026-10-26 15:40Z — app Beta v15.54.0 (main). ChatGPT on animation (I1, I2, G1, L1, P1 handed in). Job bank 0/2,474. AI Lab: not started.
Owner to answer: B1–B5. Song maker feedback queued as section M (ChatGPT music icons job written).
