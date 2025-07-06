import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import Header from '../utils/header/Header';
import Footer from '../utils/footer/Footer';
import largeComboImg from '../images/image.png';
import smallComboImg from '../images/image.png';
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [ticketCounts, setTicketCounts] = useState({ adult: 0, child: 0, senior: 0 });
  const [combos, setCombos] = useState({ largeCombo: 0, smallCombo: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await supabase
          .from('movies')
          .select('*')
          .eq('id', id)
          .single();

        if (movieRes.error) throw movieRes.error;
        setMovie(movieRes.data);

        const theatresRes = await supabase
          .from('theatres')
          .select('*');

        if (theatresRes.error) throw theatresRes.error;
        setTheatres(theatresRes.data);

        const showtimesRes = await supabase
          .from('showtimes')
          .select('*');

        if (showtimesRes.error) throw showtimesRes.error;
        setShowtimes(showtimesRes.data);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTicketChange = (type, delta) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(0, prevCounts[type] + delta),
    }));
  };

  const handleComboChange = (type, delta) => {
    setCombos((prevCombos) => ({
      ...prevCombos,
      [type]: Math.max(0, prevCombos[type] + delta),
    }));
  };

  const getTotal = () => {
    const ticketPrices = { adult: 600, child: 400, senior: 500 };
    const comboPrices = { largeCombo: 600, smallCombo: 300 };
    const ticketTotal = Object.keys(ticketCounts).reduce(
      (total, type) => total + ticketCounts[type] * ticketPrices[type],
      0
    );
    const comboTotal = Object.keys(combos).reduce(
      (total, type) => total + combos[type] * comboPrices[type],
      0
    );
    return (ticketTotal + comboTotal).toFixed(0);
  };

  const proceedToPayment = () => {
    if (!selectedCinema || !selectedShowtime) {
      alert('Please select both cinema and showtime');
      return;
    }

    const customerDetails = {
      email: 'aderogriffins254@gmail.com',
    };

    const paymentDetails = {
      totalAmount: getTotal(),
      customerDetails,
      movieTitle: movie.title,
      cinemaName: selectedCinema,
      showtime: selectedShowtime,
      movieImage: movie.backdropimg,
      ticketCounts,
      combos,
    };

    navigate('/payment', {
      state: paymentDetails,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="booking-page">
      <Header />
      <main className="main-content">
        <h2>Select Ticket Type</h2>
        <img src={movie.backdropimg} alt={movie.title} className="moviez-image" />
        <h1>{movie.title}</h1>
        <p>{movie.duration} | {movie.genre.join(', ')} | {movie.pg_rating}</p>

        <div className="cinema-selection" style={{ marginTop: '60px' }}>
          <label htmlFor="cinema" style={{ fontSize: '1.4em', marginLeft: "5px" }}>Choose Cinema:</label> &nbsp;
          <select
            id="cinema"
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}
            style={{ height: '30px', width: '200px', textAlign: 'center', marginTop: '-25px',marginLeft: '40px'  }}
          >
            <option value="">Select Cinema</option>
            {theatres.map((theatre) => (
              <option key={theatre.id} value={theatre.name}>{theatre.name}</option>
            ))}
          </select>
        </div>

        <div className="showtime-selection" style={{ marginTop: '20px' }}>
          <label htmlFor="showtime"  className="st" style={{ fontSize: '1.4em', marginLeft: "1px" }}>Choose Show Time:</label> &nbsp;
          <select
            id="showtime"
            value={selectedShowtime}
            onChange={(e) => setSelectedShowtime(e.target.value)}
            style={{ height: '30px', width: '200px', textAlign: 'center', marginTop: '-25px'}}
          >
            <option value="">Select Show Time</option>
            {showtimes.map((showtime) => (
              <option key={showtime.id} value={showtime.time}>{showtime.time}</option>
            ))}
          </select>
        </div>

        <div className="ticket-selection" style={{ marginTop: '80px', fontSize: '1.4em', backgroundColor: 'rgba(0, 0, 0, 0.2)', width: '60%', marginLeft: '250px', padding: '20px', borderRadius: '10px' }}>
          <table>
            <tbody>
              <tr>
                <td>Adult</td>
                <td>KES600</td>
                <td>
                  <button onClick={() => handleTicketChange('adult', -1)}>-</button> &nbsp;
                  <span>{ticketCounts.adult}</span> &nbsp;
                  <button onClick={() => handleTicketChange('adult', 1)}>+</button>
                </td>
              </tr>
              <tr>
                <td>Child</td>
                <td>KES400</td>
                <td>
                  <button onClick={() => handleTicketChange('child', -1)}>-</button> &nbsp;
                  <span>{ticketCounts.child}</span> &nbsp;
                  <button onClick={() => handleTicketChange('child', 1)}>+</button>
                </td>
              </tr>
              <tr>
                <td>Senior</td>
                <td>KES500</td>
                <td>
                  <button onClick={() => handleTicketChange('senior', -1)}>-</button> &nbsp;
                  <span>{ticketCounts.senior}</span> &nbsp; 
                  <button onClick={() => handleTicketChange('senior', 1)}>+</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: '50px' }}>Would you like to add a combo?</h3>
        <div className="combo-selection" style={{ marginTop: '10px', fontSize: '1.4em', backgroundColor: 'rgba(0, 0, 0, 0.2)', width: '60%', marginLeft: '250px', padding: '20px', borderRadius: '10px' }}>
          <table>
            <tbody>
              <tr>
                <td style={{ marginRight: '-20px' }}><img src={largeComboImg} alt="Large Combo" style={{ width: '30px', height: '30px', marginLeft: '12px' }} /></td>
                <td>Large Popcorn + Large Drink</td>
                <td>KES600</td>
                <td>
                  <button onClick={() => handleComboChange('largeCombo', -1)}>-</button> &nbsp; 
                  <span>{combos.largeCombo}</span> &nbsp;
                  <button onClick={() => handleComboChange('largeCombo', 1)}>+</button>
                </td>
              </tr>
              <tr>
                <td><img src={smallComboImg} alt="Small Combo" style={{ width: '30px', height: '30px', marginLeft: '12px' }} /></td>
                <td>Small Popcorn + Small Drink</td>
                <td>KES300</td>
                <td>
                  <button onClick={() => handleComboChange('smallCombo', -1)}>-</button> &nbsp; 
                  <span>{combos.smallCombo}</span> &nbsp; 
                  <button onClick={() => handleComboChange('smallCombo', 1)}>+</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="total-amount">
          <p style={{ marginTop: '50px', fontSize: '1.4em' }}>Total: KES{getTotal()}</p>
        </div>

        <button className="proceed-button" onClick={proceedToPayment}>Proceed to Payment</button>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
