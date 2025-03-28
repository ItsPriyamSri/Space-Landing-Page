import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const MissionControl = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [activeTab, setActiveTab] = useState('contact');
  const [formStatus, setFormStatus] = useState('idle');
  
  const destinations = [
    { id: 'orbital', name: 'Orbital Station', price: '$18,500', duration: '3 Days' },
    { id: 'lunar', name: 'Lunar Gateway', price: '$45,000', duration: '7 Days' },
    { id: 'mars', name: 'Mars Outpost', price: '$125,000', duration: '180 Days' }
  ];
  
  useEffect(() => {
    const section = sectionRef.current;
    
    // Create a pulsing effect for the console lights
    const consoleLights = section.querySelectorAll('.console-light');
    consoleLights.forEach((light, index) => {
      gsap.to(light, {
        opacity: 0.5,
        duration: 1.5 + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });
    
    // Create a typing effect for the terminal text
    const terminalText = section.querySelector('.terminal-text');
    if (terminalText) {
      const text = terminalText.textContent;
      terminalText.textContent = '';
      
      const typeText = (index = 0) => {
        if (index < text.length) {
          terminalText.textContent += text.charAt(index);
          setTimeout(() => typeText(index + 1), 30);
        }
      };
      
      setTimeout(typeText, 1000);
    }
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      formRef.current.reset();
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  
  return (
    <section id="mission-control" ref={sectionRef} className="mission-control">
      <div className="mission-control-container">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="cosmic-caption">Your journey begins here</span>
            <h2>Mission Control</h2>
            <p className="section-description">
              Ready to embark on your cosmic adventure? Contact our mission specialists or 
              book your journey to the stars right here.
            </p>
          </motion.div>
        </div>
        
        <div className="mission-control-panel">
          <div className="console-decoration">
            <div className="console-lights">
              <div className="console-light" style={{ backgroundColor: 'var(--color-nebula-teal)' }}></div>
              <div className="console-light" style={{ backgroundColor: 'var(--color-nebula-purple)' }}></div>
              <div className="console-light" style={{ backgroundColor: 'var(--color-energy-yellow)' }}></div>
              <div className="console-light" style={{ backgroundColor: 'var(--color-nebula-pink)' }}></div>
            </div>
            <div className="terminal">
              <div className="terminal-header">
                <span>cosmic_gateway@station:~$</span>
              </div>
              <div className="terminal-content">
                <p className="terminal-text">
                  Initializing communication system... 
                  Establishing secure connection...
                  Mission control online. Ready to assist.
                </p>
              </div>
            </div>
          </div>
          
          <div className="control-panel">
            <div className="tab-navigation">
              <button 
                className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact Us
              </button>
              <button 
                className={`tab-button ${activeTab === 'book' ? 'active' : ''}`}
                onClick={() => setActiveTab('book')}
              >
                Book Journey
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'contact' && (
                <motion.div 
                  className="contact-form-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" required />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" required />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select id="subject" name="subject" required>
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="booking">Booking Information</option>
                        <option value="technical">Technical Support</option>
                        <option value="employment">Employment Opportunities</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="cosmic-button primary"
                      disabled={formStatus === 'loading'}
                    >
                      {formStatus === 'idle' && 'Send Message'}
                      {formStatus === 'loading' && 'Sending...'}
                      {formStatus === 'success' && 'Message Sent!'}
                    </button>
                  </form>
                </motion.div>
              )}
              
              {activeTab === 'book' && (
                <motion.div 
                  className="booking-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="destination-selection">
                    <h3>Select Your Destination</h3>
                    <div className="destinations">
                      {destinations.map(destination => (
                        <div key={destination.id} className="destination-card">
                          <div className="destination-details">
                            <h4>{destination.name}</h4>
                            <div className="destination-meta">
                              <span className="price">{destination.price}</span>
                              <span className="duration">{destination.duration}</span>
                            </div>
                            <button className="cosmic-button secondary">Select</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="booking-cta">
                    <p>For detailed itineraries and custom journeys, please contact our expedition specialists directly.</p>
                    <button 
                      className="cosmic-button primary"
                      onClick={() => setActiveTab('contact')}
                    >
                      Contact Specialist
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        <div className="contact-info">
          <div className="contact-info-item">
            <div className="contact-icon">📱</div>
            <div className="contact-details">
              <h4>Communication</h4>
              <p>+1 (888) COSMOS-00</p>
              <p>contact@cosmicgateway.space</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-icon">📍</div>
            <div className="contact-details">
              <h4>Earth Base</h4>
              <p>Cosmic Tower, 42 Galaxy Avenue</p>
              <p>Cape Canaveral, FL 32920</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-icon">🕒</div>
            <div className="contact-details">
              <h4>Mission Hours</h4>
              <p>Monday - Friday: 8AM - 8PM EST</p>
              <p>Weekend: 10AM - 6PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionControl;