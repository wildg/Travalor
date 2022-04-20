// Use joi for schema validation
const joi = require('joi');

/**
 * The format for IDs (UUIDv4)
 */
const ID = joi.string().guid({
  version: ['uuidv4'],
});

module.exports = {
  ID,
};
