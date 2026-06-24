import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Testimonials = () => {
  const { portfolioData } = useData();
  
  const testimonialsData = portfolioData?.testimonials || [
    { quote: "Yash possesses a rare combination of mathematical intuition and production-level software engineering skills.", author: "Dr. A. Sharma", role: "Head of AI Department" }
  ];

  return (
    <SectionWrapper id="testimonials" title="Endorsements" subtitle="Testimonials">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        {testimonialsData.map((test, index) => (
          <div key={index} style={{ padding: '3rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '4rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)', lineHeight: 0.5, display: 'block', marginBottom: '2rem' }}>"</span>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic' }}>
              {test.quote}
            </p>
            <div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{test.author}</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{test.role}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;