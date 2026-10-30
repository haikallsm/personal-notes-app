import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import useTranslate from '../hooks/useTranslate';

function NoteList({ notes, emptyMessage }) {
  const t = useTranslate();

  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{emptyMessage ?? t('notes.empty')}</p>
      </div>
    );
  }

  return (
    <section className="notes-list" aria-label={t('notes.listLabel')}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  emptyMessage: PropTypes.string,
};

export default NoteList;
