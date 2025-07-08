/**
 * PORTFOLIO DI LORENZO GIUDICI - THEME SWITCHER
 * Sistema di gestione del tema giorno/notte
 */

document.addEventListener('DOMContentLoaded', () => {
  // Imposta il tema iniziale in base alle preferenze dell'utente o alla preferenza del sistema
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio-theme');
  
  // Usa il tema salvato o determina in base alle preferenze del sistema
  const initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'minimal');
  setTheme(initialTheme);
  
  // Configura il toggle del tema giorno/notte
  setupThemeToggle();
  
  // Previeni FOUC aggiungendo la classe theme-loaded dopo l'applicazione del tema
  setTimeout(() => {
    document.documentElement.classList.add('theme-loaded');
  }, 50);
  
  // Configura lo scroll bloccato iniziale
  setupScrollLock();
});

/**
 * Imposta il tema specificato
 * @param {string} theme - Il nome del tema ('minimal' o 'dark')
 */
function setTheme(theme) {
  // Rimuovi tutti i temi precedenti
  document.documentElement.classList.remove('theme-minimal', 'theme-dark');
  
  // Aggiungi la classe del nuovo tema
  document.documentElement.classList.add(`theme-${theme}`);
  
  // Imposta l'attributo data-theme
  document.documentElement.setAttribute('data-theme', theme);
  
  // Salva nel localStorage
  localStorage.setItem('portfolio-theme', theme);
  
  // Aggiorna l'aspetto del pulsante toggle
  updateThemeToggleAppearance(theme);
}

/**
 * Configura il bottone toggle per il cambio tema giorno/notte
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateThemeToggleAppearance(currentTheme);
    
    themeToggle.addEventListener('click', () => {
      // Toggle tra tema chiaro e scuro
      const newTheme = document.documentElement.getAttribute('data-theme') === 'minimal' ? 'dark' : 'minimal';
      setTheme(newTheme);
    });
  }
}

/**
 * Aggiorna l'aspetto del bottone di cambio tema in base al tema attivo
 * @param {string} theme - Il nome del tema ('minimal' o 'dark')
 */
function updateThemeToggleAppearance(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    if (theme === 'dark') {
      themeToggle.classList.add('theme-dark');
      themeToggle.classList.remove('theme-light');
    } else {
      themeToggle.classList.add('theme-light');
      themeToggle.classList.remove('theme-dark');
    }
  }
}

/**
 * Configura il blocco dello scroll iniziale e l'animazione di scroll
 */
function setupScrollLock() {
  // Blocca lo scroll inizialmente
  document.body.classList.add('scroll-locked');
  
  // Nascondi la navbar all'inizio
  const navbar = document.querySelector('.navbar-container');
  if (navbar) {
    navbar.classList.remove('visible');
  }
  
  // Gestisci lo scroll per sbloccare e mostrare la navbar
  let isFirstScroll = true;
  
  window.addEventListener('scroll', () => {
    if (isFirstScroll && window.scrollY > 50) {
      // Sblocca lo scroll dopo il primo movimento significativo
      document.body.classList.remove('scroll-locked');
      isFirstScroll = false;
    }
    
    // Mostra la navbar dopo aver superato l'hero section
    const heroHeight = document.querySelector('.hero')?.offsetHeight || window.innerHeight;
    if (navbar && window.scrollY > heroHeight * 0.8) {
      navbar.classList.add('visible');
    } else if (navbar) {
      navbar.classList.remove('visible');
    }
  }, { passive: true });
}
