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
 */
function loadRandomProjectImages() {
  const heroGrid = document.getElementById('heroGrid');
  if (!heroGrid) {
    console.error('Elemento heroGrid non trovato nel DOM');
    return;
  }
  
  console.log('Inizializzazione caricamento immagini casuali...');
  
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
  
  // Calcola il numero di celle nella griglia in base alla larghezza dello schermo
  let gridCellCount = calculateGridCellCount();
  
  // Svuota la griglia
  heroGrid.innerHTML = '';
  
  // Crea un array di immagini sufficientemente grande duplicando l'elenco originale
  let allImages = [];
  while (allImages.length < gridCellCount) {
    allImages = allImages.concat(shuffleArray([...projectImages]));
  }
  
  // Seleziona il numero necessario di immagini
  const selectedImages = allImages.slice(0, gridCellCount);
  
  // Contatore per il monitoraggio del caricamento delle immagini
  let loadedImagesCount = 0;
  const totalImagesToLoad = selectedImages.length;
  
  // Funzione per segnalare che un'immagine è stata caricata
  function imageLoaded() {
    loadedImagesCount++;
    
    // Se tutte le immagini sono state caricate, rivela la griglia con una transizione fluida
    if (loadedImagesCount === totalImagesToLoad) {
      heroGrid.classList.add('images-loaded');
    }
  }
  
  // Funzione per generare un valore casuale per la posizione iniziale dell'animazione
  function getRandomScale() {
    return (Math.random() * 0.2 + 0.9).toFixed(2); // Valore casuale tra 0.9 e 1.1
  }
  
  selectedImages.forEach((imagePath, index) => {
    // Crea elemento contenitore per l'immagine
    const gridItem = document.createElement('div');
    gridItem.className = 'hero-grid-item';
    
    // Crea elemento immagine
    const img = document.createElement('img');
    img.src = imagePath;
    img.loading = index < 10 ? 'eager' : 'lazy'; // Carica immediatamente solo le prime 10 immagini
    img.alt = ''; // Immagini decorative
    
    // Precarica l'immagine per mantenere le proporzioni originali
    const tmpImg = new Image();
    tmpImg.src = imagePath;
    
    // Aggiungi casualità all'animazione per un effetto visivo migliore
    const randomDelay = (Math.random() * 15).toFixed(1); // Ritardo casuale tra 0 e 15 secondi
    const randomDuration = (Math.random() * 10 + 10).toFixed(1); // Durata casuale tra 10 e 20 secondi
    img.style.animationDelay = `${randomDelay}s`;
    img.style.animationDuration = `${randomDuration}s`;
    
    // Applica uno stile iniziale casuale
    img.style.transform = `scale(${getRandomScale()})`;
    
    // Assicuriamo che l'aspect ratio venga mantenuto
    img.style.objectFit = 'contain';
    
    // Gestione eventi di caricamento e errore
    img.onload = function() {
      imageLoaded();
    };
    img.onerror = function() {
      console.error('Errore nel caricamento dell\'immagine:', imagePath);
      
      // Prova con un percorso alternativo senza encoding degli URI
      const altPath = imagePath.replace(/%20/g, ' ');
      if (altPath !== imagePath) {
        console.log('Tentativo con percorso alternativo:', altPath);
        img.src = altPath;
      } else {
        // In caso di errore nel caricamento dell'immagine, sostituisci con uno sfondo colorato
        gridItem.classList.add('image-error');
        imageLoaded(); // Considera comunque l'immagine "caricata" per completare il processo
      }
    };
    
    img.classList.add('animate-image');
    
    // Aggiungi l'immagine al suo contenitore
    gridItem.appendChild(img);
    
    // Aggiungi il contenitore alla griglia
    heroGrid.appendChild(gridItem);
  });
}

/**
 * Calcola il numero di celle nella griglia in base alla larghezza dello schermo
 * @returns {number} Numero di celle nella griglia
 */
function calculateGridCellCount() {
  const width = window.innerWidth;
  
  if (width >= 1200) {
    // Griglia densa per schermi grandi
    return 300; // 50 colonne × 20 righe = 1000 celle (ne usiamo solo 300)
  } else if (width >= 768) {
    // Griglia media per tablet
    return 200;
  } else if (width >= 481) {
    // Griglia meno densa per dispositivi mobili orizzontali
    return 120;
  } else {
    // Griglia minimale per smartphone
    return 80;
  }
}

// Aggiorniamo la griglia quando la finestra viene ridimensionata
window.addEventListener('resize', debounce(function() {
  loadRandomProjectImages();
}, 250));

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
