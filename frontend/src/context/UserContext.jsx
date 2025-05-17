import { createContext, useState, useContext, useCallback } from 'react';
import axios from '../api/axios';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/users/me', {
        withCredentials: true
      });
      console.log('Profile response:', response.data); // Debug log
      setProfile(response.data.data);
      setSuccess('Perfil cargado correctamente');
    } catch (error) {
      console.error('Error loading profile:', error);
      setError(error.response?.data?.message || 'Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put('/users/me', data, {
        withCredentials: true
      });
      setProfile(response.data.data);
      setSuccess('Perfil actualizado correctamente');
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Error al actualizar el perfil');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put('/users/me/password', data, {
        withCredentials: true
      });
      setSuccess('Contraseña actualizada correctamente');
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.response?.data?.message || 'Error al cambiar la contraseña');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete('/users/me', {
        withCredentials: true
      });
      setProfile(null);
      setSuccess('Cuenta eliminada correctamente');
    } catch (error) {
      console.error('Error deleting account:', error);
      setError(error.response?.data?.message || 'Error al eliminar la cuenta');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    profile,
    loading,
    error,
    success,
    loadProfile,
    updateProfile,
    changePassword,
    deleteAccount
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};