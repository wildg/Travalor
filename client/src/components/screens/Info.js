import { useContext } from 'react';
import PropTypes from 'prop-types';

import { LocationContext } from '../../contexts/LocationContext';
import { createTimeString, createDateString } from '../../js/general';

import Section from '../screens/Section';
import ErrorNotification from '../notifications/ErrorNotification';

function Info({ transports }) {
  // Get the location function from the location context
  const { getLocation } = useContext(LocationContext);

  // If all locations is empty, return nothing
  if (transports.length === 0) return <></>;

  const infoComponent = transports.map((transport, i) => {
    // Get the departure information
    const depart = getLocation(transport.DEPART_PLACE);
    const from = new Date(transport.DEPART_TIME);
    from.setHours(from.getHours() + 7);
    const fromDateStr = createDateString(from);
    const fromTimeStr = createTimeString(from);

    // Get the arrival information
    const arrive = getLocation(transport.ARRIVE_PLACE);
    const to = new Date(transport.ARRIVE_TIME);
    to.setHours(to.getHours() + 7);
    const toDateStr = createDateString(to);
    const toTimeStr = createTimeString(to);

    // If location information could not be obtained, return an error
    if (depart === null || arrive === null)
      return (
        <ErrorNotification
          key={transport.TRANSPORT_ID}
          text="Could not get location information"
        />
      );

    // Initialize the break component
    let breakComponent = <hr />;

    // Check if it should be included
    if (i === transports.length - 1) breakComponent = <></>;

    return (
      <>
        <span className="trip-title">
          Your {transport.TYPE} From <b>{depart.CITY}</b> To{' '}
          <b>{arrive.CITY}</b>
        </span>

        <span className="section-title">
          Depart From {depart.NAME}
        </span>
        <p className="trip-info">
          Date: <b>{fromDateStr}</b>
          <br />
          Time: <b>{fromTimeStr}</b>
          <br />
          Address: <b>{depart.STREET}</b>
          <br />
        </p>

        <span className="section-title">Arrive At {arrive.NAME}</span>
        <span className="trip-info">
          Date: <b>{toDateStr}</b>
          <br />
          Time: <b>{toTimeStr}</b>
          <br />
          Address: <b>{arrive.STREET}</b>
        </span>

        {breakComponent}
      </>
    );
  });

  return (
    <Section center={false} invert={true}>
      {infoComponent}
    </Section>
  );
}

Info.propTypes = {
  transports: PropTypes.array,
};

export default Info;
