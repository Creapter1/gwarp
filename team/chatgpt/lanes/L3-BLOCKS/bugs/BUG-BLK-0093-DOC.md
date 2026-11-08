Title: Multiple operator inventory labels may duplicate default values
Job: BLK-0093-DOC (related: BLK-0097-DOC, BLK-0098-DOC, BLK-0100-DOC, BLK-0101-DOC) | G-Warp version: unknown; current ai-team app.html could not be fetched because the GitHub file response is too large.
Steps:
1. Read team/ai-team/gwrap-blocks.json on ai-team.
2. Inspect the named block text fields at lines 1006, 1057, 1066, 1084, and 1093.
3. Compare each field with its declared input count.
Expected (assumption to verify): a block label shows each input placeholder once, without an extra adjacent copy of its default value.
Actual source text:
- op_mod: "10(10) mod 3(3)" (2 inputs)
- op_join: "join hello (hello ) world(world)" (2 inputs)
- op_length: "length of hello(hello)" (1 input)
- op_letter: "1(1) letter of hello(hello)" (2 inputs)
- op_random: "pick random 1(1) to 10(10)" (2 inputs)
Proof: SOURCE-VERIFIED catalog blob c9eb64716e6427674a72509028a63d1c131f1740, lines 1006, 1057, 1066, 1084, 1093. App/runtime display is NOT-TESTED.
Severity: P3 — unconfirmed catalog anomaly. Claude should check the actual UI before deciding whether to fix it.
