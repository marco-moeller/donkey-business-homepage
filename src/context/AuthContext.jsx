import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../database/firebase";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isSuperAdmin = () => {
    if (!isLoggedIn) return false;
    if (user.email === "marcomoeller1821@gmail.com") return true;
    return false;
  };

  const initializeUser = async (user) => {
    if (user) {
      setUser({ ...user });
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      initializeUser(user)
    );
    return unsubscribe;
  }, []);

  const value = { user, isLoggedIn, isLoading, isSuperAdmin };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
