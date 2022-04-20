import { useState } from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem } from '@mui/material';

function NativeTypeSelect({ types, onUpdate = undefined }) {
  const [type, setType] = useState(types[0]);

  const updateType = (e) => {
    setType(e.target.value);

    // If there is an update function provided use it
    if (onUpdate != undefined) onUpdate(e.target.value);
  };

  return (
    <Select
      value={type}
      onChange={updateType}
      className="native-select"
    >
      {types.map((val) => {
        return (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        );
      })}
    </Select>
  );
}

NativeTypeSelect.propTypes = {
  types: PropTypes.array,
  onUpdate: PropTypes.func,
};

export default NativeTypeSelect;
