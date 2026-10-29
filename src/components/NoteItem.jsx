import React from 'react';
import { Link } from 'react-router-dom';
import { getExcerpt, getPlainText } from '../utils';
import FormattedDate from './FormattedDate';

function NoteItem({ note }) {
  const { id, title, body, createdAt } = note;
  const excerpt = getExcerpt(getPlainText(body));

  return (
    <article className="note-item">
      <Link to={`/notes/${id}`} className="note-item__link">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__createdAt">
          <FormattedDate date={createdAt} />
        </p>
        <p className="note-item__body">{excerpt}</p>
        <span className="note-item__read-more">Baca selengkapnya &rarr;</span>
      </Link>
    </article>
  );
}

export default NoteItem;