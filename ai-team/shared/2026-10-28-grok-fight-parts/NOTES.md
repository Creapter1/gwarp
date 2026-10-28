# Fight game parts (Grok, 2026-10-28)

Owner ask: the in-app AI should know how to build the fighting game little by little. Say "load part 1 of a fighting game" and only that part is built.

## Files
- `fight-game-parts.json` — knowledge pack. Format matches `claude/gwrap-pack.json`.

## Check
```
python3 ai-team/tools/validate_gwrap_pack.py ai-team/shared/2026-10-28-grok-fight-parts/fight-game-parts.json ai-team/gwrap-blocks.json claude/gwrap-pack.json
```
Result when written: PASS. 10 recipes, 5 tips, 0 errors, 0 warnings.

## Parts
1. One fighter stands on the floor
2. Walk left and right
3. Jump and gravity (`y speed`)
4. Two clones, `player id` for this sprite only
5. Punch on X (`punching`)
6. Damage when a punch touches the other fighter
7. Launch (`x speed`)
8. Lives, and falling off the side
9. Shield on the down arrow
10. Computer copy steps toward the middle

## Example project (not pasted into the pack)
The owner's remix keeps shared facts in Stage lists, spot = player number:
X positions, Y Positions, Lives, Damage, Shielding, Shield HP, Hit X, Hit Y, Hit Dmg, FX Type/X/Y/Dir.
Speed, timers, and keys stay as variables on each clone. Do not fold those into one local list. That broke a test copy.

Keys in the example: arrows or J/L walk, I or up jump, X swing, Z low slash, X+down smash, C or down shield.

Evidence: block types were checked against `ai-team/gwrap-blocks.json`. Button clicks inside the live app were not run. These scripts were not executed in G-Warp.
