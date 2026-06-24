import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomCursor from '../../components/cursor/CustomCursor';

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-gold)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    outline: 'none',
    marginBottom: '1.5rem',
  };

  return (
    <>
      <CustomCursor />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-gold)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>System Access</h1>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Elite CMS Gateway</p>
          </div>

          <form onSubmit={handleLogin}>
            {error && <div style={{ color: '#ff4444', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}
            
            <input 
              type="email" 
              placeholder="ADMIN EMAIL" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={inputStyle} 
            />
            
            <input 
              type="password" 
              placeholder="PASSWORD" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={inputStyle} 
            />
            
            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'var(--accent-gold)',
                color: '#0f0f0d',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                letterSpacing: '1px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                transition: 'opacity 0.3s ease'
              }}
            >
              {isLoading ? 'AUTHENTICATING...' : 'INITIALIZE UPLINK'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;