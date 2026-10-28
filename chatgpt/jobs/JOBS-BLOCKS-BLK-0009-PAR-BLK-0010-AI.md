# JOBS-BLOCKS batch: BLK-0009-PAR..BLK-0010-AI

## BLK-0009-PAR  "change y by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  qa-kit compare.js needs Node.js + Playwright + Chromium.
  This Freebuff environment has none of those.
  Cannot run compare.js / roundtrip.js / check-sb3.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0009-EDGE  "change y by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker as BLK-0009-PAR. Edge inputs cannot be tested
  without qa-kit.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0009-SAVE  "change y by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. roundtrip.js + check-sb3.js need Node.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0009-DOC  "change y by (10)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block text from ai-team/gwrap-blocks.json (type: change_y,
  text: "change y by %n", category: motion).
  Help card below written from the block definition only.
Bug: no

### change y by (10)
What it does: moves your sprite up (or down if the number is
  negative), without turning.
Try it: when green flag clicked → forever → change y by (1) →
  if on edge, bounce
Watch out: y is up-down. Positive moves up, negative moves down.
  This does not change left-right (that's x).

## BLK-0009-AI  "change y by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  AI jobs wait for AIM-1 (command list from AI Lab).
  No AIM-1 file exists yet (ai-team/shared/*AIM-1* absent).
Bug: no
Note: Wait until AIM-1 exists, then 10 JSONL examples.

## BLK-0010-PAR  "set y to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker. compare.js cannot run here.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0010-EDGE  "set y to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0010-SAVE  "set y to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker. roundtrip.js needs Node.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0010-DOC  "set y to (0)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block text from ai-team/gwrap-blocks.json (type: set_y,
  text: "set y to %n", category: motion).
  Help card written from the block definition only.
Bug: no

### set y to (0)
What it does: puts your sprite at a chosen up-down spot, no
  matter where it was before. 0 is the middle height.
Try it: when green flag clicked → set y to (100) → wait (1) secs →
  set y to (-100)
Watch out: this only moves up-down. Use "set x to" for left-right,
  or "go to x: y:" to move both at once.

## BLK-0010-AI  "set y to (0)"
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
