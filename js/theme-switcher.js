/**
 * PORTFOLIO DI LORENZO GIUDICI - THEME SWITCHER
 * Sistema di gestione dei mood visivi
 */

document.addEventListener('DOMContentLoaded', () => {
  // Imposta il tema di default o recupera dalle preferenze dell'utente
  const savedTheme = localStorage.getItem('portfolio-theme') || 'minimal';
  setTheme(savedTheme);
  
  // Aggiungi il theme switcher all'interfaccia
  createThemeSwitcher();
  
  // Attiva il tema corrente nel selettore
  updateActiveThemeInSwitcher(savedTheme);
  
  // Previeni FOUC aggiungendo la classe theme-loaded dopo l'applicazione del tema
  setTimeout(() => {
    document.documentElement.classList.add('theme-loaded');
  }, 50);
});

/**
 * Crea e aggiunge il selettore di temi all'interfaccia
 */
function createThemeSwitcher() {
  // Crea il container principale
  const themeSwitcher = document.createElement('div');
  themeSwitcher.className = 'theme-switcher';
  
  // Definizione dei temi disponibili con descrizioni
  const themes = [
    { id: 'minimal', tooltip: 'Minimal Tipografico' },
    { id: 'dark', tooltip: 'Dark Contrastato' },
    { id: 'colorblock', tooltip: 'Color Block' },
    { id: 'masonry', tooltip: 'Grid Mosaico' }
  ];
  
  // Crea i pulsanti dei temi
  themes.forEach(theme => {
    const themeButton = document.createElement('div');
    themeButton.className = 'theme-option';
    themeButton.dataset.theme = theme.id;
    themeButton.dataset.tooltip = theme.tooltip;
    themeButton.setAttribute('aria-label', `Attiva tema ${theme.tooltip}`);
    themeButton.setAttribute('role', 'button');
    themeButton.setAttribute('tabindex', '0');
    
    // Aggiungi event listeners
    themeButton.addEventListener('click', () => {
      setTheme(theme.id);
      updateActiveThemeInSwitcher(theme.id);
    });
    
    // Supporto per navigazione da tastiera
    themeButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setTheme(theme.id);
        updateActiveThemeInSwitcher(theme.id);
      }
    });
    
    themeSwitcher.appendChild(themeButton);
  });
  
  // Aggiungi il selettore al DOM
  document.body.appendChild(themeSwitcher);
}

/**
 * Imposta il tema attivo
 * @param {string} theme - ID del tema da attivare
 */
function setTheme(theme) {
  // Rimuovi il tema precedente e imposta quello nuovo
  document.body.dataset.theme = theme;
  
  // Salva la preferenza dell'utente
  localStorage.setItem('portfolio-theme', theme);
  
  // Applica ottimizzazioni specifiche per ciascun tema
  applyThemeSpecificOptimizations(theme);
}

/**
 * Aggiorna l'interfaccia del selettore di temi
 * @param {string} activeTheme - ID del tema attivo
 */
function updateActiveThemeInSwitcher(activeTheme) {
  // Rimuovi la classe active da tutte le opzioni
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.remove('active');
    option.setAttribute('aria-pressed', 'false');
  });
  
  // Aggiungi la classe active all'opzione corrente
  const activeOption = document.querySelector(`.theme-option[data-theme="${activeTheme}"]`);
  if (activeOption) {
    activeOption.classList.add('active');
    activeOption.setAttribute('aria-pressed', 'true');
  }
}

/**
 * Applica ottimizzazioni specifiche per ciascun tema
 * @param {string} theme - ID del tema attivo
 */
function applyThemeSpecificOptimizations(theme) {
  const projectElements = document.querySelectorAll('.project');
  const sections = document.querySelectorAll('section');
  const buttons = document.querySelectorAll('.btn');
  const skillCategories = document.querySelectorAll('.skill-category');
  
  // Resetta le classi specifiche per tema
  document.body.classList.remove('theme-minimal', 'theme-dark', 'theme-colorblock', 'theme-masonry');
  document.body.classList.add(`theme-${theme}`);
  
  // Rimuovi classi tema precedenti da tutti gli elementi principali
  projectElements.forEach(el => {
    el.classList.remove('project-minimal', 'project-dark', 'project-colorblock', 'project-masonry');
  });
  
  buttons.forEach(el => {
    el.classList.remove('btn-minimal', 'btn-dark', 'btn-colorblock', 'btn-masonry');
  });
  
  skillCategories.forEach(el => {
    el.classList.remove('skill-minimal', 'skill-dark', 'skill-colorblock', 'skill-masonry');
  });
  
  // Applica le ottimizzazioni in base al tema
  switch(theme) {
    case 'minimal':
      // Ottimizzazioni per tema minimal
      projectElements.forEach(project => project.classList.add('project-minimal'));
      buttons.forEach(btn => btn.classList.add('btn-minimal'));
      skillCategories.forEach(skill => skill.classList.add('skill-minimal'));
      
      // Rimuovi effetti di altri temi
      document.querySelectorAll('.color-block').forEach(el => el.remove());
      break;
      
    case 'dark':
      // Ottimizzazioni per tema dark
      projectElements.forEach(project => project.classList.add('project-dark'));
      buttons.forEach(btn => btn.classList.add('btn-dark'));
      skillCategories.forEach(skill => skill.classList.add('skill-dark'));
      
      // Aggiungi effetti specifici per il tema dark
      addDarkThemeEffects();
      
      // Rimuovi effetti di altri temi
      document.querySelectorAll('.color-block').forEach(el => el.remove());
      break;
      
    case 'colorblock':
      // Ottimizzazioni per tema colorblock
      projectElements.forEach(project => project.classList.add('project-colorblock'));
      buttons.forEach(btn => btn.classList.add('btn-colorblock'));
      skillCategories.forEach(skill => skill.classList.add('skill-colorblock'));
      
      // Anima le sezioni con blocchi di colore
      animateColorBlocks();
      break;
      
    case 'masonry':
      // Ottimizzazioni per tema masonry
      projectElements.forEach(project => project.classList.add('project-masonry'));
      buttons.forEach(btn => btn.classList.add('btn-masonry'));
      skillCategories.forEach(skill => skill.classList.add('skill-masonry'));
      
      // Rimuovi effetti di altri temi
      document.querySelectorAll('.color-block').forEach(el => el.remove());
      
      // Inizializza layout masonry se necessario
      initMasonryLayout();
      break;
  }
  
  // Applica transizioni più fluide per il cambio di tema
  setTimeout(() => {
    document.documentElement.classList.add('theme-transition-complete');
  }, 500);
}

