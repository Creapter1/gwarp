/* gw-sb3-roundtrip.js — B5 packaged SB3 round-trip harness, generated from buffy/sb3-packaged/roundtrip.js by build.js. Do not edit.
   Exposes window.GW_SB3_ROUNDTRIP. Kill switch: localStorage['gwarp-off-sb3-roundtrip']='1'. */
/* B5 packaged SB3 round-trip model. No DOM, no Electron: pure data plus a
   dialog test double. The live harness adds the app callbacks. */
(function (root, factory) {
  'use strict';
  var mod = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = mod;
  if (root) root.GW_SB3_ROUNDTRIP = mod;
})(typeof window !== 'undefined' ? window : null, function (root) {
  'use strict';
  var VERSION = '1.0';
  var CHOSEN = 'stub';

  function clone(value) {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value));
  }
  function isObj(value) { return !!value && typeof value === 'object' && !Array.isArray(value); }
  function canonical(value) {
    if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
    if (isObj(value)) return '{' + Object.keys(value).sort().map(function (k) {
      return JSON.stringify(k) + ':' + canonical(value[k]);
    }).join(',') + '}';
    return JSON.stringify(value);
  }
  function bytesOf(value) {
    if (value instanceof Uint8Array) return value;
    if (value && value.buffer && typeof value.byteLength === 'number') return new Uint8Array(value.buffer, value.byteOffset || 0, value.byteLength);
    if (typeof value === 'string') return new TextEncoder().encode(value);
    throw new Error('save expects bytes or text');
  }
  function safeName(name) {
    return String(name || 'roundtrip.sb3').replace(/[\\/:*?"<>|]+/g, '-');
  }

  /* Counts only the fields this job promises: costumes, frames, bones. */
  function summarize(project) {
    var sprites = Array.isArray(project && project.sprites) ? project.sprites : [];
    var costumes = 0, sounds = 0, animations = 0, frames = 0, boneSlots = 0;
    var boneIds = Object.create(null), animationNames = [], boneNames = [];
    sprites.forEach(function (s) {
      costumes += Array.isArray(s && s.costumes) ? s.costumes.length : 0;
      sounds += Array.isArray(s && s.sounds) ? s.sounds.length : 0;
      (Array.isArray(s && s.gwAnimations) ? s.gwAnimations : []).forEach(function (a) {
        animations += 1;
        if (a && a.name) animationNames.push(String(a.name));
        var fs = Array.isArray(a && a.frames) ? a.frames : [];
        var bs = Array.isArray(a && a.bones) ? a.bones : [];
        frames += fs.length;
        boneSlots += bs.length;
        bs.forEach(function (b) {
          var id = b && (b.id || b.name);
          if (id != null && !boneIds[id]) { boneIds[id] = true; boneNames.push(String(b.name || id)); }
        });
      });
    });
    return {
      sprites: sprites.length,
      costumes: costumes,
      sounds: sounds,
      animations: animations,
      frames: frames,
      boneSlots: boneSlots,
      bones: Object.keys(boneIds).length,
      animationNames: animationNames,
      boneNames: boneNames
    };
  }

  /* The rig payload, in the order frames and bones appear in the project. */
  function rigSnapshot(project) {
    var sprites = Array.isArray(project && project.sprites) ? project.sprites : [];
    return sprites.map(function (s) {
      return {
        name: s && s.name,
        costumes: (Array.isArray(s && s.costumes) ? s.costumes : []).map(function (c) { return c && c.name; }),
        sounds: (Array.isArray(s && s.sounds) ? s.sounds : []).map(function (c) { return c && c.name; }),
        animations: (Array.isArray(s && s.gwAnimations) ? s.gwAnimations : []).map(function (a) {
          return {
            id: a && a.id,
            name: a && a.name,
            frames: clone(a && a.frames || []),
            bones: clone(a && a.bones || [])
          };
        })
      };
    });
  }

  function compareRig(before, after) {
    var left = rigSnapshot(before);
    var right = rigSnapshot(after);
    var leftText = canonical(left), rightText = canonical(right);
    var diffs = [];
    if (leftText !== rightText) {
      left.forEach(function (s, i) {
        var t = right[i];
        if (!t) { diffs.push('sprite[' + i + '] missing'); return; }
        if (canonical(s) !== canonical(t)) diffs.push('sprite[' + s.name + '] rig changed');
      });
      if (right.length !== left.length) diffs.push('sprite count ' + left.length + ' -> ' + right.length);
    }
    return {
      equal: leftText === rightText,
      before: summarize(before),
      after: summarize(after),
      diffs: diffs,
      sha256Before: null,
      sha256After: null,
      beforeText: leftText,
      afterText: rightText
    };
  }

  function compareProject(before, after) {
    var a = canonical(before), b = canonical(after);
    if (a === b) return { equal: true, diffs: [], topKeys: [], spriteKeys: [] };
    var topKeys = Array.from(new Set(Object.keys(before || {}).concat(Object.keys(after || {})))).filter(function (k) {
      return canonical(before && before[k]) !== canonical(after && after[k]);
    });
    var spriteKeys = [];
    var left = before && before.sprites || [], right = after && after.sprites || [];
    for (var i = 0; i < Math.max(left.length, right.length); i++) {
      var x = left[i] || {}, y = right[i] || {};
      Array.from(new Set(Object.keys(x).concat(Object.keys(y)))).forEach(function (k) {
        if (canonical(x[k]) !== canonical(y[k]) && spriteKeys.indexOf(k) < 0) spriteKeys.push(k);
      });
    }
    return { equal: false, diffs: ['top: ' + topKeys.join(',') + '; sprites: ' + spriteKeys.join(',')], topKeys: topKeys, spriteKeys: spriteKeys };
  }

  /* A real dialog double: save/get are injected so the test can replace the
     native picker without editing main.js or touching an OS dialog. */
  function makeDialogStub(io) {
    if (!io || typeof io.save !== 'function') throw new Error('dialog stub needs save(bytes, name)');
    var calls = [];
    return {
      mode: CHOSEN,
      calls: calls,
      async save(value, name) {
        var bytes = bytesOf(value);
        var clean = safeName(name);
        var result = await io.save(bytes, clean);
        calls.push({ action: 'save', name: clean, bytes: bytes.length, result: result || null });
        return result;
      },
      async load(name) {
        if (typeof io.load !== 'function') throw new Error('dialog stub has no load');
        var data = await io.load(name);
        var bytes = bytesOf(data);
        calls.push({ action: 'load', name: safeName(name), bytes: bytes.length });
        return bytes;
      }
    };
  }

  function nativePath() {
    return {
      mode: 'native',
      available: false,
      reason: 'Electron dialog.showSaveDialog is an OS surface; the real path cannot be driven headlessly without editing main.js'
    };
  }
  function choosePath() {
    return { chosen: CHOSEN, rejected: nativePath() };
  }

  function savePlan(project, name) {
    var json = JSON.stringify(project);
    var bytes = new TextEncoder().encode(json);
    return { name: safeName(name || 'packaged-roundtrip.sb3'), json: json, bytes: bytes };
  }

  function checks(before, after, opts) {
    var rig = compareRig(before, after);
    var project = compareProject(before, after);
    var options = opts || {};
    var rows = [
      { id: 'rig-equal', ok: rig.equal, detail: rig.diffs.join('; ') || 'frames and bones identical' },
      { id: 'project-equal', ok: project.equal, required: false, detail: options.projectNote || project.diffs.join('; ') || 'whole project identical' },
      { id: 'frames', ok: rig.after.frames > 0, detail: rig.after.frames + ' frames' },
      { id: 'costumes', ok: rig.after.costumes > 0, detail: rig.after.costumes + ' costumes' },
      { id: 'bones', ok: rig.after.bones > 0, detail: rig.after.bones + ' bones / ' + rig.after.boneSlots + ' slots' },
      { id: 'bytes', ok: Number(options.bytes) > 0, detail: (Number(options.bytes) || 0) + ' SB3 bytes' }
    ];
    return { pass: rows.filter(function (r) { return r.required !== false; }).every(function (r) { return r.ok; }), rows: rows, rig: rig, project: project };
  }

  function httpStub(saveUrl, loadUrl) {
    return makeDialogStub({
      async save(bytes, name) {
        var res = await fetch(saveUrl, { method: 'POST', headers: { 'content-type': 'application/octet-stream', 'x-file-name': name }, body: bytes });
        if (!res.ok) throw new Error('save endpoint ' + res.status);
        return res.json();
      },
      async load() {
        var res = await fetch(loadUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error('load endpoint ' + res.status);
        return new Uint8Array(await res.arrayBuffer());
      }
    });
  }

  /* The live driver. It runs the app's real exporter, routes the bytes through
     the dialog double, then re-opens the saved file through the app's real
     open path. The native picker is deliberately not called. */
  async function runLive(opts) {
    var o = opts || {};
    if (!root || !root.GW8 || typeof root.GW8.exportSB3 !== 'function') throw new Error('GW8.exportSB3 missing');
    if (typeof root.GW_PROJECT_DATA !== 'function') throw new Error('GW_PROJECT_DATA missing');
    if (!o.saveUrl || !o.loadUrl) throw new Error('runLive needs saveUrl and loadUrl');
    var project = clone(root.GW_PROJECT_DATA());
    var extra = [{ name: o.extraName || 'gwarp-project.json', data: new TextEncoder().encode(JSON.stringify(project)) }];
    var exportReport = await root.GW8.exportSB3({ silent: true, noDownload: true, extraFiles: extra });
    var packed = root.GW_LAST_SB3_EXPORT;
    if (!packed || !packed.blob) throw new Error('GW_LAST_SB3_EXPORT.blob missing after export');
    var bytes = new Uint8Array(await packed.blob.arrayBuffer());
    var stub = httpStub(o.saveUrl, o.loadUrl);
    var saved = await stub.save(bytes, exportReport && exportReport.file || 'packaged-roundtrip.sb3');
    var loaded = await stub.load(saved && saved.name || 'packaged-roundtrip.sb3');
    var file = new File([loaded], saved && saved.name || 'packaged-roundtrip.sb3', { type: 'application/x.scratch.sb3' });
    var openResult = null;
    if (typeof root.GW_OPEN_FILE === 'function') {
      openResult = await root.GW_OPEN_FILE(file, null, { keepTitle: true, label: saved && saved.name || 'packaged-roundtrip.sb3' });
    } else if (root.GW8 && typeof root.GW8.importSB3 === 'function') {
      openResult = await root.GW8.importSB3(file);
    } else {
      throw new Error('no G-Warp open path (GW_OPEN_FILE / GW8.importSB3)');
    }
    var after = clone(root.GW_PROJECT_DATA());
    var diff = compareProject(project, after);
    var note = diff.equal ? 'whole project identical' : 'non-rig differences only: ' + diff.diffs.join('; ');
    var verdict = checks(project, after, { bytes: bytes.length, projectNote: note });
    return {
      version: VERSION,
      path: choosePath(),
      exportReport: exportReport,
      transport: { mode: stub.mode, calls: stub.calls },
      saved: saved,
      openResult: openResult,
      before: verdict.rig.before,
      after: verdict.rig.after,
      rig: { equal: verdict.rig.equal, diffs: verdict.rig.diffs, sha256Before: verdict.rig.sha256Before, sha256After: verdict.rig.sha256After },
      projectEqual: diff.equal,
      projectDiffs: diff.diffs,
      projectDiffKeys: { top: diff.topKeys, sprites: diff.spriteKeys },
      pass: verdict.pass && verdict.rig.equal,
      checks: verdict.rows
    };
  }

  return {
    VERSION: VERSION,
    summarize: summarize,
    rigSnapshot: rigSnapshot,
    compareRig: compareRig,
    compareProject: compareProject,
    makeDialogStub: makeDialogStub,
    nativePath: nativePath,
    choosePath: choosePath,
    savePlan: savePlan,
    checks: checks,
    httpStub: httpStub,
    runLive: runLive,
    canonical: canonical
  };
});
