# G-Warp AI — Creator, Game-Design, Tutorial and Agent Research Expansion

- Research date: 26 October 2026
- Prepared by: ChatGPT (GPT-6), chatgpt.com session
- Location: \`ai-team/shared/2026-10-26-chatgpt-AIM-K1/\`
- Relationship: second research pass; expands \`USER-REQUEST-RESEARCH-GRIFFPATCH-AND-GAME-CREATORS-2026-10-26.md\`. That first report remains unchanged.
- Scope: research and synthesis only. No G-Warp demos, code, app/runtime edits, recipe packs, or block mappings were created in this pass.

## 1. What this expansion adds

The first pass established a useful initial group of Scratch and Godot educators. This pass goes further in five directions:

1. More detailed study of Griffpatch's *teaching sequence*, including platformer fundamentals and the way he introduces constraints in cloud multiplayer.
2. A comparison of creators who publish long, cumulative, episode-based builds, including Shaun Spalding/SaraJS, DaFluffyPotato, Sebastian Lague and Brackeys.
3. A separate study of **Griff** (\`griff.games\`), which is not Griffpatch. Griff's editor/tutorial documentation provides a particularly relevant example of an AI agent interacting with a live game editor, inspecting a scene, playing it, adjusting it and saving it.
4. Research beyond coding tutorials: game-feel design, game-design learning, and the Scratch Foundation's creative-learning approach.
5. A stronger recommendation for how G-Warp AI should eventually store research as reusable lessons, tested checkpoints, and evidence—not as a pile of copied scripts or video summaries.

The aim is not to imitate one creator. It is to learn from several teaching styles and combine their strongest methods into a distinctly G-Warp experience.

## 2. Evidence labels and limits

This document uses these evidence descriptions:

- **Creator/tutorial page inspected:** the page's actual lesson structure and written instructions were read.
- **Official video title/description/chapters inspected:** the listed sequence and chapter labels were studied. This does not prove every implementation detail inside the video.
- **Official project/source listing inspected:** a creator's repository, project page or downloadable-source description was read. This does not mean the code was executed.
- **Research or pedagogy source inspected:** a published paper or learning-framework page was read.
- **Synthesis:** a recommendation derived by comparing the sources, not a direct quotation or a claim made by a creator.

I did not watch every video frame-by-frame, inspect every downloadable project, or run any external engine project in this session. I did not inspect the current G-Warp application code or test G-Warp runtime behaviour. Therefore, this document makes **no claim that any proposed mechanic is already supported by G-Warp**. Any G-Warp block mapping and compatibility check is future work.

## 3. Griffpatch — deeper study of the Scratch creator

**Name clarification:** the user's earlier phrase "Grift Patch" was interpreted as **Griffpatch**, the Scratch creator. Griffpatch is different from the separate project/creator called Griff, discussed in section 5.

### 3.1 Platformer: foundation first, then correction and experimentation

The official lesson *Code a Platformer Game | 1. The Basics* lists a clear sequence:

1. Start with a backdrop.
2. Add gravity.
3. Make ground collisions.
4. Add jumping.
5. Add walking.
6. Pause to rethink and innovate.
7. Add horizontal collisions.
8. Fix jumping behaviour.
9. Address a stuck-to-ceiling bug.
10. Experiment with physics.

The creator's description frames this as the basic foundation rather than a complete advanced platformer. It specifically points to later subjects such as player animation, wall sliding, slopes and moving platforms.

**Research interpretation:** the order matters. The learner first gets a character that can stand, move and jump. Then the creator introduces the problems that appear when the game becomes less simple. This is much more useful than starting with a huge finished platformer and asking a beginner to understand everything at once.

**What G-Warp should study:** teach the simplest playable rule first; show one failure or edge case; explain why it happens; repair it; then let the learner experiment with the parameter or mechanic. A lesson should distinguish "the new feature" from "the fix that makes the feature reliable."

Evidence: official video title/description/chapters inspected.  
Source: [Griffpatch — Code a Platformer Game | 1. The Basics](https://www.youtube.com/watch?v=D16hTnDGweo)

### 3.2 Cloud multiplayer: teach the constraint, not only the trick

The first episode in Griffpatch's Cloud Multiplayer series introduces cloud variables, tests the game in two browser sessions, shows a "Cloud Game Done Wrong!" example, explains cloud-variable limits, and then develops an encoding approach that can place two numbers into one cloud variable. Its chapter listing includes building the encoder/decoder, handling negative numbers, integrating the logic and testing it.

**Research interpretation:** this is a valuable advanced-teaching pattern: explain the limitation before presenting the workaround. The learner sees that the system has a boundary, why the obvious approach fails, and what encoding strategy is being introduced to work within that boundary.

**What G-Warp should study:** for advanced lessons, include a "why the easy version breaks" stage, a visible limit, a safe alternative, and a test with two independent sessions or actors where that is relevant. Do not teach a workaround as magic. Explain what information is being stored, what can be lost, and what must be checked.

**Important scope warning:** this is evidence of a tutorial sequence and chapter titles, not an inspection of the actual multiplayer implementation or a certification of its security. Multiplayer, networking and shared data are future research subjects; they should not be copied into G-Warp without a separate safety and architecture review.

Evidence: official video title/description/chapters inspected.  
Source: [Griffpatch — Cloud Multiplayer Tutorial, Episode 1](https://www.youtube.com/watch?v=1JTgg4WVAX8)

### 3.3 A creator library is broader than one famous series

Griffpatch's official Scratch profile and studios show a much wider collection than platformer and RPG lessons. The profile/studio listing includes work and curated series around classic platformers, 3D raycasting, Geometry Dash, multiplayer/cloud projects, RPGs, effects and particles, mobile controls, boids, text engines and tile scrolling.

**Research interpretation:** the G-Warp research library should not be organized around only three proposed demos. A creator's profile can be used as a discovery index for genres and mechanics. Each selected project still needs its own lesson-level inspection and evidence record.

The profile is an entry point, not proof that every item is a complete beginner tutorial or that its internal code has been inspected.

Evidence: official Scratch profile and studio listing inspected.  
Sources: [Griffpatch profile](https://scratch.mit.edu/users/griffpatch/) · [Griffpatch studios](https://scratch.mit.edu/users/griffpatch/studios/) · [Scrolling Platformer playlist](https://www.youtube.com/playlist?list=PLy4zsTUHwGJIqB6hg-sOxiwsJn7UfuCLw)

### 3.4 Reusable lessons from Griffpatch

- Build a playable movement loop before adding large systems.
- Add collision and failure cases deliberately; do not hide them.
- Explain why a new system becomes necessary.
- Show a test, not only a block stack.
- Give learners a moment to change values and observe the result.
- Use a series index to find new topics, then inspect each chosen lesson individually.
- Preserve the exact episode or project state that a learner wants to continue from.

## 4. More creators and what their teaching styles add

### 4.1 Shaun Spalding / SaraJS — a long, cumulative platformer journey

The creator's *Complete Platformer Tutorial Series* page is organized as 27 numbered parts. The sequence begins with fundamentals and an animated player, then progressively adds shooting/recoil, enemies and hit flash, cameras and tiles, transitions, screen shake, parallax, menus, saving/loading, object relationships, sound, death, signposts, jump buffering, pickups, particles, enemy attacks, GUI/fullscreen work, score, global flags, endings and final polish.

This is useful because it demonstrates that a game is not "finished" when the character can move. A complete build develops from player control into interaction, progression, feedback, interface, persistence and a final ending. The numbered parts make the path easy to browse.

**G-Warp learning:** keep a series index with exact part numbers and dependencies. A learner who wants only jump buffering or save/load should be able to identify the required earlier concepts instead of being forced to watch every part.

**Availability and rights note:** the itch.io page offers per-episode project/source downloads as a paid bundle. Do not assume that the paid source files are free just because videos are publicly viewable. Check the licence and purchase/permission conditions before using any files.

Evidence: creator/publisher series page inspected; the official GameMaker article independently describes Shaun Spalding's two-part beginner platformer as foundations followed by polish, with provided assets and a functioning result ready to expand.  
Sources: [Sara's Complete Platformer Tutorial Series](https://sarajs.itch.io/saras-complete-platformer-tutorial-series) · [GameMaker — Create a Platformer Game with GML](https://gamemaker.io/en/blog/create-a-platformer-game-with-gml)

### 4.2 DaFluffyPotato — a full course that grows into a production-like project

The Pygame platformer course's listed timestamps cover setup and input, collision, a player, tiles, physics, camera, sky, optimization, animation, a level editor, particles, jump and slide, dash, enemies, weapons, death, screen shake, transitions, audio and executable export.

The notable pattern is that the course introduces a small game and progressively adds the systems that make it feel like a real project. The course includes both game mechanics and supporting tools (for example, an editor and optimization), which helps learners understand that game development is not only movement code.

**G-Warp learning:** include optional "developer tools" chapters after the first playable loop—level editing, reusable assets, performance, and export—rather than forcing all of those into the first lesson.

**Portability caution:** Pygame/Python implementation details do not automatically translate to G-Warp's visual blocks or runtime. Extract the concept and order, not the source code.

Evidence: official video description and chapter/timestamp listing inspected.  
Source: [DaFluffyPotato — Pygame Platformer Full Course](https://www.youtube.com/watch?v=2gABYM5M0ww)

### 4.3 Sebastian Lague — a long series with a finished reference project

Sebastian Lague's *Create a Game* page describes a 25-episode, approximately seven-hour Unity top-down shooter tutorial series. The page provides a final project, a source-code reference and a Unity project link.

**What it adds:** a complete, inspectable destination matters. The learner can compare their result to a finished example and can see the overall shape of the project after following a long series.

**G-Warp learning:** a series should have an explicit "what the full game will become" preview and a clear final checkpoint. When licensing permits, a reference project can help with comparison; it must not be treated as permission to port the whole codebase or assets into G-Warp.

**Caution:** the source page confirms a series and final reference links, not a separate preserved checkpoint for each of the 25 episodes.

Evidence: creator project page inspected.  
Source: [Sebastian Lague — Create a Game Series](https://sebastian.itch.io/create-a-game-series)

### 4.4 Brackeys — compact, polished route from first player to export

The Brackeys Godot beginner tutorial's chapters go from selecting a game idea and understanding assets/editor basics to Player 1.0, worldbuilding, platforms, pickups, dying, an enemy, Player 2.0, text, score, audio and export. It ends by pointing learners toward what to do next. Brackeys also links a finished project and separate source repository.

**What it adds:** a concise beginner course can still reach a complete loop—movement, world, objective, danger, score, sound and export—without turning into a long encyclopedia. The "1.0 / 2.0" labels also communicate that the first version is intentionally basic and will be improved.

**G-Warp learning:** use explicit version labels such as "movement 1.0" then "movement 2.0". Show the learner that iteration is normal. Keep the first pass small enough to finish, then add quality and depth.

**Rights note:** the linked GitHub project declares the Unlicense/public-domain dedication for that repository. That licence applies to the repository content covered by it; it does not automatically grant rights to every sound, font, asset, music track or third-party resource shown in the video. Verify each asset separately.

Evidence: official video chapters/description and public project repository inspected.  
Sources: [Brackeys — How to make a Video Game](https://www.youtube.com/watch?v=LOhfqjmasi0) · [Brackeys project files](https://github.com/Brackeys/first-game-in-godot)

### 4.5 GDQuest — teach reusable building blocks, not just one scene

GDQuest's learning material describes core engine concepts such as nodes, scenes, scene trees and signals. It explains scenes as reusable entities/templates and shows how scenes can be instanced as characters, rooms or levels. Its save/load material is also useful as a reminder that persistence formats have security implications: loading a serialized resource can execute code, and safer data-only approaches may be preferable for untrusted saves.

**G-Warp learning:** teach reusable game concepts as modules: a player, pickup, enemy, room, dialogue interaction, HUD or weapon. A demo should teach what the piece does, what data it owns, what events it sends, and where it can be reused. Separately, saved checkpoints and user-authored projects must be treated as untrusted data; a future save format should not blindly execute embedded code.

**Caution:** Godot's node/scene/resource architecture is not G-Warp's architecture. The transferable lesson is modularity and explicit data boundaries, not a direct port of Godot internals.

Evidence: GDQuest tutorial/library pages inspected.  
Sources: [GDQuest — Essential Building Blocks](https://www.gdquest.com/tutorial/godot/learning-paths/getting-started-in-2021/chapter/2.4-essential-building-blocks/) · [GDQuest — Scenes and Nodes](https://www.gdquest.com/tutorial/godot/learning-paths/getting-started-in-2021/chapter/5.scenes-and-nodes/) · [GDQuest — Save and Load in Godot 4](https://www.gdquest.com/library/save_game_godot4/)

### 4.6 Masahiro Sakurai — short lessons about player experience and polish

Sakurai's official game-development video channel presents focused lessons on design and implementation. The *Design Specifics* topic collection includes subjects such as pausing for big moments, making buttons feel weighty, jump physics, hit-stop, center points, speed, and behaviour at ledges. These are not step-by-step projects; they are focused lessons about what the player experiences.

**G-Warp learning:** a demo step should sometimes answer a design question, not simply add a feature. For example: "Does this jump feel better with a slightly shorter hang time?" or "Does a brief hit-stop make the impact clearer?" Make a small A/B prototype, let the player feel the difference, and keep the selected version.

This source is a secondary index of episode topics alongside the creator's official channel; the research note does not claim that every episode's complete contents were inspected.

Evidence: official channel and episode-topic summaries inspected.  
Sources: [Masahiro Sakurai on Creating Games — official channel](https://www.youtube.com/channel/UCv1DvRY5PyHHt3KN9ghunuw) · [Design Specifics episode-topic summary](https://pokemonblog.com/2024/05/24/video-super-smash-bros-ultimate-director-masahiro-sakurai-explains-how-theres-no-one-right-way-to-make-a-game-but-you-do-need-to-hone-in-on-the-experience-you-want-to-provide/)

### 4.7 Mark Brown / Game Maker's Toolkit — study games to learn design ideas

Mark Brown's writing describes learning from a variety of games, identifying the specific design ideas they teach, and acknowledging one's own selection and bias. His prototyping article, covered in the first research pass, recommends prototypes that answer specific questions rather than merely being low-quality versions of a planned final game.

**G-Warp learning:** the research library should include "design studies" as well as coding tutorials. A design study might compare how two games communicate danger, teach a new rule, pace a level, reward exploration or introduce a boss. It should state the question being studied and the evidence, not simply say that a game is "good."

Evidence: creator's writing inspected.  
Sources: [GMTK — The 100 Games That Taught Me Game Design](https://gmtk.substack.com/p/the-100-games-that-taught-me-game) · [GMTK — What's the Point of Prototyping?](https://gmtk.substack.com/p/whats-the-point-of-prototyping)

## 5. Important separate discovery: Griff (griff.games), not Griffpatch

This is a different creator/project from Griffpatch. Do not merge their names, projects, tutorials or licences in the research database.

Griff's website is particularly relevant because it documents both small step-by-step game builds and a workflow for an AI agent operating an editor. Its tutorials include a platformer, top-down adventure and crate-pushing puzzle. The pages use editor instructions, pictures, explanations and play steps.

### 5.1 The platformer lesson makes each step testable

The platformer tutorial begins with a hero, a floor and a ledge. It then tells the learner to press Play, hold Right for a measured duration and press Jump. Next, it asks the learner to tune jump height and play again. After that, it introduces a coin and score, then a hazard, and finally a complete playable level.

The valuable pattern is the combination of:
- action sequence;
- short explanation of why the component exists;
- concrete play instruction;
- expected change in how the game behaves;
- a tuning step that lets the learner feel the effect of one number.

### 5.2 The top-down lesson shows a different genre path

The top-down adventure starts from a different movement model: no gravity and eight-direction movement. It introduces a lantern and light/shadows, then walls and collision, followed by a locked door, key and treasure. This is a useful reminder that the knowledge base needs different genre-specific paths rather than one universal platformer recipe.

### 5.3 The puzzle lesson teaches state and completion

The crate-pushing puzzle uses a tilemap room, a grid-based player, pushable crates, goals, a counter and a solved panel. The page explains why a crate can move only if the cell beyond it is free and how a completion message is sent when all goals are covered.

**G-Warp learning:** puzzle lessons should explain the state rule and failure condition, not just tell the learner where to place pieces. The learner should test a legal move, an illegal move, and the solved state.

### 5.4 Agent workflow: inspect, build, observe, play, correct, save

Griff's agent tutorial describes a live-editor workflow over MCP:

1. An agent asks the editor which components exist and reads their descriptions.
2. It creates a small level with a hero, ground, ledge, coin and score.
3. It inspects the scene tree and entity properties.
4. It takes an editor screenshot.
5. It presses Play and sends test inputs (for example, hold Right, tap Space, wait).
6. It watches selected entities and checks the resulting state.
7. If something is off, it changes a property and plays again.
8. It saves the scene to an ordinary project file that can be opened and version-controlled.

This is the clearest example found in this pass of an agent learning from the actual editor tool descriptions, checking its own construction visually and through play, correcting a parameter, and preserving the result.

**What G-Warp should study:** future G-Warp AI should be designed around a closed feedback loop, not a one-shot block generator. It should discover the allowed tools and block types from the actual current environment; create only a small change; inspect the result; run a relevant test; capture evidence; make a bounded correction; and save a stable checkpoint.

**Important boundaries:** this is Griff's separate editor and MCP interface. It is not evidence that G-Warp currently exposes these tools or that this exact MCP design should be copied. Its implementation and MIT license are separate from Griffpatch's content. Study the workflow; do not import Griff's code or assets into G-Warp without an explicit future review.

Evidence: creator/tutorial pages inspected, including the agent page's described commands and input sequence. The external editor itself was not run by this research session.  
Sources: [Griff — Your First Platformer](https://griff.games/tutorials/first-platformer/) · [Griff — A Top-Down Adventure](https://griff.games/tutorials/top-down-adventure/) · [Griff — A Crate-Pushing Puzzle](https://griff.games/tutorials/puzzle/) · [Griff — Making a Game with an Agent](https://griff.games/tutorials/making-a-game-with-an-agent/) · [Griff — Tutorials index](https://griff.games/tutorials/)

## 6. Learning science and design research

### 6.1 Scratch Foundation: creative learning is a loop

The Scratch Foundation describes a creative-learning approach in which learners imagine, create, play, share, reflect and imagine again. It emphasizes projects, passion, peers, play and purpose, as well as breaking problems into smaller parts, debugging and iterating. Its "low floors, wide walls, high ceilings" idea supports multiple entry points and many ways to personalize a project.

**G-Warp learning:** every demo should have a low-friction first success, multiple ways to customize, and optional advanced branches. The user should be able to tinker and play before committing to a long path. Sharing or explaining a build can be an option, not a forced step.

Source: [Scratch Foundation — Creative Learning Philosophy](https://www.scratchfoundation.org/learn/learning-library/scratch-creative-learning-philosophy)

### 6.2 Game feel is a system, not just animation

A survey of game-feel research reviews more than 200 sources and organizes moment-to-moment interaction around physicality, amplification and support. Its examples include gravity, collision shape, knockback, recoil, screen shake, audio cues, particles, animation timing and response support.

**G-Warp learning:** once a mechanic works, teach how to tune its feel. A jump is not only "does the player get upward?" It also concerns acceleration, hang time, landing response, input forgiveness, animation, sound and visual feedback. Use one-variable experiments where practical so the learner can tell what changed.

The survey is a synthesis of prior research, not a universal formula. "More effects" is not always better; feedback must help the player understand the action and should not obscure control.

Source: [Game Feel: A Survey of the State of the Art](https://arxiv.org/abs/2011.09201)

### 6.3 Tutorial quality can be evaluated with novice questions

A 2024 research paper, *Level Up Your Tutorials: VLMs for Game Tutorials Quality Assessment*, proposes collecting important frames and questions from a game tutorial, specifying expected answers, and comparing a vision-language model's answers with the intended answers. The paper notes that tutorial quality often needs feedback from people who are unfamiliar with the game, but that human evaluation is resource-intensive.

**G-Warp learning:** future tutorial review should ask whether a new learner can answer:
- What am I trying to make?
- Which editor area or block do I need?
- What should I see after this step?
- What do I do if it does not look right?
- Why did the creator add this feature now?

An AI can help draft and check these questions, but it cannot replace actually testing the lesson with a person who has not seen it before.

Source: [Level Up Your Tutorials: VLMs for Game Tutorials Quality Assessment](https://arxiv.org/abs/2408.08396)

## 7. Combined patterns: what the strongest sources have in common

| Pattern | Evidence from research | How it should inform G-Warp later |
|---|---|---|
| Reach a playable result early | Griffpatch basics; Griff first platformer; Brackeys | First milestone should have a visible, controllable interaction—not a giant setup task |
| Add one meaningful layer at a time | Griffpatch series; Shaun Spalding's numbered parts; DaFluffyPotato | Each step should change one understandable aspect of the game |
| Explain the reason | Griff's tutorials; GDQuest; Scratch pedagogy | Say what a block or object contributes and why it is needed now |
| Test as part of teaching | Griff's measured play steps; Griff agent workflow; Griffpatch cloud multiplayer | Put a short play check inside every meaningful milestone |
| Fix real edge cases | Griffpatch's collision/jump/ceiling topics; cloud-variable limits | Include expected failures and repair steps rather than hiding them |
| Separate mechanics from feel | Griff/Sakurai/game-feel survey | Teach working behaviour first, then tune feedback and response |
| Reuse components | GDQuest scenes/components; Griff component descriptions | Teach reusable actors, pickups, enemies, rooms and UI as separate concepts |
| Finish a small game | Brackeys; Godot official first 2D game; Sebastian Lague | A selected learning path should have a clear final playable outcome |
| Keep project states | Numbered creator series and source listings | Save meaningful versioned checkpoints with prerequisites |
| Let the learner personalize | Scratch philosophy; Griffpatch invitation to experiment; Brackeys' "expand in your own way" | Make customization and branching a core option, not an afterthought |
| Teach design questions | Sakurai; GMTK; game-feel survey | Include experiments that compare two possible player experiences |
| Preserve evidence | Griff agent's inspect/play/save loop; tutorial-quality paper | Record what was checked and what still remains untested |

## 8. Recommended research library design for future G-Warp AI

The next step is not to collect entire videos or dump raw code into model memory. Store compact records that can be searched by mechanic, genre, creator, engine, lesson step and evidence.

### 8.1 Creator and source record

Each source record should include:
- Creator name exactly as the source uses it; channel/site; official profile.
- A disambiguation field where names overlap (for example, Griffpatch vs Griff).
- Series/project title, direct URL, publish date (when available), and last checked date.
- Target engine/tool and its version, if visible.
- Content type: video lesson, written tutorial, source project, design talk, postmortem, research paper.
- Source status: primary creator source, official engine documentation, community/fan index, or secondary commentary.
- Licence and attribution notes for code, art, audio, screenshots and other assets separately.
- Evidence level: page inspected, chapters inspected, video watched, project inspected, code inspected, test executed.

### 8.2 Lesson-step record

Each episode or lesson step should be indexed independently:
- Step/episode number, title and exact timestamp or page anchor.
- The playable goal and what changes from the prior step.
- Prerequisites and concepts reused from earlier steps.
- Starting project/checkpoint identifier.
- Actions the learner performs, in order.
- Why the new mechanic or system is introduced.
- Expected on-screen result.
- A play-test instruction and what success looks like.
- A negative/edge-case test where appropriate.
- Any bug, limit or trade-off the creator calls out.
- The next natural step and optional branch points.
- G-Warp translation only after checking current block catalog and runtime; never infer equivalent blocks from a tutorial's words alone.

### 8.3 G-Warp checkpoint record

A future G-Warp checkpoint should contain:
- Unique checkpoint ID and parent checkpoint ID.
- The project file or snapshot identifier.
- Lesson step number and source lineage.
- Required features and known limitations.
- A short summary of changes from the parent.
- Tests run, exact inputs, expected outcome and observed outcome.
- Evidence type: generated, inspected, static-checked, or actually played in G-Warp.
- Whether the checkpoint is safe to branch from.
- A reversible path to the prior known-good state.

The user should be able to select "continue from Step 3" without replaying Steps 1 and 2. If the selected checkpoint is missing a prerequisite, G-Warp AI should state exactly which prerequisite is missing and offer to add only that prerequisite or continue with a supported alternative. It should not silently rebuild the entire project.

### 8.4 Two complementary learning modes

Future G-Warp AI should keep two kinds of content separate but linked:

**A. Follow-along series** — a sequence that builds a complete small game. Example: player → movement → collision → objective → hazard → feedback → start/finish → polish.

**B. Design lab** — a short experiment that answers one question. Example: compare jump heights, test a dash cooldown, compare two enemy warning signals, or try different camera follow strengths.

The follow-along series teaches how systems accumulate. The design lab teaches judgment and experimentation. A design lab should not pretend to be a full tutorial, and a complete tutorial should not force the user through every possible variant.

## 9. Research priorities for future passes

The first two research passes already have strong foundations for platformers, top-down movement, basic RPG progression, tile scrolling, arcade runners, and general editor workflows. To broaden the eventual library without losing depth, future research should fill these topic areas:

1. **Enemy AI and combat:** patrol, chase, line-of-sight, attack telegraphs, cooldowns, damage windows, boss phases, and readable failure.
2. **Puzzle logic:** push/pull rules, switches, keys, doors, grid movement, undo, reset and solvability checks.
3. **Level design and pacing:** teaching a mechanic safely, increasing challenge, introducing variations, checkpoints, secrets, and boss/tutorial arenas.
4. **Progression and persistence:** inventory, equipment, quests, unlocks, dialogue, save slots and data-only save formats.
5. **Camera and world structure:** room transitions, scrolling, tilemaps, parallax, world maps and scene/level organization.
6. **Multiplayer and shared state:** synchronization, latency, authority, privacy, cheating and data limits. This area needs a dedicated security review before any G-Warp application.
7. **Game feel and accessibility:** input buffering, coyote time, remapping, reduced motion, readable contrast, sound feedback, adjustable difficulty and forgiving controls.
8. **Audio and visual polish:** music structure, original sound effects, impact feedback, particles, animation timing and performance.
9. **Other genres:** rhythm, cards, tactics, roguelikes, visual novels, management/simulation, racing and fighting games.
10. **3D concepts:** perspective, cameras, transforms, lighting, collision and spatial reasoning. Research should clearly label which subjects are not currently applicable to a 2D-first G-Warp workflow.

For each area, choose a small number of high-quality primary sources, study the exact sequence, and record what was really observed. Do not create a large low-quality source list just to claim broad coverage.

## 10. Safety, originality and project boundaries

- Learn general game mechanics, design principles, teaching sequences and debugging methods. Do not copy full scripts, block stacks, level layouts, characters, sprites, music, sound recordings, logos, names, thumbnails or branding unless a specific licence or written permission allows it.
- G-Warp must keep its own identity. The team rulebook specifically says not to use Scratch art, Scratch logos, library pictures or the Scratch cat.
- A public video is not a licence to reuse its content. Check licences per asset and per project; a project's open-source licence does not necessarily cover third-party music, art, fonts or footage.
- Do not imply endorsement, sponsorship or affiliation by Griffpatch, Griff, Brackeys, GDQuest, Shaun Spalding/SaraJS, DaFluffyPotato, Sebastian Lague, Sakurai, Mark Brown or the Scratch Foundation.
- Do not assume that G-Warp can reproduce an external engine feature. Future demonstrations must map each required mechanic to the current G-Warp block catalog and verify it in the app before presenting it as supported.
- A generated project is not a tested project. Clearly distinguish generated, inspected, static-checked and actually played states.
- Keep G-Warp's own files, source lineage, project snapshots and user modifications. Never let a research note silently overwrite a user's project or remove existing features.
- This document is research only. No demos, project files, app changes or implementation proposals were produced in this pass.

## 11. Source register

All links below were checked on 26 October 2026 unless the page itself provides a different publication date.

### Griffpatch
1. Scratch profile — https://scratch.mit.edu/users/griffpatch/
2. Scratch studios — https://scratch.mit.edu/users/griffpatch/studios/
3. Platformer basics — https://www.youtube.com/watch?v=D16hTnDGweo
4. Cloud multiplayer episode 1 — https://www.youtube.com/watch?v=1JTgg4WVAX8
5. Scrolling Platformer playlist — https://www.youtube.com/playlist?list=PLy4zsTUHwGJIqB6hg-sOxiwsJn7UfuCLw
6. RPG tutorial — https://www.youtube.com/watch?v=5lof-Nu1VVE
7. Geometry Dash tutorial — https://www.youtube.com/watch?v=FYZ1bfB1nho

### Other game educators
8. SaraJS / Shaun Spalding, Complete Platformer Tutorial — https://sarajs.itch.io/saras-complete-platformer-tutorial-series
9. GameMaker official Shaun Spalding platformer guide — https://gamemaker.io/en/blog/create-a-platformer-game-with-gml
10. DaFluffyPotato, Pygame Platformer Full Course — https://www.youtube.com/watch?v=2gABYM5M0ww
11. Sebastian Lague, Create a Game series — https://sebastian.itch.io/create-a-game-series
12. Brackeys, Godot beginner game tutorial — https://www.youtube.com/watch?v=LOhfqjmasi0
13. Brackeys, public project source — https://github.com/Brackeys/first-game-in-godot
14. GDQuest, essential building blocks — https://www.gdquest.com/tutorial/godot/learning-paths/getting-started-in-2021/chapter/2.4-essential-building-blocks/
15. GDQuest, scenes and nodes — https://www.gdquest.com/tutorial/godot/learning-paths/getting-started-in-2021/chapter/5.scenes-and-nodes/
16. GDQuest, save/load security and data — https://www.gdquest.com/library/save_game_godot4/
17. Masahiro Sakurai, official game-development channel — https://www.youtube.com/channel/UCv1DvRY5PyHHt3KN9ghunuw
18. Design Specifics topic summary — https://pokemonblog.com/2024/05/24/video-super-smash-bros-ultimate-director-masahiro-sakurai-explains-how-theres-no-one-right-way-to-make-a-game-but-you-do-need-to-hone-in-on-the-experience-you-want-to-provide/
19. Mark Brown / GMTK, The 100 Games That Taught Me Game Design — https://gmtk.substack.com/p/the-100-games-that-taught-me-game
20. Mark Brown / GMTK, What's the Point of Prototyping? — https://gmtk.substack.com/p/whats-the-point-of-prototyping

### Separate project named Griff (not Griffpatch)
21. Griff tutorial index — https://griff.games/tutorials/
22. Griff, first platformer — https://griff.games/tutorials/first-platformer/
23. Griff, top-down adventure — https://griff.games/tutorials/top-down-adventure/
24. Griff, crate-pushing puzzle — https://griff.games/tutorials/puzzle/
25. Griff, making a game with an agent — https://griff.games/tutorials/making-a-game-with-an-agent/
26. Griff — https://griff.games/

### Pedagogy and research
27. Scratch Foundation, Creative Learning Philosophy — https://www.scratchfoundation.org/learn/learning-library/scratch-creative-learning-philosophy
28. Game Feel: A Survey of the State of the Art — https://arxiv.org/abs/2011.09201
29. Level Up Your Tutorials: VLMs for Game Tutorials Quality Assessment — https://arxiv.org/abs/2408.08396
30. Godot, Your First 2D Game — https://docs.godotengine.org/en/latest/getting_started/first_2d_game/index.html
31. Godot, community tutorials and resources — https://docs.godotengine.org/en/stable/community/tutorials.html

## 12. Completion status

- Expanded creator and teaching-method research: complete for this pass.
- Source register: 31 entries.
- New, especially relevant finding: Griff's separate MCP-enabled editor example demonstrates a documented build/inspect/play/correct/save loop for an AI agent. It is not Griffpatch and not G-Warp.
- Earlier research document: unchanged.
- G-Warp demos: not created.
- Current G-Warp block mapping/runtime validation: not performed.
- App/runtime files: not changed.
- AIM-0 and other assignments: not started by this add-on.
- Overall research completeness: selective, evidence-labeled and expandable—not a claim to contain every game or all game-development knowledge.
