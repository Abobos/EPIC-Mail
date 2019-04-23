
const notify = (state) => {
  const submit = document.getElementById('submit');
  const submitData = submit.dataset.notice;
  const value = localStorage.value;
  if (state === 'enable') {
    submit.value = submitData;
  } else {
    submit.value = value;
    // localStorage.removeItem('value');
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
