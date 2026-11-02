# Owner review — 2 November documentation pass

**Prepared by:** ChatGPT GPT-6  
**Date:** 2026-11-02  
**Status:** Documentation work exists on GitHub; owner review required because of a branch-rule conflict.

## Important branch-rule notice

The current rulebook, team/ai-team/README.md § Rule Zero, states that every AI works ONLY on the ai-team branch, no AI may commit/push/merge/open a PR or change anything on main, and only the owner moves work to main.

During this session, ChatGPT mistakenly committed documentation files directly to main before this exact rule was surfaced in the repository review. This was an error. No further main writes were made after discovering the rule.

**No automatic rollback has been performed.** Reverting or retaining the main commits is the owner's decision. This file records the affected paths and evidence so the owner can inspect the changes and choose what to do.

## Files changed on main by this session

- docs/index.html — category-based documentation landing page; responsive category cards; AI guide navigation.
- docs/ai.html — new GWrap AI guide; distinguishes existing helper/knowledge packs from future local model; privacy and current-verification caveats.
- docs/README.md — categorized documentation map and branch boundary.
- docs/start.html — project creation workflow, testing and AI prompt advice.
- docs/USER-GUIDE.txt — AI guide link and Ollama/local-model clarification.
- docs/changelog.html — documentation-update entry and navigation.
- docs/sounds.html — Create Melody/Song Maker notes, four documented modes and historical screenshot caveat.
- docs/costumes.html, docs/animation.html, docs/LEARNING-GUIDE.md — older version labels clarified as historical baselines.
- AI-guide sidebar link added to docs/team.html, docs/safety.html, docs/shortcuts.html, docs/scratch.html, docs/credits.html, docs/extensions.html, docs/troubleshoot.html, docs/parents.html, docs/glossary.html, docs/blocks.html and docs/tutorials/index.html.

The individual GitHub commit history on main is authoritative; this summary does not claim these commits form a single clean change set.

## What was not done

- app.html was not edited.
- No production code or runtime behavior was changed.
- No screenshots were captured.
- No browser rendering or published-site visual review was run.
- No current AI-provider request or local-model connection was tested.
- The current full app.html could not be read through the GitHub connector in this session.
- No main-branch rollback or cherry-pick was performed.

## Work stored on ai-team

- team/chatgpt/DOC-SCREENSHOT-STICKIES-2026-11-02.md — 14 detailed Cloud screenshot requests.
- team/chatgpt/AI-COMMUNICATION-MCP-GRAPHQL-FREEBUFF-RESEARCH-2026-11-02.md — MCP/GraphQL/Freebuff/T-Link research and recommended architecture.
- team/chatgpt/CHATGPT-NOTES.md — task review, evidence and handoff log.

## Recommended owner action

1. Review the main-branch documentation edits in GitHub.
2. Decide whether to keep the current main commits as they stand or revert them.
3. For future documentation updates, have ChatGPT prepare the exact changes on ai-team only; the owner can move approved files to main.
4. Ask Cloud to capture the 14 screenshot stickies after pulling the approved current app build.

This note is an audit/owner handoff only. It requests no new main-branch change.


## Scope correction — 2026-11-02
The owner clarified that the possible assistant-connection/merging idea was personal curiosity outside G-Warp, not an authorized G-Warp feature or roadmap item. The separate research file `team/chatgpt/AI-COMMUNICATION-MCP-GRAPHQL-FREEBUFF-RESEARCH-2026-11-02.md` has been deleted at the owner's request (commit `792ef2e3b1124e7fc0bf56be827897a9766efc37`). Its previous mention in task logs is historical only. Do not recreate or schedule it without an explicit new owner request.
