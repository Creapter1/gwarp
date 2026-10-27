# Research: how to make Cookie Clicker
Genre: idle / incremental clicker

## What the game is
The player clicks a large cookie to earn cookies. The cookies buy buildings and upgrades that produce cookies automatically over time, and each purchase makes the next one cost more. The fun comes from watching the numbers grow and choosing what to buy next.

## Core mechanics to build
1. **Click income**: each click adds a fixed amount, which upgrades can raise.
2. **Passive income**: each building adds a cookies-per-second rate. Total the rates and add the amount earned each tick.
3. **Costs that scale**: multiply each building's cost by a factor (about 1.15) for every one owned. This keeps purchases meaningful.
4. **Buy and upgrade**: check the balance before buying. Upgrades multiply a building's or the click's output.
5. **Time**: use the real elapsed time (`Date.now()` differences) for income, so the game earns while the tab is closed.
6. **Saving**: store the state in localStorage on a timer and on exit. Reload it on start and add the offline income.
7. **Number display**: format large numbers with suffixes (K, M, B) or scientific notation.

## How to build a first version
- Build the click, one building with a cost and a rate, and the cookie count on screen.
- Add the scaling cost, the second building and an upgrade.
- Add saving and the offline catch-up last.

## Pitfalls
- Adding income per frame makes the numbers depend on the frame rate. Add it from the elapsed time.
- Floating-point errors show up in large numbers. Round the display, not the stored value.
- Offline catch-up that is unlimited breaks balance. Cap it at a few hours.

## Suggested scope for a prototype
A clickable cookie, two buildings with scaling costs, click and passive income, a count display and save to localStorage. Upgrades and achievements come later.

## Notes
Written from general knowledge of the genre, without web checks. The cost growth factor is a starting point and should be tuned by playing.
