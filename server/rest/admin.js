// Get the function for sending queries to the database
const pool = require('../database');

/**
 * Get a specific Admin's information from the database using a provided ID
 */
const getAdmin = async (req, res) => {
  // Get the Admin's ID from the request parameters
  const { admin_id } = req.params;

  // Create the query string we want to send
  const q = `SELECT * FROM "ADMIN" WHERE "ADMIN_ID"=$1;`;

  // Send the query to the database
  return await pool.query(q, [admin_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json('Error sending query');
    }

    // If the rows are empty, send that the Admin does not exist
    else if (results.rows.length === 0) {
      return res.status(404).json('ADMIN does not exist');
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

/**
 * Get a specific Admin's information from the database using a provided ID
 */
const adminSignIn = async (req, res) => {
  // Get the Admin's email and passwords from the body
  const { EMAIL, PASSWORD } = req.body;

  // Create the query string we want to send
  const q = `SELECT * FROM "ADMIN" WHERE "EMAIL"=$1 AND "PASSWORD"=$2;`;

  // Send the query to the database
  return await pool.query(q, [EMAIL, PASSWORD], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json('Error sending query');
    }

    // If the rows are empty, send that the Admin does not exist
    else if (results.rows.length === 0) {
      return res.status(404).json('ADMIN does not exist');
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

/**
 * Updates a specific Admin in the database using body data
 */
const updateAdmin = async (req, res) => {
  // Get the Admin ID from the request parameters
  const { admin_id } = req.params;

  // Get the create entry query from the request
  const { updateEntryQuery, updateValueArr } = req;

  // Create the query string we want to send
  const q = `UPDATE "ADMIN" ${updateEntryQuery} WHERE "ADMIN_ID"=\$${
    updateValueArr.length + 1
  } RETURNING *;`;

  // Add the Admin ID to the update value array
  updateValueArr.push(admin_id);

  // Send the query to the database
  return await pool.query(q, updateValueArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }

    // If the result is empty, send an error
    else if (results.rows.length === 0) {
      return res.status(404).json('ADMIN not found');
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  getAdmin,
  adminSignIn,
  updateAdmin,
};
