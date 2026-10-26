# G-Warp QA kit — test and remix like Claude does

Written by Claude (2026-10-26) so **ChatGPT** (and any helper) can check G-Warp and build Scratch remixes the same way Claude did for
"Clone Multiplayer! G-Warp Smash remix". Everything here drives the **real app** (`app.html`) in a real browser and plays projects in
the **real Scratch engine**. No guessing: every tool prints PASS / FAIL or numbers you can paste into a report.

## 0. Setup (once per computer, needs Node.js 18+ and internet)

```
cd ai-team/tools/qa-kit
npm install
npx playwright install chromium
```

Windows: run these in **PowerShell** or **Command Prompt** inside the repo folder. Paths with spaces need quotes: `"My Game.sb3"`.
No internet? Put `tw.css`, `fa/` (Font Awesome 6.4.0 `css/` + `webfonts/`) and `jszip.min.js` in `qa-kit/offline/` (it is git-ignored).

## 1. The tools

| Command | What it does | When |
|---|---|---|
| `node smoke-app.js [app.html] [shot.png]` | Opens G-Warp, reads the version, clicks the main tabs, builds and runs a tiny script, looks for page errors | After **every** change to app.html |
| `node check-sb3.js game.sb3` | Scratch's own file checker, no extensions, only Scratch blocks, no missing files, sizes, **no AI marks** | Before giving the owner any .sb3 |
| `node run-in-scratch.js game.sb3 [sec] [--shots dir] [--keys "ArrowRight:600@1500"]` | Plays the project in the real Scratch engine, presses keys, takes screenshots, reports clones / broadcasts / errors | Proof that a project works in Scratch |
| `node roundtrip.js game.sb3 [out.sb3] [app.html]` | Opens the project in G-Warp and saves it again, then lists **every** difference (scripts, costumes, centres, sounds, comments) | Finding G-Warp import/export bugs |
| `node costume-bounds.js game.sb3 "Sprite" ["costume" ...]` | Where Scratch draws each costume (left / right / bottom / top) | Costumes that "jump" when they switch |
| `node dump-scripts.js game.sb3 > game.txt` | Every script as text. Diff two files to see what changed | Reviews, before/after |
| `node add-gwarp-intro.js in.sb3 out.sb3 [--wait] [--link URL] [--app app.html]` | The owner's "little commercial": a G-Warp splash (logo pops, "hel-lo", fade) + a note on the first sprite with the G-Warp link | Making a G-Warp remix of someone's project |

Exit code 0 = all good, 1 = a problem was found. Always paste the tool output into your report.

## 2. Evidence words (use exactly these)

- **TESTED in G-Warp** = a kit tool ran it in app.html and printed PASS.
- **TESTED in scratch-vm** = `run-in-scratch.js` / `costume-bounds.js` ran it in the real Scratch engine. This is NOT "tested on the Scratch website".
- **NOT-TESTED** = you only read the code or the file. Say it plainly.
- Never write "it works" without a tool line that shows it.

## 3. Building things INSIDE G-Warp (the builder, `window.GWB`)

`lib/gw.js` opens the app; `injectBuilder(page)` loads `lib/gw-builder.browser.js`, which makes **real G-Warp blocks** with G-Warp's own
builders, so the result is saved by G-Warp's own exporter (owner rule: "using the app, not something else").

```js
const { openApp, openProject, injectBuilder, saveSb3 } = require('./lib/gw');
const { browser, page, errors } = await openApp();           // or openApp('path/to/app.html')
await openProject(page, 'game.sb3'); await injectBuilder(page);
await page.evaluate(async () => {
  const B = GWB, E = Engine;
  const i = E.sprites.findIndex(s => s.name === 'Player');
  // when green flag clicked: set score to 0, forever { if key space pressed { change score by 1 } }
  B.globalVar('score');
  B.stack(i, 0, 0, [GW_V1571.blk('when_flag'), B.SET('score', 0),
    B.C('forever', [], [], { body: [B.IF(B.key('space'), B.CHG('score', 1))] })]);
  try { GW8.decorate(); GW_V1571.rehydrate(); GW8.indexCustomProcedures(); GW.refreshBlockMenus(); } catch {}
});
await saveSb3(page, 'out.sb3');   // scratchOnly: a pure Scratch 3 file
await browser.close(); console.log(errors);
```

**Expressions** (round / hexagon reporters): `B.V('var')`, `B.lit(5)`, `B.add(a,b)`, `B.sub`, `B.mul`, `B.div`, `B.mod`, `B.eq`, `B.lt`, `B.gt`,
`B.and(a,b,c...)`, `B.or(...)`, `B.not(c)`, `B.join(a,b,...)`, `B.abs(x)`, `B.round(x)`, `B.rnd(1,10)`, `B.letter(i,s)`, `B.length(s)`,
`B.item('list', i)`, `B.llen('list')`, `B.key('up arrow')`, `B.X`, `B.Y`, `B.DIR`, `B.COST`, `B.P('param')` (custom block input),
`{ type: 'touching_sprite', target: 'Ground' }`, `{ type: 'costume_name' }`, `{ type: 'touching_color', args: [B.lit('#ff0000')] }`.
Plain numbers / strings are turned into literals for you.

