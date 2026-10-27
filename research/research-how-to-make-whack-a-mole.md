# Research: how to make Whack-a-Mole
Genre: timed reaction arcade

## What the game is
Moles pop up from holes in a grid. The player clicks or taps a mole before it goes back down. Each hit scores points. The game lasts a fixed time, and the moles appear faster as it goes on.

## Core mechanics to build
1. **Holes**: store the holes as a grid of objects, each with an up state and a timer for how long it stays up.
2. **Spawning**: each tick, pick a random hole that is down and raise a mole. Limit how many moles are up at once.
3. **Hit check**: when the player clicks, check whether the hole under the pointer has a mole up. Score it and lower the mole.
4. **Speed**: shorten the time a mole stays up and the gap between spawns as the timer runs down.
5. **Timer**: count down from a set time, and end the game at zero.
6. **High score**: save the best score in localStorage.

## How to build a first version
- Draw a 3 by 3 grid of holes. Raise and lower moles on a timer.
- Add click detection and the score.
- Add the countdown timer, the speed-up and the high score.

## Pitfalls
- Using only a random delay can make the game feel unfair. Keep spawn timing within set bounds.
- A click that lands just after a mole drops should not score. Check the state at the moment of the click.
- Too many moles at once is frustrating. Cap the number that can be up.

## Suggested scope for a prototype
A 3 by 3 grid, timed moles that rise and fall, click scoring, a countdown and a restart.

## Notes
Written from general knowledge of the genre, without web checks.
