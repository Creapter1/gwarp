#!/usr/bin/env python3
"""Fixes phone-bot packs to the exact GWrap format (Claude, 2026-10-26):
 - a value node {"type": ...} used as a block INPUT becomes a reporter block {"r": [...]} (value nodes are only for conditions)
 - adds "prep": {"vars": [...], "lists": [...]} for variables/lists the script uses
Usage: python3 ai-team/phone/fix_phone_pack.py in.json out.json"""
import json, sys, re
REP = {'op_add', 'op_sub', 'op_mul', 'op_div', 'op_random', 'op_join'}
def val2r(n):
    t = n.get('type')
    if t == 'literal': return str(n.get('value', ''))
    if t == 'get_var': return {'r': ['get_var', [], [n.get('name', 'my variable')]]}
    if t in REP: return {'r': [t, [val2r(a) if isinstance(a, dict) else str(a) for a in n.get('args', [])]]}
    return {'r': [t]}
def fix_block(b):
    if not isinstance(b, list) or not b: return b
    if len(b) > 1 and isinstance(b[1], list):
        b[1] = [fix_input(v) for v in b[1]]
    if len(b) > 3 and isinstance(b[3], dict):
        for k in ('body', 'else'):
            if isinstance(b[3].get(k), list): b[3][k] = [fix_block(x) for x in b[3][k]]
    return b
def fix_input(v):
    if isinstance(v, dict):
        if 'r' in v: v['r'] = fix_block(v['r']); return v
        if 'type' in v: return val2r(v)
    if isinstance(v, (int, float)): return str(v)
    return v
pack = json.load(open(sys.argv[1], encoding='utf-8'))
for r in pack['recipes']:
    r['script'] = [[fix_block(b) for b in sc] for sc in r['script']]
    s = json.dumps(r['script'])
    vars_ = set(re.findall(r'"get_var",\s*\[\],\s*\["([^"]+)"\]', s)) | set(re.findall(r'"name":\s*"([^"]+)"', s))
    vars_ |= set(re.findall(r'\["(?:set_var|change_var|show_var|hide_var)",\s*\[[^\]]*\],\s*\["([^"]+)"\]', s))
    lists = set(re.findall(r'\["(?:list_[a-z_]+)",\s*\[[^\]]*\],\s*\["([^"]+)"\]', s))
    vars_.discard('my variable')
    if vars_ or lists:
        prep = r.setdefault('prep', {})
        if vars_: prep['vars'] = sorted(set(prep.get('vars', [])) | vars_)
        if lists: prep['lists'] = sorted(set(prep.get('lists', [])) | lists)
json.dump(pack, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('fixed', len(pack['recipes']), 'recipes')