/**
 * Aggiunge effetti specifici per il tema dark
 */
function addDarkThemeEffects() {
  // Aggiungi effetti glow alle immagini
  document.querySelectorAll('.project-image').forEach(img => {
    img.classList.add('dark-glow-effect');
  });
  
  // Aggiungi effetto neon alle intestazioni
  document.querySelectorAll('h1, h2, h3').forEach(heading => {
    heading.classList.add('dark-neon-text');
  });
  
  // Crea un effetto particellare sullo sfondo dell'hero se non esiste già
  if (!document.getElementById('dark-particles')) {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'dark-particles';
    particlesContainer.className = 'dark-particles-container';
    
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.prepend(particlesContainer);
      
      // Crea particelle
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'dark-particle';
        
        // Randomizza le posizioni e dimensioni
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        
        // Randomizza le animazioni
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particlesContainer.appendChild(particle);
      }
    }
  }
}

/**
 * Anima i blocchi di colore per il tema colorblock
 */
function animateColorBlocks() {
  // Rimuovi i blocchi esistenti
  document.querySelectorAll('.color-block').forEach(el => el.remove());
  
  // Aggiungi animazioni per le sezioni con blocchi di colore
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    // Aggiungi classi di animazione basate sull'indice
    section.style.animationDelay = `${index * 0.1}s`;
    section.classList.add('animate-in');
    
    // Aggiungi blocchi di colore decorativi
    const colorIndex = index % 4 + 1; // Alterna tra 4 colori
    const block = document.createElement('div');
    block.className = `color-block color-block-${colorIndex}`;
    
    // Posizione casuale all'interno della sezione
    block.style.left = `${Math.random() * 70 + 15}%`;
    block.style.top = `${Math.random() * 70 + 15}%`;
    
    // Dimensione casuale
    const size = Math.random() * 100 + 50;
    block.style.width = `${size}px`;
    block.style.height = `${size}px`;
    
    // Rotazione casuale
    block.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Aggiungi il blocco alla sezione
    section.appendChild(block);
  });
  
  // Aggiungi anche alle card dei progetti
  document.querySelectorAll('.project').forEach((project, index) => {
    const colorIndex = index % 4 + 1; // Alterna tra 4 colori
    project.classList.add(`project-color-${colorIndex}`);
  });
}

/**
 * Inizializza il layout masonry per browser che non supportano grid-template-rows: masonry
 */
function initMasonryLayout() {
  // Controlla se il browser supporta grid-template-rows: masonry
  if (!CSS.supports('grid-template-rows', 'masonry')) {
    console.log('Il browser non supporta masonry nativo, usando fallback JS');
    
    // Aggiungi classe per il fallback CSS
    const grids = document.querySelectorAll('.project-grid');
    grids.forEach(grid => {
      grid.classList.add('js-masonry-fix');
    });
    
    // Applica altezze variabili ai progetti per creare l'effetto masonry
    applyMasonryHeights();
    
    // Aggiungi classe per attivare layout specifici
    document.querySelectorAll('.project').forEach((project, index) => {
      // Ogni terzo elemento sarà più grande
      if (index % 3 === 0) {
        project.classList.add('masonry-featured');
      }
    });
    
    // Reimposta il layout quando vengono ridimensionate le finestre
    window.addEventListener('resize', debounce(() => {
      applyMasonryHeights();
    }, 250));
  }
}

/**
 * Applica altezze variabili per l'effetto masonry
 */
function applyMasonryHeights() {
  const projects = document.querySelectorAll('.project');
  
  projects.forEach((project, index) => {
    // Rimuovi altezze esistenti
    project.style.height = '';
    
    // Per ottenere altezze casuali ma deterministiche, usa l'indice come seed
    const seed = index % 5; // 5 diverse altezze
    
    // Calcola altezza in base al seed
    let heightFactor;
    switch(seed) {
      case 0: heightFactor = 1.0; break; // Normale
      case 1: heightFactor = 1.3; break; // Più alto
      case 2: heightFactor = 0.9; break; // Più basso
      case 3: heightFactor = 1.2; break; // Alto
      case 4: heightFactor = 1.1; break; // Leggermente alto
    }
    
    // Applica l'altezza usando trasformazione di scala per non distorcere il contenuto
    if (heightFactor !== 1.0) {
      // Conserva la dimensione dell'immagine ma espandi o contrai lo spazio per il testo
      const details = project.querySelector('.project-details');
      if (details) {
        details.style.paddingBottom = `${heightFactor * 1.5}rem`;
      }
    }
  });
}

/**
 * Funzione helper per debouncing
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
