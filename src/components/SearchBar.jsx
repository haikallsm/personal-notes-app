import PropTypes from 'prop-types';
import useTranslate from '../hooks/useTranslate';

function SearchBar({ keyword = '', keywordChange }) {
  const t = useTranslate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (typeof keywordChange === 'function') {
      keywordChange(value);
    }
  };

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={t('notes.searchPlaceholder')}
        value={keyword || ''}
        onChange={handleInputChange}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
