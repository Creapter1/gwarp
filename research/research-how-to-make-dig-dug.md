# Research: how to make a Dig Dug-style digging game
Genre: tunnel-digging arcade

## What the game is
The player digs tunnels through the ground and fills them with enemies. The player can pump up enemies to pop them, or drop a rock on them from above. The goal is to clear every enemy in each level.

## Characters and enemies
- **Digger**: the player. Moves in four directions and digs through dirt as it walks.
- **Pookas**: round enemies that walk through the tunnels toward the player.
- **Fygars**: enemies that walk through the tunnels and breathe fire in one direction.
- **Rocks**: fall when the ground under them is removed, and crush enemies below.

## Step by step
1. Draw a grid of dirt cells, with a few empty cells to start.
2. Move the digger one cell at a time. When it moves into dirt, turn that cell empty.
3. Place enemies in the dirt, in set spots.
4. Move each enemy toward the digger along the empty cells, using a simple path rule.
5. Add a pump action: a short line that extends from the digger. Pop an enemy it touches.
6. Add rocks. A rock falls when the cell below it is empty, and crushes any enemy it lands on.
7. Lose a life when an enemy touches the digger.
8. Add points for each enemy, with more for a rock kill.
9. End the level when every enemy is gone, then show the next, larger map.

## What to add
- A short pause after a death, before the level restarts.
- Ghost mode for enemies that move through dirt when they are out of tunnels.

## What not to add
- A large number of enemy types in the first version.
- Many digging tools. One pump is enough.

## Pitfalls
- A rock that falls on the digger at the wrong moment feels unfair. Give the player a warning first.
- Enemies that get stuck behind rocks can block the level. Give each level a route.

## Suggested scope for a prototype
A dirt grid, a digger that clears dirt, two enemy types, a pump to pop enemies, rocks, lives, a score and a level end.

## Notes
Written from general knowledge of the genre, without web checks.
