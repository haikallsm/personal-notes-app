import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/network-data';
import { searchNotesByTitle } from '../utils';
import useNotes from '../hooks/useNotes';
import useTranslate from '../hooks/useTranslate';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import FloatingLink from '../components/FloatingLink';
import Loading from '../components/Loadingtemp';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { notes, loading, error } = useNotes(getActiveNotes);
  const t = useTranslate();

  const keyword = searchParams.get('keyword') || '';

  const onKeywordChange = (newKeyword) => {
    setSearchParams(newKeyword ? { keyword: newKeyword } : {});
  };

  const filteredNotes = useMemo(
    () => searchNotesByTitle(notes, keyword),
    [notes, keyword],
  );

  return (
    <section className="homepage">
      <h2>{t('notes.activeTitle')}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChange} />
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="notes-list-empty" role="alert">
          <p>{t('notes.loadError')}</p>
        </div>
      ) : (
        <NoteList
          notes={filteredNotes}
          emptyMessage={keyword ? t('notes.searchEmpty') : undefined}
        />
      )}
      <FloatingLink to="/notes/new" label="+" title="Tambah catatan baru" ariaLabel="Tambah catatan baru" />
    </section>
  );
}

export default HomePage;
