# ANIM-L1 — Layers panel with previews

**Status:** WEB-phase candidate prepared; not integrated, not browser-tested. Terminal acceptance remains open.  
**Owner:** Creapter1 · **Author:** ChatGPT GPT-6  
**Source inspected:** `app.html` from the current `main` branch at the time of review. Refetch current source before integration.

## Deliverables

- [Candidate module](https://github.com/Creapter1/gwarp/blob/main/ai-team/shared/2026-10-26-chatgpt-ANIM-L1/code/anim-layers.js)
- [Static concept preview](https://github.com/Creapter1/gwarp/blob/main/ai-team/shared/2026-10-26-chatgpt-ANIM-L1/preview.html)
- ChatGPT working copy: `chatgpt/anim-layers.js`

The module is a proposal only. It is not imported by `app.html`, and no runtime behavior has been connected. The old `#gwCostumeObjectPanel` is explicitly hidden by the redesigned `.gwpe` layout, so this proposal adds a separate closable floating panel rather than depending on that legacy panel.

## Verified source of truth: Paint stacking

The current redesigned Paint UI creates its four stacking buttons using an `order(dir)` function. The implementation reads direct SVG children from `#gwVectorCanvasV15`, filters them with `isArt`, and moves the selected element with `before()` / `after()`. Later SVG children are in front. It then calls `saveSoon()`, which calls `CE()?.save?.(true)`.

Current source excerpt, paraphrased:
- `svgEl() => by('gwVectorCanvasV15')`
- `isArt(n)`: direct child of this SVG; excludes `defs`, `style`, `gwV153*` and `gwpe*` UI nodes, SVG selection/handle elements.
- `selected()`: `CE()?.state?.selectedSvg`, provided that node passes `isArt`.
- `order(dir)`: uses current DOM child order for Forward, Backward, Front and Back.

The candidate deliberately uses the same `isArt` predicate and reorders the same direct SVG children. Its drag list is displayed **top/front first**; moving rows changes only the positions occupied by existing art nodes and preserves non-art SVG children in their original slots. It does not introduce a separate paint-order array. Existing toolbar commands and the new panel therefore share the same SVG stacking order.

### Required small Paint hook for row selection

The current `GW_TRANSFORM` object does not export the private `setSel(list)` helper used by the editor. Add a narrow public method in that module after `setSel` is defined (or as a method that closes over the hoisted function):

```js
T.selectLayer = node => {
  if (isArt(node)) setSel([node]);
};
```

The proposal calls `GW_TRANSFORM.selectLayer(node)` when a row is clicked. Without this hook it only updates the panel's visual selection and does not pretend that the Paint selection handles have changed.

### Paint metadata, hide and lock

- Stable Paint key: `data-gw-layer-key` on the SVG element.
- Rename: `data-gw-layer-name`.
- Lock: `data-gw-layer-locked="1"`.
- The IDs/names/lock values are inline SVG metadata and are persisted by the existing `CE().save(true)` path. They do not change the drawn geometry. They may remain as harmless custom data attributes in exported SVG.
- Hide is deliberately different: it is held only in the proposal module's in-memory set and applied through a document stylesheet outside the SVG. It is not added to the SVG and is not saved into project/export artwork.
- The drag handler refuses to reorder a locked source or target row. Claude must also add a guard to Paint's existing transform pointer-down path and its `order(dir)` toolbar action so a locked shape cannot be moved/resized or reordered from the canvas/toolbar.

## Verified Animation structures

The current Animation module exposes `window.GW_ANIM.state`. Relevant state fields include `state.anim`, `state.view`, `state.parts`, `state.orig`, `state.frame`, `state.mode` and `state.bone`.

The source currently represents:
- `anim.svg`: the animation's source SVG.
- `anim.parts`: a map from numeric SVG path strings to bone IDs.
- `state.parts`: the current list of numeric SVG paths.
- `anim.frames[i]`: pose data with `roots` and `angles`.
- `loadArt()`: imports `anim.svg`, calculates `partPaths(view)`, stores original transforms and sets `data-gw18-part="<numeric path>"`.
- `applyPose(root, anim, pose, orig, paths)`: resolves each element by path, then reads `anim.parts[path]`.
- `markParts()`: reads `st.anim.parts[p]` for the current path.
- Attach tool in `down(e)`: reads `[data-gw18-part]` and writes `st.anim.parts[part]`.
- `autoAttach()`: loops through `st.parts` and writes bone IDs to `st.anim.parts[p]`.
- `showPose()`: runs `applyPose`, `markParts` and `drawBones`.
- `frameSvg(anim,i)`: creates a fresh SVG from `anim.svg`, applies frame pose, serializes it.
- `makeCostumes(s,anim)`: calls `frameSvg(anim,i)` for each frame, so frame-specific order must be applied inside `frameSvg` to reach the generated costumes.
- Existing bone colours use `COLORS[Math.max(0, st.anim.bones.indexOf(b)) % COLORS.length]`; the proposal uses the same palette for the small bone colour dot.

## Critical Animation integration: stable part IDs

**Do not reorder Animation SVG children while the app continues to treat numeric paths as part identity.** Reordering siblings changes numeric paths. If `anim.parts` remains keyed by numeric path, bone attachments can jump to a different shape after a reorder.

The candidate provides `ensureAnimationIds(anim,view)`. Claude should call it in `loadArt()` after importing the source SVG into `view` and before populating `st.parts` / `st.orig`:

```js
window.GW_ANIM_LAYERS?.ensureAnimationIds(st.anim, view);
```

This adds `data-gw-layer-key` to corresponding elements in `anim.svg` and the live view, migrates existing `anim.parts` values from numeric path keys to stable element keys, initializes missing `frame.layerOrder` arrays, and creates `anim.layerMeta`. It intentionally does not change the original Costume SVG.

Then update each place that currently uses `anim.parts[path]` to resolve the stable key from the actual element:

**In `applyPose`:**

```js
const el = elAt(root, path);
if (!el) continue;
const key = el.getAttribute('data-gw-layer-key') || path;
const d = D.get(anim.parts[key]);
```

**In `markParts`:**

```js
const el = elAt(st.view, p);
if (!el) return;
const key = el.getAttribute('data-gw-layer-key') || p;
const b = st.anim.parts[key];
```

**In the attach branch of `down(e)`:**

```js
const partEl = e.target?.closest?.('[data-gw18-part]');
const part = partEl?.getAttribute('data-gw-layer-key')
  || partEl?.getAttribute('data-gw18-part');
if (!part) return;
// use st.anim.parts[part] for attach/detach
```

**In `autoAttach()`:**

```js
const key = el.getAttribute('data-gw-layer-key') || p;
if (best) st.anim.parts[key] = best;
```

Keep `state.parts` as the current DOM paths used by `elAt` and `parentMatrix`; only the bone-attachment map changes to stable keys. After a frame-order change, recalculate `st.parts`, rebind `st.orig` from stable key to the new path, and refresh the part markers. The proposal's `applyCurrentFrame(state)` does the path/original-transform remapping after it physically applies the current frame's order.

### Per-frame order and generated costumes

The panel stores `anim.frames[index].layerOrder` as an array of stable layer keys in **front-to-back** order. The candidate's `applyFrameOrder(root,anim,index)` moves the matching elements within their existing sibling slots; it does not move definitions or UI overlay groups.

Integrate these two hooks:

1. In `showPose()`, after `applyPose(st.view, st.anim, curPose(), st.orig, st.parts)` and before `markParts()` / `drawBones()`, call:

```js
window.GW_ANIM_LAYERS?.applyCurrentFrame(st);
```

The helper updates `st.parts` and remaps `st.orig` to the new paths, while the stable IDs keep `anim.parts` attachments correct.

2. In `frameSvg(anim,i)`, after `applyPose(root, anim, anim.frames[i] || null)` and before XML serialization, call:

```js
window.GW_ANIM_LAYERS?.applyFrameOrder(root, anim, i);
```

Because `makeCostumes()` already uses `frameSvg()`, generated costumes then inherit the correct per-frame order without a second order implementation.

### Undo and persistence

Current Animation history packing uses:

```js
const KEEP = ['name','costume','svg','rc','bones','parts','frames','fps'];
const pack = () => JSON.stringify({
  a: Object.fromEntries(KEEP.map(k => [k, st.anim?.[k]])),
  frame: st.frame, bone: st.bone
});
```

- `frames` is already in KEEP, so each `frame.layerOrder` is covered by undo/redo and serialized inside `gwAnimations`.
- Add `'layerMeta'` to KEEP so shared layer names and per-layer lock flags also survive Animation undo/redo.
- Add `layerMeta: {}` to new Animation objects created by `newAnim()`.
- The candidate calls `GW_ANIM.historySnapshot()` before frame-order/name/lock mutations and `GW_ANIM.refresh()` after. Expose these narrow methods in the current `window.GW_ANIM` object:

```js
historySnapshot: snap,
refresh: refreshAll,
selectPart: key => {
  const bone = st.anim?.parts?.[key] || null;
  st.bone = bone;
  refreshAll();
}
```

If a clicked part is not attached to a bone, its layer is still highlighted by the panel; do not select an unrelated bone.

### Animation lock

The panel stores `anim.layerMeta[key].locked`. Add a guard in the Animation attach path in `down(e)`: after resolving the layer element and stable key, return before changing `anim.parts` if that layer's metadata is locked. Bone colour dots are informational; locking an art part must not unexpectedly lock the entire bone rig.

## UI and thumbnail behaviour

- Paint toggle attaches to the redesigned Paint header/footer (`#gwCosHead` or `#gwpeFoot`); Animation toggle attaches to `#gw18Anim .gw18-head`.
- The panel is closable, scrollable, and top/front first.
- Each row uses a temporary SVG clone with all other art layers removed, so its thumbnail depicts only that shape/group. Existing `defs`/styles are retained for fills.
- Hover/selection glow is applied by an external document stylesheet, not by editing the SVG node.
- Animation rows show the matching bone's colour dot when attached.
- Drag reorder is enabled only in Animation's Animate mode; the current rig mode remains for bones/attachments. The current frame's order is stored independently in each frame.
- Hide is temporary for editing. It is not stored in `anim.svg`, `frameSvg()`, Paint SVG or exported art.
- Rename and lock are stored with Paint SVG metadata or Animation `layerMeta`. Paint attributes are non-visual and project-save through the existing costume SVG save path.

## Required TERMINAL / browser acceptance tests — NOT RUN

1. Open Paint in vector mode. Open/close Layers; confirm one row for every drawable shape/group, top row visually front. Confirm each thumbnail shows only its own layer.
2. Rename, lock, hide, show, select, hover and reorder Paint layers. Verify Forward/Backward/Front/Back toolbar and Layers list always agree. Locked layer cannot be moved, reshaped, reordered or modified. Save/reopen project; names/locks remain. Hide state must not survive as artwork visibility and must not affect exports.
3. Make a 12-layer character. Reorder several shapes with both toolbar and panel; verify the exact same overlap order. Undo/redo each rename, lock, and reorder step.
4. Animation: attach layers to different bones, open Layers, verify row name and bone dot. Hover and click a row; confirm only the corresponding shape is highlighted/selected.
5. In Animate mode, reorder a layer in frame 1, change to frame 2 and give it a different order. Switch repeatedly between frames; verify each frame restores its own order without moving bone attachments to another shape.
6. Run Make costumes. Verify each generated costume has its frame-specific z-order and no hidden editing-only layers are missing. Undo/redo order changes and Make costumes.
7. Export SVG, PNG, GIF and sprite sheet; verify thumbnails, temporary hide and UI highlight styles are not embedded in output.
8. Save project, close/reopen, reload. Confirm per-frame orders, layer metadata, bone mapping and Paint metadata persist for the correct sprite/costume.
9. Run real browser checks for 12+ layers, many grouped paths, nested transforms and repeated reorders. Verify no console errors and no lag. Also test one or zero visible layers.

## Evidence classification

- **SOURCE-VERIFIED:** Paint stacking toolbar's `isArt` / `order(dir)` / `CE.save(true)`; Animation state and path mapping; `applyPose`, `showPose`, `markParts`, `down`, `autoAttach`, `frameSvg`, `makeCostumes`, and Animation history KEEP/pack.
- **STATIC-ANALYSIS:** candidate design, stable-key migration approach, per-frame order representation, isolated thumbnail/hide strategy.
- **NOT-TESTED:** JS parse/execution, panel rendering, thumbnails, pointer interactions, selection hooks, lock enforcement, save/load, undo/redo, frame-specific ordering, Make costumes output, exports and performance.

**Disposition:** WEB-phase proposal ready for Claude review. This task is not complete until the terminal/browser tests above pass and the owner approves integration.
