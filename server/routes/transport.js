// Create a new router object to maintain multiple routes
const router = require('express').Router();

const TRANSPORT_SCHEMA = require('../schema/TRANSPORT');

// Get the validation middleware functions
const {
  validateParamID,
  validateBodyValues,
  authenticateAdmin,
} = require('../middleware/validate');

// Get the create middleware function
const createEntryQuery = require('../middleware/create');

// Get the update middleware function
const updateEntryQuery = require('../middleware/update');

const {
  getTransport,
  createTransport,
  updateTransport,
  deleteTransport,
} = require('../rest/transport');

// Gets Transport
router.get('/', validateParamID('transport_id'), getTransport);

// Creates a new transport
router.post(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateBodyValues(TRANSPORT_SCHEMA, true),
  createEntryQuery(TRANSPORT_SCHEMA),
  createTransport,
);

// Update Transport
router.put(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateParamID('transport_id'),
  validateBodyValues(TRANSPORT_SCHEMA, false),
  updateEntryQuery,
  updateTransport,
);

// Delete Transport
router.delete(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateParamID('transport_id'),
  deleteTransport,
);

module.exports = router;
