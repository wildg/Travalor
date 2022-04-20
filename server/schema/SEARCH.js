// Use joi for schema validation
const joi = require('joi');

// Get the ID format from the general schema
const { ID } = require('../schema/general');

const SEARCH_ONE_WAY = joi.object({
  DEPART: ID,
  ARRIVE: ID,
  FROM: joi.date(),
  TRANSPORT: joi.valid('All', 'Flight', 'Bus', 'Train'),
});

const SEARCH_RETURN = joi.object({
  DEPART: ID,
  ARRIVE: ID,
  FROM: joi.date(),
  TO: joi.date(),
  TRANSPORT: joi.valid('All', 'Bus', 'Train', 'Flight'),
});

const SEARCH_EVENT = joi.object({
  CITY: joi.string(),
  COUNTRY: joi.string(),
  START_DATE: joi.date(),
  END_DATE: joi.date(),
});

// Export the USER schema
module.exports = { SEARCH_ONE_WAY, SEARCH_RETURN, SEARCH_EVENT };
