# User-request research: Griffpatch and creators who teach strong game-making

**Date:** 26 October 2026  
**Purpose:** Research add-on requested by the user after AIM-K1. This is intended to help G-Warp AI eventually create original, playable, step-by-step showcase demos that users can continue from any saved step or episode.  
**Folder:** `ai-team/shared/2026-10-26-chatgpt-AIM-K1/`  
**Scope boundary:** Research and planning only. This does not start AIM-0, change the model, modify the G-Warp app, or integrate any code.

## 1. Name and research method

The request says “Grift Patch.” The creator matching that description is **Griffpatch** (lowercase channel/profile spelling), the Scratch game creator and tutorial maker:

- Scratch profile: https://scratch.mit.edu/users/griffpatch/
- Griffpatch's curated tutorial studios: https://scratch.mit.edu/users/griffpatch/studios/
- Creator site: https://griffpatch.co.uk/
- Academy: https://griffpatch.academy/
- Tutorial library: https://griffpatchlibrary.com/

This report uses publicly accessible creator pages, Scratch project/studio listings, YouTube video descriptions and chapter timestamps, other creators' course pages, and official engine documentation. It is a research synthesis, not a claim that every video was watched frame-by-frame or that every source code stack has been independently reproduced. Detailed code mechanics should be checked against the linked project/video before being converted into a G-Warp recipe.

**Important distinction:** “Griffpatch” is the Scratch creator. Search results for other products or sites named “Griff” are not automatically the same person and were not treated as Griffpatch material.

## 2. What Griffpatch's tutorials teach us

### A. Start with a working game mechanic, then layer complexity

The first episode of Griffpatch's platformer tutorial deliberately starts with a basic character and the physical rules needed to make it playable. Its chapter sequence covers the backdrop, gravity, ground collision, jumping, walking, horizontal collisions, a jumping fix, and a stuck-to-ceiling bug. There is even a “rethink and innovate” point followed by experimenting with the physics. The series description says later lessons will build toward player animation, wall sliding, slope handling, and moving platforms.

**Reusable lesson:** Do not begin by building a huge engine or decorating a complete world. First make the player do one satisfying thing. Then add one rule at a time, test it, and improve the feel.

Source: Griffpatch, *Code a Platformer Game | 1. The Basics* (16 August 2021).  
https://www.youtube.com/watch?v=D16hTnDGweo

### B. Keep the player's core loop ahead of the world engine

The first episode of Griffpatch's tile-based RPG tutorial starts with a remixable starter project and a player. The chapter list moves from project setup and the game loop to keyboard controls, movement, diagonal-speed normalization, player costumes/direction, and walk animation. The description previews the tile-stamping engine as the next episode's subject. The listed next episodes move through infinite scrolling and tiles, faster/lag-free scrolling, a level editor, tile asset workflows, and layers/onion-skinning.

**Reusable lesson:** Teach the player loop first, then introduce the systems that make a larger world possible. Separate “make the character work” from “make the world engine powerful.” Explain why the next system is needed before adding it.

Source: Griffpatch, *RPG Tutorial | Craft your dream Scratch Game | 1. The Player* (2 September 2022).  
https://www.youtube.com/watch?v=5lof-Nu1VVE

### C. Use a demo series to turn a small mechanic into an exciting showcase

The Griffpatch Geometry Dash tutorial is an especially clear example because its chapter timestamps show a complete playable progression in one video: draw the player, add music, code jumping, draw a level, scroll the level, use clones for scrolling, add spikes, detect collisions, add a smooth ending/deceleration, add a collision sound, then make larger levels using costume switching. The video description frames it as a step-by-step Scratch game recreation and points learners to the next episode.

**Reusable lesson:** Each step should make the project visibly more game-like. Movement alone is a first win; a level gives it a purpose; obstacles make a challenge; collisions create stakes; sound and movement feedback make events readable; more levels create replay value.

Source: Griffpatch, *Geometry Dash — “How to make a Scratch Game”* (19 August 2023).  
https://www.youtube.com/watch?v=FYZ1bfB1nho

### D. Supply a starter point and a recoverable checkpoint

