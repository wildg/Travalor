import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the user item stored locally
    const storedUser = localStorage.getItem('USER');

    // If some user data is stored, set the user
    if (storedUser !== null) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Saves user data and updates current context
  const saveUser = (data) => {
    // Save the user data
    localStorage.setItem('USER', JSON.stringify(data));

    // Set the new user data
    setUser(data);
  };

  // Create context value
  const context = { user, saveUser };

  // Return user context provider
  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.any,
};

export { UserContext, UserProvider };
