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
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-solidworks-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "La cardanica": {
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
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-solidworks-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "Poltroncina lounge per Milani": {
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
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "mouse": {
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
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    }
  };

  let currentSlide = 0;
  let autoplayInterval;
  let isAutoplaying = true;

  function startAutoplay(projectKey) {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      sliderPages[currentSlide].style.display = "none";
      currentSlide = (currentSlide + 1) % sliderPages.length;
      sliderPages[currentSlide].style.display = "block";
      const data = projectData[projectKey];
      if (data && data.sliderTitles) {
        modalTitle.textContent = data.sliderTitles[currentSlide];
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
      const projectTitle = project.querySelector("h3").textContent;
      const data = projectData[projectTitle];
      if (data) {
        modalTitle.textContent = data.sliderTitles ? data.sliderTitles[0] : projectTitle;
        modalDetails.innerHTML = data.details;
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
          startAutoplay(projectTitle);
        } else {
          modal.querySelector(".slider").style.display = "none";
        }
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
    // Accessibilità: apri modale anche con Invio/Spazio
    project.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        project.click();
      }
    });
  });

  sliderPages.forEach((page) => {
    page.addEventListener("click", () => {
      if (isAutoplaying) {
        stopAutoplay();
        showOverlayIcon("⏸");
      } else {
        startAutoplay(modalTitle.textContent);
        showOverlayIcon("▶");
      }
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    stopAutoplay();
  });
  closeModal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      closeModal.click();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
      stopAutoplay();
    }
  });

  // Form contatti: solo controllo consenso (rimosso controllo reCAPTCHA non presente)
  const form = document.querySelector("#contatti form");
  const consentCheckbox = document.querySelector("#consenso");
  form.addEventListener("submit", (event) => {
    if (!consentCheckbox.checked) {
      alert("Devi acconsentire al trattamento dei dati personali.");
      event.preventDefault();
    }
  });

  // Slideshow progetti
  const slides = document.querySelectorAll(".project-slideshow .slide");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");
  let slideshowCurrentSlide = 0;

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

  showSlide(slideshowCurrentSlide);

  // Smooth scroll per i link di ancoraggio della navbar
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Pulsante "Torna su"
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Burger menu mobile
  const burgerMenu = document.querySelector('.burger-menu');
  const navbar = document.querySelector('.navbar');
  burgerMenu.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    burgerMenu.setAttribute('aria-expanded', isOpen);
  });
});
