import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <div className="logo-text">Cosmic Gateway</div>
        </motion.div>
        
        <motion.ul 
          className="nav-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <li className="nav-item">
            <a href="#observatory-deck" className="active">Home</a>
          </li>
          <li className="nav-item">
            <a href="#cosmic-phenomena">Phenomena</a>
          </li>
          <li className="nav-item">
            <a href="#expedition-timeline">Expeditions</a>
          </li>
          <li className="nav-item">
            <a href="#astronaut-testimonials">Testimonials</a>
          </li>
          <li className="nav-item">
            <a href="#space-technology">Technology</a>
          </li>
          <li className="nav-item">
            <a href="#mission-control">Contact</a>
          </li>
        </motion.ul>
        
        <motion.button 
          className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.button>
      </div>
      
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li className="mobile-nav-item">
            <a href="#observatory-deck" onClick={() => setMobileMenuOpen(false)}>Home</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#cosmic-phenomena" onClick={() => setMobileMenuOpen(false)}>Phenomena</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#expedition-timeline" onClick={() => setMobileMenuOpen(false)}>Expeditions</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#astronaut-testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#space-technology" onClick={() => setMobileMenuOpen(false)}>Technology</a>
          </li>
          <li className="mobile-nav-item">
            <a href="#mission-control" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;