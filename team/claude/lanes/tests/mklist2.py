"""Lane C zoo: more list edge cases (contents joining rule, odd indexes, case-insensitive find, numbers vs text, insert/replace out of range, big list)."""
from sbgen import *
files={};a=Sprite()
L=lambda:lst('q');Q={'LIST':L()}
ADD=lambda v:R('data_addtolist',{'ITEM':v},Q);ITEM=lambda i:R('data_itemoflist',{'INDEX':i},Q)
LEN=lambda:R('data_lengthoflist',{},Q);CON=lambda:R('data_listcontents',{},Q)
NUM=lambda v:R('data_itemnumoflist',{'ITEM':v},Q);HAS=lambda v:R('data_listcontainsitem',{'ITEM':v},Q)
CLR=R('data_deletealloflist',{},Q)
s=[FLAG,WAIT(0.2),CLR,ADD('a'),ADD('b'),ADD('c'),T('c1',CON()),ADD('dd'),T('c2',CON()),
 CLR,ADD(1),ADD(2),ADD(3),T('c3',CON()),ADD(''),T('c4',CON()),
 T('i0',ITEM(0)),T('i1',ITEM(-1)),T('i2',ITEM(1.5)),T('i3',ITEM(' 2')),T('i4',ITEM('x')),T('i5',ITEM(99)),T('i6',ITEM('LAST')),
 CLR,ADD('Apple'),ADD('10'),ADD('1e1'),ADD(' x'),
 T('n1',NUM('apple')),T('n2',NUM(10)),T('n3',NUM('10.0')),T('n4',NUM('x')),T('n5',NUM('nope')),
 T('h1',HAS('APPLE')),T('h2',HAS(10)),T('h3',HAS('1e1')),T('h4',HAS('x')),
 R('data_insertatlist',{'ITEM':'e','INDEX':5},Q),T('j1',LEN()),R('data_insertatlist',{'ITEM':'f','INDEX':9},Q),T('j2',LEN()),
 R('data_insertatlist',{'ITEM':'g','INDEX':0},Q),T('j3',LEN()),R('data_replaceitemoflist',{'INDEX':0,'ITEM':'z'},Q),T('j4',ITEM(1)),
 R('data_deleteoflist',{'INDEX':0},Q),T('j5',LEN()),R('data_deleteoflist',{'INDEX':'x'},Q),T('j6',LEN()),
 CLR,REP(5000,[ADD('k')]),T('b1',LEN()),T('b2',ITEM(5000)),R('data_deleteoflist',{'INDEX':1},Q),T('b3',LEN()),
 T('zz_done','yes')]
a.chain(s,None,0)
save('list2.sb3',[target('Stage',{},[costume(files,'bg1',BG('#fff'),240,180)],stage=True),target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)],files)
