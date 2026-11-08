# L3-BLOCKS report — BLK-0113-DOC to BLK-0122-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0113-DOC — hide list [my list]
What it does: hides the chosen list from the stage.
Try it: hide list [my list]
Watch out: hiding a list does not delete its values.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0114-DOC — item (1) of [my list]
What it does: reports the value at one position in a list.
Try it: when green flag clicked → say (item (1) of [my list])
Watch out: list positions start at 1.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0115-DOC — [my list]
What it does: reports the contents of the chosen list.
Try it: when green flag clicked → say ([my list])
Watch out: a long list can make a long answer.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0116-DOC — length of [my list]
What it does: reports how many items are in the chosen list.
Try it: when green flag clicked → say (length of [my list])
Watch out: it counts items, not letters inside an item.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0117-DOC — [my list] contains (item)?
What it does: checks whether the chosen list has that value.
Try it: if ([my list] contains (apple)?) then → say (Found an apple!)
Watch out: the block gives a true or false answer.
Proof: SOURCE-VERIFIED for block type, label, and list menu; runtime behavior NOT-TESTED.

### BLK-0118-DOC — define (do something) args ()
What it does: defines your own block and the steps inside it.
Try it: define (dance) args () → move (10) steps
Watch out: defining a block does not run it; use its matching call block.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0119-DOC — call (do something) args ()
What it does: runs the custom block you defined.
Try it: call (dance) args ()
Watch out: the custom block must be defined first.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0120-DOC — value of [my variable]
What it does: reports the current value of a variable.
Try it: when green flag clicked → say (value of [my variable])
Watch out: it reads the value; it does not change it.
Proof: SOURCE-VERIFIED for block type, label, and variable menu; runtime behavior NOT-TESTED.

### BLK-0121-DOC — set [my variable] to (0)
What it does: gives a variable an exact value.
Try it: when green flag clicked → set [my variable] to (0)
Watch out: set replaces the old value.
Proof: SOURCE-VERIFIED for block type, label, and variable menu; runtime behavior NOT-TESTED.

### BLK-0122-DOC — change [my variable] by (1)
What it does: adds a number to the variable's current value.
Try it: when green flag clicked → change [my variable] by (1)
Watch out: change adds to the old value instead of replacing it.
Proof: SOURCE-VERIFIED for block type, label, and variable menu; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and menus. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch list/variable meanings; runtime remains NOT-TESTED. No bug found.
