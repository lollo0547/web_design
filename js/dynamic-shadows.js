/**
 * Dynamic Shadows for Project Images
 * Creates a 3D effect and dynamic shadows that respond to mouse movement
 */

document.addEventListener('DOMContentLoaded', function() {
  // Seleziona tutti i container delle immagini dei progetti
  const projectContainers = document.querySelectorAll('.progetto-image-container');
  const projectFrames = document.querySelectorAll('.progetto-frame');
  const dynamicShadows = document.querySelectorAll('.dynamic-shadow');
  
  // Rileva dispositivi touch per disabilitare alcuni effetti
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    // Aggiungi effetti per ogni progetto
    projectContainers.forEach((container, index) => {
      const frame = container.querySelector('.progetto-frame');
      const shadow = container.querySelector('.dynamic-shadow');
      const accentShape = container.querySelector('.progetto-accent-shape');
      const decorativeElement = container.querySelector('.decorative-element');
      
      // Gestione movimento del mouse sui container dei progetti
      container.addEventListener('mousemove', function(e) {
        // Calcola la posizione relativa del mouse all'interno del container
        const rect = container.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Applica la trasformazione 3D al frame
        if (frame) {
          frame.style.transform = `perspective(1000px) rotateY(${mouseX * 8}deg) rotateX(${-mouseY * 8}deg) scale(1.02)`;
        }
        
        // Sposta l'ombra dinamica in direzione opposta al mouse
        if (shadow) {
          shadow.style.transform = `scaleX(1.05) translateX(${mouseX * -15}px)`;
          
          // Cambia l'opacità dell'ombra in base alla posizione verticale del mouse
          // Più in alto è il mouse, più visibile sarà l'ombra
          const shadowOpacity = 0.7 + (mouseY * 0.2);
          shadow.style.opacity = shadowOpacity.toFixed(2);
          
          // Cambia leggermente il filtro di blur
          const blurAmount = 8 + (Math.abs(mouseY) * 3);
          shadow.style.filter = `blur(${blurAmount}px)`;
        }
        
        // Movimento leggero per elementi decorativi
        if (decorativeElement) {
          decorativeElement.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
        }
        
        // Movimento per accento shape
        if (accentShape) {
          accentShape.style.transform = `translate(${mouseX * -10}px, ${mouseY * -10}px)`;
        }
      });
      
      // Reset al mouse leave
      container.addEventListener('mouseleave', function() {
        if (frame) {
          frame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        }
        
        if (shadow) {
          shadow.style.transform = 'scaleX(0.85) translateX(0)';
          shadow.style.opacity = '0.7';
          shadow.style.filter = 'blur(8px)';
        }
        
        if (decorativeElement) {
          decorativeElement.style.transform = 'translate(0px, 0px)';
        }
        
        if (accentShape) {
          accentShape.style.transform = 'translate(0px, 0px)';
        }
      });
    });
  }
});
