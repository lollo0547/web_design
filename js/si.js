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
      sliderImages: [
        "/immagini/progetto1/devnwisnvps.jpeg",
        "/immagini/progetto1/portfolio.png",
        "/immagini/progetto1/portfolio1.png"
      ],
      details: "Durata: 1 mese<br>Anno: 2022<br>Descrizione: Set da caffè in ceramica con decorazioni artistiche.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-solidworks-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ],
      sliderTitles: [
        "Set da caffè",
        "Set da caffè - tazzina",
        "Set da caffè - zuccheriera"
      ]
    },
    "La cardanica": {
      sliderImages: [
        "/immagini/progetto2/cardanica600.jpeg",
        "/immagini/progetto2/cardanica900.jpeg",
        "/immagini/progetto2/cardanica.jpeg"
      ],
      sliderTitles: [
        "Cardanica - 600",
        "Cardanica - 900",
        "Cardanica - 1200"
      ],
      details: "Durata: 2 mesi<br>Anno: 2023<br>Descrizione: Progetto di una cardanica per veicoli.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-solidworks-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "Poltroncina lounge per Milani": {
      sliderImages: [
        "/immagini/progetto3/Livello1.png",
        "/immagini/progetto3/Livello2.png",
        "/immagini/progetto3/Livello3.png"
      ],
      sliderTitles: [
        "Poltroncina lounge per Milani",
        "Poltroncina lounge per Milani - particolare 1",
        "Poltroncina lounge per Milani - particolare 2"
      ],
      details: "Durata: 3 mesi<br>Anno: 2024<br>Descrizione: Progetto di una poltroncina lounge.",
      icons: [
        "/immagini/loghi/icons8-blender-48.png",
        "/immagini/loghi/icons8-photoshop-48.png",
        "/immagini/loghi/icons8-illustrator-48.png"
      ]
    },
    "Progetto 4": {
      sliderImages: [
        "/immagini/progetto4/image1.jpeg",
        "/immagini/progetto4/image2.jpeg",
        "/immagini/progetto4/image3.jpeg"
      ],
      sliderTitles: [
        "Progetto 4 - 1",
        "Progetto 4 - 2",
        "Progetto 4 - 3"
      ],
      details: "Durata: 2 mesi<br>Anno: 2023<br>Descrizione: Progetto di un design innovativo.",
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
  const recaptchaResponse = document.querySelector(".g-recaptcha-response");

  form.addEventListener("submit", (event) => {
    let isValid = true;

    // Check if the consent checkbox is checked
    if (!consentCheckbox.checked) {
      alert("Devi acconsentire al trattamento dei dati personali.");
      isValid = false;
    }

    // Check if reCAPTCHA is completed
    if (!recaptchaResponse || recaptchaResponse.value === "") {
      alert("Devi completare il CAPTCHA.");
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