The Griffpatch tile-scrolling asset project is described as a starter project for parts 1–20. It invites learners to remix it and follow the series; episode one teaches a scrolling grid of tile clones, and the project notes point to completed scripts for episode six for learners who have fallen behind.

**Reusable lesson:** A good showcase should have a clean starting state, a link to its source lesson, and a known-good checkpoint. The learner should not need to reconstruct a missing step from memory. G-Warp should preserve each finished step as a named, playable version.

Source: Griffpatch Tutor, *Tile Scrolling Tutorial Assets | Parts 1 to 20* (Scratch project; shared 7 June 2021).  
https://scratchstats.org/projects/485855713

### E. Organize a long-term learning path, not only isolated videos

Griffpatch's Scratch profile and curated studios show a broad spread of series and mechanics, including classic platformers, Geometry Dash, 3D raycasting, multiplayer/cloud projects, RPG, text engines, pathfinding, maze generation, car steering, projectile physics, sprite layering, effects, health bars, mobile controls, and more. The profile also identifies a “Moonleaf Summer Tutorial Series” as a current area of work at the time checked.

The Griffpatch Academy publicly describes its learning format as guided game builds that proceed step by step and video by video, with a growing project library. Its page also describes supporting PDFs, scripts, workbooks, downloadable graphics, Q&A/debugging videos, updates, and game jams. This is the Academy's own description of its offering, not an independent audit of course quality.

**Reusable lesson:** G-Warp should build a searchable library of connected series and reusable mechanics, not one giant unstructured pile of advice. A user should be able to enter a series at the beginning, choose a later checkpoint, or branch into a related mechanic.

Sources:
- Griffpatch Scratch profile: https://scratch.mit.edu/users/griffpatch/
- Griffpatch curated studios: https://scratch.mit.edu/users/griffpatch/studios/
- Griffpatch Academy: https://griffpatch.academy/

## 3. What other strong creators contribute

These creators teach different parts of the craft. G-Warp should learn from the differences rather than copy one creator's style as a universal rule.

### Brackeys — complete beginner builds and visible iteration

Brackeys' *How to make a Video Game — Godot Beginner Tutorial* is a single long, chaptered build. Its timestamps progress through choosing a game, assets, player 1.0, worldbuilding 1.0, platforms, pickups, dying 1.0, worldbuilding 2.0, enemies, dying 2.0, player 2.0, text, score, audio, and export. The description also points to assets and a finished project.

**What G-Warp can learn:** Show an actual complete loop, not only isolated code snippets. Version labels such as “Player 1.0” and “Player 2.0” make improvement visible. Reserve a final step for presentation, audio, and exporting so the demo ends with something the learner can show.

Source: Brackeys, *How to make a Video Game — Godot Beginner Tutorial* (28 April 2024).  
https://www.youtube.com/watch?v=LOhfqjmasi0

### GDQuest — clear components, scenes, and test levels

GDQuest's beginner 2D game series is arranged in sections for the player, enemy, and test level. Its timestamps cover project and scene setup, player movement, gravity, limiting speed, floor and physics layers, input, jump behaviour, enemy creation, enemy death, the player's death, camera improvement, and a mini level.

**What G-Warp can learn:** Keep responsibilities understandable. Teach one component at a time, make it work, then connect it to another component. Include a small test level where the learner can actually check movement and collisions before adding a large world. GDQuest marks this tutorial under a CC-BY 4.0 licence in the video description; G-Warp must still follow the exact attribution/licence conditions before reusing any material.

Source: GDQuest, *Make Your First 2D Game with Godot: Player and Enemy* (2 October 2019).  
https://www.youtube.com/watch?v=Mc13Z2gboEk

### HeartBeast — a progression of increasingly capable games

HeartBeast's 1-bit Godot course explicitly divides learning into four projects of increasing scope: Rocket Launch (project setup, assets, scenes, nodes, scripts), Piggy Game (sprite animation, movement, collisions), Space Shooter (menus, game-wide data, particles, audio, high scores), and Metroidvania (advanced platform physics, autotiling, enemy types, bosses, upgrades, saving/loading, menus, pause, and music). The creator describes each lesson as a small “learning bit” that pairs two related concepts.

