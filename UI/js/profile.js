
let viewFirstMessage = document.getElementById('viewFirstMessage');
let viewSecondMessage = document.getElementById('viewSecondMessage');
let viewThirdMessage = document.getElementById('viewThirdMessage');

function view(){
    let messageId = this.attributes['data-type'].value;
    let message = document.getElementById(messageId);
    message.classList.toggle('hide');
}

viewFirstMessage.addEventListener('click', view);
viewSecondMessage.addEventListener('click', view);
viewThirdMessage.addEventListener('click', view);

let openNav = document.getElementById('openNav');
let closeNav = document.getElementById('closeNav');
let sideNav = document.querySelector('.sidenav');


openNav.addEventListener('click', () => {
    sideNav.style.width = '80vw';
});

closeNav.addEventListener('click', () => {
    sideNav.style.width='0';
});









