import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';

export const authRequired = async (req, res, next) => {
  try {
    // Obtener token de cookie o header Authorization Bearer
    const token = req.cookies?.token || ( req.headers.authorization?.split('')[1] );

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('Token recibido:', token); // Para depuración

    // Verificar token JWT
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // Buscar usuario por id del token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Guardar info básica del usuario en req.user
    req.user = {
      id: user._id,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Error en authRequired:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};