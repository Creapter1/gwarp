# Research: how to make a Sonic-style platformer
Genre: fast side-scrolling platformer

## What the game is
A fast hedgehog-style runner moves through loops, ramps and springs. The player collects rings, jumps on or spins into enemies, and reaches the end of the act. Speed and momentum are the main feel of the game.

## Characters and enemies
- **Hero**: runs, jumps, and spin-dashes into enemies. Has a health count: rings are health.
- **Enemies**: simple patrollers that walk back and forth on a ledge, and flyers that move in a set path.
- **Hazards**: spikes and pits, which cost a life or rings.
- **Goal**: a sign post at the end of the act.

## Step by step
1. Draw a level as a tile map, with solid tiles and empty space.
2. Add gravity and a ground check. Make the hero stand on solid tiles.
3. Add running with acceleration, and a top speed. Add jumping with a fixed jump impulse.
4. Add the collision check against tiles, one axis at a time, so the hero slides along walls.
5. Add rings as pickups, and count them.
6. Add enemies that patrol. Destroy an enemy when the hero lands on it from above.
7. Add spikes and pits. Lose rings or a life when the hero touches them.
8. Add a goal sign that ends the act.
9. Add a camera that follows the hero, with a margin in front of the hero.

## What to add
- Springs that launch the hero upward.
- A short invincibility time after a hit.

## What not to add
- Loops in the first version. They need curved physics that is hard to get right at first.
- Many zones. One act is enough for a prototype.

## Pitfalls
- Tunnelling through thin walls at high speed. Cap the maximum speed or move in small steps.
- Landing checks that only test the centre of the hero miss edges. Test both sides of the feet.

## Suggested scope for a prototype
One act, running and jumping, rings, one patrolling enemy, spikes, a goal and a follow camera.

## Notes
Written from general knowledge of the genre, without web checks.
