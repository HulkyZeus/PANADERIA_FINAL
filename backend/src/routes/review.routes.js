import { Router } from "express";
import {
  crearReview,
  obtenerReviews,
  obtenerReviewPorId,
  actualizarReview,
  eliminarReview,
  obtenerTodasLasReviews
} from "../controllers/review.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/adminPermiso.js";
import { canAccessUserData } from "../middlewares/userPermissions.js";

const router = Router();

// Rutas públicas
router.get("/reviews", obtenerReviews);
router.get("/reviews/:id", obtenerReviewPorId);

// Rutas que requieren autenticación
router.use(authRequired);

// Rutas para usuarios autenticados
router.post("/reviews", crearReview);
router.put("/reviews/:id", canAccessUserData, actualizarReview);
router.delete("/reviews/:id", canAccessUserData, eliminarReview);

// Ruta para obtener todas las reviews (solo admin)
router.get("/reviews/all", isAdmin, obtenerTodasLasReviews);

export default router;