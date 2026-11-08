# L3-BLOCKS report — BLK-0123-DOC to BLK-0132-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0123-DOC — show variable [my variable]
What it does: shows the chosen variable's value on the stage.
Try it: show variable [my variable]
Watch out: showing the value does not change it.
Proof: SOURCE-VERIFIED for block type, label, and variable menu; runtime behavior NOT-TESTED.

### BLK-0124-DOC — hide variable [my variable]
What it does: hides the chosen variable's display from the stage.
Try it: hide variable [my variable]
Watch out: hiding the display does not erase the value.
Proof: SOURCE-VERIFIED for block type, label, and variable menu; runtime behavior NOT-TESTED.

### BLK-0125-DOC — set tile at row (0) col (0) to tile (1) [solid]
What it does: puts a chosen tile at a row and column in the tile map.
Try it: set tile at row (0) col (0) to tile (1) [solid]
Watch out: the row, column, and layer menu each choose a different part of the map.
Proof: SOURCE-VERIFIED for block type, label, and layer menu; runtime behavior NOT-TESTED.

### BLK-0126-DOC — tile at row (0) col (0) [solid]
What it does: reports which tile is at a row and column in a chosen layer.
Try it: when green flag clicked → say (tile at row (0) col (0) [solid])
Watch out: choose the same row, column, and layer you want to check.
Proof: SOURCE-VERIFIED for block type, label, and layer menu; runtime behavior NOT-TESTED.

### BLK-0127-DOC — tile at row (0) col (0) is solid? [solid]
What it does: checks whether the tile at that map spot is solid.
Try it: if <tile at row (0) col (0) is solid? [solid]> then → say (Wall!)
Watch out: the answer is true or false; choose the tile layer from the menu.
Proof: SOURCE-VERIFIED for block type, label, and layer menu; runtime behavior NOT-TESTED.

### BLK-0128-DOC — clear tilemap layer [solid]
What it does: clears all tiles from the chosen tile map layer.
Try it: clear tilemap layer [solid]
Watch out: choose the layer you want to clear.
Proof: SOURCE-VERIFIED for block type, label, and layer menu; runtime behavior NOT-TESTED.

### BLK-0129-DOC — touching a tile?
What it does: checks whether your sprite is touching a tile.
Try it: if <touching a tile?> then → say (On a tile!)
Watch out: set up tiles on the map before checking them.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0130-DOC — behavior attribute (speed)
What it does: reports the value of a behavior setting.
Try it: when green flag clicked → say (behavior attribute (speed))
Watch out: use the name of a behavior setting your sprite has.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0131-DOC — set behavior attribute (speed) to (5)
What it does: sets a behavior setting to an exact value.
Try it: set behavior attribute (speed) to (5)
Watch out: this replaces the old value.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0132-DOC — change behavior attribute (speed) by (1)
What it does: adds to a behavior setting's current value.
Try it: change behavior attribute (speed) by (1)
Watch out: change adds to the old value; set replaces it.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and listed menus. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Tile-map and behavior descriptions are based on their names and labels only; no runtime behavior was tested. No bug found.
