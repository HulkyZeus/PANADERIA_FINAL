import User from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
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

    // Si no es admin, verificar si está intentando acceder a sus propios datos
    if (req.originalUrl.includes('/me')) {
      return next();
    }

    // Si no es admin y no está accediendo a sus propios datos, denegar acceso
    return res.status(403).json({ 
      success: false,
      message: "Acceso denegado: solo para administradores" 
    });

  } catch (err) {
    console.error("Error en isAdmin middleware:", err);
    return res.status(500).json({ 
      success: false,
      message: "Error al verificar permisos" 
    });
  }
};