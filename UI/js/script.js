// eslint-disable-next-line no-undef
const openNav = document.getElementById('openNav');
// eslint-disable-next-line no-undef
const closeNav = document.getElementById('closeNav');

// eslint-disable-next-line no-undef
const sideNav = document.querySelector('.sidenav');


openNav.addEventListener('click', () => {
  sideNav.style.width = '80vw';
});

closeNav.addEventListener('click', () => {
  sideNav.style.width = '0';
});
