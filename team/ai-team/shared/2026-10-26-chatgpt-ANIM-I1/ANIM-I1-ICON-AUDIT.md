# ANIM-I1 — Icon consistency audit

**Scope:** Costumes, Flipbook, Animation tab, with cross-checks against Code and Sounds / Song Maker.  
**Baseline:** `main`, app.html blob `7ef2e8d17081354e66fc6138ae9cc8a639b839d9` (Beta v15.54.0 recorded in TODO / AI-TEAM).  
**Evidence:** SOURCE-VERIFIED only. This is a static source audit, not a browser test.

## Findings

| Action | Code / shared UI | Costumes | Flipbook | Animation | Sounds / Song Maker | Finding / recommendation |
|---|---|---|---|---|---|---|
| Undo | `#undoBtn`: Font Awesome `fa-rotate-left` | `#gwCosUndo`: same class | — | `#gw18Undo`: same class | No equivalent global undo control identified in the Song Maker header | **MATCH** across the three available controls. Keep this icon. |
| Redo | `#redoBtn`: `fa-rotate-right` | `#gwCosRedo`: same class | — | `#gw18Redo`: same class | No equivalent global redo control identified in the Song Maker header | **MATCH** across the three available controls. Keep this icon. |
| Play | — (top-level Start/Stop are separate runtime actions) | `#gwCosPlayBtn`: `fa-play` | Player `#gwFlipGo`: `fa-play` / `fa-stop` | `#gw18Play`: replaced with custom `flipbook-play` SVG | `#gwMusicPlay`: `fa-play` | **MISMATCH.** Animation uses a filmstrip/play symbol while the other Play controls use the plain play triangle. Recommend the plain play icon for a generic Play action; reserve the filmstrip/play symbol for a clearly named “Flipbook” feature only if the owner wants a feature-specific icon. |
| Stop | — (global Stop is a separate top-bar action) | — | `#gwFlipGo`: `fa-stop` while playing | `#gw18Play` changes its text to “■ Stop” but retains the Play icon treatment | `#gwMusicStop`: `fa-stop` | **MISMATCH / clarity issue.** Flipbook and Song Maker use the stop-square icon; Animation switches text only. Recommend stop-square when the Animation preview is playing, without changing its toggle behavior. |
| Onion skin | — | Paint editor `#gwpeOnion`: its own inline `ONION_ICON` (overlapping costume sheets) | Costume list Onion button is changed to registry `onion` SVG | `#gw18OnionOn` label is changed to registry `onion` SVG | — | **MISMATCH.** Paint editor uses a separate, older overlapping-sheet drawing; Flipbook/Animation use the Gemini registry icon. Recommend one shared registry `onion` icon for all three. |
| Delete | Code workspace uses a trash/drop zone; not a direct equivalent to deleting an animation | Costume row delete: `fa-trash-can` | — | Animation “Delete” button is text-only | Sound editor `#gwSndDelete`: `fa-trash-can` | **MISMATCH.** The same destructive action is icon+label in Costumes/Sounds but text-only in Animation. Recommend the existing trash-can icon + “Delete” label, preserving confirmation. |
| Flip horizontal / vertical | — | Paint editor has its own toolbar icon generator; the Gemini registry contains `flip-horizontal` / `flip-vertical` keys | — | — | — | **NOT FULLY VERIFIED.** The registry defines both keys, but the v15.50.3 registry apply routine does not call `put()` for either key. The paint toolbar is explicitly left alone. Do not assume these keys are active in the UI. |
| Animation tab | — | `#gwCosTab-animation` gets the custom `bones` SVG | — | — | — | **Distinct feature icon, no duplicate action found.** Keep the bones icon for the Animation tab. |

## Verified source details

- Costume editor undo/redo buttons are created with `fa-rotate-left` and `fa-rotate-right` at `#gwCosUndo` / `#gwCosRedo`.
- Animation editor undo/redo buttons use the same two Font Awesome classes at `#gw18Undo` / `#gw18Redo`.
- The shared Code menu buttons `#undoBtn` / `#redoBtn` use those same classes.
- Flipbook inserts `#gwCosPlayBtn` with `fa-play`; its player toggles `#gwFlipGo` between `fa-play` and `fa-stop`.
- Animation's `#gw18Play` is explicitly assigned the custom `flipbook-play` SVG by the v15.50.3 Gemini icon registry.
- The same registry assigns `onion` to the Animation onion label and the Costume-list Onion button. The paint editor's separate `#gwpeOnion` button is created earlier with its own `ONION_ICON`.
- The registry also defines `flip-horizontal` and `flip-vertical`, but its `apply()` function does not assign either one. Its source comment says the paint editor's own toolbar icons stay.

## Recommended normalization (no changes made)

1. Keep undo = `fa-rotate-left` and redo = `fa-rotate-right` everywhere.
2. Use the same plain play / stop icon states for generic Play controls in Flipbook, Animation preview and Song Maker. Keep the custom filmstrip icon only for a specifically named Flipbook feature, not as the generic Play action.
3. Reuse the registry `onion` SVG for the paint editor, Flipbook and Animation onion-skin controls.
4. Add the existing trash-can icon to Animation's Delete button; retain its existing confirmation prompt.
5. Leave flip icons unchanged until the exact active paint-editor mappings are confirmed in the real browser.

## Not in scope / not tested

- No app.html or index.html edits.
- No icon was replaced or connected.
- No browser screenshots or interactive runtime checks were performed.
- The wider whole-app icon pass (Code, Costumes, Sounds, Animation, Song Maker, menus) remains a separate follow-on task after ANIM-I1.
