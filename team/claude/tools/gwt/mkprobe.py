import json,zipfile,hashlib,sys
z=zipfile.ZipFile('move.sb3');pj=json.loads(z.read('project.json'));files={n:z.read(n) for n in z.namelist() if n!='project.json'}
S='<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">%s</svg>'
shapes={'A':S%'<circle cx="30" cy="30" r="28" fill="#f00"/>','B':S%'<rect x="10" y="10" width="40" height="20" fill="#f00"/>','C':S%'<rect width="60" height="60" fill="#f00"/>',
'D':S%'<rect x="10" y="10" width="40" height="20" fill="#f00" stroke="#000" stroke-width="6"/>','E':S%'<rect x="10.4" y="10.6" width="39.3" height="20.2" fill="#f00"/>',
'F':'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="-20 -5 100 40"><rect x="0" y="0" width="30" height="30" fill="#f00"/></svg>'}
base=pj['targets'][1];T=[pj['targets'][0]];V={}
for i,(k,svg) in enumerate(shapes.items()):
    d=svg.encode();h=hashlib.md5(d).hexdigest();files[h+'.svg']=d
    t=json.loads(json.dumps(base));t['name']=k;t['layerOrder']=i+1;t['costumes']=[{"name":"c","assetId":h,"md5ext":h+".svg","dataFormat":"svg","rotationCenterX":30,"rotationCenterY":30}]
    def b(op,nx,par,inp=None,fld=None,top=False):
        d={"opcode":op,"next":nx,"parent":par,"inputs":inp or {},"fields":fld or {},"shadow":False,"topLevel":top}
        if top:d.update(x=0,y=0)
        return d
    n=lambda v:[1,[4,str(v)]]
    def setv(id_,nx,par,name,rep):
        V[name]=1;return {id_:b('data_setvariableto',nx,par,{'VALUE':[3,id_+'r',[10,'']]},{'VARIABLE':[name,name]}),id_+'r':b(rep,None,id_)}
    B={'a':b('event_whenflagclicked','g1',None,top=True),'g1':b('motion_gotoxy','s1','a',{'X':n(1000),'Y':n(1000)})}
    B.update(setv('s1','g2','g1','R_'+k,'motion_xposition'));B.update(setv('s2','g3','g2x','T_'+k,'motion_yposition'))
    B['g2']=b('motion_gotoxy','g2x','s1',{'X':n(-1000),'Y':n(-1000)});B.update(setv('g2x','s2','g2','L_'+k,'motion_xposition'));B['s2']['next']='s3';B.update(setv('s3','g3','s2','Bo_'+k,'motion_yposition'))
    B['s2']['inputs']['VALUE'][1]='s2r'
    B['g3']=b('motion_gotoxy','z','s3',{'X':n(0),'Y':n(0)});B['z']=b('looks_setsizeto','z2','g3',{'SIZE':n(-5)})
    B.update(setv('z2','z3','z','MIN_'+k,'looks_size'));B['z3']=b('looks_setsizeto','z4','z2',{'SIZE':n(100000)});B.update(setv('z4',None,'z3','MAX_'+k,'looks_size'))
    t['blocks']=B;T.append(t)
T[0]['variables']={v:[v,0] for v in V};pj['targets']=T
o=zipfile.ZipFile('probe.sb3','w');o.writestr('project.json',json.dumps(pj));[o.writestr(k,d) for k,d in files.items()];o.close()
