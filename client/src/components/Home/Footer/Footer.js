import React from 'react';
import './Footer.css'; // You'll need to create a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-contact">
          <h1 className="logo">BRBER</h1>
          <p>Receive updates and latest news direct from Simply enter.</p>
          <p className="contact-info">
            <span>+564 7885 3222</span>
            <br />
            <a href="mailto:youremail@gmail.com">youremail@gmail.com</a>
          </p>
        </div>

        <div className="footer-section links">
          <h3>Location</h3>
          <ul>
            <li>Advanced</li>
            <li>Management</li>
            <li>Corporate</li>
            <li>Customer</li>
            <li>Information</li>
          </ul>
        </div>

        <div className="footer-section explore">
          <h3>Explore</h3>
          <ul>
            <li>Cookies</li>
            <li>About</li>
            <li>Privacy Policy</li>
            <li>Properties</li>
            <li>Licenses</li>
          </ul>
        </div>

        <div className="footer-section subscribe">
          <h3>Location</h3>
          <p>Subscribe now to get daily updates</p>
          <form>
            <input
              type="email"
              placeholder="Email Address"
              className="subscribe-input"
            />
            <button type="submit" className="subscribe-button">Send</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 All rights reserved | This template is made with <span>❤</span> by Colorlib</p>
        <div className="socials">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fas fa-globe"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
