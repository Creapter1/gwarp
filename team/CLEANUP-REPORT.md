# Cleanup report — 2026-11-01

Branch `cleanup-2026-11-01`. Asked by the owner: merge repeated files, make ONE to-do list for the AI team, remove what isn't needed.
Nothing is lost: deleted files stay in git history, and stale files with their own history were **moved** to `team/ai-team/archive/`.

**What was checked:** all 752 files were listed and checked for exact copies (same content hash). Every rule, plan, to-do, status,
assignment, lane, queue and prompt file was read. Big logs (`*/AI-CHAT-LOG.txt`, `AI-TEAM.txt`), the job bank `JOBS-*.txt`, test fixtures,
the archive and the 43 research notes were skimmed (headers, status lines, index check), not read line by line.

**New:** `AI-TEAM-TODO.md` (the one to-do list) · `CLEANUP-REPORT.md` (this file) · `team/ai-team/lanes/LANES.txt` (all 9 lane prompts in one file).

## Merged into `AI-TEAM-TODO.md`, old file moved to `team/ai-team/archive/old-plans/`

| File | Why |
|---|---|
| `TODO.txt` (root) → `archive/old-plans/TODO-root-2026-10-27.txt` | Old main to-do; every open item is now in AI-TEAM-TODO.md. A 5-line `TODO.txt` pointer stays because `docs/*.md` link to it. |
| `team/ai-team/AI-STATUS.txt` → `archive/old-plans/AI-STATUS-2026-10-19.txt` | Status from 10-19 (v15.48); a short current pointer stays because README.md links to it. |
| `team/ai-team/MISSING-LIST.txt` | Scratch/TurboWarp/PenguinMod gap list; open items now in sections 2 and 7. |
| `team/ai-team/CHATGPT-TODO-2026-10-26.txt` | ChatGPT's big list; every job is one line in the new list (keeps the job IDs). |
| `team/ai-team/CONTINUOUS-WORK-QUEUE.txt` | Old queue (10-19), pointed to retired AIs. |
| `team/ai-team/AI-WORK-PLAN.txt` | Old roadmap (10-19); priorities now in the new list. |
| `team/ai-team/CLAUDE-EXECUTION-PLAN-2026-10-18.txt` | Old Claude plan; replaced by `team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md`. |
| `team/ai-team/CLAUDE-CHECKPOINT.txt` | Checkpoint from v15.45/46, long out of date. |
| `team/ai-team/ASSIGNMENTS-2026-10-19.txt`, `ASSIGNMENTS-ANIMATION-2026-10-18.txt` | Old job rounds for retired AIs; open parts are in the new list. |
| `team/ai-team/CHATGPT-HEAVY-2026-10-19.txt`, `CHATGPT-ROUND2-2026-10-19.txt`, `CHATGPT-SPRINT-2026-10-20.txt`, `CHATGPT-WEBSITE-DOCS-2026-10-19.txt`, `TODO-CHATGPT.txt` | Five dated ChatGPT job rounds about the same job list; done parts in "Done", open parts (translations, tutorials) in the new list. |
| `team/ai-team/NEXT-AFTER-v15.49-2026-10-19.txt`, `NEXT-FOR-THE-TEAM-2026-10-19.txt` | Old "next jobs" notes; open items moved. |
| `team/ai-team/TEAM-REASSIGNMENT-2026-10-18.txt` | DeepSeek→Gemini move; both AIs are retired now. |
| `team/ai-team/SPEED-PLAN.txt` | Compiler plan; steps are in section 1 (Engine). |
| `team/ai-team/lanes/AILAB-NEXT-KNOWLEDGE-2026-10-26.txt` | AIM-K1 job brief; the job is done (pack in `team/ai-team/shared/2026-10-26-chatgpt-AIM-K1/`). |
| `team/ai-team/HAIKU-TODO.txt` (deleted, not archived) | Only 5 short jobs (HK1-HK5); all copied into the new list. |

## Moved to `team/ai-team/archive/reviews/` (old reviews, evidence only)

| File | Why |
|---|---|
| `team/ai-team/CROSS-AI-REVIEW-2026-10-15.txt` | First cross-AI review; findings now in the new list. |
| `team/ai-team/SECURITY-AND-CONSISTENCY-AUDIT-2026-10-15.txt` | Security audit; open points (git history scan, AI key preview, model id) in the new list. |
| `team/ai-team/INTEGRATION-STATUS-AUDIT-2026-10-16.txt` | Status check of v15.45; outdated. |
| `team/ai-team/P0-CLONE-FREEZE-REPORT.txt` | Clone-freeze test report; the fix shipped in v15.46.0. |

