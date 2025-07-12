/**
 * Project Filters
 * Aggiunge funzionalità di filtro ai progetti
 */

document.addEventListener('DOMContentLoaded', function() {
  // Crea i filtri di progetto
  createProjectFilters();
  
  // Inizializza i filtri
  initializeFilters();
  
  // Inizializza i pulsanti di navigazione del carousel
  initializeNavigation();
  
  // Inizializza la ricerca dei progetti
  setupProjectSearch();
});

// Funzione per inizializzare i pulsanti di navigazione
function initializeNavigation() {
  const prevButton = document.querySelector('.progetti-prev');
  const nextButton = document.querySelector('.progetti-next');
  
  if (prevButton && nextButton) {
    // Aggiorna visibilità dei pulsanti iniziale
    updateNavigationButtons();
    
    prevButton.addEventListener('click', function() {
      const currentPage = document.querySelector('.progetti-indicators .indicator.active');
      const prevPage = currentPage.previousElementSibling;
      
      if (prevPage) {
        // Animazione per scorrimento indietro
        const pageIndex = parseInt(prevPage.getAttribute('data-slide'));
        const progettiGrid = document.getElementById('progettiGrid');
        progettiGrid.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        progettiGrid.style.transform = 'translateX(10%)';
        
        setTimeout(() => {
          showPage(pageIndex);
          progettiGrid.style.transform = 'translateX(0)';
        }, 200);
        
        // Aggiorna lo stato dei pulsanti
        updateNavigationButtons(pageIndex);
      }
    });
    
    nextButton.addEventListener('click', function() {
      const currentPage = document.querySelector('.progetti-indicators .indicator.active');
      const nextPage = currentPage.nextElementSibling;
      
      if (nextPage) {
        // Animazione per scorrimento avanti
        const pageIndex = parseInt(nextPage.getAttribute('data-slide'));
        const progettiGrid = document.getElementById('progettiGrid');
        progettiGrid.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        progettiGrid.style.transform = 'translateX(-10%)';
        
        setTimeout(() => {
          showPage(pageIndex);
          progettiGrid.style.transform = 'translateX(0)';
        }, 200);
        
        // Aggiorna lo stato dei pulsanti
        updateNavigationButtons(pageIndex);
      }
    });
    
    // Anche gli indicatori dovrebbero aggiornare i pulsanti
    document.querySelectorAll('.progetti-indicators .indicator').forEach(indicator => {
      indicator.addEventListener('click', function() {
        const pageIndex = parseInt(this.getAttribute('data-slide'));
        updateNavigationButtons(pageIndex);
      });
    });
  }
}

// Funzione per aggiornare lo stato dei pulsanti di navigazione
function updateNavigationButtons(currentIndex = 0) {
  const prevButton = document.querySelector('.progetti-prev');
  const nextButton = document.querySelector('.progetti-next');
  const indicators = document.querySelectorAll('.progetti-indicators .indicator');
  
  if (!prevButton || !nextButton || indicators.length === 0) return;
  
  // Disabilita il pulsante precedente se siamo alla prima pagina
  if (currentIndex === 0) {
    prevButton.classList.add('disabled');
    prevButton.setAttribute('aria-disabled', 'true');
  } else {
    prevButton.classList.remove('disabled');
    prevButton.setAttribute('aria-disabled', 'false');
  }
  
  // Disabilita il pulsante successivo se siamo all'ultima pagina
  if (currentIndex === indicators.length - 1) {
    nextButton.classList.add('disabled');
    nextButton.setAttribute('aria-disabled', 'true');
  } else {
    nextButton.classList.remove('disabled');
    nextButton.setAttribute('aria-disabled', 'false');
  }
}

// Funzione per creare i filtri di progetto
function createProjectFilters() {
  // Categorie di progetto - corrispondenti esattamente alle cartelle
  const categories = [
    { id: 'product', labelIt: 'Product Design', labelEn: 'Product Design' },
    { id: '3d', labelIt: 'Modellazione 3D', labelEn: '3D Modeling' },
    { id: 'rendering', labelIt: 'Rendering', labelEn: 'Rendering' },
    { id: 'prototype', labelIt: 'Prototipazione', labelEn: 'Prototyping' }
  ];
  
  // Crea il contenitore per i filtri
  const filtersHTML = `
    <div class="project-filters-container">
      <div class="project-search-container">
        <div class="search-wrapper">
          <input type="text" id="projectSearch" class="project-search-input" placeholder="Cerca progetti..." aria-label="Cerca progetti">
          <button class="search-clear" id="clearSearch" aria-label="Cancella ricerca">×</button>
        </div>
      </div>
      <div class="project-filters">
        ${categories.map((cat, index) => `
          <button class="filter-button${index === 0 ? ' active' : ''}" data-filter="${cat.id}" data-index="${index}">
            <span class="lang-it">${cat.labelIt}</span>
            <span class="lang-en">${cat.labelEn}</span>
          </button>
        `).join('')}
        <div class="filter-indicator"></div>
      </div>
      <div class="project-counter"></div>
    </div>
  `;
  
  // Inserisci i filtri prima della griglia dei progetti
  const projectsSection = document.querySelector('.progetti-section .section-content');
  if (projectsSection) {
    const filtersContainer = document.createElement('div');
    filtersContainer.innerHTML = filtersHTML;
    projectsSection.prepend(filtersContainer.firstElementChild);
    
    // Posiziona l'indicatore sotto il primo pulsante attivo
    setTimeout(() => {
      positionFilterIndicator(document.querySelector('.filter-button.active'));
    }, 100);
  }
}

