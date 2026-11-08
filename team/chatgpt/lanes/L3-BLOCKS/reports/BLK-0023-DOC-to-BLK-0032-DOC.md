# L3-BLOCKS report — BLK-0023-DOC to BLK-0032-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
The earlier open PAR/EDGE/SAVE jobs need the qa-kit compare/roundtrip tools and Scratch VM. The local clones are on haiku-work and main, not ai-team; their qa-kit node_modules folders are absent. No network dependencies were installed and no terminal test was run. BLK-0013-PAR/EDGE/SAVE, BLK-0014-PAR/EDGE/SAVE, BLK-0015-PAR/EDGE/SAVE, and BLK-0016-PAR remain open and unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0023-DOC — switch costume to [costume1]
What it does: changes your sprite to the costume you choose.
Try it: when green flag clicked → switch costume to [costume1]
Watch out: choose a costume that this sprite already has.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0024-DOC — next costume
What it does: changes your sprite to the next costume in its list.
Try it: when green flag clicked → next costume
Watch out: it returns to the first costume after the last one.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0025-DOC — change size by (10)
What it does: makes your sprite a little bigger or smaller.
Try it: when green flag clicked → change size by (10)
Watch out: this adds to the current size each time it runs.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0026-DOC — set size to (100)%
What it does: sets your sprite to an exact size.
Try it: when green flag clicked → set size to (100)%
Watch out: it replaces the old size instead of adding to it.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0027-DOC — show
What it does: makes your sprite visible again.
Try it: when green flag clicked → show
Watch out: show does not move your sprite or start its scripts.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0028-DOC — hide
What it does: makes your sprite invisible.
Try it: when green flag clicked → hide
Watch out: hiding the sprite does not stop its scripts from running.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0029-DOC — change ghost effect by (10)%
What it does: makes your sprite more or less see-through.
Try it: when green flag clicked → change ghost effect by (10)%
Watch out: repeated changes can make your sprite hard to see.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0030-DOC — set ghost effect to (0)%
What it does: sets how see-through your sprite looks.
Try it: when green flag clicked → set ghost effect to (50)%
Watch out: 0% is solid; a higher ghost value looks more see-through.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0031-DOC — clear graphic effects
What it does: resets your sprite's visual effects to normal.
Try it: when green flag clicked → clear graphic effects
Watch out: this resets effects, but it does not change your costume or position.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0032-DOC — set [color] effect to (0)
What it does: sets the chosen look effect to a number you pick.
Try it: when green flag clicked → set [color] effect to (25)
Watch out: 0 resets that effect; set changes it to the chosen value.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the ten matching types, categories, shapes, and display labels. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch block meanings; no runtime behavior was tested. No bug found.
