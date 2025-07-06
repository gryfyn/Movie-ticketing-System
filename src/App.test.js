import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import MovieDetails from './components/browse/MovieDetails';
import MoviePage from './components/browse/MoviePage';
import BookingPage from './components/booking/BookingPage';
import ReceiptPage from './components/receipts/ReceiptPage';
import PaymentPage from './components/payment/PaymentPage';

test('Renders HomePage component for "/" route', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </MemoryRouter>
  );
  const homeElement = await screen.findByTestId('homepage'); 
  expect(homeElement).toBeInTheDocument();
});



test('Renders MoviePage component for "/movies" route', async () => {
  render(
    <MemoryRouter initialEntries={['/movies']}>
      <Routes>
        <Route path="/movies" element={<MoviePage />} />
      </Routes>
    </MemoryRouter>
  );
  const moviePageElement = await screen.findByText(/Movies/i); // Replace with actual text
  expect(moviePageElement).toBeInTheDocument();
});

