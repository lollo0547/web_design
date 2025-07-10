/**
 * Footer Functionality
 * 
 * Manages the back to top button and other footer interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize back to top button
  initBackToTop();
  
  // Initialize the newsletter form
  initNewsletterForm();
});

/**
 * Initialize back to top button
 */
function initBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (!backToTopButton) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Scroll to top when clicked
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Initialize newsletter subscription form
 */
function initNewsletterForm() {
  const subscribeForm = document.querySelector('.subscribe-form');
  
  if (!subscribeForm) return;
  
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('.subscribe-input');
    const email = emailInput.value.trim();
    
    if (!isValidEmail(email)) {
      // Show error state
      emailInput.classList.add('error');
      return;
    }
    
    emailInput.classList.remove('error');
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    const successMessage = document.createElement('p');
    successMessage.classList.add('subscribe-success');
    successMessage.textContent = 'Grazie per l\'iscrizione!';
    
    emailInput.value = '';
    
    // Replace form with success message
    const formContainer = subscribeForm.parentElement;
    formContainer.appendChild(successMessage);
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      successMessage.style.opacity = '0';
      setTimeout(() => {
        successMessage.remove();
      }, 300);
    }, 3000);
  });
  
  // Remove error state on input focus
  const emailInput = subscribeForm.querySelector('.subscribe-input');
  if (emailInput) {
    emailInput.addEventListener('focus', function() {
      this.classList.remove('error');
    });
  }
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if the email is valid
 */
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
