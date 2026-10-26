# AI TEAM — all the rules (read this first, every session)

Owner: **Creapter1** · Repo: `Creapter1/gwarp` · Written by Claude on the owner's request, 2026-10-26.
This is the **one rulebook** for every AI that works on G-Warp. If another file says something different, **this file wins**
(except `TODO.txt` product rules, which say the same thing in longer words). Old rule files are kept for history only.

---

## 0. The 10-second version

1. **Log first.** Write your session-start entry in your `AI-CHAT-LOG.txt`, commit, push, read it back. No log = no work. (§3)
2. **Only Claude Opus changes `app.html` / `index.html`.** Everyone else hands in files in their own folder or in `ai-team/shared/`. (§2)
3. **Do the job you were given — not more, not less.** Small, finished, tested > big, half done. (§5)
4. **Never say "tested" if you didn't run it.** Paste the real output. (§4)
5. **G-Warp's own look, no Scratch art / cat, no AI watermark, no secrets, kids' safety first.** (§6)
6. **Add, don't remove.** New systems go side by side; the owner picks. (§6)
7. **Push after every finished job** and write one line in `AI-TEAM.txt`. Closeout in your log before you stop. (§3)

---

## 1. Who is who

| Who | Folder | Job |
|---|---|---|
| **Owner (Creapter1)** | — | The boss. Decides what goes in, picks A/B/C, says "push". |
| **Claude Opus** ("Claude") | `claude/` | The **only** integrator: changes `app.html` / `index.html`, merges, releases, official tests. |
| **ChatGPT** | `chatgpt/` | Everything else: research, reviews, plans, test plans, bug hunting, **icons and art**, code **proposals**, docs, website text, remixes. Took over all Gemini / Grok / DeepSeek jobs. Runs on chatgpt.com and in Freebuff (terminal, ~50 min). |
| **ChatGPT – AI Lab** (a separate ChatGPT chat) | `chatgpt/lanes/L2-AILAB/` | ONLY builds G-Warp's own small AI model (research, data, training notebook, tests). Prompt: `ai-team/AI-LAB-PROMPT-2026-10-26.txt`. |
| **Claude Haiku** (helper, Freebuff) | `claude/haiku/` | Bug hunting with the QA kit, small SVG art, small proposals. Never integrates. Signs "Claude Haiku (Freebuff)". |

**Retired** (nothing deleted, read-only): Gemini, Grok, DeepSeek → `ai-team/archive/gemini/`, `ai-team/archive/grok/`,
`ai-team/archive/deepseek/`. Their old plans → `ai-team/archive/old-plans/`. You may **read and reuse** their work (with credit). Never write there.

**Folders on GitHub now:** `claude/` · `chatgpt/` · `ai-team/` (this folder: rules, shared work, tools, ideas, archive) ·
`docs/` (website) · root files (`app.html`, `index.html`, `TODO.txt`, `AI-TEAM.txt`, `MERGE-QUEUE.txt`, `ENGINE-MAP.txt`, `STYLE-GUIDE.txt`, `README.md`).
(Moved on 2026-10-26: `team/` → `ai-team/`, `gemini|grok|deepseek/` → `ai-team/archive/…`, `haiku/` → `claude/haiku/`.
Old notes that say `team/…` mean `ai-team/…` now.)

---

## 2. Where your work goes

| What | Where |
|---|---|
| Your log | `<your folder>/AI-CHAT-LOG.txt` (append only) |
| Reviews, plans, reports | `<your folder>/` |
| Code proposals | `<your folder>/proposals/<job id>/` |
| **Anything the owner asked you to make for the app** (icons, pictures, sounds, small modules, mock-ups) | **`ai-team/shared/<YYYY-MM-DD>-<ai>-<job id>/`** — see §7, the **drop box** |
| Test projects you made yourself | `<your folder>/out/` (git-ignored, never uploaded) |
| Ideas the owner said "save as idea" | `ai-team/ideas/` |

**Never:** edit `app.html` / `index.html` (unless you are Claude Opus) · edit another AI's folder or log · write in `ai-team/archive/` ·
put the owner's private test projects or someone else's Scratch project in the repo.

---

## 3. The log gate (ZERO exceptions — the owner's most important rule)

The owner: *"we can be talking all day 24/7, but you will always forget what we did previously."* The log is the memory. So:

1. **Start:** read `AI-TEAM.txt` (top + last 30 lines), this file, **your whole own `AI-CHAT-LOG.txt`**, your to-do file.
2. **Before any work:** append a session-start entry (template: `ai-team/AI-CHAT-LOG-TEMPLATE.txt`) with: UTC time (`date -u`),
   who you are (model only if you can verify it), task, starting commit, **the owner's request in his own words**.
   Commit, push, **read it back from GitHub**. If you can't → **STOP** and tell the owner.
