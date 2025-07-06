import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../supabaseClient';
import ColorThief from 'colorthief';
import Header from './Header';
import Footer from './Footer';
import './MoviePage.css';

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    releaseDate: '',
    genre: '',
    pgRating: '',
    quality: '',
    imdbRating: '',
  });
  const [filterOptions, setFilterOptions] = useState({
    releaseDates: [],
    genres: [],
    pgRatings: [],
    qualities: [],
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dominantColors, setDominantColors] = useState({});

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const { data: releaseDates, error: releaseDateError } = await supabase
        .from('movies')
        .select('release_date')
        .order('release_date', { ascending: false });

      const { data: genres, error: genreError } = await supabase
        .from('movies')
        .select('genre')
        .order('genre', { ascending: true });

      const { data: pgRatings, error: pgRatingError } = await supabase
        .from('movies')
        .select('pg_rating')
        .order('pg_rating', { ascending: true });

      const { data: qualities, error: qualityError } = await supabase
        .from('movies')
        .select('quality')
        .order('quality', { ascending: true });

      if (releaseDateError || genreError || pgRatingError || qualityError) {
        console.error('Error fetching filter options:', releaseDateError || genreError || pgRatingError || qualityError);
      } else {
        setFilterOptions({
          releaseDates: [...new Set(releaseDates.map(movie => movie.release_date).filter(date => date))].map(date => new Date(date).getFullYear()).filter((year, index, self) => self.indexOf(year) === index),
          genres: [...new Set(genres.flatMap(movie => movie.genre).filter(genre => genre))],
          pgRatings: [...new Set(pgRatings.map(movie => movie.pg_rating).filter(rating => rating))],
          qualities: [...new Set(qualities.map(movie => movie.quality).filter(quality => quality))],
        });
      }
    };

    fetchFilterOptions();
  }, []);

  const fetchMovies = async () => {
    let query = supabase.from('movies').select('*', { count: 'exact' });

    if (filters.releaseDate) {
      query = query.eq('release_date', filters.releaseDate);
    }
    if (filters.genre) {
      query = query.contains('genre', [filters.genre]);
    }
    if (filters.pgRating) {
      query = query.eq('pg_rating', filters.pgRating);
    }
    if (filters.quality) {
      query = query.eq('quality', filters.quality);
    }
    if (filters.imdbRating) {
      query = query.gte('movie_rating', filters.imdbRating);
    }

    const { data, error, count } = await query.range((page - 1) * 32, page * 32 - 1);

    if (error) {
      console.error('Error fetching movies:', error.message);
    } else {
      setMovies(data);
      setTotalPages(Math.ceil(count / 32));
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (movies.length > 0) {
      movies.forEach((movie) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = movie.image;
        img.onload = () => {
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(img);
          setDominantColors((prevColors) => ({
            ...prevColors,
            [movie.id]: `rgb(${dominantColor.join(',')})`,
          }));
        };
      });
    }
  }, [movies]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setPage(1);
    fetchMovies();
  };

  if (!movies) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-page">
      <Header />
      <main className="main-content">
        <div className="filters">
          <select name="releaseDate" value={filters.releaseDate} onChange={handleFilterChange}>
            <option value="">Release Date</option>
            {filterOptions.releaseDates.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">Genre</option>
            {filterOptions.genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
          <select name="pgRating" value={filters.pgRating} onChange={handleFilterChange}>
            <option value="">PG Rating</option>
            {filterOptions.pgRatings.map((rating, index) => (
              <option key={index} value={rating}>{rating}</option>
            ))}
          </select>
          <select name="quality" value={filters.quality} onChange={handleFilterChange}>
            <option value="">Quality</option>
            {filterOptions.qualities.map((quality, index) => (
              <option key={index} value={quality}>{quality}</option>
            ))}
          </select>
          <button onClick={applyFilters} className="filter-button">Filter</button>
        </div>
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <Link to={`/movie/${movie.id}`} key={index} className="movie-link">
              <div
                className="movies-item"
                style={{
                  background: dominantColors[movie.id]
                    ? `linear-gradient(to bottom, ${dominantColors[movie.id]}, #000)`
                    : '#333'
                }}
              >
                <img src={movie.image} alt={movie.title} />
                <p>{movie.title}</p>
                <p style={{ color: '#FFE1E9' }}>{movie.duration} &nbsp;|&nbsp;{movie.genre.join(', ')}&nbsp;|&nbsp;{movie.pg_rating}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoviePage;
