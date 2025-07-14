// Burger menu per filtri progetti su mobile

document.addEventListener('DOMContentLoaded', function() {
  const filters = [
    { key: 'all', it: 'Tutti', en: 'All' },
    { key: 'product', it: 'Product Design', en: 'Product Design' },
    { key: '3d', it: 'Modellazione 3D', en: '3D Modeling' },
    { key: 'rendering', it: 'Rendering', en: 'Rendering' },
    { key: 'prototype', it: 'Prototipazione', en: 'Prototyping' }
  ];

  const filtersContainer = document.getElementById('progettiFilters');
  if (!filtersContainer) return;

  // Crea burger menu solo su mobile
  function createBurgerFilters() {
    if (window.innerWidth > 768) {
      filtersContainer.classList.remove('mobile-burger');
      filtersContainer.innerHTML = '';
      filters.forEach(f => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.category = f.key;
        btn.innerHTML = `<span class="lang-it">${f.it}</span><span class="lang-en">${f.en}</span>`;
        filtersContainer.appendChild(btn);
      });
      return;
    }
    filtersContainer.classList.add('mobile-burger');
    filtersContainer.innerHTML = `
      <button class="burger-filters" aria-label="Apri categorie progetti">☰</button>
      <div class="burger-filters-dropdown" style="display:none;">
        ${filters.map(f => `<button class='filter-btn' data-category='${f.key}'><span class='lang-it'>${f.it}</span><span class='lang-en'>${f.en}</span></button>`).join('')}
      </div>
    `;
    const burgerBtn = filtersContainer.querySelector('.burger-filters');
    const dropdown = filtersContainer.querySelector('.burger-filters-dropdown');
    burgerBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', function(e) {
      if (dropdown.style.display === 'block' && !filtersContainer.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

  createBurgerFilters();
  window.addEventListener('resize', createBurgerFilters);
});
