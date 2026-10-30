import PropTypes from 'prop-types';
import useTranslate from '../hooks/useTranslate';

function Loading({ label }) {
  const t = useTranslate();

  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="loading-text">{label ?? t('loading.data')}</p>
    </div>
  );
}

Loading.propTypes = {
  label: PropTypes.string,
};

export default Loading;
