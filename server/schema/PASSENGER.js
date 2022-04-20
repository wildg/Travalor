const joi = require('joi');

const PASSENGER_SCHEMA = joi.object({
  FIRST_NAME: joi.string(),
  MID_NAME: joi.string().allow(null).optional(),
  LAST_NAME: joi.string(),
  GENDER: joi.valid('Male', 'Female', 'Other'),
  BIRTHDAY: joi.date(),
});

module.exports = PASSENGER_SCHEMA;
