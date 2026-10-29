import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteEditor from '../components/NoteEditor';
import useNotesStore from '../hooks/useNotesStore';

function AddNotePage() {
  const navigate = useNavigate();
  const { addNote } = useNotesStore();

  const handleSubmit = ({ title, body }) => {
    const newNoteId = addNote({ title, body });
    navigate(`/notes/${newNoteId}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <section className="add-new-page">
      <header className="page-header">
        <h2>Tambah Catatan Baru</h2>
        <p className="page-header__description">
          Tulis catatanmu. Isi catatan mendukung format teks tebal, miring, dan baris baru.
        </p>
      </header>

      <NoteEditor
        submitLabel="Simpan"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </section>
  );
}

export default AddNotePage;