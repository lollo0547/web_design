// FORM VALIDATION
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  // Cache di elementi DOM per migliorare performance
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const messaggioInput = document.getElementById('messaggio');
  const consensoInput = document.getElementById('consenso');
  
  // Cache per error messages
  const nomeError = document.getElementById('nome-help');
  const emailError = document.getElementById('email-help');
  const messaggioError = document.getElementById('messaggio-help');
  const consensoError = document.getElementById('consenso-help');
  const successMessage = document.getElementById('form-success-message');
  
  // Regex per validazione email più robusta (supporta i nuovi TLD e caratteri internazionali)
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Messaggi di errore in italiano e inglese
  const errorMessages = {
    required: {
      it: 'Questo campo è obbligatorio',
      en: 'This field is required'
    },
    email: {
      it: 'Inserisci un indirizzo email valido',
      en: 'Enter a valid email address'
    },
    consent: {
      it: 'Devi accettare i termini per proseguire',
      en: 'You must accept the terms to proceed'
    },
    minLength: {
      it: (min) => `Inserisci almeno ${min} caratteri`,
      en: (min) => `Enter at least ${min} characters`
    }
  };
  
  // Ottieni la lingua corrente
  function getCurrentLang() {
    return document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
  }
  
  // Funzione di validazione campo
  function validateField(input, errorEl, validations) {
    const value = input.value.trim();
    const lang = getCurrentLang();
    let isValid = true;
    let errorMessage = '';
    
    // Rimuove classi di errore/successo
    input.classList.remove('error', 'valid');
    
    // Controlla validazioni
    if (validations.required && value === '') {
      isValid = false;
      errorMessage = errorMessages.required[lang];
    } else if (validations.email && !emailRegex.test(value)) {
      isValid = false;
      errorMessage = errorMessages.email[lang];
    } else if (validations.minLength && value.length < validations.minLength) {
      isValid = false;
      errorMessage = errorMessages.minLength[lang](validations.minLength);
    } else if (validations.consent && !input.checked) {
      isValid = false;
      errorMessage = errorMessages.consent[lang];
    }
    
    // Aggiorna UI in base al risultato
    if (!isValid) {
      input.classList.add('error');
      errorEl.textContent = errorMessage;
    } else {
      input.classList.add('valid');
      errorEl.textContent = '';
    }
    
    return isValid;
  }
  
  // Validazione nome
  function validateNome() {
    return validateField(nomeInput, nomeError, { required: true });
  }
  
  // Validazione email
  function validateEmail() {
    return validateField(emailInput, emailError, { required: true, email: true });
  }
  
  // Validazione messaggio
  function validateMessaggio() {
    return validateField(messaggioInput, messaggioError, { required: true, minLength: 10 });
  }
  
  // Validazione consenso
  function validateConsenso() {
    return validateField(consensoInput, consensoError, { consent: true });
  }
  
  // Validazione di tutti i campi
  function validateAll() {
    const isNomeValid = validateNome();
    const isEmailValid = validateEmail();
    const isMessaggioValid = validateMessaggio();
    const isConsensoValid = validateConsenso();
    
    return isNomeValid && isEmailValid && isMessaggioValid && isConsensoValid;
  }
  
  // Event listeners per validazione in tempo reale
  nomeInput.addEventListener('blur', validateNome);
  nomeInput.addEventListener('input', function() {
    if (nomeInput.classList.contains('error')) validateNome();
  });
  
  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('error')) validateEmail();
  });
  
  messaggioInput.addEventListener('blur', validateMessaggio);
  messaggioInput.addEventListener('input', function() {
    if (messaggioInput.classList.contains('error')) validateMessaggio();
  });
  
  consensoInput.addEventListener('change', validateConsenso);
  
  // Event listener per validazione all'invio
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Nascondi eventuali messaggi di successo precedenti
    successMessage.style.display = 'none';
    
    // Validazione completa
    if (validateAll()) {
      // Qui andrà l'invio del form (AJAX o altro)
      // Per ora simuliamo l'invio con un timeout
      contactForm.classList.add('submitting');
      
      setTimeout(() => {
        // Resetta il form
        contactForm.reset();
        
        // Rimuovi classi di validazione
        nomeInput.classList.remove('valid');
        emailInput.classList.remove('valid');
        messaggioInput.classList.remove('valid');
        consensoInput.classList.remove('valid');
        
        // Mostra messaggio di successo
        successMessage.style.display = 'block';
        
        // Rimuovi classe submitting
        contactForm.classList.remove('submitting');
        
        // Focus su messaggio di successo per screen reader
        successMessage.focus();
      }, 1000);
    } else {
      // Focus sul primo campo con errore
      if (!nomeInput.classList.contains('valid')) {
        nomeInput.focus();
      } else if (!emailInput.classList.contains('valid')) {
        emailInput.focus();
      } else if (!messaggioInput.classList.contains('valid')) {
        messaggioInput.focus();
      } else if (!consensoInput.classList.contains('valid')) {
        consensoInput.focus();
      }
    }
  });
  
  // Aggiunta listener per cambi di lingua
  document.addEventListener('languageChanged', function() {
    // Ri-valida i campi con la nuova lingua se hanno già errori
    if (nomeInput.classList.contains('error')) validateNome();
    if (emailInput.classList.contains('error')) validateEmail();
    if (messaggioInput.classList.contains('error')) validateMessaggio();
    if (consensoInput.classList.contains('error')) validateConsenso();
  });
});

// FEATURE DETECTION E UTILITY PER INTERSECTION OBSERVER
const IOSupport = {
  // Verifica supporto IntersectionObserver
  isSupported: 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window,
  
  // Utility per creare observer con fallback automatico
  create: function(callback, options = {}) {
    if (this.isSupported) {
      return new IntersectionObserver(callback, options);
    }
    return null;
  },
  
  // Log di supporto per debug
  logSupport: function() {
    if (this.isSupported) {
      console.log('✅ IntersectionObserver supportato');
    } else {
      console.warn('⚠️ IntersectionObserver non supportato, uso fallback');
    }
  }
};

// Performance utilities
const PerformanceUtils = {
  // Throttle function per scroll listeners
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  },
  
  // Debounce function per resize listeners
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Log supporto feature al caricamento
IOSupport.logSupport();

