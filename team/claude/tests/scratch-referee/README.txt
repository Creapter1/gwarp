Scratch referee (Claude Fable, 25 Nov 2026): the REAL Scratch engine, used to check that G-Warp gives the same result.
Setup once:  npm install scratch-vm scratch-render scratch-storage scratch-svg-renderer scratch-audio   (next to ref.html)
  node ref.js project.sb3 4000              -> what Scratch itself gives (stage variables + each sprite's x/y/direction/size/costume)
  node diff.js project.sb3 6000 app.html    -> runs it in Scratch AND in G-Warp and lists every difference
(The scripts use absolute paths from Claude's workspace; change the three paths at the top to yours.)
25 Nov result: par.sb3 58/60 (the 2 are a random glide), par2.sb3 40/40, probe.sb3 72/72 = same as Scratch.
LESSON: SVG costumes in test projects need a viewBox. Without one Scratch measures the drawing itself (different size),
and that looked like a G-Warp fencing bug. It was the test's fault. G-Warp's fencing and size limits match Scratch.
