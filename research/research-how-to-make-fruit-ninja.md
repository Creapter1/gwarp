# Research: how to make Fruit Ninja
Genre: swipe-to-slice arcade

## What the game is
Fruit is thrown up from the bottom of the screen in arcs. The player swipes across the fruit to slice it. Each fruit sliced scores points, and combos score more. Bombs must be avoided, and a missed fruit or a bomb hit costs a life. The game ends after a set number of misses or a bomb.

## Core mechanics to build
1. **Projectile arcs**: launch each fruit with an upward velocity and let gravity pull it down. Remove it once it falls off the screen.
2. **Swipe trail**: record the pointer positions while the mouse or touch is down, and keep the last few points for a short time.
3. **Slice detection**: check whether the swipe segment crosses the fruit's circle. A slice counts only if the swipe is fast enough.
4. **Split**: on a slice, replace the fruit with two halves that move apart and fall.
5. **Bombs**: spawn bombs in the same arcs. Slicing one ends the run.
6. **Combos**: count slices within a short window, and multiply the score.
7. **Difficulty**: raise the launch rate and add more bombs as the score goes up.

## How to build a first version
- Launch fruit in arcs, and draw them. Track the pointer while it is pressed.
- Add the circle-and-segment slice test, then the score and misses.
- Add the split halves, bombs and combos last.

## Pitfalls
- A slice test that uses only the pointer's position misses fast swipes. Test the segment between positions.
- Slow, slow swipes should not count. Require a minimum speed.
- Fruit that spawns too close together looks like one object. Space the launches.

## Suggested scope for a prototype
Fruit that is launched in arcs, a swipe trail with slice detection, a score, and misses that end the run. Bombs and combos come later.

## Notes
Written from general knowledge of the genre, without web checks.
