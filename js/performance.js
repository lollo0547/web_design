/**
 * Performance optimizations for Lorenzo Giudici's portfolio
 */

// WebP Support Detection and Background Image Setup
(function() {
  // Check WebP support
  function checkWebPSupport(callback) {
    const webP = new Image();
    webP.onload = function() { callback(webP.height === 2); };
    webP.onerror = function() { callback(false); };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  // Apply WebP or fallback background images
  function setBackgroundImages(webpSupported) {
    console.log('Setting background images, WebP supported:', webpSupported);
    const elements = document.querySelectorAll('[data-bg-webp]');
    console.log('Found elements:', elements.length);
    elements.forEach(element => {
      const bgImage = webpSupported ? element.getAttribute('data-bg-webp') : element.getAttribute('data-bg-fallback');
      console.log('Using background image:', bgImage);
      if (bgImage) {
        element.style.backgroundImage = `url('${bgImage}')`;
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
        console.log('Applied background to element:', element);
      }
    });
  }

  // Preload hero images for faster rendering
  function preloadHeroImages() {
    const heroWebp = 'immagini/webp/hero/Lorenzo_hero.webp';
    const heroFallback = 'immagini/webp/profile/lorenzo_profile.webp';
    
    // Create and append preload links
    const preloadWebp = document.createElement('link');
    preloadWebp.rel = 'preload';
    preloadWebp.as = 'image';
    preloadWebp.href = heroWebp;
    preloadWebp.type = 'image/webp';
    
    const preloadFallback = document.createElement('link');
    preloadFallback.rel = 'preload';
    preloadFallback.as = 'image';
    preloadFallback.href = heroFallback;
    preloadFallback.type = 'image/webp';
    
    document.head.appendChild(preloadWebp);
    document.head.appendChild(preloadFallback);
  }

  // Initialize WebP support check and preload images
  checkWebPSupport(setBackgroundImages);
  preloadHeroImages();
})();

// Enhanced Lazy Loading
(function() {
  // IntersectionObserver fallback
  if (!('IntersectionObserver' in window)) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // Simple function to load all images immediately if IntersectionObserver is not supported
    function loadAllImages() {
      lazyImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.add('loaded');
      });
    }
    
    // Load all images after a short delay to prioritize critical content
    setTimeout(loadAllImages, 300);
    return;
  }

  // Using IntersectionObserver for better lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // If using data-src attribute
        if (img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
        
        // Add loaded class for any CSS transitions
        img.classList.add('loaded');
        
        // Stop observing this image
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px 0px', // Start loading when image is 200px from viewport
    threshold: 0.01 // Trigger when even 1% of the image is visible
  });

  // Observe all lazy images
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
})();

// Optimize Font Loading
(function() {
  // Add link preconnect for Google Fonts if not already present
  if (!document.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]')) {
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://fonts.gstatic.com';
    preconnectLink.crossOrigin = 'anonymous';
    document.head.appendChild(preconnectLink);
  }
})();

// Script Loading Optimization
(function() {
  // Function to load scripts when they're needed
  window.loadScriptOnDemand = function(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.defer = true;
    
    if (callback) {
      script.onload = callback;
    }
    
    document.body.appendChild(script);
    return script;
  };
})();

// Prevent Layout Shifts from Images
(function() {
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    img.addEventListener('load', function() {
      if (!this.hasAttribute('width') && !this.hasAttribute('height')) {
        // Set the width and height attributes once loaded to prevent layout shifts
        this.setAttribute('width', this.naturalWidth);
        this.setAttribute('height', this.naturalHeight);
      }
    });
  });
})();

// Performance Utility Functions
window.PerformanceUtils = window.PerformanceUtils || {};

// Throttle function for performance-critical event handlers
PerformanceUtils.throttle = function(callback, limit) {
  let waiting = false;
  return function() {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function() {
        waiting = false;
      }, limit);
    }
  };
};

// Debounce function for UI updates that don't need to happen on every frame
PerformanceUtils.debounce = function(callback, delay) {
  let timer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
};

// Advanced Responsive Image Loading
(function() {
  // Helper to determine connection speed
  function getConnectionSpeed() {
    if (!navigator.connection) {
      return 'unknown';
    }
    
    const { effectiveType, saveData } = navigator.connection;
    
    if (saveData) {
      return 'slow'; // User has requested data saving mode
    }
    
    // Connection types: slow 2G, 2G, 3G, 4G
    if (['slow-2g', '2g'].includes(effectiveType)) {
      return 'slow';
    } else if (effectiveType === '3g') {
      return 'medium';
    }
    
    return 'fast'; // 4G and better
  }
  
  // Adjust image quality based on connection
  function getImageParams() {
    const speed = getConnectionSpeed();
    
    switch (speed) {
      case 'slow':
        return { quality: 'low', priority: 'low' };
      case 'medium':
        return { quality: 'medium', priority: 'auto' };
      default:
        return { quality: 'high', priority: 'high' };
    }
  }

  // Apply loading priority to images
  function optimizeImages() {
    const { quality, priority } = getImageParams();
    console.log(`Optimizing images for ${quality} quality and ${priority} priority`);
    
    // Above-the-fold images get high priority
    const aboveTheFoldImages = document.querySelectorAll('header img, .hero img, .hero-content img');
    aboveTheFoldImages.forEach(img => {
      img.loading = 'eager';
      img.fetchpriority = 'high';
    });
    
    // Handle srcset quality adjustments for performance
    document.querySelectorAll('img[srcset]').forEach(img => {
      if (quality === 'low' || quality === 'medium') {
        // For slow connections, modify srcset to prefer smaller images
        const srcset = img.getAttribute('srcset');
        if (srcset) {
          const srcsetParts = srcset.split(',');
          
          if (quality === 'low' && srcsetParts.length > 1) {
            // Use only smaller versions for low quality
            img.setAttribute('srcset', srcsetParts[0]);
          } else if (quality === 'medium' && srcsetParts.length > 2) {
            // Use only medium and smaller versions
            img.setAttribute('srcset', srcsetParts.slice(0, 2).join(','));
          }
        }
      }
    });
  }

  // Wait for document to be ready before optimizing
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeImages);
  } else {
    optimizeImages();
  }
})();
