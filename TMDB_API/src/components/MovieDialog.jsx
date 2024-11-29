import React, { useState, useEffect } from 'react';
import '../css/MovieDialog.css';
import { getMovieCredits, getTVCredits, getVideos } from '../../tmdb'; //fetches movie an tvshow cast and trailer (if available)

const MovieDialog = ({ item, type, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const credits =
          type === 'movie'
            ? await getMovieCredits(item.id)
            : await getTVCredits(item.id);
        setCast(credits.slice(0, 10)); // Show top 10 cast members

        // Fetch video details
        const videos = await getVideos(item.id, type);
        const trailer = videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
        setTrailerKey(trailer ? trailer.key : null);

      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };
    fetchCredits();
  }, [item, type]);
  if (!item) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{item.title || item.name}</h2>

        {/* Display YouTube trailer or an image if trailer is not available */}
        {trailerKey ? (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={item.title || item.name}
          />
        )}

        <p><strong>Overview:</strong> {item.overview || 'No overview available.'}</p>
        <p><strong>Rating:</strong> {item.vote_average || 'N/A'}</p>

        <div>
          {/* this div will be used to display names of top 10 cast */}
          <h3>Cast:</h3>
          <ul className="cast-list">
            {cast.length > 0 ? (
              cast.map((actor) => (
                <li key={actor.id}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w45${actor.profile_path}`
                        : 'https://via.placeholder.com/45x45?text=No+Image'
                    }
                    alt={actor.name}
                    className="cast-image"
                  />
                  {actor.name} as {actor.character || 'Unknown'}
                </li>
              ))
            ) : (
              <p>No cast information available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
