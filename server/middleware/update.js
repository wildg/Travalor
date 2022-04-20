/**
 * Creates strings for updating a new entry into the database using the provided values
 */
const updateEntryQuery = (req, res, next) => {
  // Initialize update string
  let updateString = ``;

  // Initialize an array containing the values to be used
  let valueArr = [];

  // Get the new values from the request body
  const values = req.body;

  // Loop over all of the keys
  Object.keys(values).forEach((key, index) => {
    // Add the key and entry number to the update string
    updateString += `"${key}"=\$${index + 1},`;

    // Add the new value to the array
    valueArr.push(values[key]);
  });

  // Remove the last comma from the update strings
  updateString = updateString.slice(0, -1);

  // Add the update string to the request query
  req.updateEntryQuery = `SET ${updateString}`;

  // Add the update value array to the request query
  req.updateValueArr = valueArr;
  return next();
};

module.exports = updateEntryQuery;
