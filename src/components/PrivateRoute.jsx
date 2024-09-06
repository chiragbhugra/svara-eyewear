import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../stores/userStore';

const PrivateRoute = () => {
  const user = useUserStore(state => state.user);
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