document.addEventListener("DOMContentLoaded", () => {
  // Modal e dati progetti
  const projects = document.querySelectorAll(".project");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modal-title");
  modal.setAttribute("aria-describedby", "modal-details");
  modal.setAttribute("tabindex", "-1");
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close" aria-label="Chiudi" data-aria-label-en="Close">&times;</button>
      <div class="modal-left">
        <h2 id="modal-title" class="modal-title"></h2>
        <p id="modal-details" class="modal-details"></p>
        <div class="modal-icons" aria-label="Software utilizzati" data-aria-label-en="Software used"></div>
      </div>
      <div class="modal-right">
        <div class="slider" aria-roledescription="carousel" aria-label="Immagini del progetto" data-aria-label-en="Project images">
          <div class="slider-pages">
            <img class="slider-page" src="" alt="Slider Page 1">
            <img class="slider-page" src="" alt="Slider Page 2">
            <img class="slider-page" src="" alt="Slider Page 3">
          </div>
          <div class="slider-overlay"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector(".modal-title");
  const modalDetails = modal.querySelector(".modal-details");
  const modalIcons = modal.querySelector(".modal-icons");
  const sliderPages = modal.querySelectorAll(".slider-page");
  const sliderOverlay = modal.querySelector(".slider-overlay");
  const closeModal = modal.querySelector(".close");

  const projectData = {
    "Set da caffè": {
      enKey: "Coffee set",
      sliderImages: [
        "/immagini/webp/progetto%201/all%2022.webp",
        "/immagini/webp/progetto%201/tazzina_.webp",
        "/immagini/webp/progetto%201/zuccheriera%202_.webp"
      ],
      sliderTitles: [
        "Set da caffè - ambientato",
        "Set da caffè - tazzina",
        "Set da caffè - zuccheriera",
      ],
      details: "Durata: 1 mese<br>Anno: 2022<br>Descrizione:Il progetto propone una reinterpretazione contemporanea del classico set da caffè, composto da tazzina, zuccheriera e piattino. L’approccio progettuale unisce estetica e funzionalità, con particolare attenzione alla coerenza formale e alla scelta dei materiali. Le forme si ispirano all’architettura di Shigeru Ban e Renzo Piano, e al design fluido delle lampade parametriche, generando un linguaggio visivo fatto di trasparenze, volumi armonici e superfici sofisticate.",
      details_en: "Duration: 1 month<br>Year: 2022<br>Description: The project offers a contemporary reinterpretation of the classic coffee set, consisting of cup, sugar bowl and saucer. The design approach combines aesthetics and functionality, with particular attention to formal consistency and material selection. The shapes are inspired by the architecture of Shigeru Ban and Renzo Piano, and by the fluid design of parametric lamps, generating a visual language made of transparencies, harmonious volumes and sophisticated surfaces.",
      icons: [
        "/immagini/webp/loghi/icons8-blender-48.webp",
        "/immagini/webp/loghi/icons8-solidworks-48.webp",
        "/immagini/webp/loghi/icons8-photoshop-48.webp",
        "/immagini/webp/loghi/icons8-illustrator-48.webp"
      ]
    },
    "La cardanica": {
      enKey: "The Cardanica",
      sliderImages: [
        "/immagini/webp/progetto%202/cardanica%20600.webp",
        "/immagini/webp/progetto%202/cardanica%20900.webp",
        "/immagini/webp/progetto%202/cardanica.webp"
      ],
      sliderTitles: [
        "Cardanica - 600",
        "Cardanica - 900",
        "Cardanica - 1200"
      ],
      details: "Durata: 2 mesi<br>Anno: 2023<br>Descrizione: “La Cardanica” è un progetto concettuale ispirato al principio del blocco cardanico (gimbal lock), esplorato attraverso una serie di oggetti-scultura che traducono il movimento meccanico in gesto espressivo. Ispirata dallo Ski Sipping Stabilizer di Unnecessary Inventions, l’idea è stata rielaborata in chiave tecnica e poetica, con richiami a sistemi di illuminazione a binario, dimerabilità e guarnizioni con setole. Il progetto indaga equilibrio, instabilità e relazione tra forma e funzione con un approccio sperimentale e dinamico.",
      details_en: "Duration: 2 months<br>Year: 2023<br>Description: “The Cardanica” is a conceptual project inspired by the principle of gimbal lock, explored through a series of object-sculptures that translate mechanical movement into expressive gesture. Inspired by the Ski Sipping Stabilizer by Unnecessary Inventions, the idea was reworked in a technical and poetic way, with references to track lighting systems, dimmability and bristle seals. The project investigates balance, instability and the relationship between form and function with an experimental and dynamic approach.",
      icons: [
        "/immagini/webp/loghi/icons8-blender-48.webp",
        "/immagini/webp/loghi/icons8-solidworks-48.webp",
        "/immagini/webp/loghi/icons8-photoshop-48.webp",
        "/immagini/webp/loghi/icons8-illustrator-48.webp"
      ]
    },
    "Poltroncina lounge per Milani": {
      enKey: "Lounge chair for Milani",
      sliderImages: [
        "/immagini/webp/progetto%203/untitled555.webp",
        "/immagini/webp/progetto%203/untitled202.webp",
        "/immagini/webp/progetto%203/untitled702.webp"
      ],
      sliderTitles: [
        "Poltroncina lounge per Milani - ambientato",
        "Poltroncina lounge per Milani - particolare 1",
        "Poltroncina lounge per Milani - particolare 2"
      ],
      details: "Durata: 3 mesi<br>Anno: 2024<br>Descrizione: Progetto sviluppato per il brand SM-Milani, specializzato in arredi di design per casa e ufficio. La poltroncina lounge è pensata per unire comfort ed eleganza con una struttura essenziale ma accogliente. Il concept prende ispirazione dal design contemporaneo e minimalista, con particolare attenzione all'equilibrio tra pieni e vuoti e all’ergonomia. La forma accogliente e la scelta dei materiali puntano a creare un oggetto versatile, adatto a spazi professionali e domestici.",
      details_en: "Duration: 3 months<br>Year: 2024<br>Description: Project developed for the SM-Milani brand, specialized in designer furniture for home and office. The lounge chair is designed to combine comfort and elegance with an essential yet welcoming structure. The concept is inspired by contemporary and minimalist design, with particular attention to the balance between solids and voids and ergonomics. The welcoming shape and choice of materials aim to create a versatile object, suitable for professional and domestic spaces.",
      icons: [
        "/immagini/webp/loghi/icons8-blender-48.webp",
        "/immagini/webp/loghi/icons8-photoshop-48.webp",
        "/immagini/webp/loghi/icons8-illustrator-48.webp"
      ]
    },
    "mouse": {
      enKey: "mouse",
      sliderImages: [
        "/immagini/webp/progetto%204/untitled44.webp",
        "/immagini/webp/progetto%204/untitled33.webp",
        "/immagini/webp/progetto%204/untitled.webp"
      ],
      sliderTitles: [
        "mouse - ambientato",
        "mouse - particolare 1",
        "mouse - particolare 2",
      ],
      details: "Durata: 2 mesi<br>Anno: 2023<br>Descrizione: Il progetto nasce dalla volontà di ripensare il mouse come oggetto quotidiano dal forte impatto ergonomico ed estetico. Ispirato a forme morbide e organiche, il design privilegia la funzionalità e la semplicità d’uso, con particolare attenzione all’ergonomia del palmo e al posizionamento dei tasti. Il risultato è un oggetto compatto e bilanciato, in grado di integrarsi visivamente in ambienti professionali o creativi senza rinunciare alla personalità.",
      details_en: "Duration: 2 months<br>Year: 2023<br>Description: The project was born from the desire to rethink the mouse as an everyday object with a strong ergonomic and aesthetic impact. Inspired by soft and organic shapes, the design favors functionality and ease of use, with particular attention to palm ergonomics and button placement. The result is a compact and balanced object, able to visually integrate into professional or creative environments without sacrificing personality.",
      icons: [
        "/immagini/webp/loghi/icons8-blender-48.webp",
        "/immagini/webp/loghi/icons8-illustrator-48.webp"
      ]
    }
  };

  // Helper to get project key by current language and h3 text
  function getProjectKeyByTitle(title) {
    for (const key in projectData) {
      if (title === key) return key;
      if (title === projectData[key].enKey) return key;
    }
    return title;
  }

  let currentSlide = 0;
  let autoplayInterval;
  let isAutoplaying = true;

  function startAutoplay(projectKey, lang) {
    stopAutoplay();
    const data = projectData[projectKey];
    autoplayInterval = setInterval(() => {
      sliderPages[currentSlide].style.display = "none";
      currentSlide = (currentSlide + 1) % sliderPages.length;
      sliderPages[currentSlide].style.display = "block";
      if (data && data.sliderTitles) {
        if (lang === 'en' && data.sliderTitles_en) {
          modalTitle.textContent = data.sliderTitles_en[currentSlide];
        } else {
          modalTitle.textContent = data.sliderTitles[currentSlide];
        }
      }
    }, 2500);
    isAutoplaying = true;
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    isAutoplaying = false;
  }

  function showOverlayIcon(icon) {
    sliderOverlay.textContent = icon;
    sliderOverlay.style.opacity = "1";
    setTimeout(() => {
      sliderOverlay.style.opacity = "0";
    }, 500);
  }

  projects.forEach((project) => {
    // Make each project element focusable for keyboard accessibility
    if (!project.hasAttribute('tabindex')) {
      project.setAttribute('tabindex', '0');
    }
    
    // Add ARIA attributes to indicate it's clickable and opens a dialog
    project.setAttribute('aria-haspopup', 'dialog');
    
    function openProjectModal() {
      // Get visible title in the active language
      const lang = document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
      const h3 = project.querySelector("h3");
      let projectTitle = h3.querySelector('.lang-it')?.textContent.trim();
      if (lang === 'en') {
        projectTitle = h3.querySelector('.lang-en')?.textContent.trim();
      }
      const key = getProjectKeyByTitle(projectTitle);
      const data = projectData[key];
      
      if (data) {
        // Set modal title
        if (data.sliderTitles) {
          modalTitle.textContent = lang === 'en'
            ? (data.sliderTitles_en ? data.sliderTitles_en[0] : data.sliderTitles[0])
            : data.sliderTitles[0];
        } else {
          modalTitle.textContent = projectTitle;
        }
        
        // Set details with proper HTML
        modalDetails.innerHTML = lang === 'en' && data.details_en ? data.details_en : data.details;
        
        // Set software icons with improved alt text
        modalIcons.innerHTML = data.icons
          .map((icon, index) => {
            // Extract software name from the path
            const softwareName = icon.split('/').pop().split('-')[1]?.split('.')[0] || `Software ${index + 1}`;
            return `<img src="${icon}" alt="${softwareName}" title="${softwareName}">`;
          })
          .join("");
          
        // Set up slider images
        if (data.sliderImages) {
          sliderPages.forEach((page, index) => {
            if (data.sliderImages[index]) {
              page.src = data.sliderImages[index];
              // Set better alt text for each slide
              const altText = data.sliderTitles ? data.sliderTitles[index] : `${projectTitle} - Image ${index + 1}`;
              page.alt = altText;
              page.style.display = index === 0 ? "block" : "none";
            } else {
              page.style.display = "none";
            }
          });
          currentSlide = 0;
          modal.querySelector(".slider").style.display = "block";
          startAutoplay(key, lang);
        } else {
          modal.querySelector(".slider").style.display = "none";
        }
        
        // Store the element that had focus before opening the modal
        lastFocusedElement = document.activeElement;
        
        // Announce to screen readers that the dialog is open
        const announcer = document.getElementById('modal-open-announcer') || 
                        (() => {
                          const el = document.createElement('div');
                          el.id = 'modal-open-announcer';
                          el.setAttribute('aria-live', 'polite');
                          el.className = 'sr-only';
                          document.body.appendChild(el);
                          return el;
                        })();
        announcer.textContent = lang === 'en' ? `Project details dialog opened: ${projectTitle}` : `Finestra di dialogo dettagli progetto aperta: ${projectTitle}`;
        
        // Save last focused element
        lastFocusedElement = document.activeElement;
        
        // Set aria-hidden on main content for better screen reader experience
        document.querySelectorAll('main, header:not(.modal), footer').forEach(el => {
          el.setAttribute('aria-hidden', 'true');
          if ('inert' in HTMLElement.prototype) {
            el.setAttribute('inert', '');
          }
        });
        
        // Show the modal with animation
        modal.classList.add('open');
        document.body.style.overflow = "hidden";
        
        // Move focus into the modal for accessibility
        setTimeout(() => {
          closeModal.focus();
          // Setup focus trap
          setupFocusTrap();
        }, 50);
      }
    }
    
    // Open modal on click
    project.addEventListener("click", openProjectModal);
    // Improved keyboard accessibility: open modal with Enter/Space
    project.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProjectModal();
      }
    });
    
    // Add appropriate ARIA labels based on the current language
    function updateProjectAriaLabel() {
      const lang = document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
      const h3 = project.querySelector("h3");
      const projectTitle = lang === 'en' 
        ? h3.querySelector('.lang-en')?.textContent.trim() 
        : h3.querySelector('.lang-it')?.textContent.trim();
      
      project.setAttribute('aria-label', 
        lang === 'en' 
          ? `View project details for ${projectTitle}`
          : `Visualizza dettagli progetto ${projectTitle}`
      );
    }
    
    // Set initial ARIA label
    updateProjectAriaLabel();
    
    // Update ARIA label when language changes
    document.addEventListener('languageChanged', updateProjectAriaLabel);
  });

  // Improved focus trap inside modal
  modal.addEventListener("keydown", (e) => {
    if (!modal.classList.contains('open')) return;
    
    // Get all focusable elements in the modal
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const focusableArr = Array.from(focusable);
    const first = focusableArr[0];
    const last = focusableArr[focusableArr.length - 1];
    
    // Handle tab key navigation
    if (e.key === "Tab") {
      // If shift+tab and on first element, go to last element
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      // If tab and on last element, loop back to first element
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    
    // ESC key closes the modal
    if (e.key === "Escape") {
      closeModal.click();
    }
  });

  // Create a function to handle modal closing
  // Keep track of last focused element before modal opened
  let lastFocusedElement = null;
  
  // Set up focus trap to keep focus inside modal
  function setupFocusTrap() {
    const focusableElements = modal.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;
      
      // If Shift+Tab and focus is on first element, move to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // If Tab and focus is on last element, move to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });
  }
  
  function closeModalHandler() {
    modal.classList.remove('open');
    document.body.style.overflow = "";
    stopAutoplay();
    
    // Remove aria-hidden from main content
    document.querySelectorAll('main, header:not(.modal), footer').forEach(el => {
      el.removeAttribute('aria-hidden');
      el.removeAttribute('inert');
    });
    
    // Return focus to the element that opened the modal
    if (lastFocusedElement) {
      setTimeout(() => {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }, 100);
    }
    
    // Announce to screen readers that the modal is closed
    const announcer = document.getElementById('modal-close-announcer') || 
                    (() => {
                      const el = document.createElement('div');
                      el.id = 'modal-close-announcer';
                      el.setAttribute('aria-live', 'polite');
                      el.className = 'sr-only';
                      document.body.appendChild(el);
                      return el;
                    })();
    
    // Update the announcer with the appropriate language
    const lang = document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
    announcer.textContent = lang === 'en' ? 'Dialog closed' : 'Finestra di dialogo chiusa';
    
    // Return focus to the element that had focus before the modal was opened
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  closeModal.addEventListener("click", () => {
    closeModalHandler();
  });
  
  closeModal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeModalHandler();
    }
  });

  // Close when clicking outside the modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalHandler();
    }
  });
  
  // Close with ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains('open')) {
      closeModalHandler();
    }
  });

  // Slider: accessibilità per click/tastiera
  const slides = document.querySelectorAll(".project-slideshow .slide");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");
  let slideshowCurrentSlide = 0;

  prevButton.setAttribute("tabindex", "0");
  nextButton.setAttribute("tabindex", "0");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  prevButton.addEventListener("click", () => {
    slideshowCurrentSlide = (slideshowCurrentSlide - 1 + slides.length) % slides.length;
    showSlide(slideshowCurrentSlide);
  });
  nextButton.addEventListener("click", () => {
    slideshowCurrentSlide = (slideshowCurrentSlide + 1) % slides.length;
    showSlide(slideshowCurrentSlide);
  });

  prevButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      prevButton.click();
    }
  });
  nextButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      nextButton.click();
    }
  });

  // Mostra la slide iniziale all'avvio
  showSlide(slideshowCurrentSlide);

  // FAQ: accessibilità tastiera
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Timeline dropdown: accessibilità tastiera
  document.querySelectorAll('#timeline-filter-dropdown .timeline-filter-option, #close-timeline-btn').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Timeline toggle button: accessibilità tastiera
  const timelineToggleBtn = document.getElementById('toggle-timeline-btn');
  if (timelineToggleBtn) {
    timelineToggleBtn.setAttribute('tabindex', '0');
    timelineToggleBtn.addEventListener('keydown', function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        timelineToggleBtn.click();
      }
    });
  }

  // REVEAL ON SCROLL MIGLIORATO CON INTERSECTION OBSERVER + FALLBACK
  const revealSections = document.querySelectorAll('main > section, #timeline-container, #faq');
  
  // Funzione fallback per browser senza IntersectionObserver
  function revealOnScrollFallback() {
    revealSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        section.classList.add('visible');
      }
    });
  }

  // Inizializza reveal animations
  function initRevealAnimations() {
    revealSections.forEach(section => {
      section.classList.add('reveal-on-scroll');
    });

    // Verifica supporto IntersectionObserver
    if (IOSupport.isSupported) {
      // Usa IntersectionObserver per performance migliori
      const revealObserver = IOSupport.create((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Smetti di osservare l'elemento una volta rivelato
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger 100px prima che entri nel viewport
        threshold: 0.1
      });

      // Registra observer per monitoring
      IOMonitor.register(revealObserver, 'reveal-animations');

      revealSections.forEach(section => {
        revealObserver.observe(section);
      });

      // Trigger iniziale per elementi già visibili
      revealOnScrollFallback();
    } else {
      // Fallback per browser più vecchi
      console.warn('IntersectionObserver non supportato, uso fallback scroll listener');
      const throttledReveal = PerformanceUtils.throttle(revealOnScrollFallback, 100);
      window.addEventListener('scroll', throttledReveal, { passive: true });
      window.addEventListener('DOMContentLoaded', revealOnScrollFallback);
      revealOnScrollFallback();
    }
  }

  initRevealAnimations();

  // Pulsante "Torna su": aggiungi classe show per animazione
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.style.display = 'none';
      backToTopBtn.classList.remove('show');
    }
  });
  // Rendi funzionante il click sul bottone "Torna su"
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Timeline toggle + filtro (comportamento dropdown migliorato)
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('toggle-timeline-btn');
  const timelineContainer = document.getElementById('timeline-container');
  const filterDropdown = document.getElementById('timeline-filter-dropdown');
  const filterOptions = filterDropdown ? filterDropdown.querySelectorAll('.timeline-filter-option') : [];
  const selectedLabel = document.getElementById('timeline-selected-label');
  const timelineBlocks = document.querySelectorAll('.timeline-block');
  const closeTimelineBtn = document.getElementById('close-timeline-btn');
  let isDropdownOpen = false;

  // Funzione per ottenere il tipo di blocco timeline
  function getBlockType(block) {
    // Usa l'attributo data-type invece dell'immagine per maggiore affidabilità
    return block.dataset.type || '';
  }

  // Funzione per mostrare/nascondere la timeline
  function showTimeline(show) {
    timelineContainer.style.display = show ? 'block' : 'none';
    btn.setAttribute('aria-expanded', isDropdownOpen ? 'true' : 'false');
    
    // Gestione del dropdown
    if (show && isDropdownOpen) {
      positionDropdown();
      filterDropdown.style.display = 'block';
    } else {
      filterDropdown.style.display = 'none';
    }
  }

  // Funzione per posizionare il dropdown correttamente
  function positionDropdown() {
    // Reset delle proprietà di posizionamento
    filterDropdown.style.left = '0';
    filterDropdown.style.right = 'auto';
    
    // Su mobile occupa tutta la larghezza
    if (window.innerWidth < 768) {
      filterDropdown.style.width = '100%';
      return;
    }
    
    // Su desktop posiziona il dropdown in base allo spazio disponibile
    setTimeout(() => {
      const btnRect = btn.getBoundingClientRect();
      const dropdownRect = filterDropdown.getBoundingClientRect();
      
      // Se il dropdown esce dallo schermo a destra
      if (btnRect.left + dropdownRect.width > window.innerWidth) {
        filterDropdown.style.left = 'auto';
        filterDropdown.style.right = '0';
      }
      
      // Assicura che il dropdown sia sopra altri elementi
      filterDropdown.style.zIndex = '25';
    }, 0);
  }

  // Funzione per applicare il filtro alla timeline
  function applyTimelineFilter(value) {
    timelineBlocks.forEach(block => {
      const type = getBlockType(block);
      block.style.display = (type === value || value === 'All') ? 'flex' : 'none';
    });
    
    // Aggiorna l'etichetta del filtro selezionato
    if (selectedLabel) {
      const selectedOption = document.querySelector(`.timeline-filter-option[data-value="${value}"]`);
      if (selectedOption) {
        // Clona il contenuto dell'opzione per l'etichetta
        selectedLabel.innerHTML = '';
        
        // Copia sia la versione italiana che inglese
        const itText = selectedOption.querySelector('.lang-it');
        const enText = selectedOption.querySelector('.lang-en');
        
        if (itText) selectedLabel.appendChild(itText.cloneNode(true));
        if (enText) selectedLabel.appendChild(enText.cloneNode(true));
      }
    }
    
    // Aggiorna lo stato visivo e ARIA delle opzioni
    filterOptions.forEach(opt => {
      const isSelected = opt.dataset.value === value;
      opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      opt.classList.toggle('selected', isSelected);
    });
    
    // Mostra il container della timeline
    timelineContainer.style.display = 'block';
  }

  if (btn && timelineContainer && filterDropdown) {
    // Stato iniziale
    isDropdownOpen = false;
    showTimeline(false);
    applyTimelineFilter('Certificazioni');
    filterDropdown.style.display = 'none';

    // Gestione click sul bottone principale
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Se la timeline è chiusa, apri timeline e dropdown
      if (timelineContainer.style.display === 'none' || timelineContainer.style.display === '') {
        isDropdownOpen = true;
        showTimeline(true);
      } else {
        // Se la timeline è aperta, alterna la visibilità del dropdown
        isDropdownOpen = !isDropdownOpen;
        showTimeline(true);
      }
    });

    // Gestione click sulle opzioni di filtro
    filterOptions.forEach(opt => {
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        applyTimelineFilter(this.dataset.value);
        
        // Chiudi il dropdown dopo la selezione
        setTimeout(() => {
          isDropdownOpen = false;
          showTimeline(true); // Mantiene la timeline visibile ma nasconde il dropdown
        }, 150);
      });
    });

    // Bottone "Nascondi percorso studi"
    if (closeTimelineBtn) {
      closeTimelineBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isDropdownOpen = false;
        timelineContainer.style.display = 'none';
        filterDropdown.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
      });
    }
    
    // Chiudi dropdown al click fuori
    document.addEventListener('click', function(e) {
      if (isDropdownOpen && !filterDropdown.contains(e.target) && e.target !== btn) {
        isDropdownOpen = false;
        showTimeline(true); // Mantiene la timeline visibile ma nasconde il dropdown
      }
    });
    
    // Gestione del resize per riposizionare correttamente il dropdown
    window.addEventListener('resize', function() {
      if (isDropdownOpen) {
        positionDropdown();
      }
    });
  }
});

