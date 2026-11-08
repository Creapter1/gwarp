# L3-BLOCKS report — BLK-0033-DOC to BLK-0042-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
The earlier open PAR/EDGE/SAVE jobs need the qa-kit compare/roundtrip tools and Scratch VM. Local dependencies remain unavailable, so no terminal test was run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0033-DOC — change [color] effect by (25)
What it does: changes one visual effect by the number you choose.
Try it: when green flag clicked → change [color] effect by (25)
Watch out: this changes the current effect; clear graphic effects resets visual effects.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0034-DOC — go to [front] layer
What it does: puts your sprite in front of the other sprites.
Try it: when green flag clicked → go to [front] layer
Watch out: this changes which sprite covers another, not where they are.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0035-DOC — go [forward] (1) layers
What it does: moves your sprite forward or backward in the drawing order.
Try it: when green flag clicked → go [forward] (1) layers
Watch out: it changes overlap order, not the sprite's position on the stage.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0036-DOC — costume #
What it does: reports the number of the sprite's current costume.
Try it: when green flag clicked → next costume → say (costume #)
Watch out: the number follows the costume list order.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0037-DOC — costume name
What it does: reports the name of the sprite's current costume.
Try it: when green flag clicked → say (costume name)
Watch out: it tells the costume's name, not what the picture looks like.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0038-DOC — size
What it does: reports your sprite's size as a percent.
Try it: when green flag clicked → set size to (80)% → say (size)
Watch out: 100% is the sprite's original size.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0039-DOC — play sound [Zap] until done
What it does: plays a sound and waits until it finishes.
Try it: when green flag clicked → play sound [Zap] until done → say (Done!)
Watch out: blocks after it wait for the whole sound to finish.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0040-DOC — start sound [Zap]
What it does: starts playing a sound while your script keeps going.
Try it: when green flag clicked → start sound [Zap] → say (Sound started!)
Watch out: the next block runs right away; it does not wait for the sound to end.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0041-DOC — stop all sounds
What it does: stops every sound that is playing.
Try it: when green flag clicked → stop all sounds
Watch out: it stops sounds from all sprites, not only this sprite.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0042-DOC — set [pitch] effect to (100)
What it does: sets the sound's pitch effect to the number you choose.
Try it: when green flag clicked → set [pitch] effect to (100) → play sound [Zap] until done
Watch out: 100 is the normal pitch; smaller or bigger numbers change it.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the ten matching types, categories, shapes, and display labels. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch block meanings; no runtime behavior was tested. No bug found.
