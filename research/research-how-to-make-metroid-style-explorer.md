# Research: how to make a Metroid-style explorer
Genre: side-view exploration action with unlockable abilities

## What the game is
The player explores a connected map of rooms. Early areas are reachable at once. Others are locked until the player finds an ability, such as a double jump or a stronger weapon. The goal is to explore, fight enemies and reach the final area.

## Characters and enemies
- **Hero**: runs, jumps and shoots. Gains abilities from items found in the map.
- **Enemies**: each room has a few, such as crawlers that walk on the floor and flyers that move in arcs.
- **Doors and gates**: some are locked until the matching ability is found.
- **Boss**: a single, large enemy at the end of the map, with a pattern to learn.

## Step by step
1. Build a map as a grid of rooms. Each room is a tile layout with exits on its edges.
2. Add movement: running, jumping and gravity, using the same ground checks as a platformer.
3. Move between rooms when the hero reaches an exit. Keep the room state so enemies stay dead.
4. Add a shot that travels straight and hits enemies or walls.
5. Add enemies, with health and a patrol pattern. Give each one a damage value.
6. Add a locked door that opens only when the matching ability is held.
7. Place an ability item in a room, and give the ability when the hero picks it up.
8. Add a map screen that shows explored rooms.
9. Save the state (abilities and cleared rooms) to localStorage.

## What to add
- A map screen, which helps the player find their way.
- Health pickups placed in rooms, to make exploration safe.

## What not to add
- A large open world in the first version. Two or three rooms are enough.
- Many abilities. Start with one locked door and one ability.

## Pitfalls
- A gate that the hero can get stuck behind can soft-lock the game. Check the route from the start to each ability.
- Room state that is not saved causes enemies to respawn. Store which enemies are dead.

## Suggested scope for a prototype
Four connected rooms, running and jumping, a shot, two enemy types, one locked door with its ability, and a save of progress.

## Notes
Written from general knowledge of the genre, without web checks.
