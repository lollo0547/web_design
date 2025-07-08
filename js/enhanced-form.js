/**
 * PORTFOLIO DI LORENZO GIUDICI - ENHANCED FORM
 * Gestione avanzata per form contatti con placeholder attivi, validazione real-time e feedback invio
 */

class EnhancedContactForm {
  constructor(formId = 'contact-form') {
    this.form = document.getElementById(formId);
    if (!this.form) return;
    
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.fields = this.form.querySelectorAll('.form-field');
    this.isSubmitting = false;
    this.lang = 'it';
    
    this.validationStates = {
      nome: false,
      email: false,
      messaggio: false,
      consenso: false
    };
    
    this.successFeedback = {
      it: 'Messaggio inviato con successo! Ti risponderò al più presto.',
      en: 'Message sent successfully! I will reply to you as soon as possible.'
    };
    
    this.errorFeedback = {
      it: 'Si è verificato un errore nell\'invio del messaggio. Riprova più tardi.',
      en: 'There was an error sending the message. Please try again later.'
    };
    
    this.init();
  }
  
  init() {
    // Inizializza i placeholder attivi
    this.setupActivePlaceholders();
    
    // Inizializza validazione real-time
    this.setupRealTimeValidation();
    
    // Gestione del submit del form
    this.setupFormSubmission();
    
    // Monitoraggio cambio lingua
    this.monitorLanguageChange();
    
    // Aggiunge animazioni al form
    this.addFormAnimations();
  }
  
  getCurrentLang() {
    return document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
  }
  
