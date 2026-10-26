# G-Warp Positioning & Feature Comparison — 2026-10-26

**Task:** COMPARE-1  
**Repository baseline:** `Creapter1/gwarp`, branch `main`, starting commit `74297a3d9af49489f7275c02d29a93269c34e74e`; research-session logging commits follow that baseline.  
**Scope:** Static repository/document review + official TurboWarp/PenguinMod documentation. No app/browser/runtime tests were run.  
**Purpose:** Define how G-Warp can become a recognized specialist option without trying to replace TurboWarp or PenguinMod.

---

## 1. Product position

G-Warp should not market itself as “a better TurboWarp.” A stronger, more credible position is:

> **A block-coding creative studio known for making music and character animation unusually approachable, expressive, and reusable in games.**

Its main identity pillars should be:

1. **Music creation** — create, edit, arrange, shape, and export original music.
2. **Character animation** — rig, pose, animate, preview, and export characters/frames.
3. **Block-coded games and stories** — use those creations directly in interactive projects.
4. **Project-aware AI assistant** — a possible later advantage, not a core promise until it is integrated, safe, reliable, and useful.

A person should be able to use G-Warp for only one job—make a soundtrack, build an animation, or export a reusable asset—and still get value. That is a valid success, even if they use TurboWarp or PenguinMod for the rest of a project.

## 2. Side-by-side comparison

Legend:
- **Documented:** stated in the reviewed product/repository documentation.
- **Gap / pending:** repository gap list or current work plan says it is missing, unfinished, or awaiting acceptance.
- **Unknown / not tested:** not enough current evidence to claim either presence or absence.
- This is a product-capability comparison, not a verified benchmark or a claim that one platform is universally better.

| Area | TurboWarp | PenguinMod | G-Warp: current documented position |
|---|---|---|---|
| Core editor/runtime | Mature Scratch 3 modification; JavaScript compiler, editor addons, developer tools, desktop app | TurboWarp-based editor with many additions, extension gallery, and its own community site | Own engine, not Scratch VM. Scratch-like workflow is the goal, but README explicitly says compatibility is still improving. |
| Performance | Compiler; official desktop page advertises 10–100x speed compared with Scratch, with project-dependent results; configurable FPS/interpolation | Inherits TurboWarp foundations and adds its own features | 60-FPS ambition and clone safety work are documented; no current controlled head-to-head benchmark was run in this review. |
| Extensions | Curated extension gallery and custom extensions; official documentation warns custom extensions are not Scratch-compatible | Large extra-extension gallery; supports loading extensions from URL, local file, or JS text with sandbox distinctions | Repository describes a large extension collection, but exact current count and compatibility need a fresh inventory/test. G-Warp has its own extension safety labels. |
| Editor helpers | Addons, searchable dropdowns, block tools, backpack, debugger/developer tools | Editor helpers, comments, block features, extension ecosystem, community gallery | Search and several helpers exist; missing-list still identifies gaps such as backpack, block switching, jump to definition, folders, and related workflows. Reconcile this list against current source before treating every item as still missing. |
| Paint / costumes | Improved costume editor, transparency, onion skinning and artist addons | Dedicated vector/bitmap Paint Editor | G-Warp documents a more extensive costume/animation workbench, but current paint/transform completeness and usability still need acceptance testing. |
| Sound editing | Standard Scratch-style sound workflow and extensions | Dedicated Sound Editor for importing, editing, and recording sounds | Sound import/recording and effects are documented; a built-in Song Maker and Create Melody area give G-Warp a more focused music-creation identity. |
| Music creation | No dedicated full Song Maker is highlighted in the official TurboWarp feature overview; extensions can add capabilities | Community extensions include TurboSynth and BeepBox-song support, plus beat-sync tools | Native Song Maker, Loop Maker, Create Melody controls, genre/mood/theme generation, bass/drums/chords and sound tools are documented. This is a strong opportunity, not yet proof of a best-in-class music workstation. |
| Animation | Onion skinning and costume-editor tools are documented; broad Scratch animation workflows | Paint editor and extensions; no equivalent built-in bone-animation timeline was established by the docs reviewed | Built-in Flipbook plus bone-rig Animation tab, frames, tween/in-between tools, onion skin, and Make costumes. This may be G-Warp's most distinctive editor capability if reliability and workflow are finished. |
| Packaging / sharing | Official Packager exports HTML, ZIP, Windows, macOS and Linux apps | PenguinMod Packager documents executable, ZIP and web-page output | G-Warp opens SB3 and ZIP-type PMP according to ENGINE-MAP; protobuf PMP is listed as missing. Export/package parity needs current verification. |
| Community / ecosystem | Large established user and developer ecosystem | Own project community, account/profile features, and extension gallery | Smaller/newer public footprint. Need easy asset exports, examples, creator credits, tutorials, and community discovery—not just more blocks. |
| AI | TurboWarp desktop documentation lists local face-sensing ML; extensions can add more | PenguinMod gallery includes a PenguinAI extension | G-Warp's AI is still a potential project-aware helper. Current knowledge pack has 120 tips but 0 executable recipes; the AI model/integration work remains separate and should not be advertised as a finished capability. |

