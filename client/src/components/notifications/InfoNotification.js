import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

function InfoNotification({ text }) {
  // If there is no error to show, return nothing
  if (text === '') {
    return <></>;
  }

  // Return a warning with the appropriate text.
  return (
    <Alert severity="info" className="w-100">
      {text}
    </Alert>
  );
}

InfoNotification.propTypes = {
  text: PropTypes.string,
};

export default InfoNotification;
