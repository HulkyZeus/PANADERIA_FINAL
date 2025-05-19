import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';

export const authRequired = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    //Verificar el token
    const decoded = jwt.verify(token, TOKEN_SECRET);
    
    //Buscar el usuario en la base de datos
    const user = await User.findById(decoded.id);
    if (!user) {
      console.error('Usuario con ID ${decoded.id} no encontrado');
      return res.status(401).json({ message: 'User not found' });
    }

    // Establecer req.user con el rol del token
    req.user = {
      id: user._id,
      role: decoded.role || user.role, // Usar el rol del token o el del usuario
      email: user.email
    };

    next();
  } catch (error) {
    console.error('Error en authRequired:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token', details: error.message });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired', details: error.message });
    }
    return res.status(401).json({ message: 'Authentication failed', details: error.message });
  }
};