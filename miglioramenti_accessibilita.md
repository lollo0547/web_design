# Miglioramenti per l'Accessibilità

Per migliorare l'accessibilità del tuo sito web, ti consiglio di applicare le seguenti modifiche:

## 1. Aggiungi attributi ARIA al form di contatto

```html
<form id="contact-form" class="contact-form" aria-labelledby="form-title">
  <div class="form-header">
    <h3 class="form-title" id="form-title">
      <span class="lang-it">Inviami un messaggio</span>
      <span class="lang-en">Send me a message</span>
    </h3>
  </div>
```

## 2. Migliora l'accessibilità dei campi del form

```html
<div class="form-group">
  <input type="text" id="name" name="name" required aria-required="true">
  <label for="name">
    <span class="lang-it">Nome</span>
    <span class="lang-en">Name</span>
  </label>
  <div class="form-error-message" id="name-error" aria-live="polite"></div>
</div>
```

## 3. Migliora il contrasto del testo

Assicurati che tutti i testi abbiano un contrasto sufficiente con lo sfondo secondo le linee guida WCAG 2.1 (rapporto di contrasto minimo di 4.5:1 per testo normale e 3:1 per testo grande).

## 4. Aggiungi skip links per la navigazione da tastiera

Aggiungi all'inizio della pagina:

```html
<a href="#main-content" class="skip-link">
  <span class="lang-it">Salta al contenuto principale</span>
  <span class="lang-en">Skip to main content</span>
</a>
```

Con il relativo CSS:

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background-color: var(--accent-color);
  color: white;
  z-index: var(--z-modal);
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}
```

## 5. Assicurati che tutti gli elementi interattivi siano navigabili da tastiera

Verifica che tutti i pulsanti, link e controlli interattivi possano essere raggiunti e attivati usando solo la tastiera (tasto Tab e Invio/Spazio).

## 6. Aggiungi testo alternativo significativo a tutte le immagini

```html
<img src="immagini/webp/progetto 1/tazzina_.webp" loading="lazy" alt="Tazzina in ceramica bianca, vista frontale con dettaglio del manico ergonomico" class="project-image">
```

## 7. Assicurati che i messaggi di errore dei form siano accessibili

```html
<div class="form-error-message" id="email-error" aria-live="polite"></div>
```
