import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      authAPI.me()
        .then(res => {
          if (res.data.success) {
            setAdmin(res.data.admin);
          } else {
            localStorage.removeItem('adminToken');
          }
        })
        .catch(() => {
          localStorage.removeItem('adminToken');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.data.success) {
      localStorage.setItem('adminToken', res.data.token);
      setAdmin(res.data.admin);
      return res.data;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      localStorage.removeItem('adminToken');
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: Boolean(admin) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
