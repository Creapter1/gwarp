# L3-BLOCKS report — BLK-0153-DOC to BLK-0162-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0153-DOC — setup stage [boxed]
What it does: chooses how the physics world treats the stage edges.
Try it: setup stage [boxed]
Watch out: choose the stage mode that fits your game.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0154-DOC — set gravity to x: (0) y: (-10)
What it does: sets the direction and strength of gravity in the physics world.
Try it: set gravity to x: (0) y: (-10)
Watch out: gravity affects physics-enabled sprites.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0155-DOC — enable for [costume] mode [normal]
What it does: turns physics on for the chosen sprite shape and mode.
Try it: enable for [circle] mode [normal]
Watch out: choose the shape and mode that fit your sprite.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0156-DOC — disable physics for this sprite
What it does: turns physics off for this sprite.
Try it: disable physics for this sprite
Watch out: this stops physics movement for this sprite.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0157-DOC — step simulation
What it does: advances the physics simulation by one step.
Try it: step simulation
Watch out: each step moves physics forward once.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0158-DOC — set simulation rate to (30) /s
What it does: sets how many physics steps happen each second.
Try it: set simulation rate to (30) /s
Watch out: this changes the physics update rate, not the sprite's speed.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0159-DOC — go to x: (0) y: (0) [world]
What it does: puts the physics body at a chosen x and y position.
Try it: go to x: (0) y: (0) [world]
Watch out: choose world, stage, or relative coordinates from the menu.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0160-DOC — set velocity to sx: (0) sy: (0)
What it does: sets how fast the physics body moves in x and y.
Try it: set velocity to sx: (5) sy: (0)
Watch out: this replaces the old velocity.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0161-DOC — change velocity by sx: (0) sy: (0)
What it does: adds to the physics body's current x and y movement.
Try it: change velocity by sx: (5) sy: (0)
Watch out: this adds to the old velocity instead of replacing it.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0162-DOC — push with force (25) in direction (0)
What it does: pushes the physics body with a force in the chosen direction.
Try it: push with force (25) in direction (0)
Watch out: the direction input controls which way the force points.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and listed menus. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Physics descriptions use the labels only; runtime remains NOT-TESTED. No bug found.
