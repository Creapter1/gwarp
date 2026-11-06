# G-Warp AI team — ONE to-do list

Owner: **Creapter1** · App: **Beta v15.60.0** (main).
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

## 1. Engine / performance
- [open] Top priority: no bugs, no lag before "crazy stuff"
- [open] S1 Code-area lag (glow filter on whole stack)
- [open] S2 Power-line sparks cap ~15 fps while running
- [open] S3 Undo: skip pushHistory while running, push on Stop
- [open] S4 Smooth motion / interpolation (setInterpolation is still a STUB in app — APP-CHECK)
- [open] S5 Re-measure after S1-S4
- [open] Block compiler path + collision candidate + clone stress tests + benchmarks
- [open] E1.9 .sb3 opens at 30 FPS unless project asks 60

## 2. Blocks & Scratch parity
- [open] Parity fixtures / runner gaps (broadcasts, clones, custom blocks in runner)
- [open] Job bank JOBS-BLOCKS (remaining)
- [open] A10 letter inputs in number fields; E1.6 glide menus; E2.1 backdrop-and-wait; E2.4 TurboWarp extras; E2.9 PenguinMod core
- [open] .pmp protobuf needs legal test file
- [open] Known: set_effect menu dropped on export; list number stored as text

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
- [open] E2.5 interpolation + custom stage size settings (hooks partial; interpolation stub)
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
