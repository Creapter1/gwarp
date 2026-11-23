/*
 * Identity surface — the display/query layer for G-Warp song identity and the melody library.
 *
 * It does NOT compute identities. The app's bridge (gw-song-identity.js) already puts
 * `gwIdentity {label,key}` on every melody it loads and on every sound the Song maker saves, and
 * `gwSong` (the A3 recipe, with `contentKey`) on saved songs. This module turns that data into the
 * three things a kid-facing surface needs:
 *
 *   soundLine(sound)              one readable identity line for a sound (or '' if it has none)
 *   sameSongAs(sound, sounds)     the canonical name of a song this sound is a copy of, or null
 *   songGroups(sounds)            [{ key, canonical, aliases }] over gwIdentity.key
 *   melodyRows(melodies)          normalised rows for the 121 library melodies
 *   searchMelodies(melodies, q)   label/name/genre/part/BPM/key search
 *   melodyBrowser(melodies, q)    { total, shown, rows } — read-only model for a list UI
 *
 * Works in Node (require) and in the browser (window.GW_SOUND_IDENTITY), so the same code is what
 * the tests exercise and what an app patch would call.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.GW_SOUND_IDENTITY = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  function text(v) { return v == null ? "" : String(v).trim(); }
  function num(v) { var n = Number(v); return Number.isFinite(n) ? n : 0; }

  function noteName(v) {
    if (v == null || v === "") return "";
    var n = Number(v);
    if (Number.isFinite(n)) return NOTE_NAMES[((Math.round(n) % 12) + 12) % 12];
    return text(v);
  }

  function soundKey(sound) {
    if (!sound) return null;
    var id = sound.gwIdentity;
    if (id && id.key) return String(id.key);
    if (sound.gwSong && sound.gwSong.contentKey) return String(sound.gwSong.contentKey);
    return null;
  }

  /* Full identity line, or '' when the sound is not a song (plain samples have no identity). */
  function soundLine(sound) {
    if (!sound) return "";
    if (sound.gwIdentity && text(sound.gwIdentity.label)) return text(sound.gwIdentity.label);
    var r = sound.gwSong;
    if (!r) return "";
    var bits = [];
    if (num(r.parts)) bits.push(Math.round(num(r.parts)) + " parts");
    if (num(r.bpm)) bits.push(Math.round(num(r.bpm)) + " BPM");
    var key = [noteName(r.root), text(r.mode)].filter(Boolean).join(" ");
    if (key) bits.push(key);
    return "Song · " + (text(r.name) || text(sound.name) || "Song") + (bits.length ? " — " + bits.join(", ") : "");
  }

  /* Short form for a list row: "12 parts · 128 BPM · C major". */
  function soundShort(sound) {
    var r = sound && sound.gwSong;
    if (!r) return "";
    var bits = [];
    if (num(r.parts)) bits.push(Math.round(num(r.parts)) + " parts");
    if (num(r.bpm)) bits.push(Math.round(num(r.bpm)) + " BPM");
    var key = [noteName(r.root), text(r.mode)].filter(Boolean).join(" ");
    if (key) bits.push(key);
    return bits.join(" · ");
  }

  function isSong(sound) { return !!(sound && (sound.gwIdentity || sound.gwSong)); }

  /* Which earlier sound is this one a copy of? Order decides: the first in the list is canonical. */
  function sameSongAs(sound, sounds) {
    var key = soundKey(sound);
    if (!key) return null;
    var list = Array.isArray(sounds) ? sounds : [];
    for (var i = 0; i < list.length; i++) {
      if (list[i] === sound) return null;               /* reached itself before any other copy */
      if (list[i] && soundKey(list[i]) === key) return text(list[i].name) || null;
    }
    return null;
  }

  function songGroups(sounds) {
    var groups = [], byKey = {};
    (Array.isArray(sounds) ? sounds : []).forEach(function (sound) {
      var key = soundKey(sound);
      if (!key) return;
      if (!byKey[key]) { byKey[key] = { key: key, canonical: text(sound.name), aliases: [] }; groups.push(byKey[key]); }
      else byKey[key].aliases.push(text(sound.name));
    });
    return groups.filter(function (g) { return g.aliases.length > 0; });
  }

  /* ---- the melody library ---- */
  function melodyRows(melodies) {
    return (Array.isArray(melodies) ? melodies : []).map(function (m) {
      var id = m && m.gwIdentity;
      var label = (id && text(id.label)) || [text(m && m.genre), text(m && m.name)].filter(Boolean).join(" · ");
      var bits = [];
      if (m && text(m.part)) bits.push(text(m.part));
      if (m && num(m.bpm)) bits.push(Math.round(num(m.bpm)) + " BPM");
      var key = m && (text(m.musicalKey) || text(m.keyName));
      if (key) bits.push(key);
      return {
        label: label,
        key: (id && text(id.key)) || text(m && m.key) || "",
        name: text(m && m.name),
        genre: text(m && m.genre),
        part: text(m && m.part),
        bpm: num(m && m.bpm),
        musicalKey: key,
        pack: text(m && (m.pack || m.packName)),
        detail: bits.join(" · ")
      };
    });
  }

  /* Word-boundary matching, so "c major" does not match "Chiptune … A major" and "drill" does not
     match inside another word. Numbers still match ("128"). */
  function tokenRe(word) {
    var esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("(^|[^a-z0-9])" + esc + "([^a-z0-9]|$)", "i");
  }

  function searchMelodies(melodies, query) {
    var rows = melodyRows(melodies);
    var q = text(query).toLowerCase();
    if (!q) return rows;
    var words = q.split(/\s+/).filter(Boolean).map(tokenRe);
    return rows.filter(function (r) {
      var hay = [r.label, r.name, r.genre, r.part, r.bpm ? r.bpm + " bpm" : "", r.musicalKey, r.pack].join(" ").toLowerCase();
      return words.every(function (re) { return re.test(hay); });
    });
  }

  function melodyBrowser(melodies, query) {
    var all = melodyRows(melodies);
    var rows = searchMelodies(melodies, query);
    return { total: all.length, shown: rows.length, query: text(query), rows: rows };
  }

  return {
    VERSION: "1.0",
    soundLine: soundLine,
    soundShort: soundShort,
    isSong: isSong,
    sameSongAs: sameSongAs,
    songGroups: songGroups,
    soundKey: soundKey,
    melodyRows: melodyRows,
    searchMelodies: searchMelodies,
    melodyBrowser: melodyBrowser
  };
});
