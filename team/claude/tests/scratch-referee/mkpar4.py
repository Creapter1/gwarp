from sbgen import *
import json
files={};a=Sprite();b=Sprite();st=Sprite()
TIMER=R('sensing_timer');RESET=R('sensing_resettimer');X=R('motion_xposition')
GO=lambda x,y:R('motion_gotoxy',{'X':x,'Y':y})
BC=lambda m:R('event_broadcast_menu',{},{'BROADCAST_OPTION':[m,m]})
ARG=lambda nm:R('argument_reporter_string_number',{},{'VALUE':nm});ARGB=lambda nm:R('argument_reporter_boolean',{},{'VALUE':nm})
def mut(code,ids,warp):return {"tagName":"mutation","children":[],"proccode":code,"argumentids":json.dumps(ids),"warp":"true" if warp else "false"}
def CALL(code,ids,warp,vals):return R('procedures_call',dict(zip(ids,vals)),{},mut(code,ids,warp))
def define(sp,code,ids,names,body,y,warp,bools=()):
    d=sp.nid();p=sp.nid();B=sp.B
    B[p]={"opcode":"procedures_prototype","next":None,"parent":d,"inputs":{},"fields":{},"shadow":True,"topLevel":False,"mutation":dict(mut(code,ids,warp),argumentnames=json.dumps(names),argumentdefaults=json.dumps(["false" if n in bools else "" for n in names]))}
    for i_,nm in zip(ids,names):
        k=sp.nid();B[k]={"opcode":"argument_reporter_boolean" if nm in bools else "argument_reporter_string_number","next":None,"parent":p,"inputs":{},"fields":{"VALUE":[nm,None]},"shadow":True,"topLevel":False};B[p]['inputs'][i_]=[1,k]
    B[d]={"opcode":"procedures_definition","next":None,"parent":None,"inputs":{"custom_block":[1,p]},"fields":{},"shadow":False,"topLevel":True,"x":700,"y":y}
    c=sp.chain(body,d);B[d]['next']=c
LV=lambda:R('data_variable',{},{'VARIABLE':['lv','lvA']});SETLV=lambda e:R('data_setvariableto',{'VALUE':e},{'VARIABLE':['lv','lvA']})
CLONE=lambda w:R('control_create_clone_of',{'CLONE_OPTION':R('control_create_clone_of_menu',{},{'CLONE_OPTION':w})})
main=[FLAG,
 RESET,CALL('wmove',[],True,[]),T('w01',C('lt',TIMER,'0.3')),T('w02',X),GO(0,0),
 RESET,CALL('nmove',[],False,[]),T('w03',C('gt',TIMER,'0.5')),T('w03b',C('lt',TIMER,'1.5')),GO(0,0),
 RESET,CALL('ncount',[],False,[]),T('w04',C('lt',TIMER,'0.3')),T('w05',VAR('cnt')),
 CALL('add3 %s %s %b',['p1','p2','p3'],True,[4,'5',C('lt',1,2)]),T('w06',VAR('res')),CALL('add3 %s %s %b',['p1','p2','p3'],True,['x','',('r','operator_not',{},{},None)]),T('w07',VAR('res')),
 SET('fib',0),CALL('fibo %s',['q1'],False,[8]),T('w08',VAR('fib')),T('w09',ARG('n')),T('w10',J(ARGB('flag'),'')),
 CALL('outer %s',['o1'],True,[3]),T('w11',VAR('trace')),
 R('sound_setvolumeto',{'VOLUME':150}),T('v01',R('sound_volume')),R('sound_changevolumeby',{'VOLUME':-250}),T('v02',R('sound_volume')),R('sound_setvolumeto',{'VOLUME':'33.3'}),T('v03',R('sound_volume')),R('sound_setvolumeto',{'VOLUME':100}),
 T('n01',J('u:',R('sensing_username'))),T('n02',J('a:',R('sensing_answer'))),T('n03',R('sensing_loudness')),T('n04',R('sensing_current',{},{'CURRENTMENU':'YEAR'})),T('n05',C('gt',R('sensing_current',{},{'CURRENTMENU':'DAYOFWEEK'}),0)),
 SETLV(5),SET('sum',0),SET('cid',0),REP(4,[CHG('cid',1),CLONE('_myself_')]),WAIT('0.4'),T('c01',VAR('sum')),T('c02',LV()),R('event_broadcastandwait',{'BROADCAST_INPUT':BC('report')}),T('c03',VAR('sum')),T('c04',VAR('rcount')),
 CLONE('B'),WAIT('0.3'),T('c05',VAR('bclone')),T('c06',VAR('bx')),
 R('event_broadcast',{'BROADCAST_INPUT':BC('kill')}),WAIT('0.2'),SET('rcount',0),R('event_broadcastandwait',{'BROADCAST_INPUT':BC('report')}),T('c07',VAR('rcount')),
 SET('wu',0),R('control_wait_until',{'CONDITION':C('gt',VAR('tick'),5)}),T('wu1',C('gt',VAR('tick'),5)),
 R('control_wait',{'DURATION':-1}),T('wn',1),
 GO(100,50),SET('ready',1),WAIT('2.2'),T('i01',VAR('kp')),T('i02',VAR('ks')),T('i03',VAR('sc')),T('i04',VAR('mx')),T('i05',VAR('my')),T('i06',VAR('md')),T('i07',VAR('bclick')),GO(0,0),
 T('g01',VAR('tg')),T('zz_done','yes'),R('control_stop',{},{'STOP_OPTION':'all'},{"tagName":"mutation","children":[],"hasnext":"false"})]
