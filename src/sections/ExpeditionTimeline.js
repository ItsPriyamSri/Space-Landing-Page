import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ExpeditionTimeline = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  
  const expeditions = [
    {
      id: 1,
      year: "2025",
      title: "First Commercial Orbital Hotel",
      description: "The first privately funded space hotel begins operations in low Earth orbit, accommodating up to 12 guests.",
      icon: "🏨",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2944&auto=format&fit=crop"
    },
    {
      id: 2,
      year: "2028",
      title: "Lunar Gateway Established",
      description: "The international lunar space station becomes fully operational, serving as a staging post for Moon missions.",
      icon: "🌓",
      image: "https://cdn.mos.cms.futurecdn.net/hRUSvTgmzD5poPJZj2CtJC-1200-80.jpg"
    },
    {
      id: 3,
      year: "2030",
      title: "First Martian Outpost",
      description: "Humanity establishes its first permanent settlement on Mars, beginning the era of interplanetary civilization.",
      icon: "🔴",
      image: "https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg"
    },
    {
      id: 4,
      year: "2035",
      title: "Asteroid Mining Operations",
      description: "Commercial mining of near-Earth asteroids begins, providing rare minerals and resources for space manufacturing.",
      icon: "☄️",
      image: "https://images.unsplash.com/photo-1614315517650-3771cf72d18a?q=80&w=2944&auto=format&fit=crop"
    },
    {
      id: 5,
      year: "2042",
      title: "Europa Submarine Mission",
      description: "A submersible probe explores the vast ocean beneath Europa's icy surface, searching for extraterrestrial life.",
      icon: "🌊",
      image: "https://www.astronomy.com/uploads/2021/09/ASYPS0718_02B.jpg"
    },
    {
      id: 6,
      year: "2050",
      title: "Interstellar Probe Launch",
      description: "Humanity launches its first dedicated interstellar spacecraft toward Proxima Centauri, our nearest stellar neighbor.",
      icon: "✨",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/14742e20-ac3e-4580-b025-163d5b8c6575/dfljmb4-709c19af-5135-4fe8-be42-498161003500.jpg/v1/fill/w_1920,h_873,q_75,strp/reaching_proxima_centauri_vii_by_euderion_dfljmb4-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODczIiwicGF0aCI6IlwvZlwvMTQ3NDJlMjAtYWMzZS00NTgwLWIwMjUtMTYzZDViOGM2NTc1XC9kZmxqbWI0LTcwOWMxOWFmLTUxMzUtNGZlOC1iZTQyLTQ5ODE2MTAwMzUwMC5qcGciLCJ3aWR0aCI6Ijw9MTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.YWVcgYYV_QtIEnznpXFndsqm2aau_bjGmxe7SqU2oxA"
    }
  ];
  
  useEffect(() => {
    const timeline = timelineRef.current;
    const timelineItems = timeline.querySelectorAll('.timeline-item');
    
    // Create the connection line animation
    gsap.fromTo(
      timeline.querySelector('.timeline-line-progress'),
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 75%',
          end: 'bottom 75%',
          scrub: true
        }
      }
    );
    
    // Animate each timeline item
    timelineItems.forEach((item, index) => {
      const direction = index % 2 === 0 ? -1 : 1;
      
      gsap.fromTo(
        item,
        { opacity: 0, x: 50 * direction },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
    });
  }, []);
  
  return (
    <section id="expedition-timeline" ref={sectionRef} className="expedition-timeline">
      <div className="expedition-container">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="cosmic-caption">Our journey to the stars</span>
            <h2>Expedition Timeline</h2>
            <p className="section-description">
              Track humanity's bold journey beyond Earth and into the cosmos. Our timeline showcases key milestones 
              in humanity's expansion throughout the solar system and beyond.
            </p>
          </motion.div>
        </div>
        
        <div className="timeline-wrapper" ref={timelineRef}>
          <div className="timeline-line">
            <div className="timeline-line-progress"></div>
          </div>
          
          {expeditions.map((expedition, index) => (
            <div 
              key={expedition.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-content">
                <div 
                  className="timeline-image"
                  style={{ backgroundImage: `url(${expedition.image})` }}
                >
                  <div className="timeline-year">
                    <span>{expedition.year}</span>
                  </div>
                </div>
                <div className="timeline-details">
                  <div className="timeline-icon">{expedition.icon}</div>
                  <h3>{expedition.title}</h3>
                  <p>{expedition.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <motion.div 
          className="timeline-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="data-point">
            <span className="data-label">Years of Exploration</span>
            <span className="data-value">25+</span>
          </div>
          <div className="data-point">
            <span className="data-label">Missions Completed</span>
            <span className="data-value">120+</span>
          </div>
          <div className="data-point">
            <span className="data-label">Distance Traveled</span>
            <span className="data-value">9.8B km</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpeditionTimeline;