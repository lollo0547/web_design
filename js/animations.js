/**
 * Animation Observer for Lorenzo Giudici's Portfolio
 * Handles the activation of animations based on scroll position
 */

document.addEventListener('DOMContentLoaded', function() {
  // Selezioniamo tutti gli elementi con le classi reveal
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  // Configurazione per Intersection Observer
  const observerOptions = {
    root: null, // usa il viewport come container
    rootMargin: '0px',
    threshold: 0.1 // attiva quando almeno il 10% dell'elemento è visibile
  };
  
  // Funzione callback per l'observer
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // Se l'elemento è visibile nel viewport
      if (entry.isIntersecting) {
        // Aggiungi la classe active
        entry.target.classList.add('active');
        
        // Opzionale: smetti di osservare l'elemento dopo l'animazione
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Crea un observer con la callback e le opzioni definite
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Inizia ad osservare tutti gli elementi
  revealElements.forEach(element => {
    observer.observe(element);
  });
  
  // Aggiungi animazioni di entrata per elementi già visibili all'avvio
  setTimeout(function() {
    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        element.classList.add('active');
      }
    });
  }, 300);
});
