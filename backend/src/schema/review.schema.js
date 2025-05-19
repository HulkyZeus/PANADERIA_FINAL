import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string({
    required_error: "El nombre del usuario es requerido",
  }).min(1, "El nombre no puede estar vacío")
  .optional(),
  rating: z.number({
      required_error: "La calificación es requerida",
    })
    .min(1, "La calificación debe ser al menos 1")
    .max(5, "La calificación no puede ser mayor a 5"),
  description: z.string({
    required_error: "El comentario es requerido",
  }).min(5, "El comentario debe tener al menos 5 caracteres"),
  usuario_id: z.string({
    required_error: "El ID del usuario es requerido",
  }).uuid("El ID del usuario debe ser un UUID válido")
  .optional(),
});