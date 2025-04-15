// routes/eventos.routes.js
import { Router } from "express";
import {
  crearEvento,
  obtenerEventos,
  obtenerEventosPorId,
  actualizarEvento,
  eliminarEvento,
} from "../controllers/eventos.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { inventarioSchema } from "../schema/inventario.schema.js";

const router = Router();

// Obtener todos los eventos
router.get("/eventos", obtenerEventos);

// Obtener un evento por ID
router.get("/eventos/:id", obtenerEventosPorId);

// Crear un nuevo evento
router.post("/eventos", validateSchema(inventarioSchema), crearEvento);

// Actualizar un evento existente
router.put(
  "/eventos/:id",
  validateSchema(inventarioSchema),
  actualizarEvento
);

// Eliminar un evento   
router.delete("/eventos/:id", eliminarEvento);


export default router;
