import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

 useEffect(() => {
  const isLoggedOut = sessionStorage.getItem("loggedOut");

  // ✅ لو فيه علامة إن المستخدم سجل خروج، منخلوش يدخل تاني
  if (isLoggedOut === "true") {
    setRole(null);
    return;
  }

  const sessionRole = sessionStorage.getItem("activeRole");
  const storedRole = localStorage.getItem("role");

  if (sessionRole) {
    setRole(sessionRole);
  } else if (storedRole) {
    setRole(storedRole);
  } else {
    setRole(null);
  }
}, []);
  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);