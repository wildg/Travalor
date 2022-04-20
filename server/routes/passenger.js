// Create a new router object to maintain multiple routes
const router = require('express').Router();

// Get the BankingInfo schema
const PASSENGER_SCHEMA = require('../schema/PASSENGER');

// Get the validation middleware functions
const {
  validateParamID,
  validateBodyValues,
} = require('../middleware/validate');

// Get the create middleware function
const createEntryQuery = require('../middleware/create');

const {
  getPassengers,
  createPassenger,
} = require('../rest/passenger');

router.get('/', validateParamID('booking_id'), getPassengers);

router.post(
  '/',
  validateParamID('booking_id'),
  validateBodyValues(PASSENGER_SCHEMA, true),
  createEntryQuery(PASSENGER_SCHEMA, { BOOKING_ID: 'booking_id' }),
  createPassenger,
);

module.exports = router;
