# G-Warp AI Reference — Start Here

**Purpose:** this is the front door for any AI assistant, researcher, developer or contributor trying to understand G-Warp. Read this before guessing from a screenshot, an old note or a search through the entire source file.

**Repository:** [Creapter1/gwarp](https://github.com/Creapter1/gwarp)  
**Documentation index:** [docs/README.md](./README.md)  
**Current source inspected for this reference:** ai-team/app.html, app label **Beta v15.60.0**, blob SHA 16b7942c0caa6cf9e20ed9067e53a6e486588fbe.  
**Review date:** 2026-11-02.

## 1. What G-Warp is

G-Warp (G Wrapper) is an independent, Scratch-style block-coding and creative app. Users connect blocks to make games, animations, stories and music. It has its own dark/violet visual design, G-Spark character, custom block editor/runtime, and additional tools.

G-Warp aims for Scratch-compatible behavior and project interchange. It is **not** Scratch VM, TurboWarp VM or PenguinMod VM. Similar block names and project formats do not mean the internal implementations are the same.

The repository packages the main app in a large root app.html containing the editor, engine and many later inline feature modules. The website entry point is a different file, root index.html. Documentation lives in docs/. AI team plans, evidence and proposals live under team/.

## 2. Read the repository in this order

| Question | Best first source |
|---|---|
| What is G-Warp and where is everything? | [Repository README](../README.md), then this page |
| How do I use G-Warp? | [Learning guide](./LEARNING-GUIDE.md), [User guide](./USER-GUIDE.txt), [UI/screenshot guide](./SCREENSHOT-UI-DOCUMENTATION.md) |
| How is the current G-Warp app implemented? | [Engineering reference](./ENGINEERING-REFERENCE.md), then [Source module index](./SOURCE-MODULE-INDEX.md) |
| How do I create a Scratch-like app myself? | [Build your own block-coding editor](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md) |
| What is tested, source-verified or still unknown? | [Live UI verification](./LIVE-UI-VERIFICATION.txt), [November screenshot report](../team/screens-2026-11-02/REPORT.md), [screenshot review](../team/chatgpt/DOC-DELIVERY-REVIEW-2026-11-02.md) |
| What is planned or currently broken? | [AI team to-do](../team/AI-TEAM-TODO.md), [bug reports](../team/bugs/) |
| How does G-Warp compare with Scratch, TurboWarp and PenguinMod? | Engineering reference §6 and the official upstream links in §7 below |

Do not read all of app.html from top to bottom as your first action. Start with the module index, find the relevant script ID, then inspect the exact source section and any later patch that may override it.

## 3. Current source and version rules

### Branches are not interchangeable

- main is the owner-controlled public branch.
- ai-team is the AI team's working/evidence branch.
- **Rule Zero:** AI contributors work only on ai-team. Only the repository owner moves approved work to main. Do not commit, push, merge or open a pull request into main.
- Only Claude Opus is authorized by the team's rules to integrate changes into root app.html and root index.html. Other contributors prepare documentation, source reviews, tests, art or small proposals in their own approved folders.
- A public repository is not private storage. Never put API keys, passwords, tokens, private project files, IP addresses or collaboration join codes in it.

### Version labels need source identity

The checked-in ai-team/app.html inspected for this guide sets:

    window.GW_BUILD = {
      version: '15.60.0',
      label: 'Beta v15.60.0',
      title: 'G-Warp Beta'
    };

Its blob SHA is recorded at the top of this page. **A version label is not a source commit.** A screenshot with the same version label may still come from a different build, local working tree or uncommitted snapshot.

This matters for the November 2 screenshot batch. Claude's report identifies a local capture snapshot named 2026-11-02_1010_ideas-plus-tab, newer than main, and says it contains UI not present in the checked-in source. The supplied report does not include the exact source commit SHA for that local snapshot. Therefore:
- use the screenshots as evidence of the named local snapshot;
- use the checked-in source SHA for claims about the source inspected here;
- do not state that the screenshots exactly represent this checked-in file until the source SHA is matched;
- do not publish internal screenshot assets to the public website without owner approval.

See the [screenshot review](../team/chatgpt/DOC-DELIVERY-REVIEW-2026-11-02.md) for item-by-item findings.

## 4. Architecture in one minute

G-Warp's implementation is different from Scratch's modular package architecture:

1. The main editor, styles, engine and many feature modules are bundled in root app.html.
2. The visible block workspace is built from DOM elements such as .scratch-block and .block-stack; it is not Scratch Blocks' workspace instance.
3. The runtime uses G-Warp's own Engine and ScriptThread execution model. Do not write G-Warp code against Scratch VM's window.vm, runtime.sequencer or scratch-render objects.
4. The Stage is drawn by G-Warp's own 2D canvas renderer. Its project coordinate space is 480×360.
5. Costumes, audio, music, Tilemap, Behaviors, extensions, SB3 interchange and collaboration have their own modules and data paths.
6. Later inline modules may extend or replace earlier functions. Script order matters.

For exact names and IDs, use [SOURCE-MODULE-INDEX.md](./SOURCE-MODULE-INDEX.md). Treat a module ID as a locator, not as a separate file or a guarantee that it matches the current app version.

## 5. G-Warp AI: what is actually in the checked-in source

The phrase “G-Warp AI” can refer to more than one feature. Keep them separate.

### G-Spark quick helper — local recipe/tip matching

The checked-in source's G-Spark bar calls the local GW_V1571.match(q) lookup and addRecipe builder. It matches the user's words against built-in recipe and tip packs. A matching recipe can create block stacks in the selected sprite's workspace. The default G-Spark bar is **not evidence of a connected cloud LLM**.

### Bug questionnaire and AI Report — browser-local data

The problem questionnaire provides predefined tips and saves the report entries in browser storage. The AI Report can also store notes in the current browser. This is not the same as sending a prompt to a provider.

### Developer-only “Connect a real AI” path

The inspected gw-v1580-aihelp module includes a developer-mode-only connection panel. The source reads an Anthropic API key from session/local browser storage and sends a request directly to https://api.anthropic.com/v1/messages. When that path is used, its project summary includes:
- names of non-clone sprites;
- the selected sprite name;
- variable names;
- text for up to 12 top-level scripts belonging to the selected sprite, with up to 25 blocks per stack and short text snippets.

The question and that summary are put into the provider request. The response text is displayed in the helper. A remembered key is stored in localStorage; with “Remember” unchecked, the key is kept in sessionStorage. The default model string in this source is claude-sonnet-5-5, unless a user changes the model field.

This is a real external-provider path and should be described with a privacy/cost warning. Never put a real key in a screenshot, project, commit or log.

### Local models: do not assume an Ollama connector

The checked-in ai-team/app.html reviewed for this page contains no verified implementation reference to Ollama, llama-server, LM Studio, port 11434, an in-app model downloader, or browser WebGPU model inference. The /models response shown in one local screenshot is not corroborated by this checked-in source. Mark G-Warp-to-Ollama integration as **NOT SOURCE-VERIFIED** until the exact source/build that implements it is supplied and inspected.

This distinction is important for users who have Ollama installed on their PC: installing a local model in Ollama does not automatically connect G-Warp to it.

## 6. How an AI should answer questions about G-Warp

Before making a technical claim:

1. Identify the exact branch, commit or source blob being discussed.
2. Check this guide and the module index for the relevant source area.
3. Open the exact inline module in app.html. Search for the module ID and the function/element named in the guide.
4. Check for later modules that patch the same functions or UI. Do not stop at the first match.
5. Separate what source code exists from what was actually tested in a browser.
6. Check whether the relevant screenshot belongs to the exact same source build.
7. Say what is unknown. Do not turn a code comment, menu label, screenshot or passing syntax check into a claim of end-to-end behavior.

### Evidence vocabulary

Use these terms precisely:

- **SOURCE-VERIFIED** — the exact source was inspected; this does not mean it was run.
- **LIVE-TESTED** — the described action was performed in the named running build; include the build, environment and observed result.
- **TESTED in G-Warp** — use only when an actual G-Warp run/test output exists.
- **TESTED in scratch-vm** — use only when tested in the actual Scratch VM.
- **NOT-TESTED** — not executed or no reliable result exists.
- **NEEDS-RECAPTURE** — the screenshot does not show the requested state, is ambiguous, or does not match the source build.

A feature can be SOURCE-VERIFIED and NOT-TESTED at the same time. A screenshot can prove that a button is visible without proving the button works.

## 7. Official upstream reading — learn from the originals

These are primary sources. Read them to understand upstream implementation and behavior, not to assume that G-Warp uses the same internal code.

### Scratch

- [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor) — current home for the editor's migrated packages.
- [scratch-gui](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-gui) — React interface and integration/glue.
- [scratch-vm](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-vm) — project state and program execution.
- [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks) — visual block/workspace library; separate repository.
- [scratch-render](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-render) — Stage drawing.
- [scratch-paint](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-paint) — vector and bitmap costume editor.
- [scratch-storage](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-storage) — asset loading/storage integration.
- [scratch-audio](https://github.com/scratchfoundation/scratch-audio) — Web Audio-based Scratch sound engine; separate repository.

The Scratch editor monorepo is migrating packages in stages. Some older, familiar repositories have been archived or moved. Always check the current repository README and package README before using old file paths.

### TurboWarp

- [TurboWarp documentation](https://docs.turbowarp.org/)
- [Modding introduction](https://docs.turbowarp.org/development/getting-started) — its own page currently warns that it is outdated; treat Node/package commands as provisional and check package READMEs.
- [How TurboWarp runs projects](https://docs.turbowarp.org/how) — interpreter versus compiler explanation.
- [TurboWarp compiler](https://docs.turbowarp.org/new-compiler) — compiler design and tradeoffs.
- [TurboWarp source organization](https://github.com/TurboWarp) — check current repositories and branch state.

TurboWarp describes itself as a Scratch mod. Its compiler changes the execution strategy by compiling project scripts to JavaScript; speed gains vary by project and trade off against some forms of live script editing. Do not repeat benchmark multipliers as a guarantee.

### PenguinMod

- [PenguinMod documentation](https://docs.penguinmod.com/)
- [PenguinMod GitHub organization](https://github.com/PenguinMod)

PenguinMod describes itself as a TurboWarp mod. It has additional features and extensions; inspect the exact current repository and format documentation before claiming compatibility.

### G-Warp

- [G-Warp source](../app.html)
- [Engineering reference](./ENGINEERING-REFERENCE.md)
- [Source module index](./SOURCE-MODULE-INDEX.md)
- [Build-your-own guide](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md)

## 8. Important project boundaries

- G-Warp and Game Learner are separate projects. Do not mix their plans or evidence.
- The possible AI-assistant-merging / MCP / GraphQL / Freebuff idea was explicitly clarified as personal curiosity outside G-Warp. It is not a G-Warp feature or roadmap item.
- G-Warp's private test projects are kept in the owner's separate private repository. Do not copy them here.
- G-Warp is independent and must preserve third-party credits, artwork ownership and licences.
- The team works on ai-team; only the owner promotes approved changes.

---

**For an AI assistant:** this page is the orientation map. For implementation claims, follow it into the source module index and the exact app.html source; for interaction claims, follow it into the live reports and matching screenshot provenance.
