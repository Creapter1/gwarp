# L3-BLOCKS report — BLK-0163-DOC to BLK-0172-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0163-DOC — spin with force (500)
What it does: applies a force that makes the physics body spin.
Try it: spin with force (500)
Watch out: use a physics-enabled sprite.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0164-DOC — set angular velocity to (30)
What it does: sets how quickly the physics body spins.
Try it: set angular velocity to (30)
Watch out: this replaces the old spin speed.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0165-DOC — set fixed [dynamic]
What it does: chooses whether the physics body moves, stays still, or is pinned.
Try it: set fixed [static]
Watch out: choose dynamic, static, or pinned from the menu.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0166-DOC — set density [25]
What it does: sets how dense the physics body is.
Try it: set density [100]
Watch out: choose one of the density values from the menu.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0167-DOC — set density to (100)
What it does: sets the physics body's density to a number.
Try it: set density to (100)
Watch out: this replaces the old density.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0168-DOC — set friction [0]
What it does: sets how much the physics body rubs against other things.
Try it: set friction [50]
Watch out: choose a friction value from the menu.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0169-DOC — set friction to (50)
What it does: sets the physics body's friction to a number.
Try it: set friction to (50)
Watch out: this replaces the old friction.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0170-DOC — set bounce [0]
What it does: sets how bouncy the physics body is.
Try it: set bounce [70]
Watch out: choose a bounce value from the menu.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0171-DOC — set bounce to (20)
What it does: sets the physics body's bounce value to a number.
Try it: set bounce to (20)
Watch out: this replaces the old bounce value.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0172-DOC — set density [25] roughness [0] bounce [0]
What it does: sets the physics body's density, friction, and bounce together.
Try it: set density [100] roughness [50] bounce [70]
Watch out: it replaces all three settings at once.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and listed menus. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Physics descriptions use the labels and menu choices only; runtime remains NOT-TESTED. No bug found.