His action-RPG course description also makes the progression clear: the YouTube series is a sequence of features, while the full course extends it with inventory, save/load, and enemy pathfinding.

**What G-Warp can learn:** Build a reusable curriculum with manageable lessons. Pair concepts that are naturally used together. Let early projects teach basic controls and collisions; later projects can re-use those foundations for menus, saving, enemy systems, and larger game genres.

Sources:
- HeartBeast, *1-bit Godot 4 Course*: https://www.heartgamedev.com/1-bit-godot-4-course
- HeartBeast, *Be a Game Maker* course bundle: https://www.heartgamedev.com/be-a-game-maker-bundle

### Clear Code — teach transferable foundations, then apply them to different genres

Clear Code's *The new ultimate introduction to Godot* teaches editor basics, coding, logic, variables, properties, booleans, data, and functions before moving into three games: a runner/Frogger-style game, a platformer, and a 3D space shooter. Its timestamps show the same fundamentals applied in multiple settings.

**What G-Warp can learn:** Some demos should teach a genre, while other demos should teach a reusable idea that appears across genres. For example, input, variables, collisions, and data should be taught once in a simple setting and then shown again in a different game so the learner sees the pattern transfer.

Source: Clear Code, *The new ultimate introduction to Godot* (16 October 2025).  
https://www.youtube.com/watch?v=TLG2yVpLDT8

### Mark Brown / Game Maker's Toolkit — prototype to answer a question

Mark Brown's Game Dev 101 article explains that a prototype is not merely a low-quality copy of the finished game. It should be a small, specific sample that answers a question: is a mechanic fun, viable, understandable, or worth further work? The article recommends making many small prototypes, showing playable versions to other people, and using feedback to decide whether to continue, adjust, or abandon an idea. It also describes prototyping as something useful during development, not only before production.

**What G-Warp can learn:** A demo does not always need to become a full game. Sometimes the best result is a short mechanic test: one jump feel, one enemy behaviour, one weapon, one tile rule, or one camera style. Let the user compare variants and keep the one that feels best.

Source: Mark Brown, *What's the point of prototyping?* (Game Dev 101, 5 November 2025).  
https://gmtk.substack.com/p/whats-the-point-of-prototyping

### Official Godot documentation — a reliable end-to-end teaching structure

Godot's official *Your first 2D game* walkthrough builds a complete dodge-the-enemies game. Its contents are organized into project setup, player scene, player coding, enemy creation, main game scene, heads-up display, and finishing. It provides starter assets and links to completed source code.

**What G-Warp can learn:** A showcase should have a clear table of contents, a start project, a finished result, and a sequence that builds from player behaviour through enemies and UI into a complete experience. Official engine documentation is also a useful standard for checking terminology and fundamentals.

Source: Godot Engine, *Your first 2D game* documentation.  
https://docs.godotengine.org/en/latest/getting_started/first_2d_game/index.html

## 4. Combined lessons for G-Warp AI

The strongest common method is **small playable steps that accumulate into a complete experience**. The creators use different tools and styles, but the teaching patterns that transfer well are:

1. **Start with the player's experience.** Define what the player can do, what the goal is, and what makes the action satisfying before building a large system.
2. **Make the first build playable quickly.** A moving character or one working puzzle is a better first checkpoint than a large empty world.
3. **Add one meaningful feature at a time.** Each episode should introduce a mechanic or system the player can notice.
4. **Explain the reason for each system.** For example, add a tile engine because a hand-built level is becoming too large, not because tile engines are impressive.
5. **Keep working versions.** Each step should open as its own known-good project snapshot.
6. **Test the mechanic in a small test area.** Use a simple test room before building a large campaign.
7. **Improve feel deliberately.** Tune movement, timing, animation, collision response, sound, feedback, and camera behaviour after the base mechanic works.
8. **Show a visible result.** The learner should be able to play the new feature immediately and understand what changed.
9. **Offer creative freedom.** Once a mechanic works, invite the learner to change character, level, speed, controls, theme, rules, or difficulty.
10. **Use feedback to choose the next step.** Keep, adjust, branch, or discard a prototype based on play, not only on how clever the code looks.
11. **Finish a small game.** At least some series should reach a title/start state, goal, failure/retry, score or result, sound, and a saved/exportable demo.
12. **Keep learning reusable.** Index the mechanic separately from the original series so the AI can reuse the concept in a different original game.

