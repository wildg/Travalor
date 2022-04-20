import PropTypes from 'prop-types';

import { createDateString } from '../../js/general';

import EventIcon from '../icons/EventIcon';

import { Container } from '@mui/material';

function EventCard({ values, invert = true }) {
  // Use invert class
  const invertClass = invert ? 'invert' : '';

  // Determine the event date
  const date = createDateString(new Date(values.DATE));

  return (
    <Container className={`event ${invertClass}`}>
      <EventIcon invert={invert} type={values.TYPE} />
      <div className="title">
        {values.NAME}
        <p className="text-sm">
          <b>
            {values.CITY}, {values.COUNTRY}
          </b>
          &nbsp;on&nbsp;
          <b>{date}</b>
        </p>
      </div>
    </Container>
  );
}

EventCard.propTypes = {
  values: PropTypes.object,
  invert: PropTypes.bool,
};

export default EventCard;
