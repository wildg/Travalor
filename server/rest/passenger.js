// Get the function for sending queries to the database
const pool = require('../database');

const getPassengers = async (req, res) => {
  const { booking_id } = req.params;

  // Create the query string we want to send
  const q = `SELECT * FROM "PASSENGER" WHERE "BOOKING_ID"=$1;`;

  // Send the query to the database
  return await pool.query(q, [booking_id], (error, results) => {
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
const createPassenger = async (req, res) => {
  // Get the create entry query from the request
  const { createEntryQuery, createValueArr } = req;

  // Create the query string we want to send
  const q = `INSERT INTO "PASSENGER" ${createEntryQuery} RETURNING *;`;

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

module.exports = {
  getPassengers,
  createPassenger,
};
