/**
 * Animation Observer and Navbar Handling for Lorenzo Giudici's Portfolio
 * Handles the activation of animations based on scroll position
 * Manages navbar visibility, active section highlighting, and sticky effect
 */

document.addEventListener('DOMContentLoaded', function() {
  // Modal burger and menu selectors
  const modalBurger = document.querySelector('.modal-burger');
  const modalMenu = document.querySelector('.modal-menu');
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
  
  // Navbar visibility on scroll
  const navbar = document.querySelector('.navbar-container');
  const navLinks = document.querySelectorAll('.navbar a');
  const sections = document.querySelectorAll('section[id]');
  let lastScrollTop = 0;
  
  // Define a position to determine when to show navbar (previously was Chi sono section)
  const navShowPosition = 500; // Default position to show navbar
  
  // Show/hide navbar based on scroll position
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only show navbar when we've scrolled past the hero section
    if (scrollTop >= navShowPosition) {
      navbar.classList.add('visible');
      
      // Determine scroll direction for additional behavior
      if (scrollTop > lastScrollTop) {
        // Scrolling down - can optionally hide navbar
        navbar.style.transform = 'translateY(0)'; // Keep visible while scrolling down
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      // Before reaching the threshold, keep navbar hidden
      navbar.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop;
    
  });

// Function to update active section in navbar
function updateActiveSection() {
  const scrollPosition = window.scrollY + 100; // Offset for navbar height
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to current section link
      document.querySelector(`.navbar a[href*="${sectionId}"]`).classList.add('active');
    }
  });
}

// Initialize active section on page load
updateActiveSection();
  });
  
  // Function to update active section in navbar
  function updateActiveSection() {
    const scrollPosition = window.scrollY + 100; // Offset for navbar height
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current section link
        document.querySelector(`.navbar a[href*="${sectionId}"]`).classList.add('active');
      }
    });
  }
  
  // Add click event to navbar links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // Adjust for navbar height
          behavior: 'smooth'
        });
        
        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Initialize active section on page load
  updateActiveSection();
// ...existing code...

/**
 * Mobile Menu Handler
 * Controls the burger menu functionality on mobile devices
 */
document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navbar = document.querySelector('.navbar');
  
  if (burgerMenu && navbar) {
    burgerMenu.addEventListener('click', function() {
      navbar.classList.toggle('active');
      
      // Update ARIA attributes
      const isExpanded = navbar.classList.contains('active');
      burgerMenu.setAttribute('aria-expanded', isExpanded);
      
      // Change burger icon based on state
      burgerMenu.innerHTML = isExpanded ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navbar.contains(event.target);
      const isClickOnBurger = burgerMenu.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnBurger && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
        burgerMenu.innerHTML = '☰';
      }
    });
  }
});

// Function to handle page initialization and resize events
function initPageLayout() {
  // Recalculate chi-sono position when page is resized
  const chiSonoSection = document.getElementById('chi-sono');
  if (chiSonoSection) {
    // Update the scroll position when window is resized
    window.addEventListener('resize', function() {
      updateActiveSection();
    });
  }
  
  // Add scroll event to hero section to smoothly transition to chi-sono
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      if (chiSonoSection) {
        chiSonoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Initialize the page layout
document.addEventListener('DOMContentLoaded', initPageLayout);

/**
 * FAQ Accordion functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length) {
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        // Toggle aria-expanded state
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Close all other accordion items
        accordionHeaders.forEach(otherHeader => {
          if (otherHeader !== this) {
            otherHeader.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });
  }
});

/**
 * Contact form validation
 */
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      let isValid = true;
      
      if (!name) {
        showError('name', 'Nome richiesto');
        isValid = false;
      } else {
        clearError('name');
      }
      
      if (!email) {
        showError('email', 'Email richiesta');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError('email', 'Email non valida');
        isValid = false;
      } else {
        clearError('email');
      }
      
      if (!subject) {
        showError('subject', 'Oggetto richiesto');
        isValid = false;
      } else {
        clearError('subject');
      }
      
      if (!message) {
        showError('message', 'Messaggio richiesto');
        isValid = false;
      } else {
        clearError('message');
      }
      
      if (isValid) {
        // Here you would normally send the form data to a server
        // For demonstration, we'll just show a success message
        contactForm.innerHTML = '<div class="form-success"><h3>Messaggio inviato!</h3><p>Grazie per avermi contattato. Ti risponderò il prima possibile.</p></div>';
      }
    });
  }
  
  // Helper functions for form validation
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    
    // Check if error message already exists
    let errorMessage = field.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    
    errorMessage.textContent = message;
    field.classList.add('error');
  }
  
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorMessage = field.nextElementSibling;
    
    if (errorMessage && errorMessage.classList.contains('error-message')) {
      errorMessage.remove();
    }
    
    field.classList.remove('error');
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

