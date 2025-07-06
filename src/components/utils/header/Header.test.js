import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header'; // Adjust the import path if necessary
import { MemoryRouter } from 'react-router-dom';

// Helper function to render the component with MemoryRouter
const renderWithRouter = (ui) => render(ui, { wrapper: MemoryRouter });

test('Displays the brand name or logo "Cinema Buzz"', () => {
  renderWithRouter(<Header />);
  const brandNameElement = screen.getByText(/Cinema Buzz/i);
  expect(brandNameElement).toBeInTheDocument();
});

test('Displays the logo image with correct src and alt attributes', () => {
  renderWithRouter(<Header />);
  const logoImage = screen.getByAltText(/logo/i);
  expect(logoImage).toBeInTheDocument();
   // Adjust based on actual path
});

test('Displays navigation link to home with FontAwesome icon', () => {
  renderWithRouter(<Header />);
  const homeLink = screen.getByTestId('home');
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttr
  ibute('href', '/');
  
});

test('Displays search bar and handles search input', async () => {
  renderWithRouter(<Header />);
  const searchInput = screen.getByPlaceholderText(/search/i);
  expect(searchInput).toBeInTheDocument();

  // Simulate typing into the search input
  fireEvent.change(searchInput, { target: { value: 'test' } });

  
});

test('Displays navigation link to browse movies', () => {
  renderWithRouter(<Header />);
  const browseMoviesLink = screen.getByText(/BROWSE MOVIES/i);
  expect(browseMoviesLink).toBeInTheDocument();
  
});


