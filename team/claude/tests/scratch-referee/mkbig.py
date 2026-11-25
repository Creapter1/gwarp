# python3 mkbig.py SPRITES SCRIPTS -> big.sb3 (a large project to time opening: many sprites, scripts, variables, costumes)
from sbgen import *
import sys
NS=int(sys.argv[1]) if len(sys.argv)>1 else 30;NK=int(sys.argv[2]) if len(sys.argv)>2 else 20
files={};T=[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True)]
for si in range(NS):
    a=Sprite()
    for k in range(NK):
        v='v%d_%d'%(si,k%5)
        body=[SET(v,0),REP(10,[CHG(v,1),R('control_if_else',{'CONDITION':C('gt',M('mod',VAR(v),3),0),'SUBSTACK':[R('motion_movesteps',{'STEPS':M('add',VAR(v),J('1','0'))}),R('looks_nextcostume')],'SUBSTACK2':[R('motion_turnright',{'DEGREES':15}),R('motion_gotoxy',{'X':M('multiply',VAR(v),2),'Y':M('subtract',0,VAR(v))})]}),WAIT(0.1)]),
              R('looks_sayforsecs',{'MESSAGE':J('hello ',VAR(v)),'SECS':1}),R('data_addtolist',{'ITEM':VAR(v)},{'LIST':lst('L%d'%si)})]
        hat=FLAG if k%3==0 else R('event_whenkeypressed',{},{'KEY_OPTION':['space',None]}) if k%3==1 else R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':['go','go']})
        a.chain([hat]+body)
    cos=[costume(files,'c%d_%d'%(si,j),'<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="%d" fill="#%02x5cf6"/><rect x="%d" y="20" width="12" height="12" fill="#fff"/></svg>'%(20+j,(si*7)%256,10+j*4),30,30) for j in range(4)]
    T.append(target('S%d'%si,a.B,cos,order=si+1))
save('big.sb3',T,files,broadcasts=['go'])
print('blocks about',NS*NK*17)
