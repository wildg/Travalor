// Create a new router object to maintain multiple routes
const router = require('express').Router();

// Get the BankingInfo schema
const BOOKING_SCHEMA = require('../schema/BOOKING');

// Get the validation middleware functions
const {
  validateParamID,
  validateBodyValues,
} = require('../middleware/validate');

// Get the create middleware function
const createEntryQuery = require('../middleware/create');

const {
  getBookings,
  createBooking,
  deleteBooking,
} = require('../rest/booking');

router.get('/', validateParamID('client_id'), getBookings);

router.post(
  '/',
  validateParamID('client_id'),
  validateBodyValues(BOOKING_SCHEMA, true),
  createEntryQuery(BOOKING_SCHEMA, { CLIENT_ID: 'client_id' }),
  createBooking,
);

router.delete('/', validateParamID('booking_id'), deleteBooking);

module.exports = router;
