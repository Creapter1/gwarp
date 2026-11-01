// Read a .sb3 (zip) and turn its scripts into readable text - no browser needed.
const fs = require('fs');
const JSZip = require('jszip');
async function readSb3(file) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const pj = JSON.parse(await zip.file('project.json').async('string'));
  return { zip, pj, files: Object.keys(zip.files) };
}
function scriptsText(pj) {
  const out = [];
  const inp = (B, v) => {
    if (Array.isArray(v)) {
      if (v.length > 1 && typeof v[1] === 'string' && B[v[1]]) return expr(B, v[1]);
      if (v.length > 1 && Array.isArray(v[1])) { const x = v[1]; return x[0] === 12 || x[0] === 13 ? `(${x[1]})` : JSON.stringify(x[1]); }
    }
    return '?';
  };
  const expr = (B, k) => {
    const b = B[k]; const a = Object.entries(b.inputs || {}).filter(([n]) => !/^SUBSTACK/.test(n)).map(([n, v]) => `${n}=${inp(B, v)}`);
    const f = Object.entries(b.fields || {}).map(([n, v]) => `${n}=[${v[0]}]`); if (b.mutation?.proccode) f.push(`"${b.mutation.proccode}"`);
    return b.opcode + (a.length || f.length ? ' ' + [...a, ...f].join(' ') : '');
  };
  const stack = (B, k, ind) => { while (k) { const b = B[k]; out.push('  '.repeat(ind) + expr(B, k));
    for (const sub of ['SUBSTACK', 'SUBSTACK2']) { const v = b.inputs?.[sub]; if (v && v[1]) { if (sub === 'SUBSTACK2') out.push('  '.repeat(ind) + 'else'); stack(B, v[1], ind + 1); } }
    k = b.next; } };
  for (const t of pj.targets) {
    out.push('===== ' + t.name); const B = t.blocks;
    for (const [k, b] of Object.entries(B)) if (b && typeof b === 'object' && !Array.isArray(b) && b.topLevel && !b.shadow) { out.push('-- script'); stack(B, k, 1); }
    for (const c of Object.values(t.comments || {})) out.push('-- comment: ' + String(c.text).replace(/\n/g, ' | ').slice(0, 200));
  }
  return out.join('\n');
}
module.exports = { readSb3, scriptsText };
