"""Lane C zoo: clone-local variables and lists. Clones copy sprite-local vars/lists at creation, changes stay local; 'of' reads the original."""
from sbgen import *
files={};a=Sprite()
LV=lambda:R('data_variable',{},{'VARIABLE':['m','lv_m']})
LSET=lambda e:R('data_setvariableto',{'VALUE':e},{'VARIABLE':['m','lv_m']})
LADD=lambda e:R('data_addtolist',{'ITEM':e},{'LIST':['L','ll_L']})
LLEN=lambda:R('data_lengthoflist',{},{'LIST':['L','ll_L']})
LITEM=lambda i:R('data_itemoflist',{'INDEX':i},{'LIST':['L','ll_L']})
GADD=lambda e:R('data_addtolist',{'ITEM':e},{'LIST':lst('log')})
CLONE=R('control_create_clone_of',{'CLONE_OPTION':R('control_create_clone_of_menu',{},{'CLONE_OPTION':'_myself_'})})
OF=lambda p:R('sensing_of',{'OBJECT':R('sensing_of_object_menu',{},{'OBJECT':'A'})},{'PROPERTY':p})
a.chain([FLAG,R('data_deletealloflist',{},{'LIST':lst('log')}),R('data_deletealloflist',{},{'LIST':['L','ll_L']}),
 T('cnt','0'),LSET('5'),LADD('a'),CLONE,LSET('6'),LADD('b'),CLONE,CLONE,WAIT('0.5'),
 T('c1',LV()),T('c2',LLEN()),T('c3',R('data_itemoflist',{'INDEX':'last'},{'LIST':lst('log')})),
 T('c4',R('data_lengthoflist',{},{'LIST':lst('log')})),T('c5',OF('m')),T('c6',J(LITEM('1'),LITEM('2'))),
 T('c7',R('data_listcontents',{},{'LIST':lst('log')})),T('zz_done','yes')],None,0)
a.chain([R('control_start_as_clone'),CHG('cnt','1'),LSET(J(LV(),VAR('cnt'))),LADD(VAR('cnt')),
 GADD(J(LV(),J('/',LLEN()))),R('control_delete_this_clone')],None,600)
st=target('Stage',{},[costume(files,'b',BG('#fff'),240,180)],stage=True)
sp=target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)
sp['variables']={'lv_m':['m',0]};sp['lists']={'ll_L':['L',[]]}
save('clvar.sb3',[st,sp],files)
