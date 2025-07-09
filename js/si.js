// SCRIPT ESSENZIALI PER LORENZO GIUDICI PORTFOLIO
document.addEventListener('DOMContentLoaded', function() {
  // Impostazione per il cambio tema
  document.documentElement.classList.add('theme-loaded');

  // CARICAMENTO IMMAGINI CASUALI PER LO SFONDO HERO
  setTimeout(function() {
    loadRandomProjectImages();
  }, 100); // Piccolo ritardo per assicurarsi che il DOM sia completamente caricato
  
  // SCRIPT PER MIGLIORARE LO SCROLL
  const scrollIndicator = document.getElementById('scrollIndicator');
  const mainContent = document.querySelector('#main-content');
  const navbar = document.querySelector('.navbar-container');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      mainContent.scrollIntoView({behavior: 'smooth'});
    });
  }
  
  // Gestione scroll per mostrare navbar
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostra navbar quando scorriamo oltre la hero section
    if (scrollTop > window.innerHeight * 0.7) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  });

  // EFFETTO TYPING PER TESTO "PRODUCT DESIGNER"
  const typingElement = document.querySelector('.typing-animation');
  if (typingElement) {
    const text = typingElement.getAttribute('data-text');
    if (text) {
      typingAnimation(typingElement.querySelector('.lang-it'), text);
    }
  }
  
  function typingAnimation(element, text) {
    let index = 0;
    element.textContent = '';
    
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    
    setTimeout(type, 1000);
  }
  
  // GESTIONE MENU MOBILE
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.navbar');
  
  if (burgerMenu && mobileNav) {
    burgerMenu.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      mobileNav.style.display = expanded ? 'none' : 'block';
    });
  }
  
  /**
   * Gestione dello scroll tra sezioni
   */
  function setupSectionScroll() {
    const scrollDown = document.getElementById('scrollIndicator');
    const chiSonoSection = document.getElementById('chi-sono');
    
    // Blocca lo scroll iniziale per prevenire scroll parziali
    let isScrolling = false;
    
    if (scrollDown && chiSonoSection) {
      scrollDown.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isScrolling) {
          isScrolling = true;
          chiSonoSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => { isScrolling = false; }, 1000);
        }
      });
    }
    
    // Opzionale: impedisce scroll parziali con la rotella del mouse
    document.addEventListener('wheel', function(e) {
      const heroSection = document.querySelector('.hero');
      const viewportHeight = window.innerHeight;
      
      // Se siamo nella hero section e non stiamo già scrollando
      if (window.scrollY < viewportHeight && !isScrolling) {
        // Se scrolliamo verso il basso, vai alla prossima sezione
        if (e.deltaY > 0 && chiSonoSection) {
          e.preventDefault();
          isScrolling = true;
          chiSonoSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => { isScrolling = false; }, 1000);
        }
      }
    }, { passive: false });
  }

  // Chiamiamo la funzione di setup dello scroll
  setupSectionScroll();
});

/**
 * Carica e visualizza immagini casuali dai progetti nella griglia hero
 * con effetto di scorrimento orizzontale alternato per righe
 */
