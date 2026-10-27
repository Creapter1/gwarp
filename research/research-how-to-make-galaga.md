# Research: how to make a Galaga-style shooter
Genre: fixed-screen shooter with swooping enemies

## What the game is
The player's ship sits at the bottom of the screen and shoots upward. Rows of insect-like enemies fly in from the top in set patterns, and some dive at the player. The goal is to destroy each wave and keep the ship alive.

## Characters and enemies
- **Fighter**: the player's ship. Moves left and right and fires one shot at a time.
- **Bees**: the common enemy. Fly in from the top along a set path, then join the formation.
- **Butterflies and boss ships**: tougher enemies in the upper rows. Boss ships take two hits.
- **Divers**: enemies that leave the formation and swoop at the fighter.

## Step by step
1. Draw the fighter at the bottom and move it left and right.
2. Add the player's shot, one on screen at a time.
3. Draw a formation of enemies in rows at the top.
4. Add an entry path for each enemy. Make it a list of points, and move the enemy along it each frame.
5. Once an enemy reaches its formation slot, lock it there and let it sway with the formation.
6. Pick one enemy at a time to dive at the fighter. Have it shoot while it dives.
7. Remove an enemy when a shot hits it, and add points based on its type.
8. Lose a life when the fighter is hit. Show a short respawn pause.
9. End the wave when all enemies are gone, then start the next, faster one.

## What to add
- A count of lives shown at the bottom.
- A high score in localStorage.

## What not to add
- Captured-fighter rescue mechanics in the first version.
- Many weapon types. One shot is enough to start.

## Pitfalls
- Dives that never miss make the game unfair. Let some of them pass the fighter.
- Entry paths that cross each other look messy. Give each wave one clear pattern.

## Suggested scope for a prototype
A fighter, one shot at a time, a formation that enters along paths, two enemy types, diving enemies, lives, waves and a score.

## Notes
Written from general knowledge of the genre, without web checks.
