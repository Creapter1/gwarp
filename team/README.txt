G-WARP TEAM WORKSPACE

This folder holds the shared work plan, per-contributor task lists, and handoff notes so the repository root stays focused on the product.

START HERE
1. Read ../AI-TEAM.txt
2. Read ../TODO.txt
3. Read AI-WORK-PLAN.txt
4. Read ../ENGINE-MAP.txt before any code proposal
5. Check ../MERGE-QUEUE.txt before duplicating work
6. Read CONTINUOUS-WORK-QUEUE.txt and your own task list
7. ChatGPT maintains CROSS-AI-REVIEW-2026-10-15.txt; every AI may review peers' work and must report findings without editing another AI's folder

AUTHORITY
Creapter1 is the owner and final approver. All AIs may inspect/use the app, research, test, write fixes, and prepare code proposals. By default, candidates stay in the contributor's own folder. When explicitly assigned, any AI may place only uniquely marked, inert, non-executing proposal code in app.html/index.html; it must not connect that code to live behavior. Claude Opus 5.5 is the only AI authorized to connect/integrate proposals, conduct official side-by-side runtime/visual comparisons and screenshots, resolve conflicts, and prepare releases. Verify the active model label is exactly Claude Opus 5.5 before that work; otherwise stop. Owner approval is required for integration/releases.

Key workflow files: AI-WORK-PLAN.txt (stages and rules), CONTINUOUS-WORK-QUEUE.txt (next tasks), CROSS-AI-REVIEW-2026-10-15.txt (current static review), TODO-CHATGPT.txt (reviewer queue), and FUTURE-IDEAS.txt (owner-controlled ideas).

Files in this folder are still public because the repository is public. This folder reduces root clutter; it does not hide files from visitors or create privacy.

 
DEEPSEEK TEMPORARY-COVERAGE RULE (2026-10-15)
ChatGPT, Grok, Gemini, and Claude can work directly on GitHub; DeepSeek currently cannot. If an open DeepSeek task has no meaningful progress for two consecutive team check-ins/session cycles, mark it TEMP COVERAGE OPEN (the owner may open it sooner). Any AI that has officially completed its own assigned task may claim that open task if it has the relevant skills and time. Record the claim in AI-TEAM.txt and the shared queue before starting. Do not wait idle, duplicate actively progressing work, edit deepseek/, or claim the work was completed by DeepSeek. Keep all candidate files in the covering AI's own folder. Create a short plain-TXT handoff using team/DEEPSEEK-RETURN-HANDOFF-TEMPLATE.txt and label the candidate/report TEMP COVERAGE / NEEDS DEEPSEEK REVIEW. When DeepSeek returns, it reviews the report and candidate, verifies the evidence, corrects/adapts the work in deepseek/ where appropriate, and records its disposition. Temporary coverage does not authorize live integration; Claude's existing authority/model-verification gates and the owner's approval remain unchanged.
