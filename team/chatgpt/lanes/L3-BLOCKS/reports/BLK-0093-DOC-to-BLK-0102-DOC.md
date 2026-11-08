# L3-BLOCKS report — BLK-0093-DOC to BLK-0102-DOC

Branch: ai-team
Result: 10 kid-help cards drafted. Five rows are [x]; five are [~] with a P3 source-anomaly report. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0093-DOC — mod
What it does: reports the remainder left after dividing one value by another.
Try it: when green flag clicked → say (10 mod 3)
Watch out: this gives the remainder (1), not the answer to the division (3).
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0094-DOC — round (3.14)
What it does: rounds a number to the nearest whole number.
Try it: when green flag clicked → say (round (3.14))
Watch out: the answer has no decimal part.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0095-DOC — abs (-5)
What it does: reports how far a number is from zero.
Try it: when green flag clicked → say (abs (-5))
Watch out: the answer is never negative.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0096-DOC — [abs] of (9)
What it does: applies the math action you choose to a number.
Try it: when green flag clicked → say ([sqrt] of (9))
Watch out: choose the math action from the menu.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0097-DOC — join
What it does: puts two pieces of text together.
Try it: when green flag clicked → say (join (hello) (world))
Watch out: join does not add a space unless you put one in an input.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0098-DOC — length of
What it does: counts how many letters and spaces are in a piece of text.
Try it: when green flag clicked → say (length of (hello))
Watch out: each space also counts as one character.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0099-DOC — (apple) contains (a)?
What it does: checks whether one piece of text appears inside another.
Try it: if (apple contains a?) then → say (Found it!)
Watch out: the block gives a true or false answer.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0100-DOC — letter of
What it does: reports the letter at a chosen place in a word or sentence.
Try it: when green flag clicked → say (1 letter of (hello))
Watch out: the first letter is position 1.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0101-DOC — pick random
What it does: picks a random number between two values.
Try it: when green flag clicked → say (pick random (1) to (10))
Watch out: either end of the range can be picked.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0102-DOC — switch backdrop to [stage1]
What it does: changes the stage's background to the backdrop you choose.
Try it: when green flag clicked → switch backdrop to [stage1]
Watch out: this changes the stage backdrop, not the sprite's costume.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

## Potential source-label issue
Five operator entries have placeholder-looking duplicated values in their block-inventory text; see team/chatgpt/lanes/L3-BLOCKS/bugs/BUG-BLK-0093-DOC.md. The exact labels and catalog line numbers are recorded there. Actual app rendering remains NOT-TESTED because GitHub cannot fetch the oversized app.html.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json blob is c9eb64716e6427674a72509028a63d1c131f1740. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch operator meanings; runtime remains NOT-TESTED. No confirmed app bug.
