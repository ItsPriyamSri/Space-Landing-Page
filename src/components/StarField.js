import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Simple floating particles effect for 3D stars
const SpaceParticles = () => {
  const particlesRef = useRef();
  const { size, camera } = useThree();
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.075;
    }
  });
  
  useEffect(() => {
    if (camera) {
      camera.position.z = 5;
    }
  }, [camera]);
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={2000}
          array={new Float32Array(6000).map(() => (Math.random() - 0.5) * 25)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#ffffff" 
        sizeAttenuation 
        transparent 
        depthWrite={false}
      />
    </points>
  );
};

const StarField = () => {
  const [ufoMessage, setUfoMessage] = useState({ visible: false, x: 0, y: 0 });
  
  // Create a simple meteor that goes from top-left to bottom-right
  useEffect(() => {
    // Function to create a single meteor
    const createMeteor = () => {
      // Create the meteor element
      const meteor = document.createElement('div');
      meteor.classList.add('meteor');
      
      // Set position at top-left area (with slight randomness)
      const startX = 5 + Math.random() * 10; // 5-15% from left
      const startY = 5 + Math.random() * 10; // 5-15% from top
      
      meteor.style.top = `${startY}%`;
      meteor.style.left = `${startX}%`;
      
      // Direction is fixed: from top-left to bottom-right
      const angle = 45; // 45 degrees = diagonal from top-left to bottom-right
      
      // Set the transform to make the tail point in the right direction
      // 45 degrees for a top-left to bottom-right movement with head first
      meteor.style.transform = `rotate(45deg)`;
      
      // Add meteor to the starfield
      const starfield = document.querySelector('.starfield');
      if (starfield) {
        starfield.appendChild(meteor);
        
        // Remove meteor after animation completes
        setTimeout(() => {
          if (meteor.parentNode === starfield) {
            starfield.removeChild(meteor);
          }
        }, 3000); // Animation duration is 2.5s, add a little buffer
      }
    };
    
    // Create meteors at intervals of 10-15 seconds
    const meteorInterval = setInterval(() => {
      createMeteor();
    }, 10000 + Math.random() * 5000);
    
    // Create UFOs that fly across the screen
    const createUFO = () => {
      // Create the UFO element
      const ufo = document.createElement('div');
      ufo.classList.add('ufo');
      
      // Random starting position
      let startX = Math.random() * 110 - 5; // -5% to 105%
      let startY = Math.random() * 110 - 5; // -5% to 105%
      
      // Make sure the UFO starts from outside the viewport
      if (startX > 0 && startX < 100) {
        // If X is within the viewport, place Y outside
        startY = Math.random() < 0.5 ? -5 : 105;
      } else if (startY > 0 && startY < 100) {
        // If Y is within the viewport, place X outside
        startX = Math.random() < 0.5 ? -5 : 105;
      }
      
      // Random angle for movement (0-360 degrees)
      const angle = Math.random() * 360;
      const radians = angle * (Math.PI / 180);
      
      // Calculate end position based on angle and distance
      // The distance should be enough to cross the screen
      const distance = Math.max(window.innerWidth, window.innerHeight) * 1.5;
      const endX = startX + Math.cos(radians) * distance;
      const endY = startY + Math.sin(radians) * distance;
      
      // Set UFO rotation to match its movement direction
      ufo.style.transform = `rotate(${angle}deg)`;
      
      // Set initial position
      ufo.style.top = `${startY}%`;
      ufo.style.left = `${startX}%`;
      
      // Add UFO to the starfield
      const starfield = document.querySelector('.starfield');
      if (starfield) {
        starfield.appendChild(ufo);
        
        // Add hover event for the Easter egg message
        ufo.addEventListener('mouseenter', (e) => {
          setUfoMessage({
            visible: true,
            x: e.clientX,
            y: e.clientY
          });
          
          // Hide message after 2 seconds
          setTimeout(() => {
            setUfoMessage({ visible: false, x: 0, y: 0 });
          }, 2000);
        });
        
        // Animate the UFO across the screen
        const duration = 5000 + Math.random() * 3000; // 5-8 seconds
        
        // Use requestAnimationFrame for smoother animation
        const startTime = performance.now();
        
        const animateUFO = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const currentX = startX + (endX - startX) * progress;
          const currentY = startY + (endY - startY) * progress;
          
          ufo.style.top = `${currentY}%`;
          ufo.style.left = `${currentX}%`;
          
          if (progress < 1) {
            requestAnimationFrame(animateUFO);
          } else {
            // Remove UFO after animation completes
            if (ufo.parentNode === starfield) {
              starfield.removeChild(ufo);
            }
          }
        };
        
        requestAnimationFrame(animateUFO);
      }
    };
    
    // Create UFOs at random intervals (much less frequently now)
    const ufoInterval = setInterval(() => {
      createUFO();
    }, 20000 + Math.random() * 40000); // Every 20-60 seconds instead of 8-23 seconds
    
    // Create one UFO initially with a longer delay
    setTimeout(createUFO, 15000); // 15 seconds delay instead of 5 seconds
    
    // Create one initially with a short delay
    setTimeout(createMeteor, 3000);
    
    return () => {
      clearInterval(meteorInterval);
      clearInterval(ufoInterval);
    };
  }, []);
  
  return (
    <div className="starfield">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['#050814']} />
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        <SpaceParticles />
        <ambientLight intensity={0.1} />
      </Canvas>
      <div className="nebula-overlay"></div>
      {ufoMessage.visible && (
        <div 
          className="ufo-message" 
          style={{ 
            left: `${ufoMessage.x}px`, 
            top: `${ufoMessage.y - 30}px` 
          }}
        >
          Nothing to see here, Earthling!
        </div>
      )}
    </div>
  );
};

export default StarField;