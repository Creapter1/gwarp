#!/usr/bin/env python3
"""Writes ai-team/phone/PHONE-BOT-PROMPT.txt from G-Warp's real block list + the recipe validator's rules (Claude, 2026-10-26).
Run from the repo root: python3 ai-team/phone/make_phone_prompt.py"""
import json, importlib.util
spec = importlib.util.spec_from_file_location('v', 'ai-team/tools/validate_gwrap_pack.py'); v = importlib.util.module_from_spec(spec); spec.loader.exec_module(v)
B = json.load(open('ai-team/gwrap-blocks.json'))['blocks']
cats = {}
for b in B:
    m = '; '.join('/'.join(o) for o in b['menus']) if b['menus'] else ''
    cats.setdefault(b['category'], []).append(f"{b['type']}({b['inputs']}{', m:' + m if m else ''})")
blist = '\n'.join(f"  {c}: " + ' '.join(x) for c, x in cats.items())
ex = json.dumps(json.load(open('claude/gwrap-pack.json'))['recipes'][0], ensure_ascii=False)
SK = ['follow the mouse', 'spin when clicked', 'grow and shrink (pulse)', 'bounce off the edges', 'fade in and out', 'random position every second',
 'say hello when clicked', 'ask your name and greet', 'count clicks', 'countdown 10 to 0', 'change colour with keys', 'draw with the pen following the mouse',
 'jump with space (simple)', 'gravity: fall and land (use y)', 'walk left/right with arrows + flip', '8-direction move with WASD',
 'shoot a ball with clones', 'enemy moves toward player', 'collect a coin (touching) + score', 'lose a life when touched', 'game over when lives = 0',
 'timer that counts up', 'high score variable', 'next level when score = 10', 'play a sound on click', 'background music loop', 'change backdrop with keys',
 'drag to move', 'show/hide with keys', 'glide to random spots', 'orbit around the centre', 'zig-zag movement', 'wrap around the screen edges',
 'stop all when space', 'broadcast to start the game', 'title screen then game', 'pause with P', 'speed up over time', 'spawn falling rain clones',
 'delete clones at the bottom', 'follow another sprite', 'look at the mouse (point towards)', 'shake effect', 'ghost effect fade', 'whirl effect pulse',
 'stamp a trail with the pen', 'draw a square with the pen', 'draw a star with the pen', 'random colour pen', 'list of names - say a random one',
 'quiz with 3 questions', 'dice roller', 'coin flip', 'rock paper scissors vs computer', 'say what you type', 'stage click counter', 'dodge the falling things',
 'move only inside a box', 'smooth movement with a speed variable', 'friction: slow down', 'double jump', 'wall bounce for a ball', 'paddle follows mouse x',
 'breakout ball', 'pong ball with two paddles', 'snake head moves on a grid', 'grid step movement (tile size 30)', 'camera scroll variable', 'parallax two layers',
 'health bar with costumes', 'power-up: faster for 5 seconds', 'shield on key press', 'dash with key a', 'knockback when hit', 'checkpoint saves x/y',
 'boss with 3 hits', 'day/night backdrop timer', 'animated walk with 2 costumes', 'idle breathing (size pulse)', 'talk: 3 lines of dialogue',
 'chat bot answers yes/no', 'add names to a list in order', 'reverse a word', 'count letters in a word', 'join words into a sentence',
 'random password from letters', 'clock with the timer', 'stopwatch start/stop', 'metronome beat with a sound', 'keys play notes (start sound)',
 'teleport between two doors', 'spawn enemies every 2 seconds', 'enemy patrol left-right', 'score popup that floats up', 'confetti clones on win', 'make a button sprite']
items = '\n'.join(f"  PH-{i:03d} {s}" for i, s in enumerate(SK, 1))
P = f"""=====================================================================
 G-WARP PHONE BOT PROMPT (for the phone chatbot: code only, ~20 messages per chat, 2-3 min per answer)
 Written by Claude for the owner, 2026-10-26. HOW TO USE:
 1. New chat -> paste everything between the lines. 2. Then just type: continue   (each answer = a FULL pack of 10 recipes).
 3. Each answer is ONE code block = one complete file. Copy it once, save it as a note / file named like PH-001-010.json.
 4. When the chat ends: new chat -> paste the prompt again + type: start at PH-0NN   (the NEXT number from the last answer).
 5. If an answer gets cut off or "tired": type  continue with 5   (smaller pack). Give the files to Claude or ChatGPT (lane L6):
    "add the phone recipes" -> they check them with ai-team/tools/validate_gwrap_pack.py and add the good ones to G-Warp.
=====================================================================
-----------------------------------------------------------------------------------------------
You write RECIPES that teach G-Warp's built-in AI helper (GWrap AI). G-Warp = a free Scratch-style block-coding app for kids.
EVERYTHING you need is in this message. Do NOT browse, do NOT look anything up, do NOT plan or explain at length. Answer FAST.

EACH ANSWER = ONE code block with ONE complete pack file for the NEXT 10 items of the LIST, then one line "NEXT: PH-0NN". Nothing else.
- Pack file shape:  {{"version": 1, "note": "phone recipes PH-0AA..PH-0BB", "recipes": [ <10 recipe objects> ], "tips": []}}
- First answer: PH-001..PH-010, unless I wrote "start at PH-0NN". "continue" = the next 10. "continue with N" = the next N.
- Start writing the code block right away. No planning text, no explanation before or after. Each recipe 4-20 blocks.
  If an item is too hard, make the simplest working version. Valid JSON: double quotes, no comments, no trailing commas.
- Each recipe object looks exactly like this example:
{ex}
- "id": "r-ph-<short-words>" (MUST start with r-ph-, lowercase, dashes). "emoji": one emoji. "title": 3-8 words. "keys": 5-10 search words.
  "q": 3 different ways a KID would ask (simple words, small typos OK). "steps": 2-4 short kid sentences explaining the script.
  "script": a list of scripts; each script = a list of blocks; a block = ["type", [inputs], [menus], {{extra}}] (unused parts can be left out).
  Inputs are strings ("10"), or a value node {{"type": ...}}, or a nested block {{"r": ["type", [inputs], [menus]]}}.
  C-blocks (forever, repeat, if, if_else, repeat_until): extra {{"body": [...]}} (if_else also "else": [...]);
  if / if_else / repeat_until / wait_until need extra {{"cond": <condition node>}}.
- Condition nodes: {', '.join(sorted(v.COND_NODES))}
  (key_pressed needs "key"; touching_sprite needs "target": "OTHER_SPRITE"; op_gt/op_lt/op_eq/op_contains need "args": [value, value];
   op_and/op_or "args": [cond, cond]; op_not "args": [cond])
- Value nodes: {', '.join(sorted(v.VALUE_NODES))}
  (literal needs "value"; get_var needs "name"; op_add/op_sub/op_mul/op_div/op_random need "args": [value, value])
- Keys: space, up arrow, down arrow, left arrow, right arrow, any, a-z, 0-9.   Hats: {', '.join(sorted(v.HATS))}
- Use ONLY these block types  type(number of inputs, m: menu choices):
{blist}

RULES: only blocks from the list (no made-up blocks); logic that works in Scratch; kid-safe; no real people's names;
no Scratch cat, no brands; no "made by AI"; 10 recipes per answer (unless I say another number); never repeat an id; no text outside the code block
except the NEXT line.

LIST:
{items}
-----------------------------------------------------------------------------------------------
"""
open('ai-team/phone/PHONE-BOT-PROMPT.txt', 'w', encoding='utf-8').write(P)
print(len(P), 'chars,', len(SK), 'items')
