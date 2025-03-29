import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import BookingPopup from '../components/BookingPopup';

const MissionControl = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const terminalRef = useRef(null);
  // Changed default tab to 'book' to make it the center of attention
  const [activeTab, setActiveTab] = useState('book');
  const [formStatus, setFormStatus] = useState('idle');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // New state for terminal lines display
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const destinations = [
    { 
      id: 'orbital', 
      name: 'Orbital Station', 
      price: '$18,500', 
      duration: '3 Days',
      image: 'https://artfiles.alphacoders.com/126/thumb-1920-126096.jpg',
      features: ['Zero-G training', 'Earth observation deck', 'Space walk experience']
    },
    { 
      id: 'lunar', 
      name: 'Lunar Gateway', 
      price: '$45,000', 
      duration: '7 Days',
      image: 'https://cdnb.artstation.com/p/assets/images/images/048/632/847/large/jia-sing-il1905-2-hengjiasing-1905037-scifibuildingfinalv2.jpg?1650534016',
      features: ['Lunar rover expeditions', 'Geology lab access', 'Low gravity recreation']
    },
    { 
      id: 'mars', 
      name: 'Mars Outpost', 
      price: '$125,000', 
      duration: '180 Days',
      image: 'https://img.goodfon.com/original/2560x1090/8/77/spaceship-mars-astronauts-space-suit-helmet-base-camp-space.jpg',
      features: ['Martian habitat experience', 'Scientific missions', 'Terraforming projects']
    }
  ];
  
  // Terminal text lines - more dynamic content
  const terminalLines = [
    "Initializing communication system...",
    "Establishing secure connection...",
    "Mission control online. Ready to assist.",
    "Running system diagnostics...",
    "All systems nominal.",
    "Cosmic weather: Solar flares at acceptable levels.",
    "Next launch window: T-minus 24 hours.",
    "Processing journey requests..."
  ];

  // Random messages for periodic updates
  const randomMessages = [
    "Updating navigation data...",
    "Tracking satellite movements...",
    "Monitoring cosmic radiation levels...",
    "Communication channel secure...",
    "Quantum entanglement status: Stable",
    "Life support systems: Optimal"
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
    
    // Start the initial typing sequence
    startTypingSequence();
    
    // Cleanup function
    return () => {
      // Clear any active timers
      if (window.terminalTimers) {
        window.terminalTimers.forEach(timer => clearTimeout(timer));
      }
    };
  }, []);
  
  // New function to handle terminal typing in a React way
  const startTypingSequence = () => {
    setIsTyping(true);
    setDisplayedLines([]);
    
    // Store all timers so we can clear them on unmount
    window.terminalTimers = [];
    
    // Type each line with a delay
    let cumulativeDelay = 1000; // Initial delay
    
    terminalLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        // Add this line to the displayed lines
        setDisplayedLines(prev => [...prev, {
          id: `line-${index}`,
          text: line,
          timestamp: ''
        }]);
        
        // Auto-scroll after adding a line
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, cumulativeDelay);
      
      window.terminalTimers.push(timer);
      cumulativeDelay += 1500; // Increase delay for next line
    });
    
    // Start adding random messages after all initial lines are displayed
    const randomMessageTimer = setTimeout(() => {
      startRandomMessages();
      setIsTyping(false);
    }, cumulativeDelay + 2000);
    
    window.terminalTimers.push(randomMessageTimer);
  };
  
  // Function to add periodic random messages
  const startRandomMessages = () => {
    const addMessage = () => {
      // Get a random message
      const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      // Add timestamp
      const now = new Date();
      const timestamp = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
      
      // Add this message to the displayed lines
      setDisplayedLines(prev => [...prev, {
        id: `random-${Date.now()}`,
        text: message,
        timestamp: timestamp
      }]);
      
      // Auto-scroll after adding a line
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
      
      // Schedule next message
      const nextTimer = setTimeout(addMessage, Math.random() * 10000 + 15000);
      window.terminalTimers.push(nextTimer);
    };
    
    // Start the cycle
    const initialTimer = setTimeout(addMessage, 3000);
    window.terminalTimers.push(initialTimer);
  };
  
  // Rest of the component unchanged
  const handleContactSubmit = (e) => {
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
  
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Get the name from the form
    const formData = new FormData(e.target);
    const name = formData.get('bookingName');
    
    setUserName(name);
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Show booking popup
      setIsPopupOpen(true);
      
      // Reset form after success
      e.target.reset();
      setTimeout(() => {
        setFormStatus('idle');
      }, 1000);
    }, 1500);
  };
  
  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
  };
  
  // Close popup handler
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedDestination(null);
  };
  
  // Funny FAQs data - reduced to 4 questions
  const funnyFaqs = [
    {
      question: "Do I need a passport for space travel?",
      answer: "Technically no, but we do stamp a 'Universal Citizen' card for you. It's useless everywhere in the galaxy, but the holographic design is pretty neat!"
    },
    {
      question: "Can I bring my pet?",
      answer: "Sure, if your pet enjoys zero gravity and doesn't mind being the first of its species to visit another planet. Just don't blame us when your cat starts plotting with the aliens."
    },
    {
      question: "Is there Wi-Fi in space?",
      answer: "Yes, but it's literally the slowest in the universe. Sending a selfie from Mars takes approximately 12 minutes, which means your Instagram story will be very, very delayed."
    },
    {
      question: "What happens if I need to use the bathroom during a space walk?",
      answer: "Your spacesuit is equipped with a waste management system, which is a fancy way of saying 'adult space diaper.' It's not glamorous, but it beats the alternative!"
    }
  ];
  
  // Add funny terminal messages that appear when clicking on the terminal
  const [terminalJargon, setTerminalJargon] = useState([
    "ERROR 42: Hyperspace calculations on hold. Coffee maker malfunctioning.",
    "WARNING: Quantum flux capacitor detecting unusual meme activity.",
    "NOTICE: Alien language detected. Google Translate suggests it means 'Are we there yet?'",
    "ALERT: Time-space continuum folded incorrectly. Please restart universe.",
    "UPDATE: Cat videos successfully transmitted to Alpha Centauri. Awaiting reviews.",
    "SYSTEM: Recalibrating cosmic background radiation filters. Please hold.",
    "WARNING: Dancing black hole detected. Suggest playing appropriate music.",
    "CRITICAL: Space-time fabric experiencing wrinkles. Applying cosmic iron.",
    "INFO: Alien cook book translated. 'How to Serve Humans' appears to be a cookbook, not a manual.",
    "SCAN: Detected life form playing 'Space Invaders' in cargo bay 7.",
    "STATUS: Artificial gravity inverted in recreation deck. Staff now walking on ceiling.",
    "PROTOCOL: Initiating small talk with passing UFO. Please wait.",
    "UPDATE: Ship's AI has started writing space poetry. Quality questionable.",
    "ALERT: Cosmic radiation causing navigation system to speak in riddles.",
    "ERROR: Astronaut ice cream machine dispensing actual ice.",
    "NOTIFICATION: Space elevator stuck between floors 42 and Infinity.",
    "ALERT: Alien tourists asking for Earth's manager. Suggest hiding immediately.",
    "WARNING: Space-time GPS recalculating route. Estimated arrival: Yesterday.",
    "CRITICAL: Recycled air system now smells suspiciously like freshly baked cookies.",
    "INFO: Ship's computer playing tic-tac-toe with passing satellite. Currently losing.",
    "ANOMALY: Cargo bay gravity fluctuating. Bananas floating in perfect formation.",
    "SCAN: Mysterious signal detected. Appears to be '90s dial-up internet noise.",
    "REPORT: Quantum entanglement experiment successful. Engineer now dating themselves in parallel universe.",
    "ALERT: Spaceship's self-destruct sequence initiated by cockroach. Suggest urgent conversation.",
    "PROTOCOL: Rebooting antigravity device. Please refrain from floating upside down.",
    "SCAN: Found astronaut's missing sock behind black hole. Recovery mission pending approval.",
    "ALERT: Space jellyfish spotted near the ship. They're surprisingly friendly.",
    "UPDATE: AI assistant practicing stand-up comedy. Audience feedback: vacuum of silence.",
    "NOTICE: Time dilation detected. Monday morning now lasts 3x longer than normal.",
    "WARNING: Cafeteria synthesizer creating food that tastes too good to be replicated matter.",
    "ANOMALY: Quantum computer simultaneously calculating and not calculating pi. Schrödinger approves.",
    "INFO: Alien delegation requesting Earth's recipe for pizza. Diplomatic relations improving.",
    "ALERT: Someone taught the maintenance robots to do the robot dance. Productivity down 75%.",
    "NOTIFICATION: Cosmic rays causing hair to glow in the dark. New fashion trend emerging.",
    "WARNING: Detected unauthorized use of escape pod for 'quick trip to the moon and back'.",
    "REPORT: Space-time continuum experiencing traffic jam. Estimated delay: relative.",
    "PROTOCOL: Initializing anti-alien-invasion protocols. Step 1: Pretend Earth isn't interesting.",
    "CRITICAL: Bathroom in zero gravity experiencing technical difficulties. Creative solutions advised."
  ]);
  
  const [showJargon, setShowJargon] = useState(false);
  const [currentJargon, setCurrentJargon] = useState("");
  const [jargonColor, setJargonColor] = useState("var(--color-nebula-teal)");
  
  // Function to handle terminal clicks and show random jargon
  const handleTerminalClick = () => {
    if (showJargon) return; // Prevent multiple clicks while message is showing
    
    const randomIndex = Math.floor(Math.random() * terminalJargon.length);
    setCurrentJargon(terminalJargon[randomIndex]);
    
    // Set a random color for the message
    const colors = [
      'var(--color-nebula-teal)', 
      'var(--color-nebula-purple)', 
      'var(--color-energy-yellow)', 
      'var(--color-nebula-pink)'
    ];
    setJargonColor(colors[Math.floor(Math.random() * colors.length)]);
    
    // Show the message with a typing effect
    setShowJargon(true);
    
    // Add the message to terminal history with timestamp
    const now = new Date();
    const timestamp = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    
    // Important: Only update displayed lines, don't modify component structure
    setDisplayedLines(prev => [...prev.slice(-15), { // Keep only last 15 lines
      id: `jargon-${Date.now()}`,
      text: terminalJargon[randomIndex],
      timestamp: timestamp
    }]);
    
    // Auto-scroll after adding a line
    if (terminalRef.current) {
      // Use setTimeout to ensure the DOM has updated before scrolling
      setTimeout(() => {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, 10);
    }
    
    // Hide the jargon after 4 seconds
    setTimeout(() => {
      setShowJargon(false);
    }, 4000);
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
              Ready to embark on your cosmic adventure? Book your journey to the stars right here.
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
            <div className="terminal-container" onClick={handleTerminalClick}>
              <div className="terminal-header">
                <span>cosmic_gateway@station:~$</span>
              </div>
              <div className="terminal-content" ref={terminalRef}>
                {displayedLines.map(line => (
                  <div key={line.id} className="terminal-line">
                    {line.timestamp && <span className="timestamp">{line.timestamp}</span>}
                    {line.text}
                  </div>
                ))}
                {showJargon && (
                  <div className="terminal-jargon" style={{ color: jargonColor }}>
                    <span className="jargon-message">{currentJargon}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="control-panel">
            <div className="tab-navigation">
              <button 
                className={`tab-button ${activeTab === 'book' ? 'active' : ''}`}
                onClick={() => setActiveTab('book')}
              >
                Book Journey
              </button>
              <button 
                className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact Us
              </button>
            </div>
            
            <div className="tab-content">
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
                        <div 
                          key={destination.id} 
                          className={`destination-card ${selectedDestination === destination.id ? 'selected' : ''}`}
                          onClick={() => handleDestinationSelect(destination.id)}
                        >
                          <div className="destination-image" style={{backgroundImage: `url(${destination.image})`}}>
                            <div className="destination-overlay"></div>
                          </div>
                          <div className="destination-details">
                            <h4>{destination.name}</h4>
                            <div className="destination-meta">
                              <span className="price">{destination.price}</span>
                              <span className="duration">{destination.duration}</span>
                            </div>
                            <div className="destination-features">
                              {destination.features.map((feature, idx) => (
                                <span key={idx} className="feature-tag">{feature}</span>
                              ))}
                            </div>
                            <motion.button 
                              className={`cosmic-button ${selectedDestination === destination.id ? 'primary' : 'secondary'}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {selectedDestination === destination.id ? 'Selected' : 'Select'}
                            </motion.button>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                  

                  {selectedDestination && (
                    <motion.div 
                      className="booking-form-container"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3>Almost Ready for Launch!</h3>
                      <form className="booking-form" onSubmit={handleBookingSubmit}>
                        <div className="form-group">
                          <label htmlFor="bookingName">What shall we call you, space traveler?</label>
                          <input type="text" id="bookingName" name="bookingName" required placeholder="Your cosmic name" />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="bookingEmail">Where can we send your boarding pass?</label>
                          <input type="email" id="bookingEmail" name="bookingEmail" required placeholder="Your Earth email" />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="bookingDeparture">When would you like to depart?</label>
                          <input type="date" id="bookingDeparture" name="bookingDeparture" required min={new Date().toISOString().split('T')[0]} />
                        </div>
                        
                        <button 
                          type="submit" 
                          className="cosmic-button primary"
                          disabled={formStatus === 'loading'}
                        >
                          {formStatus === 'idle' && 'Confirm Booking'}
                          {formStatus === 'loading' && 'Preparing Spacecraft...'}
                          {formStatus === 'success' && 'Ready for Boarding!'}
                        </button>
                      </form>
                    </motion.div>
                  )}
                  
                  {!selectedDestination && (
                    <div className="booking-cta">
                      <p>Select a cosmic destination to begin your journey to the stars!</p>
                    </div>
                  )}
                </motion.div>
              )}
              
              {activeTab === 'contact' && (
                <motion.div 
                  className="contact-form-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <form ref={formRef} className="contact-form" onSubmit={handleContactSubmit}>
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
            </div>
          </div>
        </div>
        
        {/* Add Funny FAQs section */}
        <motion.div 
          className="cosmic-faqs"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="faq-header">
            <h3>Frequently Asked Cosmic Questions</h3>
            <p>Everything you wanted to know but were too afraid to ask about space travel</p>
          </div>
          
          <div className="faq-list">
            {funnyFaqs.map((faq, index) => (
              <motion.div 
                className="faq-item"
                key={`faq-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="faq-question">
                  <span className="question-icon">🚀</span>
                  <h4>{faq.question}</h4>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="faq-disclaimer">
            <p>* Answers approved by our legal team of space lawyers who definitely exist and aren't just astronauts in suits.</p>
          </div>
        </motion.div>
        
        <div className="contact-info">
          <div className="contact-info-item">
            <div className="contact-icon animated-icon">📱</div>
            <div className="contact-details">
              <h4>Communication</h4>
              <p className="contact-value">+1 (888) COSMOS-00</p>
              <p className="contact-value">contact@cosmicgateway.space</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-icon animated-icon">📍</div>
            <div className="contact-details">
              <h4>Earth Base</h4>
              <p className="contact-value">Cosmic Tower, 42 Galaxy Avenue</p>
              <p className="contact-value">Cape Canaveral, FL 32920</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-icon animated-icon">🕒</div>
            <div className="contact-details">
              <h4>Mission Hours</h4>
              <p className="contact-value">Monday - Friday: 8AM - 8PM EST</p>
              <p className="contact-value">Weekend: 10AM - 6PM EST</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking confirmation popup */}
      <BookingPopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        userName={userName} 
      />
    </section>
  );
};

export default MissionControl;