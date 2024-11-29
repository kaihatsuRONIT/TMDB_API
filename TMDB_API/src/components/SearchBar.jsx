import React, { useState } from 'react';

const SearchBar = ({ onSearch, type }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query,type);//this function is passed as prop from app.jsx and handles handleSearch in app.jsx
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="movie">Movie</option>
        <option value="tv">TV Show</option>
      </select> */}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
