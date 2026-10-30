import { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import useTranslate from '../hooks/useTranslate';

function NoteEditor({
  initialTitle = '',
  initialBody = '',
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}) {
  const [title, onTitleChange] = useInput(initialTitle);
  const [body, setBody] = useState(initialBody);
  const t = useTranslate();

  const handleBodyInput = (event) => {
    setBody(event.target.innerHTML);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit({ title: title.trim(), body });
    }
  };

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <div className="add-new-page__input">
        <label className="visually-hidden" htmlFor="note-title">
          {t('editor.titleLabel')}
        </label>
        <input
          id="note-title"
          type="text"
          className="add-new-page__input__title"
          value={title}
          onChange={onTitleChange}
          placeholder={t('editor.titlePlaceholder')}
          required
        />

        <label className="visually-hidden" htmlFor="note-body">
          {t('editor.bodyLabel')}
        </label>
        <div
          id="note-body"
          className="add-new-page__input__body"
          role="textbox"
          aria-multiline="true"
          aria-label={t('editor.bodyLabel')}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={t('editor.bodyPlaceholder')}
          onInput={handleBodyInput}
          dangerouslySetInnerHTML={{ __html: initialBody }}
        />
      </div>

      <div className="note-editor__actions">
        <button type="button" className="button button--outline" onClick={onCancel}>
          {t('editor.cancel')}
        </button>
        <button type="submit" className="button button--primary" disabled={isSubmitting}>
          {isSubmitting ? t('loading.saving') : (submitLabel ?? t('editor.submit'))}
        </button>
      </div>
    </form>
  );
}

NoteEditor.propTypes = {
  initialTitle: PropTypes.string,
  initialBody: PropTypes.string,
  submitLabel: PropTypes.string,
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default NoteEditor;
