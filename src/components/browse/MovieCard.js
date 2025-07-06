import React, { useState } from 'react';
import './MovieCard.css'; // Ensure the path is correct

const MovieCard = ({ movie, onWatchTrailerClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="movie-card">
      {imageError ? (
        <div className="image-error-message">Image failed to load</div>
      ) : (
        <img
          src={movie.image}
          alt={movie.title}
          className="movie-image"
          onError={handleImageError}
        />
      )}
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.release_date} | {movie.duration} | {movie.genre.join(', ')}</p>
        <button className="watch-trailer" onClick={() => onWatchTrailerClick(movie.trailer_id)}>Watch Trailer</button>
      </div>
    </div>
  );
};

export default MovieCard;
