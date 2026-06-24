import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { api } from '../../../services/api';

const TestimonialsEditor = () => {
  const { portfolioData, refreshData } = useData();
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (portfolioData?.testimonials) setList(portfolioData.testimonials);
  }, [portfolioData]);

  const handleItemChange = (index, field, value) => {
    const newList = [...list];
    newList[index][field] = value;
    setList(newList);
  };

  const addItem = () => setList([...list, { quote: '', author: '', role: '' }]);
  const removeItem = (index) => setList(list.filter((_, i) => i !== index));

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await api.updateSection('testimonials', list);
      await refreshData();
      setStatus('Saved successfully');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Error saving');
    }
  };

  const inputStyle = { width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', marginBottom: '1rem' };
  const labelStyle = { display: 'block', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '2rem' }}>Edit Testimonials</h2>
        <button onClick={addItem} style={{ padding: '0.5rem 1rem', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>+ ADD TESTIMONIAL</button>
      </div>

      <form onSubmit={handleSave}>
        {list.map((item, index) => (
          <div key={index} style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', marginBottom: '2rem', position: 'relative' }}>
            <button type="button" onClick={() => removeItem(index)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ff4444', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>REMOVE</button>
            <label style={labelStyle}>Testimonial Quote</label>
            <textarea value={item.quote} onChange={(e) => handleItemChange(index, 'quote', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Author Name</label>
                <input type="text" value={item.author} onChange={(e) => handleItemChange(index, 'author', e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Author Role</label>
                <input type="text" value={item.role} onChange={(e) => handleItemChange(index, 'role', e.target.value)} style={inputStyle} required />
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" style={{ padding: '1rem 2rem', backgroundColor: 'var(--accent-gold)', color: '#0f0f0d', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SAVE TESTIMONIALS</button>
          {status && <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{status}</span>}
        </div>
      </form>
    </div>
  );
};

export default TestimonialsEditor;