// FAQ accordion - improved for accessibility
document.addEventListener('DOMContentLoaded', function () {
  // Add ARIA role for accordion structure
  const faqList = document.querySelector('.faq-list');
  if (faqList) {
    faqList.setAttribute('role', 'region');
  }
  
  document.querySelectorAll('.faq-question').forEach(btn => {
    // Function to toggle FAQ items
    function toggleFaq() {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(btn.getAttribute('aria-controls'));
      
      // Close all answers
      document.querySelectorAll('.faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
      });
      
      document.querySelectorAll('.faq-answer').forEach(a => {
        a.style.display = 'none';
        a.classList.remove('open');
      });
      
      // If wasn't expanded before, expand it
      if (!expanded && answer) {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.display = 'block';
        answer.classList.add('open');
        
        // Announce to screen readers
        const lang = document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
        const announcer = document.getElementById('faq-announcer') || 
                        (() => {
                          const el = document.createElement('div');
                          el.id = 'faq-announcer';
                          el.setAttribute('aria-live', 'polite');
                          el.className = 'sr-only';
                          document.body.appendChild(el);
                          return el;
                        })();
        announcer.textContent = lang === 'en' ? 'FAQ answer expanded' : 'Risposta FAQ espansa';
      }
    }
    
    // Click handler
    btn.addEventListener('click', toggleFaq);
    
    // Keyboard handler for better accessibility
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq();
      }
      
      // Up/Down arrows for navigation between FAQ questions
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const questions = Array.from(document.querySelectorAll('.faq-question'));
        const currentIndex = questions.indexOf(this);
        let nextIndex;
        
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % questions.length;
        } else {
          nextIndex = (currentIndex - 1 + questions.length) % questions.length;
        }
        
        questions[nextIndex].focus();
      }
    });
  });
});

