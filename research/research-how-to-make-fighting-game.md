# Research: how to make a fighting game
Genre: 2D one-on-one fighter

## What the game is
Two characters face each other on a flat stage. Each has a health bar. Players move, jump, block, and throw punches and kicks. A hit lowers the other fighter's health. The first to reduce the other to zero wins the round, and the match is usually the best of three.

## Core mechanics to build
1. **Movement**: walk, jump and crouch. Keep facing toward the opponent.
2. **Move states**: model each attack as a state with startup frames (windup), active frames (hitbox out), and recovery frames (the fighter is stuck). Hit detection only runs during the active frames.
3. **Hitboxes and hurtboxes**: attacks create a hitbox. Each body has a hurtbox. A hit happens when they overlap during the active frames.
4. **Hit response**: on a hit, apply damage, a short hit-stun pause, and knockback.
5. **Blocking**: holding back blocks, which reduces or removes damage. Add a chip-damage option if you want it.
6. **Input buffer**: keep the last few inputs, so a button pressed just before recovery ends still counts.
7. **Round logic**: track the health of each fighter and the round wins. Reset positions between rounds.

## How to build a first version
- Make two fighters that walk and jump, and face each other.
- Add one punch with frame data (startup, active, recovery) and the hit-stun.
- Add blocking, the input buffer, and the round and match logic.

## Pitfalls
- Hit detection that runs during recovery makes attacks feel unfair. Only check the active frames.
- Both fighters hitting on the same frame needs a rule, or the result depends on update order.
- Without hit-stun, combos are impossible to read. Add a short pause on impact.

## Suggested scope for a prototype
Two fighters on one stage, walk and jump, one punch with frame data, hit-stun, health and best-of-three rounds. Blocking and combos come later.

## Notes
Written from general knowledge of the genre, without web checks. Frame counts are starting points and should be tuned by playing.