  setupActivePlaceholders() {
    this.fields.forEach(field => {
      const input = field.querySelector('input, textarea');
      if (!input) return;
      
      const label = field.querySelector('label');
      if (!label) return;
      
      // Se l'input ha valore, aggiungi la classe active
      if (input.value) {
        label.classList.add('active');
      }
      
      // Eventi per gestire lo stato attivo
      input.addEventListener('focus', () => {
        label.classList.add('active');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          label.classList.remove('active');
        }
      });
    });
  }
  
  setupRealTimeValidation() {
    this.fields.forEach(field => {
      const input = field.querySelector('input, textarea');
      if (!input) return;
      
      const fieldName = input.id;
      const helpText = field.querySelector('.field-help');
      
      // Aggiungi l'indicatore di validità
      const validIndicator = document.createElement('span');
      validIndicator.className = 'validation-indicator';
      validIndicator.setAttribute('aria-hidden', 'true');
      field.appendChild(validIndicator);
      
      // Funzione per validare il campo
      const validateField = () => {
        const isValid = this.validateInput(input);
        
        // Aggiorna lo stato di validazione
        field.classList.toggle('valid', isValid);
        field.classList.toggle('invalid', !isValid && input.value !== '');
        
        // Aggiorna l'indicatore
        validIndicator.innerHTML = isValid && input.value !== '' ? 
          '<svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M6 12.2L2.6 8.8l1.4-1.4L6 9.4l6-6 1.4 1.4z"/></svg>' : 
          '';
        
        // Aggiorna lo stato globale di validazione
        if (fieldName in this.validationStates) {
          this.validationStates[fieldName] = isValid;
        }
        
        // Aggiorna lo stato del pulsante di invio
        this.updateSubmitButtonState();
        
        return isValid;
      };
      
      // Eventi per la validazione real-time
      if (input.type === 'checkbox') {
        input.addEventListener('change', validateField);
      } else {
        // Debounce per ottimizzare la validazione durante la digitazione
        let debounceTimeout;
        input.addEventListener('input', () => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(validateField, 300);
        });
        
        input.addEventListener('blur', validateField);
      }
    });
  }
  
  validateInput(input) {
    const type = input.id;
    const value = input.type === 'checkbox' ? input.checked : input.value.trim();
    
    switch (type) {
      case 'nome':
        return value.length > 0;
      case 'email':
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(value);
      case 'messaggio':
        return value.length >= 10;
      case 'consenso':
        return value === true;
      default:
        return true;
    }
  }
  
  updateSubmitButtonState() {
    const isFormValid = Object.values(this.validationStates).every(state => state === true);
    
    if (isFormValid) {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.add('enabled');
    } else {
      this.submitButton.setAttribute('disabled', true);
      this.submitButton.classList.remove('enabled');
    }
  }
  
  setupFormSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      
      // Aggiorna UI durante invio
      this.submitButton.classList.add('loading');
      const originalText = this.submitButton.textContent;
      this.submitButton.innerHTML = `
        <span class="spinner"></span>
        <span class="lang-it">Invio in corso...</span>
        <span class="lang-en" style="display:none;">Sending...</span>
      `;
      
      try {
        // Simula invio del form (in produzione, usare fetch per API reale)
        await this.simulateFormSubmission();
        
        // Mostra feedback successo
        this.showFeedback(true);
        this.form.reset();
        
        // Ripristina stati UI
        this.resetFormState();
      } catch (error) {
        console.error('Errore invio form:', error);
        
        // Mostra feedback errore
        this.showFeedback(false);
      } finally {
        this.submitButton.classList.remove('loading');
        this.submitButton.textContent = originalText;
        this.isSubmitting = false;
      }
    });
  }
  
  // Simula un'invio del form (demo)
  simulateFormSubmission() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }
  
  showFeedback(isSuccess) {
    const feedbackElement = document.createElement('div');
    feedbackElement.className = `form-feedback ${isSuccess ? 'success' : 'error'}`;
    
    const message = isSuccess ? 
      this.successFeedback[this.getCurrentLang()] : 
      this.errorFeedback[this.getCurrentLang()];
    
    feedbackElement.textContent = message;
    
    // Aggiungi il messaggio dopo il form
    this.form.parentNode.insertBefore(feedbackElement, this.form.nextSibling);
    
    // Animazione di entrata
    setTimeout(() => {
      feedbackElement.classList.add('show');
    }, 10);
    
    // Rimuovi il messaggio dopo un po'
    if (isSuccess) {
      setTimeout(() => {
        feedbackElement.classList.remove('show');
        setTimeout(() => {
          feedbackElement.remove();
        }, 300);
      }, 5000);
    } else {
      // Per messaggi di errore, aggiungi un pulsante per chiudere
      const closeButton = document.createElement('button');
      closeButton.className = 'close-feedback';
      closeButton.setAttribute('aria-label', 'Chiudi messaggio');
      closeButton.innerHTML = '×';
      closeButton.addEventListener('click', () => {
        feedbackElement.classList.remove('show');
        setTimeout(() => {
          feedbackElement.remove();
        }, 300);
      });
      feedbackElement.appendChild(closeButton);
    }
  }
  
  resetFormState() {
    // Reset delle classi sui campi
    this.fields.forEach(field => {
      const input = field.querySelector('input, textarea');
      const label = field.querySelector('label');
      
      if (input && label) {
        field.classList.remove('valid', 'invalid');
        label.classList.remove('active');
      }
    });
    
    // Reset degli stati di validazione
    for (const key in this.validationStates) {
      this.validationStates[key] = false;
    }
    
    // Aggiorna lo stato del pulsante
    this.updateSubmitButtonState();
  }
  
  monitorLanguageChange() {
    // Monitora il cambio della lingua
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.lang = btn.getAttribute('data-lang') || 'it';
      });
    });
  }
  
  addFormAnimations() {
    // Aggiungi animazioni agli elementi del form
    const animElements = this.form.querySelectorAll('.form-field, button');
    animElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
      el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Funzione per controllare se il form è visibile
    const checkFormVisibility = () => {
      const rect = this.form.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        animElements.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        window.removeEventListener('scroll', checkFormVisibility);
      }
    };
    
    // Controlla la visibilità iniziale e poi durante lo scroll
    checkFormVisibility();
    window.addEventListener('scroll', checkFormVisibility);
  }
}

// Inizializza il form avanzato quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
  new EnhancedContactForm();
});
