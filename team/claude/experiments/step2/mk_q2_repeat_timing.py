from sbgen import *
files={};a=Sprite();st=Sprite()
TIMER=R('sensing_timer');RESET=R('sensing_resettimer')
a.chain([FLAG,WAIT(0.5)]+sum([[RESET,REP(10,[R('motion_movesteps',{'STEPS':0})]),SET('t%d'%i,TIMER)] for i in range(12)],[])+[SET('zz_done','yes')],None,0)
T0=target('Stage',st.B,[costume(files,'b1',BG('#ffffff'),240,180)],stage=True)
TA=target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)
save('q2.sb3',[T0,TA],files)
