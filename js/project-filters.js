// File vuoto: tutte le funzioni legacy di filtri, indicatori e pagine sono state rimosse.
// Questo file non inietta più alcuna barra filtri o markup duplicato.

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
