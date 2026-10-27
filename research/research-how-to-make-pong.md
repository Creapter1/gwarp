# Research: how to make Pong
Genre: two-paddle arcade sports

## What the game is
A ball bounces between two paddles, one on each side of the screen. Each player moves a paddle up and down to hit the ball back. A missed ball gives the other side a point. The first to a set score wins. It is one of the simplest games to build, which makes it a good first project.

## Core mechanics to build
1. **Paddles**: move each paddle up and down, clamped inside the screen.
2. **Ball physics**: move the ball by its velocity each frame, scaled by delta time.
3. **Wall bounce**: reflect the vertical velocity at the top and bottom.
4. **Paddle bounce**: reflect the horizontal velocity on paddle contact. Change the vertical velocity based on where the ball hits the paddle, so the angle depends on the hit point.
5. **Scoring and serve**: a point when the ball leaves a side. Reset the ball to the centre and serve toward the player who lost the point.
6. **Speed**: raise the ball speed a little after each hit, capped at a maximum.
7. **Controls**: keyboard for two players, or one player against a simple AI paddle that follows the ball with a speed limit.

## How to build a first version
- Draw two paddles and a ball. Move the paddles and the ball, and bounce off the walls.
- Add paddle bounce with the hit-point angle, then scoring and the serve.
- Add the AI opponent and the speed-up last.

## Pitfalls
- A ball that gets stuck inside a paddle reverses many times. Push it out of the paddle on contact.
- A purely reflected angle makes rallies repeat forever. The hit-point angle prevents this.
- An AI that is perfect is unbeatable. Limit its speed.

## Suggested scope for a prototype
Two paddles, one ball, bounces, scoring, serve and a local two-player mode. The AI opponent can follow.

## Notes
Written from general knowledge of the genre, without web checks.
