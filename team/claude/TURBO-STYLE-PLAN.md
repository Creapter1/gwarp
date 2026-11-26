# G-Warp, Turbo-style inside: the plan

Claude Fable, 26 Nov 2026. Owner's decision (26 Nov, 00:34 to 00:42): keep G-Warp's own code and look, make the inside work the way TurboWarp's does, built our own way. No copied code. Start with step 1, project as data. **Nothing in this plan is built yet. The owner sees it first.**

## Rules for this work

- No code is copied from TurboWarp or Scratch. I read their public explanations and how their files are laid out, wrote down the ideas in plain words (part A), and G-Warp's version is written from this page only.
- Every feature stays: Spark Studio, SVG 360, Big map, addons, extensions (they keep working like TurboWarp's), AI tools, LAN, paint editor, all menus.
- The look stays exactly the same. A person using G-Warp should not be able to see any of these steps, only feel them.
- One engine. The old way of running stays only as a safety net while a step is new, and is removed when the tests are 100%.
- Every step ships on its own, has an off switch, and is checked against real Scratch before it is turned on for everyone.
- Owner's handover rule (26 Nov, 00:44): no rebuild from scratch. The inside changes step by step. After EVERY step the owner gets the full working app with everything in it (Spark Studio, SVG 360, Big map, addons, his look). It is tested on his game before it is handed over. If something breaks, the old version stays (backup before every write, as always).
- Owner's "done" rule (26 Nov, 00:49 and 00:51): the goal is the app, not one game. A step is NOT done until (1) the full app with every feature is on his PC, and (2) it was tested on many kinds of projects: small, huge, normal Scratch projects, projects that use every block kind, and his game. Each must load, edit, save, export and run the way Scratch does. The list of test projects and what each one proved is written in the step's notes, so "done" always means "these projects passed", never a guess.
- Owner's answers (00:46): the order is OK. The old way of running may stay as a safety net during step 2 and must be removed at the end, so G-Warp ends with one engine.

## Part A. How TurboWarp does it (what I found)

Marked **[read]** when I read it in their public pages, **[inferred]** when it is my conclusion.

### A1. The project is data

- **[read]** A Scratch project file is a zip. Inside is one text file that describes everything, plus the pictures and sounds, each named by a fingerprint of its content.
- **[read]** Each sprite has one flat table of blocks. Every block has an ID and a small record: what kind of block it is, the ID of the block after it, the ID of the block it sits in, its inputs, its menu choices, and, for the first block of a script, where it sits in the code area.
- **[read]** An input is either a plain value (a number, a text, a colour) or the ID of another block that sits in it.
- **[read]** Variables and lists are kept per sprite in their own small tables: ID, name, value.
- **[inferred]** While the project is open, the engine holds these same tables in memory and reads only them. It never looks at the drawn blocks.

### A2. Only the open sprite's blocks are drawn

- **[read]** There is one code area. When you pick another sprite, the code area is emptied and filled again from that sprite's table. The scroll position and zoom are put back after.
- **[read]** While it is being filled, the "something was edited" listener is switched off, so loading is not mistaken for editing.
- **[read]** Menus on blocks (sounds, sprites, variables) are not stored in the blocks. A small function makes the list at the moment the menu opens.
- **[inferred]** An edit in the code area (add, move, delete a block, change a value) is sent as a small message that updates the table.
- **[inferred]** Inside the open sprite, all of its blocks are drawn, also the ones far off screen. So a sprite with 2,000 blocks is still heavy there.

### A3. Scripts are turned into fast code

- **[read]** Scratch reads a script block by block every time: find the block, find its inputs, work out the inputs inside the inputs, keep its own list of where it is. TurboWarp instead writes a real JavaScript function for each script, once, when the script starts.
- **[read]** It does this in two passes. First it makes a simpler tree of the script and studies it. Then it writes the function from that tree.
- **[read]** The function has two layers. An outer part runs once per start and collects what the script needs (the sprite, the stage, its variables). The inner part is the script itself.
- **[read]** Loops become real loops: forever, repeat, repeat until. Inputs become plain values. Variables are found once, not on every use.
- **[read]** The inner part can pause and continue later. It pauses at the end of each loop pass so other scripts get a turn, and it skips that pause in "run without screen refresh" blocks.
- **[read]** To stay exact with Scratch, small helper functions do the tricky parts (comparing a text with a number, list positions like "last"), each with a short fast path for the normal case.
- **[read]** A block that has no fast version is run through the normal block code by a go-between. A script that cannot be turned into a function at all runs the old way.
- **[read]** Each My Block gets its own function.
- **[read]** Price they pay: changing a script while it runs does nothing until it starts again.

## Part B. G-Warp today (measured tonight on the owner's big game)

- Every block of every sprite is built as real page pieces, and the engine runs a script by reading those pieces.
- Undo keeps a copy of the whole code area as text.
- Website today (v15.69.0): 3,583 MB after opening. Build k: about 1,200 MB. Work in progress (thin menus): 766 MB.
- Speed: 3D gameplay takes about 15 ms of script time per step, real Scratch 6 to 7 ms.
- 2,088 of the game's 2,152 blocks are in ONE sprite. So "only the open sprite" alone saves almost nothing for this game. G-Warp needs one step more than TurboWarp has (step 4).

## Part C. G-Warp's own version, step by step

### Step 1. The project as data (the Project Book)

One table per sprite, like A1, in G-Warp's own shape: block ID, kind, next, parent, first block inside each mouth of a C block, inputs, menu choices, position. G-Warp already keeps inputs as small data notes inside each slot, so those go in as they are.

- **1a. Build it and prove it (nothing uses it yet).** A reader makes the Book from the page, and a writer builds page blocks from the Book. The proof: page to Book to page must give the very same page, for every test project and the owner's game. The Book is kept up to date after every edit. A checker in Developer mode shows green or red. Risk: none, nothing depends on it yet.
- **1b. First users of the Book.** Undo and redo keep small Book changes, not a copy of the page. Save, export, the AI report, Find and the block counter read the Book. Opening a Scratch file fills the Book first and builds the page from it.
- **Done when:** round trip is identical on all projects; undo, redo, save and reopen give the same project as before; an undo step on the big game is under 1 MB (today 6 MB, on the website 80 MB).

### Step 2. Scripts become fast code

This comes before "only the open sprite", because today the engine reads the page. Blocks cannot leave the page until the engine stops needing them.

- When a script starts, G-Warp makes one ready JavaScript function for it from the Book, our own two passes like A3: simple tree first, function second.
- Same pause rules as Scratch, checked by the referee: end of a loop pass, wait blocks, broadcast and wait, ask, and no pause inside "run without screen refresh".
- Block kinds are moved over family by family: control, data, operators, motion, looks, pen, sensing, sound, events, My Blocks, then extensions. A block kind not moved yet runs through the block code G-Warp has now (go-between), so every block keeps working on day one.
- **Better than TurboWarp here:** when you edit a script while it runs, only that script is made again, at once. Live editing keeps working.
- The glow on running blocks, the breakpoints and the step-by-step debugger keep working: the function reports which block ID it is on, only when the code area or the debugger is watching.
- **Done when:** all referee tests match real Scratch; the speed bench is at or under Scratch's times; the owner's game runs a steady 30 FPS in gameplay; then the old page-reading way is removed.

### Step 3. Only the open sprite's blocks are on the page

- Other sprites' scripts live only in the Book. Picking a sprite builds its blocks from the Book and puts scroll and zoom back.
- Target: under 0.3 seconds for a sprite with 2,000 blocks.
- Menus on blocks are made when opened (thin menus, already built tonight, are the first half of this).
- **Done when:** opening a project builds only one sprite's blocks; switching sprites loses nothing; LAN Live, Find across sprites and the AI tools work from the Book.

### Step 4. Beyond TurboWarp: only the scripts near your view are built

- Inside the open sprite, a script far outside the view is a light stand-in of the same size. It becomes real blocks when you scroll near it, when Find jumps to it, or when it glows.
- This is the step that helps the owner's game most, because almost all of its blocks are in one sprite.
- **Done when:** the big game opens in under 10 seconds and the editor stays smooth while scrolling and dragging.

### Later, not part of this plan yet

- Costume pictures loaded only when needed (the big game has 456). Not studied yet.
- PenguinMod blocks and custom stage size stay where they are in the to-do list.

## How every step is checked

- The Scratch referee (real Scratch engine, same project, compare every result): the test sets already in the repo.
- The app tests (53 + 28 checks), the speed bench, the memory test, and the owner's game played to gameplay.
- A step is OFF by default (Developer mode) until all of that passes, then ON with an off switch for one release, then the switch is removed.

## Where the ideas come from

- TurboWarp's own explanation of its compiler: https://docs.turbowarp.org/how
- The compiler overview in the TurboWarp engine's read-me (read through a public copy): https://github.com/HyperQuark/vm
- The Scratch file format: https://en.scratch-wiki.info/wiki/Scratch_File_Format
- How the Scratch editor fills its code area (public editor source, read for behaviour only)
- TurboWarp's own changes are under the GPL v3 licence. That is why this plan uses ideas only and no code. I am not a lawyer.
