// navbar toggle event for mobile devices
// eslint-disable-next-line no-undef
const navbarToggle = document.querySelector('.navbar_toggle');
// eslint-disable-next-line no-undef
const navbarLinks = document.querySelector('.navbar_links');
// eslint-disable-next-line func-names
navbarToggle.addEventListener('click', function () {
  this.classList.toggle('close');
  navbarLinks.classList.toggle('active');
});
