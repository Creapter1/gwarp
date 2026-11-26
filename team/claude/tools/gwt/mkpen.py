from sbgen import *
files={};p=Sprite()
GO=lambda x,y:R('motion_gotoxy',{'X':x,'Y':y});DOWN=R('pen_penDown');UP=R('pen_penUp')
COL=lambda c:R('pen_setPenColorToColor',{'COLOR':c});SZ=lambda n:R('pen_setPenSizeTo',{'SIZE':n})
PAR=lambda k,v:R('pen_setPenColorParamTo',{'COLOR_PARAM':R('pen_menu_colorParam',{},{'colorParam':k}),'VALUE':v})
def line(x0,y0,x1,y1):return [GO(x0,y0),DOWN,GO(x1,y1),UP]
main=[FLAG,R('pen_clear'),COL('#ff0000'),SZ(1)]+line(-220,160,-60,160)+[COL('#0000ff'),SZ(5)]+line(-220,140,-60,140)+[COL('#00aa00'),SZ(20)]+line(-210,110,-70,110)
main+=[COL('#ff8800'),SZ(10)]+line(-210,80,-70,20)+[COL('#aa00aa'),SZ(30),GO(-30,140),DOWN,UP,SZ(3),COL('#000000')]
main+=[GO(0,170),DOWN,GO(100,170),GO(100,90),GO(0,90),GO(0,170),UP]
main+=[COL('#00ffff'),SZ(16),PAR('transparency',50)]+line(10,100,90,160)+[PAR('transparency',0),PAR('color',0),PAR('saturation',100),PAR('brightness',100),SZ(8)]
for i in range(8): main+=[PAR('color',i*12.5)]+line(120+i*14,90,120+i*14,170)
main+=[SZ(1),COL('#333333')]
for i in range(6): main+=line(-220,-10-i*4,-60+i*10,-10-i*4-i*3)
main+=[GO(160,30),R('pen_stamp'),R('looks_setsizeto',{'SIZE':50}),R('motion_pointindirection',{'DIRECTION':45}),GO(60,30),R('pen_stamp'),R('looks_setsizeto',{'SIZE':100}),R('motion_pointindirection',{'DIRECTION':90}),R('looks_hide')]
p.chain(main,None,0)
QUAD='<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="30" height="30" fill="#ef4444"/><rect x="30" width="30" height="30" fill="#22c55e"/><rect y="30" width="30" height="30" fill="#3b82f6"/><rect x="30" y="30" width="30" height="30" fill="#facc15"/><circle cx="30" cy="30" r="11" fill="#fff"/><rect x="5" y="28" width="50" height="4" fill="#111"/></svg>'
T=[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('P',p.B,[costume(files,'q',QUAD,30,30)],order=1)]
fx=[('GHOST',50),('COLOR',50),('BRIGHTNESS',40),('PIXELATE',40),('MOSAIC',20),('WHIRL',200),('FISHEYE',100)]
for i,(k,v) in enumerate(fx):
    e=Sprite();e.chain([FLAG,R('looks_seteffectto',{'VALUE':v},{'EFFECT':k})],None,0)
    T.append(target('F'+k,e.B,[costume(files,'q',QUAD,30,30)],order=2+i,x=-200+i*66,y=-120))
save('pen.sb3',T,files,ext=['pen'])