// Language switcher
document.addEventListener('DOMContentLoaded', function () {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      // Aggiorna stato attivo
      langBtns.forEach(b => b.setAttribute('aria-current', b === this ? 'true' : 'false'));
      // Mostra/nasconde testi
      document.querySelectorAll('.lang-it').forEach(el => {
        el.style.display = lang === 'it' ? '' : 'none';
      });
      document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? '' : 'none';
      });

      // Aggiorna label timeline filter
      const timelineSelectedLabel = document.getElementById('timeline-selected-label');
      if (timelineSelectedLabel) {
        timelineSelectedLabel.querySelectorAll('.lang-it').forEach(el => el.style.display = lang === 'it' ? '' : 'none');
        timelineSelectedLabel.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
      }
      // Aggiorna dropdown timeline filter
      document.querySelectorAll('#timeline-filter-dropdown .timeline-filter-option').forEach(opt => {
        opt.querySelectorAll('.lang-it').forEach(el => el.style.display = lang === 'it' ? '' : 'none');
        opt.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
      });
      // Aggiorna bottone chiudi timeline
      const closeTimelineBtn = document.getElementById('close-timeline-btn');
      if (closeTimelineBtn) {
        closeTimelineBtn.querySelectorAll('.lang-it').forEach(el => el.style.display = lang === 'it' ? '' : 'none');
        closeTimelineBtn.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
      }
      
      // Emit custom event per aggiornare altri componenti
      document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: lang }
      }));
    });
  });
});

