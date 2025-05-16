import { Router } from "express";
import {
  crearReview,
  obtenerReviews,
  obtenerReviewPorId,
  actualizarReview,
  eliminarReview,
} from "../controllers/review.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { reviewSchema } from "../schema/review.schema.js"; // Cambiado de pedidoSchema a reviewSchema
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/adminPermiso.js";
import { obtenerTodasLasReviews } from "../controllers/review.controller.js"; 

const router = Router();

// Obtener todas las reviews
router.get("/reviews", authRequired, obtenerReviews);

// Obtener una review por ID
router.get("/reviews/:id", authRequired, obtenerReviewPorId);

// Crear una nueva review
router.post(
  "/reviews",
  authRequired,
  validateSchema(reviewSchema), // Cambiado de pedidoSchema a reviewSchema
  crearReview
);

// Actualizar una review existente
router.put(
  "/reviews/:id",
  authRequired,
  validateSchema(reviewSchema), // Cambiado de pedidoSchema a reviewSchema
  actualizarReview
);

// Eliminar una review
router.delete("/reviews/:id", authRequired, eliminarReview);

export default router;

router.get("/reviews/all", authRequired, isAdmin, obtenerTodasLasReviews);