/**
 * Language Switcher Functionality
 * Permette all'utente di passare da italiano a inglese
 */

document.addEventListener('DOMContentLoaded', function() {
  // Crea il selettore di lingua
  createLanguageSwitcher();
  
  // Applica la lingua salvata o predefinita
  applyLanguage();
});

// Funzione per creare il selettore di lingua
function createLanguageSwitcher() {
  // Crea l'elemento HTML per il language switcher
  const languageSwitcherHTML = `
    <div class="language-switch-wrapper">
      <button class="language-button" data-lang="it">IT</button>
      <span class="language-divider">|</span>
      <button class="language-button" data-lang="en">EN</button>
    </div>
  `;
  // Inserisci il language switcher SOLO nel footer
  const footerLanguageSwitcher = document.getElementById('footer-language-switcher');
  if (footerLanguageSwitcher) {
    footerLanguageSwitcher.innerHTML = languageSwitcherHTML;
  }
  
  // Aggiungi event listener ai pulsanti
  const languageButtons = document.querySelectorAll('.language-button');
  languageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      switchLanguage(lang);
      
      // Aggiorna lo stato attivo dei pulsanti
      languageButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}

// Funzione per cambiare lingua
function switchLanguage(lang) {
  // Aggiorna il placeholder della newsletter
  const newsletterField = document.querySelector('.subscribe-input[data-placeholder-it][data-placeholder-en]');
  if (newsletterField) {
    if (lang === 'it') {
      newsletterField.setAttribute('placeholder', newsletterField.getAttribute('data-placeholder-it'));
    } else {
      newsletterField.setAttribute('placeholder', newsletterField.getAttribute('data-placeholder-en'));
    }
  }
  // FAQ: mostra/nascondi la categoria "Tutte" in base alla lingua
  var faqAllIt = document.querySelector('.faq-categories .faq-category:not(:has(.lang-en))');
  var faqAllEn = document.querySelector('.faq-categories .faq-category:has(.lang-en)');
  if (faqAllIt && faqAllEn) {
    if (lang === 'it') {
      faqAllIt.style.display = '';
      faqAllEn.style.display = '';
    } else {
      faqAllIt.style.display = 'none';
      faqAllEn.style.display = '';
    }
  }
  // Salva la lingua scelta nel localStorage
  localStorage.setItem('language', lang);

  // Nascondi tutti gli elementi della lingua non selezionata
  const itElements = document.querySelectorAll('.lang-it');
  const enElements = document.querySelectorAll('.lang-en');

  if (lang === 'it') {
    itElements.forEach(el => el.style.display = 'inline-block');
    enElements.forEach(el => el.style.display = 'none');
  } else {
    itElements.forEach(el => el.style.display = 'none');
    enElements.forEach(el => el.style.display = 'inline-block');
  }

  // Aggiorna i placeholder dei campi della sezione contatti
  const contactFields = document.querySelectorAll('#contact-form [data-placeholder-it][data-placeholder-en]');
  contactFields.forEach(field => {
    if (lang === 'it') {
      field.setAttribute('placeholder', field.getAttribute('data-placeholder-it'));
    } else {
      field.setAttribute('placeholder', field.getAttribute('data-placeholder-en'));
    }
  });

  // Aggiorna l'attributo lang dell'HTML
  document.documentElement.setAttribute('lang', lang);

  // Aggiorna il titolo della pagina in base alla lingua
  updatePageTitle(lang);
}

// Funzione per applicare la lingua salvata o predefinita
function applyLanguage() {
  const savedLanguage = localStorage.getItem('language') || 'it';
  switchLanguage(savedLanguage);
  
  // Attiva il pulsante della lingua corrente
  const activeButton = document.querySelector(`.language-button[data-lang="${savedLanguage}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Funzione per aggiornare il titolo della pagina in base alla lingua
function updatePageTitle(lang) {
  if (lang === 'it') {
    document.title = 'Lorenzo Giudici | Product Designer - Portfolio professionale';
  } else {
    document.title = 'Lorenzo Giudici | Product Designer - Professional Portfolio';
  }
}
