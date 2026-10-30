import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import useTranslate from '../hooks/useTranslate';

function NoteBody({ body, className = '' }) {
  const t = useTranslate();
  const isEmpty = !body || body === '<br>' || body === '<div><br></div>';

  if (isEmpty) {
    return (
      <div className={`${className} note-body note-body--empty`}>
        <em>{t('notes.emptyBody')}</em>
      </div>
    );
  }

  return <div className={`${className} note-body`}>{parse(body)}</div>;
}

NoteBody.propTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
};

export default NoteBody;
