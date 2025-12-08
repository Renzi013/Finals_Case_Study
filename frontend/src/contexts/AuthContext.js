import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('currentUser');
    if (token && savedUser) {
      const userObj = JSON.parse(savedUser);
      setCurrentUser(userObj);

      setIsAdmin(userObj.is_admin === 1 || userObj.is_admin === true);
    }
  }, []);

  const login = async (email, password, isAdminLogin = false) => {

    try {
      const response = await api.post('/login', { email, password, isAdminLogin });
      const { user, token } = response.data;

      if (isAdminLogin && !user.is_admin) {
        return { success: false, message: 'Not authorized as admin' };
      }

      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsAdmin(user.is_admin === 1 || user.is_admin === true);

      return { success: true, message: 'Login successful' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await api.post('/register', { email, password, name });
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsAdmin(false);
      
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  }

  const logout = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await api.post('/logout', {}, { headers: { Authorization: 'Bearer ${token}' } });
      }
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      setCurrentUser(null);
      setIsAdmin(false);
      localStorage.clear();
    }
  };

  const updateUserProfile = async(updates) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put('/profile', updates, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedUser = response.data.user;

      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Update failed' };
    }
  };

  
  return (
    <AuthContext.Provider value={{
      currentUser,
      isAdmin,
      register,
      login,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