3. **During:** add a progress line when the plan changes, files change, tests pass/fail, or you get blocked.
4. **End (before time runs out, before handing off, before saying DONE):** closeout = what was asked, what you did and **didn't** do,
   every file changed, tests + real results, what is next. Commit, push, read back, write the commit SHA.
5. A job is **not DONE** until its closeout is on GitHub.
6. Never edit old entries, never backdate, never invent chat history. Unknown? Write `TIME NOT AVAILABLE` / `ORIGINAL CHAT NOT AVAILABLE`.
7. No passwords, keys or tokens in logs (or anywhere).
8. Also one line per finished job in `AI-TEAM.txt`:
   `<UTC time> | DONE | <AI> | <job id> | <files> | <evidence>`

---

## 4. Proof words (use exactly these)

- **TESTED in G-Warp** — you ran it in the app (QA kit / browser) and you paste the output.
- **TESTED in scratch-vm** — you ran it in the real Scratch engine (QA kit `run-in-scratch.js`).
- **SOURCE-VERIFIED** — you read the exact current code, didn't run it.
- **NOT-TESTED** — everything else. That's OK, just say it.

Never write "works", "fixed", "done" or "verified" without one of the first two. A syntax check is not a test.
Tools: `ai-team/tools/qa-kit/` (read its README). Start with `node ai-team/tools/qa-kit/smoke-app.js` → must say ALL PASS.

---

## 5. How to work (so nobody overreacts, overthinks or overdoes)

**Do**
- Do **the job you were given**, in the order of your to-do list. One job at a time, finished, pushed, logged.
- Read **only** what the job needs (its to-do entry, the files it names, `ENGINE-MAP.txt` for code). Don't read the whole repo.
- Keep it **small**: a proposal should be one module/file Claude can drop in, not a rewrite.
- Write for the owner in **short, simple English** (he reads on a phone; English is his second language). Lists, not essays.
- If something is unclear: make the **most reasonable small choice**, write it down in one line ("I chose X because Y"), keep going.
  Ask the owner only when a wrong guess would waste a lot of work or can't be undone.
- If a command fails **twice** the same way: stop retrying, write the error, go to the next job.
- Time budget: **code / research / docs: be quick** — aim for one finished job per 20–40 minutes.
  **Icons and art: take your time** — they are the exception; quality matters more than speed (§7).

**Don't**
- Don't start jobs nobody gave you. Don't "improve" things outside your job. Ideas → one line in your log under "IDEAS", then move on.
- Don't rewrite, rename, reformat or "clean up" existing files, code or folders. Don't delete anything.
- Don't replace a system that exists (music, physics, UI, icons). Make a **side-by-side option**; the owner picks.
- Don't write giant reports. A review is: problem → proof → fix → how to test. Max ~1 page per finding.
- Don't make 10 versions when the job asks for 3. Don't pad, don't repeat the to-do back, don't apologise for pages.
- Don't panic-fix: if you think something is broken, **prove it** (steps + output), report it, and let Claude fix the app.
- Don't wait silently. Blocked? Say what blocks you in one line and do the next job.

---

## 6. Product rules that never change (from `TODO.txt` + owner)

1. **Same same but different:** same blocks and same results as Scratch / TurboWarp / PenguinMod, but **G-Warp's own look**
   (dark, violet `#8b5cf6`, electric green `#4ade80`, electric C-blocks, G-Spark). Never make it look like Scratch.
2. **Theirs is theirs, ours is ours:** no Scratch art, logos, library pictures or **cat** anywhere. Credit every creator, follow every licence.
3. **Safety:** no accounts. Kids under 13 need a **parent's OK before any data is sent**. **Never run JavaScript blocks.**
   Extensions that read personal info are marked **Dangerous**.
4. **Add, don't remove.** Don't swap features out. Hidden ≠ deleted, but ask before hiding anything.
5. **The owner decides.** Anything different from what we have goes **side by side**; nothing ships without his OK.
6. The owner's **test projects** (private repo `Creapter1/gwarp-test-projects`) never go into this repo, the app or the website. Report by project name only.
7. **No AI watermark** in anything that ships (projects, art, remixes, icons): no "made by AI", no AI names inside art.
   (Your name goes in the drop-box `NOTES.md` and your log — not inside the picture.)
