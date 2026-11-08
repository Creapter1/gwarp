# L3-BLOCKS report — BLK-0133-DOC to BLK-0142-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0133-DOC — colliding actor name
What it does: reports the name of the actor involved in a collision.
Try it: inside a collision behavior → say (colliding actor name)
Watch out: use it while handling a collision event.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0134-DOC — colliding tile id
What it does: reports the ID of the tile involved in a collision.
Try it: inside a tile-collision behavior → say (colliding tile id)
Watch out: use it while handling a tile collision.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0135-DOC — set camera to x: (0) y: (0)
What it does: moves the camera view to the chosen x and y position.
Try it: set camera to x: (0) y: (0)
Watch out: camera controls change what you see, not the sprite's position.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0136-DOC — set camera x to (0)
What it does: sets the camera's x position.
Try it: set camera x to (0)
Watch out: this replaces the camera's old x position.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0137-DOC — set camera y to (0)
What it does: sets the camera's y position.
Try it: set camera y to (0)
Watch out: this replaces the camera's old y position.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0138-DOC — change camera x by (10)
What it does: moves the camera left or right by a chosen amount.
Try it: change camera x by (10)
Watch out: this adds to the old x position.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0139-DOC — change camera y by (10)
What it does: moves the camera up or down by a chosen amount.
Try it: change camera y by (10)
Watch out: this adds to the old y position.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0140-DOC — set camera zoom to (100)%
What it does: sets how close or far away the camera view looks.
Try it: set camera zoom to (100)%
Watch out: this sets the zoom to a value; it does not move the camera.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0141-DOC — change camera zoom by (10)
What it does: changes the current camera zoom by a chosen amount.
Try it: change camera zoom by (10)
Watch out: this adds to the old zoom value.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0142-DOC — move camera to [myself]
What it does: moves the camera view to the chosen target.
Try it: move camera to [myself]
Watch out: choose a target that exists in the project.
Proof: SOURCE-VERIFIED for block type, label, and menu choice; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and listed menu. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Camera and behavior descriptions use their labels only; runtime remains NOT-TESTED. No bug found.
