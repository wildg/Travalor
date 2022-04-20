import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import create from '../../js/create';
import { ParseFormData } from '../../js/general';

import { UserContext } from '../../contexts/UserContext';
import ErrorNotification from '../notifications/ErrorNotification';

import { Stack, TextField, Button, Link } from '@mui/material';

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the user and set user function from the context
  const { user, saveUser } = useContext(UserContext);

  // Handle form submission request
  const submitForm = async (e) => {
    // Prevent page from reloading
    e.preventDefault();

    // Reset error and set loading to true
    setError('');
    setLoading(true);

    // Parse the form data
    const data = ParseFormData(new FormData(e.currentTarget));

    // Send a create request
    const res = await create(`/client/`, data);

    // Set loading to false
    setLoading(false);

    // If the type of response is a string, there was an error
    if (typeof res === 'string') setError(res);
    // If the response was -1, there was a server error
    else if (res === -1) setError('Error contacting server');
    // Otherwise, save the new user
    else saveUser(res[0]);
  };

  // If we already have user data, redirect to search
  if (user !== null) return <Navigate to="/" />;

  return (
    <Stack
      component="form"
      onSubmit={submitForm}
      alignItems="center"
      className="card-item"
      spacing={2}
    >
      <h1 className="center-text light">
        Welcome to <b>Adventure</b>
      </h1>
      <ErrorNotification text={error} />
      <TextField
        required
        fullWidth
        label="First Name"
        name="FIRST_NAME"
      />
      <TextField
        required
        fullWidth
        label="Last Name"
        name="LAST_NAME"
      />
      <TextField
        required
        fullWidth
        label="Email"
        type="email"
        name="EMAIL"
      />
      <TextField
        required
        fullWidth
        label="Password"
        type="password"
        name="PASSWORD"
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
      >
        Sign Up
      </Button>
      <p>
        Already have an account?&nbsp;
        <Link href="/login">Log In</Link>
      </p>
    </Stack>
  );
}

export default SignUpForm;
