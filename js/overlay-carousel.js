/**
 * Enhanced Overlay Carousel Controls
 * Gestisce i controlli avanzati del carousel nei project overlays
 */
document.addEventListener('DOMContentLoaded', function() {
  // Ottieni tutti gli elementi del carousel
  const carouselTracks = document.querySelectorAll('.overlay-carousel-track');
  const prevButtons = document.querySelectorAll('.overlay-carousel-prev');
  const nextButtons = document.querySelectorAll('.overlay-carousel-next');
  const zoomButtons = document.querySelectorAll('.overlay-zoom-icon');
  
  // Inizializza i controlli per ogni carousel
  carouselTracks.forEach((track, index) => {
    const prevBtn = prevButtons[index];
    const nextBtn = nextButtons[index];
    const zoomBtn = zoomButtons[index];
    const projectId = track.dataset.project;
    const slides = track.querySelectorAll('.overlay-carousel-slide');
    const thumbnails = document.querySelectorAll(`.overlay-thumb[data-carousel="${projectId}"]`);
    let currentIndex = 0;
    
    // Trova l'indice iniziale (slide attiva)
    slides.forEach((slide, i) => {
      if (slide.classList.contains('active')) {
        currentIndex = i;
      }
    });
    
    // Funzione per navigare alla slide precedente
    function goToPrevSlide() {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }
    
    // Funzione per navigare alla slide successiva
    function goToNextSlide() {
      const newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    }
    
    // Funzione per mostrare una slide specifica
    function showSlide(index) {
      // Disattiva la slide corrente
      slides[currentIndex].classList.remove('active');
      thumbnails[currentIndex].classList.remove('active');
      
      // Attiva la nuova slide
      slides[index].classList.add('active');
      thumbnails[index].classList.add('active');
      
      // Aggiorna l'indice corrente
      currentIndex = index;
    }
    
    // Funzione zoom per aprire l'immagine a schermo intero
    function zoomImage() {
      const currentSlide = slides[currentIndex];
      const currentImg = currentSlide.querySelector('img');
      
      if (!currentImg) return;
      
      // Crea un elemento per la visualizzazione a schermo intero
      const fullscreenContainer = document.createElement('div');
      fullscreenContainer.className = 'fullscreen-image-container';
      
      const fullscreenImage = document.createElement('img');
      fullscreenImage.src = currentImg.src;
      fullscreenImage.alt = currentImg.alt;
      fullscreenImage.className = 'fullscreen-image';
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'fullscreen-close';
      closeBtn.innerHTML = '×';
      closeBtn.setAttribute('aria-label', 'Chiudi visualizzazione a schermo intero');
      
      // Aggiungi gli elementi al DOM
      fullscreenContainer.appendChild(fullscreenImage);
      fullscreenContainer.appendChild(closeBtn);
      document.body.appendChild(fullscreenContainer);
      
      // Disabilita lo scroll della pagina
      document.body.style.overflow = 'hidden';
      
      // Animazione di apertura
      setTimeout(() => {
        fullscreenContainer.classList.add('active');
      }, 10);
      
      // Event listener per chiudere la visualizzazione a schermo intero
      closeBtn.addEventListener('click', () => {
        fullscreenContainer.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(fullscreenContainer);
          document.body.style.overflow = '';
        }, 300);
      });
      
      // Chiudi anche cliccando fuori dall'immagine
      fullscreenContainer.addEventListener('click', (e) => {
        if (e.target === fullscreenContainer) {
          closeBtn.click();
        }
      });
      
      // Aggiungi supporto per tasto ESC
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          closeBtn.click();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    }
    
    // Aggiungi event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', goToPrevSlide);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', goToNextSlide);
    }
    
    if (zoomBtn) {
      zoomBtn.addEventListener('click', zoomImage);
    }
    
    // Aggiungi event listeners ai thumbnail
    thumbnails.forEach((thumb, i) => {
      thumb.addEventListener('click', () => {
        showSlide(i);
      });
    });
    
    // Aggiungi supporto per swipe su dispositivi touch
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const minSwipeDistance = 50; // minima distanza per considerare un swipe
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) < minSwipeDistance) return;
      
      if (swipeDistance > 0) {
        // Swipe verso destra -> slide precedente
        goToPrevSlide();
      } else {
        // Swipe verso sinistra -> slide successiva
        goToNextSlide();
      }
    }
    
    // Aggiungi supporto per navigazione con tastiera quando il carousel è a fuoco
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
        e.preventDefault();
      }
    });
    
    // Aggiungi attributo tabindex per rendere il carousel navigabile con tastiera
    track.setAttribute('tabindex', '0');
  });
  
  // Aggiungi stili per la visualizzazione a schermo intero
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .fullscreen-image-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(8px);
    }
    
    .fullscreen-image-container.active {
      opacity: 1;
    }
    
    .fullscreen-image {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
      transform: scale(0.95);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border-radius: 4px;
    }
    
    .fullscreen-image-container.active .fullscreen-image {
      transform: scale(1);
    }
    
    .fullscreen-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
    }
    
    .fullscreen-close:hover {
      background-color: rgba(255, 255, 255, 0.4);
      transform: rotate(90deg);
    }
  `;
  document.head.appendChild(styleElement);
});
