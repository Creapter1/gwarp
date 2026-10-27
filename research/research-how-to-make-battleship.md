# Research: how to make Battleship
Genre: turn-based grid guessing game

## What the game is
Each side has a grid with a few ships hidden on it. Players take turns firing at a cell on the opponent's grid. A hit or miss is reported back. When every cell of a ship has been hit, that ship is sunk. The first side to sink all the opposing ships wins.

## Core mechanics to build
1. **Grids**: store each player's grid, with ship positions and a record of shots fired at each cell.
2. **Ship placement**: place each ship in a straight line, either horizontal or vertical, without overlapping any other ship or going off the grid.
3. **Firing**: when a player fires at a cell, record the shot. If it hits a ship, mark a hit. Otherwise mark a miss.
4. **Sinking**: a ship is sunk when all of its cells are hit. Track each ship's remaining cells.
5. **Turns**: alternate turns, and ignore a shot at a cell that was already fired at.
6. **Win check**: end the game when one side has no ships left.
7. **Hidden information**: hide the opponent's ships. Show only the hits and misses to the other player.

## How to build a first version
- Draw two grids. Place ships at fixed positions for testing, then add random placement.
- Add firing, hit and miss marks, and turn switching against a simple computer player.
- Add the sinking rule and the win check.

## Pitfalls
- Random placement that overlaps ships or runs off the edge is a common bug. Check every cell before placing.
- Allowing a repeat shot wastes a turn in an unfair way. Reject repeat shots.
- Showing the opponent's ships by mistake spoils the game. Only draw hits and misses on the other grid.

## Suggested scope for a prototype
One 10 by 10 grid against a simple computer that fires randomly, random ship placement, hit and miss marks, sinking and a win message.

## Notes
Written from general knowledge of the genre, without web checks.
