import { useContext, useEffect, useState } from 'react';
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from 'react-router-dom';

import create from '../js/create';
import update from '../js/update';
import { ParseFormData } from '../js/general';

import SplashScreen from '../components/screens/SplashScreen';
import { UserContext } from '../contexts/UserContext';
import Section from '../components/screens/Section';
import Info from '../components/screens/Info';
import Events from '../components/screens/Events';
import Pricing from '../components/screens/Pricing';
import TypeSelect from '../components/forms/TypeSelect';
import DateSelect from '../components/forms/DateSelect';
import {
  Banking,
  validateBankingInfo,
} from '../components/screens/Banking';
import ErrorNotification from '../components/notifications/ErrorNotification';

import { Grid, Stack, Container, TextField } from '@mui/material';

// Create gender types
const genderTypes = ['Male', 'Female', 'Other'];

// Get the current date
const today = new Date();

function initTravelerArray() {
  let ans = [];

  // Loop over the amount and set the array
  for (let i = 0; i < 6; i += 1) {
    ans.push({
      FIRST_NAME: '',
      MID_NAME: '',
      LAST_NAME: '',
      GENDER: 'Male',
      BIRTHDAY: today,
    });
  }

  return ans;
}

function validateTravelers(travelers, amount) {
  const travelersArr = [...travelers];
  const newTravelers = [];
  for (let i = 0; i < 6; i += 1) {
    const traveler = travelersArr[i];
    if (traveler.FIRST_NAME === '' || traveler.LAST_NAME === '')
      break;
    else if (new Date(traveler.BIRTHDAY) >= today)
      return 'Birth day must be before today';

    if (traveler.MID_NAME === '') traveler.MID_NAME = null;
    newTravelers.push(traveler);
  }

  if (newTravelers.length !== amount) return 'Issue with passengers';

  return newTravelers;
}

function Purchase() {
  const [expiration, setExpiration] = useState(today);
  const [travelers, setTravelers] = useState(initTravelerArray());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Use navigation to submit search
  const navigate = useNavigate();

  // Get the current state
  const { state } = useLocation();

  // Get the user and user
  const { user } = useContext(UserContext);

  // Get the selected transports
  const { selection1, selection2 } = useParams();

  // If there is no location or selection data, send the user back to search
  if (
    state === null ||
    state.RESULTS === null ||
    state.RESULTS.length === 0 ||
    selection1 === 'null'
  )
    return <Navigate to="/" />;

  // If the user is null, return nothing
  if (user === null)
    return (
      <SplashScreen backgroundImg="images/Amsterdam.jpeg">
        <Container maxWidth="xs">
          <ErrorNotification text="Please sign up to complete!" />
        </Container>
      </SplashScreen>
    );

  // Get the results and search from the state
  const { RESULTS, SEARCH } = state;

  // Initialize transports array
  let transports = [
    RESULTS.find((val) => {
      return val.TRANSPORT_ID === selection1;
    }),
  ];

  // Initialize to date
  let toDate = null;

  // If the second selection exists, push it and update to date
  if (selection2 !== 'null') {
    transports.push(
      RESULTS.find((val) => {
        return val.TRANSPORT_ID === selection2;
      }),
    );
    toDate = SEARCH.TO;
  }

  const submitPurchase = async (e) => {
    e.preventDefault();

    // Set error, loading, and received data
    setError('');
    setLoading(true);

    // Parse the bank data
    const bankData = ParseFormData(new FormData(e.currentTarget));
    bankData.EXPIRATION = expiration;

    // Validate the banking information
    const bankValid = validateBankingInfo(bankData);

    // If the type of data returned is a string, return an error
    if (typeof bankValid === 'string') {
      setLoading(false);
      return setError(bankValid);
    }

    // Validate the traveler data
    const travelerData = validateTravelers(
      [...travelers],
      parseInt(SEARCH.TRAVELERS),
    );

    // If the type of data returned is a string, return an error
    if (typeof travelerData === 'string') {
      setLoading(false);
      return setError(travelerData);
    }

    for (let i = 0; i < transports.length; i += 1) {
      const transport = transports[i];
      const cost = transport.PRICE * parseInt(SEARCH.TRAVELERS);
      let res = await create(`/booking?client_id=${user.CLIENT_ID}`, {
        COST: cost,
        TRANSPORT_ID: transport.TRANSPORT_ID,
      });

      if (typeof res === 'string') setError(res);
      else if (res === -1) setError('Error contacting server');
      else {
        const bookingID = res[0].BOOKING_ID;

        for (let j = 0; j < travelerData.length; j += 1) {
          const traveler = travelerData[j];
          res = await create(
            `/passenger?booking_id=${bookingID}`,
            traveler,
          );
        }
      }
    }

    await create(`/banking?client_id=${user.CLIENT_ID}`, bankValid);
    await update(`/banking?client_id=${user.CLIENT_ID}`, bankValid);
    return navigate('/user');
  };

  const updateText = (e, key, i) => {
    const newTravelers = [...travelers];
    newTravelers[i][key] = e.target.value;
    setTravelers(newTravelers);
  };

  const updateVal = (val, key, i) => {
    const newTravelers = [...travelers];
    newTravelers[i][key] = val;
    setTravelers(newTravelers);
  };

  const passengerForms = travelers.map((traveler, i) => {
    // If i goes over the amount of passenger we need, return a div
    if (i >= parseInt(SEARCH.TRAVELERS)) {
      return <div key={i} />;
    }
    return (
      <Grid item xl={3} lg={4} md={6} sm={12} xs={12} p={1} key={i}>
        <Stack alignItems="center" className="card-item" spacing={2}>
          <TextField
            required
            fullWidth
            label="First Name"
            value={traveler.FIRST_NAME}
            onChange={(e) => updateText(e, 'FIRST_NAME', i)}
          />
          <TextField
            fullWidth
            label="Middle Name"
            value={traveler.MID_NAME}
            onChange={(e) => updateText(e, 'MID_NAME', i)}
          />
          <TextField
            required
            fullWidth
            label="Last Name"
            value={traveler.LAST_NAME}
            onChange={(e) => updateText(e, 'LAST_NAME', i)}
          />
          <DateSelect
            label="Birth Date"
            value={traveler.BIRTHDAY}
            setValue={(val) => updateVal(val, 'BIRTHDAY', i)}
          />
          <TypeSelect
            name="GENDER"
            label="Gender"
            types={genderTypes}
            value={traveler.GENDER}
            onUpdate={(val) => updateVal(val, 'GENDER', i)}
          />
        </Stack>
      </Grid>
    );
  });

  return (
    <>
      <div className="header-space" />

      <Info transports={transports} />

      <Section>
        <span className="section-title">Passengers</span>
        <Grid container maxWidth={'xl'}>
          {passengerForms}
        </Grid>
      </Section>

      <form onSubmit={submitPurchase}>
        <Section invert={true}>
          <span className="section-title">Banking</span>
          <Banking
            submit={false}
            setParentExpiration={setExpiration}
          />
        </Section>

        <Section>
          <span className="section-title">Breakdown</span>
          <Pricing
            transports={transports}
            amount={SEARCH.TRAVELERS}
          />
          <ErrorNotification text={error} />
        </Section>
      </form>

      <Section invert={true}>
        <span className="section-title">Events</span>
        <Events
          locationID={SEARCH.ARRIVE}
          from={SEARCH.FROM}
          to={toDate}
        />
      </Section>
    </>
  );
}

export default Purchase;
