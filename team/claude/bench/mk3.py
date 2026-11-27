# Builds the Episode 3 test projects (exam.sb3, game.sb3, marathon.sb3). Plain Scratch 3 project files.
import json, zipfile, hashlib, itertools

class P:
    def __init__(s): s.B = {}; s.n = itertools.count(1); s.vars = {}; s.lists = {}
    def var(s, name, val=0): s.vars.setdefault(name, ['v_' + name, val]); return [name, s.vars[name][0]]
    def lst(s, name): s.lists.setdefault(name, ['l_' + name, []]); return [name, s.lists[name][0]]
    def blk(s, op, inputs=None, fields=None, top=False, x=0, y=0, shadow=False):
        i = 'b%d' % next(s.n)
        s.B[i] = dict(opcode=op, next=None, parent=None, inputs={}, fields=fields or {}, shadow=shadow, topLevel=top)
        if top: s.B[i].update(x=x, y=y)
        for k, v in (inputs or {}).items(): s.inp(i, k, v)
        return i
    def inp(s, i, k, v):                       # v: plain value -> text field, ('n', v) number field, block id -> reporter
        if isinstance(v, tuple): s.B[i]['inputs'][k] = [1, [4 if v[0] == 'n' else 10, str(v[1])]]
        elif isinstance(v, str) and v in s.B:
            s.B[v]['parent'] = i
            s.B[i]['inputs'][k] = [2, v] if k in ('CONDITION', 'OPERAND', 'SUBSTACK', 'SUBSTACK2') or s.B[v]['opcode'] in BOOL else [3, v, [10, '']]
        else: s.B[i]['inputs'][k] = [1, [10, str(v)]]
    def stack(s, *ids):
        for a, b in zip(ids, ids[1:]): s.B[a]['next'] = b; s.B[b]['parent'] = a
        return ids[0]
    def sub(s, c, *ids, key='SUBSTACK'):
        s.stack(*ids); s.B[c]['inputs'][key] = [2, ids[0]]; s.B[ids[0]]['parent'] = c; return c
    def hat(s, op='event_whenflagclicked', x=0, y=0, **kw): return s.blk(op, top=True, x=x, y=y, **kw)
    def setv(s, name, v): return s.blk('data_setvariableto', {'VALUE': v}, {'VARIABLE': s.var(name)})
    def changev(s, name, v): return s.blk('data_changevariableby', {'VALUE': v}, {'VARIABLE': s.var(name)})
    def op(s, opc, **inputs): return s.blk(opc, inputs)
    def math(s, o, n): return s.blk('operator_mathop', {'NUM': n}, {'OPERATOR': [o, None]})
    def menu(s, opc, field, val):
        m = s.blk(opc, fields={field: [val, None]}, shadow=True); return m

BOOL = {'operator_lt', 'operator_gt', 'operator_equals', 'operator_and', 'operator_or', 'operator_not', 'operator_contains',
        'sensing_touchingobject', 'sensing_keypressed', 'data_listcontainsitem'}

def svg(w, h, color): return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}"><rect width="{w}" height="{h}" fill="{color}"/></svg>'.encode()

def save(path, sprites, stage_p):
    files = {}; targets = []
    def cos(name, data, w, h):
        m = hashlib.md5(data).hexdigest(); files[m + '.svg'] = data
        return dict(name=name, assetId=m, md5ext=m + '.svg', dataFormat='svg', rotationCenterX=w / 2, rotationCenterY=h / 2)
    targets.append(dict(isStage=True, name='Stage', variables=stage_p.vars and {v[0]: [k, v[1]] for k, v in stage_p.vars.items()},
                        lists={v[0]: [k, v[1]] for k, v in stage_p.lists.items()}, broadcasts={'bc_ding': 'ding'}, blocks=stage_p.B, comments={},
                        currentCostume=0, costumes=[cos('backdrop1', svg(480, 360, '#ffffff'), 480, 360)], sounds=[], volume=100, layerOrder=0))
    for k, (name, p, (w, h, col), x, y) in enumerate(sprites):
        targets.append(dict(isStage=False, name=name, variables={}, lists={}, broadcasts={}, blocks=p.B, comments={}, currentCostume=0,
                            costumes=[cos('c', svg(w, h, col), w, h)], sounds=[], volume=100, layerOrder=k + 1, visible=True,
                            x=x, y=y, size=100, direction=90, draggable=False, rotationStyle='all around'))
    pj = dict(targets=targets, monitors=[], extensions=[], meta=dict(semver='3.0.0', vm='0.2.0', agent='ep3'))
    with zipfile.ZipFile(path, 'w') as z:
        z.writestr('project.json', json.dumps(pj))
        for n, d in files.items(): z.writestr(n, d)

# ---------- 1. Scratch rules exam: every test sets a variable; expected = what Scratch 3 gives ----------
G = P()            # global variables live on the stage
S = P(); S.vars = G.vars; S.lists = G.lists      # sprite scripts use the stage's variables
EXPECT = {}
def t(name, block, expected): EXPECT[name] = expected; return S.setv(name, block)
o = S.op
tests = [
 t('t01_10_lt_9', o('operator_lt', OPERAND1='10', OPERAND2='9'), 'false'),
 t('t02_apple_lt_banana', o('operator_lt', OPERAND1='apple', OPERAND2='banana'), 'true'),
 t('t03_A_eq_a', o('operator_equals', OPERAND1='A', OPERAND2='a'), 'true'),
 t('t04_empty_eq_0', o('operator_equals', OPERAND1='', OPERAND2='0'), 'false'),
 t('t05_1e3_eq_1000', o('operator_equals', OPERAND1='1e3', OPERAND2='1000'), 'true'),
 t('t06_0x10_eq_16', o('operator_equals', OPERAND1='0x10', OPERAND2='16'), 'true'),
 t('t07_round_-2.5', o('operator_round', NUM=('n', '-2.5')), '-2'),
 t('t08_round_2.5', o('operator_round', NUM=('n', '2.5')), '3'),
 t('t09_-7_mod_3', o('operator_mod', NUM1=('n', '-7'), NUM2=('n', '3')), '2'),
 t('t10_7_mod_-3', o('operator_mod', NUM1=('n', '7'), NUM2=('n', '-3')), '-2'),
 t('t11_0.1+0.2', o('operator_add', NUM1=('n', '0.1'), NUM2=('n', '0.2')), '0.30000000000000004'),
 t('t12_sqrt_-1', S.math('sqrt', ('n', '-1')), 'NaN'),
 t('t13_ln_0', S.math('ln', ('n', '0')), '-Infinity'),
 t('t14_tan_90', S.math('tan', ('n', '90')), 'Infinity'),
 t('t15_sin_180', S.math('sin', ('n', '180')), '0'),
 t('t16_cos_90', S.math('cos', ('n', '90')), '0'),
 t('t17_1_div_0', o('operator_divide', NUM1=('n', '1'), NUM2=('n', '0')), 'Infinity'),
 t('t18_0_div_0', o('operator_divide', NUM1=('n', '0'), NUM2=('n', '0')), 'NaN'),
 t('t19_letter_0', o('operator_letter_of', LETTER=('n', '0'), STRING='hello'), ''),
 t('t20_letter_1', o('operator_letter_of', LETTER=('n', '1'), STRING='hello'), 'h'),
 t('t21_length_12345', o('operator_length', STRING='12345'), '5'),
 t('t22_contains_LL', o('operator_contains', STRING1='hello', STRING2='LL'), 'true'),
 t('t23_true_eq_1', o('operator_equals', OPERAND1='true', OPERAND2='1'), 'false'),
 t('t24_"2"+"3"', o('operator_add', NUM1='2', NUM2='3'), '5'),
 t('t25_2_x_spaces3', o('operator_multiply', NUM1='2', NUM2='  3  '), '6'),
 t('t26_abc+1', o('operator_add', NUM1='abc', NUM2=('n', '1')), '1'),
 t('t27_Infinity+1', o('operator_add', NUM1='Infinity', NUM2=('n', '1')), 'Infinity'),
 t('t28_10^3', S.math('10 ^', ('n', '3')), '1000'),
 t('t29_e^0', S.math('e ^', ('n', '0')), '1'),
 t('t30_floor_-2.5', S.math('floor', ('n', '-2.5')), '-3'),
 t('t31_ceiling_-2.5', S.math('ceiling', ('n', '-2.5')), '-2'),
 t('t32_log_1000', S.math('log', ('n', '1000')), '2.9999999999999996'),
 t('t33_asin_2', S.math('asin', ('n', '2')), 'NaN'),
 t('t34_5_mod_0', o('operator_mod', NUM1=('n', '5'), NUM2=('n', '0')), 'NaN'),
 t('t35_join_bool', o('operator_join', STRING1=o('operator_equals', OPERAND1='1', OPERAND2='1'), STRING2=''), 'true'),
 t('t36_not_empty', S.blk('operator_not'), 'true'),
 t('t37_empty_lt_1', o('operator_lt', OPERAND1='', OPERAND2='1'), 'true'),
 t('t38_round_abc', o('operator_round', NUM='abc'), '0'),
 t('t39_random_5_5', o('operator_random', FROM=('n', '5'), TO=('n', '5')), '5'),
 t('t40_letter_2.7', o('operator_letter_of', LETTER=('n', '2.7'), STRING='hello'), 'e'),
 t('t41_length_empty', o('operator_length', STRING=''), '0'),
 t('t42_abs_-5', S.math('abs', ('n', '-5')), '5'),
]
# repeat rules
def rep(name, times, expected):
    EXPECT[name] = expected
    c = S.blk('control_repeat'); S.B[c]['inputs']['TIMES'] = [1, [6, str(times)]]
    S.sub(c, S.changev(name, ('n', 1)))
    return [S.setv(name, ('n', 0)), c]
reps = rep('t43_repeat_2.5', '2.5', '3') + rep('t44_repeat_-1', '-1', '0') + rep('t45_repeat_abc', 'abc', '0')
EXPECT['t46_change_hello_by_abc'] = '0'
chg = [S.setv('t46_change_hello_by_abc', 'hello'), S.changev('t46_change_hello_by_abc', 'abc')]
# lists
L = S.lst('L')
lst = [S.blk('data_deletealloflist', fields={'LIST': L}), S.blk('data_addtolist', {'ITEM': 'a'}, {'LIST': L})]
def item(idx): b = S.blk('data_itemoflist', fields={'LIST': L}); S.B[b]['inputs']['INDEX'] = [1, [7, idx]]; return b
lst += [t('t47_item_0', item('0'), ''), t('t48_item_last', item('last'), 'a'), t('t49_item_-1', item('-1'), ''),
        t('t50_list_contains_A', S.blk('data_listcontainsitem', {'ITEM': 'A'}, {'LIST': L}), 'true')]
# motion rules (checked on the sprite afterwards)
mot = [S.blk('motion_pointindirection', {'DIRECTION': ('n', 90)}), S.blk('motion_turnright', {'DEGREES': ('n', 370)}),
       S.setv('t51_direction_90_turn_370', S.blk('motion_direction')),
       S.blk('motion_pointindirection', {'DIRECTION': ('n', -270)}), S.setv('t52_point_-270', S.blk('motion_direction')),
       S.blk('motion_gotoxy', {'X': ('n', 1000), 'Y': ('n', 0)}), S.setv('t53_goto_x1000_fence', S.blk('motion_xposition')),
       S.blk('motion_gotoxy', {'X': ('n', 0), 'Y': ('n', 0)}), S.blk('motion_pointindirection', {'DIRECTION': ('n', 90)})]
EXPECT.update({'t51_direction_90_turn_370': '100', 't52_point_-270': '90', 't53_goto_x1000_fence': '245'})
done = S.setv('zz_done', 'yes')
S.stack(S.hat(), *tests, *reps, *chg, *lst, *mot, done)
save('/tmp/ep3/exam.sb3', [('Tester', S, (40, 40, '#7c4dff'), 0, 0)], G)
json.dump(EXPECT, open('/tmp/ep3/exam_expected.json', 'w'), indent=0)

# ---------- 2. mini game: catch the stars ----------
G2 = P(); PL = P(); ST = P(); PL.vars = ST.vars = G2.vars
def keyp(p, k):
    m = p.menu('sensing_keyoptions', 'KEY_OPTION', k); b = p.blk('sensing_keypressed'); p.B[b]['inputs']['KEY_OPTION'] = [1, m]; p.B[m]['parent'] = b; return b
def ifb(p, cond, *body): c = p.blk('control_if'); p.inp(c, 'CONDITION', cond); return p.sub(c, *body)
f = PL.blk('control_forever')
PL.sub(f, ifb(PL, keyp(PL, 'right arrow'), PL.blk('motion_changexby', {'DX': ('n', 8)})), ifb(PL, keyp(PL, 'left arrow'), PL.blk('motion_changexby', {'DX': ('n', -8)})))
PL.stack(PL.hat(x=0, y=0), PL.setv('score', ('n', 0)), PL.setv('dings', ('n', 0)), PL.setv('clicked', ('n', 0)), PL.blk('motion_gotoxy', {'X': ('n', 0), 'Y': ('n', -140)}),
         PL.blk('sensing_resettimer'), f)
PL.stack(PL.hat('event_whenbroadcastreceived', 0, 300, fields={'BROADCAST_OPTION': ['ding', 'bc_ding']}), PL.changev('dings', ('n', 1)), PL.blk('looks_sayforsecs', {'MESSAGE': 'Yum!', 'SECS': ('n', 0.5)}))
PL.stack(PL.hat('event_whenthisspriteclicked', 0, 420), PL.changev('clicked', ('n', 1)))
q = PL.blk('sensing_askandwait', {'QUESTION': 'What is your name?'})
PL.stack(PL.hat('event_whenkeypressed', 300, 0, fields={'KEY_OPTION': ['q', None]}), q, PL.setv('name', PL.blk('sensing_answer')))
PL.stack(PL.hat('event_whenkeypressed', 300, 200, fields={'KEY_OPTION': ['x', None]}), PL.blk('control_stop', fields={'STOP_OPTION': ['all', None]}))
PL.stack(PL.hat('event_whenkeypressed', 300, 300, fields={'KEY_OPTION': ['t', None]}), PL.setv('timer_round', PL.blk('operator_round', {'NUM': PL.blk('sensing_timer')})))
# star: 3 clones at x = 0, 150, -150, falling; touching Player -> score + broadcast
cm = ST.menu('control_create_clone_of_menu', 'CLONE_OPTION', '_myself_')
def clone_at(x):
    c = ST.blk('control_create_clone_of'); ST.B[c]['inputs']['CLONE_OPTION'] = [1, cm]; ST.B[cm]['parent'] = c
    return [ST.setv('next_x', ('n', x)), c, ST.blk('control_wait', {'DURATION': ('n', 1.2)})]
ST.stack(ST.hat(), ST.blk('looks_hide'), *clone_at(0), *clone_at(150), *clone_at(-150))
tm = ST.menu('sensing_touchingobjectmenu', 'TOUCHINGOBJECTMENU', 'Player'); touch = ST.blk('sensing_touchingobject'); ST.B[touch]['inputs']['TOUCHINGOBJECTMENU'] = [1, tm]; ST.B[tm]['parent'] = touch
until = ST.blk('control_repeat_until'); lt = ST.op('operator_lt', OPERAND1=ST.blk('motion_yposition'), OPERAND2='-170'); ST.inp(until, 'CONDITION', lt)
hit = ifb(ST, touch, ST.changev('score', ('n', 1)), ST.blk('event_broadcast'), ST.blk('control_delete_this_clone'))
bc = [b for b in ST.B if ST.B[b]['opcode'] == 'event_broadcast'][0]; ST.B[bc]['inputs']['BROADCAST_INPUT'] = [1, [11, 'ding', 'bc_ding']]
ST.sub(until, ST.blk('motion_changeyby', {'DY': ('n', -5)}), hit)
ST.stack(ST.hat('control_start_as_clone', 300, 0), ST.blk('motion_gotoxy', {'X': ST.blk('data_variable', fields={'VARIABLE': ST.var('next_x')}), 'Y': ('n', 170)}), ST.blk('looks_show'), until, ST.blk('control_delete_this_clone'))
save('/tmp/ep3/game.sb3', [('Player', PL, (80, 24, '#2563eb'), 0, -140), ('Star', ST, (24, 24, '#facc15'), 0, 170)], G2)

# ---------- 3. marathon: 50 bouncing clones + a counter + a growing list ----------
G3 = P(); M = P(); M.vars = G3.vars; M.lists = G3.lists; LL = M.lst('log')
cm = M.menu('control_create_clone_of_menu', 'CLONE_OPTION', '_myself_'); cc = M.blk('control_create_clone_of'); M.B[cc]['inputs']['CLONE_OPTION'] = [1, cm]; M.B[cm]['parent'] = cc
r = M.blk('control_repeat'); M.B[r]['inputs']['TIMES'] = [1, [6, '50']]; M.sub(r, cc)
f2 = M.blk('control_forever'); M.sub(f2, M.changev('frames', ('n', 1)), M.blk('data_addtolist', {'ITEM': 'tick'}, {'LIST': LL}), M.blk('control_wait', {'DURATION': ('n', 0.1)}))
M.stack(M.hat(), M.setv('frames', ('n', 0)), M.blk('data_deletealloflist', fields={'LIST': LL}), r, f2)
f3 = M.blk('control_forever')
M.sub(f3, M.blk('motion_movesteps', {'STEPS': ('n', 6)}), M.blk('motion_ifonedgebounce'), M.blk('looks_changeeffectby', {'CHANGE': ('n', 5)}, {'EFFECT': ['COLOR', None]}), M.blk('motion_turnright', {'DEGREES': ('n', 3)}))
M.stack(M.hat('control_start_as_clone', 300, 0), M.blk('motion_gotoxy', {'X': M.blk('operator_random', {'FROM': ('n', -200), 'TO': ('n', 200)}), 'Y': M.blk('operator_random', {'FROM': ('n', -150), 'TO': ('n', 150)})}),
        M.blk('motion_pointindirection', {'DIRECTION': M.blk('operator_random', {'FROM': ('n', -180), 'TO': ('n', 180)})}), f3)
save('/tmp/ep3/marathon.sb3', [('Bouncer', M, (30, 30, '#ff3b5c'), 0, 0)], G3)
print('ok', len(EXPECT), 'exam checks')
