# L3-BLOCKS report — BLK-0043-DOC to BLK-0052-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
The earlier open PAR/EDGE/SAVE jobs still require the qa-kit compare/roundtrip tools and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0043-DOC — change [pitch] effect by (10)
What it does: raises or lowers the pitch effect on the sound.
Try it: when green flag clicked → change [pitch] effect by (10) → play sound [Zap] until done
Watch out: this changes the current pitch effect; use clear sound effects to reset it.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0044-DOC — clear sound effects
What it does: resets the sound's effects to normal.
Try it: when green flag clicked → clear sound effects → play sound [Zap] until done
Watch out: it resets sound effects; it does not stop the sound.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0045-DOC — change volume by (-10)
What it does: makes the sprite's sounds louder or quieter.
Try it: when green flag clicked → change volume by (-10)
Watch out: this adds to the current volume each time it runs.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0046-DOC — set volume to (100)%
What it does: sets the loudness of the sprite's sounds.
Try it: when green flag clicked → set volume to (50)%
Watch out: this replaces the old volume; 0 is silent and 100 is full volume.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0047-DOC — volume
What it does: reports the current sound volume as a percent.
Try it: when green flag clicked → set volume to (50)% → say (volume)
Watch out: it reports the current volume; it does not change it.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0048-DOC — when clicked
What it does: starts this script when you click the green flag.
Try it: when green flag clicked → say (Hello!)
Watch out: put the blocks you want to run below this hat.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0049-DOC — when key [space] pressed
What it does: starts this script when you press the chosen key.
Try it: when key [space] pressed → move (10) steps
Watch out: choose the key that should start the script.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0050-DOC — when this sprite clicked
What it does: starts this script when you click this sprite.
Try it: when this sprite clicked → say (You found me!)
Watch out: click the sprite on the stage, not its block in the code area.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0051-DOC — broadcast [message1]
What it does: sends a signal that other scripts can hear.
Try it: when green flag clicked → broadcast [message1]
Watch out: another script needs a matching when I receive hat to respond.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0052-DOC — broadcast [message1] and wait
What it does: sends a signal and waits for the matching scripts to finish.
Try it: when green flag clicked → broadcast [message1] and wait → say (Done!)
Watch out: it only waits for scripts started by that message.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the ten matching types, categories, shapes, and display labels. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch block meanings; no runtime behavior was tested. No bug found.
