"""Lane C zoo: sound volume limits, per-sprite volume, 'of' block on volume/costume/backdrop, text ops on odd input."""
from sbgen import *
files={};a=Sprite();b=Sprite()
VOL=R('sound_volume');SV=lambda v:R('sound_setvolumeto',{'VOLUME':v});CV=lambda v:R('sound_changevolumeby',{'VOLUME':v})
OF=lambda prop,obj:R('sensing_of',{'OBJECT':R('sensing_of_object_menu',{},{'OBJECT':obj})},{'PROPERTY':prop})
LET=lambda i,s:R('operator_letter_of',{'LETTER':i,'STRING':s});LEN=lambda s:R('operator_length',{'STRING':s})
CONT=lambda a,b:R('operator_contains',{'STRING1':a,'STRING2':b})
a.chain([FLAG,SV(150),T('v1',VOL),SV(-5),T('v2',VOL),SV('abc'),T('v3',VOL),SV(40),CV(25.5),T('v4',VOL),CV(-1000),T('v5',VOL),
 SV('55.25'),T('v6',VOL),WAIT(0.1),T('v7',OF('volume','B')),T('v8',OF('volume','_stage_')),T('v9',OF('costume #','B')),
 T('v10',OF('costume name','B')),T('v11',OF('backdrop #','_stage_')),T('v12',OF('x position','Nope')),T('v13',OF('size','B')),
 T('s1',LET(0,'abc')),T('s2',LET('1.5','abc')),T('s3',LET(4,'abc')),T('s4',LEN(123.0)),T('s5',LEN('héllo')),
 T('s6',CONT('ABC','b')),T('s7',CONT('abc','')),T('s8',LET('-1','abc')),T('s9',LEN(J('',''))),T('s10',J(1.50,'')),
 T('s11',J(M('divide',1,3),'')),T('s12',J(M('multiply','0.1','3'),'')),T('s13',LEN(M('divide',1,0))),T('zz_done','yes')],None,0)
b.chain([FLAG,SV(30),R('looks_switchcostumeto',{'COSTUME':R('looks_costume',{},{'COSTUME':'d2'})}),R('looks_setsizeto',{'SIZE':'250'})],None,0)
save('vol.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1),
 target('B',b.B,[costume(files,'d1',CIRC,30,30),costume(files,'d2',CIRC,30,30)],order=2)],files)
