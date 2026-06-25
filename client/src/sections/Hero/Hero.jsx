import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import NeuralSphere from '../../components/3d/NeuralSphere';
import { useData } from '../../context/DataContext';

const Hero = () => {
  const { portfolioData } = useData();

  // Fallback data if CMS hasn't been configured yet
  const data = portfolioData?.hero || {
    name: "Yash Kalpesh Mhatre",
    role: "AI & Machine Learning Developer",
    description: "Architecting elite intelligence. Bridging the gap between mathematical theory and Fortune 500 production systems.",
    cta: "Explore Intelligence"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } }
  };

  return (
    <section style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* 3D Background Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <NeuralSphere />
        </Canvas>
      </div>

      {/* Content Overlay Layer */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '0 5%',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        pointerEvents: 'none' // Lets mouse interact with 3D canvas behind text
      }}>
        
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          style={{ maxWidth: '800px' }}
        >
          <motion.p variants={itemVariants} style={{ 
            fontFamily: 'var(--font-mono)', 
            color: 'var(--accent-gold)', 
            fontSize: '0.9rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            {data.role}
          </motion.p>
          
          <motion.h1 variants={itemVariants} style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            fontWeight: 400
          }}>
            {data.name}
          </motion.h1>

          <motion.p variants={itemVariants} style={{ 
            color: 'var(--text-secondary)', 
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', 
            lineHeight: 1.6,
            maxWidth: '600px',
            marginBottom: '3rem'
          }}>
            {data.description}
          </motion.p>

          <motion.button 
            variants={itemVariants}
            style={{
              padding: '1rem 2.5rem',
              border: '1px solid var(--border-gold)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              pointerEvents: 'auto', // Re-enable pointer events for the button
              transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
              e.currentTarget.style.color = '#0f0f0d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            {data.cta}
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;