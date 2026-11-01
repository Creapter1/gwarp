# G-Warp Research Pass 4 — Enemy AI, Puzzles, Quests, Dialogue and Accessibility

**Date:** 2026-10-27  
**Owner:** Creapter1  
**Prepared by:** ChatGPT / GPT-6  
**Status:** RESEARCH ONLY — no demo, app change, runtime test or integration

## 1. Scope and evidence rules

This pass continues the research priorities named in the previous creator-research pass: enemy state machines and pathfinding, boss telegraphs, puzzle logic, dialogue/quests, and accessibility.

The goal is to identify useful teaching and design patterns that could inform future G-Warp learning material. This is not a claim that G-Warp currently implements these systems. No current runtime or block-catalog mapping was performed in this pass.

Evidence labels used here:
- **Page inspected:** the source page or documentation was opened and relevant material reviewed.
- **Abstract/index inspected:** only the conference abstract, chapter index or search excerpt was available; the talk/video itself was not watched.
- **Design synthesis:** a proposed interpretation for a future learning sequence, not a source quotation or an established G-Warp feature.
- **NOT TESTED:** no external project/plugin or G-Warp runtime was executed.

## 2. Enemy AI: separate decisions from movement

### 2.1 A small state machine is a good first teaching model

The UnityHFSM guard example demonstrates a readable four-state loop:

1. **Patrol** along a known route.
2. **Chase** when the player is spotted.
3. **Fight** when the player is close enough to attack.
4. **Search** around the last known area after the player disappears; return to patrol when the search expires.

Transitions have clear causes: spotted, lost sight, in range, out of range, or search timeout. The example also shows how hierarchical states can organize more complex behavior without turning one state into a giant collection of conditions.

**Design synthesis:** teach the basic four states before introducing a larger state tree. Make every transition visible in a simple state diagram and explain what event or condition causes it. Do not start a beginner lesson with a large, opaque “AI brain.”

