import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Research = () => {
  const { portfolioData } = useData();
  
  const researchData = portfolioData?.research || [
    { topic: "Generative Adversarial Networks (GANs)", details: "Exploring synthetic data generation for imbalanced datasets." },
    { topic: "Natural Language Processing", details: "Transformer-based architectures for contextual semantic search." },
    { topic: "Algorithmic Trading", details: "Time-series forecasting using LSTM and reinforcement learning." }
  ];

  return (
    <SectionWrapper id="research" title="Current Inquiries" subtitle="Research Interests">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {researchData.map((item, index) => (
          <div key={index}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem', borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1rem' }}>
              {item.topic}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.2rem' }}>
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Research;