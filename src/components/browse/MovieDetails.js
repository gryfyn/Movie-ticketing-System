import React, { useEffect, useState } from 'react';
import supabase from '../../supabaseClient'; // Ensure this path is correct
import Header from '../utils/header/Header';
import './MovieDetails.css';
import '../home/HomePage.css'; 
import Footer from '../utils/footer/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data, error } = await supabase.from('movies').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching movie:', error.message);
      } else {
        setMovie(data);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movies-details" style={{textAlign:'left'}}>
      <Header />

      <main className="main-content" style={{textAlign:'left'}}>
        <section>
          <img src={movie.backdropimg} alt={movie.title} className="movie-image" style={{width: '55%', marginLeft:'160px'}}/>
          
          
        </section>
        
       <div className='title'>
       <h1>{movie.title}</h1>
        <p style={{color: '#FFF0F5'}}>{movie.duration} &nbsp;| &nbsp;{movie.genre.join(', ')} &nbsp;| &nbsp;{movie.pg_rating} &nbsp;| &nbsp;IMBD: {movie.movie_rating} &nbsp;| &nbsp;{movie.release_date} &nbsp;|&nbsp; {movie.quality}</p>

       </div>

       

        <div className="movie-information">
        
            
            <h3 className="plot">Plot Summary</h3>
            <p style={{textAlign: 'justify'}}>{movie.about}</p>
            <h2>Directors</h2>
            <p>{movie.directors ? movie.directors.join(', ') : 'N/A'}</p>
            <h2 className='casts'>Cast</h2>
            <p>{movie.actors ? movie.actors.join(', ') : 'N/A'}</p>

            <button
            className="book-ticket"
            onClick={() => navigate(`/booking/${id}`)} // Navigate to the booking page
          >Book Ticket
          </button>
        </div>

        
        
      </main>
      <Footer/>
    </div>
  );
};

export default MovieDetails;
