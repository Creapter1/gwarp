# G-Warp documentation screenshot sticky notes — Cloud capture handoff

**Created:** 2026-11-02 (America/New_York)  
**Owner request:** capture real app screenshots later, not guessed diagrams.  
**Prepared by:** ChatGPT (documentation pass)  
**Target public pages:** `docs/index.html`, `docs/start.html`, `docs/ai.html`, `docs/SCREENSHOT-UI-DOCUMENTATION.md`, and later the relevant feature guides.  
**Current public branch:** `main`  
**Internal handoff branch:** `ai-team`  
**Important:** this file is a screenshot request list. None of the requested captures are claimed to exist or have been tested.

## Capture rules for every sticky

1. Pull the latest `main` branch before capturing. Record the exact commit SHA, the visible app version, date/time and timezone, browser and version, operating system, viewport size, and whether the app is hosted or opened locally.
2. Use the real running G-Warp application. Do not draw a fake UI, make a mockup look like a screenshot, or use an old screenshot as evidence of the current build.
3. Primary desktop capture: **1440 × 900**. Also capture a narrower layout at **1024 × 700** for the general editor and any dialog that may overflow. Capture at the native browser scale; avoid blurry zoomed images.
4. Save the clean original screenshot first. Create a second annotated copy for the tutorial. Use numbered arrows, short labels, and a visible focus ring/outline around the exact button or field. Keep arrows outside important UI content and do not obscure text.
5. Use the same G-Warp dark theme as the public app. Do not recolor, rearrange, hide or fabricate controls to make a step look easier.
6. Use a clean demo project with harmless names such as `Player`, `Score`, `Demo`. Avoid real personal project content, project IDs, user names, email addresses, home paths, IP addresses, LAN join codes and any private data.
7. Never capture a real API key, password, access token, authentication header, private prompt, or provider account details. For a settings screenshot, use a blank key field or a clearly fake masked placeholder, and confirm no secret is readable in the clean original.
8. If the UI item does not exist in the latest build, capture the relevant current screen and report **NOT PRESENT IN THIS BUILD**. Do not invent a button or silently skip the sticky.
9. Keep originals in the internal AI-team workspace until the owner approves which annotated images belong in the public site. Only publish captures that match the current build and have no private data.
10. For each sticky, return the image filename(s), capture metadata, exact app commit, what was clicked, result observed, and any mismatch against the current docs. Say NOT TESTED when the interaction could not be completed.

---

## GW-DOC-UI-01 — Full editor map

**Target:** user guide, UI screenshot guide, documentation home.

**Capture A:** clean empty/new project at 1440 × 900. Show the whole editor with a selected sprite and the Stage visible.

**Capture B:** same project at 1024 × 700 to show the narrower layout.

**Annotations (numbered arrows):**
1. Top project/menu controls and Start/Pause/Stop area.
2. Category rail.
3. Block palette.
4. Script workspace.
5. Stage and backdrop.
6. Sprite list.
7. Code / Costumes / Sounds tabs.
8. Any visible project status or tool entry that the public guide references.

**Required result:** arrows point to actual current controls; label anything that moved or changed. Do not assume earlier screenshots match this build.

## GW-DOC-START-02 — First working script, step by step

**Target:** `docs/start.html` and `docs/LEARNING-GUIDE.md`.

Capture four states from one disposable demo project:
1. Selecting the `Player` sprite.
2. Choosing Events and dragging a Green Flag/Start hat into the workspace.
3. Snapping a Motion block under the hat (a short, obvious movement).
4. Pressing Start and showing the changed sprite position on the Stage.

**Annotations:** number the steps in order; add one arrow to the sprite selector, one to the Events category/hat, one to the block connection, one to Start, and one to the Stage result. Include the final connected stack in a close crop as well as the full-screen capture.

**Pass evidence:** record whether the script ran, the visible expected result, and the exact build. If the hat name or Start label differs, use the actual label and tell ChatGPT.

## GW-DOC-ART-03 — Costumes and vector selection

**Target:** `docs/costumes.html`, `docs/USER-GUIDE.txt`.

Use a simple demo sprite with two or three visible vector objects.

