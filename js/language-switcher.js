/**
 * PORTFOLIO DI LORENZO GIUDICI - LANGUAGE SWITCHER
 * Gestore del cambio lingua fluido senza reload della pagina
 */

class LanguageSwitcher {
  constructor() {
    this.currentLang = 'it';
    this.supportedLangs = ['it', 'en'];
    this.langButtons = document.querySelectorAll('.lang-btn');
    this.elementsWithTranslation = document.querySelectorAll('[data-lang-it], [data-lang-en], .lang-it, .lang-en');
    
    // Eventi che scatenano un aggiornamento delle traduzioni
    this.events = ['DOMContentLoaded', 'load', 'languagechange'];
    
    // Attributi tradotti
    this.translatableAttrs = ['aria-label', 'placeholder', 'title'];
    
    // Testo per i lettori di schermo
    this.a11yMessages = {
      switchedTo: {
        it: 'Lingua cambiata in italiano',
        en: 'Language changed to English'
      }
    };
    
    this.init();
  }
  
  init() {
    // Imposta la lingua iniziale dal localStorage o dal browser
    this.setInitialLanguage();
    
    // Aggiungi event listeners ai pulsanti lingua
    this.setupLanguageButtons();
    
    // Aggiungi event listeners agli eventi
    this.setupEvents();
    
    // Crea un elemento per le notifiche di accessibilità
    this.createA11yAnnouncer();
  }
  
  setInitialLanguage() {
    // Controlla se c'è una lingua salvata nel localStorage
    const savedLang = localStorage.getItem('portfolio-lang');
    
    if (savedLang && this.supportedLangs.includes(savedLang)) {
      this.currentLang = savedLang;
    } else {
      // Altrimenti prova a utilizzare la lingua del browser
      const browserLang = navigator.language || navigator.userLanguage;
      const langPrefix = browserLang.split('-')[0].toLowerCase();
      
      if (this.supportedLangs.includes(langPrefix)) {
        this.currentLang = langPrefix;
      }
    }
    
    // Applica la lingua iniziale
    this.applyLanguage(this.currentLang, false);
  }
  