### Official documentation reviewed

- TurboWarp Desktop features: https://desktop.turbowarp.org/
- TurboWarp documentation: https://docs.turbowarp.org/
- TurboWarp Packager: https://packager.turbowarp.org/
- TurboWarp custom extension documentation: https://docs.turbowarp.org/development/extensions/introduction
- PenguinMod overview: https://docs.penguinmod.com/
- PenguinMod editor, Paint and Sound Editor: https://docs.penguinmod.com/modules/
- PenguinMod extension documentation: https://docs.penguinmod.com/development/extensions/
- PenguinMod extra extension gallery: https://extensions.penguinmod.com/

## 3. G-Warp strengths worth protecting

### Music

Repository evidence:
- The current product notes list Song Maker controls for style, tune, key, speed, length, volume, Generate, Play and Stop.
- Create Melody controls and starter ideas are documented.
- The Sound Editor includes Play/Stop, FX, Undo, Duplicate, Download and Delete; sound upload and recording controls are documented.
- The A/B comparison page in `claude/experiments/music-compare/index.html` says the newer generator was merged into the app in v15.53.0, with Mix as the new default. It records Claude's measured generator diversity: 28/28 genres, 16/16 moods, 12/12 themes, and 448/448 genre×mood combinations. These are recorded generator-recipe diversity results, **not independent listening-quality scores**; ChatGPT did not rerun them. The referenced standalone B HTML file currently has zero bytes, so the A/B page is historical evidence rather than a runnable comparison today.
- The prior Gemini music report identified causes of repetitive generated melodies; the current A/B page says the new approach addressed genre/mood/theme differentiation and melodic contour.

**What G-Warp should add next (in this order):**
1. **Make generated music editable.** A generated melody should be a starting point, not a locked result. Let users change individual notes, rests, timing, velocity/intensity, and phrase shape.
2. **Give each stem real controls.** Melody, bass, drums, chords and fills should have independent volume, instrument/timbre, octave/register, and a small number of understandable tone controls. Avoid overwhelming children with a professional DAW control wall.
3. **Make the arrangement visible.** A clear timeline/step grid should show where each part enters, rests, repeats, builds, and ends. Add loop length and section duplication.
4. **Improve sound shaping.** Useful controls could include low/high tone shaping, attack/decay or envelope presets, swing, humanize, and per-part effects. Use plain-language labels and optional advanced controls.
5. **Make export a headline feature.** At minimum, export a rendered audio file. Then investigate separate stem exports and MIDI export so a song can be used in another editor/game. Verify file formats, timing, tempo, and licensing before promising them.
6. **Add reusable music assets.** Save/load patterns, instruments/presets, and complete song templates; allow a song or stem to be reused in another G-Warp project.
7. **Prove the music quality.** Compare repeated seeds, genre/mood/theme changes, arrangement variety, clipping, timing drift, Stop behavior, and export/re-import. Include blind listening checks with real users rather than relying only on unique recipe counts.

