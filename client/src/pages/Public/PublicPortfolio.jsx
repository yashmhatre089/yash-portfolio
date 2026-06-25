import React from 'react';
import CustomCursor from '../../components/cursor/CustomCursor';
import Hero from '../../sections/Hero/Hero';
import About from '../../sections/About/About';
import Education from '../../sections/Education/Education';
import Metrics from '../../sections/Metrics/Metrics';
import Skills from '../../sections/Skills/Skills';
import Experience from '../../sections/Experience/Experience';
import Projects from '../../sections/Projects/Projects';
import Certificates from '../../sections/Certificates/Certificates';
import SemesterResults from '../../sections/SemesterResults/SemesterResults';
import Timeline from '../../sections/Timeline/Timeline';
import Research from '../../sections/Research/Research';
import Testimonials from '../../sections/Testimonials/Testimonials';
import Contact from '../../sections/Contact/Contact';

const PublicPortfolio = () => {
  return (
    <>
      <CustomCursor />
      <Hero />
      <About />
      <Education />
      <SemesterResults />
      <Metrics />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Timeline />
      <Research />
      <Testimonials />
      <Contact />
      
      {/* Footer */}
      <footer style={{ 
        padding: '3rem 5%', 
        textAlign: 'center', 
        borderTop: '1px solid var(--border-light)',
        marginTop: '4rem',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} Yash Kalpesh Mhatre. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default PublicPortfolio;