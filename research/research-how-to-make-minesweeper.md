# Research: how to make Minesweeper
Genre: grid-based logic puzzle

## What the game is
A grid hides a number of mines. The player opens cells one at a time. An opened cell shows how many mines touch it, and the player uses those numbers to work out where the mines are. Opening a mine ends the game. Opening every safe cell wins.

## Core mechanics to build
1. **Board data**: store each cell as an object with a mine flag, a revealed flag, a flag marker and a neighbour count.
2. **Place mines after the first click**: place mines randomly, but never on the first clicked cell or its neighbours. Otherwise the first click can lose.
3. **Neighbour counts**: for each cell, count the mines in its eight neighbours, staying inside the grid.
4. **Flood fill**: when an opened cell has zero neighbour mines, open all of its neighbours too. Repeat this recursively, or with a stack.
5. **Flagging**: right-click (or long-press) toggles a flag. Flagged cells cannot be opened.
6. **Win and lose**: lose when a mine is opened. Win when every non-mine cell is open. Show all mines on a loss.
7. **Timer**: start the timer on the first click and stop it at the end.

## How to build a first version
- Draw a 9 by 9 grid with 10 mines. Handle left click to open a cell.
- Add neighbour counts and the flood fill.
- Add flags, the win and lose states, then the timer.

## Pitfalls
- Placing mines before the first click can cause an unfair loss. Place them after it.
- A flood fill that does not stop at numbered cells opens too much. Stop at cells with a count above zero.
- Opening a flagged cell by accident is frustrating. Ignore clicks on flagged cells.

## Suggested scope for a prototype
A 9 by 9 board, safe first click, neighbour counts, flood fill, flags, win and lose, and a timer.

## Notes
Written from general knowledge of the genre, without web checks.
