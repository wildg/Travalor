import { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import create from '../../js/create';
import { ParseFormData } from '../../js/general';

import { UserContext } from '../../contexts/UserContext';
import ErrorNotification from '../notifications/ErrorNotification';
import LocationSelect from './LocationSelect';
import DateSelect from './DateSelect';
import TypeSelect from './TypeSelect';

import { Grid, Button } from '@mui/material';

// Get the start date
const start = new Date('2023-01-01');

// Create the travel type, traveler numbers, and transport types
const travelTypes = ['Return', 'One Way'];
const travelerAmount = [1, 2, 3, 4, 5, 6];
const transportTypes = ['All', 'Flight', 'Bus', 'Train'];

function SearchForm() {
  // Set the states
  const [from, setFrom] = useState(start);
  const [to, setTo] = useState(start);
  const [type, setType] = useState(travelTypes[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the user
  const { user } = useContext(UserContext);

  // Use navigation to submit search
  const navigate = useNavigate();

  // Handle form submission request
  const submitForm = async (e) => {
    // Prevent page from reloading
    e.preventDefault();

    // Reset error and set loading to true
    setError('');
    setLoading(true);

    // Parse the form data
    const data = ParseFormData(new FormData(e.currentTarget));

    // If the depart and arrive locations are the same, there was an error
    if (data.DEPART === data.ARRIVE) {
      setLoading(false);
      return setError('Please choose different locations');
    }

    // Initialize a result variable
    let res;
    // If type is a return trip, search for return trips
    if (data.TYPE === 'Return') res = await submitReturnSearch(data);
    // Otherwise, search for one way trips
    else res = await submitOneWaySearch(data);

    // Set loading to false
    setLoading(false);

    // If the type of response is a string, there was an error
    if (typeof res === 'string') setError(res);
    // If the response was -1, there was a server error
    else if (res === -1) setError('Error contacting server');
    // If the response is an empty array, there were no results
    else if (res.length === 0) setError('No results were found');
    // Otherwise, send the user to the search
    else
      navigate('/search/null&null', {
        state: {
          RESULTS: res,
          SEARCH: { ...data, FROM: from, TO: to },
        },
      });
  };

  const submitReturnSearch = async (data) => {
    // If the from date is greater than the to date, there is an issue
    if (from >= to) return 'From date must be less than the to date';

    // Configure the request data
    const reqData = {
      DEPART: data.DEPART,
      ARRIVE: data.ARRIVE,
      FROM: from.toISOString().substring(0, 10),
      TO: to.toISOString().substring(0, 10),
      TRANSPORT: data.TRANSPORT,
    };

    // Send a post request
    return create(
      `/search/return/?client_id=${user.CLIENT_ID}`,
      reqData,
    );
  };

  const submitOneWaySearch = async (data) => {
    // Configure the request data
    const reqData = {
      DEPART: data.DEPART,
      ARRIVE: data.ARRIVE,
      FROM: from.toISOString().substring(0, 10),
      TRANSPORT: data.TRANSPORT,
    };

    // Send a post request
    return create(
      `/search/one-way/?client_id=${user.CLIENT_ID}`,
      reqData,
    );
  };

  // If there is no user data, redirect to log in
  if (user === null) return <Navigate to="/login" />;

  return (
    <Grid
      container
      component="form"
      onSubmit={submitForm}
      className="card-item"
    >
      <ErrorNotification text={error} />
      <Grid item sm={4} xs={12} p={1}>
        <LocationSelect name="DEPART" label="Depart" />
      </Grid>
      <Grid item sm={4} xs={12} p={1}>
        <LocationSelect name="ARRIVE" label="Arrive" select={1} />
      </Grid>
      <Grid item sm={2} xs={6} p={1}>
        <DateSelect
          name="FROM"
          label="From"
          value={from}
          setValue={setFrom}
        />
      </Grid>
      <Grid item sm={2} xs={6} p={1}>
        <DateSelect
          name="TO"
          label="To"
          value={to}
          setValue={setTo}
          disabled={type == 'One Way'}
        />
      </Grid>
      <Grid item sm={4} xs={6} p={1}>
        <TypeSelect
          name="TYPE"
          label="Type"
          types={travelTypes}
          onUpdate={setType}
        />
      </Grid>
      <Grid item sm={4} xs={6} p={1}>
        <TypeSelect
          name="TRAVELERS"
          label="Travelers"
          types={travelerAmount}
        />
      </Grid>
      <Grid item sm={4} xs={12} p={1}>
        <TypeSelect
          label="Transport"
          name="TRANSPORT"
          types={transportTypes}
        />
      </Grid>
      <Grid item xs={12} p={1}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchForm;
