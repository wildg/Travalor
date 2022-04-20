import LogInForm from '../components/forms/LogInForm';
import SplashScreen from '../components/screens/SplashScreen';

import { Container } from '@mui/material';

function LogIn() {
  return (
    <SplashScreen backgroundImg="images/AmalfiCoast.jpeg">
      <Container maxWidth="xs">
        <LogInForm />
      </Container>
    </SplashScreen>
  );
}

export default LogIn;
