import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LocationContext } from '../../contexts/LocationContext';
import ErrorNotification from '../notifications/ErrorNotification';
import TransportIcon from '../icons/TransportIcon';
import TransportTimeline from '../timeline/TransportTimeline';

import { Container } from '@mui/material';

function TransportCard({
  values,
  href,
  invert = false,
  providedState = null,
}) {
  // Get the state from use location
  let { state } = useLocation();

  // Set state to provided state if given
  if (providedState !== null) state = providedState;

  // Use navigation to submit transport card
  const navigate = useNavigate();

  // Get all locations from the location context
  const { getLocation } = useContext(LocationContext);

  // Get the location data
  const depart = getLocation(values.DEPART_PLACE);
  const arrive = getLocation(values.ARRIVE_PLACE);

  // Use invert class
  const invertClass = invert ? 'invert' : '';

  const onClick = () => {
    // Navigate to the new page
    navigate(href, { state });
  };

  // If location information could not be obtained, return an error
  if (depart === null || arrive === null)
    return (
      <ErrorNotification text="Could not get location information" />
    );

  return (
    <button className={`transport ${invertClass}`} onClick={onClick}>
      <Container>
        <TransportIcon invert={invert} type={values.TYPE} />
        <div className="cost">${values.PRICE}</div>
        <div className="title">
          {depart.CITY}
          <sub className="text-sm"> ({depart.NAME})</sub>&nbsp;
          <span className="light">to</span> {arrive.CITY}
          <sub className="text-sm"> ({arrive.NAME})</sub>
        </div>
        <TransportTimeline
          values={values}
          depart={depart}
          arrive={arrive}
        />
      </Container>
    </button>
  );
}

TransportCard.propTypes = {
  values: PropTypes.object,
  href: PropTypes.string,
  invert: PropTypes.bool,
  providedState: PropTypes.object,
};

export default TransportCard;
