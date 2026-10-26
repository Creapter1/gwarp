# G-Warp AI — Creator Tutorial Research Pass 3: Enemies, World Systems, Combat, Feel and Creator Credit

- Research date: 26 October 2026
- Prepared by: ChatGPT / GPT-6 (chatgpt.com; not Freebuff)
- Folder: \`ai-team/shared/2026-10-26-chatgpt-AIM-K1/\`
- Builds on the two earlier Griffpatch/game-creator research reports; does not replace them.
- Scope: additional creator tutorials and transferable game-development lessons. Research only; no demos, app edits, block mappings, or implementation.

## 1. Research purpose

This pass looks for more than another list of names. It asks: what valuable game systems do experienced tutorial creators actually teach, in what order, and what should a future G-Warp AI learn to explain, build, test, and credit?

The strongest new coverage in this pass is:
- enemies that patrol, spawn, collide, attack and react to damage;
- tile-based worlds, scrolling cameras, obstacles and map editors;
- platformer forgiveness and control quality;
- combat loops, weapons, health, bosses, checkpoints and stage progression;
- dialogue, menus, pause/options screens and transitions;
- parallax, screen shake, lighting, particles and audio feedback;
- reusable project/source organization and version-aware tutorials.

This remains a selective study. It is not a claim that every video was watched frame-by-frame or every code repository executed.

## 2. Griffpatch: enemy behaviour and world-building in Scratch

### 2.1 Platformer enemies: the tutorial teaches the whole interaction, not just an enemy sprite

The official Griffpatch video *Coding Platformer Enemies | 11. Scratch Platformer Tutorial* describes adding multiple patrolling/chomping enemies, safe zones, and the risk of placing an enemy too close to a scene edge. Its chapter list includes:
- enemy setup and clone spawning;
- despawning clones;
- enemy gravity and vertical movement;
- horizontal patrol movement;
- slopes;
- animation;
- player/enemy collision and losing a life;
- jumping on an enemy's head;
- improved spawning and safe zones;
- a door interaction problem.

**Why this is valuable:** an enemy is not just a moving object. It is a system with a lifecycle (spawn, update, despawn), movement rules, animation, collision consequences, player counterplay, placement rules and level-design constraints. The safe-zone and edge-placement topics show that the creator considers fairness, not only whether the code runs.

**Potential future lesson topics for G-Warp AI:**
1. Make one enemy move between two points.
2. Add a patrol boundary and turn-around behaviour.
3. Add animation states.
4. Add player contact damage.
5. Add a clear player counter (jump on top, attack, avoid, or stun).
6. Add spawn/despawn rules.
7. Test edge placement and safe zones.
8. Test several enemies at once.

This sequence is a research extraction, not a G-Warp feature claim. Each step would need mapping to the current G-Warp block catalog and actual runtime testing before becoming a G-Warp tutorial.

Evidence: official video title, description and chapters inspected; video not watched frame-by-frame.  
Source: [Griffpatch — Coding Platformer Enemies | 11. Scratch Platformer Tutorial](https://www.youtube.com/watch?v=Qh0yz_qPQeA)

### 2.2 Tile scrolling: world representation, clone limits and camera rules

Griffpatch's *Tile Scrolling Platformer (Mario) | 1. Setup* chapter list covers:
- starter assets and sprite overview;
- aligning tile costumes to a grid;
- cloning columns into a grid;
- using custom blocks to speed up clone creation;
- scrolling the grid;
- looping/recycling scrolling to avoid the Scratch clone limit;
- expanding to full-screen use;
- positioning sprites outside the normal stage fence.

The creator says the technique has been used in several of his games. His tutorial resource profile also lists tile-scrolling assets for parts 1–20, and the Scratch profile shows later episode projects such as a level store and Koopa/shell mechanics.

**Why this is valuable:** the lesson covers both a visible game feature (scrolling) and a resource/performance constraint (clone limits). It also makes the relationship between grid alignment, camera movement, world size and sprite limits understandable.

**Potential future G-Warp AI learning:**
- distinguish a screen-sized level from a larger world viewed through a camera;
- explain tile-grid coordinates and alignment;
- teach how scrolling changes the camera/world relationship;
- teach chunk/column reuse and object lifetime;
- measure object/clone limits rather than assuming unlimited capacity;
- test that the player, enemies, foreground and background remain correctly layered while scrolling.

Evidence: official video title, description and chapters inspected; official Scratch profile/resource listings inspected.  
Sources: [Griffpatch — Tile Scrolling Platformer, Part 1](https://www.youtube.com/watch?v=Fl-LX94Z4Cc) · [Griffpatch Scratch profile](https://scratch.mit.edu/users/griffpatch/) · [Griffpatch tutorial resources profile](https://scratch.mit.edu/users/griffpatch_tutor/)

### 2.3 Griffpatch's tutorial library reveals further research branches

The official Scratch profile and curated studios list more than the already-studied platformer/RPG/Geometry Dash topics. Current profile listings include:
- explosions and particle effects;
- multi-touch joystick controls;
- silky-smooth health bars;
- sprite trails;
- sprite layering and ordering;
- text/dialogue engines and word wrapping;
- boids/flocking behaviour;
- 3D raycasting;
- mobile joystick examples;
- multiplayer/cloud series.

These are discovery leads, not proof that every item is a beginner-friendly tutorial or that its project code has been audited.

**Research priority:** text/dialogue, health bars, particles, joystick controls, sprite layering, and boids deserve individual lesson-level study. They map to distinct G-Warp teaching subjects: UI, feedback, input, rendering order and group behaviour.

Evidence: official Scratch profile and creator-curated studio listing inspected.  
Sources: [Griffpatch profile](https://scratch.mit.edu/users/griffpatch/) · [Griffpatch curated tutorial studio](https://scratch.mit.edu/studios/owned-by/griffpatch/)

## 3. HeartBeast: platformer control quality and the full game loop

HeartBeast's *Heart Platformer — Godot 4 Tutorial Series* is listed as a 15-part beginner series. Its syllabus moves through:
1. initial platformer;
2. coyote jump;
3. player movement data/custom resources;
4. double jump and wall jump;
5. hazards and collision layers/masks;
6. collectibles and level-completed state;
7. autotiles and sloped tiles;
8. level transitions and inherited scenes;
9. controller support;
10. start menu;
11. UI theming;
12. wall-jump correction;
13–14. countdown and level timers;
15. victory screen.

**Why this is valuable:** it separates the feel of movement from the surrounding game loop. Coyote time and jump improvements make controls more forgiving; collision layers make interactions deliberate; controller support and UI theming widen usability; transitions, timers and a victory screen make the project feel complete.

**Potential future G-Warp AI learning:**
- teach input forgiveness (coyote time and jump buffering) as optional design patterns;
- compare normal and forgiving controls in a playable test;
- explain collision groups/layers and why hazards should not collide with every object;
- add level completion as an explicit state, not just a visual message;
- keep controller input and keyboard input conceptually separate from movement logic;
- add a start, pause, timer and victory loop after the core mechanic works.

Evidence: Class Central course page and syllabus inspected; it is an index/aggregator of the creator's YouTube series, not a direct inspection of all 15 videos.  
Source: [Heart Platformer — Godot 4 Tutorial Series (HeartBeast)](https://www.classcentral.com/course/youtube-heart-platformer-godot-4-tutorial-series-272084)

## 4. Beat-'em-up course: combat as a complete interacting system

Godot Forum creator Gad published *Fists of Fury*, a 20-episode, approximately 10-hour beat-'em-up course. The official course announcement lists the progression:
- setup, player movement and collision;
- enemies and enemy overlap;
- damaging enemies and taking damage;
- weapons, throwing knives and shooting;
- food/health;
- a boss;
- stages and checkpoints;
- enemy spawning;
- health bar and score;
- music and sound effects;
- options screen, level design and game over.

**Why this is valuable:** combat is a chain of interacting systems. The course introduces the player and collision before enemy damage; it then adds weapons, health, a boss and stage/checkpoint structure. Feedback (health bar, score, audio) arrives after the core interaction is present.

**Potential future G-Warp AI learning:**
- distinguish hit detection from damage calculation;
- teach attack range, cooldown and invulnerability windows as separate concepts;
- add a readable warning before a boss attack;
- test damage to player and enemy independently;
- test overlapping enemies and repeated hits;
- keep health, score, checkpoint and game-over state consistent;
- add options and accessibility settings after the basic combat loop.

Evidence: creator's Godot Forum announcement lists all 20 episodes and a playtest link; individual episodes were not watched in this pass.  
Source: [Gad — Create a full beat'em up game in Godot in 10h](https://forum.godotengine.org/t/create-a-full-beatem-up-game-in-godot-in-10h/102237)

## 5. Scott Westover / Phaser: top-down adventure, puzzles and boss progression

Phaser's official news page describes Scott Westover's 27-tutorial *How To Make A Zelda-Like Game With Phaser 3* series. The project aims at a completed dungeon with traps and a final boss. The listed subjects include:
- player creation, movement, input and state machines;
- enemies, boss design, combat, collisions and health;
- interactive objects such as pots and chests;
- level design with Tiled Map Editor;
- health HUD, dialogue system and simple menu.

**Why this is valuable:** it joins exploration, interaction, combat and interface in one genre-specific learning path. It is a useful complement to platformer tutorials because it emphasizes top-down movement, state-driven player behaviour, interactive world objects and dungeon progression.

**Potential future G-Warp AI learning:**
- top-down movement with normalized diagonal speed;
- interaction radius and facing direction;
- doors, keys, chests, pots and switches;
- simple state machines for player/enemy/boss;
- health HUD and dialogue panels;
- room/dungeon progression and boss gates.

Evidence: Phaser's official article inspected; it summarizes the 27-video course. The course videos and source code were not independently executed in this pass.  
Source: [Phaser — Make A Zelda-Like Game With Phaser](https://phaser.io/news/2025/03/make-a-zelda-like-game-with-phaser)

## 6. KidsCanCode: a broad top-down tile game with production systems

Class Central's course listing for KidsCanCode's *Pygame Tutorial — Tile-based Game* lists 23 parts:
- setup, collisions and tilemap;
- smooth movement and scrolling camera;
- player graphics and rotation;
- mobs and mob movement;
- shooting, health and improved enemy movement;
- Tiled Map Editor and map loading;
- obstacles and bug fixing;
- items, tween/easing animations and sound effects;
- pause screen, more weapons, damage effect, game over and lighting.

**Why this is valuable:** this course connects a map editor to the runtime world, and then adds the gameplay and presentation systems that depend on it. It also explicitly includes a bug-fix episode, which is a reminder that a good tutorial series should teach diagnosis and repair rather than only feature addition.

**Potential future G-Warp AI learning:**
- distinguish designing a tilemap from loading/rendering it;
- teach collision data separately from visual tile art;
- add a camera and verify map boundaries;
- teach enemies and items as world objects with lifecycle rules;
- teach tween/easing as a reusable presentation concept;
- teach pause/game-over states and lighting only after the basic game loop works.

Evidence: Class Central course page and episode syllabus inspected; no claim of watching all 23 videos.  
Source: [KidsCanCode — Pygame Tutorial: Tile-based Game](https://www.classcentral.com/course/youtube-pygame-tutorial-3-tile-based-game-92138)

## 7. Mina Pêcheux: a source-backed library of small, reusable lessons

Mina Pêcheux's public \`godot-tutorials\` repository describes itself as the code and assets for tutorials published as videos and text articles. The repository is organized into numbered topic folders. The inspected index includes:
- waypoints and top-down movement;
- RTS unit navigation;
- tilemaps and character controllers;
- finite-state machines and game loops;
- random units and input actions;
- animation and visibility layers;
- enemy waves and basic dialogue;
- pause screens and moving platforms;
- 2D navigation and hit/health;
- parallax follow, endless levels, aerial cameras;
- random obstacles, screen shake, scene transitions;
- custom cursors, drag-and-drop and toggle buttons.

The repository warns that tutorials 01–05 originally targeted Godot 3, while the current repository code/assets were updated for Godot 4. This is a useful example of why a tutorial database must record engine versions and distinguish the video version from the current source version.

**Why this is valuable:** it is a library of small modules, not one long game build. It can help the future G-Warp AI learn isolated concepts and prerequisite relationships: navigation, FSM, dialogue, health, parallax, screen shake, transitions and UI interactions.

**Important license caution:** the repository declares MIT, but that license only applies to the repository contents covered by it. It also credits third-party asset packs (Kenney); those assets have their own terms. Do not treat a repository's source-code license as a blanket license for every referenced asset.

Evidence: GitHub repository README, folder index and license listing inspected. Code not executed in this pass.  
Source: [Mina Pêcheux — Godot/C# Tutorials repository](https://github.com/MinaPecheux/godot-tutorials)

## 8. New feature map: the useful systems are beginning to cluster

The tutorials repeatedly return to a set of common systems. These are research candidates, not an implementation list or a claim about current G-Warp support.

| System family | What the tutorials repeatedly teach | Important tests a future lesson should include |
|---|---|---|
| Player control | acceleration, jump variants, diagonal movement, controller support | input released, opposing input, edge of platform, controller disconnect |
| Enemies | patrol, chase, spawn/despawn, overlap, damage, animation | enemy at edge, multiple enemies, spawn collision, repeated contact |
| Combat | hitboxes, hurtboxes, cooldowns, health, weapons, boss attacks | miss, hit, simultaneous hit, invulnerability, boss phase transition |
| Tile worlds | grid alignment, collision tiles, map loading, obstacles, scrolling | map boundary, empty cell, blocked cell, large map/performance |
| Camera | follow, scroll, parallax, aerial view, screen shake | player at world edge, camera lag, UI not shaking, reset after pause |
| Progression | collectibles, keys, doors, checkpoints, room transitions, victory | missing key, revisit room, death/retry, saved state consistency |
| Interface | health bars, score, dialogue, menus, options, pause/game over | text overflow, repeated open/close, pause during transition, keyboard/controller |
| Feedback | animation, hit flash, particles, sound, easing, lighting | effect spam, low performance, muted audio, reduced-motion preference |
| Reusable architecture | custom resources, state machines, waypoints, scene inheritance | missing reference, invalid state, duplicated instance, reset to known state |

### Most useful new lessons to investigate next

1. **Enemy AI patterns:** patrol → notice player → chase → attack → recover → return to patrol. Compare simple rule-based AI with navigation/pathfinding.
2. **Boss design:** telegraphs, phases, safe windows, arena boundaries, checkpoint/retry and fair difficulty.
3. **Puzzle interactions:** keys, doors, switches, pushable objects, pressure plates, chests and puzzle reset.
4. **UI and dialogue:** text wrapping, dialogue progression, speaker identity, choice prompts, health bars and readable counters.
5. **Camera and visual polish:** parallax, screen shake, sprite depth sorting, lighting, particles and transitions.
6. **Accessibility:** remappable controls, keyboard/controller parity, forgiving timing, readable UI, optional reduced motion and adjustable difficulty.
7. **Project persistence:** checkpoints, save slots, inventory and safe data-only serialization.

## 9. Creator credit and optional support — user's future idea

The user proposed that when G-Warp AI uses a creator's tutorial as the basis for a lesson, G-Warp should visibly give credit and, where appropriate, encourage learners to support the creator. This is a future product idea only; no UI or promotional feature is implemented.

A responsible future presentation could include:

**Tutorial source**
- Creator's preferred public name.
- Exact tutorial/video title and episode.
- Link to the original video or written tutorial.
- A short statement such as: "This lesson was inspired by the tutorial linked above. The original creator developed the teaching material; this G-Warp activity is an independently made adaptation."
- A visible "Watch the original tutorial" link.

**Optional creator support**
- "Enjoyed this lesson? Consider visiting the creator's channel, subscribing, and turning on notifications if you want to follow their new tutorials."
- If the creator publishes an official Patreon or support page: "If you'd like to support their work, ask a parent or guardian to help you review the creator's official support page."
- Only show a Patreon/support link when the creator's own official page or verified channel links to it. Never guess a Patreon URL.
- Never imply that payment is required to complete the G-Warp lesson.
- Do not pressure children, use guilt, create countdowns, or interrupt gameplay with repeated promotions. Keep support optional, age-appropriate and clearly separate from the lesson.
- Do not claim the creator endorses G-Warp or collaborated with it unless that is explicitly true.
- The creator's name, title and link must be accurate; attribution does not replace licence permission for copied assets or code.

**Attribution is not permission:** credit is good practice, but it does not by itself grant permission to reuse a creator's scripts, project files, sprites, music, screenshots or branding. Check the specific licence or obtain permission for each reused element. Prefer independently recreated mechanics and original G-Warp art/audio.

## 10. Evidence limits and compatibility boundary

- This pass primarily inspected official creator descriptions, chapter lists, course indexes, creator profiles and a public GitHub repository README/folder listing.
- It did not watch all videos frame-by-frame, run external projects, test external code, or verify every asset licence.
- Some sources use Godot, Phaser, Pygame or Scratch. Their code is not directly transferable to G-Warp. Only general game-design principles and teaching patterns are candidates for adaptation.
- No current G-Warp block-to-feature mapping was performed.
- No claim is made that G-Warp already supports tilemap streaming, enemy navigation, boss state machines, save systems or any other system listed here.
- Future compatibility checks must use the current G-Warp block catalogue and runtime source, and only the authorized integrator may edit app.html/index.html.

## 11. Source register

1. Griffpatch — Platformer Enemies episode 11: https://www.youtube.com/watch?v=Qh0yz_qPQeA
2. Griffpatch — Tile Scrolling Platformer part 1: https://www.youtube.com/watch?v=Fl-LX94Z4Cc
3. Griffpatch — official Scratch profile: https://scratch.mit.edu/users/griffpatch/
4. Griffpatch — tutorial assets profile: https://scratch.mit.edu/users/griffpatch_tutor/
5. Griffpatch — curated studio listing: https://scratch.mit.edu/studios/owned-by/griffpatch/
6. HeartBeast — Heart Platformer Godot 4 series syllabus: https://www.classcentral.com/course/youtube-heart-platformer-godot-4-tutorial-series-272084
7. Gad — Fists of Fury 20-episode course announcement: https://forum.godotengine.org/t/create-a-full-beatem-up-game-in-godot-in-10h/102237
8. Scott Westover / Phaser — Zelda-like game tutorial series overview: https://phaser.io/news/2025/03/make-a-zelda-like-game-with-phaser
9. KidsCanCode — Pygame tile-based game syllabus: https://www.classcentral.com/course/youtube-pygame-tutorial-3-tile-based-game-92138
10. Mina Pêcheux — Godot/C# tutorial source repository: https://github.com/MinaPecheux/godot-tutorials

## 12. Completion status

- Additional creator/tutorial research: completed for this pass.
- Ten source entries included; six main lesson/course sources plus Griffpatch creator resources.
- New coverage: enemies, tile worlds, combat, bosses, platformer forgiveness, cameras, UI, dialogue, effects, accessibility and source versioning.
- User's optional creator-support idea documented for future consideration, with child-safety and no-pressure constraints.
- No demos created.
- No app.html/index.html, runtime, recipe or block-pack edits.
- No G-Warp runtime tests or compatibility mapping.
- Earlier reports unchanged.
- Research is selective and evidence-labeled, not exhaustive.
