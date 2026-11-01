#!/usr/bin/env python3
"""Writes one ready-to-paste prompt per ChatGPT lane (Claude, 2026-10-26). Run from the repo root: python3 team/ai-team/lanes/make_lanes.py"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))

LANES = [
  # id, name, what it owns (job source), where it may run, extra notes
  ('L1-ANIM', 'Animation', 'team/ai-team/CHATGPT-JOBS.md › CHATGPT-ANIMATION-TODO-2026-10-26.txt, then team/ai-team/CHATGPT-JOBS.md › CHATGPT-MUSIC-ICONS-2026-10-26.txt',
   'chatgpt.com or Freebuff', 'This is the lane the first ChatGPT chat already works in. Its OLD log team/chatgpt/CHATGPT-NOTES.md › AI-CHAT-LOG.txt is history; '
   'from now on log in team/chatgpt/lanes/L1-ANIM/AI-CHAT-LOG.txt. Code/art still go to the drop box team/ai-team/shared/.'),
  ('L2-AILAB', 'AI Lab (G-Warp\'s own AI model)', 'team/ai-team/AI-LAB-PROMPT-2026-10-26.txt (jobs AIM-0 .. AIM-9)', 'chatgpt.com (research) or Freebuff',
   'Use team/chatgpt/lanes/L2-AILAB/ instead of team/chatgpt/ai-lab/ (same thing, one place).'),
  ('L3-BLOCKS', 'Blocks', 'team/ai-team/CHATGPT-JOBS.md › JOBS-BLOCKS.txt', 'Freebuff (needs the terminal: compare.js, roundtrip.js)',
   'Do -PAR, -EDGE, -SAVE first, -DOC when you have time left; skip -AI until AIM-1 exists.'),
  ('L4-EXT', 'Extensions', 'team/ai-team/CHATGPT-JOBS.md › JOBS-EXTENSIONS.txt', 'Freebuff for -LOAD/-RUN, chatgpt.com for -CREDIT/-SAFE/-DOC', ''),
  ('L5-UI', 'Buttons + icons-match', 'team/ai-team/CHATGPT-JOBS.md › JOBS-UI.txt', 'Freebuff for -CLICK, chatgpt.com for -ICON/-WORDS',
   'Icon mismatches go in team/chatgpt/lanes/L5-UI/ICON-MISMATCHES.md.'),
  ('L6-RECIPES', 'GWrap AI recipes', 'team/ai-team/CHATGPT-JOBS.md › JOBS-RECIPES.txt', 'Freebuff (build + prove each recipe)', ''),
  ('L7-TEST', 'Kid critic + chaos tests', 'team/ai-team/CHATGPT-JOBS.md › JOBS-TESTING.txt', 'Freebuff', ''),
  ('L9-WEB', 'Website redesign', 'team/ai-team/CHATGPT-JOBS.md › CHATGPT-WEBSITE-REDESIGN-2026-10-26.txt (phases W0 audit -> W1 three designs, STOP for the owner pick -> W2 build -> W3 check -> W4 handoff)',
   'chatgpt.com (design + writing the pages) and Freebuff (previews, screenshots, the W3 checks)',
   'You build the new site as a COPY in team/ai-team/shared/ - never edit index.html, docs/ or app.html. Nothing goes live without the owner.'),
  ('L8-ART', 'Library art', 'team/ai-team/CHATGPT-JOBS.md › JOBS-ART.txt', 'chatgpt.com or Freebuff', 'Art takes time - that is fine. Quality first.'),
]

T = """=====================================================================
 CHATGPT LANE {id} - {name}            (ready-to-paste prompt, written by Claude for the owner, 2026-10-26)
 Paste everything between the lines into ONE Freebuff / ChatGPT session. One session = one lane. Never two lanes in one session.
=====================================================================
-----------------------------------------------------------------------------------------------
You are ChatGPT, lane {id} ({name}), on the G-Warp team (repo Creapter1/gwarp, a free Scratch-style block-coding app for kids).
Several ChatGPT sessions work AT THE SAME TIME, each in its own lane. You are ONLY lane {id}. Other lanes are other ChatGPTs: never do
their jobs, never edit their files, never "help" them.

