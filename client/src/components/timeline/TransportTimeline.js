import PropTypes from 'prop-types';

import { createTimeString, createDateString } from '../../js/general';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab';

function TransportTimeline({ values, depart, arrive }) {
  // Initialize the depart and arrive dates as objects
  const from = new Date(values.DEPART_TIME);
  from.setHours(from.getHours() + 7);
  const to = new Date(values.ARRIVE_TIME);
  to.setHours(to.getHours() + 7);

  // Determine the time difference
  const timeDiff = new Date(to - from);
  // let timeDiff_hours = Math.abs(timeDiff.getHours() - 17);
  let timeDiff_hours = timeDiff.getHours();
  const timeDiff_mins = timeDiff.getMinutes();

  if (values.TYPE === 'Flight')
    timeDiff_hours = Math.abs(timeDiff_hours - 17);
  else if (values.TYPE === 'Bus')
    timeDiff_hours = Math.abs(timeDiff_hours + 3);
  else timeDiff_hours = Math.abs(timeDiff_hours + 7);

  // Create a string representation of the time difference
  const timeDiff_str = `${timeDiff_hours} hrs ${timeDiff_mins} min`;

  // Create the depart date and time strings
  const fromDate = createDateString(from);
  const fromTime = createTimeString(from);

  // Create the arrive date and time strings
  const toDate = createDateString(to);
  const toTime = createTimeString(to);

  return (
    <Timeline position="right" className="timeline">
      <TimelineItem>
        <TimelineOppositeContent className="time">
          <span className="date">{fromDate}</span>
          <span className="time"> ({fromTime})</span>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="location">
          <span className="city">{depart.CITY}</span>
          <span className="name"> ({depart.NAME})</span>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent className="travel-time">
          {timeDiff_str}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="travel-company">
          {values.COMPANY}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent className="time">
          <span className="date">{toDate}</span>
          <span className="time"> ({toTime})</span>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent className="location">
          <span className="city">{arrive.CITY}</span>
          <span className="name"> ({arrive.NAME})</span>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

TransportTimeline.propTypes = {
  values: PropTypes.object,
  depart: PropTypes.object,
  arrive: PropTypes.object,
};

export default TransportTimeline;
