import { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

function DateSelect({
  name,
  label,
  value,
  setValue,
  disabled = false,
}) {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        required
        inputFormat="dd/MM/yyyy"
        fullWidth
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
    </LocalizationProvider>
  );
}

DateSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DateSelect;
