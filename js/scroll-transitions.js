/**
 * Scroll Transitions - Gestisce le animazioni e transizioni basate sullo scrolling
 * Lorenzo Giudici Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar-container');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const fadeImages = document.querySelectorAll('img.fade-in-image');
  
  // Caricamento immagini con fade-in
  fadeImages.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
  
  // Funzione per gestire la navbar sticky con effetti di scroll
  const handleNavbarScroll = () => {
    const scrollY = window.scrollY;
    
    // Mostra la navbar dopo un certo scroll dalla cima
    if (scrollY > 150) {
      navbar.classList.add('visible');
      
      // Versione compatta della navbar quando si scorre più in basso
      if (scrollY > 300) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    } else {
      navbar.classList.remove('visible');
    }
  };
  
  // Funzione per gestire l'animazione degli elementi al scroll
  const handleScrollAnimations = () => {
    const triggerBottom = window.innerHeight * 0.85; // Animazione quando l'elemento è all'85% della viewport
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };
  
  // Esegui le funzioni una volta all'avvio per impostare lo stato iniziale
  handleNavbarScroll();
  handleScrollAnimations();
  
  // Aggiungi listener per lo scrolling
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleScrollAnimations();
  });
  
  // Reimposta tutto quando la finestra viene ridimensionata
  window.addEventListener('resize', () => {
    handleNavbarScroll();
    handleScrollAnimations();
  });
});
