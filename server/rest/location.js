// Get the function for sending queries to the database
const pool = require('../database');

const getAllLocations = async (req, res) => {
  // Create the query string we want to send
  const q = `SELECT * FROM "LOCATION";`;
  // Send the query to the database
  return await pool.query(q, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }
    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

const getLocation = async (req, res) => {
  const { location_id } = req.params;
  // Create the query string we want to send
  const q = `SELECT * FROM "LOCATION" WHERE "LOCATION_ID"=$1;`;
  // Send the query to the database
  return await pool.query(q, [location_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }
    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

/**
 * Create a new location in the database using body data
 */
const createLocation = async (req, res) => {
  // Get the create entry query from the request
  const { createEntryQuery, createValueArr } = req;

  // Create the query string we want to send
  const q = `INSERT INTO "LOCATION" ${createEntryQuery} RETURNING *;`;

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
 * Updates a specific Location in the database using body data
 */
const updateLocation = async (req, res) => {
  // Get the Client ID from the request parameters
  const { location_id } = req.params;

  // Get the create entry query from the request
  const { updateEntryQuery, updateValueArr } = req;

  // Create the query string we want to send
  const q = `UPDATE "LOCATION" ${updateEntryQuery} WHERE "LOCATION_ID"=\$${
    updateValueArr.length + 1
  } RETURNING *;`;

  // Add the Client ID to the update value array
  updateValueArr.push(location_id);

  // Send the query to the database
  return await pool.query(q, updateValueArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }

    // If the result is empty, send an error
    else if (results.rows.length === 0) {
      return res.status(404).json('LOCATION not found');
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

const deleteLocation = async (req, res) => {
  // Get the Location ID from the request parameters
  const { location_id } = req.params;

  // Create the query string we want to send
  const q = `DELETE FROM "LOCATION" WHERE "LOCATION_ID"=$1 RETURNING *;`;

  // Send the query to the database
  return await pool.query(q, [location_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json('Error sending query');
    }

    // Send back that the Client was deleted
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  getAllLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
