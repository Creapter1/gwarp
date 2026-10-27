# Research: how to make Space Invaders
Genre: fixed-screen shoot-'em-up

## What the game is
The player moves a cannon left and right along the bottom of the screen and fires one shot at a time. A grid of aliens moves sideways as a block, drops a row when it reaches the edge, and speeds up as fewer aliens remain. Aliens fire back. The player loses a life when hit, and the game ends if the aliens reach the bottom. Shields give partial cover.

## Core mechanics to build
1. **Alien formation**: store aliens in a grid. Move the whole block one step per tick, and reverse plus drop when any alien touches an edge.
2. **Speed up**: make the tick interval shorter as the alien count drops. This is the main source of tension.
3. **Player shot**: allow one bullet on screen at a time. Move it up each frame and remove it on hitting an alien or leaving the screen.
4. **Enemy fire**: pick a random alive alien from the bottom of each column to fire. Cap the number of enemy shots.
5. **Shields**: a set of destructible blocks. Erode each block on hit, so shots wear down cover.
6. **Waves**: clear the screen to start a new, faster wave. Add a bonus ship that crosses the top for points.
7. **Lives and score**: track lives, a score and a high score.

## How to build a first version
- Draw a 5 by 11 alien grid and the cannon with Canvas. Make the block move, reverse and drop.
- Add the player bullet and hit detection. Then enemy fire, then the speed-up.
- Shields and the bonus ship come last.

## Pitfalls
- Moving every alien every frame makes the speed hard to tune. Move the block on a timer instead.
- Enemy bullets with no cap make the game impossible. Limit shots on screen.
- Hit detection that checks only the alien's centre misses bullets at the edges. Use the full box.

## Characters and enemies
- **Cannon**: the player's ship. Moves only left and right, and fires one shot at a time.
- **Aliens**: a grid of rows. Each row is a different type, worth different points.
- **Alien shots**: fired at random from the bottom alien in each column.
- **Shields**: blocks the player can hide behind. They wear down when hit.
- **UFO**: an optional bonus that crosses the top of the screen.

## Step by step
1. Draw a grid of aliens, for example 5 rows of 11.
2. Move the whole grid one step per tick. When any alien touches an edge, reverse and drop a row.
3. Add the cannon with left and right input, clamped to the screen.
4. Add the player's shot. Allow one shot on screen at a time.
5. Remove an alien when hit, and add points for its row.
6. Shorten the tick interval as fewer aliens remain.
7. Pick a random bottom alien in each column to fire.
8. Lose a life when an alien shot or an alien reaches the cannon.
9. Add shields, a wave counter, and a new wave when the grid is cleared.

## What to add
- Shields made of small blocks that break piece by piece.
- A high score in localStorage.

## What not to add
- Moving shields or many weapon types in the first version.

## Suggested scope for a prototype
One grid of aliens that moves and speeds up, the player cannon and single shot, enemy fire, lives and a score. Shields and bonus ships come later.

## Notes
Written from general knowledge of the genre, without web checks. The original's speed values are worth checking against a reference before copying.
