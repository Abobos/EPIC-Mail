
const notify = (state) => {
  const submit = document.getElementById('submit');
  const submitData = submit.dataset.notice;
  const { value } = localStorage;
  if (state === 'enable') {
    submit.value = submitData;
  } else {
    submit.value = value;
    localStorage.removeItem('value');
  }
};

const display = (message, className) => {
  const feedback = document.querySelector('#feedback');
  feedback.classList.add(className);
  feedback.innerHTML = message;
  notify('disable');
  setTimeout(() => {
    feedback.classList.remove(className);
  }, 3000);
};


// const userPage = document.getElementById('userPage')
const openNav = document.querySelector('#openNav');
const closeNav = document.querySelector('#closeNav');
const sideNav = document.querySelector('#sideNav');
const navLinks = document.querySelector('#nav');
const viewPages = document.querySelectorAll('.viewPage');
const heading = document.querySelector('#heading');
const composeMessageBtn = document.querySelector('#composeMessageBtn');
const composeMessage = document.querySelector('#composeMessage');
const logout = document.querySelector('#logout');


openNav.addEventListener('click', () => {
  sideNav.style.width = '60vw';
});

closeNav.addEventListener('click', () => {
  sideNav.style.width = '0';
});

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('userView')) {
    const id = e.target.dataset.value;
    const Id = id.charAt(0).toUpperCase() + id.slice(1);
    heading.textContent = Id;
    const element = document.getElementById(id);
    viewPages.forEach((viewPage) => {
      viewPage.classList.add('hide');
    });
    element.classList.remove('hide');
  }
});

composeMessageBtn.addEventListener('click', () => {
  viewPages.forEach((viewPage) => {
    viewPage.classList.add('hide');
  });
  heading.textContent = 'Compose'
  composeMessage.classList.remove('hide');
});

logout.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});
