"""Lane C zoo: broadcast names - case, spaces, numbers, join-made names, unknown names, two hats, broadcast and wait with no receiver. Log order must match Scratch."""
from sbgen import *
files={}
ADD=lambda x:R('data_addtolist',{'ITEM':x},{'LIST':lst('LOG')})
BM=lambda n:R('event_broadcast_menu',{},{'BROADCAST_OPTION':[n,n]})
BC=lambda x:R('event_broadcast',{'BROADCAST_INPUT':x})
BW=lambda x:R('event_broadcastandwait',{'BROADCAST_INPUT':x})
HAT=lambda n:R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':[n,n]})
st=Sprite()
st.chain([FLAG,R('data_deletealloflist',{},{'LIST':lst('LOG')}),WAIT(0.2),
 ADD('s1'),BW(BM('Go')),ADD('s2'),BW(J('g','o')),ADD('s3'),BW(J('G','O')),ADD('s4'),
 BW(BM('two words')),ADD('s5'),BW(J('two ','words')),ADD('s6'),BW(A(1,0)),ADD('s7'),BW(J('1','')),ADD('s8'),
 BW(J('no','body')),ADD('s9'),BW(J('',' go')),ADD('s10'),BW(J('go',' ')),ADD('s11'),BW(M('multiply',1.5,2)),ADD('s12'),
 BC(BM('Go')),BC(J('GO','')),ADD('s13'),WAIT(0.3),T('o_log',R('data_listcontents',{},{'LIST':lst('LOG')})),T('o_len',R('data_lengthoflist',{},{'LIST':lst('LOG')})),T('zz_done','yes')],None,0)
a=Sprite()
a.chain([HAT('go'),ADD('a-go')],None,0)
a.chain([HAT('go'),ADD('a-go2')],None,200)
a.chain([HAT('two words'),ADD('a-tw')],None,400)
a.chain([HAT('1'),ADD('a-1')],None,600)
a.chain([HAT('3'),ADD('a-3')],None,800)
b=Sprite();b.chain([HAT('GO'),ADD('b-GO')],None,0)
save('bcast.sb3',[target('Stage',st.B,[costume(files,'b1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1),target('B',b.B,[costume(files,'b',CIRC,30,30)],order=2)],
 files,broadcasts=('go','two words','1','3','Go','GO'))
