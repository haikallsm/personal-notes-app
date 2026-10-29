import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import FloatingLink from '../components/FloatingLink';
import useNotesStore from '../hooks/useNotesStore';
import { searchNotesByTitle } from '../utils';

function HomePage() {
  const { getActiveNotes } = useNotesStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';

  const activeNotes = getActiveNotes();
  const notes = searchNotesByTitle(activeNotes, keyword);

  const handleKeywordChange = (value) => {
    setSearchParams(value.trim() === '' ? {} : { q: value }, { replace: true });
  };

  return (
    <section className="homepage">
      <header className="page-header">
        <h2>Catatan Aktif</h2>
        <p className="page-header__description">
          {activeNotes.length} catatan tersimpan dan belum diarsipkan.
        </p>
      </header>

      <SearchBar value={keyword} onChange={handleKeywordChange} resultCount={notes.length} />

      <NoteList
        notes={notes}
        emptyMessage={
          keyword.trim() === ''
            ? 'Tidak ada catatan'
            : `Tidak ada catatan yang judulnya mengandung "${keyword.trim()}"`
        }
      />

      <div className="homepage__action">
        <FloatingLink to="/notes/new" label="+ Tambah" variant="primary" />
      </div>
    </section>
  );
}

export default HomePage;