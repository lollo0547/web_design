/**
 * PORTFOLIO DI LORENZO GIUDICI - ENHANCED UI INTERACTIONS
 * 
 * Questo file contiene funzionalità UI avanzate per migliorare l'esperienza utente:
 * - Lightbox avanzato per la visualizzazione dei progetti
 * - Progress bar di scorrimento
 * - Indicatori di sezione
 * - Modalità ad alto contrasto
 * - Caricamento progressivo delle immagini
 * - Easter eggs e funzionalità speciali
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inizializzazione di tutte le funzionalità
  initScrollProgress();
  initSectionIndicators();
  setupProgressiveImages();
  setupHighContrastToggle();
  setupLightbox();
  setupParallaxEffect();
  setupKonamiCode();
  enhanceProjectInteractions();

  // Aggiungi la barra di progresso dello scroll
  function initScrollProgress() {
    // Crea l'elemento progress bar se non esiste
    if (!document.querySelector('.scroll-progress')) {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
    }
    
    // Aggiorna la barra di progresso durante lo scroll
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
    }
    
    // Ascolta evento scroll per aggiornare la barra
    window.addEventListener('scroll', PerformanceUtils.throttle(updateScrollProgress, 10), { passive: true });
    updateScrollProgress(); // Inizializza
  }

  // Aggiungi indicatori di sezione sulla destra
  function initSectionIndicators() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length && !document.querySelector('.section-indicator')) {
      // Crea il contenitore degli indicatori
      const indicator = document.createElement('div');
      indicator.className = 'section-indicator';
      
      // Crea un dot per ogni sezione
      sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'section-dot';
        dot.setAttribute('data-target', section.id);
        
        // Aggiungi etichetta
        const label = document.createElement('span');
        label.className = 'section-label';
        
        // Prendi il testo dall'h2 della sezione, se presente
        const sectionTitle = section.querySelector('h2');
        if (sectionTitle) {
          // Trova elementi di lingua e usa quello visibile
          const itText = sectionTitle.querySelector('.lang-it');
          const enText = sectionTitle.querySelector('.lang-en');
          
          if (itText) {
            label.textContent = itText.textContent;
          } else if (enText) {
            label.textContent = enText.textContent;
          } else {
            label.textContent = sectionTitle.textContent;
          }
        } else {
          label.textContent = section.id;
        }
        
        dot.appendChild(label);
        indicator.appendChild(dot);
        
        // Aggiungi event listener per il click
        dot.addEventListener('click', () => {
          section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        });
      });
      
      document.body.appendChild(indicator);
      
      // Funzione per aggiornare l'indicatore attivo
      function updateSectionIndicators() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach((section, index) => {
          const dot = document.querySelectorAll('.section-dot')[index];
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      
      // Ascolta evento scroll per aggiornare indicatori
      window.addEventListener('scroll', PerformanceUtils.throttle(updateSectionIndicators, 100), { passive: true });
      updateSectionIndicators(); // Inizializza
    }
  }

  // Gestione caricamento progressivo delle immagini
  function setupProgressiveImages() {
    // Trova le immagini dei progetti
    const projectImages = document.querySelectorAll('.project img');
    
    projectImages.forEach(img => {
      // Prepara il contenitore per il caricamento progressivo
      const container = document.createElement('div');
      container.className = 'progressive-image-container';
      
      // Crea un'immagine placeholder sfocata di piccole dimensioni
      const placeholder = document.createElement('div');
      placeholder.className = 'progressive-image-placeholder';
      placeholder.style.backgroundColor = '#1a1a21'; // Colore simile al background
      
      // Aggiungi indicatore di caricamento
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'image-loading-indicator';
      
      // Riorganizza gli elementi
      img.parentNode.insertBefore(container, img);
      container.appendChild(img);
      container.appendChild(placeholder);
      container.appendChild(loadingIndicator);
      
      // Aggiungi classe per styling
      img.classList.add('progressive-image');
      
      // Gestisci evento load
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    });
  }

  // Modalità ad alto contrasto
  function setupHighContrastToggle() {
    if (!document.querySelector('.high-contrast-toggle')) {
      // Crea il toggle per l'alto contrasto
      const toggle = document.createElement('button');
      toggle.className = 'high-contrast-toggle';
      toggle.setAttribute('aria-label', 'Attiva/disattiva modalità ad alto contrasto');
      toggle.setAttribute('data-aria-label-en', 'Toggle high contrast mode');
      
      // Aggiungi icona SVG
      toggle.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-2V6a6 6 0 1 1 0 12z"/>
        </svg>
      `;
      
      document.body.appendChild(toggle);
      
      // Ascolta i click sul toggle
      toggle.addEventListener('click', () => {
        const isHighContrast = document.documentElement.getAttribute('data-high-contrast') === 'true';
        document.documentElement.setAttribute('data-high-contrast', isHighContrast ? 'false' : 'true');
        
        // Salva la preferenza
        localStorage.setItem('high-contrast', isHighContrast ? 'false' : 'true');
        
        // Aggiorna l'aria-label in base alla lingua corrente
        const lang = document.documentElement.lang || 'it';
        if (lang === 'en') {
          toggle.setAttribute('aria-label', isHighContrast ? 'Enable high contrast mode' : 'Disable high contrast mode');
        } else {
          toggle.setAttribute('aria-label', isHighContrast ? 'Attiva modalità ad alto contrasto' : 'Disattiva modalità ad alto contrasto');
        }
      });
      
      // Ripristina stato salvato
      const savedState = localStorage.getItem('high-contrast');
      if (savedState === 'true') {
        document.documentElement.setAttribute('data-high-contrast', 'true');
      }
    }
  }

  // Lightbox migliorato per progetti
  function setupLightbox() {
    const projects = document.querySelectorAll('.project');
    
    if (projects.length && !document.querySelector('.lightbox')) {
      // Crea il lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-hidden', 'true');
      
      // Struttura interna del lightbox
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Chiudi" data-aria-label-en="Close">×</button>
          <img class="lightbox-image" src="" alt="">
          <div class="lightbox-caption"></div>
          <div class="lightbox-nav"></div>
        </div>
      `;
      
      document.body.appendChild(lightbox);
      
      // Cache degli elementi
      const lightboxImage = lightbox.querySelector('.lightbox-image');
      const lightboxCaption = lightbox.querySelector('.lightbox-caption');
      const lightboxNav = lightbox.querySelector('.lightbox-nav');
      const lightboxClose = lightbox.querySelector('.lightbox-close');
      
      // Variabili per il controllo del lightbox
      let currentImageIndex = 0;
      let currentImages = [];
      let currentCaptions = [];
      
      // Funzione per aprire il lightbox
      function openLightbox(images, captions, startIndex = 0) {
        currentImages = images;
        currentCaptions = captions;
        currentImageIndex = startIndex;
        
        // Aggiorna l'immagine e la didascalia
        updateLightboxContent();
        
        // Crea i dot di navigazione
        lightboxNav.innerHTML = '';
        currentImages.forEach((_, index) => {
          const dot = document.createElement('button');
          dot.className = 'lightbox-dot';
          dot.setAttribute('aria-label', `Vai all'immagine ${index + 1}`);
          dot.setAttribute('data-aria-label-en', `Go to image ${index + 1}`);
          
          dot.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxContent();
          });
          
          lightboxNav.appendChild(dot);
        });
        
        // Mostra il lightbox
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        
        // Focus sul lightbox per accessibilità
        setTimeout(() => {
          lightboxClose.focus();
        }, 100);
        
        // Disabilita lo scroll del body
        document.body.style.overflow = 'hidden';
      }
      
      // Funzione per chiudere il lightbox
      function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      
      // Funzione per aggiornare il contenuto del lightbox
      function updateLightboxContent() {
        // Aggiorna immagine e didascalia
        lightboxImage.src = currentImages[currentImageIndex];
        lightboxCaption.textContent = currentCaptions[currentImageIndex];
        
        // Aggiorna i dot di navigazione
        const dots = lightboxNav.querySelectorAll('.lightbox-dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentImageIndex);
          dot.setAttribute('aria-current', index === currentImageIndex ? 'true' : 'false');
        });
      }
      
      // Navigazione con tastiera
      lightbox.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
          if (e.key === 'Escape') {
            closeLightbox();
          } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            updateLightboxContent();
          } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            updateLightboxContent();
          }
        }
      });
      
      // Chiudi cliccando sul pulsante di chiusura
      lightboxClose.addEventListener('click', closeLightbox);
      
      // Chiudi cliccando fuori dal contenuto
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
      
      // Collega ai progetti
      projects.forEach(project => {
        project.addEventListener('click', function() {
          const projectTitle = this.querySelector('h3').textContent.trim();
          const projectData = window.projectData[projectTitle];
          
          if (projectData && projectData.sliderImages && projectData.sliderTitles) {
            openLightbox(projectData.sliderImages, projectData.sliderTitles);
          } else {
            // Fallback: usa l'immagine del progetto stesso
            const img = this.querySelector('img');
            openLightbox([img.src], [projectTitle]);
          }
        });
      });
    }
  }

  // Effetto parallasse per elementi con classe .parallax
  function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      function updateParallax(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        parallaxElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const elementX = rect.left + rect.width / 2;
          const elementY = rect.top + rect.height / 2;
          
          const diffX = mouseX - elementX;
          const diffY = mouseY - elementY;
          
          // Calcola l'intensità dell'effetto in base alla posizione
          const distance = Math.sqrt(diffX * diffX + diffY * diffY);
          const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight) / 2;
          const intensity = Math.min(10, (1 - distance / maxDistance) * 20);
          
          // Applica la trasformazione
          element.style.transform = `perspective(1000px) rotateY(${diffX * 0.01}deg) rotateX(${-diffY * 0.01}deg)`;
          
          // Aggiorna i layer con profondità diverse
          const layers = element.querySelectorAll('.parallax-layer');
          layers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute('data-depth') || 1);
            layer.style.transform = `translateX(${diffX * 0.02 * depth}px) translateY(${diffY * 0.02 * depth}px)`;
          });
        });
      }
      
      // Ascolta il movimento del mouse per l'effetto parallasse
      document.addEventListener('mousemove', PerformanceUtils.throttle(updateParallax, 30));
    }
  }

  // Easter egg Konami code
  function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
          document.body.classList.add('konami-activated');
          
          const message = document.createElement('div');
          message.className = 'secret-message';
          message.textContent = '🎮 Konami Code Activated! 🎮';
          document.body.appendChild(message);
          
          setTimeout(() => {
            message.classList.add('visible');
            
            setTimeout(() => {
              message.classList.remove('visible');
              setTimeout(() => {
                message.remove();
              }, 300);
            }, 3000);
          }, 100);
          
          konamiIndex = 0;
          
          // Rimuovi l'effetto dopo 10 secondi
          setTimeout(() => {
            document.body.classList.remove('konami-activated');
          }, 10000);
        }
      } else {
        konamiIndex = 0;
      }
    });
  }

  // Migliora le interazioni con i progetti
  function enhanceProjectInteractions() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
      // Aggiungi effetto hover lift
      project.classList.add('hover-lift', 'pulse-on-hover', 'click-effect');
      
      // Rendi i progetti focusable con tastiera se non lo sono già
      if (project.getAttribute('tabindex') !== '0') {
        project.setAttribute('tabindex', '0');
      }
      
      // Aggiungi supporto per la tastiera
      project.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          project.click();
        }
      });
    });
  }
});
