/**
 * Contacts Section Interactions
 * Gestisce il form di contatto, validazione, invio e animazioni
 */

document.addEventListener('DOMContentLoaded', function() {
  // Gestione del modal per la privacy policy
  setupPrivacyModal();
  
  // Form di contatto
  const contactForm = document.getElementById('contact-form');
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  // Aggiungi animazione ai campi del form quando ricevono il focus
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.parentElement.classList.remove('focused');
      }
      
      // Validazione base al blur
      validateField(this);
    });
  });
  
  // Gestisci l'invio del form
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Controlla se tutti i campi sono validi
      let isValid = true;
      formInputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      // Controlla i checkbox privacy
      const privacyCheckbox = document.getElementById('privacy-consent');
      if (privacyCheckbox && !privacyCheckbox.checked) {
        const checkboxContainer = privacyCheckbox.closest('.form-checkbox');
        checkboxContainer.classList.add('error');
        isValid = false;
      }
      
      // Se tutto è valido, simula l'invio
      if (isValid) {
        // Disabilita il pulsante di invio e mostra il caricamento
        const submitBtn = contactForm.querySelector('.submit-button');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Invio in corso...';
        
        // Simula una richiesta API (da sostituire con il tuo vero endpoint)
        setTimeout(() => {
          // Rimuovi eventuali messaggi esistenti
          const existingMessage = contactForm.querySelector('.form-message');
          if (existingMessage) {
            existingMessage.remove();
          }
          
          // Crea il messaggio di successo
          const successMessage = document.createElement('div');
          successMessage.className = 'form-message success';
          successMessage.innerHTML = 'Grazie! Il tuo messaggio è stato inviato con successo.';
          
          // Inserisci il messaggio all'inizio del form
          contactForm.insertBefore(successMessage, contactForm.firstChild);
          
          // Ripristina il pulsante
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          // Resetta il form
          contactForm.reset();
          
          // Nascondi il messaggio dopo 6 secondi
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
              successMessage.remove();
            }, 300);
          }, 6000);
        }, 1500);
      }
    });
  }
  
  // Checkbox di privacy con animazioni
  const privacyCheckboxes = document.querySelectorAll('.form-checkbox input[type="checkbox"]');
  privacyCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const container = this.closest('.form-checkbox');
      if (this.checked) {
        container.classList.remove('error');
      }
    });
  });
  
  // Funzione di validazione dei campi
  function validateField(input) {
    const formGroup = input.closest('.form-group');
    let isValid = true;
    
    // Rimuovi eventuali messaggi di errore precedenti
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Valida in base al tipo di campo
    if (input.required && input.value.trim() === '') {
      addErrorMessage(formGroup, 'Questo campo è obbligatorio');
      isValid = false;
    } else if (input.type === 'email' && input.value.trim() !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value)) {
        addErrorMessage(formGroup, 'Inserisci un indirizzo email valido');
        isValid = false;
      }
    }
    
    // Aggiorna le classi CSS
    formGroup.classList.toggle('error', !isValid);
    return isValid;
  }
  
  // Funzione per aggiungere i messaggi di errore
  function addErrorMessage(formGroup, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
  }
  
  // Animazione 3D hover per il form (solo desktop)
  const formContainer = document.querySelector('.contact-form-container');
  if (formContainer && !('ontouchstart' in window)) {
    formContainer.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      this.style.transform = `
        perspective(1000px) 
        rotateY(${x * 5}deg) 
        rotateX(${-y * 5}deg)
        translateY(-5px)
      `;
    });
    
    formContainer.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  }
  
  // Funzione per gestire il modal della privacy policy
  function setupPrivacyModal() {
    const privacyLink = document.querySelector('a[data-modal="privacy-modal"]');
    const privacyModal = document.getElementById('privacy-modal');
    
    if (privacyLink && privacyModal) {
      // Apri il modal quando si clicca sul link
      privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Aggiungi la classe active al modal
        privacyModal.classList.add('active');
        
        // Blocca lo scroll del body
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden'; // anche per html
        
        // Imposta il focus sul modal per l'accessibilità
        privacyModal.setAttribute('aria-hidden', 'false');
        privacyModal.focus();
        
        // Nasconde gli elementi di screen reader
        document.querySelectorAll('body > *:not(#privacy-modal)').forEach(element => {
          if (element !== privacyModal) {
            element.setAttribute('aria-hidden', 'true');
            if (element.classList.contains('navbar-container')) {
              element.style.display = 'none';
            }
          }
        });
      });
      
      // Chiudi il modal quando si clicca sul pulsante di chiusura
      const closeButton = privacyModal.querySelector('.fullscreen-modal-close');
      if (closeButton) {
        closeButton.addEventListener('click', function() {
          closeModal();
        });
      }
      
      // Chiudi il modal quando si clicca sull'overlay
      const overlay = privacyModal.querySelector('.fullscreen-modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', function() {
          closeModal();
        });
      }
      
      // Chiudi il modal con il tasto ESC
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && privacyModal.classList.contains('active')) {
          closeModal();
        }
      });
      
      // Funzione per chiudere il modal e ripristinare lo stato normale
      function closeModal() {
        // Rimuovi la classe active
        privacyModal.classList.remove('active');
        
        // Sblocca lo scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Ripristina l'accessibilità
        privacyModal.setAttribute('aria-hidden', 'true');
        
        // Ripristina gli elementi per screen reader
        document.querySelectorAll('body > *:not(#privacy-modal)').forEach(element => {
          element.removeAttribute('aria-hidden');
          if (element.classList.contains('navbar-container')) {
            element.style.display = '';
          }
        });
      }
    }
  }
});
