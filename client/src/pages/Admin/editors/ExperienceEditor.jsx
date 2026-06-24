import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { api } from '../../../services/api';

const ExperienceEditor = () => {
  const { portfolioData, refreshData } = useData();
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (portfolioData?.experience) {
      setList(portfolioData.experience);
    }
  }, [portfolioData]);

  const handleItemChange = (index, field, value) => {
    const newList = [...list];
    if (field === 'tech') {
      newList[index][field] = value.split(',').map(item => item.trim()).filter(item => item !== '');
    } else {
      newList[index][field] = value;
    }
    setList(newList);
  };

  const addItem = () => {
    setList([...list, { role: '', company: '', duration: '', description: '', tech: [] }]);
  };

  const removeItem = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await api.updateSection('experience', list);
      await refreshData();
      setStatus('Saved successfully');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Error saving');
    }
  };

  const labelStyle = { display: 'block', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' };
  const inputStyle = { width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', marginBottom: '1rem' };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '2rem' }}>Edit Experience</h2>
        <button onClick={addItem} style={{ padding: '0.5rem 1rem', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>+ ADD ROLE</button>
      </div>

      <form onSubmit={handleSave}>
        {list.map((item, index) => (
          <div key={index} style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', marginBottom: '2rem', position: 'relative' }}>
            <button type="button" onClick={() => removeItem(index)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ff4444', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>REMOVE</button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Role / Title</label>
                <input type="text" value={item.role} onChange={(e) => handleItemChange(index, 'role', e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Company / Organization</label>
                <input type="text" value={item.company} onChange={(e) => handleItemChange(index, 'company', e.target.value)} style={inputStyle} required />
              </div>
            </div>

            <label style={labelStyle}>Duration (e.g., June 2024 - Present)</label>
            <input type="text" value={item.duration} onChange={(e) => handleItemChange(index, 'duration', e.target.value)} style={inputStyle} required />

            <label style={labelStyle}>Description</label>
            <textarea value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} required />

            <label style={labelStyle}>Technologies Used (Comma Separated)</label>
            <input type="text" value={item.tech ? item.tech.join(', ') : ''} onChange={(e) => handleItemChange(index, 'tech', e.target.value)} style={inputStyle} placeholder="Python, TensorFlow, PostgreSQL" />
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" style={{ padding: '1rem 2rem', backgroundColor: 'var(--accent-gold)', color: '#0f0f0d', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SAVE EXPERIENCE</button>
          {status && <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{status}</span>}
        </div>
      </form>
    </div>
  );
};

export default ExperienceEditor;