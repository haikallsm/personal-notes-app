import { useCallback, useReducer } from 'react';
import {
  addNote as addNoteToStorage,
  archiveNote as archiveNoteInStorage,
  deleteNote as deleteNoteInStorage,
  editNote as editNoteInStorage,
  getActiveNotes,
  getAllNotes,
  getArchivedNotes,
  getNote,
  unarchiveNote as unarchiveNoteInStorage,
} from '../utils/local-data';

function useNotesStore() {
  const [, forceRender] = useReducer((state) => state + 1, 0);

  const refresh = useCallback(() => {
    forceRender();
  }, []);

  const addNote = useCallback((payload) => {
    const newId = addNoteToStorage(payload);
    forceRender();

    return newId;
  }, []);

  const deleteNote = useCallback((id) => {
    deleteNoteInStorage(id);
    forceRender();
  }, []);

  const archiveNote = useCallback((id) => {
    archiveNoteInStorage(id);
    forceRender();
  }, []);

  const unarchiveNote = useCallback((id) => {
    unarchiveNoteInStorage(id);
    forceRender();
  }, []);

  const editNote = useCallback((payload) => {
    editNoteInStorage(payload);
    forceRender();
  }, []);

  return {
    getAllNotes,
    getActiveNotes,
    getArchivedNotes,
    getNote,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    editNote,
    refresh,
  };
}

export default useNotesStore;