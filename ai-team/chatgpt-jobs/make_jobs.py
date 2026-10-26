#!/usr/bin/env python3
"""Makes ChatGPT's job lists from G-Warp's own data (Claude, 2026-10-26). Run from the repo root:
   python3 ai-team/chatgpt-jobs/make_jobs.py
It rewrites the JOBS-*.txt files but KEEPS every [x] / [~] mark already in them (matched by job id)."""
import json, re, os, glob

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'ai-team', 'chatgpt-jobs')
app = open(os.path.join(ROOT, 'app.html'), encoding='utf-8').read()
blocks = json.load(open(os.path.join(ROOT, 'ai-team', 'gwrap-blocks.json')))['blocks']
gallery = json.loads(re.search(r'id="gw10GalleryData">(.*?)</script>', app, re.S).group(1))
pack = json.load(open(os.path.join(ROOT, 'claude', 'gwrap-pack.json')))
titles = sorted({t.strip() for t in re.findall(r'title="([^"]{4,70})"', app) + re.findall(r"title: '([^']{4,70})'", app)
                 if not re.search(r'[{}<>$]|\\', t)})

def keep_marks(path):
    marks = {}
    if os.path.exists(path):
        for line in open(path, encoding='utf-8'):
            m = re.match(r'\[(.)\] (\S+)', line)
            if m and m.group(1) in 'x~': marks[m.group(2)] = line.rstrip('\n')
    return marks

def write(name, head, jobs):
    path = os.path.join(OUT, name); marks = keep_marks(path)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(head.strip() + '\n\n')
        for jid, text in jobs: f.write((marks.get(jid) or f'[ ] {jid} {text}') + '\n')
    return len(jobs)

COMMON = """RULES: ai-team/README.md. Work in batches of 10 jobs (same file, top to bottom, skip [x]). One report per batch:
chatgpt/jobs/<FILE>-<first id>-<last id>.md (one short section per job: result, proof, bug found? yes/no). Mark each job here
[x] (done) or [~] (done, found a bug -> also write chatgpt/bugs/BUG-<id>.md). Push after every batch + one AI-TEAM.txt line.
Proof words: TESTED in G-Warp / TESTED in scratch-vm / SOURCE-VERIFIED / NOT-TESTED. Never invent results. Never edit app.html."""

total = 0
# 1. blocks: 5 jobs each
J = []
for i, b in enumerate(blocks, 1):
    n = f'BLK-{i:04d}'; t = f'"{b["text"]}" ({b["category"]}, {b["shape"]}, type {b["type"]})'
    J += [(n + '-PAR', f'[TERMINAL] {t}: same result as Scratch? Build a tiny test in G-Warp (qa-kit builder) AND run it in scratch-vm; compare values/positions.'),
          (n + '-EDGE', f'[TERMINAL] {t}: edge inputs - empty, text "abc", "10" vs 10, -1, 0, 1e9, NaN, decimals, very long text; G-Warp vs Scratch.'),
          (n + '-SAVE', f'[TERMINAL] {t}: save .sb3 -> roundtrip.js -> opens in scratch-vm with the same block + inputs? (no DIFF lines)'),
          (n + '-DOC', f'[WEB] {t}: write the kid-friendly help card: what it does (1 line), tiny example script, common mistake. (docs-ready markdown)'),
          (n + '-AI', f'[ANY] {t}: 10 teaching examples for the G-Warp AI (request -> commands using this block), format from AIM-1 (AI Lab).')]
total += write('JOBS-BLOCKS.txt', f"""JOBS - EVERY G-WARP BLOCK ({len(blocks)} blocks x 5 = {len(J)} jobs)   source: ai-team/gwrap-blocks.json
{COMMON}
-AI jobs wait until AIM-1 (command list) exists; the others can start now.""", J)

# 2. extensions: 5 jobs each
J = []
for i, e in enumerate(gallery, 1):
    n = f'EXT-{i:04d}'; t = f'{e.get("name")} ({e.get("src")}/{e.get("id")}, by {e.get("by") or "?"})'
    J += [(n + '-LOAD', f'[TERMINAL] {t}: loads in G-Warp (file:// and the github.io site)? blocks appear? page errors?'),
          (n + '-RUN', f'[TERMINAL] {t}: build a 3-block test with its main block; does it work like in TurboWarp/PenguinMod? (paste output)'),
          (n + '-CREDIT', f'[WEB] {t}: check credit + licence in G-Warp against the original page (url/license fields). Mismatch = bug.'),
          (n + '-SAFE', f'[WEB] {t}: read its code/docs: does it use the internet, personal data, IP/location, logins? Is its Safe/Moderate/Dangerous label right?'),
          (n + '-DOC', f'[WEB] {t}: 2-line kid description + 1 example idea for the extension gallery card.')]
total += write('JOBS-EXTENSIONS.txt', f"""JOBS - EVERY GALLERY EXTENSION ({len(gallery)} x 5 = {len(J)} jobs)   source: app.html gw10GalleryData
{COMMON}
Never run an extension's JavaScript outside the sandbox G-Warp already uses. Dangerous ones: read only, don't run.""", J)

# 3. UI buttons / tooltips: 3 jobs each
J = []
for i, t in enumerate(titles, 1):
    n = f'UI-{i:04d}'
    J += [(n + '-CLICK', f'[TERMINAL] button/control "{t}": find it, click it, does it do what the tooltip says? no page errors?'),
          (n + '-ICON', f'[WEB] "{t}": which icon does it use? Is the same action shown with a DIFFERENT icon somewhere else? (feeds "icons must match")'),
          (n + '-WORDS', f'[WEB] "{t}": is the tooltip clear for an 8-year-old and correct? Suggest better words (max 10) if not.')]
