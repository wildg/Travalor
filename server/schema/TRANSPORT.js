const joi = require('joi');

// Get the ID format from the general schema
const { ID } = require('../schema/general');

const TRANSPORT_SCHEMA = joi.object({
  COMPANY: joi.string(),
  TYPE: joi.valid('Flight', 'Bus', 'Train'),
  PRICE: joi.number(),
  DEPART_TIME: joi.date(),
  ARRIVE_TIME: joi.date(),
  ARRIVE_PLACE: ID,
  DEPART_PLACE: ID,
});

// Export the TRANSPORT schema
module.exports = TRANSPORT_SCHEMA;