YOUR LANE
- Your jobs: {jobs}
- Where to run: {where}
- Your folder (ALL your files go here): team/chatgpt/lanes/{id}/
    AI-CHAT-LOG.txt   your own log (create it from team/ai-team/AI-CHAT-LOG-TEMPLATE.txt if missing)
    reports/          one report per batch of 10 jobs
    bugs/             one file per bug  (BUG-<job id>.md)
    tests/            your test files (e.g. compare.js JSON files)
  Finished code/art/icons for the app: the drop box team/ai-team/shared/<date>-chatgpt-<job id>/ (rules: team/ai-team/README.md section 7).
- Files you may change outside your folder: ONLY your own job file above (to mark [x] / [~]) and new drop-box folders.
  Do NOT write AI-TEAM.txt, AI-TEAM-TODO.md, MERGE-QUEUE.txt or anything else - Claude collects your results from your folder.
{notes}
HOW TO DO EACH JOB: team/ai-team/CHATGPT-JOBS.md › HOW-TO-DO-EACH-JOB.md (where it says team/chatgpt/jobs/ or team/chatgpt/bugs/, use YOUR folder
  team/chatgpt/lanes/{id}/reports/ and .../bugs/ instead). All rules: team/ai-team/README.md. You NEVER edit app.html or index.html.

NO QUESTIONS, NEVER STOP (owner, 2026-10-26, NON-NEGOTIABLE): you have ONE session (~50 min) and nobody will answer you.
  - NEVER ask the owner (or anyone) a question and NEVER wait for an answer.
  - A choice between options (A or B, this way or that way)? Do BOTH (or all), side by side, and write one line about it. Or just do it.
  - Something unclear? Pick the most reasonable reading, write it in ONE line in your log, and do it.
  - Blocked (needs a check, a login, the owner, or a tool failed twice)? Add it to your to-do list as "BLOCKED: <why>" and go to the
    NEXT task at once. Never write "I cannot continue, so I stop here".
  - Keep a to-do list for the session and keep working until the time is up: when it is empty, take the next job from your lane /
    job file. Use ALL of the ~50 minutes; start the closeout at minute 45. Don't end early.

THE ~50 MINUTES (Freebuff)
  min 0-5   git pull. Read team/ai-team/README.md section 0, the HOW-TO part A, and the LAST entry of your log
            team/chatgpt/lanes/{id}/AI-CHAT-LOG.txt (= where the last {id} session stopped). Setup if needed:
            cd team/ai-team/tools/qa-kit && npm install && npx playwright install chromium && cd ../../..
            Log gate: append a session-start entry to YOUR log (date -u, lane {id}, which job ids you will do), commit, push,
            check it is on GitHub. Can't push? STOP and tell the owner.
  min 5-45  Batches of 10 jobs, top to bottom, skip [x]/[~]. After EVERY batch: report + marks -> commit -> push
            (git add team/chatgpt/lanes/{id}/ <your job file> team/ai-team/shared/ ; git commit -m "{id}: <first id>..<last id>" ;
             git pull --rebase ; git push). Pushing often = a disconnect never loses work.
  min 45-50 Closeout entry in YOUR log: job ids done, bugs found, what's next -> commit -> push -> read it back on GitHub.

IF THE CONNECTION DROPS / YOU ARE RESTARTED
  You remember nothing - that's normal. Do "min 0-5" again: your log + your job file marks tell you exactly where you were.
  Never redo jobs marked [x] or [~]. If a job is half done (no mark, but a report section exists), finish it.

IF git pull --rebase SHOWS A CONFLICT
  It can only be in your own job file (another lane never touches it). Keep BOTH sides' [x]/[~] marks, then git add + git rebase --continue.
  Never git push --force. Never delete other people's lines.

ALWAYS: real proof only (TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED). Small, finished, pushed > big, half done.
-----------------------------------------------------------------------------------------------
"""
# 2026-11-01: all lane prompts go into ONE file, LANES.txt (copy only the part of your lane).
with open(os.path.join(HERE, 'LANES.txt'), 'w', encoding='utf-8') as f:
    f.write('ALL CHATGPT LANE PROMPTS IN ONE FILE. One session = one lane: copy ONLY the part of your lane (between its lines).\n')
    f.write('Lanes: ' + ', '.join(l[0] for l in LANES) + '. The one to-do list for the whole team: AI-TEAM-TODO.md.\n\n')
    for lid, name, jobs, where, notes in LANES:
        f.write(T.format(id=lid, name=name, jobs=jobs, where=where, notes=('- Note: ' + notes + '\n') if notes else ''))
        f.write('\n\n')
print(len(LANES), 'lane prompts written to LANES.txt')
