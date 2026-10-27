# Research: how to make Centipede
Genre: fixed-shooter arcade

## What the game is
A centipede made of segments winds down through a field of mushrooms. The player moves a shooter along the bottom and fires upward. Each shot that hits a segment splits the centipede. The goal is to clear every segment.

## Characters and enemies
- **Shooter**: the player. Moves in the bottom area and fires one shot at a time.
- **Centipede**: a chain of segments. The head turns at walls and mushrooms, and drops a row when it hits an edge.
- **Mushrooms**: obstacles. Each takes several hits to clear, and turns the centipede around.
- **Spider** (optional): a fast enemy that moves across the lower screen.

## Step by step
1. Draw a grid of mushrooms in the upper area.
2. Draw the shooter in the bottom area, with left, right and up limits.
3. Add a shot that travels up. Allow one shot on screen at a time.
4. Make the centipede a list of segments. Move the head one cell per tick, following the segment behind it.
5. When the head hits a mushroom or edge, turn it and drop one row.
6. When a shot hits a segment, remove it. Turn the segment behind into a new head, which splits the chain.
7. Add a damage count to mushrooms, and remove a mushroom when it reaches zero.
8. Lose a life when a segment touches the shooter.
9. Start a new, faster wave when the centipede is gone.

## What to add
- A score for each segment and each mushroom.
- A high score in localStorage.

## What not to add
- The spider in the first version. Add it after the splitting works.

## Pitfalls
- A split that leaves a head in the wrong place breaks the chain. Test a split near a wall.
- Mushrooms that are never cleared can block the shooter. Keep the bottom area clear.

## Suggested scope for a prototype
A mushroom field, a shooter, one shot at a time, a centipede that splits and turns, lives, waves and a score.

## Notes
Written from general knowledge of the genre, without web checks.
