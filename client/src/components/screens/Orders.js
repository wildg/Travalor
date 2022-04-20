import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import get from '../../js/get';

import ErrorNotification from '../notifications/ErrorNotification';
import TransportCard from '../cards/TransportCard';

import { Grid } from '@mui/material';

function Orders({ orders }) {
  const [error, setError] = useState('');
  const [transportData, setTransportData] = useState([]);

  // Upon order change, get new transport data
  useEffect(() => {
    const getTransportData = async () => {
      // Create new transport data
      const newTransport = [];

      // Loop over all of the order data
      for (let i = 0; i < orders.length; i += 1) {
        // Send a get request
        const res = await get(
          `/transport?transport_id=${orders[i].TRANSPORT_ID}`,
        );

        // If the type of response is a string, there was an error
        if (typeof res === 'string') setError(res);
        // If the response was -1, there was a server error
        else if (res === -1) setError('Error contacting server');
        // Otherwise, append the result to transport data
        else newTransport.push(res[0]);
      }

      // Set the transport data
      setTransportData(newTransport);
    };

    getTransportData();
  }, [orders]);

  // If there is some error, return the error
  if (error !== '') return <ErrorNotification text={error} />;
  // If the transport data amount does not match orders, return the error
  else if (transportData.length !== orders.length)
    return <ErrorNotification text="Error getting transport data" />;

  // Create the transport cards to display
  const transportCards = transportData.map((val, i) => {
    // Get the order associate with the transport data
    const orderVal = orders[i];

    // Create the state we want to send through the transport cards
    const state = {
      ORDER: orderVal,
      TRANSPORT: [val],
    };
    return (
      <Grid
        key={val.TRANSPORT_ID}
        item
        xl={3}
        lg={4}
        md={6}
        sm={12}
        xs={12}
        p={1}
      >
        <TransportCard
          values={val}
          href={`/trip`}
          providedState={state}
        />
      </Grid>
    );
  });

  return (
    <Grid container maxWidth={'xl'}>
      {transportCards}
    </Grid>
  );
}

Orders.propTypes = {
  orders: PropTypes.array,
};

export default Orders;
