function createErrorMessage(message) {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  return errorMessage;
}

function validateFirstName() {
  const input = document.querySelector('.dr-field-fname');
  const errorMessage = document.querySelector('.dr-field-fname-error');

  const value = input.value.trim(); // Видаляємо пробіли на початку і в кінці

  if (value === '' || value.length < 2 || /\d/.test(value)) {
    if (!errorMessage) {
      const errorMessageElement = createErrorMessage('Field is required');
      errorMessageElement.classList.add('dr-field-fname-error');
      input.parentNode.insertBefore(errorMessageElement, input.nextSibling);
    }
    input.classList.add('error');
    return false;
  }

  if (errorMessage) {
    errorMessage.remove();
  }

  input.classList.remove('error');
  return true;
}

function validateLastName() {
  const input = document.querySelector('.dr-field-lname');
  const errorMessage = document.querySelector('.dr-field-lname-error');

  const value = input.value.trim();

  if (value === '' || value.length < 2 || /\d/.test(value)) {
    if (!errorMessage) {
      const errorMessageElement = createErrorMessage('Field is required');
      errorMessageElement.classList.add('dr-field-lname-error');
      input.parentNode.insertBefore(errorMessageElement, input.nextSibling);
    }
    input.classList.add('error');
    return false;
  }

  if (errorMessage) {
    errorMessage.remove();
  }

  input.classList.remove('error');
  return true;
}

function validateEmail() {
  const input = document.querySelector('.dr-field-email');
  const errorMessage = document.querySelector('.dr-field-email-error');

  const value = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorMessages = [];

  if (value === '') {
    errorMessages.push('Field is required');
  } else if (!emailPattern.test(value)) {
    errorMessages.push('Please enter a valid email address (example@email.com)');
  }

  removeErrorMessages(errorMessage);

  if (errorMessages.length > 0) {
    const errorMessageElement = createErrorMessage(errorMessages.join(', '));
    errorMessageElement.classList.add('dr-field-email-error');
    input.parentNode.insertBefore(errorMessageElement, input.nextSibling);
    input.classList.add('error');
    return false;
  }

  input.classList.remove('error');
  return true;
}

function removeErrorMessages(errorMessage) {
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Додаємо події для виклику функцій валідації
const firstNameField = document.querySelector('.dr-field-fname');
firstNameField.addEventListener('blur', () => {
  validateFirstName();
});

const lastNameField = document.querySelector('.dr-field-lname');
lastNameField.addEventListener('blur', () => {
  validateLastName();
});

const emailField = document.querySelector('.dr-field-email');
emailField.addEventListener('blur', () => {
  validateEmail();
});

const countrySelect = document.querySelector('.code-select');
const phoneInput = document.querySelector('.dr-field-phone');
const errorField = document.querySelector('.dr-field-phone-error');
phoneInput.disabled = true;

function updatePhonePlaceholder() {
  if (countrySelect.value === 'uk') {
    phoneInput.placeholder = '7400 123456';
  } else if (countrySelect.value === 'ca') {
    phoneInput.placeholder = '506 234 5678';
  } else if (countrySelect.value === 'au') {
    phoneInput.placeholder = '412 345 678';
  } else {
    phoneInput.placeholder = 'Phone';
  }
}

function validatePhoneNumber(event) {
  const input = event.target.value;
  const sanitizedInput = input.replace(/\D/g, '');
  event.target.value = sanitizedInput;
  const maxLength = 10;
  const minLength = 6;
  const truncatedInput = sanitizedInput.slice(0, maxLength);

  const selectedCountry = countrySelect.value;
  let errorMessage;

  if (truncatedInput.length < minLength || truncatedInput.length > maxLength) {
    if (selectedCountry === '+44') {
      errorMessage =
        'Please enter your Phone number. Example: 7400 123456';
      phoneInput.classList.add('error');
    } else if (selectedCountry === '+1') {
      errorMessage =
        'Please enter your Phone number. Example: 506-234-5678';
    } else if (selectedCountry === '+61') {
      errorMessage =
        'Please enter your Phone number. Example: 412 345 678';
    } else {
      errorMessage = 'Invalid phone number. Please provide a valid phone number.';
    }

    errorField.textContent = errorMessage;
    event.target.setCustomValidity(errorMessage);
  } else {
    errorField.textContent = '';
    event.target.setCustomValidity('');
    const selectedCountryCode = countrySelect.value.toUpperCase();
    let countryCode;
  }
  if (!errorMessage) {
    phoneInput.classList.remove('error');
  }
  event.target.value = truncatedInput;
}

countrySelect.addEventListener('change', () => {
  if (countrySelect.value !== 'none') {
    phoneInput.disabled = false;
    if (countrySelect.options[0].value === 'none') {
      countrySelect.remove(0);
    }
    updatePhonePlaceholder();
  } else {
    phoneInput.disabled = true;
    phoneInput.placeholder = 'Phone';
  }
});

phoneInput.addEventListener('blur', validatePhoneNumber);

updatePhonePlaceholder();



