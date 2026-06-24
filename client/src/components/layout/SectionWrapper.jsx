import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SectionWrapper = ({ id, children, title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section 
      id={id} 
      ref={ref}
      style={{ 
        position: 'relative',
        width: '100%',
        padding: 'var(--section-padding)',
        borderTop: '1px solid var(--border-light)'
      }}
    >
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 5%'
      }}>
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            style={{ marginBottom: '4rem' }}
          >
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              {title}
            </h2>
            {subtitle && (
              <p style={{ 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--accent-gold)',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper;