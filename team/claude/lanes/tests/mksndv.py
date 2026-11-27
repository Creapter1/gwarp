"""Lane C zoo: sound volume limits, sound effects clear, pen blocks mixed with reporters (sound/pen edge cases)."""
from sbgen import *
files={};a=Sprite()
V=R('sound_volume');SV=lambda v:R('sound_setvolumeto',{'VOLUME':v});CV=lambda v:R('sound_changevolumeby',{'VOLUME':v})
FX=lambda e,v:R('sound_seteffectto',{'VALUE':v},{'EFFECT':[e,None]})
PS=lambda v:R('pen_setPenSizeTo',{'SIZE':v})
a.chain([FLAG,SV(100),T('v0',V),SV(150),T('v1',V),SV(-5),T('v2',V),SV('abc'),T('v3',V),SV(33.3),T('v4',V),
 CV(1e9),T('v5',V),CV(-1e9),T('v6',V),SV('50'),CV('7.5'),T('v7',V),SV(''),T('v8',V),
 FX('PITCH',99999),FX('PAN',-500),R('sound_cleareffects'),T('v9',V),
 R('pen_clear'),PS(-3),R('pen_penDown'),R('motion_gotoxy',{'X':10,'Y':20}),R('pen_penUp'),T('p1',R('motion_xposition')),
 PS(99999),R('pen_stamp'),T('p2',R('motion_yposition')),SV(100),T('zz_done','yes')],None,0)
save('sndv.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)],files)
