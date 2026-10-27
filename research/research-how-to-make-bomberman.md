# Research: how to make Bomberman
Genre: grid-based maze bomber

## What the game is
The player places bombs in a tiled arena. Bombs explode in a cross shape, destroying soft blocks and hurting enemies. Some soft blocks hide power-ups. The goal is to clear the level's enemies and reach the exit.

## Characters and enemies
- **Player**: moves one tile at a time, places a bomb, and has a blast range and bomb count that power-ups increase.
- **Enemies**: simple walkers that turn at walls. Some move randomly, and some chase the player.
- **Soft blocks**: destructible. Some hide the exit or power-ups.
- **Hard blocks**: indestructible pillars that make a fixed grid.

## Step by step
1. Draw a grid, for example 13 by 11 tiles. Place hard blocks on every odd row and column.
2. Move the player one tile per key press, with blocked tiles stopping movement.
3. Add the bomb. Place it on the player's tile, and make it explode after about 2 seconds.
4. Make the explosion a cross that stops at hard blocks, and destroys soft blocks it reaches.
5. Add enemies that walk and turn at walls. Remove an enemy or the player when an explosion touches them.
6. Scatter soft blocks randomly, keeping the player's start corner clear.
7. Add the exit under one soft block. It appears when that block is destroyed and all enemies are gone.
8. Add power-ups: extra bombs and longer blast range.
9. Add lives, a level counter and a score.

## What to add
- Chain reactions, where one explosion sets off other bombs.
- A clear rule that bombs block movement until the player steps off them.

## What not to add
- Smooth movement, which makes grid collisions harder to read.
- Multiplayer in the first version.

## Pitfalls
- Explosions that pass through hard blocks break the level layout.
- Enemies that get stuck in corners ruin levels. Give them a random turn option.

## Suggested scope for a prototype
One 13 by 11 level, bombs with a cross blast, soft blocks, two enemy types, the exit and lives.

## Notes
Written from general knowledge of the genre, without web checks.
