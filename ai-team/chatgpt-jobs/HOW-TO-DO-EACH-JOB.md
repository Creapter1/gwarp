# How to do each job — step by step (read this BEFORE your first job)

Written by Claude, 2026-10-26. The owner: *"make sure everything is explained."* So nothing here is left to guessing.
If something in this file and the job line disagree, **this file wins**. If you are still unsure: do the smallest safe thing,
write "I was unsure about X, I did Y" in your report, and move on. Never stop the whole session because of one unclear job.

---

## PART A — the same for every job

### A1. Start of a session (always, ~5 minutes)
1. `git pull`
2. Read `ai-team/README.md` (the rules) and the last entry of **your own** log `chatgpt/AI-CHAT-LOG.txt`.
3. Write a session-start entry at the END of `chatgpt/AI-CHAT-LOG.txt` (template `ai-team/AI-CHAT-LOG-TEMPLATE.txt`):
   time from `date -u`, the owner's request, which job file and which job ids you will do.
4. `git add chatgpt/AI-CHAT-LOG.txt && git commit -m "ChatGPT log: start" && git push` → open the file on GitHub and check your entry is there.
   **If you can't push or can't see it: STOP and tell the owner.**
5. (Freebuff only) `node ai-team/tools/qa-kit/smoke-app.js` → must end with `ALL PASS`. If not, that is your first bug report.

### A2. Picking jobs
- Open the job file (e.g. `ai-team/chatgpt-jobs/JOBS-BLOCKS.txt`). Take the **first 10 lines that start with `[ ]`** and fit where you are:
  on **chatgpt.com** only `[WEB]` and `[ANY]` jobs; on **Freebuff** `[TERMINAL]` jobs first.
- Skip lines that start with `[x]` (done) or `[~]` (done, bug found). Never redo them.

### A3. One batch = 10 jobs → one report
Report file: `chatgpt/jobs/<FILE NAME WITHOUT .txt>-<first id>-<last id>.md`, e.g. `chatgpt/jobs/JOBS-BLOCKS-BLK-0001-PAR-BLK-0002-PAR.md`.
Inside, one short section per job, exactly like this:

```
## BLK-0001-PAR  "move (10) steps"
Result: SAME            (or: DIFFERENT / DONE / FOUND A PROBLEM / BLOCKED)
Evidence: TESTED in G-Warp + TESTED in scratch-vm
Proof:
  <paste the real tool output here, max ~15 lines>
Bug: no                 (or: yes -> chatgpt/bugs/BUG-BLK-0001-PAR.md)
Note: <one line, optional>
```

### A4. Marking the job file
Change only the first 3 characters of the job line: `[ ]` → `[x]` (done, fine) or `[~]` (done, found a bug). Don't change the rest of the line.
Don't reorder, delete or reformat lines. (`make_jobs.py` keeps your marks when Claude regenerates the files.)

### A5. A bug report (only when you found a problem)
File `chatgpt/bugs/BUG-<job id>.md`:
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
1. `git add chatgpt/ ai-team/chatgpt-jobs/ && git commit -m "ChatGPT jobs: <first id>..<last id>" && git push` (if push is refused: `git pull --rebase` then push again).
2. Add one line at the END of `AI-TEAM.txt`:
   `<date -u> | DONE | ChatGPT | <first id>..<last id> | chatgpt/jobs/<report>.md | <evidence word>` → commit, push.
3. Next batch. **Don't wait for Claude or the owner between batches.**

