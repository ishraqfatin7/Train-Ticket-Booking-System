import { createContext, useEffect, useState } from "react";
import { login, register, logout } from "../api/authService";
export const AuthContext = createContext();

const initialState = {
  user: localStorage.getItem("user") || null,
  token: sessionStorage.getItem("authToken") || null,
  isAuthenticated: !!sessionStorage.getItem("authToken"),
};
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const handleLogin = async (credentials) => {
    try {
      console.log("Attempting login with credentials:", credentials);
      const response = await login(credentials);
      console.log("Login response:", response);
      setAuth({ user: response, token: response._id, isAuthenticated: true });
      localStorage.setItem("user", JSON.stringify(response));
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleRegister = async (userData) => {
    const data = await register(userData);
    setAuth({ user: data, token: data.token, isAuthenticated: true });
  };

  const handleLogout = () => {
    logout();
    setAuth({ user: null, token: null, isAuthenticated: false });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    if (user) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        user: JSON.parse(user),
      }));
    }
    if (token) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        token: token,
        isAuthenticated: true,
      }));
    }
  }, []);
  useEffect(() => {
    console.log("Auth state changed:", auth);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
