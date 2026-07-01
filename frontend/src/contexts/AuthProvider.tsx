import React, { useState, useEffect } from 'react';
import { AuthContext, type User } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'fake-jwt-token-123456');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        if (email === 'admin@unimed.com' && password === 'admin123') {
          const userData = { 
            name: 'Administrador', 
            email: 'admin@unimed.com' 
          };
          setUser(userData);
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Credenciais inválidas'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};