import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const SpaceTechnology = () => {
  const sectionRef = useRef(null);
  
  const technologies = [
    {
      id: 1,
      name: "Quantum Navigation System",
      description: "Advanced navigation using quantum entanglement for instantaneous positioning across vast distances.",
      image: "https://img.freepik.com/premium-photo/quantum-computer-aboard-spaceship-used-navigation_976492-123208.jpg",
      specs: ["Accuracy: ±0.0001 lightyears", "Calculation time: <1ms", "Power usage: 22kW"]
    },
    {
      id: 2,
      name: "Gravitational Shield",
      description: "Protective field that regulates gravitational forces for comfortable living in any celestial environment.",
      image: "https://miro.medium.com/v2/resize:fit:3840/1*T6VzK8XTpRNV1uHeBd7d-w.jpeg",
      specs: ["Field strength: 15G", "Stability: 99.99%", "Coverage: 500m radius"]
    },
    {
      id: 3,
      name: "Antimatter Propulsion",
      description: "Cutting-edge engine using matter-antimatter annihilation for unprecedented speed and efficiency.",
      image: "https://www.slashgear.com/img/gallery/10-of-the-most-intense-sci-fi-engines-ranked-by-absurdity/shaw-fujikawa-translight-engine-1710184660.jpg",
      specs: ["Thrust: 28MN", "Efficiency: 99.6%", "Max speed: 0.25c"]
    },
    {
      id: 4,
      name: "Neural Interface",
      description: "Direct brain-computer connection for operating spacecraft systems with thought alone.",
      image: "https://www.shutterstock.com/shutterstock/videos/3582801471/thumb/1.jpg?ip=x480",
      specs: ["Response time: 4ms", "Neural channels: 128k", "Learning period: 2 weeks"]
    },
    {
      id: 5,
      name: "Radiation Absorption Matrix",
      description: "Advanced material that converts harmful cosmic radiation into usable energy.",
      image: "https://cdn.arstechnica.net/wp-content/uploads/2023/12/active-radiation-shielding.jpg",
      specs: ["Absorption rate: 98.5%", "Energy conversion: 76%", "Lifespan: 25 years"]
    },
    {
      id: 6,
      name: "Atmospheric Synthesizer",
      description: "Creates and maintains Earth-like atmosphere within enclosed habitats.",
      image: "https://consensus.app/home/wp-content/uploads/2024/05/atmospher-of-mars-and-earth.webp",
      specs: ["O₂ output: 500L/min", "Filtration: 99.999%", "Adaptability: 12 profiles"]
    }
  ];
  
  useEffect(() => {
    const section = sectionRef.current;
    const techCards = section.querySelectorAll('.technology-card');
    
    techCards.forEach((card, index) => {
      // Add a subtle floating animation to the tech cards
      gsap.to(card, {
        y: 10,
        duration: 3 + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
      
      // Create a subtle blinking effect for the tech specs
      const techSpecs = card.querySelectorAll('.tech-spec');
      techSpecs.forEach((spec, specIndex) => {
        gsap.to(spec, {
          opacity: 0.7,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: specIndex * 0.2
        });
      });
    });
  }, []);
  
  return (
    <section id="space-technology" ref={sectionRef} className="space-technology">
      <div className="tech-particles"></div>
      
      <div className="space-technology-container">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="cosmic-caption">Innovation beyond Earth</span>
            <h2>Space Technology</h2>
            <p className="section-description">
              Explore the cutting-edge technologies that make interstellar travel and habitation possible.
              These innovations represent the pinnacle of human engineering and scientific understanding.
            </p>
          </motion.div>
        </div>
        
        <div className="technologies-grid">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              className="technology-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className="tech-image" 
                style={{ backgroundImage: `url(${tech.image})` }}
              >
                <div className="tech-overlay"></div>
              </div>
              <div className="tech-content">
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
                <div className="tech-specs">
                  {tech.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="tech-spec">
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="technology-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-content">
            <h3>Want to learn more about our technology?</h3>
            <p>Download our comprehensive technical documentation or schedule a virtual tour of our research facilities.</p>
            <div className="cta-buttons">
              <a href="#" className="cosmic-button primary">Download Specs</a>
              <a href="#mission-control" className="cosmic-button secondary">Schedule Tour</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpaceTechnology;