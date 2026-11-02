# ⚡ G-Warp – AI TEAM branch

> **This is the `ai-team` branch:** the work area for the AI team (to-do list, rules, notes, tests, art, bug reports – all in `team/`). The public app and website live on **[main](https://github.com/Creapter1/gwarp)**. Nothing here goes live until the owner merges it into main.
>
> ⛔ **RULE ZERO (absolute, non-negotiable): AIs work ONLY on this `ai-team` branch. Never commit, push, merge or open a pull request to `main` or anywhere else. Only the owner (Creapter1) moves work to `main`.**

G-Warp (short for **G Wrapper**) is a free, fan-made block-coding and game-making app. Connect blocks to make games, animations and interactive stories, draw costumes, and create music – with G-Warp's own dark electric look and the G-Spark mascot.

It follows a Scratch-style block workflow and supports Scratch-oriented project import/export paths, but it is an independent implementation. Exact block behavior and file compatibility vary by feature and must be tested; do not assume every G-Warp-only feature round-trips to Scratch, TurboWarp or PenguinMod. It is in **beta**: keep a backup of important projects.

## Start here

| | |
|---|---|
| 🚀 **[Open the app](app.html)** | the G-Warp editor |
| 🌐 **[Website](index.html)** | the G-Warp homepage |
| 🧠 **[Developer Reference](docs/DEVELOPER-REFERENCE.md)** | the technical guide for developers: architecture, source navigation, evidence and upstream links |
| 📖 **[Documentation](docs/index.html)** | guides, [tutorials](docs/tutorials/index.html), [glossary](docs/glossary.html), [parents & teachers](docs/parents.html) |
| 🛠️ **[Build your own editor](docs/BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md)** | a step-by-step architecture guide for creating a Scratch-style block editor |
| 🧩 **[Scratch / TurboWarp / PenguinMod architecture](docs/UPSTREAM-ARCHITECTURE-REFERENCE.md)** | how the upstream projects' editor, block, VM, renderer and project-format systems fit together |
| 📜 **[Licence (MIT)](LICENSE)** | free to use; see [credits](docs/credits.html) for third-party parts |

**Quick start:** open the app → pick a sprite → click a block category if the palette/workspace is hidden → drag compatible blocks into a script → press **Start**. Save often.

## What is in this repository

| Folder / file | What it is |
|---|---|
| `app.html` | the app (the whole editor in one file) |
| `index.html`, `stats.html`, `sitemap.xml`, `gw-stats.js` | the website (they must stay here for the site to work) |
| `docs/` | user guides, developer reference, source map, architecture tutorial and feature guides |
| `site/` | extra website files |
| `desktop/` | the Windows desktop version (exe build files) |
| `research/` | game-design reference notes and the [research index](research/RESEARCH-INDEX.md); the checked-in app does not automatically load these Markdown files into G-Spark |
| `team/` | everything for the AI team: the **[one to-do list](team/AI-TEAM-TODO.md)**, [rules](team/ai-team/README.md), [status](team/ai-team/AI-STATUS.txt), and each AI's folder (`team/chatgpt`, `team/claude`) |

## Beta notes

No account is needed. Online project loading, extensions and services you set up yourself may use the internet – read extension warnings and don't type private information. Children under 13 should ask a parent or guardian before sending anything online.

## AI team

Creapter1 owns every decision and approves every release. The team is **Claude** (builds into the app) and **ChatGPT** (research, reviews, tests, icons and art), with Claude Haiku as a helper. Gemini, Grok and DeepSeek are retired; their work is in `team/ai-team/archive/`. Before contributing, read the [rules](team/ai-team/README.md) and the [to-do list](team/AI-TEAM-TODO.md). "Continue" means: reread the to-do and status files and resume the next job.

## Licence and independence

The code in this repository is released under the **[MIT License](LICENSE)**. Third-party extensions may have their own creators and licences – check each one before redistributing. G-Warp is an independent fan project and is **not** made by or connected to Scratch, the Scratch Foundation, MIT, TurboWarp or PenguinMod.
