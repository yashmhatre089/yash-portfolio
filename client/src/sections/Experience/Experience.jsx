import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Experience = () => {
  const { portfolioData } = useData();
  
  const experienceData = portfolioData?.experience || [
    {
      role: "Machine Learning Intern",
      company: "AI Tech Solutions",
      duration: "June 2024 - Present",
      description: "Developing predictive models for financial forecasting. Optimizing data processing pipelines reducing latency by 40%.",
      tech: ["Python", "TensorFlow", "PostgreSQL"]
    },
    {
      role: "Software Developer Intern",
      company: "DataCorp Inc.",
      duration: "Jan 2024 - May 2024",
      description: "Architected RESTful APIs for internal analytics dashboards. Integrated robust JWT authentication and role-based access.",
      tech: ["Node.js", "Express", "React"]
    }
  ];

  return (
    <SectionWrapper id="experience" title="Professional Trajectory" subtitle="Experience">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {experienceData.map((exp, index) => (
          <div key={index} style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1rem',
            paddingLeft: '2rem',
            borderLeft: '1px solid var(--border-gold)',
            position: 'relative'
          }}>
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-6px',
              top: '8px',
              width: '11px',
              height: '11px',
              backgroundColor: 'var(--bg-primary)',
              border: '2px solid var(--accent-gold)',
              borderRadius: '50%'
            }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.85rem' }}>{exp.duration}</span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>{exp.role}</h3>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.1rem' }}>{exp.company}</p>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '700px' }}>
              {exp.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
              {exp.tech.map((tech, i) => (
                <span key={i} style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '2px'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;