import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Timeline = () => {
  const { portfolioData } = useData();
  
  const timelineData = portfolioData?.timeline || [
    { year: "2024", event: "Published first independent paper on predictive modeling." },
    { year: "2023", event: "Led the university AI research symposium." },
    { year: "2021", event: "Commenced B.E. in Artificial Intelligence & Data Science." }
  ];

  return (
    <SectionWrapper id="timeline" title="Milestones" subtitle="Chronology">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {timelineData.map((item, index) => (
          <div key={index} style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr',
            gap: '2rem',
            alignItems: 'baseline',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.5rem'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '1.1rem' }}>
              {item.year}
            </span>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {item.event}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Timeline;