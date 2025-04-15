// routes/inventario.routes.js
import { Router } from "express";
import {
  crearIngrediente,
  obtenerInventario,
  obtenerIngredientePorId,
  actualizarIngrediente,
  eliminarIngrediente,
} from "../controllers/inventario.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { inventarioSchema } from "../schema/inventario.schema.js";

const router = Router();

// Obtener todos los ingredientes
router.get("/inventario", obtenerInventario);

// Obtener un ingrediente por ID
router.get("/inventario/:id", obtenerIngredientePorId);

// Crear un nuevo ingrediente
router.post("/inventario", validateSchema(inventarioSchema), crearIngrediente);

// Actualizar un ingrediente existente
router.put(
  "/inventario/:id",
  validateSchema(inventarioSchema),
  actualizarIngrediente
);

// Eliminar un ingrediente
router.delete("/inventario/:id", eliminarIngrediente);

export default router;
