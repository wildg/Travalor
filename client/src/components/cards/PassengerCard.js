import PropTypes from 'prop-types';

import { createBirthString } from '../../js/general';

import PersonIcon from '../icons/PersonIcon';

import { Container } from '@mui/material';

function PassengerCard({ values, invert = false }) {
  // Use invert class
  const invertClass = invert ? 'invert' : '';

  // Determine the age of the person
  const birth = createBirthString(new Date(values.BIRTHDAY));

  // Initialize a middle name component
  let midName = '';

  // If some middle name is provided, use it
  if (values.MID_NAME !== null) midName = values.MID_NAME + ' ';

  return (
    <Container className={`event ${invertClass}`}>
      <PersonIcon invert={invert} type={values.GENDER} />
      <div className="title">
        {values.FIRST_NAME} {midName}
        {values.LAST_NAME}
        <p className="text-sm">
          Born <b>{birth}</b>
        </p>
      </div>
    </Container>
  );
}

PassengerCard.propTypes = {
  values: PropTypes.object,
  invert: PropTypes.bool,
};

export default PassengerCard;
