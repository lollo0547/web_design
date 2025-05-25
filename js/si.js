// Caching dei selettori principali
const langButtons = document.querySelectorAll('.lang-btn');
const burgerBtn = document.querySelector('.burger-menu');
const backToTopBtn = document.getElementById('back-to-top');
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');
// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initLanguageSwitcher();
    initMenuToggle();
    initCarousel();
    initTimelineFilter();
    initFAQ();
    initBackToTop();
    initFormSubmission();
});

// Ogni blocco funzionale ha la propria funzione di inizializzazione
function initLanguageSwitcher() {
    if (!langButtons.length) return;

    // Lingua di default: IT
    let savedLang = localStorage.getItem('lang');
    let initialLang = savedLang || 'it';
    switchLanguage(initialLang);

    langButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = btn.dataset.lang;
            switchLanguage(lang);
            localStorage.setItem('lang', lang);
        });
    });

    function switchLanguage(lang) {
        document.documentElement.lang = lang;
        langButtons.forEach(b => {
            if (b.dataset.lang === lang) {
                b.setAttribute('aria-current', 'true');
                b.classList.add('active');
            } else {
                b.removeAttribute('aria-current');
                b.classList.remove('active');
            }
        });
        document.querySelectorAll('.lang-it').forEach(el => {
            el.style.display = (lang === 'it') ? 'block' : 'none';
        });
        document.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = (lang === 'en') ? 'block' : 'none';
        });
    }
}

function initMenuToggle() {
    if (!burgerBtn) return;
    const navMenu = document.getElementById('main-nav');
    if (!navMenu) return;

    function toggleMenu() {
        const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
        if (!expanded) {
            navMenu.classList.add('open');
            burgerBtn.setAttribute('aria-expanded', 'true');
        } else {
            navMenu.classList.remove('open');
            burgerBtn.setAttribute('aria-expanded', 'false');
        }
    }

    burgerBtn.addEventListener('click', toggleMenu);

    // Chiudi menu su resize desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            navMenu.classList.remove('open');
            burgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

function initCarousel() {
    // Se Glide.js è presente e c'è un .glide, usa Glide
    const glideEl = document.querySelector('.glide');
    if (typeof Glide !== 'undefined' && glideEl) {
        new Glide(glideEl, {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            autoplay: false
        }).mount();
        return;
    }

    // Altrimenti implementazione manuale
    const slideshow = document.querySelector('.project-slideshow');
    if (!slideshow) return;
    const slides = slideshow.querySelectorAll('.slide');
    const prevBtn = slideshow.querySelector('.slide-prev');
    const nextBtn = slideshow.querySelector('.slide-next');
    if (!slides.length) return;

    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach((slide, i) => {
            if (i === n) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function changeSlide(delta) {
        currentSlide = (currentSlide + delta + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));
    if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));

    slideshow.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') changeSlide(1);
        else if (e.key === 'ArrowLeft') changeSlide(-1);
    });
    slideshow.tabIndex = 0;

    showSlide(currentSlide);
}

