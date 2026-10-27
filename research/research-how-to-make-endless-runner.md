# Research: how to make an endless runner
Genre: auto-running obstacle game

## What the game is
The character runs forward automatically, and the player jumps, slides or changes lane to avoid obstacles. The speed rises over time, and the score counts distance plus coins. One hit ends the run. Runs are short, so players retry quickly.

## Core mechanics to build
1. **Auto-run**: the world scrolls left at a speed that rises over time. The character stays at a fixed screen x.
2. **Jump and slide**: gravity with a jump impulse, and a slide that shrinks the hitbox for a short time.
3. **Chunked level generation**: build the track from fixed pattern chunks. Each chunk must leave a reachable path, so no seed produces an impossible run.
4. **Obstacle and coin placement**: place objects from the chunks, and remove them once off-screen.
5. **Collision**: use a slightly smaller box than the sprite for obstacles.
6. **Difficulty curve**: raise the speed and the chunk complexity with distance.
7. **Score and retry**: score = distance plus coins. Restart instantly on death.

## How to build a first version
- Draw one runner on a flat ground, with jump and gravity. Scroll the ground and add one obstacle.
- Add the chunk generator with a few safe patterns, then coins and the speed-up.
- Add slide and the best-score store last.

## Pitfalls
- Random placement without a reachable-path check creates impossible gaps. Use hand-made, verified chunks.
- Speed that rises faster than the player can react feels unfair. Raise it slowly.
- Spawning on the screen edge without enough lead time causes instant deaths.

## Suggested scope for a prototype
One runner, jump, a ground that scrolls, obstacles from safe chunks, coins, speed-up and a score. Slide and extra biomes come later.

## Notes
Written from general knowledge of the genre, without web checks.
