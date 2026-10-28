# Batch report: BLK-0003-PAR .. BLK-0004-AI (10 jobs)

**Batches by:** Buffy (Freebuff coding agent)
**Date (UTC):** 2026-10-28
**G-Warp version:** not tested (smoke-app.js needs Node.js, not available)

---

## BLK-0003-PAR  "turn (15) degrees" (turn counter-clockwise)
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  [TERMINAL] job needs compare.js (Node.js + Playwright). No Node.js in this environment.
  Block type: turn_ccw (motion, stack). Script plan: `{B.C('turn_ccw',[15]), B.SET('result', B.DIR)}`.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0003-EDGE  "turn (15) degrees" (turn counter-clockwise)
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same Node.js blocker. Edge inputs for direction: "", "abc", "15", 15, -1, 0, 1e9, "NaN", 2.5, long text.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0003-SAVE  "turn (15) degrees" (turn counter-clockwise)
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Would reuse .sb3 from BLK-0003-PAR, run roundtrip.js + check-sb3.js.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0003-DOC  "turn (15) degrees" (turn counter-clockwise)
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block checked in ai-team/gwrapblocks.json (type: turn_ccw, category: motion, block type: stack).
  Help card:

  ### turn (15) degrees
  What it does: turns your sprite 15 degrees counter-clockwise (to the left).
  Try it: when green flag clicked → turn (15) degrees. Use a positive number to turn left, negative to turn right.
  Watch out: turning changes which way the sprite points, but does not move it. The sprite stays in the same spot.
Bug: no
Note: SOURCE-VERIFIED from gwrapblocks.json. No Scratch screenshots used.

## BLK-0003-AI  "turn (15) degrees" (turn counter-clockwise)
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Waits for AIM-1 (AI Lab command list). Not available yet.
Bug: no
Note: skip until AIM-1 exists, then write 10 JSONL examples in chatgpt/ai-data/BLK-0003.jsonl.

## BLK-0004-PAR  "go to x: (0) y: (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  [TERMINAL] job needs compare.js. Block type: goto_xy (motion, stack).
  Script plan: `{B.C('goto_xy',[0,0]), B.SET('result', B.X), B.SET('result2', B.Y)}`.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0004-EDGE  "go to x: (0) y: (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Edge inputs: "", "abc", "0", 0, -1, 1e9, "NaN", 2.5, long text for x and y.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0004-SAVE  "go to x: (0) y: (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Would reuse .sb3 from BLK-0004-PAR, run roundtrip.js + check-sb3.js.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0004-DOC  "go to x: (0) y: (0)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block checked in ai-team/gwrapblocks.json (type: goto_xy, category: motion, block type: stack).
  Help card:

  ### go to x: (0) y: (0)
  What it does: moves your sprite straight to a spot on the stage. x is left-right (negative = left), y is up-down (negative = down).
  Try it: when green flag clicked → go to x: (-100) y: (50). The center of the stage is x: 0 y: 0.
  Watch out: this moves the sprite instantly. Use "move (10) steps" if you want it to glide.
Bug: no
Note: SOURCE-VERIFIED from gwrapblocks.json. No Scratch screenshots used.

## BLK-0004-AI  "go to x: (0) y: (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Waits for AIM-1 (AI Lab command list). Not available yet.
Bug: no
Note: skip until AIM-1 exists, then write 10 JSONL examples in chatgpt/ai-data/BLK-0004.jsonl.

---

**Summary:** 2 of 10 done (DOC jobs, SOURCE-VERIFIED), 7 blocked on Node.js, 1 blocked waiting for AIM-1.
**Next step:** same blocker — install Node.js 18+ and Playwright chromium to unblock PAR/EDGE/SAVE jobs.
