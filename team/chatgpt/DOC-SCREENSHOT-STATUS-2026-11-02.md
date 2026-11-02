# G-Warp screenshot intake tracker

**Date opened:** 2026-11-02  
**Owner clarification:** Claude will send screenshots incrementally, little by little. Process each sticky independently; do not wait for the full batch.  
**Instruction source:** `team/chatgpt/DOC-SCREENSHOT-STICKIES-2026-11-02.md`

## Status definitions

- **PENDING** — no screenshot files have been received for this sticky.
- **RECEIVED** — files arrived; not yet reviewed for privacy/accuracy.
- **REVIEWED** — image and metadata checked; suitable for its documented purpose.
- **NEEDS-RECAPTURE** — image is stale, cropped, unreadable, privacy-unsafe, incorrectly annotated, or does not show the requested control.
- **NOT PRESENT** — control/feature is absent in the captured current build; the negative screenshot itself has been reviewed.

## Sticky-by-sticky progress

| Sticky ID | Subject | Status | Target guide | Notes |
|---|---|---|---|---|
| GW-DOC-UI-01 | Full editor map | REVIEWED | docs/index.html; UI guide | 1440×900 annotated + 1024×700 clean; build snapshot caveat below |
| GW-DOC-START-02 | First working script | REVIEWED | docs/start.html; learning guide | Start result x=0→10 shown; script assembled with built-in builder because headless palette drag failed |
| GW-DOC-ART-03 | Costumes/vector selection | REVIEWED | docs/costumes.html | Selection bounding box/rotation handle visible; select + move 60×20 px; resize, rotate, multi-select NOT TESTED |
| GW-DOC-ANIM-04 | Animation rig/timeline | REVIEWED | docs/animation.html | Rig, 5 bones, 8 frames, Animate and Play shown; Make costumes + reopen NOT TESTED |
| GW-DOC-MUSIC-05 | Instruments/Create Melody/Song Maker | REVIEWED | docs/sounds.html | Instruments, Spark Studio, Song Maker, 1.5 s playback and save-to-sprite 0→1; no sound heard headless; save/reopen NOT TESTED |
| GW-DOC-EXT-06 | Extensions library | REVIEWED | docs/extensions.html | Tabs G-Warp (8), TurboWarp (104), PenguinMod (79), safety labels visible; no extension added |
| GW-DOC-IMPORT-07 | Open/save/export/restore | REVIEWED | user guide; docs/scratch.html | G-logo file menu + restore UI captured; menus only; native pickers and SB3 round-trip NOT TESTED |
| GW-DOC-AI-08 | GWrap AI chat | REVIEWED | docs/ai.html | G-Spark bar + local recipe result captured; no local model/provider connected in test; 13 blocks shown after response |
| GW-DOC-AI-09 | AI key/privacy settings | PENDING | docs/ai.html; docs/safety.html | No screenshots; hidden developer-only key panel SOURCE-VERIFIED; remember/remove behavior NOT TESTED |
| GW-DOC-AI-10 | Local-model status | NEEDS-RECAPTURE | docs/ai.html | Screenshot shows `/models` + “0 models found”, but checked-in v15.60 app.html has no `/models`, Ollama, llama-server, LM Studio or WebGPU path; exact capture source commit missing |
| GW-DOC-AI-11 | AI data-flow | PENDING | docs/ai.html | No diagram delivered; can prepare source-only data-flow separately, clearly marked SOURCE-VERIFIED / NOT LIVE-TESTED |
| GW-DOC-TOOLS-12 | Tilemap/Behavior Designer | REVIEWED | user guide; extra tool docs | Full Tilemap and Behavior Designer windows are present (report understates capture); blank tilemap/no map paint; empty behavior response; operations, collisions, attach/save NOT TESTED |
| GW-DOC-LAN-13 | LAN collaboration | NEEDS-RECAPTURE | user guide; future LAN guide | Menu captured; claimed Wi-Fi dialog not visible in `...13-1-wifi-clean.png`; no server/two-client session; no connection proof |
| GW-DOC-CREDITS-14 | Credits/project identity | REVIEWED | docs/credits.html | About modal and credits page captured; project identity/licence disclaimer visible |

