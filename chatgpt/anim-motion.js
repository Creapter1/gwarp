/* G-Warp ANIM-P1 — pure motion-data helpers.
 * Standalone proposal. Not imported by app.html; no runtime behavior is activated.
 * This file intentionally does not patch private Animation functions.
 */
(() => {
  'use strict';
  if (window.GW_ANIM_MOTION) return;
  if (typeof window.GW_FEATURE_OFF === 'function' && window.GW_FEATURE_OFF('animMotion')) return;

  const VERSION = 1;
  const CURVES = Object.freeze(['linear','ease','bounce','snap']);
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, Number(n)));
  const clone = value => JSON.parse(JSON.stringify(value));
  const normAngle = n => ((Number(n) % 360) + 540) % 360 - 180;
  const shortAngle = (a,b) => normAngle(Number(b)-Number(a));
  const getAngle = (frame,id,bone) => Number(frame?.angles?.[id] ?? bone?.angle ?? 0);
  const getRoot = (frame,id,bone) => frame?.roots?.[id] || {x:Number(bone?.x)||0,y:Number(bone?.y)||0};
  const easeIO = t => t < .5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
  function bounceOut(t) {
    const n=7.5625,d=2.75;
    if(t<1/d)return n*t*t;
    if(t<2/d){t-=1.5/d;return n*t*t+.75;}
    if(t<2.5/d){t-=2.25/d;return n*t*t+.9375;}
    t-=2.625/d;return n*t*t+.984375;
  }
  function easeValue(curve,t) {
    const x=clamp(t,0,1);
    switch(CURVES.includes(curve)?curve:'ease'){
      case 'linear': return x;
      case 'bounce': return clamp(bounceOut(x),0,1);
      case 'snap': return 1-Math.pow(1-x,3);
      case 'ease':
      default: return easeIO(x);
    }
  }
  function curveFor(frame) {
    return CURVES.includes(frame?.easeToNext) ? frame.easeToNext : 'ease';
  }
  function holdTicks(frame) {
    return clamp(Math.round(Number(frame?.hold)||1),1,4);
  }
  function normalizeFrame(frame) {
    const f=frame&&typeof frame==='object'?frame:{roots:{},angles:{}};
    f.roots ||= {}; f.angles ||= {};
    f.hold=holdTicks(f);
    f.easeToNext=CURVES.includes(f.easeToNext)?f.easeToNext:'ease';
    if(!f.stretch||typeof f.stretch!=='object')f.stretch={};
    Object.keys(f.stretch).forEach(id=>{f.stretch[id]=clamp(Number(f.stretch[id])||1,.6,1.4);});
    return f;
  }
  function interpolateFrame(anim,A,B,t,curve) {
    const u=easeValue(curve,t), out={roots:{},angles:{},stretch:{}};
    const angleIds=new Set([...Object.keys(A?.angles||{}),...Object.keys(B?.angles||{})]);
    const rootIds=new Set([...Object.keys(A?.roots||{}),...Object.keys(B?.roots||{})]);
    const bones=anim?.bones||[], byId=new Map(bones.map(b=>[b.id,b]));
    bones.forEach(b=>{
      const a=getAngle(A,b.id===undefined?'':b.id,b), z=getAngle(B,b.id===undefined?'':b.id,b);
      out.angles[b.id]=normAngle(a+shortAngle(a,z)*u);
      if(!b.parent){
        const p=getRoot(A,b.id,b),q=getRoot(B,b.id,b);
        out.roots[b.id]={x:Math.round((p.x+(q.x-p.x)*u)*100)/100,y:Math.round((p.y+(q.y-p.y)*u)*100)/100};
      }
      const sa=clamp(Number(A?.stretch?.[b.id])||1,.6,1.4),sb=clamp(Number(B?.stretch?.[b.id])||1,.6,1.4);
      if(sa!==1||sb!==1)out.stretch[b.id]=Math.round((sa+(sb-sa)*u)*1000)/1000;
    });
    angleIds.forEach(id=>{if(!byId.has(id)&&Number.isFinite(Number(A?.angles?.[id]??B?.angles?.[id])))out.angles[id]=normAngle(Number(A?.angles?.[id]??0)+(shortAngle(Number(A?.angles?.[id]??0),Number(B?.angles?.[id]??A?.angles?.[id]??0))*u));});
    rootIds.forEach(id=>{if(!byId.has(id)){const p=A?.roots?.[id]||{x:0,y:0},q=B?.roots?.[id]||p;out.roots[id]={x:p.x+(q.x-p.x)*u,y:p.y+(q.y-p.y)*u};}});
    return out;
  }

  function makePlaybackClock(frame=0) {
    return { frame:Math.max(0,frame|0), remaining:0 };
  }
  function resetPlaybackClock(clock,frames,frame=clock?.frame||0) {
    const c=clock||makePlaybackClock(frame);
    c.frame=clamp(frame,0,Math.max(0,(frames?.length||1)-1));
    c.remaining=holdTicks(frames?.[c.frame])-1;
    return c;
  }
  function advancePlaybackClock(clock,frames,loop=true) {
    if(!frames?.length)return 0;
    const c=clock||makePlaybackClock(0);
    c.frame=clamp(c.frame,0,frames.length-1);
    if(c.remaining>0){c.remaining--;return c.frame;}
    if(c.frame+1<frames.length)c.frame++;
    else if(loop)c.frame=0;
    else return c.frame;
    c.remaining=holdTicks(frames[c.frame])-1;
    return c.frame;
  }
  function expandHeldFrames(frames) {
    const result=[];
    (frames||[]).forEach((frame,index)=>{
      const count=holdTicks(frame);
      for(let tick=0;tick<count;tick++)result.push({sourceFrame:index,holdTick:tick+1,holdCount:count});
    });
    return {frames:result,count:result.length,requiresLargeResultConfirmation:result.length>240,hardLimit:960};
  }

  function getStretch(frame,boneId) {
    return clamp(Number(frame?.stretch?.[boneId])||1,.6,1.4);
  }
  function effectiveBoneLength(bone,frame) {
    return Math.max(0,Number(bone?.len)||0)*getStretch(frame,bone?.id);
  }
  function boneLocalScaleX(frame,boneId) {
    return getStretch(frame,boneId);
  }

  function resolveFollowThrough(anim,frameIndex) {
    const frames=anim?.frames||[];
    if(!frames.length)return {roots:{},angles:{},stretch:{}};
    const i=clamp(frameIndex|0,0,frames.length-1), base=clone(normalizeFrame(clone(frames[i])));
    const loop=anim.loop!==false;
    const frameAt=index=>{
      if(loop)return frames[(index%frames.length+frames.length)%frames.length];
      return index<0||index>=frames.length?null:frames[index];
    };
    const bones=anim.bones||[],byId=new Map(bones.map(b=>[b.id,b]));
    // Process in the authored bone order; only explicitly enabled child bones receive a delayed parent delta.
    bones.forEach(b=>{
      const cfg=b.followThrough;
      if(!cfg?.enabled||!b.parent||!byId.has(b.parent))return;
      const delay=clamp(Math.round(Number(cfg.delay)||1),1,2);
      const amount=clamp(Number(cfg.amount)||.35,.15,.75);
      const later=frameAt(i-delay),earlier=frameAt(i-delay-1);
      if(!later||!earlier)return;
      const parent=byId.get(b.parent);
      const delta=shortAngle(getAngle(earlier,b.parent,parent),getAngle(later,b.parent,parent));
      if(Math.abs(delta)<1e-8)return;
      base.angles[b.id]=normAngle(getAngle(base,b.id,b)+delta*amount);
    });
    return base;
  }

  const aliases={
    body:'body',torso:'body',chest:'body',
    head:'head',
    leftarm:'left_arm','left-arm':'left_arm','left arm':'left_arm',arm_l:'left_arm',
    rightarm:'right_arm','right-arm':'right_arm','right arm':'right_arm',arm_r:'right_arm',
    leftleg:'left_leg','left-leg':'left_leg','left leg':'left_leg',leg_l:'left_leg',
    rightleg:'right_leg','right-leg':'right_leg','right leg':'right_leg',leg_r:'right_leg'
  };
  function canonicalName(name) {
    const raw=String(name||'').trim().toLowerCase().replace(/\s+/g,' ');
    return aliases[raw]||aliases[raw.replace(/_/g,'')]||raw.replace(/[\s-]+/g,'_');
  }
  function uniqueBoneMap(anim) {
    const map=new Map(),duplicate=new Set();
    (anim?.bones||[]).forEach(b=>{
      const name=canonicalName(b.name);
      if(!name)return;
      if(map.has(name))duplicate.add(name);else map.set(name,b.id);
    });
    duplicate.forEach(name=>map.delete(name));
    return map;
  }
  function mirrorFrame(anim,frame,centerX=0) {
    const out=clone(normalizeFrame(clone(frame))),map=uniqueBoneMap(anim);
    const pairs=[['left_arm','right_arm'],['left_leg','right_leg'],['body','body'],['head','head']];
    const handled=new Set(),skipped=[];
    pairs.forEach(([left,right])=>{
      const a=map.get(left),b=map.get(right);
      if(!a||!b){if(a||b)skipped.push(a||b);return;}
      const aAngle=frame?.angles?.[a],bAngle=frame?.angles?.[b];
      if(aAngle!==undefined)out.angles[b]=normAngle(-Number(aAngle));
      else delete out.angles[b];
      if(bAngle!==undefined)out.angles[a]=normAngle(-Number(bAngle));
      else delete out.angles[a];
      const aStretch=frame?.stretch?.[a],bStretch=frame?.stretch?.[b];
      if(aStretch!==undefined)out.stretch[b]=clamp(Number(aStretch),.6,1.4);else delete out.stretch[b];
      if(bStretch!==undefined)out.stretch[a]=clamp(Number(bStretch),.6,1.4);else delete out.stretch[a];
      handled.add(a);handled.add(b);
    });
    const roots=Object.keys(frame?.roots||{});
    if(roots.length===1){const id=roots[0],p=frame.roots[id];out.roots[id]={x:2*Number(centerX)-Number(p.x||0),y:Number(p.y)||0};}
    return {frame:out,paired:handled.size,skipped};
  }

  function copyPose(anim,frame) {
    const byId=new Map((anim?.bones||[]).map(b=>[b.id,b]));
    const anglesByName={},rootsByName={},stretchByName={};
    Object.entries(frame?.angles||{}).forEach(([id,value])=>{const b=byId.get(id);if(b)anglesByName[canonicalName(b.name)]=Number(value);});
    Object.entries(frame?.roots||{}).forEach(([id,value])=>{const b=byId.get(id);if(b)rootsByName[canonicalName(b.name)]={x:Number(value.x)||0,y:Number(value.y)||0};});
    Object.entries(frame?.stretch||{}).forEach(([id,value])=>{const b=byId.get(id);if(b)stretchByName[canonicalName(b.name)]=clamp(Number(value),.6,1.4);});
    return {version:VERSION,anglesByName,rootsByName,stretchByName};
  }
  function pastePose(anim,target,clipboard) {
    const out=clone(normalizeFrame(clone(target))),map=uniqueBoneMap(anim);
    let angles=0,roots=0,stretch=0,skipped=0;
    Object.entries(clipboard?.anglesByName||{}).forEach(([name,value])=>{
      const id=map.get(canonicalName(name));
      if(!id){skipped++;return;}out.angles[id]=normAngle(Number(value));angles++;
    });
    Object.entries(clipboard?.rootsByName||{}).forEach(([name,value])=>{
      const id=map.get(canonicalName(name));
      if(!id){skipped++;return;}out.roots[id]={x:Number(value.x)||0,y:Number(value.y)||0};roots++;
    });
    Object.entries(clipboard?.stretchByName||{}).forEach(([name,value])=>{
      const id=map.get(canonicalName(name));
      if(!id){skipped++;return;}out.stretch[id]=clamp(Number(value),.6,1.4);stretch++;
    });
    return {frame:out,angles,roots,stretch,skipped};
  }
  function applyLibraryPose(anim,target,pose) {
    const out=clone(normalizeFrame(clone(target))),map=uniqueBoneMap(anim);
    let applied=0,skipped=0;
    Object.entries(pose?.anglesByName||{}).forEach(([name,value])=>{
      const id=map.get(canonicalName(name));
      if(!id||!Number.isFinite(Number(value))){skipped++;return;}
      out.angles[id]=normAngle(Number(value));applied++;
    });
    return {frame:out,applied,skipped};
  }

  function makeCostumePlan(anim) {
    const plan=expandHeldFrames(anim?.frames||[]);
    return {...plan,entries:plan.frames.map((entry,outputIndex)=>({
      ...entry,outputFrame:outputIndex,
      costumeName:String(anim?.name||'animation')+'//frame '+(outputIndex+1)
    }))};
  }
  function setHold(frame,ticks) { frame.hold=clamp(Math.round(Number(ticks)||1),1,4);return frame.hold; }
  function setCurve(frame,curve) { if(!CURVES.includes(curve))return false;frame.easeToNext=curve;return true; }
  function setStretch(frame,boneId,value) { frame.stretch ||= {};frame.stretch[boneId]=clamp(Number(value)||1,.6,1.4);return frame.stretch[boneId]; }
  function setFollowThrough(bone,options={}) {
    if(!bone)return false;
    const enabled=!!options.enabled;
    if(!bone.parent){bone.followThrough={enabled:false,delay:1,amount:.35};return false;}
    bone.followThrough={enabled,delay:clamp(Math.round(Number(options.delay)||1),1,2),amount:clamp(Number(options.amount)||.35,.15,.75)};
    return true;
  }

  const api=Object.freeze({
    version:VERSION,curves:CURVES,
    easeValue,curveFor,interpolateFrame,normalizeFrame,holdTicks,setHold,setCurve,
    makePlaybackClock,resetPlaybackClock,advancePlaybackClock,expandHeldFrames,makeCostumePlan,
    getStretch,effectiveBoneLength,boneLocalScaleX,setStretch,setFollowThrough,resolveFollowThrough,
    canonicalName,mirrorFrame,copyPose,pastePose,applyLibraryPose
  });
  window.GW_ANIM_MOTION=api;
})();
