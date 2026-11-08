# L3-BLOCKS report — BLK-0173-DOC to BLK-0176-DOC

Branch: ai-team
Result: Four final DOC cards drafted. Three rows are [x]; BLK-0176-DOC is [~] with one P3 source-anomaly report. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need qa-kit compare/roundtrip and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0173-DOC — set scroll x: (0) y: (0)
What it does: sets the physics world scroll position.
Try it: set scroll x: (0) y: (0)
Watch out: this changes the view's scroll position, not a sprite's x/y position.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0174-DOC — change scroll by x: (0) y: (0)
What it does: moves the physics world scroll by chosen x and y amounts.
Try it: change scroll by x: (10) y: (0)
Watch out: this adds to the current scroll position.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0175-DOC — set background color to (#ffffff)
What it does: changes the camera view's background color.
Try it: set background color to (#87ceeb)
Watch out: this colors the background behind the view; it does not recolor a sprite.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0176-DOC — switch (plane_) to closest (...) using angles (...)
What it does: switches the plane to a costume whose angle is closest to the chosen direction.
Try it: switch (plane_) to closest (90) using angles (...)
Watch out: check the angle list; the current source label ends with an unfinished comma (see team/chatgpt/lanes/L3-BLOCKS/bugs/BUG-BLK-0176-DOC.md).
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Potential source-label issue
The angle_costume entry in team/ai-team/gwrap-blocks.json line 1961 ends its text with “-160,”. The text looks incomplete, but actual UI rendering was not confirmed. GitHub could not fetch the oversized app.html; see team/chatgpt/lanes/L3-BLOCKS/bugs/BUG-BLK-0176-DOC.md.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json blob is c9eb64716e6427674a72509028a63d1c131f1740. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Camera/scroll descriptions use their labels only; runtime remains NOT-TESTED. No confirmed app bug.
