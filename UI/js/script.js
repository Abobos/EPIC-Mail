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
const modal = document.querySelector('#modal');
const modalSubject = document.querySelector('#modalSubject');
const modalBody = document.querySelector('#modalBody');
const modalClose = document.querySelector('#modalClose');
const modalTrash = document.querySelector('#modalTrash');
const userInfos = document.querySelectorAll('.userInfo');
// const createGroup = docueme

openNav.addEventListener('click', () => {
  sideNav.style.width = '300px';
});

closeNav.addEventListener('click', () => {
  sideNav.style.width = '0';
});

window.addEventListener('click', (e) => {
  if (e.target !== openNav) {
    sideNav.style.width = '0';
  }
});

const clearDisplayPage = () => {
  viewPages.forEach((viewPage) => {
    viewPage.classList.add('hide');
  });
};

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', (e) => {
    if (e.target.classList.contains('userView')) {
      const id = e.target.dataset.value;
      const Id = id.charAt(0).toUpperCase() + id.slice(1);
      heading.textContent = Id;
      const pageDivs = document.getElementById(id);
      if (pageDivs) {
        composeMessageBtn.classList.remove('hide');
      }
      clearDisplayPage();
      pageDivs.classList.remove('hide');
      modal.classList.add('hide');
    }
  });
});

composeMessageBtn.addEventListener('click', () => {
  clearDisplayPage();
  heading.textContent = 'Compose';
  composeMessageBtn.classList.add('hide');
  composeMessage.classList.remove('hide');
});

const closeModal = (div) => {
  modalClose.addEventListener('click', () => {
    openNav.classList.remove('hide');
    composeMessageBtn.classList.remove('hide');
    modal.classList.add('hide');
    clearDisplayPage();
    div.classList.remove('hide');
  });
};

const render = (datas, divId) => {
  const div = document.getElementById(divId);
  datas.forEach((data) => {
    if (divId === 'inbox') {
      div.innerHTML += `<div class="message" onclick='getAMessage(${data.id})'>
                          <div class="messageSubject">
                            <b>${data.subject}</b>
                          </div>
                          <div class="messageBody">
                            <p>${data.message}</p>
                        </div>`;
    } else {
      div.innerHTML += `<div class="message" onclick='getASentMessage(${data.id})'>
                          <div class="messageSubject">
                            <b>${data.subject}</b>
                          </div>
                          <div class="messageBody">
                            <p>${data.message}</p>
                        </div>`;
    }
  });
};

const renderEmpty = (divid) => {
  const div = document.getElementById(divid);
  const divId = divid.charAt(0).toUpperCase() + divid.slice(1);
  div.innerHTML = `<div class="emptyDiv">
                    <i class="fa fa-exclamation-circle"></i>
                    <p>${divId} is empty</p>
                    </div>`;
};

const openModal = (messageDetails, divId) => {
  modalSubject.innerHTML = `<b>${messageDetails.subject}</b>`;
  modalBody.innerHTML = `<p>${messageDetails.message}</p>`;
  if (divId === 'inbox') modalTrash.setAttribute('onclick', `deleteAMessage(${messageDetails.id})`);
  else {
    modalTrash.setAttribute('onclick', `deleteASentMessage(${messageDetails.id})`);
  }
  const div = document.getElementById(divId);
  div.classList.add('hide');
  composeMessageBtn.classList.add('hide');
  modal.classList.remove('hide');
  closeModal(div);
};

const clopen = (divId) => {
  modal.classList.add('hide');
  const div = document.getElementById(divId);
  div.classList.remove('hide');
};

userInfos.forEach((userInfo) => {
  const { email } = localStorage;
  const boldTag = document.createElement('b');
  const entityEmail = document.createTextNode(email);
  boldTag.appendChild(entityEmail);
  userInfo.insertBefore(boldTag, userInfo.firstChild);
});

logoutBtn.forEach((logout) => {
  logout.addEventListener('click', () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
});
