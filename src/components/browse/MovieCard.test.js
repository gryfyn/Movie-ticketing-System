import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';

const mockMovie = {
  image: 'https://example.com/image.jpg',
  title: 'Example Movie',
  release_date: '2024-07-01',
  duration: '120 min',
  genre: ['Action', 'Adventure'],
  trailer_id: 'trailer123',
};

const mockOnWatchTrailerClick = jest.fn();

describe('MovieCard', () => {
  test('renders MovieCard component', () => {
    render(<MovieCard movie={mockMovie} onWatchTrailerClick={mockOnWatchTrailerClick} />);
    
    expect(screen.getByAltText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.release_date} | ${mockMovie.duration} | ${mockMovie.genre.join(', ')}`)).toBeInTheDocument();
    expect(screen.getByText('Watch Trailer')).toBeInTheDocument();
  });

  test('handles image load error', () => {
    render(<MovieCard movie={mockMovie} onWatchTrailerClick={mockOnWatchTrailerClick} />);
    
    const image = screen.getByAltText(mockMovie.title);
    fireEvent.error(image);
    
    expect(screen.getByText('Image failed to load')).toBeInTheDocument();
  });

  test('calls onWatchTrailerClick when watch trailer button is clicked', () => {
    render(<MovieCard movie={mockMovie} onWatchTrailerClick={mockOnWatchTrailerClick} />);
    
    const button = screen.getByText('Watch Trailer');
    fireEvent.click(button);
    
    expect(mockOnWatchTrailerClick).toHaveBeenCalledWith(mockMovie.trailer_id);
  });
});
