const signUpForm = document.querySelector('#signUpForm');
const signInForm = document.querySelector('#signInForm');
const resetPassword = document.querySelector('#resetPassword');
const forgotPassword = document.querySelector('#forgotPassword');


if (signUpForm) {
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    notify('enable', signUpForm);
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) display('Password do not match', 'fail');
    else {
      fetch('https://epicmail11.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, password,
        }),
      })
        .then(res => res.json())
        .then((response) => {
          if (response.status === 'fail') {
            display(response.error, 'fail');
          } else {
            localStorage.email = email;
            localStorage.token = response.data[0].token;
            display('Your account has been created successfully', 'success');
            setTimeout(() => {
              window.location.replace('inbox.html');
            }, 3000);
          }
        }).catch((e) => { display('Something went wrong', 'fail'); });
    }
  });
}

if (signInForm) {
  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    notify('enable', signInForm);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    fetch('https://epicmail11.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email, password,
      }),
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 'fail') {
          display(response.error, 'fail');
        } else {
          localStorage.email = email;
          localStorage.token = response.data[0].token;
          display('You are now logged In', 'success');
          setTimeout(() => {
            window.location.replace('inbox.html');
          }, 3000);
        }
      }).catch((e) => { display('Something went wrong', 'fail'); });
  });
}

if (forgotPassword) {
  forgotPassword.addEventListener('submit', (event) => {
    event.preventDefault();
    notify('enable', forgotPassword);
    const email = document.getElementById('email').value;

    fetch('https://epicmail11.herokuapp.com/api/v1/auth/reset', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email,
      }),
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 'fail') {
          display(response.error, 'fail');
        } else {
          display(response.data[0].message, 'success');
        }
      }).catch((e) => { display('Something went wrong', 'fail'); });
  });
}

if (resetPassword) {
  resetPassword.addEventListener('submit', (event) => {
    event.preventDefault();
    notify('enable', resetPassword);
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('authorization');
    localStorage.token = token;

    if (password !== confirmPassword) display('Password do not match', 'fail');
    else {
      fetch('https://epicmail11.herokuapp.com/api/v1/auth/change_password', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          password,
        }),
      })
        .then(res => res.json())
        .then((response) => {
          if (response.status === 'fail') {
            display(response.error, 'fail');
          } else  {
            display(response.data[0].message, 'success');
            setTimeout(() => {
              window.location.replace('inbox.html');
            }, 3000);
          }
        }).catch((e) => { display('Something went wrong', 'fail'); });
    }
  });
}
