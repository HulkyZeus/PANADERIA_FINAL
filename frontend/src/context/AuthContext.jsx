import { createContext, useState, useContext } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/login', { email, password }, {
        withCredentials: true
      });
      
      // El token viene en las cookies, no necesitamos guardarlo manualmente
      const userData = response.data;
      
      // Actualizar el estado
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Error al iniciar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post('/logout', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/verify', {
        withCredentials: true
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};