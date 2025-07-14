/**
 * Interessi Section Interactions
 * Gestisce le animazioni e le interazioni della sezione interessi
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize interest cards
  initializeInterestCards();
  
  // Set up 3D card effect for desktop users
  setupInterestCards3DEffect();
  
  // Set up modal functionality for interest details
  setupInterestModals();
});

// Function to initialize interest cards
function initializeInterestCards() {
  const interestCards = document.querySelectorAll('.interest-card');
  
  // Observer for revealing interest cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Observe all interest cards
  interestCards.forEach(card => {
    observer.observe(card);
  });

  // (Fallback rimosso: ora solo IntersectionObserver gestisce la visibilità)
}

// Function to set up 3D card effect for desktop users
function setupInterestCards3DEffect() {
  const interestCards = document.querySelectorAll('.interest-card');
  
  // Only apply these effects on non-touch devices
  if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    interestCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Subtle 3D rotation effect
        this.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg) translateY(-10px)`;
        
        // Move the highlight element if it exists
        const highlight = this.querySelector('.interest-highlight');
        if (highlight) {
          highlight.style.opacity = '0.15';
          highlight.style.transform = `translate(${mouseX * 10 + 4}px, ${mouseY * 10 + 4}px) scale(1.1)`;
        }
        
        // Scale the icon slightly
        const icon = this.querySelector('.interest-icon');
        if (icon) {
          icon.style.transform = 'translateY(-5px) scale(1.05)';
        }
      });
      
      // Reset transforms when mouse leaves
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        
        const highlight = this.querySelector('.interest-highlight');
        if (highlight) {
          highlight.style.opacity = '';
          highlight.style.transform = '';
        }
        
        const icon = this.querySelector('.interest-icon');
        if (icon) {
          icon.style.transform = '';
        }
      });
    });
  }
}

// Function to set up modal functionality
function setupInterestModals() {
  const interestCards = document.querySelectorAll('.interest-card');
  const modals = document.querySelectorAll('.interest-modal');
  const closeButtons = document.querySelectorAll('.interest-modal-close');

  // Open modal when clicking the card (data-modal sull'elemento card)
  interestCards.forEach(card => {
    const btn = card.querySelector('[data-modal]');
    const modalId = btn ? btn.getAttribute('data-modal') : null;
    if (modalId) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        if (e.target.closest('.interest-modal-close')) return;
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
          modal.setAttribute('aria-hidden', 'false');
          // Sposta il focus sul modal
          setTimeout(() => {
            modal.setAttribute('tabindex', '-1');
            modal.focus();
          }, 10);
          // Nascondi il resto della pagina agli screen reader
          document.querySelectorAll('body > *:not(#' + modalId + ')').forEach(element => {
            element.setAttribute('aria-hidden', 'true');
          });
        }
      });
    }
  });

  // Funzione per chiudere il modal e ripristinare lo stato
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
    // Ripristina aria-hidden sugli altri elementi
    document.querySelectorAll('body > *:not(#' + modal.id + ')').forEach(element => {
      element.removeAttribute('aria-hidden');
    });
  }

  // Close modal when clicking close button
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.interest-modal');
      closeModal(modal);
    });
  });

  // Close modal when clicking outside modal content
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
    // Imposta aria-hidden di default
    modal.setAttribute('aria-hidden', 'true');
  });

  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
}
