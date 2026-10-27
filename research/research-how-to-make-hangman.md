# Research: how to make Hangman
Genre: word-guessing puzzle

## What the game is
The game picks a secret word and shows a blank for each letter. The player guesses one letter at a time. Correct letters fill in their blanks. Each wrong guess adds a part to a stick figure. The player wins by revealing the word before the figure is complete, and loses if it is.

## Core mechanics to build
1. **Word list**: keep an array of words, and pick one at random at the start of each round.
2. **Display**: show each letter of the word as a blank, or the letter if it has been guessed.
3. **Guess handling**: convert input to lower case. Ignore letters already guessed, and non-letter keys.
4. **Wrong guesses**: count each wrong letter and draw one more part of the figure.
5. **Win and lose**: win when every letter is revealed. Lose after a fixed number of wrong guesses, and show the word.
6. **Letter buttons**: show the alphabet as buttons, and disable each button after it is used.

## How to build a first version
- Pick a word, show the blanks, and handle keyboard guesses.
- Add the wrong-guess counter and the stick figure drawing.
- Add the win and lose states, a new round, and the letter buttons.

## Pitfalls
- Counting a repeated guess as wrong is unfair. Ignore letters the player already tried.
- Case mismatches make correct letters look wrong. Normalise to lower case.
- Words with spaces or hyphens need special display rules. Keep the first version to plain letters.

## Suggested scope for a prototype
A small word list, blanks, keyboard guesses, a six-part figure, win and lose, and a new round.

## Notes
Written from general knowledge of the genre, without web checks.
