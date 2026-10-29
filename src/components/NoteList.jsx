import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, emptyMessage = 'Tidak ada catatan' }) {
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <section className="notes-list" aria-label="Daftar catatan">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </section>
  );
}

export default NoteList;