let navbar_toggle=document.querySelector('.navbar_toggle');
let navbar_links=document.querySelector('.navbar_links');

navbar_toggle.addEventListener('click', function() {
	this.classList.toggle("close");
	navbar_links.classList.toggle("active");
});
