# Research: how to make Missile Command
Genre: defence arcade

## What the game is
Enemy missiles fall from the top of the screen toward cities and missile bases at the bottom. The player aims and fires counter-missiles that explode at the clicked point. The goal is to protect the cities for as many waves as possible.

## Characters and enemies
- **Cities**: the player's assets. Losing all of them ends the game.
- **Missile bases**: the player's launchers, each with a limited number of shots.
- **Enemy missiles**: fall in straight lines toward a target. Some split into several.
- **Bombers**: optional, drop missiles while moving across the top.

## Step by step
1. Draw the ground, six cities and three missile bases.
2. Spawn enemy missiles at the top with random start points, falling toward a random city or base.
3. Add a click handler. Fire a counter-missile from the nearest base that still has ammo, toward the click.
4. Move the counter-missile at a set speed. Explode it when it reaches the click point.
5. Make the explosion a circle that grows and then fades. Destroy any enemy missile inside it.
6. Destroy a city or base when an enemy missile reaches it.
7. Track ammo per base. Refill them at the end of each wave.
8. Add waves: more and faster missiles each wave.
9. Add a score for each enemy destroyed, and a bonus for each surviving city.

## What to add
- A count of ammo shown on each base.
- A wave bonus screen.

## What not to add
- Many weapon types in the first version.
- Enemy AI that aims. Random targets are enough.

## Pitfalls
- An explosion that is too small lets missiles slip through. Size it from the playtest.
- Choosing the wrong base to fire from makes the game feel unfair. Use the nearest base with ammo.

## Suggested scope for a prototype
Six cities, three bases with ammo, click to fire, growing explosions, falling missiles, waves and a score.

## Notes
Written from general knowledge of the genre, without web checks.