## 5. Proposed G-Warp showcase format

This is a recommended future format, not implemented in this research task.

Every showcase series should have a title, creator inspiration, original source links, genre, what the learner will build, and an estimated number of steps. Each episode/step should contain:

- **Step number and name:** for example, “Step 03 — Jump and land.”
- **What changes:** a one-sentence description of the new mechanic.
- **Why it matters:** the game-design reason for adding it.
- **Starting point:** the previous verified checkpoint or a clean starter project.
- **Build actions:** a short, ordered checklist of G-Warp blocks/tools to use.
- **Play test:** a concrete action the learner should try.
- **Expected result:** what the player should see or feel.
- **Known limitations:** what is not built yet.
- **Checkpoint:** save a named version after the step.
- **Continue choices:** Continue to the next step, branch/customize this step, jump to another saved step, or return to an earlier checkpoint.
- **Source and attribution:** direct creator/video/project links and notes about what was studied.

A step must not be marked finished just because blocks were generated. It should be checked against an actual playable result. The AI should say whether that check was source-only, static analysis, or runtime-tested.

### The user's “continue from episode 3” idea

Each step should remain an independent entry point. A user who likes Step 3 should be able to open the Step 3 checkpoint and continue building from there. The AI should not force the user to replay Steps 1 and 2. It should explain any assumptions that later steps expect and either use the saved checkpoint or show which prerequisites are missing.

Possible continuation choices:
- Continue the original build from the next step.
- Make a personal branch from this checkpoint.
- Change the art/theme while keeping the mechanic.
- Add an optional side feature.
- Compare two playable versions of the same mechanic.
- Return to an earlier checkpoint and try another direction.

### First original demo candidates

These are suggested study-inspired builds. They are not copies of Griffpatch's projects and should use original characters, levels, art, sounds, names, and code.

