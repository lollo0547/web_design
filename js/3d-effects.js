/**
 * PORTFOLIO DI LORENZO GIUDICI - EFFETTI 3D AVANZATI
 * 
 * Questo script implementa effetti 3D avanzati e animazioni canvas:
 * - Effetto parallasse 3D a strati con profondità
 * - Effetto particelle interattive su canvas per background
 * - Morfismo e trasformazioni SVG
 * - Animazioni path SVG coordinate con lo scroll
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inizializza tutti gli effetti
  initParallaxLayers();
  initParticleCanvas();
  initScrollSvgAnimation();
  initMasonryLayout();
  initStaggerElements();
  
  /**
   * Parallasse avanzato con effetto di profondità
   * Crea un effetto 3D con più livelli di profondità
   */
  function initParallaxLayers() {
    // Ottieni tutti i contenitori con parallasse
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    
    if (parallaxContainers.length === 0 || isTouchDevice()) return;
    
    parallaxContainers.forEach(container => {
      // Ottieni tutti i layer nel contenitore
      const layers = container.querySelectorAll('.parallax-layer');
      
      // Configura le proprietà di parallasse
      container.addEventListener('mousemove', e => {
        const rect = container.getBoundingClientRect();
        
        // Calcola la posizione del mouse relativa al contenitore (da -0.5 a 0.5)
        const xPos = ((e.clientX - rect.left) / rect.width) - 0.5;
        const yPos = ((e.clientY - rect.top) / rect.height) - 0.5;
        
        // Applica la trasformazione a ciascun layer con profondità diversa
        layers.forEach(layer => {
          // Ottieni il valore di profondità dall'attributo data-depth
          const depth = layer.getAttribute('data-depth') || 1;
          const depthFactor = depth * 20; // Moltiplica per aumentare l'effetto
          
          // Calcola lo spostamento basato sulla profondità
          const xShift = xPos * depthFactor;
          const yShift = yPos * depthFactor;
          
          // Applica la trasformazione con transizione fluida
          layer.style.transform = `translate3d(${xShift}px, ${yShift}px, 0) scale(1.05)`;
        });
      });
      
      // Ripristina la posizione quando il mouse esce
      container.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
          layer.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
      });
    });
  }
  
  /**
   * Effetto di sfondo con particelle interattive
   * Crea un canvas con particelle che reagiscono al movimento del mouse
   */
  function initParticleCanvas() {
    // Cerca canvas per le particelle
    const particleCanvas = document.getElementById('particles-canvas');
    if (!particleCanvas) return;
    
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationFrame;
    
    // Imposta le dimensioni del canvas
    function resizeCanvas() {
      particleCanvas.width = particleCanvas.offsetWidth;
      particleCanvas.height = particleCanvas.offsetHeight;
      
      // Ricrea le particelle quando il canvas viene ridimensionato
      createParticles();
    }
    
    // Crea le particelle
    function createParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor(particleCanvas.width * particleCanvas.height / 15000), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * particleCanvas.width,
          y: Math.random() * particleCanvas.height,
          radius: Math.random() * 3 + 1,
          color: getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim(),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          sinOffset: Math.random() * Math.PI * 2
        });
      }
    }
    
    // Aggiorna e disegna le particelle
    function drawParticles() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      
      // Disegna le particelle
      particles.forEach(particle => {
        // Aggiorna posizione con movimento sinusoidale
        particle.x += particle.vx;
        particle.y += particle.vy + Math.sin(Date.now() * 0.001 + particle.sinOffset) * 0.2;
        
        // Effetto di attrazione verso il mouse
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100 && mouseX !== 0 && mouseY !== 0) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 1000;
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }
        
        // Limita la velocità
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > 2) {
          particle.vx = (particle.vx / speed) * 2;
          particle.vy = (particle.vy / speed) * 2;
        }
        
        // Gestione dei bordi - rimbalzo
        if (particle.x < 0 || particle.x > particleCanvas.width) {
          particle.vx = -particle.vx;
        }
        
        if (particle.y < 0 || particle.y > particleCanvas.height) {
          particle.vy = -particle.vy;
        }
        
        // Mantieni le particelle entro i limiti
        particle.x = Math.max(0, Math.min(particleCanvas.width, particle.x));
        particle.y = Math.max(0, Math.min(particleCanvas.height, particle.y));
        
        // Disegna la particella
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
      });
      
      // Disegna le connessioni tra particelle vicine
      ctx.beginPath();
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.globalAlpha = 0.2 * (1 - distance / 100);
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.stroke();
      
      animationFrame = requestAnimationFrame(drawParticles);
    }
    
    // Aggiorna la posizione del mouse
    particleCanvas.addEventListener('mousemove', e => {
      const rect = particleCanvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    
    // Resetta la posizione del mouse quando esce
    particleCanvas.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });
    
    // Gestisci il ridimensionamento
    window.addEventListener('resize', resizeCanvas);
    
    // Inizializza
    resizeCanvas();
    drawParticles();
    
    // Pulizia quando l'utente cambia tab o scende molto nella pagina
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
      } else {
        drawParticles();
      }
    });
    
    // Interrompi l'animazione quando il canvas è fuori viewport
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        drawParticles();
      } else {
        cancelAnimationFrame(animationFrame);
      }
    });
    
    observer.observe(particleCanvas);
  }
  
  /**
   * Animazioni path SVG coordinate con lo scroll
   */
  function initScrollSvgAnimation() {
    if (!('IntersectionObserver' in window)) return;
    
    // Seleziona tutti i path SVG con classe svg-path-anim
    const svgPaths = document.querySelectorAll('.svg-path-anim');
    
    if (svgPaths.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, { threshold: 0.5 });
      
      svgPaths.forEach(path => {
        observer.observe(path);
      });
    }
  }
  
  /**
   * Layout masonry con riposizionamento fluido
   */
  function initMasonryLayout() {
    const masonryGrids = document.querySelectorAll('.masonry-grid');
    
    if (masonryGrids.length === 0) return;
    
    function resizeMasonryItems() {
      masonryGrids.forEach(grid => {
        // Ottieni gli elementi della griglia
        const items = grid.querySelectorAll('.masonry-item');
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        
        items.forEach(item => {
          const itemHeight = item.querySelector('.masonry-content').getBoundingClientRect().height;
          const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
          
          item.style.gridRowEnd = `span ${rowSpan}`;
        });
      });
    }
    
    // Eventi per il ridimensionamento
    const debouncedResize = debounce(resizeMasonryItems, 100);
    window.addEventListener('resize', debouncedResize);
    
    // Inizializzazione dopo il caricamento delle immagini
    window.addEventListener('load', resizeMasonryItems);
    
    // Inizializza anche subito per il contenuto già caricato
    resizeMasonryItems();
    
    // Osserva le immagini per ricalcolare quando vengono caricate
    const images = document.querySelectorAll('.masonry-grid img');
    
    images.forEach(image => {
      // Se l'immagine è già caricata
      if (image.complete) {
        resizeMasonryItems();
      } else {
        image.addEventListener('load', resizeMasonryItems);
      }
    });
  }
  
  /**
   * Inizializza animazioni staggered per elementi in sequenza
   */
  function initStaggerElements() {
    if (!('IntersectionObserver' in window)) return;
    
    const staggerGroups = document.querySelectorAll('.stagger-group');
    
    if (staggerGroups.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = entry.target.children;
            let delay = 0;
            
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              child.style.transitionDelay = `${delay}s`;
              child.classList.add('stagger-fade-up', 'visible');
              delay += 0.1; // 100ms tra gli elementi
            }
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      staggerGroups.forEach(group => {
        observer.observe(group);
      });
    }
  }
  
  /**
   * Utility helper functions
   */
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
  
  function isTouchDevice() {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }
});
