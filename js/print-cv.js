/**
 * Print CV functionality
 * Permette di stampare un CV semplificato dalle informazioni del portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
  // Aggiungi il pulsante per stampare il CV
  addPrintButton();
  
  // Prepara gli elementi nascosti per la stampa
  createPrintElements();
});

// Funzione per aggiungere il pulsante di stampa
function addPrintButton() {
  const printButtonHTML = `
    <a href="#" class="btn btn-outline print-cv-button" id="printCV">
      <span class="lang-it">Stampa CV</span>
      <span class="lang-en">Print Resume</span>
      <i class="print-icon">🖨️</i>
    </a>
  `;
  
  // Trova il container CTA nella sezione Chi sono
  const ctaContainer = document.querySelector('.chi-sono-section .cta-container');
  if (ctaContainer) {
    ctaContainer.insertAdjacentHTML('beforeend', printButtonHTML);
    
    // Aggiungi event listener al pulsante
    document.getElementById('printCV').addEventListener('click', function(e) {
      e.preventDefault();
      preparePrint();
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }
}

// Funzione per creare elementi nascosti per la stampa
function createPrintElements() {
  // Crea l'header per la stampa
  const printHeaderHTML = `
    <div class="print-header" style="display: none;">
      <div>
        <h1>Lorenzo Giudici</h1>
        <p>Product Designer</p>
      </div>
      <div class="print-date"></div>
    </div>
  `;
  
  // Crea il footer per la stampa
  const printFooterHTML = `
    <div class="print-footer" style="display: none;">
      <p>Questo CV è stato generato da lorenzogiudici.com - ${new Date().toLocaleDateString()}</p>
    </div>
  `;
  
  // Crea info di contatto per la stampa
  const printContactHTML = `
    <div class="print-contact-info" style="display: none;">
      <a href="mailto:contatto@lorenzogiudici.com">contatto@lorenzogiudici.com</a>
      <a href="tel:+39XXXXXXXXXX">+39 XXX XXX XXXX</a>
      <a href="https://lorenzogiudici.com">lorenzogiudici.com</a>
    </div>
  `;
  
  // Aggiungi gli elementi al DOM
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.insertAdjacentHTML('afterbegin', printHeaderHTML);
    mainContent.insertAdjacentHTML('beforeend', printFooterHTML);
    
    // Aggiungi le info di contatto dopo il titolo nella sezione Chi sono
    const bioContent = document.querySelector('.bio-content');
    if (bioContent) {
      bioContent.insertAdjacentHTML('afterbegin', printContactHTML);
    }
  }
}

// Funzione per preparare il documento per la stampa
function preparePrint() {
  // Aggiorna la data nel footer di stampa
  const printDate = document.querySelector('.print-date');
  if (printDate) {
    const today = new Date();
    printDate.textContent = today.toLocaleDateString();
  }
  
  // Eventuali altre modifiche prima della stampa
  document.body.classList.add('printing');
  
  // Ripristina dopo la stampa
  window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
  });
}
