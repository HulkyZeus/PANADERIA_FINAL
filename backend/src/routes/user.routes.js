import { Router } from 'express';
import { 
    getProfile,
    changePassword,
    updateSelf
} from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

import { 
    updateUserSchema,
    changePasswordSchema 
} from '../schema/user.schema.js';

const router = Router();

router.use(authRequired);

router.get('/me', getProfile);
router.put('/me/update', validateSchema(updateUserSchema), updateSelf);
router.put('/me/password', validateSchema(changePasswordSchema), changePassword);

export default router;