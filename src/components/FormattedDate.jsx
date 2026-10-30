import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils';
import LocaleContext from '../contexts/LocaleContext';

function FormattedDate({ date }) {
  return (
    <LocaleContext.Consumer>
      {({ locale }) => (
        <time className="formatted-date" dateTime={date}>
          {showFormattedDate(date, locale)}
        </time>
      )}
    </LocaleContext.Consumer>
  );
}

FormattedDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default FormattedDate;
