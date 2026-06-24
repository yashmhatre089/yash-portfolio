import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Education = () => {
  const { portfolioData } = useData();
  const educationList = portfolioData?.education || [
    {
      institution: "Vidyavardhini's College of Engineering and Technology",
      degree: "Bachelor of Engineering in Artificial Intelligence & Data Science",
      year: "2021 - 2025",
      details: "Focusing on advanced neural networks, data architecture, and predictive modeling."
    }
  ];

  return (
    <SectionWrapper id="education" title="Academic Foundation" subtitle="Education">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {educationList.map((edu, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            paddingBottom: '2rem',
            borderBottom: index !== educationList.length - 1 ? '1px solid var(--border-light)' : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{edu.institution}</h3>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.9rem' }}>{edu.year}</span>
            </div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{edu.degree}</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px', marginTop: '0.5rem' }}>{edu.details}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Education;