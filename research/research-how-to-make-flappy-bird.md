# Research: how to make Flappy Bird
Genre: one-button side-scrolling arcade

## What the game is
A bird falls under gravity and flies forward automatically. One tap makes it flap upward. The player steers it through gaps in pairs of pipes that scroll in from the right. Touching a pipe, the ground or the ceiling ends the run. The score rises by one for each pipe passed.

## Core mechanics to build
1. **Gravity and flap**: a constant downward acceleration. A tap sets the vertical velocity to a fixed upward value. Clamp the maximum fall speed.
2. **Pipe spawning**: create a pipe pair at a fixed interval on the right edge. Give each pair a random gap height inside safe limits, so the gap is always reachable.
3. **Scrolling**: move pipes left at a constant speed. Remove them once they leave the screen.
4. **Collision**: check the bird's box against each pipe's two rectangles, plus the ground and ceiling bounds. Use a slightly smaller bird box than the sprite.
5. **Scoring**: increase the score once when the bird's x position passes a pipe's centre.
6. **Game states**: ready, playing, dead. The ready state waits for the first tap. The dead state shows the score and restarts on tap.
7. **Persistence**: store the best score in localStorage.

## How to build a first version
- Draw the bird as a rectangle or circle first. Make the flap, gravity and collision work before adding art.
- Use delta time for movement so the feel does not change with frame rate.
- Keep the gap size and spacing as constants at the top of the file, so they are easy to tune.

## Pitfalls
- Random gaps that sit too high or too low make the game impossible. Keep the gap centre within a fixed band.
- A flap impulse that is too strong sends the bird through the ceiling. Clamp the upward speed.
- Scoring on overlap instead of on passing the centre counts a point twice or not at all.

## Suggested scope for a prototype
One bird, pipes with random gaps, tap to flap, score, best score, restart on tap. No sound or art needed.

## Notes
Written from general knowledge of the game, without web checks. The tuning numbers are starting points and must be tested by playing.
