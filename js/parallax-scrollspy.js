/**
 * parallax-scrollspy.js
 * Script for parallax effects and scrollspy navigation
 * Portfolio di Lorenzo Giudici
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // PARALLAX EFFECT
    // ==========================================
    
    // Get all parallax elements
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    // Function to update parallax positions
    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.3;
            const rect = element.parentElement.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (inView) {
                const scrolled = window.scrollY;
                const parentOffset = rect.top + scrolled;
                const scrollPercent = (scrolled - parentOffset) * speed;
                element.style.transform = `translateY(${scrollPercent}px)`;
            }
        });
    }
    
    // Add parallax to hero section if exists
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // Add parallax effect to hero background
        const heroContent = heroSection.querySelector('.hero-content') || heroSection.querySelector('.container');
        if (heroContent) {
            heroContent.classList.add('parallax-content');
        }
        
        // Check if a background image already exists
        let heroBg = heroSection.querySelector('.hero-bg') || heroSection.querySelector('.background-pattern');
        
        // If not, create one
        if (!heroBg) {
            heroBg = document.createElement('div');
            heroBg.classList.add('parallax-bg');
            heroBg.dataset.speed = '0.2';
            heroSection.insertBefore(heroBg, heroSection.firstChild);
        } else {
            heroBg.classList.add('parallax-bg');
            heroBg.dataset.speed = '0.2';
        }
        
        heroSection.classList.add('parallax-container');
    }
    
    // ==========================================
    // SCROLLSPY FUNCTIONALITY
    // ==========================================
    
    // Get all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Function to update active menu item based on scroll position
    function updateActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Add offset for sticky navbar
            const scrollPos = window.scrollY + 100; // adjust based on your navbar height
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active navigation item
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                
                // Remove active class from all
                item.classList.remove('active');
                
                // Add active class to current
                if (href && href.includes(currentSection)) {
                    item.classList.add('active');
                }
            }
        });
    }
    
    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    
    // Update both parallax and scrollspy on scroll
    window.addEventListener('scroll', function() {
        updateParallax();
        updateActiveNavItem();
    });
    
    // Initialize on page load
    updateParallax();
    updateActiveNavItem();
});
