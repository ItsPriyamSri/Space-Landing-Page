import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './styles/App.scss';

// Components
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import CursorParticles from './components/CursorParticles';
import Loader from './components/Loader'; // Import the dedicated Loader component
import ObservatoryDeck from './sections/ObservatoryDeck';
import CosmicPhenomena from './sections/CosmicPhenomena';
import ExpeditionTimeline from './sections/ExpeditionTimeline';
import AstronautTestimonials from './sections/AstronautTestimonials';
import SpaceTechnology from './sections/SpaceTechnology';
import MissionControl from './sections/MissionControl';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader isLoading={loading} />; // Use the dedicated Loader component
  }

  return (
    <div className="app">
      <StarField />
      <Navbar />
      <CursorParticles />
      <main className="content">
        <ObservatoryDeck />
        <CosmicPhenomena />
        <ExpeditionTimeline />
        <AstronautTestimonials />
        <SpaceTechnology />
        <MissionControl />
      </main>
      <Footer />
    </div>
  );
}

export default App;