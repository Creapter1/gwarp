# Research: how to make Frogger
Genre: grid-based lane-crossing arcade

## What the game is
A frog must cross a busy road and then a river to reach a goal slot at the top. Cars on the road are deadly. Logs and turtles on the river carry the frog, and falling in the water is deadly too. Each frog that reaches a goal scores points, and the game ends after all the frogs are used.

## Core mechanics to build
1. **Lane grid**: lay the screen out as rows. Each row is a road lane, a river lane, a safe strip or a goal row.
2. **Hop movement**: move the frog one whole cell per key press, with a short animation, not smoothly.
3. **Moving lanes**: each lane has objects moving at a fixed speed in one direction. Wrap them around the screen edges.
4. **Riding logs**: while the frog is on a log, move it with that log. If the log leaves the screen, the frog dies.
5. **Death checks**: after each frame, check for a car collision on road rows, or a frog in water on river rows.
6. **Goal and lives**: a goal slot that is filled scores points. Reset the frog after a death, and end the game when lives run out.

## How to build a first version
- Draw a grid and move the frog one cell per key press.
- Add one road lane of cars that wrap around, with the collision check.
- Add one river lane of logs that carry the frog, then goals and lives.

## Pitfalls
- Moving the frog smoothly through the grid makes timing feel loose. Use whole-cell hops.
- A frog riding a log must move with it before the collision check, or it falls off early.
- Lane speeds that are too similar make the game feel random. Vary speeds by lane.

## Suggested scope for a prototype
Five lanes of road and two of river, one-cell hops, wrapped cars and logs, one goal slot, lives and a score.

## Notes
Written from general knowledge of the genre, without web checks.
