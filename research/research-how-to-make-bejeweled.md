# Research: how to make Bejeweled
Genre: match-three puzzle

## What the game is
A grid is filled with coloured gems. The player swaps two neighbouring gems. If the swap makes a line of three or more matching gems, those gems clear, the gems above fall, and new gems fill the top. The goal is to reach a score target before time or moves run out.

## Characters and enemies
- **Gems**: a few colours, each a plain tile. There are no enemies.
- **Special gems**: optional. A line of four or five can make one that clears more later.
- **Board**: a fixed grid, usually 8 by 8.

## Step by step
1. Draw an 8 by 8 grid and fill it with random gems. Remove any starting matches.
2. Let the player select a gem, then a neighbour, and swap the two.
3. If the swap makes no match, swap back.
4. Scan rows and columns for runs of three or more matching gems. Mark them.
5. Remove the marked gems, drop the gems above, and fill the top with new random gems.
6. Repeat step 4 for cascades, until no new matches appear.
7. Add the score: more points for longer runs and for cascades.
8. Add a move limit or a timer, and show a win or lose result.

## What to add
- A hint button that highlights a possible swap.
- A short animation for falling gems.

## What not to add
- Special gems in the first version.
- Diagonal matches, which confuse players.

## Pitfalls
- Swapping back when no match forms is easy to forget. Otherwise the board changes for nothing.
- Random refilling can make new matches at once. Remove those before the player moves.

## Suggested scope for a prototype
An 8 by 8 board, valid swaps only, runs of three, falling gems with refilling, cascades, a score and a move limit.

## Notes
Written from general knowledge of the genre, without web checks.
