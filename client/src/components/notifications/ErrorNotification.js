import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

function ErrorNotification({ text }) {
  // If there is no error to show, return nothing
  if (text === '') {
    return <></>;
  }

  // Return a warning with the appropriate text.
  return (
    <Alert severity="error" className="w-100">
      {text}
    </Alert>
  );
}

ErrorNotification.propTypes = {
  text: PropTypes.string,
};

export default ErrorNotification;
