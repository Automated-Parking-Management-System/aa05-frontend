import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
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
      <Route path="signup" element={<Signup />} />
      <Route
        path="home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
