import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { api } from '../../../services/api';

const AboutEditor = () => {
  const { portfolioData, refreshData } = useData();
  const [formData, setFormData] = useState({ bio: '', location: '', techTags: [], photoUrl: '' });
  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (portfolioData?.about) {
      setFormData(portfolioData.about);
    }
  }, [portfolioData]);

  const handleChange = (e) => {
    if (e.target.name === 'techTags') {
      // Convert comma-separated string back to array
      const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      setFormData({ ...formData, techTags: tagsArray });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setStatus('Uploading media...');
    try {
      const res = await api.uploadMedia(file);
      setFormData({ ...formData, photoUrl: res.data.url });
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
      await api.updateSection('about', formData);
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
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '2rem' }}>Edit About Section</h2>
      
      <label style={labelStyle}>Profile Photo</label>
      <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px dashed var(--border-gold)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {formData.photoUrl && <img src={formData.photoUrl} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />}
        <input type="file" accept="image/*" onChange={handleFileUpload} disabled={isUploading} style={{ color: 'var(--text-primary)' }} />
      </div>

      <label style={labelStyle}>Bio</label>
      <textarea name="bio" value={formData.bio} onChange={handleChange} style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} required />

      <label style={labelStyle}>Base of Operations (Location)</label>
      <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} required />

      <label style={labelStyle}>Core Technologies (Comma Separated)</label>
      <input type="text" name="techTags" value={formData.techTags.join(', ')} onChange={handleChange} style={inputStyle} placeholder="Python, React, Node.js" required />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button type="submit" disabled={isUploading} style={{ padding: '1rem 2rem', backgroundColor: 'var(--accent-gold)', color: '#0f0f0d', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SAVE CHANGES</button>
        {status && <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{status}</span>}
      </div>
    </form>
  );
};

export default AboutEditor;