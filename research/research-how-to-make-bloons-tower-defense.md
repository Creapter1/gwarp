# Research: how to make Bloons Tower Defense
Genre: tower defence with balloons

## What the game is
Balloons (bloons) travel along a fixed path. The player places monkey towers beside the path. Towers pop balloons with darts and other attacks. The goal is to stop every balloon before it reaches the end, across a series of rounds that grow harder.

## Characters and enemies
- **Balloons**: the enemies. Each colour has a set number of layers. Stronger colours have more layers, and some resist certain attacks.
- **Towers**: the player's units. Start with a dart tower.
- **Path**: a fixed route of waypoints the balloons follow.

## Step by step
1. Draw a path as a list of waypoints, and render it as a band.
2. Spawn balloons at the start, and move each one along the waypoints at a set speed.
3. Give each balloon a layer count. Lose one layer per hit, and remove it at zero.
4. Add the dart tower. Place it on a free tile beside the path, not on it.
5. Make the tower target the balloon nearest the end of the path within its range.
6. Fire darts at the target, with a cooldown between shots.
7. Add a lives counter. Lose a life for each balloon that reaches the end.
8. Add money. Earn it for each popped balloon, and spend it on towers.
9. Add rounds: a set of balloons per round, with more layers and speed each round.

## What to add
- Upgrades for towers, such as faster shots or more darts.
- A round counter and a start button.

## What not to add
- Many tower types in the first version. One tower is enough.
- Balloon resistance rules. They add complexity for little gain at the start.

## Pitfalls
- Targeting by distance to the tower instead of progress along the path gives odd results. Target the furthest balloon along the path.
- Placing towers on the path breaks the game. Check the tile is free and off the path.

## Suggested scope for a prototype
One path, balloons with layers, a dart tower that targets along the path, lives, money, and three rounds.

## Notes
Written from general knowledge of the genre, without web checks.
