import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NoteBody from '../components/NoteBody';
import FormattedDate from '../components/FormattedDate';
import useNotesStore from '../hooks/useNotesStore';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNote, deleteNote, archiveNote, unarchiveNote } = useNotesStore();

  const note = getNote(id);

  if (!note) {
    return (
      <section className="detail-page">
        <header className="page-header">
          <h2>Catatan Tidak Ditemukan</h2>
          <p className="page-header__description">
            Catatan dengan id &ldquo;{id}&rdquo; tidak lagi tersedia. Mungkin catatan tersebut sudah
            dihapus.
          </p>
        </header>
        <Link to="/" className="button button--outline">
          Kembali ke daftar catatan
        </Link>
      </section>
    );
  }

  const handleDelete = () => {
    const isConfirmed = window.confirm(`Hapus catatan "${note.title}"?`);

    if (isConfirmed) {
      const fallbackPath = note.archived ? '/archived' : '/';
      deleteNote(note.id);
      navigate(fallbackPath, { replace: true });
    }
  };

  const handleArchiveToggle = () => {
    if (note.archived) {
      unarchiveNote(note.id);
    } else {
      archiveNote(note.id);
    }
  };

  return (
    <article className="detail-page">
      <header className="page-header">
        <Link to={note.archived ? '/archived' : '/'} className="back-link">
          &larr; Kembali
        </Link>
        <h2 className="detail-page__title">{note.title}</h2>
        <p className="detail-page__createdAt">
          Dibuat pada <FormattedDate date={note.createdAt} />
        </p>
        <p className={`note-badge ${note.archived ? 'note-badge--archived' : ''}`}>
          {note.archived ? 'Diarsipkan' : 'Aktif'}
        </p>
      </header>

      <NoteBody body={note.body} className="detail-page__body" />

      <div className="detail-page__footer">
        <button type="button" className="button button--outline" onClick={handleArchiveToggle}>
          {note.archived ? 'Batalkan Arsip' : 'Arsipkan'}
        </button>
        <Link to={`/notes/${note.id}/edit`} className="button button--outline">
          Ubah
        </Link>
        <button type="button" className="button button--danger" onClick={handleDelete}>
          Hapus
        </button>
      </div>
    </article>
  );
}

export default DetailPage;