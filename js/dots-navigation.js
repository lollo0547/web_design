/**
 * Navigazione a puntini laterale
 * Permette di navigare velocemente tra le sezioni del sito
 */

document.addEventListener('DOMContentLoaded', function() {
  // Seleziona elementi necessari
  const dotsNav = document.querySelector('.dots-nav');
  const dots = document.querySelectorAll('.dots-nav .dot');
  const sections = document.querySelectorAll('section[id]');
  
  // Posizione dello scroll per rendere visibile la navigazione a puntini
  const navShowPosition = 500;
  
  // Gestione dello scroll
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Mostra/nascondi la navigazione a puntini
    if (dotsNav) {
      if (scrollTop > navShowPosition) {
        dotsNav.classList.add('visible');
      } else {
        dotsNav.classList.remove('visible');
      }
    }
    
    // Gestisci l'attivazione del puntino corretto
    handleDotsNavigation();
  });
  
  // Funzione per gestire la navigazione a puntini
  function handleDotsNavigation() {
    // Se non ci sono puntini o sezioni, esce dalla funzione
    if (!dots.length || !sections.length) return;
    
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    // Verifica quale sezione è attualmente visibile
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Rimuovi la classe active da tutti i puntini
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Aggiungi la classe active al puntino corrispondente alla sezione attuale
        const activeDot = document.querySelector(`.dots-nav .dot[data-section="${sectionId}"]`);
        if (activeDot) {
          activeDot.classList.add('active');
        }
      }
    });
  }
  
  // Aggiungi evento di caricamento iniziale per impostare il puntino attivo
  window.addEventListener('load', handleDotsNavigation);
  
  // Aggiungi animazione fluida allo scroll quando si clicca su un puntino
  dots.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Smooth scroll to the target section
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
