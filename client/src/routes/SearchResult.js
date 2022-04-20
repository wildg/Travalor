import { useState } from 'react';
import { useLocation, useParams, Navigate } from 'react-router-dom';

import SearchForm from '../components/forms/SearchForm';
import Section from '../components/screens/Section';
import NativeTypeSelect from '../components/forms/NativeTypeSelect';
import Transport from '../components/screens/Transport';
import Events from '../components/screens/Events';

import { Container, Grid } from '@mui/material';

const sortTypes = ['Price', 'Depart Time', 'Arrive Time'];

function SearchResult() {
  const [sort, setSort] = useState(sortTypes[0]);

  // Get the current state
  const { state } = useLocation();

  // Get the selected transports
  const { selection1, selection2 } = useParams();

  // If there is no location data, send the user back to search
  if (
    state === null ||
    state.RESULTS === null ||
    state.RESULTS.length === 0 ||
    state.SEARCH === null
  )
    return <Navigate to="/" />;

  // Get the results and search from the state
  const { RESULTS, SEARCH } = state;

  // Initialize relevant transport
  let relevantTransport = RESULTS;

  // Initialize to date
  let toDate = SEARCH.TO;

  // Initialize the href values for transport cards
  let startHref = '/search/';
  let endHref = '';

  // If the type is return
  if (SEARCH.TYPE === 'Return') {
    // If selection 1 has not been made
    if (selection1 === 'null') {
      // Filter for first selection
      relevantTransport = RESULTS.filter((val) => {
        if (val.DEPART_PLACE === SEARCH.DEPART) return val;
      });

      // Update the href
      endHref = '&null';
    }

    // If seletion 2 has not been made
    else if (selection2 === 'null') {
      // Filter for second selection
      relevantTransport = RESULTS.filter((val) => {
        if (val.ARRIVE_PLACE === SEARCH.DEPART) return val;
      });

      // Update the href
      startHref = `/purchase/${selection1}&`;
    }
  }

  // If the type is one way
  else {
    startHref = `/purchase/`;
    endHref = `&null`;
    toDate = null;
  }

  return (
    <>
      <div className="header-space" />

      <Section invert={true} p={0}>
        <Container maxWidth="lg">
          <SearchForm />
        </Container>
      </Section>

      <Section>
        <span className="section-title">
          Sorted by&nbsp;
          <NativeTypeSelect
            types={sortTypes}
            value={sort}
            onUpdate={setSort}
          />
        </span>
        <Transport
          data={relevantTransport}
          sort={sort}
          startHref={startHref}
          endHref={endHref}
        />
      </Section>

      <Section invert={true}>
        <span className="section-title">Events</span>
        <Events
          locationID={SEARCH.ARRIVE}
          from={SEARCH.FROM}
          to={toDate}
        />
      </Section>
    </>
  );
}

export default SearchResult;
