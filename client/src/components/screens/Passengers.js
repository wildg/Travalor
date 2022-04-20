import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import get from '../../js/get';

import ErrorNotification from '../notifications/ErrorNotification';
import PassengerCard from '../cards/PassengerCard';

import { Grid } from '@mui/material';
import Section from './Section';

function Passengers({ orderID }) {
  const [error, setError] = useState('');
  const [passengerData, setPassengerData] = useState([]);

  // Upon order change, get passenger data
  useEffect(() => {
    const getPassengerData = async () => {
      // Send a get request
      const res = await get(`/passenger?booking_id=${orderID}`);

      // If the type of response is a string, there was an error
      if (typeof res === 'string') setError(res);
      // If the response was -1, there was a server error
      else if (res === -1) setError('Error contacting server');
      // Otherwise, set the passenger data
      else setPassengerData(res);
    };

    getPassengerData();
  }, [orderID]);

  // If there is some error, return the error
  if (error !== '') return <ErrorNotification text={error} />;
  // If no passenger data is available, return an error
  else if (passengerData.length === 0)
    return <ErrorNotification text="Error getting passenger data" />;

  // Create the passenger cards to display
  const passengerCards = passengerData.map((val) => {
    return (
      <Grid
        key={val.PASSENGER_ID}
        item
        xl={3}
        lg={4}
        md={6}
        sm={12}
        xs={12}
        p={1}
      >
        <PassengerCard values={val} />
      </Grid>
    );
  });
  return (
    <Grid container maxWidth={'xl'}>
      {passengerCards}
    </Grid>
  );
}

Passengers.propTypes = {
  orderID: PropTypes.string,
};

export default Passengers;
