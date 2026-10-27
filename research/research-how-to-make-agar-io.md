# Research: how to make Agar.io
Genre: multiplayer cell-eating arena (io game)

## What the game is
Each player controls a circular cell in a large open arena. The cell moves toward the mouse. Eating food pellets and smaller cells makes it bigger. Bigger cells move more slowly. A larger cell can eat a smaller one, and it can be eaten in turn. Splitting and viruses add risk. The camera zooms out as the cell grows.

## Core mechanics to build
1. **Movement**: move the cell toward the cursor at a speed that falls as its radius grows.
2. **Eating**: a cell eats another when its circle overlaps enough and it is noticeably larger. Area adds mass, so grow the radius from the total area.
3. **Food**: keep a fixed number of pellets on the map. Respawn them as they are eaten.
4. **Camera**: centre on the player and scale the view down as the radius grows.
5. **Multiplayer**: the server owns the world state (positions, sizes, food). Clients send only their target direction and receive the state each tick.
6. **Interest area**: send each client only the entities near it, to keep traffic down.
7. **Score**: track the mass of the largest cell and show a leaderboard.

## How to build a first version
- Build a single-player arena with food and one cell. Make movement slow down with size and the camera zoom out.
- Add eating by size comparison, then a simple bot opponent to test the rules.
- Move the world state to a server only after the single-player rules feel right.

## Pitfalls
- Trusting the client's positions or sizes lets players cheat. Keep the world on the server and validate input.
- Sending the whole world to every client does not scale. Send only nearby entities.
- Eating rules that depend on exact overlap feel random. Use a clear size ratio.

## Suggested scope for a prototype
A single-player arena with a cell, food, eating by size, growing and slowing, and a zooming camera. Multiplayer needs a server and comes later.

## Notes
Written from general knowledge of the genre, without web checks. Multiplayer needs a server, which is more work than the rest of the list.
