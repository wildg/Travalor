import PropTypes from 'prop-types';

function TransportIcon({ invert, type }) {
  // Create a new reference value
  let ref = '';

  // Initialize the icon path
  if (type == 'Flight') {
    ref = '/icons/transport/AirplaneIcon';
  } else if (type == 'Bus') {
    ref = '/icons/transport/BusIcon';
  } else if (type == 'Train') {
    ref = '/icons/transport/TrainIcon';
  }

  // Determine whether it is brown or white
  if (!invert) {
    ref += '.png';
  } else {
    ref += '-invert.png';
  }

  return <img src={ref} alt={type} className="icon" />;
}

TransportIcon.propTypes = {
  invert: PropTypes.bool,
  type: PropTypes.oneOf(['Flight', 'Bus', 'Train']),
};

export default TransportIcon;
