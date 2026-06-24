import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomCursor from '../../components/cursor/CustomCursor';

// All Editors Imported Perfectly
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import EducationEditor from './editors/EducationEditor';
import SemesterResultsEditor from './editors/SemesterResultsEditor';
import MetricsEditor from './editors/MetricsEditor';
import SkillsEditor from './editors/SkillsEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import CertificatesEditor from './editors/CertificatesEditor';
import TimelineEditor from './editors/TimelineEditor';
import ResearchEditor from './editors/ResearchEditor';
import TestimonialsEditor from './editors/TestimonialsEditor';
import ContactResumeEditor from './editors/ContactResumeEditor';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('hero');

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About & Profile' },
    { id: 'education', label: 'Education' },
    { id: 'semesters', label: 'Semester Results' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'skills', label: 'Skills & Arsenal' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects & Media' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'research', label: 'Research' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact & Resume' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'hero': return <HeroEditor />;
      case 'about': return <AboutEditor />;
      case 'education': return <EducationEditor />;
      case 'semesters': return <SemesterResultsEditor />;
      case 'metrics': return <MetricsEditor />;
      case 'skills': return <SkillsEditor />;
      case 'experience': return <ExperienceEditor />;
      case 'projects': return <ProjectsEditor />;
      case 'certificates': return <CertificatesEditor />;
      case 'timeline': return <TimelineEditor />;
      case 'research': return <ResearchEditor />;
      case 'testimonials': return <TestimonialsEditor />;
      case 'contact': return <ContactResumeEditor />;
      default: return null;
    }
  };

  return (
    <>
      <CustomCursor />
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
        
        {/* Elite Sidebar */}
        <aside style={{ width: '280px', backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-light)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-gold)', fontSize: '1.5rem' }}>Control Panel</h2>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.5rem' }}>SECURE SESSION ACTIVE</p>
          </div>
          
          {/* Scrollable Nav Area to prevent overflow on smaller screens */}
          <nav style={{ flex: 1, padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.2rem', overflowY: 'auto' }}>
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem 2rem',
                  backgroundColor: activeTab === tab.id ? 'rgba(184, 155, 94, 0.1)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.80rem',
                  textTransform: 'uppercase',
                  borderLeft: activeTab === tab.id ? '3px solid var(--accent-gold)' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
            <button onClick={logout} style={{ width: '100%', padding: '1rem', border: '1px solid #ff4444', color: '#ff4444', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', cursor: 'pointer' }}>
              TERMINATE SESSION
            </button>
          </div>
        </aside>

        {/* Main Editor Canvas */}
        <main style={{ flex: 1, padding: '4rem', height: '100vh', overflowY: 'auto' }}>
          {renderContent()}
        </main>

      </div>
    </>
  );
};

export default AdminDashboard;