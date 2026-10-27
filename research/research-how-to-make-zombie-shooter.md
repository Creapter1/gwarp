# Research: how to make a zombie shooter
Genre: top-down wave shooter

## What the game is
The player stands in an arena and aims at zombies that come toward them in waves. The player shoots, reloads, and collects ammo and health drops. Each wave has more and tougher zombies. The run ends when the player's health reaches zero.

## Core mechanics to build
1. **Top-down movement**: move with WASD and aim with the mouse. Normalise diagonal movement so it is not faster.
2. **Aiming and shooting**: aim at the cursor angle. Fire bullets as objects with a speed and lifetime, and remove them on hit or at the edge.
3. **Zombie AI**: each zombie moves straight toward the player. Add a small random offset so they do not stack in one line.
4. **Collision**: circle checks work well for top-down bodies. Bullet against zombie removes both and deals damage. Zombie against player deals damage over time.
5. **Waves**: spawn a set count per wave, from off-screen edges. Raise the count and the health each wave.
6. **Pickups**: ammo and health drop from some kills and expire after a time.
7. **Reload and ammo**: a magazine with a reload timer, plus a total ammo count.

## How to build a first version
- Make the player move and aim, and fire bullets. Draw everything as simple shapes.
- Add one zombie type that chases the player, plus the bullet-zombie collision.
- Add waves, then pickups and the reload cycle.

## Pitfalls
- Zombies that all walk into one point stack and become unfair. Add offsets or separation.
- Bullets that move too fast skip past thin zombies. Use a sweep or sub-steps for fast bullets.
- Diagonal movement that is faster than straight movement feels wrong. Normalise the vector.

## Suggested scope for a prototype
One arena, WASD movement, mouse aim and shooting, chasing zombies, damage, and waves that grow. Pickups and reload come after that.

## Notes
Written from general knowledge of the genre, without web checks.
