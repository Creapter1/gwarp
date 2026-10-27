# Research: how to make Doodle Jump
Genre: vertical endless platformer

## What the game is
The player's character bounces upward from platform to platform. The screen scrolls up as the character climbs, and falling below the screen ends the run. The character wraps around the side edges. The score counts the height reached. Platforms can break, move, or be replaced by enemies.

## Core mechanics to build
1. **Bounce physics**: gravity pulls the character down. Landing on a platform while falling sets a fixed upward velocity, so each platform is a bounce.
2. **Camera**: scroll the view upward only, when the character is above the middle of the screen. Never scroll down.
3. **Platform generation**: create platforms ahead of the camera as it rises, and remove the ones below. Keep the vertical gap within a reachable range.
4. **Side wrap**: when the character leaves one side, reappear on the other side.
5. **Platform types**: normal (always solid), moving (slides side to side), breakable (disappears after one bounce). Add them as the score rises.
6. **Landing check**: count a landing only when the character is falling and its feet pass through the platform top this frame.
7. **Score**: height reached, shown as the score.

## How to build a first version
- Draw one character, gravity and the bounce on a platform. Make the screen scroll upward.
- Generate platforms with a fixed reachable gap, and remove the ones off the bottom.
- Add side wrap, then moving and breakable platforms, then the score.

## Pitfalls
- Landing checks that trigger while rising let the character stick to platforms. Count landings only while falling.
- A vertical gap that is too big makes the game impossible. Keep it within the reachable jump height.
- Camera movement downward feels disorienting. Scroll up only.

## Suggested scope for a prototype
One character with bounce physics, a scrolling camera, reachable platform generation with a fixed gap, side wrap and a height score. Moving and breakable platforms come later.

## Notes
Written from general knowledge of the genre, without web checks.
