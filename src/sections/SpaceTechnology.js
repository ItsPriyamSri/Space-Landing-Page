import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const SpaceTechnology = () => {
  const sectionRef = useRef(null);
  const [showClassified, setShowClassified] = useState({ visible: false, position: { x: 0, y: 0 }, name: "" });
  
  const handleCardClick = (e, name) => {
    // Get position for the popup
    const rect = e.currentTarget.getBoundingClientRect();
    setShowClassified({
      visible: true,
      position: { 
        x: rect.left + rect.width / 2, 
        y: rect.top
      },
      name: name
    });
    
    // Auto hide after 2 seconds
    setTimeout(() => {
      setShowClassified(prev => ({ ...prev, visible: false }));
    }, 2000);
  };
  
  // Function to handle downloading specs
  const handleDownloadSpecs = () => {
    // Create easter egg content
    const easterEggContent = `
========================================
COSMIC GATEWAY - CLASSIFIED SPECIFICATIONS
========================================

TO: Authorized Cosmic Gateway Personnel
CLASSIFICATION: COSMIC-TOP-SECRET
DATE: ${new Date().toLocaleDateString()}

The following information is provided on a need-to-know basis only.

TECHNOLOGY SPECIFICATIONS:
--------------------------

1. QUANTUM NAVIGATION SYSTEM
   - Actually uses tiny space hamsters running in quantum wheels
   - Accuracy: Can target a photon in another galaxy (when the hamsters aren't napping)
   - Fun fact: Named after "Mr. Whiskers," the first hamster to achieve quantum entanglement

2. GRAVITATIONAL SHIELD
   - Powered by the collective dreams of sleeping astronauts
   - Each shield is calibrated using the exact weight of 42 space tacos
   - Warning: May cause spontaneous floating of loose items and occasional existential crises

3. ANTIMATTER PROPULSION
   - Contains exactly 0.000001g of antimatter (or so we tell the investors)
   - The "matter-antimatter annihilation chamber" is actually a glorified microwave
   - Efficiency: 99.6% (on paper); 47% (in reality); 12% (after the warranty expires)

4. NEURAL INTERFACE
   - Side effects may include: spontaneous telepathy with spacecraft, dreams about being a spaceship
   - Not compatible with tinfoil hats (for obvious reasons)
   - Contrary to rumors, it CANNOT read your inappropriate thoughts about alien species

5. RADIATION ABSORPTION MATRIX
   - Made from the same material as cosmic background radiation, just... reversed
   - Doubles as an excellent coffee warmer
   - Powered by harnessing the energy of dad jokes told by astronauts

6. ATMOSPHERIC SYNTHESIZER
   - Produces exactly 7 unique smells, including "New Spaceship," "Cosmic Rainforest," and "Dave's Gym Socks"
   - Contains actual cloud samples from Venus (which smell surprisingly like burnt toast)
   - Maintenance requires singing to it softly once per month

HIDDEN FEATURES:
---------------
- The "emergency evacuation" button also makes a perfect espresso
- There's a secret karaoke room behind maintenance hatch C-137
- All ships have a built-in black box that only records embarrassing conversations

EMERGENCY PROTOCOLS:
-------------------
1. In case of alien encounter: Smile, wave, offer snacks
2. If time-space continuum ruptures: Have you tried turning it off and on again?
3. Encountering your past/future self: No autographs, no spoilers

Remember, space travel is perfectly safe* 
(* Definition of "safe" may vary depending on current proximity to black holes, supernovas, or cafeteria on taco Tuesday)

THIS DOCUMENT WILL SELF-DESTRUCT AFTER READING
(just kidding, it's just a text file)

PS: If you found this easter egg, congratulations! You're officially a cosmic explorer. We've hidden 5 more throughout the website. Happy hunting!
`;
    
    // Create a blob with the content
    const blob = new Blob([easterEggContent], { type: 'text/plain' });
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'COSMIC-GATEWAY-CLASSIFIED-SPECS.txt';
    
    // Append to the body, click to download, and remove
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  };
  
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
              onClick={(e) => handleCardClick(e, tech.name)}
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
              <a href="#" className="cosmic-button primary" onClick={(e) => {
                e.preventDefault(); 
                handleDownloadSpecs();
              }}>Download Specs</a>
              <a href="#mission-control" className="cosmic-button secondary">Schedule Tour</a>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {showClassified.visible && (
          <motion.div
            className="classified-popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ 
              position: 'fixed',
              left: `${showClassified.position.x}px`, 
              top: `${showClassified.position.y}px` 
            }}
          >
            <span>Sorry, that's classified.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SpaceTechnology;