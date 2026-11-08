# L3-BLOCKS report — BLK-0013-DOC to BLK-0022-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work blocked
The preceding open PAR/EDGE/SAVE tasks need qa-kit compare/roundtrip and Scratch VM. The local clones are on haiku-work and main, not ai-team; their qa-kit node_modules folders are absent. Per task instruction, no network dependencies were installed and no terminal test was run. BLK-0013-PAR/EDGE/SAVE through BLK-0016-PAR remain open and unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0013-DOC — glide (1) secs to x: (0) y: (0)
What it does: smoothly moves your sprite to an x/y spot over the chosen time.
Try it: when green flag clicked → glide (1) secs to x: (100) y: (0)
Watch out: the sprite moves during the glide; it does not jump there instantly.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0014-DOC — go to random position
What it does: sends your sprite to a surprise spot on the stage.
Try it: when green flag clicked → go to random position
Watch out: the spot can be different each time.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0015-DOC — point towards [mouse-pointer]
What it does: turns your sprite to face the mouse pointer.
Try it: when green flag clicked → point towards [mouse-pointer] → move (10) steps
Watch out: it turns toward the pointer; it does not move there by itself.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0016-DOC — x position
What it does: tells how far left or right your sprite is on the stage.
Try it: when green flag clicked → go to x: (100) y: (0) → say (x position)
Watch out: x = 0 is the middle; positive numbers are right and negative numbers are left.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0017-DOC — y position
What it does: tells how far up or down your sprite is on the stage.
Try it: when green flag clicked → go to x: (0) y: (100) → say (y position)
Watch out: y = 0 is the middle; positive numbers are up and negative numbers are down.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0018-DOC — direction
What it does: tells which way your sprite is pointing, as a number.
Try it: when green flag clicked → point in direction (90) → say (direction)
Watch out: 90 points right and 0 points up.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0019-DOC — say (Hello!) for (2) secs
What it does: shows your words in a speech bubble for a short time.
Try it: when green flag clicked → say (Hello!) for (2) secs
Watch out: the bubble goes away when the timer ends.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0020-DOC — say (Hello!)
What it does: shows your words in a speech bubble.
Try it: when green flag clicked → say (Hello!)
Watch out: the bubble stays until another say or think block changes it.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0021-DOC — think (Hmm...)
What it does: shows your thought in a thought bubble.
Try it: when green flag clicked → think (Hmm...)
Watch out: the bubble stays until another say or think block changes it.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0022-DOC — think (Hmm...) for (2) secs
What it does: shows your thought in a bubble for a short time.
Try it: when green flag clicked → think (Hmm...) for (2) secs
Watch out: the bubble goes away when the timer ends.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json blob is c9eb64716e6427674a72509028a63d1c131f1740. It contains the ten matching block types, categories, shapes, and display labels. The job definitions are in team/ai-team/CHATGPT-JOBS.md blob 6dcbd29ef81d23fb3d362a8373aa64bcd007d644. Card wording uses the corresponding Scratch block meanings; no runtime behavior was tested. No bug found.
