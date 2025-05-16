import { Router } from 'express';
import { 
    getProfile,
    updateProfile,
    changePassword
} from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { 
    updateUserSchema,
    changePasswordSchema 
} from '../schema/user.schema.js';

const router = Router();

/**
 * @desc    Rutas de perfil de usuario
 * @route   /api/users
 * @access  Privado (Usuario autenticado)
 */

// Obtener perfil del usuario actual
router.get('/profile', authRequired, getProfile);

// Actualizar información básica del perfil
router.put(
    '/profile',
    authRequired,
    validateSchema(updateUserSchema),
    updateProfile
);

// Cambiar contraseña del usuario
router.put(
    '/profile/password',
    authRequired,
    validateSchema(changePasswordSchema),
    changePassword
);

export default router;