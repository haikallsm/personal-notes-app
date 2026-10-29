import React from 'react';
import parse from 'html-react-parser';

function NoteBody({ body, className = '' }) {
  const isEmpty = !body || body === '<br>' || body === '<div><br></div>';

  if (isEmpty) {
    return (
      <div className={`${className} note-body note-body--empty`}>
        <em>Tidak ada isi catatan.</em>
      </div>
    );
  }

  return <div className={`${className} note-body`}>{parse(body)}</div>;
}

export default NoteBody;