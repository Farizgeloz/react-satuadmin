import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const expiredAt = localStorage.getItem('expiredAt');

  const isExpired = expiredAt && new Date() > new Date(expiredAt);

  if (!token || isExpired) {
    localStorage.clear(); // hapus semua kalau expired
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

