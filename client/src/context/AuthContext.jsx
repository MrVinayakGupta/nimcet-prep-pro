import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
          try {
            const parsed = JSON.parse(savedUser);
            setUser(parsed);
          } catch (e) {
            localStorage.removeItem('user');
          }

          // Verify token and fetch fresh profile from backend
          try {
            const res = await getProfile();
            if (res.data) {
              const freshUser = res.data.user || res.data;
              setUser(freshUser);
              localStorage.setItem('user', JSON.stringify(freshUser));
            }
          } catch (apiErr) {
            if (apiErr.response?.status === 401) {
              setUser(null);
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          }
        } else {
          if (savedUser === 'undefined' || savedUser === 'null') {
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        console.warn('Failed to parse auth user from localStorage:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData, token) => {
    if (token) localStorage.setItem('token', token);
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const refreshUser = async () => {
    try {
      const res = await getProfile();
      if (res.data) {
        const freshUser = res.data.user || res.data;
        setUser(freshUser);
        localStorage.setItem('user', JSON.stringify(freshUser));
        return freshUser;
      }
    } catch (e) {}
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
