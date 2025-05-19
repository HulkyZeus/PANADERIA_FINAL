import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import pedidosRoutes from "./pedidos.routes.js";
import clientesRoutes from "./clientes.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/pedidos", pedidosRoutes);
router.use("/clientes", clientesRoutes);

export default router; 