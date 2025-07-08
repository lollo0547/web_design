/**
 * PORTFOLIO DI LORENZO GIUDICI - IMAGE OPTIMIZATION
 * Ottimizzazione delle immagini con lazy loading e progressive loading
 */

class ImageOptimizer {
  constructor() {
    this.lazyImages = document.querySelectorAll('img[loading="lazy"]');
    this.placeholderColor = '#e6e6e6';
    this.observerOptions = {
      root: null,
      rootMargin: '200px 0px',
      threshold: 0.01
    };
    
    this.init();
  }
  
  init() {
    // Controlla il supporto per IntersectionObserver
    if ('IntersectionObserver' in window) {
      this.setupLazyLoading();
    } else {
      // Fallback per browser che non supportano IntersectionObserver
      this.loadAllImages();
    }
    
    // Converti le immagini in <picture> con WebP
    this.enhanceImageElements();
    
    // Aggiungi effetti di caricamento progressivo
    this.setupProgressiveLoading();
  }
  
  setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
    
    this.lazyImages.forEach(image => {
      // Aggiungi placeholder se non è già caricata
      if (!image.complete) {
        this.addImagePlaceholder(image);
      }
      
      imageObserver.observe(image);
    });
  }
  
  loadAllImages() {
    this.lazyImages.forEach(image => {
      this.loadImage(image);
    });
  }
  
  loadImage(img) {
    // Controlla se l'immagine ha un data-src
    const src = img.getAttribute('data-src') || img.getAttribute('src');
    const srcset = img.getAttribute('data-srcset');
    const sizes = img.getAttribute('data-sizes');
    
    if (src) {
      img.src = src;
    }
    
    if (srcset) {
      img.srcset = srcset;
    }
    
    if (sizes) {
      img.sizes = sizes;
    }
    
    // Rimuovi gli attributi data-*
    img.removeAttribute('data-src');
    img.removeAttribute('data-srcset');
    img.removeAttribute('data-sizes');
    
    // Rimuovi il placeholder quando l'immagine è caricata
    img.addEventListener('load', () => {
      const placeholder = img.previousElementSibling;
      if (placeholder && placeholder.classList.contains('image-placeholder')) {
        placeholder.style.opacity = '0';
        
        setTimeout(() => {
          placeholder.remove();
        }, 500);
      }
      
      // Aggiungi classe loaded
      img.classList.add('loaded');
      
      // Segnala che l'immagine è caricata
      img.setAttribute('data-loaded', 'true');
    });
  }
  
  addImagePlaceholder(img) {
    // Non aggiungere placeholder per immagini molto piccole (come icone)
    if (img.width < 50 || img.height < 50) return;
    
    // Crea un placeholder solo se l'immagine non è già nel DOM o non è caricata
    if (!img.complete && !img.previousElementSibling?.classList.contains('image-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      
      // Imposta dimensioni placeholder
      if (img.width && img.height) {
        placeholder.style.paddingTop = `${(img.height / img.width) * 100}%`;
      } else {
        placeholder.style.paddingTop = '56.25%'; // 16:9 di default
      }
      
      // Aggiungi effetto shimmer
      placeholder.innerHTML = `
        <div class="image-placeholder-shimmer"></div>
      `;
      
      // Inserisci il placeholder prima dell'immagine
      img.parentNode.insertBefore(placeholder, img);
      
      // Stile per l'immagine
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
    }
  }
  
  enhanceImageElements() {
    // Converti le immagini standard in <picture> con supporto WebP
    const standardImages = document.querySelectorAll('img:not([loading="lazy"]):not(.no-enhance)');
    
    standardImages.forEach(img => {
      const src = img.getAttribute('src');
      if (!src || src.includes('webp') || img.parentNode.tagName.toLowerCase() === 'picture') {
        return; // Salta se è già WebP o è già in un elemento picture
      }
      
      const parent = img.parentNode;
      
      // Crea elemento picture
      const picture = document.createElement('picture');
      
      // Crea source per WebP
      const webpSource = document.createElement('source');
      webpSource.setAttribute('type', 'image/webp');
      
      // Converti il percorso in WebP
      const webpSrc = this.convertToWebP(src);
      webpSource.setAttribute('srcset', webpSrc);
      
      // Clona gli attributi rilevanti dall'immagine
      const newImg = img.cloneNode(true);
      
      // Aggiungi gli elementi al picture
      picture.appendChild(webpSource);
      picture.appendChild(newImg);
      
      // Sostituisci l'immagine con picture
      parent.replaceChild(picture, img);
    });
  }
  
  convertToWebP(src) {
    // Controlla se è già WebP
    if (src.toLowerCase().endsWith('.webp')) {
      return src;
    }
    
    // Converti percorsi immagine in WebP
    const imgExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
    for (const ext of imgExtensions) {
      if (src.toLowerCase().endsWith(ext)) {
        return src.substring(0, src.length - ext.length) + '.webp';
      }
    }
    
    // Se non ha un'estensione standard, aggiungi .webp
    return src + '.webp';
  }
  
  setupProgressiveLoading() {
    // Aggiungi effetto di caricamento progressivo alle immagini
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
      // Aggiungi classe per lo stile
      img.classList.add('progressive-image');
      
      // Crea un container per l'effetto progressivo se non esiste già
      if (!img.parentElement.classList.contains('progressive-image-container')) {
        const parent = img.parentElement;
        
        // Crea container
        const container = document.createElement('div');
        container.className = 'progressive-image-container';
        
        // Crea overlay per l'effetto di caricamento
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'image-loading-overlay';
        
        // Sposta l'immagine nel nuovo container
        parent.insertBefore(container, img);
        container.appendChild(img);
        container.appendChild(loadingOverlay);
      }
      
      // Gestisci eventi di caricamento
      img.addEventListener('load', () => {
        const container = img.closest('.progressive-image-container');
        if (container) {
          container.classList.add('loaded');
        }
      });
    });
  }
}

// Stili per i placeholder e il caricamento progressivo
function addImageOptimizationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Placeholder per immagini */
    .image-placeholder {
      position: relative;
      background-color: #f5f5f5;
      overflow: hidden;
      width: 100%;
    }

    .image-placeholder-shimmer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    /* Immagine progressiva */
    .progressive-image-container {
      position: relative;
      overflow: hidden;
    }

    .progressive-image {
      transition: filter 0.5s ease, transform 0.5s ease;
      filter: blur(5px);
      transform: scale(1.05);
    }

    .progressive-image-container.loaded .progressive-image {
      filter: blur(0);
      transform: scale(1);
    }

    .image-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
      z-index: 1;
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    .progressive-image-container.loaded .image-loading-overlay {
      opacity: 0;
      pointer-events: none;
    }
  `;

  document.head.appendChild(style);
}

// Inizializza l'ottimizzatore di immagini quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
  addImageOptimizationStyles();
  new ImageOptimizer();
});