function initTimelineFilter() {
    const toggleBtn = document.getElementById('toggle-timeline-btn');
    const dropdown = document.getElementById('timeline-filter-dropdown');
    const closeBtn = document.getElementById('close-timeline-btn');
    const filterOptions = document.querySelectorAll('.timeline-filter-option');
    const timelineBlocks = document.querySelectorAll('.timeline-block');
    const selectedLabel = document.getElementById('timeline-selected-label');

    if (!toggleBtn || !dropdown || !closeBtn || !filterOptions.length || !timelineBlocks.length || !selectedLabel) return;

    // Mostra/nasconde il dropdown filtro e aggiorna aria-expanded
    toggleBtn.addEventListener('click', () => {
        const isOpen = dropdown.style.display === 'block';
        dropdown.style.display = isOpen ? 'none' : 'block';
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });

    closeBtn.addEventListener('click', () => {
        dropdown.style.display = 'none';
        toggleBtn.setAttribute('aria-expanded', 'false');
    });

    // Selezione iniziale: trova l'opzione con aria-selected="true"
    let initialOption = Array.from(filterOptions).find(opt => opt.getAttribute('aria-selected') === 'true');
    if (initialOption) {
        initialOption.click();
    }

    // Applica filtro e aggiorna label/aria
    filterOptions.forEach(option => {
        option.addEventListener('click', function () {
            const filter = this.dataset.value;

            // Aggiorna label selezionata (gestione lingue)
            const itText = this.querySelector('.lang-it') ? this.querySelector('.lang-it').textContent : filter;
            const enText = this.querySelector('.lang-en') ? this.querySelector('.lang-en').textContent : filter;
            selectedLabel.querySelector('.lang-it').textContent = itText;
            selectedLabel.querySelector('.lang-en').textContent = enText;

            // Aggiorna aria-selected
            filterOptions.forEach(opt => opt.removeAttribute('aria-selected'));
            this.setAttribute('aria-selected', 'true');

            // Filtra blocchi timeline
            timelineBlocks.forEach(block => {
                if (filter === 'Tutti' || block.dataset.type === filter) {
                    block.style.display = 'block';
                } else {
                    block.style.display = 'none';
                }
            });

            // Chiudi dropdown
            dropdown.style.display = 'none';
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

function initFAQ() {
    if (!faqQuestions.length) return;
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', function () {
            const answer = btn.nextElementSibling;
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            if (!expanded) {
                btn.setAttribute('aria-expanded', 'true');
                btn.closest('.faq-item').classList.add('open');
                if (answer) answer.style.display = 'block';
            } else {
                btn.setAttribute('aria-expanded', 'false');
                btn.closest('.faq-item').classList.remove('open');
                if (answer) answer.style.display = 'none';
            }
        });
    });
}

function initBackToTop() {
    if (!backToTopBtn) return;

    function onScroll() {
        if (window.scrollY > 200) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    // Usa throttle se disponibile (es. Lodash), altrimenti fallback normale
    const throttledScroll = (typeof _ !== 'undefined' && _.throttle)
        ? _.throttle(onScroll, 200)
        : onScroll;

    window.addEventListener('scroll', throttledScroll);

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initFormSubmission() {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-message');
    if (!form || !successMsg) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.reset();
        form.style.display = 'none';
        // Mostra solo il messaggio nella lingua attiva
        const lang = document.documentElement.lang || 'it';
        successMsg.querySelectorAll('.lang-it').forEach(el => {
            el.style.display = (lang === 'it') ? 'block' : 'none';
        });
        successMsg.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = (lang === 'en') ? 'block' : 'none';
        });
        successMsg.style.display = 'block';
    });
}

function initThemeSwitcher() {
    const html = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const themeToggle = document.getElementById('theme-toggle');

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    function applyTheme(e) {
        const userTheme = localStorage.getItem('theme');
        if (userTheme) {
            html.setAttribute('data-theme', userTheme);
        } else {
            const dark = e && e.matches !== undefined ? e.matches : mq.matches;
            html.setAttribute('data-theme', dark ? 'dark' : 'light');
        }
    }

    // Applica tema all'avvio
    applyTheme();

    // Aggiorna dinamicamente se cambia la preferenza di sistema (solo se non c'è override utente)
    function onSystemThemeChange(e) {
        if (!localStorage.getItem('theme')) applyTheme(e);
    }
    if (mq.addEventListener) {
        mq.addEventListener('change', onSystemThemeChange);
    } else if (mq.addListener) {
        mq.addListener(onSystemThemeChange);
    }

    // Toggle utente (opzionale)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }
}

// Tutta la gestione del DOM avviene con metodi standard come querySelector, classList, setAttribute, ecc.
// Non è necessario jQuery per nessuna delle funzionalità implementate.