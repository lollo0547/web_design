  // Definizione overlays per gestione overlay-close
  const overlays = document.querySelectorAll('.project-overlay');
// Nuova logica Progetti: responsive, usabile, scalabile, indicatori slider
document.addEventListener('DOMContentLoaded', function() {
  // Simulazione: elenco progetti (in produzione, generare questa lista da backend o build)
  const projects = [
    {
      title_it: 'Set da Caffè Design',
      title_en: 'Coffee Set Design',
      img: 'immagini/webp/progetti/product design/set da caffè/tazzina_.webp',
      alt: 'Set da Caffè Design',
      category: 'product',
    },
    {
      title_it: 'Meccanismo Cardanico',
      title_en: 'Cardanic Mechanism',
      img: 'immagini/webp/progetti/product design/la cardanica/cardanica.webp',
      alt: 'Meccanismo Cardanico',
      category: 'product',
    },
    {
      title_it: 'Concept Design Industriale',
      title_en: 'Industrial Concept Design',
      img: 'immagini/webp/progetti/product design/lounge milani/untitled555.webp',
      alt: 'Concept Design Industriale',
      category: 'product',
    },
    {
      title_it: 'Prototipo Mouse',
      title_en: 'Mouse Prototype',
      img: 'immagini/webp/progetti/prototipazione/mouse/untitled.webp',
      alt: 'Prototipo Mouse',
      category: 'prototype',
    },
    {
      title_it: 'Rendering Interno',
      title_en: 'Interior Rendering',
      img: 'immagini/webp/progetti/rendering/rendering interno/Render Interno Esame 2.webp',
      alt: 'Rendering Interno',
      category: 'rendering',
    },
    {
      title_it: 'Progetto Personale',
      title_en: 'Personal Project',
      img: 'immagini/webp/progetti/rendering/rendering personale/Render_progetto_esame_3.webp',
      alt: 'Progetto Personale',
      category: 'rendering',
    },
    {
      title_it: 'Rendering Prodotto',
      title_en: 'Product Rendering',
      img: 'immagini/webp/progetti/rendering/rendering prodotto/Render Vespa esame.webp',
      alt: 'Rendering Prodotto',
      category: 'rendering',
    },
    {
      title_it: 'Modellazione 3D Vespa',
      title_en: '3D Vespa Modeling',
      img: 'immagini/webp/progetti/modellazione 3D/biblioteca/1.1.webp',
      alt: 'Modellazione 3D Vespa',
      category: '3d',
    },
    // Aggiungi altri progetti qui seguendo la struttura
  ];

  const progettiGrid = document.getElementById('progettiGrid');
  const progettiIndicators = document.getElementById('progettiIndicators');
  const progettiFilters = document.getElementById('progettiFilters');
  const projectsPerPage = 2;
  let currentPage = 0;
  let currentCategory = 'all';

  function getFilteredProjects() {
    if (currentCategory === 'all') return projects;
    return projects.filter(p => p.category === currentCategory);
  }

  function renderProjects(page) {
    progettiGrid.innerHTML = '';
    const filtered = getFilteredProjects();
    const start = page * projectsPerPage;
    const end = Math.min(start + projectsPerPage, filtered.length);
    for (let i = start; i < end; i++) {
      const p = filtered[i];
      const globalIndex = projects.indexOf(p); // posizione nel dataset globale
      const card = document.createElement('div');
      card.className = 'progetto-card';
      card.setAttribute('data-overlay', `project${globalIndex + 1}`);
      card.innerHTML = `
        <div class="progetto-image-container">
          <div class="progetto-frame">
            <div class="progetto-image-mask">
              <img src="${p.img}" loading="lazy" alt="${p.alt}" class="progetto-image shadow-effect">
              <div class="progetto-image-overlay"></div>
            </div>
          </div>
          <div class="dynamic-shadow"></div>
        </div>
        <div class="progetto-name-box">
          <h3>
            <span class="lang-it">${p.title_it}</span>
            <span class="lang-en">${p.title_en}</span>
          </h3>
        </div>
      `;
      // Click per aprire overlay
      card.addEventListener('click', function() {
        const overlayId = this.getAttribute('data-overlay');
        const overlay = document.getElementById(overlayId);
        if (overlay) {
          document.querySelectorAll('.project-overlay').forEach(o => o.classList.remove('active'));
          overlay.classList.add('active');
          document.body.classList.add('no-scroll');
        }
      });
      progettiGrid.appendChild(card);
    }
    // Inizializza ombre dinamiche sulle immagini dei progetti
    setTimeout(() => {
      document.querySelectorAll('.progetto-image.shadow-effect').forEach(image => {
        image.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const offsetX = (x - centerX) / 25;
          const offsetY = (y - centerY) / 25;
          this.style.boxShadow = `${offsetX}px ${offsetY}px 20px rgba(0, 0, 0, 0.18)`;
        });
        image.addEventListener('mouseleave', function() {
          this.style.boxShadow = '';
        });
      });
    }, 10);
  }

  function renderIndicators(page) {
    progettiIndicators.innerHTML = '';
    const filtered = getFilteredProjects();
    const totalPages = Math.ceil(filtered.length / projectsPerPage);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'indicator' + (i === page ? ' active' : '');
      dot.setAttribute('aria-label', `Vai alla pagina ${i + 1}`);
      dot.addEventListener('click', () => {
        currentPage = i;
        renderProjects(currentPage);
        renderIndicators(currentPage);
      });
      progettiIndicators.appendChild(dot);
    }
  }

  // Gestione filtri
  // Funzione per aggiornare la posizione dell'indicatore
  function updateFilterIndicator() {
    const indicator = document.getElementById('filterIndicator');
    const activeBtn = progettiFilters.querySelector('.filter-btn.active');
    if (indicator && activeBtn) {
      // Effetto: shrink e fade leggero durante il movimento
      indicator.style.transition = 'none';
      indicator.style.transform = 'scaleX(0.7)';
      indicator.style.opacity = '0.7';
      // Calcola posizione e larghezza
      const left = activeBtn.offsetLeft;
      const width = activeBtn.offsetWidth;
      setTimeout(() => {
        indicator.style.transition =
          'left 0.45s cubic-bezier(0.34,1.56,0.64,1), width 0.45s cubic-bezier(0.34,1.56,0.64,1), transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s cubic-bezier(0.34,1.56,0.64,1)';
        indicator.style.left = left + 'px';
        indicator.style.width = width + 'px';
        indicator.style.transform = 'scaleX(1)';
        indicator.style.opacity = '1';
      }, 20);
    }
  }

  if (progettiFilters) {
    // Inizializza posizione indicatore
    setTimeout(updateFilterIndicator, 100);
    window.addEventListener('resize', updateFilterIndicator);
    progettiFilters.addEventListener('click', function(e) {
      if (e.target.classList.contains('filter-btn')) {
        // Animazione dinamica e fluida tra i filtri
        const grid = document.getElementById('progettiGrid');
        grid.style.transition = 'opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(30px) scale(0.98)';
        setTimeout(() => {
          document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          currentCategory = e.target.getAttribute('data-category');
          currentPage = 0;
          renderProjects(currentPage);
          renderIndicators(currentPage);
          grid.style.opacity = '1';
          grid.style.transform = 'translateY(0) scale(1)';
          updateFilterIndicator();
        }, 250);
      }
    });
  }

  // Inizializza
  renderProjects(currentPage);
  renderIndicators(currentPage);
