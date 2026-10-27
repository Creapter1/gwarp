# Research: how to make 2048
Genre: grid-based sliding puzzle

## What the game is
A 4 by 4 grid holds numbered tiles. The player slides all tiles in one direction. Tiles with the same number that collide merge into one tile with double the value. After each move, a new tile (usually 2, sometimes 4) appears in an empty cell. The goal is to make a 2048 tile.

## Core mechanics to build
1. **Board as a 2D array**: store 0 for an empty cell and the tile value otherwise.
2. **Slide and merge**: for one direction, process each row or column as a line. Compact the tiles toward the edge, merging equal neighbours once per move.
3. **Merge rule**: a tile that has just merged cannot merge again in the same move. Track this with a flag.
4. **Move check**: only spawn a new tile if the board actually changed. Otherwise the player gets free turns.
5. **Spawn**: place a new tile in a random empty cell.
6. **Game over**: the game ends when the board is full and no two neighbours are equal.
7. **Score and best**: add the value of each merged tile to the score. Save the best score in localStorage.

## How to build a first version
- Draw the 4 by 4 grid and make one direction slide and merge a single row.
- Apply the same logic to all four directions, using row and column helpers.
- Add spawning, the move check, the game over check, then the score.

## Pitfalls
- Merging a tile twice in one move is the most common bug. Use the merged flag.
- Spawning a tile after a move that did not change anything makes the game too easy.
- Writing four separate slide functions is error prone. Reverse or transpose the board and use one function.

## Suggested scope for a prototype
A 4 by 4 board, all four slides, correct merging, random spawns, game over and a score. Skip the undo.

## Notes
Written from general knowledge of the genre, without web checks.
