/**
 * Chi Sono Section Animations
 * Additional animations and interactions for the Chi Sono section
 */

document.addEventListener('DOMContentLoaded', function() {
  // Animazione degli elementi skill al caricamento
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach((card, index) => {
    // Imposta un indice personalizzato per ogni elemento skill
    card.style.setProperty('--item-index', index);
    
    // Osserva quando gli elementi skill diventano visibili
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('active');
            }, index * 150); // Ritardo progressivo
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    observer.observe(card);
  });
  
  // Effetto 3D per l'immagine del profilo
  const profileContainer = document.querySelector('.profile-container');
  const profileImage = document.querySelector('.profile-image');
  const profileFrame = document.querySelector('.profile-frame');
  const decorativeElements = document.querySelectorAll('.decorative-element');
  const accentShape = document.querySelector('.profile-accent-shape');
  
  if (profileContainer && profileImage) {
    // Rileva dispositivi touch per disabilitare alcuni effetti
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      window.addEventListener('mousemove', function(e) {
        // Calcola la posizione relativa del mouse
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Applica effetto 3D all'immagine
        requestAnimationFrame(() => {
          if (profileFrame) {
            profileFrame.style.transform = `perspective(1000px) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg)`;
          }
          
          // Movimento leggero per elementi decorativi
          decorativeElements.forEach((element, index) => {
            const offsetFactor = index + 1;
            element.style.transform = `translate(${mouseX * 25 * offsetFactor}px, ${mouseY * 25 * offsetFactor}px)`;
          });
          
          // Movimento per accento
          if (accentShape) {
            accentShape.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
          }
        });
      });
      
      // Reset al mouse leave
      document.querySelector('.chi-sono-section').addEventListener('mouseleave', function() {
        if (profileFrame) {
          profileFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        }
        
        decorativeElements.forEach(element => {
          element.style.transform = 'translate(0px, 0px)';
        });
        
        if (accentShape) {
          accentShape.style.transform = 'translate(0px, 0px)';
        }
      });
    }
  }
  
  // Inizializza l'animazione al caricamento
  const chiSonoSection = document.querySelector('.chi-sono-section');
  if (chiSonoSection) {
    // Attiva sezione con osservatore
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            chiSonoSection.classList.add('section-active');
            
            // Attiva animazioni per elementi decorativi
            if (accentShape) {
              accentShape.classList.add('active');
            }
            
            sectionObserver.unobserve(chiSonoSection);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    sectionObserver.observe(chiSonoSection);
  }
  
  // Animazione sincronizzata al scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Calcola la posizione relativa della sezione nel viewport
    const sectionTop = chiSonoSection.getBoundingClientRect().top;
    const sectionHeight = chiSonoSection.offsetHeight;
    const scrollProgress = 1 - (sectionTop / windowHeight);
    
    // Applica effetti basati sullo scroll solo quando la sezione è visibile
    if (scrollProgress > 0 && scrollProgress < 1.5) {
      // Parallasse verticale per elementi decorativi
      decorativeElements.forEach((element, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = scrollProgress * 100 * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
    }
  });
});
