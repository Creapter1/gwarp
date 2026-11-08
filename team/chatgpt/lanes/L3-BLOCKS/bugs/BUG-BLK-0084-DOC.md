Title: Greater-than block inventory label may duplicate its right input
Job: BLK-0084-DOC | G-Warp version: unknown (current ai-team app.html could not be fetched; GitHub reported the file is too large)
Steps:
1. Read team/ai-team/gwrap-blocks.json on ai-team, line 925.
2. Inspect the object with type op_gt.
3. Its text field is "() > 50(50)" and it declares inputs: 2.
Expected (assumption to verify): one clear right-hand numeric input, without duplicated default text.
Actual: the inventory text contains an extra-looking "50" adjacent to "(50)".
Proof: SOURCE-VERIFIED catalog blob c9eb64716e6427674a72509028a63d1c131f1740, line 925. App/runtime rendering is NOT-TESTED.
Severity: P3 — small and unconfirmed. Claude should check the actual block before changing anything.
