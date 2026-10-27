# Research: how to make Bubble Shooter
Genre: colour-matching puzzle

## What the game is
A grid of coloured bubbles hangs from the top of the screen. The player aims and fires one bubble at a time. Three or more bubbles of the same colour that touch pop. Bubbles that lose their connection to the top fall away. The goal is to clear the board.

## Characters and enemies
- **Bubbles**: a small set of colours. There are no enemies. The danger is the bubbles reaching the bottom line.
- **Shooter**: the launcher at the bottom, which aims and fires.
- **Ceiling**: the top row, which drops down over time in some versions.

## Step by step
1. Draw a hexagonal or offset grid of bubbles at the top.
2. Add the shooter. Aim it with the mouse or the arrow keys, and show a guide line.
3. Fire one bubble along the aim angle. Bounce it off the side walls.
4. When the bubble touches the grid, snap it to the nearest empty grid cell.
5. Find all bubbles of the same colour that touch the new one with a flood fill. Pop them if there are three or more.
6. Find the bubbles no longer connected to the top row, and drop them.
7. Load the next bubble in the shooter from a random colour that is still on the board.
8. Add the lose rule: the game ends if a bubble reaches the bottom row. Add the win rule: clear the board.
9. Add a score for each pop and each dropped bubble.

## What to add
- A preview of the next bubble.
- A ceiling drop every few shots, which adds pressure.

## What not to add
- Physics that doesn't snap. A grid is easier to get right.
- Power-ups in the first version.

## Pitfalls
- Snapping to the wrong cell is the most common bug. Use the nearest empty cell to the impact point.
- The flood fill for dropped bubbles must start from the top row, not from the last popped bubble.

## Suggested scope for a prototype
A small grid, aimed firing with wall bounces, grid snapping, the pop rule, dropping floating bubbles, and win and lose.

## Notes
Written from general knowledge of the genre, without web checks.
