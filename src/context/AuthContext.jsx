import { createContext, useState, useEffect } from "react";
import { auth, signOutUser } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [setCurrentUser]);

  const signOut = () => {
    signOutUser();
    setCurrentUser(null);
    navigate("/");
  };

  const value = { currentUser, setCurrentUser, signOut };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
