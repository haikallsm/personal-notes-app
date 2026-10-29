import React, { useState } from 'react';

function NoteEditor({ initialTitle = '', initialBody = '', submitLabel, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyInput = (event) => {
    setBody(event.target.innerHTML);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title: title.trim(), body });
  };

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <div className="add-new-page__input">
        <label className="visually-hidden" htmlFor="note-title">
          Judul catatan
        </label>
        <input
          id="note-title"
          type="text"
          className="add-new-page__input__title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Judul..."
          required
        />

        <label className="visually-hidden" htmlFor="note-body">
          Isi catatan
        </label>
        <div
          id="note-body"
          className="add-new-page__input__body"
          role="textbox"
          aria-multiline="true"
          aria-label="Isi catatan"
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Sebenarnya saya adalah ...."
          onInput={handleBodyInput}
          dangerouslySetInnerHTML={{ __html: initialBody }}
        />
      </div>

      <div className="note-editor__actions">
        <button type="button" className="button button--outline" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="button button--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default NoteEditor;