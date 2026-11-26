# G-Warp improvement plan (owner asked 25 Nov 2026, 11:04: "work all day, 5 h schedule, follow the rules, keep improving")
Goal order (owner): 1) exactly like Scratch  2) better than TurboWarp  3) better than PenguinMod. G-Warp's own look never changes.

## Where things are (this session's workspace)
- /home/claude/rel        = app worktree: release v15.69.0 + my changes (currently v15.70.2). EDIT app.html HERE. Bump 15.70.N each round.
- /home/claude/gwt        = tests + tools. /home/claude/gwt/app.v15.69.0.bak.html = untouched v15.69.0.
- /home/claude/ref        = REAL Scratch engine (scratch-vm). `node diff.js project.sb3 6000` compares G-Warp with Scratch.
                            `node ref.js project.sb3 ms` prints Scratch's own result. USE IT before "fixing" anything: it already
                            proved one of my guesses wrong (fencing was fine; my test costume had no viewBox).
- /home/claude/gwarp      = ai-team branch clone. Notes/patch/tests go in team/claude/v15.70.N/ and team/claude/tests/.
- PC app: C:\Users\mario\OneDrive\Documents\ai all worcks\G-Warp Desktop\app\G-Warp-win32-x64\resources\app\app.html
  (folder access granted this session; tools mcp__remote-devices__device_commit_files / device_stage_files).

## Checks that must pass before anything goes to the PC
cd /home/claude/gwt && node t_par.js | head -2 ; node t_par2.js | head -2 ; node t_smooth.js ; node audit.js | head -3
cd /home/claude/ref && for f in par par2 probe; do node diff.js /home/claude/gwt/$f.sb3 6000; done   (only the random glide x/y may differ)
Generators: mkpar.py, mkpar2.py, mkprobe.py (fixtures MUST have viewBox on SVG costumes). shot.js = screenshots of the UI.

## Ship a round
1. python3 /home/claude/gwt/pc_build.py <next letter>   (STATE.json has the last letter; PC keeps 15.69.0, only the letter moves)
2. write /mnt/user-data/outputs/pc/CLAUDE-CHANGES-v15.69.0<letter>.md (short, plain words, how to test, how to go back)
3. device_commit_files: backup\before-v15690<letter>-app.html FIRST, then the changes file, then app.html
4. ai-team: git mv team/claude/v15.70.(N-1) -> v15.70.N, new patch `(cd /home/claude/rel && git diff) > ...patch`, README section,
   update team/AI-TEAM-TODO.md ([done] lines signed "(vX, Claude Fable, date)"), commit, `git -c push.negotiate=true push origin ai-team`.
5. End the round with a SHORT message to the owner: what changed, how to test it, what is next.

## Rules (owner's, non-negotiable)
- NEVER push to main. Do not push to the release branch / PR 20 (owner tests on the PC first and moves work himself). ai-team only.
- PC: same update number, new letter. Backup before every write. Never touch his other files.
- A project must look and act the same as in Scratch. G-Warp's own UI/visual style is never changed to look like Scratch.
- Anything that changes how the app works for everyone and he has not asked for: OFF by default (a setting) or Developer mode only.
- No second run engine, no Turbo Player button. No emojis in the UI (real icons). No questions that block: decide, do, log it in the to-do.
- Do not build games/example projects; make the APP better. Short, simple replies. Test before claiming.
- If the PC cannot be reached: retry once, then keep the build in /mnt/user-data/outputs/pc and the ai-team patch, say so, move on.

## Rounds (5 hours from 11:15)
R1 11:15 DONE  real-Scratch referee built; 172 checks same as Scratch; fencing "bug" was a false alarm.
R2 DONE 11:35 (ran early, shipped as letter c, v15.70.3). If the 12:00 message fires again: do an EXTRA Scratch-exact batch instead
           (sound blocks, key/click/backdrop hats, ask+answer, variable/list monitors, custom-block warp timing, clone layer order,
           say/think bubbles in the picture test) and ship it as the next letter.
   (old)   Scratch-exact batch 3 with the referee: motion (glide must END exactly on target, bounce, point towards, rotation styles),
           looks (layers, costumes), sensing (touching, distance), lists/strings edge cases, PEN + effects by comparing the two stage
           pictures pixel by pixel. Fix every real difference.  -> PC letter c
R3 ~12:50  Better than TurboWarp 1 = speed. Benchmark projects (tight loops, 300 clones, list sort, pen fill, custom blocks no-refresh):
           time G-Warp vs the real Scratch engine, profile, speed up the hot paths. Report numbers honestly.  -> letter d
R4 ~13:40  Better than TurboWarp 2 = editor power TurboWarp has: check what exists first, then add what is missing and cheap
           (custom stage size E2.5, find-a-block, variable manager, etc.), each one tested.  -> letter e
