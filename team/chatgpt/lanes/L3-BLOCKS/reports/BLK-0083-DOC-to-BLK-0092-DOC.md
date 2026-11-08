# L3-BLOCKS report — BLK-0083-DOC to BLK-0092-DOC

Branch: ai-team
Result: 10 kid-help cards drafted. Eight rows are [x]; BLK-0084-DOC and BLK-0088-DOC are [~] with two P3 source-anomaly reports. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need the qa-kit compare/roundtrip tools and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0083-DOC — () + ()
What it does: adds two values and reports the total.
Try it: when green flag clicked → say (2 + 3)
Watch out: the values go on the left and right of the plus sign.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0084-DOC — () > 50(50)
What it does: checks whether the left value is bigger than the right value.
Try it: if (7 > 5) then → say (Seven is bigger!)
Watch out: the block gives a true or false answer; source label needs review (see BUG-BLK-0084-DOC.md).
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0085-DOC — () < (50)
What it does: checks whether the left value is smaller than the right value.
Try it: if (3 < 5) then → say (Three is smaller!)
Watch out: the block gives a true or false answer.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0086-DOC — () − ()
What it does: subtracts the right value from the left value.
Try it: when green flag clicked → say (10 − 4)
Watch out: changing the order changes the answer.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0087-DOC — () × ()
What it does: multiplies two values.
Try it: when green flag clicked → say (3 × 4)
Watch out: multiplication is repeated addition; 3 × 4 means four groups of three.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0088-DOC — () ÷ 1(1)
What it does: divides the left value by the right value.
Try it: when green flag clicked → say (12 ÷ 3)
Watch out: check the second value; the source label needs review (see BUG-BLK-0088-DOC).
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0089-DOC — () = ()
What it does: checks whether two values are equal.
Try it: if (2 = 2) then → say (They match!)
Watch out: the block gives a true or false answer.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0090-DOC — and
What it does: is true only when both conditions are true.
Try it: if <key [space] pressed? and <touching [edge]?> then → say (Both!)
Watch out: both conditions must be true.
Proof: SOURCE-VERIFIED for block type and condition slot; runtime behavior NOT-TESTED.

### BLK-0091-DOC — or
What it does: is true when either condition, or both, are true.
Try it: if <key [space] pressed? or <mouse down?>> then → say (One or both!)
Watch out: one true condition is enough.
Proof: SOURCE-VERIFIED for block type and condition slot; runtime behavior NOT-TESTED.

### BLK-0092-DOC — not
What it does: flips a condition: true becomes false, and false becomes true.
Try it: if <not <mouse down?>> then → say (Mouse is up!)
Watch out: not changes the condition's answer; it does not change the condition itself.
Proof: SOURCE-VERIFIED for block type and condition slot; runtime behavior NOT-TESTED.

## Potential source-label issues
The block inventory text at team/ai-team/gwrap-blocks.json lines 925 and 961 is "() > 50(50)" for op_gt and "() ÷ 1(1)" for op_div, although both blocks declare two inputs. These look like duplicated default values, but actual display was not confirmed. GitHub's current app.html fetch failed with HTTP 400 because the file is too large; no UI behavior is claimed. Two P3 reports ask for runtime confirmation.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json blob is c9eb64716e6427674a72509028a63d1c131f1740. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch operator meanings; runtime remains NOT-TESTED. No confirmed app bug.
