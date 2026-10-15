# ⚡ G-Warp

G-Warp (G Wrapper) is a free, Scratch-style visual programming and game-making project with its own dark, electric interface, the G-Spark mascot and a built-in Song maker. It aims for compatibility with standard Scratch behavior and common Scratch/TurboWarp/PenguinMod project workflows. Exact block behavior, extension support and file-format coverage should be checked against the published evidence and compatibility tests; G-Warp uses its own engine rather than Scratch VM.

**Status:** Beta (the only beta for now). Some things may break. If you find a bug, that's how G-Warp gets better.

- **Previously documented website:** https://creapter1.github.io/gwarp/
- **Previously documented app (Beta):** https://creapter1.github.io/gwarp/app.html
- **Canonical website URL:** pending owner confirmation after the reported website change. Do not assume the previous links are current until confirmed.
- **Tester account on Scratch:** https://scratch.mit.edu/users/creapter_teter/

---

## Try it
1. Open the website and click **⚡ Create your first code** to start a new project, or **📂 Use your project** to open a `.sb3` (Scratch / TurboWarp), `.pmp` (PenguinMod) or G-Warp file.
2. Drag blocks from the palette into the code area and snap them together.
3. Press **Start** in the top bar. **Pause** and **Stop** are next to it.
4. Save with **More → Save to your computer**. Projects using only standard Scratch features are the best candidates for Scratch interoperability; reopen the export in a fresh session and check it in Scratch. G-Warp-specific extensions or unsupported file features are not guaranteed to work elsewhere.

Works best on a computer (Chrome, Edge, Firefox). Phones aren't supported yet.

## What's inside
| Area | What it does |
|---|---|
| **Code** | Scratch-style block workspace, electric C-blocks with a live "wire", right-click search, duplicate, comments, clean up |
| **Costumes** | Vector + bitmap paint editor, G-Warp's own sprite library (rockets, coins, gems… no cats) |
| **Sounds** | Sound editor, instruments, loop maker and the **Song maker** (genre, mood, theme → a whole song) |
| **Stage** | 480×360 stage, backdrop library (Space, Night City, Underwater…), select the Stage like in Scratch |
| **Extensions** | A changing catalog of G-Warp, TurboWarp and PenguinMod extensions with ✓ Safe / ● Moderate / ⚠ Dangerous labels; verify exact counts and behavior in the live app |
| **Bug Hunter** | Break G-Warp and you earn an achievement |
| **Look like Scratch** | Optional, in More → Settings. The electric look stays the default. |
| **GWrap AI** | In the works: a helper inside the editor (only helps with G-Warp, nothing else) |

## Documentation (start here)

- **[G-Warp implementation map](docs/ENGINEERING-REFERENCE.md)** — the real app architecture, runtime, block workspace, Stage renderer, costume editor, sound/music tools, Tilemap, Behaviors, extensions and project files; includes the Scratch implementation comparison.
- **[Documentation index](docs/README.md)** — the short guide to the app, controls, screenshots and verification.
- **[User guide](chatgpt/USER-GUIDE.txt)** — how to use the tools already in the app.
- **[Screenshots and UI guide](chatgpt/SCREENSHOT-UI-DOCUMENTATION.md)** — where controls live and how the visible interface behaves.
- **[Engine map](ENGINE-MAP.txt)** — actual G-Warp globals and hooks to check before changing code.
- **[Live UI verification](docs/LIVE-UI-VERIFICATION.txt)** and [real screenshots](docs/screens/) — what has actually been tested.
- **[Master AI work plan](team/AI-WORK-PLAN.txt)** and [deliverable inventory](team/AI-DELIVERABLE-INVENTORY.txt) — roles, task stages, candidate status and evidence gaps.
- **[Cross-AI review report](team/CROSS-AI-REVIEW-2026-10-15.txt)**, [security and consistency audit](team/SECURITY-AND-CONSISTENCY-AUDIT-2026-10-15.txt), and [continuous work queue](team/CONTINUOUS-WORK-QUEUE.txt) — independent findings, blockers, security checks, and next tasks.
- **[ChatGPT reviewer task list](team/TODO-CHATGPT.txt)** — review scope and acceptance-report format.

## Files in this repo
| File / folder | What it is |
|---|---|
| `index.html` | The website |
| `app.html` | The G-Warp Beta app (one single file, ~2.3 MB). Any AI may add an explicitly assigned, uniquely marked inert proposal only; Claude Opus 5.5 alone may connect/integrate live behavior after model verification and owner authorization. |
| `AI-TEAM.txt` | The AI team: who does what, team rules, the "continue" word, the work log |
| `TODO.txt` | The main to-do list (URGENT / NOW / LATER / DONE) |
| `team/` | Master AI plan, per-contributor task lists, independent review report, continuous work queue and handoff notes; public, not private |
| `ENGINE-MAP.txt` | The REAL names inside G-Warp's engine. Read before writing code. |
| `MERGE-QUEUE.txt` | Everything handed in and its status (pick / reference / superseded / waiting) |
| `STYLE-GUIDE.txt` | G-Warp's look, words and what's not allowed (brands, characters…) |
| `chatgpt/`, `grok/`, `deepseek/`, `gemini/` | Each AI's own work. Nothing in here runs on the website until it's merged. |

## How it's built (the team)
- **Owner (Creapter1):** decides everything, tests every update with screenshots.
- **ChatGPT:** independent reviewer of every AI's work, planning, test design and evidence reconciliation. **Grok:** Scratch behavior specs/tests and extension audit. **DeepSeek:** isolated code candidates, technical harnesses and lab reports. **Gemini:** original G-Warp visual assets. **Claude Opus 5.5:** integration lead and official runtime/visual evidence owner after active-model verification.
- **All AIs:** may research, test and prepare code proposals; any proposal placed in `app.html` must remain inert and disconnected. **Claude Opus 5.5:** sole AI authorized to connect/integrate proposals and conduct official side-by-side visual/runtime review and screenshots, subject to active-model verification and owner approval.
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
