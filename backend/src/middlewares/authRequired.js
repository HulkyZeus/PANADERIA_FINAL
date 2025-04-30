import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Middleware para validar el token JWT
export const authRequired = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido." });
    }

    req.user = decoded; // Guardamos los datos del usuario en el objeto `req.user`
    next(); // Llamamos a la siguiente función o ruta
  });
};