Capture:
1. Costumes tab and selected costume.
2. Vector Select tool active and one object selected with bounding box.
3. Corner resize handle and rotate handle visible.
4. A second object added to a multi-selection if the feature is present.
5. Before/after view showing the actual artwork moved or resized.
6. Onion skin visible in the animation/flipbook workflow if it is part of the current interface.

**Annotations:** arrows to Select, the bounding box, corner handle, side handle, rotation handle, multi-select hint (if visible), Undo and Apply/Done if present.

**Do not claim:** Shift modifiers, pixel movement or handle persistence unless Cloud tests those actions in the current build and records the result.

## GW-DOC-ANIM-04 — Animation rig and timeline

**Target:** `docs/animation.html`, `docs/USER-GUIDE.txt`, animation tutorial hub.

Capture:
1. Costumes → Animation tab (or the exact current location).
2. Rig mode with bones connected to a simple character.
3. Animate mode with at least two frames/poses.
4. Onion skin or in-between/Glide/Smooth controls if actually available.
5. Play preview in progress.
6. Make costumes action and the generated costume group after creation, if safe to do in a throwaway project.

**Annotations:** number the workflow, point at the active mode, bone handles, frame selection, playback and generated frames.

**Required evidence:** state which controls were present, which were clicked, and whether saved frames remained after switching tabs and reopening the test project. If any control is missing, note it.

## GW-DOC-MUSIC-05 — Instruments, Create Melody and Song Maker

**Target:** `docs/sounds.html`, `docs/USER-GUIDE.txt`, future music tutorials.

Capture:
1. Sounds tab for a selected sprite.
2. Instrument group selector (e.g. Keys/Strings/Winds/Mallets/Synth/Drums only if those labels are current).
3. Instrument Playground / sound-shaping controls.
4. Create Melody area and any melody/pad editor controls.
5. Song Maker start screen, mode/selector choices, stem/track grid and one filled pattern.
6. Playback visibly active.
7. Add/save/export-to-sprite action and the result in the sprite's sound list.

**Annotations:** arrows to instrument choice, note/pad area, low/high or sound-shaping controls, melody creation area, track/part rows, playback and save destination.

**Required evidence:** do not use an invented tune or pretend a preview has been saved. Record what plays, where the saved sound appears, and whether it survives a project save/reopen. Capture a clean project with no personal audio.

## GW-DOC-EXT-06 — Extensions library

**Target:** `docs/extensions.html`, `docs/USER-GUIDE.txt`.

Capture the extension library with its current tabs/categories. The earlier report described tabs labelled G-Warp, TurboWarp and PenguinMod; verify those labels in the current build.

**Annotations:** point to the Extensions entry point, source tabs, search/filter if present, extension cards, safety/compatibility labels and Add/Enable action.

**Required evidence:** show one harmless extension being opened or enabled only in a disposable project, then show its category/blocks if they appear. Record the exact extension and its source. Do not imply all extensions are interchangeable or safe.

## GW-DOC-IMPORT-07 — Open, save, export and restore

**Target:** `docs/USER-GUIDE.txt`, `docs/scratch.html`, `docs/troubleshoot.html`.

Capture:
1. Current More/project menu open.
2. The actual Open/Load action and file-type choices.
3. Save / Save As / Export choices.
4. The restore-point/history panel if available.
5. A harmless demo project after import, showing sprite/blocks/assets.
6. If possible, export a disposable SB3 and reopen it in a compatible target editor; capture the target editor and result.

**Annotations:** arrow to the exact action and file type. Add a clear label: “downloaded” is not the same as “round-trip verified.”

**Privacy:** crop/redact local user folder paths and account/project identifiers. Keep the file picker in a disposable test folder.

## GW-DOC-AI-08 — GWrap AI helper entry and conversation

**Target:** `docs/ai.html`.

Capture:
1. The exact current entry point/menu for GWrap AI.
2. The empty assistant panel/dialog before use.
3. A harmless example prompt: “Help me make the selected sprite walk when I press the right-arrow key. Explain the blocks in order.”
4. The complete response with any generated recipe or block steps.
5. The project before and after the user manually builds/tests the suggestion.

**Annotations:** arrows to assistant entry, prompt field, send control, response, and any project-context indicator/preview. Use a demo sprite named `Player`.

**Critical evidence:** record whether the assistant opens, whether the prompt is accepted, which model/provider label is shown, what output is returned, and whether a context preview/opt-out is visible. Do not infer an API connection from the existence of a chat window.

