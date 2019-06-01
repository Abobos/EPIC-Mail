const userToken = `Bearer ${localStorage.token}`;
const composeForm = document.querySelector('#composeForm');
const userPage = document.querySelector('#userPage');

if (composeForm) {
  composeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    notify('enable', composeForm);
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('messageField').value;

    fetch('https://epicmail11.herokuapp.com/api/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: userToken },
      body: JSON.stringify({
        email, subject, message,
      }),
    }).then(res => res.json())
      .then((response) => {
        if (response.status === 'fail') display(response.error, 'fail');
        else {
          display('Message sent successfully', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }).catch((e) => { display('Something went wrong', 'fail'); });
  });
}

const getUserInbox = () => {
  fetch('https://epicmail11.herokuapp.com/api/v1/messages', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (!response.data[0]) renderEmpty('inbox');
      else {
        render(response.data, 'inbox');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const getUserSent = () => {
  fetch('https://epicmail11.herokuapp.com/api/v1/messages/sent', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (!response.data[0]) renderEmpty('sent');
      else {
        render(response.data, 'sent');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const getUserUnread = () => {
  fetch('https://epicmail11.herokuapp.com/api/v1/messages/unread', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (!response.data[0]) renderEmpty('unread');
      else {
        render(response.data, 'unread');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};


const getAnInboxMessage = (messageId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/messages/${messageId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        openModal(response.data[0], 'inbox');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const deleteAnInboxMessage = (messageId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/messages/${messageId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        display(response.data[0].message, 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }).catch((e) => {  display('Something went wrong', 'fail');  });
};


const getAnUnreadMessage = (messageId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/messages/${messageId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        openModal(response.data[0], 'unread');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const deleteAnUnreadMessage = (messageId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/messages/${messageId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        display(response.data[0].message, 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const getASentMessage = (messageId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/messages/sent/${messageId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        openModal(response.data[0], 'sent');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};


const deleteASentMessage = (messageId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/messages/sent/${messageId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        display(response.data[0].message, 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};


userPage.addEventListener('load', getUserInbox(), getUserSent(), getUserUnread());
