import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Counter = ({ from, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        
        // Ease out expo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

const Metrics = () => {
  const { portfolioData } = useData();
  const metrics = portfolioData?.metrics || [
    { label: "Projects Deployed", value: 15 },
    { label: "Algorithms Built", value: 30 },
    { label: "Research Papers", value: 2 },
    { label: "Global Certifications", value: 8 }
  ];

  return (
    <SectionWrapper id="metrics">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '2rem',
        padding: '4rem 0',
        borderTop: '1px solid var(--border-gold)',
        borderBottom: '1px solid var(--border-gold)',
        backgroundColor: 'rgba(184, 155, 94, 0.02)'
      }}>
        {metrics.map((metric, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '4rem', 
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '0.5rem'
            }}>
              <Counter from={0} to={metric.value} />+
            </h3>
            <p style={{ 
              fontFamily: 'var(--font-mono)', 
              color: 'var(--accent-gold)', 
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Metrics;