# Research: how to make Lemmings
Genre: puzzle, crowd control

## What the game is
A stream of small walking creatures enters a level and walks on its own. The player gives each one a single skill, such as digging, building or blocking. The goal is to get a set number of them safely to the exit before time runs out.

## Characters and enemies
- **Lemmings**: walk forward and turn at walls. They fall to their death if the drop is too far.
- **Skills**: climber, floater, blocker, builder, digger, bomber. Assign one at a time to one lemming.
- **Hazards**: water, spikes and pits. These are the level's enemies, not creatures that chase.

## Step by step
1. Draw a level as a bitmap or a list of solid terrain tiles.
2. Spawn lemmings from an entrance at a fixed rate. Make them walk and turn at walls.
3. Add falling. Make a lemming that falls more than a set height die.
4. Add a click-to-assign system. Clicking a lemming applies the chosen skill.
5. Add the blocker skill. A blocker stops others and turns them around.
6. Add the digger and builder skills. Each one edits the terrain tiles.
7. Add the exit. Count saved lemmings, and show a win or lose result at the end of the timer.
8. Add a level file format with terrain, entrance, exit, and the lemming target.

## What to add
- A skill count per level, so the player must choose carefully.
- A pause button, for planning.

## What not to add
- Many skills in the first version. Start with blocker, digger and builder.
- Free-form drawing of terrain by the player.

## Pitfalls
- Terrain edits must update collision at once, or lemmings walk through the ground.
- Click targets that overlap are hard to hit. Make the click radius a little larger than the sprite.

## Suggested scope for a prototype
One level, spawning lemmings, walking and falling, a blocker and a digger skill, an exit and a win check.

## Notes
Written from general knowledge of the genre, without web checks.
