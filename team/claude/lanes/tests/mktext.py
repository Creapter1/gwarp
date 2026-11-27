"""Lane C zoo: text blocks (letter of, length, contains, join with numbers) and the 'of' sensing block reading another sprite."""
from sbgen import *
files={};a=Sprite();b=Sprite()
LET=lambda i,s:R('operator_letter_of',{'LETTER':i,'STRING':s});LEN=lambda s:R('operator_length',{'STRING':s})
CON=lambda s,t:R('operator_contains',{'STRING1':s,'STRING2':t})
OF=lambda p,o:R('sensing_of',{'OBJECT':R('sensing_of_object_menu',{},{'OBJECT':[o,None]})},{'PROPERTY':[p,None]})
a.chain([FLAG,WAIT(0.2),T('s1',LET(1,'hello')),T('s2',LET(0,'hello')),T('s3',LET(6,'hello')),T('s4',LET('2.7','hello')),
 T('s5',LET(1,123)),T('s6',LEN('')),T('s7',LEN(12.50)),T('s8',LEN('héllo')),T('s9',CON('Hello','ELL')),T('s10',CON('abc','')),
 T('s11',J(1,2)),T('s12',J('',0.1)),T('s13',A(J(1,2),1)),T('s14',J(A(0.1,0.2),'')),T('s15',LEN(J('a',' '))),
 T('o1',OF('x position','B')),T('o2',OF('y position','B')),T('o3',OF('direction','B')),T('o4',OF('size','B')),
 T('o5',OF('costume name','B')),T('o6',OF('backdrop name','_stage_')),T('o7',OF('bvar','B')),T('o8',OF('x position','Nope')),
 T('zz_done','yes')],None,0)
b.chain([FLAG,R('motion_gotoxy',{'X':37,'Y':-12}),R('motion_pointindirection',{'DIRECTION':45}),
 R('looks_setsizeto',{'SIZE':150}),R('data_setvariableto',{'VALUE':'local7'},{'VARIABLE':['bvar','bvar']})],None,0)
save('text.sb3',[target('Stage',{},[costume(files,'bg1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1),target('B',b.B,[costume(files,'dot',CIRC,30,30)],order=2,variables={'bvar':['bvar',0]})],files)
