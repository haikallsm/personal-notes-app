import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteEditor from '../components/NoteEditor';
import { addNote } from '../utils/network-data';
import useTranslate from '../hooks/useTranslate';

function AddNotePage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const t = useTranslate();

  const onAddNoteHandler = async ({ title, body }) => {
    setSaving(true);
    const { error } = await addNote({ title, body });
    setSaving(false);

    if (!error) {
      navigate('/');
    }
  };

  const onCancelHandler = () => {
    navigate('/');
  };

  return (
    <section className="add-new-page">
      <h2>{t('add.title')}</h2>
      <NoteEditor
        onSubmit={onAddNoteHandler}
        onCancel={onCancelHandler}
        submitLabel={t('editor.submit')}
        isSubmitting={saving}
      />
    </section>
  );
}

export default AddNotePage;
