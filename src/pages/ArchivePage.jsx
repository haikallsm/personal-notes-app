import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import FloatingLink from '../components/FloatingLink';
import useNotesStore from '../hooks/useNotesStore';
import { searchNotesByTitle } from '../utils';

function ArchivePage() {
  const { getArchivedNotes } = useNotesStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';

  const archivedNotes = getArchivedNotes();
  const notes = searchNotesByTitle(archivedNotes, keyword);

  const handleKeywordChange = (value) => {
    setSearchParams(value.trim() === '' ? {} : { q: value }, { replace: true });
  };

  return (
    <section className="homepage">
      <header className="page-header">
        <h2>Arsip Catatan</h2>
        <p className="page-header__description">{archivedNotes.length} catatan telah diarsipkan.</p>
      </header>

      <SearchBar value={keyword} onChange={handleKeywordChange} resultCount={notes.length} />

      <NoteList
        notes={notes}
        emptyMessage={
          keyword.trim() === ''
            ? 'Arsip kosong'
            : `Tidak ada arsip yang mengandung "${keyword.trim()}"`
        }
      />

      <div className="homepage__action">
        <FloatingLink to="/" label="← Catatan" variant="secondary" />
      </div>
    </section>
  );
}

export default ArchivePage;