R5 ~14:30  G-Warp-only tools (owner): more for Spark Studio; SVG 360 and Big map must "make sense when active" (good defaults,
           samples that match what the user made, clear first step). Screenshot each before/after.  -> letter f
R6 ~15:20  Better than PenguinMod: PenguinMod core blocks check (E2.9), then full regression of everything above, to-do clean-up.
R7 ~16:10  Final report to the owner: what changed today, measured results, what is still open. Stop.


## State after round 2 (11:35)
- rel = v15.70.3, PC = v15.69.0c. Referee tools: /home/claude/ref (diff.js values, pic.js pictures) + /home/claude/gwt/sbgen.py (project builder),
  generators mkpar3.py (157/159), mkpen.py (picture, 0.21 % diff), mkmini.py. picdiff.py pic -> pic_cmp.png.
- Known speed gap for R3: spin.sb3 "forever change n by 1" 3 s: G-Warp 409k loops vs Scratch 5.52M. The interpreter walks DOM blocks
  (runOne -> syncProxies -> executeBlock). Look at caching per block (parsed op + closures) before anything else. Re-run ALL diffs after.
- Open owner decision logged in the to-do: typed text = variable name in native projects.

## State after the extra batch (12:25)
- rel = v15.70.4, PC = v15.69.0d. New: par4.sb3 (mkpar4.py, 66/72), ratio.sb3. diff.js/ref.js now play inputs once the project sets variable "ready" to 1.
- Open parity items are in the to-do (timer hat, loudness, recursion yield). Good candidates for R6 if time allows.

## State after round 3 (13:25)
- rel = v15.70.5, PC = v15.69.0e (STATE.json letter e). Backup of rel before R3: /home/claude/gwt/app.v15.70.4.html.
- Speed: fast paths GW.__fastVar / GW.__fastList (called from runOne), direct scopedValue, more fastFN reporters, bodyOf cache, 75% work time.
  bench.sb3 (mkbench.py; node /home/claude/ref/bench.js bench.sb3 app.html): 3-5x faster than v15.70.4, still 2-5x slower than Scratch. NOT faster than TurboWarp - say so.
- New referee projects: nat.sb3 (15/15), join.sb3 (19/19), c7.sb3 (plain loop profile). Add both to the diff list every round.
- Next speed ideas are in team/claude/v15.70.5/README.txt ("STILL SLOWER").

## State after round 4 (14:00)
- rel = v15.70.6, PC = v15.69.0f. Addons added: gotodef (on), mousepos (off), varman (off). Clone counter live again.
- IMPORTANT: gw-run-throttle.js slows every setInterval to 1 per 5 s while a project runs unless fn.gwRunCritical = true.
  And app.html copies outside /home/claude/rel load WITHOUT the sibling .js files - benchmark and test only in /home/claude/rel.
- E2.5 custom stage size skipped on purpose (480x360 in ~90 places). Logged.

## State after round 5 (14:55)
- rel = v15.70.7, PC = v15.69.0g. Round 5 changed THREE files: app.html, gw-svg360.js, gw-bigmap.js (PC backups before-v15690g-*).
  From now on the patch is `git diff -- app.html gw-svg360.js gw-bigmap.js` and pc ships must compare/back up the .js files too.
- Developer-mode features in headless: use /home/claude/gwt/shotdev.js (loads app.html?dev=1).
- Open: Spark Studio Mood menu (preview is always major). Logged in the to-do.

## State after the owner's 15:12 message (16:00)
- NEW GOAL ORDER from the owner: beat Scratch at everything (speed, loading <= 10 s, a real steady 30 FPS), then TurboWarp, then PenguinMod.
  Everything must work the same as Scratch; extensions the same as TurboWarp. R6's PenguinMod block check comes AFTER this.
- rel = v15.70.8 (opening time: big.sb3 34 s -> 7.5 s). PC is STILL v15.69.0g: the PC went offline (bridge not connected) at ship time.
  NEXT TIME THE PC ANSWERS: stage + compare its app.html with /mnt/user-data/outputs/pc/app.html (= g), then pc_build.py h, backup, note, commit.
  Do NOT run pc_build.py before the PC is reachable (it would break the backup chain).
- Tools: load.js (opening time), laps.js (import stages), prof_open.js (profile of opening), pace.js (step pacing), mkbig.py (big test project).

## State after round 6 (16:05)
- rel = v15.70.9. PC STILL v15.69.0g (offline on 4 tries). Same shipping note as above: when the PC answers, compare, pc_build.py h, backup, note, commit (3 files: app.html + the two .js are unchanged since g).
- Full regression passed on v15.70.9. E2.9 PenguinMod moved to later by the owner.
- Biggest next step for "beat Scratch": compile scripts to closures (see team/claude/v15.70.9/README.txt NEXT).

## Round 7 (16:12): final report sent. PC still offline -> letter h NOT shipped. Schedule finished; no more rounds unless the owner asks.

