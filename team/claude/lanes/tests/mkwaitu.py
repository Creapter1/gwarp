"""Lane C zoo: wait until (true at once / late check), broadcast and wait order, re-broadcast restarts - log order must match Scratch."""
from sbgen import *
files={};S=[]
ADD=lambda v:R('data_addtolist',{'ITEM':v},{'LIST':lst('LOG')})
LOGC=R('data_listcontents',{},{'LIST':lst('LOG')})
WU=lambda c:R('control_wait_until',{'CONDITION':c})
BM=lambda n:R('event_broadcast_menu',{},{'BROADCAST_OPTION':[n,n]})
BW=lambda n:R('event_broadcastandwait',{'BROADCAST_INPUT':BM(n)})
BC=lambda n:R('event_broadcast',{'BROADCAST_INPUT':BM(n)})
HAT=lambda n:R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':[n,n]})
st=Sprite()
st.chain([FLAG,R('data_deletealloflist',{},{'LIST':lst('LOG')}),SET('g',0),WAIT(2),
 T('o_log',LOGC),T('o_len',R('data_lengthoflist',{},{'LIST':lst('LOG')})),T('o_g',VAR('g')),T('zz_done','yes')],None,0)
a=Sprite();a.chain([FLAG,WAIT(0.1),ADD('a0'),WU(C('gt',1,0)),ADD('a1'),REP(3,[CHG('g',1),ADD(J('a',VAR('g')))]),ADD('a-end')],None,0)
b=Sprite();b.chain([FLAG,WAIT(0.1),ADD('b0'),WU(C('gt',VAR('g'),1)),ADD(J('b',VAR('g')))],None,0)
c=Sprite();c.chain([FLAG,WAIT(0.5),ADD('c0'),BW('m'),ADD('c-after'),BC('n'),BC('n'),ADD('c-end')],None,0)
d=Sprite();d.chain([HAT('m'),ADD('dm0'),REP(2,[ADD('dm')]),ADD('dm-end')],None,0)
d.chain([HAT('n'),ADD('dn0'),WAIT(0),ADD('dn1')],None,1)
e=Sprite();e.chain([HAT('m'),ADD('em'),WAIT(0.1),ADD('em-end')],None,0)
for n,s in (('A',a),('B',b),('C',c),('D',d),('E',e)):S.append(target(n,s.B,[costume(files,'a',CIRC,30,30)],order=len(S)+1))
save('waitu.sb3',[target('Stage',st.B,[costume(files,'b1',BG('#fff'),240,180)],stage=True)]+S,files,broadcasts=('m','n'))
