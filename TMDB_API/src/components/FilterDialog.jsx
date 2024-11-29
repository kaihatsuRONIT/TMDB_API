import React, { useState, useEffect } from 'react';
import '../css/FilterDialog.css';
import { getGenres } from '../../tmdb'; // Fetch genres from TMDB API

const FilterDialog = ({ filters, type, onApplyFilter, onClose }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(filters.genre || '');
  const [rating, setRating] = useState(filters.rating || 0);

  useEffect(() => {
    const fetchGenres = async () => {
      const genreList = await getGenres(type);
      setGenres(genreList);
    };
    fetchGenres();
    //now whenever the type changes, useEffect will call getGenres api with movie or tvShow as type
  }, [type]);

  const handleApply = () => {
    //this will pass selectedGenre and rating and onApplyFilter will handle what to do with these props
    onApplyFilter({ genre: selectedGenre, rating});
  };

  return (
    <div className="filter-dialog-overlay" onClick={onClose}>
      <div className="filter-dialog-box" onClick={(e) => e.stopPropagation()}>
        <h3>Filter Results</h3>
        <div>
          <label>Genre:</label>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Minimum Rating:</label>
          <input
            type="number"
            min=""
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <button onClick={handleApply}>Apply Filters</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FilterDialog;
