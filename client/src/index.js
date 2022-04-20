import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LocationProvider } from './contexts/LocationContext';
import { UserProvider } from './contexts/UserContext';
import SignUp from './routes/SignUp';
import LogIn from './routes/LogIn';
import Search from './routes/Search';
import SearchResult from './routes/SearchResult';
import User from './routes/User';
import Trip from './routes/Trip';
import Purchase from './routes/Purchase';
import Header from './components/screens/Header';

import './css/general.css';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Header />
      <LocationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route
              path="/search/:selection1&:selection2"
              element={<SearchResult />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/user" element={<User />} />
            <Route path="/trip" element={<Trip />} />
            <Route
              path="/purchase/:selection1&:selection2"
              element={<Purchase />}
            />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
