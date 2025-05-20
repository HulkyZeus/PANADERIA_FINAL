// routes/pedidos.routes.js
import { Router } from "express";
import {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarPedido,
  eliminarPedido,
  obtenerPedidosPorEmail,
} from "../controllers/pedidos.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { pedidoSchema } from "../schema/pedidos.schema.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Obtener todos los pedidos
router.get("/pedidos", authRequired, obtenerPedidos);

// Obtener un pedido por ID
router.get("/pedidos/:id", authRequired, obtenerPedidoPorId);

// Crear un nuevo pedido
router.post(
  "/pedidos",
  authRequired,
  validateSchema(pedidoSchema),
  crearPedido
);

// Actualizar un pedido existente
router.put(
  "/pedidos/:id",
  authRequired,
  validateSchema(pedidoSchema),
  actualizarPedido
);

// Eliminar un pedido
router.delete("/pedidos/:id", authRequired, eliminarPedido);

// Obtener pedidos por email de usuario
router.get("/pedidos/email/:email", authRequired, obtenerPedidosPorEmail);

export default router;