import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('userName');

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login');
    } else if (isAuthenticated && location.pathname === '/login') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
};

export default AppRoutes;
