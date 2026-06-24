import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { api } from '../../../services/api';

const HeroEditor = () => {
  const { portfolioData, refreshData } = useData();
  const [formData, setFormData] = useState({ name: '', role: '', description: '', cta: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (portfolioData?.hero) {
      setFormData(portfolioData.hero);
    }
  }, [portfolioData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await api.updateSection('hero', formData);
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
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '2rem' }}>Edit Hero Section</h2>
      
      <label style={labelStyle}>Display Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />

      <label style={labelStyle}>Role / Title</label>
      <input type="text" name="role" value={formData.role} onChange={handleChange} style={inputStyle} required />

      <label style={labelStyle}>Description</label>
      <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} required />

      <label style={labelStyle}>Call to Action Text</label>
      <input type="text" name="cta" value={formData.cta} onChange={handleChange} style={inputStyle} required />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button type="submit" style={{ padding: '1rem 2rem', backgroundColor: 'var(--accent-gold)', color: '#0f0f0d', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SAVE CHANGES</button>
        {status && <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{status}</span>}
      </div>
    </form>
  );
};

export default HeroEditor;