import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const AstronautTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  const testimonials = [
    {
      id: 1,
      name: "Dr. Samantha Chen",
      role: "Chief Astrophysicist",
      quote: "The observatory deck offers an unparalleled view of the cosmos. I've spent decades studying distant galaxies, but nothing compares to witnessing them directly from our space station's viewport.",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2952&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Commander Alejandro Reyes",
      role: "Mission Specialist",
      quote: "After 15 years of space missions, I can confidently say that the technology and comfort aboard this station surpasses anything previously built. The attention to both safety and luxury is remarkable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 3,
      name: "Dr. Eleanor Kim",
      role: "Exobiologist",
      quote: "The advanced research facilities have enabled breakthroughs that would be impossible on Earth. My team has made more progress in six months here than in five years in our terrestrial labs.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop",
      rating: 4
    },
    {
      id: 4,
      name: "Marcus Johnson",
      role: "Space Tourist",
      quote: "As someone who dreamed of space since childhood, this experience exceeded every expectation. The staff's professionalism, the station's comfort, and the views... worth every penny of the journey.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
      rating: 5
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  useEffect(() => {
    const testimonialsContainer = testimonialsRef.current;
    
    gsap.to(testimonialsContainer.querySelector('.testimonial-stars'), {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Create a subtle floating effect for the astronaut images
    const astronautImages = testimonialsContainer.querySelectorAll('.astronaut-image');
    astronautImages.forEach((image, index) => {
      gsap.to(image, {
        y: 15,
        duration: 3 + (index * 0.2),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
    });
  }, []);
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };
  
  return (
    <section id="astronaut-testimonials" ref={sectionRef} className="astronaut-testimonials">
      <div className="astronaut-testimonials-container">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="cosmic-caption">Voices from space</span>
            <h2>Astronaut Testimonials</h2>
            <p className="section-description">
              Hear from the explorers, scientists, and visitors who have experienced the wonders of 
              our space station firsthand.
            </p>
          </motion.div>
        </div>
        
        <div className="testimonials-wrapper" ref={testimonialsRef}>
          <div className="testimonials-slider" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-item">
                <div className="testimonial-content">
                  <div className="testimonial-quote">
                    <svg className="quote-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 11H6C4.89543 11 4 10.1046 4 9V7C4 5.89543 4.89543 5 6 5H8C9.10457 5 10 5.89543 10 7V11ZM10 11V13.5C10 14.6046 9.10457 15.5 8 15.5H7.5M20 11H16C14.8954 11 14 10.1046 14 9V7C14 5.89543 14.8954 5 16 5H18C19.1046 5 20 5.89543 20 7V11ZM20 11V13.5C20 14.6046 19.1046 15.5 18 15.5H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p>{testimonial.quote}</p>
                    <div className="testimonial-stars">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="testimonial-author">
                    <div 
                      className="astronaut-image"
                      style={{ backgroundImage: `url(${testimonial.image})` }}
                    ></div>
                    <div className="author-details">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-controls">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="testimonial-cta">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p>Ready to join our constellation of pioneers and explorers?</p>
            <a href="#mission-control" className="cosmic-button primary">Apply for a Mission</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AstronautTestimonials;