# URGENT — G-Warp License & Intellectual-Property Verification

**Priority:** URGENT  
**Owner:** Cloud (the agent with the working application and repository checkout)  
**Repository:** `Creapter1/gwarp`  
**Working branch:** `ai-team` for audit notes and proposed compliance changes  
**Protected branch:** `main` — do not push, merge, publish, or deploy without the owner's explicit approval  
**Protected file:** `app.html` — do not edit, reformat, regenerate, replace, or modify without explicit approval  
**Purpose:** Complete an evidence-based license/IP audit of the actual public website, repository, distributable app, bundled assets, dependencies, extensions, and release artifacts. Identify every unresolved item and give the owner exact, ordered instructions to close it.

> This is an engineering compliance audit, not a legal opinion or a guarantee against complaints, takedowns, account restrictions, or search-platform action. Do not label G-Warp “legally cleared” merely because a scanner reports no findings.

---

## 0. Mandatory operating rules

1. **Inspect before changing.** First establish the exact repository, branch, commit SHA, release/build version, and deployed website revision being audited.
2. **No destructive or scope-changing fixes without approval.** Do not delete, replace, rewrite, or substantially alter code, art, audio, project samples, branding, licenses, or legal terms unless the owner explicitly approves that specific change.
3. **Do not touch `app.html`.** You may inspect it, hash it, scan it, and cite exact locations. No edits whatsoever without explicit owner authorization.
4. **Do not publish to `main`.** Keep audit notes and proposed changes on `ai-team`. Do not create a public PR or deploy unless asked.
5. **Never invent provenance or permissions.** “Found online,” “looks like an icon pack,” “AI-generated,” “free,” “open source,” or “available in Scratch” is not proof of a license or ownership.
6. **Do not treat missing metadata as proof of infringement.** Mark it **UNKNOWN / EVIDENCE REQUIRED**, explain why it matters, and ask the owner for evidence.
7. **Do not silently replace a dependency with a similar one.** Record the current dependency and its exact version first; propose alternatives separately.
8. **Use primary sources.** Prefer the original project's LICENSE, official licensing page, exact release/tag, copyright holder's terms, or written permission. Record source URLs and access dates. Do not rely on search snippets.
9. **Preserve evidence.** Record file paths, line numbers or code locations, asset hashes, package versions, URLs, commit SHAs, and screenshots where relevant.
10. **Report honestly.** Separate verified facts, likely issues, unknowns, and items requiring legal/owner judgment. No “100% safe,” “zero risk,” or “fully compliant” claims.

## 1. Define exactly what is being audited

Audit all of the following, not just the root `LICENSE`:

- Public GitHub repository: every relevant branch, tag, release, and current public commit.
- Public website: deployed pages, downloadable files, images, icons, fonts, embedded media, scripts, and externally hosted resources.
- App: the actual distributable HTML/app build and every bundled or remotely loaded component.
- Documentation: screenshots, diagrams, tutorials, copied code examples, logos, names, and embedded media.
- Extensions and add-ons: built-in, bundled, optional, downloadable, or remotely loaded extensions.
- Examples and templates: sample projects, sprites, costumes, backdrops, sounds, music, animations, and other project content.
- Build and release pipeline: generated bundles, package manifests/lockfiles, CDN URLs, copied assets, and release archives.
- Historical public content: older releases/branches if they remain downloadable or are still promoted/linked.

Record the audit baseline:

| Field | Required evidence |
|---|---|
| Audit date/time (UTC) | Timestamp |
| Repository | `Creapter1/gwarp` |
| Branch and commit | Exact branch + full SHA |
| App version/build | Exact version and build identifier |
| App file | Path, byte size, SHA-256 |
| Website deployment | URL + deployed commit/build if available |
| Releases examined | Tags/releases and dates |
| Auditor | Cloud agent/version |

If a deployment cannot be tied to a commit, explicitly mark it **DEPLOYMENT SOURCE UNVERIFIED**.

