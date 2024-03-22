import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const AuthLayout = () => {

  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  return (
    currentUser
      ? <Outlet />
      : <Navigate to="/" state={{ from: location }} replace />
  );
}

export default AuthLayout