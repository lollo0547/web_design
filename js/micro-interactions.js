/**
 * Micro-interazioni e animazioni per il portfolio di Lorenzo Giudici
 * Questo file gestisce le piccole animazioni e feedback visivi durante l'interazione dell'utente
 */

document.addEventListener('DOMContentLoaded', () => {
  // Aggiungi classe per animazioni ai bottoni
  document.querySelectorAll('.btn').forEach(button => {
    button.classList.add('btn-hover-effect');
  });

  // Aggiungi classe per animazioni ai link
  document.querySelectorAll('a:not(.btn)').forEach(link => {
    if (!link.closest('.navbar') && !link.closest('.footer-nav')) {
      link.classList.add('link-animated');
    }
  });

  // Aggiungi animazioni hover alle card
  document.querySelectorAll('.skill-card, .interest-card').forEach(card => {
    card.classList.add('card-hover');
  });

  // Aggiungi animazione fade-in alle immagini
  document.querySelectorAll('img:not(.logo-image)').forEach(img => {
    img.classList.add('fade-in-image');
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });

  // Aggiungi effetto zoom alle immagini nei progetti
  document.querySelectorAll('.progetto-frame').forEach(frame => {
    frame.classList.add('img-hover-zoom');
  });

  // Aggiungi classi di rivelazione agli elementi appropriati
  const addRevealClasses = () => {
    // Titoli delle sezioni
    document.querySelectorAll('.section-title').forEach((el, index) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });

    // Gruppi di skills
    document.querySelectorAll('.skill-card').forEach((el, index) => {
      if (!el.classList.contains('reveal-scale')) {
        el.classList.add('reveal-scale');
        el.classList.add(`reveal-stagger-${(index % 5) + 1}`);
      }
    });

    // Card di interessi
    document.querySelectorAll('.interest-card').forEach((el, index) => {
      if (!el.classList.contains('reveal')) {
        if (index % 2 === 0) {
          el.classList.add('reveal-left');
        } else {
          el.classList.add('reveal-right');
        }
        el.classList.add(`reveal-stagger-${(index % 3) + 1}`);
      }
    });

    // Progetti
    document.querySelectorAll('.progetto-card').forEach((el, index) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal-scale');
        el.classList.add(`reveal-stagger-${(index % 3) + 1}`);
      }
    });
  };

  // Esegui subito per gli elementi già nel DOM
  addRevealClasses();

  // Aggiungi micro-interazione per il pulsante di menu mobile
  const burgerMenu = document.querySelector('.burger-menu');
  if (burgerMenu) {
    burgerMenu.addEventListener('click', (e) => {
      // Aggiungi effetto al click
      e.target.classList.add('active');
      setTimeout(() => {
        e.target.classList.remove('active');
      }, 300);
    });
  }

  // Aggiungi effetto ripple ai bottoni
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple-effect');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
