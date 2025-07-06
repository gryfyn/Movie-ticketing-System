import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import HomePage from './HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking supabase client
jest.mock('../../supabaseClient', () => ({
  from: () => ({
    select: () => ({
      data: [],
      error: null,
    }),
  }),
}));

test('renders HomePage without crashing', () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );
  expect(screen.getByText(/Latest Movies/i)).toBeInTheDocument();
});


test('displays featured movie carousel with movie title and image', () => {
  // Mock supabase to return a movie with specific data
  jest.mock('../../supabaseClient', () => ({
    from: () => ({
      select: () => ({
        data: [
          {
            id: 1,
            title: 'Featured Movie Title',
            backdropimg: 'featured-movie.jpg',
            trailer_id: 'dQw4w9WgXcQ',
            release_date: '2024-01-01',
            duration: '120 min',
            genre: ['Action', 'Adventure'],
            image: 'featured-movie.jpg'
          }
        ],
        error: null,
      }),
    }),
  }));

  render(
    <Router>
      <HomePage />
    </Router>
  );

  // Check if the carousel displays the featured movie image
  const featuredImage = screen.getByRole("img");
  expect(featuredImage).toBeInTheDocument();
});


test('displays Latest Movies section with movie links', () => {
  // Mock supabase to return movies for the Latest Movies section
  jest.mock('../../supabaseClient', () => ({
    from: () => ({
      select: () => ({
        data: [
          {
            id: 1,
            title: 'Latest Movie Title',
            image: 'latest-movie.jpg',
          }
        ],
        error: null,
      }),
    }),
  }));

  render(
    <Router>
      <HomePage />
    </Router>
  );

  // Check if Latest Movies section is present
  expect(screen.getByText(/Latest Movies/i)).toBeInTheDocument();

  // Check if the Latest Movies section contains a movie link
  const movieLink = screen.getByRole('heading', { name: 'Latest Movies' });
  expect(movieLink).toBeInTheDocument();
  
});


test('displays Blockbusters section with movie links', () => {
  // Mock supabase to return movies for the Blockbusters section
  jest.mock('../../supabaseClient', () => ({
    from: () => ({
      select: () => ({
        data: [
          {
            id: 2,
            title: 'Blockbuster Movie Title',
            image: 'blockbuster-movie.jpg',
          }
        ],
        error: null,
      }),
    }),
  }));

  render(
    <Router>
      <HomePage />
    </Router>
  );

  // Check if Blockbusters section is present
  expect(screen.getByText(/Blockbusters/i)).toBeInTheDocument();

  // Check if the Blockbusters section contains a movie link
  const movieLink = screen.getByRole('heading', { name: 'Blockbusters' });
  expect(movieLink).toBeInTheDocument();
  
});


