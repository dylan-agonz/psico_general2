// Tabs accesibles + deep-linking con hash
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function activate(id) {
  // Actualizar botones
  tabs.forEach(btn => {
    const selected = btn.getAttribute('aria-controls') === id;
    btn.setAttribute('aria-selected', selected ? 'true' : 'false');
  });

  // Mostrar panel correspondiente
  panels.forEach(p => p.dataset.active = (p.id === id) ? 'true' : 'false');

  // Enfocar panel activo (accesibilidad)
  const active = document.getElementById(id);
  if (active) active.focus({ preventScroll: true });

  // Actualizar hash
  if (history.replaceState) {
    history.replaceState(null, '', '#' + id);
  } else {
    location.hash = id;
  }
}

// Click en pestañas
tabs.forEach(btn => btn.addEventListener('click', () => activate(btn.getAttribute('aria-controls'))));

// Enlaces con data-goto (botones del hero)
document.querySelectorAll('[data-goto]').forEach(a => a.addEventListener('click', (e) => {
  e.preventDefault();
  activate(a.getAttribute('data-goto'));
  document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
}));

// Teclado para tabs (izq/der + Enter/Espacio)
document.addEventListener('keydown', (e) => {
  if (e.target.getAttribute('role') !== 'tab') return;
  const idx = Array.from(tabs).indexOf(e.target);
  if (e.key === 'ArrowRight') tabs[Math.min(idx + 1, tabs.length - 1)].focus();
  if (e.key === 'ArrowLeft')  tabs[Math.max(idx - 1, 0)].focus();
  if (e.key === 'Enter' || e.key === ' ') activate(e.target.getAttribute('aria-controls'));
});

// Soporte de hash en URL (#panel-u3 abre directo esa unidad)
function handleHash(){
  const id = (location.hash || '#panel-inicio').replace('#', '');
  const exists = document.getElementById(id);
  activate(exists ? id : 'panel-inicio');
}
window.addEventListener('hashchange', handleHash);
handleHash();

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();
