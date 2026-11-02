# ChatGPT – all notes, reviews and logs in ONE file
(Merged on 1 Nov 2026 from 31 separate files. Each section = one old file. Code files (.js) stay in this folder.)

## Contents
- AI-CHAT-LOG.txt
- BUFFY-ADDONS-SETTINGS-REVIEW-2026-10-18.txt
- CLOUD-AI-LIVE-VERIFICATION-NOTE.txt
- COMPARE-TURBOWARP-PENGUINMOD-GWARP-2026-10-26.md
- COMPILER-REVIEW-2026-10-18.txt
- COMPILER-REVIEW-2026-10-19.txt
- MERGE-QUEUE-NOTES.txt
- NOTES-addons-pack.txt
- NOTES-clone-safety.txt
- NOTES-gwrap-ai-pack.txt
- NOTES-scratch-link.txt
- NOTES-settings-ui-fix.txt
- NOTES-tutorial-and-ideas.txt
- OWNER-REVIEW-STATUS-2026-10-19.txt
- REVIEW-AI-CHAT-LOG-COVERAGE-2026-10-23.txt
- REVIEW-AI-KEY-CONTEXT-SECURITY-2026-10-19.txt
- REVIEW-GEMINI-ANIMATION-LAB-2026-10-19.txt
- REVIEW-GEMINI-COSTUME-CANDIDATES-2026-10-19.txt
- REVIEW-GROK-EXPECTED-RESULTS-2026-10-19.txt
- REVIEW-PMP-PROTOBUF-LOADER-2026-10-19.txt
- REVIEW-SCRATCH-LINK-EXTENSION-2026-10-19.txt
- REVIEW-clone-safety-2026-10-19.txt
- REVIEW-costume-animation.txt
- UI-AUDIT.txt
- UX-costume-animation.txt
- VERIFICATION-2026-10-19.txt
- WEBSITE-OPEN-QUESTIONS.txt
- JOBS-BLOCKS-BLK-0001-PAR-BLK-0002-AI.md
- JOBS-BLOCKS-BLK-0003-PAR-BLK-0004-AI.md
- JOBS-BLOCKS-BLK-0007-PAR-BLK-0008-AI.md
- JOBS-BLOCKS-BLK-0009-PAR-BLK-0010-AI.md


---
## AI-CHAT-LOG.txt

G-WARP CHATGPT CONTEXT LOG
Append-only record. Do not put credentials or unrelated sensitive information here.

--- ENTRY ---
Date: 2026-10-17 (America/New_York)
AI: ChatGPT (active model identity not independently verified from repository)
Task: Establish a mandatory chat-context preservation rule for all AI contributors.

USER REQUEST (verbatim):
"this gemini stuf. ok new rule because it may create memory remuval so in oder to prevent it from hapinig all ai in there folder well add the caht user recuest and response. some ai like you well delite the firt ting wi talck to make space for more chat room so yes i need all ai to not alusinate or forget or create sonting alse because memory chat is gone."

AI RESPONSE / ACTION:
Agreed to establish a durable per-AI conversation log rule. Added team/AI-CHAT-LOG-TEMPLATE.txt and updated AI-TEAM.txt, TODO.txt, and team/AI-WORK-PLAN.txt to require every AI to keep an append-only AI-CHAT-LOG.txt in its own folder, preserve user requests and AI responses/handoffs, record evidence status and next steps, read the log before resuming, and mark missing original chat honestly rather than reconstructing it. The rule does not grant permission to edit another AI's folder or bypass integration/owner-approval gates.

FILES CHANGED:
- team/AI-CHAT-LOG-TEMPLATE.txt — created.
- AI-TEAM.txt — added required rule and work-log entry.
- TODO.txt — added required rule.
- team/AI-WORK-PLAN.txt — added required rule.
- No app.html or index.html changes.

EVIDENCE / TEST STATUS:
- SOURCE-VERIFIED: GitHub file-write operations returned commit SHAs for the four changes above.
- NOT-TESTED: no app/browser behavior was tested; this is a documentation/governance change.

BLOCKERS / UNCERTAINTIES:
- Other AI folders must create/update their own AI-CHAT-LOG.txt when those AIs next work; ChatGPT should not edit their folders.
- This entry records the current request, not the full historical Gemini conversation or all earlier discussions.

NEXT STEP / HANDOFF:
- Each AI must create its own AI-CHAT-LOG.txt and append this rule to its normal task workflow. Review Gemini's delivered artifacts separately; do not assume the uploaded ZIP contains the original chat transcript.

CHAT HISTORY COMPLETENESS:
PARTIAL — this entry covers this task only.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-17 (America/New_York)
AI: ChatGPT
Task: Review uploaded Buffy add-ons/settings ZIP and hand the findings to DeepSeek for follow-up.

USER REQUEST (verbatim):
"well this is deap seack stuf so go head and do your tin"
Follow-up user request (verbatim):
"ok add the stuf to the deap seack the is his head off"

AI RESPONSE / ACTION:
Inspected the uploaded archive Buffy-2026-10-17-addons-settings.zip. The archive includes settings-ui-fix.js, addons-pack.js, their notes, and handoff/task documents. Both JavaScript candidates passed Node syntax validation, which does not establish browser correctness. Static review flagged incomplete teardown in settings-ui-fix.js, interval/MutationObserver cleanup concerns in addons-pack.js, possible stale pause toast state, unverified sprite-grid ordering assumptions, reset/save synchronization risk, and brittle block-counter selectors. The archive labels the work Buffy; authorship is not independently verified. Created deepseek/BUFFY-ADDONS-SETTINGS-REVIEW.txt as an explicit handoff asking DeepSeek to verify evidence, test lifecycle behavior, and provide corrections in its own folder. No app.html/index.html integration was performed.

FILES CHANGED:
- deepseek/BUFFY-ADDONS-SETTINGS-REVIEW.txt — created (commit a0672f05c6f0460bddc762e4d3cf9178e3745e00).
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — append this record.
- No app.html or index.html changes.

EVIDENCE / TEST STATUS:
- Syntax validation: PASS for both candidate JS files using Node.
- Static review: performed against candidate code from uploaded ZIP.
- Browser/end-to-end: NOT TESTED.
- Integration: NOT DONE.
- Attribution: archive's included AI-TEAM.txt credits Buffy; not independently authenticated.

BLOCKERS / UNCERTAINTIES:
- DeepSeek must verify all findings against the actual current app source and record line-level evidence.
- No browser runtime test was run.
- This handoff does not establish that DeepSeek authored the ZIP content.

NEXT STEP / HANDOFF:
DeepSeek should read the repository rules and its task list, inspect the handoff, verify or reject each finding with evidence, and provide safe A/B/C candidates only if appropriate under team/TODO-DEEPSEEK.txt. Do not integrate into app.html; Claude remains the authorized integration lead.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this ZIP review and handoff only.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-18 (America/New_York)
AI: ChatGPT
Task: Preview all AI work and prepare Claude's token-efficient execution plan.

USER REQUEST (verbatim):
"Do a preview of all Ai worck and add the claude plan 😉  because he gona be only soom 😎 he need all the plan all to be ready for action pls add the perfect wat to do and plan for claude so he can do worck and not over tink and not waste tokens like creazy"

AI RESPONSE / ACTION:
Reviewed current repository governance, task lists, merge queue, AI deliverable inventory, integration-status audit, DeepSeek handoff, and role/task documents. Created a concise all-AI progress preview and a detailed staged Claude execution plan designed to reduce redundant research and token use. The Claude plan prioritizes active-model verification, owner approval, known-good baseline, safe reproduction of the reported freeze/Stop issue, one candidate at a time, risk-based tests, clear evidence labels, rollback, and staged follow-up for costumes, file loading/links, behavior tests, extension security and assets. Linked both new documents from team/AI-WORK-PLAN.txt and added a summary entry to AI-TEAM.txt.

FILES CHANGED:
- team/AI-PROGRESS-PREVIEW-2026-10-18.txt — created.
- team/CLAUDE-EXECUTION-PLAN-2026-10-18.txt — created.
- team/AI-WORK-PLAN.txt — linked the two documents.
- AI-TEAM.txt — added a work-log summary.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — append this record.
- No app.html/index.html changes.

EVIDENCE / TEST STATUS:
- GitHub create/update operations returned commit SHAs.
- Status preview is based on repository documents and prior reports, not a fresh runtime audit.
- NOT TESTED: no browser/runtime tests were performed for this planning task.

BLOCKERS / UNCERTAINTIES:
- Owner must confirm canonical live website URL and known-good baseline if deployment differs.
- Claude must verify the active interface model label exactly matches “Claude Opus 5.5” and receive owner approval before live integration/release.
- Prior app.html/index.html hashes are historical audit evidence, not proof of current runtime behavior.

NEXT STEP / HANDOFF:
Claude should start with team/CLAUDE-EXECUTION-PLAN-2026-10-18.txt, perform read-only baseline verification, then reproduce and measure the freeze/Stop issue in a safe test copy before choosing a minimal candidate. Do not merge everything at once.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this planning task only.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-18 (America/New_York)
AI: ChatGPT
Task: Re-verify Buffy-labelled settings/add-ons ZIP and correct contributor attribution.

USER REQUEST (verbatim):
"Go head and verified the zip and if contain sonting from gemini put it on gemini files if not add this to your files as your. Off corse if this is good it have the rules so 🤷"

Context clarification from user:
"Gemini new model is on it to to the is why wen I give you the zip I say gemini."

AI RESPONSE / ACTION:
Re-opened and inspected /mnt/data/Buffy-2026-10-17-addons-settings.zip. SHA-256: f7d8ae3ff5cf7db085cb3f15965de6e93fc3f347a2b24b3324d008e7ce7e56ad. The archive contains settings-ui-fix.js and addons-pack.js under chatgpt\\ paths, notes whose headers label the work Buffy, plus general AI-TEAM.txt / TODO-GEMINI.txt context. This does not prove Gemini authored the code or establish the exact model provenance. The archive’s internal paths and labels support tracking it as a Buffy-labelled submission in the ChatGPT lane, not as Gemini or DeepSeek work.

Both JS files were extracted and passed Node --check syntax validation. Static inspection identified likely lifecycle cleanup defects (untracked interval, MutationObserver and keydown listener in addons-pack.js; lingering listeners and incomplete DOM restoration/re-enable behavior in settings-ui-fix.js), possible stale pause toast, sprite-order assumptions, and Reset controls not dispatching change events for checkboxes. The ZIP notes claim prior harness tests, but those were not independently reproduced in this review. No browser tests or integration were performed.

FILES CHANGED:
- team/chatgpt/CHATGPT-NOTES.md › BUFFY-ADDONS-SETTINGS-REVIEW-2026-10-18.txt — created (commit 7659dc7670a01d0cede6c17bef509ee033239785).
- team/AI-PROGRESS-PREVIEW-2026-10-18.txt — corrected attribution and current status (commit b76c9c9ba83e377132cd951110d0c774dea4f359).
- No app.html/index.html changes.
- The candidate JS source files themselves have NOT yet been copied into the repository; this commit records the review, not source import.

CORRECTION TO PRIOR ENTRY:
The 2026-10-17 entry routed a review handoff to deepseek/ based on the user's initial mistaken attribution. That was incorrect routing. This new review is the current attribution record. Because the folder ownership rule says not to edit another AI's folder, ChatGPT did not delete or rewrite the earlier deepseek handoff; it should be considered misrouted and not evidence of DeepSeek authorship.

EVIDENCE / TEST STATUS:
- SOURCE-VERIFIED: ZIP inventory and actual candidate source text inspected.
- SYNTAX-VERIFIED: both files pass Node syntax validation.
- STATIC-ANALYSIS: review findings listed in team/chatgpt/CHATGPT-NOTES.md › BUFFY-ADDONS-SETTINGS-REVIEW-2026-10-18.txt.
- BROWSER-VERIFIED: NO.
- INTEGRATED: NO.

BLOCKERS / UNCERTAINTIES:
- Exact model provenance and whether the submission was generated by Gemini's newer model cannot be proven from the archive contents alone.
- Candidate source is not imported into GitHub yet.
- Claude must test lifecycle, re-enable, dialog reset/save, sprite order, pause state, and viewport behavior in a disposable copy before any integration.

NEXT STEP / HANDOFF:
Keep the review in team/chatgpt/ as an independent reviewer record. Do not place this ZIP under gemini/ unless the owner provides provenance establishing it is a Gemini deliverable. Keep app.html/index.html untouched; Claude remains the only official integrator after the required model/owner approval gates.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this ZIP verification/correction only.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-18 (America/New_York)
AI: ChatGPT
Task: Research official Claude token/context guidance and simplify the G-Warp Claude plan for 2+ hours of productive work.

USER REQUEST (verbatim):
"Well the plan need ubdate the more lest token the claude use the better if you want this is out side the worck sone but look online how and what to give claude so is lest token so the plan is simple and it can worck for long time at minimum 2h or more if possible"

RESEARCH:
Consulted Anthropic official guidance:
- Claude Help Center, “Models, usage, and limits in Claude Code”: https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code
- Claude Help Center, “Give Claude context: CLAUDE.md and better prompts”: https://support.claude.com/en/articles/14553240-give-claude-context-claude-md-and-better-prompts
- Anthropic docs, context windows: https://platform.claude.com/docs/en/build-with-claude/context-windows
- Anthropic prompt best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

ACTION:
Replaced the long Claude execution plan with a leaner v2.0 low-token, long-run workflow. It specifies a fixed small read-first set, narrow source inspection, one bounded task at a time, minimal fixes, cheap checks before targeted tests, no repeated broad audits, checkpoints before context/session ends, /clear between independent tasks and /compact for continuing tasks when using Claude Code, and a flexible 2-hour schedule with no padding. It prioritizes the reported freeze/Stop issue, then existing candidate tests only when ready. The plan explicitly notes that commands depend on the active Claude interface and that long sessions depend on available usage/permissions. Linked the plan and checkpoint requirement from team/AI-WORK-PLAN.txt.

FILES CHANGED:
- team/CLAUDE-EXECUTION-PLAN-2026-10-18.txt — replaced with v2.0 (commit 74ca1e99a5928f4901a313af482415cccc8904a3).
- team/AI-WORK-PLAN.txt — updated execution reference and checkpoint requirement (commit fb25dfdb95b8f1330c2d1db7a2043f822fc10468).
- No app.html/index.html changes.
- team/CLAUDE-CHECKPOINT.txt has not been created yet; Claude should initialize it from actual baseline evidence at the start of work.

EVIDENCE / TEST STATUS:
- Official web research completed; links above.
- GitHub update operations returned commit SHAs.
- Documentation-only change; no browser/runtime tests performed.

NEXT STEP:
Claude should use team/CLAUDE-EXECUTION-PLAN-2026-10-18.txt v2.0, verify the active model and owner-approval gates, establish the actual baseline, initialize the checkpoint, then start P0 reproduction/measurement without rereading every report.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-18 (America/New_York)
AI: ChatGPT
Task: Final workflow cleanup, duplicate-document reduction, and Claude handoff preparation.

USER REQUESTS (verbatim):
"Yee know I need to wait it'll 3pm so claud do he's ting so log off a wait time. We'll do a last review pls and organize the worck flow pls remove repited stof and file and add them in single txt if needed to avoid some confusion pls I checked and is a mess"
"If you need more time to complete the cleaning process go head"

CHANGES COMPLETED:
- Added team/WORKFLOW-START-HERE.txt as the single routing entry point.
- Added team/AI-STATUS.txt as the compact current cross-team status and owner handoff.
- Created team/CLAUDE-CHECKPOINT.txt with GitHub metadata only; Claude must reverify the actual working-copy baseline and replace it with real test evidence.
- Condensed team/AI-WORK-PLAN.txt from about 29 KB to about 5.9 KB and shortened team/CONTINUOUS-WORK-QUEUE.txt from about 11.7 KB to about 7.8 KB.
- Updated team/CLAUDE-EXECUTION-PLAN-2026-10-18.txt to v2.1 for current status/checkpoint routing and reduced repeated-read cost.
- Marked team/CLAUDE-PLAN-2026-10-17.txt and team/CLOUD-AI-OPUS-5.5-HANDOFF.txt as historical pointers; kept the unique prior wrong-model incident explicitly labelled owner-reported, not independently verified.
- Repaired AI-TEAM.txt's malformed escaped log line and restored the missing G5 completion log entry from the recovery instructions.
- Folded unique notes from team/chatgpt/README.txt into team/chatgpt/README.md and deleted the duplicate README.txt.
- Turned team/AI-DELIVERABLE-INVENTORY.txt and team/AI-PROGRESS-PREVIEW-2026-10-18.txt into short pointers; prior snapshot contents remain in Git history.
- Updated TODO.txt, README.md and team/README.txt to use the current workflow/status sources and distinguish delivered static audits from pending runtime acceptance.
- Did not edit another AI's folder. Identified but left grok/AI-TEAM-RESTORE-BACKUP.txt (a 47-byte placeholder) and deepseek/BUFFY-ADDONS-SETTINGS-REVIEW.txt (a misrouted copy) for their folder owner/the repository owner.

SOURCE / TEST STATUS:
- GitHub main metadata was rechecked after the docs-only cleanup. app.html blob remains 7ce527ca2908c63bbdfe642856ca29fd82178648 (2,327,544 bytes); index.html remains d8cf02962b20c0379a51aab7d46d829925325dbd (586,179 bytes).
- No app.html/index.html edits, browser/runtime tests, integration, or deployment were performed.
- The 81,000-clone/~45-second Stop symptom remains reported, not reproduced.
- Current Claude plan is team/CLAUDE-EXECUTION-PLAN-2026-10-18.txt v2.1. Claude must verify active model label exactly "Claude Opus 5.5", confirm owner-authorized scope, recheck actual working-copy baseline, then prioritize P0 reproduction/measurement.
- Canonical website URL remains pending owner confirmation.
- Evidence class: SOURCE-REPOSITORY-METADATA VERIFIED for the recorded GitHub blob IDs; STATIC/DOCUMENTATION CLEANUP only; runtime NOT TESTED.

NEXT STEP:
Use team/WORKFLOW-START-HERE.txt, team/AI-STATUS.txt and team/CLAUDE-CHECKPOINT.txt. Claude must replace the preliminary checkpoint after verifying its real branch/baseline and recording actual tests. Do not reread archived snapshots or touch app.html/index.html without explicit authorization.
--- END ENTRY ---


--- ADDENDUM ---
Date: 2026-10-18 (America/New_York)
Task: Final queue deduplication follow-up.
Correction/update to the cleanup entry above: team/CONTINUOUS-WORK-QUEUE.txt was reduced again from about 7.8 KB to about 4.6 KB (4,641 characters). Duplicate task IDs/descriptions were removed from the shared queue; contributor-specific numbered tasks now live in the corresponding team/TODO-CHATGPT.txt, team/TODO-GROK.txt, team/TODO-DEEPSEEK.txt, or team/TODO-GEMINI.txt. The shared queue holds cross-team dependencies, the P0 freeze/Stop priority, and model/owner gates.
No app.html/index.html edit, integration, deployment or runtime test was performed.
--- END ADDENDUM ---


--- ADDENDUM ---
Date: 2026-10-18 (America/New_York)
Final cross-reference pass:
- Removed the contradictory “(NEXT)” label from Grok's completed G5 item in team/TODO-GROK.txt.
- Updated team/TODO-CHATGPT.txt to use the workflow/status entry point, correct same-folder report paths, and root-relative ENGINE-MAP/MERGE-QUEUE paths.
- Updated the public README roadmap to state that the static UI audit is delivered but full runtime parity and costume editor acceptance remain pending.
- Rechecked the workflow links; no app source files were changed and no runtime tests were run.
--- END ADDENDUM ---


--- ENTRY ---
Date: 2026-10-18 (America/New_York)
AI: ChatGPT
Task: Compare the clone-safety proposal with Cloud/Claude's latest work; begin assigned compiler-plan review and answer the CPU/GPU architecture question.

USER REQUEST SUMMARY:
The owner said Cloud/Claude had returned and was already working; asked me to compare the clone-related work and avoid duplicating features already integrated. The owner also asked whether G-Warp should use JavaScript compilation and CPU/GPU rendering for performance, and requested planning/review of the idea.

FINDINGS:
- Current GitHub main is Beta v15.46.4 (observed HEAD 7d82a447a1c1a519e3c0446fcefac1592e955215; app.html blob 7b22b5327369cf68cf9be147813109c4b6cffed1).
- team/MERGE-QUEUE.txt explicitly marks team/chatgpt/clone-safety.js SUPERSEDED by Claude's v15.46 clone fixes. I did not integrate or delete it; the queue is Claude-maintained and the candidate remains useful as historical/audit material.
- Claude's team/SPEED-PLAN.txt attributes remaining slowdown to interpreter overhead and repeated DOM/expression work; its next concrete step is statement caching, followed by expression caching and gradual compilation with interpreter fallback. No concrete statement-cache/compiler patch was found in the inspected current history.
- Static review flags cache invalidation, edits while running, exact Scratch behavior, thread state, fallback behavior, generated-code safety, cache lifetime and before/after benchmarks as acceptance gates.
- The browser already uses the device CPU and browser rendering stack. JavaScript compilation is the first performance priority; GPU/WebGL/WebGPU rendering is a separate project and will not itself fix interpreter overhead.

CHANGES:
- Created team/chatgpt/CHATGPT-NOTES.md › COMPILER-REVIEW-2026-10-18.txt.
- Appended this task and evidence boundary to AI-TEAM.txt and this log.
- No app.html/index.html edit, code integration, browser/runtime test or deployment was performed by ChatGPT. Clone/compiler runtime evidence cited in source reports is Claude-reported, not independently reproduced here.

NEXT:
Re-review when Claude lands the actual statement-cache implementation. Check the cache invalidation mechanism against the current source and verify the reported before/after benchmark and the high-risk behavior fixtures.
--- END ENTRY ---


2026-10-18 | TEAM REASSIGNMENT + CLONE CODE PROVENANCE REVIEW
USER REQUEST (accurate summary): Owner is retiring DeepSeek from the active Discord/project workflow because of repeated tracking friction, unreliable tabs/404s, and the effort needed to monitor it. Gemini, accessed through FreeBuff / Argon (owner refers to the new Gemini/Gemini 2), will take over all DeepSeek lab/research/A-B/C/test-harness duties while keeping Gemini's prior visuals and extension responsibilities. Owner asked to combine the folders and rules, clean up the repository, preserve context across AIs, and clarify whether Claude reused ChatGPT's clone code.
RESPONSE / WORK: Updated AI-TEAM.txt and TODO.txt; unified team/TODO-GEMINI.txt; retired team/TODO-DEEPSEEK.txt and the return-handoff template; updated both assignment sheets, the shared queue, roadmap, current team status and ChatGPT task routing. Migrated 28 prior deepseek/* artifacts into gemini/lab/ with filenames preserved; left deepseek/README-ARCHIVE.txt as a pointer. Added Gemini workspace/lab readmes and gemini/lab/LEGACY-TODO-DEEPSEEK-2026-10-18.txt. No app.html/index.html edits.
CLONE PROVENANCE REVIEW — STATIC SOURCE/DIFF REVIEW (not an authorship interview):
- team/chatgpt/clone-safety.js is still a disconnected candidate. Its notes explicitly say PARTIAL, not wired into app.html, and not browser-tested.
- GitHub diff for Claude's release commit 33be70dd964b392aece6ae4797363313f6d10d45 shows a different implementation: Claude adds GW.cloneCount() with Engine.__nc/Engine.__ncArr/Engine.__ncLen, uses GW.CLONE_CEILING (5000), and patches the existing GW.createClone rather than loading/replacing it with team/chatgpt/clone-safety.js's optimizedCreateClone module. Claude's patch also contains the frame budget, watchdog, text/list caps, crash recovery, faster sound restart and computed-menu work that are not implemented by clone-safety.js.
- Conclusion: the current GitHub diff does not show a direct paste/reuse of the ChatGPT clone-safety.js implementation. There is conceptual overlap (O(1) clone counting, default 300 limit and 5000 ceiling / safer Stop are shared goals), but this static comparison cannot prove whether Claude saw the candidate or was influenced by its ideas. Do not claim certainty about private chat history.
EVIDENCE: SOURCE/DIFF REVIEW of team/chatgpt/clone-safety.js, team/chatgpt/CHATGPT-NOTES.md › NOTES-clone-safety.txt, team/P0-CLONE-FREEZE-REPORT.txt, and Claude release commit diff; not a fresh browser test.
BLOCKERS / OPEN: Merge queue is Claude-owned, so send recommended status/path changes as team/chatgpt/CHATGPT-NOTES.md › MERGE-QUEUE-NOTES.txt instead of editing it. Legacy costume candidate and protobuf loader remain blocked until the documented source/canvas and parser/fixture tests pass. Existing clone variants marked SUPERSEDED remain so unless Claude reauthorizes.
NEXT: Reconcile remaining current (non-historical) path references if any; report exact moved paths and commit(s). Keep all future ChatGPT notes in team/chatgpt/ and do not edit Gemini's candidate files directly.


USER WORDING (voice transcript, preserved verbatim as available in this conversation):
"So based on what I'm seeing, I'm gonna have to remove two teammates out of Discord room. Technically, technically only one, but for now I might have to do it. So Gemini is gonna remain, but DeepSeek might have to go. Not because I want to remove him or anything, it's just the moving forward and back and forward and back, which is very annoying, and DeepSeek is honestly very weird to open on the website. I have no idea why. I just don't. I really cannot tell you. So I'm gonna be using the app name FreeBuff. FreeBuff is gonna allow me to use Gemini for Argon, which is the new Gemini, okay? From here, Gemini is gonna focus on what DeepSeek does and at the same time Gemini stuff do, since Argon supposedly is able to connect to GitHub, but it doesn't work. I'm gonna make him just give you the download folder for Gemini and just gonna give you all. So let's do the repository and everything that DeepSeek is supposed to do, and everything else is no longer gonna be DeepSeek anymore. It's gonna be the job of Gemini 2, okay? Reason why I change? I found DeepSeek, but it's very hard to keep in track. So I'm gonna remove him out of the team.Not because I want to, it's because I have to. Because it's very hard to keep track of him on the tab open and not working and 404 comes up and yada yada yada. It's just a very big dilemma. So I'm just gonna remove it to make it easier, at least for me. I didn't want to do that, but at the same time I have to. Because keeping track of every single one of the AIs working and making sure they all work properly is very exhausting, and at the same time, Cloud. Cloud. I don't know if when he added the clone stuff, whether he used your thing, do the test, although he did the report, apparently. I don't know if he's using some of the codes, improving it, or just grabbing all the extra codes. Those things I do not know, so I cannot really tell. But for now, let's do that. I didn't want to, but we're gonna have to."

2026-10-19 | REPOSITORY-WIDE VERIFICATION — FOLLOW-UP PASS
USER REQUEST: "do a verification on all the worck"
AI RESPONSE / WORK:
- Rechecked current main tree, commit history, migrated file paths and blob hashes, current app/index source hashes, team role/task references, test runner inputs, fixture JSON, reported test logs, and stale merge-queue routes.
- Created team/chatgpt/CHATGPT-NOTES.md › VERIFICATION-2026-10-19.txt and refreshed team/AI-STATUS.txt, TODO.txt, team/CONTINUOUS-WORK-QUEUE.txt, team/AI-WORK-PLAN.txt, and team/chatgpt/CHATGPT-NOTES.md › MERGE-QUEUE-NOTES.txt to reflect the newer evidence.
- Migration remains source-verified: deepseek/ contains only README-ARCHIVE.txt; 28 former files are under gemini/lab/, 25 with original blobs unchanged, 3 lab docs updated for provenance/path clarity.
- Current source is Beta v15.48.0 (app.html blob 5ca624a515b9fc1310814c4740608c1cf3071028; index.html blob 88b8d46aeaa2056828a0d445b82649a0c5ed986f). ChatGPT did not modify these source files.
LATEST EVIDENCE:
- AI-TEAM work log records Claude's full v15.48.0 regression as 429 PASS / 9 FAIL, with all nine described as expected legacy/feature-status checks. This is REPORTED TEST evidence; ChatGPT did not run the suite.
- Grok fixed T043 to expect 3 iterations in grok/fixtures.json and expanded the file to 60 cases. grok/FIXTURE-SOURCES.txt still says 2 iterations / old 30-case count.
- grok/fixtures-extra-list.json contains T130-T139 (10 cases); team/TODO-GROK.txt says Claude is waiting on a current 60+10 run. Current team/claude/tests/test_grok_fixtures.js loads the 60 base cases plus team/claude/tests/extra-fixtures.json (9 cases), not fixtures-extra-list.json. The prior 39/39 applies to the older 30+9 set, not the intended current set.
- team/TODO-GEMINI.txt now directs first to team/GEMINI-BIG-LIST-2026-10-19.txt labeled "Gemini 3 (Argon)", while AI-TEAM roster still labels the role "Gemini 2 (FreeBuff/Argon)". Work remains in one gemini/ workspace; owner confirmation of the preferred label is needed.
- root MERGE-QUEUE.txt still has stale deepseek/ paths and retired task wording. It is Claude-owned; recommendations remain in team/chatgpt/CHATGPT-NOTES.md › MERGE-QUEUE-NOTES.txt.
EVIDENCE BOUNDARY: GitHub tree/blob/source/diff review only. No ChatGPT browser/runtime tests. Local clone failed because this environment could not resolve github.com.
OPEN NEXT STEPS:
1. Grok: update the stale T043 lines/current 60-case count in grok/FIXTURE-SOURCES.txt.
2. Claude: reconcile test_grok_fixtures.js to run the intended 60 base + 10 T130-T139 cases; record the exact result and update the merge queue.
3. Claude: confirm the 429/9 full regression failure names; confirm the three latest Select assertions were exercised by the current regression.
4. Gemini: follow the current big-list assignment under the unified gemini/ workspace and log its own real work; do not claim inherited lab candidates as new Gemini-authored code.
5. Owner: confirm whether the unified role's canonical label should be Gemini 2 (FreeBuff/Argon) or Gemini 3 (Argon).
--- END ENTRY ---

2026-10-19 | FINAL CONSISTENCY PASS
- Follow-up verification found the earlier T043 finding had become stale after Grok's update: grok/fixtures.json now has T043 expect 3 and 60 total cases. grok/FIXTURE-SOURCES.txt remains stale at 2 iterations / 30 cases. Separate grok/fixtures-extra-list.json contains T130-T139 (10 cases), but the current runner does not load that file; the 60+10 run remains pending.
- AI-TEAM.txt records Claude's full current Beta v15.48.0 regression: 429 PASS, 9 FAIL, all described as expected legacy/feature-status checks. Treat this as REPORTED TEST, not an independent ChatGPT result. No direct per-test output for the three new shape-handle assertions was independently captured.
- Updated team/chatgpt/CHATGPT-NOTES.md › VERIFICATION-2026-10-19.txt, TODO.txt, team/AI-STATUS.txt, team/CONTINUOUS-WORK-QUEUE.txt, team/AI-WORK-PLAN.txt and team/chatgpt/CHATGPT-NOTES.md › MERGE-QUEUE-NOTES.txt to distinguish the current 60-case source, the stale source map, the separate 10-case file, and the outstanding runner reconciliation.
- Updated team/TODO-GEMINI.txt to make the new team/GEMINI-BIG-LIST-2026-10-19.txt priority authoritative and map its G1/G3/L1-L3 overlap to older GA-M1/GA-M2/GL1-GL3 jobs. This prevents duplicate versions of the same deliverable.
- The newest assignment lists “Gemini 3 (Argon)” while AI-TEAM roster says “Gemini 2 (FreeBuff/Argon)”; the workspace remains gemini/. Owner confirmation needed for canonical role label.
- The Big List header repeats the old GitHub Pages URL while TODO.txt says canonical URL awaits owner confirmation; do not change extension targets/links without confirmation.
- Added a correction addendum to gemini/AI-CHAT-LOG.txt and a further review line to AI-TEAM.txt. Those changes are documentation only.
- Evidence remains GitHub source/tree/diff review. ChatGPT did not run browser tests; app.html/index.html hashes remain unchanged by ChatGPT.

2026-10-19 | FINAL TREE VERIFICATION AFTER DOCUMENT UPDATES
- Latest source-tree check shows app.html blob 5ca624a515b9fc1310814c4740608c1cf3071028 (Beta v15.48.0) and index.html blob 88b8d46aeaa2056828a0d445b82649a0c5ed986f unchanged through this verification.
- deepseek/ still contains only README-ARCHIVE.txt. gemini/lab/ contains 28 migrated legacy files plus its README and archived task list. The 28 original deepseek-file names all have matching destinations; 25 remain byte-identical; 3 text docs have intentional provenance/path edits.
- Current grok/fixtures.json parses as valid JSON with 60 unique cases; T043 expects 3 and notes Math.round. grok/fixtures-extra-list.json parses as valid JSON with 10 unique IDs T130-T139. grok/FIXTURE-SOURCES.txt still says T043 -> 2 and still describes 30 cases. Current team/claude/tests/test_grok_fixtures.js does not reference fixtures-extra-list.json, so current 60+10 parity coverage is not yet proven.
- team/TODO-GEMINI.txt now says the new Big List order is authoritative and maps duplicated task IDs (G1/G3/L1-L3) to prior GA-M1/GA-M2/GL1-GL3 tasks, preventing duplicate output. Old GM7/GM8 and inherited GL4/GL5 remain subsequent backlog tasks.
- team/AI-STATUS.txt, team/CONTINUOUS-WORK-QUEUE.txt, team/AI-WORK-PLAN.txt, TODO.txt, team/chatgpt/CHATGPT-NOTES.md › MERGE-QUEUE-NOTES.txt and team/chatgpt/CHATGPT-NOTES.md › VERIFICATION-2026-10-19.txt were reconciled to current evidence. AI-TEAM.txt has a final REVIEWED log entry.
- Remaining unresolved owner-level consistency: AI-TEAM says Gemini 2 (FreeBuff/Argon) while the new assignment says Gemini 3 (Argon); the single workspace is gemini/. The new Big List repeats the legacy GitHub Pages URL although TODO still awaits canonical URL confirmation. Neither issue was guessed or silently changed.
- Verification remains static source/tree/document review only. No browser/runtime suite was run by ChatGPT.


2026-10-19 | WEBSITE + DOCS DELIVERY PASS 1
USER REQUEST / CONTEXT: Owner said “Continue” under the shared rule that this means reread current files and continue the assigned task. Current authoritative assignment is team/CHATGPT-WEBSITE-DOCS-2026-10-19.txt (Claude/owner assignment): extend website and add practical docs pages; preserve G-Warp's own dark/violet/electric-green style; never edit app.html; test links; log handoff.
CHANGED FILES:
- index.html: added links to the new docs home, six Beta v15.48.0 feature cards and a 10-question FAQ. Latest commit from this file update is 4cca667c62587c5d066e6a05a695ae991d205302; current blob should be re-fetched before further edits.
- docs/index.html, docs/start.html, docs/blocks.html, docs/costumes.html, docs/animation.html, docs/sounds.html, docs/extensions.html, docs/safety.html, docs/credits.html, docs/scratch.html, docs/troubleshoot.html, docs/shortcuts.html, docs/changelog.html, docs/team.html: created consistent responsive HTML pages with shared left navigation and back-to-site links.
- team/chatgpt/CHATGPT-NOTES.md › WEBSITE-OPEN-QUESTIONS.txt: recorded 10 claims/behaviors that need confirmation or published-site checks.
EVIDENCE: STATIC SOURCE/DOCUMENT REVIEW. No browser, phone-width, or published-site tests run. The feature descriptions use existing repository notes and release records; do not call them independently browser-verified. app.html was not edited.
LIMITATIONS / NEXT: Need verify all page links and root links, check the root LICENSE filename, inspect/confirm any uncertain current-app claims, and perform a real browser/site check if available. Confirm canonical website URL with owner before replacing legacy URLs. The owner's custom block/procedure correctness priority remains active under Claude's implementation stream; do not duplicate it. Performance plan exists at team/PERFORMANCE-BENCHMARK-PLAN.txt; private owner projects must never be copied into the public repo.

2026-10-19 | WEBSITE/DOCS STATIC LINK CHECK
- Re-fetched the 14 new docs pages, homepage, app.html, README.md, LICENSE, team workflow and current status. Static relative href/src target check found 0 missing local file targets.
- This is NOT browser verification: fragment IDs, external URLs, visual rendering, mobile layout and the deployed site were not tested. app.html remains untouched.

2026-10-18 | WEBSITE + DOCS PASS 2 — USER REQUEST: “read and check the git hup and continue pls take your time”
AUTHORITATIVE ROUTING: Read current TODO.txt, AI-TEAM.txt, team/WORKFLOW-START-HERE.txt, team/TODO-CHATGPT.txt and team/CHATGPT-WEBSITE-DOCS-2026-10-19.txt. The website/docs assignment still leads; live app integration remains outside ChatGPT's role.
CHANGES PUSHED TO main:
- index.html: added seven missing feature cards (Bug Hunter, comments, right-click search, Stage/backdrops, Look like Scratch, recovery and clone safety); removed fixed “191 extensions” claims from metadata/hero/heading and replaced with non-numeric “extension library and safety labels.” Commit 27d929673d32490463bdd5c32e8304fe83f0fb2d.
- docs/start.html: added Stage/backdrop guidance and the stage-backdrops anchor. Commit 09a361e83ec9989364ff5723563dc936a7a27be3.
- docs/blocks.html: added clear script-comments/context-menu guidance and a Bug Hunter section; added editing-scripts and bug-hunter anchors. Commit 066f37b92fd702089a2d6b81b9948e555270a3e9.
- docs/troubleshoot.html: expanded stuck-project recovery guidance and documented the reported 300 default / 5,000 Infinite Clones safety ceilings; added recovery and clone-safety anchors. Commit 0ecbf124cd1135b60173d3e55afb77110ab6ad74.
- docs/scratch.html: clarified that Look like Scratch is a display option, not a compatibility guarantee; added look-like-scratch anchor. Commit 157af32f8a3faac4a8875b5e41552b9e5671fc42.
- team/chatgpt/CHATGPT-NOTES.md › WEBSITE-OPEN-QUESTIONS.txt: logged the extension-count mismatch, current static link result, confirmed root MIT LICENSE, and remaining questions. Commit 3db5c2a614659a02855bad7c04ec5f69a7fab5bf.
EVIDENCE: STATIC GITHUB SOURCE/TREE REVIEW ONLY. After the changes, all 15 public HTML pages (index.html + 14 docs pages) were checked against the current repository tree: zero missing local href/src targets; new home-card anchors resolve to their intended documentation headings. The homepage's visible source no longer claims a fixed 191 or 184 count. Root LICENSE was fetched and verified as MIT (blob 416e68ec518ad79447f98a7e54a6d48b9947055f).
NOT TESTED: no browser, phone-width, external-URL availability, #open hash-handler, or published GitHub Pages verification. The published site was inaccessible to the available browser tool; source access worked via GitHub connector. app.html was NOT edited. Do not describe this as a complete browser-tested website pass.
REMAINING BLOCKERS: ask Claude to confirm the current extension gallery/count and native-vs-gallery extension list against the active build; confirm the exact visible names of the four Animation blocks; review per-extension creator/licence data; and conduct the required published-site and mobile checks in a real browser when available. Canonical website URL remains owner-confirmation-only.
NEXT: continue the website assignment only on claims that can be source-verified, then hand the unresolved runtime/site checks to Claude/owner rather than guessing. Do not change app.html or claim full assignment completion.

2026-10-18 | WEBSITE + DOCS PASS 3 — CONTINUED REVIEW
SCOPE: Continued the assigned website/doc pass after reading the current branch and finding that the first round still left the numeric extension infographic and several required “What's new” items incomplete.
FURTHER CHANGES PUSHED TO main:
- index.html: added three explicit start actions (Open app, Use your project, Open app to paint a costume); removed old 8/104/79/191 extension stat counts; changed gallery safety captions to avoid implying a Safe label is a full guarantee; softened absolute Scratch/TurboWarp/PenguinMod parity claims; added release-summary copy and five missing cards for Power lines, Paint new fixes, selected-project performance, parity fixes, and #scratch= links. Relevant commits: 1b6b8ffbdc45f0d4ed24ec8d6c9678d7fee33e92 and cd5f46972889186e7688d0e32b006462dd68ff91.
- docs/blocks.html: documented Power lines and its settings/debug role. Latest relevant commit: 76bf6018c22c4c42d250c1ad487e83309917ac2c.
- docs/costumes.html: added Paint new canvas-fit behavior based on release notes, with safe backup/reporting wording. Commit: fffb2be7d01b9b0038265483610b3946b5a0eef1.
- docs/changelog.html: split v15.46.0, .1, .2, .3, .4 and v15.47.0 into separate milestone entries, plus v15.48.0, v15.45.0 and v15.31–15.44. Commit: 94047e00595607f70036547990df340df70c40f6.
- docs/credits.html: added the currently recorded AI-assisted roles and owner credit, linked the work log, confirmed MIT terms. Commit: 7295f85a5863102bacd82ea2386fa643c4ecc041.
- team/chatgpt/CHATGPT-NOTES.md › WEBSITE-OPEN-QUESTIONS.txt: updated evidence about the count mismatch, static link results, MIT LICENSE and unresolved visual/live-site checks. Commit: 52a9c25d6f45aee03af181614f4f5a60266be3b3.
LATEST STATIC CHECK: re-fetched all 15 public HTML pages from main. Checked 339 local href/src references; 0 missing local file targets and 0 broken fragments detected by the checks. Separately confirmed all eight new homepage-card anchor IDs exist in their respective docs pages, and the three startup actions point to existing app.html / app.html#open paths. The homepage's text no longer contains a 191 or 184 count claim; image pixels in embedded screenshots were not visually checked.
EVIDENCE BOUNDARY: STATIC GITHUB SOURCE/TREE ONLY. This is not a browser test. External link availability, embedded screenshot freshness, #open runtime behavior, mobile layout and published GitHub Pages remain unverified; browser tool could not access the published site. app.html remains untouched. Full website assignment is PARTIAL until remaining runtime and public-site checks are completed.
NEXT: hand current-main status to Claude/owner for a real browser/published-site visual check, the precise current extension count and gallery/native-extension inventory, and the exact visible names of the four Animation blocks. Do not guess or claim completed live verification.

2026-10-18 | ROUND 2 DOCUMENTATION — D1–D6 CONTENT PASS, STATIC EVIDENCE ONLY
TASK SOURCE: team/CHATGPT-ROUND2-2026-10-19.txt. app.html remains untouched.
D1 TUTORIALS: added docs/tutorials/index.html plus all eight assigned lessons: 01 G-Spark walk, 02 clicker game, 03 platformer jump, 04 bones animation, 05 Power lines, 06 falling-star clones, 07 quiz with lists, and 08 Pen drawing app. Added Tutorials to the left navigation on all 25 docs HTML pages. The lessons use small examples, explicit test steps and beta/availability caveats where exact runtime behavior has not been checked.
D2 GLOSSARY: created docs/glossary.html with 65 short definitions; linked Glossary in the footer and nav of all docs HTML pages.
D3 PARENTS/TEACHERS: created docs/parents.html with classroom lesson links and careful privacy wording. It states basic local editor use does not require an account but does NOT claim that no network requests ever happen; web loading, extensions and configured services may contact external hosts, and full request-path verification remains open.
D4 BLOCK GUIDE: expanded docs/blocks.html to over 100 examples across Motion, Looks, Events, Control, Sensing, Operators, Variables and Lists. Each table includes a short description and try-it example. Added list monitor / list-contains and costume/backdrop-name/username reference rows. Encoded Boolean block labels/examples as HTML entities to avoid malformed markup. Explicitly flags the disagreement in Grok's source notes: grok/fixtures.json says repeat (2.7) runs 3 times, while older grok/TESTS.txt says 2; it is not claimed runtime-verified.
D5 README: shortened README.md from 8,266 to 3,142 bytes, with links to site source, app, docs, tutorial hub, glossary, parents, credits/licence and team workflow.
D6 STATIC ACCESSIBILITY PASS: added visible keyboard focus outlines across docs HTML pages, ensured Tutorials/Glossary/Parents nav and footer links exist, kept heading levels sequential and IDs unique. Re-fetched all 25 docs HTML pages: 0 missing local href/src targets; 0 duplicate IDs; no heading-level skips; no inline img tags (therefore no missing image alt attributes). Fragment scans over page batches and key new linked headings found no broken anchors. These are static checks only; no browser, screen-reader, keyboard interaction or measured contrast test was run. Claude owns the live browser/mobile review per the task file.
REMAINING / NOT CLAIMED: exact current palette labels for every row; runtime execution of tutorial scripts (particularly platformer collision and Pen persistence); canonical live website URL; embedded screenshot freshness; extension count/native inventory; and the four exact Animation block labels. Do not mark those browser/source questions closed until Claude/owner provides current-build evidence.
FILES CHANGED IN THIS PASS: docs/tutorials/*.html (8 lessons + hub); docs/glossary.html; docs/parents.html; docs/index.html; docs/blocks.html; README.md; 20 other docs HTML pages for nav/footer/focus accessibility; team/chatgpt/CHATGPT-NOTES.md › WEBSITE-OPEN-QUESTIONS.txt. AI-TEAM/status files are being updated separately. No app.html changes.
NEXT: D7 keep website-open questions pending where evidence belongs to Claude; after team handoff, continue the next ChatGPT reviewer assignment from team/TODO-CHATGPT.txt without editing other AI folders.

2026-10-18 | COSTUME ANIMATION REVIEW — CA1, CA2, CA3 COMPLETE (STATIC / RESEARCH ONLY)
CA1: updated docs/USER-GUIDE.txt with a kid-friendly “Animate your costumes” section: Flipbook poses/Onion skin/Play; Costumes → Animation with Rig/Animate, In-between, Smooth x2 and Make costumes; the four documented Animation palette blocks; and a regular next-costume loop.
CA2: created team/chatgpt/CHATGPT-NOTES.md › REVIEW-costume-animation.txt after reading team/claude/tests/test_cosanim.js (blob c35a926b04d2759d5df9da7605d732ef78f32501). Listed 14 missing test cases with priorities and expected outcomes, including save/reopen, two sprites sharing animation names, clone playback isolation, Undo/Redo after rename, true bitmap rigging, global Stop cleanup, and running real Animation blocks through the script interpreter. Existing test assignment reports 27/27 PASS, but ChatGPT did not run the suite. Missing coverage is not described as a confirmed bug.
CA3: created team/chatgpt/CHATGPT-NOTES.md › UX-costume-animation.txt with 10 ranked UX improvements and concrete acceptance criteria, informed by Pivot Animator's official help for timeline/handles/onion skins/in-betweening and Scratch Paint's source/docs for vector/bitmap, selection, undo and canvas controls. Includes source links. No live UI comparison occurred.
APPROVAL / EVIDENCE LIMIT: static repository read + web research only. No app execution, screenshots or test run; app.html and team/claude/tests/test_cosanim.js remain unchanged. Next continue from the current ChatGPT assignment queue after rereading team/TODO-CHATGPT.txt and the dated assignment file.

2026-10-19 | CG1–CG3 (current assignment) — COMPLETE AS DOCS / STATIC REVIEWS
CG1: updated docs/USER-GUIDE.txt (current blob d201aa31f170b059f1c3a7e396a33284fb2b37f1) with exact steps for More → File → Report a bug, optional recent error log review and manual GitHub submission, the “Your project is stuck” Stop it / Keep going choice, default 300 / Infinite Clones safety ceiling 5,000, and opt-in #scratch= project links. Checked the current app blob rather than relying on the historical v15.46.1 assignment; app.html unchanged.
CG2: created team/chatgpt/CHATGPT-NOTES.md › COMPILER-REVIEW-2026-10-19.txt (commit 146c7da51af6c2f93696eeb6942ac92312de7e39) from source/tree inspection of current app blob 5ca624a515b9fc1310814c4740608c1cf3071028, team/SPEED-PLAN.txt, grok/fixtures.json, grok/fixtures-extra-list.json and team/claude/tests/test_grok_fixtures.js. No new full statement cache/core JS compiler is present. Existing GW.ownParts/kids and GW9.slotNode memoization are narrower than the planned compiler. Report flags __wsEpoch childList-only invalidation risk, requires cache and compiler acceptance against all fixture families, and insists on same-setup benchmark evidence. No runtime execution, app edit or Claude-test edit.
CG3: appended Section 6 to team/chatgpt/CHATGPT-NOTES.md › MERGE-QUEUE-NOTES.txt (commit d0a81d58c0754ccff5c1c15be3fab958fdcce2d8) with a short, source-grounded proposed queue refresh: stale 2026-10-13 header, retired DeepSeek/Gemini/Grok task paths, current 60+10 fixture blocker, CL1 not yet landed, doc/review reports are not merge candidates, pmp-loader remains WAITING, and TODO NOW 6/published URL remains unverified. MERGE-QUEUE.txt itself was not edited.
Evidence boundary: CG1 is written against current source/docs; CG2 and CG3 are static repository reviews only. No browser/Playwright or performance test was performed. Next in the reviewer queue: C1, review Gemini-inherited costume proposals read-only.

2026-10-19 | C1 — GEMINI-INHERITED COSTUME CANDIDATE REVIEW COMPLETE (STATIC ONLY)
Created team/chatgpt/CHATGPT-NOTES.md › REVIEW-GEMINI-COSTUME-CANDIDATES-2026-10-19.txt, commit 05fd965c96de7682196f22d10f1dc7a132d20f6e. Reviewed current v15.48.0 source blob 5ca624a515b9fc1310814c4740608c1cf3071028, ENGINE-MAP, LAB-costumes, CHECKLIST-costumes, and the five candidates. Verdict: all five are BLOCKED/HIGH RISK as-is. Source-confirmed issues include stale canvas selectors, `CE.state.mode` vs current `costumeMode`, `data-gw-shape` absent from current editor shapes, Select candidate claims `mapFor` but never invokes it, detached SVG editing, global document handlers for Fill/Text/Eraser/Undo, wrong CSS-to-backing-pixel mapping, non-existent color/font/eraser state properties, and a false pushHistory-as-undo fallback. The 56-item checklist is entirely unchecked and is not test evidence. No candidate file in gemini/lab/, app.html, or Claude tests was changed; no browser test was run.
NEXT: C2 — static review of team/chatgpt/clone-safety.js against its notes and ENGINE-MAP; build a focused regression checklist, do not call it tested.

2026-10-19 | C2 — CLONE-SAFETY CANDIDATE REVIEW COMPLETE (STATIC ONLY; SUPERSEDED)
Created team/chatgpt/CHATGPT-NOTES.md › REVIEW-clone-safety-2026-10-19.txt, commit 538151e098120b676aae3aaef66f34c0dfc42558. Compared team/chatgpt/clone-safety.js (blob ef4cb2c4bc86960bd8b9d51c4909dd8b9f741cad), its handoff notes, ENGINE-MAP, current app v15.48.0 blob 5ca624a515b9fc1310814c4740608c1cf3071028, and the cross-team queue. The queue explicitly marks the module SUPERSEDED and says not to revive it. Main findings: candidate makes Infinite Clones unbounded rather than retaining the native 5,000 cap; Stop capture clears threads before native Stop can mark them finished; candidate clone creator doesn't update native clone-counter cache fields; project-specific clone limits above 300 are reduced; replacing native createClone/removal functions risks losing side effects; retry/settings wrapper idempotency needs a test. Added an unchecked P0/P1 regression checklist; did not call anything tested, and did not edit the candidate or app.html.

2026-10-19 | C3 — SCRATCH LINK + GEMINI EXTENSION REVIEW COMPLETE (STATIC ONLY)
Created team/chatgpt/CHATGPT-NOTES.md › REVIEW-SCRATCH-LINK-EXTENSION-2026-10-19.txt (blob SHA 98648930600e4896f45a096cd24d6e8c6531130e; commit 9d02ab802968630949e216f41b0f17f8b3d961bf). Reviewed app v15.48.0 blob 5ca624a515b9fc1310814c4740608c1cf3071028; app's scratch-link handler is already integrated, so team/chatgpt/scratch-link.js must not be injected a second time. Extension review found missing manifest-referenced PNG icon files (tracked tree only has SVG + build script), popup setting is not synchronized to already-open Scratch tabs, no chrome.storage.onChanged, history wrappers are not restored on toggle-off, hashchange is not explicitly observed, context-menu parsing should validate link origin, and privacy disclosure needs to distinguish sync storage and later app fetch. Report contains A–D browser/package/network regression checklist; all cases are NOT RUN. No Gemini, app, or extension file was edited.
NEXT: C4 — review Grok TESTS.txt and label questionable expected results with primary-source/version evidence requirements.


--- ENTRY ---
Date: 2026-10-19 (America/New_York)
AI: ChatGPT
Task: C4 — review Grok TESTS.txt expected results and primary-source evidence requirements.

USER REQUEST (verbatim):
"read and check the git hup and continue pls take your time"

AI RESPONSE / ACTION:
Re-read the repository rules, current queue, ChatGPT task list and own log. Reviewed grok/TESTS.txt, VERIFY-high-risk.txt, SPEC-control.txt, fixtures.json, FIXTURE-SOURCES.txt and the current Scratch VM source in scratchfoundation/scratch-editor. Created team/chatgpt/CHATGPT-NOTES.md › REVIEW-GROK-EXPECTED-RESULTS-2026-10-19.txt (commit dc28e2df1b18927d1c1d2a9c448a98ff6f9b0ad9). Key finding: TESTS.txt T043 still expects repeat 2.7 -> 2, but the current VM source uses Math.round so the result is 3; fixtures.json has been corrected to 3 while FIXTURE-SOURCES.txt remains stale. Also documented invalid random-test logic in T017, unsupported/unverified 330-character speech claim T037, ambiguous/unrunnable custom-block tests T067/T068, and the need to separate G-Warp performance/safety tests from Scratch parity.

FILES CHANGED:
- team/chatgpt/CHATGPT-NOTES.md › REVIEW-GROK-EXPECTED-RESULTS-2026-10-19.txt — created.
- team/CROSS-AI-REVIEW-2026-10-15.txt — appended C4 review status and acceptance criteria.
- team/TODO-CHATGPT.txt — C1-C4 status refreshed; C5 is next.
- team/CONTINUOUS-WORK-QUEUE.txt — refreshed ChatGPT handoff to C5.
- AI-TEAM.txt — appended claim/completion and next-task entries.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry.
- No edits to Grok's files, Gemini's files, app.html, index.html, or Claude's runner.

EVIDENCE / TEST STATUS:
- SOURCE-VERIFIED (Scratch VM semantics): pinned mono-repo commit 585b1c3877943b31ac273b3d056ccb79db13aa41, including repeat, list indexing/limits, clone limit, pen clamp/wrap and custom procedure fallback code.
- STATIC-ANALYSIS: expected-result and test-definition review.
- LIVE Scratch editor UI: NOT TESTED.
- G-Warp runtime: NOT TESTED.
- Integration/release: NOT DONE.

BLOCKERS / UNCERTAINTIES:
- Grok must revise its own TESTS.txt and FIXTURE-SOURCES.txt; ChatGPT did not edit grok/.
- UI-only speech-bubble and timing claims need live editor evidence.
- This is not a passing parity suite or a statement that G-Warp matches the expected results.

NEXT STEP:
C5 — inspect gemini/lab/pmp-loader.js, NOTES-pmp.txt, and test-pmp-loader.js read-only; verify parser API, fixture legality/provenance, assets and meaningful assertions. Keep Gemini's folder read-only and do not touch app.html.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this GitHub review task; does not claim to reproduce older unrelated conversation history.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-19 (America/New_York)
AI: ChatGPT
Task: C5 — read-only review of the inherited protobuf .pmp loader and its test harness.

USER REQUEST (verbatim):
"read and check the git hup and continue pls take your time"

AI RESPONSE / ACTION:
Reviewed gemini/lab/pmp-loader.js, gemini/lab/NOTES-pmp.txt and gemini/lab/test-pmp-loader.js without editing Gemini's folder. Cross-checked the public upstream PenguinMod pmp-protobuf source, README, package metadata and its project-fetcher/VM references. Created team/chatgpt/CHATGPT-NOTES.md › REVIEW-PMP-PROTOBUF-LOADER-2026-10-19.txt (commit 61011ebf5ff473c23d0c1f8e6cd582c5b3f19094). Key findings: test-pmp-loader.js only labels fake bytes and never decodes a real protobuf; no shareable fixture/assets are supplied; the candidate returns an empty Map for assets; it guesses a CDN route pinned at v1.6.0 while inspected upstream source/package reports 1.8.8; the window.pmpProtobuf global shape and browser import route remain unverified; every non-ZIP buffer is classified as a protobuf candidate; and the harness still references the retired deepseek path. Report includes exact acceptance tests and keeps the module blocked.

FILES CHANGED:
- team/chatgpt/CHATGPT-NOTES.md › REVIEW-PMP-PROTOBUF-LOADER-2026-10-19.txt — created.
- team/CROSS-AI-REVIEW-2026-10-15.txt — appended C5 findings, severity and acceptance tests.
- team/TODO-CHATGPT.txt — C5 marked reviewed; C6 ongoing and C7 queued next.
- team/CONTINUOUS-WORK-QUEUE.txt — refreshed current ChatGPT reviewer handoff.
- AI-TEAM.txt — appended C5 claim/completion and next task.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry.
- No changes to gemini/, grok/, app.html, index.html, or any test runner.

EVIDENCE / TEST STATUS:
- SOURCE-VERIFIED: upstream pmp-protobuf API/export shape and separate asset-input model at PenguinMod/pmp-protobuf commit 84176d56c2b5bdebce8150a6bf9fefcac59fc1af.
- STATIC-ANALYSIS: loader and test-harness review.
- CDN +esm access: browser lookup was inaccessible; import route NOT TESTED.
- Real protobuf fixture/assets: NOT TESTED / not supplied.
- G-Warp browser/runtime: NOT TESTED.
- Integration/release: NOT DONE.

BLOCKERS / UNCERTAINTIES:
- Gemini must revise the inherited candidate in its own workspace; ChatGPT did not edit those files.
- Real asset acquisition/contract and a legally shareable fixture with at least one costume and one sound are required before validation.
- The network import has not been exercised in any target browser; this review does not claim project bytes are sent to the CDN. It only identifies a remote code-fetch dependency.

NEXT STEP:
C6 remains the continuing review ledger duty. C7 — produce a concise owner report covering reviewed progress, blockers, decisions needed and the exact next action. Keep the production app and other AI folders read-only.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this repository task, not unrelated historical conversation.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-19 (America/New_York)
AI: ChatGPT
Task: C7 — create concise owner-facing handoff for the C1-C5 review cycle.

USER REQUEST (verbatim):
"read and check the git hup and continue pls take your time"

AI RESPONSE / ACTION:
Created team/chatgpt/CHATGPT-NOTES.md › OWNER-REVIEW-STATUS-2026-10-19.txt (commit 6bf076af44099ec43579e191831a46c1e8c310a8). It summarizes the five static reviews, clearly separates source-confirmed facts from untested behavior, and assigns the next evidence gates to Grok (fixture/source-map correction and 60+10 suite), Gemini (real protobuf fixture + assets, parser/browser verification and extension packaging), Claude (official runtime/browser tests after dependencies exist), and the owner (confirm canonical website URL). The report does not recommend integrating blocked/superseded candidates.

FILES CHANGED:
- team/chatgpt/CHATGPT-NOTES.md › OWNER-REVIEW-STATUS-2026-10-19.txt — created.
- team/TODO-CHATGPT.txt — C7 marked complete; C6 remains ongoing.
- team/CONTINUOUS-WORK-QUEUE.txt — points to the owner handoff and next independent checks.
- AI-TEAM.txt — appended C7 claim/completion.
- team/CROSS-AI-REVIEW-2026-10-15.txt — appended owner-report pointer.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry.
- No production app, Gemini, Grok or Claude candidate/test files changed.

EVIDENCE / TEST STATUS:
- STATIC REVIEW HANDOFF only. The report summarizes C1–C5; it does not upgrade their evidence status.
- Browser/runtime/performance/real fixture testing by ChatGPT: NOT RUN.
- Integration/release: NOT DONE.

NEXT STEP:
C6 remains an ongoing review-ledger duty. At the next session, check whether Grok or Gemini has updated the requested author-owned files; if not, do not duplicate their work. Continue with an independent, in-scope review from team/TODO-CHATGPT.txt or report a clear dependency. Keep app.html/index.html and other AIs' folders read-only.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this repository review cycle, not unrelated historical conversations.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-19 (America/New_York)
AI: ChatGPT
Task: C8 — review the current user-owned AI key flow and exact project context transmitted; reconcile stale statuses.

USER REQUEST (verbatim):
"read and check the git hup and continue pls take your time"

AI RESPONSE / ACTION:
Reviewed app.html at blob 5ca624a515b9fc1310814c4740608c1cf3071028 via the Git blob API, because the normal large-file fetch returns empty. Created team/chatgpt/CHATGPT-NOTES.md › REVIEW-AI-KEY-CONTEXT-SECURITY-2026-10-19.txt (commit f1265a8582f51a6049a323614f2ab9b7166b6a87). Updated team/SECURITY-AND-CONSISTENCY-AUDIT-2026-10-15.txt with a dated C8 addendum (commit cd95b4b41563f3ecab1ec199f83663047daa4a21). Updated root TODO.txt (commit 9e9d617241b3e730072d8723bdfae0d21f08f788) to reflect that the built-in AI/key feature already exists as source while privacy/model acceptance remains pending; clarified the old 59-case Grok result is historical and is not proof for the current 60+10 fixture plan.

Verified from source: new key setup defaults to sessionStorage; checking “Remember” writes to localStorage; save clears the other store; Remove key calls save with an empty value. The connected helper sends the user question and a bounded summary including non-clone sprite names, selected sprite, variable names and block text from up to 12 selected-sprite stacks (up to 25 blocks each, 60 characters per block) to https://api.anthropic.com/v1/messages, with the user key in the x-api-key header. No exact-context preview or per-request context-off choice is shown in the current UI. A limited regex scan of the current app blob found zero hits for several common credential patterns; this does not cover Git history, all repository files, deployment artifacts or secret-scanning settings.

HIGH-RISK DOCUMENTATION MISMATCH: source defaults model to claude-sonnet-5-5; official Anthropic model-status docs retrieved on 2026-10-19 list active Claude Sonnet 5 as claude-sonnet-5. This is a source/documentation mismatch, not a reproduced API failure; no model list or Messages API call was made.

FILES CHANGED:
- team/chatgpt/CHATGPT-NOTES.md › REVIEW-AI-KEY-CONTEXT-SECURITY-2026-10-19.txt — created.
- team/SECURITY-AND-CONSISTENCY-AUDIT-2026-10-15.txt — appended detailed current-flow addendum.
- TODO.txt — AI feature status and historic Grok result qualified.
- team/TODO-CHATGPT.txt — C8 result recorded.
- team/CROSS-AI-REVIEW-2026-10-15.txt — C8 severity, source evidence, corrections and acceptance tests added.
- team/CONTINUOUS-WORK-QUEUE.txt — current C8 result and remaining owner/Claude gates added.
- team/AI-STATUS.txt — addendum pointer/status added.
- AI-TEAM.txt — claim/done log added.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry.
- No edits to app.html, index.html, Gemini/Grok/Claude source or tests.

EVIDENCE / TEST STATUS:
- STATIC SOURCE REVIEW: complete for the pinned app blob.
- OFFICIAL DOCUMENTATION CROSS-CHECK: performed at https://docs.anthropic.com/en/docs/about-claude/model-deprecations.
- Browser/API/network/storage/exports test: NOT RUN.
- Git-history secret scan / GitHub secret settings review: NOT RUN.
- Integration/release: NOT DONE.

BLOCKERS / NEXT OWNER ACTION:
- After explicit owner approval, Claude/owner should verify a supported model ID with a dummy/test credential, add an exact project-context preview and context-off choice, clarify same-origin storage risk, make storage failures visible, and test remove/session/persistent behavior.
- Owner/Claude still need a separate Git-history secret scan and review of available secret-scanning settings. No key was found or copied into this report.
- Owner must confirm canonical website URL before any URL changes.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this repository review task, not unrelated older chat history.
--- END ENTRY ---


FOLLOW-UP CONSISTENCY NOTE — 2026-10-19
After C8 logging, re-read team/TODO-CHATGPT.txt and found its first three routing lines still ordered the already-delivered website/docs, animation-review and compiler-review tasks ahead of current work. Replaced that stale header with a status note: authoring/static pass delivered; live website/mobile checks remain with Claude/owner; CA1–CA3 and CG1–CG3 were delivered as reports/docs, not runtime integrations; current ChatGPT reviewer focus is the C6 ongoing ledger. Updated team/TODO-CHATGPT.txt commit cc01d8d15b27053569219478f071ce1bec7a20f4. This was task-routing cleanup only; no app code or contributor folder changed.


--- ENTRY ---
Date/time (timezone): 2026-10-19T00:47:00-04:00 (America/New_York)
AI / model identity: ChatGPT GPT-6
Task ID / title: C9 — Review latest Gemini animation/lab batch; maintain C6 cross-review ledger
Base branch / commit (if known): main; reviewed candidate commit b05973868839921586c844a93c4e1546c75c1c5c (parent 33e143bcb63267f0290c46365b507212131ed478)

USER REQUEST (quote accurately; do not silently paraphrase):
"read and check the git hup and continue pls take your time"

AI RESPONSE / WORK SUMMARY:
Read AI-TEAM.txt, TODO.txt, team/WORKFLOW-START-HERE.txt, team/CONTINUOUS-WORK-QUEUE.txt, team/TODO-CHATGPT.txt, team/AI-STATUS.txt, and the latest Gemini candidate commit. Reviewed the three rig SVGs, 24 flipbook SVGs, A/B/C auto-rig and easing modules, LAB reports, visualizer, and test harness. Created team/chatgpt/CHATGPT-NOTES.md › REVIEW-GEMINI-ANIMATION-LAB-2026-10-19.txt and recorded findings in the shared review ledger/status.
Main findings: specified current M1 paths gemini/lab/melody-engine.js and lab-melody.html are absent; pivots.json is absent; auto-rig-C can self-parent its fallback root for some unlabelled SVG groups; pivot values are printed rather than asserted; A/B/C variants conflict with the current sprint's one-version rule; flipbook paths differ from the assigned folder layout. Candidate code remains isolated.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Never rewrite app.html/index.html; no permission for live integration.
- Do not edit Gemini/Grok/Claude folders. The review report is in team/chatgpt/ only; shared status/ledger updates summarize the evidence.
- Claude Opus 5.5 owns official runtime/visual verification and integration; owner approval remains required.
- Distinguish source verification/static analysis from tests reported by another AI. Do not mark the current batch BROWSER-VERIFIED.

FILES CHANGED:
- team/chatgpt/CHATGPT-NOTES.md › REVIEW-GEMINI-ANIMATION-LAB-2026-10-19.txt — created.
- team/TODO-CHATGPT.txt — C9 added.
- team/CROSS-AI-REVIEW-2026-10-15.txt — C9 evidence/status addendum.
- team/CONTINUOUS-WORK-QUEUE.txt — C9 result and handoff.
- team/AI-STATUS.txt — latest review addendum.
- AI-TEAM.txt — C9 work log.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry.
- app.html, index.html, gemini/, grok/ and team/claude/ source files — NOT EDITED.

EVIDENCE / TEST STATUS:
- SOURCE-VERIFIED: current GitHub tree/commit file list and contents of the relevant Gemini candidate files.
- STATIC-ANALYSIS: fallback-root self-parent risk, missing path/manifest deliverables, and insufficient pivot assertions.
- REPORTED TEST: Gemini's earlier log reports XML parsing and Node harness passes; this was not independently reproduced here and is not evidence of browser behavior.
- NOT TESTED by ChatGPT: Node execution, browser visual playback, current app integration, or SVG animation sequence loading. Local GitHub access from a container was unavailable; source inspection used the connected repository tools.
- Integration/release: NOT DONE.

BLOCKERS / UNCERTAINTIES:
- The latest exact M1 assignment paths are missing from the current tree, though older music-engine files are mentioned in the Gemini log.
- SVG regex geometry heuristics are limited; the generic fallback behavior needs dedicated fixtures.
- Canonical site URL, unrelated integration gates, and the author's exact current test environment remain outside this task.

NEXT STEP / HANDOFF:
Gemini should revise only gemini/ files, first reconcile the current melody-engine task and required paths, add the missing pivots.json or obtain an explicit assignment change, fix root-parent handling and add exact pivot/cycle assertions, then record exact current-commit test results in gemini/AI-CHAT-LOG.txt. Claude/owner retain all integration and release decisions.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this repository task, not unrelated older chat history.
--- END ENTRY ---


--- ENTRY ---
Date/time (timezone): 2026-10-19 (America/New_York; time not independently sampled)
AI / model identity: ChatGPT GPT-6
Task ID / title: N-C1..N-C4 — document Beta v15.49.0 website updates
Base branch / commit (if known): main; source blobs fetched immediately before each documentation edit

USER REQUEST (quote accurately; do not silently paraphrase):
"Continue were you left off on the git huh"

AI RESPONSE / WORK SUMMARY:
Re-read the repository routing documents, TODO.txt, AI-TEAM.txt, team/NEXT-AFTER-v15.49-2026-10-19.txt, team/TODO-CHATGPT.txt, team/CONTINUOUS-WORK-QUEUE.txt, and this ChatGPT log. Followed the explicit N-C1..N-C4 assignment only. Updated the costume and animation guides for the v15.49.0 tabs, tile-sprite availability/rules, animation costume folders, and Glide behavior; updated the sound guide for style-specific melodies and the four explicitly confirmed new styles; added v15.49.0 to the changelog and homepage highlights.

FILES CHANGED:
- docs/costumes.html
- docs/animation.html
- docs/sounds.html
- docs/changelog.html
- index.html
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry
- AI-TEAM.txt — one-line task log

EVIDENCE / TEST STATUS:
- SOURCE-VERIFIED: current repository task instructions and documented v15.49.0 facts in team/NEXT-AFTER-v15.49-2026-10-19.txt and team/FUTURE-IDEAS.txt.
- Static edits committed through GitHub file updates. No browser, mobile, accessibility, or published-site test was run.
- The full list of all 11 Song maker style names could not be independently verified from the available source fetch; docs name only the four styles explicitly confirmed in the release notes and say to check the current selector for the full list. This remains a narrow documentation gap, not a guessed list.
- app.html was NOT edited. No integration or release action was performed.

BLOCKERS / NEXT STEP:
N-C4 says stop after the documentation tasks and add one line to AI-TEAM.txt. Do not start a review-ledger pass or other tasks from this assignment. Claude/owner still own browser/mobile/published-site verification.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this repository task, not unrelated older chat history.
--- END ENTRY ---


--- ENTRY ---
Date/time (timezone): 2026-10-19 (America/New_York; exact time not sampled)
AI / model identity: ChatGPT GPT-6
Task ID / title: N-C2 completion — verify and document all 11 Song maker styles

USER REQUEST (quote accurately; do not silently paraphrase):
"Ok continue"

AI RESPONSE / WORK SUMMARY:
Resumed the existing v15.49.0 documentation assignment and checked its current task files. The earlier sounds-guide edit had not completed N-C2's explicit requirement to list all 11 styles. Retrieved the patch for Claude's v15.49.0 app.html commit de1db800bb4d10eabedf500e2b466cf1b0c347ee and verified the actual #gwMusicStyle selector labels. Updated docs/sounds.html to list: Lo-Fi, Synthwave, Upbeat Pop, Dark Arcade, Ambient, Electro House, Neo Jazz, Chiptune, Rock, Trap, and Cinematic. Four added styles remain identified as Chiptune, Rock, Trap, and Cinematic.

FILES CHANGED:
- docs/sounds.html — completed style list.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry.
- AI-TEAM.txt — one concise task-progress line.
- app.html and all other contributor folders — NOT EDITED.

EVIDENCE / TEST STATUS:
- SOURCE/PATCH-VERIFIED: the v15.49.0 app.html commit patch explicitly lists the 11 selector labels; commit URL: https://github.com/Creapter1/gwarp/commit/de1db800bb4d10eabedf500e2b466cf1b0c347ee
- GitHub file update committed; no browser, runtime, mobile, or published-site test run.
- No review-ledger pass started, per N-C4.

NEXT STEP:
The assigned N-C1..N-C4 documentation scope is now complete. Stop here pending a new bounded task assignment; do not begin cross-AI review work from this session.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this repository task, not unrelated older chat history.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-21 (America/New_York)
AI: ChatGPT
Task: Record the owner's mandatory animation-regression requirement in the shared TODO.

USER REQUEST (verbatim):
"As you know, we are working on Derock. I have noticed a little error that we need to fix. The little electricity that is on the event loops, and some others like that, like if, wait, repeat, and any of them to be honest, that have the electricity moving, they are no longer doing the animation when green flag is pressed. That is something that we need to fix. Same goes for the block. Once we click on the block, there's a line that always displays what is currently being connected to the block name. So it used to be a little circle of running around all the way to the block that's being active at the moment. It's no longer there. We need to update the GitHub to the to-do to turn back to that point where it used to be animation on it. That is a must. That is something that we're gonna need to in order to maintain established. The goal is to be electricity but not to remove the cool stuff that we already have. Okay."

AI RESPONSE / ACTION:
Added a P0 regression requirement to the "NOW (most important first)" section of TODO.txt. It covers electric animation on applicable Event/Control blocks (including green flag, if, wait, repeat and other blocks using the effect), plus the moving circular active-execution indicator on the block connector/flow line. It explicitly requires preserving existing visuals/features, investigating the regression, and validating green-flag start, active-block tracking through loops/yields, Stop/restart recovery, and regressions.

FILES CHANGED:
- TODO.txt — added P0 animation regression task.
- AI-TEAM.txt — appended a progress handoff.
- No app.html, index.html, or runtime code changed.

EVIDENCE / TEST STATUS:
- SOURCE-VERIFIED: GitHub file update succeeded; TODO commit: 63a2fdb0c0945c6a77451fc02faeb6eef6f8267b.
- NOT TESTED: no app/browser/runtime tests were run; this session updated the requirement only.
- Integration: NOT DONE.

BLOCKERS / UNCERTAINTIES:
- Exact source hooks responsible for both animations have not yet been traced; do not guess at a cause.
- Current published/runtime behavior has not been independently reproduced in this session.

NEXT STEP / HANDOFF:
Claude Opus 5.5 should inspect the current source and trace both animation paths, then restore them minimally while preserving all existing features, subject to the project's model-verification and owner-approval gates. ChatGPT can review the resulting candidate and acceptance evidence.
--- END ENTRY ---


--- ENTRY ---
Date: 2026-10-21
AI: ChatGPT
Task: Music Maker and tilemap TODO update.
ACTION: Added an additive Music Maker expansion task to TODO.txt covering genuinely distinct melodies, bass/drums/fills, and a Create Melody area linked to Song Maker and instrument choice. Preserved existing music, Gemini-created icon/assets, and click-to-select workflow. Added tilemap relocation from Code to Custom as a deferred idea only.
FILES: TODO.txt and AI-TEAM.txt updated. Runtime files unchanged.
EVIDENCE: TODO commit fe911d710e9fe6f00126d733e37d6320879573cc. NOT TESTED: no browser/audio tests; documentation only.
NEXT: inspect existing Gemini music assets and Song Maker connections before implementation; defer tilemap until owner design discussion.
--- END ENTRY ---


--- ENTRY ---
Date/time (timezone): 2026-10-23, America/New_York
AI / model identity: ChatGPT GPT-6
Task ID / title: C6 — verify AI request/response chat-log coverage
Base branch / commit (if known): main; audit report commit 7eee7ff89c0add76fa8a6a04e85fdb0db328c48c

USER REQUEST (quote accurately; do not silently paraphrase):
"Ok well do your part pls an do to the fact the is real the chat degrade an forget an make mistake after log time i remember recuasting a light fir user and response is this file exists still for all Ai or no"

AI RESPONSE / WORK SUMMARY:
Checked AI-TEAM.txt, team/AI-CHAT-LOG-TEMPLATE.txt, and the required current paths on GitHub main. Confirmed team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt, grok/AI-CHAT-LOG.txt and gemini/AI-CHAT-LOG.txt exist. grok/AI-CHAT-LOG.txt is only about 1.1 KB and its visible entries end on 2026-10-18, while later Grok work is recorded elsewhere. gemini/AI-CHAT-LOG.txt exists and its latest visible entry is dated 2026-10-20. The required team/claude/CLAUDE-NOTES.md › AI-CHAT-LOG.txt returned 404, even though Claude remains active. deepseek/AI-CHAT-LOG.txt is absent, consistent with DeepSeek's retirement on 2026-10-18. Created team/chatgpt/CHATGPT-NOTES.md › REVIEW-AI-CHAT-LOG-COVERAGE-2026-10-23.txt detailing evidence, gaps, recommendations and scope.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Every active AI owns and appends only to its own <ai-folder>/AI-CHAT-LOG.txt; no editing another AI's folder.
- Keep the user's wording separate from AI summaries. Never invent quoted user requests or pretend incomplete history is a full transcript.
- Label the exact evidence level honestly. A file check is not a runtime test.
- DeepSeek is retired; Gemini owns the consolidated gemini/ workspace.

FILES CHANGED:
- team/chatgpt/CHATGPT-NOTES.md › REVIEW-AI-CHAT-LOG-COVERAGE-2026-10-23.txt — new audit report.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry.
- AI-TEAM.txt — task claim and closeout entries.
- app.html and index.html — NOT edited. No other AI's folder edited.

EVIDENCE / TEST STATUS:
- SOURCE-VERIFIED: required file paths were fetched from GitHub main; Claude's expected path returned 404; audit report was committed.
- NOT TESTED: no browser, app runtime, or external test was run.

BLOCKERS / UNCERTAINTIES:
- Why Claude's required log is missing is unknown; ask Claude to create it rather than creating a file in its folder.
- Grok's old log may omit newer activity; backfill only from verified records and never fabricate a transcript.
- Logs preserve durable task context but do not automatically preserve every message from every platform chat.

NEXT STEP / HANDOFF:
Claude: create team/claude/CLAUDE-NOTES.md › AI-CHAT-LOG.txt using team/AI-CHAT-LOG-TEMPLATE.txt and record the next task/session. Grok: reconcile grok/AI-CHAT-LOG.txt against later work records. All active AIs: append their own handoff at every task/session close. Claude/owner may add a closeout check to the workflow.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this repository task and the exact current user request; not a complete transcript of unrelated earlier conversations.
--- END ENTRY ---


--- ENTRY ---
UTC timestamp: 2026-10-24T15:15:03Z
AI / model identity: ChatGPT GPT-6 (verified in this session)
Task ID / title: Owner request — enforce zero-exception AI session logging gate
Branch / starting commit: main / prior HEAD not recorded in this entry

USER REQUEST (verbatim):
"All ai shud ha e a log so make the a strick rule the is sonting the all most have to avoid error don't mere ho it is why claude make super big mistakes last time"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
Make personal AI logs mandatory for every AI working on G-Warp, with strict enforcement intended to prevent context-loss mistakes. No AI or task type may be exempt. Failure to maintain/verify the log must stop project work.

PROGRESS / AI RESPONSE:
Added a zero-exception logging gate to AI-TEAM.txt; replaced the shared template with mandatory start/progress/closeout fields and verification requirements; added a hard-stop reminder to TODO.txt. The rule applies to all active/future/temporary AIs and agents, including Claude, ChatGPT, Grok, and Gemini.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Every AI must read AI-TEAM.txt, the shared template, and its own complete log before work.
- Every AI must log session start, meaningful progress, and closeout; personal log and shared work log are both required.
- If personal logging/read-back verification fails, stop all G-Warp work and notify the owner.
- A task cannot be marked DONE until its personal log closeout is committed and read back from GitHub.
- New timestamps use UTC ISO-8601 with seconds and Z. Never guess/backdate; preserve historical timestamps.
- Never invent missing chat text or tests; label reconstructed context and evidence honestly.
- Append only; never edit another AI's personal log. No app.html/index.html changes.

FILES CHANGED:
- AI-TEAM.txt — added ZERO-EXCEPTION AI SESSION LOGGING GATE.
- team/AI-CHAT-LOG-TEMPLATE.txt — replaced with mandatory session start/progress/closeout template and GitHub read-back gate.
- TODO.txt — added critical logging hard-stop rule.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this entry.

COMMANDS / TESTS / RESULTS:
- GitHub update_file succeeded for the three shared files. Commit SHAs: AI-TEAM.txt cc5091186a361f95ca2b6617791b7a28fad31efd; template c1338889966539f46ed393bedf8d68aac7412a18; TODO.txt a107dfeb5094a340b3b51ab5b9c1bf91ba3dca9d.
- Read-back verification pending in this entry at time of writing.

EVIDENCE CLASS:
- SOURCE-VERIFIED for fetched source files and successful GitHub write responses; read-back verification to follow.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- This establishes repository policy and a hard-stop instruction; it does not technically enforce logging inside external AI products. Compliance still depends on each AI/agent following the repo gate.

NEXT STEP / HANDOFF:
- Read back all three changed shared files and this personal log from GitHub; verify the rule and this entry are present. Future AIs must comply before any G-Warp work.

CHAT HISTORY COMPLETENESS:
COMPLETE FOR THIS TASK

GITHUB CLOSEOUT VERIFICATION:
- Personal log commit SHA: 956fde4c45e1150a36157ae929086bd5764c8b28 (entry commit; this final closeout update is committed separately)
- Read-back URL/path: https://github.com/Creapter1/gwarp/blob/main/team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt
- Verified new entry is present at bottom: YES (initial entry read back from GitHub before this final closeout update)
- Task status: DONE
--- END ENTRY ---


--- ENTRY ---
SESSION START / TASK RECORD
UTC timestamp: 2026-10-26T13:18:28Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-I1 — Costumes, Flipbook and Animation icon consistency audit
Branch / starting commit: main / 829890967c02829beace590faaa46d63e43b2596

USER REQUEST (verbatim when available; keep distinct from interpretation):
"Well check GitHub and continue"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
Continue the current assigned G-Warp work, beginning with ANIM-I1 as directed by team/ai-team/README.md and team/ai-team/CHATGPT-JOBS.md › CHATGPT-ANIMATION-TODO-2026-10-26.txt. Audit icons in Costumes, Flipbook and Animation; compare same actions across Code, Sounds, Song maker and menus where evidence is available. Deliver an audit table and preview page. Do not edit app.html/index.html or another AI's folder. Finished owner-requested visual assets belong in team/ai-team/shared/<date>-chatgpt-<job>/ with NOTES.md and preview.html. Claude alone integrates; owner decides.

PROGRESS / AI RESPONSE:
Reconnected to GitHub and inspected repository metadata, current main commit history, task instructions, and the ChatGPT log (18 prior entries; 81,300+ characters). Current main HEAD is 829890967c02829beace590faaa46d63e43b2596 (2026-10-26T13:17:19Z). Read team/ai-team/README.md, AI-TEAM.txt, mandatory log template, ChatGPT prompt, animation task and main to-do. Found Beta v15.54.0 and latest Claude release notes. Starting the first assigned job ANIM-I1.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Append-only personal log; commit and read it back before project work.
- Never edit app.html or index.html; never edit another AI's folder.
- Do not change app icons; audit and propose only. Claude integrates after owner approval.
- Follow G-Warp palette/style; no Scratch art, cats, brands or AI watermark.
- Same action must use the same icon throughout G-Warp. Check existing icons before proposing replacements.
- No test claim without actual execution; browser/runtime work is NOT-TESTED unless actually run.

FILES CHANGED:
- NONE at session start.

COMMANDS / TESTS / RESULTS:
- GitHub reads: repository metadata, main files and recent commit search. No app tests run.

EVIDENCE CLASS:
- SOURCE-VERIFIED for repository instructions, version/status notes and commit metadata; ANIM-I1 audit not yet performed.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- No terminal/browser execution available in this chat session; [TERMINAL] animation tests remain for Freebuff/QA kit.
- Original user conversation beyond the current request is not available verbatim; this entry records only the exact current request and verified repository context.

NEXT STEP / HANDOFF:
Finish the ANIM-I1 source/icon inventory, inspect exact icon assets and app references read-only, then create team/chatgpt/ANIM-I1-ICON-AUDIT.md and a preview.html (or the required shared drop-box package if the preview is visual). Append progress/closeout and AI-TEAM work-log line; read back every committed change.

CHAT HISTORY COMPLETENESS:
PARTIAL — exact current request captured; task scope reconstructed from current GitHub instructions.
--- END ENTRY ---


--- ENTRY ---
SESSION CLOSEOUT
UTC timestamp: 2026-10-26T13:20:10Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-I1 — Costumes / Flipbook / Animation icon consistency audit
Branch / starting commit: main / 829890967c02829beace590faaa46d63e43b2596

USER REQUEST (verbatim when available):
"Well check GitHub and continue"

WHAT WAS ASKED:
Continue G-Warp work according to the current GitHub workflow and begin the first assigned task, ANIM-I1.

WHAT I DID:
- Read current repository rules, task assignment, prompt, mandatory log template, current ChatGPT log, QA-kit instructions and current team status.
- Read the current app.html Git blob (2,663,491 characters) and traced the relevant icon declarations and assignments.
- Created a source-only icon consistency report and visual preview in team/ai-team/shared/2026-10-26-chatgpt-ANIM-I1/.
- Read back all three delivered files from GitHub and confirmed non-empty contents.
- Added the ANIM-I1 completion line to AI-TEAM.txt.

WHAT I DID NOT DO:
- Did not edit app.html or index.html.
- Did not edit another AI's folder.
- Did not replace, activate, or integrate any icon.
- Did not run a browser, QA kit, or runtime test; visual preview is a static HTML artifact and browser testing remains NOT-TESTED.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Undo/redo already match across Code, Costumes and Animation; keep fa-rotate-left / fa-rotate-right.
- Generic Play is inconsistent: Animation currently receives the filmstrip/play SVG while Flipbook and Song Maker use fa-play.
- Onion skin is inconsistent: paint editor has a separate inline SVG; Flipbook and Animation use the Gemini registry onion SVG.
- Animation Delete is text-only while Costume and Sound delete use trash-can icons.
- flip-horizontal / flip-vertical keys exist in the Gemini registry but are not assigned by its apply() routine; browser verification of active paint toolbar mappings remains open.
- Claude alone integrates; owner approval is required.

FILES CHANGED:
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-I1/NOTES.md — created.
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-I1/ANIM-I1-ICON-AUDIT.md — created.
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-I1/preview.html — created.
- AI-TEAM.txt — appended ANIM-I1 completion line.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — session start and this closeout.
- app.html / index.html — NOT changed.

COMMANDS / TESTS / RESULTS:
- GitHub source reads: PASS; app.html blob SHA 7ef2e8d17081354e66fc6138ae9cc8a639b839d9.
- GitHub read-back of NOTES.md (1,528 chars), report (5,264 chars) and preview.html (5,694 chars): PASS.
- Browser / QA kit / Scratch VM: NOT RUN.

EVIDENCE CLASS:
- SOURCE-VERIFIED for current source declarations and UI assignments.
- NOT-TESTED for live browser appearance/behavior.

BLOCKERS / UNCERTAINTIES:
- Verify icon appearances and responsive preview in a real browser before any icon change is integrated.
- This is the Costumes/Flipbook/Animation audit only; the broader whole-app icon audit remains a separate follow-on task.

NEXT STEP / HANDOFF:
Claude: review the ANIM-I1 table and confirm browser mappings before integrating any icon changes. ChatGPT: continue with the next item in the animation to-do after this handoff, starting ANIM-I2 (three A/B/C concepts per requested new icon) only after the owner wants the asset work to proceed. Owner: review the audit recommendations; no integration has been made.

CHAT HISTORY COMPLETENESS:
PARTIAL — exact current request captured; detailed ANIM-I1 scope came from current repository instructions.

GITHUB CLOSEOUT VERIFICATION:
- Personal log commit SHA: 8129725bc5c3d1b33a40d88b4020b6d614b45af4 (closeout entry committed)
- Read-back URL/path: https://github.com/Creapter1/gwarp/blob/main/team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt
- Verified closeout entry is present at bottom: YES (read back immediately after commit)
- Task status: DONE
--- END ENTRY ---


--- ENTRY ---
SESSION START / TASK RECORD
UTC timestamp: 2026-10-26T13:20:34Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-I2 — Original animation icon family, A/B/C options
Branch / starting commit: main / ba344a47cb96145db88a4d5324a2c47cb764888b

USER REQUEST (verbatim when available):
"Well check GitHub and continue"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
Continue the ordered animation to-do after ANIM-I1. Create three genuinely different A/B/C SVG concepts for every requested ANIM-I2 icon, in one dated team/ai-team/shared drop-box folder, plus NOTES.md and preview.html. Icons must use 24x24 viewBox, 1.75–2px round stroke, G-Warp palette, no words, no scripts/external resources/bitmaps, under 4 KB each, readable at 16/24/32 px, shown beside the existing animation icon family on dark and light backgrounds. Do not edit app.html/index.html or another AI's folder. Claude integrates; owner chooses.

PROGRESS / AI RESPONSE:
ANIM-I1 audit is committed and read-back verified. Starting ANIM-I2 according to the animation task list.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- New icons are proposals only; no live application changes.
- A/B/C must differ in concept, not merely colour or small styling changes.
- G-Warp style only; no Scratch/Pivot/Adobe/other brand artwork, no cats, no AI watermark.
- Every icon needs a clear action meaning without text; use consistent stroke/corners and palette.

FILES CHANGED:
- NONE at ANIM-I2 start.

COMMANDS / TESTS / RESULTS:
- GitHub read of own log and task instructions. No visual/browser test run yet.

EVIDENCE CLASS:
- SOURCE-VERIFIED for task scope and style rules; icons not yet produced.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- Browser preview can be committed but not rendered/tested in this chat; mark NOT-TESTED.

NEXT STEP / HANDOFF:
Build all requested SVG variants and the dark/light size preview; validate SVG structure, viewBox, size and absence of scripts/external resources; commit files and verify read-back.

CHAT HISTORY COMPLETENESS:
PARTIAL — exact current request captured; ANIM-I2 scope reconstructed from GitHub task instructions.
--- END ENTRY ---


--- ENTRY ---
SESSION START / TASK RECORD
UTC timestamp: 2026-10-26T13:38:58Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-I2 — Resume validation of the A/B/C animation icon pack
Branch / starting commit: main / 29be3bccb43c32fd64c59d152cf1d98ccc9c938a

USER REQUEST (verbatim when available; keep distinct from interpretation):
"Continue"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
Resume the already-started ANIM-I2 job documented in the preceding personal-log entry. Validate the existing team/ai-team/shared/2026-10-26-chatgpt-ANIM-I2 package against team/ai-team/CHATGPT-JOBS.md › CHATGPT-ANIMATION-TODO-2026-10-26.txt and team/ai-team/README.md §7. Check all required A/B/C SVGs, naming/counts, size, viewBox, stroke style, prohibited content, variant differentiation, and preview links/display controls. Correct only this ChatGPT-owned drop-box package and its documentation if necessary. Do not edit app.html/index.html or another AI's folder; no integration or activation.

PROGRESS / AI RESPONSE:
Resumed the existing ANIM-I2 assignment after confirming the package already exists in main. The package NOTES.md says 114 icons but its How to test line says 111; preview.html claims 38 actions / 114 SVGs. This discrepancy is an open check, not yet corrected. Current branch tip was read from GitHub commit search.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Keep the existing G-Warp dark/violet/green/yellow style and Gemini animation-family stroke/corners.
- Use original art only; no brands, Scratch/Pivot art, cats, AI watermark, external resources, embedded images or icon scripts.
- Preserve A/B/C as genuinely distinct concepts; do not replace existing G-Warp icons.
- The owner chooses variants; Claude alone integrates after approval.

FILES CHANGED:
- NONE at session start.

COMMANDS / TESTS / RESULTS:
- Read repository rules, mandatory template, personal-log history, ChatGPT prompt, animation task, QA-kit README and ANIM-I1 deliverables.
- GitHub reads only so far; no SVG validation or browser test run yet.

EVIDENCE CLASS:
- SOURCE-VERIFIED for the current instructions, package metadata and fetched sample SVGs.
- NOT-TESTED for full-pack validation, preview rendering and app behavior.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- GitHub file search did not enumerate the icon folder; exact file inventory will be obtained from the preview references and direct path reads.
- Browser preview not yet executed in this chat; do not label as browser-verified.

NEXT STEP / HANDOFF:
Validate every referenced SVG against the task rules, count actual unique files and fix any mismatches in the package. Read back all changed files and record exact results. Then move to the next WEB-eligible animation task only after ANIM-I2 is complete.

CHAT HISTORY COMPLETENESS:
PARTIAL — exact current request captured; ANIM-I2 scope and prior progress taken from the existing personal log and current GitHub task instructions.
--- END ENTRY ---


--- ENTRY ---
SESSION CLOSEOUT
UTC timestamp: 2026-10-26T13:48:11Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-I2 — A/B/C animation icon family, validation and handoff
Branch / starting commit: main / 29be3bccb43c32fd64c59d152cf1d98ccc9c938a

USER REQUEST (verbatim when available):
"Continue"

WHAT WAS ASKED:
Resume the assigned ANIM-I2 package validation, correct the identified visual/content defects, and complete the ordered GitHub handoff.

WHAT I DID:
- Verified all 38 requested action names and their three A/B/C SVG variants: 114 unique icon files.
- Corrected duplicate/incorrect Snap-to-guide artwork (previously duplicated Ruler), added the missing closed padlock to Lock-guides C, replaced Sprite-sheet options that duplicated GIF-export art, and corrected a duplicated Pose-library B drawing.
- Reworked Run C and Jump / Idle / Punch / Kick / Wave / Hurt / Win A/B/C around the G-Warp bean/blob character instead of stick figures.
- Updated preview.html to show every A/B/C icon at 16, 24 and 32 px on dark and light backgrounds. Verified 38 size strips and 456 total image references (114 main icons + 342 size thumbnails).
- Corrected NOTES.md from 111 to 114 and documented the corrections and evidence limits.
- Added the ANIM-I2 DONE line to AI-TEAM.txt and the owner-pick handoff line under WAITING FOR CLAUDE in MERGE-QUEUE.txt.
- Read back the updated files from GitHub. The 30 modified SVGs were re-fetched and passed the SVG structure/style/prohibited-content checks; A/B/C shape distinctions were checked for Snap-to-guide, Sprite-sheet export and the eight pose actions.

WHAT I DID NOT DO:
- Did not edit app.html or index.html.
- Did not edit another AI's folder.
- Did not select final icon variants for the owner or integrate/activate any icon.
- Did not run the preview in a real browser, run the QA kit, or test app/runtime behavior. These remain NOT-TESTED.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Same action should use the same icon across G-Warp; these are proposals only.
- Keep the G-Warp bean/blob character in pose icons; no stick figures, cats, Scratch/Pivot/Adobe/other-brand art, or AI watermark.
- Owner selects A/B/C; Claude alone integrates after the required approval/model verification.
- Keep current app behavior unchanged until integration is separately authorized.

FILES CHANGED:
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-I2/icons/ — 30 SVGs refined: snap-to-guide A/B/C; lock-guides C; export-sheet A/B/C; pose-library B; run C; jump A/B/C; idle A/B/C; punch A/B/C; kick A/B/C; wave A/B/C; hurt A/B/C; win A/B/C.
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-I2/preview.html — expanded all A/B/C size previews.
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-I2/NOTES.md — count and validation notes corrected.
- AI-TEAM.txt — ANIM-I2 marked DONE.
- MERGE-QUEUE.txt — added WAITING FOR CLAUDE handoff.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — session start and closeout entries.
- app.html / index.html — unchanged.

COMMANDS / TESTS / RESULTS:
- GitHub fetch/read-back: PASS for modified SVGs, NOTES, preview, AI-TEAM, MERGE-QUEUE and own log.
- Icon inventory: 38 actions × 3 variants = 114 unique SVGs; preview contains 456 references and 38 size strips.
- Static SVG checks on the 114-file set and re-checks of the 30 refined files: PASS for SVG root, 24×24 viewBox, 1.9px stroke, round caps/joins, <4 KB, no script, external resource, embedded image, foreignObject, font, or AI watermark.
- A/B/C distinct-shape check: PASS for Snap-to-guide, Sprite-sheet export, Run, Jump, Idle, Punch, Kick, Wave, Hurt and Win (3 distinct variants per action).
- Browser rendering / QA kit / G-Warp runtime / scratch-vm: NOT RUN.

EVIDENCE CLASS:
- SOURCE-VERIFIED for repository rules, task scope, package inventory and GitHub read-backs.
- STATIC-ANALYSIS for SVG structure/style and A/B/C shape checks.
- NOT-TESTED for browser preview, live app integration and runtime behavior.

BLOCKERS / UNCERTAINTIES:
- Owner review/pick of A/B/C variants is still required.
- Preview should be opened in a browser for visual review; no browser execution was available in this session.

NEXT STEP / HANDOFF:
- Claude: review the ANIM-I2 proposal in team/ai-team/shared/2026-10-26-chatgpt-ANIM-I2/; wait for owner icon choices before integration.
- ChatGPT: continue to the next WEB-eligible animation task; ANIM-C1 is TERMINAL-only and must wait for Freebuff/QA kit.

CHAT HISTORY COMPLETENESS:
PARTIAL — exact current request "Continue" recorded; task scope came from current GitHub instructions and prior repository log.

GITHUB CLOSEOUT VERIFICATION:
- Session-start personal-log commit SHA: 017cd44fa51f4f1c3f8a723f8a936523f790a3c2.
- AI-TEAM completion commit SHA: 5920f220de679ccc474f09e873469af725e7004b; read-back verified.
- MERGE-QUEUE handoff commit SHA: 579f54a5186c6a544333f8461554f4f938698214; read-back verified.
- Preview latest fetched blob SHA: 9122721869a12840e06aa7f51c03baf3697f03a9.
- NOTES latest fetched blob SHA: ae8b929377782ad46a95a6cd842b09973c9612a8.
- Task status: DONE for the static proposal package; browser / integration remains NOT-TESTED.
--- END ENTRY ---


--- ENTRY ---
SESSION START / TASK RECORD
UTC timestamp: 2026-10-26T13:51:12Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-G1 — The Liner / guide lines (WEB phase; terminal validation remains pending)
Branch / starting commit: main / 3c07db67e471bec835938c8df864d07c1c6cda83

USER REQUEST (verbatim when available; keep distinct from interpretation):
"Continue"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
Continue in the ChatGPT animation task list after ANIM-I2. Take ANIM-G1, beginning with its WEB phase: source inspection, coordinate/data model, non-integrated proposal module and integration handoff. Requirements: rulers on paint editor + Animation canvas; free guides and built-in centre/ground/head/stage guides; snapping model for shapes/bone ends; per-sprite persistent data outside SVG; same guide positions in paint, Flipbook and Animation; guide lock. Do not touch app.html/index.html, do not guess private APIs, do not activate/integrate. Terminal/browser/200-shape smoothness checks are NOT part of this WEB-only deliverable and must remain pending.

PROGRESS / AI RESPONSE:
Read own log, task list, README, shared logging template, AI-TEAM, and merge queue. ANIM-I2 is fully closed out. The next free item is ANIM-G1 [WEB then TERMINAL]. Initial source inspection shows `GW_VECTOR_EDITOR.mapFor(c)`, `GW_V15_COSTUME_EDITOR.state`, `window.GW_ANIM.state`, `#gwCostumeCanvasWrapV15`, and `#gw18Svg` are real current names. The project serializer explicitly preserves `gwAnimations` but no guide-data property has yet been confirmed. Existing workspace `#snapPreviewLine` is block-stack snapping, not shape/bone snapping.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Keep guides as overlays separate from costume SVG; NEVER serialize/draw guide lines into costume art.
- Keep G-Warp look and existing editor/animation controls; do not replace existing features.
- Zero is costume rotation-centre; rulers report stage pixels, 480×360 outline.
- Per-sprite guide data must be explicitly included by Claude in project save/load serialization; do not assume arbitrary sprite fields persist.
- Avoid monkey-patching private pointer event handlers or inventing a generic Snap button. Mark unavailable integration hooks UNSURE and specify the narrow hook Claude needs.
- Claude alone performs runtime/browser integration tests and final app integration after required model verification and owner approval.

FILES CHANGED:
- NONE at session start.

COMMANDS / TESTS / RESULTS:
- GitHub reads: own full log, current animation task list, README, AI-CHAT-LOG template, AI-TEAM, MERGE-QUEUE; current G1 acceptance text read.
- Latest repository commit search: `3c07db67e471bec835938c8df864d07c1c6cda83`, main history tip at session start.
- No source changes or tests yet.

EVIDENCE CLASS:
- SOURCE-VERIFIED for repository rules/task scope and first source-symbol excerpts.
- NOT-TESTED for implementation, browser display, drag interactions, serialization round-trip, snapping and performance.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- Need inspect current Flipbook/player DOM and whether any editor Snap control or shape snap hook really exists.
- Save/load serializer has no verified gwAnimGuides hook; Claude may need to add it.
- Official coordinates for frame-one geometry and animation viewBox relative to costume centre must be verified before setting default ground/head lines.

NEXT STEP / HANDOFF:
Inspect source for Flipbook canvas/preview nodes, animation drawing/drag events, paint editor event paths and Snap UI. Then build a self-contained non-integrated candidate and document exact missing integration seams. Do not declare G1 fully DONE until terminal/browser 200-shape test passes.

CHAT HISTORY COMPLETENESS:
PARTIAL — exact user request "Continue" captured; task details derived from current GitHub task file and verified app source.
--- END ENTRY ---


--- ENTRY ---
SESSION PROGRESS
UTC timestamp: 2026-10-26T14:08:44Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-G1 — Guide-line proposal, WEB phase

PROGRESS / AI RESPONSE:
- Verified current source hooks: Paint wrapper/canvases, GW_VECTOR_EDITOR.mapFor, GW_V153_VECTOR.snap / #gwV153SnapBtn, GW_TRANSFORM.deltaFor, GW_ANIM.frameSvg/state/move, #gw18View/#gw18Svg, GW_FLIPBOOK state and 440×330 canvas, and projectData/loadProject serializer seams.
- Published shared candidate at team/ai-team/shared/2026-10-26-chatgpt-ANIM-G1/code/anim-guides.js, plus NOTES.md and a static concept preview.html.
- Added per-sprite guide metadata helpers, overlay/ruler renderers, custom guide drag/edit/lock, built-in centre/ground/head/stage guides, aligned Flipbook overlays, Paint/Animation snap helper functions, and project serialize/restore helpers.
- Static source review caught and corrected: drag preview renderer argument mismatch; preview being cleared by periodic refresh; settings panel retaining the old sprite after a sprite switch; nonzero Animation viewBox origin assumptions; bitmap canvas pixels not converted through costume res; unnecessary bitmap toDataURL polling; and null ground/head values displaying at y=0.
- Verified shared code and ChatGPT working copy are byte-identical. Read back code, notes and preview from GitHub.

FILES CHANGED:
- team/chatgpt/anim-guides.js (working copy)
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-G1/code/anim-guides.js
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-G1/NOTES.md
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-G1/preview.html
- No app.html, index.html, Claude folder or other AI folder changed.

STATIC CHECKS:
- Working-copy/drop-box byte equality: PASS.
- Guide metadata + serialize/restore helpers present: PASS.
- Paint and Animation snap helper exports present: PASS.
- Current-surface sprite resolution in reusable panel: PASS.
- Drag preview uses surface.info and survives refreshes: PASS.
- Nonzero viewBox origin, bitmap res scaling, null-value guard, no bitmap dataURL poll, and listener cleanup: PASS.
- Source-symbol checks against current app.html: PASS for identifiers and integration seams.

EVIDENCE CLASS:
- SOURCE-VERIFIED for inspected app symbols, source coordinate/Flipbook formula and project serialization seam.
- STATIC-ANALYSIS for candidate code structure and targeted issue corrections.
- NOT-TESTED for JavaScript parser/runtime, browser display, pointer/drag behavior, project save/load, export exclusion, snap interactions, and 200-shape performance.

BLOCKERS / UNCERTAINTIES:
- Project data writer/loader still needs Claude's explicit gwAnimGuides integration.
- Paint Select group move has a documented snap seam; new shape creation and reshape/resize handles require further integration at their actual event seams if the owner expects all such endpoints to snap.
- Animation move handler remains private and needs a controlled patch by Claude.
- Candidate uses a 500ms observer/poll refresh; performance must be tested and likely optimized with editor lifecycle events.

NEXT STEP / HANDOFF:
Claude: inspect the WEB candidate and integrate only after owner approval and exact required active-model verification. Then run the full ANIM-G1 browser/terminal acceptance, including a .gwarp save/reload round-trip and a 200-shape responsiveness test. Do not mark the feature complete before those tests pass.

CHAT HISTORY COMPLETENESS:
PARTIAL — request "Continue" recorded in the session-start entry; scope from current task file.
--- END ENTRY ---


--- ENTRY ---
SESSION START / TASK RECORD
UTC timestamp: 2026-10-26T14:09:52Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-L1 — Layers panel with previews (WEB phase)
Branch / starting commit: main / b641e00cf2aa594b8036966c0eb135f948e82b0f

USER REQUEST (verbatim when available; keep distinct from interpretation):
"Continue"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
Continue down team/ai-team/CHATGPT-JOBS.md › CHATGPT-ANIMATION-TODO-2026-10-26.txt after ANIM-G1's WEB-phase handoff. Take the next [WEB then TERMINAL] job, ANIM-L1. Inspect and document existing paint layer-order/selection APIs and Animation rig/parts/frame data before designing anything. Prepare an isolated proposal module under team/ai-team/shared/2026-10-26-chatgpt-ANIM-L1/code/anim-layers.js, plus NOTES.md and a static preview. Required features: closable Layers panel in vector Paint and Animation; one row per shape/group top-to-front, layer-only thumbnail, rename, hide while editing, lock, Animation bone color dot; hover highlights only that layer; click selects; drag reorder updates the same stack order as Forward/Backward/Front/Back; Animation per-frame layer order is stored per frame and applied by Make costumes. No app.html/index.html edits, no cross-AI folder edits, no live integration; terminal acceptance remains separate.

PROGRESS / AI RESPONSE:
Confirmed the job list places ANIM-L1 immediately after ANIM-G1. Current task line is [WEB then TERMINAL]. Exact task wording was read from the source job file. Starting commit came from GitHub's latest commit search.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Keep current Forward/Backward/Front/Back behavior; the Layers panel must use the same source-of-truth order, not a parallel order.
- Hide is an editing-only visibility state by default and must not silently change project/export visibility.
- Animation frame order is distinct from base costume/rig order and must not overwrite other frames.
- Do not guess undocumented/private APIs. If no safe public hook exists, document the exact hook Claude must add.
- Keep G-Warp styling and existing features. No Scratch art/logos/cat, Pivot art, third-party brand art, or AI watermark.
- Claude integrates; owner approves.

FILES CHANGED:
- NONE at session start.

COMMANDS / TESTS / RESULTS:
- Read current AI rules, shared log template, own log tail, ChatGPT task line, ANIM-L1 exact scope, QA kit README and job guide.
- Latest commit at session start: b641e00cf2aa594b8036966c0eb135f948e82b0f.
- No source modifications or tests yet.

EVIDENCE CLASS:
- SOURCE-VERIFIED for task scope and repository workflow instructions.
- NOT-TESTED for source/API inspection, module proposal and runtime behavior (work not started).

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- Existing vector order APIs, SVG source-of-truth, Animation parts mapping, per-frame order support and Make costumes serializer are not yet verified.
- Thumbnail rendering must not alter active editor selection, onion skin, or project content.

NEXT STEP / HANDOFF:
Inspect current app.html for the Paint forward/backward functions, shape/group selection and object list; then inspect GW_ANIM state/parts/frame and makeCostumes. Only after identifying actual source APIs, write the isolated candidate and document any hooks Claude must add.

CHAT HISTORY COMPLETENESS:
PARTIAL — exact request "Continue" recorded; ANIM-L1 scope is copied from the current task file and not reconstructed from an unavailable original task chat.
--- END ENTRY ---


--- ENTRY ---
SESSION PROGRESS / WEB-PHASE HANDOFF
UTC timestamp: 2026-10-26T14:21:11Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-L1 — Layers panel with previews
Branch / starting commit: main / b641e00cf2aa594b8036966c0eb135f948e82b0f

USER REQUEST (verbatim when available):
"Continue"

WHAT WAS COMPLETED IN THE WEB PHASE:
- Inspected current Paint Forward/Backward/Front/Back source of truth, exact isArt predicate, selected-node state and CE.save(true) behavior.
- Inspected Animation state, partPaths, anim.parts numeric-path mapping, loadArt, applyPose, markParts, attach, autoAttach, showPose, frameSvg, makeCostumes and undo history KEEP/pack.
- Built isolated proposal module team/chatgpt/anim-layers.js and shared it byte-identically at team/ai-team/shared/2026-10-26-chatgpt-ANIM-L1/code/anim-layers.js.
- Candidate includes Paint layer list from actual SVG child order, thumbnails, rename, temporary editing hide, lock metadata, hover/selection highlight, drag reorder, Animation bone dots, stable Animation layer IDs, per-frame layerOrder arrays and frame-order application helpers.
- Corrected the Paint art predicate to exactly match the existing toolbar's isArt predicate.
- Documented exact missing Claude hooks for Paint selection and lock enforcement; Animation stable ID migration, applyPose/markParts/attach/autoAttach lookup, showPose/frameSvg order application, undo history APIs, and layerMeta history.
- Created NOTES.md with detailed source references and integration instructions, plus static HTML concept preview.
- Re-fetched code/notes/preview and verified all static checks listed below.

FILES CHANGED:
- team/chatgpt/anim-layers.js
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-L1/code/anim-layers.js
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-L1/NOTES.md
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-L1/preview.html
- app.html and index.html unchanged.

STATIC CHECKS:
- ChatGPT working copy and shared drop-box module byte-identical: PASS.
- Paint predicate matches current toolbar: PASS.
- Paint reorder reads/writes the existing SVG stacking order, not a parallel ordering array: PASS.
- Animation stable part ID migration, per-frame order, apply-order and path/original-transform remapping helpers present: PASS.
- Animation historySnapshot / refresh bridge calls documented and present: PASS.
- Notes and preview links/content read back from GitHub: PASS.

EVIDENCE CLASS:
- SOURCE-VERIFIED for the existing Paint/Animation source structures and integration seams.
- STATIC-ANALYSIS for candidate design and source-string checks.
- NOT-TESTED for JavaScript parsing/execution, browser UI, individual thumbnails, click/hover/select, lock enforcement, drag reorder, undo/redo, Paint/Animation save/load, per-frame order restoration, Make costumes, exports and performance.

IMPORTANT LIMITATIONS / BLOCKERS:
- Paint selection requires Claude to expose GW_TRANSFORM.selectLayer(node); locking requires guards in canvas edit and order controls.
- Animation currently keys attachments by numeric SVG paths. Claude must apply stable-key migration and update applyPose/markParts/attach/autoAttach before enabling reorder, or attachments can silently shift to another shape.
- Claude must wire applyCurrentFrame into showPose, applyFrameOrder into frameSvg, and add layerMeta/history helper APIs as documented.
- No browser, QA kit, app runtime, save/load or Make costumes test has been run. ANIM-L1 is NOT COMPLETE; only the WEB candidate is ready for review.

NEXT STEP / HANDOFF:
Claude: review the proposal; make the explicitly documented source changes only after owner approval and required model verification; then execute all terminal/browser tests in NOTES.md, especially bone attachment preservation, per-frame frameSvg/Make costumes order, 12-layer test, undo/redo and project round-trip. Do not mark complete before these pass.

GITHUB READ-BACK EVIDENCE:
- Module blob SHA (working + shared): 021d22e11460e3657cbaf021c83c89602e0ad5b4.
- NOTES blob SHA: b12f8a16248c4bd535cfcad323554f387ba2886b.
- Preview blob SHA: b8ae38f64069a7dd98a985958c1681d1230d3394.
- Shared module publish commit: 36090c5def7063618091aa13a89c93aad45720a6.
- Task status: WEB-PHASE CANDIDATE; terminal/browser acceptance remains NOT-TESTED.

CHAT HISTORY COMPLETENESS:
PARTIAL — current request "Continue" captured; exact ANIM-L1 task requirements and source findings captured from GitHub.
--- END ENTRY ---


--- ENTRY ---
SESSION START / TASK RECORD
UTC timestamp: 2026-10-26T14:22:11Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: ANIM-P1 — Motion tools: spec first, then isolated proposal
Branch / starting commit: main / latest branch tip read before this entry; prior ANIM-L1 shared code commit 36090c5def7063618091aa13a89c93aad45720a6

USER REQUEST (verbatim when available; keep distinct from interpretation):
"Continue"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
Current job file assigns ANIM-P1 [WEB]. Write team/chatgpt/ANIM-P1-SPEC.md first, then isolated code proposal(s). Scope: (1) add ease curve options Linear/Ease/Bounce/Snap to existing In-between / Smooth x2 / Glide without replacing them; owner must approve any default change; (2) hold frames 1-4 ticks; choose and justify whether Make costumes repeats a generated costume or Animation blocks wait longer; (3) per-bone squash/stretch constrained to 60-140%; (4) optional delayed, reduced follow-through for chains; (5) mirror pose and copy/paste pose across frames/animations; (6) pose library JSON angle data for rigs with standard names, usable on the user's own character. Optional ground shadow / smear blur only after items 1-6. No art; pose data is JSON angles only. Keep proposals disconnected from app.html/index.html. Do not take or change the default easing without owner approval.

PROGRESS / AI RESPONSE:
Read current README, mandatory log template, personal log tail, and exact ANIM-P1 job scope. ANIM-L1 WEB candidate has already been handed off. No ANIM-P1 source inspection or code changes yet.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Current In-between / Smooth x2 / Glide remain available unchanged; curve option layers on top.
- Default ease-in-out recommendation requires explicit owner approval.
- Hold frames should be data on each frame and affect generated costume timing without breaking Scratch sprite/costume behavior; inspect actual frame timing and block runtime first.
- Scale along bone axis around joint; 60-140%, must not distort unrelated bones/art.
- Follow-through is optional and only for explicitly enabled chains.
- Pose library contains JSON bone-angle/pose data only, applied to user rig by standard bone names; no bundled art.
- Claude alone integrates; owner approves; all browser/runtime checks remain Claude's responsibility.

FILES CHANGED:
- NONE at session start.

COMMANDS / TESTS / RESULTS:
- Read team/ai-team/README.md, team/ai-team/AI-CHAT-LOG-TEMPLATE.txt, own log, and exact ANIM-P1 task line.
- No code or tests yet.

EVIDENCE CLASS:
- SOURCE-VERIFIED for current task assignment and team instructions.
- NOT-TESTED for app behavior and proposed motion features (work not started).

BLOCKERS / UNCERTAINTIES:
- Need inspect current interpolation/Glide/Smooth x2, animation frame object, rig bone transforms, mirroring, undo and Make costumes timing APIs before specifying implementation.
- Need decide hold-frame representation only after checking existing Scratch animation block/runtime and project serialization.

NEXT STEP / HANDOFF:
Inspect current app.html source for tween interpolation, frame state, bone transforms, frame mutation and pose creation; write the spec first. Then create a disconnected proposal module and data-only poses.json with exact integration seams/terminal test checklist.

CHAT HISTORY COMPLETENESS:
PARTIAL — request "Continue" captured; task scope copied from current GitHub task list, not reconstructed from an unavailable original chat.
--- END ENTRY ---


--- ENTRY ---
SESSION START / TASK RECORD
UTC timestamp: 2026-10-26T20:27:58Z
AI / agent / exact model identity (only if verified): ChatGPT GPT-6
Task ID / title: COMPARE-1 — Current G-Warp vs TurboWarp and PenguinMod; identify positioning, gaps, and practical priorities
Branch / starting commit: main / 74297a3d9af49489f7275c02d29a93269c34e74e

USER REQUEST (verbatim when available; keep distinct from interpretation):
"Definitely. Because at the end of the day, the goal is not to be the number one, which is TurboWarp. Let's be real. My goal is not to beat them. My goal is to be better and to be an option out there. ... The only reason, or maybe one of the most recent ones that people would go to my version, will be for the music ... and the animation. And probably maybe ... the AI system. ... go ahead and do the comparison, side by side, and what's lacking, what we're missing, and what we need to add. ... The goal is to be known, or at least recognized as one of the best for yada yada yada, not to be the worst one for this, this, and that."

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
- Read current G-Warp source/docs and compare the real current product against official TurboWarp and PenguinMod features.
- Prioritize G-Warp's identity: music creation, animation, and possibly AI; do not frame success as defeating or replacing TurboWarp/PenguinMod.
- Identify what G-Warp already has, what it lacks, what should be improved, and what should not be copied/added.
- Research/report only. No app.html/index.html edits, no runtime integration, no tests claimed unless actually run.

PROGRESS / AI RESPONSE:
- Began source and competitor documentation review. Current repo main baseline is 74297a3d9af49489f7275c02d29a93269c34e74e.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- G-Warp is its own engine; do not assume Scratch VM APIs.
- Preserve the G-Warp dark/electric identity and existing features; add, do not replace.
- Owner's goal is recognition for focused strengths and reusable creative outputs, not market domination.
- Claude alone integrates live app.html/index.html changes; owner approval required.

FILES CHANGED:
- NONE at session start.

COMMANDS / TESTS / RESULTS:
- Read AI-TEAM.txt, team/ai-team/README.md, mandatory log template, ChatGPT personal log, task list, current README, ENGINE-MAP, TODO, current animation/music plans, missing-list, and current AIM-K1 gaps/notes.
- Reviewed official TurboWarp and PenguinMod documentation pages. No app/browser tests run.

EVIDENCE CLASS:
- SOURCE-VERIFIED for the reviewed current repository documents and fetched source metadata.
- NOT-TESTED for actual runtime/UI behavior and cross-platform project compatibility.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- Need distinguish documented features from behavior verified in a running app.
- G-Warp's own engine means Scratch/TurboWarp/PenguinMod compatibility is partial and must not be implied to be complete.

NEXT STEP / HANDOFF:
- Finish the feature-by-feature comparison and prioritized recommendations; create a concise report in team/chatgpt/, append closeout, update AI-TEAM work log, and read back all commits.

CHAT HISTORY COMPLETENESS:
PARTIAL — current user request summarized faithfully; no additional transcript reconstruction.
--- END ENTRY ---


--- ENTRY ---
SESSION CLOSEOUT
UTC timestamp: 2026-10-26T20:29:41Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: COMPARE-1 — Current G-Warp vs TurboWarp and PenguinMod; positioning, gaps and practical priorities
Branch / report commit: main / 5d28412e576e1a642b9aee6f7f00dd53304ca312

USER REQUEST:
The owner clarified that G-Warp is not intended to beat TurboWarp. The goal is to become a recognized option with distinctive strengths in music and animation, with AI as a possible additional strength. The owner asked for a side-by-side comparison, missing features, and recommendations for what to add.

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
- Compare G-Warp against official TurboWarp and PenguinMod capabilities using current repo docs and official platform docs.
- Focus on music, animation, reusable creative outputs, core trust/parity and optional project-aware AI.
- Do not edit app.html/index.html, integrate code, or imply untested behavior.

PROGRESS / AI RESPONSE:
- Completed an 18,383-character comparison and product-positioning report at team/chatgpt/CHATGPT-NOTES.md › COMPARE-TURBOWARP-PENGUINMOD-GWARP-2026-10-26.md.
- Key conclusion: position G-Warp as a block-coding creative studio known for approachable music creation and character animation, connected to playable projects; do not market it as a TurboWarp replacement.
- Identified strengths already documented: Song Maker/Loop Maker/Sound Studio, genre-mood-theme generation, Flipbook, skeletal rigging, frame editing, onion skin, in-betweening, and Make costumes.
- Identified priorities: animation persistence/alignment/layers/timeline/Stop/undo; editable music stems/arrangement/per-part controls/export; core save/load/runtime trust; AI later as transparent project-aware creative coach.
- Highlighted that PenguinMod already has music-related extensions, so G-Warp's differentiator should be native integrated workflow rather than claiming unique access to music creation.
- Flagged the Song Maker A/B numbers as Claude-recorded generator-recipe diversity, not independent listening-quality results; noted the referenced standalone B prototype file is empty in current main.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Owner's goal is recognition for specialist strengths and asset reuse, not beating TurboWarp/PenguinMod.
- G-Warp is its own engine; compatibility remains improving and must be tested rather than assumed.
- Preserve the G-Warp look and existing systems; add, don't replace.
- Claude alone integrates app.html/index.html; owner approval is required.
- AI is a potential future strength, not a finished headline feature until tested and safe.

FILES CHANGED:
- team/chatgpt/CHATGPT-NOTES.md › COMPARE-TURBOWARP-PENGUINMOD-GWARP-2026-10-26.md — new research/positioning report.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — appended this session start and closeout.
- AI-TEAM.txt — session claim and completion status.
- app.html and index.html — NOT changed.

COMMANDS / TESTS / RESULTS:
- Read current repository README, ENGINE-MAP, TODO, MISSING-LIST, animation plan, music comparison page, music research notes, AI knowledge-pack notes/gaps, AI-TEAM rules, mandatory template, ChatGPT personal log and ChatGPT task list.
- Reviewed official TurboWarp Desktop/docs/Packager/custom-extension docs and PenguinMod overview/modules/extensions/gallery docs.
- Created report via GitHub API; fetched it back. Read-back: 18,383 characters; report blob SHA 5f97750299ae26f19cf6b3ab51c35f662dbdc70a.
- No local git pull, no Freebuff, no browser, no app runtime, no audio listening, no exports, no compatibility or performance tests.

EVIDENCE CLASS:
- SOURCE-VERIFIED for reviewed repository documentation/source metadata and official platform documentation.
- STATIC-ANALYSIS for comparison, positioning and roadmap recommendations.
- NOT-TESTED for all G-Warp runtime, UI, audio, animation, export, compatibility and performance claims.

BLOCKERS / UNCERTAINTIES:
- Repository MISSING-LIST includes a 2026-10-19 audit that counted palette presence and stopped early; it may be stale and does not prove current runtime gaps.
- Song Maker A/B measurements are recorded by Claude and not independently rerun; they measure recipe diversity, not listening quality.
- Current app.html blob was identified as 73da98db21bcc8da72d73c6e1ca3eedce51fb191 (2,680,714 bytes), but this session did not fully inspect or execute the app.
- No comparable verified feature/quality benchmark was run against TurboWarp or PenguinMod.

NEXT STEP / HANDOFF:
Owner selects one bounded P0 music or animation improvement. Claude reviews current source and performs any integration only after required model/owner gates; then run focused runtime acceptance. Recommended first candidates: (a) animation save/reopen + global Stop + centre alignment, or (b) editable multi-stem Song Maker + audio export.

CHAT HISTORY COMPLETENESS:
PARTIAL — current request and relevant correction summarized; no unavailable prior conversation reconstructed.

GITHUB CLOSEOUT VERIFICATION:
- Personal log commit SHA: pending this append.
- Read-back URL/path: team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt
- Verified new entry is present at bottom: pending read-back.
- Task status: PARTIAL (research delivered; runtime comparison/testing not performed).
--- END ENTRY ---


--- VERIFICATION ADDENDUM ---
UTC timestamp: 2026-10-26T20:30:12Z
- Personal log closeout commit: 3dfce7591b345c9f6d4854324b4b365335ec9b45.
- Final personal-log read-back: blob 8ad51f8dd9db73b32ab61ee1a932ad5e8bdf785b; closeout entry confirmed at bottom and terminates with --- END ENTRY ---.
- Report read-back: 18,383 characters; blob 5f97750299ae26f19cf6b3ab51c35f662dbdc70a.
- Shared AI-TEAM completion entry read-back: blob 4ea2db0d0f3e76b8ed814783a8517d62ee45aa08; COMPARE-1 DONE line confirmed.
- Final main branch head at this verification: 4d6c5476550d78af383962ea714348df8f23d2a6.
- Status remains PARTIAL with respect to runtime comparison: research/report delivered; no runtime tests were run.
--- END VERIFICATION ADDENDUM ---


--- ENTRY ---
SESSION START / TASK RECORD
UTC timestamp: 2026-10-26T20:39:29Z
AI / agent / exact model identity (only if verified): ChatGPT GPT-6
Task ID / title: IDEA-STRATEGY-1 — Record G-Warp free/open creative identity and separate far-future product boundary
Branch / starting commit: main / f839f1f6d18eef1814560f552a023f21693c4366

USER REQUEST (verbatim when available; keep distinct from interpretation):
"Everything for now is just beta. We still got a lot to do. ... go ahead and add it to the To-Do idea for future, or for the other one. ... the goal is not to be better. The goal is to some point, if it's possible, become better than TurboWarp and Penguin. But at the same time, if we cannot make it to be better than those two, then the goal is just to be known for something. ... if ... TurboWarp or Penguin or any other likes to grab my ideas and use it on my app or use it on their app, they are welcome to do so. ... these resources are free. So why would I give my resources to be paid? ... there's another thing that I'm trying to create. But that one definitely is different compared to what Scratch is. That one might have to be paid because I'm gonna be adding a little extra stuff. But that is a far future thing. ... before adding it, read what I added, and you will see what I mean."

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
- Read the existing owner-created Plus Extensions, Tab Plus, G-Warp 3D, Future Ideas, TODO and licence documents before writing.
- Record a strategy that keeps current G-Warp/core creative resources free and open, welcomes reuse of ideas by other Scratch-derived communities, and frames success as either exceptional capability or recognition for distinctive strengths.
- Keep all features beta/experimental until their quality and reliability are proven.
- Record the separate far-future G-Warp 3D/expanded product as a possible separately priced product, not a decision or current work item; preserve the free core and avoid any monetization or licence changes now.
- Update only future-idea documentation / TODO idea parking sections. No app.html/index.html edits.

PROGRESS / AI RESPONSE:
- Read current TODO.txt, team/ai-team/FUTURE-IDEAS.txt, team/ai-team/ideas/PLUS-EXTENSIONS-AND-3D-2026-10-26.md, team/ai-team/ideas/TAB-PLUS-2026-10-26.md, team/ai-team/ideas/GWARP-DESKTOP-EXE-2026-10-26.md, team/ai-team/ideas/GWARP-AI-MODEL-2026-10-26.md, README.md, LICENSE, AI-TEAM rules, mandatory log template and the complete ChatGPT personal log.
- Found the user's separate idea already documented as a future G-Warp 3D version (simple browser runner and fuller desktop edition), alongside Plus extensions and Tab Plus. The docs say IDEA ONLY / nothing built. The repository currently uses MIT for G-Warp code.
- The current TODO already contains an idea pointer to Plus extensions + G-Warp 3D and a separate Tab Plus idea. This task will add a strategic companion note and update the bottom IDEAS pointer rather than create a duplicate implementation task.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- G-Warp is beta; do not describe proposed strengths as completed or proven.
- Ambition remains open: G-Warp may eventually outperform competitors in selected areas, but if not, recognition for specialist value is still a success.
- Core G-Warp and reusable community resources remain free/open by owner intent; allow others to reuse ideas/resources under applicable licences and attribution.
- A separate far-future expanded 3D product may be considered for pricing only if it is genuinely distinct and adds substantial value. No decision, pricing, paywall, licence change, or implementation now.
- Preserve MIT licence for current core unless the owner explicitly decides otherwise; third-party materials remain governed by their own licences.
- All app/source integration remains under Claude's role and owner approval.

FILES CHANGED:
- NONE at session start.

COMMANDS / TESTS / RESULTS:
- Read GitHub repository documents via GitHub API; no source/runtime tests run.

EVIDENCE CLASS:
- SOURCE-VERIFIED for existing repository idea documents, TODO entries, README and MIT licence.
- OWNER-INTENT for the current user's product and openness decisions.
- STATIC-ANALYSIS for the proposed roadmap/monetization boundary.
- NOT-TESTED for all product/runtime behavior.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- The phrase "another thing" is interpreted as the already documented far-future G-Warp 3D / expanded 3D desktop product, because the existing owner idea file explicitly distinguishes a basic online 3D runner from a full desktop version. The pricing concept remains tentative and is clearly labelled as such.
- Current MIT licence permits commercial use and redistribution under its terms; this task does not change it. Any future proprietary paid product boundary needs a separate licence/dependency review before implementation.

NEXT STEP / HANDOFF:
Create a strategy note, add a bottom-of-TODO IDEAS pointer, update the existing Plus/3D idea document with the free/open ecosystem boundary, then read back every changed file and close the log.

CHAT HISTORY COMPLETENESS:
PARTIAL — current owner request recorded; interpretation of the separate product is explicitly labelled as an assumption based on the existing repository plan.
--- END ENTRY ---


--- ENTRY ---
SESSION CLOSEOUT
UTC timestamp: 2026-10-26T20:40:47Z
AI / agent / exact model identity: ChatGPT GPT-6
Task ID / title: IDEA-STRATEGY-1 — G-Warp free/open identity and far-future separate 3D product boundary
Branch / result baseline: main / final content read-back at main head 5a987c20a94bafbc647909cd472b32de617dbf50

USER REQUEST:
The owner said G-Warp is still beta and has much work ahead; asked to add the comparison/positioning ideas to the future TODO. The owner clarified that G-Warp should keep striving to be better than TurboWarp/PenguinMod where possible, but recognition for distinctive strengths is also a valid success. The owner welcomes other Scratch-derived communities reusing G-Warp ideas/resources because they are free. The owner also mentioned a separate future product that may be paid because it adds extra value, and asked me to read the existing repository ideas before recording it.

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
- Read existing Plus Extensions, Tab Plus, G-Warp 3D, future ideas, TODO, README, LICENSE and team rules before recording the strategy.
- Preserve free/open core and reusable resources; welcome reuse under the relevant licences and credit.
- Treat the separate 3D/expanded desktop concept as a possible future paid product only, not a decision.
- Add future-idea documentation and a TODO pointer only; no app source edits or implementation.

PROGRESS / AI RESPONSE:
- Read existing files. Identified the separate future product concept as the already-documented G-Warp 3D idea: simple browser runner plus fuller 3D desktop experience. This interpretation is explicitly labelled as an assumption based on the repository's idea document.
- Created team/ai-team/ideas/GWARP-FREE-OPEN-IDENTITY-AND-3D-BOUNDARY-2026-10-26.md (6,541 characters) describing the dual success paths (exceptional capability or recognition), beta honesty, free/open core, community reuse, and a separate future 3D product boundary.
- Appended a clarification section to team/ai-team/ideas/PLUS-EXTENSIONS-AND-3D-2026-10-26.md.
- Added a parked idea entry under the bottom IDEAS section of TODO.txt, linking both idea documents.
- Kept current MIT licence unchanged; no pricing, paywall, accounts, payment infrastructure, implementation or app behavior was authorized.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- All current G-Warp features remain beta until properly tested and matured.
- Continue aiming high; outperforming competitors in meaningful areas remains possible, but specialist recognition is also a successful outcome.
- Keep current G-Warp core and reusable community resources free/open by owner intent; welcome reuse subject to applicable licences and credit.
- Current repository LICENSE remains MIT. MIT's existing grants cannot be silently revoked or narrowed by a future paid edition.
- G-Warp 3D / expanded desktop edition may be evaluated separately for pricing only if it provides substantial additional value. No business model or price is decided.
- Do not chargewall current 2D core, projects or assets; no licensing changes, payment features, app integration or release changes.

FILES CHANGED:
- team/ai-team/ideas/GWARP-FREE-OPEN-IDENTITY-AND-3D-BOUNDARY-2026-10-26.md — created.
- team/ai-team/ideas/PLUS-EXTENSIONS-AND-3D-2026-10-26.md — appended product-openness / separate 3D boundary clarification.
- TODO.txt — added a new parked entry under IDEAS.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — appended session start and closeout.
- AI-TEAM.txt — session claim and completion status.
- app.html, index.html, LICENSE — NOT changed.

COMMANDS / TESTS / RESULTS:
- GitHub read-back verified the new strategy note: 6,541 chars; blob SHA 0c596422abcfb8794ee39ea32f1e8cc9a45a4700.
- GitHub read-back verified updated Plus/3D idea: 4,766 chars; blob SHA b3e73f911b90d593d72a5ab6f7d909de4c49a2af.
- GitHub read-back verified updated TODO: 27,850 chars; new idea present under IDEAS; blob SHA 7cdaea01f7f8a9a26b2b3317f179709f2798ef20.
- No app/runtime/browser tests were run; this is documentation only.

EVIDENCE CLASS:
- SOURCE-VERIFIED for repository documents and licence text.
- OWNER-INTENT for current free/open and future product decisions.
- STATIC-ANALYSIS for the strategy and licensing boundary recommendations.
- NOT-TESTED for runtime/product behavior.

BLOCKERS / UNCERTAINTIES:
- The owner's phrase about a separate future paid product is interpreted as the existing G-Warp 3D / expanded desktop direction. If the owner meant a different separate project, this note should be corrected later; no implementation depends on this interpretation.
- Future commercial distribution requires a separate review of MIT code, contributions, dependencies and third-party assets/models. No legal advice or licensing decision is made here.

NEXT STEP / HANDOFF:
Keep the free beta work on current priorities. Leave Plus Extensions, Tab Plus and G-Warp 3D parked until the owner selects them. Revisit a separate 3D pricing/licence plan only after the product scope and additional value are defined.

CHAT HISTORY COMPLETENESS:
PARTIAL — this owner's request is recorded; the separate-product identification is labelled as an assumption grounded in the existing idea file.

GITHUB CLOSEOUT VERIFICATION:
- Personal log commit SHA: pending append.
- Read-back path: team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt.
- Verified entry at bottom: pending read-back.
- Task status: PARTIAL (future strategy documentation saved; no implementation/tests requested or performed).
--- END ENTRY ---


--- VERIFICATION ADDENDUM ---
UTC timestamp: 2026-10-26T20:41:12Z
- Personal closeout commit: 3cbbdbbbf49f808682b3552604aac2c432c4b799.
- Final read-back: team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt blob 41efdffc7f5d0ff18e1957765b7f131c0ee5ccf0; closeout entry is present at bottom and ends with --- END ENTRY ---.
- Shared AI-TEAM DONE line verified: blob 501c87f382a00fe03e50e454a025d5725ef76bc4.
- Strategy note verified: blob 0c596422abcfb8794ee39ea32f1e8cc9a45a4700.
- Plus/3D idea update verified: blob b3e73f911b90d593d72a5ab6f7d909de4c49a2af.
- TODO update verified: blob 7cdaea01f7f8a9a26b2b3317f179709f2798ef20.
- Main branch head at this verification: 43b6bbcfa7c85863a6722a2d85018e56c6b73e44.
- Runtime status remains NOT-TESTED; documentation-only task.
--- END VERIFICATION ADDENDUM ---


--- ENTRY ---
SESSION START — USER-REQUEST RESEARCH PASS 4
UTC timestamp: TIME NOT AVAILABLE (system supplied 2026-10-26 20:22 America/New_York without seconds; no precise UTC seconds available)
AI / agent / exact model identity: ChatGPT / GPT-6
Task ID / title: USER-REQUEST-RESEARCH-PASS-4 — enemy AI, boss telegraphs, puzzles, quests/dialogue, accessibility
Branch / starting commit: main (repository default branch; observed recent commit d8d68997a8a21d509781e8bcc166c6862d98b0ff)

USER REQUEST (verbatim):
"Back to research pls let do some more"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
- Continue the G-Warp creator/game-design research from the explicit next-step list in the previous pass-3 closeout.
- Research primary/credible sources on enemy state machines and pathfinding, boss telegraphs, puzzle logic, dialogue/quests, and accessibility.
- Produce a separate source-grounded report in the existing AIM-K1 research folder; preserve earlier reports.
- Keep this research-only: no demos, app.html/index.html edits, live runtime integration, feature claims, or automatic G-Warp mappings.
- Keep Griffpatch distinct from Griff; do not copy protected code, art, levels, characters, music, or branding; record source evidence level and uncertainties.

PROGRESS / AI RESPONSE:
- Read team/ai-team/README.md, AI-TEAM.txt (opening rules + last 30 lines), the shared log template, the complete ChatGPT context log, ChatGPT to-do, animation to-do, MERGE-QUEUE.txt, L2-AILAB session history, and previous creator research reports.
- Chose this subject sequence because the pass-3 closeout explicitly named these next research areas. The separate animation TODO remains listed in repository planning; this request is being treated as a direct user-directed research continuation, not a change to that TODO.
- Read-back verification of this session-start entry is required before web research begins.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Research only. No app/runtime files or private 3D concept detail.
- Cite source URLs and access dates; separate source statements from transferable design synthesis.
- Do not imply endorsement or copy source content. Attribution does not substitute for permission/licence.
- No child should be directed to payment/support links without parent/guardian review; this pass will focus on accessibility and design, not promotional content.

FILES CHANGED:
- None yet; this is the session-start record.

COMMANDS / TESTS / RESULTS:
- GitHub repository reads only; no local Git or Freebuff commands.
- No app/browser tests; research scope only.

EVIDENCE CLASS:
- SOURCE-VERIFIED for repository instructions and prior report state; WEB-RESEARCH not yet started; app behavior NOT-TESTED.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- The repository commit search identifies d8d68997a8a21d509781e8bcc166c6862d98b0ff as the latest recent commit; default branch is treated as main based on existing repository context.
- No inference will be made that any researched mechanic exists in current G-Warp.

NEXT STEP / HANDOFF:
- Commit this start record, read it back from GitHub, then conduct research and save a separate pass-4 report in team/ai-team/shared/2026-10-26-chatgpt-AIM-K1/.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this user request and the immediate repository handoff only.
--- END ENTRY ---


--- ENTRY ---
TIMESTAMP CORRECTION / START-LOG VERIFICATION
UTC timestamp: 2026-10-27T00:23:42Z
AI: ChatGPT / GPT-6
Task: USER-REQUEST-RESEARCH-PASS-4

The UTC time used on the initial AI-TEAM claim line was a minute-rounded placeholder derived from the supplied local clock, not a verified timestamp. It should not be treated as exact. A system UTC clock read at 2026-10-27T00:23:42Z; the shared work log now receives a corrected claim line below. The session-start entry itself remains honestly marked TIME NOT AVAILABLE because seconds were not available when it was written.

FILES CHANGED:
- AI-TEAM.txt — append correction and timestamped claim.
- This personal log — append this correction record only.

VERIFICATION:
- The session-start entry has been committed and must be read back from GitHub before continuing.
- No research has started yet.
--- END ENTRY ---


--- ENTRY ---
USER-REQUEST RESEARCH PASS 4 — CLOSEOUT
UTC timestamp: 2026-10-27T00:26:22Z
AI / agent / exact model identity: ChatGPT / GPT-6
Task ID / title: USER-REQUEST-RESEARCH-PASS-4 — enemy AI, boss telegraphs, puzzles, quests/dialogue, accessibility
Branch / baseline: main; recent baseline commit d8d68997a8a21d509781e8bcc166c6862d98b0ff

USER REQUEST (verbatim):
"Back to research pls let do some more"

SCOPE COMPLETED:
- Continued the previous research report's proposed next subjects: enemy AI state machines/pathfinding; boss attack readability; puzzle design and hinting; dialogue and quest architecture; accessibility.
- Saved a standalone report in the existing AIM-K1 shared research folder.
- Preserved the research-only scope. No new tutorial demos, project files, code proposals, mappings to current G-Warp blocks, or app/runtime edits.

RESEARCH FINDINGS:
- Enemy decision states and movement/pathfinding should be taught as separate systems: states explain why an enemy acts; navigation determines how it travels.
- A small Patrol / Chase / Fight / Search state loop is a comprehensible starting point; later layers can add perception memory, alert decay, last-known position and debug visibility.
- Boss attacks should communicate an attack tell, active threat, result and recovery window. Visual promise should match damage; do not rely on color alone.
- Puzzle lessons should teach a rule, then vary one meaningful constraint; optional progressive hints can guide without solving the puzzle automatically.
- Dialogue content, game state and presentation should be separate; quest/objective states should be explicit and saveable; branch paths should be testable.
- Accessibility should be built into editor and game workflows: multiple forms of information, readable text, no color-only or sound-only essential cues, adjustable speed/audio and alternatives to rapid/repetitive inputs.
- Report distinguishes page-inspected sources from abstract/index evidence and product-page descriptions. It explicitly says no G-Warp current capability mapping was performed.

FILES CHANGED:
- team/ai-team/shared/2026-10-26-chatgpt-AIM-K1/USER-REQUEST-RESEARCH-PASS-4-AI-PUZZLES-QUESTS-ACCESSIBILITY-2026-10-27.md — created; GitHub create-file commit 8b3984fbbf61f52e02150210a5ee7e25edd7599b; read-back blob 780b2750cade1b55b1095ad9e75e0e9bc65808ff; 18,342 characters; 9 main sections; key topic and limitations checks all present.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — appended session start, timestamp correction, and this closeout; append-only.
- AI-TEAM.txt — session claim and timestamp correction already appended; completion line will be recorded after this closeout.

COMMANDS / TESTS / RESULTS:
- GitHub API fetches: report read-back PASS; checked nine section headings plus the required five topic headings and explicit limitations section.
- No local git pull or Freebuff operation.
- No G-Warp smoke test, browser test, scratch-vm test, or external engine/addon execution; those are NOT-TESTED and outside this research scope.

EVIDENCE CLASS:
- WEB-RESEARCH: selected official engine docs, Yarn Spinner docs, Game Accessibility Guidelines, Microsoft guidance, design articles and creator material.
- SOURCE-VERIFIED: prior task instructions and the saved report read-back.
- NOT-TESTED: G-Warp runtime, external sample projects/plugins, and full videos. GDC puzzle talks were inspected by abstract/index only; GMTK video was reviewed through chapter metadata, not watched end-to-end.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- The report is research only. No app.html/index.html modifications.
- No claim that G-Warp currently supports the researched mechanics.
- No 3D future-product concept or private details included.
- No outside creator code, art, levels, music or branding copied.
- Previous research reports remain unchanged.
- The animation TODO remains in the repository's listed order; this direct user request was handled as a bounded research continuation and did not rewrite the backlog.

BLOCKERS / UNCERTAINTIES:
- GDC Vault page did not provide full talk access; the report labels those sources abstract/index only.
- The GMTK chapter index was a third-party index and its original video was not watched.
- Godot asset pages are product descriptions, not independent addon tests.
- No current G-Warp block catalog/runtime mapping performed.

NEXT STEP / HANDOFF:
- Research pass 4 is complete. Wait for the owner's next direction; future work may compare these concepts against the current block catalogue, but only as a separate explicitly scoped research task. No demos are authorized by this task.

CHAT HISTORY COMPLETENESS:
PARTIAL — records this request and repository work only.
--- END ENTRY ---


--- ENTRY ---
SESSION START / TASK RECORD — ANIMATION MOTION TOOLS CODE MATERIAL
UTC timestamp: 2026-10-27T00:33:46.453Z
AI / agent / exact model identity: ChatGPT / GPT-6
Task ID / title: ANIM-P1 — animation motion tools specification and isolated proposal
Branch / starting commit: main / a253e619c63ef942077e63cfe4f2c3c04b755625

USER REQUEST (verbatim when available):
"Well if you tinck all the research is good then bigen the code material pls"
Clarification: "It was supost to be a communication but ok. The gif but ok"

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
- The GIF was a communication, not a design reference or file asset.
- Move from research into code material, continuing the next unfinished assigned animation job: ANIM-P1.
- Read the current app source and existing Animation candidate notes before writing code; use only confirmed hooks.
- Deliver a concise spec plus a standalone module/data proposal in team/ai-team/shared/<date>-chatgpt-ANIM-P1/.
- Keep proposal disconnected from app.html/index.html. Do not alter existing In-between / Smooth x2 / Glide behavior; additive controls only.
- Include reversible changes, safe defaults, clear integration hooks, test plan and explicit NOT-TESTED evidence where runtime tests cannot be run here.
- Do not copy the GIF into the repository.

PROGRESS / AI RESPONSE:
- Re-read team/ai-team/README.md, AI-TEAM.txt, the mandatory log template, this complete ChatGPT log, ANIM todo, ChatGPT big to-do, ENGINE-MAP.txt, MERGE-QUEUE.txt, and relevant prior ANIM-G1/ANIM-L1 proposals.
- The current assigned next WEB job is ANIM-P1; terminal ANIM-0 and ANIM-C1 remain separate tasks requiring Freebuff/QA-kit runtime access.
- This session will first verify current app source identifiers and actual animation data model.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- The G-Warp animation UI remains G-Warp's own dark/electric style; no Scratch/Pivot/other brand assets or imitation.
- Add rather than replace. The current In-between / Smooth x2 / Glide controls remain.
- No code in the live app; Claude alone integrates after review and owner approval.
- No fabricated hooks or claims of runtime testing.
- The GIF is communication only and must not be treated as an asset/design specification.

FILES CHANGED:
- This personal log and shared AI-TEAM work log only at session start.

COMMANDS / TESTS / RESULTS:
- GitHub API reads only; no local Git/Freebuff.
- No runtime/browser test yet.

EVIDENCE CLASS:
- SOURCE-VERIFIED for repository workflow/task order; implementation-source review is pending.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- The proposal must be adapted to the current app source, not historical version notes.
- Browser/QA execution may be unavailable in this ChatGPT session; if so, mark NOT-TESTED and give Claude exact test instructions.

NEXT STEP / HANDOFF:
- Commit and read back this start record and the ANIM-P1 claim, then inspect current animation implementation and write the isolated proposal.

CHAT HISTORY COMPLETENESS:
PARTIAL — includes the current request and clarification only.
--- END ENTRY ---


PROGRESS — ANIM-P1 CODE MATERIAL
UTC timestamp: 2026-10-27T00:39:00.875Z
- Confirmed the prior 2026-10-26 ANIM-P1 handoff was incomplete: its NOTES.md linked to SPEC/module/pose/preview paths that returned 404. Marked that old note archived and redirected it to the new complete package.
- Updated team/chatgpt/anim-motion.js to helper v2. Corrected non-loop playback completion reporting (clock.done), numeric bone ID 0 / parent ID 0 handling, duplicate-name mapping, stretch map initialization, finite numeric clamping, and pose-application safety.
- Isolated V8 execution of the helper and its 23 assertions: 23/23 PASS. JSON pose library parsed and required clip IDs/frame lengths checked. Also compiled helper/test/preview inline JavaScript without executing the preview in a browser.
- New package read-back verified: SPEC.md, NOTES.md, code/anim-motion.js, code/poses.json, preview.html, tests/anim-motion.test.js. The package copy of the helper and JSON exactly matches the ChatGPT working copies. No external network reference in preview.
- GitHub connector returned an empty body for app.html, so this session could not refresh current private Animation solver/playback anchors against Beta v15.57.0. Claude must re-read current source before integration.
- NOT-TESTED in G-Warp: Node test file, browser preview, Animation UI, bone solver, actual playback/Make costumes, save/load, .sb3/Scratch VM compatibility, performance.


--- ENTRY ---
ANIM-P1 — CODE MATERIAL CLOSEOUT
UTC timestamp: 2026-10-27T00:39:34.576Z
AI / agent / exact model identity: ChatGPT / GPT-6
Task ID / title: ANIM-P1 — Animation motion tools specification and isolated code/data proposal
Branch / starting baseline: main / a253e619c63ef942077e63cfe4f2c3c04b755625
Final observed main head before closeout: 5d5a2d46196ed42f9affc9e376fe1d3d919e0640

USER REQUEST (verbatim):
"Well if you tinck all the research is good then bigen the code material pls"
Clarification:
"It was supost to be a communication but ok"
"The gif but ok"

SCOPE COMPLETED:
- Interpreted the GIF as the communication, not as a design asset.
- Continued the next open assigned animation coding-material task, ANIM-P1.
- Corrected and versioned the isolated motion helper.
- Rebuilt the missing shared drop-box package with spec, helper, pose data, preview and tests.
- Kept all material disconnected from app.html/index.html.

FILES CHANGED:
- team/chatgpt/anim-motion.js — helper v2, corrected data safety and playback completion behavior.
- team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/NOTES.md — integration handoff and limits.
- team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/SPEC.md — specification plus v2 contract addendum.
- team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/code/anim-motion.js — exact copy of helper v2.
- team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/code/poses.json — pose-angle data only, no art or rig.
- team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/preview.html — static UI concept preview.
- team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/tests/anim-motion.test.js — 23-case Node test file for Freebuff/QA.
- team/ai-team/shared/2026-10-26-chatgpt-ANIM-P1/NOTES.md — marked old handoff archived and redirected to complete package.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — this closeout and verification.
- AI-TEAM.txt — progress/completion work-log lines.

CODE CORRECTIONS:
- Added clock.done so an integrator can detect the end of a non-looping animation after the final frame's full hold duration.
- Fixed numeric bone ID 0 and parent ID 0 handling.
- Made duplicate normalized bone names skip safely rather than choose an arbitrary bone.
- Initialized stretch metadata before mirror/paste operations write to it.
- Hardened numeric clamping and target pose mapping.
- Ensured follow-through returns a derived pose and does not mutate stored keyframe frames.
- Preserved legacy easing absence; curveFor() supplies Ease as the fallback without writing metadata onto old frames.

COMMANDS / TESTS / RESULTS:
- In-memory isolated V8 helper execution: 23/23 assertions PASS.
- The assertions covered curves, endpoints/bounds, shortest-angle interpolation, roots/stretch, hold timing, non-loop completion, loop wrap, clock reset, Make costumes plan, 960-output flag, follow-through, parent ID 0, mirror, missing partners, cross-rig copy/paste, duplicate names and pose-library structure/application.
- JSON.parse of poses.json: PASS; required clip identifiers and Walk/Run/Jump frame counts checked.
- Compilation-only checks with V8: helper module PASS, Node test file PASS, preview inline script PASS.
- NOTE: tests/anim-motion.test.js was not run under Node in this session; it is provided for the next Freebuff/QA run.
- GitHub compare from baseline a253e619c63ef942077e63cfe4f2c3c04b755625 to main head 5d5a2d46196ed42f9affc9e376fe1d3d919e0640 shows the expected documentation/proposal/log files only. app.html and index.html are absent from changed paths.

EVIDENCE CLASS:
- SOURCE-VERIFIED: previous ANIM-P1 source review summary and current project instructions; current app.html body was empty in the connector response, so current private solver/playback anchors could not be revalidated in this session.
- ISOLATED V8 HELPER TESTS: 23/23 PASS, not a G-Warp runtime test.
- JSON / script compile checks: PASS.
- NOT-TESTED in G-Warp: browser preview, editor controls, bone solver transforms, actual playback/hold integration, Make costumes output, undo/redo, save/reopen, .sb3/Scratch VM behavior and performance.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- No change to app.html or index.html; Claude alone integrates after current-source inspection and owner approval.
- Do not change the default easing selection without the owner's approval.
- Do not replace In-between, Smooth ×2 or Glide.
- Stretch helper data does not itself scale artwork; solver/joint/art transforms still need careful Claude integration.
- Follow-through remains optional and off by default.
- Pose library contains angle data only; never add stock character art.
- Uploaded GIF was communication only and was not included in repository files.

BLOCKERS / UNCERTAINTIES:
- Exact current app.html animation solver, playback interval and Make costumes anchors were not re-read because the GitHub connector returned an empty body for the large file.
- Browser and full runtime acceptance must be performed by Claude/Freebuff.
- Integration scope is larger than the pure helper module; this handoff does not claim feature completion in G-Warp.

NEXT STEP / HANDOFF:
- Claude: review team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/; re-read Beta v15.57.0 source, adapt integration points, run the supplied Node tests and browser/QA acceptance in an isolated build, then wait for owner approval before connecting live behavior.
- Owner: review the concept and decide whether the easing selector/default and the broader motion tools should proceed. No immediate app update is required by this handoff.

CHAT HISTORY COMPLETENESS:
PARTIAL — this entry records the current request, clarification and code-material work only.

GITHUB CLOSEOUT VERIFICATION:
- Personal log commit SHA: pending append/read-back verification.
- Read-back URL/path: team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt
- Verified new entry is present at bottom: pending.
- Task status: DONE for isolated code-material deliverable; G-Warp integration/runtime: NOT-TESTED.
--- END ENTRY ---


--- VERIFICATION ADDENDUM — ANIM-P1 CLOSEOUT
UTC timestamp: 2026-10-27T00:39:44.450Z
- Personal closeout commit: 313be4fdc153d62103ec9bb2e9acc90bf87ad8a0.
- Shared AI-TEAM completion commit: 2822688a1247e89be1ee6f629a89713b7c92eb8c.
- The shared package was read back from GitHub: SPEC, NOTES, helper module, pose JSON, preview and 23-test Node file are all present.
- Helper copy matches team/chatgpt/anim-motion.js exactly; pose JSON copy matches team/chatgpt/poses.json exactly.
- GitHub compare confirms app.html and index.html were not changed.
- Runtime integration remains NOT-TESTED.
--- END ENTRY ---


--- SESSION START / HANDOFF MAINTENANCE ---
UTC timestamp: 2026-10-27T06:33:48Z
AI / agent / exact model identity: Codex / GPT-5
Task ID / title: ANIM-P1 — verify and complete the shared AI handoff pointer
Branch / starting commit: main / 77f749dd29c4a6f7dd025b530548a1e116322d2e

USER REQUEST (verbatim):
"Continuing from [Continue Gwarp AI Development](chatgpt-conversation://6adfa4ff-1c8c-83ea-bd2e-903176684370): Update the G-Warp AI handoff documentation so the other AI agents can find and understand the complete ANIM-P1 animation code package. First inspect the current AI-TEAM.txt and related AI log files on GitHub. The previous session already added a brief progress/DONE entry to AI-TEAM.txt and a detailed closeout to team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt, but verify this. If the shared AI handoff file does not already contain the complete handoff pointer and key integration cautions, add them without duplicating entries. Do not edit app.html or index.html. Read back and verify all changes."

UNDERSTOOD SCOPE / ACCEPTANCE CONDITIONS:
- Verify the prior ANIM-P1 claim/progress/DONE entries in AI-TEAM.txt and the prior detailed closeout/addendum in this log.
- Inspect the complete shared package and determine whether AI-TEAM.txt has a discoverable package pointer plus the essential integration cautions.
- Add one non-duplicated shared handoff block and a distinct work-log entry if the pointer/cautions are missing.
- Do not edit app.html or index.html.
- Read back every changed GitHub file and verify the final content.

PROGRESS / AI RESPONSE:
- Read AI-TEAM.txt, team/ai-team/README.md, TODO.txt, the shared log template, this complete personal log, and the ANIM-P1 package/log references from GitHub.
- Prior ANIM-P1 progress/DONE and closeout/addendum were found and are being preserved.
- This session has not changed project files yet.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- ChatGPT hands off isolated proposals; Claude Opus is the only live app integrator.
- Keep ANIM-P1 disconnected from app.html/index.html until current-source inspection, isolated tests, runtime QA, and owner approval.
- Do not change the default easing selection; do not replace In-between, Smooth ×2, or Glide.
- Treat helper math/data as incomplete integration: stretch, follow-through, playback, Make costumes, undo/history, save/load, export and solver/art transforms require verified integration work.
- Pose data is angle data only; no stock character art.

FILES CHANGED:
- NONE at session start.

COMMANDS / TESTS / RESULTS:
- GitHub source readback: PASS for the files listed above.
- No new tests run at session start.

EVIDENCE CLASS:
- SOURCE-VERIFIED for repository state; integration/runtime NOT-TESTED.

BLOCKERS / UNCERTAINTIES / ASSUMPTIONS:
- The current app.html body was not needed for this documentation-only update and must remain untouched.
- The prior package notes report that current private app.html animation anchors still require Claude's source re-check.

NEXT STEP / HANDOFF:
- Add the missing complete ANIM-P1 pointer/cautions to AI-TEAM.txt if absent, then read back AI-TEAM.txt and this log from GitHub.

CHAT HISTORY COMPLETENESS:
COMPLETE FOR THIS TASK'S REQUEST; referenced prior conversation was read back and contained only a bounded preview of the earlier discussion.
--- END SESSION START ---


--- CLOSEOUT / HANDOFF MAINTENANCE ---
UTC timestamp: 2026-10-27T06:35:03Z
AI / agent / exact model identity: Codex / GPT-5
Task ID / title: ANIM-P1 — verify and complete the shared AI handoff pointer
Branch / starting commit: main / 77f749dd29c4a6f7dd025b530548a1e116322d2e

USER REQUEST:
The verbatim request is recorded in the session-start entry immediately above. In summary: inspect the live GitHub handoff/log state, verify the earlier ANIM-P1 progress and closeout, add a complete non-duplicated pointer and integration cautions to AI-TEAM.txt if missing, do not edit app.html or index.html, and read back the result.

SCOPE COMPLETED:
- Verified the prior ANIM-P1 CLAIMED/PROGRESS/DONE entries in AI-TEAM.txt.
- Verified the prior detailed ANIM-P1 closeout and verification addendum in team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt.
- Verified the complete package at team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/ and its six files.
- Added one discoverable "ANIM-P1 COMPLETE HANDOFF — FIND THIS FIRST" section before the AI-TEAM work log, covering package paths, evidence limits, integration ownership, easing/hold/playback cautions, Make costumes limits, stretch/follow-through constraints, name/ID safety, undo requirements and the no-live-app boundary.
- Added one distinct DONE work-log line for this documentation-maintenance job. No duplicate prior ANIM-P1 completion line was added.
- Kept app.html and index.html unchanged.

FILES CHANGED:
- AI-TEAM.txt — added the complete ANIM-P1 handoff pointer/cautions, plus this session's CLAIMED and DONE lines.
- team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — appended this session's start and closeout records.
- app.html — NOT CHANGED.
- index.html — NOT CHANGED.

COMMANDS / TESTS / RESULTS:
- GitHub readback of AI-TEAM.txt: PASS; handoff heading, package path, cautions, CLAIMED line and DONE line are present.
- GitHub readback of team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt: PASS; this session-start entry is present at the bottom before this closeout.
- GitHub comparison main 77f749dd29c4a6f7dd025b530548a1e116322d2e -> handoff commit 8b2d6915fdc955be67dbd2959afe3121abda278e: exactly two changed paths, AI-TEAM.txt and team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt; app.html/index.html absent.
- Package readback: SPEC.md, NOTES.md, code/anim-motion.js, code/poses.json, preview.html and tests/anim-motion.test.js all present.
- No new runtime or Node test was run because this was a documentation-only handoff update. Existing isolated evidence remains 23/23 helper assertions PASS; G-Warp runtime remains NOT-TESTED.

EVIDENCE CLASS:
- SOURCE-VERIFIED / STATIC-ANALYSIS for documentation, package presence and changed-path verification.
- NOT-TESTED for browser, Animation UI, solver, playback, Make costumes, save/load, .sb3/Scratch VM, performance and live integration.

DECISIONS AND CONSTRAINTS TO PRESERVE:
- Claude Opus is the only live app integrator; owner approval is required before live behavior/default changes.
- Do not change the default easing selection or replace In-between, Smooth ×2 or Glide.
- Re-read current app.html before using any older private animation anchor.
- Helper math/data is not a complete feature; stretch/art transforms, playback, Make costumes, history, save/load and export require isolated QA.
- Pose data contains angle offsets only; no stock character art.
- Keep ANIM-P1 disconnected from app.html and index.html.

BLOCKERS / UNCERTAINTIES:
- Current private app.html animation solver/playback/Make-costumes anchors were not re-verified in the prior code-material session because the large source read returned empty.
- Full G-Warp integration and runtime acceptance remain pending Claude/Freebuff and owner approval.

NEXT STEP / HANDOFF:
- Claude should review team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/, re-read the current app.html, run tests/anim-motion.test.js and isolated browser/QA acceptance, then decide integration scope with owner approval.

CHAT HISTORY COMPLETENESS:
COMPLETE FOR THIS REQUEST; the referenced prior conversation was read back and contained only a bounded preview of the earlier discussion.

GITHUB CLOSEOUT VERIFICATION:
- Personal log session-start commit: 4e2b4787dfeb220c40515f86a81c4a2866134a78.
- Handoff documentation commit: 8b2d6915fdc955be67dbd2959afe3121abda278e.
- Personal log closeout commit SHA: to be recorded in the verification addendum after this append.
- Read-back URL/path: team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt
- Verified current handoff and package readback before closeout: YES
- Task status: DONE for documentation maintenance; G-Warp integration/runtime: NOT-TESTED.
--- END CLOSEOUT ---


--- VERIFICATION ADDENDUM — ANIM-P1 HANDOFF POINTER MAINTENANCE ---
UTC timestamp: 2026-10-27T06:35:38Z
- Personal log closeout append commit: 345b63aadd1718cdd9264ba68d56f6a6d34f615d.
- AI-TEAM handoff commit: 8b2d6915fdc955be67dbd2959afe3121abda278e.
- GitHub read-back confirms the new AI-TEAM handoff heading, complete package pointer, integration cautions, CLAIMED line and DONE line.
- GitHub compare confirms only AI-TEAM.txt and team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt changed in this session; app.html and index.html were not changed.
- The six files in team/ai-team/shared/2026-10-27-chatgpt-ANIM-P1/ remain present.
- Documentation task is complete; ANIM-P1 live integration and G-Warp runtime remain NOT-TESTED.
--- END VERIFICATION ADDENDUM ---


---
## BUFFY-ADDONS-SETTINGS-REVIEW-2026-10-18.txt

G-WARP — BUFFY-LABELLED SETTINGS / ADD-ONS ZIP REVIEW
Date: 2026-10-18
Reviewer: ChatGPT
Archive: Buffy-2026-10-17-addons-settings.zip
SHA-256: f7d8ae3ff5cf7db085cb3f15965de6e93fc3f347a2b24b3324d008e7ce7e56ad

ATTRIBUTION / DESTINATION
- The archive paths explicitly place the two candidate modules and notes under chatgpt\\.
- Both source headers and both notes label the work “Buffy”.
- The archive contains AI-TEAM.txt and TODO-GEMINI.txt, but these are team/task documents, not proof that Gemini authored the two JavaScript modules.
- Based on available evidence, this is a Buffy-labelled helper submission packaged under team/chatgpt/, not a Gemini deliverable. Exact model provenance cannot be established from the ZIP alone.
- Therefore keep the review/candidate tracking in team/chatgpt/. Do not credit DeepSeek or Gemini without stronger provenance. The earlier deepseek/BUFFY-ADDONS-SETTINGS-REVIEW.txt handoff was routed incorrectly and must not be treated as evidence that DeepSeek authored this work. ChatGPT will not edit another AI’s folder to “move” or delete it.

CONTENTS
- team/chatgpt/addons-pack.js
- team/chatgpt/settings-ui-fix.js
- team/chatgpt/CHATGPT-NOTES.md › NOTES-addons-pack.txt
- team/chatgpt/CHATGPT-NOTES.md › NOTES-settings-ui-fix.txt
- AI-TEAM.txt, MERGE-QUEUE.txt, README-HANDOFF.txt, TODO-GEMINI.txt, TODO.txt

VERIFICATION PERFORMED
- Extracted both JavaScript files from the uploaded ZIP.
- Node syntax validation: PASS for addons-pack.js.
- Node syntax validation: PASS for settings-ui-fix.js.
- Static source inspection performed. No real app/browser harness was run in this review.
- NOT integrated into app.html or index.html.

FINDINGS — addons-pack.js
1. CLEANUP DEFECT (high confidence, source-visible): setInterval(paintCount, 700) is not stored/cleared; the MutationObserver created for workspaceCanvas is not stored/disconnected; the global keydown listener is anonymous and cannot be removed. GW_ADDONS_PACK.off() only disables the three switches, removes the count tag and stylesheet. Repeated enable/disable or teardown can leave background work/listeners alive.
2. OBSERVER MARKER: ws.__gwAPWatch is never cleared; if the workspace node is replaced, a new workspace can be observed only if it lacks that marker, but the old observer remains attached to the old node.
3. PAUSE TOAST STATE: togglePause() clicks the app button and immediately reads E.isPaused. If the button changes pause state asynchronously or through a delayed handler, the toast can describe the old state. Verify against the real pause implementation.
4. SPRITE ORDER ASSUMPTION: pickSprite(n) uses grid.children[n]. This assumes the first direct child is sprite 1 and there are no non-sprite children or hidden/template elements. Verify actual #spritesGrid structure and keyboard focus rules.
5. SELECTOR/COUNT ASSUMPTIONS: counts every .scratch-block descendant but only direct-child .block-stack scripts; may be correct for the current DOM, but needs source/runtime evidence. The alert/hidden checks also need validation against actual stage/workspace layout.
6. REGISTRATION RETRIES: register() may retry for up to 15 seconds, but does not retain/cancel timeout handles on off(). Confirm behavior if app initialization is delayed or module is disabled during retries.
7. The code checks for duplicate module loading, but that alone does not make the lifecycle cleanup complete.

FINDINGS — settings-ui-fix.js
1. CLEANUP DEFECT (high confidence, source-visible): MutationObserver is disconnected by off(), but event listeners attached to risky controls and the Reset button are not removed. If the module is re-enabled or the same dialog remains alive, repeated setup can accumulate handlers.
2. OFF IS NOT A FULL RESTORE: off() removes CSS/warning/reset and clears dataset flags, but does not restore the original order of settings rows, prior inline position/other DOM changes, or undo inserted Sound heading / Addons note. It is a visual/DOM teardown, not a true rollback.
3. WEAKSET VS DATASET: seen is a WeakSet, while off() deletes dataset flags but cannot clear seen. A dialog already seen by the WeakSet will not be processed again after off() if the same DOM node remains. That makes the apparent re-enable path inconsistent.
4. RESET SYNCHRONIZATION RISK: Reset updates .checked values directly without dispatching change/input events for those checkboxes. If app state or dependent controls listen to those events, UI and saved state may diverge. The frame-rate select does dispatch change; the other controls do not.
5. ASSUMPTION-BASED DOM MOVES: grouping depends on exact visible labels and selectors; unmatched rows are moved to the end. A future label/DOM change could reorder settings unexpectedly.
6. Repeated scan is guarded with dataset/WeakSet, but if a dialog is partially built or changes after successful setup, the module will not re-run setup for that same element.
7. Risk warning is useful, but its safety wording and “recommended” values must be checked against current app defaults and the actual semantics of these controls.

DECISION
- Syntax: PASS.
- Static review: NEEDS FIXES before any integration.
- Browser behavior: NOT TESTED by this review; the ZIP notes claim earlier harness tests, but those claims were not independently reproduced here.
- Integration: NOT APPROVED / NOT DONE.
- Preserve as a disconnected candidate. Claude should not merge either module until cleanup, idempotence, reset event synchronization, real DOM selectors, and narrow/wide viewport behavior are tested against a known-good app baseline.
- Keep the candidate in the ChatGPT/Buffy tracking lane because of archive paths and labels. Do not copy it to gemini/ merely because the ZIP includes TODO-GEMINI.txt.

NEXT ACTIONS
1. Correct the previous DeepSeek attribution in the progress record and use this review as the current attribution record.
2. If retaining code in GitHub, keep source and notes under team/chatgpt/ as disconnected candidates, with no app.html/index.html changes.
3. Claude: test each module separately in a disposable copy; verify off/re-enable/off, duplicate load, workspace replacement, pause toast, sprite order, Reset followed by Save/reopen, and responsive dialog layout.


---
## CLOUD-AI-LIVE-VERIFICATION-NOTE.txt

STATUS: SUPERSEDED — 2026-10-13

The requested live UI verification has already been completed by Claude. Do not repeat the task unless the owner explicitly requests another test pass.

RESULTS
- Report: ../docs/LIVE-UI-VERIFICATION.txt
- Real screenshots: ../docs/screens/
- Updated screenshot guide: SCREENSHOT-UI-DOCUMENTATION.md
- The 10 listed live interaction/layout checks passed.
- Important correction: category single-click navigation worked in the live test; UI-AUDIT finding #1 was not reproduced.
- Remaining tests are listed in the report, including nested C-block dragging, save shortcuts, SB3 round-trip, Pause/audio, Stage click routing, paint tools, advanced dialogs, and Firefox/Safari.

This file is retained for work-history context. The canonical index is ../docs/README.md.


---
## COMPARE-TURBOWARP-PENGUINMOD-GWARP-2026-10-26.md

# G-Warp Positioning & Feature Comparison — 2026-10-26

**Task:** COMPARE-1  
**Repository baseline:** `Creapter1/gwarp`, branch `main`, starting commit `74297a3d9af49489f7275c02d29a93269c34e74e`; research-session logging commits follow that baseline.  
**Scope:** Static repository/document review + official TurboWarp/PenguinMod documentation. No app/browser/runtime tests were run.  
**Purpose:** Define how G-Warp can become a recognized specialist option without trying to replace TurboWarp or PenguinMod.

---

## 1. Product position

G-Warp should not market itself as “a better TurboWarp.” A stronger, more credible position is:

> **A block-coding creative studio known for making music and character animation unusually approachable, expressive, and reusable in games.**

Its main identity pillars should be:

1. **Music creation** — create, edit, arrange, shape, and export original music.
2. **Character animation** — rig, pose, animate, preview, and export characters/frames.
3. **Block-coded games and stories** — use those creations directly in interactive projects.
4. **Project-aware AI assistant** — a possible later advantage, not a core promise until it is integrated, safe, reliable, and useful.

A person should be able to use G-Warp for only one job—make a soundtrack, build an animation, or export a reusable asset—and still get value. That is a valid success, even if they use TurboWarp or PenguinMod for the rest of a project.

## 2. Side-by-side comparison

Legend:
- **Documented:** stated in the reviewed product/repository documentation.
- **Gap / pending:** repository gap list or current work plan says it is missing, unfinished, or awaiting acceptance.
- **Unknown / not tested:** not enough current evidence to claim either presence or absence.
- This is a product-capability comparison, not a verified benchmark or a claim that one platform is universally better.

| Area | TurboWarp | PenguinMod | G-Warp: current documented position |
|---|---|---|---|
| Core editor/runtime | Mature Scratch 3 modification; JavaScript compiler, editor addons, developer tools, desktop app | TurboWarp-based editor with many additions, extension gallery, and its own community site | Own engine, not Scratch VM. Scratch-like workflow is the goal, but README explicitly says compatibility is still improving. |
| Performance | Compiler; official desktop page advertises 10–100x speed compared with Scratch, with project-dependent results; configurable FPS/interpolation | Inherits TurboWarp foundations and adds its own features | 60-FPS ambition and clone safety work are documented; no current controlled head-to-head benchmark was run in this review. |
| Extensions | Curated extension gallery and custom extensions; official documentation warns custom extensions are not Scratch-compatible | Large extra-extension gallery; supports loading extensions from URL, local file, or JS text with sandbox distinctions | Repository describes a large extension collection, but exact current count and compatibility need a fresh inventory/test. G-Warp has its own extension safety labels. |
| Editor helpers | Addons, searchable dropdowns, block tools, backpack, debugger/developer tools | Editor helpers, comments, block features, extension ecosystem, community gallery | Search and several helpers exist; missing-list still identifies gaps such as backpack, block switching, jump to definition, folders, and related workflows. Reconcile this list against current source before treating every item as still missing. |
| Paint / costumes | Improved costume editor, transparency, onion skinning and artist addons | Dedicated vector/bitmap Paint Editor | G-Warp documents a more extensive costume/animation workbench, but current paint/transform completeness and usability still need acceptance testing. |
| Sound editing | Standard Scratch-style sound workflow and extensions | Dedicated Sound Editor for importing, editing, and recording sounds | Sound import/recording and effects are documented; a built-in Song Maker and Create Melody area give G-Warp a more focused music-creation identity. |
| Music creation | No dedicated full Song Maker is highlighted in the official TurboWarp feature overview; extensions can add capabilities | Community extensions include TurboSynth and BeepBox-song support, plus beat-sync tools | Native Song Maker, Loop Maker, Create Melody controls, genre/mood/theme generation, bass/drums/chords and sound tools are documented. This is a strong opportunity, not yet proof of a best-in-class music workstation. |
| Animation | Onion skinning and costume-editor tools are documented; broad Scratch animation workflows | Paint editor and extensions; no equivalent built-in bone-animation timeline was established by the docs reviewed | Built-in Flipbook plus bone-rig Animation tab, frames, tween/in-between tools, onion skin, and Make costumes. This may be G-Warp's most distinctive editor capability if reliability and workflow are finished. |
| Packaging / sharing | Official Packager exports HTML, ZIP, Windows, macOS and Linux apps | PenguinMod Packager documents executable, ZIP and web-page output | G-Warp opens SB3 and ZIP-type PMP according to ENGINE-MAP; protobuf PMP is listed as missing. Export/package parity needs current verification. |
| Community / ecosystem | Large established user and developer ecosystem | Own project community, account/profile features, and extension gallery | Smaller/newer public footprint. Need easy asset exports, examples, creator credits, tutorials, and community discovery—not just more blocks. |
| AI | TurboWarp desktop documentation lists local face-sensing ML; extensions can add more | PenguinMod gallery includes a PenguinAI extension | G-Warp's AI is still a potential project-aware helper. Current knowledge pack has 120 tips but 0 executable recipes; the AI model/integration work remains separate and should not be advertised as a finished capability. |

### Official documentation reviewed

- TurboWarp Desktop features: https://desktop.turbowarp.org/
- TurboWarp documentation: https://docs.turbowarp.org/
- TurboWarp Packager: https://packager.turbowarp.org/
- TurboWarp custom extension documentation: https://docs.turbowarp.org/development/extensions/introduction
- PenguinMod overview: https://docs.penguinmod.com/
- PenguinMod editor, Paint and Sound Editor: https://docs.penguinmod.com/modules/
- PenguinMod extension documentation: https://docs.penguinmod.com/development/extensions/
- PenguinMod extra extension gallery: https://extensions.penguinmod.com/

## 3. G-Warp strengths worth protecting

### Music

Repository evidence:
- The current product notes list Song Maker controls for style, tune, key, speed, length, volume, Generate, Play and Stop.
- Create Melody controls and starter ideas are documented.
- The Sound Editor includes Play/Stop, FX, Undo, Duplicate, Download and Delete; sound upload and recording controls are documented.
- The A/B comparison page in `team/claude/experiments/music-compare/index.html` says the newer generator was merged into the app in v15.53.0, with Mix as the new default. It records Claude's measured generator diversity: 28/28 genres, 16/16 moods, 12/12 themes, and 448/448 genre×mood combinations. These are recorded generator-recipe diversity results, **not independent listening-quality scores**; ChatGPT did not rerun them. The referenced standalone B HTML file currently has zero bytes, so the A/B page is historical evidence rather than a runnable comparison today.
- The prior Gemini music report identified causes of repetitive generated melodies; the current A/B page says the new approach addressed genre/mood/theme differentiation and melodic contour.

**What G-Warp should add next (in this order):**
1. **Make generated music editable.** A generated melody should be a starting point, not a locked result. Let users change individual notes, rests, timing, velocity/intensity, and phrase shape.
2. **Give each stem real controls.** Melody, bass, drums, chords and fills should have independent volume, instrument/timbre, octave/register, and a small number of understandable tone controls. Avoid overwhelming children with a professional DAW control wall.
3. **Make the arrangement visible.** A clear timeline/step grid should show where each part enters, rests, repeats, builds, and ends. Add loop length and section duplication.
4. **Improve sound shaping.** Useful controls could include low/high tone shaping, attack/decay or envelope presets, swing, humanize, and per-part effects. Use plain-language labels and optional advanced controls.
5. **Make export a headline feature.** At minimum, export a rendered audio file. Then investigate separate stem exports and MIDI export so a song can be used in another editor/game. Verify file formats, timing, tempo, and licensing before promising them.
6. **Add reusable music assets.** Save/load patterns, instruments/presets, and complete song templates; allow a song or stem to be reused in another G-Warp project.
7. **Prove the music quality.** Compare repeated seeds, genre/mood/theme changes, arrangement variety, clipping, timing drift, Stop behavior, and export/re-import. Include blind listening checks with real users rather than relying only on unique recipe counts.

**Important competitive caveat:** PenguinMod's community gallery already includes music-related tools such as TurboSynth, BeepBox-song support, and beat-synchronization extensions. G-Warp's advantage should therefore be the **native, integrated, easy-to-learn music workflow**, not the unsupported claim that no other Scratch modification can make music.

### Animation

Repository evidence:
- The Animation plan documents the Flipbook player, onion skin, vector-costume bones, Rig/Animate modes, frame strip, in-between, Smooth x2, Glide, FPS, loop, and Make costumes.
- Make costumes is especially valuable: it turns animation frames into ordinary costumes, providing a path toward using the animation in standard Scratch-style projects.
- The Animation tab is documented as available to normal users, while Animation blocks and G mascot animations are still marked Developer-mode / unfinished in the plan.
- Current animation plan calls out a white frame-thumbnail background that should match the dark checkerboard.
- The rotation-centre mark is drawn but cannot yet be moved by the user.
- Existing review identifies save/reopen persistence, multi-sprite and clone isolation, global Stop cleanup, actual block-stack behavior, bitmap-rig behavior, and undo/redo as important unproven acceptance areas.

**What G-Warp should add/fix next (in this order):**
1. **Reliability before more effects:** save/reopen animation data; preserve frames, rigs, attachments, FPS, loop, poses and generated costumes; test global Stop; test Undo/Redo.
2. **Alignment tools:** movable rotation centre, centre-all-frames, visible centre cross, ground line, ruler/guides, snapping and drift warning. This directly addresses characters jumping between frames.
3. **A real layer workflow:** visible layer/part preview, visibility and lock controls, reorder parts, and per-frame layer order. Do not implement reordering until stable part IDs protect bone attachments.
4. **Timeline clarity:** selected-frame highlight, frame number/count, duplicate/insert/move, clear add/delete controls, auto-scroll and understandable timing/hold frames.
5. **Motion quality:** easing choices, squash/stretch with safe limits, follow-through, mirror pose, copy/paste pose and a reusable pose library. Keep current In-between/Smooth x2/Glide behavior available.
6. **Asset export:** export sprite sheet/individual frames and investigate GIF/APNG or video output. Make the result easy to import into other tools.
7. **Guided learning:** a short first-rig tutorial and starter poses/animations using G-Warp's own art style—not copied character art or another editor's UI.

**The opportunity:** TurboWarp's official feature page promotes onion skinning and improved costume tools. PenguinMod documents vector/bitmap paint and sound editors. The reviewed official docs did not establish a comparable built-in skeletal rig + frame-animation workflow. G-Warp can own this category if it becomes stable, easy to learn, and export-friendly.

## 4. AI: potential advantage, but not ready to be a headline claim

A generic chatbot is not enough to distinguish G-Warp. PenguinMod's extension ecosystem already includes PenguinAI, and TurboWarp lists local machine-learning face sensing.

G-Warp's more meaningful AI concept is a **project-aware creative coach**:
- Understand the selected sprite, scripts, variables, costumes, animation and song.
- Explain why a script or animation is behaving incorrectly.
- Help a beginner create or repair a melody, rhythm, pose or block sequence.
- Suggest a next step, then show exactly what it will change.
- Animate reconstructed blocks/scripts by default with a Skip option, as already documented in the product plan.
- Keep local-first behavior where feasible; clearly explain when any external service or data transfer is involved.
- Never silently edit projects, execute arbitrary JavaScript, upload private projects, or pressure children to share personal data.

**Recommendation:** keep AI optional and behind the music/animation work until it can reliably inspect project state, make bounded proposals, explain them, and pass safety/privacy tests. The 120-tip knowledge pack is a useful beginning, but its own notes report zero executable recipes and do not establish a finished integrated AI system.

## 5. Core gaps: don't become the weakest editor

G-Warp does not need every TurboWarp/PenguinMod addon. It does need a trustworthy baseline so people are not blocked when using it for a real project.

The repository's missing-list records earlier gaps including:
- Scratch editor workflows: variable/list management, stage monitors, dragging sprites on stage, costume/sound libraries, comments, reorder, sprite export and tidy scripts.
- Developer helpers: backpack, block switching, jump to definition, folders, keyboard navigation and searchable controls.
- Runtime/parity work: additional Scratch/TurboWarp/PenguinMod blocks, extensions and settings; custom blocks/procedures are called out as especially important in the product roadmap.
- Project compatibility: SB3 and ZIP-type PMP support are documented; protobuf PMP remains a known gap.

**Evidence warning:** the missing-list's numerical audit is dated 2026-10-19 and says it stopped early and counted palette presence, not runtime behavior. Some items may have changed since. Treat it as a candidate audit list, not a current verified count. Reconcile each item against current app source and real tests before scheduling it.

**Do not** add every exotic block or extension just to inflate the number. Prioritize common beginner workflows, correct behavior, save/load, stability, and a carefully curated set of high-value creative tools.

## 6. Suggested roadmap

| Priority | Workstream | What “good” looks like |
|---|---|---|
| P0 | Trust and compatibility | Reliable save/reopen; accurate SB3 and supported PMP behavior; core blocks/procedures; predictable Stop/Undo; tested performance. |
| P0 | Animation foundation | Stable frame/rig persistence, alignment, layer preview, clear timeline, undo, global Stop and Make costumes round-trip. |
| P0 | Music creation workflow | Editable notes and stems, per-part controls, arrangement grid, consistent playback, reusable patterns and audio export. |
| P1 | Creative export | Music audio/stems/MIDI investigation; animation sprite sheets/frames/GIF investigation; simple reuse in other projects. |
| P1 | Learning and discoverability | Short guided music/animation lessons, example projects, searchable help, creator credits and optional links to original tutorials. |
| P2 | Project-aware AI | Local-first, transparent, reversible assistant for music, animation and debugging, only after reliability and privacy acceptance. |
| P2 | Selective ecosystem growth | Curated extensions, creator-contributed packs and import/export workflows; don't chase raw extension counts. |

P0 items are foundations, not a promise to implement everything at once. The owner should choose one bounded job at a time.

## 7. What G-Warp should be known for

A realistic recognition target:

- **Music:** one of the most approachable music-creation experiences inside a Scratch-style block editor.
- **Animation:** a friendly built-in rigging and frame-animation workbench that can export ordinary costumes and reusable assets.
- **Creative workflow:** the ability to turn a song and animated character into a playable block-coded project.
- **AI:** a helpful project-aware coach, if it becomes reliable—not a generic AI badge.

The best marketing is a few excellent demonstrations:
1. Make a distinctive short song, edit its melody and bass, then export it.
2. Rig a simple original character, create a smooth walk and jump, align every frame, then Make costumes.
3. Use that character and song in a small playable game.
4. Optionally show the AI helping explain or improve one step, with the changes visible and reversible.

This gives creators a reason to visit G-Warp even when they already use TurboWarp or PenguinMod.

## 8. Evidence and limits

**SOURCE-VERIFIED / STATIC-ANALYSIS**
- Repository README, ENGINE-MAP, TODO, MISSING-LIST, animation work plan, music A/B comparison page, music research notes, G-Warp AI knowledge-pack notes and gap list were reviewed.
- Official TurboWarp and PenguinMod feature/documentation pages were reviewed.
- Current `app.html` blob at the research baseline: `73da98db21bcc8da72d73c6e1ca3eedce51fb191` (2,680,714 bytes); this session did not execute or fully inspect the live app in a browser.

**NOT-TESTED**
- No browser session, runtime test, audio listening test, export test, SB3/PMP round-trip, performance benchmark, accessibility test or real user study was run.
- No feature should be called “better”, “best”, “fully compatible” or “finished” on this report alone.
- No `app.html` or `index.html` edits; no integration, demo or code candidate was created.

**Next exact step:** have the owner select one bounded music or animation P0 item; Claude performs current-source review, integration (only with approval), and official runtime acceptance.


---
## COMPILER-REVIEW-2026-10-18.txt

G-WARP COMPILER REVIEW — 2026-10-18
Reviewer: ChatGPT
Observed main HEAD: 7d82a447a1c1a519e3c0446fcefac1592e955215
Current app blob: 7b22b5327369cf68cf9be147813109c4b6cffed1 (2,380,161 bytes)
Current app label in TODO.txt: Beta v15.46.4
Evidence: repository metadata and static review of team/SPEED-PLAN.txt. This is not an independent browser test. No concrete statement-cache/compiler patch was present in the inspected commit history.

CLONE DISPOSITION
MERGE-QUEUE.txt already labels team/chatgpt/clone-safety.js SUPERSEDED by Claude's v15.46 clone fixes. Do not integrate it or duplicate the live fix. Keep the candidate and notes as history for now; removing them would break the old queue reference and provide little benefit. This reviewer did not independently rerun clone tests.

COMPILER PLAN — FINDINGS
The staged order in team/SPEED-PLAN.txt is reasonable: statement cache, expression cache, compiler for common blocks, then interpreter fallback. The reported bottleneck is interpreter overhead and repeated DOM/JSON work, not the use of HTML as the app shell.

HIGH — Cache invalidation: the plan names GW.__wsEpoch. Confirm it exists in the current source and advances for block edits, input/dropdown changes, connect/disconnect, add/delete/duplicate, undo/redo, project load and edits during execution. Missing one path can make cached scripts run stale logic.
HIGH — Live editing/thread state: define when an edited script is rebuilt. Preserve ScriptThread pause/yield/resume, pc/callStack, waitUntil, Stop, green flag, turbo/frame budget/watchdog, clones, broadcasts, procedures and variable scope.
HIGH — Scratch behavior: retain the current runner for unknown blocks/extensions. Test number/text comparisons, whitespace, round, mod, random bounds, list indexes/item-number, missing inputs, clone hats, broadcasts and warp/yield behavior against expected results.
HIGH — Generated code safety: compile only known internal block structures using fixed compiler logic. Do not execute project text as source or add a user JavaScript-block feature.
MEDIUM — Cache lifecycle: invalidate/release cached data on project replacement, deletion and editor changes; avoid retaining removed DOM nodes or old project objects.
HIGH — Performance proof: benchmark the same zombie.sb3 on the same machine/browser and record FPS, frame stalls, throughput, Stop latency, and functional outputs before/after. Do not claim 10x or 30–60 FPS without measurements.

RECOMMENDED ORDER
1. Establish v15.46.4 baseline; record metrics and correctness results.
2. Add statement cache behind a reversible switch; test all invalidation paths.
3. Add expression cache separately and measure it.
4. Compile one small high-frequency block family at a time. Keep fallback for unsupported blocks.
5. Turn Grok's high-risk cases into runnable automated fixtures before expanding compiler coverage.
6. Profile drawing separately after CPU execution improvements.

CPU/GPU PRODUCT ANSWER
The browser already uses the computer's CPU and its rendering stack. JavaScript compilation cuts interpreter/DOM overhead on the CPU; it is the first priority from current evidence. ENGINE-MAP describes G-Warp's renderer as 2D canvas. Canvas may benefit from browser/hardware acceleration, but the entire pipeline is not guaranteed to run on the GPU.
WebGL/WebGPU can provide GPU rendering/compute but are not a substitute for compiling the block interpreter and would be a separate, larger compatibility project. OffscreenCanvas/Web Workers can move eligible rendering or pure computation off the main thread; a DOM-driven engine cannot be moved wholesale into a worker. Keep the current renderer, benchmark it independently, then consider culling/batching/drawing optimizations. Prototype WebGL/WebGPU only if profiling justifies it.

ACCEPTANCE
[ ] Cache correctly refreshes after edit, input change, reconnect, delete, duplicate, undo/redo, load and edit-while-running.
[ ] Cached and interpreter execution produce the same results on high-risk fixtures.
[ ] Existing chaos/Stop/regression tests still pass.
[ ] Unsupported blocks use fallback; Stop/pause/wait, clones, broadcasts and procedures remain correct.
[ ] Same-machine/browser benchmark records before/after metrics; test Chromium and Firefox where available.

SOURCES
https://github.com/Creapter1/gwarp/blob/main/team/SPEED-PLAN.txt
https://github.com/Creapter1/gwarp/blob/main/ENGINE-MAP.txt
https://docs.turbowarp.org/how
https://docs.turbowarp.org/new-compiler
https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
https://web.dev/articles/offscreen-canvas

NEXT: Review CL1 when Claude lands the actual statement-cache patch. This document is a plan review, not code acceptance.


---
## COMPILER-REVIEW-2026-10-19.txt

G-WARP COMPILER REVIEW — 2026-10-19 FOLLOW-UP
Reviewer: ChatGPT
Repository: Creapter1/gwarp
Reviewed main app blob: 5ca624a515b9fc1310814c4740608c1cf3071028 (2,440,120 bytes; Beta v15.48.0)
Reviewed speed plan blob: fa72a658464a5a59c600183550ae59d84ec47fe
Reviewed fixture runner blob: 3e5d56a47915f34cfde63c4e04a70869557721a2
Reviewed base fixture blob: 9da4f9826c34fe15bf262dfb0aa7caa2b6660c1f
Reviewed Grok list fixture blob: 0ed530eda717e46ddccea0ee2879311cf5236dcd
Evidence: SOURCE-VERIFIED static blob/tree inspection. No browser, Playwright run or benchmark was executed by ChatGPT.

STATUS
No new statement-cache or core-block JavaScript-compiler implementation has landed in the current app blob. The latest app source remains Beta v15.48.0 and contains the interpreter/wrapper path described below. The existing small DOM/slot caches are genuine groundwork, but do not satisfy all four performance-plan steps or prove a speedup. Treat compiler work as NOT YET READY FOR ACCEPTANCE until a changed implementation and new test/benchmark evidence are available.

NUMBERED REVIEW FINDINGS

1. HIGH — The planned statement/script snapshot cache is not present.
   Current source has no statementCache/expressionCache/compileBlock/compileStack/compiledScripts implementation. Script execution still dispatches through several layered `ScriptThread.prototype.executeBlock` wrappers; reporters and conditions still reach `GW8.resolveInput`, `GW8.evalCondForThread`, and/or `GW9.evalNode`. Repeated DOM and evaluator work therefore remains in the core path. This is a source finding; runtime cost was not measured by ChatGPT.
   Acceptance: compile/cache one clearly scoped path behind a reversible flag; show the diff and before/after profile before saying the planned step is done.

2. HIGH — `GW.__wsEpoch` is a structural-DOM epoch, not a complete “all script edits” version.
   The observer in app.html increments the epoch for `childList: true, subtree: true`; it does not observe attributes. Existing block input values, select values and serialized expression text can change while their DOM nodes remain. A new snapshot that copies those values and invalidates only on this epoch can execute stale values.
   Acceptance: either add a reliable change-version pathway for every relevant edit/input/dropdown/slot change, or validate a per-script/per-slot signature. Test changing a number input, dropdown, variable name, nested expression, connected body and block type after first execution, including while a script is running. Confirm undo/redo, duplicate, delete and project replacement invalidate cached snapshots.

3. MEDIUM — Existing caches help, but are narrower than the planned compiler.
   `GW.ownParts` caches references to a block's own inputs/selects/boolean slot in a WeakMap keyed by the workspace epoch. `kids(c)` caches direct child block arrays under the same epoch. `GW9.slotNode` caches the parsed expression node by the raw `slot.dataset.expr` string. These avoid repeated element discovery / JSON.parse in those specific paths; they are not compiled JavaScript functions or a full statement snapshot.
   Acceptance: retain this behavior where useful, test invalidation, and report the cost of each new layer separately. Do not describe existing part/AST memoization as “the compiler” or claim Step 1/2 complete without showing what new work remains.

4. HIGH — Protect interpreter semantics and thread state when adding compiled functions.
   The current engine has multiple overrides of `ScriptThread.prototype.executeBlock`, a call stack, custom procedure/local-variable handling, waits, repeat/if frames, and a recursion-based typed expression evaluator. Compile only known, normalized internal node types and preserve the current fallback for unknown/extension blocks. A generated function must not bypass scheduler yield, stop, pause, wait, warp guard, broadcasts, clone ownership or per-sprite context.
   Acceptance: compare cached/compiled and interpreter results on the same fixtures. Add tests for stop during loop, wait/resume, edit-while-running, custom procedures/locals, clone hats, broadcast receiver, nested if/else, repeat-until, extension fallback and malformed/missing inputs. Do not eval or execute project text as generated source.

5. HIGH — The current parity runner does not load all listed Grok fixture families.
   `grok/fixtures.json` contains 60 base fixtures and T043 now expects 3 iterations. `team/claude/tests/test_grok_fixtures.js` loads the selected fixture file and, by default, adds the 9 fixtures in `team/claude/tests/extra-fixtures.json` while applying its corrections map. It does not load `grok/fixtures-extra-list.json`, which contains ten T130–T139 cases. Thus the checked-in default run uses 60 + 9 (69 fixtures), not the intended 60 + 10 Grok list additions (and not all three collections together). Current repository verification already marks a current 60+10 run as pending.
   Acceptance: Claude should reconcile runner arguments or add an explicit fixture-combining step, print every input file and per-file case count, reject duplicate IDs, then record the exact total and test result. Keep the nine Claude-specific fixtures/corrections too; don't silently discard them.

6. HIGH — T043 and list-index edge cases must gate performance work, not just the happy path.
   The current base fixture records T043 as 3 iterations, and the extra-list family targets last on empty/non-empty lists, delete-last, delete-all, insert-last, replace-last, number/text list comparison, insert-all no-op and out-of-range letter access. Any compiler branch that reimplements list-index coercion instead of sharing the normalized semantics can drift from Scratch or from the current interpreter.
   Acceptance: include T043 and T130–T139 in every relevant compiler parity gate, plus the 60 base cases and Claude-specific extras. Confirm `last`, `random`, `all`, empty lists, 1-based indexing, out-of-range letter access, string/number comparison and missing input handling. If fixture sources and prose disagree, resolve the expectation before treating a failure as a compiler regression.

7. HIGH — Performance plan's before/after protocol still needs actual evidence for each stage.
   `team/SPEED-PLAN.txt` requests correctness fixtures plus a same-project zombie.sb3 FPS check after each stage. I found no new compiler patch or new benchmark result in the current app tree. Prior reported figures are background evidence only; they do not establish a new cache/compiler speedup.
   Acceptance: on the same machine, Chromium version, viewport, test project, settings and duration, collect at least three before/after samples; report median/range FPS or throughput, worst frame stall, UI/Stop latency, errors and functional outputs. Keep correctness output identical. Don't promise 30–60 FPS or a multiplier unless measured on the stated setup.

8. MEDIUM — Make the optimization reversible and limit scope.
   Apply one stage at a time: statement snapshot/cache, then expression cache only if still needed, then compile one high-frequency block family at a time, followed by warp loops. Keep a switch/fallback until parity and profiling pass. Avoid broad changes to the costume/editor code in the same patch so speed and correctness regressions can be attributed.
   Acceptance: each patch names the covered block families, fallback behavior, cache key/invalidation contract, focused regression command, fixture count, and measured performance delta.

RECOMMENDED NEXT REVIEW WHEN CLAUDE PUSHES A PATCH
- Re-fetch the changed app blob and diff against `5ca624a515b9fc1310814c4740608c1cf3071028`.
- Identify whether the change is a statement cache, AST cache, compiled function or only DOM lookup caching; map it to the plan step actually completed.
- Check epoch invalidation and dynamic state semantics before reading benchmark claims.
- Confirm the exact fixture inputs, total cases, duplicates, runner command and current app SHA.
- Read the new test/benchmark output. A test file existing is not a test result; an old reported PASS does not apply to a new app blob.
- Report findings in ChatGPT's `team/chatgpt/` files. Do not edit `app.html`, `team/claude/tests/*`, or Claude-owned `MERGE-QUEUE.txt` from this review.

FINAL VERDICT
CG2 review is currently BLOCKED on a new compiler/cache patch: none is present in the app blob inspected. The key risks are incomplete cache invalidation if `GW.__wsEpoch` is used alone, compiler semantics drifting from the interpreter/Scratch fixtures, and incomplete fixture-family coverage. Existing DOM/AST memoization is present, but its correctness/performance must be separated from the planned statement snapshot and JavaScript compilation. This review is static only and does not claim the new plan was runtime-tested.


---
## MERGE-QUEUE-NOTES.txt

G-WARP MERGE-QUEUE NOTES FOR CLAUDE
Date: 2026-10-18
Owner requested role consolidation. Claude remains owner of MERGE-QUEUE.txt, so this file sends suggested updates without changing the authoritative queue.

1. FOLDER / ROLE MIGRATION
Former DeepSeek candidates were moved from deepseek/ to gemini/lab/; filenames are preserved. deepseek/ now contains only README-ARCHIVE.txt. Current role/task authority is team/TODO-GEMINI.txt. Retired team/TODO-DEEPSEEK.txt and team/DEEPSEEK-RETURN-HANDOFF-TEMPLATE.txt are redirect/history only.
Update current queue entries to their gemini/lab/ paths when next maintaining MERGE-QUEUE.txt. Historical reports can retain former paths when they describe what was true at the time.

2. CLONE CODE PROVENANCE — STATIC SOURCE/DIFF REVIEW
Compared:
- team/chatgpt/clone-safety.js and team/chatgpt/CHATGPT-NOTES.md › NOTES-clone-safety.txt
- team/P0-CLONE-FREEZE-REPORT.txt
- release diff for Claude commit 33be70dd964b392aece6ae4797363313f6d10d45

Findings:
- team/chatgpt/clone-safety.js remains a disconnected candidate; it was not wired into app.html.
- Its approach uses module-local state (sprites/length/count), replaces GW.createClone with optimizedCreateClone, defines fastRemoveClones, rootIndex caching, and a MutationObserver for cached clone hats.
- Claude's released patch uses a visibly different, smaller change to the existing GW.createClone: GW.cloneCount() plus Engine.__nc / __ncArr / __ncLen bookkeeping and GW.CLONE_CEILING. It also adds a separate round-robin frame budget and chaos watchdog/text/list/crash protections, plus sound/menu optimizations.
- The GitHub diff does NOT show direct copying of ChatGPT's clone-safety.js into Claude's release. The same broad optimization ideas overlap (O(1) counting and clone caps), but this static review cannot establish whether Claude saw the candidate or used it as conceptual inspiration. Private chat context is not observable in the repository.
Recommendation: Keep team/chatgpt/clone-safety.js SUPERSEDED as already recorded. Do not concatenate or merge it into Claude's implementation. Ask Claude to note if the candidate informed any design decisions only if that provenance is useful to the owner.

3. LEGACY CANDIDATE DISPOSITIONS TO PRESERVE
- gemini/lab/speed-clones-A/B/C.js: remain SUPERSEDED; prior review said they failed to skip useful threads. Do not revive without reauthorization and tests against the current ScriptThread.
- gemini/lab/speed-collision-B.js: an older queue said PICK, but the documented acceptance gate is rotation/scale correctness against current GW.spritesTouch. PICK is not acceptance or permission to integrate.
- gemini/lab/pmp-loader.js and test-pmp-loader.js: WAITING / INCOMPLETE until parser API is confirmed and a real legal .pmp fixture/assets are tested. Preserve existing .sb3 and ZIP-style .pmp support.
- Gemini-inherited costume candidates: BLOCKED pending actual state/API mapping, isolated stage-vs-costume canvas harness, correct canvas targeting and narrow listener scope.

Evidence boundary: GitHub text/diff inspection only for this review. No new browser/runtime test was run by ChatGPT and no app.html/index.html source was edited.


4. CURRENT QUEUE CONSISTENCY ITEMS FOUND DURING 2026-10-19 VERIFICATION
Root MERGE-QUEUE.txt still uses retired paths and task labels. It is Claude-owned; these are recommendations, not edits to that file.

Suggested path redirects:
- deepseek/costume-select-C.js -> gemini/lab/costume-select-C.js (REFERENCE, still not a new fix).
- deepseek/costume-fill-C.js -> gemini/lab/costume-fill-C.js; costume-text-B.js -> gemini/lab/costume-text-B.js; costume-eraser-C.js -> gemini/lab/costume-eraser-C.js; costume-undo-C.js -> gemini/lab/costume-undo-C.js. Keep all blocked until current editor/canvas evidence passes; v15.48.0's integrated Select/transform work is Claude-authored code, not automatic acceptance of legacy A/B/C files.
- deepseek/CHECKLIST-costumes.txt / LAB-costumes.txt -> gemini/lab/CHECKLIST-costumes.txt / LAB-costumes.txt.
- deepseek/speed-collision-B.js -> gemini/lab/speed-collision-B.js; speed-collision-A/C and speed-clones-A/B/C plus LAB-speed.txt likewise live in gemini/lab/. Clone variants remain SUPERSEDED. Collision-B is an old candidate and still needs rotation/scale proof; PICK must not imply acceptance.
- deepseek/pmp-loader.js / NOTES-pmp.txt / test-pmp-loader.js -> gemini/lab/pmp-loader.js / NOTES-pmp.txt / test-pmp-loader.js; keep WAITING until parser API + real legal fixture/assets are verified.
- Replace the old "DeepSeek DS3-DS5" open-task reference with Gemini's consolidated list, and remove any suggestion that new work should be created under deepseek/.

Other status drift:
- Queue heading still dates to 2026-10-13. Current app source is Beta v15.48.0 (app blob 5ca624a515b9fc1310814c4740608c1cf3071028); current team assignments should not advertise v15.46.1 as the live build. The 2026-10-19 assignment header now identifies v15.46.1 as the historical assignment snapshot.
- The clone row's "Stop 1 s" wording is a reported test number, not a universal guarantee. Prefer link to team/P0-CLONE-FREEZE-REPORT.txt and label it as Claude's reported Chromium result.
- Latest main commit e958ade... added three assertions to test_select.js after the previous "all pass" note; get a fresh run result before retaining a blanket PASS status.
- At the earlier checkpoint, T043 was still wrong in the main JSON fixture and the runner overrode it in memory. This line is historical and superseded by the 2026-10-19 update in section 5: Grok has since fixed the JSON fixture, but FIXTURE-SOURCES.txt remains stale and the intended 60+10 run is pending.


5. LATEST CHECKPOINT — 2026-10-19
- Grok has corrected T043 in grok/fixtures.json (repeat 2.7 -> 3) and expanded that file to 60 cases. Do not continue saying the main JSON expectation is wrong.
- grok/FIXTURE-SOURCES.txt still claims T043 -> 2 iterations, and still describes a 30-case base set. It is stale and needs Grok to revise it.
- grok/fixtures-extra-list.json provides T130–T139 (10 cases). team/TODO-GROK.txt says Claude is waiting to run 60 + 10. Current team/claude/tests/test_grok_fixtures.js loads the base fixture file and team/claude/tests/extra-fixtures.json (9 cases); it does not load fixtures-extra-list.json. Reconcile the runner/fixture set before reporting current parity PASS.
- AI-TEAM.txt now records Claude's full v15.48.0 regression: 429 PASS, 9 FAIL, all described as expected legacy/feature-status checks. This is REPORTED TEST evidence; ChatGPT did not run that suite. No per-test result for the three latest shape-handle assertions was independently inspected.
- Current Gemini task list is headed by the new team/GEMINI-BIG-LIST-2026-10-19.txt. AI-TEAM roster says Gemini 2 (FreeBuff/Argon), while that task file says Gemini 3 (Argon). The workspace remains gemini/; owner should confirm the preferred label.

6. PROPOSED AUTHORITATIVE QUEUE REFRESH — 2026-10-19 (PLEASE APPLY IN MERGE-QUEUE.txt)
These are suggested edits only. I have not changed MERGE-QUEUE.txt, which remains Claude-owned.

- Update its header date from 2026-10-13 to 2026-10-19. Keep the UI audit as REFERENCE until a real published-site/browser check is recorded; source/static review is not live verification.
- Replace the retired “DeepSeek DS3–DS5” and old Gemini GM1–GM6 queue labels with the current active routing files: team/TODO-GEMINI.txt and team/GEMINI-BIG-LIST-2026-10-19.txt (with team/GEMINI-MELODY-2026-10-19.txt now top priority). Preserve former DeepSeek paths only as historical redirects; new Gemini work lives under gemini/ and legacy candidates under gemini/lab/.
- Replace “Grok G5 extension list check” with the active team/GROK-BIG-LIST-2026-10-19.txt / team/TODO-GROK.txt routing. Keep Scratch parity OPEN: grok/fixtures.json has 60 cases, grok/fixtures-extra-list.json has T130–T139, but team/claude/tests/test_grok_fixtures.js currently runs the 60 base file + 9 Claude extras and does not load the separate ten-list file. The planned 60+10 current run and stale grok/FIXTURE-SOURCES.txt correction are still pending; do not leave a blanket current PASS.
- Add or reference CL1 as an implementation task, not as a merge-ready candidate: team/SPEED-PLAN.txt defines the cache/compiler stages, but current app blob 5ca624a515b9fc1310814c4740608c1cf3071028 has only existing DOM-part/child-list and typed-slot parse caches; no new full statement cache or core-block JavaScript compiler is present. See team/chatgpt/CHATGPT-NOTES.md › COMPILER-REVIEW-2026-10-19.txt. Keep compiler acceptance tied to fixture coverage plus same-setup zombie.sb3 before/after measurements.
- Keep team/chatgpt/CHATGPT-NOTES.md › REVIEW-costume-animation.txt, team/chatgpt/CHATGPT-NOTES.md › UX-costume-animation.txt, team/chatgpt/CHATGPT-NOTES.md › COMPILER-REVIEW-2026-10-19.txt, docs/USER-GUIDE.txt and the new tutorial/glossary/parent guide pages classified as reports/documentation, not implementation candidates to PICK or merge.
- Recheck the pmp-loader row at the current gemini/lab/ path and retain WAITING until a confirmed parser API and a real legally shareable .pmp fixture/assets pass; don't change this to PICK merely because legacy material exists.
- Leave TODO NOW 6 (“test gallery extensions on the real website”) open until Claude/owner runs the published site and confirms the canonical URL. The newer Gemini task heading and TODO.txt still conflict on that URL; no queue text should imply it was tested.
- The current main app is Beta v15.48.0, not v15.46.1. Treat “v15.46.1” in the assignment document as the historical task baseline only. Test results must quote the tested app SHA and runner input set; old 30+9 / 39-of-39 or 429 PASS / 9 expected FAILs are reported results for those particular revisions, not generic current acceptance.


---
## NOTES-addons-pack.txt

NOTES: addons-pack.js (Buffy)   2026-10-17
==========================================
NOT wired into app.html yet. Add one script tag before </body>:
  <script src="team/chatgpt/addons-pack.js"></script>
Put it AFTER the app's own scripts (the addons module is gw-v1510-addons).

WHAT IT DOES
Adds three more on/off helpers to More -> App -> Addons..., in exactly the
same way the app's four addons already work. Nothing is on until the user
turns it on, and each choice is saved by the app itself (gwarp-addon-<id>).

1. Block counter (id: blockcount)
   A small dark pill in the top-right corner of the code area:
   "12 blocks · 3 scripts". It counts the real blocks the child dragged in
   (#workspaceCanvas .scratch-block) and the real scripts
   (#workspaceCanvas > .block-stack). Hidden when the code area is empty or
   the "stuck block" alert is up.

2. Press P to pause (id: pausekey)
   While a project runs, press P to pause or resume it. It presses the app's
   own Pause button (no new pause code) and shows a short toast. Typing in a
   text box or a menu never pauses, and nothing happens while a dialog is open.

3. Number keys pick a sprite (id: spritenums)
   Press 1-9 to select that sprite in "Your sprites". It clicks the app's own
   sprite card, so the whole selection path (costume, property boxes, scripts)
   runs exactly as if the child had clicked it. Handy with many sprites.

WHERE IT PLUGS IN
- window.GW_ADDONS.list is the real array the Addons dialog reads when it
  opens, so pushing into it makes the three rows appear on their own.

HOW IT WAS TESTED (real app, real files, real input)
- Both modules were run inside the real app with the base64 harness described
  in team/chatgpt/LAB-lesson-explain.txt. __gwHarness.failed was empty.
- The Addons dialog listed 7 checkboxes, including the three new ids; the
  checkbox in the dialog is the app's own, and clicking it stored and applied
  the choice.
- Block counter: the GWrap AI "Jump when space is pressed" recipe was used to
  add real blocks (5 blocks, 1 script) and the pill appeared with exactly
  "5 blocks · 1 script"; turning the addon off hid it.
- Press P: pressing P paused the running project (Engine.isPaused true) and
  pressing it again resumed it (false). With the GWrap AI question box
  focused (document.activeElement = gwAiAsk) the same key press left the
  project playing, so typing "p" never pauses.
- Number keys: a second sprite was added; pressing 2 selected sprite 2,
  pressing 9 with only two sprites changed nothing. With the Advanced
  settings dialog open, pressing 2 changed nothing (no switching behind a
  dialog).
- Loaded twice from one page: no duplicate rows, no errors, one pill.

SWITCH-OFF / CLEAN-UP
- window.GW_FEATURE_OFF('addonsPack') makes the module do nothing.
- window.GW_ADDONS_PACK.off() turns the three helpers off and removes the pill
  and the stylesheet (the rows stay in the list, off, like the app's own).
- API for other code: GW_ADDONS_PACK.list(), .on(id), .set(id, bool),
  .isRegistered(), .off().

WHY IT IS SAFE
- It never adds, moves or runs a block and never touches the project data.
- It only clicks buttons and sprite cards that already exist, and every value
  is read defensively, so a missing element shows nothing instead of throwing.
- It does not change another addon's setting and does not add a second mode.

UNSURE / LIMITS
- UNSURE: the pill sits in the top-right corner of the code area. The app's
  own find bar (Ctrl+F) and the "Clean Up / Pan" toolbar are nearby; on a very
  narrow screen they could feel crowded. Move it to bottom-left if the owner
  prefers.
- The number keys only go up to 9 (more sprites than keys would need another
  way to choose).


---
## NOTES-clone-safety.txt

G-WARP HANDOFF NOTES — Clone safety / freeze protection
File: team/chatgpt/clone-safety.js
Owner: ChatGPT
Status: PARTIAL — committed for Claude review; not wired into app.html and not browser-tested.

WHAT IT ATTEMPTS
- Maintains a cached clone count so clone creation doesn't scan every sprite just to count clones each time.
- Keeps Scratch's default 300-clone cap unless the existing G-Warp “Infinite clones” setting is explicitly enabled.
- Shows a warning when the cap is hit, and confirms before switching on unlimited clones.
- Reuses the real G-Warp globals/functions identified in ENGINE-MAP.txt: window.Engine, window.GW, GW.createClone, GW.deleteClone, GW.runHat, GW_SETTINGS, GW_CONFIRM, GW_HEALTH.
- Removes clones in one linear pass and clears the running-thread array directly on Stop, instead of filtering tens of thousands of clone threads.
- Caches clone-start hat stacks and invalidates them via MutationObserver.
- Has the required module wrapper and switch-off key: GW_FEATURE_OFF('cloneSafety').

INTEGRATION
- Claude should add this as a classic <script> after the app's core engine, the existing clone helpers, GW_SETTINGS, and the current project/web loader have initialized. It must not be inserted before Engine/GW initialization.
- Keep it separate until it passes tests. Do not paste it over app.html or replace other modules wholesale.
- The source already has an Infinite clones option, clone-limit messaging, clone removal helpers, an anti-freeze warp guard, and IndexedDB restore history. This file supplements/overrides clone creation and Stop behavior; it does not replace those other systems.
- The existing render loop still has its own thread-step loops. This module does NOT yet enforce the 250 ms frame budget.
- Text/join limits and the 200,000-item list cap are NOT implemented by this file.
- The existing restore history does NOT automatically show a recovery prompt after a browser/tab crash. Automatic crash recovery is NOT implemented here.

CLAUDE MUST VERIFY BEFORE MERGING
1. Run 300-clone test: the next clone must be rejected by default and the warning appears only once per run.
2. Enable Infinite clones explicitly; verify clones can exceed 300 and the UI warned first.
3. Test nested clone creation and clone-start hats: each valid clone must start the correct original sprite's clone hats.
4. Delete one clone, delete all clones, then create more; cached count must remain correct.
5. Trigger Stop after a stress test; every clone and thread must be gone without waiting for a task proportional to the runaway thread count. Measure Stop duration and target under 100 ms for 81,000 clones in the test environment.
6. Test loaded SB3/TurboWarp projects with maxClones configured; verify intended setting behavior and document any parity differences.
7. Test module loaded twice and test switch-off with localStorage key gwarp-off-cloneSafety=on.
8. Test normal project reload, Green Flag, Pause/Stop handlers, broadcasts, sprite deletion/selection, and stage speech bubbles for regressions.

KNOWN RISK TO REVIEW
- It reimplements GW.createClone instead of wrapping it; compare every property and side effect against the current implementation in app.html before merging. In particular, source code has two historical GW.createClone implementations, while the engine's effective one is the later clone system around the v15.9 compatibility layer.
- GW_CONFIRM is asynchronous and the clone-limit warning is requested only once until Green Flag resets the warning.
- No claim of browser verification, complete freeze fixes, or successful 81,000-clone timing is made.


---
## NOTES-gwrap-ai-pack.txt

NOTES - team/chatgpt/gwrap-ai-pack.js (GWrap AI knowledge pack v1.0)
Written by: Buffy (ChatGPT team)

WHAT IT DOES
- Adds 5 recipes to the GWrap AI helper ("What do you want to make?"):
  gravity, shake, click-sound, countdown, turn-away.
  Each recipe has a chip, and "Add these blocks" builds the blocks.
- Adds 2 tips: start/stop, and type commands.
- Adds safe slash commands typed in the helper box:
    /help            show the command list
    /start           press the green flag (Start button)
    /stop            press Stop
    /undo            undo the last change (GW8.undo)
    /check           run "Check my project"
    /open code|costumes|sounds
    /add <idea>      add the best matching recipe
  Anything else is refused. Normal questions still go to the built-in matcher.

SAFETY
- The module never runs code, never runs JavaScript blocks, and makes no network calls.
- It only clicks buttons that already exist in app.html (greenFlagBtn, stopBtn, tab buttons).
- Commands are a fixed list (switch statement). Unknown input is refused.

SWITCH OFF
- Switch off: in the browser console run  localStorage.setItem('gwarp-off-gwAiPack', 'on')  and reload.
  (window.GW_FEATURE_OFF('gwAiPack') reads that key. Turn it back on with localStorage.removeItem('gwarp-off-gwAiPack').)
- Or remove the one script tag at the end of app.html:  <script src="team/chatgpt/gwrap-ai-pack.js"></script>

WHAT IT RELIES ON IN app.html (all checked to exist)
- window.GW_V1571: .blocks (blk, cblk, ifEdge, firstSound), .recipes, .tips, .match, .addRecipe, .checkProject, .showAnswer
  (.blocks, .showAnswer were added by Buffy in this change; .recipes is looked up live in app.html)
- window.GW8.undo, window.GW.createVariable, window.Engine.variables
- Elements: gwAiAsk, gwAiAnswer, gwAiStatus, sec-gwrap, greenFlagBtn, stopBtn, gwMainTabCode, gwMainTabCostumes, gwMainTabSounds

EDITS MADE TO app.html (small)
1. GW_V1571 now exposes blocks helpers and showAnswer.
2. Recipe lookup uses the live list, so added recipes work with "Add these blocks".
3. Removed the unused RECIPE line.
4. One script tag before </body>.

HOW TO TEST (in a browser, served over http from the gwarp folder)
1. Open app.html. Confirm no new console errors (the old CORS error on an external mp3 is known and not from this module).
2. In the helper box, type /help. The command list should appear.
3. Type /bogus. It should say it can't run it.
4. Type /open costumes. The Costumes tab should be selected.
5. Click the "Countdown from 10" chip, then "Add these blocks". Blocks should appear. Press Start.
6. Type /add shake. A shake script should be added.
7. Run /undo, then /check.
8. Switch off gwAiPack and reload. The recipes and commands should be gone.

TEST RESULTS (Buffy, preview, 15 Oct 2026)
- Module loaded: 18 recipes total, 8 tips total, 18 chips.
- /help, /bogus, /open costumes/code/sounds, /add shake, /add xyzzy, /check, /start, /stop: all behave as above.
- Recipe chips and addRecipe add blocks and create the countdown variable.
- Console: no new errors from the module, apart from a 404 for the script path. The preview server only serves app.html, so it could not load team/chatgpt/gwrap-ai-pack.js. The real site serves it from the same folder.
- /undo tested: "Undid the last change." and GW8.undo exists.
- Not run: Node tests (Node not installed here), and a full run of the countdown script.

LIMITS / NOT DONE
- The helper cannot run a whole project from one sentence. That needs owner approval (Rule 3).
- Recipes don't change the built-in matcher, they add to it.
- Mobile layout of the chip row not checked.

IDEAS are listed at the bottom of TODO.txt.


---
## NOTES-scratch-link.txt

G-WARP HANDOFF NOTES — Open Scratch project from URL
File: team/chatgpt/scratch-link.js
Owner: ChatGPT
Status: first implementation prepared; requires Claude integration and browser verification.

WHAT IT DOES
- Recognizes only the exact hash format #scratch=<1–12 decimal digits>.
- Prompts in G-Warp's existing dark confirmation UI: “Open Scratch project #ID?”
- On approval calls the app's existing window.GW_WEB.load(ID), whose existing parser treats a bare numeric ID as a Scratch project.
- Clears the hash with history.replaceState before showing the prompt so refresh/cancel cannot repeat the request.
- Refuses to execute twice in the same page, honors GW_FEATURE_OFF('scratchLink'), and does not use alert() or add any external request logic.

WHERE IT PLUGS IN
- Add this file as a new classic <script> after the existing web loader has defined window.GW_WEB (script id area gw-v1510-files; near the end of app.html is safest).
- Do not rewrite app.html to copy the existing network code; window.GW_WEB.load is the real app integration point.
- Keep it as a standalone script. No Scratch art or logos are added.

MANUAL TESTS FOR CLAUDE
1. Open app.html#scratch=12345678. Confirm a dark prompt says “Open Scratch project #12345678?”
2. Choose Cancel. Confirm no network download starts and the hash is removed.
3. Repeat with a known shared Scratch project ID and choose Load project. Confirm the existing G-Warp web-loading progress UI appears and the project loads.
4. Use #scratch=not-a-number, #scratch=, #scratch=1234567890123, and unrelated hashes. Confirm this module takes no action.
5. Reload after choosing Cancel. Confirm the prompt does not appear again.
6. Confirm a normal app.html launch and the existing #open flow still work.
7. With localStorage flag gwarp-off-scratchLink=on, confirm no prompt appears.

LIMITATIONS / NOT CLAIMED
- This module does not make private/unshared Scratch projects accessible.
- It relies on the already-existing GW_WEB loader and its existing browser/network limitations.
- Not browser-verified here; it must be loaded into the app by Claude before runtime testing.


---
## NOTES-settings-ui-fix.txt

NOTES: settings-ui-fix.js (Buffy)   2026-10-17
=============================================
NOT wired into app.html yet. Add one script tag before </body>:
  <script src="team/chatgpt/settings-ui-fix.js"></script>
It fixes the two dialogs only while they are open; app.html is not edited.

WHAT WAS WRONG (seen in the running app, not on paper)
1. Advanced settings: the "Frame rate" row put its explanation in a ~160px
   column next to a 210px-wide select, so the sentence showed one or two
   words per line (measured: 163px wide, 107px tall at 1440px, and 60px wide
   in a narrow window). Hard to read for anyone, worse for a child.
2. Seven settings sat in one flat list with no headings: "Show FPS" looked
   exactly as important - and as safe - as "Infinite clones".
3. Nothing said that Infinite clones / Remove fencing / Remove misc limits
   can make a project freeze or lose sprites.
4. There was no way back to the safe settings after experimenting.
5. Addons: the "Project volume" row split its label and its 100% onto two
   lines with the slider squeezed beside them.

WHAT IT DOES
Advanced settings
- Widens the dialog to 600px (was 460px) and lets the frame-rate row wrap:
  on a narrow window the select moves under the explanation instead of
  squeezing the text. No text is cut and no control is lost.
- Adds three real headings, with the settings regrouped under them:
     SPEED              Frame rate, Show FPS on the stage
     LIMITS & SAFETY    Infinite clones, Remove fencing, Remove misc limits
     PICTURE & HELPERS  Max quality render (HQ), Anti-freeze (warp timer)
  The rows are the app's own elements, moved with appendChild, so every
  checkbox, the frame-rate select, its "Custom..." field and the app's Save
  button keep working (checked: Save still stored showFps=true and the FPS
  tag appeared on the stage).
- Adds an amber warning that appears only while a risky switch is on,
  naming the switches and telling the user to turn them back off.
- Adds "Recommended settings -> Reset to recommended": sets 60 FPS, every
  limit back on, HQ on, FPS counter off, anti-freeze on, and updates the
  "Now: 60 FPS" label. It only changes the dialog's own controls; the app's
  Save button still decides whether anything is stored.
- The "Now: 60 FPS" text is a green chip instead of words glued to the end
  of the paragraph.

Addons
- The volume row is now label + percentage on one line with the slider full
  width underneath (accent in G-Warp violet).
- A "Sound" heading above it, and a note under the list: "Changes here save
  straight away - you do not need to press anything." (the app really does
  save addons on each click; Advanced settings needs Save, so the two
  dialogs now say what they do).

HOW IT WAS TESTED (real app, real files)
- Run inside the real app.html with the base64 harness (see
  team/chatgpt/LAB-lesson-explain.txt). __gwHarness.failed empty, no console
  errors from this module.
- 1440x900: dialog 600px, frame-rate text column 293px, select 220px.
  389x819: dialog 357px, text column 280px, select wrapped underneath.
- Headings present in the right order (Speed / Limits & safety / Picture &
  helpers), one warning strip, one reset row.
- Checking Infinite clones made the warning appear with its name; Reset put
  every box back (clones/fence/misc/showFps off, HQ/guard on, 60 FPS) and
  hid the warning.
- Save after the reorder still saved (showFps=true, FPS tag on the stage).
- Addons: 7 checkboxes, the "Sound" heading, the new note, slider 280px
  wide under a single-line label.
- Loaded twice in one page: no duplicate headings, warning or reset row.

SWITCH-OFF
- window.GW_FEATURE_OFF('settingsUiFix') makes the module do nothing.
- window.GW_SETTINGS_UI_FIX.off() disconnects the observer and removes the
  stylesheet, warning and reset row (a dialog already open stays tidied).

UNSURE / LIMITS
- The regrouping moves the app's own rows, so if Claude later renames or
  reorders those settings, the labels in the `plan` list must be updated;
  anything it cannot find is simply left where the app put it (the code
  does not throw).
- UNSURE: 600px is a good width for this text in G-Warp's dialog style; if
  the owner wants it wider, change the one CSS rule.
- The dialog still shows its own scrollbar for the last rows; with the
  headings it is easier to see that there is more below, but a sticky footer
  is a separate design decision.


---
## NOTES-tutorial-and-ideas.txt

NOTES: GWrap tutorial and idea modules (Buffy)
=============================================

NOT wired into app.html. Add each one only after the owner approves.

1. team/chatgpt/gwarp-tutorial.js  (ready to test on the live site)
   - Lessons: 'basics' (5 steps), 'code' (4 steps), 'music' (8 steps).
   - Use:  GW_TUTORIAL.start('basics' | 'code' | 'music'), GW_TUTORIAL.next(), .prev(), .stop()
   - Each step highlights a real control (green outline). Some steps have a button
     that presses an existing control, but only the ids in ALLOWED can be pressed.
   - Escape closes it. Finish closes it on the last step.
   - Switch off: window.GW_FEATURE_OFF('tutorial') returns true.
   - Ids used (all checked in app.html): gwMainTabCode, gwMainTabCostumes, gwMainTabSounds,
     greenFlagBtn, gwWorkbenchCodeRegion, gwAiAsk, gwMusicStyle, gwMusicBpm, gwMusicSeed,
     gwMusicGenerate, gwMusicPlay, gwMusicAddToSprite.
   - Tested in the preview. The test used a pasted copy of the same logic, with shorter
     text, because the preview can't serve team/chatgpt/ files. The text and styling differ
     from the file; the logic is the same. Re-test the real file on the live site.

2. team/chatgpt/idea-teacher-check.js  (idea, code only)
   - GW_IDEA_TEACHER.explain() reads GW_V1571.checkProject() and returns plain sentences.
   - Read-only. It never changes blocks.
   - Tested in the preview: returns the check's sentence once (fixed a doubled "Looks good" line).
     GW_V1571.checkProject exists and returns an array.

3. team/chatgpt/idea-voice-commands.js  (idea, code only)
   - GW_IDEA_VOICE.start() / .stop(). Only the fixed phrase list works; other phrases are refused.
   - Caveats: browser speech recognition is NOT offline by default; it may send audio to the
     browser provider. Needs a mic-permission check and a real test with a microphone.
   - In the preview, window.GW_STATUS is undefined, so messages go to the console only.
     Add a visible message area before turning it on.
   - Tested the phrase handler in the preview (no microphone): "Code Tab!" clicks the Code tab;
     "rm -rf", "constructor", "__proto__" and "toString" are refused. Real speech is not tested.

4. "Run a whole project for me" (idea, NOT coded)
   - Your team rules forbid running arbitrary code. Build it only as a fixed action list,
     with an owner-approved confirm step and an undo, as the earlier idea described.

Checks not run
- Node is not installed, so no automated tests ran.
- The preview only serves app.html, so team/chatgpt/ files were checked by pasting their source into the page.
  The tutorial was re-run from its exact source at the end, and all checks passed.

=====================================================================
ADDED LATER: team/chatgpt/idea-more-recipes.js  (NOT wired into app.html)
=====================================================================
- Two more helper recipes: "Make clones" (clone spawner: a green-flag
  forever loop creates clones; "when I start as a clone" moves and deletes
  at the edge) and "Ask a question" (ask, then say).
- Pen drawing is NOT included: app.html has no pen blocks yet.
- Tested in the preview by loading the exact file source. Both recipes build
  with the real GW_V1571.blocks helpers (blk, cblk, ifEdge), and the nodes
  have the right block types. Nothing was inserted into the workspace.
- Switch-off key: GW_FEATURE_OFF('ideaMoreRecipes').
- To use later: add one script tag after gwrap-ai-pack.js, then add these
  recipes to the helper's list (not done yet).


---
## OWNER-REVIEW-STATUS-2026-10-19.txt

G-WARP OWNER HANDOFF — C1–C5 INDEPENDENT REVIEW CYCLE
Date: 2026-10-19
Prepared by: ChatGPT
Scope: static review of contributor candidates / test specifications only.
Production app changes: NONE by ChatGPT.
Browser/G-Warp runtime tests run by ChatGPT: NONE.

CURRENT READ
The review cycle found useful source research, but none of the reviewed candidates should be treated as integration-ready solely because a note says PICK, winner, verified, or complete. Keep the reports and evidence classes separate. Claude remains responsible for official current-build integration/runtime evidence; the owner approves any live integration or release.

REVIEW RESULTS

C1 — Gemini-inherited costume candidates
Report: team/chatgpt/CHATGPT-NOTES.md › REVIEW-GEMINI-COSTUME-CANDIDATES-2026-10-19.txt
Verdict: BLOCKED / HIGH RISK.
Current editor selector/state mismatches, missing shape assumptions, incomplete mapping/persistence, global or duplicate event handlers, CSS-pixel vs costume coordinate assumptions, and non-costume-local undo make the five inherited tools unsafe as-is. The current native v15.48.0 editor already includes an integrated Select/transform path, so do not add another script layer just because a legacy lab candidate exists.
Evidence: STATIC SOURCE REVIEW. No candidate/browser test by ChatGPT.

C2 — ChatGPT clone-safety candidate
Report: team/chatgpt/CHATGPT-NOTES.md › REVIEW-clone-safety-2026-10-19.txt
Verdict: SUPERSEDED; DO NOT REINTEGRATE.
The candidate can remove the native 5,000 ceiling in Infinite Clones mode, may clear thread arrays before normal Stop cleanup marks threads finished, diverges from native clone-count bookkeeping and can alter imported clone-limit semantics. Claude's active clone/Stop path is already present in current app source.
Evidence: SOURCE REVIEW + STATIC ANALYSIS; no stress/latency test by ChatGPT.

C3 — Scratch link handoff + Gemini browser extension
Report: team/chatgpt/CHATGPT-NOTES.md › REVIEW-SCRATCH-LINK-EXTENSION-2026-10-19.txt
Verdict: extension remains NOT PACKAGE-READY; app-side hash handler is already integrated.
Do not inject team/chatgpt/scratch-link.js a second time. Current repository lacks the PNG icons referenced by the manifest; popup preferences don't synchronize with already-open tabs; history wrappers lack a clear cleanup route; hashchange and origin validation need coverage; privacy wording and canonical destination URL need review.
Evidence: SOURCE REVIEW + STATIC ANALYSIS. No browser, package, permission, or network test by ChatGPT.

C4 — Grok Scratch expected-result suite
Report: team/chatgpt/CHATGPT-NOTES.md › REVIEW-GROK-EXPECTED-RESULTS-2026-10-19.txt
Verdict: ACTION REQUIRED before this can act as an exact-result parity suite.
BLOCKER: grok/TESTS.txt T043 still expects repeat 2.7 -> 2, but the pinned Scratch VM source uses Math.round, yielding 3. grok/fixtures.json was corrected to 3, while grok/FIXTURE-SOURCES.txt retains a stale expectation and old case-count description. T017's random logic is invalid; T037's 330-character bubble rule is not VM-source-proven; T067/T068 are vague/unbuildable; T071–T074 are G-Warp safety/performance cases rather than Scratch parity fixtures. ChatGPT did not edit Grok's files or run the G-Warp suite.

C5 — Inherited protobuf .pmp loader
Report: team/chatgpt/CHATGPT-NOTES.md › REVIEW-PMP-PROTOBUF-LOADER-2026-10-19.txt
Verdict: BLOCKED / INCOMPLETE.
The harness only classifies fake bytes and never decodes a real fixture; no legal real fixture/assets are supplied; the loader returns an empty assets Map; the remote import is a guessed v1.6.0 CDN URL while the reviewed upstream repository/package reports 1.8.8; browser import/export shape is unverified; all non-ZIP bytes are labelled protobuf; the test still refers to the retired deepseek path. Keep this disconnected and preserve existing .sb3/ZIP .pmp behavior.

MOST IMPORTANT NEXT ACTIONS

1. Grok — repair and reconcile expected results first.
   - Correct T043 in grok/TESTS.txt and grok/FIXTURE-SOURCES.txt to repeat 2.7 => 3.
   - Synchronize source map, 60-case fixtures and the additional T130–T139 list.
   - Have Claude reconcile the runner to the intended 60+10 set and record the exact app SHA, fixture list, runner revision and outputs. Historical 30+9 / 39-of-39 output must not be described as a pass for 60+10.

2. Gemini — turn the PMP draft into a testable isolated candidate, not a live integration.
   - Provide a legally shareable protobuf project fixture with provenance/checksum and its separate asset files, including at least one costume and one sound.
   - Verify the parser version and real browser export shape, implement/document media resolution, and test malformed inputs plus ZIP .pmp / .sb3 regression.
   - Separately finish extension packaging (manifest-referenced PNGs) and the end-to-end browser test matrix before calling that extension ready.
   - Update Gemini-owned files only; ChatGPT has not altered gemini/ or approved any candidate.

3. Claude — perform official tests only when fixtures and owner-approved targets are available.
   - Re-run the current v15.48.0 regression after the three fresh-shape assertions mentioned in team status; the existing 429 PASS / 9 expected FAIL result is reported evidence for its exact run, not an independent ChatGPT test.
   - Run the intended Grok fixture set after reconciliation.
   - Only test the protobuf loader once a real legal fixture/assets are supplied and the parser route is pinned.
   - For the extension, test install/permissions, packaged icons, preference sync, SPA/hash navigation, network failures and project handoff against the owner-confirmed canonical website URL.
   - Verify the active model label is exactly Claude Opus 5.5 and obtain explicit owner approval before any integration/release.

4. Owner — one website decision remains open.
   TODO.txt still says the canonical website URL awaits confirmation. Do not replace extension targets or website links based on an old header or guess. Confirm the exact canonical URL and whether the old GitHub Pages address should remain as a fallback.

EVIDENCE LIMITS
- These reports are static reviews unless explicitly called SOURCE-VERIFIED from a pinned upstream source.
- ChatGPT did not run a browser, Playwright, real project fixture, performance benchmark, packaged extension, or current G-Warp regression suite in this review cycle.
- No changes to app.html, index.html, Gemini candidate files, Grok files or Claude test files were made.
- A review report is not integration approval, and the owner decides what goes in.

SOURCE REPORTS / START HERE
- C1: team/chatgpt/CHATGPT-NOTES.md › REVIEW-GEMINI-COSTUME-CANDIDATES-2026-10-19.txt
- C2: team/chatgpt/CHATGPT-NOTES.md › REVIEW-clone-safety-2026-10-19.txt
- C3: team/chatgpt/CHATGPT-NOTES.md › REVIEW-SCRATCH-LINK-EXTENSION-2026-10-19.txt
- C4: team/chatgpt/CHATGPT-NOTES.md › REVIEW-GROK-EXPECTED-RESULTS-2026-10-19.txt
- C5: team/chatgpt/CHATGPT-NOTES.md › REVIEW-PMP-PROTOBUF-LOADER-2026-10-19.txt
- Shared ledger: team/CROSS-AI-REVIEW-2026-10-15.txt
- Routing: team/CONTINUOUS-WORK-QUEUE.txt and team/TODO-CHATGPT.txt

STATUS: owner handoff report complete. C6 review-ledger maintenance remains ongoing. Runtime/integration gates remain with Claude and owner.


---
## REVIEW-AI-CHAT-LOG-COVERAGE-2026-10-23.txt

G-WARP — AI CHAT-LOG COVERAGE AUDIT
Date: 2026-10-23
Reviewer: ChatGPT GPT-6
Repository: Creapter1/gwarp, main
Task: C6 — independent review ledger / continuity gap audit
Evidence class: SOURCE-VERIFIED for file presence/content returned by GitHub; NOT TESTED for any local or browser execution.

PURPOSE
The owner raised a concern that AI chat sessions degrade, lose context, or make mistakes during long-running work, and asked whether the requested user-request/AI-response log still exists for all AIs. This report checks the exact required paths documented in AI-TEAM.txt and team/AI-CHAT-LOG-TEMPLATE.txt. This is a repository file-presence/content check, not a guarantee that all chat history is automatically captured.

RULE FOUND
AI-TEAM.txt defines a mandatory rule dated 2026-10-17: every active AI must append a chronological log to its OWN folder at <ai-folder>/AI-CHAT-LOG.txt. Each task/session should preserve the user's request accurately, the AI response/handoff, date, files changed, evidence/test status, unresolved questions, and exact next step. It forbids invented quotations or claiming missing original chat history is complete. The shared template exists at team/AI-CHAT-LOG-TEMPLATE.txt.

CHECK RESULTS (expected exact paths, main branch)
1. team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt — PRESENT. The fetched file is about 73.8 KB and the latest visible entry is dated 2026-10-21. This audit and owner request are being appended to this log.
2. grok/AI-CHAT-LOG.txt — PRESENT, but only about 1.1 KB. Its visible entries are dated 2026-10-18 and its next step is G6 high-risk TESTS.txt review. This is older than later Grok activity recorded elsewhere in the repository (including fixture updates on 2026-10-19/20). Reconcile/append missing sessions if Grok can support them from real source/history; do not fabricate transcript text.
3. gemini/AI-CHAT-LOG.txt — PRESENT, about 16 KB. The latest visible entry is dated 2026-10-20 and records Gemini's connection/upload/sprint handoff. Checkpoint freshness should be revisited when Gemini does another task.
4. team/claude/CLAUDE-NOTES.md › AI-CHAT-LOG.txt — NOT FOUND (GitHub returned 404 for this exact path). Claude is listed as an active role. Claude's work is summarized in AI-TEAM.txt, MERGE-QUEUE.txt, checkpoints and other reports, but those do not satisfy the explicit requirement for Claude's own folder log at the required path. Claude should create and maintain it, using the template. For historical context unavailable from an original chat, it must mark that history unavailable and only summarize verified evidence.
5. deepseek/AI-CHAT-LOG.txt — NOT FOUND. This is not counted as a current active-role failure: AI-TEAM.txt says DeepSeek was retired on 2026-10-18 and its former lab work was consolidated under gemini/lab/.

CONCLUSION
The logging RULE and TEMPLATE still exist. Actual compliance is partial, not complete. ChatGPT, Grok and Gemini have logs at the required paths; Claude's required log is missing. Grok's existing log appears stale relative to later repository activity. DeepSeek is retired, so the old path need not be recreated.

RECOMMENDED CORRECTIONS
- Claude: create team/claude/CLAUDE-NOTES.md › AI-CHAT-LOG.txt and append every subsequent task/session using team/AI-CHAT-LOG-TEMPLATE.txt. Backfill only from verifiable shared logs/reports; label reconstructed context accurately and never invent user quotes or claim a full transcript.
- Grok: reconcile its dated log against its own available work records and append any missing task handoffs that can be supported. Do not reconstruct unavailable user wording.
- All active AIs: append before ending a task/session; record status and next action; distinguish source/static evidence, reported tests, browser-verified tests and not-tested work.
- Owner/Claude: consider a lightweight closeout check that confirms each active AI updated its own log before handoff.

SCOPE LIMITS
This check verified GitHub path presence and read the text returned from the current main branch. No runtime/browser tests were run. This audit did not edit app.html/index.html or edit another AI's folder. The only files changed by this ChatGPT task are its own report/log and the shared AI-TEAM work log.

NEXT STEP
Claude should address the missing required log in team/claude/. Grok should reconcile the stale log; ChatGPT will keep the independent review ledger updated on future deliverable changes.


---
## REVIEW-AI-KEY-CONTEXT-SECURITY-2026-10-19.txt

G-WARP C8 SECURITY REVIEW — AI KEY STORAGE, CONTEXT TRANSMISSION AND STATUS CONSISTENCY
Date: 2026-10-19 (America/New_York)
Reviewer: ChatGPT
Task: C8 security/consistency follow-through
Evidence class: STATIC SOURCE REVIEW + OFFICIAL MODEL-DOCUMENT CROSS-CHECK
Browser/network/API test: NOT RUN
Git-history scan / repository secret-settings review: NOT RUN
Production source changes: NONE

BASELINE AND SCOPE
- Repository: Creapter1/gwarp, main.
- app.html blob reviewed: 5ca624a515b9fc1310814c4740608c1cf3071028 (Beta v15.48.0; 2,436,157 characters returned by blob fetch).
- Existing security review: team/SECURITY-AND-CONSISTENCY-AUDIT-2026-10-15.txt, blob f1d44040c032c78c41d54749b8cd4ee1996d217b.
- Root task baseline: TODO.txt blob 1b8a6372f7d4e722ee5de58321650cb2d4aad87f.
- No changes to app.html or index.html. No real API key used, copied, or placed in this report.

EXECUTIVE VERDICT
HIGH PRIORITY — the current AI key flow is a user-owned direct-provider feature, not a hard-coded shared-key leak. Its storage choice and direct destination are visible in source, but UI disclosure is incomplete regarding the exact project context transmitted and the risk of browser storage. The source's default model string claude-sonnet-5-5 also conflicts with the current official model documentation found during this review, which lists Claude Sonnet 5 as claude-sonnet-5. Because no API request was made, treat the default model mismatch as a HIGH-RISK likely functional defect requiring an authorized verification, not a runtime-confirmed failure.

SOURCE-VERIFIED CURRENT FLOW

1. Key storage
- keyGet() checks sessionStorage first, then localStorage, for the key named gwarp-ai-key.
- A new checkbox is initialized from whether a localStorage key already exists. For a new setup, the persistent checkbox is unchecked; the save handler therefore stores the key in sessionStorage by default.
- When “Remember the key on this computer” is checked, the save handler saves it into localStorage and removes the sessionStorage copy. When unchecked, it saves the sessionStorage copy and removes the localStorage copy.
- “Remove key” clears the input then invokes the save handler, which removes the stored copies from both locations.
- The model setting is stored in localStorage separately under gwarp-ai-model.
- The app handles storage access errors, but those failures are swallowed; there is no clear user-facing warning that storage failed or that a key may not have been saved.
- Both sessionStorage and localStorage are readable by JavaScript executing in the same origin. The password input masks what is typed but does not make stored values a secure vault. LocalStorage persistence is an explicit opt-in, which is a positive control; it remains exposed to same-origin script compromise.

2. Destination and request contents
The current askAI() function sends a POST directly to:
https://api.anthropic.com/v1/messages

It sends the user-supplied key in the x-api-key header, includes the Anthropic version header and the explicit browser-access header, and does not place the key in the JSON request body. No shared provider key or hard-coded credential was identified in the inspected app blob.

The JSON body includes the chosen model, a 700-token response limit, the helper system prompt, and a user message containing:
- the question typed into the G-Warp AI helper;
- all non-clone sprite names;
- the selected sprite name;
- names of variables in Engine.variables (keys only; the inspected function does not enumerate or send their values);
- text from the selected sprite's script blocks, drawn from up to 12 top-level stacks owned by the active sprite; within each stack it considers up to 25 descendant blocks; each block's displayed text/type is whitespace-normalized and truncated to 60 characters.

The script text may include user-entered literals or labels, depending on how blocks render their content. A rough intended upper bound for this sampled block text alone is 12 stacks × 25 blocks × 60 characters (18,000 characters), before sprite/variable names and the user's question; actual context will often be smaller. It is not the complete project file: this function does not explicitly include variable values, image/sound bytes, or every script for every sprite.

3. When transmission occurs
The “Ask the connected AI” button is only offered when the app is in Developer mode, a connected key exists, and the offline helper produced its “none” result. The direct network request runs only when the user presses that button. That is meaningful gating. However, the current flow does not present a preview of the exact context, a per-request confirmation, or a separate context-sharing toggle before sending the sampled project information. The UI copy says “Your key stays in this browser and is sent only to the AI service. Costs and rules of that service apply.” It does not explain the exact project fields transmitted or clearly state the same-origin storage risk.

4. Current model default: likely mismatch
The source defaults modelGet() to the string claude-sonnet-5-5. The official Anthropic model deprecation/current model documentation found during this review lists Claude Sonnet 5 with the ID claude-sonnet-5, not claude-sonnet-5-5:
https://docs.anthropic.com/en/docs/about-claude/model-deprecations
This is a documentation cross-check only. No model-list endpoint was queried and no Messages API request was attempted, so do not label the app's request as tested. The model is user-editable and persisted, but a wrong default can make the first real-AI request fail for users who do not know the model field exists.

SECURITY SCAN PERFORMED IN THIS PASS
A limited pattern scan of the current app.html blob only found zero matches for the following patterns:
- Anthropic-looking key strings;
- AWS access-key ID pattern;
- private-key header;
- long bearer-token pattern;
- Google API key pattern.
This does not scan Git history, repository settings, deployment artifacts, forks, build caches, binary files or every file in the repository. The earlier 2026-10-15 review reports no matching hard-coded secret pattern in its own 92-file current-content scan; it also did not scan full history. Neither scan is a security certification. No actual secret was found or reproduced in this review.

POSITIVE CONTROLS ALREADY PRESENT
- The key is user-supplied; no shared provider key was found in the reviewed app blob.
- Session-only storage is the initial default.
- Persistent storage requires an explicit checkbox.
- The direct AI call is gated by Developer mode, an existing key, the offline-helper fallback state and an explicit button press.
- The API destination is directly visible in source and the key is sent in an authentication header, not inserted in the prompt body.
- A Remove key button exists and calls the save path with an empty value, which removes both storage copies.
These controls reduce risk but do not replace clear disclosure or a safe-context selection.

FINDINGS AND MINIMUM CORRECTIONS

F1 — HIGH: project context is sent without an exact preview or per-request context choice.
Minimum correction, only after owner authorization: before the external request, show a compact preview listing the question, selected sprite name, sprite names, variable names and the sampled script text. Provide a clear separate option to omit project context; safest default for a privacy-first flow is no project context until the user opts in. Keep the local/offline helper available without sending context. Do not silently send more data than the preview states.
Acceptance: use a dummy key and a non-sensitive fixture; compare the exact preview to the outgoing JSON body, verify context-off sends the question only, verify context-on includes only the documented fields, and verify Cancel sends no request.

F2 — HIGH: current model default is inconsistent with official documentation.
Minimum correction: confirm an actual model ID supported by the relevant Anthropic API/access tier before changing code; use an owner-approved, current identifier and provide a friendly model-error message. Do not silently substitute another model or claim the documented ID was API-tested.
Acceptance: in a controlled target browser, send one request using the proposed default with a dummy/test credential; record HTTP status and provider error safely without capturing the key. Also test unsupported-model error handling.

F3 — HIGH: users are not told that browser storage is readable by same-origin scripts.
Minimum correction: retain session-only as default; near the Remember checkbox, disclose that persistent localStorage is not a secure vault and that same-origin scripts may access stored keys. Make failure to save visible instead of silently swallowing storage exceptions. Do not tell users a browser-only key can be made perfectly secret.
Acceptance: verify unchecked stores only in sessionStorage; checked stores only in localStorage; Remove key clears both. Simulate storage denial/quota errors and verify a visible warning. Reload and restart to demonstrate the intended lifetime of each option.

F4 — MEDIUM: the short provider disclosure does not explicitly describe destination/cost/data.
Minimum correction: identify Anthropic and api.anthropic.com, note that API charges/limits may apply, and state the exact categories of project context that may be sent. Keep this language adjacent to the real-AI connection and “Ask” action, not buried only in a general privacy document.
Acceptance: review the connected-AI dialog at desktop and narrow width; users must be able to identify the provider, destination, cost possibility, storage choice, removal control and transmitted-context categories before any request.

F5 — MEDIUM: hard-coded model default and API endpoint have no tracked runtime contract.
Minimum correction: document which model ID was verified, when, and under what supported account/API access. Keep all test keys dummy/temporary; never capture request headers in logs or screenshots.
Acceptance: pass online success, unsupported-model error, invalid-key error and offline/network failure tests while confirming the offline helper still works and no key value is printed/exported.

F6 — MEDIUM: storage errors are caught and ignored.
Minimum correction: preserve application stability, but make “could not save/remove key” visible when local/session storage denies access. Do not claim “Saved” if the write failed.
Acceptance: mock/set storage exceptions, verify UI state communicates failure and later AI calls do not falsely imply the rejected value is stored.

F7 — LOW / SCOPE LIMIT: repository-wide secret exposure is still unknown.
Next safe action: owner/Claude performs a suitable Git-history secret scan and reviews available GitHub secret-scanning settings/alerts. If a real credential is found, identify only its path/commit to the owner, do not paste the value into any report, and rotate/revoke it. Deleting a committed secret alone does not invalidate it.

STATUS CONSISTENCY CHECK
- TODO.txt correctly identifies the canonical website URL as pending owner confirmation. No URL has been changed or guessed.
- TODO.txt's current “Now” entries already distinguish the Gemini extension as candidate/acceptance-pending, Grok parity as open, and the inherited protobuf loader as not accepted/integrated; these statuses are consistent with the C3–C5 reviews.
- The C4 review says the current 60-base + T130–T139 set is not the same as the historical 30+9 run. Preserve historical PASS counts only with that qualification; they must not be reported as a pass for the intended 60+10 suite.
- The costume emergency fix is documented as a Claude v15.48.0 source change. Its feature state is not contradicted by this audit; latest shape-specific test assertions still require the current run confirmation recorded in team/AI-STATUS.txt.
- Root TODO.txt still labels the built-in GWrap AI / own-key option as not started even though the reviewed app blob already contains the Developer-mode Anthropic key interface and request function. It should be marked candidate/present but privacy/model acceptance pending, not “finished/verified.”
- The TODO historic statement that Grok fixture tests ran (59/59) should remain history, but be explicitly distinguished from the newer, still-pending 60+10 run.

ACCEPTANCE CHECKLIST
[ ] Confirm a current API-supported default model ID; no actual request tested in this review.
[ ] Add transparent context preview and a user choice to omit project context; test cancel/no-request.
[ ] Document destination, possible cost, payload categories and storage limitations.
[ ] Test session-only/persistent/remove behavior with dummy credentials and storage failures.
[ ] Verify no key enters project exports, AI reports, diagnostics, logs or generated test artifacts.
[ ] Run a limited current-source scan and a separate Git-history/repository-settings review through the authorized owner/Claude process.
[ ] Run target-browser/network tests and record actual outcomes without logging any key.
[ ] Keep the canonical website URL unchanged until the owner confirms the exact replacement.

OVERALL STATUS
SOURCE REVIEW: COMPLETE for the pinned app blob and relevant governance files.
OFFICIAL DOCUMENTATION CHECK: performed for the model-ID discrepancy.
BROWSER / ANTHROPIC API: NOT TESTED.
REPOSITORY HISTORY / SECRET SETTINGS: NOT TESTED.
APP CODE CHANGED: NO.
INTEGRATION / RELEASE: NOT DONE.


---
## REVIEW-GEMINI-ANIMATION-LAB-2026-10-19.txt

G-WARP C9 REVIEW — NEW GEMINI ANIMATION / LAB BATCH
Date: 2026-10-19 (America/New_York)
Reviewer: ChatGPT
Reviewed candidate commit: b05973868839921586c844a93c4e1546c75c1c5c
Parent commit: 33e143bcb63267f0290c46365b507212131ed478
Evidence class: SOURCE-VERIFIED TREE/FILE REVIEW + STATIC ANALYSIS
ChatGPT Node test: NOT RUN
Browser / SVG visual test: NOT RUN
Production integration: NOT DONE

SCOPE
Reviewed the latest 37-file Gemini candidate commit: 3 rig-character SVGs, 24 flipbook frames, three auto-rig candidates, three easing candidates, two lab reports, the easing visualizer, and the Node test harness. The commit did not modify app.html or index.html. Candidate files remain disconnected from production.

VERDICT
KEEP ISOLATED — useful visual prototypes and a promising labelled-character rig path, but the batch is not acceptance-ready. The primary melody-engine assignment remains missing at its required paths, the generic auto-rig fallback can produce an invalid hierarchy, and the existing harness does not prove several claims made in LAB-auto-rig.txt. No integration or release recommendation is made.

FINDINGS

1. HIGH — Current top-priority melody deliverables are absent at the required paths
Assignment references: team/GEMINI-MELODY-2026-10-19.txt and the M1/M2 priority in team/TODO-GEMINI.txt.
The current recursive tree at the reviewed commit does not contain gemini/lab/melody-engine.js or gemini/lab/lab-melody.html. The Gemini chat log mentions older music-engine-A/B/C.js files elsewhere, but that is not the specified M1 contract and no mapping/acceptance test shows they satisfy window.GW_MELODY.make({style,mood,scale,bars,bpm,seed}) or the required eight style-specific melody behaviors.
Minimum correction: deliver the exact M1/M2 paths, or explicitly update the active assignment/status with the owner/Claude. Test deterministic same-seed output, eight distinct styles, motif/repetition rules, chord-tone emphasis on strong beats, mood range/energy, MIDI bounds and Web Audio playback.

2. HIGH — Auto-rig Option C can assign the selected root bone as its own parent for unlabelled SVG groups
File/function: gemini/lab/auto-rig-C.js — autoRigC() and classifyRole().
When no group is explicitly named body/torso, autoRigC() selects the largest bounding-box group as bodyGrp, but classifyRole() does not special-case that chosen root. If its arbitrary ID is not semantically recognized, the position fallback can classify it as armL/armR/legL/legR. The bone parent is then set to bodyGrp.id because the role is not body; for the root itself, parent can equal its own ID, creating a cyclic rig hierarchy.
Minimum correction: force bodyGrp to be the root bone with parent:null regardless of its SVG ID, and parent other groups to that root. Add unlabelled-root, mixed-case ID, missing-body, empty and malformed SVG fixtures; assert the hierarchy is acyclic.

3. HIGH — The rig test does not assert the exact pivot values reported as recovered
File: gemini/lab/test-anim-lab.js.
The harness asserts six bones and a parts-map entry for each expected group, then prints a summary table for Option C pivots. It does not assert the exact arm/leg pivot coordinates. A regression could print incorrect coordinates while the harness still reports all rigs passing. The test also does not assert parent validity, root uniqueness, non-self-parenting, bone lengths/angles or behavior on an unlabelled drawing.
Minimum correction: assert the expected pivot coordinates for each named character; assert exactly one root, no self-parent/cycles, valid parent references, and meaningful positive lengths. Keep the Node result labelled REPORTED TEST until the exact harness and output are tied to a commit and independently reproduced by the assigned tester.

4. MEDIUM — Required pivots.json is missing
Assignment reference: team/GEMINI-SPRINT-2026-10-19.txt job 2 requests pivots.json alongside the three riggable characters. The current tree has only the three SVGs under gemini/rig-characters/. Pivot coordinates are commented into SVG files, but there is no machine-readable pivots.json.
Minimum correction: add pivots.json with per-character pivot coordinates, specify SVG/viewBox coordinate units, and test that each coordinate matches an actual intended joint anchor. If the owner prefers comments embedded in SVG instead, update the assignment/status and remove the unused file requirement explicitly.

5. MEDIUM — The submitted variants conflict with the active sprint's “one best version” rule
Assignment reference: team/GEMINI-SPRINT-2026-10-19.txt.
The sprint explicitly says “ONE best version per job (no A/B/C this time)”, yet this batch contains auto-rig-A/B/C.js and easing-A/B/C.js, with separate visual comparisons. Earlier lab guidance permits A/B/C when specifically requested, but the current sprint instruction is more specific for this sprint.
Minimum correction: preserve the variants as research history, select one default proposal per job, and clearly mark alternatives as comparison-only rather than presenting them as this sprint's chosen deliverables. Do not delete legacy candidates without checking references/owner approval.

6. MEDIUM — Flipbook paths do not match the assigned folder layout
Assignment reference: team/GEMINI-SPRINT-2026-10-19.txt job 3 requests gemini/flipbook-sprites/<name>/frameN.svg. The current tree instead has flat names such as coin-1.svg, spark-1.svg, ball-1.svg and gspark-1.svg directly under gemini/flipbook-sprites/. The 24 frames cover the requested six sets, but the required path contract is not met and there is no manifest mapping each animation to its ordered frames.
Minimum correction: choose one canonical layout, keep frame ordering explicit in a manifest/README or use the requested per-animation folders, and verify every sequence loads in order at the intended frame rate.

7. MEDIUM — Easing modules are lab globals, not drop-in replacements for GW_ANIM.mix()
Files: gemini/lab/easing-A.js, easing-B.js, easing-C.js and LAB-easing.txt.
Each script registers a separate window.GW_LAB_EASING_* object. None changes or wraps window.GW_ANIM.mix, which is correct for an isolated candidate but means the comments saying it “Plugs into window.GW_ANIM.mix” are integration intent, not implemented integration. The lab report's SOURCE-VERIFIED wording should not be read as proof that the modules are accepted by the live app or that Smooth x2 uses them.
Minimum correction: document the candidates as isolated adapters and specify the exact mapping required by Claude's integration. Keep app.html unchanged until authorization. Test interpolation semantics against the pinned current source, including t outside [0,1], missing pose keys, non-finite values, angles at exactly 180 degrees, and Option C overshoot endpoints/range.

8. MEDIUM — SVG/bone acceptance is narrower than the report's generic-input claim
Files: gemini/lab/auto-rig-A.js and auto-rig-C.js.
The candidate parses SVG using regular expressions rather than an XML/geometry parser. bboxFromSnippet() handles only selected shape attributes and only selected uppercase path coordinate patterns; it does not compute a complete bounding box for arbitrary paths, transforms, relative commands or nested groups. Option C's findFirstJointCircle() chooses the first small circle inside a group, which may be decoration rather than the intended joint in general art. This is acceptable for a constrained prototype set, not proof of general kid-drawn SVG support.
Minimum correction: define the supported SVG subset, safely reject unsupported constructs or use a tested SVG/DOM geometry path, and add negative/edge fixtures. Do not promise reliable auto-rigging for arbitrary costumes from the current heuristics alone.

PROCESS / EVIDENCE NOTES
- Gemini's existing chat log reports SVG XML parsing and Node harness passes for the G3/G4/L1/L2 assets. This is REPORTED TEST evidence; ChatGPT did not independently reproduce it. The harness does not assert the exact pivots written in the lab report and does not test the generic-root fallback.
- The reviewed test file itself is source-verifiable, but ChatGPT could not independently execute Node/browser tests in this review environment. Do not label the batch BROWSER-VERIFIED.
- The existing Gemini log records a prior completed-batch entry for similar G3/G4/L1/L2 outputs, but does not reconcile that status with the newer sprint's changed order and rules (M1 is now first priority and the sprint asks for one best version, not A/B/C). The required current M1 paths and pivots.json remain absent. Update the log with the current assignment, omissions, real test commands/results and next step.
- app.html and index.html were not modified by ChatGPT. No private owner test projects/assets were accessed or copied.

ACCEPTANCE GATES
[ ] Resolve the missing melody-engine.js and lab-melody.html assignment first, or formally update its priority/status.
[ ] Add pivots.json or obtain an explicit assignment change.
[ ] Fix Auto-rig C's generic-root self-parent case and test unlabelled SVGs.
[ ] Assert exact expected pivots and valid acyclic hierarchy in the harness.
[ ] Reconcile the no-A/B/C sprint rule and flipbook frame paths/manifest.
[ ] Correct lab integration wording; keep all candidates isolated.
[ ] Record exact current-commit SVG parsing, Node test command/output, and browser visual verification separately.
[ ] Update Gemini's own AI-CHAT-LOG.txt and one authoritative task status; Claude/owner retain integration and release gates.

NEXT ACTION
Gemini should revise only its own gemini/ files and task log. Claude should review any revised lab candidate and run the controlled tests when available. Owner approval remains required before live integration or release.


---
## REVIEW-GEMINI-COSTUME-CANDIDATES-2026-10-19.txt

G-WARP — GEMINI LAB COSTUME CANDIDATE REVIEW
Date: 2026-10-19
Reviewer: ChatGPT
Task: C1 — read-only review of inherited costume proposals.
Evidence: STATIC SOURCE REVIEW only. No browser, app run, pixel test or candidate test was executed.
Current app baseline reviewed: app.html blob 5ca624a515b9fc1310814c4740608c1cf3071028 (Beta v15.48.0; this is a historical blob reference from the source review, not a claim that the candidate was loaded).
ENGINE-MAP reviewed: blob 2638ede6199671552c7a4a350a04e4cbcdac4fa3 (header calls itself v15.45.0; rechecked relevant field names directly in the v15.48.0 source).
Candidate SHAs:
- costume-select-C.js: fe96ca0994eaf40e06be1a4a48a40f7d6f00cc74
- costume-fill-C.js: 6c28705879d35ed6892af16bfcc04070928a4099
- costume-text-B.js: f0d485a9161545e8a828edcfa47ae7a06befb087
- costume-eraser-C.js: 587bcbc59c34b5b782d208ef41a4b4870746c011
- costume-undo-C.js: f63cfbf73e795ef10a64f6fd3a815786040badb0
- LAB-costumes.txt: 6f6f064ba8f099c612e69ba672ce9c2b050e5127
- CHECKLIST-costumes.txt: 709ae64ea265db8495601d013130903fac9053a9

OVERALL VERDICT: BLOCKED / HIGH RISK — DO NOT INTEGRATE THESE FIVE FILES AS-IS.
The lab's own README says integration is blocked on actual editor state/API mapping, canvas isolation and event-listener scope. Source review confirms those are still material blockers. The “winner” names and Round 3 comments are candidate-author claims, not evidence that the code matches the current app. The five files contain no attached executable tests or independently verified browser results. Do not add their script tags to app.html pending corrections, isolated tests, and Claude/owner approval.

SOURCE-VERIFIED CURRENT EDITOR CONTRACT
1. The vector drawing surface is SVG `#gwVectorCanvasV15`; the bitmap drawing surface is canvas `#gwBitmapCanvasV15`. The candidates' legacy selectors such as `#gw-costume-canvas`, `#gw-bitmap-canvas`, `.gw-paint-canvas`, and `canvas.gw-bitmap` do not match the current explicit IDs. A generic `canvas` fallback may select a different editor/stage canvas, and it cannot select the actual SVG vector surface.
2. The exported editor API is `window.GW_V15_COSTUME_EDITOR`, with `state.costumeMode` (values `vector` / `bitmap`), `state.svgTool`, `state.bitmapTool`, `state.selectedSvg`, `state.svgDrag`, `state.selectionRect`, `setMode`, `save`, `loadBitmap`, `loadVector`, `refreshList`, and `cleanSvgXml`. The current state does NOT have `state.mode`, `state.fillColor`, `state.fill`, `state.font`, `state.fontSize`, or `state.eraserSize`; relevant color/width controls are in actual editor inputs such as `#gwVectorFillV15`, `#gwVectorStrokeV15`, and `#gwVectorStrokeWidthV15`.
3. `window.GW_VECTOR_EDITOR` exports `mapFor(costume)` plus load/save functions. Coordinate conversion must respect the editor's real costume mapping and the current SVG/canvas CSS scaling; raw viewport deltas and `offsetX` are not automatically costume coordinates.
4. Static search of the current app source found no `data-gw-shape` markers in the existing editor implementation. It uses its own SVG content and selection/handle path. A new candidate cannot assume existing vector shapes match `[data-gw-shape]`.
5. `GW8.undo()` and `GW8.redo()` exist, but they are the app's general history controls, not proven costume-local transactions. `GW8.pushHistory(label)` records a snapshot; it does not mean “undo” or “redo.” The current history snapshot has not been shown to preserve a costume's actual SVG/PNG edits, so these candidates must not treat a history label as a working art-history operation.
6. The currently shipped costume editor already binds pointer events to its SVG/canvas and performs its own load/save mapping. New tools must compose with those listeners and persist through the native model; writing to a detached parse or drawing over the canvas without syncing the active costume can produce stale display/data.

FILE-BY-FILE FINDINGS

1. costume-select-C.js — BLOCKER / HIGH
Exact areas: `canvasFor()`, `attach()`, `getSvgNode()`, `selectedNode()`, pointer handlers, `flushMove()`.
- Mode read is `CE.state.mode`; current field is `CE.state.costumeMode`. With the current editor, `mode` is absent and the code silently defaults to vector even when Bitmap is active.
- Selectors do not name either current surface. The vector surface is an SVG, so the fallback `canvas` cannot work as a vector canvas. The bitmap selector also misses `#gwBitmapCanvasV15`.
- Header says it wraps/uses `GW_VECTOR_EDITOR.mapFor`, but this file never calls `VE.mapFor`. It adds CSS-pixel pointer deltas directly to `data-gw-tx/ty`, which is not a safe SVG viewBox/costume transform.
- It parses `costume.svg` to a detached DOM node, then uses a hit target from the live surface. The live target does not match `[data-gw-shape]` in the current source, and it mutates the parsed copy rather than the displayed live SVG or saved costume string. Selection state and movement therefore do not connect reliably to what is rendered/saved.
- The `CE.setMode` wrapper calls `attach()` after each mode change but never removes prior listeners or marks them attached. Repeated switching can attach duplicate handlers; the vector and bitmap element can be replaced/reinitialized during editor boot.
- It provides only translation; it does not implement the checklist's resize/rotate handles, shift-select, deletion or copy/paste, and duplicates functionality the native Select tool already claims to provide.
Minimum correction: prefer the shipped native Select tool unless a confirmed reproducible missing feature justifies a new module. If a separate tool remains needed, target exact current surfaces, use `costumeMode`, hit-test the live SVG using the native element model and mapping, update actual artwork/model, save/refresh through supported hooks, and install listeners once with a teardown or explicit idempotency guard.
Acceptance tests: create vector shapes in a costume; click-select and drag at 50%, 100% and 150% canvas scaling; test pointer capture when dragging beyond the canvas; save/reopen and confirm the same translation; switch vector/bitmap ten times and ensure one drag causes exactly one move/history entry; try selecting an unrelated Stage/costume-list element and confirm no action; verify malformed SVG shows a safe message without changing the costume.

2. costume-fill-C.js — BLOCKER / HIGH
Exact areas: document-level `click` listener, `currentCostume()`, PNG canvas lookup/coordinate calculation, `[data-gw-shape]` lookup, `solidFillSvg()`, `floodFillBitmap()`.
- A document-wide click listener conflicts with the lab's own rule (“Never attach listeners to the whole document; only to the costume canvas”). The handler checks the active costume but not that the click was on the editor canvas/tool; clicks elsewhere in the app can trigger fill behavior.
- The PNG canvas lookup uses stale selectors and generic `canvas`; it can read/write the wrong canvas. It derives x/y as CSS pixel offsets, without multiplying by `canvas.width / rect.width` or height scale, although the actual canvas has a 512×384 backing store displayed at a different CSS size.
- Vector fill expects `[data-gw-shape]`, which is absent from the current native SVG shape DOM. It mutates an arbitrary target element's `fill` attribute instead of using the current tool/selection/model path, and does not serialize/reconcile the live costume SVG.
- Fill color comes from nonexistent `CE.state.fillColor` / `CE.state.fill`, so the candidate likely falls back to black instead of the active toolbar color `#gwVectorFillV15`.
- Flood-fill allocates a full-image `ImageData` and `Uint8Array`, then uses a JavaScript stack that can grow to many pixels. No operation-size budget, cancellation, or time guard exists. Exact RGBA matching also should be characterized on anti-aliased edges/transparency before presenting it as a complete bucket tool.
- `GW8.pushHistory('Fill ...')` records an entry label, but no evidence proves the changed SVG/PNG pixels are part of that history snapshot or will persist after native save.
Minimum correction: do not add a global listener. Integrate a tool state and pointer action into the current editor's existing canvas handlers; take color from the actual toolbar control; ensure correct mapped canvas coordinates; update the native costume data and saved representation; implement bounded/cancellable flood-fill and pixel/alpha tests; use an actual editor history transaction or omit history until supported.
Acceptance tests: fill a vector shape and PNG region at 50%, 100%, and 150% display scale; click outside the canvas and on toolbar/list/stage and ensure no fill; test current fill color, same-color no-op, transparent region, anti-aliased boundary and large 512×384 image; undo/redo once and save/reopen with exact pixels preserved; confirm one action creates one history step and no unrelated canvas changes.

3. costume-text-B.js — BLOCKER / HIGH
Exact areas: `refreshStyle()`, `commit()`, textarea lifecycle and document-level `click` handler.
- Click handling calls `document.querySelector('canvas')` and requires `e.target === canvas`. The current vector surface is SVG, not a canvas; for a vector costume this condition fails. On the page, the first generic canvas can be the Stage/another surface rather than the costume editor.
- The click handler is document-wide and hides the textbox for every click not exactly on its guessed canvas. This can affect unrelated controls and makes input lifecycle dependent on other page UI.
- Anchor uses `e.offsetX || e.clientX` / `offsetY || clientY` from the event target and appends x/y directly to the source SVG. Those coordinates are not mapped through the SVG viewBox, CSS scaling, `mapFor(costume)`, zoom/pan or rotation centre. A valid zero offset is also replaced with viewport coordinates by `||`.
- `refreshStyle()` reads `font`, `fontSize`, and `fillColor/fill` from `CE.state`; those fields are absent. Actual fill/width choices are input controls. It therefore silently uses default sans-serif/24/black rather than reliably honoring the toolbar.
- It mutates `c.svg` by serializing an SVG and appending a text node but does not call the native editor's save/load/render path to refresh the visible editor, and it has no tested transaction/undo integration. It writes `data-gw-shape` on only the new text node, which does not solve the existing-shape API mismatch for other tools.
- There is no evidence the generic global `GW8.pushHistory('Add text')` snapshot includes costume SVG changes. The textarea is created at module load with no teardown/idempotency marker; reloading the script can create duplicates. Text length is not capped in this B version.
Minimum correction: use the native vector SVG surface and its correct coordinate transform; read font/fill/size from real controls (or implement proper dedicated controls); scope textbox opening/closing to the editor; refresh/render through the current costume API; add safe length bounds, Escape/cancel handling, one-step edit undo and a single installation lifecycle. Keep text creation vector-only unless bitmap text rendering is explicitly implemented.
Acceptance tests: add single- and multi-line text on a vector costume at multiple zoom levels; use spaces, Unicode, quotes and a 500+ character input; verify the selected color/size; click toolbar while typing and confirm text remains under user control; Escape cancels without mutation; Enter commits once; save/reopen and verify text placement/data; undo/redo exactly once; verify clicks on stage, sprites, and non-costume canvases never open the textarea.

4. costume-eraser-C.js — BLOCKER / HIGH
Exact areas: `canvas()`, `brushSize()`, document-level pointerdown/move/up handlers.
- It reads nonexistent `CE.state.mode`, so the current editor appears to remain in its vector fallback branch and show the vector-mode hint even in real bitmap mode.
- Bitmap selector misses `#gwBitmapCanvasV15`; generic `canvas` may return an unrelated canvas.
- Handlers are registered on `document`, not on the exact bitmap editor surface. They can start drawing in response to pointerdown outside that surface if the mode check is corrected; the code has no `canvas.contains(e.target)` gate.
- The document event target may be an SVG child, toolbar/button, another canvas, or document; `e.offsetX/e.offsetY` are relative to the event target, not necessarily the selected canvas. The drawing positions will be wrong when the event target changes or the canvas is CSS-scaled.
- It reads non-existent `CE.state.eraserSize` and falls back to 20. Current tool sizing must be taken from the real UI or a documented new state field.
- The editor already has bitmap handlers and model mapping/save logic. A second handler using `destination-out` may race native brush/fill behavior and may alter the canvas without the model/save path updating the underlying costume correctly. The `ctx.save()`/restore pairing is not protected if drawing exits early on pointercancel/blur or surface replacement; cleanup state is global.
Minimum correction: attach directly to `#gwBitmapCanvasV15` only while the eraser tool is active; ensure `costumeMode === 'bitmap'` and `bitmapTool === 'eraser'`; use the native mapped coordinates, actual brush control and one pointer-capture lifecycle; call the existing bitmap save/update path once on completion, including pointercancel/blur cleanup. Don't implement a vector erase operation; simply show a mode hint inside the editor.
Acceptance tests: eraser clears PNG pixels only in the bitmap canvas; wrong target, toolbar, Stage and vector surface don't erase; scale canvas to different CSS sizes and test all corners; drag beyond canvas and release/cancel; switch modes mid-stroke; verify compositing state is restored; save/reopen the erased costume; one undo restores the prior pixel data and redo reapplies it.

5. costume-undo-C.js — BLOCKER / HIGH
Exact areas: `hasUndoApi/hasRedoApi`, `doUndo()`, `doRedo()`, `CE.state.mode` guard and document-level `keydown`.
- Its active-editor guard tests `CE.state.mode`, a field not present in the current state, so Ctrl/Cmd+Z/Y handling likely never activates. If changed naively to `costumeMode`, it would then be active in all of vector/bitmap modes and could intercept application history across unrelated controls.
- The fallback calls `GW8.pushHistory('__undo__')` and `GW8.pushHistory('__redo__')`. These calls add an undo snapshot entry; they do not execute undo/redo. This contradicts the file header's claim that a descriptive history entry is a safe fallback.
- Although `GW8.undo()` and `GW8.redo()` exist in the current app, they are general project/workspace history. Candidate code has not established that that history snapshots the costume SVG, bitmap pixels, active editing selection or canvas state. Calling them may undo another operation rather than the most recent art edit.
- Document-level capturing `keydown` conflicts with the app's existing global Ctrl/Cmd+Z/Y listeners. It needs correct ownership/focus handling and a cleanup path. The header says handler removed if editor destroyed, but there is no handler removal in the actual file. 
Minimum correction: do not add another document-level undo layer. First identify or implement editor-local history that snapshots native costume data, selection/active costume as needed, and supports atomic begin/commit. Route undo/redo only when a costume control/canvas owns focus, respect typing/contenteditable and let the native app handle other contexts. Remove the fake `pushHistory` fallback entirely.
Acceptance tests: after each supported art operation, Ctrl/Cmd+Z restores exact SVG/PNG data and appearance; redo restores it; multiple pointer moves form one undo entry; keyboard shortcuts outside the costume editor still undo code/project changes; typing in text/name inputs is unaffected; focus leave/re-enter and editor close/reopen do not leave duplicate handlers; Undo does not revert the workspace's last unrelated code edit.

LAB NOTE / CHECKLIST REVIEW
- `LAB-costumes.txt` marks C/C/B/C/C as “winners” and calls them safest/fastest, yet its own UNSURE section admits the canvas selector, `data-gw-shape`, `CE.state.mode`, color fields, and bitmap storage model are unknown. Those are not minor details; the current source confirms several assumptions are wrong. The Round 2/3 descriptions are self-reported changes, not passing test evidence.
- `CHECKLIST-costumes.txt` is a useful product checklist of 56 intended behaviors, but every item is unchecked. It is not proof that the native editor or any candidate implements them. It also contains feature ideas (gradient fill, eyedropper, reshape, rotation-centre shortcuts, copy/paste) that are not covered by these five files. Do not describe its 56 requirements as satisfied.
- `ENGINE-MAP.txt` is useful for concepts but declares itself v15.45.0; use current v15.48.0 source to re-verify selectors and fields before any integration. Current source still confirms the critical mismatches above.
- The report's title says “safest/most complete” for several C variants; this review finds those labels unsupported until acceptance tests pass.

SHARED MINIMUM TEST GATE BEFORE ANY CANDIDATE IS RECONSIDERED
1. Load the candidate behind an explicit feature-off switch and only after a clean API guard; keep current editor behavior as default.
2. Run against vector and real PNG costumes, two sprites with distinct active costumes, save/reopen, Undo/Redo and malformed-costume cases.
3. Test canvas display sizes/scales, pointerdown/move/up/cancel outside canvas, pointer capture, mode changes and repeated module/editor initialization.
4. Assert clicks/key presses outside the costume editor do not cause mutations or steal app-level shortcuts.
5. Count event callbacks/history entries; repeated mode switches must not multiply handlers and one user gesture must create at most one logical history transaction.
6. Compare costume model values before/after and inspect saved SB3/project output, not only pixels visible on a canvas.
7. Record exact current app SHA, browser/version, viewport, console errors and per-case PASS/FAIL. Until this is independently run, label all candidate behavior NOT TESTED.

OWNER/CLAUDE ACTION
- Do not merge these modules based on letter C/B winner tags or the lab prose.
- Prefer reusing/fixing the v15.48.0 native tools for Select/Fill/Text/Eraser and determine whether any real gap remains.
- If a new module is still needed, first create a small source/API adapter and canvas-local hook with lifecycle cleanup, then implement one tool at a time. Keep art history separate until actual costume snapshots are proven.
- ChatGPT performed only static inspection. No candidate file, app.html, Gemini file, or Claude test file was changed.


---
## REVIEW-GROK-EXPECTED-RESULTS-2026-10-19.txt

G-WARP C4 REVIEW — GROK TESTS EXPECTED RESULTS
Date: 2026-10-19 (America/New_York)
Reviewer: ChatGPT
Task: team/TODO-CHATGPT.txt C4
Evidence class: STATIC SOURCE REVIEW + PRIMARY-SOURCE CROSS-CHECK
Runtime/browser test by ChatGPT: NOT RUN
Files changed by this review: this report only; Grok-owned files were not changed.

ARTIFACT / BASELINE
- G-Warp main HEAD at review start: 8987510d4804fd7488d4a1d77d0f21f77e28ff98
- grok/TESTS.txt blob: 972bf2257cfdaf2ce80c5cfa11fbd30cc571e247
- grok/VERIFY-high-risk.txt blob: 8634b9c8cb8ef103bd8863336542d89f0ebc0e7c
- grok/SPEC-control.txt blob: 17f2f1998082275a24f25342c367abff620ed1ff
- grok/fixtures.json blob: 9da4f9826c34fe15bf262dfb0aa7caa2b6660c1f
- grok/FIXTURE-SOURCES.txt blob: 78e596183f71ba37edf4d5666ea52398a411362c
- Current primary Scratch VM location: scratchfoundation/scratch-editor, develop at commit 585b1c3877943b31ac273b3d056ccb79db13aa41 (2026-10-18 22:29:45 UTC).
- The older scratchfoundation/scratch-vm repository is archived; its develop head is b3266a0cfe5122f20b72ccd738a3dd4dff4fc5a5. Use the current mono-repo path in new evidence rather than treating the archived repository as the permanent source of truth.
- The primary-source checks in this report used the pinned scratch-editor revision above. This does not prove GUI presentation or G-Warp runtime parity.

EXECUTIVE FINDINGS
1. BLOCKER — T043 remains WRONG in TESTS.txt.
   grok/TESTS.txt expects repeat 2.7 to run 2 times by flooring. The current primary VM source uses Math.round(Cast.toNumber(args.TIMES)), so 2.7 rounds to 3 and the body runs 3 times. This is independently visible in packages/scratch-vm/src/blocks/scratch3_control.js at the pinned scratch-editor commit. grok/fixtures.json already says 3, while grok/FIXTURE-SOURCES.txt still says 2 and is also stale about the 30-case set. Correct TESTS.txt and FIXTURE-SOURCES.txt together; don't reintroduce a runner-side override.
   Primary source: https://github.com/scratchfoundation/scratch-editor/blob/585b1c3877943b31ac273b3d056ccb79db13aa41/packages/scratch-vm/src/blocks/scratch3_control.js

2. HIGH — T017 random test is logically invalid as written.
   The SCRIPT uses three elided/repeated pick-random expressions to test whether a value is 1, 2 or 3. If those are three independent draws, a valid draw can still fail the combined condition. Store one draw in V, then assert V is an integer and 1 <= V <= 3; repeat many times using the same V for each assertion. Keep the random test probabilistic and record its seed/iteration count where reproducibility is needed.

3. HIGH — T037's “330 characters” expectation is not established as Scratch VM behavior.
   The VM's looks say primitive emits the provided message to the speech-bubble event; that code does not establish a 330-character truncation rule. A GUI could impose display limits, so this finding is NOT a claim that the visible bubble was browser-tested. Require a Scratch editor/UI reproduction with a 400-character controlled string and saved evidence. If 330 is only G-Warp's own guard, move the case to G-Warp-only regression tests rather than label it exact Scratch behavior.
   Primary source to inspect: https://github.com/scratchfoundation/scratch-editor/blob/585b1c3877943b31ac273b3d056ccb79db13aa41/packages/scratch-vm/src/blocks/scratch3_looks.js

4. HIGH — T067 and T068 are not precise runnable tests.
   T067 says “call foo without filling input” and allows “0 (or defined default),” which is not one expected result. A custom-block call gets parameter defaults from its procedure prototype; specify the exact prototype/default and call input value.
   T068 asks for a boolean argument reporter “outside any call.” The reporter is scoped to a custom-block definition and the described project is not a clear, buildable Scratch script. Replace with a valid custom block definition/call, or remove it until a reproducible project is supplied.
   Related primary source: https://github.com/scratchfoundation/scratch-editor/blob/585b1c3877943b31ac273b3d056ccb79db13aa41/packages/scratch-vm/src/blocks/scratch3_procedures.js

5. HIGH — T074 is a dangerous and poorly isolated stress recipe, not a parity case.
   Repeatedly doubling a string 100,000 times can cause enormous allocation very quickly; the test may hit a watchdog or memory pressure before it tests a specific cap. Label it G-Warp-only, use a bounded number of doublings, assert the documented cap and responsiveness separately, and include a safe abort condition. Scratch VM's operator_join path does not establish a 330-character or equivalent built-in hard cap.

CASES THAT NEED CORRECTION OR CLEARER SCOPE
- T016 (“and short-circuit style truth”): expected truth value is fine, but it does not test short-circuit behavior. Reporter inputs are evaluated as part of block execution; this is only a boolean truth test. Rename it or provide a valid side-effect-free test that actually distinguishes the behavior being claimed.
- T020 (sqrt(-1)): separate the reporter result from the visible say bubble and monitor formatting. “NaN or empty in some monitors” is not a single expected result and does not describe the say-bubble surface in the SCRIPT. Mark UI formatting LIVE-UI-REQUIRED until verified in Scratch.
- T030: the 200,000 list item constant and add-to-list guard are source-supported in Scratch VM. Keep the scope precise: it is a VM limit, not proof of identical TurboWarp/PenguinMod behavior. A cap test must assert the boundary behavior (an additional add is ignored) rather than only record the constant.
- T032: the expected numeric result is 0 for direction 180 + right-turn 180. Remove “or 360-normalized”; it contradicts the stated normalized range and makes the expected result ambiguous.
- T033 / T035: geometry depends on costume bounds and size. The source fences rendered costume bounds, not a universal sprite-centre coordinate of about x=240. Specify a known costume and size, then check the measured final coordinate. For bounce, specify the actual touching edge and ensure the sprite's bounds cross it before asserting a direction.
- T036: “say empty clears bubble” needs a Scratch GUI observation; the VM emits an empty message but that alone does not prove precisely how the GUI hides/renders the bubble.
- T037: see HIGH finding above.
- T041: “small positive minimum” is not exact. Scratch's setSize clamps relative to the current costume dimensions and stage dimensions; the size reporter is rounded. Pin the costume asset/size, compute or source-confirm the expected boundary, and record the actual reporter value.
  Primary source: https://github.com/scratchfoundation/scratch-editor/blob/585b1c3877943b31ac273b3d056ccb79db13aa41/packages/scratch-vm/src/sprites/rendered-target.js
- T047: the script snippet contains only “when I start as a clone [delete this clone]” and does not show any parent script creating a clone. Add a green-flag creator, specify clone count before/after, and assert that the original survives.
- T050: the stated final sum (11) is reasonable if both receivers finish, but the script does not wait before inspection and “order is all receivers for that broadcast” is imprecise. Use broadcast-and-wait or a completion signal; keep the test about both receivers executing, not about an unsupported ordering claim.
- T056: specify a known backdrop and a fixed point/region without the target color. “Empty area” is not a sufficient setup if the backdrop itself can contain the chosen color.
- T058: current year is environment/time dependent. Keep the requirement numeric and source-based; for UI testing record the date/time zone, and do not hardcode the example year as a universal expected value.
- T061: an unknown sound name is a malformed-project robustness test, not a normal Scratch menu workflow. Retain it as a negative/imported-project test with a concrete fixture and expected continuation behavior.
- T071: “within ~100 ms” is a G-Warp engineering target, not Scratch parity. Put it in a separately labeled performance/regression suite; record browser, hardware, clone count, measurement method and actual latency.
- T072: “reset variables project rule if any” is conditional and has no single expected outcome. Identify the exact G-Warp setting/schema and default, otherwise remove it from parity tests.
- T073: turbo responsiveness/Stop latency is a performance stress test, not an exact Scratch result. Define measurable thresholds, setup and environment, and label it TurboWarp/G-Warp-specific as applicable.
- T064 is supported by current primary source: the Scratch pen extension calls wrapClamp(value, 0, 100), yielding a 101-value period. Issue #2273 documents the visible quirk, but an editor observation is still a useful regression check.
  Source: https://github.com/scratchfoundation/scratch-editor/blob/585b1c3877943b31ac273b3d056ccb79db13aa41/packages/scratch-vm/src/extensions/scratch3_pen/index.js
  Issue: https://github.com/scratchfoundation/scratch-vm/issues/2273

SOURCE-SUPPORTED ITEMS CHECKED IN THIS PASS
- repeat 2.7 -> 3 iterations (contradicts TESTS.txt T043).
- round uses Math.round; round(-2.5) -> -2 and round(2.5) -> 3.
- modulo uses Scratch's floored adjustment; nonnumeric string equality uses case-insensitive Cast.compare.
- list indices are 1-based; index 0 is invalid and item-of-list returns an empty string; insert at index 0 is a no-op.
- list item limit is 200,000; clone creation limit is 300.
- pen size is clamped to 1..1200; pen colour wrapping calls wrapClamp(value, 0, 100).
- missing custom procedure definition is a no-op by design.
These are SOURCE-VERIFIED against the pinned Scratch editor VM revision, not BROWSER-VERIFIED and not proof that G-Warp matches them.

REQUIRED EVIDENCE STANDARD FOR EACH EXPECTED RESULT
Every case needs:
1. Case ID and system scope: SCRATCH-VM, SCRATCH-GUI, TURBOWARP-OPTION, PENGUINMOD-OPTION, or G-WARP-ONLY.
2. Primary-source version: pinned commit SHA or released version, not only a moving “develop” label. Link exact source file and function; quote line ranges only when verified.
3. Evidence class: SOURCE-VERIFIED for a directly derived VM rule; LIVE-UI-VERIFIED for display/timing/interaction observed in a named editor build; REPORTED TEST for another person's run; NOT TESTED when no run exists.
4. Reproducible setup, input values, exact expected outcome, and any controlled state (costume, backdrop, sprite order, key edge, clone baseline, clock/timezone).
5. For UI formatting and timing, include environment, recording/screenshot or repeatable test steps, and tolerance. Source code alone is not proof of rendered output.
6. For G-Warp-specific hardening/performance cases, keep separate from Scratch parity fixtures and name the relevant safety target explicitly.
7. Keep Grok's files authored by Grok. ChatGPT's role here is to report the corrections and acceptance tests, not silently edit grok/ or Claude's test runner.

ACCEPTANCE CHECKLIST FOR GROK / CLAUDE
[ ] Fix T043 in grok/TESTS.txt to 3 and correct grok/FIXTURE-SOURCES.txt to match the 60-case fixture revision; remove stale “30 cases” statements.
[ ] Rewrite T017 to reuse one stored random value per iteration.
[ ] Give T037 a Scratch GUI observation or reclassify it as G-Warp-only; do not claim 330 is source-proven from the VM.
[ ] Replace vague T067/T068 with runnable custom-block projects and one exact expected result each.
[ ] Split G-Warp-only T071-T074 out of Scratch parity acceptance; make T074 bounded and safe.
[ ] Resolve the setup/expectation issues listed above before treating this as a golden test suite.
[ ] After Grok updates its own files, Claude should run the intended current fixture set with explicit inputs, report the exact runner revision and app SHA, and distinguish expected/actual output from source-only assumptions.

OVERALL VERDICT
STATIC REVIEW: ACTIONABLE; multiple test definitions or labels need correction before the document can safely serve as an “exact-result” parity suite.
INDEPENDENT G-WARP RUNTIME TEST: NOT RUN.
SCRATCH GUI TEST: NOT RUN.
INTEGRATION OR RELEASE: NOT DONE.


---
## REVIEW-PMP-PROTOBUF-LOADER-2026-10-19.txt

G-WARP C5 REVIEW — INHERITED PROTOBUF .PMP LOADER
Date: 2026-10-19 (America/New_York)
Reviewer: ChatGPT
Task: team/TODO-CHATGPT.txt C5
Evidence class: STATIC SOURCE REVIEW + UPSTREAM API CROSS-CHECK
G-Warp browser/runtime test: NOT RUN
Real protobuf fixture test: NOT RUN
Gemini files edited: NO
app.html / index.html edited: NO

ARTIFACTS AND PINS
G-Warp repository main HEAD at start of review:
- Commit: 8987510d4804fd7488d4a1d77d0f21f77e28ff98
- gemini/lab/pmp-loader.js blob: d0a2749c69c29177305350162509099a07099448
- gemini/lab/NOTES-pmp.txt blob: beb80d426845e503f6cf67deb53922d541c6a6e0
- gemini/lab/test-pmp-loader.js blob: b9495897382c7a6439d44a4ea3c0c90e3dbd458a

Upstream references checked:
- PenguinMod/pmp-protobuf main HEAD: 84176d56c2b5bdebce8150a6bf9fefcac59fc1af
  * index.js: https://github.com/PenguinMod/pmp-protobuf/blob/84176d56c2b5bdebce8150a6bf9fefcac59fc1af/index.js
  * README: https://github.com/PenguinMod/pmp-protobuf/blob/84176d56c2b5bdebce8150a6bf9fefcac59fc1af/README.md
  * package.json: https://github.com/PenguinMod/pmp-protobuf/blob/84176d56c2b5bdebce8150a6bf9fefcac59fc1af/package.json
- PenguinMod official project fetcher, current develop file:
  https://github.com/PenguinMod/penguinmod.github.io/blob/develop/src/lib/project-fetcher-hoc.jsx
- Upstream readme / licence / API summary: https://github.com/PenguinMod/pmp-protobuf

VERDICT
BLOCKED / HIGH RISK — useful research skeleton only; not a verified protobuf loader, not integrated, and not suitable to mark ready or PICK for integration. No real protobuf project or asset set is present in the harness, and no runtime test was run.

FINDINGS

1. BLOCKER — No test actually decodes a protobuf.
Exact file: gemini/lab/test-pmp-loader.js.
The four-byte fake value [0x08,0x01,0x12,0x03] only exercises detect(); it never calls toProjectJson() on those bytes. The test therefore proves only that a non-ZIP buffer is labelled protobuf. The one-byte value exercises the early unknown branch, not parser error handling. The real-file test is commented out and contains a placeholder instead of a fixture. No parser invocation, JSON assertion, asset assertion, project open, or save/reopen round trip has been run.
Minimum correction: build a separate harness with one legally shareable, known-good protobuf .pmp fixture and its required costume/sound asset files; execute the real parse/load path and assert concrete project structure and assets. Keep fixture provenance/licence and source SHA/checksum in the test notes.
Acceptance: test logs the fixture identity/checksum, parser version, expected/actual target/block/costume/sound counts, asset resolution results, and a successful open/save/reopen or equivalent round trip. Until then, parser correctness = NOT TESTED.

2. BLOCKER — assets: new Map() makes the result incomplete for real projects with media.
Exact file/function: gemini/lab/pmp-loader.js, GW_PMP._protobuf().
Upstream pmp-protobuf defines protobufToJson(buffer) as a project JSON conversion and separately documents protobufToPMP(protobuf, assets) / jsonToPMP(project_json, assets); assets is an independent input, not automatically reconstructed by protobufToJson. The upstream conversion carries costumes/sounds metadata such as asset IDs, formats and paths, but this code deliberately returns an empty Map. The original notes themselves admit costumes/sounds would be missing.
Minimum correction: map out the actual asset source/contract for protobuf projects, then fetch or supply the referenced media according to an approved source and validate every asset reference before handing the project to G-Warp. Do not report “protobuf load support” if the project JSON loads without media.
Acceptance: real project with at least one bitmap/vector costume and one sound opens with correct content; all referenced assets resolve; missing/failed media causes a clear error, not a silently broken project. Preserve existing .sb3 and ZIP-style .pmp paths.

3. HIGH — The library URL is a guess and version is stale relative to current upstream source.
Exact file/function: gemini/lab/pmp-loader.js, dynamic import() in _protobuf().
The candidate hardcodes https://cdn.jsdelivr.net/npm/pmp-protobuf@1.6.0/+esm, with a comment saying the URL is only “most likely” to work. The current upstream repository head inspected for this review declares package version 1.8.8 and documents ESM-style named imports (import { protobufToJson } from "pmp-protobuf"). This source review does NOT establish that the old 1.6.0 CDN URL returns, exposes the exact named export, or can be imported from G-Warp's deployment context. Attempts to inspect the +esm URL through the available browser lookup were inaccessible; no browser request or module import was run.
Minimum correction: select and pin a reviewed package version; verify the actual CDN/bundled module exports protobufToJson in the target browsers and deployment mode, and record the exact response/version. Prefer a reproducibly bundled, locally served dependency for the single-file/offline goal rather than relying on an unverified remote dynamic import.
Acceptance: test fresh online load, repeat import, module failure/404, offline start, local-file/file:// mode if supported, and a restrictive CSP if used. A loader must fail clearly and must not prevent normal .sb3 or ZIP .pmp loading when the optional protobuf path is unavailable.

4. HIGH — window.pmpProtobuf global is not established by upstream API docs.
Exact file/function: gemini/lab/pmp-loader.js, initial const pb = window.pmpProtobuf branch.
The upstream library README documents named module imports; its current index.js exports functions through module.exports. The repository/source reviewed does not prove that including the suggested UMD URL creates window.pmpProtobuf. The candidate's fallback may be fine as an optional integration seam, but must not be treated as the confirmed library loading contract.
Minimum correction: explicitly document and verify the chosen import route. If a bundled browser global is chosen, build/inspect that bundle and assert the actual global/property shape; otherwise use the verified named-export import. Avoid relying on both undocumented shapes.
Acceptance: a minimal harness asserts typeof imported.protobufToJson === 'function' or the exact documented global path before calling the decoder; test evidence records the actual module source/version.

5. HIGH — detect() calls every non-ZIP buffer of length >=2 a “protobuf” file.
Exact file/function: gemini/lab/pmp-loader.js, GW_PMP.detect().
The code comment acknowledges no validated protobuf magic. This means arbitrary bytes, an unrelated binary, or a corrupt file is classified as protobuf; the current fake-proto test reinforces that false confidence. This does not demonstrate a crash by itself because the decoder error is caught, but it makes the detection result semantically unreliable.
Minimum correction: return a neutral candidate/unknown state until parser validation succeeds, or use a documented signature/container check supported by the format. Do not invent magic bytes. Keep decoder failure as a distinct, tested error.
Acceptance: test valid ZIP PMP, valid protobuf fixture, random binary, empty/one-byte input, truncated real protobuf, and wrong-format .pmp; only validated input is reported as a successful protobuf project. Existing ZIP .pmp continues to route to the existing ZIP loader.

6. HIGH — The harness cannot run as its comment suggests without manually loading the candidate.
Exact file: gemini/lab/test-pmp-loader.js.
Its header says “Run this in the browser console after loading app.html” but the current app candidate is not shown to load gemini/lab/pmp-loader.js; the later comment still references deepseek/pmp-loader.js, a retired path. In a normal unmodified app session window.GW_PMP may be undefined, so the harness can fail before its assertions. A stale path also makes handoff instructions misleading.
Minimum correction: document an exact isolated test procedure that explicitly loads the candidate file before running the test, or provide a self-contained harness. Update the old path in Gemini's own file when its author revises it; ChatGPT has not edited Gemini files.
Acceptance: clean browser profile / app load, explicit candidate injection, harness run, and documented results with console errors captured. Separately confirm the candidate remains disconnected from the production app until approval.

7. MEDIUM — Decoder output is only checked as a generic object.
Exact file/function: GW_PMP._protobuf().
The code checks json && typeof json === 'object', but that would allow {} or another object without valid targets, meta, costumes/sounds or required schema fields. The downstream loader's real acceptance contract is not documented in the candidate.
Minimum correction: validate minimum expected top-level/project structure and required metadata; return actionable errors when it is missing or malformed. Do not try to silently repair unknown fields until compatibility scope is decided.
Acceptance: reject {}, null, arrays, and truncated/corrupt decoder outputs; accept the known-good fixture and assert targets, meta, block dictionaries, costume/sound records and extension metadata as applicable.

8. MEDIUM — The candidate relies on a network request while its note claims no user-data transfer.
Exact file/function: dynamic import in _protobuf().
The code does not explicitly send the user's project buffer as a request body; however, importing the library from jsDelivr means the feature does contact an external host for code and requires network availability unless the global is preloaded. The statement “Never sends user data anywhere” should not be stretched into “no network requests.”
Minimum correction: use an auditable local/bundled dependency where feasible, and document that the CDN route downloads code only. Add a network/offline test and ensure project bytes are never included in the dependency request.
Acceptance: network trace shows only the library asset request (if remote loading is intentionally retained), with no project payload; offline behavior is deliberate and clear.

SOURCE-VERIFIED UPSTREAM FACTS
- At the pinned pmp-protobuf source revision, protobufToJson is an exported helper that decodes a protobuf byte buffer into the JSON representation.
- protobufToPMP calls protobufToJson then jsonToPMP, and the latter takes a separate assets array with {buffer, id} entries and puts those files into a ZIP.
- PMPToParts extracts project.json plus binary assets from ZIP-style PMP files; it is not a protobuf decoder for external assets.
- The package.json at the repository revision declares version 1.8.8 and MIT licence. The published npm listing also reports 1.8.8 (Socket index, published about three weeks before this review); CDN version 1.6.0 in the candidate is not the latest version found during this review.
- PenguinMod's official project fetcher imports protobufToJson from the package and defines a distinct asset host. This is useful architectural evidence, but not proof that G-Warp can reuse the same fetch endpoint or assets without a compatible implementation.
References:
https://github.com/PenguinMod/pmp-protobuf/blob/84176d56c2b5bdebce8150a6bf9fefcac59fc1af/index.js
https://github.com/PenguinMod/pmp-protobuf/blob/84176d56c2b5bdebce8150a6bf9fefcac59fc1af/README.md
https://github.com/PenguinMod/pmp-protobuf/blob/84176d56c2b5bdebce8150a6bf9fefcac59fc1af/package.json
https://github.com/PenguinMod/penguinmod.github.io/blob/develop/src/lib/project-fetcher-hoc.jsx
https://github.com/PenguinMod/PenguinMod-Vm/blob/develop/src/serialization/sb3.js
https://socket.dev/npm/package/pmp-protobuf/versions

MINIMUM ACCEPTANCE PLAN (AUTHOR + CLAUDE)
[ ] Choose/pin a verified parser version and prove the browser export shape.
[ ] Provide one legally shareable real protobuf project fixture and identify its provenance/checksum.
[ ] Determine the real asset acquisition/mapping contract and include at least one costume and one sound in the fixture.
[ ] Add automated assertions for valid decode, structural schema, asset count/hash/content, error cases and round-trip.
[ ] Test random/truncated/wrong-format files and make detection semantics honest.
[ ] Verify that current ZIP .pmp and .sb3 import routes remain unchanged.
[ ] Run in the actual target browser (and offline mode if promised); record browser, commit, fixture hash, expected vs actual and console/network results.
[ ] Keep the candidate isolated until Claude's approved test gate and owner authorization. Do not integrate from this report alone.

NEXT OWNER/AUTHOR ACTION
Gemini should revise the inherited candidate in its own folder and attach parser/export evidence plus a legally shareable real fixture/assets. Claude should only run controlled end-to-end tests after the parser and fixture gates exist. ChatGPT has not touched Gemini files, the production app, or any test runner.

OVERALL
STATIC REVIEW: COMPLETE; candidate remains BLOCKED / INCOMPLETE.
UPSTREAM API CHECK: SOURCE-VERIFIED, pinned above.
REAL FIXTURE / ASSET TEST: NOT TESTED; no usable real fixture supplied in the reviewed files.
G-WARP BROWSER/RUNTIME: NOT TESTED.
INTEGRATION / RELEASE: NOT DONE.


---
## REVIEW-SCRATCH-LINK-EXTENSION-2026-10-19.txt

G-WARP — SCRATCH PROJECT LINK + GEMINI EXTENSION REVIEW
Date: 2026-10-19
Reviewer: ChatGPT
Task: C3 — review team/chatgpt/scratch-link.js and Gemini's Scratch extension together.
Evidence class: SOURCE-VERIFIED + STATIC-ANALYSIS. No browser, extension-load, network-failure or package test was run by ChatGPT.
App baseline: app.html blob 5ca624a515b9fc1310814c4740608c1cf3071028 (Beta v15.48.0).
Scope: team/chatgpt/scratch-link.js, team/chatgpt/CHATGPT-NOTES.md › NOTES-scratch-link.txt, and files under gemini/extension/.

VERDICT
The two pieces fit conceptually: the Scratch-site extension appends a numeric project ID to the G-Warp URL as `#scratch=ID`, and the app's current source contains the `gw-v4611-scratch-link` handler with the same handoff concept. The handler is already present in app.html at the reviewed SHA; do not add a second copy from team/chatgpt/scratch-link.js. The extension is not yet ready to call package-ready: the current repository tree lists icon.svg and make-icons.js but not the manifest-referenced icon16/32/48/128 PNGs, and the live-site URL still requires owner confirmation. Popup state synchronization, SPA listeners, and the privacy boundary need focused validation.

NUMBERED FINDINGS

1. SOURCE-VERIFIED — App hash handler is already integrated; do not duplicate it.
   Current app.html contains `<script id="gw-v4611-scratch-link">`, tests a strict numeric `#scratch=...` hash, and uses the existing confirmation/web-loader path. It removes the handled hash before prompting and marks the handoff to avoid duplicate handlers. The separate candidate in team/chatgpt/scratch-link.js is source/reference material now; adding it again risks redundant boot/retry logic and makes ownership/version drift likely.
   Required gate: verify only one active handler exists in the exact packaged app. The extension target URL must point to the owner-confirmed canonical deployment; do not assume a previously used GitHub Pages URL is still correct.

2. HIGH — Popup preference changes do not update an already open Scratch tab immediately.
   SOURCE-VERIFIED: content.js reads `chrome.storage.sync` during `checkState()` but has no `chrome.storage.onChanged` listener. The popup writes the show-button preference. This means turning the pill off in the popup may leave an existing pill visible until navigation/reload; turning it on may not create one until a later check.
   STATIC-ANALYSIS: this creates a UI mismatch between popup preference and current page state and could mislead the user about whether the preference was applied.
   Required tests: on a project page, toggle Show button off and on in the popup without navigating; confirm the pill disappears/appears immediately. Repeat while the async storage read is pending and after switching from one project URL to another. Check `chrome.runtime.lastError` for read/write failures and ensure the UI doesn't claim persistence if sync storage fails.

3. HIGH — History methods are patched without cleanup, and hash-only routing is not explicitly observed.
   SOURCE-VERIFIED: content.js wraps `history.pushState` and `history.replaceState`, dispatches a custom locationchange event, and observes popstate; it does not restore the original methods and does not explicitly listen to hashchange. The wrappers are installed on every matching Scratch document regardless of whether the pill is currently shown.
   STATIC-ANALYSIS: disabling only the pill does not remove the wrappers. A hash-only navigation can miss the route check, and replacing global History methods without chaining/restoration can conflict with site scripts or other extensions.
   Required tests: toggle the preference while staying on a page, navigate project → non-project → project via pushState, replaceState, back/forward, and direct `location.hash` changes. Confirm the pill matches the current route every time. Verify an opt-out/disable path restores original methods or explain clearly why the extension remains active until the tab reloads. Ensure wrappers dispatch at most one event even after repeated SPA routing.

4. HIGH — Context-menu link parsing should validate the link's origin, not only a path fragment.
   SOURCE-VERIFIED: background.js uses the clicked `info.linkUrl` (or `tab.url`) and searches for a `/projects/number` path before constructing the G-Warp URL. The context menu is restricted to Scratch document pages, but a link inside such a page can point to another domain.
   STATIC-ANALYSIS: an external link whose path happens to contain `/projects/123` could be treated as a Scratch project ID. This is a false positive, not an exploit proven by this review.
   Required tests: right-click ordinary Scratch project links, non-project links, external domains with a `/projects/123` path, malformed IDs and URLs with extra query/hash components. The handler should accept only the intended Scratch origin and project route, extract one valid positive decimal ID, and safely ignore everything else.

5. HIGH — The packaged icon assets appear incomplete in the current repository tree.
   SOURCE-VERIFIED: the manifests reference generated PNG icon sizes (16, 32, 48, 128), while the tracked extension tree contains the SVG source and `make-icons.js` but not the referenced PNG output files. The README documents an icon-generation step using Node/sharp.
   Impact: a folder or ZIP packaged directly from the repository without first generating those files may fail extension loading or show missing icons. Requiring an unpinned native dependency also makes builds hard to reproduce.
   Required tests: run the documented icon-generation step in a clean environment; verify all referenced PNGs exist, have the expected dimensions/alpha, and are included in both Chrome and Firefox packages. Test unpacked installation and a clean ZIP install. Document the required Node/sharp version or check in the generated assets according to the owner's packaging rule.

6. MEDIUM — Network and cancellation behavior needs an explicit end-to-end test.
   SOURCE-VERIFIED: the app handler asks for confirmation before invoking the project web loader, removes the handoff hash so Cancel/refresh doesn't repeat that prompt, and has a catch/error path when the loader rejects. The extension itself derives an ID from a Scratch project page and opens the app URL; the actual fetch occurs in G-Warp after user confirmation.
   Required tests:
   - Valid public project: prompt appears once, Cancel performs zero fetches, Load requests exactly the selected project ID.
   - Invalid/zero/overlong/non-numeric ID: no prompt and no fetch.
   - Private/deleted/missing project, offline mode, timeout, HTTP 403/404/429/5xx, invalid response, malformed SB3 and CORS/network rejection: user sees a useful failure message, the current project remains intact, and no false success toast appears.
   - Missing/late `GW_CONFIRM` or `GW_WEB.load`: confirm timeout behavior is visible or otherwise diagnosable; no silent hanging or repeated prompts after reload.
   - Repeated clicks, reloading while a fetch is in flight, and pressing Cancel must not start duplicate loads or leave half-imported project state.
   - Ensure the confirmation text identifies the operation as loading a public Scratch project and does not imply the extension has inspected the project beforehand.

7. MEDIUM — New-tab/popup behavior should be tested in the real browser context.
   SOURCE-VERIFIED: the pill click uses `window.open(..., '_blank')` from the user click handler, while the context menu uses `chrome.tabs.create`/the browser tab API. The content script reads an identifier from the current URL.
   Required tests: Chrome desktop with default popup policy, Firefox, Chromium-based browser with strict tracking/popup settings, and private/incognito mode if the extension is allowed there. Confirm a normal user gesture opens exactly one tab to the canonical app URL plus the numeric hash; a popup-blocked path shows a fallback message/link rather than silently doing nothing. A context-menu action must not steal focus or create two tabs.

8. MEDIUM — Minimum permissions look appropriately narrow, but verify them in package installs.
   The manifests scope the content script/host access to Scratch and use storage/context-menu and tab-opening behavior instead of asking for broad access to every website. Keep those limits. Test install, permission prompt, extension update, disable/re-enable, browser restart and removal in Chrome/Firefox. Confirm the extension performs no request to the G-Warp site until the user clicks and no project fetch happens before the app's consent prompt. Do not broaden host permissions as a workaround for failures.

9. MEDIUM — Privacy text should describe the complete handoff accurately.
   The extension code appears to use browser sync storage for a UI preference and places the public project ID in a navigation URL; after explicit approval, the G-Warp app contacts its project-loading endpoint(s). The privacy page should distinguish “the extension does not send analytics/user-entered data” from browser sync and the later G-Warp network fetch. Avoid claiming the end-to-end workflow makes no external request. Also confirm the extension's privacy page is accessible from its popup/package and that the published privacy URL, if any, is canonical.

FOCUSED REGRESSION CHECKLIST (NOT RUN)
Mark each PASS / FAIL / NOT RUN only after browser execution.

A. App hash parser / consent
[ ] One active handler in the packaged app; current source SHA recorded.
[ ] `#scratch=123456` prompts once; Cancel clears the handled hash and performs no fetch.
[ ] Confirm loads exactly ID 123456; no duplicate prompt/load from duplicate scripts.
[ ] Test invalid formats: `#scratch=`, `#scratch=0`, letters, encoded digits, negative sign, leading/trailing spaces, >12 digits, extra query/hash text, and non-scratch hashes; invalid cases never fetch.
[ ] Cancel then refresh; load failure then refresh; back/forward after clear; no surprise second load.
[ ] While app APIs initialize slowly or are absent, user receives a clear timeout/diagnostic rather than a silent no-op.
[ ] For offline, 403, 404, 429, 5xx, malformed SB3 and quota errors, preserve the existing project and show a safe error.

B. Extension UI and SPA lifecycle
[ ] Project page creates exactly one pill; ordinary user/profile/home/project-list pages show none.
[ ] Popup opt-out removes current pill immediately and opt-in adds it immediately without navigating.
[ ] Exercise pushState, replaceState, popstate/back-forward, direct hash changes, route replacement, and rapid project A → B → home → A.
[ ] Repeated route events do not duplicate the pill, listeners or open tabs.
[ ] Browser toggle/off path doesn't leave unwanted history wrappers running, or documents reload as the explicit cleanup boundary.

C. Context menu and navigation
[ ] Valid Scratch project page opens canonical app URL with exactly one numeric hash.
[ ] Valid Scratch project link uses its ID; external/non-project URL containing `/projects/123` is rejected.
[ ] Window open succeeds from a user gesture; popup-blocked fallback is usable; context-menu action opens only one tab.
[ ] No broad navigation/open action happens without a deliberate click/context-menu action.

D. Permissions, assets, packaging, privacy
[ ] Chrome MV3 unpacked and ZIP install succeed with all referenced icon PNGs present.
[ ] Firefox install succeeds with matching icons and compatible manifest/background behavior.
[ ] Confirm every requested permission is necessary and there is no permission expansion.
[ ] Extension and app work with preference storage unavailable; UI shows truthful persistence status.
[ ] Privacy disclosure distinguishes browser sync preference storage, URL project ID and G-Warp's later network fetch; no unexpected external requests before confirmation.
[ ] Disable/re-enable and browser restart do not duplicate context-menu entries or content scripts.

NEXT OWNER ACTION
- Claude/extension owner: verify the canonical app URL and build/package generated icons before promoting the extension.
- Run the app handler and extension matrix in real Chrome/Firefox; record browser/version/OS, extension package hash, app SHA, project ID/test fixture, network result, console errors and screenshot.
- Keep team/chatgpt/scratch-link.js as a reference copy unless Claude explicitly requests a source update; app.html already has the handler at the reviewed baseline.
- This report is static review only. None of the checklist items is marked tested or passed.


---
## REVIEW-clone-safety-2026-10-19.txt

G-WARP — CLONE-SAFETY CANDIDATE REVIEW
Date: 2026-10-19
Reviewer: ChatGPT
Task: C2 — compare team/chatgpt/clone-safety.js with its handoff notes and ENGINE-MAP; identify side effects and write a focused regression checklist.
Evidence labels:
- SOURCE-VERIFIED: inspected current repository source or module text.
- STATIC-ANALYSIS: consequences inferred from that source; not runtime-confirmed.
- NOT-TESTED: no browser, stress test, or Playwright run was performed here.

Reviewed artifacts:
- Current app baseline: app.html blob 5ca624a515b9fc1310814c4740608c1cf3071028 (Beta v15.48.0; GitHub connector's whole-file fetch was empty in this pass, so relevant source was reviewed from the same SHA's blob response).
- team/chatgpt/clone-safety.js: ef4cb2c4bc86960bd8b9d51c4909dd8b9f741cad.
- team/chatgpt/CHATGPT-NOTES.md › NOTES-clone-safety.txt: 4a7c13cbfa38425b60293ac6945f782e173d0649.
- ENGINE-MAP.txt: 2638ede6199671552c7a4a350a04e4cbcdac4fa3.
- Cross-team queue currently says the candidate is SUPERSEDED by Claude's clone fixes and explicitly says not to revive it. This report is a review record only, not a merge recommendation.

VERDICT — SUPERSEDED; DO NOT REINTEGRATE
The module attempts to replace clone creation/counting/removal and intercept Green Flag, Stop, and Infinite Clones settings. The current v15.48.0 source already contains an O(1)-style clone count cache, a 5,000 ceiling even when Infinite Clones is enabled, clone-local variable/list copies, clone-root handling, clone hats, project-load limit restoration, and normal Stop cleanup. The candidate duplicates/replaces that path and diverges on important behavior. It should not be revived or added alongside Claude's current fixes.

NUMBERED FINDINGS

1. HIGH — Infinite Clones becomes genuinely unbounded in this candidate.
   SOURCE-VERIFIED: current app's effective creator computes `gwCap = Math.min(Engine.cloneLimit || 300, GW.CLONE_CEILING || 5000)`. Infinite Clones sets Engine.cloneLimit to Infinity, but the separate 5,000 safety ceiling still applies. In `team/chatgpt/clone-safety.js`, `effectiveLimit()` returns Infinity as soon as `GW_SETTINGS.get().infiniteClones` is true, then `optimizedCreateClone()` compares the count against that Infinity. The candidate has no separate 5,000 cap, so its explicit setting removes the ceiling the current release promises to retain.
   Impact: a runaway clone loop could allocate indefinitely and freeze the tab, contrary to the current source, user guide, and handoff claim that an Infinite Clones safety ceiling remains.
   Gate: any approved implementation must prove the limit is `min(project/user limit, 5000)` under both settings. Test 4,999 / 5,000 / 5,001 attempts with Infinite Clones on and off and confirm the UI warning and actual count agree.

2. HIGH — Stop clears thread references before normal Stop marks them finished.
   SOURCE-VERIFIED: the candidate's document-capture click handler calls `fastRemoveClones(true)` on `#stopBtn`; that sets `Engine.threads.length = 0` without first setting each thread's `finished` flag. The current Stop implementation calls `stopAllLikeScratch`, which marks each thread finished before clearing the array, removes clones, stops tracked sound sources, clears speech bubbles, and emits `PROJECT_STOP_ALL`.
   STATIC-ANALYSIS: because the candidate's capture handler runs before the target's ordinary Stop handler, the normal Stop routine can see an already-empty thread array and fail to mark the detached thread objects finished. A delayed wait/promise/resume path could potentially continue or perform side effects; this requires a runtime test, but it is a serious ordering risk. The candidate itself does not stop audio or emit the extension stop event.
   Gate: stress clones and scripts, click Stop while a script is in wait/resume, verify all original and clone threads are marked/stay stopped, audio/extension playback ends, and no clone or script reappears. Also test calling Stop from the in-script Stop block, not only the UI button.

3. HIGH — The candidate misses current engine clone-count cache bookkeeping.
   SOURCE-VERIFIED: the shipped creator updates `Engine.__nc` and `Engine.__ncLen` immediately after pushing a clone, and `GW.cloneCount()` uses `Engine.__ncArr`, `Engine.__ncLen`, and `Engine.__nc` to avoid recounting. The candidate implements a separate private count cache and pushes the clone without updating those native cache fields.
   STATIC-ANALYSIS: other callers of `GW.cloneCount()` may detect a length mismatch and rescan after candidate creations, so the claimed O(1) path may not actually remain cheap across the app; caches can also disagree until one recounts. The candidate is intended as a performance fix but does not demonstrate compatibility with the runtime's own counter invariants.
   Gate: after create/delete/remove-all/reload, compare candidate count with a full source-of-truth count and the native `GW.cloneCount()` result. Profile the 299/300/301 and rapid-spawn cases with the actual current runtime counters enabled.

4. HIGH — Imported project clone limits over 300 are silently reduced.
   SOURCE-VERIFIED: project loading restores `Engine.cloneLimit` from `projectRuntime.cloneLimit` when present; the current creator respects that effective value but applies the separate 5,000 safety ceiling. The candidate's `effectiveLimit()` uses `Math.min(BASE_LIMIT, Math.floor(n))` for every finite stored value, so a project that requests 400, 1000, or another finite limit above 300 is forced back to 300 (unless the user setting returns Infinity).
   Impact: runtime compatibility for projects that set `maxClones`/clone limit is changed without a warning or documented decision. The candidate's own notes explicitly require loaded TurboWarp/SB3 `maxClones` testing; that test is not present in the module.
   Gate: load projects with no custom cap, 50, 300, 400, 1,000, 5,000 and a value over 5,000; verify the intended runtime value, effective ceiling, and displayed warning for each setting combination. Preserve documented project semantics, not merely the default.

5. MEDIUM/HIGH — Overriding `GW.createClone` discards native implementation work.
   SOURCE-VERIFIED: the candidate assigns `g.createClone = optimizedCreateClone` rather than wrapping the already installed creator. Current source's implementation includes root/cloneRoot fields, clone-local variables and lists, copied costume objects, cloned effects, the native counter-cache updates, root index and clone-hat dispatch, plus the safety ceiling. The candidate recreates part of this behavior but diverges on ceiling/cache semantics and depends on its own owner/hats cache.
   Static source similarity is not proof that every side effect matches. Newer runtime additions can be lost when the entire function is replaced, and future fixes to the native creator will not automatically flow through.
   Gate: prefer a narrow wrapper or upstream fix in the native creator. If replacement is unavoidable, diff every property and side effect and regression-test nested clone-of-clone creation, cloneRoot/rootName, local variables/lists, costumes/effects, sound, visibility/layer, clone hats, broadcast, and sprite-specific custom procedures.

6. MEDIUM — `fastRemoveClones` changes collection mutation semantics.
   SOURCE-VERIFIED: native `GW.removeAllClones` replaces `Engine.sprites` with a filtered array and filters clone-owned threads. Candidate removal compacts `Engine.sprites` in place and truncates `Engine.threads`. It also adds its own `GW.__sprEpoch` bump.
   STATIC-ANALYSIS: in-place mutation may surprise code that holds the current sprite array reference or relies on replacement to invalidate caches; manual epoch bumps do not automatically update every independent counter/cache. Its Stop=true branch clears all threads without marking them complete first (see Finding 2).
   Gate: test external references/caches, active sprite selection, stage proxy preservation, original-thread preservation on Green Flag, thread and sprite count caches, and repeated removal when there are zero, one, or many clones. Confirm no stale clone is rendered or left in the sprite grid.

7. MEDIUM — Settings and retry installation have idempotency/ordering risks.
   SOURCE-VERIFIED: `install()` only requires Engine/GW and existing `createClone`/`deleteClone`; it does not require `GW_SETTINGS` to exist before it returns success. The settings wrapper is attempted only at install time. Also, the top-level `GW_CLONE_SAFETY` guard is set at the end, while delayed retry closures call `install()` directly without rechecking the guard.
   STATIC-ANALYSIS: if the module is injected more than once while Engine/GW are available but before settings initialize, or before one of multiple retries finishes, it may install handlers/wrappers more than once or succeed before wrapping the setting function. Project-load listeners and document-capture handlers have no removal/teardown path.
   Gate: test insertion before Engine init, between Engine and GW_SETTINGS init, and duplicate loading before/after retry success. Assert one clone operation, one confirmation, one Green Flag/Stop handler, one project-load listener, and one wrapper. Test `GW_FEATURE_OFF('cloneSafety')` and verify that disabled mode leaves every native function/listener unchanged.

8. MEDIUM — Clone-hat observer can remain attached to an obsolete workspace node.
   SOURCE-VERIFIED: `installHatObserver()` returns whenever `state.observer` is already truthy. The project-loaded event calls the same function again, but does not check whether the observer's original workspace element remains connected or whether `#workspaceCanvas` was replaced.
   STATIC-ANALYSIS: if project loading/editor rebuilding replaces the workspace element, `state.hatsDirty` may stop tracking the new workspace and cached clone hats may become stale. If the current loader keeps the same element and only changes descendants, this path may be safe; that implementation detail needs a test.
   Gate: load/reload projects through each supported loader and verify the observer watches the current `#workspaceCanvas`; edit/add/delete/retype a clone hat, change `data-owner`, then create a clone and confirm exactly the matching hat runs.

9. MEDIUM — Clone warnings and selection side effects need consistency checks.
   SOURCE-VERIFIED: the candidate intercepts the settings checkbox in document capture, cancels the native click, changes the checkbox state manually after async `GW_CONFIRM`, and clamps `activeSpriteIndex` after fast removal. Its warning says “unlimited clones,” which does not describe current v15.48.0's hard 5,000 ceiling.
   Gate: cancel/confirm repeatedly; change the setting while a project is loaded; verify checkbox and persisted preference agree with Engine.cloneLimit. Test the clone-limit toast/health note is shown once per run and resets on Green Flag, not on every failed attempt. Test sprite selection stays on a valid non-clone after Stop/delete-all.

FOCUSED STATIC / RUNTIME REGRESSION CHECKLIST (NOT RUN BY CHATGPT)
Record each item PASS / FAIL / NOT RUN; record current app SHA, browser version, viewport, test project hash, clone cap, console errors, clone count, thread count, and Stop latency. Do not write PASS until Claude executes the case.

P0 — Safety and state correctness
[ ] Default mode: create 299, 300, then attempt 301; count never exceeds 300, exactly one useful warning is shown for the run, and the project remains responsive.
[ ] Infinite Clones mode: create through 4,999, 5,000, attempt 5,001; confirm a hard 5,000 ceiling remains, warning matches actual count, and no unbounded growth happens.
[ ] Stop under load: create many clones and a wait/loop on original and clones; click UI Stop during the wait. All threads are finished, clones gone, audio/extensions stopped, and no script resumes or creates a clone after Stop.
[ ] Stop from script: execute the normal Stop all block with active clone hats and nested clone creation; verify identical cleanup.
[ ] Clone-local state: per-sprite variables/lists are copied appropriately; mutate one clone and verify the original and sibling clone do not share local mutable arrays/values.
[ ] Clone ancestry/hats: clone an original, clone that clone, confirm rootName/cloneRoot/cloneOf semantics and only matching owner hats run each time.
[ ] Delete/remove-all consistency: delete one clone, remove all, create more, press Green Flag twice, and compare live counts with a full array scan and `GW.cloneCount()`.
[ ] Project cap compatibility: test projectRuntime.cloneLimit absent, 50, 300, 400, 1,000, 5,000, and >5,000; run with Infinite Clones setting on/off and record the intended rule.
[ ] Cache and reload: project load replacing array/workspace resets counts and hats; no stale cache, stale selected index, or duplicate clone hat execution.
[ ] Duplicate install/feature-off: load module twice before core initialization, after core but before settings, then after full startup; with feature-off key enabled, no wrapper/listener/change activates.

P1 — Performance / UX gates
[ ] Rapid-spawn stress: use same project/machine/Chromium version and same duration before/after; report median and range for FPS, worst frame stall, create throughput, and Stop latency; at least 3 runs each.
[ ] Stop latency for the handoff's 81,000-clone stress case is under 100 ms in the documented test environment, with zero surviving clone/thread and no unhandled rejection. Do not extrapolate this threshold to other machines.
[ ] Confirm clone tags/UI counters and limit notices stay accurate while sprites are created/deleted and after a project reload.
[ ] Confirm no change to broadcasts, Pause, turbo, sprite selection, speech bubble cleanup, stage proxy and extension stop events.
[ ] Check heap growth / memory stability after repeated create-delete cycles; avoid claiming “fixed freeze” from frame time alone.

CURRENT STATUS / OWNER ACTION
- The current cross-team queue says `team/chatgpt/clone-safety.js` is SUPERSEDED by Claude's clone fixes and says explicitly not to revive it. Respect that routing.
- Keep this document as a static test-planning/report artifact. Do not wire this module into app.html and do not replace Claude's current clone fixes with it.
- Ask Claude to run the targeted existing clone/Stop stress suite against the actual current app blob, including the three most recent Select-tool assertions noted by the queue; no current test output was available to this reviewer.
- ChatGPT did not run any candidate test, browser, benchmark or 81,000-clone timing. All checklist boxes above are unchecked; they are recommended test cases, not completed results.


---
## REVIEW-costume-animation.txt

G-WARP — COSTUME ANIMATION TEST COVERAGE REVIEW
Date: 2026-10-18
Owner: Creapter1
Reviewer: ChatGPT
Artifact: team/claude/tests/test_cosanim.js
Test source blob SHA: c35a926b04d2759d5df9da7605d732ef78f32501
App baseline currently recorded in team status: app.html blob 5ca624a515b9fc1310814c4740608c1cf3071028 (Beta v15.48.0)
Evidence class: STATIC REVIEW. Assignment notes report 27/27 PASS for the suite, but ChatGPT did not execute Playwright or independently rerun the tests.

SUMMARY
The suite is a useful UI/runtime smoke test for the happy path: Animation tab visible to normal users, G-Spark's starter walk/wave data, frame navigation, Space preview play/stop, Make costumes, updating generated costumes after deleting a frame, animation rename, palette presence, stale-frame regeneration, direct animation playback, rigging a vector costume, changing a bone pose, onion-skin overlays in vector and bitmap editor modes, and Flipbook range/playback. It also checks page errors at the end.

It does NOT cover the complete persistence, multi-sprite/clone isolation, undo, Stop cleanup, collision, and actual block-stack behavior needed before claiming costume animation is robust. The assignment's reported PASS is evidence for only the assertions in this file and only for the app revision used in that run.

NUMBERED TEST CASES STILL NEEDED

1. Save and reopen an animation project (HIGH)
   Setup: Open G-Spark, modify the walk animation (change a pose, add/delete a frame), make costumes, save an SB3 project, close/reload it.
   Expected: Animation names, frames, FPS/loop state, bone definitions, parent links, attachments, pose angles and generated-costume links survive the round trip. The reopened animation plays the edited pose sequence, and no stale generated frame is shown. No console error or silent fallback.
   Gap: test_cosanim.js mutates animation/frame state and closes/reopens the UI panel, but it does not save the project file and reload it.

2. Two sprites with the same animation name (HIGH)
   Setup: Give two sprites an animation named "walk" with different poses/frame counts; switch selection back and forth, rename or edit one.
   Expected: Each sprite selects and plays its own "walk"; modifying/renaming sprite A does not change sprite B's frames, costumes, metadata or dropdown selection.
   Gap: the current suite uses the active G-Spark sprite and tests rename of a single animation. It does not create two sprite-local animations with colliding names.

3. Clone playback is independent (HIGH)
   Setup: Make a sprite with an animation, create two clones, start different animations or frame positions on the original and each clone, and update one clone's pose while the others play.
   Expected: Clones do not overwrite shared frame state or advance each other's frame counters unintentionally. Each clone follows the documented clone semantics, deleting a clone cleans its playback/timer, and the original sprite continues correctly.
   Gap: no clone is created in test_cosanim.js. The suite's GW_ANIM_BLOCKS.start(s, ...) check operates on the active original sprite.

4. Undo/redo after animation rename (HIGH)
   Setup: Rename "walk" to "run" using the UI, invoke Undo, then Redo. Include generated costume names and rename after a frame deletion.
   Expected: Undo restores the animation name and all linked costume names/data; Redo reapplies the rename. No half-renamed collection or stale references remains.
   Gap: the test checks only the successful rename path, not Undo or Redo around that action.

5. A true bitmap costume opened in the Animation tab (HIGH)
   Setup: Import or create a real PNG/bitmap costume (not just switching the paint editor to Bitmap mode for onion-skin testing), then open Costumes → Animation.
   Expected: If bitmap rigging is supported, it produces valid editable parts and the resulting frames render correctly. If unsupported, the UI explains the limitation and prevents a broken/empty rig without corrupting the costume. Saving/reopening preserves the selected safe outcome.
   Gap: current rig test draws an SVG/vector costume. The later bitmap-mode assertion tests onion-skin background in the paint editor, not bone rigging of a bitmap costume.

6. Global Stop during Animation/Flipbook playback (HIGH)
   Setup: Start a looping animation through its UI; press the global Stop control while it is playing. Repeat for the Flipbook player and a project running the Animation blocks.
   Expected: Playback timer and running animation thread stop promptly; frame index and costume stop changing; no delayed tick restarts playback; reopening Play works cleanly. Record the expected distinction between Space-stop and global Stop.
   Gap: the suite tests Space playing/stopping the Animation tab preview and clicks Play again to close Flipbook. It does not press the global project Stop during each playback mode.

7. Run the actual Animation blocks in a project script (HIGH)
   Setup: Build and run real script stacks with "switch to animation [ ]", "play animation [ ] from frame [ ]", "play animation [ ] over and over", and "stop animation". Save/reopen the project and repeat.
   Expected: The selected animation/frame/loop/stop semantics match each block label, run under the normal scheduler, and serialize/deserialize correctly. Stop cancels only the intended animation activity.
   Gap: the current suite checks that the Animation palette is visible and calls GW_ANIM_BLOCKS.start(...) directly from test JavaScript. That is not equivalent to running each block through the normal script interpreter/compiler.

8. Renaming to a name already used (MEDIUM)
   Setup: One sprite has "walk" and "wave"; attempt to rename "walk" to "wave". Repeat when two animation names differ only by case/spacing.
   Expected: The UI rejects or safely disambiguates duplicate names, and dropdowns, block references and generated costume links remain deterministic. No unrelated animation or costume is overwritten.
   Gap: current test renames walk to unused name run only.

9. Remove or reorder a generated costume (MEDIUM)
   Setup: Run Make costumes, then rename/reorder/delete one generated costume or delete an animation frame and re-open the animation.
   Expected: The app clearly preserves, updates, or unlinks affected frames according to its stated design; it must not silently play a stale frame or unexpectedly overwrite a user's manually edited costume.
   Gap: test_cosanim.js deletes one frame and confirms the generated list reduces, but does not manually rename, reorder or delete one generated costume after creation.

10. Switch sprites while the Animation panel is open (MEDIUM)
    Setup: Open Animation on sprite A, select sprite B, return to A, close and reopen the panel.
    Expected: Panel contents match the selected sprite every time; no stale selection, wrong canvas, lost unsaved pose or leaked playback timer.
    Gap: the current suite stays on one sprite for the animation editing flow.

11. Frame and FPS boundaries (MEDIUM)
    Setup: Test an animation with one frame and one with many frames; try FPS 1 and 30; try starting at first/last/out-of-range frame and deleting the currently playing frame.
    Expected: Values clamp or fail safely according to a documented rule; no NaN timer, negative index, blank costume or unbounded loop. A one-frame loop remains stable.
    Gap: the suite uses the 8-frame G-Spark animation and a small 2-frame example. It does not systematically test edge values or deletion while playback is active.

12. Bone edit Undo/Redo and invalid hierarchy (MEDIUM)
    Setup: Create parent and child bones, attach several parts, change pose, delete/undo a bone, and test a missing/cyclic parent reference in an imported or deliberately altered fixture.
    Expected: Undo restores the previous rig and attachments; invalid hierarchy data is rejected or recovered without a freeze, stack overflow or corrupted costume.
    Gap: current rig test makes one bone and drags its end. It does not check parent/child hierarchy undo or malformed hierarchy data.

13. Import a project containing animation metadata (MEDIUM)
    Setup: Load a saved project copy containing both ordinary costumes and an animation; run it after import, export/reopen it, and repeat.
    Expected: Animation metadata is either preserved correctly or explicitly reported as unsupported; regular costume list, image data and project loading remain intact.
    Gap: test_cosanim.js creates its own data in the live UI; it does not test import/export compatibility.

14. Keyboard focus and input conflicts (LOW/MEDIUM)
    Setup: Use Tab to focus the Animation controls; test ArrowRight and Space while focus is on the frame canvas, a text input, a rename dialog and another editor tab.
    Expected: frame navigation and Space playback occur only in the intended context; text input still accepts spaces; keyboard focus remains visible and does not silently trigger playback while editing a name.
    Gap: it tests ArrowRight and Space when the animation view is focused, but not these conflicting focus contexts.

TEST PRIORITY
P0 before calling persistence/isolation stable: cases 1, 2, 3, 4, 5, 6, 7.
P1 before release: cases 8, 9, 10, 11, 12, 13.
P2 usability regression: case 14.

ACCEPTANCE RULE
Each test must run against the current app.html blob, record app SHA, browser and viewport, capture screenshots for UI states where useful, and end with a clear PASS/FAIL plus console errors. Keep animation semantics tests separate from visual/editor tests. Do not convert missing coverage into a claim that a bug is present; these are gaps, not confirmed failures.

NEXT OWNER ACTION
Claude/integration owner: add or schedule focused tests for P0. ChatGPT only reviewed the existing test source and has not run it. Do not edit team/claude/tests/test_cosanim.js from this reviewer report.


---
## UI-AUDIT.txt

G-WARP UI BEHAVIOR AUDIT
Urgent task U1 — compare UI functionality with Scratch 3, TurboWarp, and PenguinMod
Audit date: 2026-10-13
Auditor: ChatGPT
G-Warp target source: app.html, Beta v15.45.0
Source SHA inspected: 7ce527ca2908c63bbdfe642856ca29fd82178648
Status: STATIC SOURCE AUDIT + LIMITED LIVE BROWSER VERIFICATION (see ../docs/LIVE-UI-VERIFICATION.txt). Most findings remain source-level until individually tested.

SCOPE AND RULES
This audit compares behavior (click, select, drag, drop, right-click, keyboard, tabs, and editor actions), not appearance. It covers primary editor interactions and major controls in the actual app.html source. It does not claim that every extension modal has been exhaustively interaction-tested. G-Warp-specific extras are not defects merely because Scratch lacks them; an item is marked as a bug/difference when it changes a standard editor operation or misleads the user.

Scratch compatibility baseline:
- Scratch 3 GUI and core interaction: https://scratch.mit.edu/projects/editor/
- Scratch GUI source and architecture: https://github.com/scratchfoundation/scratch-gui
- PenguinMod Code Editor reference (blocks, categories, workspace, right-click, comments, stage, sprite list): https://docs.penguinmod.com/codeeditor/
- PenguinMod Shortcuts reference (some features are addons enabled by default): https://docs.penguinmod.com/shortcuts/
- TurboWarp editor/addon capabilities: https://turbowarp.org/editor and https://turbowarp.org/addons
Note: Scratch/TurboWarp/PenguinMod behavior can vary with addons/settings. This audit uses default Scratch behavior unless a difference is explicitly labelled addon-dependent. PenguinMod documents itself as a work in progress.

PRIORITY DEFINITIONS
HIGH = blocks a basic editing task, runs the wrong script/action, can cause a user to lose control of the editor, or causes a significant compatibility problem.
MEDIUM = a common editor operation is missing or behaves differently, but a practical workaround exists.
LOW = minor keyboard/accessibility/consistency gap or a non-core convenience feature.

NUMBERED FINDINGS

CATEGORY RAIL AND PALETTE

1. NOT CONFIRMED LIVE — Single-click category navigation appeared broken in the static source reading.
   LIVE-BROWSER-VERIFIED (Claude, 2026-10-13, Chromium 1440×900): clicking “Looks” once scrolled the palette from 0 px to the Looks blocks at 943 px. See ../docs/LIVE-UI-VERIFICATION.txt, test T1, screenshot ../docs/screens/02-category-click-looks.png. Do not treat this as a confirmed bug unless another category or state produces a reproducible failure.
   Follow-up: test all categories, filtered state, and narrow viewport before fully closing the broader category-navigation question.

2. PARTIALLY OPEN — Category filtering uses a double-click path in source, but basic single-click navigation passed live.
   The double-click filter behavior is source-observed; no live test yet established whether it conflicts with or improves category navigation. Do not call single-click navigation broken based on the current evidence.
   Follow-up: explicitly test single-click and double-click on several categories, then document the intended distinction.

3. MEDIUM — G-Warp's special categories and palette aren't organized like the standard toolbox workflow.
   G-Warp puts its GWrap AI item on the rail and has a combined long palette with filter behavior, while Scratch separates ordinary categories, Variables/My Blocks, and Add Extension interactions. PenguinMod places extension access at the bottom of the toolbox.
   Expected: each category and Extensions action should be reachable by one predictable click, and choosing one category should not require hunting through a long mixed palette.
   Fix: make navigation reliable first; no visual redesign is required. Keep G-Warp's own colors and mascot.

4. LOW — Block-search menu is not reachable by the common keyboard/mouse shortcuts used by PenguinMod/TurboWarp addons.
   G-Warp source: the block-search prompt is opened by right-clicking empty workspace through the gw-v3500-ws-menu module. There is no matching handler for Ctrl+Space, Shift+Click, or middle-click in the inspected menu module.
   Expected: PenguinMod's Insert Blocks by Name addon documents Ctrl+Space, Shift+Click, and middle-click on empty workspace. TurboWarp can provide similar addon shortcuts.
   Fix: optionally add these shortcuts behind a setting; do not change right-click search. This is addon-dependent, so lower priority than broken default interactions.

BLOCK DRAGGING AND SNAPPING

5. HIGH — Pulling a block from the middle of a long script can make it jump to the workspace's top-left instead of staying under the pointer.
   G-Warp source: the original drag handler detaches blocks into a new .block-stack for a C-body or a middle section of a stack, appends it to workspaceCanvas, but does not set its left/top before measuring the new drag offset. G-Warp's own GW_AI_REPORT lists this as not fixed.
   Expected: the detached block and its attached tail stay at the pointer and can be dropped accurately, regardless of script length or scroll/zoom.
   Fix: set the detached stack's left/top from the original block rectangle, workspace rectangle, current zoom, and scroll offsets before computing dragOffset. Regression-test long scripts and nested C-blocks.

6. HIGH — Nested C-block snapping is reported to fail after nested if blocks.
   G-Warp source: GW_AI_REPORT's not-fixed list says that after nesting if blocks, no more blocks may be added inside the inner if or below/outside the outer if, and snapping is unstable with many if blocks. The drag engine chooses between a nested C-body and a top-level stack in collectSnapCandidate().
   Expected: blocks can be inserted into any valid nested C-body, below/above valid stack blocks, and outside nested blocks where the pointer indicates. A nested insertion must not corrupt the script tree.
   Fix: audit collectSnapCandidate and finishDrag with tests for if, if-else, repeat, forever, nested levels 1–5, and insertion both inside and outside each C-body.

7. HIGH — Hat/cap snap rules are explicitly known to be incomplete.
   G-Warp source: GW_AI_REPORT says hats can accept blocks snapped above them and cap blocks may accept blocks below them; it requests a full audit by shape. The source has gwIsHat/gwIsCap helpers, but the report identifies the actual drag behavior as not fixed.
   Expected: a hat starts a script and cannot be snapped above another stack or inside a C-body; stop/delete-clone/other cap blocks cannot have a statement snapped underneath; reporter and Boolean blocks snap only into valid input slots.
   Fix: test every shape class and enforce these rules in candidate collection AND drop commit (not just a visual preview).

8. HIGH — Removing a block from a running loop may not stop that block from executing.
   G-Warp source: GW_AI_REPORT says a block detached from a running forever/repeat body can continue running because running threads keep a captured list of blocks.
   Expected: live editing behaves like Scratch: removing a statement from the live script prevents later loop iterations from executing it; moving it back resumes it without requiring Green Flag again.
   Fix: iterate the live C-body children when each loop iteration begins and ignore blocks no longer connected to the script. Test removing/reinserting a turn/move block inside forever while the project is running.

9. MEDIUM — Pointer cancellation is handled as if the drag ended normally.
   G-Warp source: pointercancel is bound to finishDrag, the same function as pointerup. That function can commit a snap/delete based on the cancel event's coordinates.
   Expected: a cancelled touch/pointer gesture should clean up temporary drag visuals and leave the block in a safe, deterministic location; it should not unexpectedly commit a snap or deletion.
   Fix: use a dedicated pointer-cancel cleanup path, or explicitly distinguish pointercancel from pointerup. Test touch cancellation and lost pointer capture.

10. MEDIUM — Pan mode can conflict with block dragging.
    G-Warp source: the Pan handler is bound to #workspace pointerdown/move while the core block-drag handler is document-level and does not first check the pan state. If the pointer starts over a block while Pan is enabled, both handlers can respond.
    Expected: in Pan mode, dragging pans the workspace; it must not also detach or move a block.
    Fix: when pan mode is active, the block-drag handler should bail out for workspace gestures, and the pan handler should exclude inputs and buttons. Test pan starting on empty space and over a block.

11. MEDIUM — Dragging a statement back to the palette deletes the detached stack, including its attached tail.
    G-Warp source: finishDrag removes the full dragged stack when dropped over paletteContainer.
    Expected: dragging a block/stack back to the toolbox is a standard delete gesture in Scratch/PenguinMod. This behavior is broadly correct, but it depends on correct detachment boundaries.
    Fix/status: no standalone defect claimed here. Keep it covered by drag regression tests because findings 5–7 can make the wrong blocks part of the detached stack.

12. MEDIUM — G-Warp does not implement common modifier-drag block shortcuts documented for PenguinMod addons.
    G-Warp source: the inspected block drag-start path does not branch on Alt/Ctrl modifier keys to duplicate while dragging or to pull a single block from a stack.
    Expected: PenguinMod's default-enabled shortcuts include Alt-drag to duplicate and Ctrl-drag to grab a single block (macOS uses Option/Command). TurboWarp provides comparable operations through addons.
    Fix: optional parity feature, or explicitly document G-Warp's different gestures. Do not treat these addon shortcuts as mandatory Scratch-core behavior.

13. MEDIUM — Right-clicking a statement and choosing Duplicate duplicates the entire top-level stack regardless of which block was clicked.
    G-Warp source: ctxDuplicate clones ctxTargetStack, not the selected ctxTargetBlock, then offsets the whole stack.
    Expected: block context actions should operate on the clicked block and the connected tail implied by that block's shape, rather than always duplicating the entire script from its first block.
    Fix: duplicate from the selected block, preserving only the connected descendants that belong to it; retain the current whole-script operation as a separate explicit action if desired.

14. MEDIUM — Delete Block removes only the clicked DOM block, not necessarily the connected blocks that Scratch's delete operation removes with it.
    G-Warp source: ctxDeleteBlock calls ctxTargetBlock.remove() and removes the parent stack only if it becomes empty.
    Expected: deleting a block with connected statements below it should not silently strand those statements as a headless script. If the user intended to remove the block and its attached tail, the tail should go with it or be placed back safely.
    Fix: follow Scratch's block deletion semantics for attached children; explicitly test deleting a hat, a middle stack block, a C-block, and a cap block.

15. MEDIUM — Block right-click menu is missing the standard Add Comment action.
    G-Warp source: blockContextMenu contains Duplicate, Delete Block, and Delete Full Stack only. A separate empty-workspace menu includes Add Comment.
    Expected: right-clicking a block in Scratch can create/attach a comment to that block; the comment follows the block as the script moves.
    Fix: add block-anchored comments to the block menu and persist their attachment through drag, duplicate, undo/redo, save/load. Keep workspace comments too.

16. MEDIUM — Block context menu can be drawn off-screen and has no dedicated keyboard/focus behavior.
    G-Warp source: setupContextMenu sets menu.style.left/top directly to e.clientX/e.clientY, without clamping to viewport dimensions. It closes on any document click but does not provide explicit Escape handling or focus placement in this handler.
    Expected: context menus stay fully visible near viewport edges, focus a menu item, support keyboard activation, and close predictably.
    Fix: clamp x/y and add keyboard/focus behavior without breaking right-click hit targets. This is an accessibility and reliability issue, not a visual-style request.

17. MEDIUM — Empty-workspace block search displays at most eight matching blocks without a way to expand the results.
    G-Warp source: gw-v3500-ws-menu stops rendering results after k >= 8.
    Expected: if more than eight blocks match the query, users should be able to reach all matches by scrolling/paging or refining the search with a clear indication of the result count.
    Fix: show a scrollable full results list or a "more results" interaction. Do not make rare blocks inaccessible by truncation.

STAGE, SPRITES, AND MONITORS

18. HIGH — Clicking the stage can launch every “when this sprite clicked” script, regardless of which sprite was actually clicked.
    G-Warp source: the core stageCanvas click handler iterates every workspace stack whose hat is when_clicked and starts each using Engine.sprites[Engine.activeSpriteIndex]. It does not hit-test the visible sprite under the pointer or use the script stack's owner.
    Expected: Scratch's when-this-sprite-clicked event starts only for the visible target sprite that was clicked; clicking empty stage space should not start every sprite-click script.
    Fix: hit-test sprites in visible layer order at click coordinates; launch only the matching sprite's hats, and use the original sprite owner for each stack. Add tests for overlapping sprites, hidden sprites, clone targets, and clicking empty space.

19. HIGH — Dragging a sprite on the stage to reposition it in the editor is not implemented in the inspected source.
    G-Warp source: setupStage binds mousemove for coordinate readout; the other direct stageCanvas binding suppresses contextmenu. The app preserves a draggable property when importing/exporting projects, but no editor pointer drag handler was found to move a sprite with the mouse while stopped.
    Expected: Scratch/PenguinMod let users drag a sprite on the stage to reposition it in edit mode (unless draggable behavior is disabled by an option/addon).
    Fix: add edit-mode hit-testing and pointer dragging; do not steal pointer input while the project is running or in a stage tool that owns it. Respect imported sprite draggable settings.

20. HIGH — Green Flag startup does not reset sprite graphic effects in the inspected start function.
    G-Warp source: startGreenFlagExecution sets isRunning/isPaused, clears threads, and starts flag hats. The separate Green Flag listeners remove clones/reset timer, but the inspected startup path does not reset per-sprite effects.
    Expected: Scratch resets graphic effects on Green Flag, and PenguinMod's editor reference documents reset of sprite effects and clones.
    Fix: reset supported effects at Green Flag before starting hats, while preserving costume, variable, and list values. Verify effects clear for every sprite/clone and cannot be changed back by a late listener.

21. HIGH — Pause toggles script execution but does not pause active sounds.
    G-Warp source: pauseBtn only toggles Engine.isPaused. Audio playback is managed by separate sound/audio sources and there is no pause/resume call in that button handler.
    Expected: PenguinMod's documented stage controls pause both blocks and sounds. A Pause control that leaves audio playing does not pause the project as users expect.
    Fix: pause/resume sound sources and timers as well as script stepping; test music, one-shot sounds, looping sounds, wait blocks, and resuming after a long pause.

22. MEDIUM — Stop's core handler does not reset sprite effects.
    G-Warp source: the top-bar Stop handler sets Engine.isRunning=false, clears Engine.threads, and hides the speech bubble. Other listeners remove clones and stop audio, but the core handler itself does not reset graphic effects.
    Expected: Scratch/PenguinMod Stop resets effects and removes clones; do not assume clearing threads is equivalent to resetting a project.
    Fix: centralize Stop cleanup so scripts, clones, speech, sounds, effects, and relevant wait/broadcast state reset in one deterministic path. Regression-test Stop from active and paused state.

23. MEDIUM — Sprite-tile right-click menu lacks Export Sprite.
    G-Warp source: the sprite tile menu exposes duplicate, find on stage, and delete.
    Expected: Scratch's sprite context menu includes export as well as duplicate/delete. G-Warp has export for individual costumes but no equivalent item in this sprite menu.
    Fix: add an export-sprite action using the existing project/SB3 exporter or a documented sprite file format; preserve attribution/extension warnings when exporting.

24. MEDIUM — Sprite List tiles cannot be reordered by dragging in the inspected UI.
    G-Warp source: renderSpritesGrid creates clickable cards and the later decorator adds a context menu and delete button; no drag/reorder handler is attached to the grid cards.
    Expected: where the target editor supports sprite-list drag interactions, tile dragging should have a defined result; at minimum G-Warp should not imply that a draggable tile can be reordered if it only selects the sprite.
    Fix: either implement the intended reorder action safely (including layer/script ownership remapping) or keep cards clearly non-draggable. Verify target parity with the current Scratch/TurboWarp/PenguinMod build before deciding whether this is a strict gap.

25. MEDIUM — Variable/list monitors cannot be dragged to reposition or right-clicked for monitor options.
    G-Warp source: GW.ensureMonitor creates absolutely positioned monitor elements; the inspected monitor code updates their content/visibility but has no drag interaction or monitor-specific context menu.
    Expected: PenguinMod documentation says monitors can be dragged around the stage and right-clicked to change monitor appearance or hide them.
    Fix: add pointer dragging and a context menu for monitor display options; preserve existing visibility controls and save/load their positions if the project format supports it.

26. MEDIUM — Stage click sensing and editor stage dragging are mixed together on one canvas.
    G-Warp source: the stage canvas has runtime mouse state, a stage click listener for when_clicked hats, and a contextmenu preventDefault handler, but no separate explicit edit-vs-run interaction layer.
    Expected: stage editor gestures (select/reposition) and runtime sensing (mouse down, click hats, mouse coordinates) must not trigger each other.
    Fix: route events based on Engine.isRunning and a single stage interaction controller; test click, drag, right-click, mouse-down reporter, and fullscreen/resized stage.

COSTUMES, SOUNDS, AND TABS

27. MEDIUM — Costume list items can be selected by click/keyboard, but cannot be reordered by dragging.
    G-Warp source: renderCostumeList creates .gw7-cos-item elements with click and Enter/Space selection handlers. No costume list drag/reorder binding was found.
    Expected: Scratch's costume strip/list allows ordering costumes by dragging; order matters for next costume, costume number, and saved projects.
    Fix: implement drag reordering, update activeCostume and all costume references consistently, then test next costume/costume number and SB3 export.

28. MEDIUM — Sound list items have no right-click context menu.
    G-Warp source: the costume menu listens for contextmenu on #costumesSidebar .gw7-cos-item; the sprite list has its own contextmenu handler. No matching contextmenu handler was found for .gw7-snd-item / the sound list.
    Expected: Scratch has sound-tile context actions, including duplicate/export/delete, and PenguinMod/TurboWarp sound workflows expose contextual operations.
    Fix: add a sound context menu with duplicate, export, delete and reordering where supported. Test sounds with identical names and generated/recorded/uploaded audio.

29. MEDIUM — Sound list items cannot be reordered by dragging in the inspected Sound Studio.
    G-Warp source: sound-list rows are role=option elements with click and keyboard selection; their direct interaction code does not implement drag reorder.
    Expected: the order of sounds/costumes is part of the editor's data model and should be controllable as in the target editor.
    Fix: implement or explicitly define ordering behavior; test sound dropdown order, SB3 round-trip, and same-named sounds.

30. MEDIUM — Costume right-click menu is less complete than a full Scratch asset context menu.
    G-Warp source: gw-v3700-costume-menu has duplicate, export, and delete. It is useful parity, but does not expose reorder/move-to-top/bottom operations available in some TurboWarp/PenguinMod addon configurations.
    Expected: baseline asset operations should be complete; target-specific move-to-top/bottom can be an addon parity option.
    Fix: add reorder through drag first; consider explicit move-to-top/bottom as optional. Test Stage/backdrop selection separately because the menu listener targets #costumesSidebar .gw7-cos-item.

31. LOW — Main Code/Costumes/Sounds tabs use role=tab and aria-selected but have no arrow-key tab navigation in their switching logic.
    G-Warp source: setMainTab updates selected state/display and click handlers call it. No Left/Right/Home/End key handler for this tablist was found.
    Expected: an accessible tablist normally supports arrow-key navigation; at minimum, focus should move to the selected tab predictably.
    Fix: implement roving tabindex and arrow-key navigation without intercepting keys inside input fields.

32. LOW — Switching to any main tab calls loadActiveCostumeIntoPaintCanvas, even for Code or Sounds.
    G-Warp source: setMainTab invokes this function regardless of the selected tab.
    Expected: changing to Code or Sounds should not needlessly reload the costume editor. If the editor has unsaved work, tab navigation must not discard it or reset selection.
    Fix: load costume state only when entering Costumes or after sprite/costume selection; verify the editor autosaves before tab changes. This is a risk to verify, not proven data loss.

MENUS, BUTTONS, AND KEYBOARD

33. HIGH — Ctrl/Cmd+S has two global save handlers and may perform two different saves.
    G-Warp source: an early keydown listener calls GW.saveProject(); the newer file menu listener maps Ctrl/Cmd+S to the modern save(false) path. Both listeners are registered globally and preventDefault does not stop the other listener.
    Expected: one keyboard shortcut should execute one save operation and one save format/path. It must not trigger a legacy G-Warp JSON download and a second SB3 save/dialog.
    Fix: route all save shortcuts through one canonical save function; preserve Save/Save As/legacy export as distinct explicit menu actions. Browser-verify Ctrl+S, Cmd+S, Ctrl+Shift+S and canceling a save dialog.

34. MEDIUM — The Current Action / Task Status dropdown is an input-looking control whose selection does not control the project.
    G-Warp source: updateStatus writes status values when Start/Pause/Stop are clicked, but the select has no corresponding change handler that performs actions.
    Expected: if this is a status indicator, it should be read-only text; if it is meant to be an action selector, selecting Running/Stopped should perform or request the named operation.
    Fix: make the semantics unambiguous (prefer a non-interactive status display). Do not leave a control that looks actionable but silently does nothing.

35. MEDIUM — The More menu combines file/edit/tools/settings functions in one menu instead of Scratch's separate File/Edit interactions.
    G-Warp source: buildMenu and the gw-v181 menu grouping put New/Open/Save/Restore, undo/redo, developer tools, and settings in More.
    Expected: core operations should remain discoverable and map to their expected function even if G-Warp keeps a different menu arrangement.
    Fix: ensure every standard operation has one visible, accessible path and keyboard equivalent. This is a navigation/discoverability difference, not a request to copy Scratch's appearance.

36. MEDIUM — G-Warp does not provide Scratch/PenguinMod's cross-project Backpack workflow.
    G-Warp source: no Backpack action or cross-project block/sprite/costume/sound holding area was found in the primary UI. G-Warp has per-project sprite/costume/sound duplicate actions and save/restore tools, but these are not equivalent to quickly transferring assets/scripts between projects.
    Expected: Scratch/PenguinMod Backpack lets users store and re-use scripts, sprites, costumes, and sounds across projects.
    Fix: track this as a deliberate missing capability for U1, not a merge blocker if the owner has not requested a Backpack.

37. MEDIUM — Block/context menu operations are not consistently undo-aware by construction.
    G-Warp source: the old block context menu directly removes the clicked node or stack; other newer actions (workspace clear, empty-workspace menu, sprite delete) explicitly call GW8 history or have observers.
    Expected: duplicate/delete/move/comment actions should each be reversible once, without missed or duplicate undo steps.
    Fix: route context menu mutations through the common history API, test undo/redo after each block operation, and avoid duplicate snapshots from MutationObserver plus explicit pushes.

38. LOW — Workspace comments are not attached to the specific block that was right-clicked.
    G-Warp source: GW_COMMENTS.add places a top-level comment stack at screen/workspace coordinates and assigns the current sprite owner. It can be moved/folded/deleted, but the comment is not attached to a block anchor.
    Expected: Scratch comments can be attached to a block and follow it when the block/script is moved.
    Fix: support both workspace comments and block-attached comments, and preserve the anchor when duplicating or moving the script.

39. LOW — Comment resizing differs from Scratch's drag-resize comment box.
    G-Warp source: the comment textarea uses native vertical resize; the comment widget has no explicit bottom-right resize handle for the full note container.
    Expected: Scratch comment notes can be resized from their corner and moved from their title bar.
    Fix: make the comment container resizable with a defined corner handle and store its dimensions; retain the current fold/delete controls.

40. LOW — Right-click behavior is inconsistent across surfaces.
    G-Warp has separate implementations: blockContextMenu for workspace blocks; gw35Menu for empty workspace; gw28Menu for sprite tiles; gw37Menu for costume items; no sound-list contextmenu handler was found. The old block menu closes on document click and lacks the explicit Escape cleanup used by the sprite menu.
    Expected: right-clicking each supported object should present that object's relevant actions and close/focus reliably, while the browser context menu is suppressed only where an app context menu is intentionally provided.
    Fix: define a context-menu contract by surface, test block/empty workspace/sprite/costume/backdrop/sound/monitor/stage separately, and avoid letting a missing app menu produce surprising browser behavior.

41. LOW — Editor-specific double-click has multiple meanings without a consistent affordance.
    G-Warp source: double-clicking categories filters the palette; double-clicking workspace blocks toggles debugger breakpoints; double-clicking nested expression slots opens expression menus.
    Expected: custom double-click features are okay, but their effect should be discoverable and must not conflict with common editing gestures (text/input targets are partly excluded).
    Fix: document/indicate these actions and test that double-clicking category names, blocks, slots, and text inputs does not cause accidental edits or toggles.

42. MEDIUM — The tab/asset editor state needs a deliberate save/selection contract.
    G-Warp source: the main tab switcher calls the costume load routine on every tab change; costume/sound editors each have their own state and autosave/selection code, while sprite selection is controlled by a separate grid.
    Expected: switching tabs or selecting another sprite should save pending edits, preserve the intended selection, and never silently apply an edit to a different sprite.
    Fix: test switching Code → Costumes → Sounds while editing; selecting another sprite with pending paint/audio changes; then round-trip through Save and Load. Promote any reproduced data loss to HIGH.

FUNCTIONALITY PRESENT OR MOSTLY CORRECT (KEEP IT)
- Start/Pause/Stop are wired; G-Warp deliberately adds Pause even though it is not a base Scratch toolbar control. Do not remove this extra action.
- Main Code/Costumes/Sounds click switching exists through setMainTab; sprite tiles select a sprite; the selected sprite has a delete control and duplicate/find actions.
- The empty-workspace menu has Undo, Redo, Clean up Blocks, Add Comment, Delete Blocks, and block search. Keep these functions while fixing search reachability and result truncation.
- Costume list supports click/keyboard selection and has duplicate/export/delete context actions.
- Sprite and costume delete support restore/undo paths. Keep them.
- The editor already has workspace pan/zoom/clean-up tools and a More-menu keyboard navigation implementation. Audit only the interaction defects identified above; do not replace working systems wholesale.

TEST PLAN FOR CLAUDE / U3
1. Run the app on the actual GitHub Pages build and in a local browser. Record the tested commit SHA and browser.
2. Use two overlapping sprites with different when-this-sprite-clicked scripts. Click each sprite and empty stage; only the clicked sprite should run.
3. Stop the project, drag a sprite on the stage, and verify position fields update. Repeat while running and with imported draggable=false/true.
4. Exercise each block gesture: palette drag, top/bottom snap, C-body insertion, hat/cap restrictions, detach from the middle of a short and long script, pointer cancellation, drag to palette deletion, duplicate/delete selected block, undo/redo.
5. While a forever loop is running, pull out and replace a statement. Confirm behavior changes immediately without Green Flag.
6. Test Start/Stop with nonzero ghost/color effects, clones, speech, one-shot sound and looped music. Pause, wait several seconds, and resume; audio and timers should behave consistently.
7. Test context menus at all four viewport corners. Test keyboard open/focus/Enter/Escape and ensure every menu has the right actions for its surface.
8. Reorder costume and sound lists by mouse and verify costume # / next costume, sound dropdowns, save/load, and SB3 export preserve order.
9. Test Ctrl+S exactly once (no duplicate save/download/dialog), Ctrl+Shift+S, Ctrl/Cmd+Z/Y, all three tabs, and text-input focus.
10. Test category rail one-click navigation, palette scroll/search, Variables/Lists monitors (drag, visibility, context menu), extension rail, Stage selection, Costumes, Sounds, and More-menu actions.
11. For each test, record PASS / FAIL / NOT TESTED. Do not claim browser verification based only on static source inspection.

AUDIT LIMITATION
This report is grounded in static inspection of the current checked-in app.html and the linked editor documentation. The browser interaction tests above have not been run in this audit. Findings about missing handlers are source-verified absences in the inspected file; timing/rendering issues and user-visible impact should be reproduced by Claude before any merge. The audit intentionally prioritizes fixes to behavior and preserves G-Warp's own dark/electric styling.


---
## UX-costume-animation.txt

G-WARP — FLIPBOOK + ANIMATION TAB UX REVIEW
Date: 2026-10-18
Owner: Creapter1
Reviewer: ChatGPT
Target: Flipbook and Costume Animation UI in app.html (Beta v15.48.0)
Evidence: STATIC REPOSITORY REVIEW + EXTERNAL REFERENCE RESEARCH. No browser comparison or app execution was run in this session. These are UX recommendations and acceptance criteria, not confirmed runtime bugs.

DESIGN INTENT
Keep G-Warp's own dark, electric violet/green visual language. Borrow interaction ideas, not another app's artwork: Pivot Animator uses a clear frame strip, a visibly selected frame, direct figure handles, onion skins, playback controls and in-between frames. Scratch Paint emphasizes direct selection/reshape, predictable handles, undo/redo, layers, zoom, vector/bitmap mode and a tool rail. G-Warp should make the same ideas easy to discover without copying either product's exact layout.

RANKED IMPROVEMENTS

1. P0 — Make save/reopen a first-class animation workflow
Problem to solve: users can spend a long time rigging and posing; losing the rig or generated costumes is a trust-breaking failure.
Concrete change: make the save state of animations explicit. When an animation has edits, show the project's unsaved marker; on load, restore frame count, bone tree, attachments, pose values, FPS/loop options and animation names. If a generated costume is stale or missing, rebuild it safely or show a readable recovery warning.
How we know it is done: create an 8-frame walk, edit frame 4, save SB3, close the app, reopen the exact file, and confirm all 8 frames, 5 bones, parent links, attachments, names and poses match. Make costumes twice and verify no duplicate frame set is appended. No console error, data loss or silent fallback. Add a Playwright regression with a saved fixture.

2. P0 — Make the frame strip readable and predictable
Problem to solve: frame-by-frame animation depends on always knowing which pose is selected and how to add, duplicate, insert, move or delete it.
Concrete change: keep the frame strip visually distinct from the canvas; use a strong selected-frame border, a readable frame number, and small explicit Add, Duplicate, Delete and (where supported) Move controls. Auto-scroll the strip when keyboard navigation crosses the visible range. Show a count such as “Frame 4 of 8.”
How we know it is done: on a 20-frame animation, moving to frames 1, 10 and 20 always leaves the selected frame visible and correctly numbered. Add/duplicate/delete updates the count immediately. Reopening the Animation panel restores the correct selected frame or clearly starts at frame 1.

3. P0 — Separate editor Play, project Start and Stop states
Problem to solve: Flipbook preview, bone-animation preview, Animation blocks and the project's Green Flag/Stop can all animate the same costume. Users need to know which one is running and how to stop it.
Concrete change: give the active preview a clear Playing state and its own Stop control; when the global project Stop is used, stop the project-owned animation threads and timers. Avoid two playback timers fighting over the selected costume. Do not hijack Space while a rename text field is focused.
How we know it is done: test Flipbook Play, Animation-tab Play, each Animation block, then press the global Stop. All applicable frame counters/costumes stop changing within one scheduled tick; no timer continues in the background; starting again works. Space starts/stops only when animation canvas/panel owns focus. Text inputs still accept spaces.

4. P0 — Make Onion skin controls visible, reversible and mode-safe
Problem to solve: a faint previous/next pose is useful only when the learner understands which frames are overlaid and knows the overlay will not be saved as art.
Concrete change: keep the Onion skin toggle near the drawing canvas, show explicit previous/next frame counts, and make the overlay visibly different from selected artwork while respecting the theme. Re-render on mode switch, frame change and costume change; clear the overlay when toggled off, closed, or stopped. Keep controls reachable by keyboard.
How we know it is done: turn previous and next skins on/off in vector and bitmap modes; change frames; close/reopen the editor. The correct neighboring poses appear, no old blob/overlay remains, and saved SVG/PNG data contains no onion-skin pixels or URLs. Check the actual pixels, not only a CSS flag.

5. P1 — Teach bone rigging with one small guided example
Problem to solve: “Rig”, “Attach”, parent/child bones and posing are unfamiliar words for many Scratch users.
Concrete change: first-run hint or compact inline guide: select Rig, click/drag to create a bone, attach the torso/arm shapes, test a bone, then move to Animate. Highlight the active bone and the parts attached to it; use a small bone hierarchy list with parent/child indentation.
How we know it is done: a new tester can rig a two-shape character and rotate the arm without reading source code or guessing which shape is attached. The selected bone and attached shapes are visible; Undo restores the previous rig. Hint can be dismissed and does not return every session.

6. P1 — Make in-betweening explain what it will create
Problem to solve: “In-between” and “Smooth x2” can feel magical or destructive when the user does not know which frames will change.
Concrete change: before applying, show the source frames and how many intermediate frames will be created. Offer a preview/undoable operation; explain “In-between” as adding a middle pose and “Smooth x2” as adding/smoothing intermediate motion. Preserve the original key poses.
How we know it is done: applying the tool to frames 1 and 3 inserts the expected intermediate pose(s), leaves frame 1 and 3 unchanged, updates the timeline count, and one Undo reverses the full operation. A preview is cancelled without modifying the animation.

7. P1 — Make Make costumes safe and traceable
Problem to solve: generated costumes can become confusing if users rename, reorder or manually edit them after an animation changes.
Concrete change: group or visually mark generated costumes as belonging to an animation, use predictable names like walk 1…8, and explain whether regenerated frames replace linked costumes or create new ones. Before destructive regeneration, preserve manually edited costumes or ask what to do.
How we know it is done: generate costumes twice, rename the animation, delete a frame, edit one generated costume manually and save/reopen. There are no duplicates or stale linked frames; user edits are not silently overwritten; the resulting frame-to-costume mapping is visible or discoverable.

8. P1 — State vector/bitmap capability before users invest work
Problem to solve: the rig test currently uses a vector costume, while the existing test's bitmap check covers onion-skin display rather than rigging a true bitmap costume.
Concrete change: label the costume format and explain whether bone rigs need vector shapes. If bitmap rigging is unsupported, disable the action with a friendly reason and a safe alternative. If conversion is offered, preview it and preserve the original.
How we know it is done: try a vector costume, a true imported PNG costume and a converted copy. Each path either works and saves correctly or presents an explicit, non-destructive limitation. There is no blank rig or corrupted costume.

9. P2 — Add consistent keyboard and accessibility behavior
Problem to solve: frame navigation, canvas movement and playback shortcuts can conflict with text editing or be invisible to keyboard-only users.
Concrete change: expose shortcuts in a small Help/keyboard popover; preserve visible focus; support Tab/Shift+Tab through controls and make the selected frame announced/readable; do not bind Space globally while typing. Keep hit targets large enough for trackpad use.
How we know it is done: keyboard-only tester can focus the frame strip, move/select a frame, toggle Onion skin, Play and Stop, and leave the panel. Focus ring stays visible. Space typed in Rename input is inserted as a space and does not start playback. Test at 100% and 200% zoom and a narrow viewport.

10. P2 — Keep modes and destructive actions obvious
Problem to solve: Flipbook (costumes), Rig and Animate (bones) operate on related assets but have different behaviors and possible conversion boundaries.
Concrete change: show a clear mode label/breadcrumb (“Costumes → Flipbook”, “Costumes → Animation → Rig/Animate”), retain the user's selected sprite and identify the current animation. Use consistent Undo/Redo placement and ask before a destructive delete/convert, not before harmless playback.
How we know it is done: a new tester can tell which mode is active, which sprite/animation is being changed, and where to return. Switching modes does not lose work or leave stale overlays; Cancel always leaves the source data untouched.

REFERENCE COMPARISON

Pivot Animator (official help)
- The overview describes frame thumbnails on a timeline, direct figure-handle positioning, and automatic in-betweening.
- Onion-skin help describes viewing previous/subsequent poses only while editing, not during play/export; its controls can show ahead and multiple prior frames.
- Frame-controls help describes adding and selecting frames, arrow-key navigation, and inserting in-betweens.
References:
https://www.pivotanimator.net/help5-2/overview.htm
https://www.pivotanimator.net/help5-2/onion_skins.htm
https://www.ww5.pivotanimator.net/help5-2/animation_frame_controls.htm

Scratch Paint (official source)
- The paint editor source supports SVG/PNG image editing and vector/bitmap mode conversion. Its standard workflow includes direct selection/reshape, common drawing tools, color/line-width controls, undo/redo, layer/group actions, and zoom.
- G-Warp should use these familiar interaction expectations (visible handles, stable selection, predictable undo) while keeping its own theme and layout.
Reference:
https://github.com/scratchfoundation/scratch-paint
Visual overview used for feature orientation (third-party tutorial, not official product documentation):
https://inventwithscratch.com/book3/chapter1.html

NON-GOALS
- Do not copy Pivot Animator or Scratch's full interface, colors, mascots, or artwork.
- Do not assert any recommendation is already implemented without a current-build test.
- Do not modify app.html from this review. The report proposes acceptance criteria for Claude/owner to pick up after current source and tests are reconciled.


---
## VERIFICATION-2026-10-19.txt

G-WARP REPOSITORY VERIFICATION — 2026-10-19
Reviewer: ChatGPT
Repository: Creapter1/gwarp
Verified main snapshot: 1cffda9578c69fc45685e09b40c655e3a06832a9
Current app.html blob: 5ca624a515b9fc1310814c4740608c1cf3071028 (2,440,120 bytes; Beta v15.48.0)
Current index.html blob: 88b8d46aeaa2056828a0d445b82649a0c5ed986f (586,667 bytes)

SCOPE AND LIMITS
This is a GitHub source/tree/diff/document audit. ChatGPT did not run a browser or runtime test. Attempting to clone the repository into a local test workspace failed because the environment could not resolve github.com. Results below distinguish source/tree verification from test results reported by Claude. No app.html/index.html changes were made by ChatGPT in this verification cycle.

RESULT SUMMARY
- ROLE CONSOLIDATION: PASS (repository structure and active task routing). Follow-up audit found a conflict between Gemini's new Big List and the earlier animation-first section; the combined Gemini task list has now been edited to map overlapping jobs and prevent duplicate deliverables.
- LEGACY FILE PRESERVATION: PASS with documented edits to three legacy lab reports.
- APP/INDEX UNCHANGED BY CHATGPT: PASS. Their current blob IDs are recorded above; later source changes were made by separate Claude commits.
- CURRENT V15.48.0 BEHAVIORAL VERIFICATION: PARTIAL / REPORTED TEST. Claude's work log records a full regression after the same-version shape-handle patch: 429 PASS and 9 FAIL, with all 9 described as expected legacy/feature-status checks. ChatGPT did not independently rerun it or confirm the individual Select assertion output.
- SCRATCH PARITY FIXTURES: PARTIAL. Grok corrected T043 in grok/fixtures.json and expanded the base to 60 cases. grok/FIXTURE-SOURCES.txt still has the old two-iteration expectation and old 30-case count. A separate 10-case list-index file T130-T139 is not loaded by the current Claude runner.
- MERGE QUEUE ROUTING: OPEN. Root MERGE-QUEUE.txt is Claude-owned and still uses historical deepseek/ paths and outdated task wording. Exact recommendations are in team/chatgpt/CHATGPT-NOTES.md › MERGE-QUEUE-NOTES.txt.
- PERFORMANCE PLAN: CREATED, NOT A BENCHMARK RUN. The plan defines a procedure; no new comprehensive performance run was performed by ChatGPT.

1. TEAM / FOLDER CONSOLIDATION
SOURCE-VERIFIED:
- Current tree has only deepseek/README-ARCHIVE.txt in the former folder.
- All 28 files that existed under deepseek/ before migration have matching-name destinations under gemini/lab/.
- 25 of those 28 retain identical Git blob hashes. Three text reports/notes were intentionally edited to add provenance headers and update stale deepseek/ paths: LAB-costumes.txt, LAB-speed.txt, NOTES-pmp.txt.
- gemini/lab/ also contains its README and an archived copy of the former DeepSeek task list, clearly labeled NOT ACTIVE.
- team/TODO-GEMINI.txt is the unified active list. team/TODO-DEEPSEEK.txt and team/DEEPSEEK-RETURN-HANDOFF-TEMPLATE.txt are retired redirects/history.
- Gemini's prior visual/extension backlog remains in team/TODO-GEMINI.txt alongside inherited lab responsibilities.
- gemini/AI-CHAT-LOG.txt now exists, but it is explicitly a ChatGPT-seeded handoff, not a Gemini conversation transcript. Gemini must append its own real task results.

2. CURRENT SOURCE VERSION AND PROTECTION
SOURCE-VERIFIED:
- The current source is Beta v15.48.0 according to app.html's exposed build label and current TODO.
- app.html blob is 5ca624a515b9fc1310814c4740608c1cf3071028; index.html blob is 88b8d46aeaa2056828a0d445b82649a0c5ed986f.
- These blob IDs were unchanged through the ChatGPT documentation/verification commits listed in this work cycle.
- Comparing the pre-consolidation tree to the migration snapshot showed no app.html/index.html edits in the role migration. Subsequent Beta v15.48.0 and same-version shape-handle source changes appear in separate Claude commits.
- Static inspection of app.html finds the current clone guard/cloneCount cache and 5000 Infinite Clones safety ceiling, a number/letter correction, list index handling in the legacy dispatcher and active evaluator, and the Select/transform module. Static presence is not proof every edge case behaves correctly.

3. CLAUDE-REPORTED TEST RESULTS — NOT INDEPENDENTLY RE-RUN
REPORTED TEST:
- Claude's 2026-10-19 review says Grok's 20 costume-animation fixtures passed 20/20.
- Claude reports the earlier parity runner passed 39/39 (30 Grok fixtures plus 9 Claude extras). This is an earlier fixture set; current Grok base now has 60 cases and a separate 10-case list fixture file awaits runner integration/rerun.
- Claude reports the initial v15.48.0 Select-tool test passed and older costume tests passed.
- Claude reports performance improvements on the owner’s private test projects: zombie 2 -> 58 FPS; The worst day 23 -> 37 FPS. These values apply only to the reported project/build/environment and are not promises for other hardware/projects.
- team/P0-CLONE-FREEZE-REPORT.txt records Claude's earlier headless Chromium clone-freeze reproduction and mitigation in v15.46.0, retained in current source. This is Claude-reported evidence, not a fresh ChatGPT run.
Evidence files: team/claude/CLAUDE-NOTES.md › REVIEW-GROK-2026-10-19.txt, team/claude/tests/test_grok_anim.js, team/claude/tests/test_grok_fixtures.js, team/claude/tests/test_select.js, team/P0-CLONE-FREEZE-REPORT.txt.

4. OPEN BLOCKERS / FINDINGS
HIGH — latest Select patch needs retest:
Commit e958ade67cdf1faac55b30a1c0912b34bc853659 added three Select-test assertions for a freshly drawn rectangle retaining handles, resizing immediately, and clicking elsewhere to draw a new shape. A later AI-TEAM work-log entry records full current v15.48.0 regression at 429 PASS / 9 FAIL, all described by Claude as expected legacy/feature-status checks. ChatGPT did not run this suite or confirm the individual output for those three assertions; retain this as REPORTED TEST evidence rather than independent proof.

HIGH — raw T043 fixture is wrong:
grok/fixtures.json has now corrected T043 to three iterations and contains 60 cases. grok/FIXTURE-SOURCES.txt still says two iterations and still describes 30 cases, so the source map is stale. grok/fixtures-extra-list.json contains T130-T139 (10 list cases). team/TODO-GROK.txt says Claude is waiting to run 60 + 10; however, the current team/claude/tests/test_grok_fixtures.js loads the 60 base fixtures and adds team/claude/tests/extra-fixtures.json (9 cases), not fixtures-extra-list.json. The intended 60+10 set is not yet recorded as passing. Grok must update its own source map; Claude must reconcile the runner and record the current run.

MEDIUM — merge queue has stale path/status entries:
MERGE-QUEUE.txt still lists historical deepseek/ candidate paths and retired DeepSeek tasks. Claude owns that file, so ChatGPT did not edit it. Path mapping, current statuses and review recommendations are in team/chatgpt/CHATGPT-NOTES.md › MERGE-QUEUE-NOTES.txt. Legacy costume candidates remain blocked pending actual API/state mapping and isolated stage-vs-costume canvas testing. Protobuf .pmp remains incomplete pending confirmed parser API and a real legal fixture/assets. Preserve existing .sb3 and ZIP .pmp support. Legacy clone speed candidates remain superseded; collision-B is not accepted just because an older queue said PICK.

MEDIUM — extension / site:
Gemini's browser extension remains WAITING for complete packaging/icons, permission/privacy review, Chromium/Firefox checks, Scratch SPA/repeated injection checks, and end-to-end project load. The canonical website URL still awaits owner confirmation; no replacement URL should be guessed.

MEDIUM — benchmarking:
team/PERFORMANCE-BENCHMARK-PLAN.txt documents the test protocol and private-project baseline notes. It is not proof of a complete new benchmark run. Measure script-heavy and render-heavy work separately, run at least three timed samples, report median/range, record Stop/UI responsiveness, and rerun correctness checks for each optimization. Treat 60 FPS+ as an aspiration on specific tested projects and hardware.

5. CONTEXT / DOCUMENTATION AUDIT
- Root README, AI-TEAM, TODO, Gemini task list, assignments, workflow, roadmap, shared queue, current status, performance plan, and handoff logs now route active inherited lab work into Gemini's unified workspace.
- Original Gemini visuals/extension backlog was retained as GV1-GV6 and GE1-GE4 after current assignments.
- ChatGPT updated docs/USER-GUIDE.txt to Beta v15.48.0 and added Select/transform guidance plus explicit evidence limitations.
- Cross-AI chat histories are not automatically shared in full. The repository has a shared handoff record; it does not claim to contain the original Gemini or DeepSeek chats.
- Historical mentions of DeepSeek in work logs are intentionally retained as history. The old task-list copy is explicitly archived and must not be followed as active instruction.
- The product TODO now prioritizes Scratch parity/custom procedures, realistic 60 FPS performance targets, clean UI, measured CPU/GPU investigation, and GWrap AI reconstruction animation behavior. Tilemap and additional extension work remain deferred.

6. REQUIRED NEXT ACTIONS
1. Claude: retain the recorded current full-regression result (429 PASS / 9 expected FAIL), document the exact expected checks, confirm whether test_select.js's three new shape-handle assertions ran, reconcile runner inputs for 60 base + T130-T139, and update the Claude-owned merge queue.
2. Grok: T043 is corrected in grok/fixtures.json; update grok/FIXTURE-SOURCES.txt to the three-iteration result and current 60-case count. Claude then runs the intended current 60+10 fixture set.
3. Gemini: follow team/TODO-GEMINI.txt order; keep new outputs in gemini/ or gemini/lab/ and maintain gemini/AI-CHAT-LOG.txt. Do not treat migrated code as accepted or authored by Gemini.
4. Claude/Gemini: complete protobuf .pmp API/fixture validation, costume canvas-isolation evidence, and browser-extension packaging/real-browser checks as assigned.
5. Performance: use team/PERFORMANCE-BENCHMARK-PLAN.txt and private test projects through their authorized private repo only. Record exact project/build/browser/hardware/settings and before/after results.
6. Owner: confirm the canonical website URL if it has changed; do not guess it.
7. All contributors: preserve evidence labels, do not claim tests that did not run, do not edit app.html/index.html without specific authorization, and do not integrate or release without the existing approval gates.

FINAL VERDICT
The **team-role consolidation and repository/file routing are verified at source/tree level**. The codebase is now at Beta v15.48.0, but **not all current work is fully verified**: Claude reports 429 PASS / 9 expected FAIL for the current full regression but ChatGPT did not independently reproduce it; the current 60+10 parity set has not yet been reported as passing and its source map/runner need reconciliation; the merge queue needs Claude's cleanup; extension/.pmp tasks retain blockers; and the benchmark plan still needs actual benchmark runs. ChatGPT performed static GitHub verification only and did not independently run browser/runtime tests.


LATEST SNAPSHOT ADDENDUM (2026-10-19, main 1cffda9578c69fc45685e09b40c655e3a06832a9 at time of audit)
- Rechecked the changed fixture after Grok's commit 2654d21d: grok/fixtures.json now has 60 fixtures and T043 expects 3. T043 in grok/FIXTURE-SOURCES.txt is still stale at 2 iterations.
- Grok has provided grok/fixtures-extra-list.json with 10 unique T130-T139 cases. team/TODO-GROK.txt says Claude is waiting for a current 60+10 run. Current runner does not load that extra-list file yet.
- AI-TEAM.txt records Claude's full v15.48.0 regression as 429 PASS / 9 FAIL (all described as expected). This is reported by Claude and was not independently rerun by ChatGPT.
- The owner-facing Gemini task list now routes to team/GEMINI-BIG-LIST-2026-10-19.txt, titled for “Gemini 3 (Argon)”, while AI-TEAM's roster still says “Gemini 2 (FreeBuff/Argon)”. One unified gemini/ workspace is preserved; confirm the preferred displayed model/teammate label.


LATEST TASK-ROUTING AUDIT (2026-10-19, follow-up documentation commits)
- team/TODO-GEMINI.txt originally retained an “ANIMATION ASSIGNMENT FIRST” section beneath a header pointing to team/GEMINI-BIG-LIST-2026-10-19.txt. This conflicted with the new Big List's explicit priority order and could cause duplicate work.
- ChatGPT updated team/TODO-GEMINI.txt to mark the prior assignments as cross-references, not a second work queue. It maps Big List G1 to GA-M1 (expanded icon scope), G3 to GA-M2, L1 to GL1/DA1, L2 to GL2/DA2, and L3 to GL3/DA3. GM7/GM8 and inherited GL4/GL5 remain after the Big List per its note.
- The current task naming remains inconsistent: AI-TEAM's roster says “Gemini 2 (FreeBuff/Argon)”; team/GEMINI-BIG-LIST-2026-10-19.txt says “Gemini 3 (Argon)”. Only one gemini/ workspace exists. The verification did not guess which display/model label is canonical; owner confirmation is still needed.
- After these documentation updates, app.html and index.html blob IDs remained 5ca624a515b9fc1310814c4740608c1cf3071028 and 88b8d46aeaa2056828a0d445b82649a0c5ed986f. No runtime code was changed by ChatGPT.


LATEST TASK-ROUTING AUDIT (2026-10-19, follow-up documentation commits)
- team/TODO-GEMINI.txt originally retained an “ANIMATION ASSIGNMENT FIRST” section beneath a header pointing to team/GEMINI-BIG-LIST-2026-10-19.txt. This conflicted with the new Big List's explicit priority order and could cause duplicate work.
- ChatGPT updated team/TODO-GEMINI.txt to mark the prior assignments as cross-references, not a second work queue. It maps Big List G1 to GA-M1 (expanded icon scope), G3 to GA-M2, L1 to GL1/DA1, L2 to GL2/DA2, and L3 to GL3/DA3. GM7/GM8 and inherited GL4/GL5 remain after the Big List per its note.
- The current task naming remains inconsistent: AI-TEAM's roster says “Gemini 2 (FreeBuff/Argon)”; team/GEMINI-BIG-LIST-2026-10-19.txt says “Gemini 3 (Argon)”. Only one gemini/ workspace exists. The verification did not guess which display/model label is canonical; owner confirmation is still needed.
- After these documentation updates, app.html and index.html blob IDs remained 5ca624a515b9fc1310814c4740608c1cf3071028 and 88b8d46aeaa2056828a0d445b82649a0c5ed986f. No runtime code was changed by ChatGPT.


URL / TASK AUTHORITY ADDENDUM (2026-10-19)
- team/GEMINI-BIG-LIST-2026-10-19.txt is now the top-priority Gemini queue. team/TODO-GEMINI.txt has been corrected to state this explicitly and map the overlapping GA-M1/GA-M2/GL1-GL3 jobs into G1/G3/L1-L3. This is a documentation/routing correction; it does not create or integrate any code.
- The new Big List header repeats the old GitHub Pages URL, while TODO.txt still says the canonical URL is awaiting owner confirmation. No links or extension targets were changed because these sources conflict and the owner has not reconfirmed the canonical URL.
- The newest assignment says “Gemini 3 (Argon)” while AI-TEAM's roster says “Gemini 2 (FreeBuff/Argon)”. The consolidated active folder remains gemini/; owner confirmation is needed for the label, not for the folder routing.


---
## WEBSITE-OPEN-QUESTIONS.txt

WEBSITE / DOCUMENTATION OPEN QUESTIONS — 2026-10-19
Owner: Creapter1
Author: ChatGPT
Last reviewed: 2026-10-18
Evidence: static GitHub source/document review only. No browser test was run.

1. Canonical website URL
   TODO.txt says the previously documented GitHub Pages URL may be stale and requires owner confirmation. The new docs link to relative paths and the website's existing app.html; do not replace external canonical links until the owner confirms the URL.

2. Extension count and gallery details
    The prior homepage said 191 extensions. Grok's 2026-10-18 static audit, grok/EXTENSIONS-check.txt, records 184 entries (TurboWarp 104 + PenguinMod 80), but its stated baseline size (~2,327,544 bytes) differs from the current main app.html blob size (2,440,120 bytes). Neither number is safe to publish as the current count without checking the current gallery. Pass 2 removed the fixed count and 8/104/79/191 infographic from homepage text and stat cards; the page now shows gallery names and safety-label categories without totals. Claude should verify the current gw10GalleryData/live gallery and identify which extensions G-Warp itself implements before any exact count is restored. Extension creator/licence details and individual safety data still require current source/gallery review. Embedded screenshots still need human visual review for stale visible labels/counts.

3. Current keyboard shortcut behavior
   The task notes list Ctrl+O, Ctrl+Z/Y, Ctrl+G, arrows, Delete and Space in Animation. This documentation marks shortcuts as build/focus-dependent where not independently verified. Confirm each shortcut in the current Beta v15.48.0 UI and update shortcuts.html with observed behavior.

4. GWrap AI availability and settings
   Existing homepage describes GWrap AI as in the works. The owner-requested block reconstruction animation preference (default On, Skip/instant, More -> Settings) needs confirmation in the current app before the website should describe it as shipped. Do not claim that preference is implemented based only on the requirement.

5. Offline behavior
   The website now says the app is a local HTML file but some features/resources may need internet. Verify which dependencies and features work fully offline before making a stronger promise.

6. Bug-report data flow and privacy wording
   Safety copy reflects shared project rules, not an independent network audit. Verify exactly what the built-in bug report sends, where it goes, and whether project attachments are included before making stronger privacy claims.

7. Current app interaction checks
   The pages describe the v15.48.0 Select handles, flipbook/onion skin, rig/animation tools, Song maker, clone limit and Power lines based on existing release/team notes. These are not independently browser-tested by ChatGPT. Claude's reported regression is recorded separately in team/AI-STATUS.txt.

8. Static link check and live-site/mobile verification
    After the homepage update, the current main branch has 25 documentation HTML pages (16 core docs plus the tutorials hub and eight tutorial lessons). Static source/tree checks across those pages found 0 missing local href/src targets, 0 duplicate IDs, no heading-level skips, and no images without alt text (no inline <img> elements were present in these pages). All 25 pages now have a visible :focus-visible outline, a Tutorials navigation entry, and footer links to Glossary and Parents & teachers. Fragment checks on the pages and linked targets examined found no broken anchors; the new homepage feature-card anchors were also checked against their target headings. This remains STATIC source/tree evidence, not a browser test. It does not verify app.html's #open hash handler, external URL availability, browser rendering, phone-width layout, screen-reader behavior, visual contrast by measurement, or the published deployment. Claude owns the real browser/mobile pass per team/CHATGPT-ROUND2-2026-10-19.txt.

9. Exact feature list / animation block names
   The assignment refers to “the 4 Animation blocks” but does not list their exact visible names. Confirm from the live app's Animation palette before publishing a name-by-name list.

ROUND 2 DOCUMENTATION CONTENT — 2026-10-18
- Added all eight prioritized tutorial pages plus a hub under docs/tutorials/ and linked Tutorials in the left menu on all 25 docs pages.
- Added docs/glossary.html (65 terms), docs/parents.html (privacy claims deliberately limited to confirmed facts), expanded docs/blocks.html with over 100 core-block examples and behavior caveats, and shortened README.md with direct docs/workflow/licence links.
- Added visible keyboard focus styles across the docs pages. This is a static CSS change; actual keyboard operation and visual contrast still require Claude's browser review.
- Not closed: canonical published URL; visual freshness of embedded screenshots; exact current extension/gallery count and native-vs-third-party inventory; four exact visible Animation block names; and runtime confirmation that the examples work as written.


10. Credits
    Confirmed: root LICENSE exists and contains the MIT License (blob 416e68ec518ad79447f98a7e54a6d48b9947055f). The Credits page links to ../LICENSE. Still open: verify each extension's creator and licence from the current extension gallery before claiming the credit list is exhaustive.


---
## JOBS-BLOCKS-BLK-0001-PAR-BLK-0002-AI.md

# Batch report: BLK-0001-PAR .. BLK-0002-AI (10 jobs)

**Batches by:** Buffy (Freebuff coding agent)
**Date (UTC):** 2026-10-28
**G-Warp version:** not tested (smoke-app.js needs Node.js, not available in this environment)

---

## BLK-0001-PAR  "move (10) steps"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Job type [TERMINAL] needs `node team/ai-team/tools/qa-kit/compare.js` — requires Node.js 18+ and Playwright chromium.
  Neither node nor python is available in this Freebuff environment.
  No test built; no comparison run.
Bug: no
Note: blocked on Node.js + qa-kit setup. Script plan: build `{B.C('move',[10]), B.SET('result', B.X)}`, compare G-Warp vs scratch-vm X position.

## BLK-0001-EDGE  "move (10) steps"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker as BLK-0001-PAR: no Node.js for compare.js.
  Edge inputs planned: "", "abc", "10", 10, -1, 0, 1e9, "NaN", 2.5, 300-char string.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0001-SAVE  "move (10) steps"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker: roundtrip.js needs Node.js.
  Would reuse the .sb3 from BLK-0001-PAR, run roundtrip.js + check-sb3.js.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0001-DOC  "move (10) steps"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block checked in team/ai-team/gwrap-blocks.json (type: move, category: motion, block type: stack).
  Help card (max 6 lines, words an 8-year-old knows):

  ### move (10) steps
  What it does: moves your sprite forward 10 steps in the direction it is pointing.
  Try it: when green flag clicked → move (10) steps. Put it inside a forever loop to keep going.
  Watch out: it moves where the sprite POINTS, not always to the right. Turn first if you want a different direction.
Bug: no
Note: SOURCE-VERIFIED from gwrap-blocks.json. No Scratch screenshots used.

## BLK-0001-AI  "move (10) steps"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Job type [ANY] waits until AIM-1 (the AI Lab command list) exists in team/ai-team/shared/.
  As of this session, no AIM-1 package found. Skipping until the AI Lab pushes it.
Bug: no
Note: leave [>] until AIM-1 exists, then write 10 JSONL examples in team/chatgpt/ai-data/BLK-0001.jsonl.

## BLK-0002-PAR  "turn (15) degrees"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same Node.js blocker as BLK-0001-PAR. Block type: turn_cw (motion, stack).
  Script plan: `{B.C('turn_cw',[15]), B.SET('result', B.DIR)}`, compare direction.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0002-EDGE  "turn (15) degrees"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Edge inputs for direction: "", "abc", "15", 15, -1, 0, 1e9, "NaN", 2.5, long text.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0002-SAVE  "turn (15) degrees"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Would reuse .sb3 from BLK-0002-PAR, run roundtrip.js + check-sb3.js.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0002-DOC  "turn (15) degrees"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block checked in team/ai-team/gwrap-blocks.json (type: turn_cw, category: motion, block type: stack).
  Help card:

  ### turn (15) degrees
  What it does: turns your sprite 15 degrees clockwise (to the right).
  Try it: when green flag clicked → turn (15) degrees. Use a negative number to turn the other way.
  Watch out: turning does not move the sprite, only changes which way it points. Move after turn to go that way.
Bug: no
Note: SOURCE-VERIFIED from gwrap-blocks.json. No Scratch screenshots used.

## BLK-0002-AI  "turn (15) degrees"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same AIM-1 blocker as BLK-0001-AI. Skipping until the AI Lab pushes the command list.
Bug: no
Note: leave [>] until AIM-1 exists, then write 10 JSONL examples in team/chatgpt/ai-data/BLK-0002.jsonl.

---

**Summary:** 2 of 10 done (DOC jobs), 7 blocked on Node.js + qa-kit setup, 1 blocked waiting for AIM-1 (AI Lab).
**Next step:** install Node.js 18+ and run `cd team/ai-team/tools/qa-kit && npm install && npx playwright install chromium`, then re-run the PAR/EDGE/SAVE jobs.


---
## JOBS-BLOCKS-BLK-0003-PAR-BLK-0004-AI.md

# Batch report: BLK-0003-PAR .. BLK-0004-AI (10 jobs)

**Batches by:** Buffy (Freebuff coding agent)
**Date (UTC):** 2026-10-28
**G-Warp version:** not tested (smoke-app.js needs Node.js, not available)

---

## BLK-0003-PAR  "turn (15) degrees" (turn counter-clockwise)
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  [TERMINAL] job needs compare.js (Node.js + Playwright). No Node.js in this environment.
  Block type: turn_ccw (motion, stack). Script plan: `{B.C('turn_ccw',[15]), B.SET('result', B.DIR)}`.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0003-EDGE  "turn (15) degrees" (turn counter-clockwise)
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same Node.js blocker. Edge inputs for direction: "", "abc", "15", 15, -1, 0, 1e9, "NaN", 2.5, long text.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0003-SAVE  "turn (15) degrees" (turn counter-clockwise)
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Would reuse .sb3 from BLK-0003-PAR, run roundtrip.js + check-sb3.js.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0003-DOC  "turn (15) degrees" (turn counter-clockwise)
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block checked in team/ai-team/gwrapblocks.json (type: turn_ccw, category: motion, block type: stack).
  Help card:

  ### turn (15) degrees
  What it does: turns your sprite 15 degrees counter-clockwise (to the left).
  Try it: when green flag clicked → turn (15) degrees. Use a positive number to turn left, negative to turn right.
  Watch out: turning changes which way the sprite points, but does not move it. The sprite stays in the same spot.
Bug: no
Note: SOURCE-VERIFIED from gwrapblocks.json. No Scratch screenshots used.

## BLK-0003-AI  "turn (15) degrees" (turn counter-clockwise)
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Waits for AIM-1 (AI Lab command list). Not available yet.
Bug: no
Note: skip until AIM-1 exists, then write 10 JSONL examples in team/chatgpt/ai-data/BLK-0003.jsonl.

## BLK-0004-PAR  "go to x: (0) y: (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  [TERMINAL] job needs compare.js. Block type: goto_xy (motion, stack).
  Script plan: `{B.C('goto_xy',[0,0]), B.SET('result', B.X), B.SET('result2', B.Y)}`.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0004-EDGE  "go to x: (0) y: (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Edge inputs: "", "abc", "0", 0, -1, 1e9, "NaN", 2.5, long text for x and y.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0004-SAVE  "go to x: (0) y: (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. Would reuse .sb3 from BLK-0004-PAR, run roundtrip.js + check-sb3.js.
Bug: no
Note: blocked on Node.js + qa-kit setup.

## BLK-0004-DOC  "go to x: (0) y: (0)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block checked in team/ai-team/gwrapblocks.json (type: goto_xy, category: motion, block type: stack).
  Help card:

  ### go to x: (0) y: (0)
  What it does: moves your sprite straight to a spot on the stage. x is left-right (negative = left), y is up-down (negative = down).
  Try it: when green flag clicked → go to x: (-100) y: (50). The center of the stage is x: 0 y: 0.
  Watch out: this moves the sprite instantly. Use "move (10) steps" if you want it to glide.
Bug: no
Note: SOURCE-VERIFIED from gwrapblocks.json. No Scratch screenshots used.

## BLK-0004-AI  "go to x: (0) y: (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Waits for AIM-1 (AI Lab command list). Not available yet.
Bug: no
Note: skip until AIM-1 exists, then write 10 JSONL examples in team/chatgpt/ai-data/BLK-0004.jsonl.

---

**Summary:** 2 of 10 done (DOC jobs, SOURCE-VERIFIED), 7 blocked on Node.js, 1 blocked waiting for AIM-1.
**Next step:** same blocker — install Node.js 18+ and Playwright chromium to unblock PAR/EDGE/SAVE jobs.


---
## JOBS-BLOCKS-BLK-0007-PAR-BLK-0008-AI.md

# JOBS-BLOCKS batch: BLK-0007-PAR..BLK-0008-AI

## BLK-0007-PAR  "change x by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  qa-kit compare.js needs Node.js + Playwright + Chromium.
  This Freebuff environment has none of those.
  Cannot run compare.js / roundtrip.js / check-sb3.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0007-EDGE  "change x by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker as BLK-0007-PAR. Edge inputs cannot be tested
  without qa-kit.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0007-SAVE  "change x by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. roundtrip.js + check-sb3.js need Node.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0007-DOC  "change x by (10)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block text from team/ai-team/gwrap-blocks.json (type: change_x,
  text: "change x by %n", category: motion).
  Help card below written from the block definition only.
Bug: no

### change x by (10)
What it does: moves your sprite a little bit to the right
  (or left if the number is negative), without turning.
Try it: when green flag clicked → forever → change x by (1) →
  if on edge, bounce
Watch out: x is left-right. Big numbers move it a lot fast.
  This does not change up-down (that's y).

## BLK-0007-AI  "change x by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  AI jobs wait for AIM-1 (command list from AI Lab).
  No AIM-1 file exists yet (team/ai-team/shared/*AIM-1* absent).
Bug: no
Note: Wait until AIM-1 exists, then 10 JSONL examples.

## BLK-0008-PAR  "set x to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker. compare.js cannot run here.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0008-EDGE  "set x to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0008-SAVE  "set x to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker. roundtrip.js needs Node.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0008-DOC  "set x to (0)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block text from team/ai-team/gwrap-blocks.json (type: set_x,
  text: "go to x: %n y: %n" uses set_x under the hood;
  standalone setter text "set x to %n", category: motion).
  Help card written from the block definition only.
Bug: no

### set x to (0)
What it does: puts your sprite at a chosen left-right spot,
  no matter where it was before. 0 is the middle.
Try it: when green flag clicked → set x to (-100) → wait (1) secs →
  set x to (100)
Watch out: this only moves left-right. Use "set y to" for up-down,
  or "go to x: y:" to move both at once.

## BLK-0008-AI  "set x to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  AI jobs wait for AIM-1. No AIM-1 file yet.
Bug: no
Note: Wait until AIM-1 exists, then 10 JSONL examples.

Summary:
  2 DOC done (SOURCE-VERIFIED), 8 jobs blocked:
  7 TERMINAL (no Node.js for qa-kit), 1 AI (waiting AIM-1).
  Not tested: all PAR/EDGE/SAVE.


---
## JOBS-BLOCKS-BLK-0009-PAR-BLK-0010-AI.md

# JOBS-BLOCKS batch: BLK-0009-PAR..BLK-0010-AI

## BLK-0009-PAR  "change y by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  qa-kit compare.js needs Node.js + Playwright + Chromium.
  This Freebuff environment has none of those.
  Cannot run compare.js / roundtrip.js / check-sb3.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0009-EDGE  "change y by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker as BLK-0009-PAR. Edge inputs cannot be tested
  without qa-kit.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0009-SAVE  "change y by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same blocker. roundtrip.js + check-sb3.js need Node.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0009-DOC  "change y by (10)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block text from team/ai-team/gwrap-blocks.json (type: change_y,
  text: "change y by %n", category: motion).
  Help card below written from the block definition only.
Bug: no

### change y by (10)
What it does: moves your sprite up (or down if the number is
  negative), without turning.
Try it: when green flag clicked → forever → change y by (1) →
  if on edge, bounce
Watch out: y is up-down. Positive moves up, negative moves down.
  This does not change left-right (that's x).

## BLK-0009-AI  "change y by (10)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  AI jobs wait for AIM-1 (command list from AI Lab).
  No AIM-1 file exists yet (team/ai-team/shared/*AIM-1* absent).
Bug: no
Note: Wait until AIM-1 exists, then 10 JSONL examples.

## BLK-0010-PAR  "set y to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker. compare.js cannot run here.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0010-EDGE  "set y to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0010-SAVE  "set y to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  Same qa-kit blocker. roundtrip.js needs Node.js.
Bug: no
Note: BLOCKED: needs qa-kit (Node.js), not testable here.

## BLK-0010-DOC  "set y to (0)"
Result: DONE
Evidence: SOURCE-VERIFIED
Proof:
  Block text from team/ai-team/gwrap-blocks.json (type: set_y,
  text: "set y to %n", category: motion).
  Help card written from the block definition only.
Bug: no

### set y to (0)
What it does: puts your sprite at a chosen up-down spot, no
  matter where it was before. 0 is the middle height.
Try it: when green flag clicked → set y to (100) → wait (1) secs →
  set y to (-100)
Watch out: this only moves up-down. Use "set x to" for left-right,
  or "go to x: y:" to move both at once.

## BLK-0010-AI  "set y to (0)"
Result: BLOCKED
Evidence: NOT-TESTED
Proof:
  AI jobs wait for AIM-1. No AIM-1 file yet.
Bug: no
Note: Wait until AIM-1 exists, then 10 JSONL examples.

Summary:
  2 DOC done (SOURCE-VERIFIED), 8 jobs blocked:
  7 TERMINAL (no Node.js for qa-kit), 1 AI (waiting AIM-1).
  Not tested: all PAR/EDGE/SAVE.


---
## NOTES-clone-limit.txt (from old branch chatgpt/clone-limit-warning-v2)

G-WARP CLONE LIMIT — NOTES FOR CLAUDE
=======================================

Files
-----
- chatgpt/clone-limit.js

Task addressed
--------------
First unfinished NOW sub-item: clone limit 300 like Scratch, optional
Infinite clones setting, and an appropriate warning.

Research findings from the current main/app.html
------------------------------------------------
I inspected the actual repository source (blob SHA 7ce527ca2908c63bbdfe642856ca29fd82178648; file app.html).

The existing app already has these pieces:
- Engine.cloneLimit = 300 near line 4171.
- GW.createClone enforces the configured limit near line 10991 and only creates
  a clone while the count is below that limit.
- GW.deleteClone and GW.removeAllClones exist near lines 11005-11011.
- More -> App -> Advanced settings exposes “Infinite clones” near line 13744.
- GW_SETTINGS.setInfiniteClones sets Engine.cloneLimit to Infinity or 300 near
  line 13708.
- A current wrapper reports the normal limit being reached near lines 15481-15489.
- A clone counter/report exists near line 17785.

The missing behavior addressed here is a runtime warning when the project
actually exceeds 300 clones because a higher/infinite limit is active. The
current limit-reached wrapper does not fire when createClone succeeds, so it
does not warn in this case. The current settings help text warns generally,
but not at the moment a project crosses the Scratch-sized boundary.

What the code does
------------------
- Wraps the existing GW.createClone and GW.deleteClone APIs without replacing
  their underlying clone behavior.
- Tracks the current clone count incrementally for normal create/delete paths.
- Warns once when count rises above 300, including the active limit in the
  message; resets the warning after the count drops to 300 or fewer.
- Uses the existing GW.toast and GW_HEALTH.note APIs where available. A small
  accessible dark fallback banner is used if GW.toast is unavailable.
- Handles GW.removeAllClones and notices a replaced Engine.sprites array or
  changed sprite-array length. It also listens for the cleanup event emitted by
  stop-clone-cleanup.js, so the count and over-300 warning reset immediately.
- Does not change the configured clone limit, block execution, or project data.
- Does not modify app.html. It is a supplemental file for Claude to review and
  integrate at the appropriate location.

Integration
-----------
Load this script after app.html has initialized window.GW, window.Engine,
GW.createClone, and GW.deleteClone. The app's source currently exposes
window.Engine and window.GW through the global-alias block, so placing the
script after the existing app scripts should satisfy this requirement.

Disable key (must be set before this script loads):
  window.GW_DISABLE_CHATGPT_CLONE_LIMIT = true;

Idempotence
-----------
The module uses window.__GW_CHATGPT_CLONE_LIMIT_WARNING_V1__ as an installation
key. Loading it twice should not wrap the functions twice. It also returns
without altering app behavior if the disable key is true.

Scope / not claimed complete
----------------------------
This closes the runtime-warning part of the first clone-limit sub-task, but
it does NOT complete the full NOW item “FREEZE FIXES (v15.46)”. Remaining
subtasks include fast Stop/clone cleanup (<100 ms), a frame budget so scripts
yield after about 250 ms, a stuck-script UI, text/list limits, and crash
recovery using IndexedDB. Those must remain unchecked until separately
implemented and tested.

Testing status
--------------
- Static/manual source review: PASS for expected app API names, based on the
  current main branch source cited above.
- JavaScript syntax: PASS (parsed with the JavaScript Function constructor).
- Mock-runtime simulation: PASS for 301 clones (one warning), deleting back to
  299 (warning state resets), crossing 300 again (warning appears again), and
  removeAllClones (count resets to zero). Duplicate loading preserved the same
  create/delete/remove wrappers without stacking another wrapper.
- Combined mock test with stop-clone-cleanup.js: PASS — 301 clones raised one warning; fast in-place cleanup reduced count to 0 and immediately cleared warning state without a second toast.
- Browser verification in G-Warp: NOT RUN here. This file is not active until
  Claude integrates it into app.html. Do not mark the runtime warning as
  browser-verified until tested with Infinite clones enabled, more than 300
  successful clone creations, deletion below 300, and clone creation again.
- Regression checks should also test default (limit 300) mode to ensure the
  existing cap and existing limit toast remain unchanged.

Research references
-------------------
- Official Scratch Foundation education resource: says a project can create
  at most 300 clones at a time, and explains the limit avoids lag:
  https://resources.scratch.mit.edu/www/cards/en/advancedtopicsclones-cards.pdf
- TurboWarp's official Infinite Clones documentation: the option disables
  Scratch's 300-clone limit and may break projects that assume cloning will
  stop at the limit:
  https://docs.turbowarp.org/infinite-clones
- Scratch VM source repository (the standalone repository is now archived
  following the mono-repo migration):
  https://github.com/scratchfoundation/scratch-vm
- G-Warp implementation references are in the current app.html locations above.


---
## NOTES-crash-recovery-offer.txt (from old branch chatgpt/clone-limit-warning-v2)

G-WARP CRASH RECOVERY OFFER — NOTES FOR CLAUDE
===============================================

File
----
- chatgpt/crash-recovery-offer.js

TODO item
---------
NOW 1: "Crash recovery: after a freeze, offer to restore the last autosave
(use IndexedDB, localStorage is too small for big projects)."

What the app already has
------------------------
Current app.html already contains IndexedDB restore points:
- The restore database is named "gwarp-restore"; it has points and assets stores.
- Restore points are created when a project changes, normally about once a
  minute, with the last 10 kept.
- window.GW_RESTORE exposes list/load/point.
- window.GW_FILES.restoreTo(id) saves a point before restoring and loads the
  chosen point.
- More -> File already has "Restore a previous version…".
This draft reuses those APIs. It does not duplicate project data into localStorage.

What this module adds
---------------------
- Uses sessionStorage only to assign a per-tab random ID.
- Uses localStorage only for a tiny flag that says whether this tab had a
  running project when it last updated the marker; no project title, content,
  or personal information is written there.
- Starts a marker while Engine.isRunning is true, removes it when the runtime
  stops and on normal pagehide.
- If the app loads and the previous marker remains, it treats that as a possible
  unclean end and asks whether to restore the newest existing IndexedDB point.
- Reuses GW_CONFIRM and GW_FILES.restoreTo; a restore point is saved before
  restore by the existing app path. IMPORTANT: current restoreTo() reports
  success/failure with its own toast and returns undefined, so this module
  records 'restore-invoked' rather than falsely claiming the project restored.
- Handles missing IndexedDB/API/list, no recovery points, cancellation and
  restore errors with status/toast feedback.
- Switch-off key:
    window.GW_DISABLE_CHATGPT_CRASH_RECOVERY = true
- Idempotence key:
    window.__GW_CHATGPT_CRASH_RECOVERY_V1__

Important limitations
---------------------
- Browser APIs don't provide a perfect universal "the page froze/crashed"
  signal. If a browser dispatches pagehide during a forced reload, this draft
  clears the marker and may not prompt. If localStorage/sessionStorage is
  unavailable, it deliberately doesn't install a broken crash detector.
- Background timer throttling and unusual lifecycle behavior can cause false
  positives or missed detections. Claude must test target browsers and decide
  whether/how to refine this approach.
- The user may only have a restore point up to about a minute old, or no point
  at all if the freeze occurred early. It must never promise zero data loss.
- A stop-all block clears the marker on the next poll (usually within 1.5 s);
  a hard crash during that short window could produce a harmless prompt.
- This module must be loaded after existing app.html scripts define Engine,
  GW_CONFIRM, GW_RESTORE, and GW_FILES.

Testing status
--------------
- API/source review: PASS for existing restore point and restoreTo APIs.
- JavaScript syntax: PASS after drafting.
- Mock lifecycle/recovery tests: PASS. Unclean marker detected and cleared; accept invoked the existing restoreTo helper with the newest point ID; cancel did not call restore; clean state did not prompt; active runtime wrote a marker and stopped runtime cleared it. Actual restore success is not observable from restoreTo because its current implementation handles errors with its own toast and returns undefined.
- Browser test on a real crashed/frozen tab: NOT RUN.
Required tests:
1. Start project, verify small marker is created; click Stop and verify marker clears.
2. Navigate/close normally; confirm marker clears and no recovery prompt appears
   when reopening the app.
3. Simulate an unclean previous marker; confirm the latest restore point dialog
   appears and states the real title/time.
4. Cancel; no project data is overwritten, and the prompt does not repeat.
5. Accept; verify latest restore point is loaded and previous current state is
   copied first.
6. No restore points, IndexedDB disabled, storage blocked, or restore failure
   must show a useful message without crashing startup.
7. Test crash/reload behavior in Chrome/Edge/Firefox and background-tab throttling.
8. Multiple app tabs, pagehide, BFCache/pageshow, and Stop/Start cycles.
9. Module loaded twice and switch-off/dispose behavior.

No app.html or index.html was changed.


---
## NOTES-frame-budget.txt (from old branch chatgpt/clone-limit-warning-v2)

G-WARP FRAME BUDGET — NOTES FOR CLAUDE
======================================

File
----
- chatgpt/frame-budget.js

TODO item
---------
NOW 1: "Frame budget: never run scripts for more than ~250 ms without letting
the page breathe (turbo mode too)."

Existing runtime facts from current app.html
--------------------------------------------
- The render loop runs Engine.threads and in Turbo mode repeats for at most
  about 12 ms per render pass (around line 3710).
- The v15.8 runner uses LIMIT_OPS = 5000, FRAME_MS = 10, WARP_MS = 500
  (around line 10700).
- Non-warp scripts yield at FRAME_MS after enough operations (around lines
  10897-10901).
- A warp custom procedure can otherwise run inside ScriptThread.step until the
  500 ms WARP_MS safety limit is reached.
- GW.RETRY_BLOCK is an existing sentinel at about line 14385. When the runner
  catches it, it rewinds the current block and returns so it can retry next
  frame (around lines 10893-10896). This is safer than adding synthetic frames
  or toggling the user's custom-block warp flags.

What this module attempts
------------------------
- Uses BUDGET_MS = 200 as a soft block-boundary target.
- Starts a shared frame clock via the existing GW.frameGate hook, and tracks
  each ScriptThread.step call as a backup timer.
- Checks before GW.extraBlock, GW8.resolveInput, GW9.evalNode and the legacy
  ScriptThread.executeBlock paths, but only while that thread is inside the
  wrapped ScriptThread.step() call (where the interpreter catches RETRY_BLOCK).
  When a warp custom frame has exceeded the budget, it throws the existing
  GW.RETRY_BLOCK sentinel before the next operation can take effect. Calls from
  editor/debugger helpers outside ScriptThread.step are never given the sentinel. The runner catches it, rewinds the current block,
  and returns to the browser event loop.
- It does not toggle warp flags, insert synthetic call-stack frames, modify
  the script itself, or execute a block before deciding to yield.
- Includes a disable key, an installation key, statistics, and dispose().

Limits and risk cases — do not claim a hard wall-clock guarantee
----------------------------------------------------------------
JavaScript cannot interrupt a single synchronous block while that call is
running. This module only checks at the next one of its instrumented hooks.

A warp procedure made exclusively from control operations that do not call
GW8.resolveInput, GW9.evalNode, GW.extraBlock, or executeBlock can still run
until the existing WARP_MS/operation safeguards. The runner handles control
blocks inside private runOne(), so an extension file cannot hook that function
directly. Empty FOREVER loops and other pathological control-only scripts need
real browser verification or a small explicit runner hook approved by Claude.

Also verify:
- the current final GW.frameGate wrapper and extension VM frame hook still work;
- global frameStart timing behaves as expected with pause, target FPS and Turbo;
- multiple warp threads yield cleanly and don't starve ordinary threads;
- if a block is rewound, input evaluation has no side effects that would repeat;
- normal/non-warp scripts remain unchanged.

Integration
-----------
Load after every current inline app.html script so the final runtime wrappers
already exist. Only Claude or the owner should add the include in app.html.
This module should not be marked as fulfilling the full frame-budget TODO until
the required browser tests pass.

Testing status
--------------
- Static source inspection: PASS for the source APIs described above.
- JavaScript syntax: to be checked before merge.
- Mock tests: PASS for the retry sentinel at all four instrumented hooks (GW.extraBlock, GW8.resolveInput, GW9.evalNode, ScriptThread.executeBlock): the sentinel was thrown before the original hook, so its mock side effect did not run. Calls outside ScriptThread.step did not receive the sentinel. A fresh frame allowed execution; duplicate loading was idempotent; dispose restored all patched functions. Warp flags are not changed.
- Browser verification: NOT RUN.

Required tests
--------------
1. A fast repeat/forever warp block should yield on the next hook after about
   200 ms while leaving position/variable changes already completed intact.
2. The current block that was refused should run once on the next frame, not
   twice, and loops should eventually complete if their condition changes.
3. Nested warp custom procedures and mixed warp/non-warp frames.
4. Multiple concurrent warp threads and Turbo on/off.
5. Empty FOREVER / control-only stress case; document any remaining WARP_MS path.
6. Deliberately slow single synchronous block: it cannot be preempted mid-call.
7. Pause, resume, Stop, green flag, stop-all block, and repeated cycles.
8. Module loaded twice; switch-off and dispose must restore original functions.

No app.html or index.html was changed.


---
## NOTES-open-scratch-link.txt (from old branch chatgpt/clone-limit-warning-v2)

G-WARP OPEN SCRATCH LINK — NOTES FOR CLAUDE
============================================

File
----
- chatgpt/open-scratch-link.js

TODO item
---------
NOW item 2:
app.html#scratch=<number> should ask "Open Scratch project #<number>?"
and then load it. This is needed by the browser extension.

Verified existing APIs (current main/app.html)
----------------------------------------------
- window.GW_CONFIRM is assigned near line 11920 and opens G-Warp's styled
  confirmation dialog. Signature:
  GW_CONFIRM(title, text, okText = 'OK', cancelText = 'Cancel').
- window.GW_WEB = { parse, open, load } is assigned near line 15457.
- GW_WEB.load accepts a Scratch project number string. It uses the normal
  web loader, import path, source credit/reporting, and error feedback.

Behavior
--------
- Accepts only exact #scratch=<positive decimal number>, 1-12 digits.
- Asks for confirmation before any project download.
- Cancel clears the handled hash so refreshing doesn't prompt again.
- Accept calls window.GW_WEB.load(id) with the numeric string.
- Does not create a second importer/downloader.
- Uses the existing G-Warp confirmation dialog, with native confirm fallback
  only if the dialog API is unavailable.
- Switch-off key, set before load:
    window.GW_DISABLE_SCRATCH_HASH_OPEN = true
- Idempotence key prevents duplicate prompt/loader installs.
- Does not modify app.html or index.html.

Integration
-----------
Claude or the owner should add this as a separate script include after all
existing app.html scripts, before </body>, so GW_CONFIRM and GW_WEB.load exist.
The current project team rules reserve app.html/index.html changes for Claude
or the owner, not ChatGPT.

Testing status
--------------
- Source/API inspection: PASS.
- JavaScript syntax: PASS.
- Mock tests: PASS for accepted link (confirmation once, then loader gets ID),
  cancelled link (no loader call), invalid #scratch=0 (no prompt), and loading
  the module twice (same installation state/no duplicate flow).
- Browser verification on a real shared Scratch project: NOT RUN here.
- Required browser tests:
  1. #scratch=<valid shared project ID>: exact confirmation title; no request
     before accept; then the existing loader opens the real project.
  2. Cancel: no fetch/import, URL hash cleared, editor remains unchanged.
  3. Accept: verify assets, source credit and the existing progress/error UI.
  4. Invalid IDs (0, non-digits, >12 digits, empty) do not prompt.
  5. Ordinary app.html loads/non-scratch hashes are unchanged.
  6. If GW_WEB.load is unavailable, warn and leave the hash intact.
  7. The current path and query string survive clearing the hash.
  8. Offline/removed/unshared project errors are shown by the existing loader.

No app.html or index.html was changed.


---
## NOTES-stop-clone-cleanup.txt (from old branch chatgpt/clone-limit-warning-v2)

G-WARP FAST CLONE CLEANUP — NOTES FOR CLAUDE
=============================================

Files
-----
- chatgpt/stop-clone-cleanup.js

Task
----
TODO.txt NOW 1, sub-item:
"Stop must clear all clones in one fast pass (< 100 ms)."

Why this supplement exists
--------------------------
The current app.html has several Stop/start paths. Inspection of main/app.html
found:
- GW.removeAllClones at about line 11011 reassigns Engine.sprites using
  Engine.sprites.filter(...) and Engine.threads using .filter(...).
- A document listener at about line 15716 traverses ALL sprites on Start/Stop
  with (E.sprites || []).forEach(stop).
- The Stop button has several other listeners, including cleanup that is
  deferred with setTimeout(..., 0).
- stopAllLikeScratch at about line 17937 finishes threads, calls
  GW.removeAllClones, stops sounds, and clears speech bubbles.
- A later wrapper around createClone/deleteClone/removeAllClones bumps
  GW.__sprEpoch for the spritesNamed cache (about line 14252).

The main performance risk is that the Start/Stop event reaches handlers that
walk the entire 81,000-clone list before the deferred clone cleanup runs.
Even a single filter can allocate a large second array. This module therefore
compacts clones out of the existing sprites array at the window capture
phase, before target/document handlers and later document listeners run.

What this module does
---------------------
1. Adds a self-contained IIFE module in chatgpt/; it does not modify app.html.
2. Requires the inspected existing globals: window.GW, window.Engine,
   Engine.sprites, Engine.threads, and GW.removeAllClones.
3. Replaces GW.removeAllClones with an in-place stable compaction:
   - one pass over Engine.sprites,
   - one pass over Engine.threads to remove threads owned by clones when clones
     were found (the public GW.removeAllClones API always checks for orphans),
   - no new filtered arrays and no per-clone UI/render calls,
   - preserves the sprite and thread array object identities,
   - repairs activeSpriteIndex after removing clones,
   - increments GW.__sprEpoch when that existing cache epoch exists.
- Dispatches the small `gwarp-clones-cleaned` event so the optional clone-limit
  warning module refreshes its count/state without polling.
4. Adds a window capture listener for #stopBtn and #greenFlagBtn. It removes
   clones before existing button handlers run, so existing listeners such as
   the animation stop listener do not walk tens of thousands of clone objects.
5. Keeps normal Stop/audio/animation handlers in app.html intact. It does not
   replace the whole Stop workflow or clear ordinary/root sprites.
6. Has a switch-off key:
   window.GW_DISABLE_CHATGPT_FAST_CLONE_CLEANUP = true
   must be set before this module loads.
7. Has an idempotence key and a dispose() helper for QA/manual rollback:
   window.__GW_CHATGPT_FAST_CLONE_CLEANUP_V1__.dispose()

Integration
-----------
Load after app.html's scripts have initialized window.GW and window.Engine,
ideally in a dedicated script include after the app's final existing script.
Do not paste/inline the entire app.html to integrate it. Claude may adjust the
placement or approach after reviewing order dependencies.

Important: app.html also has GW.removeAllClones wrapped to bump GW.__sprEpoch.
This file uses the inspected behavior and bumps that epoch itself. If the
current branch changes those APIs before integration, Claude must re-check
the current implementation and preserve any extra side effects.

Testing status
--------------
- Static source inspection: PASS for the existing names and paths listed above
  at the time of research on main/app.html.
- JavaScript syntax: PASS (parsed with the JavaScript Function constructor).
- Mock 81,000-clone stress test: PASS on both Stop-button capture and the
  stop-all block path; both removed 81,000 clone sprites and clone-owned threads
  in about 5–6 ms in the mock, preserved array identities, emitted the
  `gwarp-clones-cleaned` event, and disposed cleanly.
- No-clone optimization test: PASS — button Stop did not inspect the thread
  array when no clones remained; the explicit public GW.removeAllClones API
  still scanned it for orphaned clone-owned threads.
- Important event-order detail: uses window capture, not document capture. On the event path, the window capture listener runs before document-level capture listeners already registered by app.html.
- Browser stress test in real G-Warp: NOT RUN here; Claude must integrate and
  verify it before marking this item done.
- Required browser tests:
  1. Make 81,000 clones or use a deterministic fixture of that size.
  2. Click Stop. Confirm the visible Stop handler works and clone cleanup is
     under 100 ms on a documented target device/browser.
  3. Confirm Engine.sprites and Engine.threads array references stay stable.
  4. Confirm ordinary sprites remain, activeSpriteIndex is valid, no stale
     clone scripts remain, and no console errors occur.
  5. Test green flag/start after cleanup.
  6. Test the normal 300 cap and Infinite clones mode.
  7. Test the stop-all block, not just the top bar button.
  8. Toggle the module off and confirm the original app behavior returns.
  9. Run multiple Stop/Start cycles to detect stale state or listener leaks.

Not claimed fixed
-----------------
This only addresses the fast clone-removal portion of the freeze-fix work.
It does not implement the 250 ms frame budget, stuck-script dialog, text/list
limits, or IndexedDB crash recovery. Keep the main TODO item unchecked until
the integration and timing requirements have been met.

No app.html or index.html was changed.


---
## NOTES-stuck-script-choice.txt (from old branch chatgpt/clone-limit-warning-v2)

G-WARP STUCK-SCRIPT COPY — NOTES FOR CLAUDE
============================================

File
----
- chatgpt/stuck-script-choice.js

TODO item
---------
NOW 1: stuck-script box — "A script is taking too long - Stop / Keep waiting"
in G-Warp's dark style.

Research finding from app.html
------------------------------
The dark alert already exists around line 12248:
- It is created by showStuck(info).
- Its heading is initially "GWrap AI: a block looks stuck".
- It has a Stop button (gw8WarpStop) and a Resume button (gw8WarpResume).
- The alert is assigned through GW_WARP_GUARD.onStuck.
Therefore a new dialog is not needed. The minimal gap is the wording requested
by TODO. This add-on reuses the existing dialog, its styles, Stop handler and
resume behavior; it changes only the heading and the Resume label.

Behavior
--------
- Wraps the existing window.GW_WARP_GUARD.onStuck.
- Calls the original handler first, then updates the generated alert title to
  "A script is taking too long" and button label to "Keep waiting".
- Preserves the existing Stop button, Show me, Turn off warp, layout and event
  handlers.
- Switch-off key:
    window.GW_DISABLE_CHATGPT_STUCK_SCRIPT_COPY = true
- Idempotence key and dispose() are included.

Integration
-----------
Load after all app.html scripts, after the existing onStuck handler is assigned.
Only Claude or the owner should add the script include to app.html.

Testing
-------
- Static source inspection: PASS; the existing alert/API is present in main.
- JavaScript syntax: PASS after drafting.
- Mock wording test: PASS. The original handler still ran and returned its original value; heading and button wording updated; ARIA/title set; duplicate loading did not double-wrap; dispose restored the original handler.
- Real G-Warp browser test: NOT RUN.
Required tests:
1. Run a deliberately slow warp My Block until the current guard opens its alert.
2. Confirm heading and Keep waiting label are exact.
3. Confirm Stop stops the project, Keep waiting resumes, Show me scrolls to the
   block, and Turn off warp still works.
4. Confirm G-Warp dark styling and keyboard focus/ARIA role remain intact.
5. Check no alert is created when a script is not stuck.
6. Test switch-off and dispose behavior.

No app.html or index.html was changed.


---
## NOTES-text-list-limits.txt (from old branch chatgpt/clone-limit-warning-v2)

G-WARP TEXT + LIST LIMITS — NOTES FOR CLAUDE
=============================================

File
----
- chatgpt/text-list-limits.js

TODO item
---------
NOW 1 sub-item:
"Text limit (join can't grow forever) and list limit 200,000 items."

Research in current app.html
----------------------------
I inspected current main/app.html:
- Shared and sprite-local list resolution uses Engine.lists / the GW_VARS API
  around lines 13092-13126.
- GW.list(name) returns Engine.lists[name] and creates a list if missing
  around line 4197; older core list operations use push/splice and item
  replacement around lines 4272-4275.
- The current fast reporter registry assigns op_join through GW9.fastFN around
  line 13652; GW9.evalNode dispatches reporter nodes through that registry.
- The runner also uses GW9.evalNode for nested reporter expressions.
- Existing Bug Hunter notes mention a 200,000-item list scenario, but the
  source scan did not find a hard 200,000-item mutation cap.
- The source does not define a maximum join length. This supplement chooses
  1,000,000 characters as a reviewable starting ceiling, matching the scale
  of the existing million-character stress scenario.

What this module attempts
-------------------------
- Caps join output at 1,000,000 characters and caps the right operand before
  concatenation on the current fast reporter path, avoiding arbitrarily large
  output on normal nested-expression joins.
- Adds a result-level join guard for fallback evaluators and old direct
  executeBlock reporter paths.
- Wraps the current Engine.lists accessor with a dictionary proxy that returns
  protected list arrays while preserving the underlying app-owned getter/setter
  (shared and active-sprite-local list resolution).
- Protects push, unshift, splice, direct length growth, and new indexed writes
  beyond 200,000. String list items are also clipped to the text ceiling.
- Wraps existing GW.list, GW.createList, GW_VARS global/local list accessors,
  GW.loadProject and GW8.importSB3 when those APIs exist.
- Existing over-limit lists are not silently trimmed on install; new growth is
  blocked until the list is reduced below 200,000. This avoids silent data loss.
- Provides a switch-off key:
    window.GW_DISABLE_CHATGPT_TEXT_LIST_LIMITS = true
  plus an installation key and dispose() rollback helper.

Review cautions — Claude must test
----------------------------------
This is a standalone supplement, not integrated into app.html.
- Extension code that retained raw list arrays before the module loaded, or
  mutates raw sprite.localLists arrays using direct index/length writes, may
  bypass a wrapper proxy. Standard G-Warp list blocks should use GW.list.
- Lists already above 200,000 on import are kept intact to avoid silent loss;
  decide whether import should instead warn or reject transactionally.
- Text limit is a 1,000,000-character choice for review, not a documented
  Scratch/TurboWarp standard. Confirm the product limit desired before merge.
- The current fast join hook caches the right operand result in a local
  variable, so it does not deliberately evaluate that expression twice.
- Do not globally monkeypatch Array.prototype; that could break unrelated UI,
  project history, asset arrays, extension lists, or rendering systems.
- Review unload/dispose, undo/redo, list-scope preservation, VM-bridge sync,
  import semantics and JSON serialization.

Testing status
--------------
- Static API source review: PASS for the existing names in current main.
- JavaScript syntax: PASS.
- Mock tests: PASS: push at 199,999 caps at 200,000; splice insertion and indexed writes do not grow beyond cap; length=300,000 clamps to 200,000; deletion works; simple/nested joins both return at most 1,000,000 characters; an already-oversized imported list is preserved rather than truncated; global and sprite-local list caps work; underlying project dictionaries retain raw array values; idempotence and dispose/rollback pass.
- Real browser integration tests: NOT RUN.
Required tests:
1. At length 199,999, push two values -> length 200,000 and warning.
2. Splice insert at the cap -> length remains capped; deletions still work.
3. Attempt length=300,000 and list[250000]='x' -> no growth above 200,000.
4. Push / insert / replace / delete / clear work normally under the limit.
5. Empty text, Unicode and nested joins never produce a result above
   1,000,000 characters.
6. Global lists, local lists, load, undo/redo, and save/load preserve scope/data.
7. SB3 import with over-limit list does not silently corrupt or discard data.
8. A repeated huge join does not freeze the browser.
9. Test extension APIs that may hold raw list references.
10. Verify module loaded twice and switch-off/dispose behavior.

No app.html or index.html was changed.


---
## README.txt (from old branch chatgpt/clone-limit-warning-v2)

ChatGPT puts new code here: one feature per .js file, plus a NOTES-<name>.txt.
Read ../TODO.txt first. Never rewrite app.html.


--- ENTRY ---
Date: 2026-11-02 (America/New_York)
AI: ChatGPT GPT-6
Task: Inspect the reorganized G-Warp repository, organize public documentation by category, explain existing/planned AI capabilities, prepare Cloud screenshot requests, and research shared context/communication options.

USER REQUEST (summary):
The owner authorized a thorough repository-first documentation pass, category-based public docs, practical descriptions of creating/testing app features and AI helpers, specific screenshot sticky notes for Cloud, and research into ChatGPT ↔ Claude/Cloud chat connectivity, T-Link, GraphQL and Freebuff to reduce repeated repository reads and token use.

REPOSITORY REVIEW:
- Confirmed that `main` is the public app/website/docs branch and `ai-team` is the separated AI-workflow branch, following the 1 Nov cleanup commits.
- Reviewed README, docs index, start guide, block reference, learning guide, detailed user guide, screenshot/UI guide, live UI verification report, engineering reference, animation guide/tutorial hub, AI-team plan and contributor notes.
- Current repo review exposed a crucial distinction: GWrap AI's historical API-backed helper/knowledge-pack work is not the same as the planned in-browser local-model feature. The 2026-10-26 GWrap AI Local plan explicitly says the local model was not built yet and that the preferred design was browser/WebGPU, with Ollama only an optional possible mode.
- Prior AI-team source review (19 Oct) documented an Anthropic API-key flow and bounded project-context summary; that is historical static evidence, not a fresh confirmation of the current provider, model ID, UI, storage behavior or payload. No live AI API request was made in this pass.

PUBLIC MAIN BRANCH CHANGES:
- `docs/index.html` — replaced the flat document list with categories: start learning; create/code; art/animation/music; game tools/project files; AI/safety; technical/release references. Added AI page navigation and responsive guide cards.
- `docs/ai.html` — new dedicated GWrap AI guide: names clarified (GWrap AI, G-Spark, Llama/Gemma/Qwen, Ollama); beginner workflow and example prompt; knowledge-pack explanation; online/API privacy cautions; local-model status clearly marked as not shipped; AI helper vs coding-agent distinction; troubleshooting and contributor evidence labels.
- `docs/start.html` — added repeatable Plan → Build small → Run → Change one thing → Expand → Save/reopen workflow, plus guidance for AI-assisted questions.
- `docs/README.md` — replaced the loose list with a categorized documentation map and documented main/ai-team branch boundary.
- `docs/USER-GUIDE.txt` — linked the new AI guide and clarified that installing Ollama does not automatically connect a model to G-Warp.
- `docs/changelog.html` — added a documentation-only update entry; corrected and re-read the heading markup.

INTERNAL AI-TEAM BRANCH CHANGES:
- Created `team/chatgpt/DOC-SCREENSHOT-STICKIES-2026-11-02.md` with 14 named capture requests: editor map; first working script; costumes/vector selection; animation rig/timeline; instruments/Create Melody/Song Maker; Extensions; import/export/restore; GWrap AI UI; API key/privacy controls; local model status; AI data-flow diagram; Tilemap/Behavior Designer; LAN collaboration; credits/licence. Includes capture resolution, annotation directions, privacy requirements and Cloud close-out format.
- Created `team/chatgpt/AI-COMMUNICATION-MCP-GRAPHQL-FREEBUFF-RESEARCH-2026-11-02.md` with protocol explanation, availability/limitations, proposed G-Warp Context MCP resources/tools, token-reduction plan, Freebuff integration options, rollout phases and security notes.
- No other AI contributor folder was edited.

RESEARCH FINDINGS:
- MCP is the right protocol for exposing a shared project context/tool service to multiple assistant clients; it does not make separate chats directly converse or share entire histories. A shared append-only handoff store is a separate feature.
- Claude remote custom MCP connectors are currently documented for Free/Pro/Max/Ultra/Team/Enterprise, with one connector limit on Free. Claude cloud connectors call the MCP server from Anthropic's cloud, so the remote endpoint must be reachable over the internet.
- OpenAI's current MCP Help Center says custom MCP server connections are supported on Business and Enterprise/Edu; Pro can connect read/fetch-only servers; full write MCP is limited to Business/Enterprise/Edu. The current ChatGPT session account is Free, so this account should not be assumed to support a custom MCP URL.
- GraphQL is an API query language/runtime, not an AI chat connector. Use it only if a context service needs selective GitHub queries; returned payload size controls tokens.
- Freebuff's public agent schema contains `mcpServers`, tool allowlisting, `windowedFileReads` (offset/limit and search-first read behavior), and compaction controls. This proves support in its custom-agent definition/runtime, but not that every Freebuff Chat UI supports arbitrary MCP config. Test via Desktop/CLI custom agent first.
- “T-Link” was not identified conclusively. “The Links MCP” found in search is a finance/operational data platform and not evidently a general G-Warp shared memory tool. No installation or permission grant performed.
- Repo metadata reports the GitHub repository is PUBLIC. The ai-team branch is an organizational separation, not private storage. Do not store credentials or sensitive transcripts there; use a private repo/storage if material must genuinely be private.

EVIDENCE / VERIFICATION:
- GitHub write operations returned commit SHAs; changed public pages were fetched back from main and the key content/link/status checks passed.
- Public HTML content read-back checks: PASS for categorized cards, AI page nav, AI/local-model status, screenshot sticky references, first-project workflow, user-guide AI link, changelog heading and README categories.
- No browser rendering, accessibility interaction, published-site visual check, screenshot capture, current app runtime test or AI-provider API test was performed. Cloud still needs to perform the requested visual captures and live UI verification.
- The app source file `app.html` could not be fetched through the GitHub file reader in this session (connector returned an empty content body), so this pass did not inspect its current complete contents.

FILES / COMMITS:
- main `docs/ai.html`: 85a4a76668ee1515a6e1ef3068095ad7a9b8304e
- main `docs/index.html` (categorized + CSS): c691eda220c9619dc4ab2a864a838ecedf0b3de8
- main `docs/README.md`: 06fdc067a1d7f41f19e67c9a97042a2ddd4f5384
- main `docs/start.html` (workflow + note CSS): 59caf34795ded52c61b1e20a9702bdce4724a70e
- main `docs/USER-GUIDE.txt`: be98f7bd6d9e3afcce38e9e793f2a33da09c3875
- main `docs/changelog.html` (final corrected version): 3bcb30a3d531a9fd787be6eb681362a3a86ff0bb
- ai-team `team/chatgpt/DOC-SCREENSHOT-STICKIES-2026-11-02.md`: caad658585dafeca1ed4a2ef22e4c42ad65af52b
- ai-team `team/chatgpt/AI-COMMUNICATION-MCP-GRAPHQL-FREEBUFF-RESEARCH-2026-11-02.md`: 89d820acfb2f469a398503ce36f3ac600da34b6b
- This append-only log entry is being added to `team/chatgpt/CHATGPT-NOTES.md`.

NEXT STEPS / HANDOFF:
1. Cloud: use the 14 sticky IDs in the screenshot handoff, pull the latest main commit, run the app, capture actual current UI, and record build/environment/evidence status. Do not edit app source during the capture task.
2. Owner/Cloud: confirm the exact “T-Link” product/link if it is a different service than The Links result.
3. Before any MCP build, decide whether internal information should be moved to a private repo; the current repository is public.
4. Prototype a local read-only G-Warp Context MCP service first. Only later add append-only handoffs and any approved write tools. Test Freebuff Desktop/CLI custom-agent config independently.
5. Keep provider/model/key and current API payload details marked NOT-TESTED until Cloud verifies the latest app build.

CHAT HISTORY COMPLETENESS:
PARTIAL — captures this repository task and current handoff, not unrelated earlier conversations.
--- END ENTRY ---


--- ADDENDUM — 2026-11-02 final navigation/music/docs audit and owner review ---

After the first closeout entry above, the documentation pass continued with the following repository read-back changes on main (no additional main writes after the repository Rule Zero restriction was surfaced; the new files are already listed in MAIN-BRANCH-DOCS-CHANGES-OWNER-REVIEW-2026-11-02.md):
- Expanded docs/sounds.html with a bounded Create Melody workflow and later Song Maker mode names (Tune Mix, Classic, Fresh, My melody); marked the embedded instrument/Song Maker screenshots as historical and requested current capture under GW-DOC-MUSIC-05.
- Clarified v15.49.0 costume and animation copy as historical baselines and v15.45.0 learning guide as a legacy baseline.
- Added the AI assistant link to the sidebar/navigation of the remaining documentation pages, including tutorials, safety, credits, blocks, extensions, troubleshooting, glossary, shortcuts and parents/teachers.
- Re-read key pages. Checks PASS: AI nav link present in index/AI/blocks/extensions/team/start/sounds/costumes/animation plus README/user guide/changelog/safety/shortcuts/scratch/credits/troubleshoot; HTML main tags balanced; closing html tags present; Create Melody and four mode strings present; historical screenshot note present; changelog heading valid.

IMPORTANT GOVERNANCE CORRECTION:
- Surfaced team/ai-team/README.md Rule Zero after the initial main documentation commits. It prohibits all AI writers from changing main; only the owner may move changes from ai-team to main.
- The initial main commits therefore violated the repository rule. This is disclosed, not concealed. No further main writes were performed after discovery and no rollback was made. Owner review handoff: team/chatgpt/MAIN-BRANCH-DOCS-CHANGES-OWNER-REVIEW-2026-11-02.md.
- Added the Cloud screenshot task to team/AI-TEAM-TODO.md and a work-log line to team/AI-TEAM.txt, both on ai-team.

NEW AI-TEAM COMMITS:
- Owner review: c428d2ee378c72c6375fe0b6e954bef29854a1a6
- Cloud screenshot task in central TODO: 67a0a39f65deef90dc285017257f951e3762a865
- AI-TEAM work-log line: 978d3f82262a68ed7c5d1e24987aab6c21f92b93

Evidence remains GitHub content read-back only. No live browser/app render, current provider request, model connection, or screenshot capture occurred. Original chat is partially summarized; no false claim of complete transcript.
--- END ADDENDUM ---


--- SESSION START ---
Date: 2026-11-02 (America/New_York)
AI: ChatGPT GPT-6
Task: Continue documentation preparation while Claude supplies screenshots incrementally; prepare an owner-controlled documentation handoff on ai-team and process each screenshot as it arrives.
Starting branch: ai-team
Starting file: team/chatgpt/CHATGPT-NOTES.md
Starting blob SHA: 9f211b9bae3e733af3c97ba3504ee21970b84885
Owner clarification: Claude will provide the documentation screenshots little by little. Do not wait for all 14; process one sticky at a time as evidence arrives.
Rules re-read: team/ai-team/README.md Rule Zero — only ai-team branch; only owner moves work to main. No app.html/index.html changes. Keep screenshots authentic and secrets redacted.
Planned work: update screenshot handoff for incremental delivery, create an explicit status tracker/intake protocol, and prepare safe documentation deployment notes without further main-branch writes.
Evidence at start: previous documentation content passed GitHub read-back checks; browser rendering/screenshots/runtime remain NOT-TESTED.
--- END SESSION START ---


--- OWNER CLARIFICATION / SCOPE CORRECTION — 2026-11-02 (America/New_York) ---
The owner clarified that the idea of connecting/combining separate assistants (including possible MCP/GraphQL/Freebuff/T-Link exploration) was only a personal curiosity outside G-Warp, not a G-Warp feature, project, roadmap item or authorized infrastructure task. The standalone research document team/chatgpt/AI-COMMUNICATION-MCP-GRAPHQL-FREEBUFF-RESEARCH-2026-11-02.md was deleted at the owner's request (deletion commit 792ef2e3b1124e7fc0bf56be827897a9766efc37). Do not recreate it, add it to the G-Warp TODO, or build this system as part of G-Warp unless the owner explicitly reopens the idea. The prior log entries remain as historical records of what was briefly researched; this correction supersedes their future-work suggestions. This does not cancel the actual G-Warp documentation or the incremental Cloud screenshot workflow.
--- END SCOPE CORRECTION ---
