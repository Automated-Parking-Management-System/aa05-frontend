import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Home from "./routes/Home";
import ForgotPassword from "./routes/ForgotPassword";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route
        path="home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}
