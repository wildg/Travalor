import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import get from '../../js/get';
import create from '../../js/create';
import update from '../../js/update';
import { ParseFormData } from '../../js/general';

import { UserContext } from '../../contexts/UserContext';
import ErrorNotification from '../notifications/ErrorNotification';
import DateSelect from '../forms/DateSelect';

import { Grid, TextField, Button } from '@mui/material';

// Get the current date
const today = new Date();

// Validates banking information provided
function validateBankingInfo(data) {
  // If the expiration has occured, return error
  if (data.EXPIRATION <= today) return 'Card is expired';
  // If the card number is not all digits, return error
  else if (isNaN(data.CARD_NO)) return 'Card No must be numbers';
  // If the card number is not 16 digits, return error
  else if (data.CARD_NO.length !== 16) return 'Card No length wrong';

  // Update the expiration date and middle name
  data.EXPIRATION = data.EXPIRATION.toISOString().substring(0, 10);
  data.MID_NAME = data.MID_NAME === '' ? null : data.MID_NAME;
  return data;
}

function Banking({ submit = true, setParentExpiration = null }) {
  const [receivedData, setReceivedData] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [midName, setMidName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [expiration, setExpiration] = useState(today);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the user and user
  const { user } = useContext(UserContext);

  // Upon getting a new user object, check for banking data
  useEffect(() => {
    const getBankingData = async () => {
      // If no user data is available, simply return
      if (user === null) return;

      // Set error, loading, and received data
      setError('');
      setLoading(true);
      setReceivedData(false);

      // Send a get request
      const res = await get(`/banking?client_id=${user.CLIENT_ID}`);

      // Reset loading
      setLoading(false);

      // If the type of response is a string, there was an error
      if (typeof res === 'string') setError(res);
      // If the response was -1, there was a server error
      else if (res === -1) setError('Error contacting server');
      // If the response is not empty, save the banking
      else if (res.length !== 0) {
        // Get the data received
        const data = res[0];
        setReceivedData(true);
        setFirstName(data.FIRST_NAME);
        setLastName(data.LAST_NAME);
        setCardNo(data.CARD_NO);
        setExpiration(data.EXPIRATION);

        // Check if middle name is null
        if (data.MID_NAME !== null) setMidName(data.MID_NAME);
      }
    };
    getBankingData();
  }, [user]);

  // If there is no user data, tell the user
  if (user === null)
    return <ErrorNotification text="You are not logged in!" />;

  //
  const formSubmission = async (e) => {
    // Prevent page from reloading
    e.preventDefault();

    // Reset error and set loading to true
    setError('');
    setLoading(true);

    // Create the form data
    const data = ParseFormData(new FormData(e.currentTarget));
    data.EXPIRATION = new Date(expiration);

    // Attempt to validate the banking information
    const valid = validateBankingInfo(data);

    // If the type of data returned is a string, return an error
    if (typeof valid === 'string') {
      setLoading(false);
      return setError(valid);
    }

    // If we received data, update
    if (receivedData) return updateBankingData(valid);
    // Otherwise, we want to create
    else return createBankingData(valid);
  };

  // Creates new banking information
  const createBankingData = async (data) => {
    // Send a create request
    const res = await create(
      `/banking?client_id=${user.CLIENT_ID}`,
      data,
    );

    // Set loading to false
    setLoading(false);

    // If the type of response is a string, there was an error
    if (typeof res === 'string') setError(res);
    // If the response was -1, there was a server error
    else if (res === -1) setError('Error contacting server');
    // Otherwise, set received data to true
    setReceivedData(true);
  };

  // Updates banking data
  const updateBankingData = async (data) => {
    // Send a create request
    const res = await update(
      `/banking?client_id=${user.CLIENT_ID}`,
      data,
    );

    // Set loading to false
    setLoading(false);

    // If the type of response is a string, there was an error
    if (typeof res === 'string') setError(res);
    // If the response was -1, there was a server error
    else if (res === -1) setError('Error contacting server');
  };

  // Create state update functions
  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateMidName = (e) => setMidName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateCardNo = (e) => setCardNo(e.target.value);
  const updateExpiration = (e) => {
    setExpiration(e);
    if (setParentExpiration !== null) setParentExpiration(e);
  };

  // Determine what the button should say
  const buttonText = receivedData ? 'Update' : 'Create';

  // Create the banking form
  const bankingForm = (
    <>
      <Grid item sm={4} xs={12} p={1}>
        <TextField
          required
          fullWidth
          value={firstName}
          onChange={updateFirstName}
          label="First Name"
          name="FIRST_NAME"
        />
      </Grid>
      <Grid item sm={4} xs={12} p={1}>
        <TextField
          fullWidth
          value={midName}
          onChange={updateMidName}
          label="Middle Name"
          name="MID_NAME"
        />
      </Grid>
      <Grid item sm={4} xs={12} p={1}>
        <TextField
          required
          fullWidth
          value={lastName}
          onChange={updateLastName}
          label="Last Name"
          name="LAST_NAME"
        />
      </Grid>
      <Grid item sm={8} xs={12} p={1}>
        <TextField
          required
          fullWidth
          value={cardNo}
          onChange={updateCardNo}
          label="Card No"
          name="CARD_NO"
        />
      </Grid>
      <Grid item sm={4} xs={12} p={1}>
        <DateSelect
          name="EXPIRATION"
          label="Expiration"
          value={expiration}
          setValue={updateExpiration}
        />
      </Grid>
    </>
  );

  // If we don't want to submit, simply create the banking form
  if (submit === false)
    return (
      <Grid container className="card-item">
        <ErrorNotification text={error} />
        {bankingForm}
      </Grid>
    );

  return (
    <Grid
      container
      component="form"
      onSubmit={formSubmission}
      className="card-item"
    >
      <ErrorNotification text={error} />
      {bankingForm}
      <Grid item xs={12} p={1}>
        <Button
          fullWidth
          disabled={loading}
          type="submit"
          variant="contained"
        >
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
}

Banking.propTypes = {
  submit: PropTypes.bool,
  setParentExpiration: PropTypes.func,
};

export { Banking, validateBankingInfo };
