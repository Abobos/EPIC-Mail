const grantAccess = () => {
  const { token } = localStorage;
  if (!token) window.location.replace('index.html');
};

const notify = (state, formType) => {
  if (state === 'enable') {
    const { submit } = formType.elements;
    localStorage.formId = formType.id;
    localStorage.value = submit.value;
    const submitData = submit.dataset.notice;
    submit.value = submitData;
  } else {
    const { formId } = localStorage;
    if (formId) {
      const submitElement = document.querySelector(`#${formId} #submit`);
      submitElement.value = localStorage.value;
      localStorage.removeItem('formId');
      localStorage.removeItem('value');
    }
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
const groupModal = document.querySelector('.modal');
const groupModalCloseBtn = document.querySelector('.modal .closeBtn');
const modalContents = document.querySelectorAll('.modal-content');

openNav.addEventListener('click', () => {
  sideNav.style.width = '250px';
});

closeNav.addEventListener('click', () => {
  sideNav.style.width = '0';
});

window.addEventListener('click', (e) => {
  if (e.target !== openNav) {
    sideNav.style.width = '0';
  }
});

const createElement = element => document.createElement(element);
const append = (parent, child) => parent.appendChild(child);
const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

const clearDOM = () => {
  viewPages.forEach((viewPage) => {
    viewPage.classList.add('hide');
  });
};

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', (e) => {
    if (e.target.classList.contains('userView')) {
      const id = e.target.dataset.value;
      const Id = capitalize(id);
      heading.textContent = Id;
      const pageDivs = document.getElementById(id);
      if (pageDivs) {
        composeMessageBtn.classList.remove('hide');
      }
      clearDOM();
      pageDivs.classList.remove('hide');
      modal.classList.add('hide');
    }
  });
});

composeMessageBtn.addEventListener('click', () => {
  clearDOM();
  heading.textContent = 'Compose';
  composeMessageBtn.classList.add('hide');
  composeMessage.classList.remove('hide');
});

const closeModal = (div) => {
  modalClose.addEventListener('click', () => {
    openNav.classList.remove('hide');
    composeMessageBtn.classList.remove('hide');
    modal.classList.add('hide');
    clearDOM();
    div.classList.remove('hide');
  });
};

const renderEmpty = (divid) => {
  const div = document.getElementById(divid);
  const divId = capitalize(divid);
  div.innerHTML = `<div class="emptyDiv">
                    <i class="fa fa-exclamation-circle"></i>
                    <p>${divId} is empty</p>
                    </div>`;
};

const render = (datas, divId) => {
  const div = document.getElementById(divId);
  datas.forEach((data) => {
    if (divId === 'inbox') {
      div.innerHTML += `<div class="message" onclick='getAnInboxMessage(${data.id})'>
                          <div class="messageSubject">
                            <b>${data.subject}</b>
                          </div>
                          <div class="messageBody">
                            <p>${data.message}</p>
                        </div>`;
    }  else if (divId === 'unread') {
      div.innerHTML += `<div class="message" onclick='getAnUnreadMessage(${data.id})'>
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

const displayModal = (data, groupUniqueId) => {
  modalContents.forEach((modalContent) => {
    modalContent.classList.add('hide');
  });
  const groupModalBodyContent = document.querySelector(`#${data}`);
  groupModalBodyContent.setAttribute('data-id', `${groupUniqueId}`);
  groupModal.classList.remove('hide');
  groupModalBodyContent.classList.remove('hide');
  handleRequest(groupModalBodyContent);
};

groupModalCloseBtn.addEventListener('click', () => {
  groupModal.classList.add('hide');
});

window.addEventListener('click', ({ target }) => {
  if (target === groupModal) groupModal.classList.add('hide');
});

const createGroupOption = (group, dropDown, textContent) => {
  const option = createElement('li');
  option.setAttribute('id', `${group.id}`);
  option.textContent = textContent;
  if (textContent === 'Edit group Name') option.setAttribute('onclick', `displayModal('editGroupName', ${group.id})`);
  else if (textContent === 'Delete group') option.setAttribute('onclick', `deleteGroup(${group.id})`);
  else if (textContent === 'Add user(s)') option.setAttribute('onclick', `displayModal('addUsers', ${group.id})`);
  else if (textContent === 'Send message') option.setAttribute('onclick', `displayModal('sendMessage', ${group.id})`);
  append(dropDown, option);
};

const renderGroup = (groupDatas, groupTemplateId) => {
  const groupTemplate = document.querySelector(`#${groupTemplateId}`);
  const ul = createElement('ul');
  groupDatas.forEach((groupData) => {
    const li = createElement('li');
    li.setAttribute('id', `${groupData.id}`);
    li.setAttribute('class', 'dropdownParent');
    li.textContent = `${groupData.name}`;
    append(ul, li);
    append(groupTemplate, ul);
    const currentGroup = document.getElementById(`${groupData.id}`);
    const dropDown = createElement('ul');
    dropDown.setAttribute('class', 'dropdown');
    createGroupOption(currentGroup, dropDown, 'Edit group Name');
    createGroupOption(currentGroup, dropDown, 'Delete group');
    createGroupOption(currentGroup, dropDown, 'Add user(s)');
    createGroupOption(currentGroup, dropDown, 'Send message');
    append(currentGroup, dropDown);
  });
};

const openModal = (messageDetails, divId) => {
  modalSubject.innerHTML = `<b>${messageDetails.subject}</b>`;
  modalBody.innerHTML = `<p>${messageDetails.message}</p>`;
  if (divId === 'inbox') {
    modal.children[1].textContent = `From: ${messageDetails.senderemail}`;
    modalTrash.setAttribute('onclick', `deleteAnInboxMessage(${messageDetails.id})`);
  } else if (divId === 'unread') {
    modal.children[1].textContent = `From: ${messageDetails.senderemail}`;
    modalTrash.setAttribute('onclick', `deleteAnUnreadMessage(${messageDetails.id})`);
  } else if (divId === 'sent') {
    modal.children[1].textContent = `To: ${messageDetails.receiveremail}`;
    modalTrash.setAttribute('onclick', `deleteASentMessage(${messageDetails.id})`);
  }
  const div = document.getElementById(divId);
  div.classList.add('hide');
  composeMessageBtn.classList.add('hide');
  modal.classList.remove('hide');
  closeModal(div);
};

// const clopen = (divId) => {
//   modal.classList.add('hide');
//   const div = document.getElementById(divId);
//   div.classList.remove('hide');
// };

userInfos.forEach((userInfo) => {
  const { email } = localStorage;
  const boldTag = createElement('b');
  boldTag.textContent = email;
  userInfo.insertBefore(boldTag, userInfo.firstChild);
});

logoutBtn.forEach((logout) => {
  logout.addEventListener('click', () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
});

grantAccess();