Source: [UnityHFSM — Advanced Tutorial: Guard AI](https://github.com/Inspiaaa/UnityHFSM/wiki/Advanced-Tutorial:-Guard-AI) — page inspected.

### 2.2 Perception should remember what the enemy saw

The PlasmaTech FPS Grunt tutorial records a perception confidence value that rises while the player is visible and decays when sight is lost. The enemy freezes a last-known position, investigates it, looks around, then abandons the search and resumes its normal behavior. It also describes a debug view for the confidence value and current AI sequence.

**Design synthesis:** this is more understandable than making an enemy instantly forget the player the moment line-of-sight breaks. A learning sequence could show a visible “alert” meter and last-seen marker, then let the learner tune how quickly alertness fades. This also gives a concrete debugging target.

Source: [PlasmaTech — AI Tutorial: Your First AI, the FPS Grunt](https://plasmatechdev.co.uk/Tutorial_FpsGrunt.html) — page inspected; no external project executed.

### 2.3 Pathfinding is not the same as enemy decision-making

Godot's navigation documentation distinguishes:
- **AStar2D / AStarGrid2D:** graph or grid routes, useful when movement is over discrete locations or a tile grid.
- **Navigation meshes / NavigationServer2D:** continuous paths through open navigable areas.
- **NavigationAgent2D:** calculates routes and can help with avoidance, but the game still has to move the character. The parent movement code must use the next path position and update the agent as required.

The documentation also warns that navigation margins matter: a path that runs exactly against collision edges may lead an agent into stuck or unreliable movement.

**Design synthesis:** teach the enemy's *reason* for moving separately from its *route*. For a grid puzzle, a grid path is a natural fit; for an open arena, continuous navigation may be more appropriate. A simple waypoint patrol may be enough for an early lesson; a full navigation mesh should not be the default starting point.

Sources:
- [Godot — 2D Navigation Overview](https://github.com/godotengine/godot-docs/blob/master/tutorials/navigation/navigation_introduction_2d.rst) — official documentation page inspected.
- [Godot — NavigationAgent2D class reference](https://github.com/godotengine/godot-docs/blob/master/classes/class_navigationagent2d.rst) — official documentation page inspected.

### 2.4 A practical enemy-learning progression

A future tutorial series could build one testable layer at a time:

| Step | New behavior | Test a learner can perform |
|---|---|---|
| 1 | Patrol between two points | Watch the enemy turn at both ends |
| 2 | Detect the player in a visible zone | Enter and leave the zone |
| 3 | Chase while detected | Move around an obstacle and observe the route |
| 4 | Remember last-known position | Break sight and watch the enemy investigate |
| 5 | Search timeout and return | Wait until the enemy gives up and resumes patrol |
| 6 | Attack range and cooldown | Compare standing just inside and outside attack range |

This is a **curriculum candidate only**. No demo or G-Warp block mapping was produced.

## 3. Boss fights: make danger readable

A GameDeveloper article based on a GDC talk by *Death's Gambit* designer Alex Kubodera describes readability as communicating what is about to happen and what the player is expected to do in response. It discusses clear gestures, attack patterns, color and audio cues, and the need for the communicated danger to match the actual consequence.

**Design synthesis:** a readable boss attack can be taught in four phases:

1. **Tell:** a pose, wind-up, sound, or other recognizable cue announces the move.
2. **Threat:** the attack becomes active in a clearly indicated area or direction.
3. **Resolve:** the player sees what the hit or miss did.
4. **Recover:** the boss has a consistent opportunity for the player to reposition or respond.

A boss can add complexity by combining patterns or changing phases, but the player should first have a fair chance to recognize the individual moves. If an attack looks harmless but causes huge damage, the visual promise and actual rule disagree.

Important accessibility note: do not communicate the attack only by color. Combine shape, motion, position, text or symbols, and optional sound so players who cannot distinguish a cue still have usable information.

Source: [GameDeveloper — Designing for Difficulty: Readability in ARPGs](https://www.gamedeveloper.com/game-platforms/designing-for-difficulty-readability-in-arpgs) — article inspected (published 2022-04-19).

## 4. Puzzle design: teach a rule, then vary the problem

### 4.1 The puzzle needs to communicate its own rules

GDC's *Puzzle Writing: Best Practices* describes the puzzle as a contract between designer and player: the player needs enough information to understand the problem, while the puzzle still needs to offer a challenge. It also stresses integrating puzzles into the game world and evaluating them through questions and playtesting.

**Evidence limit:** the GDC Vault page was unavailable for full playback during this pass. This summary is based on the conference abstract/index, not a watched talk.

Source: [GDC Vault — Puzzle Writing: Best Practices](https://www.gdcvault.com/play/1013851/puzzle-writing-best) — abstract/index inspected only.

### 4.2 Use a puzzle matrix to generate deliberate variations

A third-party chapter index for Mark Brown / Game Maker's Toolkit's video about designing puzzles for an indie magnet game lists a problem/solution breakdown and a “puzzle matrix” section. The original creator video was not available for direct review in this pass.

**Design synthesis:** a puzzle matrix can help a creator combine known mechanics systematically. For example, once a learner understands a pushable block, later puzzles might vary:
- the number and placement of blocks;
- the shape of the room;
- whether a switch or door is involved;
- the order in which spaces can be reached;
- whether a move can be undone.

A matrix should generate meaningful variations, not random combinations. Each puzzle still needs a solvable layout, clear feedback, and a way for a tester to discover whether the intended rule is understandable.

Sources:
- [GMTK — How I make puzzles for my indie magnet game](https://www.youtube.com/watch?v=akeVPZLZejY) — original video link.
- [Video chapter index](https://gamedev.levimoore.dev/content/a5qeMy18VK) — third-party chapter metadata inspected; video not watched.

### 4.3 Guidance should help without stealing the solution

A GameDeveloper article summary of Randy Smith's GDC puzzle-design talk highlights visibility, affordances, mapping, visual language, feedback and conceptual models, including “guidance on demand.”

**Design synthesis:** a future hint system could offer graduated help:
- first, point the player's attention toward a relevant object;
- next, remind them of a rule they already learned;
- only later, suggest a partial action.

Hints should be optional and should not silently complete the puzzle. If the learner is stuck because the game failed to communicate a rule, the lesson should fix the communication rather than blame the player.

**Evidence limit:** the article/search summary was inspected; the original lecture was not watched.

Source: [GameDeveloper — Designing puzzles that make players feel smart](https://www.gamedeveloper.com/design/video-designing-puzzles-that-make-players-feel-smart) — summary/index evidence.

## 5. Dialogue and quests: separate story, state, and presentation

### 5.1 Dialogue is a flow, not just a string of text

Yarn Spinner's documentation describes dialogue as nodes containing lines, commands and options. Commands ask the game to do something; functions ask the game for information; variables can preserve story state between conversations. The engine controls how the lines and choices are presented.

**Design synthesis:** keep three responsibilities separate:
- **Dialogue content:** what a character says and which choices are available.
- **Game state:** whether a key was found, a quest was accepted, or an objective was completed.
- **Presentation:** speech bubbles, portraits, subtitles, voice, choice buttons and pacing.

This separation makes branching easier to inspect and helps avoid embedding quest logic inside a visual dialogue effect.

Sources:
- [Yarn Spinner documentation](https://www.yarnspinner.dev/docs/) — current documentation inspected.
- [Yarn Spinner — Lines, Nodes and Options](https://www.yarnspinner.dev/docs/yarn/02-fundamentals/01-lines-nodes-and-options/) — documentation inspected.
- [Yarn Spinner — Connecting to Your Game (Unreal)](https://www.yarnspinner.dev/docs/unreal/05-connecting-to-your-game/) — documentation inspected for the runner/presenter/command boundary.
- [Yarn Spinner — Understanding Yarn Spinner (Godot)](https://www.yarnspinner.dev/docs/godot/gdscript/02-understanding-yarn-spinner/) — documentation inspected.

### 5.2 Quest systems can be event-driven and saveable

The Godot Asset Store's CodingQuests Dialogue & Quest System page describes quest prerequisites, optional objectives, rewards, event tags, and serialization/deserialization. The Dialogue Manager asset page describes branching dialogue graphs, conditions, responses, a test scene and a debugger for state/history.

These are **product-page descriptions**, not independent verification of addon quality or proof that the addons were executed.

**Design synthesis:** a beginner-friendly quest can be represented as:
- locked / available / active / completed;
- one or more objectives, each with its own status;
- a reward or next event;
- a saved state that survives closing and reopening the project.

For branching dialogue, add a visual path check so the creator can find dead ends, unreachable nodes, missing choices, or choices whose conditions can never be true. Test both sides of every meaningful branch.

Sources:
- [Godot Asset Store — Dialogue & Quest System](https://store.godotengine.org/asset/codingquests/dialogue-quest-system/) — asset description inspected; addon NOT TESTED.
- [Godot Asset Store — Dialogue Manager](https://store.godotengine.org/asset/nathanhoad/dialogue-manager/) — asset description inspected; addon NOT TESTED.

## 6. Accessibility: make important information available in more than one way

The Game Accessibility Guidelines provide practical recommendations such as:
- do not use color as the only way to convey information;
- use readable text, clear language and strong contrast;
- provide subtitles or captions for important speech and sounds;
- do not make essential information available only through sound;
- allow audio channels (music, effects and voice) to be adjusted separately;
- allow players to pause or control text speed where appropriate;
- avoid requiring rapid button-mashing or long button holds when alternatives are possible;
- provide reminders of objectives and controls;
- allow practice without immediate failure, and consider adjustable game speed.

Microsoft's game-accessibility guidance also discusses readable captions, contrast, speaker identification and timing.

**Design synthesis:** accessibility should be part of the initial lesson and project design, not a final checklist. For every important signal, ask: “Can the player understand this if they cannot hear it, distinguish its color, read quickly, or perform a rapid input?” Offer more than one communication route.

Also keep two scopes distinct:
1. **G-Warp editor accessibility:** keyboard navigation, understandable labels, focus visibility, readable controls, undo, and manageable interaction speed.
2. **Games made in G-Warp:** remappable or alternative controls, subtitles/captions, adjustable audio and speed, visual reinforcement, and accessible objectives.

These guidelines are design references, not a statement of legal compliance. Testing with people with different access needs is still necessary.

Sources:
- [Game Accessibility Guidelines — Full List](https://gameaccessibilityguidelines.com/full-list/) — full guideline pages inspected.
- [Microsoft Learn — Making Games Accessible](https://learn.microsoft.com/en-us/windows/uwp/gaming/accessibility-for-games) — guidance page inspected.

## 7. Combined lessons for future G-Warp learning material

| Topic | Strong teaching pattern | What to test |
|---|---|---|
| Enemy AI | Add one state and one transition at a time | Trigger each state and each exit condition |
| Perception | Show alertness and last-known position | Break line of sight and observe memory/decay |
| Navigation | Choose grid or continuous routes based on the world | Check obstacles, corners, stuck cases and return routes |
| Boss combat | Tell → threat → resolve → recover | Can players recognize and respond to each attack? |
| Puzzles | Teach a rule in a safe space, then vary one constraint | Can a new player explain the rule and solve the intended step? |
| Hints | Give optional, graduated guidance | Does each hint help without revealing the whole answer? |
| Dialogue | Separate text/choices from game state and display | Test every branch and condition |
| Quests | Track objectives as explicit state and save them | Reopen the project and confirm progression remains correct |
| Accessibility | Communicate essential information in multiple ways | Test without relying on color, sound, fast reading or rapid input |

A possible future sequence—**not a demo created in this pass**—would be:
1. Build a simple guard patrol.
2. Add player detection and chase.
3. Add last-known-position search.
4. Add one clearly telegraphed boss attack.
5. Create a one-rule switch/door puzzle.
6. Add an NPC conversation that changes a quest state.
7. Add an accessibility review for the same level.

The sequence combines ideas from multiple sources; it is not copied from any single creator.

## 8. What this research does NOT establish

- It does not establish that G-Warp currently has working navigation, enemy state-machine, boss, quest, branching dialogue or accessibility systems.
- No current G-Warp block catalog, app.html, or runtime code was inspected in this pass to map the concepts to existing capabilities.
- No external engine project, Godot asset, or Yarn Spinner sample was run.
- No G-Warp demo, project, code proposal, UI or app change was created.
- No video was watched end-to-end in this pass. The GMTK source was reviewed through a chapter index only; GDC puzzle talks were reviewed through abstracts/indexes; the relevant written docs and articles were opened and inspected.
- The research is selective, not exhaustive.

## 9. Source register and evidence status

| Source | Topic | Evidence in this pass |
|---|---|---|
| UnityHFSM Guard AI wiki | Enemy states/transitions | Page inspected |
| PlasmaTech FPS Grunt tutorial | Perception memory, investigation, debug | Page inspected |
| Godot 2D Navigation docs | Grid and continuous navigation | Official page inspected |
| Godot NavigationAgent2D reference | Path updates and movement responsibilities | Official page inspected |
| GameDeveloper / Alex Kubodera | Boss readability and communicated danger | Article inspected |
| GDC Vault / Clara Fernandez-Vara | Puzzle contract and playtesting | Abstract/index only |
| GMTK / Mark Brown | Puzzle matrix | Original link + third-party chapter index; video not watched |
| GameDeveloper / Randy Smith | Affordances and on-demand hints | Summary/index evidence |
| Yarn Spinner docs | Dialogue nodes, options, commands, variables | Official docs inspected |
| CodingQuests asset page | Quest states, event tags, save/load | Product description only; NOT TESTED |
| Dialogue Manager asset page | Branching graph and debugger | Product description only; NOT TESTED |
| Game Accessibility Guidelines | Controls, text, audio, visual cues | Guideline pages inspected |
| Microsoft Learn | Caption readability and speech information | Guidance page inspected |

**Completion:** Pass 4 research synthesis written. This file must be read back from GitHub before the task is considered complete. No runtime or app verification is claimed.
