import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../Zustand/authStore';

const ProtectedRoute = (props) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) { return <Navigate to="/" />; }

  return props.children;
};

export default ProtectedRoute;
