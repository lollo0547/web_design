// Smooth scrolling for navbar links (ensure only one section is visible at a time)
document.querySelectorAll('.navbar a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    sections.forEach((section) => section.classList.remove('active'));
    targetSection.classList.add('active');
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Modal functionality for project details
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src="${project.querySelector('img').src}" alt="${project.querySelector('h3').textContent}">
        <div class="modal-description">
          <h3>${project.querySelector('h3').textContent}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close').addEventListener('click', () => modal.remove());
  });
});

// Burger menu toggle
const burgerMenu = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');
burgerMenu.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (!burgerMenu.contains(event.target) && !navbar.contains(event.target)) {
    navbar.classList.remove('open');
  }
});

// Theme switching based on system preference
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
setTheme(systemTheme.matches ? 'dark' : 'light');

systemTheme.addEventListener('change', (e) => {
  setTheme(e.matches ? 'dark' : 'light');
});