a.chain(main,None,0)
define(a,'wmove',[],[],[REP(50,[R('motion_movesteps',{'STEPS':1})])],0,True)
define(a,'nmove',[],[],[REP(20,[R('motion_movesteps',{'STEPS':1})])],200,False)
define(a,'ncount',[],[],[SET('cnt',0),REP(100,[CHG('cnt',1)])],400,False)
define(a,'add3 %s %s %b',['p1','p2','p3'],['a','b','flag'],[SET('res',J(A(ARG('a'),ARG('b')),ARGB('flag')))],600,True,bools=('flag',))
define(a,'fibo %s',['q1'],['n'],[R('control_if_else',{'CONDITION':C('lt',ARG('n'),2),'SUBSTACK':[CHG('fib',ARG('n'))],'SUBSTACK2':[CALL('fibo %s',['q1'],False,[M('subtract',ARG('n'),1)]),CALL('fibo %s',['q1'],False,[M('subtract',ARG('n'),2)])]})],800,False)
define(a,'outer %s',['o1'],['n'],[SET('trace',''),REP(ARG('n'),[CALL('inner %s',['i1'],True,[ARG('n')]),SET('trace',J(VAR('trace'),ARG('n')))])],1000,True)
define(a,'inner %s',['i1'],['n'],[SET('trace',J(VAR('trace'),J('<',J(M('multiply',ARG('n'),2),'>'))))],1200,True)
a.chain([R('control_start_as_clone'),SETLV(VAR('cid')),WAIT('0.1'),CHG('sum',LV())],None,2000)
a.chain([R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':['report','report']}),CHG('rcount',1),CHG('sum',LV())],None,2200)
a.chain([R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':['kill','kill']}),R('control_delete_this_clone')],None,2400)
a.chain([FLAG,R('control_forever',{'SUBSTACK':[CHG('tick',1),WAIT(0)]})],None,2600)
a.chain([R('event_whenkeypressed',{},{'KEY_OPTION':'space'}),CHG('kp',1)],None,2800)
a.chain([R('event_whenthisspriteclicked'),CHG('sc',1)],None,3000)
a.chain([FLAG,R('control_forever',{'SUBSTACK':[R('control_if',{'CONDITION':R('sensing_keypressed',{'KEY_OPTION':R('sensing_keyoptions',{},{'KEY_OPTION':'space'})}),'SUBSTACK':[SET('ks',1)]}),R('control_if',{'CONDITION':R('sensing_mousedown'),'SUBSTACK':[SET('md',1),SET('mx',R('sensing_mousex')),SET('my',R('sensing_mousey'))]}),WAIT(0)]})],None,3200)
a.chain([R('event_whengreaterthan',{'VALUE':1},{'WHENGREATERTHANMENU':'TIMER'}),CHG('tg',1)],None,3600)
a.chain([FLAG,WAIT('30'),SET('late',1)],None,3800)
b.chain([R('control_start_as_clone'),CHG('bclone',1),SET('bx',X)],None,0);b.chain([R('event_whenthisspriteclicked'),CHG('bclick',1)],None,200)
st.chain([R('event_whenstageclicked'),CHG('stclick',1)],None,0)
cs=lambda:[costume(files,n,CIRC,30,30) for n in 'ab']
T0=target('Stage',st.B,[costume(files,'b1',BG('#ffffff'),240,180)],stage=True)
TA=target('A',a.B,cs(),order=2);TA['variables']={'lvA':['lv',0]}
TB=target('B',b.B,cs(),order=1,x=-150,y=-100)
for v in ['kp','ks','sc','mx','my','md','bclick','stclick','tg','late','tick','bclone','bx','rcount','ready']:var(v)
save('par4.sb3',[T0,TB,TA],files,broadcasts=['report','kill']);print(len(V),'vars')
