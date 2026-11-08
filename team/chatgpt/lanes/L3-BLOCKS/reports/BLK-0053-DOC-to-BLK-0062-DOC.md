# L3-BLOCKS report — BLK-0053-DOC to BLK-0062-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need the qa-kit compare/roundtrip tools and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0053-DOC — when I receive [message1]
What it does: starts this script when another script sends the matching message.
Try it: when I receive [start] → say (Ready!)
Watch out: the message name must match the one that was broadcast.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0054-DOC — when I start as a clone
What it does: starts a script for each new clone.
Try it: when I start as a clone → go to random position
Watch out: this hat runs for clones, not the original sprite.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0055-DOC — when backdrop switches to [stage1]
What it does: starts this script when the stage changes to that backdrop.
Try it: when backdrop switches to [stage1] → say (New scene!)
Watch out: the backdrop name must match the one being switched to.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0056-DOC — wait (1) seconds
What it does: pauses this script for the chosen time.
Try it: when green flag clicked → wait (1) seconds → say (One second passed!)
Watch out: this pauses this script; other scripts can still run.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0057-DOC — repeat (10)
What it does: runs the blocks inside it the chosen number of times.
Try it: repeat (10) → move (10) steps
Watch out: put the blocks to repeat inside the loop.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0058-DOC — forever
What it does: keeps running the blocks inside again and again.
Try it: forever → move (10) steps
Watch out: blocks after forever wait until the loop stops.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0059-DOC — if then
What it does: runs the blocks inside only when a condition is true.
Try it: if <touching edge?> then → say (At the edge!)
Watch out: if the condition is false, the inside blocks are skipped.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0060-DOC — if then else
What it does: chooses one set of blocks when a condition is true and another when it is false.
Try it: if <touching edge?> then → say (At the edge!) else → say (Still moving!)
Watch out: only one side runs each time the condition is checked.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0061-DOC — wait until
What it does: pauses this script until a condition becomes true.
Try it: wait until <key [space] pressed?> → say (Go!)
Watch out: if the condition stays false, this script keeps waiting.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0062-DOC — repeat until
What it does: repeats the blocks inside until a condition becomes true.
Try it: repeat until <touching edge?> → move (10) steps
Watch out: make sure the loop can change the condition, or it may keep going.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, and condition slots. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch block meanings; no runtime behavior was tested. No bug found.
