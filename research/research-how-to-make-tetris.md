# Research: how to make Tetris
Genre: falling-block puzzle

## What the game is
Tetrominoes (seven four-block shapes) fall one at a time into a grid called the well. The player rotates and moves each piece to fill rows. A full row clears and scores points. The game ends when new pieces cannot fit at the top. Falling speeds up as the level rises.

## Core mechanics to build
1. **Board**: a grid of cells, each empty or filled with a colour. Keep the settled blocks in this grid.
2. **Pieces**: define each shape as its rotation states. Rotate by swapping to the next state, then test for collisions.
3. **Collision test**: a function that checks whether a piece at a given position and rotation fits in the empty cells. Use it for moves, rotations and landing.
4. **Gravity tick**: move the active piece down one row each tick. Lock it in place when it cannot move down.
5. **Line clear**: remove full rows, shift the rows above down, and count the cleared lines.
6. **Next piece**: use a 7-bag randomiser so every piece appears once per bag. This avoids long droughts.
7. **Speed and score**: shorten the tick and raise the level as lines are cleared.

## How to build a first version
- Draw the board and one piece. Make moves and rotation work with the collision test.
- Add locking and line clears, then the bag randomiser.
- Add the next-piece preview, the level and the score last.

## Pitfalls
- Rotation without a collision test lets pieces pass through blocks. Test every rotation.
- Wall kicks (shifting a piece when a rotation hits the wall) make rotation feel right. Add a simple kick: try one or two offsets.
- Lock delay that ignores later moves locks pieces too early. A short lock delay that resets on movement feels fairer.

## Suggested scope for a prototype
A 10 by 20 board, seven pieces with rotation, gravity, locking, line clears, a score and game over. Next-piece preview and levels come later.

## Notes
Written from general knowledge of the genre, without web checks.
