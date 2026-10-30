import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getExcerpt, getPlainText } from '../utils';
import FormattedDate from './FormattedDate';
import useTranslate from '../hooks/useTranslate';

function NoteItem({ note }) {
  const { id, title, body, createdAt } = note;
  const t = useTranslate();
  const excerpt = getExcerpt(getPlainText(body));

  return (
    <article className="note-item">
      <Link to={`/notes/${id}`} className="note-item__link">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__createdAt">
          <FormattedDate date={createdAt} />
        </p>
        <p className="note-item__body">{excerpt}</p>
        <span className="note-item__read-more">
          {t('notes.readMore')} &rarr;
        </span>
      </Link>
    </article>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default NoteItem;
