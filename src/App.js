import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import MovieDetails from './components/browse/MovieDetails';
import MoviePage from './components/browse/MoviePage';

import BookingPage from './components/booking/BookingPage'; 
import ReceiptPage from './components/receipts/ReceiptPage';
import PaymentPage from './components/payment/PaymentPage';
import Header from './components/utils/header/Header';
import Footer from './components/utils/footer/Footer';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/booking/:id" element={<BookingPage />} /> 
          <Route path="/receipt/:id" element={<ReceiptPage />} /> 
          <Route path="/payment" element={<PaymentPage />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
