# PROGRESS - G-Warp autopilot (Claude)

This is the one file to read first. It says where the work is, how to set up, the rules, and what to do next.
Every run updates it before it ends. Times are US Eastern.

## 1. State right now

- Last update: 26 Nov 2026, 06:10 (11:10 UTC), by the scheduled run of 04:18.
- App on the owner's PC: **v15.69.0n** (= build v15.70.15). Next PC letter: **o**.
- Working build: `team/claude/work/` = **v15.70.15** (same as the PC).
- Website (main): still v15.69.0, with the memory problem. Web-ready fix: `team/claude/v15.70.12/web-ready/`. Needs the owner (see NEEDS-OWNER-OK.md).
- Plan: `team/claude/TURBO-STYLE-PLAN.md`. **Step 1a is DONE** (on the PC, proven on 19 projects, see `team/claude/v15.70.14/README.txt`). Current step: **1b**. Part a of 1b (undo keeps the Book) is DONE and on the PC, see `team/claude/v15.70.15/README.txt`.
- Scheduled task "G-Warp autopilot (every 3 hours)" was created 26 Nov 01:18 (first run about 04:18). It is bound to the owner's computer.

## 2. Next actions, in order

**READ `team/claude/OWNER-PRIORITY.md` FIRST (owner, 26 Nov 08:55): speed against TurboWarp is the only thing that matters to him now. Finish the 1b part in progress, ship it, then go straight to STEP 2 (fast code). The rest of step 1b waits until before step 3.**