  setupLanguageButtons() {
    this.langButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetLang = button.getAttribute('data-lang');
        
        if (targetLang !== this.currentLang) {
          this.switchLanguage(targetLang);
        }
      });
    });
  }
  
  setupEvents() {
    this.events.forEach(eventName => {
      window.addEventListener(eventName, () => {
        this.updateLanguageContent();
      });
    });
  }
  
  createA11yAnnouncer() {
    // Crea un elemento per le notifiche di accessibilità
    this.a11yAnnouncer = document.createElement('div');
    this.a11yAnnouncer.setAttribute('role', 'status');
    this.a11yAnnouncer.setAttribute('aria-live', 'polite');
    this.a11yAnnouncer.className = 'sr-only';
    document.body.appendChild(this.a11yAnnouncer);
  }
  
  switchLanguage(lang) {
    if (!this.supportedLangs.includes(lang) || lang === this.currentLang) return;
    
    // Aggiorna la lingua corrente
    this.currentLang = lang;
    
    // Salva la preferenza nel localStorage
    localStorage.setItem('portfolio-lang', lang);
    
    // Applica la lingua
    this.applyLanguage(lang, true);
    
    // Notifica i lettori di schermo
    this.announceLanguageChange(lang);
  }
  
  applyLanguage(lang, animate = true) {
    // Aggiorna i pulsanti lingua
    this.updateLanguageButtons(lang);
    
    // Aggiorna i contenuti
    this.updateLanguageContent(lang, animate);
    
    // Aggiorna attributi tradotti
    this.updateTranslatableAttributes(lang);
    
    // Aggiorna la direzione del testo (per supportare lingue RTL in futuro)
    document.documentElement.lang = lang;
    
    // Pubblica un evento personalizzato
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  }
  
  updateLanguageButtons(lang) {
    this.langButtons.forEach(button => {
      const buttonLang = button.getAttribute('data-lang');
      
      if (buttonLang === lang) {
        button.setAttribute('aria-current', 'true');
        button.setAttribute('aria-pressed', 'true');
      } else {
        button.removeAttribute('aria-current');
        button.setAttribute('aria-pressed', 'false');
      }
    });
  }
  
  updateLanguageContent(lang = this.currentLang, animate = true) {
    // Cache degli elementi trovati durante la scansione del DOM
    const elements = [];
    const animationDuration = 300; // ms
    
    // Trova tutti gli elementi con classi .lang-* o attributi data-lang-*
    document.querySelectorAll('[class*="lang-"], [data-lang-it], [data-lang-en]').forEach(element => {
      // Controlla classi lang-*
      let hasLangClass = false;
      this.supportedLangs.forEach(langCode => {
        if (element.classList.contains(`lang-${langCode}`)) {
          hasLangClass = true;
          elements.push({ element, type: 'class', lang: langCode });
        }
      });
      
      // Controlla attributi data-lang-*
      this.supportedLangs.forEach(langCode => {
        if (element.hasAttribute(`data-lang-${langCode}`)) {
          elements.push({ element, type: 'attr', lang: langCode });
        }
      });
    });
    
    if (animate) {
      // Applica animazione di fade-out
      elements.forEach(item => {
        const { element, type, lang } = item;
        
        if (type === 'class') {
          // Per elementi con classi .lang-*
          if (lang === this.currentLang) {
            // Mostra con animazione
            element.style.opacity = '0';
            element.style.display = '';
            setTimeout(() => {
              element.style.transition = `opacity ${animationDuration}ms ease`;
              element.style.opacity = '1';
            }, 0);
          } else {
            // Nascondi con animazione
            element.style.transition = `opacity ${animationDuration}ms ease`;
            element.style.opacity = '0';
            setTimeout(() => {
              element.style.display = 'none';
            }, animationDuration);
          }
        } else if (type === 'attr') {
          // Per elementi con attributi data-lang-*
          if (lang === this.currentLang) {
            // Salva l'attributo originale se necessario
            if (!element.hasAttribute('data-original-content')) {
              element.setAttribute('data-original-content', element.textContent);
            }
            
            // Applica la traduzione con animazione
            const newContent = element.getAttribute(`data-lang-${lang}`);
            element.style.opacity = '0';
            setTimeout(() => {
              element.textContent = newContent;
              element.style.transition = `opacity ${animationDuration}ms ease`;
              element.style.opacity = '1';
            }, animationDuration);
          }
        }
      });
    } else {
      // Applica cambiamenti senza animazione
      elements.forEach(item => {
        const { element, type, lang } = item;
        
        if (type === 'class') {
          // Per elementi con classi .lang-*
          if (lang === this.currentLang) {
            element.style.display = '';
          } else {
            element.style.display = 'none';
          }
        } else if (type === 'attr') {
          // Per elementi con attributi data-lang-*
          if (lang === this.currentLang) {
            const newContent = element.getAttribute(`data-lang-${lang}`);
            element.textContent = newContent;
          }
        }
      });
    }
  }
  
  updateTranslatableAttributes(lang = this.currentLang) {
    this.translatableAttrs.forEach(attr => {
      const selector = `[${attr}-${lang}]`;
      document.querySelectorAll(selector).forEach(element => {
        const translatedValue = element.getAttribute(`${attr}-${lang}`);
        if (translatedValue) {
          element.setAttribute(attr, translatedValue);
        }
      });
    });
  }
  
  announceLanguageChange(lang) {
    if (this.a11yAnnouncer) {
      this.a11yAnnouncer.textContent = this.a11yMessages.switchedTo[lang];
    }
  }
}

// Inizializza il cambio lingua quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
  window.languageSwitcher = new LanguageSwitcher();
});