function loadRandomProjectImages() {
  const heroGrid = document.getElementById('heroGrid');
  if (!heroGrid) {
    console.error('Elemento heroGrid non trovato nel DOM');
    return;
  }
  
  console.log('Inizializzazione caricamento immagini con scorrimento orizzontale...');
  
  // Elenco di tutti i percorsi delle immagini dei progetti
  const projectImages = [
    // Progetto 1
    'immagini/webp/progetto%201/all%2022.webp',
    'immagini/webp/progetto%201/tazzina_.webp',
    'immagini/webp/progetto%201/zuccheriera%202_.webp',
    
    // Progetto 2
    'immagini/webp/progetto%202/cardanica%20600.webp',
    'immagini/webp/progetto%202/cardanica%20900.webp',
    'immagini/webp/progetto%202/cardanica.webp',
    
    // Progetto 3
    'immagini/webp/progetto%203/untitled202.webp',
    'immagini/webp/progetto%203/untitled555.webp',
    'immagini/webp/progetto%203/untitled702.webp',
    
    // Progetto 4
    'immagini/webp/progetto%204/untitled.webp',
    'immagini/webp/progetto%204/untitled33.webp',
    'immagini/webp/progetto%204/untitled44.webp'
  ];
  
  // Calcola il numero di righe e colonne per la griglia
  const numberOfRows = calculateNumberOfRows();
  
  // Svuota la griglia
  heroGrid.innerHTML = '';
  
  // Contatore per il monitoraggio del caricamento delle immagini
  let loadedImagesCount = 0;
  let totalImagesToLoad = 0;
  
  // Funzione per segnalare che un'immagine è stata caricata
  function imageLoaded() {
    loadedImagesCount++;
    
    // Se tutte le immagini sono state caricate, rivela la griglia con una transizione fluida
    if (loadedImagesCount === totalImagesToLoad) {
      heroGrid.classList.add('images-loaded');
    }
  }
  
  // Mescola le immagini
  const shuffledImages = shuffleArray([...projectImages]);
  
  // Creiamo una matrice per tracciare tutte le immagini utilizzate
  // Ciò ci permetterà di controllare la posizione anche tra righe diverse
  let globalImageMatrix = [];
  
  // Crea le righe della griglia con effetto di scorrimento alternato
  for (let i = 0; i < numberOfRows; i++) {
    // Crea contenitore riga
    const rowDiv = document.createElement('div');
    rowDiv.className = `hero-grid-row ${i % 2 === 0 ? 'even' : 'odd'}`;
    
    // Applica animazione di entrata iniziale
    rowDiv.style.animation = `${i % 2 === 0 ? 'slideInFromLeft' : 'slideInFromRight'} 0.8s ease-out forwards, ${i % 2 === 0 ? 'slideLeftToRight' : 'slideRightToLeft'} ${25 + i % 3 * 5}s linear ${0.8 + i * 0.1}s infinite`;
    
    // Applica un ritardo crescente a ogni riga successiva
    rowDiv.style.animationDelay = `${i * 0.15}s`;
    
    // Determina quante immagini servono per riempire la riga (2 volte la larghezza per consentire lo scorrimento infinito)
    const screenWidth = window.innerWidth;
    const itemWidth = screenWidth <= 480 ? 100 : screenWidth <= 767 ? 120 : screenWidth <= 1199 ? 150 : 180;
    const itemsPerRow = Math.ceil((screenWidth * 2) / itemWidth) + 4; // Aggiungi alcuni elementi extra
    
    // Prepara array per tenere traccia delle ultime immagini usate in questa riga
    // Se la riga non esiste ancora nella matrice globale, creala
    if (!globalImageMatrix[i]) {
      globalImageMatrix[i] = [];
    }
    
    // Crea abbastanza immagini per ogni riga
    for (let j = 0; j < itemsPerRow; j++) {
      // Funzione per selezionare un'immagine che non sia stata usata recentemente
      function selectUniqueImage() {
        // Crea una copia dell'array delle immagini per poter rimuovere elementi
        let availableImages = [...shuffledImages];
        let imagesToExclude = new Set();
        
        // Esclude le immagini usate recentemente nella riga corrente (a sinistra)
        const currentRowImages = globalImageMatrix[i] || [];
        
        // Controlla le ultime 11 posizioni a sinistra
        for (let left = 1; left <= 11 && j - left >= 0; left++) {
          if (currentRowImages[j - left]) {
            imagesToExclude.add(currentRowImages[j - left]);
          }
        }
        
        // Controlla se le stesse colonne nelle righe vicine (sopra e sotto) hanno immagini da escludere
        // Solo se abbiamo già delle righe popolate
        for (let rowOffset = -2; rowOffset <= 2; rowOffset++) {
          const checkRow = i + rowOffset;
          if (checkRow >= 0 && checkRow < numberOfRows && checkRow !== i && globalImageMatrix[checkRow]) {
            // Per ogni riga vicina, controlla una finestra di 5 colonne intorno alla posizione corrente
            for (let colOffset = -2; colOffset <= 2; colOffset++) {
              const checkCol = j + colOffset;
              if (checkCol >= 0 && globalImageMatrix[checkRow][checkCol]) {
                imagesToExclude.add(globalImageMatrix[checkRow][checkCol]);
              }
            }
          }
        }
        
        // Rimuovi dalle opzioni disponibili tutte le immagini escluse
        if (imagesToExclude.size > 0) {
          availableImages = availableImages.filter(img => !imagesToExclude.has(img));
        }
        
        // Se non ci sono più immagini disponibili (caso estremo), usa comunque l'array originale
        if (availableImages.length === 0) {
          availableImages = [...shuffledImages];
        }
        
        // Seleziona un'immagine casuale tra quelle disponibili
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        return availableImages[randomIndex];
      }
      
      // Ottieni un'immagine che non sia stata usata recentemente
      const imagePath = selectUniqueImage();
      
      // Salva l'immagine nella matrice globale per riferimento futuro
      globalImageMatrix[i][j] = imagePath;
      
      // Non abbiamo più bisogno di gestire manualmente l'array lastUsedImages
      // poiché ora usiamo la matrice globale per tenere traccia di tutte le posizioni
      
      // Crea elemento contenitore per l'immagine
      const gridItem = document.createElement('div');
      gridItem.className = 'hero-grid-item';
      
      // Crea elemento immagine
      const img = document.createElement('img');
      img.src = imagePath;
      img.loading = totalImagesToLoad < 20 ? 'eager' : 'lazy'; // Carica immediatamente solo le prime 20 immagini
      img.alt = ''; // Immagini decorative
      img.dataset.imageId = imagePath.split('/').pop(); // Salva un ID dell'immagine come attributo data
      totalImagesToLoad++;
      
      // Gestione eventi di caricamento e errore
      img.onload = function() {
        imageLoaded();
      };
      
      img.onerror = function() {
        console.error('Errore nel caricamento dell\'immagine:', imagePath);
        
        // Prova con un percorso alternativo senza encoding degli URI
        const altPath = imagePath.replace(/%20/g, ' ');
        if (altPath !== imagePath) {
          img.src = altPath;
        } else {
          // In caso di errore nel caricamento dell'immagine, sostituisci con uno sfondo colorato
          gridItem.classList.add('image-error');
          imageLoaded(); // Considera comunque l'immagine "caricata" per completare il processo
        }
      };
      
      // Aggiungi l'immagine al suo contenitore
      gridItem.appendChild(img);
      
      // Aggiungi il contenitore alla riga
      rowDiv.appendChild(gridItem);
    }
    
    // Aggiungi la riga alla griglia
    heroGrid.appendChild(rowDiv);
  }
}