// Aggiorna aria-label dei bottoni slider e burger menu in base alla lingua
document.addEventListener('DOMContentLoaded', function () {
  const langBtns = document.querySelectorAll('.lang-btn');
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  const burgerMenu = document.querySelector('.burger-menu');

  function updateAriaLabels(lang) {
    // Slider controls
    if (prevButton) {
      prevButton.setAttribute('aria-label', lang === 'en'
        ? (prevButton.getAttribute('aria-label-en') || 'Previous slide')
        : 'Slide precedente');
    }
    if (nextButton) {
      nextButton.setAttribute('aria-label', lang === 'en'
        ? (nextButton.getAttribute('aria-label-en') || 'Next slide')
        : 'Slide successiva');
    }
    // Burger menu
    if (burgerMenu) {
      burgerMenu.setAttribute('aria-label', lang === 'en'
        ? (burgerMenu.getAttribute('aria-label-en') || 'Open navigation menu')
        : 'Apri il menu di navigazione');
    }
  }

  // Inizializza aria-labels corretti
  const initialLang = document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
  updateAriaLabels(initialLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      // ...existing code...
      updateAriaLabels(lang);
    });
  });
});

// BURGER MENU TOGGLE MIGLIORATO
document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navbar = document.querySelector('.navbar');
  
  if (burgerMenu && navbar) {
    // Inizializza stato corretto del menu
    function initializeMenuState() {
      const isOpen = navbar.classList.contains('open');
      burgerMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      updateMenuLabel(isOpen);
    }

    // Aggiorna l'aria-label del burger menu
    function updateMenuLabel(isOpen) {
      const lang = document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
      const openLabel = lang === 'en' ? 'Open navigation menu' : 'Apri il menu di navigazione';
      const closeLabel = lang === 'en' ? 'Close navigation menu' : 'Chiudi il menu di navigazione';
      
      burgerMenu.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
    }

    // Funzione unificata per chiudere il menu
    function closeMenu() {
      navbar.classList.remove('open');
      burgerMenu.setAttribute('aria-expanded', 'false');
      updateMenuLabel(false);
      
      // Rimuovi attributi di transizione temporanei
      navbar.style.transition = '';
    }

    // Funzione per aprire il menu
    function openMenu() {
      navbar.classList.add('open');
      burgerMenu.setAttribute('aria-expanded', 'true');
      updateMenuLabel(true);
      
      // Focus sul primo link per accessibilità
      const firstLink = navbar.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 150); // Delay per animazione
      }
    }

    // Toggle del menu principale
    burgerMenu.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = navbar.classList.contains('open');
      
      if (isOpen) {
        closeMenu();
        // Ritorna focus al burger button
        burgerMenu.focus();
      } else {
        openMenu();
      }
    });

    // Supporto tastiera per burger menu
    burgerMenu.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        burgerMenu.click();
      }
    });

    // Chiusura automatica al click sui link
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Solo per link interni (anchor)
        if (this.getAttribute('href')?.startsWith('#')) {
          closeMenu();
          // Piccolo delay per permettere lo scroll smooth
          setTimeout(() => {
            burgerMenu.focus();
          }, 300);
        }
      });
    });

    // Navigazione da tastiera nel menu
    navbar.addEventListener('keydown', function(e) {
      if (!navbar.classList.contains('open')) return;
      
      const focusableElements = navbar.querySelectorAll('a, button');
      const focusableArray = Array.from(focusableElements);
      const currentIndex = focusableArray.indexOf(document.activeElement);
      
      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % focusableArray.length;
          focusableArray[nextIndex].focus();
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + focusableArray.length) % focusableArray.length;
          focusableArray[prevIndex].focus();
          break;
          
        case 'Home':
          e.preventDefault();
          focusableArray[0].focus();
          break;
          
        case 'End':
          e.preventDefault();
          focusableArray[focusableArray.length - 1].focus();
          break;
      }
    });

    // Chiusura con ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navbar.classList.contains('open')) {
        e.preventDefault();
        closeMenu();
        burgerMenu.focus();
      }
    });

    // Chiusura al click fuori dal menu
    document.addEventListener('click', function(e) {
      if (navbar.classList.contains('open')) {
        // Controlla se il click è fuori dal menu e burger button
        if (!navbar.contains(e.target) && !burgerMenu.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Gestione cambio orientamento schermo
    window.addEventListener('orientationchange', function() {
      // Piccolo delay per aspettare il resize
      setTimeout(() => {
        if (window.innerWidth >= 768 && navbar.classList.contains('open')) {
          // Su desktop, chiudi il menu mobile
          closeMenu();
        }
      }, 100);
    });

    // Gestione resize della finestra
    const debouncedResize = PerformanceUtils.debounce(function() {
      if (window.innerWidth >= 768 && navbar.classList.contains('open')) {
        closeMenu();
      }
    }, 150);
    
    window.addEventListener('resize', debouncedResize);

    // Aggiorna label quando cambia lingua
    document.addEventListener('languageChanged', function() {
      const isOpen = navbar.classList.contains('open');
      updateMenuLabel(isOpen);
    });

    // Inizializza lo stato del menu
    initializeMenuState();

    // Debug info (solo in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('🍔 Burger Menu: Enhanced implementation loaded');
    }
  }
});

