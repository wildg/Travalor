// Create a new router object to maintain multiple routes
const router = require('express').Router();

// Get the event schema
const EVENT_SCHEMA = require('../schema/EVENTS');

// Get the validation middleware functions
const {
  validateParamID,
  validateBodyValues,
  authenticateAdmin,
} = require('../middleware/validate');

const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../rest/events');

const createEntryQuery = require('../middleware/create');
const updateEntryQuery = require('../middleware/update');

router.get('/', validateParamID('event_id'), getEvent);

// Creates a new event
router.post(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateBodyValues(EVENT_SCHEMA, true),
  createEntryQuery(EVENT_SCHEMA),
  createEvent,
);

// Updates an existing event
router.put(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateParamID('event_id'),
  validateBodyValues(EVENT_SCHEMA, false),
  updateEntryQuery,
  updateEvent,
);

router.delete(
  '/',
  validateParamID('admin_id'),
  authenticateAdmin,
  validateParamID('event_id'),
  deleteEvent,
);

module.exports = router;