/**
 * Calcola il numero di righe nella griglia in base alla larghezza dello schermo
 * @returns {number} Numero di righe nella griglia
 */
function calculateNumberOfRows() {
  const width = window.innerWidth;
  
  if (width >= 1200) {
    // 8 righe per schermi grandi
    return 8;
  } else if (width >= 768) {
    // 6 righe per tablet
    return 6;
  } else if (width >= 481) {
    // 5 righe per dispositivi mobili orizzontali
    return 5;
  } else {
    // 8 righe per smartphone (più sottili)
    return 8;
  }
}

// Aggiorniamo la griglia quando la finestra viene ridimensionata
window.addEventListener('resize', debounce(function() {
  loadRandomProjectImages();
}, 350)); // Aumentato il tempo di debounce per evitare ricaricamenti troppo frequenti

/**
 * Funzione debounce per limitare l'esecuzione di funzioni chiamate frequentemente
 * @param {Function} func - La funzione da eseguire
 * @param {number} wait - Il tempo di attesa in millisecondi
 * @returns {Function} Funzione con debounce
 */
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Funzione per mescolare un array (algoritmo Fisher-Yates)
 * @param {Array} array - L'array da mescolare
 * @returns {Array} L'array mescolato
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Scambio degli elementi
  }
  return array;
}
