document.addEventListener("DOMContentLoaded", () => {
  // Modal e dati progetti
  const projects = document.querySelectorAll(".project");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" tabindex="0" aria-label="Chiudi">&times;</span>
      <div class="modal-left">
        <h1 class="modal-title"></h1>
        <p class="modal-details"></p>
        <div class="modal-icons"></div>
      </div>
      <div class="modal-right">
        <div class="slider">
          <div class="slider-pages">
            <img class="slider-page" src="" alt="Slider Page 1">
            <img class="slider-page" src="" alt="Slider Page 2">
            <img class="slider-page" src="" alt="Slider Page 3">
          </div>
          <div class="slider-overlay"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector(".modal-title");
  const modalDetails = modal.querySelector(".modal-details");
  const modalIcons = modal.querySelector(".modal-icons");
  const sliderPages = modal.querySelectorAll(".slider-page");
  const sliderOverlay = modal.querySelector(".slider-overlay");
  const closeModal = modal.querySelector(".close");

  const projectData = {
    "Set da caffè": {
      enKey: "Coffee set",
      sliderImages: [
        "/immagini/progetto 1/all 22.png",
        "/immagini/progetto 1/tazzina_.png",
        "/immagini/progetto 1/zuccheriera 2_.png"
      ],
      sliderTitles: [
        "Set da caffè - ambientato",
        "Set da caffè - tazzina",
        "Set da caffè - zuccheriera",
      ],
      details: "Durata: 1 mese<br>Anno: 2022<br>Descrizione:Il progetto propone una reinterpretazione contemporanea del classico set da caffè, composto da tazzina, zuccheriera e piattino. L’approccio progettuale unisce estetica e funzionalità, con particolare attenzione alla coerenza formale e alla scelta dei materiali. Le forme si ispirano all’architettura di Shigeru Ban e Renzo Piano, e al design fluido delle lampade parametriche, generando un linguaggio visivo fatto di trasparenze, volumi armonici e superfici sofisticate.",
      details_en: "Duration: 1 month<br>Year: 2022<br>Description: The project offers a contemporary reinterpretation of the classic coffee set, consisting of cup, sugar bowl and saucer. The design approach combines aesthetics and functionality, with particular attention to formal consistency and material selection. The shapes are inspired by the architecture of Shigeru Ban and Renzo Piano, and by the fluid design of parametric lamps, generating a visual language made of transparencies, harmonious volumes and sophisticated surfaces.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-solidworks-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "La cardanica": {
      enKey: "The Cardanica",
      sliderImages: [
        "/immagini/progetto 2/cardanica 600.jpeg",
        "/immagini/progetto 2/cardanica 900.jpeg",
        "/immagini/progetto 2/cardanica.jpeg"
      ],
      sliderTitles: [
        "Cardanica - 600",
        "Cardanica - 900",
        "Cardanica - 1200"
      ],
      details: "Durata: 2 mesi<br>Anno: 2023<br>Descrizione: “La Cardanica” è un progetto concettuale ispirato al principio del blocco cardanico (gimbal lock), esplorato attraverso una serie di oggetti-scultura che traducono il movimento meccanico in gesto espressivo. Ispirata dallo Ski Sipping Stabilizer di Unnecessary Inventions, l’idea è stata rielaborata in chiave tecnica e poetica, con richiami a sistemi di illuminazione a binario, dimerabilità e guarnizioni con setole. Il progetto indaga equilibrio, instabilità e relazione tra forma e funzione con un approccio sperimentale e dinamico.",
      details_en: "Duration: 2 months<br>Year: 2023<br>Description: “The Cardanica” is a conceptual project inspired by the principle of gimbal lock, explored through a series of object-sculptures that translate mechanical movement into expressive gesture. Inspired by the Ski Sipping Stabilizer by Unnecessary Inventions, the idea was reworked in a technical and poetic way, with references to track lighting systems, dimmability and bristle seals. The project investigates balance, instability and the relationship between form and function with an experimental and dynamic approach.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-solidworks-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "Poltroncina lounge per Milani": {
      enKey: "Lounge chair for Milani",
      sliderImages: [
        "/immagini/progetto 3/untitled555.png",
        "/immagini/progetto 3/untitled202.png",
        "/immagini/progetto 3/untitled702.png"
      ],
      sliderTitles: [
        "Poltroncina lounge per Milani - ambientato",
        "Poltroncina lounge per Milani - particolare 1",
        "Poltroncina lounge per Milani - particolare 2"
      ],
      details: "Durata: 3 mesi<br>Anno: 2024<br>Descrizione: Progetto sviluppato per il brand SM-Milani, specializzato in arredi di design per casa e ufficio. La poltroncina lounge è pensata per unire comfort ed eleganza con una struttura essenziale ma accogliente. Il concept prende ispirazione dal design contemporaneo e minimalista, con particolare attenzione all'equilibrio tra pieni e vuoti e all’ergonomia. La forma accogliente e la scelta dei materiali puntano a creare un oggetto versatile, adatto a spazi professionali e domestici.",
      details_en: "Duration: 3 months<br>Year: 2024<br>Description: Project developed for the SM-Milani brand, specialized in designer furniture for home and office. The lounge chair is designed to combine comfort and elegance with an essential yet welcoming structure. The concept is inspired by contemporary and minimalist design, with particular attention to the balance between solids and voids and ergonomics. The welcoming shape and choice of materials aim to create a versatile object, suitable for professional and domestic spaces.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "mouse": {
      enKey: "mouse",
      sliderImages: [
        "/immagini/progetto 4/untitled44.png",
        "/immagini/progetto 4/untitled33.png",
        "/immagini/progetto 4/untitled.png"
      ],
      sliderTitles: [
        "mouse - ambientato",
        "mouse - particolare 1",
        "mouse - particolare 2",
      ],
      details: "Durata: 2 mesi<br>Anno: 2023<br>Descrizione: Il progetto nasce dalla volontà di ripensare il mouse come oggetto quotidiano dal forte impatto ergonomico ed estetico. Ispirato a forme morbide e organiche, il design privilegia la funzionalità e la semplicità d’uso, con particolare attenzione all’ergonomia del palmo e al posizionamento dei tasti. Il risultato è un oggetto compatto e bilanciato, in grado di integrarsi visivamente in ambienti professionali o creativi senza rinunciare alla personalità.",
      details_en: "Duration: 2 months<br>Year: 2023<br>Description: The project was born from the desire to rethink the mouse as an everyday object with a strong ergonomic and aesthetic impact. Inspired by soft and organic shapes, the design favors functionality and ease of use, with particular attention to palm ergonomics and button placement. The result is a compact and balanced object, able to visually integrate into professional or creative environments without sacrificing personality.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    }
  };

  // Helper to get project key by current language and h3 text
  function getProjectKeyByTitle(title) {
    for (const key in projectData) {
      if (title === key) return key;
      if (title === projectData[key].enKey) return key;
    }
    return title;
  }

  let currentSlide = 0;
  let autoplayInterval;
  let isAutoplaying = true;

  function startAutoplay(projectKey, lang) {
    stopAutoplay();
    const data = projectData[projectKey];
    autoplayInterval = setInterval(() => {
      sliderPages[currentSlide].style.display = "none";
      currentSlide = (currentSlide + 1) % sliderPages.length;
      sliderPages[currentSlide].style.display = "block";
      if (data && data.sliderTitles) {
        if (lang === 'en' && data.sliderTitles_en) {
          modalTitle.textContent = data.sliderTitles_en[currentSlide];
        } else {
          modalTitle.textContent = data.sliderTitles[currentSlide];
        }
      }
    }, 2500);
    isAutoplaying = true;
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    isAutoplaying = false;
  }

  function showOverlayIcon(icon) {
    sliderOverlay.textContent = icon;
    sliderOverlay.style.opacity = "1";
    setTimeout(() => {
      sliderOverlay.style.opacity = "0";
    }, 500);
  }

  projects.forEach((project) => {
    project.addEventListener("click", () => {
      // Prendi titolo visibile (in lingua attiva)
      const lang = document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
      const h3 = project.querySelector("h3");
      let projectTitle = h3.querySelector('.lang-it')?.textContent.trim();
      if (lang === 'en') {
        projectTitle = h3.querySelector('.lang-en')?.textContent.trim();
      }
      const key = getProjectKeyByTitle(projectTitle);
      const data = projectData[key];
      if (data) {
        // Titolo slide
        if (data.sliderTitles) {
          modalTitle.textContent = lang === 'en'
            ? (data.sliderTitles_en ? data.sliderTitles_en[0] : data.sliderTitles[0])
            : data.sliderTitles[0];
        } else {
          modalTitle.textContent = projectTitle;
        }
        // Dettagli
        modalDetails.innerHTML = lang === 'en' && data.details_en ? data.details_en : data.details;
        modalIcons.innerHTML = data.icons
          .map((icon) => `<img src="${icon}" alt="Icona">`)
          .join("");
        if (data.sliderImages) {
          sliderPages.forEach((page, index) => {
            page.src = data.sliderImages[index] || "";
            page.style.display = index === 0 ? "block" : "none";
          });
          currentSlide = 0;
          modal.querySelector(".slider").style.display = "block";
          startAutoplay(key, lang);
        } else {
          modal.querySelector(".slider").style.display = "none";
        }
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
        lastFocusedElement = document.activeElement;
        // Set initial focus to close button for accessibility
        closeModal.focus();
      }
    });
    // Accessibilità: apri modale anche con Invio/Spazio
    project.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        project.click();
      }
    });
  });

  // Trap focus inside modal when open
  modal.addEventListener("keydown", (e) => {
    if (modal.style.display !== "flex") return;
    const focusable = modal.querySelectorAll('button, [tabindex="0"], a, input, textarea, select');
    const focusableArr = Array.prototype.slice.call(focusable);
    const first = focusableArr[0];
    const last = focusableArr[focusableArr.length - 1];
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    // ESC per chiudere la modale
    if (e.key === "Escape") {
      closeModal.click();
    }
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    stopAutoplay();
    // Ritorna il focus all’elemento che aveva il focus prima della modale
    if (lastFocusedElement) lastFocusedElement.focus();
  });
  closeModal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeModal.click();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
      stopAutoplay();
      if (lastFocusedElement) lastFocusedElement.focus();
    }
  });

  // Slider: accessibilità per click/tastiera
  const slides = document.querySelectorAll(".project-slideshow .slide");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");
  let slideshowCurrentSlide = 0;

  prevButton.setAttribute("tabindex", "0");
  nextButton.setAttribute("tabindex", "0");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  prevButton.addEventListener("click", () => {
    slideshowCurrentSlide = (slideshowCurrentSlide - 1 + slides.length) % slides.length;
    showSlide(slideshowCurrentSlide);
  });
  nextButton.addEventListener("click", () => {
    slideshowCurrentSlide = (slideshowCurrentSlide + 1) % slides.length;
    showSlide(slideshowCurrentSlide);
  });

  prevButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      prevButton.click();
    }
  });
  nextButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      nextButton.click();
    }
  });

  // Mostra la slide iniziale all'avvio
  showSlide(slideshowCurrentSlide);

  // FAQ: accessibilità tastiera
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Timeline dropdown: accessibilità tastiera
  document.querySelectorAll('#timeline-filter-dropdown .timeline-filter-option, #close-timeline-btn').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Timeline toggle button: accessibilità tastiera
  const timelineToggleBtn = document.getElementById('toggle-timeline-btn');
  if (timelineToggleBtn) {
    timelineToggleBtn.setAttribute('tabindex', '0');
    timelineToggleBtn.addEventListener('keydown', function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        timelineToggleBtn.click();
      }
    });
  }

  // Reveal on scroll per le sezioni principali
  const revealSections = document.querySelectorAll('main > section, #timeline-container, #faq');
  revealSections.forEach(section => {
    section.classList.add('reveal-on-scroll');
  });
  function revealOnScroll() {
    revealSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        section.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('DOMContentLoaded', revealOnScroll);
  revealOnScroll();

  // Pulsante "Torna su": aggiungi classe show per animazione
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.style.display = 'none';
      backToTopBtn.classList.remove('show');
    }
  });
  // Rendi funzionante il click sul bottone "Torna su"
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Timeline toggle + filtro (nuovo comportamento dropdown)
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('toggle-timeline-btn');
  const timelineContainer = document.getElementById('timeline-container');
  const filterDropdown = document.getElementById('timeline-filter-dropdown');
  const filterOptions = filterDropdown ? filterDropdown.querySelectorAll('.timeline-filter-option') : [];
  const selectedLabel = document.getElementById('timeline-selected-label');
  const timelineBlocks = document.querySelectorAll('.timeline-block');
  let isDropdownOpen = false;

  function getBlockType(block) {
    const img = block.querySelector('.timeline-dot img');
    if (!img) return '';
    const src = img.getAttribute('src') || '';
    if (src.includes('icons8-diploma-50.png')) return 'Diplomi';
    if (src.includes('icons8-pergamena-di-laurea-50.png')) return 'Certificazioni';
    return '';
  }

  function showTimeline(show) {
    timelineContainer.style.display = show ? 'block' : 'none';
    btn.setAttribute('aria-expanded', show && isDropdownOpen ? 'true' : 'false');
    if (selectedLabel) selectedLabel.style.display = show ? 'inline' : 'none';
    filterDropdown.style.display = (show && isDropdownOpen) ? 'block' : 'none';
  }

  function applyTimelineFilter(value) {
    timelineBlocks.forEach(block => {
      const type = getBlockType(block);
      block.style.display = (type === value) ? '' : 'none';
    });
    if (selectedLabel) selectedLabel.textContent = value;
    filterOptions.forEach(opt => {
      opt.style.fontWeight = (opt.dataset.value === value) ? 'bold' : 'normal';
      opt.style.background = (opt.dataset.value === value) ? '#f0f4ff' : 'none';
      opt.setAttribute('aria-selected', opt.dataset.value === value ? 'true' : 'false');
    });
  }

  const closeTimelineBtn = document.getElementById('close-timeline-btn');

  if (btn && timelineContainer && filterDropdown) {
    // Stato iniziale
    isDropdownOpen = false;
    showTimeline(false);
    applyTimelineFilter('Certificazioni');
    filterDropdown.style.display = 'none';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // Se la timeline è chiusa, apri timeline e dropdown
      if (timelineContainer.style.display === 'none' || timelineContainer.style.display === '') {
        isDropdownOpen = true;
        showTimeline(true);
      } else {
        // Se la timeline è aperta, alterna la visibilità del dropdown
        isDropdownOpen = !isDropdownOpen;
        showTimeline(true);
      }
    });

    filterOptions.forEach(opt => {
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        applyTimelineFilter(this.dataset.value);
        // Il dropdown resta visibile dopo la selezione
      });
    });

    // Bottone "Nascondi percorso studi"
    if (closeTimelineBtn) {
      closeTimelineBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isDropdownOpen = false;
        timelineContainer.style.display = 'none';
        filterDropdown.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
        if (selectedLabel) selectedLabel.style.display = 'none';
      });
    }
  }
});

