import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hamburgerClicked, setHamburgerClicked] = useState(0);
  const [hamburgerMessage, setHamburgerMessage] = useState('');
  
  // Funny messages to show when hamburger is repeatedly clicked
  const funnyMessages = [
    "Hey, I'm just a hamburger menu!",
    "Stop poking me!",
    "Are you trying to feed me?",
    "I'm getting dizzy...",
    "Ok, here's a secret: *whispers* I'm not actually food",
    "If you click me 3 more times, aliens will show up...",
    "Just kidding about the aliens...or was I?",
    "That's it, I'm calling space security!",
    "ALERT: Human repeatedly pressing innocent hamburger menu",
    "Fine! You win! Here's your reward: 🛸"
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setHamburgerClicked(prev => {
      const newCount = prev + 1;
      
      // Show a message if clicked multiple times
      if (newCount >= 3) {
        const messageIndex = Math.min(funnyMessages.length - 1, Math.floor(newCount / 3));
        setHamburgerMessage(funnyMessages[messageIndex]);
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setHamburgerMessage('');
        }, 3000);
      }
      
      return newCount;
    });
  };
  
  // Add the Easter egg console message when page loads
  useEffect(() => {
    // This message will appear when someone opens dev tools
    console.log("%c👽 ATTENTION HUMAN DEVELOPER 👽", "color: #38FFDD; font-size: 20px; font-weight: bold;");
    console.log("%cYou've discovered our secret communication channel!", "color: #7A5FFF; font-size: 14px;");
    console.log("%cThe mothership is watching. Your curiosity has been noted.", "color: #FF3D81; font-size: 14px;");
    console.log("%cP.S. We come in peace... for now.", "color: #FFD046; font-size: 12px; font-style: italic;");
  }, []);
  
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
            <a href="#mission-control">Booking</a>
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
          {hamburgerMessage && <div className="hamburger-message">{hamburgerMessage}</div>}
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
            <a href="#mission-control" onClick={() => setMobileMenuOpen(false)}>Booking</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;