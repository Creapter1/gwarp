# L3-BLOCKS report — BLK-0063-DOC to BLK-0072-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need the qa-kit compare/roundtrip tools and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0063-DOC — stop [all]
What it does: stops the script or scripts you choose.
Try it: when green flag clicked → stop [all]
Watch out: [all] stops the project scripts; other choices stop fewer scripts.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0064-DOC — create clone of [myself]
What it does: makes a copy of the sprite.
Try it: when green flag clicked → create clone of [myself]
Watch out: the clone can run its own when I start as a clone script.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0065-DOC — delete this clone
What it does: removes the clone that is running this block.
Try it: when I start as a clone → delete this clone
Watch out: it removes the clone, not the original sprite.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0066-DOC — touching [mouse-pointer]?
What it does: checks whether your sprite touches the selected target.
Try it: if <touching [mouse-pointer]?> then → say (Found you!)
Watch out: the menu also lets you check the edge.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0067-DOC — key [space] pressed?
What it does: checks whether the chosen key is being held down.
Try it: forever → if <key [space] pressed?> then → move (10) steps
Watch out: it stays true while the key is held.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0068-DOC — mouse down?
What it does: checks whether the mouse button is held down.
Try it: forever → if <mouse down?> then → say (Click!)
Watch out: it checks a held button, not just a quick click.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0069-DOC — mouse x
What it does: reports the mouse pointer's left/right position on the stage.
Try it: when green flag clicked → say (mouse x)
Watch out: x = 0 is the middle; positive numbers are right and negative numbers are left.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0070-DOC — mouse y
What it does: reports the mouse pointer's up/down position on the stage.
Try it: when green flag clicked → say (mouse y)
Watch out: y = 0 is the middle; positive numbers are up and negative numbers are down.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0071-DOC — touching sprite [mouse-pointer]?
What it does: checks whether your sprite touches the selected target.
Try it: if <touching sprite [mouse-pointer]?> then → say (We touched!)
Watch out: choose the target from the menu.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0072-DOC — distance to [mouse-pointer]
What it does: reports how far your sprite is from the selected target.
Try it: when green flag clicked → say (distance to [mouse-pointer])
Watch out: the number changes as either the sprite or target moves.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and listed menu choices. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch block meanings; no runtime behavior was tested. No bug found.