1. (done) Step 1a on the PC as letter m.
2. (done, first table) `team/claude/VS-TURBOWARP.md`: script speed and the owner's game measured on Scratch, TurboWarp and G-Warp. TurboWarp wins every speed row (0.5 ms script time on the game, G-Warp 16 ms). Editor rows for TurboWarp are NOT measured (see NEEDS-OWNER-OK.md). Run the table again after every step.
3. Step 1b, in small parts, each one tested and shipped:
   a. (DONE, PC build n) Undo / redo keep the Book. Owner's game: 5 KB per undo step (was 3,900 KB), one Undo 0.13 to 0.3 s (was 1.4 to 2 s). Old way still there behind `GW_UNDO_BOOK = false`; remove that switch one release later.
   b. NEXT. Save, `window.GW_AST`, the AI report, Find and the block counter read the Book. What this run found:
      - `GW9.captureAST()` (app.html, near "Versioned AST mirror") keeps `html: block.outerHTML` for every block, nested. On the owner's game: 18 MB, 166 ms to build + 172 ms to turn into text. Both save functions (`GW.saveProject`, two places, search `ast:`) write it into every saved file. Nothing in the app reads `ast` back on load (load uses `stacks[].html`).
      - Safe order: (1) FIRST write a save / reopen test (`t_save.js`: save, load the saved file, `GW_BOOK.plain` before and after must be equal, on the whole zoo + the game). (2) Then make captureAST build from `GW_BOOK.get()` without the nested html (keep the same field names: type, breakpoint, slots, body, elseBody). (3) Then save writes the Book form next to `stacks` and load prefers it. Keep `stacks[].html` in the file for one release so an older G-Warp can still open new files.
      - Find: search `gw10-find-hit` (about line 21000). Block counter: search `Blocks: ${blocks}` (it counts page pieces every 0.6 s while running; `GW_BOOK.get().blocks` is the same number on the game, 2,152).
   c. Opening a Scratch file fills the Book first and builds the page from it (also removes the 49 empty script boxes the import leaves on the owner's game; today undo keeps them as they are).
   d. Speed up the writer. Today: bring back all 58 scripts of the game 1.1 to 1.7 s, all 601 scripts of big.sb3 2.1 s (step 3 needs under 0.3 s per sprite): most of the time is drawing what sits in the slots (`GW9.setSlotNode`). Also the reader: every undo step reads the whole page (about 60 to 150 ms on the game); a per-script cache would make it near 0, but typed values change without a page event, so be careful.
4. Step 2: scripts become fast code (family by family, old way as safety net, removed at the end).
5. Step 3: only the open sprite's blocks on the page. Step 4: only the scripts near the view.
6. Paused, do when a step is finished and time allows: UI overlap / hidden parts check (owner asked 26 Nov 00:18, then said skip for now).
7. When every step is done and G-Warp wins every row of VS-TURBOWARP.md: final app on the PC, final report with before / after, turn the scheduled task off.

## 3. Setup for a fresh session (about 5 minutes)

```
# repo (needs push rights on the ai-team branch; ask for it with the add-repo tool, access "push")
git clone https://github.com/Creapter1/gwarp /home/claude/gwarp && cd /home/claude/gwarp && git checkout ai-team
# working tree = main (v15.69.0, commit 5542304) + the working files
git fetch origin main && git worktree add /home/claude/rel FETCH_HEAD
cp team/claude/work/* /home/claude/rel/
# tools
mkdir -p /home/claude/gwt /home/claude/ref /home/claude/priv
cp -r team/claude/tools/gwt/. /home/claude/gwt/ && cp -r team/claude/tools/ref/. /home/claude/ref/
cd /home/claude/ref && npm ci          # the real Scratch engine, used as referee
```

- Tests use Playwright with Chrome (`/opt/npm-tools/node_modules/playwright`, `/usr/bin/google-chrome`, flags `--no-sandbox --use-angle=swiftshader`). If they are missing: `npm i playwright` and fix the paths at the top of the test files.
- ALWAYS test the app from `/home/claude/rel/` (it needs its sibling .js files next to app.html).
- The owner's game is PRIVATE. Get it from his PC with the device tools: `C:\Users\mario\OneDrive\Documents\ai all worcks\G-Warp Desktop\G-Spark-Glitch-Hunt.sb3`, copy it to `/home/claude/priv/gh.sb3`. Never commit it, never upload it anywhere.
- The scheduled run has no add-repo tool: the repo is already cloned at `/home/claude/gwarp` and pushing to `ai-team` works. The PC folder is not connected at start: call `device_request_folder_access` for `C:\Users\mario\OneDrive\Documents\ai all worcks\G-Warp Desktop` once (it was granted at once on 26 Nov).
- A shell command is cut after 10 minutes. Run long test sets in the background (`nohup sh all.sh > all.log &`) and read the log. `t_undob.js` takes about 40 s per project. To compare with the build before: `git worktree add /home/claude/base origin/main && cp team/claude/work/* /home/claude/base/` BEFORE changing work/, then pass `/home/claude/base/app.html` to diff.js / fps.js.
- End of every run: copy `/home/claude/rel/{app.html,gw-*.js that changed}` to `team/claude/work/`, new tools to `team/claude/tools/`, update this file, commit, push to `ai-team`.

## 4. Rules (the owner's, all still in force)

- NEVER push to main or any release branch. Only the `ai-team` branch. Only the owner moves work to main.
- PC: same update number 15.69.0, only the letter changes (`python3 /home/claude/gwt/pc_build.py <letter>`, see its header). Before EVERY write: stage the PC's current files, copy them to his `backup\before-v15690<letter>-<file>` first, then write. Never delete his files; old things go to `backup`. Never touch his other files.
  - App folder: `C:\Users\mario\OneDrive\Documents\ai all worcks\G-Warp Desktop\app\G-Warp-win32-x64\resources\app\` (app.html + gw-*.js). A NEW sibling file (like gw-book.js) must be written there too.
  - `pc_build.py` copies `/mnt/user-data/outputs/pc/app.html` as the backup, so first stage the PC's app.html and put it at that path.
- A step is done ONLY when: the full app with every feature is on his PC, AND it passed the test list (section 5) on many kinds of projects. Write down which projects passed. Never say done on a guess.
- Autopilot: no questions between steps. If something needs his OK or cannot be undone: skip it, add it to `team/claude/NEEDS-OWNER-OK.md`, keep working on the rest.
- If a step breaks something: the PC keeps the old version. Do not ship.
- A project must act exactly like Scratch. Extensions work like TurboWarp's. G-Warp's own look never changes. Every feature stays (Spark Studio, SVG 360, Big map, addons, AI tools, LAN, paint editor).
- One engine at the end. No second run button. During step 2 the old way may stay as a safety net; it is removed when step 2 is done.
- No code copied from TurboWarp or Scratch. TurboWarp is used only as a closed box to measure against. G-Warp's inside is written from TURBO-STYLE-PLAN.md.
- Anything that changes how the app works that the owner did not ask for: OFF by default or Developer mode only. No emojis in the app (real icons). Do not build games or example projects; improve the app.
- Notes for the owner: short, plain words, simple English. Test before claiming. Work token-efficiently.
- Commits end with these two lines:
  `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>` and the `Claude-Session:` line of the session that makes the commit.

## 5. Test list (run all before a PC build)

In `/home/claude/gwt` (each prints its own result line):
- `node t_par.js` (53 checks), `node t_par2.js` (28), `node t_thin.js` (14, needs the owner's game), `node t_snap.js` (7), `node t_grab.js`, `node t_undo.js` (needs the game)
- Undo keeps the Book: `node t_undob.js PALETTE mini.sb3 par.sb3 ... big.sb3 vars2500.sb3 /home/claude/priv/gh.sb3` (one project per call is safest; every line must say OK; `OLD=1` runs the old way for comparing)
- Project Book: `node t_book.js - par.sb3 par2.sb3 par3.sb3 par4.sb3 probe.sb3 mini.sb3 nat.sb3 join.sb3 stop.sb3 ep.sb3 pen.sb3 snd.sb3 bench3.sb3 wide.sb3 c7.sb3 big.sb3`, then with `/home/claude/priv/gh.sb3`; `node t_book2.js`
- Real Scratch referee, in `/home/claude/ref`: `node diff.js /home/claude/gwt/<name>.sb3 6000` for par (58/60, the 2 are a random glide), par2 40/40, probe 72/72, mini 22/22, nat 15/15, join 19/19, stop 17/17, ep 19/19; `par3` with 14000 ms (157/159); `par4` 6000 (59/72 on this machine, was 66/72 on a quiet one: compare with the build before, it must not get worse)
- The owner's game: `node play.js /home/claude/priv/gh.sb3 "" 8 9000 shot.png "<js>"` must reach 3D gameplay (variable `state` = "play"), no page errors. Memory: `node mem.js /home/claude/priv/gh.sb3`. Drag: `node t_dragms.js`.
- Speed: `cd /home/claude/ref && node bench.js` and `TAPS=8 node fps.js /home/claude/priv/gh.sb3 12000`.
- Project zoo for the "done" rule: small (mini, nat, c7), normal (par*, probe, pen, snd), huge (big.sb3 7,200 blocks, vars2500.sb3), every block kind (t_book2 builds one from the whole palette), the owner's game. Add real Scratch projects when the owner gives some.

## 6. G-Warp against TurboWarp (to do)

Same projects, same machine: load time, FPS / script time, memory, editor lag on huge projects (drag a big stack, scroll).
TurboWarp is open source: its engine can be installed from GitHub for speed runs, and a built copy of its editor can be cloned for load / memory / editor runs. Use it as a closed box only. Results go to `team/claude/VS-TURBOWARP.md`, one table, with the date and the build letters.

How to run it: `cd team/claude/tools/tw && npm i`, then `node twbench.js /home/claude/gwt/bench.sb3 30000` and `node twgame.js /home/claude/priv/gh.sb3 8 10000` (the files expect to live in `/home/claude/tw/pk/`; copy them there). G-Warp + Scratch on the game: `cd /home/claude/ref && TAPS=8 node fps.js /home/claude/priv/gh.sb3 10000`. Do NOT try to build TurboWarp's editor in the workspace (it was refused once); the editor rows need the owner.

Known numbers so far (G-Warp only, owner's game): website v15.69.0 3,583 MB; build k about 1,200 MB; build l 766 MB. Real Scratch script time in 3D gameplay 6 to 7 ms per step, G-Warp about 15 ms.

## 7. Lock (so two runs never work at the same time)

- File `team/claude/RUN-LOCK.md`. A run that starts reads it from GitHub first.
- If it says `status: working` and its time is less than 2 hours 45 minutes old: stop at once, change nothing.
- Otherwise write `status: working`, the time and the session link, commit and push, then work.
- At the end of the run (or when stopping for any reason): set `status: free` with the time, commit and push.

## 8. Run log (newest first)

- 26 Nov 06:10, scheduled run (04:18): STEP 1b part a DONE. Build n on the PC (v15.70.15: undo / redo keep the Book). New test t_undob.js, 19 projects OK, full test list OK. Found for part b: saving writes an 18 MB `ast` nobody reads. Next: 1b part b (start with the save / reopen test).
- 26 Nov 02:15, first session: first G-Warp / TurboWarp / Scratch table written (VS-TURBOWARP.md). Next: step 1b part a (undo keeps the Book).
- 26 Nov 01:50, first session: STEP 1a DONE. Build m on the PC (v15.70.14: gw-book.js). Scheduled task created. Next: TurboWarp table, step 1b.
- 26 Nov 01:05, first session: v15.70.13 shipped to the PC as l. Plan written and approved. Step 1a started: gw-book.js built, round trip OK on 17 projects.