## 2. Phase A — Build a complete third-party inventory

Create an inventory of every third-party component and every externally sourced item. Search source, HTML, CSS, JavaScript, package manifests, lockfiles, build files, CDN references, import maps, extension registries, documentation, and release archives.

Include at least:

- JavaScript libraries and modules, whether bundled, copied, minified, or loaded from a CDN.
- CSS frameworks and UI libraries.
- Icon libraries and individual icons.
- Fonts and font files.
- ZIP, compression, parsing, rendering, audio, image, and export/import libraries.
- Code snippets copied or adapted from tutorials, Stack Overflow, GitHub, documentation, or other projects.
- Scratch/TurboWarp/PenguinMod-related code, assets, specifications, examples, or compatibility layers.
- Extensions, extension code, extension assets, and extension metadata.
- Images, SVGs, logos, illustrations, screenshots, textures, sample projects, sprites, costumes, backdrops, sounds, music, and animations.
- Website theme/template components and analytics/embedded widgets if they include redistributable assets.

For each item, record:

| Field | What Cloud must record |
|---|---|
| Component/asset | Exact name |
| Type | Code / font / icon / image / sound / extension / sample / other |
| Exact version | Version, tag, commit, or “unknown” |
| Location | Repository path and line/reference, or URL |
| Distribution | Bundled / CDN / optional download / website-only / development-only |
| Source | Original project/creator URL |
| Copyright holder | As stated by the authoritative source |
| License | Exact license name and version |
| License evidence | Direct URL and the relevant clause/file |
| Required notices | Exact attribution, copyright, NOTICE, or source-offer obligations |
| Modifications | Unmodified / modified / forked / copied / unknown |
| Compatibility | Whether its terms are compatible with G-Warp's distribution and intended use |
| Status | PASS / ACTION REQUIRED / UNKNOWN / BLOCKER |
| Evidence | Commit, file, hash, screenshot, or archived source reference |

Do not assume a dependency's license from its package name alone. Verify the exact version actually used. If a dependency is dual-licensed, record the available choices and which license G-Warp relies on.

### Specifically verify known candidates, then expand the list

Previous preliminary review identified these as candidates to verify against the exact checked-in and deployed versions:

- Tailwind CSS
- Font Awesome (distinguish icon SVG/JS assets, font files, and code; their terms can differ)
- JSZip
- Chakra Petch font

These are leads, not a complete inventory and not proof of a violation. Check exact versions, actual usage, bundled files, and the relevant official license text. Continue scanning beyond this list.

## 3. Phase B — Verify license files and notices

Inspect the root `LICENSE`, all nested `LICENSE*`, `COPYING*`, `NOTICE*`, `THIRD-PARTY*`, package metadata, and credits pages.

Confirm:

- The root MIT license is present, complete, and accurately identifies the copyright holder/year.
- The repository clearly states what the MIT grant covers: only original material the project owner has the right to license, not third-party components or assets with separate terms.
- Third-party notices are included where required by the applicable licenses.
- Copyright notices and license texts are preserved when required.
- Attribution is visible and practical for recipients (for example, an in-app credits/about screen or a bundled notices document where appropriate).
- Source-code offer, corresponding-source, patent, trademark, or other special conditions are met where a license requires them.
- The website does not imply the root MIT license grants rights to third-party brands, logos, artwork, or trademarks.
- No file carries a conflicting license header or a license that contradicts the repository's claims.

**Important:** GitHub's detected repository license is not a full dependency or asset audit. A root MIT file does not automatically relicense everything in the repository.

## 4. Phase C — Audit extensions and plugin redistribution

For every built-in, bundled, optional, downloadable, or remotely loaded extension:

1. Identify its exact name, creator, source repository, version/commit, and whether G-Warp modifies it.
2. Locate the original license from the creator or official source.
3. Determine whether the license permits copying, modification, bundling, redistribution, commercial use (if applicable), and distribution in a closed or single-file app.
4. Check required notices, attribution, source disclosure, reciprocal licensing, and preservation of notices.
5. Identify whether the extension loads third-party assets or dependencies of its own.
6. Verify that extension gallery text, icons, thumbnails, sample projects, and documentation are also properly licensed.
7. Distinguish code that is merely compatible with a Scratch-style extension API from code copied from another implementation.

If any extension's license or origin cannot be established, mark it **UNKNOWN — OWNER DECISION REQUIRED**. Do not assume “extension gallery” means unrestricted redistribution.

## 5. Phase D — Audit all media and project content

This is a critical evidence gap unless provenance is established for every distributed item.

Create an asset-by-asset inventory covering:

- App icons, logos, UI illustrations, SVGs, screenshots, diagrams, and website images.
- Sprite art, costumes, backdrops, tiles, textures, sample characters, and templates.
- Music, loops, instrument samples, sound effects, voice clips, and audio demos.
- Animation frames and other media bundled in the app or examples.
- Any third-party media shown in tutorials or documentation.

For each item, identify one of these evidence-backed origins:

- **OWNER-CREATED:** identify the creator and retain original editable/source file or creation record.
- **COMMISSIONED:** retain agreement proving the rights granted, including modification, distribution, and intended commercial use if relevant.
- **LICENSED:** record the exact license, creator, source, version/date, and required attribution.
- **PERMISSION GRANTED:** retain written permission and its scope.
- **PUBLIC DOMAIN:** retain reliable evidence of public-domain status and jurisdiction/scope.
- **UNKNOWN:** no adequate evidence yet.

Do not treat an image search result, attribution alone, a “free download” label, or AI generation as sufficient proof. For AI-generated material, record the tool/service and applicable terms at generation time, the prompt/source inputs where relevant, and whether any uploaded/reference material may have carried third-party rights. Flag uncertain cases for owner/legal review.

If a media item has no adequate rights evidence, recommend the safest specific remedy: obtain permission, replace it with owner-created material, or use a verified license-compatible alternative. Do not remove or replace it without approval.

## 6. Phase E — Scratch, TurboWarp, PenguinMod and trademark/IP boundary

G-Warp's ability to read/write a file format or implement a compatible workflow does not by itself establish that it uses another project's code. Verify the actual source and branding separately.

Check:

- Whether any Scratch VM, Scratch Blocks, TurboWarp VM, PenguinMod VM, or other upstream source code is copied, adapted, bundled, or imported. If so, identify exact files/commits and apply their actual license obligations.
- Whether compatibility references are accurate and clearly descriptive.
- Whether the Scratch, TurboWarp, PenguinMod, or other third-party names/logos/characters are used as G-Warp branding, app icons, product marks, or in a way that implies endorsement or affiliation.
- Whether Scratch Cat or other recognizable characters, logos, official screenshots, or brand assets appear anywhere in the website, app, docs, social graphics, or downloadable examples.
- Whether wording such as “compatible with” is truthful and does not imply official certification, sponsorship, or affiliation.
- Whether G-Warp's own name, logo, and product identity are distinguishable.

Record every relevant use with a screenshot and URL/path. A plain-text factual compatibility reference is not the same thing as using another party's logo or claiming affiliation. Do not remove legitimate descriptive references automatically; escalate questionable branding for owner/legal decision.

## 7. Phase F — Code provenance and copied-source review

Search for copied/adapted source, not merely similar functionality or visual design.

- Compare suspicious sections with the alleged upstream source at the exact relevant version/commit.
- Check file headers, comments, attribution, function names, unusual strings, copied examples, and source maps.
- Review git history and imported/merged commits where available.
- Identify code generated from templates or scaffolds and verify their terms.
- Distinguish independent implementation, API compatibility, file-format compatibility, and actual source-code derivation.
- Record a side-by-side evidence reference for any suspected copied code.