// Funzione per posizionare l'indicatore del filtro attivo
function positionFilterIndicator(activeButton) {
  if (!activeButton) return;
  
  const indicator = document.querySelector('.filter-indicator');
  if (!indicator) return;
  
  const buttonRect = activeButton.getBoundingClientRect();
  const containerRect = activeButton.parentNode.getBoundingClientRect();
  
  // Calcola la posizione relativa e la larghezza
  const left = buttonRect.left - containerRect.left;
  const width = buttonRect.width;
  
  // Posiziona l'indicatore
  indicator.style.width = `${width - 20}px`; // Leggermente più stretto del pulsante
  indicator.style.transform = `translateX(${left + 10}px)`; // Centrato sotto il pulsante
}

// Funzione per inizializzare i filtri
function initializeFilters() {
  // Mappatura delle cartelle alle categorie
  const categoryFolderMappings = {
    'product': 'product design',
    '3d': 'modellazione 3D',
    'rendering': 'rendering',
    'prototype': 'prototipazione'
  };
  
  // Aggiungi attributi data-category ai progetti esistenti
  const projects = document.querySelectorAll('.progetto-card');
  
  // Assegna categorie specifiche ai progetti in base al percorso dell'immagine
  projects.forEach((project) => {
    // Ottieni l'URL dell'immagine
    const imgElement = project.querySelector('.progetto-image');
    if (!imgElement) return;
    
    const imgSrc = imgElement.getAttribute('src');
    
    // Default category
    let assignedCategory = 'product';
    
    // Determina la categoria in base al percorso della cartella
    if (imgSrc.includes('/progetti/')) {
      for (const [category, folderName] of Object.entries(categoryFolderMappings)) {
        if (imgSrc.toLowerCase().includes(`/progetti/${folderName.toLowerCase()}/`)) {
          assignedCategory = category;
          break;
        }
      }
    }
    
    project.setAttribute('data-category', assignedCategory);
  });
  
  // Aggiungi event listener ai pulsanti di filtro
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Resetta la ricerca quando si cambia categoria
      const searchInput = document.getElementById('projectSearch');
      if (searchInput) {
        searchInput.value = '';
        searchInput.parentElement.classList.remove('has-text');
      }
      
      // Rimuovi la classe active da tutti i pulsanti
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Aggiungi la classe active al pulsante cliccato
      this.classList.add('active');
      
      // Ottieni il filtro selezionato
      const selectedFilter = this.getAttribute('data-filter');
      
      // Posiziona l'indicatore
      positionFilterIndicator(this);
      
      // Filtra i progetti
      filterProjects(selectedFilter);
    });
  });
  
  // Inizializza la funzionalità di ricerca
  setupProjectSearch();
  
  // Inizializza il contatore dei progetti per la prima categoria
  const defaultFilter = document.querySelector('.filter-button.active')?.getAttribute('data-filter') || 'product';
  updateProjectCounter(defaultFilter);
  
  // Gestisci il ridimensionamento della finestra per riposizionare l'indicatore
  window.addEventListener('resize', () => {
    const activeButton = document.querySelector('.filter-button.active');
    positionFilterIndicator(activeButton);
  });
}

// Funzione per aggiornare il contatore dei progetti
function updateProjectCounter(filter, visibleCount = null) {
  const projectCounter = document.querySelector('.project-counter');
  if (!projectCounter) return;
  
  const projects = document.querySelectorAll('.progetto-card');
  let count = visibleCount !== null ? visibleCount : 0;
  
  if (visibleCount === null) {
    // Calcola il numero di progetti visibili per il filtro attivo
    projects.forEach(project => {
      if (project.getAttribute('data-category') === filter) {
        count++;
      }
    });
  }
  
  // Aggiorna il testo del contatore
  const currentLang = document.documentElement.lang || 'it';
  const labelIt = `${count} progetti`;
  const labelEn = `${count} projects`;
  
  projectCounter.innerHTML = `
    <span class="lang-it">${labelIt}</span>
    <span class="lang-en">${labelEn}</span>
  `;
  
  // Mostra il contatore con animazione
  projectCounter.classList.add('visible');
}

