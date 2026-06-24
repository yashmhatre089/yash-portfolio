import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';

const Projects = () => {
  const { portfolioData } = useData();
  
  const projectsData = portfolioData?.projects || [
    {
      title: "Neural Vision Core",
      category: "Computer Vision",
      description: "An elite image recognition pipeline capable of processing high-resolution medical imaging with 99.2% accuracy.",
      link: "#",
      featured: true
    },
    {
      title: "Predictive Market Analysis",
      category: "Data Science",
      description: "Algorithmic trading model leveraging LSTM networks to forecast short-term market volatility.",
      link: "#",
      featured: false
    }
  ];

  return (
    <SectionWrapper id="projects" title="Production Showcases" subtitle="Selected Projects">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {projectsData.map((project, index) => (
          <motion.a 
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="project"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              display: 'block',
              padding: '3rem 2rem',
              backgroundColor: project.featured ? 'rgba(184, 155, 94, 0.05)' : 'transparent',
              border: '1px solid var(--border-light)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--accent-gold)', 
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {project.category}
              </span>
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              {project.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {project.description}
            </p>
            
            {/* Minimalist Arrow icon */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;