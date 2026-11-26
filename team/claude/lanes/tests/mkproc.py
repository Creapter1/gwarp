"""Lane C zoo: custom blocks (args, bool args, recursion, warp, args outside definition, missing proc)."""
import json
from sbgen import *
files={};a=Sprite()
def proto(pc,ids,names,warp):
    inp={i:R('argument_reporter_boolean' if '%b' in pc.split()[k+1:k+2] or False else 'argument_reporter_string_number',{},{'VALUE':n}) for k,(i,n) in enumerate(zip(ids,names))}
    m={'tagName':'mutation','children':[],'proccode':pc,'argumentids':json.dumps(ids),'argumentnames':json.dumps(names),'argumentdefaults':json.dumps(['']*len(ids)),'warp':warp}
    return R('procedures_prototype',inp,None,m)
def DEF(pc,ids,names,body,warp='false',kinds=None):
    p=proto(pc,ids,names,warp)
    if kinds:  # fix arg reporter kinds
        p=('r','procedures_prototype',{i:R('argument_reporter_boolean' if k=='b' else 'argument_reporter_string_number',{},{'VALUE':n}) for i,n,k in zip(ids,names,kinds)},{},p[4])
    return [R('procedures_definition',{'custom_block':p})]+body
def CALL(pc,ids,args,warp='false'):
    return R('procedures_call',dict(zip(ids,args)),None,{'tagName':'mutation','children':[],'proccode':pc,'argumentids':json.dumps(ids),'warp':warp})
ARG=lambda n:R('argument_reporter_string_number',{},{'VALUE':n})
BARG=lambda n:R('argument_reporter_boolean',{},{'VALUE':n})
IF=lambda c,b:R('control_if',{'CONDITION':c,'SUBSTACK':b})
IFE=lambda c,b,e:R('control_if_else',{'CONDITION':c,'SUBSTACK':b,'SUBSTACK2':e})
# fact %s -> global r
a.chain(DEF('fact %s',['n'],['n'],[IFE(C('lt',ARG('n'),'2'),[SET('r',1)],[CALL('fact %s',['n'],[M('subtract',ARG('n'),'1')]),SET('r',M('multiply',VAR('r'),ARG('n')))])]),None,0)
# fib %s with list stack via var acc
a.chain(DEF('fib %s',['n'],['n'],[IFE(C('lt',ARG('n'),'2'),[CHG('acc',ARG('n'))],[CALL('fib %s',['n'],[M('subtract',ARG('n'),'1')]),CALL('fib %s',['n'],[M('subtract',ARG('n'),'2')])])],'true'),None,300)
a.chain(DEF('cat %s %s',['p','q'],['p','q'],[SET('s',J(ARG('p'),ARG('q'))),SET('s2',A(ARG('p'),ARG('q')))]),None,600)
a.chain(DEF('bt %b',['b'],['b'],[IFE(BARG('b'),[SET('bv','T')],[SET('bv','F')]),SET('bj',J(BARG('b'),''))],kinds=['b']),None,900)
a.chain(DEF('w loop',[],[],[REP('1000',[CHG('wl',1)])],'true'),None,1200)
a.chain(DEF('dup %s %s',['d1','d2'],['x','x'],[SET('dp',ARG('x'))]),None,1500)
a.chain(DEF('stopper',[],[],[SET('st1','in'),R('control_stop',{},{'STOP_OPTION':['this script',None]},{'tagName':'mutation','children':[],'hasnext':'false'}),SET('st1','after')]),None,1800)
a.chain([FLAG,SET('acc',0),SET('wl',0),
 CALL('fact %s',['n'],['5']),T('p1',VAR('r')),CALL('fact %s',['n'],['abc']),T('p2',VAR('r')),
 CALL('fib %s',['n'],['10'],'true'),T('p3',VAR('acc')),
 CALL('cat %s %s',['p','q'],['1','2']),T('p4',VAR('s')),T('p5',VAR('s2')),
 CALL('cat %s %s',['p','q'],['a',' ']),T('p6',VAR('s')),T('p7',VAR('s2')),
 CALL('cat %s %s',['p','q'],[]),T('p8',VAR('s')),
 CALL('bt %b',['b'],[C('equals','1','1')]),T('p9',VAR('bv')),T('p10',VAR('bj')),
 CALL('bt %b',['b'],[]),T('p11',VAR('bv')),T('p12',VAR('bj')),
 CALL('w loop',[],[]),T('p13',VAR('wl')),
 T('p14',ARG('n')),T('p15',J(BARG('b'),'')),
 CALL('nothing here %s',['z'],['1']),T('p16','ok'),
 CALL('dup %s %s',['d1','d2'],['A','B']),T('p17',VAR('dp')),
 CALL('stopper',[],[]),T('p18',VAR('st1')),T('zz_done','yes')],None,2100)
# fix: prototype shadow + arg reporter shadows inside prototype
for k,b in a.B.items():
    if b['opcode']=='procedures_definition':
        pid=b['inputs']['custom_block'][1];b['inputs']['custom_block']=[1,pid];a.B[pid]['shadow']=True
        for i,v in a.B[pid]['inputs'].items():a.B[pid]['inputs'][i]=[1,v[1]];a.B[v[1]]['shadow']=True
save('proc.sb3',[target('Stage',{},[costume(files,'b1','<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"/>',1,1)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)],files)
