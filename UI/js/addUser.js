let selectedUsers = document.getElementById('selected_users');
let users = document.getElementById('users');

const addUser = document.getElementById('add_user');

function display(username){
    selectedUsers.innerHTML += `${username}, `;
}
addUser.addEventListener('click', function() {
let userName = (users.options[users.selectedIndex]).text;  
    display(userName);
});
