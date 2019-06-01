const Token = `Bearer ${localStorage.token}`;
const createGroupForm = document.querySelector('#createGroup');


if (createGroupForm) {
  createGroupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    notify('enable', createGroupForm);
    const name = document.getElementById('name').value;
    fetch('https://epicmail11.herokuapp.com/api/v1/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: Token },
      body: JSON.stringify({ name }),
    }).then(res => res.json())
      .then((response) => {
        if (response.status === 'fail') display(response.error, 'fail');
        else {
          display('Group created successfully', 'success');
        }
      }).catch((e) => { display('Something went wrong', 'fail'); });
  });
}

const getUserGroups = () => {
  fetch('https://epicmail11.herokuapp.com/api/v1/groups', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: Token },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (!response.data[0]) renderEmpty('group');
      else {
        renderGroup(response.data, 'group');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const deleteGroup = (groupId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/groups/${groupId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: Token },
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

const editGroupName = (groupId) => {
  const name = document.querySelector('#editGroupName #name').value;
  fetch(`https://epicmail11.herokuapp.com/api/v1/groups/${groupId}/name`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: Token },
    body: JSON.stringify({ name }),
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        display('Group name edited successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const addUser = (groupId) => {
  const users = document.querySelector('#addUsers #users').value;
  console.log(users, groupId);
  fetch(`https://epicmail11.herokuapp.com/api/v1/groups/${groupId}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: Token },
    body: JSON.stringify({ users }),
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        display('Group users added successfully', 'success');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const sendMessage = (groupId) => {
  const subject = document.querySelector('#sendMessage #subject').value;
  const message = document.querySelector('#sendMessage #messageField').value;
  fetch(`https://epicmail11.herokuapp.com/api/v1/groups/${groupId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: Token },
    body: JSON.stringify({ subject, message }),
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'fail') display(response.error, 'fail');
      else {
        display('Message sent successfully', 'success');
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const handleRequest = (groupOptionContent) => {
  if (groupOptionContent.id === 'editGroupName') {
    const groupId = groupOptionContent.dataset.id;
    const editGroupNameBtn = document.querySelector('#editGroupBtn');
    editGroupNameBtn.addEventListener('click', (event) => {
      event.preventDefault();
      editGroupName(groupId);
    });
  } else if (groupOptionContent.id === 'addUsers') {
    const groupId = groupOptionContent.dataset.id;
    const addUsersBtn = document.querySelector('#addUsersBtn');
    addUsersBtn.addEventListener('click', (event) => {
      event.preventDefault();
      addUser(groupId);
    });
  } else if (groupOptionContent.id === 'sendMessage') {
    const groupId = groupOptionContent.dataset.id;
    const sendMessageBtn = document.querySelector('#sendMessageBtn');
    sendMessageBtn.addEventListener('click', (event) => {
      event.preventDefault();
      sendMessage(groupId);
    });
  }
};

const getGroupMembers = (groupId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/groups/${groupId}/users`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: Token },
    cache: 'reload',
  }).then(res => res.json())
    .then((response) => {
      if (!response.data[0]) renderEmptyGroup();
      else {
        renderGroupMembers(response.data, groupId);
      }
    }).catch((e) => { display('Something went wrong', 'fail'); });
};

const deleteGroupMember = (memberId, groupId) => {
  fetch(`https://epicmail11.herokuapp.com/api/v1/groups/${groupId}/users/${memberId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: Token },
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

getUserGroups();
