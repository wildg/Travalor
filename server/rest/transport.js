// Get the function for sending queries to the database
const pool = require('../database');

const getTransport = async (req, res) => {
  // Get the TRANSPORT ID from the request parameters
  const { transport_id } = req.params;

  // Create the query string we want to send
  const q = `SELECT * FROM "TRANSPORT" WHERE "TRANSPORT_ID"=$1;`;

  // Send the query to the database
  return await pool.query(q, [transport_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }
    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

/**
 * Create a new Transport in the database using body data
 */
const createTransport = async (req, res) => {
  // Get the create entry query from the request
  const { createEntryQuery, createValueArr } = req;

  // Create the query string we want to send
  const q = `INSERT INTO "TRANSPORT" ${createEntryQuery} RETURNING *;`;

  // Send the query to the database
  return await pool.query(q, createValueArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

/**
 * Updates a specific Transport in the database using body data
 */
const updateTransport = async (req, res) => {
  // Get the TRANSPORT ID from the request parameters
  const { transport_id } = req.params;

  // Get the create entry query from the request
  const { updateEntryQuery, updateValueArr } = req;

  // Create the query string we want to send
  const q = `UPDATE "TRANSPORT" ${updateEntryQuery} WHERE "TRANSPORT_ID"=\$${
    updateValueArr.length + 1
  } RETURNING *;`;

  // Add the Client ID to the update value array
  updateValueArr.push(transport_id);

  // Send the query to the database
  return await pool.query(q, updateValueArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }

    // If the result is empty, send an error
    else if (results.rows.length === 0) {
      return res.status(404).json('TRANSPORT not found');
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

const deleteTransport = async (req, res) => {
  // Get the Client ID from the request parameters
  const { transport_id } = req.params;
  // Create the query string we want to send
  const q = `DELETE FROM "TRANSPORT" WHERE "TRANSPORT_ID"=$1 RETURNING *;`;
  // Send the query to the database
  return await pool.query(q, [transport_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json('Error sending query');
    }
    // Send back that the Client was deleted
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  getTransport,
  createTransport,
  updateTransport,
  deleteTransport,
};
