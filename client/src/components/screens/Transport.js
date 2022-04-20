import PropTypes from 'prop-types';

import TransportCard from '../cards/TransportCard';

import { Grid } from '@mui/material';

function Transport({
  data,
  sort = 'Depart Time',
  startHref,
  endHref,
}) {
  // If no data is provided, simply return nothing
  if (data === null) return <></>;

  // If we are sorting by price, check the prices
  if (sort === 'Price')
    data.sort((first, second) => {
      return first.PRICE - second.PRICE;
    });
  // If we are sorting by depart time, check the depart times
  else if (sort === 'Depart Time')
    data.sort((first, second) => {
      const first_from = new Date(first.DEPART_TIME);
      const second_from = new Date(second.DEPART_TIME);
      return first_from.getTime() - second_from.getTime();
    });
  // If we are sorting by arrive time, check the arrive times
  else if (sort === 'Arrive Time')
    data.sort((first, second) => {
      const first_to = new Date(first.ARRIVE_TIME);
      const second_to = new Date(second.ARRIVE_TIME);
      return first_to.getTime() - second_to.getTime();
    });

  // Create the transport cards to display
  const transportCards = data.map((val) => {
    // Create the new href for each of the transport cards
    const href = `${startHref}${val.TRANSPORT_ID}${endHref}`;
    return (
      <Grid
        key={val.TRANSPORT_ID}
        item
        xl={3}
        lg={4}
        md={6}
        sm={12}
        xs={12}
        p={1}
      >
        <TransportCard values={val} href={href} />
      </Grid>
    );
  });

  return (
    <Grid container maxWidth={'xl'}>
      {transportCards}
    </Grid>
  );
}

Transport.propTypes = {
  data: PropTypes.array,
  sort: PropTypes.oneOf(['Price', 'Depart Time', 'Arrive Time']),
  startHref: PropTypes.string,
  endHref: PropTypes.string,
};

export default Transport;
