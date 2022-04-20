import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

function Section({
  children,
  center = true,
  invert = false,
  spacing = 2,
  p = 4,
}) {
  // Determine whether to center the section
  const centerClass = center ? 'center' : '';

  // Determine whether to invert the section
  const invertClass = invert ? 'invert' : '';

  // Return the section component
  return (
    <Stack
      className={`section ${invertClass}`}
      alignItems={centerClass}
      spacing={spacing}
      p={p}
    >
      {children}
    </Stack>
  );
}

Section.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  invert: PropTypes.bool,
  spacing: PropTypes.number,
  p: PropTypes.number,
};

export default Section;
