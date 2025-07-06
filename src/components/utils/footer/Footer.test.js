import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Displays company name "Cinema Buzz"', () => {
  render(<Footer />);
  const companyNameElement = screen.getByText(/Cinema Buzz/i);
  expect(companyNameElement).toBeInTheDocument();
});

test('Displays Facebook, Twitter, Instagram, and Email icons', () => {
  render(<Footer />);

  // Check Facebook icon
  const facebookIcon = screen.getByTestId('facebook-link');
  expect(facebookIcon).toBeInTheDocument();
  expect(facebookIcon).toHaveAttribute('href', 'https://www.facebook.com');

  // Check Twitter icon
  const twitterIcon = screen.getByTestId('twitter-link');
  expect(twitterIcon).toBeInTheDocument();
  expect(twitterIcon).toHaveAttribute('href', 'https://www.twitter.com');

  // Check Instagram icon
  const instagramIcon = screen.getByTestId('instagram-link');
  expect(instagramIcon).toBeInTheDocument();
  expect(instagramIcon).toHaveAttribute('href', 'https://www.instagram.com');

  // Check Email icon
  const emailIcon = screen.getByTestId('email-link');
  expect(emailIcon).toBeInTheDocument();
  expect(emailIcon).toHaveAttribute('href', 'mailto:info@cineplex.com');
});

test('Displays copyright information with the current year', () => {
  render(<Footer />);
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} Cinemabuzz. All rights reserved.`;
  const copyrightElement = screen.getByText(copyrightText);
  expect(copyrightElement).toBeInTheDocument();
});
