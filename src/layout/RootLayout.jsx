import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from '../context/AuthContext'

const RootLayout = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
			if (currentUser) {
					navigate("/home");
			}
    }, [currentUser]);
  return (
		<Outlet />
  )
}

export default RootLayout