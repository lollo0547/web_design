/**
 * PORTFOLIO DI LORENZO GIUDICI - ENHANCED FAQ
 * Potenziamento delle FAQ con animazioni e accessibilità
 */

class EnhancedFAQ {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.detailsElements = document.querySelectorAll('details');
    this.animationDuration = 300; // ms
    
    this.init();
  }
  
  init() {
    // Converti la struttura esistente in <details>/<summary> se necessario
    this.convertToDetailsPattern();
    
    // Aggiungi animazioni e potenziamenti
    this.enhanceDetailsElements();
    
    // Monitora i cambi lingua per aggiornare l'aria-label
    this.setupLanguageChangeListener();
  }
  
  convertToDetailsPattern() {
    // Converti solo se non sono già in formato <details>
    if (this.faqItems.length > 0 && this.detailsElements.length === 0) {
      this.faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        // Crea l'elemento details
        const details = document.createElement('details');
        details.className = 'faq-details';
        
        // Crea l'elemento summary con il contenuto della domanda
        const summary = document.createElement('summary');
        summary.className = 'faq-summary';
        summary.innerHTML = question.innerHTML;
        
        // Copia gli attributi rilevanti da question a summary
        if (question.id) {
          summary.id = question.id;
        }
        
        // Aggiungi il contenuto alla risposta
        const content = document.createElement('div');
        content.className = 'faq-content';
        content.innerHTML = answer.innerHTML;
        
        // Struttura gli elementi
        details.appendChild(summary);
        details.appendChild(content);
        
        // Sostituisci il vecchio item con il nuovo details
        item.parentNode.replaceChild(details, item);
      });
      
      // Aggiorna il riferimento agli elementi details
      this.detailsElements = document.querySelectorAll('details.faq-details');
    }
  }
  
  enhanceDetailsElements() {
    this.detailsElements.forEach(details => {
      const summary = details.querySelector('summary');
      const content = details.querySelector('.faq-content') || 
                      Array.from(details.childNodes).find(node => 
                        node.nodeType === Node.ELEMENT_NODE && 
                        node.tagName.toLowerCase() !== 'summary'
                      );
      
      if (!summary || !content) return;
      
      // Aggiungi icona per l'indicatore di espansione
      this.addExpandIcon(summary);
      
      // Migliora l'accessibilità
      this.enhanceAccessibility(details, summary);
      
      // Aggiungi animazione di apertura/chiusura
      this.addOpenCloseAnimation(details, content);
      
      // Aggiungi effetti hover
      this.addHoverEffects(details, summary);
      
      // Aggiungi gestore eventi per intercettare click
      summary.addEventListener('click', (event) => {
        // Previene il comportamento predefinito per gestire l'animazione
        event.preventDefault();
        
        // Cambia lo stato di espansione
        details.toggleAttribute('open');
        
        // Anima l'apertura o chiusura
        this.animateToggle(details, content);
      });
    });
  }
  
  addExpandIcon(summary) {
    // Crea l'icona per l'espansione
    const expandIcon = document.createElement('span');
    expandIcon.className = 'faq-expand-icon';
    expandIcon.setAttribute('aria-hidden', 'true');
    expandIcon.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="vertical" d="M10 4v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
    
    // Aggiungi l'icona al summary
    summary.appendChild(expandIcon);
  }
  
  enhanceAccessibility(details, summary) {
    // Assicurati che il summary abbia un ID
    if (!summary.id) {
      summary.id = `faq-summary-${Math.floor(Math.random() * 1000)}`;
    }
    
    // Aggiungi attributi aria appropriati
    summary.setAttribute('role', 'button');
    summary.setAttribute('aria-expanded', details.hasAttribute('open') ? 'true' : 'false');
    
    // Aggiungi supporto per tastiera
    summary.setAttribute('tabindex', '0');
    summary.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        summary.click();
      }
    });
  }
  
  addOpenCloseAnimation(details, content) {
    // Imposta l'altezza iniziale
    if (details.hasAttribute('open')) {
      content.style.height = 'auto';
      const height = content.offsetHeight;
      content.style.height = `${height}px`;
    } else {
      content.style.height = '0px';
    }
    
    // Aggiungi transizione CSS
    content.style.overflow = 'hidden';
    content.style.transition = `height ${this.animationDuration}ms ease`;
  }
  
  addHoverEffects(details, summary) {
    // Aggiungi effetto hover con JS per maggiore controllo
    summary.addEventListener('mouseenter', () => {
      summary.style.transform = 'translateX(5px)';
    });
    
    summary.addEventListener('mouseleave', () => {
      summary.style.transform = 'translateX(0)';
    });
    
    // Effetto focus
    summary.addEventListener('focus', () => {
      details.classList.add('focused');
    });
    
    summary.addEventListener('blur', () => {
      details.classList.remove('focused');
    });
  }
  
  animateToggle(details, content) {
    const isOpen = details.hasAttribute('open');
    const summary = details.querySelector('summary');
    
    // Aggiorna stato aria-expanded
    if (summary) {
      summary.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    
    // Anima l'apertura/chiusura
    if (isOpen) {
      // Espandi
      requestAnimationFrame(() => {
        content.style.height = 'auto';
        const height = content.offsetHeight;
        content.style.height = '0px';
        
        // Trigger reflow
        content.offsetHeight;
        
        content.style.height = `${height}px`;
        
        // Quando l'animazione è completa, imposta height a auto
        setTimeout(() => {
          content.style.height = 'auto';
        }, this.animationDuration);
      });
      
      // Aggiungi la classe per lo stile espanso
      details.classList.add('expanded');
    } else {
      // Riduci
      const height = content.offsetHeight;
      content.style.height = `${height}px`;
      
      // Trigger reflow
      content.offsetHeight;
      
      content.style.height = '0px';
      
      // Rimuovi la classe per lo stile espanso
      details.classList.remove('expanded');
      
      // Rimuovi l'attributo open dopo l'animazione
      setTimeout(() => {
        if (!details.hasAttribute('open')) {
          details.removeAttribute('open');
        }
      }, this.animationDuration);
    }
  }
  
  setupLanguageChangeListener() {
    // Ascolta i cambi di lingua
    window.addEventListener('languageChanged', (event) => {
      const lang = event.detail.language;
      
      // Aggiorna gli attributi aria-label per le FAQ
      this.detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        if (summary) {
          const labelKey = lang === 'it' ? 'aria-label' : 'aria-label-en';
          if (summary.hasAttribute(labelKey)) {
            summary.setAttribute('aria-label', summary.getAttribute(labelKey));
          }
        }
      });
    });
  }
}

// Inizializza le FAQ potenziate quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
  new EnhancedFAQ();
});
