# Research: how to make Snake
Genre: grid-based arcade

## What the game is
A snake moves around a grid and eats food to grow longer. The player only steers its direction. The game ends when the snake hits a wall or its own body. Each food item adds to the score and makes the snake longer, so the game gets harder as it goes.

## Core mechanics to build
1. **Grid**: store the play area as a fixed number of cells. Positions are whole cell coordinates.
2. **Tick movement**: move the snake one cell per tick, not per frame. Use a timer, and make the tick interval shorter as the score rises.
3. **Body as a queue**: store the body as an array of cells. Add a new head each tick, and remove the tail unless the snake just ate.
4. **Input**: store one pending direction per tick. Reject a direction that reverses straight into the body, so a quick double-press cannot kill the snake.
5. **Food**: place food on a random empty cell. Do not place it on the snake.
6. **Collision**: check the new head against the walls and the body (excluding the tail that is about to move).
7. **Score**: add points per food, and keep a high score in localStorage.

## How to build a first version
- Draw a 20 by 20 grid with Canvas. Move the snake on a timer with arrow-key input.
- Add food and growth, then wall and self collision, then the score.
- Add the speed-up and the high score last.

## Pitfalls
- Checking for body collision before moving the tail wrongly blocks a valid move into the cell the tail just left. Check against the body after the tail moves.
- Input that is applied twice within one tick can reverse the snake. Apply one direction change per tick.
- Random food that can land on the snake makes it impossible to read. Pick from the empty cells.

## Suggested scope for a prototype
A grid, a timed snake that grows when it eats, wall and self collision, a score and restart. No menus needed.

## Notes
Written from general knowledge of the genre, without web checks.
