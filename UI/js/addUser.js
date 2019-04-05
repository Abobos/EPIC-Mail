const selectedUsers = document.getElementById('selected_users');
const users = document.getElementById('users');

const addUser = document.getElementById('add_user');

function display(username) {
  selectedUsers.innerHTML += `${username}, `;
}
addUser.addEventListener('click', () => {
let userName = (users.options[users.selectedIndex]).text;  
  display(userName);
});
