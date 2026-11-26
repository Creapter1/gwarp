from sbgen import *
files={};a=Sprite()
a.chain([FLAG,SET('a',7),SET('b','a'),SET('c',0),CHG('c','a'),SET('d','05'),SET('e',' 12 '),CHG('e','3'),SET('f',J('0','5')),SET('g',M('add',1,2)),CHG('g',J('1','0')),SET('h','hello'),CHG('h',1),SET('i',''),CHG('i',''),
 R('data_addtolist',{'ITEM':'a'},{'LIST':lst('L')}),R('data_addtolist',{'ITEM':M('add',1,2)},{'LIST':lst('L')}),R('data_insertatlist',{'INDEX':1,'ITEM':J('x','y')},{'LIST':lst('L')}),R('data_replaceitemoflist',{'INDEX':'last','ITEM':'05'},{'LIST':lst('L')}),R('data_addtolist',{'ITEM':'q'},{'LIST':lst('L')}),R('data_deleteoflist',{'INDEX':M('add',1,1)},{'LIST':lst('L')})])
save('nat.sb3',[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)],files)
