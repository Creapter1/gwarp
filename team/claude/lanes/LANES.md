# Three agents, three lanes (owner, 26 Nov 09:15: "use all 3")

Each lane has its own files, its own lock and its own progress file. Lanes never edit each other's files.

| Lane | Job | Owns | Lock / progress |
|---|---|---|---|
| A (main) | Step 2 fast code, then plugging in B's work, shipping to the PC | app.html, gw-*.js in team/claude/work/, the owner's PC | RUN-LOCK.md, PROGRESS.md |
| B (GPU) | Graphics-card stage as its own file `gw-gpu-stage.js` + its own tests | team/claude/lanes/gpu/ only | lanes/gpu/LOCK.md, lanes/gpu/PROGRESS.md |
| C (tests) | Project zoo, Scratch referee runs, VS-TURBOWARP table on every new build, bug list for lane A | team/claude/lanes/tests/ only (+ appends rows to VS-TURBOWARP.md) | lanes/tests/LOCK.md, lanes/tests/PROGRESS.md |

Rules for B and C: never write to the owner's PC, never edit app.html or team/claude/work/, never push outside ai-team. Commit only inside your own folder (C may also append to VS-TURBOWARP.md). Pull with rebase before every push; on a conflict, keep the other lane's change and retry.
Hand-over: B writes "READY: version X, tests passed" in lanes/gpu/PROGRESS.md; lane A plugs it in, tests the whole app and ships. C writes bugs to lanes/tests/BUGS.md; lane A fixes them.
All owner rules in PROGRESS.md section 4 apply to every lane.
