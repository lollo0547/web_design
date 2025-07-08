/**
 * PORTFOLIO DI LORENZO GIUDICI - LIGHTBOX COMPONENT
 * Lightbox avanzato per visualizzazione progetti con supporto multilingua
 */

class PortfolioLightbox {
  constructor() {
    this.isOpen = false;
    this.currentProject = null;
    this.lightboxElement = null;
    this.overlayElement = null;
    this.closeButton = null;
    this.contentElement = null;
    this.galleryElement = null;
    this.galleryItems = [];
    this.currentIndex = 0;
    this.prevButton = null;
    this.nextButton = null;
    this.projects = [];

    this.init();
  }

  init() {
    // Crea l'elemento lightbox
    this.createLightboxElement();
    
    // Carica i progetti dalla pagina
    this.loadProjects();
    
    // Aggiungi event listener ai progetti
    this.bindProjectClickEvents();
    
    // Aggiungi event listener per il lightbox
    this.bindLightboxEvents();
    
    // Supporto per tastiera
    this.setupKeyboardNavigation();
  }

  createLightboxElement() {
    // Crea il contenitore principale
    this.lightboxElement = document.createElement('div');
    this.lightboxElement.className = 'portfolio-lightbox';
    this.lightboxElement.setAttribute('role', 'dialog');
    this.lightboxElement.setAttribute('aria-modal', 'true');
    this.lightboxElement.setAttribute('aria-hidden', 'true');
    this.lightboxElement.setAttribute('tabindex', '-1');
    
    // Crea l'overlay
    this.overlayElement = document.createElement('div');
    this.overlayElement.className = 'lightbox-overlay';
    this.lightboxElement.appendChild(this.overlayElement);
    
    // Crea il contenitore del contenuto
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'lightbox-content';
    this.lightboxElement.appendChild(this.contentElement);
    
    // Crea il pulsante di chiusura
    this.closeButton = document.createElement('button');
    this.closeButton.className = 'lightbox-close';
    this.closeButton.setAttribute('aria-label', 'Chiudi');
    this.closeButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    this.contentElement.appendChild(this.closeButton);
    
    // Crea il contenitore per le informazioni del progetto
    const projectInfo = document.createElement('div');
    projectInfo.className = 'lightbox-project-info';
    projectInfo.innerHTML = `
      <h2 class="lightbox-title"></h2>
      <div class="lightbox-description"></div>
      <div class="lightbox-metadata">
        <div class="lightbox-date"></div>
        <div class="lightbox-tools"></div>
      </div>
      <div class="project-story"></div>
    `;
    this.contentElement.appendChild(projectInfo);
    
    // Crea la galleria
    this.galleryElement = document.createElement('div');
    this.galleryElement.className = 'lightbox-gallery';
    this.contentElement.appendChild(this.galleryElement);
    
    // Crea i controlli della galleria
    const galleryControls = document.createElement('div');
    galleryControls.className = 'lightbox-gallery-controls';
    
    this.prevButton = document.createElement('button');
    this.prevButton.className = 'lightbox-prev';
    this.prevButton.setAttribute('aria-label', 'Immagine precedente');
    this.prevButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    this.nextButton = document.createElement('button');
    this.nextButton.className = 'lightbox-next';
    this.nextButton.setAttribute('aria-label', 'Immagine successiva');
    this.nextButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    galleryControls.appendChild(this.prevButton);
    galleryControls.appendChild(this.nextButton);
    this.contentElement.appendChild(galleryControls);
    
    // Aggiungi il lightbox al body
    document.body.appendChild(this.lightboxElement);
  }

  loadProjects() {
    // Seleziona tutti gli elementi progetto
    const projectElements = document.querySelectorAll('.project');
    
    projectElements.forEach((element) => {
      // Estrai i dati del progetto
      const projectId = element.getAttribute('id') || '';
      const titleElement = element.querySelector('h3');
      const descriptionElement = element.querySelector('.project-description');
      
      // Estrai il titolo in italiano e inglese
      const titleIT = titleElement ? titleElement.querySelector('.lang-it')?.textContent.trim() : '';
      const titleEN = titleElement ? titleElement.querySelector('.lang-en')?.textContent.trim() : '';
      
      // Estrai la descrizione in italiano e inglese
      const descriptionIT = descriptionElement ? descriptionElement.querySelector('.lang-it')?.textContent.trim() : '';
      const descriptionEN = descriptionElement ? descriptionElement.querySelector('.lang-en')?.textContent.trim() : '';
      
      // Trova l'immagine principale
      const mainImage = element.querySelector('img')?.getAttribute('src') || '';
      
      // Crea l'oggetto progetto
      const project = {
        id: projectId,
        element: element,
        title: {
          it: titleIT,
          en: titleEN
        },
        description: {
          it: descriptionIT,
          en: descriptionEN
        },
        mainImage: mainImage,
        // Qui puoi aggiungere ulteriori immagini per ogni progetto
        gallery: this.getGalleryForProject(projectId)
      };
      
      this.projects.push(project);
    });
  }
  