## Per-delivery receipt

Append one record for each sticky when Claude sends it:

```text
Date/time received:
Sticky ID:
Received filenames:
App version:
Main commit SHA:
Browser / OS / viewport:
Clean original present: YES/NO
Annotated copy present: YES/NO
Privacy review: PASS/BLOCKED
Screen matches request: YES/NO
Test result actually observed:
Status: RECEIVED / REVIEWED / NEEDS-RECAPTURE / NOT PRESENT
Reviewer notes:
Documentation draft updated: YES/NO
Owner approval to publish: PENDING
```

## Processing rules

1. Update only the row for the sticky that arrived; do not mark the others complete.
2. If a screenshot arrives without the sticky ID, infer only when it is unambiguous; otherwise record it as unassigned and do not publish it.
3. If the screenshot shows a control but no interaction test, document the control's presence only—not that it works.
4. If a screenshot is older than the current app, keep it as historical reference and request a new capture for current documentation.
5. Never expose credentials, private paths, personal identifiers or live collaboration secrets. Request a clean recapture if masking would hide important UI.
6. Prepare any edits/drafts on the `ai-team` branch. Only the owner may move approved documentation or images to `main`.
7. A sticky can be **REVIEWED** even while other sticky IDs remain PENDING.

## Batch review — 2026-11-02

**Delivery:** Claude commit [04426255](https://github.com/Creapter1/gwarp/commit/04426255c8517acc73e2b3c7cd2801da199f5933); files are stored internally in `team/screens-2026-11-02/`. Detailed self-reported steps and limitations: [REPORT.md](../../team/screens-2026-11-02/REPORT.md) and [capture-log.json](../../team/screens-2026-11-02/capture-log.json).

**Important build-provenance caveat:** the screenshots show the label **Beta v15.60.0**, but Claude's report says they were captured from local snapshot `2026-11-02_1010_ideas-plus-tab`, newer than `main` and containing UI additions not present in the checked-in source. The exact local source commit SHA was not supplied. The checked-in `ai-team/app.html` also declares v15.60.0, but that shared version label does not prove byte-for-byte or feature parity. The capture shows (among other things) a G-logo file menu and a Save .sb3 button not found in the checked-in source inspected for this review. Use this batch as evidence for the named local snapshot; do not present it as pixel-perfect evidence for the checked-in file or released `main` build until the source SHA is provided and matched.

**Reviewer visual findings:** the files named `GW-DOC-TOOLS-12-1-tilemap-blocks-*` and `GW-DOC-TOOLS-12-3-behavior-blocks-*` actually show the full Tilemap and Behavior Designer windows, not just palette blocks as the close-out text says. This proves their visible UI exists in the capture snapshot only. The Tilemap is blank; the Behavior Designer has no response attached. No map painting, collision result, behavior attachment, project save/reopen or runtime behavior is proven by these stills.

**Evidence limitations preserved:** the first-project script was assembled with the built-in script builder because headless palette dragging did not work; do not use it as proof of palette drag. Animation's Make costumes/reopen path is untested. Art resize/rotate/multi-select are untested. Music produced a 1.5-second playback event in headless Chromium, but the report says no sound was heard; save-to-sprite count changed 0→1, while project save/reopen is untested. Extension library was opened but no extension was added. File actions were shown but native pickers and SB3 round-trip were not tested. AI local-model screenshot is not corroborated by checked-in source. LAN screenshot lacks the reported host dialog and no two-client connection was tested.

**Summary:** 10 sticky rows REVIEWED for the evidence explicitly described above; 2 NEEDS-RECAPTURE (AI-10, LAN-13); 2 remain PENDING (AI-09, AI-11). REVIEWED does not mean every interaction requested by a sticky passed; the notes identify NOT-TESTED actions.

**Current status:** batch received and reviewed with the row-specific limits above. Remaining work is shown per sticky, not treated as a single all-or-nothing completion.
