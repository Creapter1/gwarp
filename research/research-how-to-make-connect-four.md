# Research: how to make Connect Four
Genre: two-player grid strategy

## What the game is
Two players take turns dropping coloured discs into a 7 by 6 grid. A disc falls to the lowest empty cell in its column. The first player to line up four discs in a row, column or diagonal wins. A full board with no line is a draw.

## Core mechanics to build
1. **Board**: store the grid as a 2D array, using null for empty, and 1 or 2 for each player.
2. **Drop**: given a column, find the lowest empty row. If the column is full, reject the move.
3. **Turn switch**: alternate players after each valid drop.
4. **Win check**: after each drop, check the four directions from the new disc (across, down, and both diagonals). Count matching discs in each direction.
5. **Draw**: if the top row is full and there is no winner, end the game as a draw.
6. **Hover preview**: show a ghost disc above the column under the pointer.

## How to build a first version
- Draw the 7 by 6 grid and drop discs for two players in turns.
- Add the win check for all four directions.
- Add the draw state, the reset and the hover preview.

## Pitfalls
- Checking only the last disc's row is not enough. Check all four directions from the disc just placed.
- Accepting a drop into a full column corrupts the board. Reject it.
- Confusing the row index direction makes discs fall upward. Store row 0 at the bottom or top, and be consistent.

## Suggested scope for a prototype
Two players on one screen, column clicks, gravity, the four-in-a-row win check, a draw and a reset.

## Notes
Written from general knowledge of the genre, without web checks.