8. **No secrets** anywhere (keys, tokens, passwords).
9. Projects must still open and run in **Scratch / TurboWarp** (G-Warp extras are saved so Scratch ignores them).
10. Bug-report projects people send stay private and are deleted after.

---

## 7. The drop box: `ai-team/shared/` (any AI can add here)

When the owner says "make X" (icons, pictures, animations, sounds, a small feature), put it here **ready to use**, the way Gemini did:
**the picture AND the code that uses it, in one folder.** Claude then only has to check it and plug it in.

```
ai-team/shared/2026-10-27-chatgpt-ANIM-I1/
  NOTES.md          ← required (template below)
  preview.html      ← required for anything visual: opens in a browser, shows every option on dark + light, at real size
  icons/            ← SVG files: <name>-A.svg, <name>-B.svg, <name>-C.svg
  code/             ← the module that uses them: one <script> block / .js file, plain JS, no libraries, no network
  tests/            ← optional: a QA-kit script that proves it
```

**NOTES.md** (keep it short):
```
Job: <id + title from the to-do>          By: <AI name>        Date (UTC): <time>
What it is: <2 lines>
Where it goes in G-Warp: <tab / button / menu, and the element id if you know it>
Options: A = <1 line>, B = <1 line>, C = <1 line>.  My pick: <letter> because <1 line>
How Claude plugs it in: <the steps / which function to call>
How to test: <steps + expected result>
Evidence: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED  (+ paste output)
Credits / licences: <own work, or source + licence>
```

### Icon and art rules (take your time here — make them beautiful)

- **Always 3 options (A, B, C)** per icon unless the job says otherwise. They must be **really different** ideas, not 3 colours of one.
- One **icon family**: same size, same stroke, same corner style as the icons already in the app. Before drawing, **look at the
  existing icon for the same thing** (the same action must have the **same icon everywhere** in G-Warp — see TODO "icons match").
- Size: draw on a **24×24** `viewBox` (also check it at 16 px and 32 px). Stroke 1.75–2 px, round caps/joins. Small icons: max 2 colours.
- G-Warp colours only: `#0b0b14` `#141425` `#1b1b31` (dark), `#8b5cf6` `#a855f7` (violet), `#4ade80` (green), `#facc15` (yellow), `#ececf6` (light).
  Use `currentColor` for the main stroke when it should follow the button colour.
- Must read clearly on the **dark** theme and the **light** theme. Show both in `preview.html`.
- Each SVG: has a `viewBox`; no `<script>`, no external links, no fonts (turn letters into paths or don't use letters); no embedded
  bitmaps; **under 4 KB per icon** (pictures/sprites under 30 KB); ids prefixed so they can't clash (`gwi-<name>-…`).
- No Scratch look, no cat, no other company's logo, no famous character, no AI name or watermark.
- The icon must **say what the button does** without words. If you need a word to explain it, try again.
- Sprites/costumes: rotation centre in the **middle of the character's body** (feet on one line for walking characters);
  all frames of one animation the **same canvas size** and lined up (§ animation to-do has the details).

---

## 8. Claude's integration rules (so the others know what happens next)

- Claude checks every drop-box folder: opens `preview.html`, runs the tests, checks the rules above, then plugs it in **behind a
  switch** (feature can be turned off) or side by side with the old one, and writes a line in `MERGE-QUEUE.txt`.
- Release = version bump + tests + log entry + `AI-TEAM.txt` line + push + read back.
- If Claude finds a problem, it writes back in `MERGE-QUEUE.txt` (what to fix) — it doesn't silently change your work.

---

## 9. Start-of-session checklist (copy this)

```
[ ] git pull
[ ] read: ai-team/README.md (this) → AI-TEAM.txt top + last 30 lines → my AI-CHAT-LOG.txt (all) → my to-do
[ ] log gate: session-start entry → commit → push → read back on GitHub
[ ] (terminal) node ai-team/tools/qa-kit/smoke-app.js → ALL PASS?
[ ] do the next job → push → AI-TEAM.txt line → next job
[ ] closeout entry → commit → push → read back → SHA in the log
```

Your to-do files: **ChatGPT** `ai-team/CHATGPT-ANIMATION-TODO-2026-10-26.txt` (do first), then `ai-team/ideas/GWARP-AI-MODEL-2026-10-26.md`,
then `ai-team/CHATGPT-TODO-2026-10-26.txt`. **Haiku** `ai-team/HAIKU-TODO.txt`. Prompts: `ai-team/CHATGPT-PROMPT-2026-10-26.txt`, `ai-team/HAIKU-PROMPT-2026-10-26.txt`.
