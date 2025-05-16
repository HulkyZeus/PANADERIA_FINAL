import axios from './axios';

/**
 * Obtiene el perfil del usuario actual
 * @returns {Promise<Object>} Datos del usuario
 * @throws {Error} Si falla la solicitud
 */
export const getProfileRequest = async () => {
  try {
    const response = await axios.get('/profile');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Error al obtener el perfil';
    console.error('Error en getProfileRequest:', errorMessage);
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
    // Validación básica de datos
    if (!userData || typeof userData !== 'object') {
      throw new Error('Datos de usuario no válidos');
    }

    const response = await axios.put('/profile', userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Error al actualizar el perfil';
    console.error('Error en updateProfileRequest:', errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Cambia la contraseña del usuario
 * @param {Object} passwordData - {currentPassword, newPassword}
 * @returns {Promise<Object>} Respuesta del servidor
 * @throws {Error} Si falla el cambio de contraseña
 */
export const changePasswordRequest = async (passwordData) => {
  try {
    if (!passwordData?.currentPassword || !passwordData?.newPassword) {
      throw new Error('Se requieren ambas contraseñas');
    }

    const response = await axios.put('/profile/password', passwordData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Error al cambiar la contraseña';
    console.error('Error en changePasswordRequest:', errorMessage);
    throw new Error(errorMessage);
  }
};