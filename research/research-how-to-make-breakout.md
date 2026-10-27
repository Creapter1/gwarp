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

## Characters and enemies
- **Paddle**: the player's control. Moves left and right at the bottom.
- **Ball**: bounces off walls, the paddle and bricks. Lost when it falls past the paddle.
- **Bricks**: rows of blocks. Some need more than one hit.
- **Power-ups** (optional): falling pickups that change the paddle or ball.

## Step by step
1. Draw a wall of bricks in rows, with a fixed size and gap.
2. Draw the paddle at the bottom and move it with the mouse or arrow keys.
3. Move the ball at a set speed and bounce it off the walls and the top.
4. Bounce the ball off the paddle. Change its horizontal speed by where it hits.
5. Remove a brick when hit, and reflect the ball on the side it hit.
6. Lose a life when the ball falls below the paddle. Reset the ball to the paddle.
7. Add a score per brick, and a win state when the last brick is gone.
8. Add levels with different brick layouts.

## What to add
- Bricks that need two hits.
- A launch step, where the ball waits on the paddle until a click.

## What not to add
- Physics that chains many bounces, or power-ups in the first version.

## Suggested scope for a prototype
One paddle, one ball, a grid of bricks, collision with the correct reflection, lives and level clear. Power-ups come later.

## Notes
Written from general knowledge of the genre, without web checks.