Do not accuse the project of copying based only on similar block shapes, a Scratch-like interface, common algorithms, or compatible project files. If substantial code is derived from a copyleft project, stop and determine the exact obligations before recommending distribution.

## 8. Phase G — Automated scans and manual verification

Run appropriate tools against the actual checkout and build, for example:

- Dependency inventory/SBOM generation (CycloneDX or SPDX).
- License detection and policy review (such as ScanCode Toolkit, ORT, or Licensee).
- Package-manager audit of manifests and lockfiles.
- Secret scanning as a separate security check (do not publish secrets in the report).
- Asset inventory with SHA-256 hashes and duplicate detection.
- CDN/external-resource inventory.
- A manual review of all scan findings and false positives.

Automated tools are triage, not a legal decision. Review vendored/minified code, CDN-loaded components, fonts, icon assets, generated bundles, and media manually. A clean scanner output does not prove every asset is authorized.

For every scan, record tool/version, command/configuration, date, commit SHA, files included/excluded, output location, and unresolved findings. Never upload private keys, API keys, credentials, or user data into public reports.

## 9. Phase H — Website and distribution review

Inspect the live website and all public download routes:

- Confirm that credits/notices are reachable and not hidden behind broken links.
- Confirm downloadable bundles include the notices required by their components.
- Confirm third-party fonts/icons/scripts are correctly attributed where required.
- Confirm embedded images and media have documented rights.
- Confirm external links point to authoritative sources and are not presented as endorsements.
- Check that app download, source repository, and documentation do not make inconsistent license or affiliation claims.
- Record each external CDN URL, exact resource/version if available, fallback behavior, and whether it is included in a downloaded/offline copy.
- Verify the current deployed site rather than assuming the checked-in HTML matches production.

This phase is about license/IP and distribution representations. Keep unrelated SEO, accessibility, and general security findings in a separate report unless they directly affect a license obligation.

## 10. Phase I — Risk rating and decision rules

Use these exact labels:

- **BLOCKER / RED:** credible indication of unauthorized distribution, incompatible license obligations, missing required source/notice, unlicensed media, or misleading trademark use that should be resolved before further promotion/distribution. State the evidence and safest containment option; do not unpublish or delete anything without owner approval.
- **HIGH / ORANGE:** material provenance or license uncertainty involving a core dependency, extension, substantial code, brand asset, or widely distributed media.
- **MEDIUM / YELLOW:** incomplete attribution, missing version evidence, unclear notices, or limited-scope uncertainty with a plausible compliance path.
- **LOW / BLUE:** minor documentation or recordkeeping gap with no current evidence of unauthorized use.
- **PASS / GREEN:** verified against authoritative evidence for the audited version and distribution context.
- **NOT TESTED / GREY:** not inspected or unavailable. Never convert this to PASS.

For each finding include: ID, rating, affected item/path, evidence, why it matters, exact missing requirement, recommended action, owner decision needed (yes/no), and a verification test that proves closure.

Do not state that a platform will “blacklist” the repository or website unless an actual policy/action supports that conclusion. Explain the realistic mechanisms separately: rights-holder complaint, takedown request, license enforcement, trademark complaint, repeat-infringer action, hosting/platform enforcement, or search visibility action.

## 11. Phase J — Remediation order

Complete and report in this order. Do not skip ahead just to make the checklist look complete.

