# L3-BLOCKS report — BLK-0073-DOC to BLK-0082-DOC

Branch: ai-team
Result: 10 kid-help cards drafted and source labels checked. No app or runtime files changed.

## Priority terminal work
Earlier open PAR/EDGE/SAVE jobs still need the qa-kit compare/roundtrip tools and Scratch VM. Local dependencies remain unavailable; no terminal tests were run and those jobs remain open/unmarked. Evidence: NOT-TESTED.

## Help cards

### BLK-0073-DOC — [x position] of [_stage_]
What it does: reports a chosen property of the selected sprite or stage.
Try it: when green flag clicked → say ([x position] of [_stage_])
Watch out: choose the property and item you want from the menus.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0074-DOC — ask (What's your name?) and wait
What it does: asks a question and waits for you to type an answer.
Try it: ask (What is your favorite color?) and wait → say (answer)
Watch out: use pretend answers; never type passwords or private details.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0075-DOC — set drag mode [draggable]
What it does: lets you choose whether this sprite can be dragged on the stage.
Try it: when green flag clicked → set drag mode [not draggable]
Watch out: choose draggable when you want to move the sprite with the mouse.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0076-DOC — answer
What it does: reports the last answer typed after an ask block.
Try it: ask (What is your favorite color?) and wait → say (answer)
Watch out: answer is ready after the ask block finishes waiting.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0077-DOC — reset timer
What it does: starts the timer count again from zero.
Try it: when green flag clicked → reset timer → wait (2) seconds → say (timer)
Watch out: reset timer changes the count; it does not pause the script.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0078-DOC — timer
What it does: reports how many seconds have passed since the timer reset.
Try it: when green flag clicked → reset timer → wait (2) seconds → say (timer)
Watch out: the number keeps changing while time passes.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0079-DOC — username
What it does: reports the current user's name when one is available.
Try it: when green flag clicked → say (username)
Watch out: do not share your account name in a public project.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0080-DOC — current time
What it does: reports the current time.
Try it: when green flag clicked → say (current time)
Watch out: the value changes as time passes.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

### BLK-0081-DOC — current [YEAR]
What it does: reports the date or time part you choose.
Try it: when green flag clicked → say (current [YEAR])
Watch out: choose YEAR, MONTH, DATE, DAYOFWEEK, HOUR, MINUTE, or SECOND from the menu.
Proof: SOURCE-VERIFIED for block type, label, and menu choices; runtime behavior NOT-TESTED.

### BLK-0082-DOC — days since 2000
What it does: reports how many days have passed since the start of 2000.
Try it: when green flag clicked → say (days since 2000)
Watch out: this number grows by one each day.
Proof: SOURCE-VERIFIED for block type and label; runtime behavior NOT-TESTED.

## Source and verification
The current ai-team team/ai-team/gwrap-blocks.json defines the matching types, categories, shapes, labels, and listed menu choices. The job definitions are in team/ai-team/CHATGPT-JOBS.md. Card behavior descriptions use standard Scratch block meanings; no runtime behavior was tested. No bug found.
