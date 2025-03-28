import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const CosmicPhenomena = () => {
  const sectionRef = useRef(null);
  
  const phenomena = [
    {
      id: 1,
      title: "Neutron Stars",
      description: "Observe the remnants of massive stars after a supernova explosion, with incredible density and magnetic fields.",
      image: "https://aasnova.org/wp-content/uploads/2022/11/i-VBpZmnh-X3.jpg",
      color: "var(--color-energy-yellow)"
    },
    {
      id: 2,
      title: "Black Holes",
      description: "Witness regions of spacetime where gravity is so strong that nothing, not even light, can escape its gravitational pull.",
      image: "https://motionarray.imgix.net/motion-array-1746234-UjKCxTfJrP-high_0009.jpg?w=660&q=60&fit=max&auto=format",
      color: "var(--color-nebula-purple)"
    },
    {
      id: 3,
      title: "Nebulae",
      description: "Explore the breathtaking interstellar clouds of gas and dust where new stars are being formed.",
      image: "https://media.istockphoto.com/id/540717412/photo/blue-and-pink-nebula.jpg?s=612x612&w=0&k=20&c=LaTwe58EG3HNajqCIR-q_Pdlx9Z6w_IXeHI7eyZoPoQ=",
      color: "var(--color-nebula-pink)"
    },
    {
      id: 4,
      title: "Supernovae",
      description: "Experience the most powerful explosions in the universe as massive stars reach the end of their life cycle.",
      image: "https://assets.newatlas.com/dims4/default/57ad4ba/2147483647/strip/true/crop/3888x2592+0+140/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fcf%2F97%2Fbafc9a434ab48ec8bd847467ab3a%2Fsupernova.jpg",
      color: "var(--color-energy-cyan)"
    }
  ];
  
  useEffect(() => {
    // Add floating animation to cards
    const cards = document.querySelectorAll('.phenomena-card');
    cards.forEach((card, index) => {
      gsap.to(card, {
        y: 15,
        duration: 3 + (index * 0.2),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
    });
  }, []);
  
  return (
    <section id="cosmic-phenomena" ref={sectionRef} className="cosmic-phenomena">
      <div className="cosmic-phenomena-container">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="cosmic-caption">Discover the universe</span>
            <h2>Cosmic Phenomena</h2>
            <p className="section-description">
              Experience the most breathtaking phenomena in our universe through our advanced observation technology.
              Each cosmic event offers a unique perspective on the wonders of space.
            </p>
          </motion.div>
        </div>
        
        <div className="phenomena-grid">
          {phenomena.map((item, index) => (
            <motion.div
              key={item.id}
              className="phenomena-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="card-inner">
                <div 
                  className="card-image" 
                  style={{ 
                    backgroundImage: `url(${item.image})`,
                    boxShadow: `0 0 30px ${item.color}50`
                  }}
                >
                  <div className="card-overlay" style={{ background: `linear-gradient(to top, ${item.color}90, transparent)` }}></div>
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="#" className="card-link" style={{ color: item.color }}>
                    Explore
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="phenomena-cta">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>Ready to witness these cosmic wonders in person?</p>
            <a href="#mission-control" className="cosmic-button primary">Book Your Experience</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CosmicPhenomena;