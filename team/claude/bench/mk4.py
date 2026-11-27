# Episode 4: a typical Scratch "3D engine" project (mesh in lists, rotate + project with sin/cos, draw edges with pen,
# all inside a "run without screen refresh" custom block). Builds 3d_pen.sb3 and 3d_math.sb3 (same math, no drawing).
import sys, json, math
sys.path.insert(0, '/tmp/ep3'); import mk3
from mk3 import P, save

def build(path, draw, LAT=40, LON=48, once=False):
    G = P(); S = P(); S.vars = G.vars; S.lists = G.lists
    vx, vy, vz = (S.lst(n) for n in ('vx', 'vy', 'vz')); ea, eb = S.lst('ea'), S.lst('eb'); px, py = S.lst('px'), S.lst('py')
    X, Y, Z, A, Bl = [], [], [], [], []
    for i in range(LAT):
        th = math.pi * i / (LAT - 1)
        for j in range(LON):
            ph = 2 * math.pi * j / LON
            X.append(round(120 * math.sin(th) * math.cos(ph), 3)); Y.append(round(120 * math.cos(th), 3)); Z.append(round(120 * math.sin(th) * math.sin(ph), 3))
            k = i * LON + j + 1
            A.append(k); Bl.append(i * LON + (j + 1) % LON + 1)                 # ring edge
            if i < LAT - 1: A.append(k); Bl.append(k + LON)                  # meridian edge
    for name, vals in (('vx', X), ('vy', Y), ('vz', Z), ('ea', A), ('eb', Bl)): G.lists[name][1] = vals
    V = lambda n: S.blk('data_variable', fields={'VARIABLE': S.var(n)})
    def ar(op, a, b): return S.blk('operator_' + op, {'NUM1': a, 'NUM2': b})
    def item(lst, idx): b = S.blk('data_itemoflist', fields={'LIST': lst}); S.inp(b, 'INDEX', idx); return b
    def length(lst): return S.blk('data_lengthoflist', fields={'LIST': lst})
    def rep(times, *body): c = S.blk('control_repeat'); S.inp(c, 'TIMES', times); return S.sub(c, *body)
    def add(lst, v): return S.blk('data_addtolist', {'ITEM': v}, {'LIST': lst})
    mut = {'tagName': 'mutation', 'children': [], 'proccode': 'render', 'argumentids': '[]', 'warp': 'true'}
    proto = S.blk('procedures_prototype', shadow=True); S.B[proto]['mutation'] = dict(mut, argumentnames='[]', argumentdefaults='[]')
    defn = S.hat('procedures_definition', 400, 0); S.B[defn]['inputs']['custom_block'] = [1, proto]; S.B[proto]['parent'] = defn
    body = [S.setv('sa', S.math('sin', V('angle'))), S.setv('ca', S.math('cos', V('angle'))),
            S.setv('sb', S.math('sin', ar('multiply', V('angle'), ('n', 0.7)))), S.setv('cb', S.math('cos', ar('multiply', V('angle'), ('n', 0.7)))),
            S.blk('data_deletealloflist', fields={'LIST': px}), S.blk('data_deletealloflist', fields={'LIST': py}), S.setv('i', ('n', 1)),
            rep(length(vx),
                S.setv('x', item(vx, V('i'))), S.setv('y', item(vy, V('i'))), S.setv('z', item(vz, V('i'))),
                S.setv('x2', ar('subtract', ar('multiply', V('x'), V('ca')), ar('multiply', V('z'), V('sa')))),
                S.setv('z2', ar('add', ar('multiply', V('x'), V('sa')), ar('multiply', V('z'), V('ca')))),
                S.setv('y2', ar('subtract', ar('multiply', V('y'), V('cb')), ar('multiply', V('z2'), V('sb')))),
                S.setv('z3', ar('add', ar('multiply', V('y'), V('sb')), ar('multiply', V('z2'), V('cb')))),
                S.setv('f', ar('divide', ('n', 300), ar('add', V('z3'), ('n', 400)))),
                add(px, ar('multiply', V('x2'), V('f'))), add(py, ar('multiply', V('y2'), V('f'))), S.changev('i', ('n', 1)))]
    if draw:
        body += [S.blk('pen_clear'), S.setv('k', ('n', 1)),
                 rep(length(ea),
                     S.setv('a', item(ea, V('k'))), S.setv('b', item(eb, V('k'))),
                     S.blk('motion_gotoxy', {'X': item(px, V('a')), 'Y': item(py, V('a'))}), S.blk('pen_penDown'),
                     S.blk('motion_gotoxy', {'X': item(px, V('b')), 'Y': item(py, V('b'))}), S.blk('pen_penUp'), S.changev('k', ('n', 1)))]
    S.stack(defn, *body)
    call = S.blk('procedures_call'); S.B[call]['mutation'] = dict(mut)
    f = S.blk('control_forever'); S.sub(f, S.changev('angle', ('n', 2)), call, S.changev('frames', ('n', 1)))
    if once: S.stack(S.hat(), S.blk('looks_hide'), S.blk('pen_setPenSizeTo', {'SIZE': ('n', 1)}), S.setv('angle', ('n', 30)), call, S.setv('frames', ('n', 1)))
    else: S.stack(S.hat(), S.blk('looks_hide'), S.blk('pen_setPenSizeTo', {'SIZE': ('n', 1)}), S.setv('angle', ('n', 0)), S.setv('frames', ('n', 0)), S.blk('sensing_resettimer'), f)
    save(path, [('Engine3D', S, (4, 4, '#000000'), 0, 0)], G)
    # pen extension must be declared
    import zipfile; z = zipfile.ZipFile(path); pj = json.loads(z.read('project.json')); files = {n: z.read(n) for n in z.namelist()}; z.close()
    pj['extensions'] = ['pen'] if draw else []
    with zipfile.ZipFile(path, 'w') as o:
        for n, d in files.items(): o.writestr(n, json.dumps(pj) if n == 'project.json' else d)
    return len(X), len(A)

print('pen', build('/tmp/ep4/3d_pen.sb3', True), 'math', build('/tmp/ep4/3d_math.sb3', False), 'once', build('/tmp/ep4/3d_once.sb3', True, once=True))
