import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoteEditor from '../components/NoteEditor';
import useNotesStore from '../hooks/useNotesStore';

function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNote, editNote } = useNotesStore();

  const note = getNote(id);

  if (!note) {
    return (
      <section className="edit-note-page">
        <header className="page-header">
          <h2>Catatan Tidak Ditemukan</h2>
          <p className="page-header__description">
            Catatan dengan id &ldquo;{id}&rdquo; tidak lagi tersedia sehingga tidak dapat diubah.
          </p>
        </header>
      </section>
    );
  }

  const handleSubmit = ({ title, body }) => {
    editNote({ id: note.id, title, body });
    navigate(`/notes/${note.id}`);
  };

  const handleCancel = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <section className="edit-note-page">
      <header className="page-header">
        <h2>Ubah Catatan</h2>
        <p className="page-header__description">Perbarui isi catatan &ldquo;{note.title}&rdquo;.</p>
      </header>

      <NoteEditor
        key={note.id}
        initialTitle={note.title}
        initialBody={note.body}
        submitLabel="Simpan Perubahan"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </section>
  );
}

export default EditNotePage;