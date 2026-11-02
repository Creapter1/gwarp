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
| GW-DOC-UI-01 | Full editor map | PENDING | docs/index.html; UI guide | Desktop + narrow viewport |
| GW-DOC-START-02 | First working script | PENDING | docs/start.html; learning guide | Sprite → hat → Motion → Stage result |
| GW-DOC-ART-03 | Costumes/vector selection | PENDING | docs/costumes.html | Select, resize, rotate, before/after |
| GW-DOC-ANIM-04 | Animation rig/timeline | PENDING | docs/animation.html | Rig, frames, play, Make costumes |
| GW-DOC-MUSIC-05 | Instruments/Create Melody/Song Maker | PENDING | docs/sounds.html | Current modes and save/reopen |
| GW-DOC-EXT-06 | Extensions library | PENDING | docs/extensions.html | Source tabs, cards, safety labels |
| GW-DOC-IMPORT-07 | Open/save/export/restore | PENDING | user guide; docs/scratch.html | Download is not round-trip verification |
| GW-DOC-AI-08 | GWrap AI chat | PENDING | docs/ai.html | Current assistant UI and harmless prompt |
| GW-DOC-AI-09 | AI key/privacy settings | PENDING | docs/ai.html; docs/safety.html | Blank key field only; no real credentials |
| GW-DOC-AI-10 | Local-model status | PENDING | docs/ai.html | Show real UI or prove absent in current build |
| GW-DOC-AI-11 | AI data-flow | PENDING | docs/ai.html | Requires current source + live evidence |
| GW-DOC-TOOLS-12 | Tilemap/Behavior Designer | PENDING | user guide; extra tool docs | Capture actual UI and Stage result |
| GW-DOC-LAN-13 | LAN collaboration | PENDING | user guide; future LAN guide | No real IP, join code or session secret |
| GW-DOC-CREDITS-14 | Credits/project identity | PENDING | docs/credits.html | Version, licence, third-party credits |

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

**Current status:** 0 received / 14 pending. This tracker records the plan at creation; it will be updated as screenshots arrive.
