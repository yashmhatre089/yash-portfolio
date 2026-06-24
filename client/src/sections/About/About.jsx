import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const About = () => {
  const { portfolioData } = useData();
  const data = portfolioData?.about || {
    bio: "I am an AI & Machine Learning Developer focused on architecting scalable, elite intelligence systems. Blending mathematical rigor with modern software engineering, I build solutions that transform complex data into actionable, high-performance assets.",
    location: "Vasai-Virar, Maharashtra, India",
    techTags: ["Python", "TensorFlow", "PyTorch", "React", "Node.js", "PostgreSQL"],
    photoUrl: "" // Will be handled via CMS
  };

  return (
    <SectionWrapper id="about" title="Intelligence Architecture" subtitle="About Me">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '4rem',
        alignItems: 'start'
      }}>
        
        {/* Left: Bio & Details */}
        <div>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.1rem', 
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            {data.bio}
          </p>
          
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>BASE OF OPERATIONS</span>
            <span style={{ color: 'var(--text-primary)' }}>{data.location}</span>
          </div>
        </div>

        {/* Right: Technical Arsenal */}
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.8rem', display: 'block', marginBottom: '1.5rem' }}>CORE TECHNOLOGIES</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.techTags.map((tag, index) => (
              <span key={index} style={{
                padding: '0.5rem 1rem',
                border: '1px solid var(--border-gold)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(184, 155, 94, 0.05)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default About;