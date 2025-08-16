import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/dashboard'); // redirect jika bukan admin
    }
  }, [navigate, role]);

  return role === 'admin' ? children : null;
};

export default RequireAdmin;
