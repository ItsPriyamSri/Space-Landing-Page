import React, { useEffect, useRef } from 'react';
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
    
    // Create one initially with a short delay
    setTimeout(createMeteor, 3000);
    
    return () => clearInterval(meteorInterval);
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
    </div>
  );
};

export default StarField;