**Important competitive caveat:** PenguinMod's community gallery already includes music-related tools such as TurboSynth, BeepBox-song support, and beat-synchronization extensions. G-Warp's advantage should therefore be the **native, integrated, easy-to-learn music workflow**, not the unsupported claim that no other Scratch modification can make music.

### Animation

Repository evidence:
- The Animation plan documents the Flipbook player, onion skin, vector-costume bones, Rig/Animate modes, frame strip, in-between, Smooth x2, Glide, FPS, loop, and Make costumes.
- Make costumes is especially valuable: it turns animation frames into ordinary costumes, providing a path toward using the animation in standard Scratch-style projects.
- The Animation tab is documented as available to normal users, while Animation blocks and G mascot animations are still marked Developer-mode / unfinished in the plan.
- Current animation plan calls out a white frame-thumbnail background that should match the dark checkerboard.
- The rotation-centre mark is drawn but cannot yet be moved by the user.
- Existing review identifies save/reopen persistence, multi-sprite and clone isolation, global Stop cleanup, actual block-stack behavior, bitmap-rig behavior, and undo/redo as important unproven acceptance areas.

**What G-Warp should add/fix next (in this order):**
1. **Reliability before more effects:** save/reopen animation data; preserve frames, rigs, attachments, FPS, loop, poses and generated costumes; test global Stop; test Undo/Redo.
2. **Alignment tools:** movable rotation centre, centre-all-frames, visible centre cross, ground line, ruler/guides, snapping and drift warning. This directly addresses characters jumping between frames.
3. **A real layer workflow:** visible layer/part preview, visibility and lock controls, reorder parts, and per-frame layer order. Do not implement reordering until stable part IDs protect bone attachments.
4. **Timeline clarity:** selected-frame highlight, frame number/count, duplicate/insert/move, clear add/delete controls, auto-scroll and understandable timing/hold frames.
5. **Motion quality:** easing choices, squash/stretch with safe limits, follow-through, mirror pose, copy/paste pose and a reusable pose library. Keep current In-between/Smooth x2/Glide behavior available.
6. **Asset export:** export sprite sheet/individual frames and investigate GIF/APNG or video output. Make the result easy to import into other tools.
7. **Guided learning:** a short first-rig tutorial and starter poses/animations using G-Warp's own art style—not copied character art or another editor's UI.

**The opportunity:** TurboWarp's official feature page promotes onion skinning and improved costume tools. PenguinMod documents vector/bitmap paint and sound editors. The reviewed official docs did not establish a comparable built-in skeletal rig + frame-animation workflow. G-Warp can own this category if it becomes stable, easy to learn, and export-friendly.

## 4. AI: potential advantage, but not ready to be a headline claim

A generic chatbot is not enough to distinguish G-Warp. PenguinMod's extension ecosystem already includes PenguinAI, and TurboWarp lists local machine-learning face sensing.

G-Warp's more meaningful AI concept is a **project-aware creative coach**:
- Understand the selected sprite, scripts, variables, costumes, animation and song.
- Explain why a script or animation is behaving incorrectly.
- Help a beginner create or repair a melody, rhythm, pose or block sequence.
- Suggest a next step, then show exactly what it will change.
- Animate reconstructed blocks/scripts by default with a Skip option, as already documented in the product plan.
- Keep local-first behavior where feasible; clearly explain when any external service or data transfer is involved.
- Never silently edit projects, execute arbitrary JavaScript, upload private projects, or pressure children to share personal data.

**Recommendation:** keep AI optional and behind the music/animation work until it can reliably inspect project state, make bounded proposals, explain them, and pass safety/privacy tests. The 120-tip knowledge pack is a useful beginning, but its own notes report zero executable recipes and do not establish a finished integrated AI system.

## 5. Core gaps: don't become the weakest editor

G-Warp does not need every TurboWarp/PenguinMod addon. It does need a trustworthy baseline so people are not blocked when using it for a real project.

