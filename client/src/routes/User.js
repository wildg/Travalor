import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import get from '../js/get';

import { UserContext } from '../contexts/UserContext';
import SplashScreen from '../components/screens/SplashScreen';
import AccountForm from '../components/forms/AccountForm';
import Section from '../components/screens/Section';
import Orders from '../components/screens/Orders';
import { Banking } from '../components/screens/Banking';
import ErrorNotification from '../components/notifications/ErrorNotification';

import { Container, Grid } from '@mui/material';

function User() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  // Get the user and set user function from the context
  const { user } = useContext(UserContext);

  // Upon getting a new user object, check for their orders
  useEffect(() => {
    const getAllOrders = async () => {
      // If no user data is available, simply return
      if (user === null) return;

      // Reset the error
      setError('');

      // Send a get request
      const res = await get(`/booking?client_id=${user.CLIENT_ID}`);

      // If the type of response is a string, there was an error
      if (typeof res === 'string') setError(res);
      // If the response was -1, there was a server error
      else if (res === -1) setError('Error contacting server');
      // Otherwise, save the new user
      else setOrders(res);
    };

    getAllOrders();
  }, [user]);

  // If there is no user data, tell the user
  if (user === null)
    return (
      <SplashScreen backgroundImg="images/Amsterdam.jpeg">
        <Container maxWidth="xs">
          <ErrorNotification text="You are not logged in!" />
        </Container>
      </SplashScreen>
    );

  // Initialize an orders component
  let orderComponent;

  // If no order details are found, display it
  if (orders.length === 0)
    orderComponent = <ErrorNotification text="No orders found!" />;
  // If there is some error, display it
  else if (error !== '')
    orderComponent = <ErrorNotification text={error} />;
  // Otherwise, show orders
  else orderComponent = <Orders orders={orders} />;
  return (
    <>
      <SplashScreen backgroundImg="images/Amsterdam.jpeg">
        <Container maxWidth="xs">
          <AccountForm />
        </Container>
      </SplashScreen>

      <Section>
        <span className="section-title">Your Orders</span>
        {orderComponent}
      </Section>

      <Section invert={true}>
        <span className="section-title">Banking</span>
        <Banking />
      </Section>
    </>
  );
}

export default User;
