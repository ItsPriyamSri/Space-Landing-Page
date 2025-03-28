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
  // Create a few random meteors at intervals
  useEffect(() => {
    const createMeteor = () => {
      const meteor = document.createElement('div');
      meteor.classList.add('meteor');
      
      // Random position and angle
      const top = Math.random() * 40;
      const left = Math.random() * 100;
      const angle = Math.random() * 45;
      
      meteor.style.top = `${top}%`;
      meteor.style.left = `${left}%`;
      meteor.style.transform = `rotate(${angle}deg)`;
      
      const starfield = document.querySelector('.starfield');
      if (starfield) {
        starfield.appendChild(meteor);
        
        // Remove meteor after animation completes
        setTimeout(() => {
          if (meteor.parentNode === starfield) {
            starfield.removeChild(meteor);
          }
        }, 10000);
      }
    };
    
    // Create meteors at random intervals
    const meteorInterval = setInterval(() => {
      createMeteor();
    }, 8000);
    
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