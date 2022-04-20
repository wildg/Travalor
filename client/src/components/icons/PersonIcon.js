import PropTypes from 'prop-types';

function PersonIcon({ invert, type }) {
  // Create a new reference value
  let ref = '';

  // Initialize the icon path
  if (type == 'Male') {
    ref = '/icons/person/BoyIcon';
  } else if (type == 'Female') {
    ref = '/icons/person/GirlIcon';
  } else if (type == 'Other') {
    ref = '/icons/person/OtherIcon';
  }

  // Determine whether it is brown or white
  if (!invert) {
    ref += '.png';
  } else {
    ref += '-invert.png';
  }

  return <img src={ref} alt={type} className="icon" />;
}

PersonIcon.propTypes = {
  invert: PropTypes.bool,
  type: PropTypes.oneOf(['Male', 'Female', 'Other']),
};

export default PersonIcon;
