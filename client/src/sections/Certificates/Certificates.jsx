import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Certificates = () => {
  const { portfolioData } = useData();
  
  const certificatesData = portfolioData?.certificates || [
    {
      title: "Deep Learning Specialization",
      issuer: "Coursera & DeepLearning.AI",
      date: "Oct 2023",
      link: "#"
    },
    {
      title: "AWS Certified Machine Learning – Specialty",
      issuer: "Amazon Web Services",
      date: "Jan 2024",
      link: "#"
    }
  ];

  return (
    <SectionWrapper id="certificates" title="Global Certifications" subtitle="Credentials">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {certificatesData.map((cert, index) => (
          <a key={index} href={cert.link} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem',
            border: '1px solid var(--border-light)',
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
          >
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{cert.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{cert.issuer}</p>
            </div>
            <span style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{cert.date}</span>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Certificates;