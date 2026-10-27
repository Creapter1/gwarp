# Research: how to make a run-and-gun shooter
Genre: side-scrolling run-and-gun shooter

## What the game is
The hero runs and shoots through a side-scrolling stage. Enemies come from the sides and the air. Each stage ends in a boss. The player must dodge fire, shoot enemies and reach the end with health left.

## Characters and enemies
- **Hero**: runs, jumps and fires in one direction or aims up and down.
- **Grunts**: walk toward the hero and shoot at intervals.
- **Flyers**: move in arcs and drop bombs.
- **Boss**: a large enemy with two or three attack phases.

## Step by step
1. Draw a stage as a long strip with a ground line. Scroll the camera to the right at a fixed speed.
2. Add running, jumping and gravity on the ground line.
3. Add a shot that travels straight in the aim direction. Set a fire rate.
4. Add aiming: up, down and diagonal, using the arrow keys.
5. Spawn grunts at set points on the stage. Make them shoot at the hero.
6. Add damage. Lose health on a hit, and show a health bar.
7. Add flyers that follow a set arc and drop bombs.
8. Add a boss at the end of the stage with at least two attack patterns.
9. Add a win screen after the boss and a game over screen when health is gone.

## What to add
- Pickups that change the shot, such as a wider spread.
- A short invincible time after a hit.

## What not to add
- Many weapons in the first version. One shot and one pickup are enough.
- Free scrolling in both directions.

## Pitfalls
- Enemies that spawn on screen are unfair. Spawn them just past the right edge.
- Bullets that are too slow are hard to aim. Use a fast, clear shot.

## Suggested scope for a prototype
One stage with a fixed scroll, running and jumping, aimed shots, grunts, a health bar, one boss and a win state.

## Notes
Written from general knowledge of the genre, without web checks.
