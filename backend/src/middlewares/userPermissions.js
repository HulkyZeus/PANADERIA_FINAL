import User from "../models/user.model.js";

/**
 * Middleware que permite a los usuarios acceder a sus propios datos
 * y a los administradores acceder a cualquier dato
 */
export const canAccessUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }

    // Si es admin, permitir acceso
    if (user.role === "admin") {
      return next();
    }

    // Si no es admin, solo permitir acceso a sus propios datos
    // Las rutas /me son específicamente para datos propios
    if (req.originalUrl.includes('/me')) {
      return next();
    }

    // Si no cumple ninguna condición, denegar acceso
    return res.status(403).json({ 
      success: false,
      message: "No tienes permiso para acceder a estos datos" 
    });

  } catch (error) {
    console.error("Error en canAccessUserData:", error);
    return res.status(500).json({ 
      success: false,
      message: "Error al verificar permisos" 
    });
  }
}; 