# L3-BLOCKS report — BLK-0103-DOC to BLK-0112-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0103-DOC — next backdrop
What it does: changes the stage to the next backdrop in its list.
Try it: when green flag clicked → next backdrop
Watch out: it goes back to the first backdrop after the last one.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0104-DOC — backdrop #
What it does: reports the number of the stage's current backdrop.
Try it: when green flag clicked → next backdrop → say (backdrop #)
Watch out: the number follows the order of the backdrop list.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0105-DOC — backdrop name
What it does: reports the name of the stage's current backdrop.
Try it: when green flag clicked → say (backdrop name)
Watch out: it reports the backdrop's name, not what the picture shows.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0106-DOC — set backdrop color to (#ffffff)
What it does: sets the stage backdrop color to the color you choose.
Try it: when green flag clicked → set backdrop color to (#ff0000)
Watch out: this changes the stage background color, not a sprite's costume.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0107-DOC — add (item) to [my list]
What it does: adds a new value to the end of a list.
Try it: when green flag clicked → add (apple) to [my list]
Watch out: each new item goes after the current last item.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0108-DOC — delete item (1) of [my list]
What it does: removes the item at the position you choose.
Try it: delete item (1) of [my list]
Watch out: list positions start at 1, and the other items move up after one is deleted.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0109-DOC — insert (item) at (1) of [my list]
What it does: puts a new value at the position you choose in a list.
Try it: insert (banana) at (1) of [my list]
Watch out: list positions start at 1; items after that position move down.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0110-DOC — replace item (1) of [my list] with (item)
What it does: changes the value at one list position.
Try it: replace item (1) of [my list] with (pear)
Watch out: it replaces an item; it does not add a new position.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0111-DOC — delete all of [my list]
What it does: clears every value from the chosen list.
Try it: delete all of [my list]
Watch out: this clears the whole list, not just one item.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0112-DOC — show list [my list]
What it does: shows the chosen list on the stage.
Try it: show list [my list]
Watch out: showing the list does not change its values.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and listed menus. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch list/backdrop meanings; runtime remains NOT-TESTED. No bug found.
