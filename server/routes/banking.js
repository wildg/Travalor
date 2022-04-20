// Create a new router object to maintain multiple routes
const router = require('express').Router();

// Get the BankingInfo schema
const BANKING_SCHEMA = require('../schema/BANKING');

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
  createBankingInfo,
  getBankingInfo,
  updateBankingInfo,
  deleteBankingInfo,
} = require('../rest/banking');

// Get a specific clients Banking information
router.get('/', validateParamID('client_id'), getBankingInfo);

// Update Banking information for a client
router.put(
  '/',
  validateParamID('client_id'),
  validateBodyValues(BANKING_SCHEMA, false),
  updateEntryQuery,
  updateBankingInfo,
);

// Creates a new Banking entry
router.post(
  '/',
  validateParamID('client_id'),
  validateBodyValues(BANKING_SCHEMA, true),
  createEntryQuery(BANKING_SCHEMA, { CLIENT_ID: 'client_id' }),
  createBankingInfo,
);

// Deletes a specific Banking
router.delete('/', validateParamID('client_id'), deleteBankingInfo);

module.exports = router;
