"""Tiny .sb3 builder for differential tests (Claude Fable, 25 Nov). Reporters/statements are tuples made by R()."""
import json,zipfile,hashlib
MENUS={'looks_costume','looks_backdrops'}
BOOL_OPS={'operator_and','operator_or','operator_not'}
class Sprite:
    def __init__(s):s.B={};s.n=0
    def nid(s):s.n+=1;return f"k{s.n}"
    def emit(s,e,parent):
        i=s.nid();_,op,inp,fld,mut=e;ins={}
        for k,v in inp.items():
            if isinstance(v,list): 
                if v: ins[k]=[2,s.chain(v,i)]
            elif isinstance(v,tuple):
                c=s.emit(v,i)
                if v[1].endswith('menu') or v[1] in MENUS or v[1].startswith('pen_menu'): s.B[c]['shadow']=True;ins[k]=[1,c]
                elif k=='CONDITION' or op in BOOL_OPS: ins[k]=[2,c]
                else: ins[k]=[3,c,[10,""]]
            elif isinstance(v,str) and v.startswith('#') and len(v)==7: ins[k]=[1,[9,v]]
            else: ins[k]=[1,[10,str(v)]]
        s.B[i]={"opcode":op,"next":None,"parent":parent,"inputs":ins,"fields":{k:[v,None] if not isinstance(v,list) else v for k,v in fld.items()},"shadow":False,"topLevel":False}
        if mut:s.B[i]['mutation']=mut
        return i
    def chain(s,stmts,parent=None,y=0):
        first=prev=None
        for st in stmts:
            i=s.emit(st,prev or parent)
            if prev:s.B[prev]['next']=i
            else:
                first=i
                if parent is None:s.B[i].update(parent=None,topLevel=True,x=20,y=y)
            prev=i
        return first
V={};LISTS={}
def R(op,inp=None,fld=None,mut=None):return ('r',op,inp or {},fld or {},mut)
def var(v):V[v]=1;return [v,v]
def lst(v):LISTS[v]=1;return [v,v]
SET=lambda v,e:R('data_setvariableto',{'VALUE':e},{'VARIABLE':var(v)})
CHG=lambda v,e:R('data_changevariableby',{'VALUE':e},{'VARIABLE':var(v)})
VAR=lambda v:R('data_variable',{},{'VARIABLE':var(v)})
T=SET
A=lambda a,b:R('operator_add',{'NUM1':a,'NUM2':b});M=lambda o,a,b:R('operator_'+o,{'NUM1':a,'NUM2':b})
C=lambda o,a,b:R('operator_'+o,{'OPERAND1':a,'OPERAND2':b});J=lambda a,b:R('operator_join',{'STRING1':a,'STRING2':b})
F=lambda f,x:R('operator_mathop',{'NUM':x},{'OPERATOR':f})
REP=lambda n,body:R('control_repeat',{'TIMES':n,'SUBSTACK':body})
WAIT=lambda t:R('control_wait',{'DURATION':t})
FLAG=R('event_whenflagclicked')
def svg_asset(files,svg):
    d=svg.encode() if isinstance(svg,str) else svg;h=hashlib.md5(d).hexdigest();files[h+'.svg']=d;return h
def costume(files,name,svg,cx,cy):
    h=svg_asset(files,svg);return {"name":name,"assetId":h,"md5ext":h+".svg","dataFormat":"svg","rotationCenterX":cx,"rotationCenterY":cy}
def target(name,blocks,costumes,stage=False,order=0,**kw):
    t=dict(isStage=stage,name=name,variables={},lists={},broadcasts={},blocks=blocks,comments={},currentCostume=0,costumes=costumes,sounds=[],volume=100,layerOrder=order)
    if stage:t.update(tempo=60,videoTransparency=50,videoState="on",textToSpeechLanguage=None)
    else:t.update(visible=True,x=0,y=0,size=100,direction=90,draggable=False,rotationStyle="all around")
    t.update(kw);return t
def save(path,targets,files,ext=None,broadcasts=()):
    st=targets[0];st['variables'].update({v:[v,0] for v in V});st['lists'].update({l:[l,[]] for l in LISTS});st['broadcasts']={b:b for b in broadcasts}
    pj={"targets":targets,"monitors":[],"extensions":ext or [],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}}
    z=zipfile.ZipFile(path,'w');z.writestr('project.json',json.dumps(pj));[z.writestr(k,d) for k,d in files.items()];z.close()
CIRC='<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#8b5cf6"/></svg>'
BG=lambda c:f'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360"><rect width="480" height="360" fill="{c}"/></svg>'
