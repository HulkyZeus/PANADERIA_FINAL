// routes/inventario.routes.js
import { Router } from "express";
import {
  crearProducto,
  obtenerInventario,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/inventario.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { inventarioSchema } from "../schema/inventario.schema.js";

const router = Router();

// Obtener todos los productos
router.get("/inventario", obtenerInventario);

// Obtener un producto por ID
router.get("/inventario/:id", obtenerProductoPorId);

// Crear un nuevo producto
router.post("/inventario", validateSchema(inventarioSchema), crearProducto);

// Actualizar un producto existente
router.put(
  "/inventario/:id",
  validateSchema(inventarioSchema),
  actualizarProducto
);

// Eliminar un producto
router.delete("/inventario/:id", eliminarProducto);

export default router;
