import React from 'react';

function SearchBar({ value, onChange, resultCount }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="search-bar__label">
        Cari catatan
      </label>
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Cari berdasarkan judul catatan..."
      />
      {value.trim() !== '' && (
        <p className="search-bar__result">
          {resultCount} catatan ditemukan untuk &ldquo;{value.trim()}&rdquo;
        </p>
      )}
    </div>
  );
}

export default SearchBar;