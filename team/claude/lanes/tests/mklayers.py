"""Lane C zoo: layer order, checked by a real click. 6 round sprites sit on the click point (100,50); diff.js clicks it
once after `ready`=1 (space is pressed just before). The topmost pickable sprite writes its name into `clk`.
Writes lay1.sb3 .. lay12.sb3 (one scenario each)."""
from sbgen import *
FB=lambda s:R('looks_gotofrontback',{},{'FRONT_BACK':s})
FW=lambda d,n:R('looks_goforwardbackwardlayers',{'NUM':n},{'FORWARD_BACKWARD':d})
CLONE=R('control_create_clone_of',{'CLONE_OPTION':R('control_create_clone_of_menu',{},{'CLONE_OPTION':'_myself_'})})
CNUM=R('looks_costumenumbername',{},{'NUMBER_NAME':'number'})
KEY=lambda k:R('event_whenkeypressed',{},{'KEY_OPTION':k})
def build(fn,flag,space=None,clone=None,extra=None):
    files={};ts=[];st=Sprite()
    st.chain([FLAG,SET('clk','none'),WAIT(0.3),SET('ready',1)],None,0)
    st.chain([R('event_whenstageclicked'),SET('clk','stage')],None,200)
    ts.append(target('Stage',st.B,[costume(files,'b1','<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"/>',1,1)],stage=True))
    for k in range(1,7):
        s=Sprite();n=f'P{k}'
        s.chain([FLAG]+[x for x in flag.get(n,[])],None,0)
        s.chain([R('event_whenthisspriteclicked'),SET('clk',J(n,J('-',CNUM)))],None,300)
        if space and n in space:s.chain([KEY('space')]+space[n],None,600)
        if clone and n in clone:s.chain([R('control_start_as_clone'),R('looks_switchcostumeto',{'COSTUME':R('looks_costume',{},{'COSTUME':'c2'})})]+clone[n],None,900)
        if extra and n in extra:s.chain(extra[n],None,1200)
        ts.append(target(n,s.B,[costume(files,'c1',CIRC,30,30),costume(files,'c2',CIRC,30,30)],order=k,x=100,y=50))
    save(fn,ts,files)
GO=lambda x,y:R('motion_gotoxy',{'X':x,'Y':y})
S=[ # (name, flag scripts, space scripts, clone scripts)
 ('lay1',{},None,None),                                   # P6 on top
 ('lay2',{'P2':[FB('front')]},None,None),                 # P2
 ('lay3',{'P6':[FW('backward',2)]},None,None),            # P5
 ('lay4',{'P3':[FW('forward',10)]},None,None),            # P3 (clamped)
 ('lay5',{'P6':[FW('forward',-2)]},None,None),            # forward -2 = back 2
 ('lay6',{'P2':[FB('front')]},{'P1':[FB('front')]},None), # space after flag
 ('lay7',{'P6':[R('looks_hide')]},None,None),             # hidden not clickable
 ('lay8',{'P6':[R('looks_seteffectto',{'VALUE':100},{'EFFECT':'GHOST'})]},None,None), # ghost 100
 ('lay9',{'P3':[FB('front'),CLONE]},None,{'P3':[]}),      # clone goes under its parent
 ('lay10',{'P3':[CLONE]},None,{'P3':[FB('front')]}),      # clone that goes to front
 ('lay11',{'P6':[FB('back'),FW('forward','1.6')]},None,None), # fractional layers
 ('lay12',{k:[GO(-100,-50)] for k in ['P1','P2','P3','P4','P5','P6']},None,None), # nothing there: stage
 ('lay13',{'P5':[FW('backward','abc'),FB('front'),FW('backward',1)]},None,None),
 ('lay14',{'P6':[R('looks_seteffectto',{'VALUE':99},{'EFFECT':'GHOST'})]},None,None),
 ('lay15',{'P4':[R('looks_setsizeto',{'SIZE':1}),FB('front')]},None,None), # tiny but on the point
]
for n,f,sp,cl in S:build(n+'.sb3',f,sp,cl)
