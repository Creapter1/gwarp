# Research: how to make Pac-Man
Genre: grid-based maze chase

## What the game is
The player steers Pac-Man through a maze, eating dots and power pellets. Four ghosts chase him. Eating a power pellet makes the ghosts vulnerable for a short time, and they can then be eaten for points. Clearing all dots completes the level. Touching a ghost that is not vulnerable costs a life.

## Core mechanics to build
1. **Grid maze**: store the maze as a grid of tiles (walls, dots, pellets, empty). Movement snaps to tile centres.
2. **Movement**: Pac-Man moves at a steady speed in his current direction. A buffered turn (the next direction the player asks for) takes effect at the next tile centre where the path is open.
3. **Ghost AI**: each ghost has a target tile. At each junction it picks the open direction that gets closest to its target, without reversing. Different ghosts use different targets (one chases Pac-Man directly, one aims ahead of him, and so on). This gives varied behaviour from simple rules.
4. **Modes**: ghosts alternate between scatter (head to corners) and chase on a timer. Frightened mode starts when a pellet is eaten.
5. **Scoring and lives**: dots add points, ghosts add more when eaten during frightened mode. A life is lost on contact with a normal ghost.
6. **Tunnels**: the row edges wrap around. Slow the ghosts in tunnels, as in the original, for a fair feel.

## How to build a first version
- Make a tile grid and draw it with Canvas. Move Pac-Man on tile centres with a buffered turn.
- Add one ghost with a direct chase target. Then add the other ghosts and their targets.
- Add the frightened timer and the ghost-eating score last.

## Pitfalls
- Ghosts that move at exactly the same speed as Pac-Man in a loop become unfair or stuck. Vary speeds by mode and by tile.
- Ghost AI that can reverse direction in place feels wrong. Forbid reversing except when a mode changes.
- Pixel-based movement without tile snapping causes ghosts to jitter at junctions.

## Suggested scope for a prototype
One small maze, Pac-Man with buffered turns, dots, one ghost with a chase rule, lives and a score. Add the other ghosts and power pellets after that works.

## Notes
Written from general knowledge of the genre, without web checks. The original's exact ghost targeting rules are worth checking against a reference before copying them.
