// Create a new router object to maintain multiple routes
const router = require('express').Router();

// Get the user schema
const {
  ADMIN_SCHEMA,
  ADMIN_SIGN_IN_SCHEMA,
} = require('../schema/ADMIN');

// Get the validation middleware functions
const {
  validateParamID,
  validateBodyValues,
} = require('../middleware/validate');

// Get the update middleware function
const updateEntryQuery = require('../middleware/update');

// Get the rest API functions
const {
  adminSignIn,
  getAdmin,
  updateAdmin,
} = require('../rest/admin');

router.get('/', validateParamID('admin_id'), getAdmin);

router.post(
  '/sign-in/',
  validateBodyValues(ADMIN_SIGN_IN_SCHEMA, true),
  adminSignIn,
);

router.put(
  '/',
  validateParamID('admin_id'),
  validateBodyValues(ADMIN_SCHEMA, false),
  updateEntryQuery,
  updateAdmin,
);

module.exports = router;
