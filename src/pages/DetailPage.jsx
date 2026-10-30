import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import useNote from '../hooks/useNote';
import useTranslate from '../hooks/useTranslate';
import FormattedDate from '../components/FormattedDate';
import NoteBody from '../components/NoteBody';
import Loading from '../components/Loadingtemp';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { note, loading, error } = useNote(getNote, id);
  const [processing, setProcessing] = useState(false);
  const t = useTranslate();

  const onDeleteHandler = async () => {
    if (!window.confirm(t('detail.deleteConfirm'))) {
      return;
    }

    setProcessing(true);
    const { error } = await deleteNote(id);
    setProcessing(false);

    if (!error) {
      navigate('/');
    }
  };

  const onArchiveHandler = async () => {
    setProcessing(true);
    const { error } = await (note.archived ? unarchiveNote(id) : archiveNote(id));
    setProcessing(false);

    if (!error) {
      navigate(note.archived ? '/' : '/archives');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!note) {
    return (
      <section className="detail-page">
        <p>{error ? t('notes.loadError') : t('notes.notFound')}</p>
        <Link to="/" className="button button--primary">
          {t('detail.back')}
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">
        <FormattedDate date={note.createdAt} />
      </p>
      <NoteBody body={note.body} className="detail-page__body" />
      <div className="detail-page__actions">
        <button
          type="button"
          onClick={onArchiveHandler}
          className="btn-action"
          disabled={processing}
        >
          {note.archived ? t('detail.unarchive') : t('detail.archive')}
        </button>
        <button
          type="button"
          onClick={onDeleteHandler}
          className="btn-action btn-delete"
          disabled={processing}
        >
          {t('detail.delete')}
        </button>
        <Link to="/" className="btn-action btn-back">
          {t('detail.back')}
        </Link>
      </div>
    </section>
  );
}

export default DetailPage;
