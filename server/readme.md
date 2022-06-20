# Travalor Server Code

The server code Travalor which defines the API for interacting with the database.

## Use

To run the server code for this project, you will need to have **node** and **npm** installed on your machine. Then, `cd` into the `/server` repo and run:

- `npm i`: Installs the necessary dependencies and packages
- `export PG_USER="..." PG_PASS="..."`: Uses the username and password for the PostgreSQL service
- `npm run devServer`: Runs the server on a development environment

## Endpoints

The endpoints for the server include:

- `/admin`: _Get_ and _Update_ specific admin information.
- `/banking`: _Get_, _Update_, _Create_, and _Delete_ banking information
- `/booking`: _Get_, _Create_, and _Delete_ a booking
- `/client`: _Get_, _Update_, _Create_, and _Delete_ client information
- `/event`: _Get_, _Update_, _Create_, and _Delete_ event information
- `/location`: _Get_, _Update_, _Create_, and _Delete_ location information
- `/passenger`: _Get_ and _Update_ passenger information
- `/search`: _Get_ search information
- `/transport`: _Get_, _Update_, _Create_, and _Delete_ transportation information

## Stack

- **Express**: Simplifies web-server creation
- **Joi**: Schema creation and validation
- **Nodemon**: Re-compiles code during development upon saving
- **Prettier** & **ESLint**: Linters for standardizing code

## Organization

- **index.js**: The main file that is run which creates the server
- **/database**: Connects to the database and sets up querying
- **/routes**: Defines the different routes of the server
- **/middleware**: Functions that help validate API calls
- **/rest**: Functions that run based on API calls
- **/schema**: Contains schema for all of the API data available