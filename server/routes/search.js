// Create a new router object to maintain multiple routes
const router = require('express').Router();

// Get the search schema
const {
  SEARCH_ONE_WAY,
  SEARCH_RETURN,
  SEARCH_EVENT,
} = require('../schema/SEARCH');

// Get the validation middleware functions
const {
  validateParamID,
  validateBodyValues,
} = require('../middleware/validate');

// Get the rest API functions
const {
  searchOneWay,
  searchReturn,
  searchEvents,
} = require('../rest/search');

router.post(
  '/one-way/',
  validateParamID('client_id'),
  validateBodyValues(SEARCH_ONE_WAY, true),
  searchOneWay,
);

router.post(
  '/return/',
  validateParamID('client_id'),
  validateBodyValues(SEARCH_RETURN, true),
  searchReturn,
);

router.post(
  '/events/',
  validateBodyValues(SEARCH_EVENT, true),
  searchEvents,
);

module.exports = router;
