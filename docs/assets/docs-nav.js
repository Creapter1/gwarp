/* G-Warp documentation navigation. Add public learning and feature pages here. */
window.GW_DOCS_NAV = [
  { group: 'Learn the concepts', items: [
    ['index.html', 'Docs home'], ['start.html', 'Start here'], ['tutorials/index.html', 'Tutorials'],
    ['BLOCK-BASED-PROGRAMMING-ARCHITECTURE.md', 'How Block-Based Editors Work'],
    ['SCRATCH-VM-EXPLAINED.md', 'Scratch VM Explained'],
    ['SCRATCH-STYLE-EDITORS-COMPARISON.md', 'Compare Block Editors'],
    ['BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md', 'Build Your Own Editor'],
    ['UPSTREAM-ARCHITECTURE-REFERENCE.md', 'Scratch/TurboWarp/PenguinMod Architecture'],
    ['scratch.html', 'From Scratch'], ['glossary.html', 'Glossary'] ] },
  { group: 'Make things', items: [
    ['blocks.html', 'Blocks'], ['costumes.html', 'Costumes'], ['animation.html', 'Animation'], ['sounds.html', 'Sounds + Song maker'] ] },
  { group: 'Add to G-Warp', items: [
    ['extensions.html', 'Extensions'], ['ideas-addons.html', 'Ideas (+ tab) add-ons'] ] },
  { group: 'Help', items: [
    ['troubleshoot.html', 'Troubleshooting'], ['shortcuts.html', 'Keyboard shortcuts'], ['safety.html', 'Safety + privacy'], ['parents.html', 'Parents & teachers'] ] },
  { group: 'G-Warp implementation', items: [
    ['ENGINEERING-REFERENCE.md', 'Engineering Reference'],
    ['SOURCE-MODULE-INDEX.md', 'Source Module Map'],
    ['DEVELOPER-REFERENCE.md', 'Developer Reference'] ] },
  { group: 'About', items: [
    ['changelog.html', 'Changelog'], ['credits.html', 'Credits'] ] }
];
(() => {
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const here = location.pathname.split('/').pop() || 'index.html';
  const nested = location.pathname.includes('/docs/tutorials/');
  const base = nested ? '../' : '';
  const html = cls => window.GW_DOCS_NAV.map(g => '<div class="' + cls + '"><div class="dn-head">' + esc(g.group) + '</div>' +
    g.items.map(([href, label]) => '<a href="' + base + href + '"' + (href === here ? ' aria-current="page"' : '') + '>' + esc(label) + '</a>').join('') + '</div>').join('');
  function run() {
    const nav = document.querySelector('aside nav'); if (nav) { nav.innerHTML = html('dn-group'); nav.classList.add('dn'); }
    const cards = document.getElementById('docsCards'); if (cards) cards.innerHTML = html('dn-card');
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', run) : run();
})();
