// Use joi for schema validation
const joi = require('joi');

const EVENT_SCHEMA = joi.object({
  DATE: joi.date(),
  NAME: joi.string(),
  TYPE: joi.string().valid('Concert', 'Festival', 'Exhibit', 'Other'),
  CITY: joi.string(),
  COUNTRY: joi.string(),
});

// Export the USER schema
module.exports = EVENT_SCHEMA;
