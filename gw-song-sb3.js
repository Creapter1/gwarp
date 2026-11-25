/* GENERATED FILE - do not edit.
   A3 SB3 song carrier: recipe comments on export, sounds + recipes on import.
   Source: buffy/song-identity/{identity,bridge,sb3}.js or buffy/song-recipe/recipe.js
   Rebuild: node buffy/song-identity/build.js
   Loaded by gw-perf.js (Buffy's file); app.html is unchanged. */
/*
 * A3 SB3 song carrier — Buffy-owned, loaded by gw-perf.js after the identity bridge.
 *
 * The app's final exporter writes sounds but no recipe comments. Its importer rebuilds
 * sprites and blocks but drops sounds. This module closes that exact gap without editing
 * app.html:
 *   - wraps GW8.exportSB3 (and the toolbar path) and rebuilds the same .sb3 with one
 *     Stage recipe comment per saved song;
 *   - wraps GW8.importSB3, removes recipe comments before the app's importer sees them,
 *     restores the sounds the importer drops, fingerprints them, and attaches the recipes.
 *
 * It never changes ordinary comments, never overwrites an existing gwSong, and every hook
 * is additive and try/catch-guarded. Kill switch: localStorage 'gwarp-off-song-sb3' = '1'.
 *
 * Works in Node for tests (module.exports) and in the app (window.GW_SONG_SB3).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(root);
  else root.GW_SONG_SB3 = factory(root);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const VERSION = '1.0';
  const state = {
    version: VERSION,
    wired: false,
    ready: false,
    exportWrapped: false,
    importWrapped: false,
    clickWrapped: false,
    suppress: false,
    lastExport: null,
    lastImport: null,
    errors: []
  };

  function now() { return new Date().toISOString(); }
  function errText(e) { return String((e && e.message) || e); }
  function note(e) {
    state.errors.push({ at: now(), error: errText(e) });
    if (state.errors.length > 30) state.errors.shift();
    try { if (root.console) root.console.warn('[GW song SB3]', errText(e)); } catch (x) {}
  }
  function getR(explicit) { return explicit || root.GW_SONG_RECIPE || null; }
  function getID() { return root.GW_SONG_IDENTITY || null; }
  function isObject(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  function clone(v) { try { return JSON.parse(JSON.stringify(v)); } catch (e) { return v; } }
  function textBytes(value) {
    try { return new TextEncoder().encode(String(value)).length; }
    catch (e) { try { return Buffer.byteLength(String(value), 'utf8'); } catch (x) { return String(value).length; } }
  }
  function allSprites() {
    try { return ((root.Engine && root.Engine.sprites) || []).filter(function (s) { return s && !s.isClone; }); }
    catch (e) { return []; }
  }
  function soundList() {
    const out = [];
    allSprites().forEach(function (s) { (s.sounds || []).forEach(function (snd) { if (snd) out.push(snd); }); });
    return out;
  }
  function mimeFor(ext) {
    const e = String(ext || 'wav').toLowerCase();
    if (e === 'mp3' || e === 'mpeg') return 'audio/mpeg';
    if (e === 'ogg' || e === 'oga') return 'audio/ogg';
    return 'audio/wav';
  }
  function base64Bytes(b64) {
    const bin = atob(String(b64 || ''));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function le16(b, i) { return (b[i] | (b[i + 1] << 8)) >>> 0; }
  function le32(b, i) { return (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0; }
  function wavChannels(bytes) {
    try {
      if (!bytes || bytes.length < 44) return 0;
      if (String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) !== 'RIFF') return 0;
      if (String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]) !== 'WAVE') return 0;
      let off = 12;
      while (off + 8 <= bytes.length) {
        const id = String.fromCharCode(bytes[off], bytes[off + 1], bytes[off + 2], bytes[off + 3]);
        const size = le32(bytes, off + 4);
        if (id === 'fmt ' && off + 10 <= bytes.length) return le16(bytes, off + 10);
        off += 8 + size + (size & 1);
      }
    } catch (e) {}
    return 0;
  }

  /* ---------- pure export transform ---------- */

  /* Add one Stage comment per distinct saved-song recipe. Mutates the project object;
     returns real counts, never a silent success. */
  function augmentProject(project, sprites, explicitR) {
    const R = getR(explicitR);
    const out = { added: 0, songs: 0, bytes: 0, errors: [], total: 0, ids: [] };
    if (!R) { out.errors.push('GW_SONG_RECIPE is not loaded'); return out; }
    if (!isObject(project) || !Array.isArray(project.targets)) { out.errors.push('project.targets is missing'); return out; }
    const stage = project.targets.find(function (t) { return t && t.isStage; });
    if (!stage) { out.errors.push('project has no Stage target'); return out; }
    if (!isObject(stage.comments)) stage.comments = {};
    const used = new Set(Object.keys(stage.comments));
    let nextIndex = used.size;
    (Array.isArray(sprites) ? sprites : []).forEach(function (spr) {
      (spr && spr.sounds || []).forEach(function (snd) {
        if (!snd || !snd.gwSong) return;
        out.songs++;
        try {
          const comment = R.commentFor(snd.gwSong, nextIndex);
          if (used.has(comment.id)) return;             /* one comment per recipe id */
          stage.comments[comment.id] = comment;
          used.add(comment.id);
          out.ids.push(comment.id);
          out.added++;
          nextIndex++;
          out.bytes += textBytes(comment.text);
        } catch (e) {
          out.errors.push(errText(e));
        }
      });
    });
    out.total = Object.keys(stage.comments).length;
    return out;
  }

  /* Remove only recipe comments that parse. Malformed recipe-looking comments stay visible
     rather than being silently deleted; valid ordinary comments are never touched. */
  function stripRecipeComments(project, explicitR) {
    const R = getR(explicitR);
    const out = { recipes: [], removed: 0, kept: 0, errors: [] };
    if (!R) { out.errors.push('GW_SONG_RECIPE is not loaded'); return out; }
    if (!isObject(project) || !Array.isArray(project.targets)) { out.errors.push('project.targets is missing'); return out; }
    project.targets.forEach(function (target) {
      if (!target || !isObject(target.comments)) return;
      const next = {};
      Object.keys(target.comments).forEach(function (key) {
        const cm = target.comments[key];
        if (cm && R.isRecipe(cm.text)) {
          try {
            out.recipes.push(R.parseComment(cm.text));
            out.removed++;
            return;
          } catch (e) {
            next[key] = cm;
            out.kept++;
            out.errors.push(key + ': ' + errText(e));
            return;
          }
        }
        next[key] = cm;
      });
      target.comments = next;
    });
    return out;
  }

  async function prepareImport(file, explicitJ, explicitR) {
    const J = explicitJ || root.JSZip;
    const R = getR(explicitR);
    if (!J || !R) return { file: file, project: null, zip: null, recipes: [], cleaned: false, errors: [] };
    const zip = await J.loadAsync(file);
    const entry = zip.file('project.json');
    if (!entry) return { file: file, project: null, zip: zip, recipes: [], cleaned: false, errors: ['project.json is missing'] };
    const project = JSON.parse(await entry.async('text'));
    const split = stripRecipeComments(project, R);
    let cleaned = false;
    let outFile = file;
    if (split.recipes.length) {
      state.suppress = true;
      try { zip.file('project.json', JSON.stringify(project)); }
      finally { state.suppress = false; }
      outFile = await zip.generateAsync({ type: 'blob' });
      // Claude 9 Nov: keep the file's name, or the project title becomes "undefined" after opening a G-Warp .sb3
      try { if (file && file.name && typeof File === 'function') outFile = new File([outFile], file.name, { type: file.type || 'application/x.scratch.sb3' }); } catch (e) {}
      cleaned = true;
    }
    return { file: outFile, project: project, zip: zip, recipes: split.recipes, cleaned: cleaned, errors: split.errors };
  }

  /* ---------- pure import helpers ---------- */

  async function extractTargetSounds(zip, target) {
    const out = [];
    for (const snd of (target && target.sounds) || []) {
      try {
        const ext = String(snd.dataFormat || 'wav').toLowerCase().replace(/^\./, '');
        const fileName = snd.md5ext || (snd.assetId ? snd.assetId + '.' + ext : '');
        const entry = fileName ? zip.file(fileName) : null;
        if (!entry) continue;
        const b64 = await entry.async('base64');
        const bytes = base64Bytes(b64);
        const rate = Number(snd.rate || snd.sampleRate || 22050) || 22050;
        const sampleCount = Number(snd.sampleCount || 0);
        const duration = sampleCount > 0 ? sampleCount / rate : 0;
        out.push({
          name: String(snd.name || 'sound'),
          assetId: snd.assetId || fileName.replace(/\.[^.]+$/, ''),
          dataFormat: ext,
          dataUrl: 'data:' + mimeFor(ext) + ';base64,' + b64,
          duration: Math.round(duration * 1000) / 1000,
          sampleRate: rate,
          channels: wavChannels(bytes) || 1,
          sampleCount: sampleCount || undefined
        });
      } catch (e) { note(e); }
    }
    return out;
  }

  async function fingerprintSounds(sounds, explicitR) {
    const R = getR(explicitR);
    const AC = root.OfflineAudioContext || root.webkitOfflineAudioContext || root.AudioContext || root.webkitAudioContext;
    if (!AC || !R) return 0;
    let ctx;
    try { ctx = new AC(1, 1, 22050); } catch (e) { return 0; }
    let done = 0;
    for (const snd of sounds || []) {
      try {
        if (!snd || !snd.dataUrl) continue;
        const m = String(snd.dataUrl).match(/^data:([^;,]+)?(;base64)?,(.*)$/);
        if (!m || !m[3]) continue;
        const bytes = base64Bytes(m[3]);
        if (bytes.length > 25 * 1024 * 1024) continue;
        const buf = await ctx.decodeAudioData(bytes.buffer.slice(0));
        snd.gwAudio = R.audioPrint(buf);
        if (!snd.duration) snd.duration = Math.round(buf.duration * 1000) / 1000;
        if (!snd.sampleRate) snd.sampleRate = buf.sampleRate;
        done++;
      } catch (e) { note(e); }
    }
    return done;
  }

  /* Restore sounds and recipes after the app's importer has built the sprites. */
  async function restoreSounds(prep, options) {
    const opts = options || {};
    const R = getR(opts.R);
    const ID = opts.ID || getID();
    const out = { imported: 0, fingerprinted: 0, attached: 0, orphans: 0, errors: [] };
    if (!prep || !prep.project || !prep.zip || !R) return out;
    const targets = (prep.project.targets || []).filter(function (t) { return t && !t.isStage; });
    const live = allSprites().filter(function (s) { return !s.stageProxy; });
    for (let i = 0; i < targets.length && i < live.length; i++) {
      try {
        const sounds = await extractTargetSounds(prep.zip, targets[i]);
        if (sounds.length) {
          live[i].sounds = sounds;
          out.imported += sounds.length;
        }
      } catch (e) { out.errors.push(errText(e)); note(e); }
    }
    const stageTarget = (prep.project.targets || []).find(function (t) { return t && t.isStage; });
    const stageProxy = allSprites().find(function (s) { return s.stageProxy; });
    if (stageTarget && stageProxy) {
      try {
        const sounds = await extractTargetSounds(prep.zip, stageTarget);
        if (sounds.length) { stageProxy.sounds = sounds; out.imported += sounds.length; }
      } catch (e) { out.errors.push(errText(e)); }
    }

    const sounds = soundList();
    out.fingerprinted = typeof opts.fingerprint === 'function'
      ? await opts.fingerprint(sounds)
      : await fingerprintSounds(sounds, R);
    const attached = R.attachRecipes(sounds, prep.recipes || []);
    attached.sounds.forEach(function (copy, i) {
      if (copy && copy.gwSong && sounds[i] && !sounds[i].gwSong) {
        sounds[i].gwSong = copy.gwSong;
        sounds[i].gwAudio = copy.gwAudio;
      }
    });
    out.attached = attached.claimed.length;
    out.orphans = attached.orphans.length;
    if (ID && typeof ID.annotateSounds === 'function') {
      try { ID.annotateSounds(sounds); } catch (e) { note(e); }
    }
    state.lastImport = {
      at: now(), recipes: (prep.recipes || []).length, imported: out.imported,
      fingerprinted: out.fingerprinted, attached: out.attached, orphans: out.orphans,
      errors: out.errors.slice(0, 10)
    };
    return out;
  }

  /* ---------- app wiring ---------- */

  async function rezip(blob, project) {
    const J = root.JSZip;
    if (!J) throw new Error('JSZip is not loaded, cannot rebuild the .sb3');
    const zip = await J.loadAsync(blob);
    const files = [];
    for (const name of Object.keys(zip.files)) {
      const entry = zip.files[name];
      if (!entry || entry.dir || name === 'project.json') continue;
      files.push({ name: name, data: await entry.async('uint8array') });
    }
    files.unshift({ name: 'project.json', data: new TextEncoder().encode(JSON.stringify(project)) });
    const exporter = root.GW_V1580_SB3_EXPORT;
    if (exporter && typeof exporter.zipDeflate === 'function') return exporter.zipDeflate(files);
    const fresh = new J();
    files.forEach(function (f) { fresh.file(f.name, f.data); });
    return fresh.generateAsync({ type: 'blob' });
  }

  function download(blob, name) {
    try {
      if (typeof root.GW_DOWNLOAD === 'function') { root.GW_DOWNLOAD(blob, name); return; }
      const doc = root.document;
      if (!doc) return;
      const a = doc.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name || 'project.sb3';
      a.click();
      setTimeout(function () { try { URL.revokeObjectURL(a.href); } catch (e) {} }, 1000);
    } catch (e) { note(e); }
  }

  /* Calls the app exporter without its download, adds the Stage comments, rebuilds the
     zip with the same files (including extraFiles), then performs the one download. */
  async function exportEnhanced(original, options, thisArg) {
    const opts = options || {};
    const R = getR();
    const report = await original.call(thisArg, Object.assign({}, opts, { noDownload: true }));
    const packed = root.GW_LAST_SB3_EXPORT;
    if (!report || !packed || !packed.pj || !packed.blob || !R) {
      if (!opts.noDownload && packed && packed.blob) download(packed.blob, report && report.file);
      return report;
    }
    const stats = augmentProject(packed.pj, allSprites(), R);
    let finalBlob = packed.blob;
    try {
      finalBlob = await rezip(packed.blob, packed.pj);
      packed.blob = finalBlob;
      packed.songComments = stats;
      report.songComments = stats.added;
      report.songCommentBytes = stats.bytes;
      state.lastExport = {
        at: now(), added: stats.added, songs: stats.songs, bytes: stats.bytes,
        errors: stats.errors.slice(0, 10)
      };
    } catch (e) {
      stats.errors.push(errText(e));
      state.lastExport = { at: now(), added: 0, songs: stats.songs, bytes: 0, errors: stats.errors.slice(0, 10) };
      note(e);
    }
    if (!opts.noDownload) download(finalBlob, report.file);
    return report;
  }

  function installExportWrapper() {
    const owners = [root.GW8 && root.GW8, root.GW_V1580_SB3_EXPORT && root.GW_V1580_SB3_EXPORT];
    let wrapped = false;
    owners.forEach(function (owner) {
      if (!owner || typeof owner.exportSB3 !== 'function') return;
      const fn = owner.exportSB3;
      if (fn.__gwSongSb3) { wrapped = true; return; }
      if (fn.__gwSongSb3Wrapper) { owner.exportSB3 = fn.__gwSongSb3Wrapper; wrapped = true; return; }
      const next = async function (opts) { return exportEnhanced(fn, opts, this); };
      next.__gwSongSb3 = true;
      fn.__gwSongSb3Wrapper = next;
      owner.exportSB3 = next;
      wrapped = true;
    });
    state.exportWrapped = wrapped;
    return wrapped;
  }

  function installClick() {
    if (state.clickWrapped || !root.document || typeof root.addEventListener !== 'function') return false;
    root.addEventListener('click', function (event) {
      const target = event.target;
      const button = target && target.closest ? target.closest('#sb3ExportBtn') : null;
      if (!button) return;
      const fn = root.GW8 && root.GW8.exportSB3;
      if (!fn || !fn.__gwSongSb3) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      Promise.resolve().then(function () { return fn.call(root.GW8, {}); })
        .catch(function (e) { note(e); });
    }, true);
    state.clickWrapped = true;
    return true;
  }

  function installImportWrapper() {
    const G = root.GW8;
    if (!G || typeof G.importSB3 !== 'function') return false;
    if (G.importSB3.__gwSongSb3) { state.importWrapped = true; return true; }
    const original = G.importSB3;
    const next = async function (file) {
      let prep = null;
      try { prep = await prepareImport(file, root.JSZip, getR()); }
      catch (e) { note(e); }
      let result;
      if (prep && prep.cleaned) result = await original.call(this, prep.file);
      else result = await original.apply(this, arguments);
      if (prep && prep.recipes && prep.recipes.length) {
        try { await restoreSounds(prep); }
        catch (e) { note(e); }
      }
      return result;
    };
    next.__gwSongSb3 = true;
    G.importSB3 = next;
    state.importWrapped = true;
    return true;
  }

  function report() {
    return {
      version: VERSION,
      ready: state.ready,
      exportWrapped: state.exportWrapped,
      importWrapped: state.importWrapped,
      clickWrapped: state.clickWrapped,
      zip: !!root.JSZip,
      recipe: !!root.GW_SONG_RECIPE,
      identity: !!root.GW_SONG_IDENTITY,
      lastExport: state.lastExport,
      lastImport: state.lastImport,
      errors: state.errors.slice(-10)
    };
  }

  function wire() {
    if (state.wired) return report();
    try { if (root.localStorage && root.localStorage.getItem('gwarp-off-song-sb3') === '1') return report(); } catch (e) {}
    state.wired = true;
    let tries = 0;
    function tick() {
      let imp = false, exp = false;
      try { imp = installImportWrapper(); } catch (e) { note(e); }
      try { exp = installExportWrapper(); } catch (e) { note(e); }
      try { installClick(); } catch (e) { note(e); }
      if (imp && exp && root.JSZip) state.ready = true;
      if (state.ready || ++tries > 40) return;
      setTimeout(tick, 250);
    }
    tick();
    return report();
  }

  const api = {
    VERSION: VERSION,
    augmentProject: augmentProject,
    stripRecipeComments: stripRecipeComments,
    prepareImport: prepareImport,
    extractTargetSounds: extractTargetSounds,
    fingerprintSounds: fingerprintSounds,
    restoreSounds: restoreSounds,
    exportEnhanced: exportEnhanced,
    rezip: rezip,
    wire: wire,
    report: report,
    _state: state
  };

  if (root && root.document) {
    try { wire(); } catch (e) { note(e); }
  }
  return api;
});
