# PROGRESS - G-Warp autopilot (Claude)

This is the one file to read first. It says where the work is, how to set up, the rules, and what to do next.
Every run updates it before it ends. Times are US Eastern.

## 1. State right now

- Last update: 26 Nov 2026, 09:06 (14:06 UTC), by the scheduled run of 07:18.
- App on the owner's PC: **v15.69.0o** (= build v15.70.16). Next PC letter: **p**.
- Working build: `team/claude/work/` = **v15.70.16** (same as the PC).
- Website (main): still v15.69.0, with the memory problem. Web-ready fix: `team/claude/v15.70.12/web-ready/`. Needs the owner (see NEEDS-OWNER-OK.md).
- Plan: `team/claude/TURBO-STYLE-PLAN.md`.
  - **Step 1 is done as far as its "done when" list goes** (round trip the same; undo, redo, save, reopen the same; an undo step is about 5 KB): 1a build m, 1b part a build n, 1b part b build o (`team/claude/v15.70.16/README.txt`).
  - Left over from 1b and moved to the start of step 3, where they are needed: Find and the AI report read the Book; opening a Scratch file fills the Book first; a faster writer.
  - **Step 2 has started as an experiment** (not in the app, not on the PC): `team/claude/experiments/step2/` (read its README.md first). It gives the same answers as the old way on the 10 referee projects except one timing check of par3 that fails in 2 of 11 runs (action 4 a3), and the owner's game runs at 23 to 28 steps per second with it (shipped build: 17 to 20, real Scratch: 29).
- Scheduled task "G-Warp autopilot (every 3 hours)" is bound to the owner's computer.

## 2. Next actions, in order

**READ `team/claude/OWNER-PRIORITY.md` FIRST (owner, 26 Nov 08:55): speed against TurboWarp is the only thing that matters to him now. Finish the 1b part in progress, ship it, then go straight to STEP 2 (fast code). The rest of step 1b waits until before step 3.**

1. (done) Step 1a, build m. 2. (done, first table) VS-TURBOWARP.md. 3a. (done) Undo keeps the Book, build n. 3b. (done) Save, AST mirror and block counter read the Book, build o.
4. **NEXT: Step 2, scripts become fast code.** Set up the experiment as `experiments/step2/README.md` says (2 minutes), then:
   a. Go on with its "Next, in this order" list (variables without the name search, My Block inputs as locals, list blocks, go to x y, pen, values of go-between blocks, fold the 3 step wrappers into the driver). After every family: `sh /home/claude/gwt/F3.sh` (referee with fast code OFF and ON, t_par, game speed, bench). Every referee number must stay the same as the old way.
   a2. Measure with the bigger test the owner's priority note names: `tools/gwt/bench40.sb3`, `tools/tw/twbench.js`, 3 runs each, middle value, and put the table in the ship note. The target is in OWNER-PRIORITY.md (every row at or under TurboWarp's time).
   a3. FIRST THING: par3 with fast code ON gave 156/159 in 2 of 11 runs (`q02: Scratch true, G-Warp false`), the old way 157 in 10 of 10 runs. So fast code has a timing fault. q02 is: reset timer, repeat 10 [move 0 steps], then timer > 0.2 must be true (10 loop passes = 10 frames). Sometimes the 10 passes take under 0.2 s with fast code: some passes do not wait for the next frame. Look at how the frame loop decides to step the scripts again inside one frame (`GW.__redraw`, `GW.__act`, gw-run-throttle.js) and what the made code does differently at the end of a loop pass. Nothing of step 2 ships before this is found and par3 gives 157 in 10 of 10.
   b. Close the "known gaps" of the README (edit while running, breakpoints, glow). Only then may it go into the app, OFF by default (Developer mode switch), with the full test list of section 5, and to the PC.
   c. Then ON by default with an off switch for one release, then remove the old way (one engine).
   d. Small speed fix found on the way, ready in the experiment's patch (the `geo` / `pointAt` part): the Power lines sparks asked the browser for the wire length and point on every frame (9% of all work while the owner's game ran). Same look. It must pass the full test list and a look at the sparks (screenshot of the code area while the game runs) before it goes to the PC; ship it with the next PC build. Off switch: `window.GW_PL_GEO = false`.
   e. Seen in the same profile, not started: `querySelectorAll` takes 6% while the game runs (Power lines `layout2`, and `refresh` near line 27320). Find out who asks and cache it.
