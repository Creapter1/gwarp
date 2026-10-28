# Batch report: BLK-0001-PAR .. BLK-0002-AI (10 jobs)

**Batches by:** Buffy (Freebuff coding agent)
**Date (UTC):** 2026-10-28
**G-Warp version:** not tested (smoke-app.js needs Node.js, not available in this environment)

---

## BLK-0001-PAR  "move (10) steps"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Job type [TERMINAL] needs `node ai-team/tools/qa-kit/compare.js` — requires Node.js 18+ and Playwright chromium.
  Neither node nor python is available in this Freebuff environment.
  No test built; no comparison run.
Bug: no
Note: blocked on Node.js + qa-kit setup. Script plan: build `{B.C('move',[10]), B.SET('result', B.X)}`, compare G-Warp vs scratch-vm X position.

## BLK-0001-EDGE  "move (10) steps"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker as BLK-0001-PAR: no Node.js for compare.js.
  Edge inputs planned: "", "abc", "10", 10, -1, 0, 1e9, "NaN", 2.5, 300-char string.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0001-SAVE  "move (10) steps"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker: roundtrip.js needs Node.js.
  Would reuse the .sb3 from BLK-0001-PAR, run roundtrip.js + check-sb3.js.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0001-DOC  "move (10) steps"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block checked in ai-team/gwrap-blocks.json (type: move, category: motion, block type: stack).
  Help card (max 6 lines, words an 8-year-old knows):

  ### move (10) steps
  What it does: moves your sprite forward 10 steps in the direction it is pointing.
  Try it: when green flag clicked → move (10) steps. Put it inside a forever loop to keep going.
  Watch out: it moves where the sprite POINTS, not always to the right. Turn first if you want a different direction.
Bug: no
Note: SOURCE-VERIFIED from gwrap-blocks.json. No Scratch screenshots used.

## BLK-0001-AI  "move (10) steps"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Job type [ANY] waits until AIM-1 (the AI Lab command list) exists in ai-team/shared/.
  As of this session, no AIM-1 package found. Skipping until the AI Lab pushes it.
Bug: no
Note: leave [>] until AIM-1 exists, then write 10 JSONL examples in chatgpt/ai-data/BLK-0001.jsonl.

## BLK-0002-PAR  "turn (15) degrees"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same Node.js blocker as BLK-0001-PAR. Block type: turn_cw (motion, stack).
  Script plan: `{B.C('turn_cw',[15]), B.SET('result', B.DIR)}`, compare direction.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0002-EDGE  "turn (15) degrees"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Edge inputs for direction: "", "abc", "15", 15, -1, 0, 1e9, "NaN", 2.5, long text.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0002-SAVE  "turn (15) degrees"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Would reuse .sb3 from BLK-0002-PAR, run roundtrip.js + check-sb3.js.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0002-DOC  "turn (15) degrees"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block checked in ai-team/gwrap-blocks.json (type: turn_cw, category: motion, block type: stack).
  Help card:

  ### turn (15) degrees
  What it does: turns your sprite 15 degrees clockwise (to the right).
  Try it: when green flag clicked → turn (15) degrees. Use a negative number to turn the other way.
  Watch out: turning does not move the sprite, only changes which way it points. Move after turn to go that way.
Bug: no
Note: SOURCE-VERIFIED from gwrap-blocks.json. No Scratch screenshots used.

## BLK-0002-AI  "turn (15) degrees"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same AIM-1 blocker as BLK-0001-AI. Skipping until the AI Lab pushes the command list.
Bug: no
Note: leave [>] until AIM-1 exists, then write 10 JSONL examples in chatgpt/ai-data/BLK-0002.jsonl.

---

**Summary:** 2 of 10 done (DOC jobs), 7 blocked on Node.js + qa-kit setup, 1 blocked waiting for AIM-1 (AI Lab).
**Next step:** install Node.js 18+ and run `cd ai-team/tools/qa-kit && npm install && npx playwright install chromium`, then re-run the PAR/EDGE/SAVE jobs.
