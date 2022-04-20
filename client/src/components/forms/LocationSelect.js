import { useState } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';

import { LocationContext } from '../../contexts/LocationContext';

import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

function LocationSelect({ name, label, select = 0 }) {
  // Get all locations from the location context
  const { allLocations } = useContext(LocationContext);

  // Initialize the selected city
  const [type, setType] = useState(allLocations[select].LOCATION_ID);

  // Function to update location selected
  const updateType = (e) => {
    // Set the new value
    setType(e.target.value);
  };

  // Create the menu options component
  const menuOptionsComponent = allLocations.map((val) => {
    // Create the location string
    const locationStr = `${val.NAME}, ${val.CITY}, ${val.COUNTRY}`;

    // Get the location ID
    const locationID = val.LOCATION_ID;

    return (
      <MenuItem label={label} key={locationID} value={locationID}>
        {locationStr}
      </MenuItem>
    );
  });

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={type}
        onChange={updateType}
        fullWidth
      >
        {menuOptionsComponent}
      </Select>
    </FormControl>
  );
}

LocationSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  select: PropTypes.number,
};

export default LocationSelect;
