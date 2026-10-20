#!/usr/bin/env python3
"""Validate a GWrap AI knowledge pack (format: team/GEMINI-GWRAP-AI-300-2026-10-19.txt).
Usage: python3 validate_gwrap_pack.py <pack.json> [team/gwrap-blocks.json] [other packs to check ids against...]
Prints every problem and a summary; exit code 1 if anything is wrong. Written by Claude, 2026-10-19."""
import json, sys, re, os

HATS = {'when_flag', 'when_key', 'when_clicked', 'when_broadcast', 'when_clone', 'when_backdrop'}
C_BLOCKS = {'forever', 'repeat', 'if', 'if_else', 'repeat_until'}
NEEDS_COND = {'if', 'if_else', 'repeat_until', 'wait_until'}
COND_NODES = {'key_pressed', 'touching_edge', 'touching_pointer', 'touching_sprite', 'mouse_down',
              'op_gt', 'op_lt', 'op_contains', 'op_eq', 'op_and', 'op_or', 'op_not'}
VALUE_NODES = {'literal', 'get_var', 'x_position', 'y_position', 'timer', 'answer', 'mouse_x', 'mouse_y',
               'costume_number', 'size_reporter', 'op_random', 'direction', 'op_add', 'op_sub', 'op_mul', 'op_div', 'op_mathop', 'current_part', 'days_since_2000', 'backdrop_number', 'backdrop_name'}
