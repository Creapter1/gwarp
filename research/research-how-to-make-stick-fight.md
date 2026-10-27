# Research: how to make Stick Fight
Genre: 2D physics platform fighter (local multiplayer)

## What the game is
A small arena, usually a few floating platforms, where two to four stick-figure fighters try to knock each other off the screen. Players run, jump, grab weapons that drop in, and attack. Each round ends when one fighter is left, and the first to a set number of wins takes the match. The fun comes from physics: knockback, ragdoll-style falls, and chaotic weapon pickups.

## Core mechanics to build
1. **Movement**: left/right run with acceleration and friction, a jump with variable height (release early to fall faster), and a double jump or air control if you want it.
2. **Collision**: platforms are solid from above only (one-way) or fully solid. Fighters use rectangle hitboxes for the body and a separate, smaller box for attacks.
3. **Attacks**: a melee swing creates a short-lived hitbox in front of the fighter for a few frames. On hit, apply damage and knockback (a velocity added in the direction away from the attacker).
4. **Knockback and death**: a fighter's damage raises the knockback it takes. When it leaves the arena bounds, it dies and respawns or loses a point.
5. **Weapons**: spawn a random weapon (sword, spear, gun) at a timer. Pick it up on contact. Weapons have their own hitbox and ammo or durability.
6. **Rounds**: a round state machine (countdown, fight, round end, match end) keeps the flow clear.
7. **Input**: keyboard for two players on one keyboard is enough (e.g., WASD and arrows). Gamepad support comes later.

## How to build a first version
- Use a fixed-timestep physics loop (or a fixed delta with a cap) so knockback feels the same on every machine.
- Start with two players, two platforms and one melee attack. Add knockback and the off-screen death check before anything else.
- Add weapons only after the basic hit feels good. Hit feel comes from knockback strength, a short hit-stop pause (a few frames freeze on impact), and a visible flash on the target.
- A 2D physics engine (such as Box2D or Matter.js) can handle platforms, but a custom AABB system is enough for stick figures and makes the feel easier to tune.

## Pitfalls
- Knockback that is too strong makes fights random. Tune it with a number that rises with damage.
- Fighters can get stuck in the corners of platforms. Use a small skin width when resolving collisions.
- Weapons that spawn inside a fighter's hitbox cause instant unfair hits. Add a short grace period after a spawn.
- Frame-rate-dependent movement breaks the physics on high-refresh screens. Multiply by delta time.

## Suggested scope for a prototype
One arena, two local players, melee only, knockback, respawn-free rounds, first to three wins. Everything else is extra.

## Notes
This file was written without web checks. Verify the exact feel and weapon list against the game itself before copying specifics.
