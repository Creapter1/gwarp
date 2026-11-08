# ANIM-0 — Animation acceptance check

- Date: 2026-11-08 UTC
- Evidence wording: **TESTED in G-Warp** means observed in the browser preview listed below. Anything marked NOT-TESTED was not run.
- Scope: acceptance review only. No G-Warp application source or owner project was changed.

## Build and limits

Tested in the side preview at https://creapter1.github.io/gwarp/app.html. The visible label was **G-Warp Beta v15.60.0**; the app’s internal diagnostic text reported **15.5.2**. This identifies the public preview build only. It is not evidence about the `ai-team` branch or desktop/Electron build.

The side preview did not produce a downloadable `.sb3` file. The QA kit could not be set up because its Playwright dependencies were unavailable in this network-restricted environment; its smoke script also targets a local `file://` app path. As a result, save/reopen, `costume-bounds.js`, and real Scratch VM checks remain **NOT-TESTED**.

## Results

| Check | Result | Observed evidence |
|---|---|---|
| G-Spark rig and animation data | **TESTED in G-Warp — baseline observed** | Built-in G-Spark rig showed 5 bones and 5/5 shapes attached. Walk and wave were available. Walk was already an 8-frame fixture; I did not author eight new poses. The panel showed 8 FPS and Loop on. |
| Make costumes | **TESTED in G-Warp — PASS in this preview** | Toast: “Made 8 costumes: walk//frame 1 … walk//frame 8”. All eight frame thumbnails showed 120 × 110. In a fresh clean tab, after conversion the rig still showed 5/5 attachments, 8 frames, 8 FPS, Loop on. This is an in-session observation, not a saved-project round trip. |
| Frame center alignment | **NOT-TESTED** | `costume-bounds.js` was not run and no exported project was available. Equal 120 × 110 canvas sizes do not prove matching costume centers or ≤1 px drift. |
| Eraser | **TESTED in G-Warp — PASS on a disposable frame** | Eraser visibly removed a small segment from the G-Spark walk frame 1 foot; Undo restored it. |
| Reshape | **TESTED in G-Warp — works on a simple vector shape; grouped mascot limitation observed** | On the grouped G-Spark art, the tool displayed: “Reshape works on shapes and lines. Ungroup first, or use Select for text and pictures.” On a temporary blank costume, I drew a circle; Reshape showed node handles and dragging the top node changed the shape. The temporary costume was undone/deleted. |
| Global Stop: Animation editor preview | **FAIL in this preview** | Pressing app-wide Stop did not return the Animation editor Play/Stop control to Play; the preview continued. |
| Global Stop: Flipbook | **FAIL in this preview** | After Make costumes, the Flipbook showed 9 costumes (original `costume1` plus eight generated frames). App-wide Stop did not stop it: its Stop icon remained and the shown frame advanced from 1/9 to 6/9. |
| Global Stop: Animation extension block | **TESTED in G-Warp — PASS in this preview** | A G-Warp Animation extension script ran `wave` repeatedly. The costume-name monitor showed `wave//frame 3`; after app-wide Stop it showed `wave//frame 1` and remained there on two observations. The extension warns that adding it means the project will no longer work in Scratch, though it may run in TurboWarp and G-Warp. |
| Developer mode | **FAIL / appears inert in this preview** | Its More-menu control displayed Off and stayed Off after repeated activation attempts by accessibility control, coordinate click, and Space. The Calm motion toggle did change state in the same menu, so the menu was responsive. This is limited to the observed public preview. |
| Save and reopen `.sb3`; preserve frames, bones, attachments, FPS, loop | **NOT-TESTED** | Project Save and File > Save as were attempted in the disposable preview project, but no new file appeared in the browser’s recent downloads. No file was available to reopen. The observed post-conversion state above does not establish persistence. |
| Real Scratch VM | **NOT-TESTED** | No exported `.sb3` was available to run in Scratch VM. The G-Warp Animation extension itself is explicitly reported as not Scratch-compatible. |
| Separate rig character | **NOT-TESTED** | Only the built-in G-Spark rig was available in the starter scene used for this pass. |
| Desktop/Electron build | **NOT-TESTED** | The native desktop application was not opened; testing stayed in the user-requested side preview. |

## Overall

**PARTIAL.** Costume generation, Eraser, simple-shape Reshape, and the Animation extension script’s response to global Stop were exercised successfully in the public browser preview. Global Stop did not stop the Animation editor preview or Flipbook. Developer mode appeared inert. Center alignment, persistence through `.sb3` save/reopen, Scratch VM behavior, a second rig, and the desktop build still need evidence from an exported project and/or the corresponding builds.
