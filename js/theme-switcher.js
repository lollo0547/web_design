/**
 * Theme Switcher Functionality
 * Permette all'utente di passare da tema chiaro a tema scuro
 */

document.addEventListener('DOMContentLoaded', function() {
  // Aggiunta del theme switcher alla pagina
  createThemeSwitcher();
  
  // Applica il tema salvato o il tema predefinito
  applyTheme();
});

// Funzione per creare il selettore di tema
function createThemeSwitcher() {
  // Creiamo l'elemento HTML per il theme switcher
  const themeSwitcherHTML = `
    <div class="theme-switch-wrapper">
      <span class="theme-switch-icon">☀️</span>
      <label class="theme-switch">
        <input type="checkbox" id="theme-toggle">
        <span class="theme-slider"></span>
      </label>
      <span class="theme-switch-icon">🌙</span>
    </div>
  `;
  // Inseriamo il theme switcher SOLO nel footer
  const footerThemeSwitcher = document.getElementById('footer-theme-switcher');
  if (footerThemeSwitcher) {
    footerThemeSwitcher.innerHTML = themeSwitcherHTML;
  }
  
  // Otteniamo il riferimento all'elemento toggle
  const themeToggle = document.getElementById('theme-toggle');
  
  // Controlla se è già impostato il tema scuro
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    themeToggle.checked = true;
  }
  
  // Aggiungiamo l'event listener per il cambio tema
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'minimal');
      localStorage.setItem('theme', 'minimal');
    }
    
    // Aggiungiamo un'animazione di transizione al cambio tema
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 500);
  });
}

// Funzione per applicare il tema salvato o predefinito
function applyTheme() {
  const savedTheme = localStorage.getItem('theme') || 'minimal';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Marca il checkbox se il tema è scuro
  if (savedTheme === 'dark') {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.checked = true;
    }
  }
  
  // Segnala che il tema è stato caricato
  document.documentElement.classList.add('theme-loaded');
}
