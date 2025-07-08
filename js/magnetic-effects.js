/**
 * PORTFOLIO DI LORENZO GIUDICI - EFFETTI MAGNETICI E AVANZATI
 * 
 * Questo script implementa effetti avanzati di interazione UI:
 * - Bottoni con effetto magnetico che seguono il cursore
 * - Effetti tilt 3D per card interattive
 * - Effetti ripple per feedback visivo al click
 * - Animazione contatori al loro apparire in viewport
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inizializza tutti gli effetti
  initMagneticButtons();
  initTiltEffect();
  initRippleEffect();
  initCounterAnimations();
  initHighlightTextEffect();
  initTypingAnimations();
  initNeumorphicEffects();
  
  /**
   * Bottoni con effetto magnetico che seguono il cursore
   */
  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic-btn');
    
    if (!isTouchDevice() && magneticElements.length > 0) {
      magneticElements.forEach(element => {
        // Ottiene la forza dell'effetto magnetico (default = 1)
        const strength = parseFloat(getComputedStyle(document.documentElement)
          .getPropertyValue('--magnetic-strength')) || 1;
        
        element.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const deltaX = (x - centerX) * 0.1 * strength;
          const deltaY = (y - centerY) * 0.1 * strength;
          
          this.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
          
          // Aggiunge un sottile effetto 3D basato sulla posizione del cursore
          const rotateX = (y - centerY) * 0.01 * strength;
          const rotateY = (centerX - x) * 0.01 * strength;
          
          const contentElement = this.querySelector('.magnetic-btn-content');
          if (contentElement) {
            contentElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }
        });
        
        element.addEventListener('mouseleave', function() {
          this.style.transform = '';
          const contentElement = this.querySelector('.magnetic-btn-content');
          if (contentElement) {
            contentElement.style.transform = '';
          }
        });
        
        element.addEventListener('mousedown', function() {
          this.style.transform = `scale(0.98)`;
        });
        
        element.addEventListener('mouseup', function() {
          setTimeout(() => {
            this.style.transform = '';
          }, 100);
        });
      });
    }
  }
  
  /**
   * Effetto tilt 3D per card interattive
   */
  function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (!isTouchDevice() && tiltCards.length > 0) {
      tiltCards.forEach(card => {
        // Assicurati che ci sia un elemento shine all'interno della card
        if (!card.querySelector('.tilt-shine')) {
          const shine = document.createElement('div');
          shine.className = 'tilt-shine';
          card.appendChild(shine);
        }
        
        card.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          
          // Calcola percentuale della posizione del mouse
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const xPercent = x / rect.width * 100;
          const yPercent = y / rect.height * 100;
          
          // Calcola la rotazione con valori contenuti
          const tiltX = (yPercent - 50) * 0.1; // Rotazione sull'asse X (orizzontale)
          const tiltY = (50 - xPercent) * 0.1; // Rotazione sull'asse Y (verticale)
          
          // Applica rotazione e effetto lucentezza
          this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
          
          // Aggiorna la posizione dell'effetto shine
          const shine = this.querySelector('.tilt-shine');
          if (shine) {
            shine.style.setProperty('--x', `${xPercent}%`);
            shine.style.setProperty('--y', `${yPercent}%`);
          }
          
          // Anima elementi interni se presenti
          const tiltLayer = this.querySelector('.tilt-layer');
          if (tiltLayer) {
            const translateZ = 20;
            tiltLayer.style.transform = `translateZ(${translateZ}px)`;
          }
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
          
          const tiltLayer = this.querySelector('.tilt-layer');
          if (tiltLayer) {
            tiltLayer.style.transform = '';
          }
        });
        
        // Aggiungi transizione iniziale
        card.style.transition = 'transform 0.2s ease-out';
      });
    }
  }
  
  /**
   * Effetto ripple per feedback visivo al click
   */
  function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.ripple-effect');
    
    rippleElements.forEach(element => {
      element.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${x - radius}px`;
        ripple.style.top = `${y - radius}px`;
        
        this.appendChild(ripple);
        
        // Rimuovi il ripple dopo l'animazione
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
  
  /**
   * Animazione contatori attivati da IntersectionObserver
   */
  function initCounterAnimations() {
    if (!('IntersectionObserver' in window)) return;
    
    const countUpElements = document.querySelectorAll('.count-up');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const targetCount = parseInt(element.getAttribute('data-count')) || 0;
          
          element.classList.add('counting');
          
          // Animazione JS per IE e browser che non supportano CSS counters
          if (!CSS.supports('(counter-reset: count 0)')) {
            let start = 0;
            const duration = 2000;
            const increment = targetCount / (duration / 16);
            
            const counter = setInterval(() => {
              start += increment;
              
              if (start >= targetCount) {
                element.textContent = targetCount;
                clearInterval(counter);
              } else {
                element.textContent = Math.floor(start);
              }
            }, 16);
          }
          
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -10% 0px'
    });
    
    countUpElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  /**
   * Effetto di highlighting del testo attivato dallo scroll
   */
  function initHighlightTextEffect() {
    if (!('IntersectionObserver' in window)) return;
    
    const highlightElements = document.querySelectorAll('.highlight-text');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.7,
      rootMargin: '0px 0px -10% 0px'
    });
    
    highlightElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  /**
   * Effetto di digitazione per testi che simulano scrittura
   */
  function initTypingAnimations() {
    if (!('IntersectionObserver' in window)) return;
    
    const typingElements = document.querySelectorAll('.typing-animation');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const text = element.getAttribute('data-text') || element.textContent;
          
          // Resetta il testo per l'animazione
          element.textContent = '';
          element.style.width = '0';
          
          // Imposta la durata in base alla lunghezza del testo
          const duration = Math.min(text.length * 100, 3500); // max 3.5s
          element.style.animation = `typing ${duration}ms steps(${text.length}, end) forwards, blink .75s step-end infinite`;
          
          // Riempie il testo dopo l'animazione
          setTimeout(() => {
            element.textContent = text;
            element.style.width = '100%';
          }, duration);
          
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.7,
      rootMargin: '0px 0px -10% 0px'
    });
    
    typingElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  /**
   * Miglioramenti agli effetti neumorfici con ombre dinamiche
   */
  function initNeumorphicEffects() {
    const neumorphicElements = document.querySelectorAll('.btn-neumorphic, .card-neumorphic');
    
    if (!isTouchDevice() && neumorphicElements.length > 0) {
      neumorphicElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          
          // Calcola percentuale della posizione del mouse
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Calcola la distanza dal centro
          const distX = (x - centerX) / centerX;
          const distY = (y - centerY) / centerY;
          
          // Distanza massima dell'ombra
          const maxDist = 4;
          const shadowX = maxDist * distX;
          const shadowY = maxDist * distY;
          
          // Applica l'ombra dinamica
          this.style.boxShadow = `
            ${shadowX}px ${shadowY}px 15px var(--neumorph-dark-shadow),
            ${-shadowX}px ${-shadowY}px 15px var(--neumorph-light-shadow)
          `;
        });
        
        element.addEventListener('mouseleave', function() {
          // Ripristina l'ombra originale quando il mouse esce
          this.style.boxShadow = '';
        });
      });
    }
  }
  
  /**
   * Utility per rilevare dispositivi touch
   */
  function isTouchDevice() {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }
});
