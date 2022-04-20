import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

function TypeSelect({
  name,
  label,
  types,
  value = types[0],
  onUpdate = undefined,
}) {
  const [type, setType] = useState(value);

  const updateType = (e) => {
    setType(e.target.value);

    // If there is an update function provided use it
    if (onUpdate != undefined) onUpdate(e.target.value);
  };

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
        {types.map((val) => {
          return (
            <MenuItem label={label} key={val} value={val}>
              {val}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

TypeSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  types: PropTypes.array,
  value: PropTypes.any,
  onUpdate: PropTypes.func,
};

export default TypeSelect;