4x. After step 2 and before step 3 (owner, 26 Nov 09:02, OWNER-PRIORITY.md): **GPU stage** (the stage drawn on the graphics card, 2D canvas as fallback, pixel-checked against the referee).
5. Step 3: only the open sprite's blocks on the page. First its left-overs from 1b:
   - Find (`gw10-find-hit`, about line 21000) and the AI report (`scriptsText`, about line 21380) read the Book. Both also match the text of round blocks inside slots, so write a parity test first (same hits as today on the zoo).
   - Opening a Scratch file fills the Book first (the importer builds page pieces today, about line 13017). The "49 empty script boxes" of the owner's game were a mistake: they are 49 comment boxes.
   - Faster writer: bring back all 58 scripts of the game 0.7 s, big.sb3 1.0 s (step 3 needs under 0.3 s per sprite). 60% of it is `GW9.setSlotNode` drawing what sits in the slots (1,585 slots, 946 different).
   - Remove `stacks[].html` from saved files one release after build o (the Book is in the file now), and the switches `GW_UNDO_BOOK`, `GW_SAVE_BOOK`.
   Then step 4: only the scripts near the view.
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
- `t_par2.js` needs `par2.json` (now in tools/gwt). `bench.js` needs the project: `node bench.js /home/claude/gwt/bench.sb3 [app.html]`. Lines of app.html are very long: search with `sh /home/claude/gwt/g.sh '<regex>'` (shows 120 letters around each hit).
- The machine's speed moves a lot between runs (the same build gave 17 to 20 steps per second on the game). Measure old and new in the SAME run, twice, and write ranges.
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

Quick way: in `/home/claude/gwt` run `nohup sh A.sh > A.log &` and `nohup sh B.sh > B.log &` together (app tests, Book, save; undo on the zoo: about 15 minutes), then `nohup sh C.sh > C.log &` alone (referee, game, memory, speed: about 12 minutes; it compares with `/home/claude/base`).
In `/home/claude/gwt` (each prints its own result line):
- `node t_par.js` (53 checks), `node t_par2.js` (28), `node t_thin.js` (14, needs the owner's game), `node t_snap.js` (7), `node t_grab.js`, `node t_undo.js` (needs the game)
- Save / reopen: `node t_save.js PALETTE mini.sb3 ... big.sb3 vars2500.sb3 /home/claude/priv/gh.sb3` (`sh save_all.sh` runs the whole zoo; every line must say OK), and `node t_save2.js par3.sb3 par4.sb3 /home/claude/priv/gh.sb3` (old, damaged and unsafe files)
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

- 26 Nov 09:10, scheduled run (07:18): STEP 1b part b DONE. Build o on the PC (v15.70.16: save, AST mirror, block counter read the Book; saved game file 47 MB -> 31 MB). New tests t_save.js (19 projects OK) and t_save2.js. Full test list OK. STEP 2 started as an experiment (experiments/step2): same answers as the old way on the referee projects except one timing check of par3 (2 of 11 runs), bench40 1.3 to 2.5 times faster on 4 of 6 rows, game 23 to 28 steps per second (shipped 17 to 20). Next: step 2, action 4a.
- 26 Nov 06:10, scheduled run (04:18): STEP 1b part a DONE. Build n on the PC (v15.70.15: undo / redo keep the Book). New test t_undob.js, 19 projects OK, full test list OK. Found for part b: saving writes an 18 MB `ast` nobody reads. Next: 1b part b (start with the save / reopen test).
- 26 Nov 02:15, first session: first G-Warp / TurboWarp / Scratch table written (VS-TURBOWARP.md). Next: step 1b part a (undo keeps the Book).
- 26 Nov 01:50, first session: STEP 1a DONE. Build m on the PC (v15.70.14: gw-book.js). Scheduled task created. Next: TurboWarp table, step 1b.
- 26 Nov 01:05, first session: v15.70.13 shipped to the PC as l. Plan written and approved. Step 1a started: gw-book.js built, round trip OK on 17 projects.
