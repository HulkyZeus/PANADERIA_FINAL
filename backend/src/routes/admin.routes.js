// routes/admin.routes.js
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  updateUserRole,
} from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/adminPermiso.js";
import { canAccessUserData } from "../middlewares/userPermissions.js";

const router = Router();

// Todas las rutas requieren autenticación y rol de admin
router.use(authRequired, isAdmin);

// Rutas CRUD básicas de usuarios (solo admin)
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Ruta específica para gestión de roles (solo admin)
router.put("/users/:id/role", updateUserRole);

export default router;