## 22:20 owner said CONTINUE: PC back online, v15.70.9 shipped as v15.69.0h (STATE letter h). Next letter i. Next job: speed (compile scripts to closures).

## State 23:20 (after the owner's CONTINUE)
- rel = v15.70.10, PC = v15.69.0i (STATE letter i; next j). PC ships now cover 4 files: app.html, gw-svg360.js, gw-bigmap.js, gw-run-throttle.js.
- The owner's own big project is at /home/claude/priv/gh.sb3 (staged from his G-Warp Desktop folder). PRIVATE: never commit it, never copy it elsewhere.
  Real benchmark: cd /home/claude/ref && TAPS=8 node fps.js /home/claude/priv/gh.sb3 12000  (TAPS=1 = story screen, TAPS=8 = 3D gameplay).
  Now: story 30.1 vs 30.4; gameplay 24-26 vs 30.4; script 15 ms vs 6 ms.
- Tools in gwt: gwfps.js (steps/s with a js toggle), trace.js (main-thread split), layers.js (compositor layers + reasons), longtasks.js, play.js, prof_run.js.
- New referee project stop.sb3 (17/17): add to the diff list.
- NEXT: compile scripts to closures (gameplay gap), then the open Scratch items (timer hat, loudness), then PenguinMod.

## State 00:25 (26 Nov)
- rel = v15.70.11, PC = v15.69.0j (STATE letter j; next k). PC ships cover 5 files now (+ gw-perf.js).
- Breaking G-Warp episodes (owner's private artifacts; list_artifacts query "Breaking G-Warp"): ep. 2 + 3 list and status in team/bugs/BREAKING-GWARP-EP2-EP3.md.
  Episode 1 ("Breaking G-Warp v15.69") NOT read yet. Next from that file: extension category two clicks, Extensions button covering categories, OR-tower undo.
- New tests: t_paint.js, t_rename.js, mkvars.py (+load.js), ep.sb3 (19/19), stop.sb3 (17/17).
- Owner 23:30: "kill Scratch: better, cooler, faster, smoother". Order stays: Scratch-exact + speed first. Next big job: compile scripts to closures.

## State 26 Nov 00:55 - WEB EMERGENCY
- Owner 23:51: the WEB version kills Chrome / the PC with his big game (all RAM). Reproduced on main (v15.69.0, /home/claude/web = git archive of main 5542304).
- rel = v15.70.12 (memory fixes), PC = v15.69.0k (STATE letter k; next l). Web-ready files on ai-team: team/claude/v15.70.12/web-ready/.
- WAITING FOR THE OWNER: "open the PR" -> create branch release-v15.70.12 from main with the 5 web-ready files and open a PR to main. Do NOT push outside ai-team before he says so.
- Memory tools: mem.js (APP=... node mem.js project.sb3 [runSeconds] [taps]), leak.js.
- Next: thin .block-select menus (design in team/claude/v15.70.12/README.txt), then compile scripts to closures.

## State 26 Nov 00:45 - OWNER CHANGED DIRECTION (STOP + SAVE)
- rel = v15.70.13 WORK IN PROGRESS (thin menus, grab only what you see, undo no longer doubles defines, smooth drag). Saved:
  team/claude/v15.70.13-wip/ (patch + README with what is tested / not). Backup: /home/claude/gwt/app.v15.70.13-wip.html. PC still v15.69.0k.
- OWNER'S DECISION (00:34-00:42): keep G-Warp's own code and look, but make the inside work the way TurboWarp does - OUR OWN build, no copied
  code, NOT a rebuild on TurboWarp. Order: plan in plain words first (team/claude/TURBO-STYLE-PLAN.md), SHOW HIM, then build step 1 (project as data).
- Paused: UI overlap check (he asked 00:18), PC build l, PR for the web emergency (he has not said "open the PR").

## State 26 Nov 01:00 - GO from the owner
- PC = v15.69.0l (= v15.70.13). STATE letter l, next m. rel = v15.70.13. Backup /home/claude/gwt/app.v15.70.13-wip.html (same as rel).
- Owner: order OK; old engine may stay as safety net in step 2, removed at the end. UI overlap check: skip for now. START STEP 1 (Project Book).
- "Done" rule: a step is done only when the full app is on his PC AND it passed the project zoo (small, huge, normal, every block kind, his game):
  load, edit, save, export, run like Scratch. Write down which projects passed.

## State 26 Nov 01:50 - AUTOPILOT
- PC = v15.69.0m (= v15.70.14, step 1a Project Book). STATE letter m, next n. THE RESUME FILE IS NOW team/claude/PROGRESS.md (repo); this PLAN.md is history.
- Scheduled task trig_011GNSv4u653okLpdYsQ4TES "G-Warp autopilot (every 3 hours)", first run about 04:18 ET. Lock file team/claude/RUN-LOCK.md.
