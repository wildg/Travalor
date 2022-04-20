import SignUpForm from '../components/forms/SignUpForm';
import SplashScreen from '../components/screens/SplashScreen';

import { Container } from '@mui/material';

function SignUp() {
  return (
    <SplashScreen backgroundImg="images/Santorini.jpeg">
      <Container maxWidth="xs">
        <SignUpForm />
      </Container>
    </SplashScreen>
  );
}

export default SignUp;
