# G-Warp license / IP check: first pass (Claude, 2 Nov 2026)

Answer to `docs/URGENT-LICENSE-VERIFICATION-HANDOFF.md`. This is an engineering check, **not legal advice** and not a guarantee.

- **Overall status:** CONDITIONALLY VERIFIED: no blockers found in what is public; a few wording and credit fixes are needed.
- **Audited:** public `main` = `fc497685a3c3343a8db3cbc6b436fa637eaf9148` (app.html 2,684,910 bytes, sha256 `748e4ab7ff369658…`), plus the public `ai-team` branch file list, plus the owner's private desktop build v15.60.0 + night update (not public).
- **Blockers:** 0 · **High:** 0 · **Medium:** 3 (L-03, L-04, L-08) · **Low:** 4 · **Not tested:** 2 (L-11, L-12)
- **Owner decisions needed:** 3 (below)
- **Files changed:** `docs/audits/*`, `THIRD-PARTY-NOTICES.md` (new), on `ai-team` only. **app.html and main were not touched.**

## What was checked and how
1. Every external `src`/`href` in the shipped HTML (app, website, docs).
2. License banners inside `app.html` (`@license`, `Copyright`, SPDX and license names), with the context of each hit.
3. Every file in both public branches by type: audio, fonts, binaries, .sb3, images.
4. Known Scratch internals and Scratch Cat asset ids in `app.html`. Results: `_penSkinId`, `PEN_SIZE_RANGE`, `_penDrawableId`, `blockIconURI` and `menuIconURI` = 0; Scratch Cat md5s = 0.
5. Credits and affiliation wording on the website, the docs and in the app.
6. The current Scratch license, from primary sources: the Scratch Foundation open-source page and the scratch-vm v5.0.0 release.

## Findings
| ID | Rating | What | Evidence | Fix |
|---|---|---|---|---|
| L-01 | LOW | Extension library (191 entries) | Only names, descriptions, credits, license names and **links** are in app.html (`#gw10GalleryData`). Extension code is loaded from the creators' own sites when a user adds one; nothing is bundled. Card pictures are G-Warp-made; the galleries' own pictures load from their sites only if the user ticks a box. Licenses and credits are shown per extension. | Keep as is. Optional: say "descriptions © their creators" (already said in the app). |
| L-02 | PASS | planck.js v1.5.0 (MIT) bundled for Box2D physics | Full MIT banner kept in app.html | none |
| L-03 | MEDIUM | G-Warp's own Pen / Music / Text to Speech / Translate / Makey Makey are labelled "based on Scratch's … (Scratch Foundation, **BSD-3-Clause**)" and link to scratch-vm `develop` | Scratch moved scratch-vm and scratch-gui to **AGPL-3.0** in Nov 2024 (v5.0.0). No Scratch VM code was found in app.html (none of its internal names), so these look like **independent G-Warp code that works like Scratch's**. "Based on … BSD" plus a link to the now-AGPL code can make people think code was copied. | Owner OK needed (app.html): change the label to "works like Scratch's Pen extension: G-Warp's own code, no Scratch code copied". |
| L-04 | MEDIUM | Library credits are incomplete | The in-app About names Tailwind, Font Awesome and JSZip. `docs/credits.html` names none of them, nor planck.js or the Chakra Petch font. Font Awesome Free icons are **CC BY 4.0**, which needs attribution (the CDN file keeps it, but a visible credit is the safe way). | Done on ai-team: `THIRD-PARTY-NOTICES.md`. Owner OK: add a "Libraries and fonts" section to `docs/credits.html` on main. |
| L-05 | LOW | Tailwind (Play CDN, MIT), Font Awesome 6.4.0 (cdnjs; icons CC BY 4.0, fonts OFL-1.1, code MIT), JSZip 3.10.1 (jsDelivr; MIT or GPLv3, G-Warp uses it under MIT), Chakra Petch (Google Fonts; OFL-1.1) | Loaded from CDNs, not copied into the repo | Credits only (L-04). Not a license issue: the Tailwind Play CDN is not meant for production (speed/offline). |
| L-06 | LOW | Opening Scratch website projects | app.html fetches projects and assets from `assets.scratch.mit.edu/internalapi` (same as TurboWarp). G-Warp does not redistribute them; projects on the Scratch site are CC BY-SA 2.0. | Keep the "not affiliated" line (present). Do not ship Scratch projects inside G-Warp. |
| L-07 | LOW | Root `LICENSE` (MIT, © 2026 Creapter1) does not say third-party parts keep their own licenses | GitHub shows "MIT" for the whole repo | Done on ai-team: `THIRD-PARTY-NOTICES.md`, and one line for README (owner moves it to main). |
| L-08 | MEDIUM | AI-made art: Gemini and ChatGPT icons and sprites in `team/ai-team/…` (public on ai-team); G-Warp's built-in sprite and backdrop libraries; mascots; app icon | Created with AI tools for the owner; no third-party sources found. Proof of origin is not recorded per file. | Owner: confirm that none was traced from someone else's art, and keep a one-line note per pack (tool + date). |
| L-09 | PASS | No audio, font, .exe, .zip or Scratch art files in either public branch | File scan: main has none; ai-team has only `team/claude/tests/powerlines.sb3` (a test project made by Claude) | none |
| L-10 | PASS | Affiliation wording | "Scratch is a project of the Scratch Foundation… G-Warp is an independent project and is not affiliated…" in the app; "independent / fan-made" on the website, credits and scratch pages. No Scratch Cat, logo or Scratch art found. | Keep. |
| L-11 | NOT TESTED | The private desktop build (`resources\app\lib\`, tutorials, any music samples) | Not public. An earlier rule says AGPL music samples must never go into the public repo. | Check `lib/` before any public .exe release. |
| L-12 | NOT TESTED | The live website at creapter1.github.io/gwarp | Not compared with the main commit | Compare before promoting. |

## Owner decisions
1. **L-03:** may Claude change the 5 "based on Scratch … BSD-3-Clause" labels in app.html to "works like Scratch's … (G-Warp's own code)"? **Yes / no.**
2. **L-04 / L-07:** may the "Libraries and fonts" credits and the README license line go to main? (Only you move things to main.)
3. **L-08:** were any G-Warp pictures (sprites, backdrops, mascots, icons) traced or copied from someone else's art, or are they all AI-made / yours? A one-line answer is enough.

## Do-not-promote checklist
- [ ] L-03 label fixed (or kept by owner decision)
- [ ] Credits section on main (L-04)
- [ ] L-08 answered
- [ ] Desktop `lib/` checked before any public .exe (L-11)
