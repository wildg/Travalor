import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import create from '../../js/create';

import { LocationContext } from '../../contexts/LocationContext';
import ErrorNotification from '../notifications/ErrorNotification';
import EventCard from '../cards/EventCard';

import { Grid } from '@mui/material';

function Events({ locationID, from, to = null }) {
  const [error, setError] = useState('');
  const [eventData, setEventData] = useState([]);

  // Get location function
  const { getLocation } = useContext(LocationContext);

  // Upon location ID change, get the events
  useEffect(() => {
    const getEventData = async () => {
      // Get the location data for the provided location
      const location = getLocation(locationID);

      // If no location data is found, set the error
      if (location === null)
        return setError('Error getting location');

      // Get the date information
      const fromDate = new Date(from);
      let toDate = new Date(from);
      toDate.setDate(fromDate.getDate() + 31);

      // If to is not null, use it instead
      if (to !== null) toDate = new Date(to);

      // Create the request data
      const reqData = {
        CITY: location.CITY,
        COUNTRY: location.COUNTRY,
        START_DATE: fromDate.toISOString().substring(0, 10),
        END_DATE: toDate.toISOString().substring(0, 10),
      };

      // Send a create request
      const res = await create(`/search/events/`, reqData);

      // If the type of response is a string, there was an error
      if (typeof res === 'string') setError(res);
      // If the response was -1, there was a server error
      else if (res === -1) setError('Error contacting server');
      // Otherwise, set the events
      else setEventData(res);
    };

    getEventData();
  }, [locationID, from, to]);

  // If there is some error, return the error
  if (error !== '') return <ErrorNotification text={error} />;
  // If the transport data amount does not match orders, return the error
  else if (eventData.length === 0) return <h2>No events found</h2>;

  // Create the passenger cards to display
  const eventCards = eventData.map((val) => {
    return (
      <Grid
        key={val.EVENT_ID}
        item
        xl={3}
        lg={4}
        md={6}
        sm={12}
        xs={12}
        p={1}
      >
        <EventCard values={val} />
      </Grid>
    );
  });

  return (
    <Grid container maxWidth={'xl'}>
      {eventCards}
    </Grid>
  );
}

Events.propTypes = {
  locationID: PropTypes.any.isRequired,
  from: PropTypes.any.isRequired,
  to: PropTypes.any,
};

export default Events;
