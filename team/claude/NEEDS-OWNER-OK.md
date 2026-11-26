# Needs the owner's OK (Claude keeps working on everything else)

Newest first. Each line: what, why it needs you, what to say to approve.

0. **Measure the editors on the owner's PC (he said yes, 26 Nov 08:30: Scratch 3, TurboWarp and G-Warp are all installed).** First try 08:35 by the first session: TurboWarp Desktop opened his game in about 4 to 5 seconds (by screenshots, +-1 s). Then it got stuck: Task Manager was open, always on top and run as administrator, so clicks could not reach it or the app under it. Memory and drag lag NOT measured. To finish: Task Manager must be closed first (or the owner reads the three Memory numbers himself in Task Manager > Processes with his game open in each app). G-Warp Desktop is not in the Start menu: start it from the desktop shortcut "G-Warp" and ask access for its exe name.
1. DONE 26 Nov 18:55 (owner said "post this version on main"): PR #21 merged, main = v15.70.18. ~~Put the memory fix on the website.~~ The website (main) is still v15.69.0, which uses 3.5 GB on a big project and can kill Chrome. Only you move work to main. Say **"open the PR"** and Claude makes a pull request from the tested files for you to merge.
2. **Tiny shadow under C blocks is off** since build l (it cost 95 ms on every mouse move and could not be seen on the dark area). Say **"shadow back"** if you want it on again.
3. **Old questions still open:** should saved "My melody" chips in Spark Studio also be cleared on start? Which Spark Studio ideas sound wrong? Typed text that equals a variable name in native projects: treat as the variable or as text?
