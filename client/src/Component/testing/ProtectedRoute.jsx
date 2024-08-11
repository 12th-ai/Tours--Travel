import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!document.cookie.split(';').find(c => c.trim().startsWith('jwt='));

  return (
    isAuthenticated ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" replace />
    )
  );
};

export default ProtectedRoute;
