import { Router } from 'express';
import { 
    getProfile,
    updateProfile,
    changePassword,
    updateSelf
} from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { canAccessUserData } from '../middlewares/userPermissions.js';
import { 
    updateUserSchema,
    changePasswordSchema 
} from '../schema/user.schema.js';

const router = Router();

// Todas las rutas requieren autenticación y verificación de permisos
router.use(authRequired, canAccessUserData);

/**
 * @desc    Rutas de perfil de usuario
 * @route   /api/users
 * @access  Privado (Usuario autenticado)
 */

// Obtener perfil del usuario actual
router.get('/me', getProfile);

// Actualizar datos del usuario actual
router.put(
    '/me',
    validateSchema(updateUserSchema),
    updateSelf
);

// Cambiar contraseña del usuario
router.put(
    '/me/password',
    validateSchema(changePasswordSchema),
    changePassword
);

export default router;