// Get the function for sending queries to the database
const pool = require('../database');

const getBookings = async (req, res) => {
  const { client_id } = req.params;

  // Create the query string we want to send
  const q = `SELECT * FROM "BOOKING" WHERE "CLIENT_ID"=$1;`;

  // Send the query to the database
  return await pool.query(q, [client_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json(error.detail);
    }
    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

/**
 * Create a new Booking in the database using body data
 */
const createBooking = async (req, res) => {
  // Get the create entry query from the request
  const { createEntryQuery, createValueArr } = req;

  // Create the query string we want to send
  const q = `INSERT INTO "BOOKING" ${createEntryQuery} RETURNING *;`;

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

const deleteBooking = async (req, res) => {
  // Get the Location ID from the request parameters
  const { booking_id } = req.params;

  // Create the query string we want to send
  const q = `DELETE FROM "BOOKING" WHERE "BOOKING_ID"=$1 RETURNING *;`;

  // Send the query to the database
  return await pool.query(q, [booking_id], (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).json('Error sending query');
    }

    // Send back that the Client was deleted
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  getBookings,
  createBooking,
  deleteBooking,
};
