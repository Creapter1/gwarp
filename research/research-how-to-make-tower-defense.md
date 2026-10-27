# Research: how to make tower defense
Genre: strategy, placing towers along a path

## What the game is
Enemies walk along a fixed path from a spawn point to a base. The player places towers beside the path. Towers shoot at enemies in range. Each wave is harder, and the player earns money by killing enemies to buy more towers or upgrades. The base loses health when an enemy reaches it.

## Core mechanics to build
1. **Path**: define the path as an ordered list of points. Enemies move from one point to the next.
2. **Enemy movement**: move along the path at a set speed, and switch to the next point when they reach the current one. Track progress along the path for targeting.
3. **Tower placement**: allow placement on empty tiles that are not on the path. Use a grid to check this.
4. **Targeting and firing**: each tower picks an enemy in range (the first one along the path works well), and fires a projectile after a cooldown.
5. **Damage and money**: enemies lose health from hits. A kill pays out money.
6. **Waves**: spawn a queue of enemies on a timer. Raise the count and health each wave.
7. **Upgrades** (optional): a tower can be improved for more damage or range.

## How to build a first version
- Draw a fixed path on a grid. Move one enemy along it.
- Add one tower that fires at the nearest enemy in range, plus the health and money.
- Add placement rules, waves, then upgrades.

## Pitfalls
- Targeting the nearest enemy to the tower can switch targets too often. Target the enemy furthest along the path.
- Towers placed on the path block the enemies' route. Reject those tiles.
- A projectile that aims at the enemy's current position misses fast enemies. Aim with lead, or let it home.

## Suggested scope for a prototype
One fixed path, one tower type placed on a grid, enemies that walk the path, health, money from kills and a few waves.

## Notes
Written from general knowledge of the genre, without web checks.