## Merged (several files about one job → one file)

| File(s) | Why |
|---|---|
| 9 × `team/ai-team/lanes/LANE-L*.txt` → `team/ai-team/lanes/LANES.txt` | Same prompt 9 times with 4 lines changed. `make_lanes.py` now writes the one file; `lanes/README.md` updated. Each lane's text is unchanged inside. |
| `team/ai-team/AI-TEAM.txt` → root `AI-TEAM.txt` | An older, different copy of the work log. Its 7 lines that were missing in the root log (Buffy job lines, 2 old Claude/ChatGPT lines) were added at the bottom of the root log. |
| `team/chatgpt/README.txt` → `team/chatgpt/README.md` | Two indexes of the same folder; the .md already had everything. |

## Deleted (exact copies, pointers, junk)

| File | Why |
|---|---|
| `team/ai-team/AI-DELIVERABLE-INVENTORY.txt`, `AI-PROGRESS-PREVIEW-2026-10-18.txt`, `CLAUDE-PLAN-2026-10-17.txt`, `CLOUD-AI-OPUS-5.5-HANDOFF.txt` | Already empty "archived, see other file" pointers. |
| `team/ai-team/TEAM-2026-10-26.md` | Says itself "superseded by team/ai-team/README.md". |
| `team/ai-team/WORKFLOW-START-HERE.txt` | Old routing file (10-18); replaced by `team/ai-team/README.md`. |
| `team/ai-team/shared/2026-10-26-chatgpt-ANIM-P1/NOTES.md` | Marked "ARCHIVED/SUPERSEDED" with broken links; the 2026-10-27 package replaces it. |
| `team/chatgpt/ANIM-P1-SPEC.md` | Older version of `team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/SPEC.md`. |
| `team/chatgpt/anim-guides.js`, `anim-layers.js`, `anim-motion.js`, `poses.json` | Exact copies of the files in the `team/ai-team/shared/` drop-box packages. Not used by the app. |
| `team/claude/tests/test_gwrap_pack.js`, `test_newblocks.js`, `test_stageclick.js` | Exact copies of the files in `team/claude/tests/regress/` (the ones `run-all.sh` uses). |
| 24 × `team/ai-team/archive/gemini/flipbook-sprites/<name>-<n>.svg` | Exact copies of `flipbook-sprites/<name>/frame<n>.svg` (the folder layout is kept). |
| `team/ai-team/archive/grok/AI-TEAM-RESTORE-BACKUP.txt` | 47-byte placeholder ("See /tmp…"). |
| `team/ai-team/tools/__pycache__/…pyc` | Python cache file; `__pycache__/` added to `.gitignore`. |
| `gwrap_test.png`, `undefined-edit.png`, `undefined-inst.png`, `undefined-song.png` (root) | Test screenshots left at the root by mistake; not used by the site or app (the test re-creates `gwrap_test.png`). |

## Edited (only to point to the new list / new paths)

`README.md` (one added line linking `AI-TEAM-TODO.md`) · `TODO.txt` + `team/ai-team/AI-STATUS.txt` (now short pointers) · `AI-TEAM.txt` (merged lines at the
bottom) · `MERGE-QUEUE.txt` (one path note) · `team/ai-team/README.md`, `CHATGPT-PROMPT-2026-10-26.txt`, `HAIKU-PROMPT-2026-10-26.txt`,
`AI-LAB-PROMPT-2026-10-26.txt`, `CHATGPT-ANIMATION-TODO-2026-10-26.txt`, `lanes/README.md`, `lanes/make_lanes.py`, `team/claude/CLAUDE-NOTES.md › PLAN-NEXT.md`,
`team/claude/CLAUDE-NOTES.md › README.txt` (references to the moved/merged files) · `.gitignore` (`__pycache__/`).

## Kept untouched on purpose

- **Live site + app:** `app.html`, `index.html`, `stats.html`, `gw-stats.js`, `sitemap.xml`, `site/`, `desktop/`, `docs/` (all pages, images,
  screens, tutorials, `.md`), `LICENSE`. (`docs/team.html` already links to old `team/…` paths — left for the website lane.)
