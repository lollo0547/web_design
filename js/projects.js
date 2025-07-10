/**
 * Projects overlay functionality - Enhanced with carousel
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all project images and overlays
  const projectImages = document.querySelectorAll('.progetto-image-container');
  const overlays = document.querySelectorAll('.project-overlay');
  const closeButtons = document.querySelectorAll('.overlay-close');
  
  // Project Grid Carousel functionality
  const progettiGrid = document.getElementById('progettiGrid');
  const prevButton = document.querySelector('.progetti-prev');
  const nextButton = document.querySelector('.progetti-next');
  const indicators = document.querySelectorAll('.progetti-indicators .indicator');
  let currentSlide = 0;
  const totalSlides = 2; // We have 2 slides (0 and 1)

  // Function to update the project grid slide
  function updateProjectGrid(slideIndex) {
    // Update grid transform
    progettiGrid.style.transform = `translateX(-${slideIndex * 50}%)`;
    
    // Update active indicator
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === slideIndex);
    });
    
    // Update current slide index
    currentSlide = slideIndex;
    
    // Update animation classes based on current page
    document.querySelectorAll('.progetti-page').forEach((page, index) => {
      if (index === slideIndex) {
        // Add reveal animations with delay for current page
        const leftCards = page.querySelectorAll('.reveal-left');
        const rightCards = page.querySelectorAll('.reveal-right');
        
        leftCards.forEach((card, i) => {
          card.style.animationDelay = `${i * 0.2}s`;
          card.classList.add('animate');
        });
        
        rightCards.forEach((card, i) => {
          card.style.animationDelay = `${i * 0.2 + 0.1}s`;
          card.classList.add('animate');
        });
      } else {
        // Remove animations from hidden pages
        page.querySelectorAll('.reveal-left, .reveal-right').forEach(card => {
          card.classList.remove('animate');
        });
      }
    });
  }
  
  // Initialize project navigation buttons
  if (prevButton && nextButton) {
    prevButton.addEventListener('click', function() {
      const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateProjectGrid(newSlide);
    });
    
    nextButton.addEventListener('click', function() {
      const newSlide = (currentSlide + 1) % totalSlides;
      updateProjectGrid(newSlide);
    });
    
    // Add click events to indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        updateProjectGrid(index);
      });
    });
  }

  // Function to open project overlay
  function openOverlay(projectId) {
    const overlay = document.getElementById(projectId);
    if (overlay) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      overlay.classList.add('active');
      
      // Start auto carousel
      startCarousel(overlay.querySelector('.overlay-carousel-track'));
      
      // Set focus to the close button for accessibility
      const closeButton = overlay.querySelector('.overlay-close');
      if (closeButton) {
        setTimeout(() => {
          closeButton.focus();
        }, 100);
      }
    }
  }
  
  // Function to close project overlay
  function closeOverlay(overlay) {
    document.body.style.overflow = ''; // Restore scrolling
    overlay.classList.remove('active');
    
    // Stop auto carousel
    const carouselTrack = overlay.querySelector('.overlay-carousel-track');
    if (carouselTrack && carouselTrack.autoInterval) {
      clearInterval(carouselTrack.autoInterval);
    }
  }
  
  // Close all overlays
  function closeAllOverlays() {
    overlays.forEach(overlay => {
      closeOverlay(overlay);
    });
  }
  
  // Add click event to project images
  projectImages.forEach(image => {
    image.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      openOverlay(projectId);
    });
  });
  
  // Add click event to close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const overlay = this.closest('.project-overlay');
      closeOverlay(overlay);
    });
  });
  
  // Close overlay when clicking outside content
  overlays.forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeOverlay(overlay);
      }
    });
  });
  
  // Close overlay with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllOverlays();
    }
  });
  
  // Image Carousel Functionality
  function initCarousel(carouselTrack) {
    if (!carouselTrack) return;
    
    const carouselId = carouselTrack.getAttribute('data-project');
    const slides = carouselTrack.querySelectorAll('.overlay-carousel-slide');
    const thumbnails = document.querySelectorAll(`.overlay-thumb[data-carousel="${carouselId}"]`);
    let currentIndex = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
      // Update transform
      carouselTrack.style.transform = `translateX(-${index * 100}%)`;
      
      // Update active classes
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      
      // Update thumbnail active states
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
      
      currentIndex = index;
    }
    
    // Add click events to thumbnails
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', function() {
        showSlide(index);
      });
    });
    
    // Start with first slide
    showSlide(0);
    
    // Return functions for external control
    return {
      next: () => showSlide((currentIndex + 1) % slides.length),
      prev: () => showSlide((currentIndex - 1 + slides.length) % slides.length),
      goTo: (index) => showSlide(index)
    };
  }
  
  // Initialize all carousels
  document.querySelectorAll('.overlay-carousel-track').forEach(track => {
    initCarousel(track);
  });
  
  // Start automatic carousel
  function startCarousel(carouselTrack) {
    if (!carouselTrack) return;
    
    const carousel = initCarousel(carouselTrack);
    
    // Clear any existing interval
    if (carouselTrack.autoInterval) {
      clearInterval(carouselTrack.autoInterval);
    }
    
    // Set new interval
    carouselTrack.autoInterval = setInterval(() => {
      carousel.next();
    }, 4000); // Change slide every 4 seconds
    
    return carouselTrack.autoInterval;
  }
  
  // Dynamic shadow effect for images
  function initDynamicShadows() {
    document.querySelectorAll('.shadow-effect').forEach(image => {
      image.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const offsetX = (x - centerX) / 25;
        const offsetY = (y - centerY) / 25;
        
        this.style.boxShadow = `${offsetX}px ${offsetY}px 20px rgba(0, 0, 0, 0.2)`;
      });
      
      image.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
      });
    });
  }
  
  // Initialize dynamic shadows
  initDynamicShadows();
  
  // Re-initialize features when overlay opens
  overlays.forEach(overlay => {
    overlay.addEventListener('transitionend', function(e) {
      if (e.propertyName === 'opacity' && this.classList.contains('active')) {
        initDynamicShadows();
      }
    });
  });
  
  // Initialize the first page animations
  setTimeout(() => {
    updateProjectGrid(0);
  }, 500);
});
