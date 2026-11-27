# OWNER PRIORITY UPDATE (27 Nov 2026, 07:57) - read this first, then the 26 Nov part below

The owner, in his words (short): **the ONLINE version comes first**, because that is what most people use. Desktop can wait: there it is easy (later: unpack a project into temporary files on disk like Unity / Unreal and read them as needed). Online, people must be able to make crazy, big, heavy projects; a game that runs fine on Scratch online must run at least as well in G-Warp online. **G-Warp is now fully Claude Opus's job** (every running lane is Opus): no other AI works on it for now, the goal is the app running 100%, and the owner wants work that gets MERGED, not side features that never are.

Full lists: `team/claude/SPEED-AND-FIX-PLAN-2026-11-27.md` (crashes, fixes, speed steps R1-R9, big projects, fair test).

## DO
1. Work on the **website build** first (creapter1.github.io/gwarp/app.html): test there, in Chrome and Edge, on an ordinary laptop budget.
2. Order: crashes (P0) → wrong results / Scratch parity (P1) → speed (R1-R9, with the running fast-code lanes) → things that confuse players (P2).
3. Prove every change with the fair test: Turbo OFF (checked), 30 FPS like Scratch, warm-up + 3 runs, median; re-run `VS-TURBOWARP.md` after each speed step.
4. Keep the parity gate at 100%: `bench/exam.sb3` (53 checks), `bench/game.sb3` (7), `bench/marathon.sb3` (10 min flat), Stop under 100 ms, save/reopen identical.
5. Big projects online: unpack pictures and sounds into the browser's own private disk (Origin Private File System), load them only when needed, keep a memory budget, save changed files only. This is the web version of the desktop "temporary files" idea.
6. Small steps, one at a time, each shipped as a build the owner can merge (ai-team branch → owner merges to main). Log every step in AI-TEAM.txt.
7. Own code only; TurboWarp and Scratch are closed boxes to measure against.
8. Keep every feature and G-Warp's look; keep the UI responsive while a project runs.

## DON'T
1. No new features, buttons, panels or "cool extras" until the crash list and the speed steps are done. No new top-bar buttons, no second engine, nothing that changes how projects run unless the owner says yes.
2. No "pass" from Turbo ON, 60 FPS, a single run, a tiny test, or a test only the agent ran without the numbers written down.
3. Don't change any block's result (that fails the parity gate even if it is faster).
4. Don't load a whole big project into memory, and don't build one giant zip in memory to save.
5. Don't work on desktop-only ideas now (the temporary-file engine comes after online).
6. Don't copy TurboWarp or Scratch code. Don't push to main. Don't delete the owner's files; back up before changing anything on his PC.
7. Don't edit the same part of app.html as another lane at the same time: take the lane lock first (lanes/LANES.md).
8. Don't leave work unmerged for long: finish, measure, hand the owner a build.

---

# OWNER PRIORITY (26 Nov 2026, 08:55) - read before "Next actions"

The owner, in his words: what he needs is the app RUNNING better than TurboWarp, nothing else matters. Beat Turbo's numbers, or at least the same time in everything.

## What this changes

**Step 2 (scripts become fast code) starts NOW and comes before the rest of step 1b.**
Step 2 only needs the Project Book, and the Book exists and is kept up to date (step 1a, build m). The rest of step 1b (Find and AI report read the Book, opening a Scratch file fills the Book first, faster writer) is needed for step 3, not for speed. Finish the 1b part that is in progress, ship it, then go to step 2. Come back to 1b c / d before step 3.

## The real gap (bigger test, so the times are above the clock's limit)

`team/claude/tools/gwt/bench40.sb3` (made with `python3 mkbench.py 40`), measured 26 Nov 08:55 with `tools/tw/twbench.js`, G-Warp build n. Seconds, lower is better.

| Test | Scratch | TurboWarp | G-Warp | TurboWarp is faster than G-Warp by |
|---|---|---|---|---|
| Count loop | 1.033 | 0.005 | 2.376 | about 475 times |
| Maths | 1.783 | 0.105 | 3.824 | about 36 times |
| Lists | 1.101 | 0.035 | 3.767 | about 108 times |
| If / compare | 1.659 | 0.010 | 5.768 | about 577 times |
| Pen | 0.422 | 0.039 | 2.449 | about 63 times |
| Text | 2.536 | 0.029 | 1.969 | about 68 times |

Owner's game, 3D gameplay: script time per step Scratch 8.3 ms, TurboWarp 0.5 ms, G-Warp 16 ms.

## Target for step 2 (when is it "better than Turbo")

- Every row of the table above: G-Warp's time at or under TurboWarp's time, measured the same way on the same machine, 3 runs each, middle value.
- Owner's game: script time per step at or under TurboWarp's, and a steady 30 steps per second.
- All referee tests still match real Scratch. Speed never buys a wrong answer.
- Be honest in every report: a row is "won" only when the numbers say so. Both apps run on the same JavaScript engine, so "the same time" is the realistic floor for plain loops; wins come from smarter code (numbers stay numbers, variables looked up once, no pause where Scratch does not pause) and from things TurboWarp does not do (live editing while running).

## Order inside step 2 (biggest win first)

1. The compile path itself, for the most common blocks: loops (repeat, forever, repeat until, if, if else), variables (set, change, read), operators (maths, compare, and / or / not, join, letter, length), My Blocks with "run without screen refresh". Scripts that use only these become one JavaScript function. Everything else in the script still goes through the block code G-Warp has (go-between), block by block.
2. Lists, pen, motion, looks, sensing, events (broadcast and wait), clones, sound, then extensions.
3. Live edit: a changed script is made again at once.
4. Old page-reading way removed when the referee is 100% and the table is won. One engine.

Ship after each of these, with the table measured again in the note.

## Added 26 Nov 09:02 (owner): use the hardware the way TurboWarp does, keep the app simple

- Owner: turn scripts into real code like Turbo does (step 2), and use the graphics card and memory where they make it faster. Focus on this app and keep it simple; no new big features now.
- Fact checked today: G-Warp draws the stage with the plain 2D canvas only (101 uses of the 2D canvas, no graphics-card drawing code at all). Scratch and TurboWarp draw the stage on the graphics card. So after scripts are fast, drawing is the next thing that holds G-Warp back (Pen row: TurboWarp 0.039 s, G-Warp 2.449 s; part of that is script time, part is drawing).
- New step, right after step 2, before step 3: **GPU STAGE.** The stage (sprites, graphic effects, pen, clones, stamps) is drawn on the graphics card, costumes are kept ready in video memory. Same pictures as Scratch, pixel-checked against the referee. Own code. The 2D canvas stays as the fallback when the graphics card way is not available, and for everything that is not the stage (paint editor, Spark Studio, and so on).
- Memory for speed is fine where it is measured to help: ready-made script functions kept in memory, costumes kept ready for drawing. Never the old kind of waste (copies of the whole page).
- Order now: finish the 1b part in progress -> STEP 2 fast code -> GPU STAGE -> rest of 1b -> step 3 -> step 4.
