document.addEventListener("DOMContentLoaded", () => {
  const projects = document.querySelectorAll(".project");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
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
      sliderTitles: [
        "Set da caffè - ambientato",
        "Set da caffè - tazzina",
        "Set da caffè - zuccheriera",
      ],
      sliderImages: [
        "/immagini/progetto 1/all 22.png",
        "/immagini/progetto 1/tazzina.png",
        "/immagini/progetto 1/zuccheriera 2_.png"
      ],
      details: "Durata: 1 mese<br>Anno: 2022<br>Descrizione:Il progetto propone una reinterpretazione contemporanea del classico set da caffè, composto da tazzina, zuccheriera e piattino. L’approccio progettuale unisce estetica e funzionalità, con particolare attenzione alla coerenza formale e alla scelta dei materiali. Le forme si ispirano all’architettura di Shigeru Ban e Renzo Piano, e al design fluido delle lampade parametriche, generando un linguaggio visivo fatto di trasparenze, volumi armonici e superfici sofisticate.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-solidworks-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ],
    },
    "La cardanica": {
      sliderTitles: [
        "la cardanica - 600",
        "la cardanica - 900",
        "la cardanica - 1200",
      ],
      sliderImages: [
        "/immagini/progetto 2/cardanica600.jpeg",
        "/immagini/progetto 2/cardanica900.jpeg",
        "/immagini/progetto 2/cardanica.jpeg"
      ],
      details: "Durata: 2 mesi<br>Anno: 2023<br>Descrizione: “La Cardanica” è un progetto concettuale ispirato al principio del blocco cardanico (gimbal lock), esplorato attraverso una serie di oggetti-scultura che traducono il movimento meccanico in gesto espressivo. Ispirata dallo Ski Sipping Stabilizer di Unnecessary Inventions, l’idea è stata rielaborata in chiave tecnica e poetica, con richiami a sistemi di illuminazione a binario, dimerabilità e guarnizioni con setole. Il progetto indaga equilibrio, instabilità e relazione tra forma e funzione con un approccio sperimentale e dinamico.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-solidworks-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "Poltroncina Milani": {
      sliderTitles: [
        "Poltroncina Milani - ambientato",
        "Poltroncina Milani - particolare 1",
        "Poltroncina Milani - particolare 2"
      ],
      sliderImages: [
        "/immagini/progetto 3/untitled555.png",
        "/immagini/progetto 3/untitled202.png",
        "/immagini/progetto 3/untitled702.png"
      ],
      details: "Durata: 3 mesi<br>Anno: 2024<br>Descrizione: Progetto sviluppato per il brand SM-Milani, specializzato in arredi di design per casa e ufficio. La poltroncina lounge è pensata per unire comfort ed eleganza con una struttura essenziale ma accogliente. Il concept prende ispirazione dal design contemporaneo e minimalista, con particolare attenzione all'equilibrio tra pieni e vuoti e all’ergonomia. La forma accogliente e la scelta dei materiali puntano a creare un oggetto versatile, adatto a spazi professionali e domestici.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "mouse": {
      sliderTitles: [
        "mouse - ambientato",
        "mouse - particolare 1",
        "mouse - particolare 2",
      ],
      sliderImages: [
        "/immagini/progetto 4/untitled44.png",
        "/immagini/progetto 4/untitled33.png",
        "/immagini/progetto 4/untitled.png"
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

  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      sliderPages[currentSlide].style.display = "none";
      currentSlide = (currentSlide + 1) % sliderPages.length;
      sliderPages[currentSlide].style.display = "block";
      const data = projectData["La cardanica"];
      if (data && data.sliderTitles) {
        modalTitle.textContent = data.sliderTitles[currentSlide];
      }
    }, 2500); // Change slide every 2 seconds (reduced from 3 seconds)
    isAutoplaying = true;
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
    isAutoplaying = false;
  };

  const showOverlayIcon = (icon) => {
    sliderOverlay.textContent = icon;
    sliderOverlay.style.opacity = "1";
    setTimeout(() => {
      sliderOverlay.style.opacity = "0";
    }, 500); // Show the icon for 500ms
  };

  projects.forEach((project) => {
    project.addEventListener("click", () => {
      const projectTitle = project.querySelector("h3").textContent;
      const data = projectData[projectTitle];

      if (data) {
        modalTitle.textContent = projectTitle;
        modalDetails.innerHTML = data.details;
        modalIcons.innerHTML = data.icons
          .map((icon) => `<img src="${icon}" alt="Icona">`)
          .join("");

        if (data.sliderImages) {
          sliderPages.forEach((page, index) => {
            page.src = data.sliderImages[index] || "";
            page.style.display = index === 0 ? "block" : "none";
          });
          modalTitle.textContent = data.sliderTitles[0]; // Set initial title
          currentSlide = 0;
          modal.querySelector(".slider").style.display = "block";
          startAutoplay(); // Start autoplay when modal opens
        } else {
          modal.querySelector(".slider").style.display = "none";
        }

        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Disable scrolling
      }
    });
  });

  sliderPages.forEach((page) => {
    page.addEventListener("click", () => {
      if (isAutoplaying) {
        stopAutoplay();
        showOverlayIcon("⏸"); // Show stop icon
      } else {
        startAutoplay();
        showOverlayIcon("▶"); // Show play icon
      }
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Enable scrolling
    stopAutoplay(); // Stop autoplay when modal closes
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Enable scrolling
      stopAutoplay(); // Stop autoplay when modal closes
    }
  });

  const form = document.querySelector("#contatti form");
  const consentCheckbox = document.querySelector("#consenso");

  form.addEventListener("submit", (event) => {
    let isValid = true;

    // Check if the consent checkbox is checked
    if (!consentCheckbox.checked) {
      alert("Devi acconsentire al trattamento dei dati personali.");
      isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
      event.preventDefault();
    }
  });

  const slides = document.querySelectorAll(".project-slideshow .slide");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");
  let slideshowCurrentSlide = 1;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  };

  prevButton.addEventListener("click", () => {
    slideshowCurrentSlide = (slideshowCurrentSlide - 1 + slides.length) % slides.length;
    showSlide(slideshowCurrentSlide);
  });

  nextButton.addEventListener("click", () => {
    slideshowCurrentSlide = (slideshowCurrentSlide + 1) % slides.length;
    showSlide(slideshowCurrentSlide);
  });

  // Initialize the first slide
  showSlide(currentSlide);
});

  let currentSlide = 0;