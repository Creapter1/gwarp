# JOBS-BLOCKS batch: BLK-0007-PAR..BLK-0008-AI

## BLK-0007-PAR  "change x by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  qa-kit compare.js needs Node.js + Playwright + Chromium.
  This Freebuff environment has none of those.
  Cannot run compare.js / roundtrip.js / check-sb3.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0007-EDGE  "change x by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker as BLK-0007-PAR. Edge inputs cannot be tested
  without qa-kit.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0007-SAVE  "change x by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. roundtrip.js + check-sb3.js need Node.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0007-DOC  "change x by (10)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block text from ai-team/gwrap-blocks.json (type: change_x,
  text: "change x by %n", category: motion).
  Help card below written from the block definition only.
Bug: no

### change x by (10)
What it does: moves your sprite a little bit to the right
  (or left if the number is negative), without turning.
Try it: when green flag clicked → forever → change x by (1) →
  if on edge, bounce
Watch out: x is left-right. Big numbers move it a lot fast.
  This does not change up-down (that's y).

## BLK-0007-AI  "change x by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  AI jobs wait for AIM-1 (command list from AI Lab).
  No AIM-1 file exists yet (ai-team/shared/*AIM-1* absent).
Bug: no
Note: Wait until AIM-1 exists, then 10 JSONL examples.

## BLK-0008-PAR  "set x to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker. compare.js cannot run here.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0008-EDGE  "set x to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0008-SAVE  "set x to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker. roundtrip.js needs Node.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0008-DOC  "set x to (0)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block text from ai-team/gwrap-blocks.json (type: set_x,
  text: "go to x: %n y: %n" uses set_x under the hood;
  standalone setter text "set x to %n", category: motion).
  Help card written from the block definition only.
Bug: no

### set x to (0)
What it does: puts your sprite at a chosen left-right spot,
  no matter where it was before. 0 is the middle.
Try it: when green flag clicked → set x to (-100) → wait (1) secs →
  set x to (100)
Watch out: this only moves left-right. Use "set y to" for up-down,
  or "go to x: y:" to move both at once.

## BLK-0008-AI  "set x to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  AI jobs wait for AIM-1. No AIM-1 file yet.
Bug: no
Note: Wait until AIM-1 exists, then 10 JSONL examples.

Summary:
  2 DOC done (SOURCE-VERIFIED), 8 jobs blocked:
  7 TERMINAL (no Node.js for qa-kit), 1 AI (waiting AIM-1).
  Not tested: all PAR/EDGE/SAVE.