## GW-DOC-AI-09 — AI key, memory and privacy settings

**Target:** `docs/ai.html`, `docs/safety.html`.

Capture only after confirming the current settings behavior:
1. Key/settings panel with an empty key field.
2. The “Remember” option or its current equivalent, if present.
3. Remove/clear key action, if present.
4. A post-removal screen proving the key is absent (without showing the key itself).

**Annotations:** arrows to the key entry control, remember/session choice, remove/clear action, and any disclosure of what context is transmitted.

**Never:** type a real credential for screenshots, save it in a file, show it on screen, or commit it. If a live test needs credentials, use a disposable test key and keep it out of screenshots and logs. If provider/model status cannot be verified, label it NOT TESTED and do not publish a “connected” claim.

## GW-DOC-AI-10 — Local model / Llama status (avoid fake UI)

**Target:** `docs/ai.html`.

First inspect the latest app. Search for a real Local AI / model download / WebGPU / Ollama setting.

- If present, capture the real model selection/download screen, download progress, ready state, a simple prompt, and restart/offline behavior. Record model name, file size, runtime, GPU/backend, cache behavior and exact build.
- If absent, capture the current GWrap AI settings or relevant tool menu and annotate **“No local model option in this build”**. Do not create a pretend download dialog.

**Required evidence:** distinguish in-browser WebGPU inference from an Ollama endpoint. A model that runs in the Ollama app does not prove G-Warp is connected to it.

## GW-DOC-AI-11 — AI data-flow illustration (only after source confirmation)

**Target:** `docs/ai.html`, potentially public privacy guide.

Prepare a simple labeled diagram only after reviewing the latest source and performing a controlled live test:
- G-Warp UI → context selection/summary → provider request → response → G-Warp UI.
- Clearly mark whether project context is included, which fields are included, and whether the request leaves the local computer.
- Draw a separate dashed “future / not shipped” path for an in-browser WebGPU model only if that remains the approved design.

**No assumptions:** do not use the historical October source review as proof of current request behavior. Ask owner/ChatGPT if the current payload is unclear.

## GW-DOC-TOOLS-12 — Tilemap and Behavior Designer

**Target:** `docs/USER-GUIDE.txt`, `docs/extensions.html`, possible future tool guides.

Capture:
1. The current tool launch point.
2. Tilemap editor with grid, tile palette, layer selector and one demo tile.
3. A simple collision/solid setting if visible and tested.
4. Behavior Designer with a simple demo behavior, event and response.
5. A preview on the Stage showing the actual result.

**Annotations:** label grid, palette, layer, collision/solid, event and response only where each control is visible and used. Record whether the tool saves with the project.

## GW-DOC-LAN-13 — Live LAN collaboration

**Target:** `docs/USER-GUIDE.txt` and future collaboration/security guide.

Capture:
1. The current LAN collaboration entry/dialog.
2. Server address/connection controls with a safe local test configuration.
3. A successful two-client session only if a compatible server is actually running.
4. Peer/cursor/lock state on both clients.
5. A disconnected/error state if connection is unavailable.

**Security:** never publish real IP addresses, join codes, session secrets or usernames. Blur them in annotated copies and keep clean originals internal. The source mentioning WebSocket port 8787 is not proof that a collaboration server is available or that a connection succeeded.

## GW-DOC-CREDITS-14 — Credits and independent-project identity

**Target:** `docs/credits.html`, `docs/scratch.html`, public About section.

Capture the credits page and any in-app About/version/licence information. Use arrows to identify the G-Warp project name, beta/version label, MIT licence link and third-party credit section. Do not use another project's logo as a substitute for G-Warp branding.

---

## Cloud's close-out report format

For each sticky, return:

```text
Sticky ID:
Capture files:
App version / exact main commit:
Date/time + timezone:
Operating system:
Browser + version:
Viewport:
Steps actually performed:
Observed result:
Screenshot annotations:
Any mismatch against the documentation:
Evidence: LIVE-TESTED / SOURCE-VERIFIED / NOT-TESTED
Privacy review: PASS / BLOCKED
```

**Do not modify `app.html`, `index.html`, or any runtime source while doing this screenshot assignment.** This is a visual evidence and documentation task. Route code defects to the normal AI-team task queue instead of silently fixing them during capture.