// end
  
  // Close overlay when clicking outside content
  function closeOverlay(overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      if (!document.querySelector('.project-overlay.active')) {
        document.body.classList.remove('no-scroll');
      }
    }, 200);
  }
  function closeAllOverlays() {
    document.querySelectorAll('.project-overlay').forEach(o => o.classList.remove('active'));
    document.body.classList.remove('no-scroll');
  }
  overlays.forEach(overlay => {
    // Chiudi cliccando sullo sfondo
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeOverlay(overlay);
      }
    });
    // Chiudi cliccando sulla X
    const closeBtn = overlay.querySelector('.overlay-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeOverlay(overlay);
      });
    }
  });
  // Close overlay with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllOverlays();
    }
  });
  
  // Image Carousel Functionality
  function initCarousel(carouselTrack) {
    if (!carouselTrack) return;
    
    const carouselId = carouselTrack.getAttribute('data-project');
    const slides = carouselTrack.querySelectorAll('.overlay-carousel-slide');
    const thumbnails = document.querySelectorAll(`.overlay-thumb[data-carousel="${carouselId}"]`);
    let currentIndex = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
      // Update transform
      carouselTrack.style.transform = `translateX(-${index * 100}%)`;
      
      // Update active classes
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      
      // Update thumbnail active states
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
      
      currentIndex = index;
    }
    
    // Add click events to thumbnails
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', function() {
        showSlide(index);
      });
    });
    
    // Start with first slide
    showSlide(0);
    
    // Return functions for external control
    return {
      next: () => showSlide((currentIndex + 1) % slides.length),
      prev: () => showSlide((currentIndex - 1 + slides.length) % slides.length),
      goTo: (index) => showSlide(index)
    };
  }
  
  // Initialize all carousels
  document.querySelectorAll('.overlay-carousel-track').forEach(track => {
    initCarousel(track);
  });
  
  // Start automatic carousel
  function startCarousel(carouselTrack) {
    if (!carouselTrack) return;
    
    const carousel = initCarousel(carouselTrack);
    
    // Clear any existing interval
    if (carouselTrack.autoInterval) {
      clearInterval(carouselTrack.autoInterval);
    }
    
    // Set new interval
    carouselTrack.autoInterval = setInterval(() => {
      carousel.next();
    }, 4000); // Change slide every 4 seconds
    
    return carouselTrack.autoInterval;
  }
  
  // Dynamic shadow effect for images
  function initDynamicShadows() {
    document.querySelectorAll('.shadow-effect').forEach(image => {
      image.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const offsetX = (x - centerX) / 25;
        const offsetY = (y - centerY) / 25;
        
        this.style.boxShadow = `${offsetX}px ${offsetY}px 20px rgba(0, 0, 0, 0.2)`;
      });
      
      image.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
      });
    });
  }
  
  // Initialize dynamic shadows
  initDynamicShadows();
  
  // Re-initialize features when overlay opens
  overlays.forEach(overlay => {
    overlay.addEventListener('transitionend', function(e) {
      if (e.propertyName === 'opacity' && this.classList.contains('active')) {
        initDynamicShadows();
      }
    });
  });
  
  // Initialize the first page animations
});