// FAQ accordion
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      // Chiudi tutte le risposte
      document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        const answer = this.nextElementSibling;
        if (answer) answer.style.display = 'block';
      }
    });
  });
});

// Language switcher
document.addEventListener('DOMContentLoaded', function () {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      // Aggiorna stato attivo
      langBtns.forEach(b => b.setAttribute('aria-current', b === this ? 'true' : 'false'));
      // Mostra/nasconde testi
      document.querySelectorAll('.lang-it').forEach(el => {
        el.style.display = lang === 'it' ? '' : 'none';
      });
      document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? '' : 'none';
      });

      // Aggiorna label timeline filter
      const timelineSelectedLabel = document.getElementById('timeline-selected-label');
      if (timelineSelectedLabel) {
        timelineSelectedLabel.querySelectorAll('.lang-it').forEach(el => el.style.display = lang === 'it' ? '' : 'none');
        timelineSelectedLabel.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
      }
      // Aggiorna dropdown timeline filter
      document.querySelectorAll('#timeline-filter-dropdown .timeline-filter-option').forEach(opt => {
        opt.querySelectorAll('.lang-it').forEach(el => el.style.display = lang === 'it' ? '' : 'none');
        opt.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
      });
      // Aggiorna bottone chiudi timeline
      const closeTimelineBtn = document.getElementById('close-timeline-btn');
      if (closeTimelineBtn) {
        closeTimelineBtn.querySelectorAll('.lang-it').forEach(el => el.style.display = lang === 'it' ? '' : 'none');
        closeTimelineBtn.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
      }
    });
  });
});

// Aggiorna aria-label dei bottoni slider e burger menu in base alla lingua
document.addEventListener('DOMContentLoaded', function () {
  const langBtns = document.querySelectorAll('.lang-btn');
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  const burgerMenu = document.querySelector('.burger-menu');

  function updateAriaLabels(lang) {
    // Slider controls
    if (prevButton) {
      prevButton.setAttribute('aria-label', lang === 'en'
        ? (prevButton.getAttribute('aria-label-en') || 'Previous slide')
        : 'Slide precedente');
    }
    if (nextButton) {
      nextButton.setAttribute('aria-label', lang === 'en'
        ? (nextButton.getAttribute('aria-label-en') || 'Next slide')
        : 'Slide successiva');
    }
    // Burger menu
    if (burgerMenu) {
      burgerMenu.setAttribute('aria-label', lang === 'en'
        ? (burgerMenu.getAttribute('aria-label-en') || 'Open navigation menu')
        : 'Apri il menu di navigazione');
    }
  }

  // Inizializza aria-labels corretti
  const initialLang = document.querySelector('.lang-btn[aria-current="true"]')?.getAttribute('data-lang') || 'it';
  updateAriaLabels(initialLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      // ...existing code...
      updateAriaLabels(lang);
    });
  });
});
