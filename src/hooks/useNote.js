import { useCallback, useEffect, useState } from 'react';

function useNote(fetchNote, id) {
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState({ note: null, error: null, key: null });

  useEffect(() => {
    let active = true;

    async function loadNote() {
      const { error, data } = await fetchNote(id);

      if (!active) {
        return;
      }

      setResult({
        note: error ? null : data,
        error: error ? true : null,
        key: `${id}:${reloadKey}`,
      });
    }

    loadNote();

    return () => {
      active = false;
    };
  }, [fetchNote, id, reloadKey]);

  const refresh = useCallback(() => {
    setReloadKey((currentKey) => currentKey + 1);
  }, []);

  const currentKey = `${id}:${reloadKey}`;

  return {
    note: result.key === currentKey ? result.note : null,
    loading: result.key !== currentKey,
    error: result.key === currentKey ? result.error : null,
    refresh,
  };
}

export default useNote;
