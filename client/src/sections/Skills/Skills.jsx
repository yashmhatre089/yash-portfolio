import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Skills = () => {
  const { portfolioData } = useData();
  
  const skillsData = portfolioData?.skills || [
    {
      category: "Artificial Intelligence & ML",
      items: ["TensorFlow", "PyTorch", "Neural Networks", "NLP", "Computer Vision", "Scikit-Learn"]
    },
    {
      category: "Data Engineering",
      items: ["PostgreSQL", "Data Pipelines", "Pandas", "NumPy", "Apache Spark"]
    },
    {
      category: "Software Engineering",
      items: ["Python", "JavaScript", "React", "Node.js", "Express", "REST APIs"]
    }
  ];

  return (
    <SectionWrapper id="skills" title="Technical Arsenal" subtitle="Skills & Expertise">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {skillsData.map((skillGroup, index) => (
          <div key={index}>
            <h3 style={{ 
              fontFamily: 'var(--font-mono)', 
              color: 'var(--accent-gold)', 
              fontSize: '0.9rem', 
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border-gold)',
              paddingBottom: '0.5rem'
            }}>
              {skillGroup.category}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {skillGroup.items.map((item, i) => (
                <li key={i} style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '1.05rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent-gold)', borderRadius: '50%' }}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;