// Funzione per filtrare i progetti
function filterProjects(filter) {
  const projects = document.querySelectorAll('.progetto-card');
  let visibleProjects = [];
  let hiddenProjects = [];
  
  // Identifica quali progetti mostrare e quali nascondere
  projects.forEach(project => {
    if (project.getAttribute('data-category') === filter) {
      visibleProjects.push(project);
    } else {
      hiddenProjects.push(project);
    }
  });
  
  // Debug: visualizza i progetti filtrati
  console.log(`Filtering by: ${filter}`);
  console.log(`Visible projects: ${visibleProjects.length}`);
  visibleProjects.forEach(p => {
    console.log(`Project in category ${p.getAttribute('data-category')}: ${p.querySelector('h3')?.textContent.trim()}`);
  });
  
  // Aggiorna il contatore
  updateProjectCounter(filter);
  
  // Nascondi prima i progetti non corrispondenti al filtro con un'animazione fluida
  hiddenProjects.forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'scale(0.95)';
    setTimeout(() => {
      project.style.display = 'none';
    }, 300);
  });
  
  // Quindi mostra i progetti che corrispondono al filtro con un'animazione staggered
  setTimeout(() => {
    visibleProjects.forEach((project, index) => {
      // Calcola in quale pagina dovrebbe apparire il progetto (2 progetti per pagina)
      const pageIndex = Math.floor(index / 2);
      
      // Ottieni o crea la pagina appropriata
      let page = document.querySelector(`.progetti-page[data-page="${pageIndex}"]`);
      if (!page) {
        // Se la pagina non esiste, creala
        page = document.createElement('div');
        page.className = 'progetti-page';
        page.setAttribute('data-page', pageIndex.toString());
        document.getElementById('progettiGrid').appendChild(page);
      }
      
      // Sposta il progetto nella pagina corretta
      page.appendChild(project);
      
      // Mostra il progetto con una transizione fluida e ritardata
      project.style.display = 'block';
      setTimeout(() => {
        project.style.opacity = '1';
        project.style.transform = 'scale(1)';
      }, 50 + index * 60); // Staggered animation
    });
    
    // Aggiorna gli indicatori di pagina
    updatePageIndicators();
    
    // Assicurati che sia mostrata la prima pagina
    showPage(0);
  }, 350);
}

// Funzione per aggiornare gli indicatori di pagina in base al numero di progetti visibili
function updatePageIndicators() {
  const visiblePages = document.querySelectorAll('.progetti-page');
  const indicatorsContainer = document.querySelector('.progetti-indicators');
  
  // Pulisci gli indicatori esistenti
  indicatorsContainer.innerHTML = '';
  
  // Crea un indicatore per ogni pagina
  visiblePages.forEach((page, index) => {
    const indicator = document.createElement('span');
    indicator.className = 'indicator' + (index === 0 ? ' active' : '');
    indicator.setAttribute('data-slide', index.toString());
    indicator.addEventListener('click', function() {
      showPage(index);
    });
    indicatorsContainer.appendChild(indicator);
  });
}

// Funzione per mostrare una pagina specifica
function showPage(pageIndex) {
  // Nascondi tutte le pagine con fade out
  const pages = document.querySelectorAll('.progetti-page');
  pages.forEach(page => {
    const isTargetPage = page.getAttribute('data-page') === pageIndex.toString();
    if (!isTargetPage && page.style.display !== 'none') {
      // Fade out animation for non-target pages
      page.style.opacity = '0';
      page.style.transform = 'scale(0.98)';
      setTimeout(() => {
        page.style.display = 'none';
      }, 300);
    }
  });
  
  // Mostra la pagina selezionata con fade in
  const selectedPage = document.querySelector(`.progetti-page[data-page="${pageIndex}"]`);
  if (selectedPage) {
    // Prima prepara la pagina
    selectedPage.style.display = 'flex';
    selectedPage.style.opacity = '0';
    selectedPage.style.transform = 'scale(0.98)';
    
    // Poi fai l'animazione per mostrarla
    setTimeout(() => {
      selectedPage.style.opacity = '1';
      selectedPage.style.transform = 'scale(1)';
      
      // Aggiungi classe animation ai progetti nella pagina per evidenziarli
      const projects = selectedPage.querySelectorAll('.progetto-card');
      projects.forEach((project, idx) => {
        project.style.animationDelay = `${idx * 0.15}s`;
        project.style.animation = 'projectAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
      });
    }, 50);
  }
  
  // Aggiorna gli indicatori con transizione fluida
  document.querySelectorAll('.progetti-indicators .indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === pageIndex);
  });
}

