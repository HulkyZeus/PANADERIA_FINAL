import User from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso denegado: solo para administradores" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
