const form = document.querySelector('form');
const allFields = document.getElementsByTagName('input');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const emailAddress = document.querySelector('#email-address');
const password = document.querySelector('#password');
let errors = [];

firstName.addEventListener('keyup', (event) => (firstName.value ? hideError(firstName) : ''));
lastName.addEventListener('keyup', (event) => (lastName.value ? hideError(lastName) : ''));
emailAddress.addEventListener('keyup', (event) => (emailAddress.value ? hideError(emailAddress) : ''));
password.addEventListener('keyup', (event) => (password.value ? hideError(password) : ''));

form.addEventListener(
  'submit',
  (event) => {
    event.preventDefault();
    errors = [];

    for (let index = 0; index < allFields.length; index++) {
      const field = allFields[index];

      checkValue(field.value) ? hideError(field) : showError(field);

      if (field.id === 'email-address' && field.value.length > 0) {
        checkEmail(field.value) ? hideError(field) : showError(field);
      }
    }

    if (errors.length > 0) {
      return;
    } else {
      firstName.value = '';
      lastName.value = '';
      emailAddress.value = '';
      password.value = '';
    }
  },
  false
);

function checkEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function checkValue(value) {
  return value ? true : false;
}

function showError(field) {
  field.parentNode.parentNode.classList.add('error-active');
  document.querySelector(`#${field.id}-error-icon`).style.display = 'block';
  document.querySelector(`#${field.id}-error-text`).style.display = 'block';
  document.querySelector(`#${field.id}-error-text`).innerHTML = `${field.placeholder} cannot be empty`;
  document.querySelector(`#${field.id}`).style.border = '2px solid hsl(0, 100%, 74%)';
  errors.push(`${field.placeholder} cannot be empty`);

  if (field.id === 'email-address' && field.value.length > 0) {
    document.querySelector(`#${field.id}-error-text`).style.display = 'block';
    document.querySelector(`#${field.id}-error-text`).innerHTML = `Looks like this is not an email`;
    errors.push(`${field.placeholder} is incorrect`);
  }
}

function hideError(field) {
  field.parentNode.parentNode.classList.remove('error-active');
  document.querySelector(`#${field.id}-error-icon`).style.display = 'none';
  document.querySelector(`#${field.id}-error-text`).style.display = 'none';
  document.querySelector(`#${field.id}`).style.border = '1px solid hsl(246, 25%, 77%)';
}
