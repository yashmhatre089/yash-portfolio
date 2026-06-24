import React, { useState } from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const Contact = () => {
  const { portfolioData } = useData();
  const [status, setStatus] = useState('Idle');

  const contactData = portfolioData?.contact || {
    email: "yash.mhatre@example.com",
    linkedin: "linkedin.com/in/yashmhatre",
    github: "github.com/yashmhatre"
  };

  const resumeData = portfolioData?.resume || {
    url: "#",
    label: "Download Full Curriculum Vitae"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message Sent');
    setTimeout(() => setStatus('Idle'), 3000);
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border-light)',
    padding: '1rem 0',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  return (
    <SectionWrapper id="contact" title="Initiate Transmission" subtitle="Contact & Resume">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem' }}>
        
        {/* Left Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <input type="text" placeholder="Your Name" required style={inputStyle} 
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
            />
          </div>
          <div>
            <input type="email" placeholder="Your Email" required style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
            />
          </div>
          <div>
            <textarea placeholder="Your Message" required rows="4" style={{...inputStyle, resize: 'none'}}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
            ></textarea>
          </div>
          <button type="submit" style={{
            padding: '1rem 2rem', border: '1px solid var(--border-gold)', color: 'var(--accent-gold)', 
            alignSelf: 'flex-start', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: '0.85rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-gold)'; e.currentTarget.style.color = '#0f0f0d'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--accent-gold)'; }}
          >
            {status === 'Idle' ? 'Send Message' : status}
          </button>
        </form>

        {/* Right Info & Resume */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Direct Line</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href={`mailto:${contactData.email}`} style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{contactData.email}</a>
              <a href={`https://${contactData.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{contactData.linkedin}</a>
              <a href={`https://${contactData.github}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{contactData.github}</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Curriculum Vitae</h4>
            <a href={resumeData.url} target="_blank" rel="noreferrer" style={{
              display: 'inline-block',
              padding: '1.5rem 3rem',
              backgroundColor: 'rgba(184, 155, 94, 0.1)',
              border: '1px solid var(--accent-gold)',
              color: 'var(--accent-gold)',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-gold)'; e.currentTarget.style.color = '#0f0f0d'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(184, 155, 94, 0.1)'; e.currentTarget.style.color = 'var(--accent-gold)'; }}
            >
              {resumeData.label}
            </a>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default Contact;