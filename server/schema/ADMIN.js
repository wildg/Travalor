// Use joi for schema validation
const joi = require('joi');

/**
 * The schema for the ADMIN information we can update includes:
 * - EMAIL (String -> Email): The email for the user
 * - PASSWORD (String): The password for the user
 * - FIRST_NAME (String): The first name for the user
 * - LAST_NAME (String): The last name for the user
 */
const ADMIN_SCHEMA = joi.object({
  EMAIL: joi.string().email(),
  PASSWORD: joi.string(),
  FIRST_NAME: joi.string(),
  LAST_NAME: joi.string(),
});

/**
 * The schema for the ADMIN sign in information:
 * - EMAIL (String -> Email): The email for the user
 * - PASSWORD (String): The password for the user
 */
const ADMIN_SIGN_IN_SCHEMA = joi.object({
  EMAIL: joi.string().email(),
  PASSWORD: joi.string(),
});

// Export the USER schema
module.exports = { ADMIN_SCHEMA, ADMIN_SIGN_IN_SCHEMA };
