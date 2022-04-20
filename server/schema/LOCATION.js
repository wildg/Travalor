const joi = require('joi');

const LOCATION_SCHEMA = joi.object({
  NAME: joi.string(),
  CITY: joi.string(),
  COUNTRY: joi.string(),
  STREET: joi.string(),
});

module.exports = LOCATION_SCHEMA;
