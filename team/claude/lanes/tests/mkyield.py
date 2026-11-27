"""Lane C zoo: how loops yield between sprites (repeat, repeat until, forever, nested, wait 0, stop script) - log order must match Scratch."""
from sbgen import *
files={};S=[]
ADD=lambda v:R('data_addtolist',{'ITEM':v},{'LIST':lst('LOG')})
LOGC=R('data_listcontents',{},{'LIST':lst('LOG')})
UNTIL=lambda c,b:R('control_repeat_until',{'CONDITION':c,'SUBSTACK':b})
STOPS=R('control_stop',{},{'STOP_OPTION':['this script',None]})
st=Sprite()
st.chain([FLAG,R('data_deletealloflist',{},{'LIST':lst('LOG')}),SET('g',0),WAIT(1.5),
 T('o_log',LOGC),T('o_len',R('data_lengthoflist',{},{'LIST':lst('LOG')})),T('o_g',VAR('g')),T('zz_done','yes')],None,0)
a=Sprite();a.chain([FLAG,WAIT(0.1),REP(3,[ADD('a'),CHG('g',1)]),ADD('a-end'),REP(2,[REP(2,[ADD('an')])]),ADD('a-n-end')],None,0)
b=Sprite();b.chain([FLAG,WAIT(0.1),UNTIL(C('gt',VAR('g'),2),[ADD(J('b',VAR('g')))]),ADD('b-end'),REP(3,[WAIT(0),ADD('bw')])],None,0)
c=Sprite();c.chain([FLAG,WAIT(0.1),R('control_forever',{'SUBSTACK':[ADD('c'),R('control_if',{'CONDITION':C('gt',VAR('g'),1),'SUBSTACK':[ADD('c-stop'),STOPS]})]})],None,0)
d=Sprite();d.chain([FLAG,WAIT(0.1),ADD('d0'),REP(0,[ADD('never')]),REP(-1,[ADD('never2')]),REP(2.5,[ADD('d')]),ADD('d-end')],None,0)
for n,s in (('A',a),('B',b),('C',c),('D',d)):S.append(target(n,s.B,[costume(files,'a',CIRC,30,30)],order=len(S)+1))
save('yield.sb3',[target('Stage',st.B,[costume(files,'b1',BG('#fff'),240,180)],stage=True)]+S,files)
