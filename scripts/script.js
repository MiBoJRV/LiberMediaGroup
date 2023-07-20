function sendLeadData(event) {
  event.preventDefault();

  const form = document.getElementById('mypost');
  const firstName = form.querySelector('.dr-field-fname').value;
  const lastName = form.querySelector('.dr-field-lname').value;
  const email = form.querySelector('.dr-field-email').value;
  const phoneNumber = form.querySelector('.dr-field-phone').value;
  const phoneCode = document.querySelector('.code-select').value;
  const fullNumber = `${phoneCode}${phoneNumber}`;

  const payload = {
    ApiKey: 'TlRZNE5GODFNVEJmTlRZNE5GOD0=',
    ApiPassword: 'ZTLV6Ava1J',
    CampaignID: '8286',
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    PhoneNumber: fullNumber,
  };


  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  const apiUrl = 'https://tracker.pablo.partners/repost.php?act=register';

  fetch(`${proxyUrl}${apiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.ok) {
        console.log('Lead data sent successfully!');
        form.reset();
      } else {
        throw new Error('Failed to send lead data');
      }
    })
    .catch(error => {
      console.error('An error occurred while sending lead data:', error.message);
    });
}

const form = document.getElementById('mypost');
// form.addEventListener('submit', sendLeadData);

form.addEventListener('submit', (event) => {

  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isPhoneNumberValid = phoneInput.dispatchEvent(new Event('blur'));
  if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid) {
    sendLeadData(event);
  } else {
    console.log('`Not all required fields are correct');
  }
});