// Funzione per gestire la ricerca dei progetti
function setupProjectSearch() {
  const searchInput = document.getElementById('projectSearch');
  const clearButton = document.getElementById('clearSearch');
  const searchWrapper = searchInput.parentElement;
  
  if (!searchInput || !clearButton) return;
  
  // Ascolta gli input nella casella di ricerca
  searchInput.addEventListener('input', function() {
    const searchText = this.value.trim().toLowerCase();
    
    // Mostra/nascondi il pulsante di cancellazione
    if (searchText.length > 0) {
      searchWrapper.classList.add('has-text');
    } else {
      searchWrapper.classList.remove('has-text');
    }
    
    searchProjects(searchText);
  });
  
  // Gestisci il pulsante di cancellazione
  clearButton.addEventListener('click', function() {
    searchInput.value = '';
    searchWrapper.classList.remove('has-text');
    searchProjects('');
    
    // Reset alla categoria corrente
    const activeFilter = document.querySelector('.filter-button.active');
    if (activeFilter) {
      const selectedFilter = activeFilter.getAttribute('data-filter');
      filterProjects(selectedFilter);
    }
  });
}

// Funzione per cercare progetti
function searchProjects(query) {
  const projects = document.querySelectorAll('.progetto-card');
  const activeFilter = document.querySelector('.filter-button.active');
  const currentFilter = activeFilter ? activeFilter.getAttribute('data-filter') : null;
  
  if (query === '') {
    // Se la ricerca è vuota, torna al filtro attivo
    if (currentFilter) {
      filterProjects(currentFilter);
    }
    return;
  }
  
  let visibleProjects = [];
  let hiddenProjects = [];
  
  // Filtra progetti in base alla query di ricerca e al filtro attivo
  projects.forEach(project => {
    const title = project.querySelector('h3')?.textContent.toLowerCase() || '';
    const description = project.querySelector('p')?.textContent.toLowerCase() || '';
    const category = project.getAttribute('data-category');
    
    const matchesSearch = title.includes(query) || description.includes(query);
    const matchesFilter = currentFilter ? (category === currentFilter) : true;
    
    if (matchesSearch && matchesFilter) {
      visibleProjects.push(project);
      
      // Evidenzia il testo corrispondente alla ricerca
      highlightSearchMatch(project, query);
    } else {
      hiddenProjects.push(project);
      
      // Rimuovi eventuali evidenziazioni
      removeSearchHighlight(project);
    }
  });
  
  // Nascondi progetti non corrispondenti
  hiddenProjects.forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'scale(0.95)';
    setTimeout(() => {
      project.style.display = 'none';
    }, 300);
  });
  
  // Aggiorna il contatore
  updateProjectCounter(currentFilter, visibleProjects.length);
  
  // Mostra progetti corrispondenti
  setTimeout(() => {
    // Organizza i progetti in pagine
    visibleProjects.forEach((project, index) => {
      const pageIndex = Math.floor(index / 2);
      
      let page = document.querySelector(`.progetti-page[data-page="${pageIndex}"]`);
      if (!page) {
        page = document.createElement('div');
        page.className = 'progetti-page';
        page.setAttribute('data-page', pageIndex.toString());
        document.getElementById('progettiGrid').appendChild(page);
      }
      
      page.appendChild(project);
      
      project.style.display = 'block';
      setTimeout(() => {
        project.style.opacity = '1';
        project.style.transform = 'scale(1)';
      }, 50 + index * 60);
    });
    
    // Aggiorna gli indicatori di pagina
    updatePageIndicators();
    
    // Mostra la prima pagina
    showPage(0);
  }, 350);
}

// Funzione per evidenziare le corrispondenze di ricerca
function highlightSearchMatch(project, query) {
  if (!query) return;
  
  // Rimuovi prima eventuali evidenziazioni esistenti
  removeSearchHighlight(project);
  
  const titleEl = project.querySelector('h3');
  const descEl = project.querySelector('p');
  
  if (titleEl) {
    titleEl.innerHTML = highlightText(titleEl.textContent, query);
  }
  
  if (descEl) {
    descEl.innerHTML = highlightText(descEl.textContent, query);
  }
}

// Funzione per rimuovere le evidenziazioni di ricerca
function removeSearchHighlight(project) {
  const titleEl = project.querySelector('h3');
  const descEl = project.querySelector('p');
  
  if (titleEl && titleEl.querySelector('.search-match')) {
    titleEl.innerHTML = titleEl.textContent;
  }
  
  if (descEl && descEl.querySelector('.search-match')) {
    descEl.innerHTML = descEl.textContent;
  }
}

// Funzione per evidenziare il testo
function highlightText(text, query) {
  if (!query || !text) return text;
  
  const regex = new RegExp(escapeRegExp(query), 'gi');
  return text.replace(regex, match => `<span class="search-match">${match}</span>`);
}

// Funzione per escapare caratteri speciali in regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