1. **Freeze the audit baseline:** capture branch, commit, build, app hash, deployment URL, and release list.
2. **Identify blockers:** unauthorized or unknown code, extensions, assets, fonts, icons, music, and branding with high distribution impact.
3. **Resolve source and license identity:** exact creator, version, authoritative license, rights scope, and distribution permission.
4. **Handle owner decisions:** ask the owner for missing creation records, purchase/commission agreements, written permissions, or approval to replace an item. Ask focused questions with the exact path and reason.
5. **Prepare required notices:** add accurate third-party license texts, copyright statements, attributions, and source references as required.
6. **Correct license scope wording:** ensure root MIT terms are not presented as covering material owned by third parties. Propose wording for owner approval.
7. **Resolve extension obligations:** comply, obtain permission, replace, or stop bundling the affected extension, subject to owner approval.
8. **Resolve media provenance:** obtain permission or replace unverified items only after approval.
9. **Resolve trademark/branding concerns:** propose exact text/asset changes for owner review; do not imply legal clearance.
10. **Rebuild and re-audit:** verify the final bundle, website, credits, and notices correspond to the same audited commit/build.
11. **Close every finding:** attach proof and mark PASS only after the closure test succeeds.
12. **Prepare promotion handoff:** summarize the exact commit(s), changed files, test results, unresolved risks, and owner decisions. Wait for explicit approval before main/deploy.

## 12. Required deliverables from Cloud

Create/update these audit artifacts on `ai-team` only:

1. **`docs/audits/LICENSE-AUDIT-REPORT.md`** — executive summary, audit scope, baseline, risk ratings, findings, conclusions, limitations, and links to evidence.
2. **`docs/audits/THIRD-PARTY-INVENTORY.csv`** (or Markdown table if CSV cannot be maintained reliably) — every code/library/font/icon/extension/media item and its exact license evidence.
3. **`docs/audits/ASSET-PROVENANCE-REGISTER.csv`** — every distributed media/sample asset, its origin, rights evidence, hash, and status.
4. **`docs/audits/REMEDIATION-CHECKLIST.md`** — ordered action list with checkboxes, responsible party, evidence needed, and closure test.
5. **`docs/audits/OWNER-DECISIONS-REQUIRED.md`** — concise questions Cloud cannot answer without the owner, each tied to exact paths and consequences.
6. **`THIRD-PARTY-NOTICES.md`** — only when the inventory establishes the exact notices/licenses that belong there. Do not fill it with guesses.
7. **`docs/audits/SCAN-LOG.md`** — scan tools, versions, commands, baseline SHAs, exclusions, and outputs.

Do not create empty or fabricated “PASS” records. If a deliverable cannot be completed, explain exactly what prevented it.

### Required final report format

Start with:

- **Overall status:** NOT CLEARED / CONDITIONALLY VERIFIED / VERIFIED FOR THE AUDITED SCOPE
- **Audited commit/build:** exact identifiers
- **Blockers:** count and IDs
- **High risks:** count and IDs
- **Unknowns:** count and IDs
- **Owner decisions required:** count
- **Files changed:** exact paths (or “none”)
- **Public main/deployment changed:** YES/NO

Then provide a numbered list in remediation order. For every unresolved item, tell the owner:

1. What exactly is missing.
2. Where it is located (full repository path, URL, or asset identifier).
3. Why it matters.
4. What evidence or permission is needed.
5. Exact steps to fix it, in order.
6. Whether Cloud can safely prepare the change or the owner must decide.
7. How Cloud will verify the fix.

Finish with a **do-not-promote checklist**. If any BLOCKER or HIGH item remains unresolved, state that clearly and recommend holding further promotion/distribution of the affected material pending owner/legal review. Do not claim that an already-public repository has been made private or that past distribution has been undone.

---

## 13. Audit completion standard

The audit is complete only when:

- Every shipped and website-delivered third-party component has an identified version/source/license or is explicitly marked unresolved.
- Every distributed media asset has a provenance record or an explicit unresolved status.
- Every extension's redistribution terms are verified.
- Root license scope and third-party notices are accurate.
- Relevant trademarks and affiliation wording have been reviewed.
- The deployed website and actual app build have been tied to the audit baseline.
- All scan findings have been manually triaged.
- Every remediation has evidence and a closure test.
- The owner has received the ordered list of remaining decisions and risks.

**A report with unresolved unknowns is still useful, but it is not a clean bill of health. The correct result is a precise list of what remains, not a reassuring guess.**
