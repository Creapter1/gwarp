const fs = require('fs');
const path = require('path');
const assert = require('assert');

const easingA = require('./easing-A.js');
const easingB = require('./easing-B.js');
const easingC = require('./easing-C.js');
const rigA = require('./auto-rig-A.js');
const rigB = require('./auto-rig-B.js');
const rigC = require('./auto-rig-C.js');

// 1. Test L1 Easing boundary conditions & shortest-arc wraparound (170 deg -> -170 deg = +20 deg, mid = 180/-180)
for (const mod of [easingA, easingB, easingC]) {
  assert.strictEqual(mod.ease(0), 0, `${mod.name} ease(0) must be 0`);
  assert.strictEqual(mod.ease(1), 1, `${mod.name} ease(1) must be 1`);
  assert(Math.abs(mod.ease(0.5) - 0.5) < 1e-6, `${mod.name} ease(0.5) must be 0.5`);

  const poseA = { roots: { body: { x: 60, y: 60 } }, angles: { armL: 170 } };
  const poseB = { roots: { body: { x: 60, y: 70 } }, angles: { armL: -170 } };
  const mid = mod.mix(poseA, poseB, 0.5);
  assert(Math.abs(Math.abs(mid.angles.armL) - 180) < 1e-6, `${mod.name} shortest-arc failed: got ${mid.angles.armL}`);
}

// Verify Option A, B, C produce distinct intermediate curves at t = 0.25
const t25 = [easingA.ease(0.25), easingB.ease(0.25), easingC.ease(0.25)];
assert.strictEqual(new Set(t25.map(v => v.toFixed(4))).size, 3, 'L1 easing A/B/C must be distinct at t=0.25');

// 2. Test L2 Auto-Rig on all 3 G3 characters (volt-robot.svg, lightning-bug.svg, battery-buddy.svg)
const charDir = path.join(__dirname, '..', 'rig-characters');
const charFiles = ['volt-robot.svg', 'lightning-bug.svg', 'battery-buddy.svg'];
const expectedGroups = ['head', 'body', 'armL', 'armR', 'legL', 'legR'];

const summary = [];
for (const file of charFiles) {
  const svg = fs.readFileSync(path.join(charDir, file), 'utf8');
  for (const [label, rigger] of [['A', rigA], ['B', rigB], ['C', rigC]]) {
    const res = rigger.autoRig(svg);
    assert.strictEqual(res.bones.length, 6, `${file} [${label}] expected 6 bones, got ${res.bones.length}`);
    for (const g of expectedGroups) {
      assert.strictEqual(res.parts[`g#${g}`], g, `${file} [${label}] missing part mapping g#${g}`);
    }
  }
  const cRes = rigC.autoRig(svg);
  summary.push({
    Character: file,
    BonesFound: cRes.bones.length,
    ArmLPivot: `(${cRes.pivots.armL.x},${cRes.pivots.armL.y})`,
    ArmRPivot: `(${cRes.pivots.armR.x},${cRes.pivots.armR.y})`,
    LegLPivot: `(${cRes.pivots.legL.x},${cRes.pivots.legL.y})`,
    LegRPivot: `(${cRes.pivots.legR.x},${cRes.pivots.legR.y})`
  });
}

console.table(summary);
console.log('ALL L1 EASING + L2 AUTO-RIG TESTS PASSED (3/3 easing models, 3/3 G3 characters x 3 riggers = 9/9 rigs).');
