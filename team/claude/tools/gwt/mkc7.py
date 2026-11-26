from sbgen import *
files={};a=Sprite()
TIMER=R('sensing_timer');RESET=R('sensing_resettimer')
a.chain([FLAG,SET('n2',0),RESET,R('control_repeat_until',{'CONDITION':C('gt',TIMER,6),'SUBSTACK':[CHG('n2',1)]}),T('C7',VAR('n2'))])
save('c7.sb3',[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)],files)
