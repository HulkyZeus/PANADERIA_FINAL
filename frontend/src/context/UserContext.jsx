import { 
  createContext, 
  useState, 
  useContext, 
  useEffect, 
  useCallback
} from "react";
import { 
  getProfileRequest,
  updateProfileRequest,
  changePasswordRequest
} from "../api/user.services.js";
import { useAuth } from "../context/AuthContext";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user, logout } = useAuth();

  // Función para limpiar mensajes
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  // Cargar el perfil
  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      clearMessages();
      const response = await getProfileRequest();
      setProfile(response.data); // Asumimos que la respuesta viene en response.data
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar el perfil");
      // Si el error es 401 (no autorizado), hacer logout
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [clearMessages, logout]);

  // Efecto para cargar el perfil inicial
  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setProfile(null); // Limpiar perfil si no hay usuario
    }
  }, [user, loadProfile]);

  // Actualizar perfil
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      clearMessages();
      const response = await updateProfileRequest(userData);
      setProfile(response.data.user);
      setSuccess("Perfil actualizado correctamente");
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al actualizar el perfil";
      setError(errorMsg);
      throw new Error(errorMsg); // Permite manejar el error en el componente
    } finally {
      setLoading(false);
    }
  };

  // Cambiar contraseña
  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      clearMessages();
      const response = await changePasswordRequest(passwordData);
      setSuccess("Contraseña cambiada correctamente");
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al cambiar la contraseña";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar cuenta
  const deleteAccount = async () => {
    try {
      setLoading(true);
      clearMessages();
      await deleteAccountRequest();
      setSuccess("Cuenta eliminada correctamente");
      logout(); // Cierra sesión después de eliminar la cuenta
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al eliminar la cuenta";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar mensajes después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(clearMessages, 5000);
    return () => clearTimeout(timer);
  }, [error, success, clearMessages]);

  // Valor proporcionado por el contexto
  const value = {
    profile,
    loading,
    error,
    success,
    loadProfile,
    updateProfile,
    changePassword,
    deleteAccount,
    clearMessages
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};