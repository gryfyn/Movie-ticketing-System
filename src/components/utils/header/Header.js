import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import supabase from '../../../supabaseClient';
import logo from '../../images/film2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      // Perform search using Supabase
      const { data, error } = await supabase
        .from('movies')
        .select('id, title')
        .ilike('title', `%${term}%`);

      if (error) {
        console.error('Error fetching movies:', error.message);
      } else {
        setSuggestions(data);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = () => {
    setSuggestions([]);
  };

  return (
    <header className="header">
      <img src={logo} style={{width: '52px', height:'52px'}} alt='logo'/>
      <div className="logos">Cinema Buzz</div>
      <Link to="/" data-testid="home">
        <FontAwesomeIcon icon={faHouse} className='home' />
      </Link>

      
      <input
        type="text"
        className="search"
        placeholder="Search"
        style={{background: '#FFE1E9'}}
        value={searchTerm}
        onChange={handleSearchChange}
      /> <br/>
      {suggestions.length > 0 && (
        <ul className="suggestions"> <br/>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={handleSuggestionClick} style={{marginRight: '-290px', marginTop: '20px', display: 'block', marginLeft:'-225px',borderRadius: '5px', background: 'rgba(0, 0, 0, 0.4);'}}>
              <Link to={`/movie/${suggestion.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                {suggestion.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/movies" className="browse-movies-button">
        BROWSE MOVIES
      </Link>
    </header>
  );
};

export default Header;
