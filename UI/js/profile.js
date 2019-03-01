let openNav = document.getElementById('openNav');
let closeNav = document.getElementById('closeNav');
let sideNav = document.querySelector('.sidenav');

openNav.addEventListener('click', () => {
    sideNav.style.width = '80vw';
});

closeNav.addEventListener('click', () => {
    sideNav.style.width='0';
});

