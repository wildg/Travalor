const joi = require('joi');

// Get the ID format from the general schema
const { ID } = require('../schema/general');

const BOOKING_SCHEMA = joi.object({
  COST: joi.number(),
  TRANSPORT_ID: ID,
});

module.exports = BOOKING_SCHEMA;
