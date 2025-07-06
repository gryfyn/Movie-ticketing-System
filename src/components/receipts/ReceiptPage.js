import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import './ReceiptPage.css';
import Header from '../utils/header/Header';
import Footer from '../utils/footer/Footer';
import supabase from '../../supabaseClient';

const ReceiptPage = () => {
  const location = useLocation();
  const { state } = location;

  const { transaction_id, movieTitle, cinemaName, showtime, movieImage, ticketCounts, combos, totalAmount } = state;

  const handlePaymentSuccess = async () => {
    try {
      const { data, error } = await supabase.from('tickets').insert([
        {
          transaction_id,
          movieTitle,
          cinema: cinemaName,
          showtime,
          ticketCounts,
          combos,
          total: totalAmount,
        },
      ]);

      if (error) {
        console.error('Error inserting ticket:', error.message);
      } else {
        console.log('Ticket inserted successfully:', data);
        // Optionally, perform any necessary actions after inserting the ticket
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handlePaymentSuccess();

    const handlePrintShortcut = (e) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        window.print();
      }
    };
    window.addEventListener('keydown', handlePrintShortcut);

    return () => {
      window.removeEventListener('keydown', handlePrintShortcut);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt-page">
      <Header />
      <h3 style={{ marginLeft: '550px', marginBottom: '-50px', marginTop: '50px', fontSize: '1.2em' }}>Your Ticket is ready!</h3>
      <div className="ticket-card">
        <div className="ticket-left">
          <h2>Transaction ID: {transaction_id}</h2>
          <img src={movieImage} alt={movieTitle} className="moviess-image" />
         
          <div style={{ marginLeft: '500px', marginTop: '-280px', width: '400px' }}>
          <h2 >{movieTitle}</h2>
            <p>Theatre: {cinemaName}</p>
            <p>Showtime: {showtime}</p>

            <p style={{ color: '#ff007b', fontSize: '1.1em' }}>KES {totalAmount}</p>
          </div>
          <QRCode value={transaction_id} size={120} style={{ marginLeft: '670px' }} />
        </div>
      </div>
      <button onClick={handlePrint} className="print-ticket-button" style={{ background: '#ff007b', color: '#fff', width: '200px', height: '50px', borderRadius: '5px', border: 'solid 1px #ff007b', marginLeft: '530px', marginTop: '-50px', marginBottom: '50px', fontSize: '1.1em', fontWeight: 'bold', textAlign: 'center', lineHeight: '50px' }}>
        Print Ticket
      </button>
      <Footer />
    </div>
  );
};

export default ReceiptPage;
