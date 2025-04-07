// Select the burger menu and navbar elements
const burgerMenu = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');

// Toggle the 'open' class on the navbar when the burger menu is clicked
burgerMenu.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

// Close the navbar when clicking outside of it
document.addEventListener('click', (event) => {
  if (!burgerMenu.contains(event.target) && !navbar.contains(event.target)) {
    navbar.classList.remove('open');
  }
});
