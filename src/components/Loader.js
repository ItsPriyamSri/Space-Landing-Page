import React, { useState, useEffect } from 'react';

const Loader = ({ isLoading }) => {
  const [loadingText, setLoadingText] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const spacePuns = [
    "Calculating light-years to destination...",
    "Negotiating with alien life forms...",
    "Aligning with distant galaxies...",
    "Charging flux capacitors...",
    "Converting Earth time to cosmic time...",
    "Teaching wormholes to behave...",
    "Convincing black holes to let us pass...",
    "Adjusting gravity propulsion systems...",
    "Tuning quantum harmonizers...",
    "Folding space-time continuum...",
    "Initiating stellar navigation protocols...",
    "Calculating hyperdrive jump coordinates...",
    "Scanning for extraterrestrial intelligence...",
    "Calibrating anti-matter containment fields...",
    "Activating asteroid deflection shields..."
  ];
  
  useEffect(() => {
    if (isLoading) {
      // Set initial loading text
      setLoadingText(spacePuns[Math.floor(Math.random() * spacePuns.length)]);
      
      // Change loading text every 3 seconds
      const textInterval = setInterval(() => {
        setLoadingText(spacePuns[Math.floor(Math.random() * spacePuns.length)]);
      }, 3000);
      
      // Animate progress bar
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 2;
        setLoadingProgress(Math.min(progress, 100));
        
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 60);
      
      return () => {
        clearInterval(textInterval);
        clearInterval(progressInterval);
      };
    }
  }, [isLoading]);
  
  if (!isLoading) return null;
  
  return (
    <div className="cosmic-loader">
      {/* Floating planets in background */}
      <div className="cosmic-background">
        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>
        <div className="nebula"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star shooting-star-2"></div>
      </div>
      
      <div className="cosmic-loader-inner">
        <div className="cosmic-loader-stars">
          <div className="star-1"></div>
          <div className="star-2"></div>
          <div className="star-3"></div>
          
          {/* Add animated orbital rings */}
          <div className="orbital-ring ring-1"></div>
          <div className="orbital-ring ring-2"></div>
        </div>
        
        <div className="cosmic-loader-text">{loadingText}</div>
        
        {/* Add progress bar */}
        <div className="loader-progress-container">
          <div 
            className="loader-progress-bar" 
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        
        {/* Add flickering console text */}
        <div className="console-text">
          <span className="system-status">SYSTEM STATUS: INITIALIZING</span>
          <span className="blink-cursor">_</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;