// SCRIPT ESSENZIALI PER LORENZO GIUDICI PORTFOLIO
document.addEventListener('DOMContentLoaded', function() {
  // Impostazione per il cambio tema
  document.documentElement.classList.add('theme-loaded');

  // CARICAMENTO IMMAGINI CASUALI PER LO SFONDO HERO
  loadRandomProjectImages();
  
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
});

/**
 * Carica e visualizza 9 immagini casuali dai progetti nella griglia hero
 */
function loadRandomProjectImages() {
  const heroGrid = document.getElementById('heroGrid');
  if (!heroGrid) return;
  
  // Elenco di tutti i percorsi delle immagini dei progetti
  const projectImages = [
    // Progetto 1
    'immagini/webp/progetto 1/all 22.webp',
    'immagini/webp/progetto 1/tazzina_.webp',
    'immagini/webp/progetto 1/zuccheriera 2_.webp',
    
    // Progetto 2
    'immagini/webp/progetto 2/cardanica 600.webp',
    'immagini/webp/progetto 2/cardanica 900.webp',
    'immagini/webp/progetto 2/cardanica.webp',
    
    // Progetto 3
    'immagini/webp/progetto 3/untitled202.webp',
    'immagini/webp/progetto 3/untitled555.webp',
    'immagini/webp/progetto 3/untitled702.webp',
    
    // Progetto 4
    'immagini/webp/progetto 4/untitled.webp',
    'immagini/webp/progetto 4/untitled33.webp',
    'immagini/webp/progetto 4/untitled44.webp'
  ];
  
  // Mescola l'array di immagini per ottenere un ordine casuale
  const shuffledImages = shuffleArray([...projectImages]);
  
  // Seleziona le prime 9 immagini dall'array mescolato
  const selectedImages = shuffledImages.slice(0, 9);
  
  // Svuota la griglia e aggiungi le 9 immagini
  heroGrid.innerHTML = '';
  
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
  
  selectedImages.forEach((imagePath, index) => {
    // Crea elemento contenitore per l'immagine
    const gridItem = document.createElement('div');
    gridItem.className = 'hero-grid-item';
    
    // Crea elemento immagine
    const img = document.createElement('img');
    img.src = imagePath;
    img.loading = index < 3 ? 'eager' : 'lazy'; // Carica immediatamente solo le prime 3 immagini
    img.alt = ''; // Immagini decorative
    
    // Aggiungi casualità all'animazione per un effetto visivo migliore
    const randomDelay = Math.random() * 5; // Ritardo casuale tra 0 e 5 secondi
    img.style.animationDelay = `${randomDelay}s`;
    
    // Gestione eventi di caricamento e errore
    img.onload = imageLoaded;
    img.onerror = () => {
      // In caso di errore nel caricamento dell'immagine, sostituisci con uno sfondo colorato
      gridItem.classList.add('image-error');
      imageLoaded(); // Considera comunque l'immagine "caricata" per completare il processo
    };
    
    img.classList.add('animate-image');
    
    // Aggiungi l'immagine al suo contenitore
    gridItem.appendChild(img);
    
    // Aggiungi il contenitore alla griglia
    heroGrid.appendChild(gridItem);
  });
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
