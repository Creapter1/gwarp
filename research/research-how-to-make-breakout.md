# Research: how to make Breakout
Genre: brick-breaking arcade

## What the game is
A ball bounces around the screen and breaks rows of bricks at the top. The player moves a paddle at the bottom to keep the ball in play. Missing the ball costs a life. Clearing all bricks completes the level. Some versions add power-ups that drop from bricks.

## Core mechanics to build
1. **Paddle**: move left and right with the keyboard or mouse, clamped to the screen.
2. **Ball**: move by velocity each frame, scaled by delta time. Bounce off the walls and the top.
3. **Brick collision**: check the ball against each brick. Remove the brick and reflect the ball. Decide the reflection side by comparing the overlap on x and y, so the ball does not bounce wrongly at corners.
4. **Paddle angle**: change the bounce direction based on where the ball hits the paddle. This gives the player control.
5. **Lives and levels**: lose a life when the ball falls past the paddle. Advance when the bricks are gone.
6. **Brick layout**: store each level as a grid of brick types, which can have different hit counts.
7. **Power-ups** (optional): drop from some bricks and fall down. Catching one changes the paddle or the ball.

## How to build a first version
- Draw the paddle, the ball and one row of bricks. Move the paddle and bounce the ball off walls and the paddle.
- Add brick collision with the overlap-side reflection. Then lives and the level clear.
- Add more brick layouts and power-ups last.

## Pitfalls
- Reflecting the ball on both axes at a corner makes it reverse unexpectedly. Reflect on the axis with the smaller overlap.
- A ball that moves so fast it passes through a brick needs sub-steps or a swept test.
- A paddle that always returns the same angle makes the game predictable. Use the hit-point angle.

## Suggested scope for a prototype
One paddle, one ball, a grid of bricks, collision with the correct reflection, lives and level clear. Power-ups come later.

## Notes
Written from general knowledge of the genre, without web checks.