/**
 * Skills progress bar animation
 */
document.addEventListener('DOMContentLoaded', function() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start animation when skill bars are visible
          const progressBar = entry.target;
          const width = progressBar.style.width;
          
          // First set to 0 to trigger animation
          progressBar.style.width = '0';
          
          // Then animate to the target width after a small delay
          setTimeout(() => {
            progressBar.style.width = width;
          }, 100);
          
          // Unobserve after animation is triggered
          observer.unobserve(progressBar);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe each skill bar
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }
});

/**
 * Section Scroll Animations
 * Handles smooth transitions between sections when scrolling
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all sections
  const sections = document.querySelectorAll('.section');
  let lastScrollTop = 0;
  let scrollDirection = 'down';
  let currentSectionIndex = 0;
  let isAnimating = false;
  let sectionPositions = [];
  
  // Calculate section positions on load and resize
  function calculateSectionPositions() {
    sectionPositions = [];
    sections.forEach(section => {
      sectionPositions.push(section.offsetTop);
    });
  }
  
  // Initial calculation
  calculateSectionPositions();
  
  // Recalculate on window resize
  window.addEventListener('resize', calculateSectionPositions);
  
  // Determine which section is currently in view
  function getCurrentSectionIndex() {
    const scrollPosition = window.scrollY + (window.innerHeight / 3);
    let currentIndex = 0;
    
    sectionPositions.forEach((position, index) => {
      if (scrollPosition >= position) {
        currentIndex = index;
      }
    });
    
    return currentIndex;
  }
  
  // Handle scroll events with throttling to improve performance
  window.addEventListener('scroll', throttle(function() {
    // Don't trigger animations if already animating
    if (isAnimating) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determine scroll direction
    if (scrollTop > lastScrollTop) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    
    // Save current scroll position
    lastScrollTop = scrollTop;
    
    // Get current section index
    const newSectionIndex = getCurrentSectionIndex();
    
    // Only animate when changing sections
    if (newSectionIndex !== currentSectionIndex) {
      animateSectionTransition(currentSectionIndex, newSectionIndex);
      currentSectionIndex = newSectionIndex;
    }
  }, 100)); // 100ms throttle
  
  // Animate transition between sections
  function animateSectionTransition(fromIndex, toIndex) {
    // Prevent multiple animations
    isAnimating = true;
    
    // Exit animation for the section we're leaving
    if (fromIndex >= 0 && fromIndex < sections.length) {
      sections[fromIndex].classList.remove('active');
      sections[fromIndex].classList.add(scrollDirection === 'down' ? 'scroll-down-leave' : 'scroll-up-leave');
    }
    
    // Entrance animation for the section we're entering
    if (toIndex >= 0 && toIndex < sections.length) {
      // First remove any existing animation classes
      sections[toIndex].classList.remove('scroll-down-enter', 'scroll-up-enter', 'scroll-down-leave', 'scroll-up-leave');
      
      // Add appropriate entrance class based on scroll direction
      sections[toIndex].classList.add(scrollDirection === 'down' ? 'scroll-down-enter' : 'scroll-up-enter');
      
      // Force reflow to ensure the browser applies the class
      void sections[toIndex].offsetWidth;
      
      // Add active class to start animation
      sections[toIndex].classList.add('active');
      sections[toIndex].classList.remove('scroll-down-enter', 'scroll-up-enter');
    }
    
    // Reset animation state after transition
    setTimeout(() => {
      if (fromIndex >= 0 && fromIndex < sections.length) {
        sections[fromIndex].classList.remove('scroll-down-leave', 'scroll-up-leave');
      }
      isAnimating = false;
    }, 800); // Match this to the CSS transition time
  }
  
  // Initialize the first section as active
  if (sections.length > 0) {
    sections[0].classList.add('active');
  }
});

/**
 * Scroll Utilities
 * Provides throttled scroll event handling
 */
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

/**
 * Modal Functionality for other sections (removed Percorso Scolastico modal)
 */
document.addEventListener('DOMContentLoaded', function() {
  // Close modal on ESC key for any future modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Modal closing will be handled by specific modals if added in the future
    }
  });
  
  // Toggle burger menu
  if (modalBurger) {
    modalBurger.addEventListener('click', function() {
      const isExpanded = modalBurger.getAttribute('aria-expanded') === 'true';
      modalBurger.setAttribute('aria-expanded', !isExpanded);
      modalMenu.classList.toggle('open');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (modalMenu && modalMenu.classList.contains('open')) {
      if (!modalMenu.contains(e.target) && e.target !== modalBurger) {
        modalMenu.classList.remove('open');
        modalBurger.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Modal functionality removed - can be re-added if needed for other sections
});
