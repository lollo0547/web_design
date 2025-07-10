/**
 * Project Filters
 * Aggiunge funzionalità di filtro ai progetti
 */

document.addEventListener('DOMContentLoaded', function() {
  // Crea i filtri di progetto
  createProjectFilters();
  
  // Inizializza i filtri
  initializeFilters();
});

// Funzione per creare i filtri di progetto
function createProjectFilters() {
  // Categorie di progetto - puoi personalizzarle in base ai tuoi progetti
  const categories = [
    { id: 'all', labelIt: 'Tutti', labelEn: 'All' },
    { id: '3d', labelIt: 'Modellazione 3D', labelEn: '3D Modeling' },
    { id: 'product', labelIt: 'Product Design', labelEn: 'Product Design' },
    { id: 'industrial', labelIt: 'Design Industriale', labelEn: 'Industrial Design' }
  ];
  
  // Crea il contenitore per i filtri
  const filtersHTML = `
    <div class="project-filters">
      ${categories.map(cat => `
        <button class="filter-button${cat.id === 'all' ? ' active' : ''}" data-filter="${cat.id}">
          <span class="lang-it">${cat.labelIt}</span>
          <span class="lang-en">${cat.labelEn}</span>
        </button>
      `).join('')}
    </div>
  `;
  
  // Inserisci i filtri prima della griglia dei progetti
  const projectsSection = document.querySelector('.progetti-section .section-content');
  if (projectsSection) {
    const filtersContainer = document.createElement('div');
    filtersContainer.innerHTML = filtersHTML;
    projectsSection.prepend(filtersContainer.firstElementChild);
  }
}

// Funzione per inizializzare i filtri
function initializeFilters() {
  // Aggiungi attributi data-category ai progetti esistenti (personalizza in base ai tuoi progetti)
  const projects = document.querySelectorAll('.progetto-card');
  const categories = ['3d', 'product', 'industrial'];
  
  // Assegna categorie casuali per dimostrazione
  // In un sito reale, dovresti assegnare categorie specifiche a ogni progetto
  projects.forEach((project, index) => {
    const categoryIndex = index % categories.length;
    project.setAttribute('data-category', categories[categoryIndex]);
  });
  
  // Aggiungi event listener ai pulsanti di filtro
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Rimuovi la classe active da tutti i pulsanti
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Aggiungi la classe active al pulsante cliccato
      this.classList.add('active');
      
      // Ottieni il filtro selezionato
      const selectedFilter = this.getAttribute('data-filter');
      
      // Filtra i progetti
      filterProjects(selectedFilter);
    });
  });
}

// Funzione per filtrare i progetti
function filterProjects(filter) {
  const projects = document.querySelectorAll('.progetto-card');
  
  projects.forEach(project => {
    if (filter === 'all' || project.getAttribute('data-category') === filter) {
      // Mostra il progetto con una transizione fluida
      project.style.opacity = '0';
      setTimeout(() => {
        project.style.display = 'block';
        setTimeout(() => {
          project.style.opacity = '1';
        }, 50);
      }, 300);
    } else {
      // Nascondi il progetto con una transizione fluida
      project.style.opacity = '0';
      setTimeout(() => {
        project.style.display = 'none';
      }, 300);
    }
  });
}