// SMOOTH SCROLL E NAVIGAZIONE INTELLIGENTE
document.addEventListener('DOMContentLoaded', function() {
  // Gestione smooth scroll per link di navigazione
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  const sections = document.querySelectorAll('section, .hero, footer');
  
  // Offset per navbar fissa
  const getScrollOffset = () => {
    const navbar = document.querySelector('.navbar-container');
    return navbar ? navbar.offsetHeight + 20 : 80;
  };

  // Smooth scroll personalizzato per migliore controllo
  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeInOutCubic)
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startY + difference * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    
    requestAnimationFrame(step);
  }

  // Click handler per navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetY = targetElement.offsetTop - getScrollOffset();
        
        // Usa smooth scroll nativo se supportato, altrimenti fallback
        if (CSS.supports('scroll-behavior', 'smooth')) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        } else {
          smoothScrollTo(targetY);
        }

        // Chiudi mobile menu se aperto
        const navbar = document.querySelector('.navbar');
        const burgerMenu = document.querySelector('.burger-menu');
        if (navbar && navbar.classList.contains('open')) {
          navbar.classList.remove('open');
          if (burgerMenu) {
            burgerMenu.setAttribute('aria-expanded', 'false');
          }
        }

        // Update URL senza scroll
        history.replaceState(null, null, targetId);
      }
    });
  });

  // Indicatore di progresso scroll
  function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--accent-gradient);
      z-index: 9999;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    return progressBar;
  }

  const scrollProgress = createScrollProgress();

  // Update scroll progress
  function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  }

  // Throttled scroll handler per performance
  let scrollTimeout;
  function throttledScroll() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        updateScrollProgress();
        scrollTimeout = null;
      }, 10);
    }
  }

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // INTERSECTION OBSERVER MIGLIORATO PER NAVBAR ATTIVA + FALLBACK
  function initSectionHighlighting() {
    // Verifica supporto IntersectionObserver
    if (IOSupport.isSupported) {
      const observerOptions = {
        root: null,
        rootMargin: `-${getScrollOffset()}px 0px -50% 0px`,
        threshold: [0.1, 0.3, 0.7] // Thresholds multipli per maggiore precisione
      };

      const sectionObserver = IOSupport.create((entries) => {
        // Ordina le entries per ratio di intersezione
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries[0];
          const id = mostVisible.target.id;
          
          if (id) {
            // Rimuovi active da tutti i link
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Aggiungi active al link corrispondente
            const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        }
      }, observerOptions);

      // Registra observer per monitoring
      IOMonitor.register(sectionObserver, 'navbar-highlighting');

      // Osserva tutte le sezioni con ID
      sections.forEach(section => {
        if (section.id) {
          sectionObserver.observe(section);
        }
      });

    } else {
      // Fallback per browser senza IntersectionObserver
      console.warn('IntersectionObserver non supportato per navbar highlighting, uso scroll listener');
      
      function updateActiveNavOnScroll() {
        let currentSection = '';
        const scrollPosition = window.scrollY + getScrollOffset() + 100;

        sections.forEach(section => {
          if (section.id && section.offsetTop <= scrollPosition) {
            currentSection = section.id;
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
          }
        });
      }

      // Throttled scroll listener per performance
      const throttledNavScroll = PerformanceUtils.throttle(updateActiveNavOnScroll, 100);
      window.addEventListener('scroll', throttledNavScroll, { passive: true });
      updateActiveNavOnScroll(); // Inizializza
    }
  }

  initSectionHighlighting();
});