### A7. End of a session (before the time runs out — Freebuff stops after ~50 min, so start at minute 45)
Closeout entry in `chatgpt/AI-CHAT-LOG.txt` (what you did, which ids, bugs found, what's next) → commit → push → read it back on GitHub.

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
**Tool:** `node ai-team/tools/qa-kit/compare.js <test.json>` (builds the script in G-Warp, saves it, runs it in G-Warp AND in the real
Scratch engine, prints both answers). Setup once: `cd ai-team/tools/qa-kit && npm install && npx playwright install chromium`.
1. Find the block in `ai-team/gwrap-blocks.json` (same `type` as in the job line). Look at `text` and `inputs`.
2. Write a test file `chatgpt/tests/BLK-xxxx-PAR.json`. The `script` is the blocks after "when green flag clicked", written with the
   builder `B` (qa-kit README section 3). **Put the block's answer into a variable** so it can be compared:
   - a stack block that moves/changes the sprite: run it, then compare x / y / direction / size / costume (printed automatically).
   - a reporter (round block): `B.SET("result", <the reporter>)`.
   - a boolean (hexagon): `B.IFE(<the boolean>, [B.SET("result", "yes")], [B.SET("result", "no")])`.
   - any block: `B.C("<type>", [inputs...], [menus...])` makes it.
   Example (`move (10) steps`):
   ```json
   { "name": "BLK-0001-PAR", "vars": ["result"], "script": "return [B.C('move', [10]), B.SET('result', B.X)];" }
   ```
3. Run: `node ai-team/tools/qa-kit/compare.js chatgpt/tests/BLK-0001-PAR.json` (add a number of seconds at the end if the block waits,
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
1. Use the `.sb3` that compare.js already made: `ai-team/tools/qa-kit/out/BLK-xxxx-PAR.sb3`.
2. `node ai-team/tools/qa-kit/roundtrip.js ai-team/tools/qa-kit/out/BLK-xxxx-PAR.sb3`
3. `NO DIFFERENCES` → `[x]`. Any `DIFF` line → `[~]` + bug report with the DIFF lines.
4. Also `node ai-team/tools/qa-kit/check-sb3.js ai-team/tools/qa-kit/out/BLK-xxxx-PAR.sb3` → must say ALL PASS.

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
**Wait until the AI Lab has pushed AIM-1** (the command list, in `ai-team/shared/*AIM-1*`). Until then skip these lines (leave `[ ]`).
Then: 10 lines of JSONL in `chatgpt/ai-data/BLK-xxxx.jsonl`, each `{"request": "<what a kid would type>", "commands": [ ...AIM-1 format... ]}`.
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
3. Same everywhere → `[x]`. Different → `[~]` and add a row to `chatgpt/ICON-MISMATCHES.md`: `action | where | icon here | icon there | suggested one`.
   (No separate bug file needed for icon mismatches.)

### `UI-xxxx-WORDS` [WEB] — clear tooltip?
Is it correct, and would an 8-year-old get it? If yes → `[x]`. If not → `[~]` and write: `old: "..." → new: "..."` (max 10 words) in the report.

### `REC-xxx-n` [TERMINAL] — new GWrap AI recipe
1. Look at the format in `claude/gwrap-pack.json` (`id, emoji, title, keys, q, steps, script`). Copy one recipe as your template.
2. Write the recipe for the mechanic + version in the job line. **basic** ≤ 12 blocks · **better** feels smooth · **clone-safe** works with
   clones (use "for this sprite only" variables) · **explain** = basic + a kid explanation + one common bug and its fix.
3. Build the same script with the builder in G-Warp (like compare.js does), run it, show it works (a variable / position changes the right way).
4. Put all recipes of one batch in one pack file `ai-team/shared/<date>-chatgpt-REC-<first>-<last>/pack.json` + `NOTES.md`.
5. `python3 ai-team/tools/validate_gwrap_pack.py ai-team/shared/<folder>/pack.json` → must print no errors. Paste the output.

### `KID-xxx` [TERMINAL] — kid critic
Pretend to be a kid who has never used G-Warp. Build the project in the job line **only by clicking the UI** (Playwright clicks, drags,
typing — no `GWB` builder, no `Engine` changes). Take a screenshot after each step into `chatgpt/out/KID-xxx/` (not uploaded).
Make 1–2 realistic kid mistakes (wrong block, forgot a loop), notice them, fix them. Report: steps (short), what was confusing,
and a list: **fix** (broken) / **improve** (works but hard) / **keep** (good). Put fix-items also in bug reports.

### `CHAOS-xxx` [TERMINAL] — try to break it
Build the project quickly (builder allowed), then stress it: 1,000 clones, a list with 100,000 items, a forever loop with no wait,
spam keys, Start/Stop 50 times, save + open 20 times. Measure: does the page freeze (> 5 s no answer), lag (FPS below 30:
`requestAnimationFrame` counter), or show errors? Freeze/crash = `[~]` + P0 bug report. Smooth = `[x]` with the numbers.

### `ART-xxx` [WEB] — library art (take your time!)
Follow `ai-team/README.md` section 7 exactly. One drop-box folder per piece: `ai-team/shared/<date>-chatgpt-ART-xxx/` with
`<name>-A.svg`, `-B.svg`, `-C.svg` (+ extra costumes `-A-walk1.svg` ... when the job asks for animation frames), `preview.html` that shows
all options on dark and light backgrounds and at stage size, and `NOTES.md` (with "My pick"). Sprites: `viewBox`, rotation centre in the
middle of the body, all frames the same size and lined up. Backdrops: exactly 480×360. Under 30 KB each. No cat, no brands, no AI marks.

---

## PART C — when something goes wrong
- **A tool says `Cannot find module`** → you forgot `npm install` in `ai-team/tools/qa-kit`.
- **Playwright says the browser is missing** → `npx playwright install chromium` in `ai-team/tools/qa-kit`.
- **`git push` refused** → `git pull --rebase`, then push again. Never `--force`.
- **A job line seems wrong** (block doesn't exist, extension gone) → write `BLOCKED: <why>` in the report, mark `[x]`, NOT-TESTED.
- **You're not sure if something is a bug** → report it as P3 with your reason. Claude decides.
- **You found something really bad** (crash, data loss, safety problem) → P0 bug report AND one line at the top of your log closeout.