**Blocks**: `B.C(type, inputs, menus, { body, else, cond, menuExpr })` makes any G-Warp block. Short forms: `B.IF(cond, ...body)`,
`B.IFE(cond, [body], [else])`, `B.SET(var, value)`, `B.CHG(var, by)`, `B.LADD(list, v)`, `B.REP(list, i, v)`, `B.LCLR(list)`,
`B.COSTUME('name')` or `B.COSTUME(expression)`. Block type names: `ai-team/gwrap-blocks.json`, or `GW_V1580_SB3.CMD` in the app
(Scratch opcode -> G-Warp type), e.g. `goto_xy`, `change_x`, `set_size`, `set_effect` + menu `ghost`, `go_front_back`, `create_clone`,
`delete_clone`, `when_clone`, `when_broadcast`, `broadcast`, `broadcast_wait`, `wait`, `repeat`, `repeat_until`, `start_sound`, `say`.

**Scripts, custom blocks, notes**: `B.stack(spriteIndex, x, y, [hat, ...blocks])`, `const d = B.define(i, x, y, 'Jump %n high', ['h'], [...body])`
(always "run without screen refresh"), `B.CALL(d, 10)`, `B.comment(i, x, y, 'text', width)`.

**Art, sprites, sound**: `await B.newSprite('Name', [{ name, svg, rc: { x, y } }])`, `await B.costume(name, svg, rc)`, `B.locals(sprite, ['a','b'])`
(for-this-sprite-only vars, needed for clones), `B.globalList('name')`, `B.globalVar('name')`, `await B.synth('hit', 0.2, (noise, tone) => {...})`
(G-Warp's synth, no recordings), G-Warp's own animation: `GW_ANIM.makeCostumes(sprite, anim)` (bones + poses -> real costumes "name//frame N").

## 4. Rules learned the hard way (read before building)

1. **Loops yield.** A `repeat` in a normal script waits one frame per turn. Put loops that must finish at once (setup, spawning clones,
   hit checks) in a custom block made with `B.define` (warp). Example bug: the HUD showed a stray digit because its setup loop yielded.
2. **Literal costume names** go in the menu: `B.COSTUME('logo')`, not an expression. An expression that is just text was saved as "costume1".
3. **SVG rotation centre**: Scratch measures it from the SVG's own (0,0), G-Warp from the viewBox corner. G-Warp converts this since
   v15.51.0. If a costume jumps, run `costume-bounds.js`.
4. **Clones copy local variables** at the moment they are made: set the clone's values on the parent, then `create_clone`.
5. **Broadcast tick pattern**: one forever loop sends `broadcast and wait [tick]`; every sprite does its frame on "when I receive tick".
   No `wait` blocks inside tick scripts.
6. **Platformer collisions** (griffpatch's method): switch to a box "hitbox" costume, move x, push out of the ground, move y, push out,
   switch back. Never use colour touching for the floor. See the Clone Multiplayer remix ("Move with collisions").
7. **A clone that is out (0 lives)** must stop doing its tick scripts: add `and (item ID of Lives > 0)` to the tick script's first `if`.
8. **Keep the original**: never delete the original creator's scripts or art; add next to them. Credit them in a note. No AI marks
   anywhere (`check-sb3.js` checks). Owner rules: no cats / Scratch art, G-Warp's own art only, nothing private copied into the repo.
9. **Never edit app.html for a remix.** If the remix shows a G-Warp bug, write it down (file + steps + kit output); Claude fixes app.html.

## 5. The remix recipe (what Claude did for Clone Multiplayer)

1. `node dump-scripts.js original.sb3 > original.txt` - read every script first. Write down the variables, lists, broadcasts.
2. `node run-in-scratch.js original.sb3 20 --shots before` - see how it plays now.
3. `node roundtrip.js original.sb3` - G-Warp must keep the project exactly (fix / report before going on).
4. Write `my-remix.js` with the builder (section 3). Change in small steps; after each step: save, `check-sb3.js`, `run-in-scratch.js`.
5. Add the intro: `node add-gwarp-intro.js my-remix.sb3 final.sb3` (or build your own splash with the builder).
6. Final proof: `check-sb3.js` ALL PASS + `run-in-scratch.js` with keys + screenshots. Report as "TESTED in scratch-vm".
7. Give the owner the .sb3. **Do not** put someone else's project in the repo.
