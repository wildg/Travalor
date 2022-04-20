// Create a new router object to maintain multiple routes
const router = require('express').Router();

// Get the Location schema
const LOCATION_SCHEMA = require('../schema/LOCATION');

// Get the validation middleware functions
const {
  validateParamID,
  validateBodyValues,
  authenticateAdmin,
} = require('../middleware/validate');

const {
  getAllLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../rest/location');

const updateEntryQuery = require('../middleware/update');
const createEntryQuery = require('../middleware/create');

router.get('/', validateParamID('location_id'), getLocation);

router.get('/all', getAllLocations);

router.post(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateBodyValues(LOCATION_SCHEMA, true),
  createEntryQuery(LOCATION_SCHEMA),
  createLocation,
);

// Updates an existing location
router.put(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateParamID('location_id'),
  validateBodyValues(LOCATION_SCHEMA, false),
  updateEntryQuery,
  updateLocation,
);

router.delete(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateParamID('location_id'),
  deleteLocation,
);

module.exports = router;
