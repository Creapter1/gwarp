# ⚡ G-Warp

G-Warp (G Wrapper) is a free, block-based game maker. It works the way **Scratch, TurboWarp and PenguinMod** work (same blocks, same results, opens their projects), but with its **own dark, electric look**, a mascot named **G-Spark**, a built-in **Song maker** and **191 extensions**.

**Status:** Beta (the only beta for now). Some things may break. If you find a bug, that's how G-Warp gets better.

- **Website:** https://creapter1.github.io/gwarp/
- **App (Beta):** https://creapter1.github.io/gwarp/app.html
- **Tester account on Scratch:** https://scratch.mit.edu/users/creapter_teter/

---

## Try it
1. Open the website and click **⚡ Create your first code** to start a new project, or **📂 Use your project** to open a `.sb3` (Scratch / TurboWarp), `.pmp` (PenguinMod) or G-Warp file.
2. Drag blocks from the palette into the code area and snap them together.
3. Press **Start** in the top bar. **Pause** and **Stop** are next to it.
4. Save with **More → Save to your computer**. Your project works in Scratch too, as long as it only uses normal Scratch blocks.

Works best on a computer (Chrome, Edge, Firefox). Phones aren't supported yet.

## What's inside
| Area | What it does |
|---|---|
| **Code** | Every Scratch block, electric C-blocks with a live "wire", right-click search, duplicate, comments, clean up |
| **Costumes** | Vector + bitmap paint editor, G-Warp's own sprite library (rockets, coins, gems… no cats) |
| **Sounds** | Sound editor, instruments, loop maker and the **Song maker** (genre, mood, theme → a whole song) |
| **Stage** | 480×360 stage, backdrop library (Space, Night City, Underwater…), select the Stage like in Scratch |
| **Extensions** | 8 of G-Warp's own + 104 TurboWarp + 79 PenguinMod, each labelled ✓ Safe / ● Moderate / ⚠ Dangerous |
| **Bug Hunter** | Break G-Warp and you earn an achievement |
| **Look like Scratch** | Optional, in More → Settings. The electric look stays the default. |
| **GWrap AI** | In the works: a helper inside the editor (only helps with G-Warp, nothing else) |

## Documentation (start here)

- **[Documentation index](docs/README.md)** — user guide, UI behavior guide, source audit, live verification report, and screenshot gallery.
- **[User guide](chatgpt/USER-GUIDE.txt)** — how to use the app.
- **[UI behavior guide](chatgpt/SCREENSHOT-UI-DOCUMENTATION.md)** — how controls and menus work, with real screenshots and clearly labelled schematics.
- **[Live UI verification](docs/LIVE-UI-VERIFICATION.txt)** — 10 browser/layout checks, evidence, and remaining tests.
- **[Screenshot gallery](docs/screens/)** — real screenshots from the running app.

## Files in this repo
| File / folder | What it is |
|---|---|
| `index.html` | The website |
| `app.html` | The G-Warp Beta app (one single file, ~2.3 MB). **Only Claude or the owner changes it.** |
| `AI-TEAM.txt` | The AI team: who does what, team rules, the "continue" word, the work log |
| `TODO.txt` | The main to-do list (URGENT / NOW / LATER / DONE) |
| `TODO-GROK.txt`, `TODO-DEEPSEEK.txt`, `TODO-GEMINI.txt` | Each AI's own job list |
| `ENGINE-MAP.txt` | The REAL names inside G-Warp's engine. Read before writing code. |
| `MERGE-QUEUE.txt` | Everything handed in and its status (pick / reference / superseded / waiting) |
| `STYLE-GUIDE.txt` | G-Warp's look, words and what's not allowed (brands, characters…) |
| `chatgpt/`, `grok/`, `deepseek/`, `gemini/` | Each AI's own work. Nothing in here runs on the website until it's merged. |

## How it's built (the team)
- **Owner (Creapter1):** decides everything, tests every update with screenshots.
- **ChatGPT:** first engineer + UI research. **Grok:** Scratch behaviour specs + tests. **DeepSeek:** lab scientist (3 versions of every fix). **Gemini:** icons and pictures.
- **Claude:** checks everyone's work, fixes it, tests it, merges it into `app.html` and puts it on the website.
- Every AI follows `AI-TEAM.txt`. Typing **continue** to any AI means "re-read the files and keep going".

## Roadmap
1. **Match the basics 1-to-1:** every block, menu and tool works like Scratch (now: UI audit + costume editor fixes).
2. **Make it tough:** no freezes (clone limit, frame budget, stuck-script box, crash recovery).
3. **Speed:** every project at a steady 60 FPS or more.
4. **Build in AI:** GWrap AI helper + "use your own API key".
5. **Extras:** better music, more extensions, more of G-Warp's own sprites, the "Open in G-Warp" browser button.
6. **Full release.**

## Rules we build by
1. **Same same, but different.** It works like Scratch, TurboWarp and PenguinMod, but with G-Warp's own look. The Scratch look is only an option in Settings.
2. **Theirs is theirs, ours is ours.** No Scratch art or logos, and no characters or brands from games, films or shows (no Mario, Nintendo, Sonic, Pokémon, Minecraft…). Every extension creator is credited and their licence is followed.
3. **Safety first.** Extensions that can read personal information always show a warning. No accounts. Kids under 13 need a parent's OK before any data is sent. Projects can never run hidden JavaScript.
4. **Don't replace, add.** Features that already work stay. New things are added next to them.

## Report a bug
Open an **Issue** on this repo (say what you did, what happened, and what you expected), or comment on the tester account on Scratch. Don't share personal info.

## Credits & licence
G-Warp's own code is MIT licensed (see `LICENSE`). Extensions from TurboWarp and PenguinMod keep their own licences and credits, listed inside the app (Extensions → Credits & licenses).

## Not official
G-Warp is an independent project. It isn't made by or connected to Scratch, the Scratch Foundation, MIT, TurboWarp or PenguinMod.
