/* G-Warp docs: THE ONE PLACE for the documentation menu.
   To add a page: make it from docs/_template.html, then add ONE line to the right group below.
   Every docs page (and the cards on docs/index.html) is built from this list - no other file to edit. */
window.GW_DOCS_NAV = [
  { group: 'Get started', items: [
    ['index.html', 'Docs home'], ['start.html', 'Start here'], ['tutorials/index.html', 'Tutorials'],
    ['scratch.html', 'From Scratch'], ['glossary.html', 'Glossary'], ['../research/RESEARCH-INDEX.md', 'Game Research Library'] ] },
  { group: 'Make things', items: [
    ['blocks.html', 'Blocks'], ['costumes.html', 'Costumes'], ['animation.html', 'Animation'], ['sounds.html', 'Sounds + Song maker'] ] },
  { group: 'Add to G-Warp', items: [
    ['extensions.html', 'Extensions'], ['ideas-addons.html', 'Ideas (+ tab) add-ons'] ] },
  { group: 'Help', items: [
    ['troubleshoot.html', 'Troubleshooting'], ['shortcuts.html', 'Keyboard shortcuts'], ['safety.html', 'Safety + privacy'], ['parents.html', 'Parents & teachers'] ] },
  { group: 'Build and inspect', items: [
    ['DEVELOPER-REFERENCE.md', 'Developer Reference'], ['HELPER-DATA-FLOW.md', 'Helper Data Flow'], ['ENGINEERING-REFERENCE.md', 'Engineering Reference'],
    ['SOURCE-MODULE-INDEX.md', 'Source Module Map'], ['UPSTREAM-ARCHITECTURE-REFERENCE.md', 'Scratch/TurboWarp/PenguinMod Architecture'],
    ['BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md', 'Build Your Own Editor'] ] },
  { group: 'About', items: [
    ['changelog.html', 'Changelog'], ['credits.html', 'Credits'], ['team.html', 'AI team'] ] }
];
(() => {
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const here = location.pathname.split('/').pop() || 'index.html';
  const nested = location.pathname.includes('/docs/tutorials/');
  const base = nested ? '../' : '';
  const rootResearch = nested ? '../../research/RESEARCH-INDEX.md' : '../research/RESEARCH-INDEX.md';
  const html = (cls) => window.GW_DOCS_NAV.map(g => `<div class="${cls}"><div class="dn-head">${esc(g.group)}</div>` +
    g.items.map(([href, label]) => `<a href="${href === '../research/RESEARCH-INDEX.md' ? rootResearch : base + href}"${href === here ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('') + '</div>').join('');
  function run() {
    const nav = document.querySelector('aside nav'); if (nav) { nav.innerHTML = html('dn-group'); nav.classList.add('dn'); }
    const cards = document.getElementById('docsCards'); if (cards) cards.innerHTML = html('dn-card');
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', run) : run();
})();
