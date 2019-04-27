
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


const openNav = document.querySelector('#openNav');
const closeNav = document.querySelector('#closeNav');
const sideNav = document.querySelector('#sideNav');
const navLinks = document.querySelectorAll('.nav');
const viewPages = document.querySelectorAll('.viewPage');
const heading = document.querySelector('#heading');
const composeMessageBtn = document.querySelector('#composeMessageBtn');
const composeMessage = document.querySelector('#compose');
const logoutBtn = document.querySelectorAll('.logout');
const messages = document.querySelectorAll('.message') 
const modal = document.querySelector('#modal');
const modalSubject = document.querySelector('#modalSubject');
const modalBody = document.querySelector('#modalBody');
const modalClose = document.querySelector('#modalClose');
const userInfos = document.querySelectorAll('.userInfo');

openNav.addEventListener('click', () => {
  sideNav.style.width = '70vw';
});

closeNav.addEventListener('click', () => {
  sideNav.style.width = '0';
});

window.addEventListener('click', (e) => {
  if (e.target !== openNav) {
    sideNav.style.width = '0';
  }
});

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', (e) => {
    if (e.target.classList.contains('userView')) {
      const id = e.target.dataset.value;
      const Id = id.charAt(0).toUpperCase() + id.slice(1);
      heading.textContent = Id;
      const element = document.getElementById(id);
      if (element) {
        composeMessageBtn.classList.remove('hide');
      }
      viewPages.forEach((viewPage) => {
        viewPage.classList.add('hide');
      });
      messages.forEach((message) => {
        message.classList.remove('hide');
      });
      modal.classList.add('hide');
      element.classList.remove('hide');
    }
  }); 
})

composeMessageBtn.addEventListener('click', () => {
  viewPages.forEach((viewPage) => {
    viewPage.classList.add('hide');
  });
  heading.textContent = 'Compose';
  composeMessageBtn.classList.add('hide');
  composeMessage.classList.remove('hide');
});

logoutBtn.forEach((logout) => {
  logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
});


messages.forEach((message) => {
  message.addEventListener('click', () => {
    const messageSubject = message.children[0].innerHTML;
    const messageBody = message.children[1].innerHTML;

    modalSubject.innerHTML = messageSubject;
    modalBody.innerHTML = messageBody;
    message.classList.add('hide');
    openNav.classList.add('hide');
    composeMessageBtn.classList.add('hide');
    modal.classList.remove('hide');
  });
});

modalClose.addEventListener('click', () => {
  openNav.classList.remove('hide');
  composeMessageBtn.classList.remove('hide');
  messages.forEach((message) => {
    message.classList.remove('hide');
  });
  modal.classList.add('hide');
});

userInfos.forEach((userInfo) => {
  const { email } = localStorage;
  const boldTag = document.createElement('b');
  const entityEmail = document.createTextNode(email);
  boldTag.appendChild(entityEmail);
  userInfo.insertBefore(boldTag, userInfo.firstChild);
});