  // Funzione per ottenere le immagini della galleria basandosi sul progetto
  getGalleryForProject(projectId) {
    // Mappa per associare ID progetti a cartelle immagini
    const projectImageMap = {
      'project-1': 'progetto 1',
      'project-2': 'progetto 2',
      'project-3': 'progetto 3',
      'project-4': 'progetto 4'
    };
    
    // Per esempio, per il progetto 1 ritorna le immagini dalla cartella progetto 1
    if (projectImageMap[projectId]) {
      const folderName = projectImageMap[projectId];
      // Qui dovresti avere un array di immagini per ogni progetto
      // Poiché non possiamo recuperare dinamicamente le immagini dalla cartella,
      // fornisci un array predefinito basato sul nome del progetto
      
      switch(folderName) {
        case 'progetto 1':
          return [
            '/immagini/webp/progetto 1/tazzina_.webp',
            '/immagini/webp/progetto 1/zuccheriera 2_.webp',
            '/immagini/webp/progetto 1/all 22.webp'
          ];
        case 'progetto 2':
          return [
            '/immagini/webp/progetto 2/cardanica.webp',
            '/immagini/webp/progetto 2/cardanica 600.webp',
            '/immagini/webp/progetto 2/cardanica 900.webp'
          ];
        case 'progetto 3':
          return [
            '/immagini/webp/progetto 3/untitled555.webp',
            '/immagini/webp/progetto 3/untitled202.webp',
            '/immagini/webp/progetto 3/untitled702.webp'
          ];
        case 'progetto 4':
          return [
            '/immagini/webp/progetto 4/untitled.webp',
            '/immagini/webp/progetto 4/untitled33.webp',
            '/immagini/webp/progetto 4/untitled44.webp'
          ];
        default:
          return [];
      }
    }
    
    return [];
  }

  bindProjectClickEvents() {
    this.projects.forEach(project => {
      project.element.addEventListener('click', () => {
        this.openLightbox(project);
      });
      
      const viewMoreButton = project.element.querySelector('.project-view-more');
      if (viewMoreButton) {
        viewMoreButton.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openLightbox(project);
        });
      }
    });
  }

  bindLightboxEvents() {
    // Chiudi al click sul pulsante di chiusura
    this.closeButton.addEventListener('click', () => {
      this.closeLightbox();
    });
    
    // Chiudi al click sull'overlay
    this.overlayElement.addEventListener('click', () => {
      this.closeLightbox();
    });
    
    // Impedisci la chiusura quando si clicca sul contenuto
    this.contentElement.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Controlli galleria
    this.prevButton.addEventListener('click', () => {
      this.showPrevImage();
    });
    
    this.nextButton.addEventListener('click', () => {
      this.showNextImage();
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.showPrevImage();
          break;
        case 'ArrowRight':
          this.showNextImage();
          break;
      }
    });
  }

  openLightbox(project) {
    this.currentProject = project;
    
    // Aggiorna i contenuti
    this.updateLightboxContent();
    
    // Mostra il lightbox
    this.lightboxElement.classList.add('open');
    this.lightboxElement.setAttribute('aria-hidden', 'false');
    
    // Focus sul lightbox per l'accessibilità
    this.lightboxElement.focus();
    
    // Blocca lo scroll della pagina
    document.body.style.overflow = 'hidden';
    
    this.isOpen = true;
    
    // Carica la galleria
    this.loadGallery();
    
    // Mostra la prima immagine
    this.showImage(0);
  }

  closeLightbox() {
    this.lightboxElement.classList.remove('open');
    this.lightboxElement.setAttribute('aria-hidden', 'true');
    
    // Riabilita lo scroll della pagina
    document.body.style.overflow = '';
    
    this.isOpen = false;
    
    // Svuota la galleria
    this.galleryElement.innerHTML = '';
    this.galleryItems = [];
    this.currentIndex = 0;
  }

  updateLightboxContent() {
    if (!this.currentProject) return;
    
    const lang = this.getCurrentLang();
    
    // Aggiorna il titolo
    const titleElement = this.contentElement.querySelector('.lightbox-title');
    titleElement.textContent = this.currentProject.title[lang] || '';
    
    // Aggiorna la descrizione
    const descriptionElement = this.contentElement.querySelector('.lightbox-description');
    descriptionElement.textContent = this.currentProject.description[lang] || '';
    
    // Puoi aggiungere ulteriori metadati qui
  }
  
  getCurrentLang() {
    return document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
  }

  loadGallery() {
    if (!this.currentProject) return;
    
    // Svuota la galleria
    this.galleryElement.innerHTML = '';
    this.galleryItems = [];
    
    // Aggiungi l'immagine principale se non è già inclusa nella galleria
    const mainImageExists = this.currentProject.gallery.includes(this.currentProject.mainImage);
    if (this.currentProject.mainImage && !mainImageExists) {
      this.currentProject.gallery.unshift(this.currentProject.mainImage);
    }
    
    // Crea gli elementi per ogni immagine
    this.currentProject.gallery.forEach((imageUrl, index) => {
      const item = document.createElement('div');
      item.className = 'lightbox-gallery-item';
      
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = `${this.currentProject.title[this.getCurrentLang()]} - Immagine ${index + 1}`;
      img.loading = 'lazy';
      
      item.appendChild(img);
      this.galleryElement.appendChild(item);
      this.galleryItems.push(item);
    });
    
    // Nascondi i controlli se c'è una sola immagine
    if (this.galleryItems.length <= 1) {
      this.prevButton.style.display = 'none';
      this.nextButton.style.display = 'none';
    } else {
      this.prevButton.style.display = '';
      this.nextButton.style.display = '';
    }
  }

  showImage(index) {
    if (this.galleryItems.length === 0) return;
    
    // Assicurati che l'indice sia valido
    if (index < 0) index = this.galleryItems.length - 1;
    if (index >= this.galleryItems.length) index = 0;
    
    // Rimuovi la classe active da tutti gli elementi
    this.galleryItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Aggiungi la classe active all'elemento corrente
    this.galleryItems[index].classList.add('active');
    
    this.currentIndex = index;
  }

  showPrevImage() {
    this.showImage(this.currentIndex - 1);
  }

  showNextImage() {
    this.showImage(this.currentIndex + 1);
  }
}

// Inizializza il lightbox quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioLightbox();
});
