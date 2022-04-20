import SearchForm from '../components/forms/SearchForm';
import SplashScreen from '../components/screens/SplashScreen';

import { Container } from '@mui/material';

function Search() {
  return (
    <SplashScreen backgroundImg="images/Venice.jpeg">
      <Container maxWidth="lg">
        <SearchForm />
      </Container>
    </SplashScreen>
  );
}

export default Search;
