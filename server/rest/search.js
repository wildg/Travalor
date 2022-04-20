// Get the function for sending queries to the database
const pool = require('../database');

// submit two queries.
// one for getting all of the transport methods available
// another one will be for all the events happening during that time
//    - return an obj that has an (event1, event2, ..) and has (trip1, trip2, ....)

const searchOneWay = async (req, res) => {
  // Create the query string we want to send
  const q = `SELECT T.*
    FROM "TRANSPORT" as T 
    WHERE (T."DEPART_PLACE" = $1 AND
      T."ARRIVE_PLACE" = $2 AND
      T."DEPART_TIME" BETWEEN $3 AND $4)`;

  // Receive values from body
  const { DEPART, ARRIVE, FROM, TRANSPORT } = req.body;

  // Create both ends of from date
  const FROM_start = FROM + ' 00:00:00';
  const FROM_end = FROM + ' 23:59:59';

  // Determine the value array
  const valArr = [DEPART, ARRIVE, FROM_start, FROM_end];

  // Send the query to the database
  return await pool.query(q, valArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).send(error.detail);
    }

    // Get the response from the server
    let response = results.rows;

    // If the transport is specified, filter the response
    if (TRANSPORT !== 'All') {
      response = response.filter((val) => {
        if (val.TYPE === TRANSPORT) return val;
      });
    }

    // Send back the resulting rows
    return res.status(200).json(response);
  });
};

const searchReturn = async (req, res) => {
  // // Create the query string we want to send
  const q = `SELECT T.*
    FROM "TRANSPORT" as T 
    WHERE (T."DEPART_PLACE" = $1 AND
      T."ARRIVE_PLACE" = $2 AND
      T."DEPART_TIME" BETWEEN $3 AND $4)
      OR (T."DEPART_PLACE" = $5 AND
      T."ARRIVE_PLACE" = $6 AND
      T."DEPART_TIME" BETWEEN $7 AND $8)`;

  // Receive values from body
  const { DEPART, ARRIVE, FROM, TO, TRANSPORT } = req.body;

  // Create both ends of from date
  const FROM_start = FROM + ' 00:00:00';
  const FROM_end = FROM + ' 23:59:59';

  // Create both ends of from date
  const TO_start = TO + ' 00:00:00';
  const TO_end = TO + ' 23:59:59';

  // Determine the value array
  const valArr = [
    DEPART,
    ARRIVE,
    FROM_start,
    FROM_end,
    ARRIVE,
    DEPART,
    TO_start,
    TO_end,
  ];

  return await pool.query(q, valArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).send(error.detail);
    }

    // Get the response from the server
    let response = results.rows;

    // If the transport is specified, filter the response
    if (TRANSPORT !== 'All') {
      response = response.filter((val) => {
        if (val.TYPE === TRANSPORT) return val;
      });
    }

    // Send back the resulting rows
    return res.status(200).json(response);
  });
};

const searchEvents = async (req, res) => {
  // // Create the query string we want to send
  const q = `SELECT E.*
    FROM "EVENT" as E 
    WHERE (E."CITY" = $1 AND
      E."COUNTRY" = $2 AND
      E."DATE" BETWEEN $3 AND $4)
    ORDER BY E."DATE" ASC`;

  // Receive values from body
  const { CITY, COUNTRY, START_DATE, END_DATE } = req.body;

  // Determine the value array
  const valArr = [CITY, COUNTRY, START_DATE, END_DATE];

  return await pool.query(q, valArr, (error, results) => {
    // If there is an error, send it
    if (error) {
      return res.status(500).send(error.detail);
    }

    // Send back the resulting rows
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  searchOneWay,
  searchReturn,
  searchEvents,
};
