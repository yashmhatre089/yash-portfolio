import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import RootLayout from './components/layout/RootLayout';
import PublicPortfolio from './pages/Public/PublicPortfolio';

// Real Admin Imports
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div style={{ minHeight: '100vh', background: '#0f0f0d' }}></div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Architecture */}
            <Route element={<RootLayout />}>
              <Route path="/" element={<PublicPortfolio />} />
            </Route>

            {/* Secure Admin Architecture */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;