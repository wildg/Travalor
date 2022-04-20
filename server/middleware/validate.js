// Get the ID format from the general schema
const { ID } = require('../schema/general');

// Get the function for sending queries to the database
const pool = require('../database');

/**
 * Middleware for validating the ID given by the parameter
 * @param {string} key The key for the ID parameter
 */
const validateParamID = (key) => {
  // Return an async middleware function
  return (req, res, next) => {
    // Get the parameter ID from the key
    const id = req.query[key];

    // Validate that the ID is the correct format
    const { error } = ID.validate(id);

    // If there is an error, return it
    if (error !== undefined) {
      return res.status(404).json('Incorrect ID format');
    }
    // Add the key to params
    req.params[key] = id;
    return next();
  };
};

/**
 * Middleware for validating a given body based on some schema
 * @param {object} schema The schema for the body we want to validate
 * @param {boolean} required Whether or not the schema values are required (Defaults to
 * false)
 */
const validateBodyValues = (schema, required = false) => {
  // If required is true, use the string 'required' (Otherwise, use 'optional')
  const precenseStr = required ? 'required' : 'optional';

  // Return an async middleware function
  return (req, res, next) => {
    // Get the body from the request
    const { body } = req;
    // Validate that the new info matches the user schema
    const { error } = schema.validate(body, {
      presence: precenseStr,
    });

    // If there is an error, return it
    if (error !== undefined) {
      return res.status(404).json(error.details[0].message);
    }
    return next();
  };
};

const authenticateAdmin = async (req, res, next) => {
  const authenticate_admin = `SELECT 1 FROM "ADMIN" WHERE "ADMIN_ID"=$1`;

  const { admin_id } = req.params;

  // Send the query to the database
  return await pool.query(
    authenticate_admin,
    [admin_id],
    (error, results) => {
      // If there is an error, send it
      if (error) {
        return res.status(500).json(error.detail);
      }

      // if no admins exist, return error
      if (results.rows.length === 0) {
        return res.status(200).json('ADMIN not found');
      }
      // Send back the resulting rows
      return next();
    },
  );
};

module.exports = {
  validateParamID,
  validateBodyValues,
  authenticateAdmin,
};
