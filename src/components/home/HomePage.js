import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import YouTube from 'react-youtube';
import './HomePage.css';
import supabase from '../../supabaseClient';
import { Link } from 'react-router-dom';
import Footer from '../utils/footer/Footer';
import Header from '../utils/header/Header';

const HomePage = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [trailerId, setTrailerId] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data, error } = await supabase.from('movies').select('*');
      if (error) {
        console.error('Error fetching movies:', error.message);
      } else {
        console.log('Fetched movies:', data); // Debugging output
        setMovies(data);
      }
    };

    fetchMovies();
  }, []);

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(?:youtu\.be\/|v\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const handleWatchTrailerClick = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      setTrailerId(videoId);
      setOverlayVisible(true);
    } else {
      console.error('Invalid YouTube URL:', url);
    }
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    setTrailerId('');
  };

  return (
    <div className="homepage">
      <Header />

      <main className="main-content">
        {/* Featured Carousel */}
        <div className="featured-movie">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            className="carousel"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="carousel-item">
                <img
                  src={movie.backdropimg || 'https://via.placeholder.com/800x450'}
                  alt={movie.title}
                  className="featured-image"
                />
                <div className="movie-info">
                  <h1 style={{ color: '#FFE1E9' }}>{movie.title}</h1>
                  <p style={{ color: '#FFE1E9' }}>
                    {movie.release_date} | {movie.duration} |{' '}
                    {movie.genre ? movie.genre.join(', ') : ''}
                  </p>
                  <button
                    className="watch-trailer"
                    onClick={() => handleWatchTrailerClick(movie.trailer_id)}
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Latest Movies */}
        <section className="movies-section">
          <h2>Latest Movies</h2>
          <div className="movies-list">
            {movies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-item"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={movie.image || 'https://via.placeholder.com/300x450'}
                  alt={movie.title}
                />
                <p style={{ fontSize: '1.05em', color: '#FFE1E9', margin: 0 }}>
                  {movie.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Blockbusters */}
        <section className="movies-section">
          <h2>Blockbusters</h2>
          <div className="movies-list">
            {movies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-item"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={movie.image || 'https://via.placeholder.com/300x450'}
                  alt={movie.title}
                />
                <p style={{ fontSize: '1.05em', color: '#FFE1E9', margin: 0 }}>
                  {movie.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Trailer Overlay */}
      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={handleCloseOverlay}>
              X
            </button>
            <YouTube
              videoId={trailerId}
              className="trailer-video"
              opts={{
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
