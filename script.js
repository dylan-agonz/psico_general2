/* ===================== TABS (Inicio / Unidades 1-5) ===================== */
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function activate(id) {
  tabs.forEach(btn => {
    const selected = btn.getAttribute('aria-controls') === id;
    btn.setAttribute('aria-selected', selected ? 'true' : 'false');
  });
  panels.forEach(p => p.dataset.active = (p.id === id) ? 'true' : 'false');
  const active = document.getElementById(id);
  if (active) active.focus({ preventScroll: true });
  if (history.replaceState) {
    history.replaceState(null, '', '#' + id);
  } else {
    location.hash = id;
  }
}
tabs.forEach(btn => btn.addEventListener('click', () => activate(btn.getAttribute('aria-controls'))));
document.querySelectorAll('[data-goto]').forEach(a => a.addEventListener('click', (e) => {
  e.preventDefault();
  activate(a.getAttribute('data-goto'));
  document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
}));
document.addEventListener('keydown', (e) => {
  if (e.target.getAttribute('role') !== 'tab') return;
  const idx = Array.from(tabs).indexOf(e.target);
  if (e.key === 'ArrowRight') tabs[Math.min(idx + 1, tabs.length - 1)].focus();
  if (e.key === 'ArrowLeft')  tabs[Math.max(idx - 1, 0)].focus();
  if (e.key === 'Enter' || e.key === ' ') activate(e.target.getAttribute('aria-controls'));
});
function handleHash(){
  const id = (location.hash || '#panel-inicio').replace('#', '');
  const exists = document.getElementById(id);
  activate(exists ? id : 'panel-inicio');
}
window.addEventListener('hashchange', handleHash);
handleHash();
document.getElementById('year').textContent = new Date().getFullYear();

/* ========= Unidad 1: redirección por botones (URLs configuradas) ========= */
/* Abre en la misma pestaña; cambiá a "_blank" si querés nueva pestaña */
const TARGET_TAB = "_self";

/* Enlaces DIRECTOS (GitHub Pages) */
const LINKS_U1 = {
  "u1-btn-esquemas":  "https://dylan-agonz.github.io/psico_general2/assets/tp-conciencia-dylan.pdf", // Dylan
  "u1-btn-esquema2":  "https://dylan-agonz.github.io/psico_general2/assets/tp-conciencia-belu.pdf",  // Belén
  "u1-btn-esquema3":  "https://dylan-agonz.github.io/psico_general2/assets/tp-conciencia-giu.pdf",   // Giuliana
  "u1-btn-esquema4":  "https://dylan-agonz.github.io/psico_general2/assets/tp-conciencia-grace.pdf", // Graciela
  "u1-btn-podcast":   "https://drive.google.com/drive/folders/1sEo_7-qcQO0oxkyFROaMsS_rlCWI57RQ?usp=sharing"
};

/* Cableado de botones */
(function wireU1Buttons(){
  Object.entries(LINKS_U1).forEach(([btnId, url]) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (!url) { alert(`Falta configurar la URL para #${btnId}`); return; }
      (TARGET_TAB === "_self") ? (location.href = url) : window.open(url, TARGET_TAB);
    });
  });
})();

