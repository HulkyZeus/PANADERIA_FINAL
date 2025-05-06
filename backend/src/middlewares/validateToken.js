import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';

export const authRequired = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = {
            id: user._id,
            role: user.role
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permisos de administrador' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};