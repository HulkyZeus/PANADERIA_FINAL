// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../components/axios"; // Asegúrate de que esta ruta sea correcta

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const [loading, setLoading] = useState(true);

  // Iniciar sesión
  const login = (data) => {
    localStorage.setItem("token", data.token); // Guardamos el token
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; // Configuramos el token en Axios

    setAuth({
      isAuthenticated: true,
      user: data.user,
      token: data.token,
    });
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await api.post("/logout", null, { withCredentials: true });
  
      setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  

  // Verifica si hay sesión activa al montar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const checkAuth = async () => {
      try {
        const res = await api.get("/profile");
        setAuth({
          isAuthenticated: true,
          user: res.data,
          token,
        });
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          user: null,
          token: null,
        });
        localStorage.removeItem("token"); // Limpia en caso de token inválido
        delete api.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

