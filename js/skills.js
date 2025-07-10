/**
 * Software Skills Section Interactions
 * Handles tab switching, skill progress bars animation and hover effects
 */

document.addEventListener('DOMContentLoaded', function() {
  // Tab switching functionality
  const skillsTabs = document.querySelectorAll('.skills-tab');
  const skillsGrids = document.querySelectorAll('.skills-grid');
  
  // Initialize skill progress bars
  initializeSkillBars();
  
  // Set up 3D card effect for desktop users
  setupSkillCards3DEffect();
  
  // Set up the tabs
  skillsTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active tab
      skillsTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show the selected grid and hide others
      skillsGrids.forEach(grid => {
        if (grid.getAttribute('data-category') === category) {
          grid.classList.add('active');
          
          // Animate the progress bars when the grid becomes visible
          setTimeout(() => {
            const progressBars = grid.querySelectorAll('.skill-progress-bar');
            progressBars.forEach(bar => {
              const card = bar.closest('.skill-card');
              if (card) {
                const level = card.getAttribute('data-skill-level');
                bar.style.width = level + '%';
                bar.classList.add('animated');
              }
            });
          }, 100);
        } else {
          grid.classList.remove('active');
        }
      });
    });
  });
  
  // Observer for revealing skill cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Animate progress bar if this is in the active category
        if (entry.target.closest('.skills-grid.active')) {
          const progressBar = entry.target.querySelector('.skill-progress-bar');
          if (progressBar) {
            const level = entry.target.getAttribute('data-skill-level');
            setTimeout(() => {
              progressBar.style.width = level + '%';
              progressBar.classList.add('animated');
            }, 300);
          }
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Observe all skill cards
  document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
  });
  
  // Function to initialize all skill progress bars with zero width
  function initializeSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    progressBars.forEach(bar => {
      bar.style.width = '0%';
    });
    
    // Initialize only the first visible category
    const activeGrid = document.querySelector('.skills-grid.active');
    if (activeGrid) {
      setTimeout(() => {
        const activeBars = activeGrid.querySelectorAll('.skill-progress-bar');
        activeBars.forEach(bar => {
          const card = bar.closest('.skill-card');
          if (card) {
            const level = card.getAttribute('data-skill-level');
            bar.style.width = level + '%';
            bar.classList.add('animated');
          }
        });
      }, 500);
    }
  }
  
  // Function to set up 3D card effect for desktop users
  function setupSkillCards3DEffect() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Only apply these effects on non-touch devices
    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      skillCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
          const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
          
          // Subtle 3D rotation effect
          this.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg) translateY(-8px)`;
          
          // Move the highlight element
          const highlight = this.querySelector('.skill-highlight');
          if (highlight) {
            highlight.style.opacity = '0.4';
            highlight.style.transform = `translate(${mouseX * 10 + 4}px, ${mouseY * 10 + 4}px)`;
          }
          
          // Scale the icon slightly
          const icon = this.querySelector('.skill-icon');
          if (icon) {
            icon.style.transform = 'scale(1.05)';
          }
        });
        
        // Reset transforms when mouse leaves
        card.addEventListener('mouseleave', function() {
          this.style.transform = '';
          
          const highlight = this.querySelector('.skill-highlight');
          if (highlight) {
            highlight.style.opacity = '';
            highlight.style.transform = '';
          }
          
          const icon = this.querySelector('.skill-icon');
          if (icon) {
            icon.style.transform = '';
          }
        });
      });
    }
  }
});
