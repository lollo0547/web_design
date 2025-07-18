// Mostra la sezione prototipazione solo se ?img=1
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('img') === '1') {
    var protosection = document.getElementById('prototipazione');
    if (protosection) protosection.style.display = '';
  }
});
// Mostra un nuovo bottone nella navbar che porta alla sezione "prototipazione" se l'URL contiene ?img=1
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('img') === '1') {
    const navbar = document.getElementById('main-nav');
    if (navbar) {
      // Trova il nodo dopo "progetti" (secondo li)
      const items = navbar.querySelectorAll('li');
      let insertAfter = null;
      if (items.length > 1) insertAfter = items[1];
      const li = document.createElement('li');
      li.role = 'none';
      const a = document.createElement('a');
      a.href = '#prototipazione';
      a.role = 'menuitem';
      a.title = 'Vai alla sezione Prototipazione';
      a.className = 'soccorso-alpino-btn';
      a.innerHTML = '<span class="lang-it">Prototipazione</span><span class="lang-en">Prototyping</span>';
      li.appendChild(a);
      if (insertAfter && insertAfter.nextSibling) {
        navbar.insertBefore(li, insertAfter.nextSibling);
      } else {
        navbar.appendChild(li);
      }
    }
  }
});
