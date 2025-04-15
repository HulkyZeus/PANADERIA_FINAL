// routes/review.routes.js
import { Router } from "express";
import {
  crearReview,
  obtenerReviews,
  ObtenerReviewPorId,
  actualizarReview,
  eliminarReview,
} from "../controllers/review.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { pedidoSchema } from "../schema/review.schema.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Obtener todas las reviews
router.get("/reviews", authRequired, obtenerReviews);

// Obtener una review por ID
router.get("/reviews/:id", authRequired, ObtenerReviewPorId);

// Crear una nueva review
router.post(
  "/reviews",
  authRequired,
  validateSchema(pedidoSchema),
  crearReview
);

// Actualizar una review existente
router.put(
  "/reviews/:id",
  authRequired,
  validateSchema(pedidoSchema),
  actualizarReview
);

// Eliminar una review
router.delete("/reviews/:id", authRequired, eliminarReview);


export default router;
