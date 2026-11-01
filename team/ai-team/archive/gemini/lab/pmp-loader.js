(() => {
  'use strict';

  /**
   * pmp-loader.js — PenguinMod protobuf-only loader for G-Warp.
   * G-Warp already opens ZIP .pmp files through its built-in loader;
   * this module handles ONLY the protobuf kind, which is not a ZIP.
   *
   * Exposes:
   *   window.GW_PMP.detect(arrayBuffer)   -> 'zip' | 'protobuf' | 'unknown'
   *   window.GW_PMP.toProjectJson(buffer) -> Promise<{json, assets}>
   *
   * toProjectJson throws a friendly error if the buffer is a ZIP,
   * because that path belongs to G-Warp's own loader.
   *
   * The protobuf conversion needs the pmp-protobuf library (MIT):
   *   https://github.com/PenguinMod/pmp-protobuf
   * We first look for window.pmpProtobuf.protobufToJson, then try a
   * dynamic ES-module import from jsDelivr's /+esm endpoint.
   *
   * Never sends user data anywhere; never runs code from a project.
   */

  const GW_PMP = {};

  // ---------- detect ------------------------------------------------
  GW_PMP.detect = function (buffer) {
    if (!buffer) return 'unknown';
    let bytes;
    if (buffer instanceof ArrayBuffer) {
      bytes = new Uint8Array(buffer);
    } else if (ArrayBuffer.isView(buffer)) {
      bytes = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    } else {
      return 'unknown';
    }
    if (bytes.length < 2) return 'unknown';
    // ZIP local file header signature: "PK" 0x50 0x4B
    if (bytes[0] === 0x50 && bytes[1] === 0x4B) return 'zip';
    // UNSURE: exact magic bytes for the PenguinMod protobuf format.
    // We treat every non-ZIP as a protobuf candidate and let the
    // converter confirm.
    return 'protobuf';
  };

  // ---------- helpers -----------------------------------------------
  function kid(msg) {
    const e = new Error(msg);
    e.isKidFriendly = true;
    return e;
  }

  function toUint8(buffer) {
    if (buffer instanceof ArrayBuffer) return new Uint8Array(buffer);
    if (ArrayBuffer.isView(buffer)) return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    throw kid("That doesn't look like project data. Try opening a .pmp file.");
  }

  // ---------- public entry -----------------------------------------
  GW_PMP.toProjectJson = async function (buffer) {
    const kind = GW_PMP.detect(buffer);

    if (kind === 'zip') {
      throw kid(
        "This is a ZIP-based PenguinMod project. G-Warp's normal loader " +
        "should open it directly — you don't need the protobuf loader."
      );
    }
    if (kind === 'unknown') {
      throw kid(
        "I don't recognise this file. It doesn't look like a PenguinMod project. " +
        "Try opening a .pmp file."
      );
    }

    return GW_PMP._protobuf(buffer);
  };

  // ---------- protobuf conversion ----------------------------------
  GW_PMP._protobuf = async function (buffer) {
    // 1) Prefer an already-loaded library (global UMD build).
    let pb = window.pmpProtobuf;

    // 2) Otherwise try a dynamic ES-module import.
    if (!pb || typeof pb.protobufToJson !== 'function') {
      try {
        // UNSURE: exact CDN path. jsDelivr's /+esm endpoint is the
        // most likely working URL. If this 404s the user gets the
        // friendly error below.
        pb = await import(
          /* webpackIgnore: true */
          'https://cdn.jsdelivr.net/npm/pmp-protobuf@1.6.0/+esm'
        );
      } catch (e) {
        // Fall through to the friendly error.
      }
    }

    if (!pb || typeof pb.protobufToJson !== 'function') {
      throw kid(
        "This looks like a protobuf-based PenguinMod project, but the pmp-protobuf " +
        "library isn't loaded. Please load it first. " +
        "See: https://github.com/PenguinMod/pmp-protobuf"
      );
    }

    let json;
    try {
      json = pb.protobufToJson(toUint8(buffer));
    } catch (e) {
      throw kid(
        "I couldn't read this protobuf project. It might be damaged, " +
        "or it might not be a PenguinMod project."
      );
    }

    if (!json || typeof json !== 'object') {
      throw kid(
        "The protobuf converter returned something unexpected. " +
        "The project might be damaged."
      );
    }

    // UNSURE: how assets are stored inside the protobuf variant.
    // We return an empty Map; the VM will simply have no costumes
    // or sounds for protobuf projects until this is solved.
    return { json, assets: new Map() };
  };

  window.GW_PMP = GW_PMP;
})();
