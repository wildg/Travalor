import { SERVER_URL } from './config';

/**
 * Make a create request
 *
 * @param {string} endpoint The endpoint we are sending data to
 * @param {*} data The body data that is being sent
 */
async function create(endpoint, data) {
  // Stringify the data
  const jsonData = JSON.stringify(data);

  // Create the content headers
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  // Create the request options
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: jsonData,
  };

  return await fetch(`${SERVER_URL}${endpoint}`, requestOptions)
    .then((data) => data.json())
    .catch((error) => {
      console.log(error);
      return -1;
    });
}

export default create;
