import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ObservatoryDeck = () => {
  const sectionRef = useRef(null);
  const planetRef = useRef(null);
  
  useEffect(() => {
    // Animate the floating planet
    const planet = planetRef.current;
    if (planet) {
      gsap.to(planet, {
        y: 30,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
    
    // Parallax scroll effect
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(
        section.querySelector('.backdrop-stars'),
        { y: 0 },
        {
          y: 100,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        }
      );
    }
  }, []);
  
  return (
    <section id="observatory-deck" ref={sectionRef} className="observatory-deck">
      <div className="backdrop-stars"></div>
      
      <div className="observatory-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="cosmic-caption">Welcome to the</span>
          <h1>Cosmic Gateway</h1>
          <p className="lead">
            Your portal to exploring the wonders of space from our cutting-edge orbital station. 
            Experience the majesty of the cosmos like never before.
          </p>
          <div className="hero-buttons">
            <a href="#cosmic-phenomena" className="cosmic-button primary">
              Explore Space
            </a>
            <a href="#mission-control" className="cosmic-button secondary">
              Book Journey
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="planet-visualization"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          ref={planetRef}
        >
          <div className="planet">
            <div className="planet-ring"></div>
          </div>
          <div className="space-station">
            <div className="station-module primary"></div>
            <div className="station-module secondary"></div>
            <div className="station-module tertiary"></div>
            <div className="solar-panels"></div>
          </div>
        </motion.div>
        
        <div className="scroll-indicator">
          <span>Scroll to Explore</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="space-stats">
        <div className="stat-item">
          <span className="stat-value">250+</span>
          <span className="stat-label">Days in Orbit</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">15K+</span>
          <span className="stat-label">Star Systems</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">98%</span>
          <span className="stat-label">Traveler Rating</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">24/7</span>
          <span className="stat-label">Cosmic Support</span>
        </div>
      </div>
    </section>
  );
};

export default ObservatoryDeck;