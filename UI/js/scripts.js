const navbarToggle = document.querySelector('.navbar_toggle');
const navbarLinks = document.querySelector('.navbar_links');
navbarToggle.addEventListener('click', function(){
	this.classList.toggle('close');
	navbarLinks.classList.toggle('active');
});
