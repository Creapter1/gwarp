# Research: how to make Geometry Dash
Genre: 2D auto-scrolling rhythm platformer

## What the game is
The player controls a square (the cube) that moves right automatically at a fixed speed. The only input is jump (tap or hold). Levels are a run of spikes, blocks, portals and pads, timed to the music. One hit ends the attempt and the level restarts from the beginning.

## Core mechanics to build
1. **Auto-scroll**: the camera and the player move at constant speed. The player only changes vertical velocity.
2. **Gravity and jump**: a constant downward acceleration, with a jump impulse on press. Hold-to-jump behaviour is useful for the ship and ball modes.
3. **Hazard collision**: spikes use a small, forgiving hitbox (smaller than the sprite) so near misses feel fair.
4. **Portals and modes**: a portal changes the player's form (cube, ship, ball, UFO, wave). Each form has its own gravity and control rules.
5. **Level format**: a list of objects with x positions in beats or in pixels. Storing levels as data makes them easy to edit.
6. **Music sync**: the level clock comes from the audio playback time, not from frame counts. This keeps the obstacles on the beat.
7. **Attempts and progress**: a progress bar shows how far through the level the player is. Count attempts.

## How to build a first version
- Build one form (cube) with gravity, jump, spike collision and one level of about 30 seconds.
- Drive all positions from the audio clock, using `audio.currentTime` in the browser.
- Add a simple checkpoint-free restart and a progress bar. Add portals and extra forms after the cube feels right.

## Pitfalls
- Using frame counts for timing drifts away from the music on slow or fast machines. Use the audio clock.
- Hitboxes that match the sprite exactly feel unfair. Shrink them slightly.
- Level editing with raw pixels becomes hard to maintain. Use beat-based positions if you can.

## Suggested scope for a prototype
One 30-second level, the cube form only, spike and block hazards, a progress bar and instant restart.

## Notes
Written from general knowledge of the genre, without web checks. Verify the exact mechanics against the official game before relying on specifics.
