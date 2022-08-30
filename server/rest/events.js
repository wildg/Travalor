// Get the function for sending queries to the database
const pool = require('../database');

const getEvent = async (req, res) => {
  // Get the Client ID from the request parameters
  const { event_id } = req.params;

  // Create the query string we want to send
  const q = `SELECT * FROM "EVENT" WHERE "EVENT_ID"=$1;`;

  // Send the query to the database
  return await pool.query(q, [event_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }
    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

/**
 * Create a new Event in the database using body data
 */
const createEvent = async (req, res) => {
  // Get the create entry query from the request
  const { createEntryQuery, createValueArr } = req;

  // Create the query string we want to send
  const q = `INSERT INTO "EVENT" ${createEntryQuery} RETURNING *;`;

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
 * Updates a specific Event in the database using body data
 */
const updateEvent = async (req, res) => {
  // Get the Client ID from the request parameters
  const { event_id } = req.params;

  // Get the create entry query from the request
  const { updateEntryQuery, updateValueArr } = req;

  // Create the query string we want to send
  const q = `UPDATE "EVENT" ${updateEntryQuery} WHERE "EVENT_ID"=\$${
    updateValueArr.length + 1
  } RETURNING *;`;

  // Add the Client ID to the update value array
  updateValueArr.push(event_id);

  // Send the query to the database
  return await pool.query(q, updateValueArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }

    // If the result is empty, send an error
    else if (results.rows.length === 0) {
      return res.status(404).json('EVENT not found');
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

const deleteEvent = async (req, res) => {
  // Get the Client ID from the request parameters
  const { event_id } = req.params;

  // Create the query string we want to send
  const q = `DELETE FROM "EVENT" WHERE "EVENT_ID"=$1 RETURNING *;`;

  // Send the query to the database
  return await pool.query(q, [event_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json('Error sending query');
    }

    // Send back that the Client was deleted
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  updateEvent,
  deleteEvent,
  getEvent,
  createEvent,
};
