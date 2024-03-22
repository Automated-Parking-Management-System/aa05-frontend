import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  if (!currentUser) {
    // Redirect the user to the home page.
    // Please! Close the mustache {{}}
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    currentUser
      ? <Outlet />
      : <Navigate to="" />
  );
}

export default RequireAuth;
