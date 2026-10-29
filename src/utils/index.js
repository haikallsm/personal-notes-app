const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('id-ID', options);
};

const getPlainText = (html = '') => {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6])>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getExcerpt = (text, limit = 180) => {
  if (text.length <= limit) {
    return text;
  }

  const shortened = text.slice(0, limit);
  const lastSpaceIndex = shortened.lastIndexOf(' ');

  return `${shortened.slice(0, lastSpaceIndex > 0 ? lastSpaceIndex : limit)}...`;
};

const searchNotesByTitle = (notes, query = '') => {
  const keyword = query.trim().toLowerCase();

  if (!keyword) {
    return notes;
  }

  return notes.filter((note) => note.title.toLowerCase().includes(keyword));
};

export { showFormattedDate, getPlainText, getExcerpt, searchNotesByTitle };