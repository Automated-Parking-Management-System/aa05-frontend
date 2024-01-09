import { Routes, Route } from "react-router-dom";

import Landing from "./routes/Landing";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
