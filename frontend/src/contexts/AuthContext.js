import React, { createContext, useState, useCallback, useEffect } from 'react';
//import axios here for backend integration later

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // remove when refactoring (line 8-12)
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin User', isAdmin: true },
    { id: 2, email: 'user@example.com', password: 'user123', name: 'Test User', isAdmin: false }
  ]);

  // Axios instance can be set up here for backend integration later


  // refactor this to load from backend later
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setIsAdmin(savedIsAdmin === 'true');
      } catch (e) {
        console.error('Failed to load user from localStorage', e);
      }
    }
  }, []);

  // Refactor register function to integrate with backend later
  const register = useCallback((email, password, name) => {
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      email,
      password,
      name,
      isAdmin: false
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAdmin(false);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isAdmin', 'false');
    return { success: true, message: 'Registration successful' };
  }, [users]);


  // refactor login function to integrate with backend later
  const login = useCallback((email, password, isAdminLogin = false) => {
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    if (isAdminLogin && !user.isAdmin) {
      return { success: false, message: 'Not authorized as admin' };
    }

    setCurrentUser(user);
    setIsAdmin(user.isAdmin && isAdminLogin);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAdmin', user.isAdmin && isAdminLogin ? 'true' : 'false');
    return { success: true, message: 'Login successful' };
  }, [users]);

  // refactor logout function to integrate with backend later
  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
  }, []);

  const updateUserProfile = useCallback((updates) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    }
  }, [currentUser, users]);

  // no changes needed in the return statement for backend integration.
  // delete all comments once done refactoring
  return (
    <AuthContext.Provider value={{
      currentUser,
      isAdmin,
      register,
      login,
      logout,
      updateUserProfile,
      users
    }}>
      {children}
    </AuthContext.Provider>
  );
};
