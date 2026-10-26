# G-Warp AI Developer — Phase 0 audit and plan (TEST, NOT A RELEASE)

Written by Claude on 2026-10-25 from `MASTER-SPEC-2026-10-25.md` (the owner's spec, saved verbatim next to this file).
Status: **PLANNING ONLY.** Nothing was implemented, `app.html` was not touched, nothing was installed, and no models were downloaded. The owner's computer was **not** inspected: this cloud session isn't linked to it. Everything about the PC below comes from the spec and is marked UNVERIFIED.

Owner's framing (2026-10-25): *"keep in mind this is a test, not a release … add it as a temporary thing, only for my computer … pretending to be your AI … give it a big game and see how it does."*

---

## 1. What G-Warp already has

Checked in `app.html` Beta v15.50.7 on 2026-10-25 by reading the source (SOURCE-VERIFIED = the code exists; it does NOT mean it was tested in a browser for this task).

| Spec integration point | Status | Notes |
|---|---|---|
| `window.Engine` | SOURCE-VERIFIED | sprites, activeSpriteIndex, variables, lists, backdrops, threads, isRunning |
| `window.GW` | SOURCE-VERIFIED | createVariable, createList, runHat, stackOwner, stageClick, … |
| `window.GW_PROJECT_DATA()` | SOURCE-VERIFIED | full project snapshot (sprites, costumes as data URLs, stacks, AST) — used by autosave / crash recovery |
| `GW8.exportSB3()` / `GW_V1580_SB3_EXPORT` / `GW_FILES.buildSb3()` | SOURCE-VERIFIED + tested daily | `GW_FILES.buildSb3()` is what Claude's tests use. It returns a real .sb3 blob. |
| GWrap AI helper (`window.GW_V1571`) | SOURCE-VERIFIED + tested | `blk()`, `cblk()`, `nestInto()`, `addRecipe()`, `match()`, `checkProject()` — **builds real blocks in the code area** |
| JSON recipe packs (`window.GW_GWRAP_PACK.install/make`) | SOURCE-VERIFIED + tested | a script described as JSON → real blocks. **This is the best "bridge" for an AI to write scripts.** Checker: `ai-team/tools/validate_gwrap_pack.py` |
| Cloud AI call (`api.anthropic.com`, user's own key) | SOURCE-VERIFIED | one `fetch` in Developer mode; the key is in session storage. No local-model support. |
| Ollama / `127.0.0.1:11434` | **MISSING** | no code talks to a local model |
| LAN collaboration (WebSocket) | SOURCE-VERIFIED (2 sockets) | relay / LAN code exists; not part of this plan |
| Backup / crash recovery, diagnostics | SOURCE-VERIFIED | restore points + "Report a bug" kit |
| Screenshots of the editor | PARTIAL | the stage canvas can be read (`toDataURL`); the whole editor needs a browser-automation tool |
| Real computer control (mouse / keyboard on Windows) | **MISSING** | needs a separate companion program (a web page can't do it) |
| Task list / memory / audit log for an AI | **MISSING** in the app | the team's version is files in the repo (`AI-TEAM.txt`, `<ai>/AI-CHAT-LOG.txt`) |

**The big gap:** G-Warp already has good *project* APIs. It has no *local model* connection, no *companion service*, and no *screen-control* layer.

## 2. The safest design for a test on one computer

```
 Ollama (127.0.0.1:11434)   <-- local model: Gemma 3 12B / Qwen 3 (owner's PC, UNVERIFIED)
        ^
        | HTTP (localhost only)
 Companion service (Node.js, in C:\Users\mario\OneDrive\Documents\ai, UNVERIFIED path)
   - task list + JSONL event log + checkpoints (files in the AI-Workspace folder)
   - tool registry: each tool has an input schema, permission level and a check of its result
   - Playwright drives a Chromium window running G-Warp  (screenshots + clicks + DOM)
        |
        v
 G-Warp in that Chromium window
   - "AI Developer" panel = a TEST-ONLY module, loaded only when the URL has ?aidev=1
   - Bridge v0 = a thin, versioned wrapper over things that already exist:
       Engine (read), GW_PROJECT_DATA (read), GW_GWRAP_PACK.make (write scripts),
       GW_SPRITE_LIBRARY / costume import (write art), GW_FILES.buildSb3 (export),
       greenFlagBtn / stopBtn (run), stage canvas (look)
```

Why this design:

1. **Playwright, not raw Windows mouse control, for the first test.** It can open G-Warp, click, drag, type and take real screenshots. It can also read the page, so every action can be checked. Claude's own test suite already does exactly this every day. Desktop mouse control (pyautogui / UI Automation) comes later and only for things a browser can't reach.
2. **Bridge first, clicks second.** Writing scripts by dragging blocks with the mouse is slow and fragile. The JSON recipe format already turns a description into real blocks and is checked by a validator. The AI should *plan* in JSON, *build* through the bridge, and *show* the result on screen. The log must say which method was used (the spec, Part 5.5).
3. **Nothing reaches the public app.** The AI Developer panel would only load with `?aidev=1` on the owner's computer. The companion service listens on localhost only and needs a token.
4. **Local models on 12 GB of VRAM (UNVERIFIED):** Gemma 3 12B fits on the GPU. A ~27B model will spill into system RAM and be much slower. Gemma 3 can look at images; many Qwen builds can't. So: one model plans and writes JSON, and a vision-capable one checks screenshots. Measure real speed before choosing.

## 3. Phases for the test (spec Part 25, cut down to a one-computer test)

| Phase | What | Exit check (evidence) |
|---|---|---|
| T0 | Link the PC to a Claude session. Confirm Windows, Ollama running, installed models, Node, Git and the `ai` folder. | A tool-produced listing of each item (no guessing) |
| T1 | Companion service v0: talks to Ollama (health check, model list, one chat). | AT-002 / AT-003 / AT-004 pass with logs |
| T2 | Playwright opens G-Warp, takes a screenshot, reads Engine state. | AT-005 / AT-009 |
| T3 | Bridge v0 + 6 tools: create sprite, add costume (SVG), add script (JSON recipe), run, stop, export .sb3. Each tool checks its own result. | AT-010 to AT-013, AT-022 |
| T4 | Agent loop: plan → act → look → check → fix. Bounded retries, task states, JSONL log, STOP button. | AT-014 to AT-016, AT-027 to AT-029 |
| T5 | **The big game test:** "Army Men RTS" mini-slice (terrain, 3 toy soldiers, select + move, one resource, one building). The local AI builds it in G-Warp while the owner watches. | A saved .sb3 + screenshots + log. Scratch import marked NOT-TESTED unless it's actually opened in Scratch. |

Effort estimate (engineering effort, not a promise): T0–T2 are small. T3 is medium. T4 is the hard part. T5 depends on how well a 12B local model plans. Expect it to need many small, checked steps rather than one big prompt.

## 4. Hard or risky parts (don't hide these)

- **Local model quality.** A 12B model can follow a JSON format and fix simple errors, but it will struggle with a whole RTS in one go. The task list must keep every step tiny and checked.
- **Vision.** Judging "does the game look right" from screenshots is unreliable on small local models. Use Engine state (positions, variables, costume names) as the main check, and screenshots as extra evidence.
- **Scratch compatibility.** G-Warp exports .sb3, but proving it runs in real Scratch needs a manual import (or a scratch-vm test harness). That stays NOT-TESTED until someone actually does it.
- **Safety.** The model must never get a raw shell. Tools are a fixed list with permission levels. The service only listens on localhost. Nothing a project file or web page says can grant permissions.

## 5. Recommendation

Build T0 → T3 first, as a separate `ai-developer/` folder (companion service + test-only G-Warp module). Don't touch the normal app. Only after T3's checks pass, try the agent loop (T4) and then the big game test (T5).

**Waiting for the owner's OK before any implementation** (spec Part 29, Step 12).
