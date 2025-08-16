import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequireRole = ({ allowedRoles, children }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ambil data dari localStorage
    const storedRole = localStorage.getItem('role');
    const storedUser = localStorage.getItem('user');

    setRole(storedRole);
    setUser(storedUser ? JSON.parse(storedUser) : null);

    // Cek role
    if (!allowedRoles.includes(storedRole)) {
      navigate('/Dashboard');
    }
  }, [navigate, allowedRoles]);

  return allowedRoles.includes(role) ? children : null;
};

RequireRole.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node
};

export default RequireRole;
