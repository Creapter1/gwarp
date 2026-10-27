# Research: how to make a racing game
Genre: top-down or pseudo-3D driving

## What the game is
The player drives a car around a track, trying to finish laps fast or to beat other cars. Steering, acceleration and braking control the car. The track has curves, and the car must stay on the road. Racing games usually show a lap timer and a position.

## Core mechanics to build
1. **Car movement**: keep speed, heading and position. Accelerate with the throttle, turn with steering (more turn at higher speed, less at very high speed), and slow with friction or braking.
2. **Track**: define the track as a closed path of points. Use it for checkpoints and lap counting, and for the off-track test.
3. **Off-track penalty**: check the car's distance to the track centreline. Slow the car when it is off the road.
4. **Checkpoints and laps**: place checkpoints along the path. Count a lap when all checkpoints are passed in order.
5. **AI opponents** (optional): follow the path with a target point a little ahead, with a random speed offset.
6. **Camera**: follow the car, rotated to its heading for a more dynamic look.
7. **Timing**: store the lap time and the best time.

## How to build a first version
- Draw a closed track as a line or a loop of points. Move a car with steering and acceleration.
- Add the off-track slowdown and checkpoints with lap counting.
- Add the lap timer, then AI opponents.

## Pitfalls
- Steering that does not depend on speed makes the car spin on a stop. Scale the turn rate with speed.
- Lap counting that counts the start line twice when the car starts behind it. Require all checkpoints in order.
- Path-following AI that cuts corners fails at sharp bends. Use a target point that moves ahead along the path.

## Suggested scope for a prototype
A closed track, one car with steering, throttle and off-track slowdown, checkpoints, a lap counter and a timer. AI opponents come later.

## Notes
Written from general knowledge of the genre, without web checks.
