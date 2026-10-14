# Project File Formats, Loading, Export, and Round-Trip Integrity

**Purpose:** explain what project files carry, how format research should be done, and how to tell “file opened” from “project preserved correctly.”

## 1. Four different meanings of compatibility

Do not collapse these into one checkbox:

1. **Container compatibility:** the app recognizes and safely opens the file container.
2. **Schema compatibility:** metadata, targets, blocks, assets and references can be parsed.
3. **Editor compatibility:** all meaningful objects show correctly and can be edited.
4. **Runtime compatibility:** the project behaves correctly after loading.
5. **Round-trip compatibility:** saving/exporting and reopening preserves project structure, assets and intended behavior.

A file can pass step 1 and fail any later step.

## 2. SB3: high-level structure

An ordinary Scratch 3 project file (`.sb3`) is a ZIP container. Common contents include:

- `project.json`: project metadata, targets, block graphs, variables/lists, costumes, sounds, broadcasts and other serialized data;
- asset files for costumes and sounds, commonly referenced by asset identifiers and metadata;
- metadata identifying format/version information.

The broad structure is documented in the community [Scratch file-format notes](https://scratchspec.github.io/files/) and formalized in the [Scratch Parser schema](https://github.com/scratchfoundation/scratch-parser/blob/master/lib/sb3_schema.json) and [definitions](https://github.com/scratchfoundation/scratch-parser/blob/master/lib/sb3_definitions.json). The schema is valuable for structural validation, but it is not a full description of runtime semantics or every tolerant behavior seen in deployed editors.

A common target contains:
- identity/name and Stage-or-sprite role;
- variables, lists and broadcasts;
- blocks and comments;
- costume records and current costume;
- sound records;
- target-specific position, direction, size, visibility, rotation style, layer order and other properties;
- extension metadata where applicable.

A costume/sound record does not necessarily embed the media bytes in place. It references an asset by ID/name/extension and may include resolution, rotation-center or duration/sample-related metadata. The exact supported keys should come from the schema and the current parser/exporter, not memory.

### Why asset reference integrity matters

If a project's JSON points to an asset that is missing, incorrectly named or decoded as the wrong media type, the project may look partly intact while sprites or sounds silently fail. Test every declared asset reference and every unreferenced ZIP entry. Do not infer asset existence from a costume thumbnail alone.

## 3. Parser and loader responsibilities

A robust import pipeline should separate these phases:

1. **Identify:** inspect file signature and extension; do not trust the extension alone.
2. **Bound:** enforce file size, entry count, decompressed-size and time limits before allocating unbounded memory.
3. **Inspect ZIP:** reject unsafe paths, duplicates with ambiguous handling, unsupported compression, and suspicious extreme compression ratios.
4. **Parse JSON:** report invalid JSON with a useful error and do not partially overwrite the open project.
5. **Validate structure:** check required top-level fields, target list, IDs, references and expected value types.
6. **Resolve assets:** map declared references to actual archive entries and verify bytes are decodable.
7. **Normalize carefully:** convert only fields the implementation understands; retain or report unsupported metadata rather than silently deleting it.
8. **Build an isolated candidate project:** construct new editor/runtime state off to the side where practical.
9. **Commit atomically:** replace the active project only after the candidate is validated well enough to avoid half-loaded states.
10. **Report compatibility gaps:** list unsupported extensions, custom blocks, unknown formats and missing media.
11. **Test execution:** run known small projects only after verifying project state has loaded.
12. **Clean up:** revoke object URLs, release audio/images and discard temporary buffers as appropriate.

This is a recommended pipeline, not a claim that the current G-Warp loader already implements all these defenses. Audit the current source and test each requirement.

## 4. Export responsibilities

Export is not merely calling ZIP compression. A reliable exporter must ensure:

- all targets and block graphs use valid references;
- each asset referenced by JSON exists in the archive;
- filenames/asset IDs match serialized metadata;
- format metadata is coherent;
- unsupported extensions are handled visibly;
- output can be opened in a fresh process;
- media bytes are not lost, transcoded unexpectedly or paired with the wrong metadata;
- the exporter does not mutate the editor's active project as a side effect.

For cross-editor export, describe what will be preserved and what cannot be preserved. An extension that exists only in G-Warp cannot become a stock Scratch block just by writing an SB3 file. A format can carry a declaration that the receiving editor does not know how to execute.

## 5. G-Warp's documented baseline and open format questions

The inspected [ENGINE-MAP.txt](../ENGINE-MAP.txt) says that G-Warp can open `.sb3` and ZIP-type `.pmp` files from the local-file menu, as well as ZIP/JSON inputs, and has a PenguinMod-link path. It says that newer protobuf-based PMP files were not yet supported in the inspected version.

The repo contains [Grok's file-format research](../grok/SPEC-files.txt) and [DeepSeek's PMP notes](../deepseek/NOTES-pmp.txt), with a candidate loader at [deepseek/pmp-loader.js](../deepseek/pmp-loader.js). Read the merge queue and run tests before treating any candidate as integrated or release-ready. Code in an AI work folder does not run in the public app unless explicitly merged.

**Important distinction:** ZIP-based PMP handling and newer protobuf PMP support are separate problems. Do not rewrite an already-working ZIP route while attempting to add a new protobuf decoder. Verify the actual format signature, container structure, version and official/community documentation for each sample.

## 6. Minimum round-trip test project

Create a small, reproducible fixture containing:

- Stage plus at least two sprites;
- multiple costumes, including vector and bitmap if both are supported;
- at least one sound;
- nested control blocks and reporter inputs;
- a variable and list with values of different types;
- a broadcast message and receiver;
- a procedure/My Block if supported;
- clone creation and deletion;
- a custom extension declaration if testing extension format;
- non-default costume centers, visibility, position, layer order and backdrop;
- a block comment and a monitor if those are supported by the format.

Then run this matrix:

| Stage | Action | What to compare |
|---|---|---|
| A | Create fixture in a source editor | Known initial state and expected behavior |
| B | Save SB3/PMP in that editor | Archive entries, JSON and hashes |
| C | Open in fresh G-Warp | Errors, missing media, targets, blocks and metadata |
| D | Run in G-Warp | Variable trace, positions, event order, sounds and visuals |
| E | Export from G-Warp | Valid container, references, asset bytes, metadata |
| F | Open export in a fresh G-Warp session | Round-trip state, no dependence on old memory |
| G | Open in original source editor | Interoperability and visible warnings |
| H | Re-run behavior in source editor | Differential behavior trace |

Keep the original archive untouched and compare extracted JSON structurally. Ignore expected volatile fields only through an explicit allowlist; do not delete every difference as “noise.” Hash asset bytes and compare them independently.

## 7. Diff strategy

Use two comparisons:

### Structural diff
Compare:
- target names/order and stable IDs;
- block records, opcodes, inputs, fields and connections;
- variable/list declarations and contents;
- costume/sound ordering and metadata;
- stage/backdrop state;
- monitors/comments;
- extension IDs/URLs and project-level metadata;
- all asset references and bytes.

### Behavioral diff
Run a deterministic project with controlled keyboard/mouse actions and compare:
- state snapshots at defined moments;
- printed/speech output;
- event/order transcript;
- clone count and live-thread behavior;
- sound start/stop behavior;
- output after Stop/restart;
- post-export behavior.

Structural equality does not guarantee behavioral equality; different runtimes can interpret the same serialized block with different scheduling or coercion semantics.

## 8. Negative and adversarial import cases

Include test archives containing:
- missing `project.json`;
- malformed JSON;
- missing referenced costume/sound;
- invalid asset extension or media bytes;
- repeated target/block/asset IDs;
- invalid block links (parent/next/input references);
- unknown opcodes/extensions;
- zero targets or Stage in an invalid position;
- huge strings or lists;
- too many archive entries;
- a tiny archive that expands to huge data;
- path traversal names such as `../`;
- duplicate filenames with different case;
- corrupt compression or truncated bytes;
- metadata with unsupported versions;
- an import interrupted midway;
- a valid file loaded while the current project has unsaved edits.

Expected behavior should be a safe, actionable error, not a crash, stuck screen, silent data loss, network fetch, or partially overwritten project.

## 9. Untrusted file rules

Project files are user-controlled data. Treat their JSON, SVG, filenames, image/audio metadata, extension declarations and storage records as untrusted.

- Avoid executing code from asset metadata or arbitrary extension text during import.
- Validate asset paths and MIME/type assumptions.
- Sanitize SVG with a well-understood allowlist or renderer-specific safe handling; do not assume SVG is inert XML.
- Treat recovered IndexedDB/local data as untrusted and potentially stale.
- Avoid fetching network URLs simply because a project contains a URL field; require a separate, visible user decision.
- Do not store secrets in local project metadata.
- Preserve user privacy when collecting bug reports: ask for explicit consent and warn that projects may contain personal content.

See the [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html).

## 10. G-Warp current evidence status

The baseline docs establish that SB3/PMP/JSON/ZIP loading paths exist in the v15.45.0 source map. They do **not** establish that every asset type, edge-case project or export round-trip works.

The [live UI report](./LIVE-UI-VERIFICATION.txt) says SB3 export/import round-trip was **NOT TESTED** in its recorded basic UI run. Keep that result visible until a dedicated import/export test is completed. The format research in [grok/SPEC-files.txt](../grok/SPEC-files.txt) is a specification draft, not a pass report.

## 11. Reference links

- [Scratch Parser schema](https://github.com/scratchfoundation/scratch-parser/blob/master/lib/sb3_schema.json)
- [Scratch Parser definitions](https://github.com/scratchfoundation/scratch-parser/blob/master/lib/sb3_definitions.json)
- [Community SB3 format notes](https://scratchspec.github.io/files/)
- [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor)
- [Blockly serialization guide](https://docs.blockly.com/guides/configure/serialization/)
- [MDN IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
