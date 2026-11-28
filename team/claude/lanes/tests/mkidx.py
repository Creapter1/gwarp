"""Lane C zoo: 'change by' on text/empty/decimal values and list index words/odd indexes (last, 1.5, 0, -1, len+1, ' 2 ', 'LAST', all)."""
from sbgen import *
files={};a=Sprite()
L=lst('L')
ADD=lambda x:R('data_addtolist',{'ITEM':x},{'LIST':L})
ITEM=lambda i:R('data_itemoflist',{'INDEX':i},{'LIST':L})
DEL=lambda i:R('data_deleteoflist',{'INDEX':i},{'LIST':L})
INS=lambda i,x:R('data_insertatlist',{'INDEX':i,'ITEM':x},{'LIST':L})
REPL=lambda i,x:R('data_replaceitemoflist',{'INDEX':i,'ITEM':x},{'LIST':L})
LEN=R('data_lengthoflist',{},{'LIST':L})
CONT=R('data_listcontents',{},{'LIST':L})
CLR=R('data_deletealloflist',{},{'LIST':L})
ch=[FLAG,SET('v1','abc'),CHG('v1',1),SET('v2',''),CHG('v2','2.5'),SET('v3','0.1'),CHG('v3','0.2'),
 SET('v4','1e2'),CHG('v4','x'),SET('v5','true'),CHG('v5',1),SET('v6',' 3 '),CHG('v6',1),
 CLR]+[ADD(x) for x in ['a','b','c','d','e']]+[
 T('i01',ITEM('last')),T('i02',ITEM('1.5')),T('i03',J(ITEM('0'),'|')),T('i04',J(ITEM('-1'),'|')),
 T('i05',J(ITEM('6'),'|')),T('i06',ITEM(' 2 ')),T('i07',J(ITEM('LAST'),'|')),T('i08',J(ITEM('x'),'|')),
 T('i09',ITEM('2.9')),INS('6','f'),T('i10',CONT),INS('8','g'),T('i11',CONT),REPL('7','z'),T('i12',CONT),
 DEL('last'),T('i13',CONT),DEL('0'),T('i14',CONT),INS('last','y'),T('i15',CONT),INS('1','w'),T('i16',CONT),
 DEL('1.7'),T('i17',CONT),DEL('all'),T('i18',J(LEN,'|')),T('zz_done','yes')]
a.chain(ch,None,0)
st=target('Stage',{},[costume(files,'b',BG('#fff'),240,180)],stage=True)
sp=target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)
save('idx.sb3',[st,sp],files)
