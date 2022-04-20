import { useContext } from 'react';
import PropTypes from 'prop-types';

import { LocationContext } from '../../contexts/LocationContext';

import { Button } from '@mui/material';

function Pricing({ transports, amount }) {
  // Get the location function from the location context
  const { getLocation } = useContext(LocationContext);

  // Initialize travelers amount
  let travelers = amount;

  // If amount is a string, update travelers
  if (typeof amount === 'string') travelers = parseInt(amount);

  // Initialize a total amount
  let total = 0;

  const costComponent = transports.map((transport, i) => {
    // Get departure and arrival information
    const depart = getLocation(transport.DEPART_PLACE);
    const arrive = getLocation(transport.ARRIVE_PLACE);

    // Determine the cost
    const cost = transport.PRICE * travelers;

    // Update the total value
    total += cost;

    return (
      <div className="center-text" key={i}>
        <h2>
          {depart.CITY} to {arrive.CITY}
        </h2>
        <h3 className="c-blue">
          ${transport.PRICE} x {travelers} = ${cost}
        </h3>
      </div>
    );
  });

  return (
    <>
      {costComponent}
      <h2>Total is ${total}</h2>
      <Button fullWidth type="submit" variant="contained">
        Purchase
      </Button>
    </>
  );
}

Pricing.propTypes = {
  transports: PropTypes.array,
  amount: PropTypes.string,
};

export default Pricing;
