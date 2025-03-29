import React, { useEffect } from 'react';

const CursorParticles = () => {
  useEffect(() => {
    const canvas = document.getElementById('cursor-particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Mouse position
    let mouse = {
      x: null,
      y: null,
      lastX: null,
      lastY: null
    };
    
    window.addEventListener('mousemove', (event) => {
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });
    
    // Star shapes and colors - brighter colors
    const starColors = [
      '#ff3333', // Brighter Red
      '#3333ff', // Brighter Blue
      '#ffdd33'  // Brighter Yellow
    ];
    
    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.7; // Smaller particles
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = starColors[Math.floor(Math.random() * starColors.length)];
        this.life = 20; 
        this.alpha = 1;
        this.rotation = Math.random() * Math.PI;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02; // Slower, more subtle twinkling
        this.twinkleDirection = 1;
        this.brightness = 0.8 + Math.random() * 0.2; // More consistent brightness
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        
        // Fade out gradually near end of life
        if (this.life < 5) {
          this.alpha = this.life / 5;
        }
        
        // More subtle twinkling effect
        this.brightness += this.twinkleDirection * this.twinkleSpeed;
        
        // Keep brightness within a narrower range for more consistency
        if (this.brightness >= 0.95) {
          this.brightness = 0.95;
          this.twinkleDirection = -1;
        } else if (this.brightness <= 0.75) {
          this.brightness = 0.75;
          this.twinkleDirection = 1;
        }
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw a star shape
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? this.size : this.size * 3;
          const angle = (i * Math.PI * 2) / 10;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        
        // Enhanced glow effect based on brightness
        ctx.shadowBlur = 8 * this.brightness; // Brighter glow
        ctx.shadowColor = this.color;
        
        // Add a second smaller, brighter center for a star-like effect
        const centerSize = this.size * 0.6;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, centerSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
      
      isAlive() {
        return this.life > 0;
      }
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles when mouse moves
      if (mouse.x !== null && mouse.lastX !== null) {
        // Reduce particle generation - only generate a new particle every other frame (approx)
        if (Math.random() > 0.45) {
          particles.push(new Particle(mouse.x, mouse.y));
        }
      }
      
      // Update and draw particles
      particles = particles.filter(particle => particle.isAlive());
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', () => {});
    };
  }, []);
  
  return (
    <canvas 
      id="cursor-particles" 
      className="cursor-particles"
    />
  );
};

export default CursorParticles;