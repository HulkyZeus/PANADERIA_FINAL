import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';

export const authRequired = async (req, res, next) => {
  try {
    // Obtener token de cookie o header Authorization Bearer
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verificar token JWT
    const decoded = jwt.verify(token, TOKEN_SECRET);
    console.log('Token decodificado:', decoded); // Para depuración

    // Buscar usuario por id del token
    const user = await User.findById(decoded.id);
    console.log('Usuario encontrado:', user); // Para depuración

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Guardar info del usuario en req.user
    req.user = {
      id: user._id,
      role: user.role,
      email: user.email
    };

    // Si la ruta es de usuario, permitir acceso sin importar el rol
    if (req.originalUrl.includes('/users/')) {
      console.log('Ruta de usuario detectada, permitiendo acceso'); // Para depuración
      return next();
    }

    next();
  } catch (error) {
    console.error('Error en authRequired:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Authentication failed' });
  }
};