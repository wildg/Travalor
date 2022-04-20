import { useLocation, Navigate } from 'react-router-dom';

import Section from '../components/screens/Section';
import Info from '../components/screens/Info';
import Passengers from '../components/screens/Passengers';
import Events from '../components/screens/Events';

function Trip() {
  // Get the state from use location
  let { state } = useLocation();

  // If there is no state information for the order or transport, send the user to account
  if (
    state === null ||
    state.ORDER === null ||
    state.TRANSPORT === null
  )
    return <Navigate to="/user" />;

  // Get the transport and order information from the state
  const { TRANSPORT, ORDER } = state;

  // Get the depart date and location ID
  const from = TRANSPORT[0].DEPART_TIME;
  const locationID = TRANSPORT[0].ARRIVE_PLACE;

  return (
    <>
      <div className="header-space" />

      <Info transports={TRANSPORT} />

      <Section>
        <span className="section-title">Passengers</span>
        <Passengers orderID={ORDER.BOOKING_ID} />
      </Section>

      <Section invert={true}>
        <span className="section-title">Events</span>
        <Events locationID={locationID} from={from} />
      </Section>
    </>
  );
}

export default Trip;
