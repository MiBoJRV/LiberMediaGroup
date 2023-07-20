function getDataFromServer() {
  const apiKey = 'TlRZNE5GODFNVEJmTlRZNE5GOD0=';
  const apiPassword = 'ZTLV6Ava1J';

  // Set the date range for July 18th
  const dateFrom = '2023-07-18 00:00:00';
  const dateTo = '2023-07-18 23:59:59';

  const payload = {
    ApiKey: apiKey,
    ApiPassword: apiPassword,
    DateFrom: dateFrom,
    DateTo: dateTo,
    Grouped: '0'
  };

  // Proxy server URL
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // Target API URL
  const apiUrl = 'https://tracker.pablo.partners/repost.php?act=get_leads_status';

  fetch(`${proxyUrl}${apiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
        console.log('get')
      } else {
        throw new Error('Failed to retrieve data from the server');
      }
    })
    .then(data => {
      // Process the retrieved data
      console.log(data);
    })
    .catch(error => {
      console.error('An error occurred while retrieving data from the server:', error.message);
    });
}

// Call the function to retrieve data from the server
getDataFromServer();
