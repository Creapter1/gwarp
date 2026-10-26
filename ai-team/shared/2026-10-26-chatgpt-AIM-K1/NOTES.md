# AIM-K1 delivery notes

- Job: AIM-K1 — Basic Knowledge for G-Warp AI
- By: ChatGPT (GPT-6)
- Date (UTC): 2026-10-26T19:27:29.398Z
- Lane: `chatgpt/lanes/L2-AILAB/`
- Drop box: `ai-team/shared/2026-10-26-chatgpt-AIM-K1/`

## Contents

- `pack.json`: 120 kid-friendly usage tips; 0 new executable recipes.
- `AI-RULES-SHORT.txt`: 288-word AI rules section plus 20 must-refuse examples with friendly answers.
- `GAPS.md`: recipe-coverage gaps by block category and kid wishes that do not yet have a recipe.

## Evidence

**SOURCE-VERIFIED** against the current `app.html` blob:
- App file: `app.html`
- Current version label: Beta v15.54.0
- Blob SHA: `7ef2e8d17081354e66fc6138ae9cc8a639b839d9`

The tips were checked against the source, not run in a browser. **NOT TESTED in G-Warp**: no QA-kit browser session was available in this GitHub-only workflow. The simple Costumes paint panel is documented only for Brush, Eraser, colour picker, size slider, Clear, canvas and costume sidebar; this pack does not claim that this panel has Fill or Text tools. Sound Studio FX names are sourced from its current button list.

## Source map

| Tip area | Current source evidence |
|---|---|
| Project title; Start, Pause, Stop | `app.html` lines 2290–2295 |
| Main Code / Costumes / Sounds tabs | `app.html` lines 2341–2344 |
| Motion, Looks, Sound, Events, Control, Sensing, Operators, Stage, Lists, My Blocks, Variables palettes | `app.html` lines 2440–2603 |
| Project title field | `app.html` line 2290 |
| Stage backdrop blocks | `app.html` lines 2560–2567 |
| Block right-click actions | `app.html` lines 2780–2783 |
| Workspace block snapping and insertion | `app.html` lines 3604–3625; snap preview element at line 2608 |
| Sprite name / X / Y / size fields | `app.html` lines 2749–2761; name input binding at line 4620 |
| Duplicate / delete / restore sprite | `app.html` lines 20551–20599 |
| Add Sprite menu: Upload, Surprise, Paint, Plain | `app.html` lines 21194–21244 |
| G-Warp sprite library | `app.html` lines 21555–21562 |
| Simple paint panel and its tools | `app.html` lines 2610–2624 and 3818–3872 |
| Sound upload and record controls | `app.html` lines 8512–8519 |
| Sound editor Play / Stop / FX / Undo / Duplicate / Download / Delete | `app.html` lines 8495–8500 and 8618–8643 |
| Song maker style / tune / key / speed / length / volume / Generate / Play / Stop | `app.html` lines 9920–9935 |
| Create Melody controls and starter ideas | `app.html` lines 23879–23942 |
| Animation rig / frame / onion-skin / play / make-costumes details | `app.html` lines 16166–16176 and 16550–16555 |
| Animation blocks | `app.html` line 15944 and surrounding animation-block implementation |
| File menu: load computer/web, save, save as, restore | `app.html` lines 15428–15437 and 15467–15478 |
| Extension library entry | `app.html` lines 18812–18815 |
| Extension safety labels / dangerous confirmation | `app.html` lines 1954–1973 and 17952–18016 |
| Calm motion setting | `app.html` lines 23795–23843 |
| 300 default clone limit | `app.html` lines 4185, 13905–13910 and 18850 |

## Recipe coverage comparison

Read before creating the gaps list:
- Existing starter file: `claude/gwrap-pack.json` — 8 recipes.
- Checked phone recipe sets: 60 + 16 + 55 = 131 recipes.
- Combined comparison set: 139 existing recipes.
- Block catalog: `ai-team/gwrap-blocks.json` — 176 registered block types.

Coverage was calculated by walking each existing recipe script and comparing used block types with the block catalog. `GAPS.md` lists block types that do not occur in any of those 139 recipes. A missing recipe does not mean the block is absent from G-Warp; it means this recipe set does not yet teach it.

## Pack validation

- Validator source reviewed: `ai-team/tools/validate_gwrap_pack.py`.
- Validator-equivalent check of the fetched pack, including IDs against existing recipe packs: **PASS — 0 errors, 0 warnings** (0 recipes, 120 tips).
- **Exact Python CLI not run**: this connected session exposed GitHub repository operations but no shell/Python command runner. The required command still needs to be run from a local checkout:
  `python3 ai-team/tools/validate_gwrap_pack.py ai-team/shared/2026-10-26-chatgpt-AIM-K1/pack.json ai-team/gwrap-blocks.json`

## Limits and next

- No app files were edited. No integration or runtime behavior was changed.
- AIM-0 model research remains next, after AIM-K1, as assigned.
- Before the pack is treated as fully validated, run the exact Python command above in a checkout and record its terminal output in the lane log.
