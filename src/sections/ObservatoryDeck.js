import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ObservatoryDeck = () => {
  const sectionRef = useRef(null);
  const astronautRef = useRef(null);
  const spaceshipRef = useRef(null);
  
  useEffect(() => {
    // Create random UFOs
    const createUFOs = () => {
      const container = document.querySelector('.shooting-stars-container');
      if (!container) return;
      
      // Clear existing objects
      container.innerHTML = '';
      
      // Create 3 UFOs with random delays
      for (let i = 0; i < 3; i++) {
        const ufo = document.createElement('div');
        ufo.className = 'ufo';
        // Set random delay variable for each UFO (between 0 and 20s)
        ufo.style.setProperty('--delay', Math.random() * 20);
        container.appendChild(ufo);
      }
    };
    
    // Initialize UFOs
    createUFOs();
    
    // Recreate UFOs periodically
    const ufoInterval = setInterval(createUFOs, 30000);
    
    // Parallax scroll effect for stars
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
    
    // Astronaut initial subtle animation (constant rotation in space)
    if (astronautRef.current) {
      const astronaut = astronautRef.current;
      
      // Set initial position to the right of the spaceship
      gsap.set(astronaut, {
        x: 80,           // Start to the right of the spaceship
        y: -40,          // Higher position (negative value moves it up)
        rotation: 0,
        opacity: 1
      });
      
      // Astronaut continuous slow subtle rotation and movement
      gsap.to(astronaut, {
        rotation: 360,
        repeat: -1,
        duration: 12,
        ease: "linear" // Constant speed with no easing for realistic space rotation
      });
      
      // Astronaut drifting away on scroll
      const driftTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "30% top",
          scrub: 1.5
        }
      });
      
      driftTimeline.to(astronaut, {
        x: 300,          // Drift further to the right
        y: -150,         // And up
        scale: 0.4,
        opacity: 0,
        duration: 5,
        ease: "power1.in" // Gentle acceleration as astronaut drifts away
      });
    }
    
    return () => {
      clearInterval(ufoInterval);
    };
  }, []);
  
  return (
    <section id="observatory-deck" ref={sectionRef} className="observatory-deck">
      <div className="cosmic-background">
        <div className="sun-glow"></div>
        <div className="backdrop-stars"></div>
        <div className="nebula-clouds"></div>
        <div className="shooting-stars-container">
          {/* UFOs will be dynamically added here */}
        </div>
      </div>
      
      <div className="observatory-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="cosmic-caption">Welcome to the</span>
          <h1 className="glowing-text">Cosmic Gateway</h1>
          <p className="lead">
            Your portal to exploring the wonders of space from our cosmic viewpoint. 
            Experience the majesty of the cosmos like never before.
          </p>
          <div className="hero-buttons">
            <a href="#cosmic-phenomena" className="cosmic-button primary">
              <span className="button-text">Explore Space</span>
              <span className="button-glow"></span>
            </a>
            <a href="#mission-control" className="cosmic-button secondary">
              <span className="button-text">Book Journey</span>
              <span className="button-glow"></span>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="planet-visualization"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="spaceship" ref={spaceshipRef}>
            <img src="/images/Spaceship.png" alt="Cosmic spaceship" />
          </div>
          
          <div className="astronaut-rocket" ref={astronautRef}>
            <img src="/images/astronaut.png" alt="Astronaut with rocket" />
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