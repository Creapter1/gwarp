# ANIM-G1 — Rulers, guide lines and guide snapping

**Status:** WEB-phase candidate prepared. **NOT integrated, not browser-tested, terminal acceptance still open.**  
**Owner:** Creapter1  
**Author:** ChatGPT GPT-6  
**Source inspected:** `app.html` on the repository's current main branch at the time of review. Always refetch the current `app.html` before integration; the source may have moved.

## Deliverable

- Candidate module: [`chatgpt/anim-guides.js`](https://github.com/Creapter1/gwarp/blob/main/chatgpt/anim-guides.js)
- This is a standalone proposal. It is not included from `app.html`, has no live execution path, and does not alter existing G-Warp behavior.
- It creates guide overlays as sibling DOM/SVG layers. Guide markup is never appended to the costume SVG or baked into exported art.

## Verified existing source hooks

| Area | Verified source symbol / DOM | Role |
|---|---|---|
| Engine active sprite | `window.Engine.sprites[window.Engine.activeSpriteIndex]` | Per-sprite guide metadata owner |
| Paint editor wrapper | `#gwCostumeCanvasWrapV15` | Positioned parent for paint overlay |
| Paint SVG / bitmap | `#gwVectorCanvasV15`, `#gwBitmapCanvasV15` | Existing 512×384 drawing surface |
| Costume coordinate mapper | `window.GW_VECTOR_EDITOR.mapFor(costume)` | Returns `{w,h,k,ox,oy}` |
| Costume rotation centre | `costume.rc = {x,y}` | The guide origin is the costume rotation centre |
| Existing Snap master | `window.GW_V153_VECTOR.snap`, button `#gwV153SnapBtn` (“Snap 8px”) | Existing Paint Snap toggle |
| Current Select-tool move | `window.GW_TRANSFORM`, private `deltaFor(kind,p0,p,b,e)` | Correct Paint move integration seam |
| Animation editor | `window.GW_ANIM.state`, `state.s`, `state.anim`, `state.view` | Active animation/sprite/SVG view |
| Animation frame source | `window.GW_ANIM.frameSvg(anim,index)` | Returns serialized SVG for a pose frame |
| Animation drag | Private `move(e)`, currently starts `const p = toSvg(e)` | Correct bone-end/root/new-bone integration seam |
| Animation view | `#gw18View` containing `#gw18Svg` | Positioned animation overlay parent and matching SVG viewBox |
| Flipbook | `window.GW_FLIPBOOK.state`, `#gwFlipbook`, `#gwFlipCanvas` | Player state and canvas for aligned guides |
| Flipbook geometry | `P.box={x0,y0,w,h}`, canvas 440×330 | Same bounds/scale/offset formula used by `drawFrame()` |
| Project writer | `projectData()`, then `window.GW_PROJECT_DATA = projectData` | Explicit place to save sprite guide data |
| Project reader | `GW.loadProject` wrapper iterating `Engine.sprites` and `data.sprites` | Explicit place to restore sprite guide data |

The existing `#snapPreviewLine` is the block-workspace stack snap preview, not the costume/Animation guide system. Do not connect this feature to it.

## Behaviour/data model

Guide metadata is owned by each sprite in `sprite.gwAnimGuides`:

```js
{
  version: 1,
  locked: false,
  snapToGuides: false,
  builtins: { centre: true, ground: true, head: true, stage: true },
  ground: { value: null, auto: true },
  head: { value: null, auto: true },
  lines: [{ id: "g…", axis: "x" /* or "y" */, value: 40 }],
  measureKey: ""
}
```

Coordinates are stage pixels relative to the sprite's rotation centre: x=0/y=0 is the rotation-centre cross; the stage is ±240 horizontally and ±180 vertically (480×360). User guides are stored in those same units, so Paint, Animation and Flipbook can render the same guide at the same relative location despite different canvas scales.

The proposal displays violet dashed user guides, green built-in guides and a yellow stage boundary. Rulers appear only on Paint and Animation. Flipbook receives the same visual guides aligned to its canvas; no rulers are drawn in the compact player.

The built-in ground/head defaults are measured from frame 1 (active animation frame 0 when the Animation editor is open for that sprite; otherwise the active costume) with an SVG geometry bounding-box or a downscaled bitmap-alpha scan. Auto values are cached. Claude should call `GW_ANIM_GUIDES.invalidateMeasurements(sprite)` after edits to the source frame/costume so the next measurement refreshes; do not scan every frame or every pointer move.

## Exact integration seams — instructions for Claude, not changes made here

### 1. Save and load guide data

In `projectData()`, add this property to each serialized sprite object beside `gwAnimations` / `gwTileSprite`:

```js
gwAnimGuides: s.gwAnimGuides
  ? JSON.parse(JSON.stringify(s.gwAnimGuides))
  : undefined,
```

In the existing `GW.loadProject` wrapper, inside the loop where the matching saved sprite is read as `src` and restored to `s`, add:

```js
s.gwAnimGuides = src.gwAnimGuides
  ? JSON.parse(JSON.stringify(src.gwAnimGuides))
  : undefined;
```

Do not assume arbitrary fields on the in-memory sprite are persisted automatically. A real save → close/reload → load → compare guide positions round-trip is required.

### 2. Paint Select-tool move snapping

In the current `GW_TRANSFORM.deltaFor(kind,p0,p,b,e)` move branch, retain the existing Shift-axis constraint and existing 8px grid snap. After the existing 8px snap calculation and before `new DOMMatrix().translate(dx,dy)`, add:

```js
const sprite = window.Engine?.sprites?.[window.Engine?.activeSpriteIndex];
const guides = window.GW_ANIM_GUIDES;
if (guides?.snapEnabled?.(sprite)) {
  const anchor = { x: b.x0 + dx, y: b.y0 + dy };
  const snapped = guides.snapPaintPoint(anchor, sprite, 6);
  dx += snapped.x - anchor.x;
  dy += snapped.y - anchor.y;
}
```

This uses the selected art bounds' top-left as the guide anchor. Confirm with the owner whether the desired anchor should instead be the costume rotation centre or nearest edge/handle for multi-select. The helper converts the 512×384 board point through the current costume mapper and rotation centre.

### 3. Animation bone/root/new-bone snapping

In the existing private Animation `move(e)` function, immediately after `const p = toSvg(e);`, use:

```js
const raw = toSvg(e);
const p = window.GW_ANIM_GUIDES?.snapAnimationPoint?.(
  raw, st.s, st.view, 6
) || raw;
```

Continue to use `p` in the existing new-bone ghost, bone-end rotation and root drag paths. The existing `st.view` is the SVG view and `GW_ANIM_GUIDES.snapAnimationPoint` uses `st.anim.rc` to convert into rotation-centre-relative stage pixels. This private handler must be edited only by Claude during authorized integration; do not add a competing global pointer listener.

### 4. Snap UI semantics

The feature panel contains a **Snap to guides** checkbox. It is an additional per-sprite permission, not a replacement for the existing Snap toggle. Guide snapping activates only when both are enabled:
- existing Paint **Snap 8px** master: `GW_V153_VECTOR.snap`
- per-sprite **Snap to guides** checkbox: `sprite.gwAnimGuides.snapToGuides`

Verify that users understand this shared-master behaviour. The master Snap currently lives in the Paint tool row; if product UX needs a visible master switch in Animation too, propose it separately rather than duplicating the master state.

## Overlay geometry

- Paint: sibling layer under `#gwCostumeCanvasWrapV15`, aligned to whichever Paint surface is visible. `GW_VECTOR_EDITOR.mapFor(c)` supplies scale and offset; rotation centre is applied to the guide origin.
- Animation: sibling layer under `#gw18View`, matching `#gw18Svg`'s viewBox and `preserveAspectRatio`; `state.view` is the actual view SVG.
- Flipbook: sibling layer inside `#gwFlipbook`, aligned to `#gwFlipCanvas`. It copies the exact `k`, `ox`, and `oy` geometry used by the existing Flipbook `drawFrame()`, so guides stay aligned to the rotation-centred frame.
- Rulers are SVG overlay graphics at the top and left edges of Paint/Animation. The current proposal places the ruler strips in the first 18 viewBox units of the overlay; visually check that this inset does not obscure important drawing pixels and adjust the external margin/overlay geometry if required.

## Safety and performance guardrails

- Do not append guides to the artwork SVG, do not change costume data URLs, and do not include guide lines in GIF/sprite-sheet exports.
- Do not monkey-patch the editor's pointer handlers from a second script. Claude should patch the existing two specific move branches above.
- The prototype uses a 500ms state/layout refresh plus a scoped MutationObserver to notice when the editors/player appear or resize. It avoids rebuilding an unchanged overlay and caches frame-one measurements; bitmap alpha scan is limited to a downscaled 1024px maximum dimension. This is a prototype strategy only, not a performance claim.
- The candidate exposes `dispose()` and `invalidateMeasurements(sprite)`.
- No app source, live editor, project serializer, or runtime was changed by ChatGPT.

## Required TERMINAL / browser acceptance tests — not run here

1. Enable the feature in an isolated build. Confirm no console errors and no guide SVG nodes inside `#gwVectorCanvasV15` / costume artwork.
2. Verify built-in centre, ground, head and 480×360 stage boundary with a known frame-one sprite; confirm automatic ground aligns with the lowest visible point and head with top geometry. Verify manual ground/head settings persist.
3. Create/move/delete custom horizontal and vertical guides from rulers; type exact values by double-click; lock/unlock prevents edits.
4. Select one shape and multiple shapes, snap their move anchor to guides with the existing Snap master on; verify no guide snap when either toggle is off.
5. Drag Animation bone ends, roots and new-bone endpoints to guides; verify the same coordinates as Paint.
6. Verify Flipbook guide locations match Paint and Animation at several zoom/fit sizes and different rotation centres.
7. Save project, close/reopen, reload; verify custom guides, lock, toggles and built-in settings restore on the correct sprite only.
8. Export costume/SVG/GIF/sprite sheet and confirm guides are never included in artwork/export.
9. Measure performance before/after with 200 shapes and repeated pointer drags; confirm no visible lag or dropped frames. The polling interval must be profiled and, if necessary, replaced with editor lifecycle events before release.

## Evidence classification

- **SOURCE-VERIFIED:** inspected current source identifiers, project serializer/loader, Paint Snap state, Paint Select move branch, Animation state/move branch and Flipbook geometry.
- **STATIC-ANALYSIS:** candidate structure, coordinate mapping and integration instructions reviewed against those source excerpts.
- **NOT-TESTED:** JavaScript parse/execution in browser, preview visibility, ruler hit testing, guide drag, snap interactions, save/load round-trip, export exclusion, 200-shape performance, and all runtime behaviour.

**Disposition:** WEB phase candidate ready for Claude review. The task is not fully complete until the terminal/browser tests above pass and the owner approves integration.
