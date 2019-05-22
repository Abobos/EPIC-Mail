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

getUserGroups();