total += write('JOBS-UI.txt', f"""JOBS - EVERY BUTTON / TOOLTIP ({len(titles)} x 3 = {len(J)} jobs)   source: title texts in app.html
{COMMON}""", J)

# 4. new recipes for GWrap AI: mechanics x variants
MECH = ['jump', 'double jump', 'wall jump', 'gravity', 'platform collision', 'moving platform', 'coins + score', 'lives + game over',
        'health bar', 'enemy patrol', 'enemy chase', 'shooting', 'bullets with clones', 'timer countdown', 'high score (save)', 'levels / next level',
        'menu screen', 'pause', 'camera scroll', 'parallax background', 'top-down movement', '8-direction movement', 'drag and drop', 'inventory list',
        'dialogue / talking', 'quiz', 'random spawn', 'falling objects (rain)', 'particles with clones', 'day/night cycle', 'sound effects on events',
        'background music loop', 'animation walk cycle', 'pen drawing', 'paint program', 'snake game', 'pong', 'breakout', 'flappy', 'clicker game',
        'tower defense path', 'grid movement', 'tile map collision', 'boss fight', 'power-ups', 'shield', 'dash', 'knockback', 'checkpoints', 'cutscene']
VAR = [('basic', 'the simplest version (≤ 12 blocks)'), ('better', 'a nicer version (smooth, feels good)'),
       ('clone-safe', 'works with clones / many sprites'), ('explain', 'kid explanation + common bug and its fix')]
J = []
for i, m in enumerate(MECH, 1):
    for k, (v, d) in enumerate(VAR, 1):
        J.append((f'REC-{i:03d}-{k}', f'[TERMINAL] recipe "{m}" - {v}: {d}. Write it in the GWrap AI pack format (claude/gwrap-pack.json: id, emoji, title, keys, q, steps, script), build it, run it, prove it works.'))
total += write('JOBS-RECIPES.txt', f"""JOBS - NEW GWRAP AI RECIPES ({len(MECH)} mechanics x {len(VAR)} = {len(J)} jobs)
{COMMON}
Validate every pack file: python3 ai-team/tools/validate_gwrap_pack.py <your pack.json>. Put packs in the drop box ai-team/shared/.
These recipes are ALSO the AI Lab's teaching data - the more that really work, the smarter G-Warp's AI gets.""", J)

# 5. kid-critic + chaos projects
IDEAS = ['plane game', 'space shooter', 'maze', 'catch the apples', 'racing (top-down)', 'pet simulator', 'piano', 'drum machine', 'drawing app',
         'story with 3 scenes', 'quiz about animals', 'platformer 3 levels', 'snake', 'pong for 2 players', 'clicker', 'dress-up', 'weather animation',
         'fireworks', 'solar system', 'calculator', 'stopwatch', 'typing game', 'memory cards', 'tic-tac-toe', 'connect four', 'flappy clone',
         'endless runner', 'fishing game', 'zombie survival', 'tower defense', 'fighting game (2 players)', 'rhythm game', 'music video', 'chat bot',
         'birthday card', 'clock', 'bouncing balls (100 clones)', 'paint with pen', 'gravity sandbox', 'maze generator']
J = []
for i, p in enumerate(IDEAS, 1):
    J += [(f'KID-{i:03d}', f'[TERMINAL] KID CRITIC: act like a kid new to G-Warp, build "{p}" using only the UI (QA kit clicks, no code injection), make 1-2 realistic mistakes and fix them; screenshot each step; report fix / improve / keep.'),
          (f'CHAOS-{i:03d}', f'[TERMINAL] CHAOS TEST "{p}": break it on purpose (1000 clones, huge lists, endless loops, spam keys, Stop/Start 50x, save/load 20x). Does G-Warp freeze, lag or crash? Measure FPS.')]
total += write('JOBS-TESTING.txt', f"""JOBS - KID CRITIC + CHAOS TESTS ({len(IDEAS)} projects x 2 = {len(J)} jobs)
{COMMON}
Projects you make are yours (own art) and go in chatgpt/out/ (git-ignored). NEVER use the owner's private test projects here.""", J)

# 6. art: sprites + backdrops + icons from the library gaps
ART = ['hero kid', 'robot', 'dragon (friendly)', 'slime', 'ghost (cute)', 'knight', 'wizard', 'alien', 'car', 'spaceship', 'tree', 'house',
       'coin', 'gem', 'heart', 'key', 'door', 'chest', 'bat', 'bird', 'fish', 'dog', 'rabbit', 'fox', 'owl', 'bee', 'cloud', 'sun', 'moon', 'star',
       'forest backdrop', 'city backdrop', 'space backdrop', 'underwater backdrop', 'castle backdrop', 'desert backdrop', 'snow backdrop',
       'school backdrop', 'cave backdrop', 'stadium backdrop']
J = [(f'ART-{i:03d}', f'[WEB] draw "{a}" for G-Warp\'s library: A/B/C options, G-Warp style, rotation centre in the middle of the body (backdrops 480x360), '
       + ('4-frame walk/idle animation as extra costumes, ' if 'backdrop' not in a else '') + 'no cat / no brands / no AI marks. Drop box + preview.html.')
     for i, a in enumerate(ART, 1)]
total += write('JOBS-ART.txt', f"""JOBS - ART FOR THE LIBRARY ({len(J)} jobs) - TAKE YOUR TIME, make them beautiful (icon/art rules: ai-team/README.md section 7)
{COMMON}""", J)

with open(os.path.join(OUT, 'TOTAL.txt'), 'w') as f: f.write(f'{total} jobs (generated by make_jobs.py)\n')
print(total)
