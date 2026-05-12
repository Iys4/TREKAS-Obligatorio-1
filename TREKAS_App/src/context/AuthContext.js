import React, { createContext, useState } from 'react';
import { MOCK_CREDENTIALS } from '../mockData';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
          setUser({ email, name: 'Juan Pérez' });
          resolve();
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};