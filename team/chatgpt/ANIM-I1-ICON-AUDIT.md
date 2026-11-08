# ANIM-I1 — Costumes / Flipbook / Animation icon audit

- Date: 2026-11-08 UTC
- Result: **SOURCE-VERIFIED** against the ai-team snapshot below; UI names checked in the side preview.
- No app source was changed. This report recommends consistency fixes for Claude/owner review.

## Scope

The side preview showed **G-Warp Beta v15.60.0**. I reviewed the Costumes and Animation accessibility trees and opened the Flipbook controls, then inspected the corresponding v15.60.0 source snapshot at commit `5cbb4b94bae809cc45cad7546df69d2380ee9531`. The snapshot declares `GW_BUILD.version = 15.60.0`, matching the preview’s version label. This is not a test of the desktop build.

Source links: [costume controls and list](https://github.com/Creapter1/gwarp/blob/5cbb4b94bae809cc45cad7546df69d2380ee9531/app.html#L9122), [paint-editor SVG set and controls](https://github.com/Creapter1/gwarp/blob/5cbb4b94bae809cc45cad7546df69d2380ee9531/app.html#L19950), [Animation controls](https://github.com/Creapter1/gwarp/blob/5cbb4b94bae809cc45cad7546df69d2380ee9531/app.html#L17081), [Flipbook controls](https://github.com/Creapter1/gwarp/blob/5cbb4b94bae809cc45cad7546df69d2380ee9531/app.html#L23119), [merged animation icon pack](https://github.com/Creapter1/gwarp/blob/5cbb4b94bae809cc45cad7546df69d2380ee9531/app.html#L24322), and [Song Maker controls](https://github.com/Creapter1/gwarp/blob/5cbb4b94bae809cc45cad7546df69d2380ee9531/app.html#L10317).

## Same action, different icon

| Action | Current mapping | Recommendation |
|---|---|---|
| Undo / Redo | Code, Animation, sound editing, and Song Maker use Font Awesome `fa-rotate-left/right`. Costume painting uses the G-Warp `GW_PAINT_ICONS.undo/redo` SVGs. The local Centre/Line up undo is the text glyph `↶`. | **Make them match:** standardize shared Undo/Redo on `fa-rotate-left/right`, already used by most editors, or choose the paint SVGs across every editor. Lowest-change pick: use the existing Font Awesome pair everywhere. Keep the Centre/Line up undo label clear because it only reverses those two actions. |
| Play / Stop | Costume FAB, Flipbook, and Song Maker use `fa-play` and switch to `fa-stop` while playing. Animation uses Gemini’s custom `flipbook-play` SVG. | **Make them match:** use one play icon for every preview player and one shared stop-state icon while active. Lowest-change pick: `fa-play/fa-stop`, already used by Flipbook and Song Maker. Source inspection suggests Animation may retain its custom play symbol when its text changes to “Stop”; confirm the live playing state before changing it. |
| Delete | Costume list uses outlined `fa-regular fa-trash-can`; Costume paint uses a custom `GW_PAINT_ICONS.delete`; Animation frame/bone controls use solid `fa-solid fa-trash`; Delete animation is text only. The sprite card uses an X. | **Make them match:** use the same trash-can icon for deleting costumes, frames, bones, and animations. Lowest-change pick: one solid `fa-trash-can`. Keep Close/X separate from Delete. |
| Onion skin | Costume paint has its own inline `ONION_ICON`. Animation and costume-list targets use Gemini’s `onion` SVG. These are separate drawings. | **Make them match:** use Gemini’s existing `onion` SVG in Costume paint too. It already appears in the Animation panel and the costume-list icon hook. |
| Flip / Mirror | Costume paint has separate `GW_PAINT_ICONS.flipH/flipV` controls. Animation’s `↔ Mirror` is text and swaps left/right pose values. | **Keep the controls distinct:** paint Flip reflects selected artwork; Animation Mirror swaps pose sides. The actions differ. |
| Frame navigation | Flipbook previous/next use `fa-backward-step/forward-step`; Animation’s move-left/move-right controls use `fa-chevron-left/right`. | **No match needed:** one pair changes the preview frame; the other changes frame order. |

## Surface inventory

**Costumes**

- Costume list: folder/open-folder `fa-folder/fa-folder-open`; duplicate `fa-regular fa-copy`; delete `fa-regular fa-trash-can`.
- Add/play fan: `fa-paintbrush`, `fa-upload`, `fa-play`; Graffy has a custom G-Spark-style SVG with `fa-bolt`.
- Paint tool set: G-Warp’s `GW_PAINT_ICONS` SVGs — Select, Reshape, Brush, Eraser, Fill, Text, Line, Circle, Rectangle.
- Paint actions: custom SVG Undo, Redo, Group, Ungroup, Forward, Backward, Front, Back, Copy, Paste, Delete, Flip Horizontal, Flip Vertical, zoom in/out/reset, eyedropper, no-colour, bitmap/vector conversion.
- Paint grid/snap: `fa-border-all` and `fa-magnet`. Centre and Line up use `⊕` and `⇅`; the local undo uses `↶`. The paint onion icon is its own inline SVG.
- The Gemini icon script also targets “Play” and “Onion” buttons inside the costume list. Those targets were not separately present in the live accessibility tree used for this pass.

**Flipbook**

- Header `fa-bolt`; Close `fa-xmark`; Previous `fa-backward-step`; Play/Stop `fa-play/fa-stop`; Next `fa-forward-step`. FPS and Loop are text controls without icons.
- Live preview accessibility labels identified the same Previous, Play or stop, and Next actions.

**Animation**

- Header `fa-bone`; Undo/Redo `fa-rotate-left/right`; New, Rename, Delete, Rig, Animate, FPS, Loop, and Delete animation are text controls.
- Rig tools: `fa-bone`, `fa-paperclip`, `fa-arrow-pointer`, `fa-wand-magic-sparkles`, `fa-trash`.
- Frame tools: `fa-plus`, `fa-chevron-left/right`, `fa-trash`.
- The merged Gemini SVG pack is applied to the Animation tab, In-between, Smooth ×2, Play, Make costumes, and Onion skin: `bones`, `in-between`, `smooth-x2`, `flipbook-play`, `make-costumes`, `onion`.
- Copy pose, Paste pose, and Mirror use `📋`, `📌`, and `↔` text glyphs. Bone reorder uses `▲/▼`; floor uses `⇕`.

**Related editor comparison**

- Song Maker Play/Stop uses `fa-play/fa-stop`; Song Maker Undo uses `fa-rotate-left`. Sound-edit Undo uses `fa-rotate-left`; sound Delete uses `fa-regular fa-trash-can`.

## Suggested handoff

1. Standardize Undo/Redo, Play/Stop, Delete, and Onion skin using the recommendations above.
2. Preserve the different paint Flip and Animation Mirror meanings.
3. Before Claude changes anything, inspect Animation while it is playing to confirm whether the custom play glyph remains beside the “Stop” label.

The accompanying `preview.html` shows an offline visual comparison in dark and light themes. Its drawings are source-family sketches; the icon identifiers in this report are the source-of-truth labels.
