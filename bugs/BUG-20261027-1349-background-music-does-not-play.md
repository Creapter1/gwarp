# Background music does not play in G-Warp (works in Scratch)

## What happened
In the "Clone Multiplayer - G-Warp Smash remix" project, the Smash Bros. background song never plays in the G-Warp desktop app. The same project plays it fine on Scratch. The user says ANY background music fails in the app.

## Where
Sound playback in the G-Warp desktop (Electron) app - likely the "play sound until done" / "start sound" path used for looping background music, or audio decoding of the project's sound assets.

## Likely cause (unconfirmed)
- Audio context not resumed / autoplay blocked until a user click (Electron/Chromium autoplay policy), or
- the sound format inside the .sb3 (e.g. MP3/ADPCM WAV) not decoded by G-Warp's loader, or
- a looping "forever: play sound until done" that never starts on the music sprite.

## How to fix (next steps)
1. Open the project in G-Warp, open DevTools console, press the green flag, and look for audio/decode errors (the new bug watcher also reports these automatically now).
2. Check which block the music sprite uses and the sound file format.
3. Test the same sound file in a fresh project.

---
Reported by the user (Creapter), written up by Claude, 2026-10-27. Not fixed yet - logged for the bug list.
