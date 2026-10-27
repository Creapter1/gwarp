# Research: how to make Asteroids
Genre: vector-style space shooter

## What the game is
The player flies a ship in an open space. Floating asteroids drift across the screen. The ship shoots them, and each large asteroid breaks into smaller ones. The screen wraps around at the edges. The player clears each wave and tries to survive.

## Core mechanics to build
1. **Ship physics**: rotate with left and right keys. Thrust adds acceleration along the facing direction. Add slight drag so the ship slows down over time.
2. **Wrap-around**: when an object leaves one edge, move it to the opposite edge. Use the same rule for asteroids, bullets and the ship.
3. **Bullets**: spawn at the ship's nose with the ship's velocity plus a fixed speed. Remove each bullet after a short lifetime.
4. **Asteroids**: give each a random velocity and spin. Split a large asteroid into two smaller ones when shot, and remove the small ones entirely.
5. **Collisions**: use circle-to-circle checks for asteroids against bullets and the ship. Keep a short invulnerable time after respawn.
6. **Waves and lives**: when the field is clear, spawn more asteroids. Give the player a few lives.

## How to build a first version
- Draw the ship as a triangle, with rotation and thrust.
- Add wrap-around and one bullet type.
- Add one large asteroid that splits, then lives, waves and the score.

## Pitfalls
- Forgetting wrap-around on bullets makes them vanish at the edge, which feels wrong.
- Spawning a new asteroid on top of the ship causes an instant death. Spawn away from the centre.
- Frame-rate-dependent thrust makes the ship fly differently on different screens. Scale movement by delta time.

## Suggested scope for a prototype
One ship, wrap-around, shooting, one asteroid that splits into two smaller ones, lives and a score.

## Notes
Written from general knowledge of the genre, without web checks.
