// SCRIPT ESSENZIALI PER LORENZO GIUDICI PORTFOLIO
document.addEventListener('DOMContentLoaded', function() {
  // Impostazione per il cambio tema
  document.documentElement.classList.add('theme-loaded');
  
  // SCRIPT PER MIGLIORARE LO SCROLL
  const scrollIndicator = document.getElementById('scrollIndicator');
  const mainContent = document.querySelector('#main-content');
  const navbar = document.querySelector('.navbar-container');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      mainContent.scrollIntoView({behavior: 'smooth'});
    });
  }
  
  // Gestione scroll per mostrare navbar
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostra navbar quando scorriamo oltre la hero section
    if (scrollTop > window.innerHeight * 0.7) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  });

  // EFFETTO TYPING PER TESTO "PRODUCT DESIGNER"
  const typingElement = document.querySelector('.typing-animation');
  if (typingElement) {
    const text = typingElement.getAttribute('data-text');
    if (text) {
      typingAnimation(typingElement.querySelector('.lang-it'), text);
    }
  }
  
  function typingAnimation(element, text) {
    let index = 0;
    element.textContent = '';
    
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    
    setTimeout(type, 1000);
  }
  
  // GESTIONE MENU MOBILE
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.navbar');
  
  if (burgerMenu && mobileNav) {
    burgerMenu.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      mobileNav.style.display = expanded ? 'none' : 'block';
    });
  }
});
