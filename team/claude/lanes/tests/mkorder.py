"""Lane C zoo: run order. 12 sprites + clones + broadcasts write into one log list; Scratch order must match exactly."""
from sbgen import *
files={};S=[]
ADD=lambda v:R('data_addtolist',{'ITEM':v},{'LIST':lst('LOG')})
BM=lambda b:R('event_broadcast_menu',{},{'BROADCAST_OPTION':[b,b]})
BC=lambda b:R('event_broadcast',{'BROADCAST_INPUT':BM(b)})
BW=lambda b:R('event_broadcastandwait',{'BROADCAST_INPUT':BM(b)})
WHEN=lambda b:R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':[b,b]})
CLONE=R('control_create_clone_of',{'CLONE_OPTION':R('control_create_clone_of_menu',{},{'CLONE_OPTION':'_myself_'})})
st=Sprite()
st.chain([FLAG,R('data_deletealloflist',{},{'LIST':lst('LOG')}),SET('t',0),WAIT(0.2),BW('a'),ADD('S-after-a'),BC('b'),ADD('S-after-b'),
 R('control_wait_until',{'CONDITION':C('gt',VAR('t'),5)}),ADD('S-t5'),BC('c'),BC('c'),WAIT(0.5),
 T('o_log',R('data_listcontents',{},{'LIST':lst('LOG')})),T('o_len',R('data_lengthoflist',{},{'LIST':lst('LOG')})),T('zz_done','yes')],None,0)
for k in range(12):
    s=Sprite();n=f'P{k}'
    s.chain([WHEN('a'),ADD(J(n,'a1')),R('control_wait',{'DURATION':0}),ADD(J(n,'a2'))],None,0)
    s.chain([WHEN('b'),ADD(J(n,'b')),CHG('t',1)],None,200)
    s.chain([WHEN('c'),ADD(J(n,'c'))],None,400)
    if k%4==0:
        s.chain([WHEN('b'),SET('id',0),REP(2,[CHG('id',1),CLONE])],None,600)
        s.chain([R('control_start_as_clone'),ADD(J(n,J('clone',R('data_variable',{},{'VARIABLE':['id','id']})))),R('control_delete_this_clone')],None,800)
    S.append(target(n,s.B,[costume(files,'a',CIRC,30,30)],order=k+1,x=k*10-60,variables={'id':['id',0]}))
V.pop('id',None)
save('order.sb3',[target('Stage',st.B,[costume(files,'b1',BG('#fff'),240,180)],stage=True)]+S,files,broadcasts=['a','b','c'])
