// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-and-social">
          <div className="company-name">Cinema Buzz</div>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" data-testid="facebook-link">
              <FontAwesomeIcon icon={faFacebookF} className="social-icon" style={{color: '#FFE1E9'}} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" data-testid="twitter-link">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" style={{color: '#FFE1E9'}} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" data-testid="instagram-link">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" style={{color: '#FFE1E9'}} />
            </a>
            <a href="mailto:info@cineplex.com" data-testid="email-link">
              <FontAwesomeIcon icon={faEnvelope} className="social-icon" style={{color: '#FFE1E9'}} />
            </a>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} Cinemabuzz. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
