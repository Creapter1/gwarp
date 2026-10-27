# Research: how to make a Mario-style platformer
Genre: 2D side-scrolling platformer

## What the game is
The player runs and jumps across side-scrolling levels made of ground, platforms and gaps. Enemies walk back and forth, and the player defeats them by jumping on top. Coins, power-ups and a goal at the end of each level give the player something to aim for. Falling into a gap or touching an enemy from the side costs a life.

## Core mechanics to build
1. **Tile map**: store each level as a grid of tiles. Solid tiles block movement, and empty tiles let the player through. Tile data is easy to edit and draw.
2. **Physics**: a horizontal acceleration with friction, gravity, and a jump with variable height (release the button early to cut the jump short). Clamp the maximum fall speed.
3. **Tile collision**: resolve the player's box against the tiles in x and y separately. This prevents tunnelling and corner snags.
4. **Enemies**: simple walkers that reverse at walls or ledges. Stomping from above defeats them. Contact from the side hurts the player.
5. **Camera**: follow the player with a dead zone, and clamp it to the level bounds.
6. **Level end**: a flagpole or door that loads the next level.
7. **Power-ups**: an optional extra state (small, big) that changes the hitbox and absorbs one hit.

## How to build a first version
- Make one level from a tile array. Draw the tiles and move the player with gravity and a jump.
- Add the tile collision and the variable-height jump. Check that the player does not get stuck on the edges.
- Add one walking enemy with the stomp rule, then the camera, then the level end.

## Pitfalls
- Resolving x and y together lets the player fall through corners. Resolve each axis separately.
- A fixed jump height with no early release feels floaty or heavy. Use gravity and an early-release cut.
- Enemies that fall off ledges need a ledge check, or they walk into the void.
- Stomp detection must check that the player is falling onto the enemy, or the player takes damage when jumping through it.

## Suggested scope for a prototype
One tile-map level, a player with run and jump, one walking enemy with stomp, a coin count and a goal tile. Power-ups and more levels come later.

## Notes
Written from general knowledge of the genre, without web checks. The jump and friction numbers are starting points to tune by playing.
