import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ObservatoryDeck = () => {
  const sectionRef = useRef(null);
  const planetRef = useRef(null);
  const astronautRef = useRef(null);
  const ufoRef = useRef(null);
  
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
    
    // Animate floating astronaut
    const astronaut = astronautRef.current;
    if (astronaut) {
      // Rotation animation for spinning effect
      gsap.to(astronaut, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });
      
      // Floating path animation - drifting slowly through space
      gsap.to(astronaut, {
        x: -150,
        y: 150,
        duration: 25,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
    
    // Animate UFO with interesting movement pattern
    const ufo = ufoRef.current;
    if (ufo) {
      // Create a timeline for more complex movement
      const ufoTimeline = gsap.timeline({
        repeat: -1,
        yoyo: false
      });
      
      // Add movement segments to the timeline
      ufoTimeline
        .to(ufo, {
          x: 200, 
          y: -100,
          duration: 4,
          ease: "power1.inOut"
        })
        .to(ufo, {
          x: 300,
          y: 50,
          duration: 3,
          ease: "power2.out"
        })
        .to(ufo, {
          x: 0,
          y: 0,
          duration: 5,
          ease: "sine.inOut"
        })
        .to(ufo, {
          x: -200,
          y: -50,
          duration: 3.5,
          ease: "power1.inOut"
        })
        .to(ufo, {
          x: -300,
          y: 100,
          duration: 4,
          ease: "power2.out"
        })
        .to(ufo, {
          x: 0,
          y: 0,
          duration: 5,
          ease: "sine.inOut"
        });
      
      // Add subtle hover effect
      gsap.to(ufo, {
        y: "+=15",
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
    
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
  }, []);
  
  return (
    <section id="observatory-deck" ref={sectionRef} className="observatory-deck">
      <div className="cosmic-background">
        <div className="earth-view"></div>
        <div className="sun-glow"></div>
        <div className="backdrop-stars"></div>
        <div className="nebula-clouds"></div>
      </div>
      
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
          <div className="planet" ref={planetRef}>
            <div className="planet-atmosphere"></div>
            <div className="planet-surface"></div>
            <div className="planet-ring"></div>
          </div>
          <div className="floating-astronaut" ref={astronautRef}>
            <img src="/images/astronaut.png" alt="Floating astronaut" />
          </div>
          <div className="floating-ufo" ref={ufoRef}>
            <img src="https://cdn.pixabay.com/photo/2018/01/25/19/16/ufo-3106867_1280.png" alt="UFO spacecraft" />
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