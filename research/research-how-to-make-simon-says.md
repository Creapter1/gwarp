# Research: how to make Simon Says
Genre: memory and pattern game

## What the game is
The game lights up coloured pads in a sequence, and plays a matching sound for each. The player must repeat the sequence by pressing the pads in the same order. Each round adds one more step to the sequence. A wrong press ends the game.

## Core mechanics to build
1. **Sequence**: store the sequence as an array of pad indexes. Add one random pad each round.
2. **Playback state**: while the sequence plays, ignore player input. Light each pad for a short time, with a gap between pads.
3. **Input state**: during the player's turn, check each press against the next expected step in the sequence.
4. **Round end**: when the player finishes the sequence correctly, pause briefly and start the next round with one more step.
5. **Game over**: a wrong press flashes the pads and shows the score, which is the number of completed rounds.
6. **Sound**: play a different tone for each pad. Start the audio after a user gesture, because browsers block autoplay.

## How to build a first version
- Draw four pads and light one at a time from a sequence array.
- Add the player's turn, with a wrong-press check.
- Add the round loop, the score and a restart.

## Pitfalls
- Accepting input during playback lets players cheat. Use a clear state flag.
- Browsers block audio until the user interacts with the page. Start sound after a click.
- Pads that light for too short a time are hard to follow. Start slow and speed up gradually.

## Suggested scope for a prototype
Four pads, a growing sequence with playback, player input checks, a score and a restart. Sound can come later.

## Notes
Written from general knowledge of the genre, without web checks.