// SCROLL TO TOP MIGLIORATO
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    // Mostra/nascondi con animazione fluida
    let isVisible = false;
    
    function toggleBackToTop() {
      const shouldShow = window.scrollY > 400;
      
      if (shouldShow && !isVisible) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.classList.add('show');
        isVisible = true;
      } else if (!shouldShow && isVisible) {
        backToTopBtn.classList.remove('show');
        setTimeout(() => {
          if (!isVisible) backToTopBtn.style.display = 'none';
        }, 300);
        isVisible = false;
      }
    }

    // Throttled scroll per performance
    let ticking = false;
    function updateBackToTop() {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleBackToTop();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    
    // Click handler migliorato
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Smooth scroll to top
      if (CSS.supports('scroll-behavior', 'smooth')) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Fallback con animazione custom
        const startY = window.pageYOffset;
        const startTime = performance.now();
        const duration = 600;

        function animateScroll(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          
          window.scrollTo(0, startY * (1 - easeProgress));
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        }
        
        requestAnimationFrame(animateScroll);
      }
    });

    // Keyboard support
    backToTopBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }
});

// KEYBOARD NAVIGATION E ACCESSIBILITY
document.addEventListener('DOMContentLoaded', function() {
  // Skip to content link per accessibilità
  function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#chi-sono';
    skipLink.textContent = 'Salta al contenuto principale';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent-color);
      color: #fff;
      padding: 8px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  createSkipLink();

  // Arrow key navigation per sections
  document.addEventListener('keydown', function(e) {
    // Alt + Arrow keys per navigazione sezioni
    if (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      
      const sections = Array.from(document.querySelectorAll('section[id], .hero'));
      const currentSection = sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });
      
      if (currentSection) {
        const currentIndex = sections.indexOf(currentSection);
        let targetIndex;
        
        if (e.key === 'ArrowDown') {
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
          targetIndex = Math.max(currentIndex - 1, 0);
        }
        
        const targetSection = sections[targetIndex];
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Focus primo elemento focusable nella sezione
          setTimeout(() => {
            const focusable = targetSection.querySelector('h2, button, a, input, [tabindex="0"]');
            if (focusable) {
              focusable.focus();
            }
          }, 500);
        }
      }
    }
  });

  // Gestione Focus trap migliorata per modal
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });

    // Focus sul primo elemento quando apri la modal
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  // Apply focus trap quando modal è aperta
  const modal = document.querySelector('.modal');
  if (modal) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'style') {
          if (modal.classList.contains('open')) {
            trapFocus(modal);
          }
        }
      });
    });
    
    observer.observe(modal, { attributes: true });
  }
});

// SMOOTH SCROLL ENHANCEMENTS
document.addEventListener('DOMContentLoaded', function() {
  // PRELOAD IMMAGINI MIGLIORATO CON INTERSECTION OBSERVER + FALLBACK
  function preloadVisibleImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if (images.length === 0) return;

    // Verifica supporto IntersectionObserver
    if (IOSupport.isSupported) {
      const imageObserver = IOSupport.create((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Rimuovi lazy loading e forza caricamento
            img.removeAttribute('loading');
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // Gestisci errori di caricamento
            img.addEventListener('error', function() {
              console.warn('Errore caricamento immagine:', img.src);
              img.alt = 'Immagine non disponibile';
              img.style.display = 'none';
            });

            // Aggiungi classe loaded per animazioni CSS
            img.addEventListener('load', function() {
              img.classList.add('loaded');
            });

            observer.unobserve(img);
          }
        });
      }, {
        root: null,
        rootMargin: '100px', // Carica immagini 100px prima che entrino nel viewport
        threshold: 0.1
      });

      // Registra observer per monitoring
      IOMonitor.register(imageObserver, 'image-preloading');

      images.forEach(img => {
        imageObserver.observe(img);
      });

    } else {
      // Fallback per browser senza IntersectionObserver
      console.warn('IntersectionObserver non supportato per image loading, carico tutte le immagini');
      
      images.forEach(img => {
        // Carica immediatamente tutte le immagini
        img.removeAttribute('loading');
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        img.addEventListener('error', function() {
          console.warn('Errore caricamento immagine:', img.src);
          img.alt = 'Immagine non disponibile';
          img.style.display = 'none';
        });

        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });
      });
    }
  }

  preloadVisibleImages();

  // Gestione smooth scroll anche per hash URL iniziali
  function handleInitialHash() {
    const hash = window.location.hash;
    if (hash) {
      // Delay per permettere il rendering completo
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }

  handleInitialHash();
  
  // Handle hashchange
  window.addEventListener('hashchange', handleInitialHash);
});

// Feature detection per CSS fallbacks
if (!('IntersectionObserver' in window)) {
  document.documentElement.classList.add('no-intersection-observer');
}

// MONITOR PERFORMANCE INTERSECTION OBSERVER
const IOMonitor = {
  observers: new Set(),
  
  // Registra un observer per monitoring
  register: function(observer, name = 'unnamed') {
    if (observer) {
      this.observers.add({ observer, name, created: Date.now() });
      console.log(`📊 IntersectionObserver '${name}' registrato`);
    }
  },
  
  // Cleanup tutti gli observers
  cleanup: function() {
    this.observers.forEach(({ observer, name }) => {
      try {
        observer.disconnect();
        console.log(`🧹 IntersectionObserver '${name}' disconnesso`);
      } catch (e) {
        console.warn(`Errore disconnessione observer '${name}':`, e);
      }
    });
    this.observers.clear();
  },
  
  // Stats sugli observers attivi
  getStats: function() {
    return {
      count: this.observers.size,
      observers: Array.from(this.observers).map(({ name, created }) => ({
        name,
        age: Date.now() - created
      }))
    };
  }
};

// Cleanup automatico al unload della pagina
window.addEventListener('beforeunload', () => {
  IOMonitor.cleanup();
});

// Log stats ogni 30 secondi (solo in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  setInterval(() => {
    const stats = IOMonitor.getStats();
    if (stats.count > 0) {
      console.log('📊 IntersectionObserver Stats:', stats);
    }
  }, 30000);
}

// PARALLAX EFFECT
document.addEventListener('DOMContentLoaded', function() {
  // Seleziona l'elemento hero
  const hero = document.querySelector('.hero');
  const parallaxFactor = 0.35; // Fattore di parallasse (maggiore = effetto più pronunciato)
  let ticking = false;
  
  // Verifica se siamo su un dispositivo che non preferisce movimenti ridotti
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  function updateParallax() {
    if (prefersReducedMotion || !hero) return;
    
    const scrollTop = window.pageYOffset;
    
    // Applica la trasformazione solo se l'elemento è visibile
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
      // Calcola il valore di traslazione basato sullo scroll
      const translateY = scrollTop * parallaxFactor;
      
      // Applica la trasformazione con GPU acceleration
      hero.style.backgroundPosition = `center ${translateY}px`;
    }
    
    ticking = false;
  }
  
  function requestParallax() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Throttle dell'evento scroll per performance
  const throttledParallax = PerformanceUtils.throttle(requestParallax, 10);
  
  // Aggiungi l'evento scroll solo se necessario
  if (hero && !prefersReducedMotion) {
    window.addEventListener('scroll', throttledParallax, { passive: true });
    // Applica subito per la posizione iniziale
    requestParallax();
  }
});

// RIPPLE EFFECT AVANZATO
document.addEventListener('DOMContentLoaded', function() {
  // Seleziona tutti i bottoni con effetto ripple
  const buttons = document.querySelectorAll('.btn-primary, form button');
  
  // Funzione per creare l'effetto ripple dinamico
  function createRipple(event) {
    const button = event.currentTarget;
    
    // Rimuovi vecchi ripple se esistono
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    // Crea un nuovo elemento ripple
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Imposta lo stile
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    ripple.style.width = ripple.style.height = `${diameter}px`;
    
    // Posiziona il ripple dove è avvenuto il click
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left - (diameter / 2)}px`;
    ripple.style.top = `${event.clientY - rect.top - (diameter / 2)}px`;
    
    // Aggiungi il ripple al bottone
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    ripple.style.borderRadius = '50%';
    ripple.style.position = 'absolute';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'effect-ripple 0.6s var(--transition-smooth) forwards';
    button.appendChild(ripple);
    
    // Rimuovi il ripple dopo l'animazione
    setTimeout(() => {
      if (ripple && ripple.parentNode === button) {
        button.removeChild(ripple);
      }
    }, 600);
  }
  
  // Aggiungi event listener a tutti i bottoni
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
});

// THEME TOGGLE FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  // Check for saved theme preference or OS preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check for OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update aria-pressed state for the toggle button
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
    
    // Dispatch event for other components to react
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }
  
  // Initialize theme
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add animation
    document.documentElement.classList.add('theme-transition');
    
    // Apply new theme
    applyTheme(newTheme);
    
    // Remove animation class after transition
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  });
  
  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.getItem('theme')) {
      // Only auto-switch if user hasn't manually set a preference
      const newTheme = event.matches ? 'dark' : 'light';
      applyTheme(newTheme);
    }
  });
});