ACTIONS = {'code', 'costumes', 'sounds', 'song', 'animation', 'tiles', 'backdrops', 'save', 'undo'}
KEYS = {'space', 'up arrow', 'down arrow', 'left arrow', 'right arrow', 'any'} | set('abcdefghijklmnopqrstuvwxyz0123456789')

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    pack_path = sys.argv[1]
    here = os.path.dirname(os.path.abspath(__file__))
    blocks_path = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, '..', 'gwrap-blocks.json')
    others = sys.argv[3:]
    errs, warns = [], []
    try: pack = json.load(open(pack_path, encoding='utf-8'))
    except Exception as e: print('FAIL: not valid JSON:', e); sys.exit(1)
    B = {b['type']: b for b in json.load(open(blocks_path, encoding='utf-8'))['blocks']}
    seen_ids, seen_titles = set(), set()
    for o in others:
        try:
            d = json.load(open(o, encoding='utf-8'))
            for x in d.get('recipes', []) + d.get('tips', []): seen_ids.add(x.get('id'))
        except Exception: pass

    def node(n, where, want):
        if not isinstance(n, dict) or 'type' not in n: errs.append(f'{where}: condition/value must be an object with "type"'); return
        t = n['type']
        if want == 'cond' and t not in COND_NODES: errs.append(f'{where}: "{t}" is not a condition node (use one of {sorted(COND_NODES)})')
        if want == 'value' and t not in VALUE_NODES: errs.append(f'{where}: "{t}" is not a value node (use one of {sorted(VALUE_NODES)})')
        if t == 'key_pressed' and n.get('key') not in KEYS: errs.append(f'{where}: key "{n.get("key")}" is not a key name')
        if t == 'get_var' and not n.get('name'): errs.append(f'{where}: get_var needs "name"')
        if t == 'touching_sprite' and not n.get('target'): errs.append(f'{where}: touching_sprite needs "target" (use "OTHER_SPRITE")')
        if t == 'literal' and 'value' not in n: errs.append(f'{where}: literal needs "value"')
        if t in ('op_gt', 'op_lt', 'op_contains', 'op_eq', 'op_add', 'op_sub', 'op_mul', 'op_div', 'op_random'):
            a = n.get('args')
            if not isinstance(a, list) or len(a) != 2: errs.append(f'{where}: {t} needs "args" with 2 values')
            else: [node(x, f'{where}.{t}[{i}]', 'value') for i, x in enumerate(a)]
        if t in ('op_and', 'op_or'):
            a = n.get('args')
            if not isinstance(a, list) or len(a) != 2: errs.append(f'{where}: {t} needs "args" with 2 conditions')
            else: [node(x, f'{where}.{t}[{i}]', 'cond') for i, x in enumerate(a)]
        if t == 'op_not':
            a = n.get('args')
            if not isinstance(a, list) or len(a) != 1: errs.append(f'{where}: op_not needs "args" with 1 condition')
            else: node(a[0], f'{where}.op_not', 'cond')

    def block(b, where, top=False):
        if not isinstance(b, list) or not b or not isinstance(b[0], str): errs.append(f'{where}: a block must be ["type", [inputs], [menus], {{...}}]'); return
        t = b[0]
        if t not in B: errs.append(f'{where}: block type "{t}" does not exist in G-Warp (see team/gwrap-blocks.json)'); return
        info = B[t]
        inputs = b[1] if len(b) > 1 else []
        menus = b[2] if len(b) > 2 else []
        extra = b[3] if len(b) > 3 else {}
        if not isinstance(inputs, list) or not isinstance(menus, list) or not isinstance(extra, dict): errs.append(f'{where}: {t}: inputs and menus must be lists, the 4th part an object'); return
        if len(inputs) > info['inputs']: errs.append(f'{where}: {t} has {info["inputs"]} inputs, you gave {len(inputs)}')
        if len(menus) > len(info['menus']): errs.append(f'{where}: {t} has {len(info["menus"])} menus, you gave {len(menus)}')
        for i, v in enumerate(inputs):
            if isinstance(v, dict):
                r = v.get('r')
                if not isinstance(r, list): errs.append(f'{where}: {t} input {i}: nested block must be {{"r": ["type", [inputs], [menus]]}}')
                else:
                    if r and r[0] in B and B[r[0]]['shape'] not in ('reporter',): errs.append(f'{where}: {t} input {i}: "{r[0]}" is not a round reporter block')
                    block(r, f'{where}.{t}.input{i}')
            elif not isinstance(v, str): errs.append(f'{where}: {t} input {i} must be a string like "10"')
        if t in NEEDS_COND and 'cond' not in extra: errs.append(f'{where}: {t} needs "cond" (empty conditions never run)')
        if 'cond' in extra: node(extra['cond'], f'{where}.{t}.cond', 'cond')
        if t in C_BLOCKS:
            body = extra.get('body')
            if not isinstance(body, list) or not body: errs.append(f'{where}: {t} needs a non-empty "body"')
            else: stack(body, f'{where}.{t}.body', inner=True)
            if t == 'if_else':
                if not isinstance(extra.get('else'), list): errs.append(f'{where}: if_else needs "else"')
                else: stack(extra['else'], f'{where}.if_else.else', inner=True)
        if top and info['shape'] in ('reporter', 'boolean'): errs.append(f'{where}: a round/pointy block cannot be a script block')

    def stack(s, where, inner=False):
        if not isinstance(s, list) or not s: errs.append(f'{where}: a script must be a non-empty list of blocks'); return
        if not inner and (not isinstance(s[0], list) or s[0][:1] and s[0][0] not in HATS): errs.append(f'{where}: a script must start with a hat block ({sorted(HATS)})')
        for i, b in enumerate(s):
            if inner and isinstance(b, list) and b and b[0] in HATS: errs.append(f'{where}[{i}]: a hat block cannot be inside another block')
            if not inner and i > 0 and isinstance(b, list) and b and b[0] in HATS: errs.append(f'{where}[{i}]: only the first block can be a hat')
            block(b, f'{where}[{i}]', top=True)

    def common(x, kind, prefix):
        i = x.get('id', '?')
        if not isinstance(x.get('id'), str) or not x['id'].startswith(prefix): errs.append(f'{kind} {i}: id must start with "{prefix}"')
        if i in seen_ids: errs.append(f'{kind} {i}: duplicate id')
        seen_ids.add(i)
        tl = str(x.get('title', '')).strip().lower()
        if not tl: errs.append(f'{kind} {i}: needs a title')
        elif tl in seen_titles: errs.append(f'{kind} {i}: duplicate title "{x.get("title")}"')
        seen_titles.add(tl)
        k = x.get('keys')
        if not isinstance(k, list) or len(k) < 3 or any((not isinstance(w, str)) or (' ' in w) or w != w.lower() for w in k): errs.append(f'{kind} {i}: "keys" needs 3+ single lower-case words')
        q = x.get('q')
        if not isinstance(q, list) or len(q) < 3: errs.append(f'{kind} {i}: "q" needs at least 3 example questions')
        if re.search(r'https?://', json.dumps(x)): errs.append(f'{kind} {i}: no web links')
        if re.search(r'\bscratch cat\b', json.dumps(x).lower()): errs.append(f'{kind} {i}: no Scratch cat')

    recipes, tips = pack.get('recipes', []), pack.get('tips', [])
    for r in recipes:
        common(r, 'recipe', 'r-')
        if not isinstance(r.get('steps'), list) or not r['steps']: errs.append(f'recipe {r.get("id")}: needs "steps"')
        sc = r.get('script')
        if not isinstance(sc, list) or not sc: errs.append(f'recipe {r.get("id")}: needs "script" (a list of scripts)')
        else:
            for si, s in enumerate(sc): stack(s, f'recipe {r.get("id")} script{si}')
        used_vars = set(re.findall(r'"get_var",\s*\[\],\s*\["([^"]+)"\]', json.dumps(sc))) | set(re.findall(r'"name":\s*"([^"]+)"', json.dumps(sc)))
        for t in ('set_var', 'change_var', 'show_var', 'hide_var'):
            used_vars |= set(re.findall(r'"%s",\s*\[[^\]]*\],\s*\["([^"]+)"\]' % t, json.dumps(sc)))
        prep = set((r.get('prep') or {}).get('vars', []))
        miss = {v for v in used_vars if v not in prep and v != 'my variable'}
        if miss: warns.append(f'recipe {r.get("id")}: variables {sorted(miss)} are used but not in prep.vars')
    for t in tips:
        common(t, 'tip', 't-')
        if not str(t.get('text', '')).strip(): errs.append(f'tip {t.get("id")}: needs "text"')
        if len(str(t.get('text', ''))) > 600: warns.append(f'tip {t.get("id")}: text is long (keep it 2-4 short sentences)')
        if t.get('action') not in (None, *ACTIONS): errs.append(f'tip {t.get("id")}: action must be one of {sorted(ACTIONS)}')
    for e in errs: print('ERROR', e)
    for w in warns: print('WARN ', w)
    print(f'\n{len(recipes)} recipes, {len(tips)} tips, {len(errs)} errors, {len(warns)} warnings ->', 'PASS' if not errs else 'FAIL')
    sys.exit(1 if errs else 0)

if __name__ == '__main__': main()
