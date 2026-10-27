# Research: how to make a maze game
Genre: grid-based exploration and puzzle

## What the game is
The player moves through a maze from a start tile to an exit, often collecting items or avoiding enemies on the way. The maze may be fixed or randomly generated. The challenge comes from the layout and the choices at each junction.

## Core mechanics to build
1. **Maze data**: store the maze as a grid of walls and open cells. Keep it in one array, so it is easy to draw and to check.
2. **Movement**: move one cell at a time with the arrow keys, and block moves into walls.
3. **Generation** (optional): carve a random maze with depth-first search. Start at a cell, pick a random unvisited neighbour, remove the wall between them, and recurse. Backtrack when stuck. This always produces a fully connected maze.
4. **Goal and progress**: reach the exit tile to finish. Count moves or time.
5. **Items or enemies** (optional): place keys, doors or chasing enemies on open cells.
6. **Fog of war** (optional): reveal only the cells near the player.
7. **Rendering**: draw walls as thin lines or filled tiles on a canvas.

## How to build a first version
- Store a fixed maze and move the player with the arrow keys. Detect the exit.
- Add random generation with depth-first search, and a seed so a maze can be replayed.
- Add items, enemies or fog last.

## Pitfalls
- Recursive generation on large mazes can overflow the stack. Use an explicit stack.
- Wall data stored twice (once per side) gets out of sync. Keep one source of truth.
- A maze that cannot be solved happens when generation skips cells. Depth-first search avoids this.

## Suggested scope for a prototype
A fixed grid maze with arrow-key movement, walls and an exit with a move counter. Random generation comes after that.

## Notes
Written from general knowledge of the genre, without web checks.
