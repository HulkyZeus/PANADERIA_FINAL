import { Router } from 'express';
import { login, register, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../Schema/auth.schema.js';
import { userSchema } from "../schema/user.schema.js";
import { createUser, updateUser } from "../controllers/admin.controller.js";
import { updateUserSchema } from "../schema/user.schema.js";


const router = Router();

// Rutas de autenticación
router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.get("/profile", authRequired, profile);

router.post("/users", validateSchema(userSchema), createUser);
router.put("/users/:id", validateSchema(updateUserSchema), updateUser);

export default router;