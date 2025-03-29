import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingPopup = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="booking-popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="booking-popup"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="popup-content">
            <div className="popup-spaceship">
              <img src="/images/Spaceship.png" alt="Spaceship" />
              <div className="tractor-beam">
                <div className="beam-particles"></div>
              </div>
            </div>
            <div className="popup-message">
              <h2>Booking Confirmed, {userName}!</h2>
              <p>You will be beamed up soon to your destination.</p>
              <p>Are you sure you are experienced enough for this journey?</p>
              <p>Keep your space insurance up to date. We are not responsible for any gravitational anomalies, time dilation effects, or alien encounters.</p>
              
              <button className="cosmic-button primary" onClick={onClose}>
                Confirm Launch Sequence
              </button>
              
              <p className="terms-text">* By clicking this button, you acknowledge that we may or may not sell your data to the Galactic Empire.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingPopup;