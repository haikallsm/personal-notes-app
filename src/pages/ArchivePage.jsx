import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/network-data';
import { searchNotesByTitle } from '../utils';
import useNotes from '../hooks/useNotes';
import useTranslate from '../hooks/useTranslate';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loadingtemp';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { notes, loading, error } = useNotes(getArchivedNotes);
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
    <section className="archive-page">
      <h2>{t('notes.archivedTitle')}</h2>
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
          emptyMessage={keyword ? t('notes.searchEmpty') : t('notes.emptyArchived')}
        />
      )}
    </section>
  );
}

export default ArchivePage;
