import React from 'react';
import { showFormattedDate } from '../utils';

function FormattedDate({ date }) {
  return (
    <time className="formatted-date" dateTime={date}>
      {showFormattedDate(date)}
    </time>
  );
}

export default FormattedDate;