import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { api } from '../../../services/api';

const ProjectsEditor = () => {
  const { portfolioData, refreshData } = useData();
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState(null);

  useEffect(() => {
    if (portfolioData?.projects) {
      setList(portfolioData.projects);
    }
  }, [portfolioData]);

  const handleItemChange = (index, field, value) => {
    const newList = [...list];
    newList[index][field] = value;
    setList(newList);
  };

  const addItem = () => {
    setList([...list, { title: '', category: '', description: '', link: '', featured: false, zipUrl: '', pdfUrl: '' }]);
  };

  const removeItem = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const handleFileUpload = async (index, field, file) => {
    if (!file) return;
    setUploadingIndex(index);
    setStatus(`Uploading ${field}...`);
    try {
      const res = await api.uploadMedia(file);
      handleItemChange(index, field, res.data.url);
      setStatus('Upload complete');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Error uploading file');
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await api.updateSection('projects', list);
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
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '2rem' }}>Edit Projects</h2>
        <button onClick={addItem} style={{ padding: '0.5rem 1rem', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>+ ADD PROJECT</button>
      </div>

      <form onSubmit={handleSave}>
        {list.map((item, index) => (
          <div key={index} style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', marginBottom: '2rem', position: 'relative' }}>
            <button type="button" onClick={() => removeItem(index)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ff4444', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>REMOVE</button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Project Title</label>
                <input type="text" value={item.title} onChange={(e) => handleItemChange(index, 'title', e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <input type="text" value={item.category} onChange={(e) => handleItemChange(index, 'category', e.target.value)} style={inputStyle} required />
              </div>
            </div>

            <label style={labelStyle}>Description</label>
            <textarea value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} required />

            <label style={labelStyle}>Primary Link (Live Demo / Repo)</label>
            <input type="text" value={item.link} onChange={(e) => handleItemChange(index, 'link', e.target.value)} style={inputStyle} />

            {/* Media Uploads */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px dashed var(--border-gold)', marginBottom: '1rem' }}>
              <div>
                <label style={{...labelStyle, color: 'var(--text-secondary)'}}>Upload ZIP File</label>
                <input type="file" accept=".zip" onChange={(e) => handleFileUpload(index, 'zipUrl', e.target.files[0])} disabled={uploadingIndex === index} style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }} />
                {item.zipUrl && <a href={item.zipUrl} target="_blank" rel="noreferrer" style={{ display: 'block', color: 'var(--accent-gold)', fontSize: '0.8rem', marginTop: '0.5rem' }}>View Current ZIP</a>}
              </div>
              <div>
                <label style={{...labelStyle, color: 'var(--text-secondary)'}}>Upload PDF / Documentation</label>
                <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(index, 'pdfUrl', e.target.files[0])} disabled={uploadingIndex === index} style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }} />
                {item.pdfUrl && <a href={item.pdfUrl} target="_blank" rel="noreferrer" style={{ display: 'block', color: 'var(--accent-gold)', fontSize: '0.8rem', marginTop: '0.5rem' }}>View Current PDF</a>}
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              <input type="checkbox" checked={item.featured} onChange={(e) => handleItemChange(index, 'featured', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: 'var(--accent-gold)' }} />
              Feature this project (Highlight in UI)
            </label>
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" style={{ padding: '1rem 2rem', backgroundColor: 'var(--accent-gold)', color: '#0f0f0d', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SAVE ALL PROJECTS</button>
          {status && <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{status}</span>}
        </div>
      </form>
    </div>
  );
};

export default ProjectsEditor;