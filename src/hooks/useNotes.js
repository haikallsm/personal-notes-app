import { useCallback, useEffect, useState } from 'react';

function useNotes(fetchNotes) {
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState({ notes: [], error: null, key: null });

  useEffect(() => {
    let active = true;

    async function loadNotes() {
      const { error, data } = await fetchNotes();

      if (!active) {
        return;
      }

      setResult({
        notes: Array.isArray(data) ? data : [],
        error: error ? true : null,
        key: reloadKey,
      });
    }

    loadNotes();

    return () => {
      active = false;
    };
  }, [fetchNotes, reloadKey]);

  const refresh = useCallback(() => {
    setReloadKey((currentKey) => currentKey + 1);
  }, []);

  return {
    notes: result.notes,
    loading: result.key !== reloadKey,
    error: result.key === reloadKey ? result.error : null,
    refresh,
  };
}

export default useNotes;
