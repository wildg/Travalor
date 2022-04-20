/**
 * Creates strings for making a new entry into the database using the provided schema
 * and new values
 * @param {object} schema The schema for the new item we are creating
 * @param {object} values The new values for the item we are creating
 */
const createEntryQuery = (schema, params = null) => {
  // Get the keys from the schema
  const { keys } = schema.$_terms;

  // Return an async middleware function
  return (req, res, next) => {
    // Initialize key and value strings
    let keyString = ``;
    let valueString = ``;

    // Initialize an array containing the values to be used
    let valueArr = [];

    // Get the new values from the request body
    const values = req.body;

    // Initialize an index
    let index = 1;

    // Loop over all of the body keys
    keys.forEach((k) => {
      // Add the key to the key string and entry number to the value string
      keyString += `"${k.key}",`;
      valueString += `\$${index},`;

      // Add the new value to the array
      valueArr.push(values[k.key]);
      index += 1;
    });

    // If there are params that have to be added:
    if (params !== null) {
      // Loop over all of the params keys
      Object.keys(params).forEach((k) => {
        // Add the key to the key string and entry number to the value string
        keyString += `"${k}",`;
        valueString += `\$${index},`;

        // Add the new value to the array
        const param_key = params[k];
        valueArr.push(req.params[param_key]);
        index += 1;
      });
    }

    // Remove the last comma from the key and value strings
    keyString = keyString.slice(0, -1);
    valueString = valueString.slice(0, -1);

    // Add the key string and values to the request query
    req.createEntryQuery = `(${keyString}) VALUES (${valueString})`;

    // Add the create value array to the request query
    req.createValueArr = valueArr;
    return next();
  };
};

module.exports = createEntryQuery;
