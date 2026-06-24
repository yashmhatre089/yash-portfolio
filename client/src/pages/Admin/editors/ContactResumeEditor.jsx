import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { api } from '../../../services/api';

const ContactResumeEditor = () => {
  const { portfolioData, refreshData } = useData();
  const [contactData, setContactData] = useState({ email: '', linkedin: '', github: '' });
  const [resumeData, setResumeData] = useState({ url: '', label: 'Download Full Curriculum Vitae' });
  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (portfolioData?.contact) setContactData(portfolioData.contact);
    if (portfolioData?.resume) setResumeData(portfolioData.resume);
  }, [portfolioData]);

  const handleContactChange = (e) => setContactData({ ...contactData, [e.target.name]: e.target.value });
  const handleResumeChange = (e) => setResumeData({ ...resumeData, [e.target.name]: e.target.value });

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setStatus('Uploading Resume PDF...');
    try {
      const res = await api.uploadMedia(file);
      setResumeData({ ...resumeData, url: res.data.url });
      setStatus('Upload complete');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await api.updateSection('contact', contactData);
      await api.updateSection('resume', resumeData);
      await refreshData();
      setStatus('Saved successfully');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Error saving');
    }
  };

  const labelStyle = { display: 'block', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase' };
  const inputStyle = { width: '100%', padding: '1rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', marginBottom: '1.5rem' };

  return (
    <form onSubmit={handleSave} style={{ maxWidth: '800px' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '2rem' }}>Edit Contact & Resume</h2>
      
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>Direct Line Links</h3>
        <label style={labelStyle}>Email Address</label>
        <input type="email" name="email" value={contactData.email} onChange={handleContactChange} style={inputStyle} required />

        <label style={labelStyle}>LinkedIn URL (without https://)</label>
        <input type="text" name="linkedin" value={contactData.linkedin} onChange={handleContactChange} style={inputStyle} required />

        <label style={labelStyle}>GitHub URL (without https://)</label>
        <input type="text" name="github" value={contactData.github} onChange={handleContactChange} style={inputStyle} required />
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>Resume / CV Management</h3>
        <label style={labelStyle}>Resume Button Text</label>
        <input type="text" name="label" value={resumeData.label} onChange={handleResumeChange} style={inputStyle} required />

        <label style={labelStyle}>Upload New Resume (PDF)</label>
        <div style={{ padding: '1.5rem', border: '1px dashed var(--border-gold)', backgroundColor: 'var(--bg-secondary)', marginBottom: '1.5rem' }}>
          <input type="file" accept=".pdf" onChange={handlePdfUpload} disabled={isUploading} style={{ color: 'var(--text-primary)' }} />
          {resumeData.url && (
            <div style={{ marginTop: '1rem' }}>
              <a href={resumeData.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                View Current Active Resume
              </a>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button type="submit" disabled={isUploading} style={{ padding: '1rem 2rem', backgroundColor: 'var(--accent-gold)', color: '#0f0f0d', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SAVE CHANGES</button>
        {status && <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{status}</span>}
      </div>
    </form>
  );
};

export default ContactResumeEditor;