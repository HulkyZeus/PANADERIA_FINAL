import axios from './axios';

/**
 * Obtiene el perfil del usuario actual
 * @returns {Promise<Object>} Datos del perfil
 * @throws {Error} Si falla la petición
 */
export const getProfileRequest = async () => {
  try {
    const response = await axios.get('/api/users/profile');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error al obtener el perfil';
    throw new Error(errorMessage);
  }
};

/**
 * Actualiza el perfil del usuario
 * @param {Object} userData - Datos a actualizar {username, email, etc.}
 * @returns {Promise<Object>} Usuario actualizado
 * @throws {Error} Si falla la actualización
 */
export const updateProfileRequest = async (userData) => {
  try {
    const response = await axios.put('/api/users/profile', userData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      // Si hay errores de validación, los formateamos
      const validationErrors = error.response.data.errors;
      const errorMessage = validationErrors.map(err => `${err.field}: ${err.message}`).join(', ');
      throw new Error(errorMessage);
    }
    const errorMessage = error.response?.data?.message || 'Error al actualizar el perfil';
    throw new Error(errorMessage);
  }
};

/**
 * Cambia la contraseña del usuario
 * @param {Object} passwordData - Datos de contraseña {currentPassword, newPassword, confirmPassword}
 * @returns {Promise<Object>} Resultado de la operación
 * @throws {Error} Si falla el cambio de contraseña
 */
export const changePasswordRequest = async (passwordData) => {
  try {
    const response = await axios.put('/api/users/profile/password', passwordData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      // Si hay errores de validación, los formateamos
      const validationErrors = error.response.data.errors;
      const errorMessage = validationErrors.map(err => `${err.field}: ${err.message}`).join(', ');
      throw new Error(errorMessage);
    }
    const errorMessage = error.response?.data?.message || 'Error al cambiar la contraseña';
    throw new Error(errorMessage);
  }
};