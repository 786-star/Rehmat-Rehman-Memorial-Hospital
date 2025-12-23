import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi } from "../api/LoginApi"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginApi({ username, password });

      if (response?.token) {
        const userData = {
          token: response.token,
          username: response.user.username,
          id: response.user.id,
        };

        localStorage.setItem("currentUser", JSON.stringify(userData));
        localStorage.setItem("token", response.token);
        setUser(userData);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = (userName, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      userName,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};