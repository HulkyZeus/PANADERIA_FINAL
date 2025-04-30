import { Router } from "express";
import {
  crearEvento,
  obtenerEventos,
  obtenerEventosPorId,
  actualizarEvento,
  eliminarEvento,
} from "../controllers/eventos.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { authRequired } from "../middlewares/validateToken.js"; // Middleware de autenticación
import { eventosSchema } from "../schema/eventos.schema.js"; // Ajustado el nombre de la importación

const router = Router();

// Obtener todos los eventos (requiere autenticación)
router.get("/eventos", authRequired, obtenerEventos);

// Obtener un evento por ID (requiere autenticación)
router.get("/eventos/:id", authRequired, obtenerEventosPorId);

// Crear un nuevo evento (requiere autenticación y validación del esquema)
router.post("/eventos", authRequired, validateSchema(eventosSchema), crearEvento);

// Actualizar un evento existente (requiere autenticación y validación del esquema)
router.put("/eventos/:id", authRequired, validateSchema(eventosSchema), actualizarEvento);

// Eliminar un evento (requiere autenticación)
router.delete("/eventos/:id", authRequired, eliminarEvento);

export default router;