The repository's missing-list records earlier gaps including:
- Scratch editor workflows: variable/list management, stage monitors, dragging sprites on stage, costume/sound libraries, comments, reorder, sprite export and tidy scripts.
- Developer helpers: backpack, block switching, jump to definition, folders, keyboard navigation and searchable controls.
- Runtime/parity work: additional Scratch/TurboWarp/PenguinMod blocks, extensions and settings; custom blocks/procedures are called out as especially important in the product roadmap.
- Project compatibility: SB3 and ZIP-type PMP support are documented; protobuf PMP remains a known gap.

**Evidence warning:** the missing-list's numerical audit is dated 2026-10-19 and says it stopped early and counted palette presence, not runtime behavior. Some items may have changed since. Treat it as a candidate audit list, not a current verified count. Reconcile each item against current app source and real tests before scheduling it.

**Do not** add every exotic block or extension just to inflate the number. Prioritize common beginner workflows, correct behavior, save/load, stability, and a carefully curated set of high-value creative tools.

## 6. Suggested roadmap

| Priority | Workstream | What “good” looks like |
|---|---|---|
| P0 | Trust and compatibility | Reliable save/reopen; accurate SB3 and supported PMP behavior; core blocks/procedures; predictable Stop/Undo; tested performance. |
| P0 | Animation foundation | Stable frame/rig persistence, alignment, layer preview, clear timeline, undo, global Stop and Make costumes round-trip. |
| P0 | Music creation workflow | Editable notes and stems, per-part controls, arrangement grid, consistent playback, reusable patterns and audio export. |
| P1 | Creative export | Music audio/stems/MIDI investigation; animation sprite sheets/frames/GIF investigation; simple reuse in other projects. |
| P1 | Learning and discoverability | Short guided music/animation lessons, example projects, searchable help, creator credits and optional links to original tutorials. |
| P2 | Project-aware AI | Local-first, transparent, reversible assistant for music, animation and debugging, only after reliability and privacy acceptance. |
| P2 | Selective ecosystem growth | Curated extensions, creator-contributed packs and import/export workflows; don't chase raw extension counts. |

P0 items are foundations, not a promise to implement everything at once. The owner should choose one bounded job at a time.

## 7. What G-Warp should be known for

A realistic recognition target:

- **Music:** one of the most approachable music-creation experiences inside a Scratch-style block editor.
- **Animation:** a friendly built-in rigging and frame-animation workbench that can export ordinary costumes and reusable assets.
- **Creative workflow:** the ability to turn a song and animated character into a playable block-coded project.
- **AI:** a helpful project-aware coach, if it becomes reliable—not a generic AI badge.

The best marketing is a few excellent demonstrations:
1. Make a distinctive short song, edit its melody and bass, then export it.
2. Rig a simple original character, create a smooth walk and jump, align every frame, then Make costumes.
3. Use that character and song in a small playable game.
4. Optionally show the AI helping explain or improve one step, with the changes visible and reversible.

This gives creators a reason to visit G-Warp even when they already use TurboWarp or PenguinMod.

## 8. Evidence and limits

**SOURCE-VERIFIED / STATIC-ANALYSIS**
- Repository README, ENGINE-MAP, TODO, MISSING-LIST, animation work plan, music A/B comparison page, music research notes, G-Warp AI knowledge-pack notes and gap list were reviewed.
- Official TurboWarp and PenguinMod feature/documentation pages were reviewed.
- Current `app.html` blob at the research baseline: `73da98db21bcc8da72d73c6e1ca3eedce51fb191` (2,680,714 bytes); this session did not execute or fully inspect the live app in a browser.

**NOT-TESTED**
- No browser session, runtime test, audio listening test, export test, SB3/PMP round-trip, performance benchmark, accessibility test or real user study was run.
- No feature should be called “better”, “best”, “fully compatible” or “finished” on this report alone.
- No `app.html` or `index.html` edits; no integration, demo or code candidate was created.

**Next exact step:** have the owner select one bounded music or animation P0 item; Claude performs current-source review, integration (only with approval), and official runtime acceptance.
