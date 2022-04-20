import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import get from '../js/get';

const LocationContext = createContext(null);

function LocationProvider({ children }) {
  const [allLocations, setAllLocations] = useState(null);

  useEffect(() => {
    const getAllLocations = async () => {
      // Send a get request for all locations
      const res = await get(`/location/all`);

      // Set all locations accordingly
      setAllLocations(res);
    };

    getAllLocations();
  }, []);

  // Gets a location based on a provided ID
  const getLocation = (id) => {
    // If all locations is null, return null
    if (allLocations === null) return null;

    // Check all locations for the ID provided
    return allLocations.find((location) => {
      return location.LOCATION_ID === id;
    });
  };

  // Create context value
  const context = { allLocations, getLocation };

  // If no location data is found, return nothing
  if (allLocations === null) {
    return <></>;
  }

  return (
    <LocationContext.Provider value={context}>
      {children}
    </LocationContext.Provider>
  );
}

LocationProvider.propTypes = {
  children: PropTypes.any,
};

export { LocationContext, LocationProvider };
