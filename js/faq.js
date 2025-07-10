/**
 * FAQ Section Interactions
 * Gestisce le interazioni della sezione FAQ
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inizializza gli accordion
  initAccordion();
  
  // Inizializza la ricerca nelle FAQ
  initFaqSearch();
  
  // Inizializza il filtro per categorie
  initFaqCategories();
});

// Funzione per gestire gli accordion
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      // Toggle aria-expanded
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle classe active sull'item parent
      const accordionItem = this.parentElement;
      
      if (!isExpanded) {
        // Se stiamo espandendo questo elemento, prima chiudiamo tutti gli altri
        document.querySelectorAll('.accordion-item.active').forEach(item => {
          if (item !== accordionItem) {
            item.classList.remove('active');
            const header = item.querySelector('.accordion-header');
            header.setAttribute('aria-expanded', 'false');
          }
        });
      }
      
      // Toggle della classe active per l'elemento corrente
      accordionItem.classList.toggle('active');
      
      // Animazione smooth
      const content = this.nextElementSibling;
      
      // Effetto di highlight all'apertura
      if (!isExpanded) {
        accordionItem.style.backgroundColor = 'rgba(76, 29, 115, 0.05)';
        setTimeout(() => {
          accordionItem.style.backgroundColor = '';
        }, 400);
      }
    });
  });
}

// Funzione per la ricerca nelle FAQ
function initFaqSearch() {
  const searchInput = document.querySelector('.faq-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      const accordionItems = document.querySelectorAll('.accordion-item');
      const noResultsMessage = document.querySelector('.no-results-message');
      
      let hasResults = false;
      
      accordionItems.forEach(item => {
        const question = item.querySelector('.accordion-header span').textContent.toLowerCase();
        const answer = item.querySelector('.accordion-content p').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm) || searchTerm === '') {
          item.style.display = '';
          hasResults = true;
        } else {
          item.style.display = 'none';
        }
      });
      
      // Mostra o nasconde il messaggio "nessun risultato"
      if (noResultsMessage) {
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
      }
    });
  }
}

// Funzione per il filtro per categorie
function initFaqCategories() {
  const categoryButtons = document.querySelectorAll('.faq-category');
  
  if (categoryButtons.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Rimuovi la classe active da tutti i bottoni
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Aggiungi la classe active a questo bottone
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}
