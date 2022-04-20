const Pool = require('pg').Pool;

// Create a new pool of resources
const pool = new Pool({
  host: 'localhost', // Connect to localhost
  database: 'TravalorDB', // Connect to specific database
  user: process.env.PG_USER, // Use environment username variable
  password: process.env.PG_PASS, // Use environment password variable
  port: 5432, // Use correct port
});

// Connect to the pre-defined pool
pool.connect((err, client, release) => {
  // If there is an error connecting, return the error
  if (err) {
    return console.log('Error aquiring client');
  }

  // Query the client to get the current date
  client.query('SELECT NOW()', (err, result) => {
    // Release the client
    release();

    // If there is an error, return the error
    if (err) {
      return console.log('Error executing query');
    }
  });
});

// Export the pool object
module.exports = pool;
