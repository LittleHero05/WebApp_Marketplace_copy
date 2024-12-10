import React, { createContext, useState, useContext, useEffect } from 'react';
import auth from './auth-helper';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, []);

  const login = (jwt, cb) => {
    auth.authenticate(jwt, () => {
      setIsAuthenticated(true);
      cb();
    });
  };

  const logout = (cb) => {
    auth.clearJWT(() => {
      setIsAuthenticated(false);
      cb();
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);