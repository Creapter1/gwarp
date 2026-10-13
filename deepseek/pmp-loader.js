(() => {
  'use strict';

  /**
   * pmp-loader.js — full consolidated PenguinMod .pmp loader for G-Warp.
   * Exposes:
   *   window.GW_PMP.detect(arrayBuffer)     -> 'zip' | 'protobuf' | 'unknown'
   *   window.GW_PMP.toProjectJson(buffer)   -> Promise<{json, assets}>
   *
   * Zip kind   : uses window.JSZip (already present in G-Warp).
   * Protobuf   : needs pmp-protobuf (MIT). We first look for
   *              window.pmpProtobuf.protobufToJson; if missing we try a
   *              dynamic import from jsDelivr's /+esm endpoint. If both
   *              fail we throw a kid-friendly error.
   *
   * Fail-safe rules:
   *   - never throw a raw exception; always wrap in a friendly Error
   *   - never assume the renderer/VM shape
   *   - never mutate project.json; pass it through unchanged
   *   - never send user data anywhere
   */

  const GW_PMP = {};

  // ---------------------------------------------------------------
  // detect
  // ---------------------------------------------------------------
  GW_PMP.detect = function (buffer) {
    if (!buffer) return 'unknown';
    if (!(buffer instanceof ArrayBuffer) && !ArrayBuffer.isView(buffer)) return 'unknown';
    const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    if (bytes.length < 2) return 'unknown';
    // ZIP magic: "PK" (0x50 0x4B)
    if (bytes[0] === 0x50 && bytes[1] === 0x4B) return 'zip';
    return 'protobuf';
  };

  // ---------------------------------------------------------------
  // kid-friendly error helper
  // ---------------------------------------------------------------
  function kid(msg) {
    const e = new Error(msg);
    e.isKidFriendly = true;
    return e;
  }

  // ---------------------------------------------------------------
  // public entry
  // ---------------------------------------------------------------
  GW_PMP.toProjectJson = async function (buffer) {
    const kind = GW_PMP.detect(buffer);
    if (kind === 'zip') return GW_PMP._zip(buffer);
    if (kind === 'protobuf') return GW_PMP._protobuf(buffer);
    throw kid(
      "I don't recognise this file. It doesn't look like a PenguinMod or Scratch project. " +
      "Try opening a .pmp or .sb3 file."
    );
  };

  // ---------------------------------------------------------------
  // ZIP kind
  // ---------------------------------------------------------------
  GW_PMP._zip = async function (buffer) {
    if (typeof window.JSZip === 'undefined') {
      throw kid(
        "I need JSZip to open ZIP-based projects, but it isn't loaded. " +
        "Please make sure JSZip is included before the PMP loader."
      );
    }

    let zip;
    try {
      zip = await window.JSZip.loadAsync(buffer);
    } catch (e) {
      throw kid(
        "I couldn't open this ZIP file. It might be damaged, or it might not be a real PenguinMod project."
      );
    }

    const projectFile = zip.file('project.json');
    if (!projectFile) {
      throw kid(
        "This project doesn't have a project.json inside. " +
        "It might not be a PenguinMod or Scratch project."
      );
    }

    let json;
    try {
      const text = await projectFile.async('text');
      json = JSON.parse(text);
    } catch (e) {
      throw kid(
        "The project.json inside this file is not valid JSON. " +
        "The project might be damaged."
      );
    }

    // Collect assets (everything except project.json).
    const assets = new Map();
    const jobs = [];
    zip.forEach((path, file) => {
      if (path === 'project.json' || file.dir) return;
      jobs.push(file.async('arraybuffer').then(data => { assets.set(path, data); }));
    });
    await Promise.all(jobs);

    // Friendly warning about PenguinMod-only extensions.
    if (Array.isArray(json.extensions)) {
      const scratchKnown = new Set([
        'motion','looks','sound','events','control','sensing','operators',
        'variables','list','procedures','argument','pen','music','video',
        'text2speech','translate','makeymakey','microbit','ev3','boost',
        'wedo2','gdxfor'
      ]);
      for (const ext of json.extensions) {
        if (!scratchKnown.has(ext)) {
          console.warn(
            '[GW_PMP] PenguinMod extension "' + ext + '" is not a standard Scratch extension. ' +
            'The VM may need to handle it.'
          );
        }
      }
    }

    return { json, assets };
  };

  // ---------------------------------------------------------------
  // protobuf kind
  // ---------------------------------------------------------------
  GW_PMP._protobuf = async function (buffer) {
    // 1. Global UMD build.
    let pb = window.pmpProtobuf;

    // 2. Dynamic import (modern browsers).
    if (!pb || typeof pb.protobufToJson !== 'function') {
      try {
        // UNSURE: the exact CDN path. jsDelivr's /+esm endpoint is the
        // most likely to serve a working ES module; if this 404s the
        // user gets the friendly error below.
        pb = await import(
          /* webpackIgnore: true */
          'https://cdn.jsdelivr.net/npm/pmp-protobuf@1.6.0/+esm'
        );
      } catch (e) {
        // fall through to the friendly error
      }
    }

    if (!pb || typeof pb.protobufToJson !== 'function') {
      throw kid(
        "This looks like a protobuf-based PenguinMod project, but the pmp-protobuf " +
        "library isn't loaded. Please load it first. " +
        "See: https://github.com/PenguinMod/pmp-protobuf"
      );
    }

    const bytes = buffer instanceof ArrayBuffer
      ? new Uint8Array(buffer)
      : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);

    let json;
    try {
      json = pb.protobufToJson(bytes);
    } catch (e) {
      throw kid(
        "I couldn't read this protobuf project. It might be damaged, or it might not be a PenguinMod project."
      );
    }

    if (!json || typeof json !== 'object') {
      throw kid(
        "The protobuf converter returned something unexpected. The project might be damaged."
      );
    }

    // UNSURE: how assets are stored inside the protobuf variant.
    // We return an empty Map; the downstream VM will simply have no
    // costumes or sounds for protobuf projects until this is solved.
    return { json, assets: new Map() };
  };

  // ---------------------------------------------------------------
  // expose
  // ---------------------------------------------------------------
  window.GW_PMP = GW_PMP;
})();