**A. G-Warp Platformer Lab** (Griffpatch platformer lesson structure + GDQuest's test-level discipline)
1. Make a controllable hero.
2. Add gravity and a floor.
3. Add jumping and a clear landing test.
4. Add wall/edge collision and fix stuck cases.
5. Add one collectible and one hazard.
6. Add animation and feedback.
7. Add a camera/scrolling stage if supported.
8. Add a simple level finish and restart.
Optional branches: moving platforms, slope movement, wall sliding, extra jumps, or a small level editor.

**B. G-Warp Arcade Runner** (Geometry Dash chapter progression + Brackeys' full game loop)
1. Draw an original player and define one button action.
2. Add a short music loop.
3. Build a short level strip.
4. Add scrolling and one obstacle.
5. Add collision and a fail/retry state.
6. Add sound and a small visual reaction.
7. Add speed changes or a second level.
8. Add a start/result screen and save/export.
Optional branches: new obstacle types, speed patterns, custom tracks, difficulty modes.

**C. G-Warp Top-Down Adventure** (Griffpatch RPG player-first approach + HeartBeast's RPG progression)
1. Make a hero and top-down movement.
2. Normalize diagonal movement and add idle/walk animation.
3. Build one small room and wall collision.
4. Add one object that can be collected or interacted with.
5. Add an enemy with one simple behaviour.
6. Add health/damage feedback.
7. Add a second room or a small map system.
8. Add a goal, transition, and save point.
Optional branches: inventory, NPC dialogue, multiple enemy patterns, quests, or a level editor.

Before generating any of these, G-Warp AI must map every required mechanic to the current G-Warp block catalog and current runtime. If a block or tool is unavailable or unverified, the AI must either choose a supported alternative or label that step as a future gap. This research note does not certify that all mechanics above are currently supported by G-Warp.

## 6. Research library design for ongoing learning

To make this knowledge useful after the real G-Warp AI is built, store concise structured records rather than copying entire videos or tutorials.

Recommended record fields:
- Creator and channel/site.
- Tutorial/series title and direct URL.
- Publish date (when available) and last checked date.
- Game genre and target tool/engine.
- Step/episode number and timestamp.
- Mechanic being taught.
- Prerequisites and concepts it builds on.
- What the creator visibly demonstrates.
- G-Warp equivalent block types/tools, only after mapping and verification.
- A short original demo idea inspired by the mechanic.
- License/credit status for any assets or code considered for reuse.
- Evidence level: creator page, video description/chapters, source project inspected, source code inspected, or runtime tested.
- Open questions and next research action.

A future research update should:
1. Recheck creator profiles and series pages for new work.
2. Add only sources with a clear link and identifiable author/creator.
3. Extract the lesson structure and mechanic, not a wholesale copy of the content.
4. Compare the mechanic with G-Warp's current catalog and tested runtime.
5. Add a new original demo/checkpoint only after the necessary mechanics are supported.
6. Keep source links, dates, attribution, and evidence labels with the saved record.
7. Update or retire stale notes when a video, project, engine, or G-Warp feature has changed.

This is an ongoing library goal, not a claim that G-Warp can know “every game” immediately. Public tutorials are a starting collection; future research can add other engines, genres, independent developers, design talks, postmortems, and official documentation.

## 7. Copyright, attribution, and accuracy rules

- Learn general mechanics, design patterns, and tutorial structure. Do not copy a creator's full block stacks, source code, levels, art, music, sprites, characters, logos, thumbnails, or branding unless a source's licence explicitly permits that reuse.
- Build original G-Warp projects that demonstrate the same general idea in a new way.
- Credit inspiration clearly: “Study inspired by [creator/series], source: [link]. Original G-Warp demo and assets.”
- Check the licence and attribution requirements for every external asset. A video being public does not automatically grant permission to copy its assets or code.
- Do not imply that Griffpatch, Brackeys, GDQuest, HeartBeast, Clear Code, Mark Brown, or Godot endorse, sponsor, or are affiliated with G-Warp.
- Separate observed facts from interpretation. Video titles and timestamps tell us the teaching sequence, but not every internal implementation detail.
- Never claim a demo works until the actual G-Warp runtime has been tested.

## 8. Research sources

All links below were checked on **26 October 2026**.

### Griffpatch
1. Scratch profile — https://scratch.mit.edu/users/griffpatch/
2. Scratch studios and curated series — https://scratch.mit.edu/users/griffpatch/studios/
3. Creator site — https://griffpatch.co.uk/
4. Griffpatch Academy — https://griffpatch.academy/
5. *Code a Platformer Game | 1. The Basics* — https://www.youtube.com/watch?v=D16hTnDGweo
6. *RPG Tutorial | Craft your dream Scratch Game | 1. The Player* — https://www.youtube.com/watch?v=5lof-Nu1VVE
7. *Geometry Dash — “How to make a Scratch Game”* — https://www.youtube.com/watch?v=FYZ1bfB1nho
8. *Tile Scrolling Tutorial Assets | Parts 1 to 20* — https://scratchstats.org/projects/485855713

### Other game creators / educators
9. Brackeys, *How to make a Video Game — Godot Beginner Tutorial* — https://www.youtube.com/watch?v=LOhfqjmasi0
10. GDQuest, *Make Your First 2D Game with Godot: Player and Enemy* — https://www.youtube.com/watch?v=Mc13Z2gboEk
11. HeartBeast, *1-bit Godot 4 Course* — https://www.heartgamedev.com/1-bit-godot-4-course
12. HeartBeast, *Be a Game Maker* — https://www.heartgamedev.com/be-a-game-maker-bundle
13. Clear Code, *The new ultimate introduction to Godot* — https://www.youtube.com/watch?v=TLG2yVpLDT8
14. Mark Brown / Game Maker's Toolkit, *What's the point of prototyping?* — https://gmtk.substack.com/p/whats-the-point-of-prototyping

### Official technical reference
15. Godot Engine, *Your first 2D game* — https://docs.godotengine.org/en/latest/getting_started/first_2d_game/index.html

## 9. Completion status

- Research synthesis: complete for this pass.
- Deliverable created: this file only.
- App/runtime changes: none.
- AIM-0: not started.
- Next assignment: not started by this user-request add-on.
- Research completeness: selective and expandable. The linked creator series are a representative first collection, not an exhaustive catalogue.
