from sbgen import *
import json,sys
files={};a=Sprite();c=Sprite()
TIMER=R('sensing_timer');RESET=R('sensing_resettimer');NOW=lambda:M('multiply',R('sensing_dayssince2000'),86400)
def TIME(name,call):return [SET('t0',NOW()),call,T(name,M('subtract',NOW(),VAR('t0')))]
def mut(code,warp):return {"tagName":"mutation","children":[],"proccode":code,"argumentids":"[]","warp":"true" if warp else "false"}
CALL=lambda code,warp=True:R('procedures_call',{},{},mut(code,warp))
def define(sp,code,body,y,warp=True):
    d=sp.nid();p=sp.nid();B=sp.B
    B[p]={"opcode":"procedures_prototype","next":None,"parent":d,"inputs":{},"fields":{},"shadow":True,"topLevel":False,"mutation":dict(mut(code,warp),argumentnames="[]",argumentdefaults="[]")}
    B[d]={"opcode":"procedures_definition","next":None,"parent":None,"inputs":{"custom_block":[1,p]},"fields":{},"shadow":False,"topLevel":True,"x":700,"y":y}
    B[d]['next']=sp.chain(body,d)
LADD=lambda l,v:R('data_addtolist',{'ITEM':v},{'LIST':lst(l)});LI=lambda l,i:R('data_itemoflist',{'INDEX':i},{'LIST':lst(l)})
LREP=lambda l,i,v:R('data_replaceitemoflist',{'INDEX':i,'ITEM':v},{'LIST':lst(l)});LLEN=lambda l:R('data_lengthoflist',{},{'LIST':lst(l)})
GO=lambda x,y:R('motion_gotoxy',{'X':x,'Y':y})
N=int(sys.argv[1]) if len(sys.argv)>1 else 1
main=[FLAG,R('looks_hide'),
 *TIME('T1_count_loop',CALL('b_loop')),
 *TIME('T2_math',CALL('b_math')),
 *TIME('T3_list',CALL('b_list')),
 *TIME('T4_if_compare',CALL('b_ifs')),
 *TIME('T5_pen',CALL('b_pen')),
 *TIME('T6_strings',CALL('b_str')),
 SET('n2',0),RESET,R('control_repeat_until',{'CONDITION':C('gt',TIMER,2),'SUBSTACK':[CHG('n2',1)]}),T('C7_plain_loops_in_2s',VAR('n2')),
 R('event_broadcast',{'BROADCAST_INPUT':R('event_broadcast_menu',{},{'BROADCAST_OPTION':['clones','clones']})}),R('control_wait_until',{'CONDITION':C('gt',VAR('frames'),0)}),WAIT(1),SET('f0',VAR('frames')),WAIT(3),T('C8_clone_frames_in_3s',M('subtract',VAR('frames'),VAR('f0'))),T('zz_done','yes')]
a.chain(main,None,0)
define(a,'b_loop',[SET('n',0),REP(100000*N,[CHG('n',1)])],0)
define(a,'b_math',[SET('x',1),SET('i',0),REP(50000*N,[SET('x',M('mod',A(M('multiply',VAR('x'),'1.0001'),R('operator_mathop',{'NUM':VAR('i')},{'OPERATOR':'sin'})),1000)),CHG('i',1)])],300)
define(a,'b_list',[R('data_deletealloflist',{},{'LIST':lst('L')}),SET('i',0),REP(20000*N,[CHG('i',1),LADD('L',M('mod',M('multiply',VAR('i'),7919),1000))]),SET('s',0),SET('i',0),REP(20000*N,[CHG('i',1),CHG('s',LI('L',VAR('i'))),LREP('L',VAR('i'),A(LI('L',VAR('i')),1))]),SET('len',LLEN('L'))],600)
define(a,'b_ifs',[SET('i',0),SET('k',0),REP(50000*N,[CHG('i',1),R('control_if_else',{'CONDITION':R('operator_and',{'OPERAND1':C('gt',M('mod',VAR('i'),3),0),'OPERAND2':R('operator_not',{'OPERAND':C('equals',M('mod',VAR('i'),5),0)})}),'SUBSTACK':[CHG('k',1)],'SUBSTACK2':[CHG('k',-1)]})])],900)
define(a,'b_pen',[R('pen_clear'),R('pen_setPenSizeTo',{'SIZE':2}),R('pen_penDown'),SET('i',0),REP(4000*N,[CHG('i',1),GO(M('subtract',M('mod',M('multiply',VAR('i'),37),480),240),M('subtract',M('mod',M('multiply',VAR('i'),53),360),180))]),R('pen_penUp'),GO(0,0)],1200)
define(a,'b_str',[SET('s2',''),SET('i',0),REP(20000*N,[CHG('i',1),SET('s2',J(R('operator_letter_of',{'LETTER':A(M('mod',VAR('i'),5),1),'STRING':'hello'}),R('operator_length',{'STRING':J(VAR('i'),'x')})))])],1500)
c.chain([R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':['clones','clones']}),R('looks_show'),REP(300,[R('control_create_clone_of',{'CLONE_OPTION':R('control_create_clone_of_menu',{},{'CLONE_OPTION':'_myself_'})})]),R('control_forever',{'SUBSTACK':[CHG('frames',1),R('motion_turnright',{'DEGREES':1})]})],None,0)
c.chain([R('control_start_as_clone'),GO(R('operator_random',{'FROM':-200,'TO':200}),R('operator_random',{'FROM':-150,'TO':150})),R('motion_pointindirection',{'DIRECTION':R('operator_random',{'FROM':0,'TO':360})}),R('control_forever',{'SUBSTACK':[R('motion_movesteps',{'STEPS':3}),R('motion_ifonedgebounce'),R('motion_turnright',{'DEGREES':2})]})],None,300)
for v in ['frames','f0']:var(v)
SMALL='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#8b5cf6"/></svg>'
save('bench.sb3',[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1),target('C',c.B,[costume(files,'a',SMALL,10,10)],order=2,visible=False)],files,ext=['pen'],broadcasts=['clones'])
