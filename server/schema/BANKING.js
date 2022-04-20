// Use joi for schema validation
const joi = require('joi');

/**
 * The schema for the BANKING information we can update includes:
 * - CARD_NO (Number): Card Number for the user/transaction
 * - EXPIRATION (Date): The expiration date for the payment method
 * - FIRST_NAME (String): The first name for the payment
 * - MID_NAME (String): The middle name for the payment
 * - LAST_NAME (String): The last name for the payment
 */
const BANKING_SCHEMA = joi.object({
  CARD_NO: joi.number(),
  EXPIRATION: joi.date(),
  FIRST_NAME: joi.string(),
  MID_NAME: joi.string().allow(null),
  LAST_NAME: joi.string(),
});

// Export the USER schema
module.exports = BANKING_SCHEMA;
