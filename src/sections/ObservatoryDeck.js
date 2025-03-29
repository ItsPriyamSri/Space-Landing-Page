import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ObservatoryDeck = () => {
  const sectionRef = useRef(null);
  const astronautRef = useRef(null);
  const spaceshipRef = useRef(null);
  const nebulaRef = useRef(null); // Add a ref for the nebula background
  const [activeTooltip, setActiveTooltip] = useState(null);
  
  useEffect(() => {
    // Add specific code to ensure the nebula background is loaded and visible
    if (nebulaRef.current) {
      // Force a repaint of the nebula element to ensure it's displayed
      nebulaRef.current.style.display = 'none';
      void nebulaRef.current.offsetHeight; // Trigger a reflow
      nebulaRef.current.style.display = 'block';
    }
    
    // Create random UFOs
    const createUFOs = () => {
      const container = document.querySelector('.shooting-stars-container');
      if (!container) return;
      
      // Clear existing objects
      container.innerHTML = '';
      
      // Create only 1 UFO with random delay (reduced from 3)
      const ufo = document.createElement('div');
      ufo.className = 'ufo';
      // Set random delay variable for the UFO (between 0 and 20s)
      ufo.style.setProperty('--delay', Math.random() * 20);
      
      // No tooltip added
      
      container.appendChild(ufo);
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
    
    // Clean animation for astronaut with only drift and spin - no clashing effects
    if (astronautRef.current) {
      const astronaut = astronautRef.current;
      
      // Set initial position
      gsap.set(astronaut, {
        x: 80,
        y: -40,
        rotation: 0,
        opacity: 1,
        scale: 1
      });
      
      // Remove any existing animations that might be conflicting
      gsap.killTweensOf(astronaut);
      
      // Create a single clean animation that combines drift and spin
      gsap.to(astronaut, {
        x: 500,          // Drift to the right
        y: -250,         // Drift upward
        rotation: 360,   // Spin exactly once during the drift
        scale: 0.2,      // Shrink as it moves away (perspective effect)
        opacity: 0,      // Fade out as it drifts
        duration: 40,    // Slow animation for subtlety
        ease: "power1.inOut", // Smooth easing
        onComplete: function() {
          // Reset for next cycle
          gsap.set(astronaut, {
            x: -100,       // Start off-screen to the left
            y: 100,        // Start lower
            rotation: 0,   // Reset rotation
            scale: 0.2,    // Start small
            opacity: 0,    // Start invisible
          });
          
          // Return to starting position with animation
          gsap.to(astronaut, {
            x: 80,
            y: -40,
            scale: 1,
            opacity: 1,
            duration: 5,
            delay: 2,
            onComplete: function() {
              // Restart the drift and spin animation
              gsap.to(astronaut, {
                x: 500,
                y: -250,
                rotation: 360,
                scale: 0.2,
                opacity: 0,
                duration: 40,
                ease: "power1.inOut",
                repeat: -1,    // Infinite repeats
                repeatDelay: 7, // Wait before repeating
                yoyo: false    // Don't reverse animation
              });
            }
          });
        }
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
        <div className="nebula-clouds" ref={nebulaRef}></div>
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
          <div 
            className="spaceship" 
            ref={spaceshipRef}
            onMouseEnter={() => setActiveTooltip('spaceship')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <img src="/images/Spaceship.png" alt="Cosmic spaceship" />
            {activeTooltip === 'spaceship' && (
              <div className="tooltip">STELLAR VOYAGER MARK VII</div>
            )}
          </div>
          
          <div 
            className="astronaut-rocket" 
            ref={astronautRef}
            onMouseEnter={() => setActiveTooltip('astronaut')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <img src="/images/astronaut.png" alt="Astronaut with rocket" />
            {activeTooltip === 'astronaut' && (
              <div className="tooltip">Distressed Astronaut</div>
            )}
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
          <span className="stat-value animated-number" data-value="250">250+</span>
          <span className="stat-label days">Days in Orbit</span>
        </div>
        <div className="stat-item">
          <span className="stat-value animated-number" data-value="15">15K+</span>
          <span className="stat-label systems">Star Systems</span>
        </div>
        <div className="stat-item">
          <span className="stat-value animated-number" data-value="98">98%</span>
          <span className="stat-label rating">Traveler Rating</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">24/7</span>
          <span className="stat-label support">Cosmic Support</span>
        </div>
      </div>
    </section>
  );
};

export default ObservatoryDeck;