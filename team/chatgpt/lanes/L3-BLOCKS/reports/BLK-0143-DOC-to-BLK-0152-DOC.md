# L3-BLOCKS report — BLK-0143-DOC to BLK-0152-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0143-DOC — move camera (10) steps
What it does: moves the camera view forward by the chosen number of steps.
Try it: move camera (10) steps
Watch out: this moves what you see, not the sprite itself.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0144-DOC — set camera direction to (90)
What it does: sets the direction the camera view points.
Try it: set camera direction to (90)
Watch out: this turns the view; it does not turn your sprite.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0145-DOC — turn camera clockwise (15) degrees
What it does: turns the camera view clockwise by the chosen amount.
Try it: turn camera clockwise (15) degrees
Watch out: this changes the view angle, not the sprite's direction.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0146-DOC — turn camera counterclockwise (15) degrees
What it does: turns the camera view counterclockwise by the chosen amount.
Try it: turn camera counterclockwise (15) degrees
Watch out: this changes the view angle, not the sprite's direction.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0147-DOC — set layer of [myself] to (1)
What it does: sets which drawing layer the chosen sprite uses.
Try it: set layer of [myself] to (1)
Watch out: layers control which things appear in front of others.
Proof: SOURCE-VERIFIED for block type, label, and menu choice; runtime behavior NOT-TESTED.

### BLK-0148-DOC — set frame rate to (60)
What it does: sets how many game frames run each second.
Try it: set frame rate to (60)
Watch out: frame rate changes how often the game updates, not the sprite's size.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0149-DOC — set stage size width: (480) height: (360)
What it does: sets the stage's width and height.
Try it: set stage size width: (480) height: (360)
Watch out: changing the stage size changes the play area.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0150-DOC — stop sound []
What it does: stops the sound you choose.
Try it: stop sound [Zap]
Watch out: choose the sound you want to stop.
Proof: SOURCE-VERIFIED for block type, label, and sound menu; runtime behavior NOT-TESTED.

### BLK-0151-DOC — start looping [] from (0) s
What it does: starts playing a sound again and again from the chosen time.
Try it: start looping [Zap] from (0) s
Watch out: stop the sound when you want the loop to end.
Proof: SOURCE-VERIFIED for block type, label, and sound menu; runtime behavior NOT-TESTED.

### BLK-0152-DOC — press key [space] for (0.1) seconds [without waiting]
What it does: sends a chosen key press into the project for a short time.
Try it: press key [space] for (0.1) seconds [and wait]
Watch out: and wait pauses this script for the key press; without waiting lets it continue.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and listed menus. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Camera, frame-rate, stage-size, audio-loop, and key-simulation behavior is based on the labels only; runtime remains NOT-TESTED. No bug found.
