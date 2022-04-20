// Create a new router object to maintain multiple routes
const router = require('express').Router();

// Get the client schema
const {
  CLIENT_SCHEMA,
  CLIENT_SIGN_IN_SCHEMA,
} = require('../schema/CLIENT');

// Get the validation middleware functions
const {
  validateParamID,
  validateBodyValues,
} = require('../middleware/validate');

// Get the create middleware function
const createEntryQuery = require('../middleware/create');

// Get the update middleware function
const updateEntryQuery = require('../middleware/update');

// Get the rest API functions
const {
  createClient,
  getClient,
  updateClient,
  deleteClient,
  clientSignIn,
} = require('../rest/client');

// Get a specific client's information
router.get('/', validateParamID('client_id'), getClient);

// Get a specific client's information
router.post(
  '/sign-in/',
  validateBodyValues(CLIENT_SIGN_IN_SCHEMA, true),
  clientSignIn,
);

// Creates a new client
router.post(
  '/',
  validateBodyValues(CLIENT_SCHEMA, true),
  createEntryQuery(CLIENT_SCHEMA),
  createClient,
);

// Update client information
router.put(
  '/',
  validateParamID('client_id'),
  validateBodyValues(CLIENT_SCHEMA, false),
  updateEntryQuery,
  updateClient,
);

// Deletes a specific client
router.delete('/', validateParamID('client_id'), deleteClient);

module.exports = router;
