import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import get from '../../js/get';
import create from '../../js/create';
import update from '../../js/update';
import { ParseFormData } from '../../js/general';

import { UserContext } from '../../contexts/UserContext';
import ErrorNotification from '../notifications/ErrorNotification';
import DateSelect from './DateSelect';

import { Grid, TextField, Button } from '@mui/material';

// Get the current date
const today = new Date();

function BankingForm({ values = null, expiration, setExpiration }) {
  // initialize the form values
  let firstName = '';
  let midName = '';
  let lastName = '';
  let cardNo = '';

  // If values are not null, use them instead
  if (values !== null) {
    firstName = values[0].FIRST_NAME;
    midName = values[0].MID_NAME;
    lastName = values[0].LAST_NAME;
    cardNo = values[0].CARD_NO;
  }

  return (
    <>
      <Grid item sm={4} xs={12} p={1}>
        <TextField
          required
          fullWidth
          defaultValue={firstName}
          label="First Name"
          name="FIRST_NAME"
        />
      </Grid>
      <Grid item sm={4} xs={12} p={1}>
        <TextField
          fullWidth
          defaultValue={midName}
          label="Middle Name"
          name="MIDDLE_NAME"
        />
      </Grid>
      <Grid item sm={4} xs={12} p={1}>
        <TextField
          required
          fullWidth
          defaultValue={lastName}
          label="Last Name"
          name="LAST_NAME"
        />
      </Grid>
      <Grid item sm={8} xs={12} p={1}>
        <TextField
          required
          fullWidth
          defaultValue={cardNo}
          label="Card No"
          name="CARD_NO"
        />
      </Grid>
      <Grid item sm={4} xs={12} p={1}>
        <DateSelect
          name="EXPIRATION"
          label="Expiration"
          value={expiration}
          setValue={setExpiration}
        />
      </Grid>
    </>
  );
}

BankingForm.propTypes = {
  values: PropTypes.array,
  expiration: PropTypes.string,
  setExpiration: PropTypes.func,
};

export default BankingForm;
