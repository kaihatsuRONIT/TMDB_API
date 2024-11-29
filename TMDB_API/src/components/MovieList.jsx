import React from 'react';
import '../css/MovieList.css';

const MovieList = ({ results, onShowMore }) => {
  if (!results.length) {
    return <p>No results found. Try searching for something else!</p>;
  }

  return (
    <div className="movie-list">
      {results.map((item) => (
        <div className="movie-card" key={item.id}>
          <img
            src={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={item.title || item.name}
            className="movie-poster"
          />
          <div className="movie-info">
            <h3>{item.title || item.name}</h3>
            <p>
              <strong>Release Date:</strong>{' '}
              {item.release_date || item.first_air_date || 'N/A'}
            </p>
            <button onClick={() => onShowMore(item)}>Show More</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
