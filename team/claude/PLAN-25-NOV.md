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
R2 ~12:00  Scratch-exact batch 3 with the referee: motion (glide must END exactly on target, bounce, point towards, rotation styles),
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
