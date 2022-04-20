// Initialize Express server
const express = require('express');
const app = express();

// Get CORS for handling requests
const cors = require('cors');

// Initialize body parser for JSON data
const bodyParser = require('body-parser');

// Get the routes
const clientRoutes = require('./routes/client.js');
const bankingRoutes = require('./routes/banking.js');
const adminRoutes = require('./routes/admin.js');
const searchRoutes = require('./routes/search.js');
const eventRoutes = require('./routes/events.js');
const transportRoutes = require('./routes/transport.js');
const locationRoutes = require('./routes/location.js');
const bookingRoutes = require('./routes/booking.js');
const passengerRoutes = require('./routes/passenger.js');

// Designate a port for the server to use
const PORT = process.env.PORT || 3001;

// Listen to the port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Allow for JSON data to be transmitted
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the different routes
app.use('/client', clientRoutes); // Use the user route
app.use('/banking', bankingRoutes);
app.use('/admin', adminRoutes);
app.use('/search', searchRoutes);
app.use('/events', eventRoutes);
app.use('/transport', transportRoutes);
app.use('/location', locationRoutes);
app.use('/booking', bookingRoutes);
app.use('/passenger', passengerRoutes);
