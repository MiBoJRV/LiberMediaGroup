const sendData = () => {
  const formData = {
    "ApiKey": "TlRZNE5GODFNVEJmTlRZNE5GOD0=",
    "ApiPassword": "ZTLV6Ava1J",
    "CampaignID": 8286,
    "FirstName": "John",
    "LastName": "Doe",
    "Email": "johndoe@example.com",
    "PhoneNumber": "1234567890"
  };

  // Proxy server URL
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // Target API URL
  const apiUrl = 'https://tracker.pablo.partners/repost.php?act=register';

  // Send the form data via HTTP POST using fetch with the proxy server
  fetch(`${proxyUrl}${apiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      // Process the response as needed
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });
};

// Attach the sendData function to the form submit event
const form = document.getElementById('mypost');
form.addEventListener('submit', event => {
  event.preventDefault(); // Prevent the default form submission
  sendData(); // Call the sendData function to send the form data
});
