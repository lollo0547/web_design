// Sposta il bottone progetti-search-btn al centro della barra quando viene cliccato

document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.querySelector('.progetti-search-btn');
  const mobileBar = document.querySelector('.progetti-mobile-bar');

  if (searchBtn && mobileBar) {
    searchBtn.addEventListener('click', function() {
      if (mobileBar.classList.contains('center-search-btn')) {
        // Se il box è già aperto, "conferma" la ricerca e chiudi il box
        mobileBar.classList.remove('center-search-btn');
      } else {
        // Altrimenti apri il box e metti a fuoco l'input
        mobileBar.classList.add('center-search-btn');
        const input = mobileBar.querySelector('.progetti-search-input');
        if (input) {
          setTimeout(() => input.focus(), 350); // dopo l'animazione
        }
      }
    });
    // Chiudi il box di ricerca se si clicca fuori dal box
    document.addEventListener('click', function(e) {
      if (
        mobileBar.classList.contains('center-search-btn') &&
        !mobileBar.contains(e.target)
      ) {
        mobileBar.classList.remove('center-search-btn');
      }
    });
  }
});
