import axios from './axios';

export const getProfileRequest = async () => {
  try {
    const response = await axios.get('/users/me');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error al obtener el perfil';
    throw new Error(errorMessage);
  }
};

export const updateProfileRequest = async (userData) => {
  try {
    const response = await axios.put('/users/me/update', userData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      
      const validationErrors = error.response.data.errors;
      const errorMessage = validationErrors.map(err => `${err.field}: ${err.message}`).join(', ');
      throw new Error(errorMessage);
    }
    const errorMessage = error.response?.data?.message || 'Error al actualizar el perfil';
    throw new Error(errorMessage);
  }
};

export const changePasswordRequest = async (passwordData) => {
  try {
    const response = await axios.put('/users/me/password', passwordData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      
      const validationErrors = error.response.data.errors;
      const errorMessage = validationErrors.map(err => `${err.field}: ${err.message}`).join(', ');
      throw new Error(errorMessage);
    }
    const errorMessage = error.response?.data?.message || 'Error al cambiar la contraseña';
    throw new Error(errorMessage);
  }
};