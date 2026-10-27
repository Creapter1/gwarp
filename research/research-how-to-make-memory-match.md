# Research: how to make a memory card match game
Genre: card-flipping memory puzzle

## What the game is
Cards are laid face down in a grid. Each card has a pair somewhere else on the board. The player flips two cards per turn. If they match, they stay face up. If not, they flip back. The goal is to find all the pairs in as few moves as possible.

## Core mechanics to build
1. **Deck**: make a list of pairs, add two copies of each symbol, then shuffle it.
2. **Card state**: each card has a symbol, a face-up flag and a matched flag.
3. **Two-card turn**: allow at most two face-up cards at once. Ignore clicks on matched or already face-up cards.
4. **Match check**: when two cards are up, compare their symbols. Mark them matched, or flip them back after a short delay.
5. **Input lock**: while the mismatch delay runs, block further clicks, so a third card cannot be flipped.
6. **Win and score**: count moves, and end the game when every pair is matched.

## How to build a first version
- Make a 4 by 4 grid of face-down cards with a shuffled deck.
- Add the flip and the two-card match check with a delay.
- Add the input lock, move counter and win state.

## Pitfalls
- Without an input lock, a fast player can flip three cards, which breaks the rules.
- Clicking the same card twice should not count as a match. Compare the card indexes.
- Shuffling with a biased sort gives uneven boards. Use Fisher-Yates.

## Suggested scope for a prototype
A 4 by 4 grid, shuffled pairs, flip and match with a delay, a move counter and a win message.

## Notes
Written from general knowledge of the genre, without web checks.
