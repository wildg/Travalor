import { SERVER_URL } from './config';

/**
 * Make a get request
 *
 * @param {string} endpoint The endpoint we are request to
 * @param {*} data The body data that is being sent
 */
async function get(endpoint, data = null) {
  // Create the content headers
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  // Create the request options
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  // If the data is not null append it to the request
  if (data !== null) requestOptions.body = JSON.stringify(data);

  return await fetch(`${SERVER_URL}${endpoint}`, requestOptions)
    .then((data) => data.json())
    .catch((error) => {
      console.log(error);
      return -1;
    });
}

export default get;
