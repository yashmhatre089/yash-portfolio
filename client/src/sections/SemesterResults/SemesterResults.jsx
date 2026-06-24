import React from 'react';
import SectionWrapper from '../../components/layout/SectionWrapper';
import { useData } from '../../context/DataContext';

const SemesterResults = () => {
  const { portfolioData } = useData();
  
  const semestersData = portfolioData?.semesters || [
    { semester: "Semester I", sgpa: "9.45", status: "Completed" },
    { semester: "Semester II", sgpa: "9.60", status: "Completed" },
    { semester: "Semester III", sgpa: "9.25", status: "Completed" },
    { semester: "Semester IV", sgpa: "9.75", status: "Completed" }
  ];

  return (
    <SectionWrapper id="semesters" title="Academic Performance" subtitle="Semester Results">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {semestersData.map((sem, index) => (
          <div key={index} style={{
            padding: '2rem',
            border: '1px solid var(--border-gold)',
            backgroundColor: 'rgba(184, 155, 94, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {sem.semester}
            </h3>
            <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', lineHeight: 1 }}>
              {sem.sgpa}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }}></span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                {sem.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SemesterResults;