/**
 * Animation Observer and Navbar Handling for Lorenzo Giudici's Portfolio
 * Handles the activation of animations based on scroll position
 * Manages navbar visibility, active section highlighting, and sticky effect
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
  
  // Navbar visibility on scroll
  const navbar = document.querySelector('.navbar-container');
  const navLinks = document.querySelectorAll('.navbar a');
  const sections = document.querySelectorAll('section[id]');
  let lastScrollTop = 0;
  
  // Get the "Chi sono" section position to determine when to show navbar
  const chiSonoSection = document.getElementById('chi-sono');
  const chiSonoPosition = chiSonoSection ? chiSonoSection.offsetTop - 100 : 500; // Default fallback if section not found
  
  // Show/hide navbar based on scroll position relative to "Chi sono" section
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only show navbar when we've scrolled past the hero section to the "Chi sono" section
    if (scrollTop >= chiSonoPosition) {
      navbar.classList.add('visible');
      
      // Determine scroll direction for additional behavior
      if (scrollTop > lastScrollTop) {
        // Scrolling down - can optionally hide navbar
        navbar.style.transform = 'translateY(0)'; // Keep visible while scrolling down past chi-sono
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      // Before reaching Chi sono section, keep navbar hidden
      navbar.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop;
    
    // Update active section in navbar
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
});

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
