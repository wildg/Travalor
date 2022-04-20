import PropTypes from 'prop-types';

function EventIcon({ invert, type }) {
  // Create a new reference value
  let ref = '';

  // Initialize the icon path
  if (type == 'Festival') {
    ref = '/icons/event/FestivalIcon';
  } else if (type == 'Concert') {
    ref = '/icons/event/ConcertIcon';
  } else if (type == 'Exhibit') {
    ref = '/icons/event/ExhibitIcon';
  } else if (type == 'Other') {
    ref = '/icons/event/OtherIcon';
  }

  // Determine whether it is brown or white
  if (!invert) {
    ref += '.png';
  } else {
    ref += '-invert.png';
  }

  return <img src={ref} alt={type} className="icon" />;
}

EventIcon.propTypes = {
  invert: PropTypes.bool,
  type: PropTypes.oneOf(['Festival', 'Concert', 'Exhibit', 'Other']),
};

export default EventIcon;
