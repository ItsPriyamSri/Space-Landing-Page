import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <div className="logo-text">Cosmic Gateway</div>
            </div>
            <p className="footer-description">
              Your portal to the wonders of the cosmos. Explore the universe from the comfort of our space station.
            </p>
          </div>
          
          <div className="footer-links-container">
            <div className="footer-links">
              <h5>Navigation</h5>
              <ul>
                <li><a href="#observatory-deck">Home</a></li>
                <li><a href="#cosmic-phenomena">Phenomena</a></li>
                <li><a href="#expedition-timeline">Expeditions</a></li>
                <li><a href="#astronaut-testimonials">Testimonials</a></li>
                <li><a href="#space-technology">Technology</a></li>
                <li><a href="#mission-control">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h5>Legal</h5>
              <ul>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Space Travel Waiver</a></li>
                <li><a href="#">Zero-G Disclaimer</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h5>Connect</h5>
              <ul>
                <li><a href="#">Space Instagram</a></li>
                <li><a href="#">Cosmic Twitter</a></li>
                <li><a href="#">Galactic LinkedIn</a></li>
                <li><a href="#">Newsletter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Cosmic Gateway. All rights reserved across the known universe.
          </p>
          <p className="space-coordinates">
            ISS Coordinates: 51.6°N, 8.1°E • Altitude: 408 km • Velocity: 27,600 km/h
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;