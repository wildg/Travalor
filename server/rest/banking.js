// Get the function for sending queries to the database
const pool = require('../database');

/**
 * Create a new Client in the database using body data
 */
const createBankingInfo = async (req, res) => {
  // Get the create entry query from the request
  const { createEntryQuery, createValueArr } = req;

  // Create the query string we want to send
  const q = `INSERT INTO "BANKING" ${createEntryQuery} RETURNING *;`;

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

const getBankingInfo = async (req, res) => {
  // Get the Client ID from the request parameters
  const { client_id } = req.params;

  // Create the query string we want to send
  const q = `SELECT * FROM "BANKING" WHERE "CLIENT_ID"=$1;`;

  // Send the query to the database
  return await pool.query(q, [client_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json('Error sending query');
    }

    // If the rows are empty, send that the Client does not exist
    else if (results.rows.length === 0) {
      return res.status(404).json('BANKING does not exist');
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

/**
 * Updates a specific Banking info in the database using body data
 */
const updateBankingInfo = async (req, res) => {
  // Get the Client ID from the request parameters
  const { client_id } = req.params;

  // Get the create entry query from the request
  const { updateEntryQuery, updateValueArr } = req;

  // Create the query string we want to send
  const q = `UPDATE "BANKING" ${updateEntryQuery} WHERE "CLIENT_ID"=\$${
    updateValueArr.length + 1
  } RETURNING *;`;

  // Add the Client ID to the update value array
  updateValueArr.push(client_id);

  // Send the query to the database
  return await pool.query(q, updateValueArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }

    // If the result is empty, send an error
    else if (results.rows.length === 0) {
      return res.status(404).json('BANKING INFO not found');
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

const deleteBankingInfo = async (req, res) => {
  // Get the Client ID from the request parameters
  const { client_id } = req.params;

  // Create the query string we want to send
  const q = `DELETE FROM "BANKING" WHERE "CLIENT_ID"=$1 RETURNING *;`;

  // Send the query to the database
  return await pool.query(q, [client_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json('Error sending query');
    }

    // Send back that the Client was deleted
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  createBankingInfo,
  updateBankingInfo,
  deleteBankingInfo,
  getBankingInfo,
};
