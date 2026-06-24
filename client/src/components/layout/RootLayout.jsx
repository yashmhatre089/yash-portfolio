import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLenis } from '../../hooks/useLenis';

const RootLayout = () => {
  // Initialize cinematic smooth scroll globally
  useLenis();

  return (
    <main style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Outlet />
    </main>
  );
};

export default RootLayout;