- **Research:** all 43 `research/research-how-to-make-*.md` + `RESEARCH-INDEX.md` (index checked: every file listed, no duplicates).
- **Active detail files** the new list points to: `team/ai-team/CHATGPT-JOBS.md › CHATGPT-ANIMATION-TODO-2026-10-26.txt`, `CHATGPT-MUSIC-ICONS-2026-10-26.txt`,
  `CHATGPT-WEBSITE-REDESIGN-2026-10-26.txt`, `CHATGPT-DEEP-RESEARCH-AIM-0.txt`, the prompts, `PERFORMANCE-BENCHMARK-PLAN.txt`, `FUTURE-IDEAS.txt`
  (app.html mentions it), `team/ai-team/ideas/**`, `team/ai-team/chatgpt-jobs/**` (2,474 generated jobs with progress marks), `team/ai-team/phone/**`.
- **Rules / maps / logs:** `team/ai-team/README.md`, `AI-TEAM.txt`, `MERGE-QUEUE.txt`, `ENGINE-MAP.txt`, `STYLE-GUIDE.txt`, every `AI-CHAT-LOG.txt`, `team/ai-team/agents/buffy/`.
- **Code, tests, art, data:** `team/claude/*.js`, `team/claude/tests/**`, `team/chatgpt/*.js` (some are merged into the app), `team/ai-team/tools/**`,
  `team/ai-team/gwrap-blocks.json`, `team/ai-team/ui-strings-en.json`, `team/ai-team/stats/`, all drop-box packages in `team/ai-team/shared/` (except the superseded one above).
- **Archive:** `team/ai-team/archive/gemini|grok|deepseek|old-plans` (app.html and `docs/blocks.html` point into it).
- **ChatGPT's reviews** in `team/chatgpt/` (evidence) and `team/claude/` reviews (sources for the missing list).


## Pass 2 (1 Nov 2026, Claude) – fewer files, clean front page
| What | Why |
|---|---|
| 31 ChatGPT notes/reviews/logs (chatgpt/*.txt, *.md, jobs/*.md) → `team/chatgpt/CHATGPT-NOTES.md` | one file per AI (owner request); every old file is a section |
| 14 ChatGPT job files (ai-team/CHATGPT-*.txt + chatgpt-jobs/) → `team/ai-team/CHATGPT-JOBS.md` | same; generator moved to `team/ai-team/tools/make_jobs.py` |
| 8 Claude notes (PLAN-NEXT.md first, *.txt, haiku/README.txt) → `team/claude/CLAUDE-NOTES.md` | same; code (.js), tests/, experiments/ unchanged |
| chatgpt/USER-GUIDE.txt, chatgpt/SCREENSHOT-UI-DOCUMENTATION.md → `docs/` | they are user documentation |
| undefined-edit/inst/song.png (root, deleted in pass 1) → `docs/images/sounds-edit-sound.png`, `sounds-instruments.png`, `sounds-song-maker.png`, shown on docs/sounds.html | real Sounds-tab screenshots, now used in the docs |
| AI-TEAM*.txt/md, CLEANUP-REPORT, ENGINE-MAP, MERGE-QUEUE, STYLE-GUIDE, TODO.txt, ai-team/, chatgpt/, claude/ → `team/` | clean front page; links updated in 98 files, 0 new broken links |

## Pass 3 (1 Nov 2026, Claude) – only two branches: main + ai-team
| Old branch | What was kept (in this ai-team branch) | Archive tag (full history kept) |
|---|---|---|
| chatgpt/clone-limit-warning, chatgpt/clone-limit-warning-v2 | notes appended to team/chatgpt/CHATGPT-NOTES.md; 8 proposal modules → team/chatgpt/*.js (clone-limit, frame-budget, crash-recovery-offer, stop-clone-cleanup, stuck-script-choice, open-scratch-link, text-list-limits). Their old copies of app.html/index.html/README were NOT taken (outdated). | archive/chatgpt-clone-limit-warning, archive/chatgpt-clone-limit-warning-v2 |
| chatgpt/l8-art-art-001 | ART-001 hero kid options A/B/C + preview → team/ai-team/shared/2026-10-26-chatgpt-ART-001/, lane log → team/chatgpt/lanes/L8-ART/ | archive/chatgpt-l8-art-art-001 |
| ollama-work | bug report → team/bugs/BUG-20261027-1349-background-music-does-not-play.md | archive/ollama-work |
