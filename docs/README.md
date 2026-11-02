# G-Warp documentation map

This directory contains the public guides for the G-Warp application. The website index is [docs/index.html](./index.html). Use this file as the text map when browsing the repository or assigning a documentation task.

## 1. Start learning
- [Start here](./start.html) — open a project, choose a sprite, connect a first script, run it and save a copy.
- [Friendly learning guide](./LEARNING-GUIDE.md) — the basic ideas behind sprites, blocks, events, variables, the Stage and projects.
- [Step-by-step tutorials](./tutorials/index.html) — eight small projects, from G-Spark's walk cycle to a Pen drawing app.
- [Glossary](./glossary.html) — common terms.
- [Parents and teachers](./parents.html) — learning and supervision guidance.

## 2. Create and code
- [Block reference](./blocks.html) — categories, shapes, common block labels and small examples.
- [Complete user guide](./USER-GUIDE.txt) — practical editor, media, file, tool and troubleshooting reference.
- [Keyboard shortcuts](./shortcuts.html) — available keyboard actions.

## 3. Art, animation and music
- [Costumes and drawing](./costumes.html) — vector/bitmap artwork and editing tools.
- [Animation](./animation.html) — flipbook, onion skin, rigs, poses, in-betweening and animation blocks.
- [Sounds and Song Maker](./sounds.html) — sound assets, instruments, melody creation and music tools.

## 4. Game systems and project compatibility
- [Extensions](./extensions.html) — extension discovery and use.
- [From Scratch](./scratch.html) — project compatibility and differences.
- [Troubleshooting](./troubleshoot.html) — common problems and how to report them.
- The engineering guide describes Tilemap, Behavior Designer, file import/export and other G-Warp-specific implementation layers.

## 5. AI and safe use
- [AI assistant guide](./ai.html) — GWrap AI, knowledge packs, online-service cautions, model names and the local-model plan.
- [Safety and privacy](./safety.html) — safer project and service use.
- [Credits](./credits.html) — independence and third-party licence information.

## 6. Technical and release references
- [Engineering reference](./ENGINEERING-REFERENCE.md) — how the actual G-Warp source is structured, including Engine, ScriptThread, drawing, costumes, sound, tilemap, behaviors, extensions and project files.
- [Screenshot and UI guide](./SCREENSHOT-UI-DOCUMENTATION.md) — control locations and historical visual references. Check the capture date/version; old screenshots are not proof of the latest layout.
- [Live UI verification](./LIVE-UI-VERIFICATION.txt) — a dated Chromium test report. It is evidence for that recorded build only, not a promise that every current interaction passes.
- [Changelog](./changelog.html) — release notes.
- [AI team overview](./team.html) — public description of team roles.

## Repository boundaries

- `main` is the public app, website and public documentation branch.
- `ai-team` is the separate internal development workspace for team instructions, task queues, contributor logs, research, reviews, test work and private screenshot requests.
- The public README links to the AI-team branch. Keep internal logs, handoffs and screenshots waiting to be captured out of the public documentation.
- The AI-team instructions and single task list live on the [ai-team branch](https://github.com/Creapter1/gwarp/tree/ai-team).

## Evidence and maintenance rules

1. Describe what the checked-in app and current documentation support. Do not turn a plan, mock-up or source symbol into a claim that the feature is released.
2. Mark evidence clearly: SOURCE-VERIFIED, LIVE-TESTED or NOT-TESTED. Include the app commit/version and environment for live tests.
3. When a page is changed, check its links, sidebar, mobile layout and wording against the current UI.
4. Do not put credentials, user project contents, private data or large model files in GitHub.
5. When a page needs a real screenshot, create an internal screenshot request with a unique sticky ID, exact screen/state, capture size, arrows/callouts, privacy rules and target document. Do not fabricate screenshots.

G-Warp is an independent beta project. Scratch-style behavior and file compatibility must be verified feature by feature.
