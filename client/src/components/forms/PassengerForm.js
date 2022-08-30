import { useState } from 'react';
import PropTypes from 'prop-types';

import DateSelect from './DateSelect';
import TypeSelect from './TypeSelect';

import { Grid, Stack, TextField } from '@mui/material';

// Create gender types
const genderTypes = ['Male', 'Female', 'Other'];

// Get the current date
const today = new Date();

function initBirthArray(amount) {
  let ans = [];

  // Loop over the amount and set the array
  for (let i = 0; i < amount; i += 1) {
    ans.push(today);
  }

  return ans;
}

function PassengerForm({ amount = 2 }) {
  const [birth, setBirth] = useState(initBirthArray(amount));

  const updateBirth = (val, i) => {
    const newBirth = birth;
    newBirth[i] = val;
    setBirth(newBirth);
  };

  const passengerForms = birth.map((bday, i) => {
    return (
      <Grid item xl={3} lg={4} md={6} sm={12} xs={12} p={1} key={i}>
        <Stack alignItems="center" className="card-item" spacing={2}>
          <TextField
            required
            fullWidth
            label="First Name"
            name={`FIRST_NAME${i}`}
          />
          <TextField
            fullWidth
            label="Middle Name"
            name={`MID_NAME${i}`}
          />
          <TextField
            required
            fullWidth
            label="Last Name"
            name={`LAST_NAME${i}`}
          />
          <TypeSelect
            name="GENDER"
            label="Gender"
            types={genderTypes}
          />
        </Stack>
      </Grid>
    );
  });

  return (
    <Grid container maxWidth={'xl'}>
      {passengerForms}
    </Grid>
  );
}

PassengerForm.propTypes = {
  amount: PropTypes.number,
};

export default PassengerForm;
